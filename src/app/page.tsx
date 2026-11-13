// src/app/page.tsx
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { GameSetup, Question, PRIZE_LADDER, PrizeLevel } from '@/types/game';
import { getRandomQuestion } from '@/lib/questionService';
import { soundManager } from '@/lib/soundManager';
import { supabase } from '@/lib/supabase';
import { SetupModal } from '@/components/SetupModal';
import { MoneyLadder } from '@/components/MoneyLadder';
import { CheckModal } from '@/components/CheckModal';
import { PhoneModal, CompanionModal, SageModal } from '@/components/LifelineModals';
import { GameOverModal } from '@/components/GameOverModal';
import { LeaderboardModal } from '@/components/LeaderboardModal';

export default function GamePage() {
  // Game Setup & Status
  const [setup, setSetup] = useState<GameSetup | null>(null);
  const [gameState, setGameState] = useState<
    'setup' | 'playing' | 'revealing' | 'correct' | 'wrong' | 'gameover'
  >('setup');

  // Question & Answers
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [hiddenAnswers, setHiddenAnswers] = useState<('A' | 'B' | 'C' | 'D')[]>([]);

  // Lifelines
  const [lifeline5050, setLifeline5050] = useState<boolean>(true);
  const [lifelinePhone, setLifelinePhone] = useState<boolean>(true);
  const [lifelineCompanion, setLifelineCompanion] = useState<boolean>(true);
  const [lifelineSage, setLifelineSage] = useState<boolean>(true); // unlocks at level 6

  // Timer
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Modals & Overlays
  const [activeModal, setActiveModal] = useState<
    'none' | 'phone' | 'companion' | 'sage' | 'check' | 'gameover' | 'leaderboard'
  >('none');
  const [checkAmount, setCheckAmount] = useState<number>(22000000);
  const [checkLevel, setCheckLevel] = useState<number>(10);
  const [ladderOpen, setLadderOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Results
  const [finalPrize, setFinalPrize] = useState<number>(0);
  const [isVictory, setIsVictory] = useState<boolean>(false);
  const [isWalkAway, setIsWalkAway] = useState<boolean>(false);

  // Handle Game Over
  const handleGameOver = useCallback(async (isWon: boolean, walkedAway: boolean) => {
    setGameState('gameover');
    if (timerRef.current) clearInterval(timerRef.current);

    let prize = 0;
    if (isWon) {
      prize = 150000000;
    } else if (walkedAway) {
      if (currentLevel > 1) {
        const prevTier = PRIZE_LADDER.find((p) => p.level === currentLevel - 1);
        prize = prevTier ? prevTier.prize : 0;
      }
    } else {
      // Fallback to guaranteed milestone
      if (currentLevel > 10) {
        prize = 22000000;
      } else if (currentLevel > 5) {
        prize = 2000000;
      } else {
        prize = 0;
      }
    }

    setFinalPrize(prize);
    setIsVictory(isWon);
    setIsWalkAway(walkedAway);
    setActiveModal('gameover');

    // Sync score to Supabase
    try {
      if (setup) {
        await supabase.from('game_sessions').insert([
          {
            player_name: setup.playerName,
            companion_name: setup.companionName,
            companion_relation: setup.companionRelation,
            companion_field: setup.companionField,
            phone_friend_name: setup.phoneFriendName,
            sage1_name: setup.sage1Name,
            sage1_field: setup.sage1Field,
            sage2_name: setup.sage2Name,
            sage2_field: setup.sage2Field,
            current_level: isWon ? 15 : currentLevel - 1,
            prize_won: prize,
            has_check: prize >= 22000000,
            status: isWon ? 'won' : walkedAway ? 'quit' : 'lost'
          }
        ]);
      }
    } catch (err) {
      console.error('Failed to save score:', err);
    }
  }, [currentLevel, setup]);

  // Load question for a level
  const loadQuestionForLevel = useCallback(async (level: number) => {
    try {
      setSelectedAnswer(null);
      setHiddenAnswers([]);
      setTimeLeft(30);
      setGameState('playing');

      const q = await getRandomQuestion(level);
      setCurrentQuestion(q);

      // Play level BGM and Question announcement sound
      soundManager.playBGM(level);
      soundManager.playQuestionSound(level);

      // Start 30s timer
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            soundManager.playOutOfTime();
            handleGameOver(false, false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      console.error('Error loading question:', err);
    }
  }, [handleGameOver]);

  // Start game with setup
  const handleStartGame = (gameSetup: GameSetup) => {
    setSetup(gameSetup);
    setCurrentLevel(1);
    setLifeline5050(true);
    setLifelinePhone(true);
    setLifelineCompanion(true);
    setLifelineSage(true);
    loadQuestionForLevel(1);
  };

  // Answer selection
  const handleSelectAnswer = async (choice: 'A' | 'B' | 'C' | 'D') => {
    if (gameState !== 'playing' || !currentQuestion) return;

    // Stop timer
    if (timerRef.current) clearInterval(timerRef.current);

    setSelectedAnswer(choice);
    setGameState('revealing');
    soundManager.playAnswerSound(choice);

    // Suspense delay
    const isMilestone = currentLevel === 5 || currentLevel === 10 || currentLevel === 15;
    if (isMilestone) {
      soundManager.playSuspense();
    }

    const delay = isMilestone ? 2800 : 1600;

    setTimeout(async () => {
      const isCorrect = choice === currentQuestion.correct_answer;

      if (isCorrect) {
        setGameState('correct');
        await soundManager.playCorrectSound(choice);

        // Confetti effect
        try {
          confetti({
            particleCount: isMilestone ? 120 : 60,
            spread: isMilestone ? 100 : 70,
            origin: { y: 0.6 }
          });
        } catch {}

        // Check Milestone celebrations
        if (currentLevel === 5) {
          await soundManager.playMilestone1();
          setTimeout(() => {
            setCurrentLevel(6);
            loadQuestionForLevel(6);
          }, 1500);
        } else if (currentLevel === 10) {
          await soundManager.playMilestone2();
          setCheckAmount(22000000);
          setCheckLevel(10);
          setActiveModal('check');
        } else if (currentLevel === 15) {
          await soundManager.playMilestone2();
          setCheckAmount(150000000);
          setCheckLevel(15);
          setActiveModal('check');
        } else {
          // Regular level progress
          setTimeout(() => {
            const nextLv = currentLevel + 1;
            setCurrentLevel(nextLv);
            loadQuestionForLevel(nextLv);
          }, 1400);
        }
      } else {
        // Wrong answer
        setGameState('wrong');
        await soundManager.playWrongSound();
        setTimeout(() => {
          handleGameOver(false, false);
        }, 1500);
      }
    }, delay);
  };

  // Walk Away (Dừng cuộc chơi)
  const handleWalkAway = () => {
    if (gameState !== 'playing') return;
    const confirmWalk = confirm(
      'Bạn có chắc chắn muốn DỪNG CUỘC CHƠI và bảo toàn số tiền thưởng hiện tại không?'
    );
    if (confirmWalk) {
      handleGameOver(false, true);
    }
  };

  // Lifeline: 50:50
  const handleUse5050 = () => {
    if (!lifeline5050 || gameState !== 'playing' || !currentQuestion) return;
    soundManager.play5050();
    const options: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
    const wrongOptions = options.filter((o) => o !== currentQuestion.correct_answer);
    // Shuffle and pick 2 to hide
    const toHide = wrongOptions.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenAnswers(toHide);
    setLifeline5050(false);
  };

  // Lifeline: Phone Friend
  const handleUsePhone = () => {
    if (!lifelinePhone || gameState !== 'playing' || !currentQuestion) return;
    soundManager.playCallFriend();
    setActiveModal('phone');
    setLifelinePhone(false);
  };

  // Lifeline: Companion
  const handleUseCompanion = () => {
    if (!lifelineCompanion || gameState !== 'playing' || !currentQuestion) return;
    soundManager.playCallFriend();
    setActiveModal('companion');
    setLifelineCompanion(false);
  };

  // Lifeline: Wise Men (Only level 6+)
  const handleUseSage = () => {
    if (currentLevel < 6) {
      alert('Quyền trợ giúp Nhà Thông Thái chỉ được mở khóa từ câu hỏi số 6 trở đi!');
      return;
    }
    if (!lifelineSage || gameState !== 'playing' || !currentQuestion) return;
    soundManager.playWiseMen();
    setActiveModal('sage');
    setLifelineSage(false);
  };

  // Toggle Sound
  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  // Close Check Modal
  const handleCloseCheck = () => {
    setActiveModal('none');
    if (currentLevel === 15) {
      handleGameOver(true, false);
    } else {
      const nextLv = currentLevel + 1;
      setCurrentLevel(nextLv);
      loadQuestionForLevel(nextLv);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      soundManager.stopBGM();
      soundManager.stopSFX();
    };
  }, []);

  const currentPrizeItem = PRIZE_LADDER.find((p) => p.level === currentLevel);

  return (
    <main className="relative min-h-screen w-full bg-[#050714] text-white flex flex-col justify-between overflow-x-hidden font-sans select-none">
      {/* Studio Background Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-indigo-950/40 to-black pointer-events-none" />

      {/* Top Navbar */}
      <header className="relative z-20 w-full px-4 sm:px-8 py-3 bg-black/60 backdrop-blur-md border-b border-yellow-500/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-600 to-amber-300 p-0.5 shadow-[0_0_15px_rgba(250,204,21,0.5)]">
            <div className="w-full h-full rounded-full bg-blue-950 flex items-center justify-center font-bold text-xs text-yellow-300">
              ALTP
            </div>
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-black tracking-wider text-yellow-400 uppercase">
              AI LÀ TRIỆU PHÚ
            </h1>
            <p className="text-[11px] text-gray-400">
              Người chơi: <strong className="text-white">{setup?.playerName || '---'}</strong>
            </p>
          </div>
        </div>

        {/* Center Countdown Timer */}
        {gameState !== 'setup' && (
          <div className="flex items-center gap-2">
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border-4 flex items-center justify-center font-mono font-black text-lg sm:text-xl shadow-lg transition-colors ${
                timeLeft <= 5
                  ? 'border-red-500 text-red-400 bg-red-950/40 animate-ping'
                  : timeLeft <= 10
                  ? 'border-amber-500 text-amber-400 bg-amber-950/30'
                  : 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
              }`}
            >
              {timeLeft}
            </div>
          </div>
        )}

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleToggleSound}
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs flex items-center gap-1.5 transition-all"
          >
            <span>{isMuted ? '🔇' : '🔊'}</span>
            <span className="hidden sm:inline text-gray-300 font-medium">
              {isMuted ? 'Tắt' : 'Bật'}
            </span>
          </button>

          <button
            onClick={() => setActiveModal('leaderboard')}
            className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/40 text-yellow-300 text-xs font-bold transition-all"
          >
            🏆 Bảng Vàng
          </button>

          <button
            onClick={() => setLadderOpen(true)}
            className="lg:hidden p-2 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-400 text-cyan-300 text-xs font-bold"
          >
            ☰ Mốc Thưởng
          </button>
        </div>
      </header>

      {/* Main Game Stage */}
      <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Left / Center Area: Lifelines + Question Box + Answers */}
        <div className="w-full lg:flex-1 flex flex-col items-center justify-center space-y-5">
          {/* Lifelines Bar */}
          <div className="w-full max-w-2xl bg-black/40 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-3 flex items-center justify-around gap-2 shadow-lg">
            {/* 50:50 */}
            <button
              disabled={!lifeline5050 || gameState !== 'playing'}
              onClick={handleUse5050}
              className={`flex flex-col items-center gap-1 transition-transform ${
                lifeline5050 && gameState === 'playing'
                  ? 'hover:scale-110 active:scale-95 cursor-pointer'
                  : 'opacity-40 grayscale cursor-not-allowed'
              }`}
            >
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-b from-blue-600 to-indigo-900 border-2 border-cyan-400 flex items-center justify-center font-black text-cyan-200 text-xs sm:text-sm shadow-[0_0_12px_rgba(34,211,238,0.5)]">
                50:50
              </div>
              <span className="text-[10px] text-gray-300 font-semibold">50 : 50</span>
            </button>

            {/* Gọi điện thoại */}
            <button
              disabled={!lifelinePhone || gameState !== 'playing'}
              onClick={handleUsePhone}
              className={`flex flex-col items-center gap-1 transition-transform ${
                lifelinePhone && gameState === 'playing'
                  ? 'hover:scale-110 active:scale-95 cursor-pointer'
                  : 'opacity-40 grayscale cursor-not-allowed'
              }`}
            >
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-b from-blue-600 to-indigo-900 border-2 border-cyan-400 flex items-center justify-center text-lg shadow-[0_0_12px_rgba(34,211,238,0.5)]">
                📞
              </div>
              <span className="text-[10px] text-gray-300 font-semibold truncate max-w-[65px]">
                {setup?.phoneFriendName || 'Người thân'}
              </span>
            </button>

            {/* Hỏi người đồng hành */}
            <button
              disabled={!lifelineCompanion || gameState !== 'playing'}
              onClick={handleUseCompanion}
              className={`flex flex-col items-center gap-1 transition-transform ${
                lifelineCompanion && gameState === 'playing'
                  ? 'hover:scale-110 active:scale-95 cursor-pointer'
                  : 'opacity-40 grayscale cursor-not-allowed'
              }`}
            >
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-b from-amber-600 to-yellow-900 border-2 border-amber-400 flex items-center justify-center text-lg shadow-[0_0_12px_rgba(251,191,36,0.5)]">
                🤝
              </div>
              <span className="text-[10px] text-amber-300 font-semibold truncate max-w-[65px]">
                {setup?.companionName || 'Đồng hành'}
              </span>
            </button>

            {/* Hỏi 2 Nhà Thông Thái (Unlocks level 6) */}
            <button
              disabled={!lifelineSage || gameState !== 'playing' || currentLevel < 6}
              onClick={handleUseSage}
              className={`relative flex flex-col items-center gap-1 transition-transform ${
                lifelineSage && gameState === 'playing' && currentLevel >= 6
                  ? 'hover:scale-110 active:scale-95 cursor-pointer'
                  : 'opacity-40 grayscale cursor-not-allowed'
              }`}
            >
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-b from-purple-600 to-indigo-950 border-2 border-yellow-400 flex items-center justify-center text-lg shadow-[0_0_15px_rgba(234,179,8,0.6)]">
                🧙‍♂️
              </div>
              {currentLevel < 6 && (
                <span className="absolute -top-1 -right-1 text-[9px] bg-red-600 text-white px-1 rounded-full font-bold">
                  🔒
                </span>
              )}
              <span className="text-[10px] text-yellow-300 font-bold">Thông thái</span>
            </button>

            {/* Dừng cuộc chơi */}
            <button
              disabled={gameState !== 'playing'}
              onClick={handleWalkAway}
              className={`flex flex-col items-center gap-1 transition-transform ${
                gameState === 'playing'
                  ? 'hover:scale-110 active:scale-95 cursor-pointer'
                  : 'opacity-40 grayscale cursor-not-allowed'
              }`}
            >
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-b from-red-600 to-rose-950 border-2 border-red-400 flex items-center justify-center text-lg shadow-[0_0_12px_rgba(244,63,94,0.5)]">
                🛑
              </div>
              <span className="text-[10px] text-red-300 font-semibold">Dừng chơi</span>
            </button>
          </div>

          {/* Question Box */}
          <div className="relative w-full max-w-3xl">
            {/* Question Header Badge */}
            <div className="flex items-center justify-between px-6 pb-2 text-xs">
              <span className="font-bold uppercase tracking-wider text-yellow-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
                CÂU HỎI SỐ {currentLevel} / 15
              </span>
              <span className="px-3 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 font-semibold text-[11px] uppercase tracking-wide">
                Chuyên đề: {currentQuestion?.category || 'Kiến thức chung'}
              </span>
            </div>

            {/* Hexagonal Styled Question Container */}
            <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#141d4a] via-[#0d143c] to-[#080d28] border-2 border-yellow-500/80 shadow-[0_0_35px_rgba(234,179,8,0.3)] text-center min-h-[140px] flex items-center justify-center">
              <p className="text-base sm:text-xl md:text-2xl font-bold text-white tracking-wide leading-relaxed">
                {currentQuestion ? currentQuestion.question : 'Đang tải câu hỏi từ kho tri thức...'}
              </p>
            </div>
          </div>

          {/* 4 Answers Grid */}
          <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {(['A', 'B', 'C', 'D'] as const).map((choice) => {
              const isHidden = hiddenAnswers.includes(choice);
              const isSelected = selectedAnswer === choice;
              const isCorrectAnswer = currentQuestion?.correct_answer === choice;

              let btnStyle =
                'bg-gradient-to-r from-[#0f173b] via-[#151f50] to-[#0f173b] border-cyan-500/50 text-white hover:border-yellow-400 hover:from-[#1b2663]';

              if (isHidden) {
                return (
                  <div
                    key={choice}
                    className="h-14 sm:h-16 rounded-2xl bg-black/20 border border-white/5 opacity-20 pointer-events-none"
                  />
                );
              }

              if (gameState === 'revealing' && isSelected) {
                // Pulsing yellow while waiting for MC reveal
                btnStyle =
                  'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 border-yellow-200 text-blue-950 font-black shadow-[0_0_25px_rgba(250,204,21,0.9)] animate-pulse';
              } else if (gameState === 'correct') {
                if (isCorrectAnswer) {
                  // Flashing green for correct answer
                  btnStyle =
                    'bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 border-green-200 text-white font-black shadow-[0_0_30px_rgba(34,197,94,0.9)] scale-[1.02]';
                }
              } else if (gameState === 'wrong') {
                if (isSelected) {
                  // Red for player's wrong pick
                  btnStyle =
                    'bg-gradient-to-r from-red-600 via-rose-500 to-red-600 border-red-200 text-white font-black shadow-[0_0_30px_rgba(239,68,68,0.9)]';
                } else if (isCorrectAnswer) {
                  // Green flashing to show correct one
                  btnStyle =
                    'bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 border-green-200 text-white font-black shadow-[0_0_30px_rgba(34,197,94,0.9)] animate-bounce';
                }
              }

              const choiceText =
                choice === 'A'
                  ? currentQuestion?.option_a
                  : choice === 'B'
                  ? currentQuestion?.option_b
                  : choice === 'C'
                  ? currentQuestion?.option_c
                  : currentQuestion?.option_d;

              return (
                <button
                  key={choice}
                  disabled={gameState !== 'playing'}
                  onClick={() => handleSelectAnswer(choice)}
                  className={`w-full min-h-[56px] sm:min-h-[64px] px-5 py-3 rounded-2xl border-2 flex items-center gap-3.5 text-left transition-all duration-200 shadow-md transform active:scale-95 ${btnStyle}`}
                >
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0 border ${
                      isSelected && gameState === 'revealing'
                        ? 'bg-blue-950 text-yellow-400 border-blue-900'
                        : 'bg-yellow-500/20 text-yellow-300 border-yellow-400/50'
                    }`}
                  >
                    {choice}
                  </span>
                  <span className="text-xs sm:text-sm md:text-base font-semibold leading-snug break-words">
                    {choiceText || '...'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Current Prize Indicator Ribbon */}
          <div className="w-full max-w-3xl pt-2 flex items-center justify-between text-xs sm:text-sm text-gray-300 px-4">
            <div>
              <span>Mốc hiện tại: </span>
              <strong className="text-yellow-400 font-mono text-base">
                {currentPrizeItem?.prizeFormatted}
              </strong>
            </div>
            <div>
              {currentLevel > 10 ? (
                <span className="text-emerald-400 font-semibold">✓ Bảo toàn Mốc 2: 22.000.000 ₫</span>
              ) : currentLevel > 5 ? (
                <span className="text-yellow-400 font-semibold">✓ Bảo toàn Mốc 1: 2.000.000 ₫</span>
              ) : (
                <span className="text-gray-400">Chưa đạt mốc bảo toàn</span>
              )}
            </div>
          </div>
        </div>

        {/* Right Side Money Ladder (Desktop) */}
        <div className="hidden lg:block w-72 flex-shrink-0">
          <MoneyLadder
            currentLevel={currentLevel}
            isOpen={ladderOpen}
            onClose={() => setLadderOpen(false)}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-20 w-full py-2.5 px-4 bg-black/60 border-t border-white/10 text-center text-[11px] text-gray-400">
        Bản quyền mô phỏng &quot;Ai Là Triệu Phú&quot; • Cơ sở dữ liệu 15.000 câu hỏi Supabase • Âm thanh chuẩn MC Lại Văn Sâm
      </footer>

      {/* Floating Ladder Drawer for Mobile */}
      <div className="lg:hidden">
        <MoneyLadder
          currentLevel={currentLevel}
          isOpen={ladderOpen}
          onClose={() => setLadderOpen(false)}
        />
      </div>

      {/* Modals */}
      {gameState === 'setup' && <SetupModal onStart={handleStartGame} />}

      {activeModal === 'phone' && setup && currentQuestion && (
        <PhoneModal
          setup={setup}
          question={currentQuestion}
          onClose={() => setActiveModal('none')}
        />
      )}

      {activeModal === 'companion' && setup && currentQuestion && (
        <CompanionModal
          setup={setup}
          question={currentQuestion}
          onClose={() => setActiveModal('none')}
        />
      )}

      {activeModal === 'sage' && setup && currentQuestion && (
        <SageModal
          setup={setup}
          question={currentQuestion}
          onClose={() => setActiveModal('none')}
        />
      )}

      {activeModal === 'check' && setup && (
        <CheckModal
          playerName={setup.playerName}
          amount={checkAmount}
          level={checkLevel}
          onClose={handleCloseCheck}
        />
      )}

      {activeModal === 'gameover' && setup && (
        <GameOverModal
          playerName={setup.playerName}
          finalPrize={finalPrize}
          levelReached={isVictory ? 15 : currentLevel}
          isVictory={isVictory}
          isWalkAway={isWalkAway}
          onRestart={() => setGameState('setup')}
          onViewLeaderboard={() => setActiveModal('leaderboard')}
        />
      )}

      {activeModal === 'leaderboard' && (
        <LeaderboardModal onClose={() => setActiveModal('none')} />
      )}
    </main>
  );
}
