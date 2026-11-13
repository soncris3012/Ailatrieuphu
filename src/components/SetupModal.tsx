// src/components/SetupModal.tsx
'use client';

import React, { useState } from 'react';
import { CATEGORIES, COMPANION_RELATIONS, GameSetup } from '@/types/game';

interface SetupModalProps {
  onStart: (setup: GameSetup) => void;
}

export const SetupModal: React.FC<SetupModalProps> = ({ onStart }) => {
  const [playerName, setPlayerName] = useState('Nguyễn Văn An');
  const [companionName, setCompanionName] = useState('Mai Anh');
  const [companionRelation, setCompanionRelation] = useState('Bạn thân');
  const [companionField, setCompanionField] = useState('Địa lý');
  const [phoneFriendName, setPhoneFriendName] = useState('Bác Ba');
  const [sage1Name, setSage1Name] = useState('GS. Trần Văn Giàu');
  const [sage1Field, setSage1Field] = useState('Lịch sử');
  const [sage2Name, setSage2Name] = useState('PGS. Nguyễn Văn Huyên');
  const [sage2Field, setSage2Field] = useState('Văn học');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) {
      alert('Vui lòng nhập tên người chơi!');
      return;
    }
    if (sage1Field === sage2Field) {
      alert('Vui lòng chọn 2 lĩnh vực khác nhau cho 2 nhà thông thái!');
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
      sage2Field
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-gradient-to-b from-[#0d143c] via-[#090d28] to-[#040618] border-2 border-yellow-500/70 rounded-2xl shadow-[0_0_50px_rgba(234,179,8,0.25)] p-6 sm:p-8 text-white">
        {/* Logo and Show Header */}
        <div className="text-center mb-6">
          <div className="inline-block relative">
            <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full bg-gradient-to-tr from-yellow-600 via-amber-400 to-yellow-200 p-[3px] shadow-[0_0_25px_rgba(250,204,21,0.6)]">
              <div className="w-full h-full rounded-full bg-gradient-to-b from-blue-950 to-indigo-950 flex flex-col items-center justify-center border-2 border-yellow-500/80 p-2">
                <span className="text-yellow-400 font-extrabold text-[11px] sm:text-xs tracking-wider uppercase">AI LÀ</span>
                <span className="text-white font-black text-sm sm:text-base tracking-widest uppercase text-center leading-tight">TRIỆU PHÚ</span>
                <span className="text-yellow-300 font-semibold text-[9px] mt-0.5">VTV3</span>
              </div>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-400 to-yellow-100 tracking-wider uppercase mt-3">
            KHỞI TẠO CUỘC CHƠI
          </h1>
          <p className="text-xs sm:text-sm text-cyan-300/80 mt-1">
            Thiết lập người đồng hành, người thân và 2 nhà thông thái trước khi ngồi vào ghế nóng
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Thông tin người chơi */}
          <div className="bg-white/5 border border-cyan-500/30 rounded-xl p-4 sm:p-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-yellow-400 flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
              1. Thông Tin Người Chơi Ghế Nóng
            </h3>
            <div>
              <label className="block text-xs text-gray-300 font-medium mb-1">Họ và tên người chơi:</label>
              <input
                type="text"
                required
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Nhập họ tên của bạn..."
                className="w-full px-4 py-2.5 rounded-lg bg-black/50 border border-yellow-500/50 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 font-semibold text-sm"
              />
            </div>
          </div>

          {/* Section 2: Người đồng hành & Người thân gọi điện */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Người đồng hành */}
            <div className="bg-white/5 border border-cyan-500/30 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  2. Người Đồng Hành
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-300 mb-1">Mối quan hệ:</label>
                    <select
                      value={companionRelation}
                      onChange={(e) => setCompanionRelation(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-black/60 border border-cyan-500/40 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                    >
                      {COMPANION_RELATIONS.map((rel) => (
                        <option key={rel} value={rel} className="bg-neutral-900 text-white">
                          {rel}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-300 mb-1">Tên người đồng hành:</label>
                    <input
                      type="text"
                      value={companionName}
                      onChange={(e) => setCompanionName(e.target.value)}
                      placeholder="Ví dụ: Mai Anh, Bố Tuấn..."
                      className="w-full px-3 py-2 rounded-lg bg-black/60 border border-cyan-500/40 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-300 mb-1">
                      Lĩnh vực sở trường (Master):
                    </label>
                    <select
                      value={companionField}
                      onChange={(e) => setCompanionField(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-black/60 border border-cyan-500/40 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat} className="bg-neutral-900 text-white">
                          {cat}
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] text-gray-400 mt-1 italic">
                      💡 Đúng sở trường: xác suất đúng 70%. Lệch sở trường: xác suất thấp hơn (~35%).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Người thân khi gọi điện */}
            <div className="bg-white/5 border border-cyan-500/30 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  3. Người Thân Khi Gọi Điện
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-300 mb-1">
                      Tên người thân khi gọi điện trợ giúp:
                    </label>
                    <input
                      type="text"
                      value={phoneFriendName}
                      onChange={(e) => setPhoneFriendName(e.target.value)}
                      placeholder="Ví dụ: Bác Ba, Anh Hùng, Bạn Thảo..."
                      className="w-full px-3 py-2 rounded-lg bg-black/60 border border-cyan-500/40 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="p-3 bg-blue-950/60 rounded-lg border border-blue-500/30 text-xs text-blue-200 space-y-1">
                    <p className="font-semibold text-yellow-300">📞 Quyền gọi điện người thân:</p>
                    <p>Thời gian đàm thoại 30 giây trong trường quay. Người thân sẽ đưa ra phán đoán gợi ý với độ tin cậy xấp xỉ 70%.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Tổ tư vấn / 2 Nhà thông thái */}
          <div className="bg-white/5 border border-yellow-500/40 rounded-xl p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-yellow-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-400" />
                4. Tổ Tư Vấn: 2 Nhà Thông Thái (Mở khóa từ Câu 6)
              </h3>
              <span className="text-[11px] font-semibold px-2 py-0.5 bg-yellow-500/20 text-yellow-300 rounded border border-yellow-500/40 w-fit">
                Mở sau Mốc 5
              </span>
            </div>
            <p className="text-xs text-gray-300 mb-4">
              Chọn 2 nhà thông thái ở <strong className="text-yellow-300">2 lĩnh vực khác nhau</strong>. Nếu câu hỏi rơi đúng lĩnh vực chuyên môn của nhà thông thái, tỷ lệ trả lời đúng là <strong className="text-emerald-400">100%</strong>!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Sage 1 */}
              <div className="bg-black/50 p-3.5 rounded-lg border border-yellow-500/30 space-y-2">
                <span className="text-xs font-bold text-yellow-300 uppercase">Nhà Thông Thái 1:</span>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-0.5">Tên / Học hàm:</label>
                  <input
                    type="text"
                    value={sage1Name}
                    onChange={(e) => setSage1Name(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded bg-black/60 border border-yellow-500/40 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-0.5">Lĩnh vực chuyên môn 1:</label>
                  <select
                    value={sage1Field}
                    onChange={(e) => setSage1Field(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded bg-black/60 border border-yellow-500/40 text-xs text-white"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="bg-neutral-900 text-white">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sage 2 */}
              <div className="bg-black/50 p-3.5 rounded-lg border border-yellow-500/30 space-y-2">
                <span className="text-xs font-bold text-yellow-300 uppercase">Nhà Thông Thái 2:</span>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-0.5">Tên / Học hàm:</label>
                  <input
                    type="text"
                    value={sage2Name}
                    onChange={(e) => setSage2Name(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded bg-black/60 border border-yellow-500/40 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-0.5">Lĩnh vực chuyên môn 2:</label>
                  <select
                    value={sage2Field}
                    onChange={(e) => setSage2Field(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded bg-black/60 border border-yellow-500/40 text-xs text-white"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="bg-neutral-900 text-white">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-yellow-300 text-blue-950 font-black text-base sm:text-lg uppercase tracking-widest rounded-xl shadow-[0_0_25px_rgba(250,204,21,0.6)] border-2 border-yellow-200 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              BƯỚC VÀO GHẾ NÓNG ➔
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
