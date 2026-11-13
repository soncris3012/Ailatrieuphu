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
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Ladder Panel */}
      <aside
        className={`fixed lg:static top-0 right-0 h-full z-40 w-72 sm:w-80 bg-gradient-to-b from-[#090e2d] via-[#05081c] to-[#02040f] border-l lg:border-l-0 lg:border-2 border-yellow-500/40 p-4 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        } lg:rounded-2xl lg:h-auto lg:my-auto`}
      >
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-yellow-500/30">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" />
            <h3 className="text-sm font-bold tracking-wider text-yellow-400 uppercase">
              BẢNG TIỀN THƯỞNG
            </h3>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-gray-400 hover:text-white rounded"
          >
            ✕
          </button>
        </div>

        {/* Tiers List */}
        <div className="flex flex-col gap-1 overflow-y-auto pr-1">
          {PRIZE_LADDER.map((item) => {
            const isActive = currentLevel === item.level;
            const isPassed = currentLevel > item.level;
            const isMilestone = item.isMilestone;

            let bgStyle = 'bg-white/5 text-gray-300';
            if (isActive) {
              bgStyle =
                'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-blue-950 font-black shadow-[0_0_15px_rgba(250,204,21,0.8)] border border-yellow-200 scale-[1.02]';
            } else if (isMilestone) {
              bgStyle = 'bg-yellow-500/20 text-yellow-300 font-bold border border-yellow-500/40';
            } else if (isPassed) {
              bgStyle = 'bg-emerald-950/30 text-emerald-300/80 line-through';
            }

            return (
              <div
                key={item.level}
                className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-all ${bgStyle}`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-6 text-right font-mono font-bold ${isActive ? 'text-blue-950' : isMilestone ? 'text-yellow-400' : 'text-gray-400'}`}>
                    {item.level}
                  </span>
                  {isActive && <span className="text-xs animate-bounce">▶</span>}
                  {isMilestone && !isActive && <span className="text-[10px] text-yellow-400">★</span>}
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono tracking-tight font-semibold">
                    {item.prizeFormatted}
                  </span>
                  {item.hasCheck && (
                    <span className="text-[10px] px-1 py-0.2 bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 rounded font-sans">
                      Séc
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Guaranteed Note */}
        <div className="mt-3 pt-3 border-t border-yellow-500/20 text-[11px] text-gray-400 space-y-1">
          <div className="flex items-center justify-between text-yellow-300">
            <span>Mốc 1 (Câu 5):</span>
            <span className="font-bold">2.000.000 ₫</span>
          </div>
          <div className="flex items-center justify-between text-yellow-300">
            <span>Mốc 2 (Câu 10):</span>
            <span className="font-bold">22.000.000 ₫ + Séc</span>
          </div>
          <div className="flex items-center justify-between text-yellow-400 font-bold">
            <span>Mốc 3 (Câu 15):</span>
            <span>150.000.000 ₫</span>
          </div>
        </div>
      </aside>
    </>
  );
};
