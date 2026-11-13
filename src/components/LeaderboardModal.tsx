// src/components/LeaderboardModal.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface LeaderboardItem {
  player_name: string;
  prize_won: number;
  current_level: number;
  created_at: string;
}

interface LeaderboardModalProps {
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ onClose }) => {
  const [list, setList] = useState<LeaderboardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const { data, error } = await supabase
          .from('leaderboard')
          .select('*')
          .limit(20);

        if (!error && data) {
          setList(data as LeaderboardItem[]);
        }
      } catch (err) {
        console.error('Failed to load leaderboard:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-[#101738] via-[#090e24] to-[#040614] border-2 border-yellow-500/60 rounded-2xl shadow-2xl p-6 text-white max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-yellow-500/30">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            <h3 className="text-lg font-bold text-yellow-300 uppercase tracking-wider">
              BẢNG XẾP HẠNG TRIỆU PHÚ
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white rounded text-lg"
          >
            ✕
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {loading ? (
            <div className="text-center py-8 text-sm text-gray-400">Đang tải bảng vàng...</div>
          ) : list.length === 0 ? (
            <div className="text-center py-8 text-sm text-gray-400">
              Chưa có kỷ lục nào được ghi nhận. Hãy là người đầu tiên chinh phục 150 triệu!
            </div>
          ) : (
            list.map((item, index) => {
              const formatted = new Intl.NumberFormat('vi-VN').format(item.prize_won);
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:border-yellow-500/40 transition-colors text-xs sm:text-sm"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 text-center font-bold font-mono ${
                        index === 0
                          ? 'text-yellow-400 text-base'
                          : index === 1
                          ? 'text-gray-300'
                          : index === 2
                          ? 'text-amber-600'
                          : 'text-gray-500'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-bold text-white uppercase">{item.player_name}</p>
                      <p className="text-[11px] text-gray-400">
                        Vượt qua câu: {item.current_level}/15
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-bold text-yellow-400 text-sm sm:text-base">
                      {formatted} ₫
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 font-bold text-xs rounded-lg border border-yellow-500/40"
          >
            ĐÓNG
          </button>
        </div>
      </div>
    </div>
  );
};
