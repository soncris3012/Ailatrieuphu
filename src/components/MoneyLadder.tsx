// src/components/MoneyLadder.tsx
'use client';

import React from 'react';
import { PRIZE_LADDER } from '@/types/game';

interface MoneyLadderProps {
  currentLevel: number;
  isOpen: boolean;
  onClose: () => void;
}

export const MoneyLadder: React.FC<MoneyLadderProps> = ({ currentLevel, isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Ladder Panel matching classic PowerPoint / VTV3 Tree */}
      <aside
        className={`fixed lg:static top-0 right-0 h-full z-40 w-72 sm:w-80 bg-gradient-to-b from-[#0a1236]/95 via-[#04081c]/95 to-[#02040f]/95 border-l-2 lg:border-2 border-amber-500/50 p-3 sm:p-4 flex flex-col justify-between shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-md transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        } lg:rounded-2xl lg:h-auto lg:my-auto`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-amber-500/40">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,1)] animate-ping" />
            <h3 className="text-xs sm:text-sm font-black tracking-widest text-amber-400 uppercase drop-shadow">
              THANG TIỀN THƯỞNG
            </h3>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-gray-400 hover:text-white rounded"
          >
            ✕
          </button>
        </div>

        {/* Tiers List (15 at top down to 1 at bottom) */}
        <div className="flex flex-col gap-1 overflow-y-auto pr-0.5">
          {PRIZE_LADDER.map((item) => {
            const isActive = currentLevel === item.level;
            const isPassed = currentLevel > item.level;
            const isMilestone = item.isMilestone;

            let rowClasses = 'text-amber-400/90 font-bold';
            let numClasses = 'text-amber-400 font-bold';
            let prizeClasses = 'text-amber-400 font-bold';
            let containerBg = 'bg-white/5 hover:bg-white/10';

            if (isActive) {
              // Active: Glowing golden oval/pill
              containerBg =
                'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-blue-950 font-black shadow-[0_0_20px_rgba(250,204,21,0.9)] border-2 border-yellow-100 scale-[1.03] rounded-full';
              rowClasses = 'text-blue-950 font-black';
              numClasses = 'text-blue-950 font-black';
              prizeClasses = 'text-blue-950 font-black';
            } else if (isMilestone) {
              // Milestones 5, 10, 15: PURE WHITE text, gold outline
              containerBg = 'bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-blue-900/40 border border-amber-400/60 shadow-[0_0_10px_rgba(245,158,11,0.2)] rounded-lg';
              rowClasses = 'text-white font-black';
              numClasses = 'text-amber-300 font-bold';
              prizeClasses = 'text-white font-black drop-shadow';
            } else if (isPassed) {
              containerBg = 'bg-emerald-950/20 opacity-50 rounded-lg';
              rowClasses = 'text-emerald-400 line-through';
              numClasses = 'text-emerald-400/70';
              prizeClasses = 'text-emerald-300/70';
            } else {
              containerBg = 'bg-white/[0.03] rounded-lg';
            }

            return (
              <div
                key={item.level}
                className={`flex items-center justify-between px-3 py-1 text-xs transition-all duration-150 ${containerBg} ${rowClasses}`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-5 text-right font-mono font-bold text-xs ${numClasses}`}>
                    {item.level}
                  </span>
                  {isActive && <span className="text-xs text-blue-950 animate-bounce">▶</span>}
                  {isMilestone && !isActive && <span className="text-[10px] text-amber-300">★</span>}
                </div>

                <div className="flex items-center gap-1.5 font-mono tracking-tight font-bold text-xs">
                  <span className={prizeClasses}>
                    {item.prizeFormatted}
                  </span>
                  {item.hasCheck && (
                    <span className="text-[9px] px-1 py-0.2 bg-amber-400/20 border border-amber-400/50 text-amber-300 rounded font-sans font-black">
                      SÉC
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Milestone Footnote */}
        <div className="mt-2.5 pt-2 border-t border-amber-500/20 text-[11px] text-gray-300 space-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Mốc 1 (Câu 5):</span>
            <span className="font-bold text-white">2.000.000 ₫</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Mốc 2 (Câu 10):</span>
            <span className="font-bold text-white">22.000.000 ₫ + Séc</span>
          </div>
          <div className="flex items-center justify-between text-amber-400 font-bold">
            <span>Mốc 3 (Câu 15):</span>
            <span className="text-white font-black">150.000.000 ₫</span>
          </div>
        </div>
      </aside>
    </>
  );
};
