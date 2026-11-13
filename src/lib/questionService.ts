// src/lib/questionService.ts
import { Question } from '@/types/game';
import localQuestions from '@/data/questions_15k.json';
import { supabase } from './supabase';

export async function getRandomQuestion(level: number): Promise<Question> {
  // First attempt to get a random question from Supabase for cloud sync
  try {
    const { count, error: countError } = await supabase
      .from('questions')
      .select('*', { count: 'exact', head: true })
      .eq('level', level);

    if (!countError && count && count > 0) {
      const randomIndex = Math.floor(Math.random() * count);
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('level', level)
        .range(randomIndex, randomIndex)
        .limit(1)
        .single();

      if (!error && data) {
        return data as Question;
      }
    }
  } catch (err) {
    console.warn('Falling back to local question repository:', err);
  }

  // Fallback to local 15,000 question repository
  const levelQuestions = (localQuestions as Question[]).filter((q) => q.level === level);
  if (levelQuestions.length === 0) {
    throw new Error(`No questions available for level ${level}`);
  }
  const picked = levelQuestions[Math.floor(Math.random() * levelQuestions.length)];
  return picked;
}
