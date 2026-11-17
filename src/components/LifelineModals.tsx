'use client';

import React, { useMemo } from 'react';
import { GameSetup, Question } from '@/types/game';
import {
  CompanionIcon,
  PhoneWaveIcon,
  SageScrollIcon,
  SparkleIcon,
} from './BroadcastIcons';

type Choice = 'A' | 'B' | 'C' | 'D';

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

  // Direct match or partial match (guarded against empty category)
  if (cat && (cat === f || cat.includes(f) || f.includes(cat))) return true;

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
  if (f.includes('văn hóa') || f.includes('xã hội') || f.includes('đời sống')) {
    return (
      cat.includes('văn hóa') ||
      cat.includes('xã hội') ||
      cat.includes('đời sống') ||
      /tục ngữ|thành ngữ|lễ hội|phong tục|truyền thống/i.test(fullText)
    );
  }
  if (f.includes('y học') || f.includes('sức khỏe')) {
    return (
      cat.includes('y học') ||
      cat.includes('sức khỏe') ||
      /vitamin|huyết áp|tim|phổi|bác sĩ|y tế|bệnh/i.test(fullText)
    );
  }
  if (f.includes('kinh tế') || f.includes('pháp luật')) {
    return (
      cat.includes('kinh tế') ||
      cat.includes('pháp luật') ||
      /luật|hiến pháp|ngân hàng|tiền tệ|kinh tế/i.test(fullText)
    );
  }
  return false;
}

// Format clean Vietnamese category display
export function getDisplayCategory(rawCat: string): string {
  const c = (rawCat || '').toLowerCase().trim();
  if (c.includes('lịch sử') || c.includes('history') || c.includes('people')) return 'Lịch sử';
  if (c.includes('địa lý') || c.includes('geography') || c.includes('world')) return 'Địa lý';
  if (c.includes('văn học') || c.includes('humanities')) return 'Văn học';
  if (c.includes('thể thao') || c.includes('sport')) return 'Thể thao';
  if (c.includes('nghệ thuật') || c.includes('giải trí') || c.includes('movie') || c.includes('music'))
    return 'Nghệ thuật & Giải trí';
  if (c.includes('khoa học') || c.includes('tự nhiên') || c.includes('hóa học') || c.includes('animal'))
    return 'Khoa học & Tự nhiên';
  if (c.includes('ẩm thực')) return 'Ẩm thực & Văn hóa';
  if (c.includes('văn hóa') || c.includes('xã hội')) return 'Văn hóa & Xã hội';
  if (c.includes('đời sống') || c.includes('thường thức')) return 'Đời sống & Thường thức';
  if (c.includes('y học') || c.includes('sức khỏe')) return 'Y học & Sức khỏe';
  if (c.includes('kinh tế') || c.includes('pháp luật')) return 'Kinh tế & Pháp luật';
  return 'Kiến thức chung & Đời sống';
}

const getOptionText = (choice: Choice, question: Question) => {
  return choice === 'A'
    ? question.option_a
    : choice === 'B'
    ? question.option_b
    : choice === 'C'
    ? question.option_c
    : question.option_d;
};

function getAvailableWrongOptions(
  question: Question,
  hiddenOptions: Choice[] = []
): Choice[] {
  const hiddenSet = new Set<Choice>(hiddenOptions);
  const allOptions: Choice[] = ['A', 'B', 'C', 'D'];
  return allOptions.filter((o) => !hiddenSet.has(o) && o !== question.correct_answer);
}

// Pure deterministic pseudo-random in [0, 1) keyed by contestant + question so render/useMemo stays pure
function deterministicRoll(seedInput: string): number {
  let h = 2166136261;
  for (let i = 0; i < seedInput.length; i++) {
    h ^= seedInput.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}

// ----------------------------------------------------
// 1. Phone Modal
// ----------------------------------------------------
interface PhoneModalProps {
  setup: GameSetup;
  question: Question;
  hiddenOptions?: Choice[];
  onClose: () => void;
  onSelectAnswer?: (choice: Choice) => void;
}

export const PhoneModal: React.FC<PhoneModalProps> = ({
  setup,
  question,
  hiddenOptions = [],
  onClose,
  onSelectAnswer,
}) => {
  // Stable pure calculation on mount
  const { suggestedAnswer, answerText } = useMemo(() => {
    const roll = deterministicRoll(`phone:${setup.playerName}:${setup.phoneFriendName}:${question.question}`);
    const isCorrect = roll < 0.88;
    const wrongOptions = getAvailableWrongOptions(question, hiddenOptions);
    const pickIdx = Math.floor(deterministicRoll(`pick:${question.question}:${roll}`) * wrongOptions.length);
    const chosen: Choice =
      isCorrect || wrongOptions.length === 0
        ? question.correct_answer
        : wrongOptions[pickIdx];
    return {
      suggestedAnswer: chosen,
      answerText: getOptionText(chosen, question),
    };
  }, [question, hiddenOptions, setup.playerName, setup.phoneFriendName]);

  const handlePick = () => {
    if (onSelectAnswer) {
      onSelectAnswer(suggestedAnswer);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-2 sm:p-4 flex items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-lg my-auto max-h-[92vh] overflow-y-auto rounded-2xl border-2 border-cyan-400/80 bg-gradient-to-b from-[#0b2358] via-[#071133] to-[#020514] p-4 sm:p-6 text-white shadow-[0_0_45px_rgba(34,211,238,0.38)]">
        <div className="flex items-center gap-2.5 sm:gap-3 border-b border-cyan-400/35 pb-2.5 sm:pb-3 mb-3 sm:mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-500/20 border border-cyan-300 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.3)] flex-shrink-0">
            <PhoneWaveIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <h3 className="font-display text-sm sm:text-lg font-extrabold text-cyan-300 uppercase tracking-wider">
              GỌI ĐIỆN CHO NGƯỜI THÂN
            </h3>
            <p className="text-[11px] sm:text-xs text-sky-200/85 truncate">
              Đang kết nối đường dây nóng tới:{' '}
              <strong className="text-amber-300">{setup.phoneFriendName}</strong>
            </p>
          </div>
        </div>

        {/* Call Dialogue */}
        <div className="space-y-3 sm:space-y-4 py-1 sm:py-2">
          <div className="flex items-start gap-2.5 sm:gap-3 bg-white/[0.04] p-3 sm:p-4 rounded-xl border border-cyan-400/25">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cyan-600/40 border border-cyan-400/40 flex-shrink-0 flex items-center justify-center text-sm sm:text-base font-bold text-cyan-200">
              {setup.phoneFriendName.charAt(0).toUpperCase()}
            </div>
            <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm flex-1 min-w-0">
              <p className="font-semibold text-amber-300">
                {setup.phoneFriendName} trả lời dứt khoát:
              </p>
              <p className="text-slate-200 italic leading-relaxed">
                &quot;Alo {setup.playerName}! Mình vừa nghe rõ câu hỏi từ MC Lại Văn Sâm rồi. Mình
                rất tự tin đáp án chính xác là:&quot;
              </p>
              <button
                type="button"
                onClick={handlePick}
                className="w-full text-left p-2.5 sm:p-3 bg-cyan-950/85 hover:bg-cyan-900 border border-cyan-400/70 hover:border-cyan-200 rounded-lg text-cyan-100 font-bold text-sm sm:text-base flex items-center gap-2 transition-all cursor-pointer shadow-md group"
              >
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-cyan-400 text-slate-950 flex items-center justify-center font-black text-xs sm:text-sm flex-shrink-0 group-hover:scale-110 transition-transform">
                  {suggestedAnswer}
                </span>
                <span className="break-words min-w-0">{answerText}</span>
              </button>
              <p className="text-[10px] sm:text-xs text-emerald-400 font-semibold">
                Hãy tự tin chốt phương án này nhé!
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 bg-white/10 hover:bg-white/20 text-slate-200 font-medium text-xs sm:text-sm rounded-xl border border-white/20 transition-all cursor-pointer text-center"
          >
            Đóng để tự chọn
          </button>
          <button
            type="button"
            onClick={handlePick}
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl border border-cyan-300 shadow-lg cursor-pointer text-center flex items-center justify-center gap-1.5"
          >
            <span>CHỌN THEO NGƯỜI THÂN: ĐÁP ÁN [{suggestedAnswer}]</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 2. Companion Modal
// ----------------------------------------------------
interface CompanionModalProps {
  setup: GameSetup;
  question: Question;
  hiddenOptions?: Choice[];
  onClose: () => void;
  onSelectAnswer?: (choice: Choice) => void;
}

export const CompanionModal: React.FC<CompanionModalProps> = ({
  setup,
  question,
  hiddenOptions = [],
  onClose,
  onSelectAnswer,
}) => {
  // Stable pure calculation on mount
  const { isMatch, suggestedAnswer, answerText } = useMemo(() => {
    const match = isFieldMatch(setup.companionField, question);
    const accuracy = match ? 0.92 : 0.75;
    const roll = deterministicRoll(`companion:${setup.playerName}:${setup.companionName}:${question.question}`);
    const isCorrect = roll < accuracy;
    const wrongOptions = getAvailableWrongOptions(question, hiddenOptions);
    const pickIdx = Math.floor(deterministicRoll(`cpick:${question.question}:${roll}`) * wrongOptions.length);
    const chosen: Choice =
      isCorrect || wrongOptions.length === 0
        ? question.correct_answer
        : wrongOptions[pickIdx];
    return {
      isMatch: match,
      suggestedAnswer: chosen,
      answerText: getOptionText(chosen, question),
    };
  }, [question, setup.companionField, setup.playerName, setup.companionName, hiddenOptions]);

  const handlePick = () => {
    if (onSelectAnswer) {
      onSelectAnswer(suggestedAnswer);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-2 sm:p-4 flex items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-lg my-auto max-h-[92vh] overflow-y-auto rounded-2xl border-2 border-amber-400/85 bg-gradient-to-b from-[#161a55] via-[#090e33] to-[#020514] p-4 sm:p-6 text-white shadow-[0_0_45px_rgba(251,191,36,0.38)]">
        <div className="flex items-center gap-2.5 sm:gap-3 border-b border-amber-400/35 pb-2.5 sm:pb-3 mb-3 sm:mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-500/20 border border-amber-300 flex items-center justify-center text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)] flex-shrink-0">
            <CompanionIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <h3 className="font-display text-sm sm:text-lg font-extrabold text-amber-300 uppercase tracking-wider">
              Ý KIẾN NGƯỜI ĐỒNG HÀNH TRÊN GHẾ NÓNG
            </h3>
            <p className="text-[11px] sm:text-xs text-sky-200/85 truncate">
              {setup.companionRelation}:{' '}
              <strong className="text-amber-300">{setup.companionName}</strong>
            </p>
          </div>
        </div>

        {/* Master field badge */}
        <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 text-[11px] sm:text-xs px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white/[0.04] border border-white/15">
          <div>
            <span className="text-slate-400">Sở trường chuyên môn: </span>
            <span className="font-bold text-cyan-300">{setup.companionField}</span>
          </div>
          <div>
            {isMatch ? (
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-400/45">
                ★ TRÙNG ĐÚNG SỞ TRƯỜNG (~92%)
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-400/45">
                TƯ VẤN SUY LUẬN (~75%)
              </span>
            )}
          </div>
        </div>

        {/* Speech */}
        <div className="space-y-3 sm:space-y-4 py-1 sm:py-2">
          <div className="flex items-start gap-2.5 sm:gap-3 bg-white/[0.04] p-3 sm:p-4 rounded-xl border border-amber-400/25">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-600/40 border border-amber-400/40 flex-shrink-0 flex items-center justify-center text-sm sm:text-base font-bold text-amber-200">
              {setup.companionName.charAt(0).toUpperCase()}
            </div>
            <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm flex-1 min-w-0">
              <p className="font-semibold text-amber-300">
                {setup.companionName} trao đổi trực tiếp tại trường quay:
              </p>
              {isMatch ? (
                <p className="text-slate-200 italic leading-relaxed">
                  &quot;Quá tuyệt vời! Câu hỏi này rơi đúng vào lĩnh vực sở trường{' '}
                  <strong>{setup.companionField}</strong> của em! Em tin tưởng phương án đúng
                  là:&quot;
                </p>
              ) : (
                <p className="text-slate-200 italic leading-relaxed">
                  &quot;Dù câu này không thuộc chuyên môn sâu{' '}
                  <strong>{setup.companionField}</strong>, nhưng qua kiến thức phổ thông và suy
                  luận loại trừ, em đề xuất đáp án:&quot;
                </p>
              )}

              <button
                type="button"
                onClick={handlePick}
                className="w-full text-left p-2.5 sm:p-3 bg-amber-950/85 hover:bg-amber-900 border border-amber-400/70 hover:border-amber-200 rounded-lg text-amber-100 font-bold text-sm sm:text-base flex items-center gap-2 transition-all cursor-pointer shadow-md group"
              >
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs sm:text-sm flex-shrink-0 group-hover:scale-110 transition-transform">
                  {suggestedAnswer}
                </span>
                <span className="break-words min-w-0">{answerText}</span>
              </button>
              <p className="text-[10px] sm:text-xs text-amber-300">
                Hãy vững tâm bước tiếp hành trình triệu phú nhé!
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 bg-white/10 hover:bg-white/20 text-slate-200 font-medium text-xs sm:text-sm rounded-xl border border-white/20 transition-all cursor-pointer text-center"
          >
            Đóng để tự chọn
          </button>
          <button
            type="button"
            onClick={handlePick}
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl border border-yellow-200 shadow-lg cursor-pointer text-center flex items-center justify-center gap-1.5"
          >
            <span>CHỌN THEO ĐỒNG HÀNH: ĐÁP ÁN [{suggestedAnswer}]</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 3. Sages Modal
// ----------------------------------------------------
interface SageModalProps {
  setup: GameSetup;
  question: Question;
  hiddenOptions?: Choice[];
  onClose: () => void;
  onSelectAnswer?: (choice: Choice) => void;
}

export const SageModal: React.FC<SageModalProps> = ({
  setup,
  question,
  hiddenOptions = [],
  onClose,
  onSelectAnswer,
}) => {
  // Stable calculation on mount (never changes across re-renders!)
  const sageAnalysis = useMemo(() => {
    const wrongOptions = getAvailableWrongOptions(question, hiddenOptions);

    const m1 = isFieldMatch(setup.sage1Field, question);
    const m2 = isFieldMatch(setup.sage2Field, question);

    let a1: Choice;
    let a2: Choice;
    let q1 = '';
    let q2 = '';

    if (m1) {
      a1 = question.correct_answer;
      a2 = question.correct_answer;
      q1 = `"Là chuyên gia nghiên cứu sâu về ${setup.sage1Field}, tôi khẳng định chắc chắn 100% đáp án chính xác là:"`;
      q2 = `"Nhận định chuyên ngành của Giáo sư ${setup.sage1Name} là hoàn toàn chuẩn xác. Tôi nhất trí cao chọn phương án:"`;
    } else if (m2) {
      a2 = question.correct_answer;
      a1 = question.correct_answer;
      q2 = `"Trong lĩnh vực chuyên ngành ${setup.sage2Field} của tôi, tôi cam đoan 100% câu trả lời đúng là:"`;
      q1 = `"Tôi hoàn toàn đồng tình và nhất trí với phân tích xác đáng của đồng nghiệp ${setup.sage2Name}:"`;
    } else {
      // Both professors use logic and deduction with high accuracy (>92%)
      const roll = deterministicRoll(`sage:${setup.playerName}:${setup.sage1Name}:${setup.sage2Name}:${question.question}`);
      const isCorrectConsensus = roll < 0.92;
      if (isCorrectConsensus || wrongOptions.length === 0) {
        a1 = question.correct_answer;
        a2 = question.correct_answer;
        q1 = `"Dù không phải chuyên ngành hẹp, qua phương pháp suy luận và loại trừ phương án nhiễu, tôi đánh giá cao nhất khả năng đáp án là:"`;
        q2 = `"Bằng phương pháp tư duy logic và kiểm tra dữ liệu, tôi hoàn toàn đồng thuận với nhận định chọn:"`;
      } else {
        const pickIdx = Math.floor(deterministicRoll(`spick:${question.question}:${roll}`) * wrongOptions.length);
        a1 = question.correct_answer;
        a2 = wrongOptions[pickIdx];
        q1 = `"Theo tra cứu và phân tích lịch sử/tư liệu, tôi nghiêng về phương án:"`;
        q2 = `"Đây là câu hỏi khá hóc búa, từ góc độ của tôi, một phương án cũng rất đáng lưu tâm là:"`;
      }
    }

    const isConsensus = a1 === a2;
    const recommendedChoice: Choice = m1 ? a1 : m2 ? a2 : a1;

    return {
      matchSage1: m1,
      matchSage2: m2,
      ans1: a1,
      ans2: a2,
      text1: getOptionText(a1, question),
      text2: getOptionText(a2, question),
      quote1: q1,
      quote2: q2,
      consensus: isConsensus,
      recommendedChoice,
      recommendedText: getOptionText(recommendedChoice, question),
    };
  }, [question, setup.sage1Field, setup.sage2Field, setup.sage1Name, setup.sage2Name, setup.playerName, hiddenOptions]);

  const displayCategory = getDisplayCategory(question.category);

  const handlePickChoice = (choice: Choice) => {
    if (onSelectAnswer) {
      onSelectAnswer(choice);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-2 sm:p-4 flex items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-2xl my-auto max-h-[92vh] overflow-y-auto rounded-2xl border-2 border-amber-400 bg-gradient-to-b from-[#20124d] via-[#090d2e] to-[#020514] p-4 sm:p-6 text-white shadow-[0_0_50px_rgba(234,179,8,0.45)]">
        {/* Header */}
        <div className="flex items-center gap-2.5 sm:gap-3 border-b border-amber-400/35 pb-2.5 sm:pb-3 mb-3 sm:mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-500/20 border border-amber-300 flex items-center justify-center text-amber-300 shadow-[0_0_15px_rgba(234,179,8,0.35)] flex-shrink-0">
            <SageScrollIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <h3 className="font-display text-sm sm:text-lg font-extrabold text-amber-300 uppercase tracking-wider">
              TỔ TƯ VẤN: Ý KIẾN 2 NHÀ THÔNG THÁI
            </h3>
            <p className="text-[11px] sm:text-xs text-sky-200/85">
              Lĩnh vực câu hỏi:{' '}
              <strong className="text-cyan-300 uppercase">{displayCategory}</strong>
            </p>
          </div>
        </div>

        {/* Highlighted Consensus Banner */}
        {sageAnalysis.consensus && (
          <div className="mb-3 sm:mb-4 p-3 bg-gradient-to-r from-amber-950/80 via-yellow-900/55 to-amber-950/80 border-2 border-amber-400 rounded-xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <SparkleIcon className="h-4 w-4 text-amber-300 flex-shrink-0" />
              <div className="text-xs sm:text-sm min-w-0">
                <span className="text-slate-200">Tổ tư vấn thống nhất chốt: </span>
                <span className="font-extrabold text-amber-300 text-sm sm:text-base">
                  Phương án [{sageAnalysis.recommendedChoice}]
                </span>
                <span className="text-amber-100 hidden sm:inline ml-1 truncate">
                  - {sageAnalysis.recommendedText}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handlePickChoice(sageAnalysis.recommendedChoice)}
              className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-lg shadow-md transition-all cursor-pointer whitespace-nowrap active:scale-95"
            >
              CHỌN NGAY [{sageAnalysis.recommendedChoice}]
            </button>
          </div>
        )}

        {/* 2 Sages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 py-1 sm:py-2">
          {/* Sage 1 */}
          <div className="bg-white/[0.04] border border-amber-400/30 rounded-xl p-3 sm:p-4 flex flex-col justify-between space-y-2 sm:space-y-3">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-1 mb-1.5 sm:mb-2">
                <span className="font-bold text-amber-300 text-xs sm:text-sm">
                  {setup.sage1Name}
                </span>
                {sageAnalysis.matchSage1 ? (
                  <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-300 font-bold border border-emerald-500">
                    ★ ĐÚNG CHUYÊN MÔN (100%)
                  </span>
                ) : (
                  <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-blue-500/30 text-blue-300 font-medium border border-blue-400/40">
                    Chuyên môn: {setup.sage1Field}
                  </span>
                )}
              </div>
              <p className="text-[11px] sm:text-xs text-slate-200 italic leading-relaxed">
                {sageAnalysis.quote1}
              </p>
            </div>

            <button
              type="button"
              onClick={() => handlePickChoice(sageAnalysis.ans1)}
              className="w-full text-left p-2.5 sm:p-3 bg-amber-950/85 hover:bg-amber-900 border border-amber-400/60 hover:border-amber-200 rounded-lg text-amber-100 font-bold text-xs sm:text-sm flex items-center justify-between gap-2 cursor-pointer transition-all shadow-md group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-amber-400 text-slate-950 flex items-center justify-center font-black flex-shrink-0 group-hover:scale-110 transition-transform">
                  {sageAnalysis.ans1}
                </span>
                <span className="break-words font-semibold truncate">{sageAnalysis.text1}</span>
              </div>
              <span className="text-[10px] sm:text-xs text-amber-300 font-bold opacity-80 group-hover:opacity-100 whitespace-nowrap">
                Chọn
              </span>
            </button>
          </div>

          {/* Sage 2 */}
          <div className="bg-white/[0.04] border border-amber-400/30 rounded-xl p-3 sm:p-4 flex flex-col justify-between space-y-2 sm:space-y-3">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-1 mb-1.5 sm:mb-2">
                <span className="font-bold text-amber-300 text-xs sm:text-sm">
                  {setup.sage2Name}
                </span>
                {sageAnalysis.matchSage2 ? (
                  <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-300 font-bold border border-emerald-500">
                    ★ ĐÚNG CHUYÊN MÔN (100%)
                  </span>
                ) : (
                  <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-blue-500/30 text-blue-300 font-medium border border-blue-400/40">
                    Chuyên môn: {setup.sage2Field}
                  </span>
                )}
              </div>
              <p className="text-[11px] sm:text-xs text-slate-200 italic leading-relaxed">
                {sageAnalysis.quote2}
              </p>
            </div>

            <button
              type="button"
              onClick={() => handlePickChoice(sageAnalysis.ans2)}
              className="w-full text-left p-2.5 sm:p-3 bg-amber-950/85 hover:bg-amber-900 border border-amber-400/60 hover:border-amber-200 rounded-lg text-amber-100 font-bold text-xs sm:text-sm flex items-center justify-between gap-2 cursor-pointer transition-all shadow-md group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-amber-400 text-slate-950 flex items-center justify-center font-black flex-shrink-0 group-hover:scale-110 transition-transform">
                  {sageAnalysis.ans2}
                </span>
                <span className="break-words font-semibold truncate">{sageAnalysis.text2}</span>
              </div>
              <span className="text-[10px] sm:text-xs text-amber-300 font-bold opacity-80 group-hover:opacity-100 whitespace-nowrap">
                Chọn
              </span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end items-center">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 bg-white/10 hover:bg-white/20 text-slate-200 font-medium text-xs sm:text-sm rounded-xl border border-white/20 transition-all cursor-pointer text-center"
          >
            Đóng để tự suy nghĩ
          </button>
          <button
            type="button"
            onClick={() => handlePickChoice(sageAnalysis.recommendedChoice)}
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl border border-yellow-200 shadow-xl cursor-pointer text-center flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <span>LĨNH HỘI Ý KIẾN VÀ CHỌN [{sageAnalysis.recommendedChoice}]</span>
          </button>
        </div>
      </div>
    </div>
  );
};
