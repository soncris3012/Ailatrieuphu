'use client';

import React from 'react';
import { VTV3LogoCrest } from './StudioStage';
import { CheckCrestIcon, SparkleIcon } from './BroadcastIcons';

interface CheckModalProps {
  playerName: string;
  level: number;
  prizeFormatted: string;
  onContinue: () => void;
}

export const CheckModal: React.FC<CheckModalProps> = ({
  playerName,
  level,
  prizeFormatted,
  onContinue,
}) => {
  const isGrandPrize = level >= 15;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-2 sm:p-4 flex items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-xl my-auto rounded-2xl border-2 border-amber-300 bg-gradient-to-b from-[#172554] via-[#091233] to-[#020514] p-4 sm:p-6 text-white shadow-[0_0_60px_rgba(251,191,36,0.45)]">
        {/* Top Broadcast Celebration */}
        <div className="flex flex-col items-center text-center mb-4">
          <div className="flex items-center gap-2 text-amber-300 mb-1">
            <SparkleIcon className="w-4 h-4" />
            <span className="font-display text-xs sm:text-sm font-black uppercase tracking-[0.2em]">
              {isGrandPrize ? 'CHÚC MỪNG NHÀ VÔ ĐỊCH TRIỆU PHÚ' : 'VƯỢT MỐC QUAN TRỌNG SỐ 10'}
            </span>
            <SparkleIcon className="w-4 h-4" />
          </div>
          <h2 className="font-display text-lg sm:text-2xl font-black text-white uppercase">
            CHỨNG NHẬN TẤM SÉC DANH GIÁ
          </h2>
        </div>

        {/* Commemorative Gold Check Frame */}
        <div className="relative overflow-hidden rounded-xl border-2 border-amber-400 bg-gradient-to-br from-[#fef3c7] via-[#fde68a] to-[#f59e0b] p-4 sm:p-6 text-slate-950 shadow-inner">
          <div className="flex items-center justify-between border-b-2 border-amber-800/30 pb-3 mb-3">
            <div className="flex items-center gap-2.5">
              <VTV3LogoCrest size="sm" />
              <div>
                <p className="font-display text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900">
                  AI LÀ TRIỆU PHÚ • VTV3
                </p>
                <p className="text-[10px] sm:text-xs font-bold text-amber-900">
                  TRƯỜNG QUAY S14 ĐÀI TRUYỀN HÌNH VIỆT NAM
                </p>
              </div>
            </div>
            <CheckCrestIcon className="w-7 h-7 sm:w-8 sm:h-8 text-amber-900" />
          </div>

          <div className="space-y-2.5">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-dashed border-amber-900/40 pb-1.5">
              <span className="text-xs font-bold uppercase text-amber-950/75">
                Trao tặng người chơi:
              </span>
              <span className="font-display text-base sm:text-xl font-black uppercase text-blue-950">
                {playerName}
              </span>
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-dashed border-amber-900/40 pb-1.5">
              <span className="text-xs font-bold uppercase text-amber-950/75">
                Cột mốc đạt được:
              </span>
              <span className="font-bold text-sm sm:text-base text-slate-900">
                Câu hỏi số {level} / 15
              </span>
            </div>

            <div className="pt-1 text-center">
              <p className="text-[11px] font-bold uppercase tracking-widest text-amber-950/80 mb-1">
                SỐ TIỀN THƯỞNG BẢO ĐẢM
              </p>
              <p className="font-clock text-2xl sm:text-4xl font-black tracking-tight text-blue-950">
                {prizeFormatted}
              </p>
            </div>
          </div>
        </div>

        {/* Continue Action */}
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={onContinue}
            className="w-full sm:w-auto rounded-xl border border-amber-200 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 px-8 py-3 font-display text-xs sm:text-sm font-black uppercase tracking-wider text-slate-950 shadow-[0_0_25px_rgba(251,191,36,0.5)] hover:from-amber-400 hover:to-yellow-300 active:scale-95 transition-all cursor-pointer"
          >
            {isGrandPrize ? 'HOÀN TẤT VINH DANH TRIỆU PHÚ' : 'TIẾP TỤC CHINH PHỤC CÂU 11'}
          </button>
        </div>
      </div>
    </div>
  );
};
