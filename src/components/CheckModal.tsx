// src/components/CheckModal.tsx
'use client';

import React from 'react';

interface CheckModalProps {
  playerName: string;
  amount: number;
  level: number;
  onClose: () => void;
}

export const CheckModal: React.FC<CheckModalProps> = ({
  playerName,
  amount,
  level,
  onClose
}) => {
  const formattedAmount = new Intl.NumberFormat('vi-VN').format(amount);
  const amountInWords =
    amount === 22000000
      ? 'Hai mươi hai triệu đồng chẵn'
      : amount === 150000000
      ? 'Một trăm năm mươi triệu đồng chẵn'
      : `${formattedAmount} đồng`;

  const today = new Date().toLocaleDateString('vi-VN');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md p-2 sm:p-4 flex items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-2xl my-auto max-h-[92vh] overflow-y-auto bg-gradient-to-br from-amber-50 via-yellow-100 to-amber-200 border-2 sm:border-4 border-yellow-600 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 text-neutral-900 font-serif">
        {/* Decorative Bank Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-yellow-700/60 pb-2.5 sm:pb-3 mb-3 sm:mb-4 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-900 border-2 border-yellow-500 flex items-center justify-center text-yellow-400 font-bold text-xs text-center shadow flex-shrink-0">
              VTV3
            </div>
            <div>
              <h2 className="text-base sm:text-xl md:text-2xl font-black tracking-wider text-blue-950 uppercase">
                Ngân Hàng Ai Là Triệu Phú
              </h2>
              <p className="text-[10px] sm:text-xs text-yellow-900 font-sans tracking-wide">
                ĐÀI TRUYỀN HÌNH VIỆT NAM • VTV3
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end">
            <span className="inline-block px-2.5 py-0.5 bg-yellow-500/30 border border-yellow-700 text-yellow-900 font-sans font-bold text-[10px] sm:text-xs rounded">
              SÉC THƯỞNG MỐC {level}
            </span>
            <p className="text-[10px] sm:text-xs text-neutral-600 font-sans mt-0.5 sm:mt-1">
              Số: ALTP-{Date.now().toString().slice(-6)}
            </p>
          </div>
        </div>

        {/* Check Body */}
        <div className="space-y-2.5 sm:space-y-4 text-xs sm:text-sm md:text-base">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-dashed border-yellow-800 pb-1.5 sm:pb-2 gap-0.5">
            <span className="text-yellow-950 font-bold text-[11px] sm:text-xs">NGÀY PHÁT HÀNH:</span>
            <span className="text-neutral-800 font-semibold">{today}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-dashed border-yellow-800 pb-1.5 sm:pb-2 gap-0.5">
            <span className="text-yellow-950 font-bold text-[11px] sm:text-xs">TRẢ CHO ÔNG/BÀ:</span>
            <span className="text-base sm:text-xl font-black text-blue-900 uppercase tracking-wide">
              {playerName || 'NGƯỜI CHƠI'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-dashed border-yellow-800 pb-1.5 sm:pb-2 gap-0.5">
            <span className="text-yellow-950 font-bold text-[11px] sm:text-xs">SỐ TIỀN BẰNG SỐ:</span>
            <span className="text-xl sm:text-2xl md:text-3xl font-black text-emerald-800 tracking-wider">
              {formattedAmount} VNĐ
            </span>
          </div>

          <div className="border-b border-dashed border-yellow-800 pb-1.5 sm:pb-2">
            <span className="text-yellow-950 font-bold block mb-0.5 sm:mb-1 text-[11px] sm:text-xs">SỐ TIỀN BẰNG CHỮ:</span>
            <span className="italic text-neutral-800 font-semibold text-xs sm:text-base md:text-lg">
              &quot;{amountInWords}&quot;
            </span>
          </div>

          {/* Signatures */}
          <div className="pt-2 sm:pt-4 flex items-end justify-between font-sans">
            <div className="text-center">
              <p className="text-[10px] sm:text-xs font-bold text-neutral-700 uppercase">NGƯỜI LẬP SÉC</p>
              <div className="h-10 sm:h-14 flex items-center justify-center italic text-blue-900 font-serif text-sm sm:text-lg">
                MC Lại Văn Sâm
              </div>
              <p className="text-[9px] sm:text-[11px] text-neutral-500">(Ký và ghi rõ họ tên)</p>
            </div>

            <div className="text-center">
              <p className="text-[10px] sm:text-xs font-bold text-neutral-700 uppercase">TỔNG GIÁM ĐỐC VTV</p>
              <div className="h-10 sm:h-14 flex items-center justify-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-red-600 flex items-center justify-center text-red-600 font-bold text-[8px] sm:text-[9px] uppercase tracking-tighter rotate-[-12deg] shadow-inner">
                  ĐÃ XÁC NHẬN
                </div>
              </div>
              <p className="text-[9px] sm:text-[11px] text-neutral-500">(Đã đóng dấu duyệt chi)</p>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="mt-4 sm:mt-6 pt-2 sm:pt-3 border-t border-yellow-700/40 text-center font-sans">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 sm:py-3 bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 hover:from-yellow-500 hover:to-amber-400 text-blue-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg border border-yellow-300 transition-all cursor-pointer"
          >
            NHẬN TẤM SÉC VÀ TIẾP TỤC HÀNH TRÌNH ➔
          </button>
        </div>
      </div>
    </div>
  );
};
