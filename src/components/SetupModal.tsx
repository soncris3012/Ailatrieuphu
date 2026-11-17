'use client';

import React, { useState } from 'react';
import { CATEGORIES, COMPANION_RELATIONS, GameSetup } from '@/types/game';
import { VTV3LogoCrest } from './StudioStage';
import { CompanionIcon, PhoneWaveIcon, SageScrollIcon } from './BroadcastIcons';

interface SetupModalProps {
  onStart: (setup: GameSetup) => void;
  onCancel: () => void;
}

export const SetupModal: React.FC<SetupModalProps> = ({ onStart, onCancel }) => {
  // MUST start empty so every contestant enters their own name
  const [playerName, setPlayerName] = useState('');
  const [companionName, setCompanionName] = useState('Trần Thị Minh');
  const [companionRelation, setCompanionRelation] = useState(COMPANION_RELATIONS[0]);
  const [companionField, setCompanionField] = useState(CATEGORIES[0]);
  const [phoneFriendName, setPhoneFriendName] = useState('Lê Hoàng Nam');
  const [sage1Name, setSage1Name] = useState('GS. Trần Văn Giàu');
  const [sage1Field, setSage1Field] = useState(CATEGORIES[0]);
  const [sage2Name, setSage2Name] = useState('PGS. Nguyễn Văn Huyên');
  const [sage2Field, setSage2Field] = useState(CATEGORIES[2]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) {
      alert('Vui lòng nhập họ và tên người chơi trước khi lên ghế nóng!');
      return;
    }
    if (sage1Field === sage2Field) {
      alert('Hai nhà thông thái cần có lĩnh vực chuyên môn khác nhau để hỗ trợ tốt nhất!');
      return;
    }

    onStart({
      playerName: playerName.trim(),
      companionName: companionName.trim() || 'Người đồng hành',
      companionRelation,
      companionField,
      phoneFriendName: phoneFriendName.trim() || 'Người thân',
      sage1Name: sage1Name.trim() || 'Nhà thông thái 1',
      sage1Field,
      sage2Name: sage2Name.trim() || 'Nhà thông thái 2',
      sage2Field,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-2 sm:p-4 flex items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-2xl my-auto max-h-[94vh] overflow-y-auto rounded-2xl border-2 border-amber-400/75 bg-gradient-to-b from-[#0b1f63] via-[#061038] to-[#020515] p-4 sm:p-6 text-white shadow-[0_0_55px_rgba(37,99,235,0.45)]">
        {/* Header with VTV3 Crest */}
        <div className="flex items-center justify-between gap-3 border-b border-sky-400/25 pb-3.5 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <VTV3LogoCrest size="sm" className="flex-shrink-0" />
            <div className="min-w-0">
              <h2 className="font-display text-base sm:text-xl font-black uppercase tracking-wider text-amber-300 truncate">
                ĐĂNG KÝ LÊN GHẾ NÓNG VTV3
              </h2>
              <p className="text-[11px] sm:text-xs text-sky-200/80">
                Thiết lập hồ sơ người chơi & đội ngũ trợ giúp đồng hành cùng bạn
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onCancel}
            aria-label="Đóng biểu mẫu đăng ký"
            className="rounded-lg border border-sky-400/35 bg-slate-900/80 px-2.5 py-1 text-xs font-bold text-sky-200 hover:bg-slate-800 cursor-pointer flex-shrink-0"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Contestant Name (Required, empty by default) */}
          <div className="rounded-xl border border-amber-400/45 bg-amber-500/10 p-3 sm:p-4">
            <label
              htmlFor="playerNameInput"
              className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-300 mb-1.5"
            >
              Họ và Tên Người Chơi <span className="text-rose-400">*</span>
            </label>
            <input
              id="playerNameInput"
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Nhập tên của bạn (bắt buộc)..."
              autoFocus
              required
              className="w-full rounded-xl border border-sky-400/50 bg-slate-950/90 px-3.5 py-2.5 text-sm sm:text-base font-semibold text-white placeholder-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
            />
          </div>

          {/* Companion + Phone Friend Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Companion */}
            <div className="rounded-xl border border-sky-400/25 bg-white/[0.04] p-3 sm:p-4 space-y-2.5">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs sm:text-sm uppercase">
                <CompanionIcon className="w-4 h-4 flex-shrink-0" />
                <span>Người đồng hành trường quay</span>
              </div>
              <div>
                <label className="block text-[11px] text-sky-200/80 mb-1">Tên người đồng hành</label>
                <input
                  type="text"
                  value={companionName}
                  onChange={(e) => setCompanionName(e.target.value)}
                  className="w-full rounded-lg border border-sky-400/35 bg-slate-950/80 px-2.5 py-1.5 text-xs sm:text-sm text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-sky-200/80 mb-1">Quan hệ</label>
                  <select
                    value={companionRelation}
                    onChange={(e) => setCompanionRelation(e.target.value)}
                    className="w-full rounded-lg border border-sky-400/35 bg-slate-950/90 px-2 py-1.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                  >
                    {COMPANION_RELATIONS.map((rel) => (
                      <option key={rel} value={rel}>
                        {rel}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-sky-200/80 mb-1">Sở trường</label>
                  <select
                    value={companionField}
                    onChange={(e) => setCompanionField(e.target.value)}
                    className="w-full rounded-lg border border-sky-400/35 bg-slate-950/90 px-2 py-1.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Phone Friend */}
            <div className="rounded-xl border border-cyan-400/25 bg-white/[0.04] p-3 sm:p-4 space-y-2.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs sm:text-sm uppercase mb-2.5">
                  <PhoneWaveIcon className="w-4 h-4 flex-shrink-0" />
                  <span>Gọi điện thoại cho người thân</span>
                </div>
                <label className="block text-[11px] text-sky-200/80 mb-1">
                  Họ tên chuyên gia / người thân nghe máy
                </label>
                <input
                  type="text"
                  value={phoneFriendName}
                  onChange={(e) => setPhoneFriendName(e.target.value)}
                  className="w-full rounded-lg border border-cyan-400/35 bg-slate-950/80 px-2.5 py-1.5 text-xs sm:text-sm text-white focus:border-cyan-300 focus:outline-none"
                />
              </div>
              <p className="text-[11px] text-sky-200/70 leading-relaxed pt-1">
                Sẵn sàng kết nối trực tiếp 30 giây từ đường dây nóng tổng đài khi bạn cần hỗ trợ.
              </p>
            </div>
          </div>

          {/* 2 Sages Consultation (Question 6+) */}
          <div className="rounded-xl border border-amber-400/30 bg-white/[0.04] p-3 sm:p-4 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs sm:text-sm uppercase">
                <SageScrollIcon className="w-4 h-4 flex-shrink-0" />
                <span>Tổ tư vấn tại chỗ: 2 Nhà Thông Thái</span>
              </div>
              <span className="rounded-full border border-amber-400/40 bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-200">
                Mở khóa từ Câu 6
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5 rounded-lg border border-white/10 bg-slate-950/55 p-2.5">
                <label className="block text-[11px] font-semibold text-amber-200">
                  Nhà thông thái 1
                </label>
                <input
                  type="text"
                  value={sage1Name}
                  onChange={(e) => setSage1Name(e.target.value)}
                  className="w-full rounded-lg border border-sky-400/30 bg-slate-950 px-2.5 py-1.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
                <select
                  value={sage1Field}
                  onChange={(e) => setSage1Field(e.target.value)}
                  className="w-full rounded-lg border border-sky-400/30 bg-slate-950 px-2 py-1.5 text-xs text-cyan-200 focus:border-amber-400 focus:outline-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      Chuyên môn: {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5 rounded-lg border border-white/10 bg-slate-950/55 p-2.5">
                <label className="block text-[11px] font-semibold text-amber-200">
                  Nhà thông thái 2
                </label>
                <input
                  type="text"
                  value={sage2Name}
                  onChange={(e) => setSage2Name(e.target.value)}
                  className="w-full rounded-lg border border-sky-400/30 bg-slate-950 px-2.5 py-1.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
                <select
                  value={sage2Field}
                  onChange={(e) => setSage2Field(e.target.value)}
                  className="w-full rounded-lg border border-sky-400/30 bg-slate-950 px-2 py-1.5 text-xs text-cyan-200 focus:border-amber-400 focus:outline-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      Chuyên môn: {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="w-full sm:w-auto rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 hover:bg-white/20 cursor-pointer"
            >
              Quay lại sảnh
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto rounded-xl border border-amber-200 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 px-6 py-2.5 font-display text-xs sm:text-sm font-black uppercase tracking-wider text-slate-950 shadow-[0_0_24px_rgba(245,158,11,0.5)] hover:from-amber-400 hover:to-yellow-300 active:scale-[0.99] cursor-pointer"
            >
              VÀO GHẾ NÓNG NGAY
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
