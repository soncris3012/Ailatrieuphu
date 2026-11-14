// src/components/GameOverModal.tsx
'use client';

import React from 'react';

interface GameOverModalProps {
  playerName: string;
  finalPrize: number;
  levelReached: number;
  isVictory: boolean;
  isWalkAway: boolean;
  onRestart: () => void;
  onViewLeaderboard: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  playerName,
  finalPrize,
  levelReached,
  isVictory,
  isWalkAway,
  onRestart,
  onViewLeaderboard
}) => {
  const formattedPrize = new Intl.NumberFormat('vi-VN').format(finalPrize);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-2 sm:p-4 flex items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-lg my-auto max-h-[92vh] overflow-y-auto bg-gradient-to-b from-[#111936] via-[#090d24] to-[#040614] border-2 border-yellow-500 rounded-2xl shadow-[0_0_50px_rgba(234,179,8,0.4)] p-4 sm:p-6 md:p-8 text-white text-center">
        {/* Badge / Trophy */}
        <div className="w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-tr from-yellow-600 via-amber-400 to-yellow-200 p-1 shadow-[0_0_30px_rgba(250,204,21,0.6)] flex items-center justify-center text-2xl sm:text-3xl">
          {isVictory ? '🏆' : isWalkAway ? '💰' : '👏'}
        </div>

        <h2 className="text-lg sm:text-2xl md:text-3xl font-black uppercase tracking-wider text-yellow-300 leading-snug">
          {isVictory
            ? 'CHÚC MỪNG BẠN ĐÃ THÀNH TRIỆU PHÚ!'
            : isWalkAway
            ? 'QUYẾT ĐỊNH DỪNG CUỘC CHƠI AN TOÀN!'
            : 'RẤT TIẾC, CUỘC CHƠI ĐÃ KHÉP LẠI!'}
        </h2>

        <p className="text-xs sm:text-sm text-gray-300 mt-1 sm:mt-2">
          Người chơi: <strong className="text-yellow-400 uppercase">{playerName}</strong>
        </p>

        {/* Prize Box */}
        <div className="my-3 sm:my-6 p-3 sm:p-5 bg-gradient-to-r from-yellow-500/10 via-yellow-500/20 to-yellow-500/10 border border-yellow-500/50 sm:border-2 rounded-xl">
          <p className="text-[10px] sm:text-xs uppercase tracking-widest text-yellow-400 font-bold mb-1">
            TỔNG SỐ TIỀN THƯỞNG BẠN MANG VỀ
          </p>
          <p className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-100 font-mono tracking-wide">
            {formattedPrize} ₫
          </p>
          <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
            Đã vượt qua câu hỏi số: <strong>{levelReached} / 15</strong>
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-2 sm:space-y-3">
          <button
            onClick={onRestart}
            className="w-full py-2.5 sm:py-3.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-yellow-300 text-blue-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg border border-yellow-200 transition-all transform hover:scale-[1.01] cursor-pointer"
          >
            CHƠI LẠI VÁN MỚI ↺
          </button>

          <button
            onClick={onViewLeaderboard}
            className="w-full py-2 sm:py-3 bg-white/10 hover:bg-white/20 text-yellow-300 font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl border border-yellow-500/30 transition-all cursor-pointer"
          >
            XEM BẢNG XẾP HẠNG 🏆
          </button>
        </div>
      </div>
    </div>
  );
};
