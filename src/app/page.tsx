// src/app/page.tsx
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { GameSetup, Question, PRIZE_LADDER } from '@/types/game';
import { getRandomQuestion } from '@/lib/questionService';
import { soundManager } from '@/lib/soundManager';
import { supabase } from '@/lib/supabase';
import { SetupModal } from '@/components/SetupModal';
import { MoneyLadder } from '@/components/MoneyLadder';
import { CheckModal } from '@/components/CheckModal';
import { PhoneModal, CompanionModal, SageModal, getDisplayCategory } from '@/components/LifelineModals';
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
            current_level: isWon ? 15 : walkedAway ? currentLevel - 1 : currentLevel,
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

    if (timerRef.current) clearInterval(timerRef.current);

    setSelectedAnswer(choice);
    setGameState('revealing');
    soundManager.playAnswerSound(choice);

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

        try {
          confetti({
            particleCount: isMilestone ? 150 : 60,
            spread: isMilestone ? 100 : 70,
            origin: { y: 0.6 }
          });
        } catch {}

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
          setTimeout(() => {
            const nextLv = currentLevel + 1;
            setCurrentLevel(nextLv);
            loadQuestionForLevel(nextLv);
          }, 1400);
        }
      } else {
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

  // Lifeline: Sages (Level 6+)
  const handleUseSage = () => {
    if (!lifelineSage || gameState !== 'playing' || !currentQuestion || currentLevel < 6) return;
    soundManager.playAskAudience();
    setActiveModal('sage');
    setLifelineSage(false);
  };

  // Sound toggle
  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  // Close check modal and proceed
  const handleContinueAfterCheck = async () => {
    setActiveModal('none');
    if (checkLevel === 15) {
      handleGameOver(true, false);
    } else {
      const nextLv = checkLevel + 1;
      setCurrentLevel(nextLv);
      await loadQuestionForLevel(nextLv);
    }
  };

  // Reset Game
  const handlePlayAgain = () => {
    setActiveModal('none');
    setGameState('setup');
    setCurrentQuestion(null);
    setCurrentLevel(1);
    setSelectedAnswer(null);
    setHiddenAnswers([]);
  };

  // Keyboard shortcut listener (A, B, C, D)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(key)) {
        if (!hiddenAnswers.includes(key as 'A' | 'B' | 'C' | 'D')) {
          handleSelectAnswer(key as 'A' | 'B' | 'C' | 'D');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, currentQuestion, hiddenAnswers]);

  const currentPrizeItem = PRIZE_LADDER.find((p) => p.level === currentLevel);

  return (
    <main className="relative min-h-screen w-full bg-[#020512] text-white flex flex-col justify-between overflow-x-hidden font-sans select-none safe-area-padding">
      {/* Studio Stage Lighting & Atmosphere (Matches PowerPoint sample1 & featured) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0e2773]/45 via-[#061138]/90 to-[#01040f] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/images/studio_background.jpg')] bg-cover bg-center opacity-25 mix-blend-screen pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-20 w-full px-2 sm:px-6 md:px-8 py-1.5 sm:py-2.5 bg-black/75 backdrop-blur-md border-b-2 border-amber-500/40 flex items-center justify-between shadow-xl gap-1 sm:gap-4">
        {/* Left: Official ALTP Logo & Player Info */}
        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full border border-amber-400 sm:border-2 p-0.5 shadow-[0_0_12px_rgba(245,158,11,0.6)] bg-blue-950 flex items-center justify-center overflow-hidden flex-shrink-0">
            <img
              src="/images/icon_logo_app.png"
              alt="Ai Là Triệu Phú"
              className="w-full h-full object-cover scale-110"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div className="min-w-0">
            <h1 className="text-[11px] sm:text-sm md:text-base font-black tracking-wider sm:tracking-widest text-amber-400 uppercase truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              AI LÀ TRIỆU PHÚ
            </h1>
            <p className="text-[9px] sm:text-[11px] text-gray-300 truncate">
              Người chơi: <strong className="text-amber-300 font-bold">{setup?.playerName || '---'}</strong>
            </p>
          </div>
        </div>

        {/* Center: Countdown Timer */}
        {gameState !== 'setup' && (
          <div className="flex items-center justify-center flex-shrink-0 px-0.5 sm:px-1">
            <div
              className={`w-9 h-9 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full border-2 sm:border-4 flex items-center justify-center font-mono font-black text-sm sm:text-lg md:text-xl shadow-[0_0_18px_rgba(0,0,0,0.9)] transition-all ${
                timeLeft <= 5
                  ? 'border-red-500 text-red-400 bg-red-950/70 animate-ping'
                  : timeLeft <= 10
                  ? 'border-amber-500 text-amber-300 bg-amber-950/60'
                  : 'border-cyan-400 text-cyan-200 bg-cyan-950/50 shadow-[0_0_15px_rgba(34,211,238,0.5)]'
              }`}
            >
              {timeLeft}
            </div>
          </div>
        )}

        {/* Right Controls */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0">
          <button
            onClick={handleToggleSound}
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            className="p-1 sm:px-2.5 sm:py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-amber-400/30 text-xs flex items-center gap-1 transition-all shadow cursor-pointer"
          >
            <span>{isMuted ? '🔇' : '🔊'}</span>
            <span className="hidden md:inline text-gray-200 font-bold">
              {isMuted ? 'Tắt' : 'Bật'}
            </span>
          </button>

          <button
            onClick={() => setActiveModal('leaderboard')}
            className="p-1 sm:px-2.5 sm:py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-300 text-xs font-black transition-all shadow-[0_0_10px_rgba(245,158,11,0.2)] flex items-center gap-1 cursor-pointer"
          >
            <span>🏆</span>
            <span className="hidden sm:inline">Bảng Vàng</span>
          </button>

          <button
            onClick={() => setLadderOpen(true)}
            className="lg:hidden p-1 sm:px-2.5 sm:py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-400 text-cyan-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>☰</span>
            <span className="hidden sm:inline">Cây Tiền</span>
          </button>
        </div>
      </header>

      {/* Main Game Stage */}
      <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-1.5 sm:px-4 md:px-6 py-2 sm:py-4 md:py-5 flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-6">
        {/* Left / Center Area: Lifelines + Question Box + Answers */}
        <div className="w-full lg:flex-1 flex flex-col items-center justify-center space-y-2.5 sm:space-y-4 md:space-y-6">
          {/* Lifelines Bar (PowerPoint Circular Metallic Badges with Red 'X' Overlay) */}
          <div className="w-full max-w-2xl bg-gradient-to-r from-blue-950/70 via-indigo-950/80 to-blue-950/70 backdrop-blur-md border border-amber-500/40 sm:border-2 rounded-2xl sm:rounded-full py-1 sm:py-2 px-1 sm:px-4 md:px-6 flex items-center justify-around gap-1 sm:gap-2 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            {/* 50:50 */}
            <button
              disabled={!lifeline5050 || gameState !== 'playing'}
              onClick={handleUse5050}
              className={`relative flex flex-col items-center gap-0.5 sm:gap-1 transition-transform ${
                lifeline5050 && gameState === 'playing'
                  ? 'hover:scale-110 active:scale-95 cursor-pointer'
                  : 'opacity-35 cursor-not-allowed'
              }`}
            >
              <div className="w-8 h-8 sm:w-11 sm:h-11 md:w-13 md:h-13 rounded-full bg-gradient-to-b from-blue-700 via-indigo-900 to-blue-950 border sm:border-2 border-amber-400 flex items-center justify-center font-black text-amber-300 text-[10px] sm:text-xs md:text-sm shadow-[0_0_12px_rgba(245,158,11,0.5)]">
                50:50
              </div>
              {!lifeline5050 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-red-500 font-black text-2xl sm:text-3xl md:text-4xl drop-shadow-[0_0_10px_rgba(239,68,68,1)]">
                    ✕
                  </span>
                </div>
              )}
              <span className="text-[8px] sm:text-[10px] text-gray-300 font-bold">50 : 50</span>
            </button>

            {/* Gọi điện thoại cho người thân */}
            <button
              disabled={!lifelinePhone || gameState !== 'playing'}
              onClick={handleUsePhone}
              className={`relative flex flex-col items-center gap-0.5 sm:gap-1 transition-transform ${
                lifelinePhone && gameState === 'playing'
                  ? 'hover:scale-110 active:scale-95 cursor-pointer'
                  : 'opacity-35 cursor-not-allowed'
              }`}
            >
              <div className="w-8 h-8 sm:w-11 sm:h-11 md:w-13 md:h-13 rounded-full bg-gradient-to-b from-blue-700 via-indigo-900 to-blue-950 border sm:border-2 border-amber-400 flex items-center justify-center text-sm sm:text-lg md:text-xl shadow-[0_0_12px_rgba(245,158,11,0.5)]">
                📞
              </div>
              {!lifelinePhone && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-red-500 font-black text-2xl sm:text-3xl md:text-4xl drop-shadow-[0_0_10px_rgba(239,68,68,1)]">
                    ✕
                  </span>
                </div>
              )}
              <span className="text-[8px] sm:text-[10px] text-gray-300 font-bold truncate max-w-[48px] sm:max-w-[65px]">
                {setup?.phoneFriendName || 'Người thân'}
              </span>
            </button>

            {/* Hỏi người đồng hành */}
            <button
              disabled={!lifelineCompanion || gameState !== 'playing'}
              onClick={handleUseCompanion}
              className={`relative flex flex-col items-center gap-0.5 sm:gap-1 transition-transform ${
                lifelineCompanion && gameState === 'playing'
                  ? 'hover:scale-110 active:scale-95 cursor-pointer'
                  : 'opacity-35 cursor-not-allowed'
              }`}
            >
              <div className="w-8 h-8 sm:w-11 sm:h-11 md:w-13 md:h-13 rounded-full bg-gradient-to-b from-amber-600 via-yellow-800 to-blue-950 border sm:border-2 border-amber-400 flex items-center justify-center text-sm sm:text-lg md:text-xl shadow-[0_0_12px_rgba(245,158,11,0.5)]">
                🤝
              </div>
              {!lifelineCompanion && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-red-500 font-black text-2xl sm:text-3xl md:text-4xl drop-shadow-[0_0_10px_rgba(239,68,68,1)]">
                    ✕
                  </span>
                </div>
              )}
              <span className="text-[8px] sm:text-[10px] text-amber-300 font-bold truncate max-w-[48px] sm:max-w-[65px]">
                {setup?.companionName || 'Đồng hành'}
              </span>
            </button>

            {/* Hỏi 2 Nhà Thông Thái (Unlocks at level 6) */}
            <button
              disabled={!lifelineSage || gameState !== 'playing' || currentLevel < 6}
              onClick={handleUseSage}
              className={`relative flex flex-col items-center gap-0.5 sm:gap-1 transition-transform ${
                lifelineSage && gameState === 'playing' && currentLevel >= 6
                  ? 'hover:scale-110 active:scale-95 cursor-pointer'
                  : 'opacity-35 cursor-not-allowed'
              }`}
            >
              <div className="w-8 h-8 sm:w-11 sm:h-11 md:w-13 md:h-13 rounded-full bg-gradient-to-b from-purple-700 via-indigo-900 to-blue-950 border sm:border-2 border-amber-400 flex items-center justify-center text-sm sm:text-lg md:text-xl shadow-[0_0_12px_rgba(245,158,11,0.5)]">
                🧙‍♂️
              </div>
              {currentLevel < 6 ? (
                <span className="absolute -top-1 -right-1 text-[8px] sm:text-[9px] bg-red-600 text-white px-1 sm:px-1.5 py-0.2 rounded-full font-bold shadow">
                  🔒 C6
                </span>
              ) : !lifelineSage ? (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-red-500 font-black text-2xl sm:text-3xl md:text-4xl drop-shadow-[0_0_10px_rgba(239,68,68,1)]">
                    ✕
                  </span>
                </div>
              ) : null}
              <span className="text-[8px] sm:text-[10px] text-purple-300 font-bold">Thông thái</span>
            </button>

            {/* Dừng cuộc chơi */}
            <button
              disabled={gameState !== 'playing'}
              onClick={handleWalkAway}
              className={`flex flex-col items-center gap-0.5 sm:gap-1 transition-transform ${
                gameState === 'playing'
                  ? 'hover:scale-110 active:scale-95 cursor-pointer'
                  : 'opacity-35 cursor-not-allowed'
              }`}
            >
              <div className="w-8 h-8 sm:w-11 sm:h-11 md:w-13 md:h-13 rounded-full bg-gradient-to-b from-red-600 to-rose-950 border sm:border-2 border-red-400 flex items-center justify-center text-sm sm:text-lg md:text-xl shadow-[0_0_12px_rgba(244,63,94,0.6)]">
                🛑
              </div>
              <span className="text-[8px] sm:text-[10px] text-red-300 font-bold">
                <span className="sm:hidden">Dừng</span>
                <span className="hidden sm:inline">Dừng chơi</span>
              </span>
            </button>
          </div>

          {/* Hexagonal Question Frame (Matches PowerPoint sample1 / sample2) */}
          <div className="relative w-full max-w-3xl px-0.5 sm:px-0">
            {/* Horizontal Connector Line Stretching Across Behind Question Box */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent pointer-events-none z-0" />

            {/* Question Top Badge */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-1 px-3 sm:px-6 pb-1 sm:pb-2 text-[10px] sm:text-xs">
              <span className="font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5 drop-shadow">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400 animate-ping" />
                CÂU HỎI SỐ {currentLevel} / 15 • {currentPrizeItem?.prizeFormatted}
              </span>
              <span className="px-2 sm:px-3 py-0.5 rounded-full bg-blue-950/90 border border-amber-400/50 text-amber-300 font-bold text-[9px] sm:text-[11px] uppercase tracking-wider shadow">
                Chuyên đề: {getDisplayCategory(currentQuestion?.category || '')}
              </span>
            </div>

            {/* Outer Hexagon Border Layer */}
            <div className="relative z-10 p-[1.5px] sm:p-[2.5px] hex-chamfer bg-gradient-to-r from-amber-600 via-yellow-300 to-amber-600 shadow-[0_0_35px_rgba(245,158,11,0.4)]">
              {/* Inner Hexagon Fill Layer */}
              <div className="hex-chamfer bg-gradient-to-b from-[#0b173e] via-[#050c26] to-[#020512] px-3.5 sm:px-8 md:px-12 py-3.5 sm:py-5 md:py-7 min-h-[85px] sm:min-h-[115px] md:min-h-[135px] flex items-center justify-center text-center">
                <p className="text-xs sm:text-base md:text-lg lg:text-xl font-bold text-white tracking-wide leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  {currentQuestion ? currentQuestion.question : 'Đang nạp câu hỏi từ kho tri thức...'}
                </p>
              </div>
            </div>

            {/* Left and Right Tip Diamond Accents */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-0.5 sm:-left-1 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rotate-45 shadow-[0_0_10px_rgba(250,204,21,1)] z-20 pointer-events-none" />
            <div className="absolute top-1/2 -translate-y-1/2 -right-0.5 sm:-right-1 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rotate-45 shadow-[0_0_10px_rgba(250,204,21,1)] z-20 pointer-events-none" />
          </div>

          {/* 4 Hexagonal Answer Boxes (Responsive 1-col on mobile, 2-col on md+) */}
          <div className="relative w-full max-w-3xl px-0.5 sm:px-0">
            {/* Center Diamond Connectors joining row 1 (A-B) and row 2 (C-D) on desktop */}
            <div className="hidden md:block absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-amber-400 rotate-45 shadow-[0_0_12px_rgba(250,204,21,1)] z-20 pointer-events-none" />
            <div className="hidden md:block absolute top-[75%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-amber-400 rotate-45 shadow-[0_0_12px_rgba(250,204,21,1)] z-20 pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4 relative z-10">
              {(['A', 'B', 'C', 'D'] as const).map((choice) => {
                const isHidden = hiddenAnswers.includes(choice);
                const isSelected = selectedAnswer === choice;
                const isCorrectAnswer = currentQuestion?.correct_answer === choice;

                // Border gradient style
                let borderGradient =
                  'from-amber-600/70 via-yellow-400/90 to-amber-600/70 shadow-[0_0_15px_rgba(245,158,11,0.25)]';
                // Inner background gradient style
                let innerBg = 'from-[#0b173e] via-[#050c26] to-[#020514]';
                let textClasses = 'text-white';
                let prefixClasses = 'text-amber-400';

                if (isHidden) {
                  return (
                    <div
                      key={choice}
                      className="h-11 sm:h-14 md:h-16 hex-chamfer bg-black/40 border border-white/5 opacity-15 pointer-events-none"
                    />
                  );
                }

                if (gameState === 'revealing' && isSelected) {
                  // Pulsing Amber-Orange while waiting for MC
                  borderGradient = 'from-yellow-200 via-white to-yellow-200 shadow-[0_0_30px_rgba(249,115,22,1)]';
                  innerBg = 'from-amber-500 via-orange-500 to-amber-500 animate-pulse';
                  textClasses = 'text-blue-950 font-black';
                  prefixClasses = 'text-white font-black';
                } else if (gameState === 'correct') {
                  if (isCorrectAnswer) {
                    // Flashing Emerald Green
                    borderGradient = 'from-green-200 via-white to-green-200 shadow-[0_0_40px_rgba(34,197,94,1)] scale-[1.01] sm:scale-[1.02]';
                    innerBg = 'from-emerald-600 via-green-500 to-emerald-600 animate-pulse';
                    textClasses = 'text-white font-black';
                    prefixClasses = 'text-yellow-200 font-black';
                  }
                } else if (gameState === 'wrong') {
                  if (isSelected) {
                    // Crimson Red for player's wrong choice
                    borderGradient = 'from-red-300 via-white to-red-300 shadow-[0_0_35px_rgba(239,68,68,1)]';
                    innerBg = 'from-red-600 via-rose-600 to-red-700';
                    textClasses = 'text-white font-black';
                    prefixClasses = 'text-yellow-200 font-black';
                  } else if (isCorrectAnswer) {
                    // Green flashing to reveal correct answer
                    borderGradient = 'from-green-200 via-white to-green-200 shadow-[0_0_40px_rgba(34,197,94,1)] animate-bounce';
                    innerBg = 'from-emerald-600 via-green-500 to-emerald-600';
                    textClasses = 'text-white font-black';
                    prefixClasses = 'text-yellow-200 font-black';
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
                    className="group relative w-full text-left transition-transform duration-150 active:scale-95 focus:outline-none cursor-pointer"
                  >
                    {/* Outer Hexagon Border */}
                    <div
                      className={`p-[1.5px] sm:p-[2px] hex-chamfer bg-gradient-to-r ${borderGradient} transition-all duration-200 group-hover:from-yellow-300 group-hover:to-amber-400 group-hover:shadow-[0_0_25px_rgba(250,204,21,0.6)]`}
                    >
                      {/* Inner Hexagon Fill */}
                      <div
                        className={`hex-chamfer bg-gradient-to-b ${innerBg} min-h-[46px] sm:min-h-[56px] md:min-h-[62px] px-3.5 sm:px-6 md:px-8 py-2 sm:py-3 flex items-center gap-2 sm:gap-3 transition-colors`}
                      >
                        {/* Choice Prefix (A:, B:, C:, D: in bold orange-gold) */}
                        <span
                          className={`font-black text-sm sm:text-base md:text-lg tracking-wider flex-shrink-0 ${prefixClasses} drop-shadow`}
                        >
                          {choice}:
                        </span>
                        {/* Choice Text (Clear bold white) */}
                        <span
                          className={`text-[11px] sm:text-xs md:text-sm lg:text-base font-bold leading-tight sm:leading-snug break-words ${textClasses} drop-shadow`}
                        >
                          {choiceText || '...'}
                        </span>
                      </div>
                    </div>

                    {/* Outer Tip Diamond Accent */}
                    {choice === 'A' || choice === 'C' ? (
                      <div className="absolute top-1/2 -translate-y-1/2 -left-0.5 sm:-left-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-yellow-400 rotate-45 shadow-[0_0_8px_rgba(250,204,21,1)] z-20 pointer-events-none" />
                    ) : (
                      <div className="absolute top-1/2 -translate-y-1/2 -right-0.5 sm:-right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-yellow-400 rotate-45 shadow-[0_0_8px_rgba(250,204,21,1)] z-20 pointer-events-none" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Prize Ribbon */}
          <div className="w-full max-w-3xl pt-0.5 sm:pt-1 flex flex-col sm:flex-row items-center justify-between gap-1 text-[10px] sm:text-xs md:text-sm text-gray-300 px-3 sm:px-4">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-gray-400">Đang thi đấu mốc: </span>
              <strong className="text-amber-400 font-mono text-xs sm:text-base font-black drop-shadow">
                {currentPrizeItem?.prizeFormatted}
              </strong>
            </div>
            <div>
              {currentLevel > 10 ? (
                <span className="text-emerald-400 font-bold">✓ Đã bảo toàn Mốc 2: 22.000.000 ₫</span>
              ) : currentLevel > 5 ? (
                <span className="text-amber-400 font-bold">✓ Đã bảo toàn Mốc 1: 2.000.000 ₫</span>
              ) : (
                <span className="text-gray-400 font-medium">Chưa đạt mốc bảo toàn</span>
              )}
            </div>
          </div>
        </div>

        {/* Right Side Money Ladder (Desktop & Tablet Landscape) */}
        <div className="hidden lg:block w-72 xl:w-80 flex-shrink-0">
          <MoneyLadder
            currentLevel={currentLevel}
            isOpen={ladderOpen}
            onClose={() => setLadderOpen(false)}
          />
        </div>
      </div>

      {/* Floating Ladder Drawer for Mobile / Tablet Portrait */}
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

      {activeModal === 'check' && (
        <CheckModal
          playerName={setup?.playerName || 'Người chơi'}
          amount={checkAmount}
          level={checkLevel}
          onClose={handleContinueAfterCheck}
        />
      )}

      {activeModal === 'gameover' && (
        <GameOverModal
          playerName={setup?.playerName || 'Người chơi'}
          finalPrize={finalPrize}
          levelReached={currentLevel > 1 ? currentLevel - 1 : 0}
          isVictory={isVictory}
          isWalkAway={isWalkAway}
          onRestart={handlePlayAgain}
          onViewLeaderboard={() => setActiveModal('leaderboard')}
        />
      )}

      {activeModal === 'leaderboard' && (
        <LeaderboardModal onClose={() => setActiveModal('none')} />
      )}
    </main>
  );
}
