'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GameSetup, PRIZE_LADDER, Question } from '@/types/game';
import { getRandomQuestion, prefetchQuestion } from '@/lib/questionService';
import { soundManager } from '@/lib/soundManager';
import { supabase } from '@/lib/supabase';
import { StudioStage, VTV3LogoCrest } from '@/components/StudioStage';
import {
  LadderIcon,
  LifelineMedallion,
  SoundOffIcon,
  SoundOnIcon,
  SparkleIcon,
  TrophyIcon,
  WalkAwayIcon,
} from '@/components/BroadcastIcons';
import { AnswerLozenge, QuestionLozenge } from '@/components/BroadcastLozenge';
import { MoneyLadder } from '@/components/MoneyLadder';
import { SetupModal } from '@/components/SetupModal';
import {
  CompanionModal,
  getDisplayCategory,
  PhoneModal,
  SageModal,
} from '@/components/LifelineModals';
import { CheckModal } from '@/components/CheckModal';
import { GameOverModal } from '@/components/GameOverModal';
import { LeaderboardModal } from '@/components/LeaderboardModal';

type Choice = 'A' | 'B' | 'C' | 'D';
type ActiveModal =
  | 'none'
  | 'setup'
  | 'leaderboard'
  | 'phone'
  | 'companion'
  | 'sage'
  | 'check'
  | 'walkaway'
  | 'gameover';

const QUESTION_DURATION = 30;

function formatVnd(amount: number): string {
  return `${amount.toLocaleString('vi-VN')} VNĐ`;
}

function getPrizeForLevel(level: number): number {
  return PRIZE_LADDER.find((p) => p.level === level)?.prize ?? 0;
}

function getSafetyPrize(currentLevel: number): number {
  if (currentLevel > 10) return getPrizeForLevel(10);
  if (currentLevel > 5) return getPrizeForLevel(5);
  return 0;
}

function buildLevelCommentary(level: number): string {
  if (level === 1) {
    return 'MC Lại Văn Sâm: "Câu hỏi đầu tiên rất nhẹ nhàng để khởi động tâm lý trên ghế nóng!"';
  }
  if (level <= 4) {
    return `MC Lại Văn Sâm: "Chúng ta đang ở Câu ${level} thuộc chặng khởi động — hãy bình tĩnh quan sát thật kỹ nhé."`;
  }
  if (level === 5) {
    return 'MC Lại Văn Sâm: "Câu số 5 — cột mốc an toàn đầu tiên trị giá 2.000.000 đồng. Cẩn trọng từng phương án!"';
  }
  if (level <= 9) {
    return `MC Lại Văn Sâm: "Bước sang Câu ${level}, Tổ tư vấn 2 Nhà Thông Thái đã sẵn sàng hỗ trợ khi bạn cần!"`;
  }
  if (level === 10) {
    return 'MC Lại Văn Sâm: "Câu hỏi số 10 — cột mốc bản lĩnh 22.000.000 đồng và tấm séc danh giá!"';
  }
  if (level <= 13) {
    return `MC Lại Văn Sâm: "Vùng thử thách chuyên sâu Câu ${level} — mỗi quyết định lúc này đều mang tính bước ngoặt!"`;
  }
  if (level === 14) {
    return 'MC Lại Văn Sâm: "Câu hỏi số 14 trị giá 85.000.000 đồng — bản lĩnh tri thức đỉnh cao!"';
  }
  return 'MC Lại Văn Sâm: "Câu hỏi cuối cùng số 15 — 150.000.000 đồng đang chờ đợi chủ nhân xứng đáng nhất!"';
}

export default function GamePage() {
  const [gameState, setGameState] = useState<'lobby' | 'playing'>('lobby');
  const [setup, setSetup] = useState<GameSetup | null>(null);
  const [activeModal, setActiveModal] = useState<ActiveModal>('none');
  const [mobileLadderOpen, setMobileLadderOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Gameplay state
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<Choice | null>(null);
  const [answerPhase, setAnswerPhase] = useState<'idle' | 'locking' | 'revealed'>('idle');
  const [hiddenOptions, setHiddenOptions] = useState<Choice[]>([]);
  const [timeLeft, setTimeLeft] = useState(QUESTION_DURATION);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [mcCommentary, setMcCommentary] = useState<string>(buildLevelCommentary(1));

  // Lifelines usage
  const [used5050, setUsed5050] = useState(false);
  const [usedPhone, setUsedPhone] = useState(false);
  const [usedCompanion, setUsedCompanion] = useState(false);
  const [usedSage, setUsedSage] = useState(false);

  // Result state for GameOver / Check modals
  const [gameOverInfo, setGameOverInfo] = useState<{
    prize: number;
    reachedLevel: number;
    isWin: boolean;
    walkedAway: boolean;
    correctAnswer?: Choice;
    correctOptionText?: string;
  } | null>(null);

  const [checkInfo, setCheckInfo] = useState<{
    level: number;
    prizeFormatted: string;
  } | null>(null);

  const revealTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextStepTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearPendingTimers = useCallback(() => {
    if (revealTimeoutRef.current) {
      clearTimeout(revealTimeoutRef.current);
      revealTimeoutRef.current = null;
    }
    if (nextStepTimeoutRef.current) {
      clearTimeout(nextStepTimeoutRef.current);
      nextStepTimeoutRef.current = null;
    }
  }, []);

  // Warm prefetch Q1 while player explores lobby
  useEffect(() => {
    prefetchQuestion(1);
    return () => {
      clearPendingTimers();
      soundManager.stopAll();
    };
  }, [clearPendingTimers]);

  const currentPrizeLevel = useMemo(
    () => PRIZE_LADDER.find((p) => p.level === currentLevel),
    [currentLevel]
  );

  const walkAwayPrize = useMemo(
    () => (currentLevel <= 1 ? 0 : getPrizeForLevel(currentLevel - 1)),
    [currentLevel]
  );

  const safetyPrize = useMemo(() => getSafetyPrize(currentLevel), [currentLevel]);

  const saveSessionToSupabase = useCallback(
    async (
      activeSetup: GameSetup,
      reachedLevel: number,
      prizeWon: number,
      status: 'won' | 'lost' | 'walked_away',
      lifelines: { l5050: boolean; lPhone: boolean; lComp: boolean; lSage: boolean }
    ) => {
      try {
        await supabase.from('game_sessions').insert({
          player_name: activeSetup.playerName,
          companion_name: activeSetup.companionName,
          companion_relation: activeSetup.companionRelation,
          companion_field: activeSetup.companionField,
          phone_friend_name: activeSetup.phoneFriendName,
          sage1_name: activeSetup.sage1Name,
          sage1_field: activeSetup.sage1Field,
          sage2_name: activeSetup.sage2Name,
          sage2_field: activeSetup.sage2Field,
          current_level: reachedLevel,
          prize_won: prizeWon,
          has_check: reachedLevel >= 10,
          lifeline_5050: lifelines.l5050,
          lifeline_phone: lifelines.lPhone,
          lifeline_companion: lifelines.lComp,
          lifeline_sage: lifelines.lSage,
          status,
        });
      } catch {
        // Non-blocking telemetry
      }
    },
    []
  );

  const handleGameOver = useCallback(
    (params: {
      prize: number;
      reachedLevel: number;
      isWin: boolean;
      walkedAway: boolean;
      status: 'won' | 'lost' | 'walked_away';
      correctAnswer?: Choice;
      correctOptionText?: string;
    }) => {
      setIsTimerPaused(true);
      soundManager.stopBGM();
      setGameOverInfo({
        prize: params.prize,
        reachedLevel: params.reachedLevel,
        isWin: params.isWin,
        walkedAway: params.walkedAway,
        correctAnswer: params.correctAnswer,
        correctOptionText: params.correctOptionText,
      });
      setActiveModal('gameover');

      if (setup) {
        saveSessionToSupabase(setup, params.reachedLevel, params.prize, params.status, {
          l5050: used5050,
          lPhone: usedPhone,
          lComp: usedCompanion,
          lSage: usedSage,
        });
      }
    },
    [setup, used5050, usedPhone, usedCompanion, usedSage, saveSessionToSupabase]
  );

  const loadQuestionForLevel = useCallback(
    async (level: number, introCue?: 'enter' | 'important') => {
      clearPendingTimers();
      setIsLoadingQuestion(true);
      setSelectedAnswer(null);
      setAnswerPhase('idle');
      setHiddenOptions([]);
      setTimeLeft(QUESTION_DURATION);
      setIsTimerPaused(true);
      setMcCommentary(buildLevelCommentary(level));

      try {
        const q = await getRandomQuestion(level);
        setCurrentLevel(level);
        setCurrentQuestion(q);
        setIsLoadingQuestion(false);
        setIsTimerPaused(false);
        prefetchQuestion(level + 1);

        soundManager.playBGM(level);
        if (introCue === 'enter') {
          soundManager.playSFX('/audio/gofind.mp3', () => {
            soundManager.playQuestionSound(level);
          });
        } else if (level === 5 || level === 10 || level === 15) {
          soundManager.playSFX('/audio/important.mp3', () => {
            soundManager.playQuestionSound(level);
          });
        } else {
          soundManager.playQuestionSound(level);
        }
      } catch (err) {
        console.error('Failed to load question:', err);
        setIsLoadingQuestion(false);
        setIsTimerPaused(false);
      }
    },
    [clearPendingTimers]
  );

  const handleStartGame = useCallback(
    (newSetup: GameSetup) => {
      setSetup(newSetup);
      setActiveModal('none');
      setMobileLadderOpen(false);
      setGameState('playing');
      setUsed5050(false);
      setUsedPhone(false);
      setUsedCompanion(false);
      setUsedSage(false);
      setGameOverInfo(null);
      setCheckInfo(null);
      loadQuestionForLevel(1, 'enter');
    },
    [loadQuestionForLevel]
  );

  // Countdown Timer Effect
  useEffect(() => {
    if (
      gameState !== 'playing' ||
      isLoadingQuestion ||
      isTimerPaused ||
      answerPhase !== 'idle' ||
      activeModal !== 'none'
    ) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, isLoadingQuestion, isTimerPaused, answerPhase, activeModal]);

  // Handle Out of Time cleanly
  useEffect(() => {
    if (
      timeLeft === 0 &&
      gameState === 'playing' &&
      !isLoadingQuestion &&
      answerPhase === 'idle' &&
      activeModal === 'none' &&
      currentQuestion
    ) {
      const zeroCueTimer = setTimeout(() => {
        setIsTimerPaused(true);
        soundManager.playOutOfTime();
        setMcCommentary('MC Lại Văn Sâm: "Hết thời gian suy nghĩ rồi! Rất đáng tiếc!"');

        const correctChoice = currentQuestion.correct_answer;
        const correctText =
          correctChoice === 'A'
            ? currentQuestion.option_a
            : correctChoice === 'B'
            ? currentQuestion.option_b
            : correctChoice === 'C'
            ? currentQuestion.option_c
            : currentQuestion.option_d;

        nextStepTimeoutRef.current = setTimeout(() => {
          handleGameOver({
            prize: getSafetyPrize(currentLevel),
            reachedLevel: currentLevel,
            isWin: false,
            walkedAway: false,
            status: 'lost',
            correctAnswer: correctChoice,
            correctOptionText: correctText,
          });
        }, 1500);
      }, 0);

      return () => clearTimeout(zeroCueTimer);
    }
  }, [
    timeLeft,
    gameState,
    isLoadingQuestion,
    answerPhase,
    activeModal,
    currentQuestion,
    currentLevel,
    handleGameOver,
  ]);

  const handleSelectAnswer = useCallback(
    (choice: Choice) => {
      if (
        gameState !== 'playing' ||
        isLoadingQuestion ||
        !currentQuestion ||
        answerPhase !== 'idle' ||
        hiddenOptions.includes(choice)
      ) {
        return;
      }

      setSelectedAnswer(choice);
      setAnswerPhase('locking');
      setIsTimerPaused(true);
      setMcCommentary(
        `MC Lại Văn Sâm: "Câu trả lời cuối cùng của bạn là phương án ${choice}... Chúng ta hãy cùng chờ kết quả!"`
      );
      soundManager.playAnswerSound(choice);

      const suspenseDelay = currentLevel >= 10 ? 2200 : 1400;
      const preRevealDelay = currentLevel >= 10 ? 900 : 500;

      revealTimeoutRef.current = setTimeout(() => {
        soundManager.playSuspense();
      }, preRevealDelay);

      nextStepTimeoutRef.current = setTimeout(() => {
        setAnswerPhase('revealed');
        const isCorrect = choice === currentQuestion.correct_answer;

        if (isCorrect) {
          soundManager.playCorrectSound(choice);
          const earnedPrize = getPrizeForLevel(currentLevel);
          setMcCommentary(
            `MC Lại Văn Sâm: "Tuyệt vời! ${choice} là đáp án chính xác! Bạn đã nâng mức thưởng lên ${formatVnd(
              earnedPrize
            )}!"`
          );

          const prizeObj = PRIZE_LADDER.find((p) => p.level === currentLevel);

          nextStepTimeoutRef.current = setTimeout(() => {
            if (currentLevel === 5) {
              soundManager.playMilestone1();
            }

            if (prizeObj?.hasCheck) {
              if (currentLevel === 15) {
                soundManager.playVictoryCue();
              } else {
                soundManager.playMilestone2();
              }
              setCheckInfo({
                level: currentLevel,
                prizeFormatted: prizeObj.prizeFormatted,
              });
              setActiveModal('check');
              return;
            }

            if (currentLevel >= 15) {
              soundManager.playVictoryCue();
              handleGameOver({
                prize: earnedPrize,
                reachedLevel: 15,
                isWin: true,
                walkedAway: false,
                status: 'won',
              });
              return;
            }

            loadQuestionForLevel(currentLevel + 1);
          }, 1650);
        } else {
          const right = currentQuestion.correct_answer;
          soundManager.playWrongSound(right);
          setMcCommentary(
            `MC Lại Văn Sâm: "Ôi rất tiếc! Đáp án chính xác phải là phương án ${right}!"`
          );

          const rightText =
            right === 'A'
              ? currentQuestion.option_a
              : right === 'B'
              ? currentQuestion.option_b
              : right === 'C'
              ? currentQuestion.option_c
              : currentQuestion.option_d;

          nextStepTimeoutRef.current = setTimeout(() => {
            handleGameOver({
              prize: getSafetyPrize(currentLevel),
              reachedLevel: currentLevel,
              isWin: false,
              walkedAway: false,
              status: 'lost',
              correctAnswer: right,
              correctOptionText: rightText,
            });
          }, 1900);
        }
      }, suspenseDelay);
    },
    [
      gameState,
      isLoadingQuestion,
      currentQuestion,
      answerPhase,
      hiddenOptions,
      currentLevel,
      loadQuestionForLevel,
      handleGameOver,
    ]
  );

  // Guarded keyboard shortcuts (A/B/C/D and 1/2/3/4)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing' || activeModal !== 'none') return;
      const target = e.target as HTMLElement | null;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLSelectElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable
      ) {
        return;
      }

      const key = e.key.toUpperCase();
      if (key === 'A' || key === '1') handleSelectAnswer('A');
      else if (key === 'B' || key === '2') handleSelectAnswer('B');
      else if (key === 'C' || key === '3') handleSelectAnswer('C');
      else if (key === 'D' || key === '4') handleSelectAnswer('D');
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [gameState, activeModal, handleSelectAnswer]);

  // Lifelines handlers
  const handleUse5050 = () => {
    if (used5050 || !currentQuestion || answerPhase !== 'idle' || isLoadingQuestion) return;
    const all: Choice[] = ['A', 'B', 'C', 'D'];
    const wrong = all.filter((c) => c !== currentQuestion.correct_answer);
    const shuffled = [...wrong].sort(() => Math.random() - 0.5);
    setHiddenOptions(shuffled.slice(0, 2));
    setUsed5050(true);
    soundManager.play5050();
    setMcCommentary('MC Lại Văn Sâm: "Máy tính đã loại bỏ hai phương án sai cho bạn!"');
  };

  const openLifelineModal = (
    type: 'phone' | 'companion' | 'sage',
    markUsed: () => void,
    playAudio: () => void,
    label: string
  ) => {
    if (!currentQuestion || answerPhase !== 'idle' || isLoadingQuestion) return;
    setIsTimerPaused(true);
    markUsed();
    playAudio();
    setMcCommentary(`MC Lại Văn Sâm: "Kết nối quyền trợ giúp ${label} — đồng hồ tạm dừng!"`);
    setActiveModal(type);
  };

  const handleCloseLifelineModal = () => {
    setActiveModal('none');
    setTimeLeft((prev) => Math.max(prev, 20));
    setIsTimerPaused(false);
  };

  const handleSelectAnswerFromLifeline = (choice: Choice) => {
    setActiveModal('none');
    handleSelectAnswer(choice);
  };

  const handleContinueAfterCheck = () => {
    setActiveModal('none');
    if (currentLevel >= 15) {
      handleGameOver({
        prize: getPrizeForLevel(15),
        reachedLevel: 15,
        isWin: true,
        walkedAway: false,
        status: 'won',
      });
    } else {
      loadQuestionForLevel(currentLevel + 1);
    }
  };

  const handleOpenWalkAway = () => {
    if (answerPhase !== 'idle' || isLoadingQuestion) return;
    setIsTimerPaused(true);
    setActiveModal('walkaway');
  };

  const handleCancelWalkAway = () => {
    setActiveModal('none');
    setTimeLeft((prev) => Math.max(prev, 15));
    setIsTimerPaused(false);
  };

  const handleConfirmWalkAway = () => {
    setActiveModal('none');
    handleGameOver({
      prize: walkAwayPrize,
      reachedLevel: currentLevel,
      isWin: false,
      walkedAway: true,
      status: 'walked_away',
    });
  };

  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const handleBackToLobby = () => {
    clearPendingTimers();
    soundManager.stopAll();
    setActiveModal('none');
    setGameState('lobby');
  };

  // Compute SVG Arc Clock Stroke
  const clockRadius = 24;
  const clockCircumference = 2 * Math.PI * clockRadius;
  const clockProgress = Math.max(0, Math.min(1, timeLeft / QUESTION_DURATION));
  const clockDashOffset = clockCircumference * (1 - clockProgress);
  const clockColor =
    timeLeft <= 10 ? '#ef4444' : timeLeft <= 15 ? '#f59e0b' : '#38bdf8';

  const getOptionStatus = (choice: Choice) => {
    if (hiddenOptions.includes(choice)) return 'hidden' as const;
    if (answerPhase === 'revealed' && currentQuestion) {
      if (choice === currentQuestion.correct_answer) return 'correct' as const;
      if (choice === selectedAnswer) return 'wrong' as const;
      return 'idle' as const;
    }
    if (selectedAnswer === choice) return 'selected' as const;
    return 'idle' as const;
  };

  const answerTextMap: Record<Choice, string> = currentQuestion
    ? {
        A: currentQuestion.option_a,
        B: currentQuestion.option_b,
        C: currentQuestion.option_c,
        D: currentQuestion.option_d,
      }
    : { A: '', B: '', C: '', D: '' };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden text-white flex flex-col safe-area-padding">
      {/* Watermark-free Animated VTV3 Studio Arena */}
      <StudioStage />

      {/* ================================================= */}
      {/* LOBBY SCREEN                                      */}
      {/* ================================================= */}
      {gameState === 'lobby' && (
        <main className="relative z-10 flex-1 flex flex-col justify-between px-3 sm:px-6 py-4 sm:py-6 max-w-6xl w-full mx-auto">
          {/* Top Utility Controls */}
          <div className="flex items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/35 bg-blue-950/60 px-3 py-1 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-sky-200">
                Trường quay VTV3 trực tuyến
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleSound}
                aria-label={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
                className="flex items-center gap-1.5 rounded-full border border-sky-400/35 bg-blue-950/70 px-3 py-1.5 text-xs font-semibold text-sky-100 hover:bg-blue-900/80 transition-colors cursor-pointer"
              >
                {isMuted ? (
                  <SoundOffIcon className="h-4 w-4 text-rose-400" />
                ) : (
                  <SoundOnIcon className="h-4 w-4 text-amber-300" />
                )}
                <span className="hidden xs:inline">{isMuted ? 'Đang tắt' : 'Âm thanh'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModal('leaderboard')}
                className="flex items-center gap-1.5 rounded-full border border-amber-400/45 bg-amber-500/15 px-3 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-500/25 transition-colors cursor-pointer"
              >
                <TrophyIcon className="h-4 w-4" />
                <span className="hidden xs:inline">Bảng Vàng</span>
              </button>
            </div>
          </div>

          {/* Center Hero Stage */}
          <div className="my-auto py-4 sm:py-8 flex flex-col items-center text-center">
            <div className="mb-4 sm:mb-6">
              <VTV3LogoCrest size="xl" />
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/50 bg-amber-500/15 px-3.5 py-1 text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.2em] text-amber-300 mb-3">
              <SparkleIcon className="w-3.5 h-3.5" />
              <span>15.000 CÂU HỎI THUẦN VIỆT • CHUẨN 4 TẦNG</span>
            </div>

            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white drop-shadow-[0_4px_20px_rgba(37,99,235,0.65)] max-w-3xl leading-tight">
              CHINH PHỤC ĐỈNH CAO{' '}
              <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                TRIỆU PHÚ TRI THỨC
              </span>
            </h1>

            <p className="mt-3 text-xs sm:text-base text-sky-100/85 max-w-2xl leading-relaxed">
              Vượt qua 15 câu hỏi với âm thanh dẫn dắt từ MC Lại Văn Sâm, độ khó 4 tầng chuẩn VTV3 và
              4 quyền trợ giúp kinh điển để chạm tay tới tấm séc 150.000.000 VNĐ.
            </p>

            {/* Primary CTA Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md sm:max-w-xl">
              <button
                type="button"
                onClick={() => setActiveModal('setup')}
                className="w-full sm:w-auto flex-1 rounded-2xl border-2 border-amber-200 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 px-7 py-3.5 font-display text-sm sm:text-base font-black uppercase tracking-wider text-slate-950 shadow-[0_0_32px_rgba(245,158,11,0.55)] hover:from-amber-400 hover:to-yellow-300 active:scale-[0.98] transition-all cursor-pointer"
              >
                BẮT ĐẦU NGỒI GHẾ NÓNG
              </button>

              <button
                type="button"
                onClick={() => setActiveModal('leaderboard')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl border border-sky-300/50 bg-blue-950/75 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-100 hover:bg-blue-900/80 backdrop-blur-md transition-all cursor-pointer"
              >
                <TrophyIcon className="w-4 h-4 text-amber-300" />
                <span>BẢNG VÀNG TRIỆU PHÚ</span>
              </button>
            </div>
          </div>

          {/* Showcase 4 Classic VTV3 Lifelines */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 pt-2">
            {[
              {
                kind: '5050' as const,
                title: 'Trợ giúp 50:50',
                desc: 'Loại bỏ trực tiếp 2 phương án nhiễu sai',
              },
              {
                kind: 'phone' as const,
                title: 'Gọi điện người thân',
                desc: 'Kết nối đường dây nóng nghe tư vấn 30 giây',
              },
              {
                kind: 'companion' as const,
                title: 'Người đồng hành',
                desc: 'Cùng trao đổi sở trường ngay trên ghế nóng',
              },
              {
                kind: 'sage' as const,
                title: '2 Nhà Thông Thái',
                desc: 'Mở khóa từ Câu 6 để hỏi tổ chuyên gia',
              },
            ].map((item) => (
              <div
                key={item.kind}
                className="flex items-center gap-2.5 rounded-xl border border-sky-400/25 bg-[#061036]/75 p-2.5 sm:p-3 backdrop-blur-md"
              >
                <LifelineMedallion
                  kind={item.kind}
                  used={false}
                  locked={item.kind === 'sage'}
                  className="w-12 h-8 sm:w-14 sm:h-9 flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-[11px] sm:text-xs font-extrabold text-amber-300 truncate">
                    {item.title}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-sky-200/75 line-clamp-2 leading-tight">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* ================================================= */}
      {/* IN-GAME HOT SEAT ARENA                            */}
      {/* ================================================= */}
      {gameState === 'playing' && setup && (
        <div className="relative z-10 flex-1 flex flex-col max-w-7xl w-full mx-auto px-3 sm:px-5 py-2 sm:py-3.5 justify-between">
          {/* Broadcast Top Control Header */}
          <header className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-sky-400/30 bg-[#040c2b]/85 px-2.5 sm:px-4 py-2 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.65)]">
            {/* Left: Compact Crest + Contestant Info + Safe Prize */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <VTV3LogoCrest size="sm" className="flex-shrink-0" />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-display text-xs sm:text-sm font-black uppercase text-white truncate max-w-[130px] sm:max-w-[200px]">
                    {setup.playerName}
                  </span>
                  {safetyPrize > 0 && (
                    <span className="rounded-full border border-emerald-400/50 bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 whitespace-nowrap">
                      Bảo toàn: {formatVnd(safetyPrize)}
                    </span>
                  )}
                </div>
                <p className="text-[10px] sm:text-xs text-sky-200/75 truncate">
                  Đồng hành: <strong className="text-amber-300">{setup.companionName}</strong> (
                  {setup.companionRelation})
                </p>
              </div>
            </div>

            {/* Right Utility Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <button
                type="button"
                onClick={handleToggleSound}
                aria-label={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
                className="flex items-center gap-1 rounded-xl border border-sky-400/35 bg-blue-950/75 px-2.5 py-1.5 text-xs font-semibold text-sky-100 hover:bg-blue-900 cursor-pointer"
              >
                {isMuted ? (
                  <SoundOffIcon className="h-4 w-4 text-rose-400" />
                ) : (
                  <SoundOnIcon className="h-4 w-4 text-amber-300" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveModal('leaderboard')}
                aria-label="Mở bảng xếp hạng"
                className="flex items-center gap-1 rounded-xl border border-amber-400/40 bg-amber-500/15 px-2.5 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-500/25 cursor-pointer"
              >
                <TrophyIcon className="h-4 w-4" />
                <span className="hidden md:inline">Bảng Vàng</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileLadderOpen(true)}
                className="lg:hidden flex items-center gap-1 rounded-xl border border-amber-400/50 bg-amber-500/20 px-2.5 py-1.5 text-xs font-bold text-amber-200 cursor-pointer"
              >
                <LadderIcon className="h-4 w-4" />
                <span>{currentPrizeLevel?.prizeFormatted}</span>
              </button>

              <button
                type="button"
                onClick={handleOpenWalkAway}
                disabled={answerPhase !== 'idle' || isLoadingQuestion}
                className="flex items-center gap-1 rounded-xl border border-rose-400/50 bg-rose-600/25 hover:bg-rose-600/40 disabled:opacity-45 px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-bold text-rose-200 transition-colors cursor-pointer"
              >
                <WalkAwayIcon className="h-3.5 h-3.5 sm:h-4 sm:w-4" />
                <span>Dừng cuộc chơi</span>
              </button>
            </div>
          </header>

          {/* Main Broadcast Body: Center Stage + Right VTV3 Money Tree */}
          <div className="flex-1 flex flex-col lg:flex-row gap-3 sm:gap-5 py-2 sm:py-4 items-stretch justify-between min-h-0">
            {/* Left/Center Arena */}
            <section className="flex-1 flex flex-col justify-between gap-3 sm:gap-4 min-w-0">
              {/* Top Arena: 4 Lifelines Bar + Live 30s SVG Arc Clock */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 rounded-2xl border border-sky-400/25 bg-[#050d30]/75 px-3 sm:px-4 py-2.5 backdrop-blur-md">
                {/* 4 Classic Metallic Oval Lifelines */}
                <div className="grid grid-cols-4 gap-1 sm:gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleUse5050}
                    disabled={used5050 || answerPhase !== 'idle' || isLoadingQuestion}
                    title="Loại bỏ 2 đáp án sai (50:50)"
                    className="flex flex-col items-center gap-0.5 cursor-pointer disabled:cursor-default group"
                  >
                    <LifelineMedallion
                      kind="5050"
                      used={used5050}
                      className="w-11 h-7 sm:w-16 sm:h-10 group-hover:scale-105 transition-transform"
                    />
                    <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-tight sm:tracking-normal text-sky-200/85 text-center leading-tight">
                      50:50
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      openLifelineModal(
                        'phone',
                        () => setUsedPhone(true),
                        () => soundManager.playCallFriend(),
                        'Gọi điện người thân'
                      )
                    }
                    disabled={usedPhone || answerPhase !== 'idle' || isLoadingQuestion}
                    title="Gọi điện thoại cho người thân"
                    className="flex flex-col items-center gap-0.5 cursor-pointer disabled:cursor-default group"
                  >
                    <LifelineMedallion
                      kind="phone"
                      used={usedPhone}
                      className="w-11 h-7 sm:w-16 sm:h-10 group-hover:scale-105 transition-transform"
                    />
                    <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-tight sm:tracking-normal text-sky-200/85 text-center leading-tight">
                      Gọi điện
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      openLifelineModal(
                        'companion',
                        () => setUsedCompanion(true),
                        () => soundManager.playAskAudience(),
                        'Hỏi người đồng hành'
                      )
                    }
                    disabled={usedCompanion || answerPhase !== 'idle' || isLoadingQuestion}
                    title="Hỏi ý kiến người đồng hành trên ghế nóng"
                    className="flex flex-col items-center gap-0.5 cursor-pointer disabled:cursor-default group"
                  >
                    <LifelineMedallion
                      kind="companion"
                      used={usedCompanion}
                      className="w-11 h-7 sm:w-16 sm:h-10 group-hover:scale-105 transition-transform"
                    />
                    <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-tight sm:tracking-normal text-sky-200/85 text-center leading-tight">
                      Đồng hành
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      openLifelineModal(
                        'sage',
                        () => setUsedSage(true),
                        () => soundManager.playWiseMen(),
                        'Tổ tư vấn 2 Nhà Thông Thái'
                      )
                    }
                    disabled={
                      currentLevel < 6 ||
                      usedSage ||
                      answerPhase !== 'idle' ||
                      isLoadingQuestion
                    }
                    title={
                      currentLevel < 6
                        ? 'Mở khóa từ Câu hỏi số 6'
                        : 'Hỏi tổ tư vấn 2 Nhà Thông Thái'
                    }
                    className="flex flex-col items-center gap-0.5 cursor-pointer disabled:cursor-default group"
                  >
                    <LifelineMedallion
                      kind="sage"
                      used={usedSage}
                      locked={currentLevel < 6}
                      className="w-11 h-7 sm:w-16 sm:h-10 group-hover:scale-105 transition-transform"
                    />
                    <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-tight sm:tracking-normal text-amber-300/90 text-center leading-tight">
                      Tổ tư vấn
                    </span>
                  </button>
                </div>

                {/* Live 30s SVG Arc Countdown Clock */}
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] uppercase tracking-wider text-sky-200/75 font-bold">
                      {isTimerPaused || activeModal !== 'none'
                        ? 'TRẠNG THÁI'
                        : 'THỜI GIAN SUY NGHĨ'}
                    </p>
                    <p className="text-xs font-extrabold text-amber-300">
                      {isTimerPaused || activeModal !== 'none'
                        ? 'TẠM DỪNG'
                        : `${currentPrizeLevel?.prizeFormatted ?? ''}`}
                    </p>
                  </div>

                  <div
                    className={`relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 ${
                      timeLeft <= 10 && !isTimerPaused && answerPhase === 'idle'
                        ? 'animate-pulse'
                        : ''
                    }`}
                  >
                    <svg viewBox="0 0 60 60" className="w-full h-full -rotate-90">
                      <circle
                        cx="30"
                        cy="30"
                        r={clockRadius}
                        fill="#030921"
                        stroke="rgba(148,163,184,0.22)"
                        strokeWidth="4.5"
                      />
                      <circle
                        cx="30"
                        cy="30"
                        r={clockRadius}
                        fill="none"
                        stroke={clockColor}
                        strokeWidth="4.5"
                        strokeLinecap="round"
                        strokeDasharray={clockCircumference}
                        strokeDashoffset={clockDashOffset}
                        className="transition-all duration-700 ease-linear"
                      />
                    </svg>
                    <span
                      className={`font-clock absolute text-base sm:text-lg font-black ${
                        timeLeft <= 10
                          ? 'text-rose-400'
                          : timeLeft <= 15
                          ? 'text-amber-300'
                          : 'text-cyan-300'
                      }`}
                    >
                      {String(timeLeft).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Studio Centerpiece: MC Lại Văn Sâm Broadcast Commentary Ticker */}
              <div className="my-auto flex flex-col items-center justify-center px-2 py-2 sm:py-4">
                <div className="w-full max-w-2xl rounded-2xl border border-amber-400/30 bg-gradient-to-r from-[#06113b]/80 via-[#0d1f66]/85 to-[#06113b]/80 px-3.5 sm:px-5 py-2.5 sm:py-3 text-center shadow-[0_0_24px_rgba(37,99,235,0.3)] backdrop-blur-md">
                  <div className="mb-1 inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-amber-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
                    <span>TRƯỜNG QUAY S14 • ĐANG PHÁT SÓNG</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-sky-50 leading-relaxed">
                    {mcCommentary}
                  </p>
                </div>
              </div>

              {/* Authentic VTV3 Lower-Third Question + 2x2 Hexagonal Answer Matrix */}
              <div className="space-y-3 sm:space-y-3.5">
                <QuestionLozenge
                  level={currentLevel}
                  category={getDisplayCategory(currentQuestion?.category || '')}
                  question={currentQuestion?.question || ''}
                  isMilestone={currentPrizeLevel?.isMilestone}
                  isLoading={isLoadingQuestion}
                />

                {/* Row 1: A & B with full-width metallic wing line */}
                <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-5 items-center">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none hidden sm:block absolute top-1/2 -left-8 -right-8 h-[2px] -translate-y-1/2 bg-gradient-to-r from-transparent via-sky-300/65 to-transparent"
                  />
                  {(['A', 'B'] as Choice[]).map((choice) => (
                    <AnswerLozenge
                      key={`${currentLevel}-${currentQuestion?.question || ''}-${choice}`}
                      letter={choice}
                      text={answerTextMap[choice]}
                      status={getOptionStatus(choice)}
                      disabled={isLoadingQuestion || answerPhase !== 'idle'}
                      onClick={() => handleSelectAnswer(choice)}
                    />
                  ))}
                </div>

                {/* Row 2: C & D with full-width metallic wing line */}
                <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-5 items-center">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none hidden sm:block absolute top-1/2 -left-8 -right-8 h-[2px] -translate-y-1/2 bg-gradient-to-r from-transparent via-sky-300/65 to-transparent"
                  />
                  {(['C', 'D'] as Choice[]).map((choice) => (
                    <AnswerLozenge
                      key={`${currentLevel}-${currentQuestion?.question || ''}-${choice}`}
                      letter={choice}
                      text={answerTextMap[choice]}
                      status={getOptionStatus(choice)}
                      disabled={isLoadingQuestion || answerPhase !== 'idle'}
                      onClick={() => handleSelectAnswer(choice)}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Right-Side Classic VTV3 Money Ladder */}
            <MoneyLadder
              currentLevel={currentLevel}
              isOpenMobile={mobileLadderOpen}
              onCloseMobile={() => setMobileLadderOpen(false)}
            />
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* MODALS                                            */}
      {/* ================================================= */}
      {activeModal === 'setup' && (
        <SetupModal onStart={handleStartGame} onCancel={() => setActiveModal('none')} />
      )}

      {activeModal === 'leaderboard' && (
        <LeaderboardModal isOpen onClose={() => setActiveModal('none')} />
      )}

      {activeModal === 'phone' && setup && currentQuestion && (
        <PhoneModal
          setup={setup}
          question={currentQuestion}
          hiddenOptions={hiddenOptions}
          onClose={handleCloseLifelineModal}
          onSelectAnswer={handleSelectAnswerFromLifeline}
        />
      )}

      {activeModal === 'companion' && setup && currentQuestion && (
        <CompanionModal
          setup={setup}
          question={currentQuestion}
          hiddenOptions={hiddenOptions}
          onClose={handleCloseLifelineModal}
          onSelectAnswer={handleSelectAnswerFromLifeline}
        />
      )}

      {activeModal === 'sage' && setup && currentQuestion && (
        <SageModal
          setup={setup}
          question={currentQuestion}
          hiddenOptions={hiddenOptions}
          onClose={handleCloseLifelineModal}
          onSelectAnswer={handleSelectAnswerFromLifeline}
        />
      )}

      {activeModal === 'check' && setup && checkInfo && (
        <CheckModal
          playerName={setup.playerName}
          level={checkInfo.level}
          prizeFormatted={checkInfo.prizeFormatted}
          onContinue={handleContinueAfterCheck}
        />
      )}

      {/* In-Studio Walk-Away Confirmation Modal (replaces native window.confirm) */}
      {activeModal === 'walkaway' && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-2 sm:p-4 flex items-center justify-center animate-fade-in">
          <div className="relative w-full max-w-md my-auto rounded-2xl border-2 border-amber-400/80 bg-gradient-to-b from-[#0b1f63] via-[#061038] to-[#020514] p-5 sm:p-6 text-white shadow-[0_0_50px_rgba(245,158,11,0.35)]">
            <div className="flex items-center gap-3 border-b border-sky-400/25 pb-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-400/60 bg-amber-500/20 text-amber-300 flex-shrink-0">
                <WalkAwayIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-base sm:text-lg font-black uppercase text-amber-300">
                  XÁC NHẬN DỪNG CUỘC CHƠI
                </h3>
                <p className="text-xs text-sky-200/80">
                  Câu hỏi hiện tại: Câu số {currentLevel} / 15
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-sky-100 leading-relaxed">
              Nếu quyết định dừng cuộc chơi ngay lúc này, bạn sẽ bảo toàn trọn vẹn số tiền thưởng
              từ câu hỏi trước đó:
            </p>

            <div className="my-4 rounded-xl border border-amber-400/45 bg-amber-500/10 py-3 px-4 text-center">
              <p className="text-[11px] uppercase tracking-wider text-amber-200/80">
                Tiền thưởng mang về an toàn
              </p>
              <p className="font-clock mt-1 text-2xl font-black text-amber-300">
                {formatVnd(walkAwayPrize)}
              </p>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-2.5 justify-end">
              <button
                type="button"
                onClick={handleCancelWalkAway}
                className="w-full sm:w-auto rounded-xl border border-sky-400/45 bg-blue-950/80 px-4 py-2 text-xs sm:text-sm font-bold text-sky-100 hover:bg-blue-900 cursor-pointer"
              >
                Tiếp tục thi đấu
              </button>
              <button
                type="button"
                onClick={handleConfirmWalkAway}
                className="w-full sm:w-auto rounded-xl border border-rose-300/70 bg-gradient-to-r from-rose-600 to-red-600 px-5 py-2 text-xs sm:text-sm font-black uppercase tracking-wider text-white hover:from-rose-500 hover:to-red-500 shadow-lg cursor-pointer"
              >
                Chốt dừng cuộc chơi
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'gameover' && setup && gameOverInfo && (
        <GameOverModal
          playerName={setup.playerName}
          finalPrize={gameOverInfo.prize}
          finalPrizeFormatted={formatVnd(gameOverInfo.prize)}
          reachedLevel={gameOverInfo.reachedLevel}
          isWin={gameOverInfo.isWin}
          walkedAway={gameOverInfo.walkedAway}
          correctAnswer={gameOverInfo.correctAnswer}
          correctOptionText={gameOverInfo.correctOptionText}
          onPlayAgain={() => setActiveModal('setup')}
          onViewLeaderboard={() => setActiveModal('leaderboard')}
          onBackToLobby={handleBackToLobby}
        />
      )}
    </div>
  );
}
