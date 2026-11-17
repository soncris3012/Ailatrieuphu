'use client';

import React from 'react';
import { VTV3LogoCrest } from './StudioStage';
import { SparkleIcon, TrophyIcon } from './BroadcastIcons';

interface GameOverModalProps {
  playerName: string;
  finalPrize: number;
  finalPrizeFormatted: string;
  reachedLevel: number;
  isWin: boolean;
  walkedAway?: boolean;
  correctAnswer?: 'A' | 'B' | 'C' | 'D';
  correctOptionText?: string;
  onPlayAgain: () => void;
  onViewLeaderboard: () => void;
  onBackToLobby: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  playerName,
  finalPrize,
  finalPrizeFormatted,
  reachedLevel,
  isWin,
  walkedAway = false,
  correctAnswer,
  correctOptionText,
  onPlayAgain,
  onViewLeaderboard,
  onBackToLobby,
}) => {
  const heading = isWin
    ? 'CHINH PHỤC ĐỈNH CAO TRIỆU PHÚ!'
    : walkedAway
    ? 'DỪNG CUỘC CHƠI ĐÚNG LÚC!'
    : 'CUỘC CHƠI KẾT THÚC';

  const subtitle = isWin
    ? 'Xuất sắc vượt qua toàn bộ 15 câu hỏi của chương trình Ai Là Triệu Phú VTV3.'
    : walkedAway
    ? 'Quyết định bản lĩnh bảo toàn nguyên vẹn số tiền thưởng đang nắm giữ.'
    : 'Cảm ơn bạn đã đến với ghế nóng Ai Là Triệu Phú. Hẹn gặp lại ở lần chơi tới!';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-2 sm:p-4 flex items-center justify-center animate-fade-in">
      <div
        className={`relative w-full max-w-lg my-auto rounded-2xl border-2 p-5 sm:p-7 text-white shadow-2xl ${
          isWin
            ? 'border-amber-300 bg-gradient-to-b from-[#1e1b4b] via-[#0c1445] to-[#020514] shadow-[0_0_60px_rgba(251,191,36,0.5)]'
            : walkedAway
            ? 'border-cyan-400/75 bg-gradient-to-b from-[#0b2358] via-[#071133] to-[#020514] shadow-[0_0_50px_rgba(56,189,248,0.35)]'
            : 'border-rose-400/70 bg-gradient-to-b from-[#2b0f2a] via-[#101336] to-[#020514] shadow-[0_0_50px_rgba(244,63,94,0.3)]'
        }`}
      >
        {/* Crest & Title */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-3">
            <VTV3LogoCrest size="md" />
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-500/15 px-3 py-0.5 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-amber-300 mb-2">
            <SparkleIcon className="w-3.5 h-3.5" />
            <span>TỔNG KẾT HÀNH TRÌNH</span>
          </div>

          <h2
            className={`font-display text-lg sm:text-2xl font-black uppercase tracking-wide ${
              isWin ? 'text-amber-300' : walkedAway ? 'text-cyan-300' : 'text-white'
            }`}
          >
            {heading}
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-sky-200/80 max-w-md">{subtitle}</p>
        </div>

        {/* Summary Card */}
        <div className="mt-5 rounded-xl border border-sky-400/25 bg-white/[0.04] p-4 space-y-3">
          <div className="flex items-center justify-between text-xs sm:text-sm border-b border-white/10 pb-2">
            <span className="text-sky-200/75">Người chơi trên ghế nóng:</span>
            <span className="font-bold text-white">{playerName}</span>
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm border-b border-white/10 pb-2">
            <span className="text-sky-200/75">Vị trí câu hỏi:</span>
            <span className="font-bold text-amber-300">
              {isWin ? 'Hoàn thành 15/15 câu' : `Câu số ${reachedLevel} / 15`}
            </span>
          </div>

          <div className="pt-1 text-center">
            <p className="text-[11px] uppercase tracking-widest text-sky-200/75">
              PHẦN THƯỞNG RA VỀ
            </p>
            <p
              className={`font-clock mt-1 text-2xl sm:text-4xl font-black ${
                finalPrize > 0 ? 'text-amber-300' : 'text-slate-300'
              }`}
            >
              {finalPrizeFormatted}
            </p>
          </div>

          {/* Correct answer explanation on wrong answer */}
          {!isWin && !walkedAway && correctAnswer && (
            <div className="mt-2 rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-2.5 text-xs sm:text-sm">
              <span className="font-bold text-emerald-300">Đáp án đúng là [{correctAnswer}]: </span>
              <span className="text-white">{correctOptionText}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={onPlayAgain}
            className="w-full rounded-xl border border-amber-200 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 py-2.5 font-display text-xs sm:text-sm font-black uppercase tracking-wider text-slate-950 shadow-lg hover:from-amber-400 hover:to-yellow-300 active:scale-[0.99] cursor-pointer"
          >
            CHƠI LƯỢT MỚI NGAY
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={onViewLeaderboard}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-sky-400/40 bg-blue-950/70 py-2 text-xs sm:text-sm font-bold text-sky-200 hover:bg-blue-900/70 cursor-pointer"
            >
              <TrophyIcon className="w-4 h-4 text-amber-300" />
              <span>Bảng Vàng Triệu Phú</span>
            </button>

            <button
              type="button"
              onClick={onBackToLobby}
              className="rounded-xl border border-white/20 bg-white/10 py-2 text-xs sm:text-sm font-semibold text-slate-200 hover:bg-white/20 cursor-pointer"
            >
              Về màn hình chính
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
