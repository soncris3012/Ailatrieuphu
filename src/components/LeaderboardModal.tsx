'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { MedalRankIcon, TrophyIcon } from './BroadcastIcons';

interface LeaderboardRow {
  id?: number | string;
  player_name: string;
  prize_won: number;
  current_level: number;
  created_at?: string;
}

interface LeaderboardModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen = true,
  onClose,
}) => {
  const [rows, setRows] = useState<LeaderboardRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    let active = true;

    async function fetchLeaderboard() {
      setLoading(true);
      setErrorMsg(null);
      try {
        const { data, error } = await supabase
          .from('leaderboard')
          .select('*')
          .order('prize_won', { ascending: false })
          .order('current_level', { ascending: false })
          .limit(20);

        if (!active) return;
        if (error) {
          setErrorMsg('Không thể tải bảng xếp hạng lúc này.');
          setRows([]);
        } else {
          setRows((data as LeaderboardRow[]) || []);
        }
      } catch {
        if (active) {
          setErrorMsg('Không thể kết nối máy chủ xếp hạng.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchLeaderboard();
    return () => {
      active = false;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-2 sm:p-4 flex items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-2xl my-auto max-h-[90vh] flex flex-col rounded-2xl border-2 border-amber-400/70 bg-gradient-to-b from-[#0b1b54] via-[#060f36] to-[#020618] p-4 sm:p-6 text-white shadow-[0_0_50px_rgba(245,158,11,0.35)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-400/30 pb-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-full border border-amber-300 bg-amber-500/20 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.35)]">
              <TrophyIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <h2 className="font-display text-base sm:text-xl font-black uppercase tracking-wider text-amber-300 truncate">
                BẢNG VÀNG TRIỆU PHÚ VTV3
              </h2>
              <p className="text-[11px] sm:text-xs text-sky-200/80">
                Top 20 người chơi đạt mức tiền thưởng cao nhất trên ghế nóng
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng bảng xếp hạng"
            className="rounded-lg border border-sky-400/35 bg-slate-900/80 px-2.5 py-1 text-xs sm:text-sm font-bold text-sky-200 hover:bg-slate-800 cursor-pointer flex-shrink-0"
          >
            Đóng ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-2">
          {loading ? (
            <div className="py-12 text-center text-sm text-sky-200">
              Đang đồng bộ Bảng Vàng Triệu Phú...
            </div>
          ) : errorMsg ? (
            <div className="py-10 text-center text-sm text-rose-300">{errorMsg}</div>
          ) : rows.length === 0 ? (
            <div className="py-10 text-center text-sm text-sky-200/80">
              Chưa có kỷ lục nào được ghi nhận. Hãy là triệu phú đầu tiên!
            </div>
          ) : (
            rows.map((entry, idx) => {
              const rank = idx + 1;
              const isTop3 = rank <= 3;

              return (
                <div
                  key={entry.id ?? `${entry.player_name}-${idx}`}
                  className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-2.5 transition-colors ${
                    rank === 1
                      ? 'border-amber-300/80 bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-slate-900/60 shadow-[0_0_18px_rgba(251,191,36,0.2)]'
                      : rank === 2
                      ? 'border-slate-300/50 bg-slate-400/10'
                      : rank === 3
                      ? 'border-amber-600/60 bg-amber-700/15'
                      : 'border-sky-400/15 bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className="w-7 flex-shrink-0 flex justify-center">
                      {isTop3 ? (
                        <MedalRankIcon rank={rank} className="h-6 w-6 sm:h-7 sm:w-7" />
                      ) : (
                        <span className="font-clock text-xs sm:text-sm font-bold text-sky-300/75">
                          #{rank}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p
                        className={`font-bold truncate ${
                          rank === 1 ? 'text-amber-200 text-sm sm:text-base' : 'text-white text-xs sm:text-sm'
                        }`}
                      >
                        {entry.player_name}
                      </p>
                      <p className="text-[10px] sm:text-xs text-sky-200/70">
                        Vượt qua mức Câu {entry.current_level}
                      </p>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="font-clock text-xs sm:text-sm font-black text-amber-300">
                      {Number(entry.prize_won || 0).toLocaleString('vi-VN')} đ
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer button */}
        <div className="mt-4 flex justify-end border-t border-sky-400/20 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto rounded-xl border border-amber-300/70 bg-gradient-to-r from-amber-500 to-yellow-500 px-5 py-2 text-xs sm:text-sm font-black uppercase tracking-wider text-slate-950 shadow-lg hover:from-amber-400 hover:to-yellow-400 cursor-pointer"
          >
            Quay lại trường quay
          </button>
        </div>
      </div>
    </div>
  );
};
