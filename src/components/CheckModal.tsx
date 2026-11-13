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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-amber-50 via-yellow-100 to-amber-200 border-4 border-yellow-600 rounded-2xl shadow-2xl p-6 sm:p-8 text-neutral-900 font-serif">
        {/* Decorative Bank Header */}
        <div className="flex items-center justify-between border-b-2 border-yellow-700/60 pb-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-900 border-2 border-yellow-500 flex items-center justify-center text-yellow-400 font-bold text-xs text-center shadow">
              VTV3
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-wider text-blue-950 uppercase">
                Ngân Hàng Ai Là Triệu Phú
              </h2>
              <p className="text-xs text-yellow-900 font-sans tracking-wide">
                ĐÀI TRUYỀN HÌNH VIỆT NAM • VTV3
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 bg-yellow-500/30 border border-yellow-700 text-yellow-900 font-sans font-bold text-xs rounded">
              SÉC THƯỞNG MỐC {level}
            </span>
            <p className="text-xs text-neutral-600 font-sans mt-1">Số: ALTP-{Date.now().toString().slice(-6)}</p>
          </div>
        </div>

        {/* Check Body */}
        <div className="space-y-4 text-sm sm:text-base">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-dashed border-yellow-800 pb-2">
            <span className="text-yellow-950 font-bold">NGÀY PHÁT HÀNH:</span>
            <span className="text-neutral-800 font-semibold">{today}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-dashed border-yellow-800 pb-2">
            <span className="text-yellow-950 font-bold">TRẢ CHO ÔNG/BÀ:</span>
            <span className="text-xl font-black text-blue-900 uppercase tracking-wide">
              {playerName || 'NGƯỜI CHƠI'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-dashed border-yellow-800 pb-2">
            <span className="text-yellow-950 font-bold">SỐ TIỀN BẰNG SỐ:</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-800 tracking-wider">
              {formattedAmount} VNĐ
            </span>
          </div>

          <div className="border-b border-dashed border-yellow-800 pb-2">
            <span className="text-yellow-950 font-bold block mb-1">SỐ TIỀN BẰNG CHỮ:</span>
            <span className="italic text-neutral-800 font-semibold text-base sm:text-lg">
              &quot;{amountInWords}&quot;
            </span>
          </div>

          <div className="pt-2">
            <span className="text-yellow-950 font-bold block mb-1">LÝ DO CHI:</span>
            <span className="text-neutral-700 text-sm">
              Xuất sắc vượt qua câu hỏi số {level} chương trình &quot;Ai Là Triệu Phú&quot;
            </span>
          </div>

          {/* Signatures */}
          <div className="flex justify-between items-end pt-6 mt-4">
            <div className="text-center">
              <p className="text-xs text-neutral-600 uppercase font-sans font-semibold">Người thụ hưởng</p>
              <div className="h-12 flex items-center justify-center font-cursive text-lg text-blue-900">
                {playerName}
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs text-neutral-600 uppercase font-sans font-semibold">Đại diện chương trình</p>
              <div className="h-12 flex items-center justify-center font-serif italic font-bold text-red-800 text-xl">
                Lại Văn Sâm
              </div>
              <p className="text-[10px] text-neutral-500 font-sans">Ký tên và đóng dấu</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 hover:from-blue-600 hover:to-indigo-800 text-white font-sans font-bold text-base rounded-xl shadow-lg border-2 border-yellow-400 transition-all transform hover:scale-105 active:scale-95"
          >
            {level === 15 ? 'HOÀN THÀNH CUỘC CHƠI' : `TIẾP TỤC CHINH PHỤC CÂU ${level + 1} ➔`}
          </button>
        </div>
      </div>
    </div>
  );
};
