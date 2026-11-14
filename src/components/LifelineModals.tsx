// src/components/LifelineModals.tsx
'use client';

import React from 'react';
import { GameSetup, Question } from '@/types/game';

// Smart Semantic Category & Field Matching
function isFieldMatch(field: string, question: Question): boolean {
  if (!field || !question) return false;
  const f = field.toLowerCase().trim();
  const cat = (question.category || '').toLowerCase().trim();
  const fullText = (
    question.question +
    ' ' +
    question.option_a +
    ' ' +
    question.option_b +
    ' ' +
    question.option_c +
    ' ' +
    question.option_d
  ).toLowerCase();

  // Direct match or partial match
  if (cat === f || cat.includes(f) || f.includes(cat)) return true;

  // Semantic keyword mapping
  if (f.includes('lịch sử')) {
    return (
      cat.includes('lịch sử') ||
      cat.includes('history') ||
      cat.includes('people') ||
      /tướng|vua|triều|khởi nghĩa|chiến dịch|chiến tranh|thế chiến|tổng thống|năm 19|năm 18|thế kỷ|hiệp ước|cách mạng|đế quốc|độc lập|giải phóng|bạch đằng|điện biên/i.test(
        fullText
      )
    );
  }
  if (f.includes('địa lý')) {
    return (
      cat.includes('địa lý') ||
      cat.includes('geography') ||
      cat.includes('world') ||
      /thủ đô|tỉnh|quốc gia|châu lục|con sông|ngọn núi|dãy núi|biển|đảo|quần đảo|địa lý|vùng miền|đồng bằng|cao nguyên/i.test(
        fullText
      )
    );
  }
  if (f.includes('văn học')) {
    return (
      cat.includes('văn học') ||
      cat.includes('humanities') ||
      /nhà văn|nhà thơ|tác phẩm|tiểu thuyết|truyện|bài thơ|tập thơ|tác giả|truyện kiều|nhân vật|dế mèn|lão hạc|chị dậu/i.test(
        fullText
      )
    );
  }
  if (f.includes('khoa học') || f.includes('thiên nhiên')) {
    return (
      cat.includes('khoa học') ||
      cat.includes('thiên nhiên') ||
      cat.includes('hóa học') ||
      cat.includes('animals') ||
      /nguyên tố|hóa học|vật lý|sinh học|hành tinh|vũ trụ|tế bào|nhiệt độ|động vật|thực vật|loài chim|loài cá|nguyên tử/i.test(
        fullText
      )
    );
  }
  if (f.includes('thể thao')) {
    return (
      cat.includes('thể thao') ||
      cat.includes('sport') ||
      /bóng đá|world cup|olympic|sea games|cầu thủ|vận động viên|huy chương|vô địch|quần vợt|bàn thắng|đội tuyển/i.test(
        fullText
      )
    );
  }
  if (f.includes('hội họa') || f.includes('âm nhạc') || f.includes('nghệ thuật')) {
    return (
      cat.includes('hội họa') ||
      cat.includes('âm nhạc') ||
      cat.includes('nghệ thuật') ||
      cat.includes('movies') ||
      cat.includes('music') ||
      /bài hát|ca sĩ|nhạc sĩ|họa sĩ|bức tranh|bộ phim|đạo diễn|diễn viên|nghệ thuật|nhạc kịch|giải oscar/i.test(
        fullText
      )
    );
  }
  if (f.includes('ẩm thực')) {
    return (
      cat.includes('ẩm thực') ||
      /món ăn|đặc sản|nấu|bánh|phở|bún|ẩm thực|canh cua|bánh chưng/i.test(fullText)
    );
  }
  return false;
}

// Format clean Vietnamese category display
export function getDisplayCategory(rawCat: string): string {
  const c = (rawCat || '').toLowerCase().trim();
  if (c.includes('history') || c.includes('lịch sử') || c.includes('people')) return 'Lịch sử';
  if (c.includes('geography') || c.includes('địa lý') || c.includes('world')) return 'Địa lý';
  if (c.includes('humanities') || c.includes('văn học')) return 'Văn học';
  if (c.includes('sport') || c.includes('thể thao')) return 'Thể thao';
  if (c.includes('movie') || c.includes('music') || c.includes('nghệ thuật')) return 'Nghệ thuật';
  if (c.includes('animal') || c.includes('khoa học') || c.includes('hóa học')) return 'Khoa học & Tự nhiên';
  if (c.includes('ẩm thực')) return 'Ẩm thực';
  return 'Kiến thức chung & Đời sống';
}

interface PhoneModalProps {
  setup: GameSetup;
  question: Question;
  onClose: () => void;
}

export const PhoneModal: React.FC<PhoneModalProps> = ({ setup, question, onClose }) => {
  // Phone friend has 85% accuracy
  const isCorrect = Math.random() < 0.85;
  const options: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
  const wrongOptions = options.filter((o) => o !== question.correct_answer);
  const suggestedAnswer = isCorrect
    ? question.correct_answer
    : wrongOptions[Math.floor(Math.random() * wrongOptions.length)];

  const answerText =
    suggestedAnswer === 'A'
      ? question.option_a
      : suggestedAnswer === 'B'
      ? question.option_b
      : suggestedAnswer === 'C'
      ? question.option_c
      : question.option_d;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-2 sm:p-4 flex items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-lg my-auto max-h-[92vh] overflow-y-auto bg-gradient-to-b from-blue-950 via-slate-900 to-black border-2 border-cyan-400 rounded-2xl shadow-[0_0_40px_rgba(34,211,238,0.4)] p-4 sm:p-6 text-white">
        <div className="flex items-center gap-2.5 sm:gap-3 border-b border-cyan-500/40 pb-2.5 sm:pb-3 mb-3 sm:mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-600/30 border border-cyan-400 flex items-center justify-center text-xl sm:text-2xl shadow animate-pulse flex-shrink-0">
            📞
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-cyan-300 uppercase tracking-wider">
              GỌI ĐIỆN CHO NGƯỜI THÂN (30 GIÂY)
            </h3>
            <p className="text-[11px] sm:text-xs text-gray-300">
              Đang kết nối tới: <strong className="text-yellow-400">{setup.phoneFriendName}</strong>
            </p>
          </div>
        </div>

        {/* Call Dialogue */}
        <div className="space-y-3 sm:space-y-4 py-1 sm:py-2">
          <div className="flex items-start gap-2.5 sm:gap-3 bg-white/5 p-3 sm:p-4 rounded-xl border border-cyan-500/20">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cyan-700/50 flex-shrink-0 flex items-center justify-center text-sm sm:text-base font-bold text-cyan-200">
              {setup.phoneFriendName.charAt(0)}
            </div>
            <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <p className="font-semibold text-yellow-300">{setup.phoneFriendName} trả lời dứt khoát:</p>
              <p className="text-gray-200 italic leading-relaxed">
                &quot;Alo {setup.playerName}! Mình vừa nghe rõ câu hỏi của MC Lại Văn Sâm rồi. Mình rất tự tin (khoảng 85%) đáp án chính xác là:
              </p>
              <div className="p-2.5 sm:p-3 bg-cyan-950/80 border border-cyan-400/60 rounded-lg text-cyan-200 font-bold text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-cyan-500 text-blue-950 flex items-center justify-center font-black text-xs sm:text-sm flex-shrink-0">
                  {suggestedAnswer}
                </span>
                <span className="break-words">{answerText}</span>
              </div>
              <p className="text-[10px] sm:text-xs text-emerald-400 font-semibold">
                ✓ Bạn hãy tự tin chốt phương án này nhé, thời gian đàm thoại sắp hết rồi!
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl border border-cyan-300 shadow cursor-pointer text-center"
          >
            CẢM ƠN VÀ ĐÓNG CUỘC GỌI
          </button>
        </div>
      </div>
    </div>
  );
};

interface CompanionModalProps {
  setup: GameSetup;
  question: Question;
  onClose: () => void;
}

export const CompanionModal: React.FC<CompanionModalProps> = ({ setup, question, onClose }) => {
  // Use smart field matching: 85% if match, 70% if not match
  const isMatch = isFieldMatch(setup.companionField, question);
  const accuracy = isMatch ? 0.88 : 0.70;
  const isCorrect = Math.random() < accuracy;

  const options: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
  const wrongOptions = options.filter((o) => o !== question.correct_answer);
  const suggestedAnswer = isCorrect
    ? question.correct_answer
    : wrongOptions[Math.floor(Math.random() * wrongOptions.length)];

  const answerText =
    suggestedAnswer === 'A'
      ? question.option_a
      : suggestedAnswer === 'B'
      ? question.option_b
      : suggestedAnswer === 'C'
      ? question.option_c
      : question.option_d;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-2 sm:p-4 flex items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-lg my-auto max-h-[92vh] overflow-y-auto bg-gradient-to-b from-indigo-950 via-slate-900 to-black border-2 border-amber-400 rounded-2xl shadow-[0_0_40px_rgba(251,191,36,0.4)] p-4 sm:p-6 text-white">
        <div className="flex items-center gap-2.5 sm:gap-3 border-b border-amber-500/40 pb-2.5 sm:pb-3 mb-3 sm:mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-600/30 border border-amber-400 flex items-center justify-center text-xl sm:text-2xl shadow flex-shrink-0">
            🤝
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-amber-300 uppercase tracking-wider">
              Ý KIẾN NGƯỜI ĐỒNG HÀNH TRÊN GHẾ NÓNG
            </h3>
            <p className="text-[11px] sm:text-xs text-gray-300">
              {setup.companionRelation}: <strong className="text-yellow-400">{setup.companionName}</strong>
            </p>
          </div>
        </div>

        {/* Master field badge */}
        <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-[11px] sm:text-xs px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white/5 border border-white/10">
          <div>
            <span className="text-gray-400">Sở trường chuyên môn: </span>
            <span className="font-bold text-cyan-300">{setup.companionField}</span>
          </div>
          <div>
            {isMatch ? (
              <span className="px-1.5 sm:px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                ★ TRÙNG ĐÚNG SỞ TRƯỜNG (~90%)
              </span>
            ) : (
              <span className="px-1.5 sm:px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                💡 TƯ VẤN SUY LUẬN (~70%)
              </span>
            )}
          </div>
        </div>

        {/* Speech */}
        <div className="space-y-3 sm:space-y-4 py-1 sm:py-2">
          <div className="flex items-start gap-2.5 sm:gap-3 bg-white/5 p-3 sm:p-4 rounded-xl border border-amber-500/20">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-700/50 flex-shrink-0 flex items-center justify-center text-sm sm:text-base font-bold text-amber-200">
              {setup.companionName.charAt(0)}
            </div>
            <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <p className="font-semibold text-yellow-300">{setup.companionName} khuyên nhủ nhiệt tình:</p>
              {isMatch ? (
                <p className="text-gray-200 italic leading-relaxed">
                  &quot;Quá tuyệt vời! Câu hỏi này rơi đúng vào lĩnh vực sở trường <strong>{setup.companionField}</strong> của em! Em chắc chắn đến 90% đáp án đúng là:
                </p>
              ) : (
                <p className="text-gray-200 italic leading-relaxed">
                  &quot;Dù câu này không thuộc chuyên môn sâu <strong>{setup.companionField}</strong>, nhưng qua kiến thức xã hội và suy luận loại trừ, em tin chắc đáp án là:
                </p>
              )}

              <div className="p-2.5 sm:p-3 bg-amber-950/80 border border-amber-400/60 rounded-lg text-amber-200 font-bold text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-amber-500 text-blue-950 flex items-center justify-center font-black text-xs sm:text-sm flex-shrink-0">
                  {suggestedAnswer}
                </span>
                <span className="break-words">{answerText}</span>
              </div>
              <p className="text-[10px] sm:text-xs text-amber-300">
                Hãy vững tâm bước tiếp hành trình triệu phú nhé!
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-blue-950 font-bold text-xs sm:text-sm rounded-xl border border-yellow-300 shadow cursor-pointer text-center"
          >
            CẢM ƠN ĐỒNG HÀNH VÀ TIẾP TỤC
          </button>
        </div>
      </div>
    </div>
  );
};

interface SageModalProps {
  setup: GameSetup;
  question: Question;
  onClose: () => void;
}

export const SageModal: React.FC<SageModalProps> = ({ setup, question, onClose }) => {
  const options: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
  const wrongOptions = options.filter((o) => o !== question.correct_answer);

  // Smart matching for Sage 1 & Sage 2
  const matchSage1 = isFieldMatch(setup.sage1Field, question);
  const matchSage2 = isFieldMatch(setup.sage2Field, question);

  // If Sage 1 matches: 100% correct
  // If Sage 2 matches: 100% correct
  // If neither matches: Sage 1 has 88% accuracy, Sage 2 agrees with 82% accuracy
  let ans1: 'A' | 'B' | 'C' | 'D';
  let ans2: 'A' | 'B' | 'C' | 'D';

  if (matchSage1) {
    ans1 = question.correct_answer;
    ans2 = question.correct_answer; // Colleague agrees with the specialist
  } else if (matchSage2) {
    ans2 = question.correct_answer;
    ans1 = question.correct_answer; // Colleague agrees with the specialist
  } else {
    // Both are professors applying logic
    const isCorr1 = Math.random() < 0.88;
    ans1 = isCorr1 ? question.correct_answer : wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
    const isCorr2 = Math.random() < 0.82;
    ans2 = isCorr2 ? question.correct_answer : ans1;
  }

  const getText = (choice: 'A' | 'B' | 'C' | 'D') => {
    return choice === 'A'
      ? question.option_a
      : choice === 'B'
      ? question.option_b
      : choice === 'C'
      ? question.option_c
      : question.option_d;
  };

  const displayCategory = getDisplayCategory(question.category);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-2 sm:p-4 flex items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-2xl my-auto max-h-[92vh] overflow-y-auto bg-gradient-to-b from-purple-950 via-slate-950 to-black border-2 border-yellow-400 rounded-2xl shadow-[0_0_50px_rgba(234,179,8,0.5)] p-4 sm:p-6 text-white">
        <div className="flex items-center gap-2.5 sm:gap-3 border-b border-yellow-500/40 pb-2.5 sm:pb-3 mb-3 sm:mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-yellow-600/30 border border-yellow-400 flex items-center justify-center text-xl sm:text-2xl shadow animate-bounce flex-shrink-0">
            🧙‍♂️
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-yellow-300 uppercase tracking-wider">
              TỔ TƯ VẤN: Ý KIẾN 2 NHÀ THÔNG THÁI
            </h3>
            <p className="text-[11px] sm:text-xs text-gray-300">
              Lĩnh vực câu hỏi: <strong className="text-cyan-300 uppercase">{displayCategory}</strong>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 py-1 sm:py-2">
          {/* Sage 1 */}
          <div className="bg-white/5 border border-yellow-500/30 rounded-xl p-3 sm:p-4 flex flex-col justify-between space-y-2 sm:space-y-3">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-1 mb-1.5 sm:mb-2">
                <span className="font-bold text-yellow-400 text-xs sm:text-sm">{setup.sage1Name}</span>
                {matchSage1 ? (
                  <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-300 font-bold border border-emerald-500">
                    ★ ĐÚNG CHUYÊN MÔN (100%)
                  </span>
                ) : (
                  <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-blue-500/30 text-blue-300 font-medium border border-blue-400/40">
                    Chuyên môn: {setup.sage1Field}
                  </span>
                )}
              </div>
              <p className="text-[11px] sm:text-xs text-gray-200 italic leading-relaxed">
                {matchSage1
                  ? `\"Là chuyên gia nghiên cứu sâu về ${setup.sage1Field}, tôi khẳng định chắc chắn 100% đáp án chính xác là:\"`
                  : matchSage2
                  ? `\"Tôi hoàn toàn đồng tình và nhất trí cao với nhận định chuẩn xác của đồng nghiệp:\"`
                  : `\"Dù không phải chuyên môn hẹp ${setup.sage1Field}, qua phương pháp suy luận và loại trừ phương án nhiễu, tôi đánh giá cao nhất khả năng đáp án là:\"`}
              </p>
            </div>

            <div className="p-2.5 sm:p-3 bg-yellow-950/80 border border-yellow-400/60 rounded-lg text-yellow-200 font-bold text-xs sm:text-sm flex items-center gap-2">
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-yellow-400 text-blue-950 flex items-center justify-center font-black flex-shrink-0">
                {ans1}
              </span>
              <span className="break-words font-semibold">{getText(ans1)}</span>
            </div>
          </div>

          {/* Sage 2 */}
          <div className="bg-white/5 border border-yellow-500/30 rounded-xl p-3 sm:p-4 flex flex-col justify-between space-y-2 sm:space-y-3">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-1 mb-1.5 sm:mb-2">
                <span className="font-bold text-yellow-400 text-xs sm:text-sm">{setup.sage2Name}</span>
                {matchSage2 ? (
                  <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-300 font-bold border border-emerald-500">
                    ★ ĐÚNG CHUYÊN MÔN (100%)
                  </span>
                ) : (
                  <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-blue-500/30 text-blue-300 font-medium border border-blue-400/40">
                    Chuyên môn: {setup.sage2Field}
                  </span>
                )}
              </div>
              <p className="text-[11px] sm:text-xs text-gray-200 italic leading-relaxed">
                {matchSage2
                  ? `\"Trong lĩnh vực chuyên ngành ${setup.sage2Field} của tôi, tôi cam đoan 100% câu trả lời đúng là:\"`
                  : matchSage1
                  ? `\"Nhận định của chuyên gia ${setup.sage1Name} là hoàn toàn chuẩn xác. Tôi khuyên bạn chọn phương án:\"`
                  : `\"Bằng phương pháp logic và loại bỏ các đáp án sai, tôi đồng thuận với nhận định chọn:\"`}
              </p>
            </div>

            <div className="p-2.5 sm:p-3 bg-yellow-950/80 border border-yellow-400/60 rounded-lg text-yellow-200 font-bold text-xs sm:text-sm flex items-center gap-2">
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-yellow-400 text-blue-950 flex items-center justify-center font-black flex-shrink-0">
                {ans2}
              </span>
              <span className="break-words font-semibold">{getText(ans2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-blue-950 font-bold text-xs sm:text-sm rounded-xl border border-yellow-200 shadow cursor-pointer text-center"
          >
            LĨNH HỘI Ý KIẾN VÀ TIẾP TỤC
          </button>
        </div>
      </div>
    </div>
  );
};
