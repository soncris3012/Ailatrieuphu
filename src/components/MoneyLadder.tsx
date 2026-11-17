'use client';

import React from 'react';
import { PRIZE_LADDER } from '@/types/game';
import { SparkleIcon } from './BroadcastIcons';

interface MoneyLadderProps {
  currentLevel: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const MoneyLadder: React.FC<MoneyLadderProps> = ({
  currentLevel,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const ladderContent = (
    <div className="flex flex-col h-full rounded-2xl border border-amber-400/35 bg-gradient-to-b from-[#081340]/95 via-[#040a24]/95 to-[#020514]/98 p-3 shadow-[0_0_32px_rgba(0,0,0,0.75)] backdrop-blur-md">
      {/* Header */}
      <div className="mb-2.5 flex items-center justify-between border-b border-sky-400/25 pb-2">
        <div className="flex items-center gap-1.5">
          <SparkleIcon className="h-3.5 w-3.5 text-amber-400" />
          <span className="font-display text-xs font-extrabold uppercase tracking-wider text-amber-300">
            THANG TIỀN THƯỞNG
          </span>
        </div>
        {onCloseMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Đóng thang tiền thưởng"
            className="lg:hidden rounded-lg border border-sky-400/30 bg-slate-900/80 px-2 py-0.5 text-xs font-bold text-sky-200 hover:bg-slate-800 cursor-pointer"
          >
            Đóng ✕
          </button>
        )}
      </div>

      {/* 15 down to 1 Classic VTV3 Money Tree */}
      <div className="flex-1 flex flex-col justify-between gap-0.5">
        {PRIZE_LADDER.map((item) => {
          const isCurrent = item.level === currentLevel;
          const isPassed = item.level < currentLevel;
          const isMilestone = item.isMilestone;

          return (
            <div
              key={item.level}
              className={`relative flex items-center justify-between rounded-md px-2.5 py-1 transition-all duration-200 ${
                isCurrent
                  ? 'border border-amber-200 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 shadow-[0_0_16px_rgba(245,158,11,0.75)] scale-[1.02]'
                  : isMilestone
                  ? 'border border-white/15 bg-blue-950/55 text-white'
                  : 'border border-transparent text-amber-400/95 hover:bg-white/5'
              }`}
            >
              {/* Left side: Level number & diamond marker */}
              <div className="flex items-center gap-2">
                <span
                  className={`font-clock w-5 text-right text-xs font-bold ${
                    isCurrent
                      ? 'text-slate-950'
                      : isMilestone
                      ? 'text-white'
                      : 'text-amber-300'
                  }`}
                >
                  {item.level}
                </span>

                {/* Classic VTV3 Diamond Pip */}
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 rotate-45 transition-all ${
                    isCurrent
                      ? 'bg-slate-950 scale-125'
                      : isPassed
                      ? 'bg-amber-300 shadow-[0_0_6px_rgba(251,191,36,0.9)]'
                      : isMilestone
                      ? 'bg-white/80'
                      : 'bg-amber-400/30'
                  }`}
                />
              </div>

              {/* Right side: Formatted VND amount */}
              <div className="flex items-center gap-1.5">
                {item.hasCheck && !isCurrent && (
                  <span className="rounded bg-amber-400/15 px-1 text-[9px] font-bold uppercase tracking-wider text-amber-200 border border-amber-400/30">
                    Séc
                  </span>
                )}
                <span
                  className={`font-clock text-xs tracking-tight ${
                    isCurrent
                      ? 'font-black text-slate-950'
                      : isMilestone
                      ? 'font-extrabold text-white'
                      : isPassed
                      ? 'font-bold text-amber-300'
                      : 'font-semibold text-amber-400'
                  }`}
                >
                  {item.prizeFormatted}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer note inside panel (structural legend only, not copyright footer!) */}
      <div className="mt-2.5 flex items-center justify-between border-t border-sky-400/20 pt-2 text-[10px] text-sky-200/80">
        <span className="flex items-center gap-1">
          <span className="inline-block h-1.5 w-1.5 rotate-45 bg-amber-300" />
          Đã vượt qua
        </span>
        <span className="font-bold text-white">Mốc 5 • 10 • 15</span>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop right-side broadcast panel */}
      <aside className="hidden lg:block w-[240px] xl:w-[260px] flex-shrink-0">
        {ladderContent}
      </aside>

      {/* Mobile slide-over drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="h-full w-full max-w-[290px] p-2.5 overflow-y-auto">
            {ladderContent}
          </div>
        </div>
      )}
    </>
  );
};
