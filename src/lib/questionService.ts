// src/lib/questionService.ts
import { Question } from '@/types/game';
import localQuestions from '@/data/questions_15k.json';
import { supabase } from './supabase';

const SEEN_STORAGE_KEY = 'altp_seen_questions_v2';
const MAX_SEEN_BUFFER = 600;
const SUPABASE_TIMEOUT_MS = 900;
const LEVEL_POOL_SIZE = 1000;
const FETCH_WINDOW_SIZE = 8;

const prefetchCache = new Map<number, Question>();
const inflightPrefetch = new Map<number, Promise<Question>>();
const sessionSeenSet = new Set<string>();

function normalizeQuestionKey(text: string): string {
  return text
    .normalize('NFC')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function readSeenList(): string[] {
  if (typeof window === 'undefined') {
    return Array.from(sessionSeenSet);
  }
  try {
    const raw = window.localStorage.getItem(SEEN_STORAGE_KEY);
    if (!raw) return Array.from(sessionSeenSet);
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return Array.from(sessionSeenSet);
  }
}

function getSeenSet(): Set<string> {
  const combined = new Set(readSeenList());
  sessionSeenSet.forEach((k) => combined.add(k));
  return combined;
}

function markQuestionSeen(question: Question): void {
  const key = normalizeQuestionKey(question.question);
  if (!key) return;
  sessionSeenSet.add(key);

  if (typeof window === 'undefined') return;
  try {
    const current = readSeenList().filter((k) => k !== key);
    current.push(key);
    const trimmed =
      current.length > MAX_SEEN_BUFFER ? current.slice(current.length - MAX_SEEN_BUFFER) : current;
    window.localStorage.setItem(SEEN_STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // Ignore storage quota errors
  }
}

function pickRandomUnseen(candidates: Question[], seen: Set<string>): Question | null {
  if (candidates.length === 0) return null;
  const unseen = candidates.filter((q) => !seen.has(normalizeQuestionKey(q.question)));
  const pool = unseen.length > 0 ? unseen : candidates;
  return pool[Math.floor(Math.random() * pool.length)];
}

async function fetchQuestionUncached(level: number): Promise<Question> {
  const seen = getSeenSet();

  // Fast random-window query on Supabase `questions` (1,000 rows per level) bounded by 900ms timeout
  try {
    const maxOffset = Math.max(0, LEVEL_POOL_SIZE - FETCH_WINDOW_SIZE);
    const randomOffset = Math.floor(Math.random() * (maxOffset + 1));

    const queryPromise = supabase
      .from('questions')
      .select('*')
      .eq('level', level)
      .range(randomOffset, randomOffset + FETCH_WINDOW_SIZE - 1);

    const timeoutPromise = new Promise<{ data: null; error: Error }>((resolve) => {
      setTimeout(() => resolve({ data: null, error: new Error('Supabase timeout') }), SUPABASE_TIMEOUT_MS);
    });

    const result = await Promise.race([queryPromise, timeoutPromise]);

    if (!result.error && Array.isArray(result.data) && result.data.length > 0) {
      const picked = pickRandomUnseen(result.data as Question[], seen);
      if (picked) {
        return picked;
      }
    }
  } catch (err) {
    console.warn('Falling back to local question repository:', err);
  }

  // Fallback to local 15,000 editorial question repository (preferring unseen questions)
  const levelQuestions = (localQuestions as Question[]).filter((q) => q.level === level);
  if (levelQuestions.length === 0) {
    throw new Error(`No questions available for level ${level}`);
  }
  return pickRandomUnseen(levelQuestions, seen) || levelQuestions[0];
}

export function prefetchQuestion(level: number): void {
  if (level < 1 || level > 15) return;
  if (prefetchCache.has(level) || inflightPrefetch.has(level)) return;

  const task = fetchQuestionUncached(level)
    .then((q) => {
      prefetchCache.set(level, q);
      inflightPrefetch.delete(level);
      return q;
    })
    .catch((err) => {
      inflightPrefetch.delete(level);
      throw err;
    });

  inflightPrefetch.set(level, task);
}

export async function getRandomQuestion(level: number): Promise<Question> {
  const seen = getSeenSet();

  const cached = prefetchCache.get(level);
  if (cached && !seen.has(normalizeQuestionKey(cached.question))) {
    prefetchCache.delete(level);
    markQuestionSeen(cached);
    return cached;
  }
  prefetchCache.delete(level);

  const pending = inflightPrefetch.get(level);
  if (pending) {
    try {
      const awaited = await pending;
      prefetchCache.delete(level);
      if (!seen.has(normalizeQuestionKey(awaited.question))) {
        markQuestionSeen(awaited);
        return awaited;
      }
    } catch {
      // Fall through to fresh fetch
    }
  }

  const fresh = await fetchQuestionUncached(level);
  markQuestionSeen(fresh);
  return fresh;
}
