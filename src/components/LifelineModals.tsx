// src/components/LifelineModals.tsx
'use client';

import React from 'react';
import { GameSetup, Question } from '@/types/game';

interface PhoneModalProps {
  setup: GameSetup;
  question: Question;
  onClose: () => void;
}

export const PhoneModal: React.FC<PhoneModalProps> = ({ setup, question, onClose }) => {
  // 70% chance to suggest the correct answer
  const isCorrect = Math.random() < 0.7;
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md p-2 sm:p-4 flex items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-lg my-auto max-h-[92vh] overflow-y-auto bg-gradient-to-b from-blue-950 via-slate-900 to-black border-2 border-cyan-400 rounded-2xl shadow-[0_0_40px_rgba(34,211,238,0.4)] p-4 sm:p-6 text-white">
        <div className="flex items-center gap-2.5 sm:gap-3 border-b border-cyan-500/40 pb-2.5 sm:pb-3 mb-3 sm:mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-600/30 border border-cyan-400 flex items-center justify-center text-xl sm:text-2xl shadow animate-pulse flex-shrink-0">
            📞
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-cyan-300 uppercase tracking-wider">
              GỌI ĐIỆN CHO NGƯỜI THÂN
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
              <p className="font-semibold text-yellow-300">{setup.phoneFriendName} trả lời:</p>
              <p className="text-gray-200 italic leading-relaxed">
                &quot;Alo {setup.playerName}! Mình vừa nghe rõ câu hỏi. Theo hiểu biết của mình thì khả năng rất cao (khoảng 70%) đáp án đúng là:
              </p>
              <div className="p-2.5 sm:p-3 bg-cyan-950/80 border border-cyan-400/60 rounded-lg text-cyan-200 font-bold text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-cyan-500 text-blue-950 flex items-center justify-center font-black text-xs sm:text-sm flex-shrink-0">
                  {suggestedAnswer}
                </span>
                <span className="break-words">{answerText}</span>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-400">
                Hãy cân nhắc kỹ trước khi đưa ra quyết định cuối cùng nhé!
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
  // Rule: If question category matches master field, probability is 70%, otherwise 35%
  const isMatch = question.category.toLowerCase().trim() === setup.companionField.toLowerCase().trim();
  const accuracy = isMatch ? 0.7 : 0.35;
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md p-2 sm:p-4 flex items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-lg my-auto max-h-[92vh] overflow-y-auto bg-gradient-to-b from-indigo-950 via-slate-900 to-black border-2 border-amber-400 rounded-2xl shadow-[0_0_40px_rgba(251,191,36,0.4)] p-4 sm:p-6 text-white">
        <div className="flex items-center gap-2.5 sm:gap-3 border-b border-amber-500/40 pb-2.5 sm:pb-3 mb-3 sm:mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-600/30 border border-amber-400 flex items-center justify-center text-xl sm:text-2xl shadow flex-shrink-0">
            🤝
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-amber-300 uppercase tracking-wider">
              Ý KIẾN NGƯỜI ĐỒNG HÀNH
            </h3>
            <p className="text-[11px] sm:text-xs text-gray-300">
              {setup.companionRelation}: <strong className="text-yellow-400">{setup.companionName}</strong>
            </p>
          </div>
        </div>

        {/* Master field badge */}
        <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-[11px] sm:text-xs px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white/5 border border-white/10">
          <div>
            <span className="text-gray-400">Sở trường: </span>
            <span className="font-bold text-cyan-300">{setup.companionField}</span>
          </div>
          <div>
            {isMatch ? (
              <span className="px-1.5 sm:px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                ✓ Trùng sở trường (Độ tin cậy 70%)
              </span>
            ) : (
              <span className="px-1.5 sm:px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                ⚠ Lệch sở trường (~35%)
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
              <p className="font-semibold text-yellow-300">{setup.companionName} chia sẻ:</p>
              {isMatch ? (
                <p className="text-gray-200 italic leading-relaxed">
                  &quot;Thật may mắn, câu hỏi này đúng sở trường <strong>{setup.companionField}</strong> của em! Em khá chắc chắn (70%) đáp án là:
                </p>
              ) : (
                <p className="text-gray-200 italic leading-relaxed">
                  &quot;Chủ đề <strong>{question.category}</strong> này không phải chuyên môn sâu của em, nhưng qua linh cảm thì em nghiêng về phương án:
                </p>
              )}

              <div className="p-2.5 sm:p-3 bg-amber-950/80 border border-amber-400/60 rounded-lg text-amber-200 font-bold text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-amber-500 text-blue-950 flex items-center justify-center font-black text-xs sm:text-sm flex-shrink-0">
                  {suggestedAnswer}
                </span>
                <span className="break-words">{answerText}</span>
              </div>
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

  // Sage 1 logic: 100% if category matches field 1, else 45%
  const matchSage1 = question.category.toLowerCase().trim() === setup.sage1Field.toLowerCase().trim();
  const acc1 = matchSage1 ? 1.0 : 0.45;
  const isCorrect1 = Math.random() < acc1;
  const ans1 = isCorrect1 ? question.correct_answer : wrongOptions[Math.floor(Math.random() * wrongOptions.length)];

  // Sage 2 logic: 100% if category matches field 2, else 45%
  const matchSage2 = question.category.toLowerCase().trim() === setup.sage2Field.toLowerCase().trim();
  const acc2 = matchSage2 ? 1.0 : 0.45;
  const isCorrect2 = Math.random() < acc2;
  const ans2 = isCorrect2 ? question.correct_answer : wrongOptions[Math.floor(Math.random() * wrongOptions.length)];

  const getText = (choice: 'A' | 'B' | 'C' | 'D') => {
    return choice === 'A'
      ? question.option_a
      : choice === 'B'
      ? question.option_b
      : choice === 'C'
      ? question.option_c
      : question.option_d;
  };

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
              Chủ đề hiện tại: <strong className="text-cyan-300 uppercase">{question.category}</strong>
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
                  <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-gray-500/30 text-gray-300 font-medium">
                    {setup.sage1Field}
                  </span>
                )}
              </div>
              <p className="text-[11px] sm:text-xs text-gray-200 italic leading-relaxed">
                {matchSage1
                  ? `\"Trong chuyên môn sâu ${setup.sage1Field}, tôi khẳng định 100% đáp án là:\"`
                  : `\"Lĩnh vực của tôi là ${setup.sage1Field}, với câu này tôi nhận định đáp án là:\"`}
              </p>
            </div>

            <div className="p-2.5 sm:p-3 bg-yellow-950/80 border border-yellow-400/60 rounded-lg text-yellow-200 font-bold text-xs sm:text-sm flex items-center gap-2">
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-yellow-400 text-blue-950 flex items-center justify-center font-black flex-shrink-0">
                {ans1}
              </span>
              <span className="break-words">{getText(ans1)}</span>
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
                  <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-gray-500/30 text-gray-300 font-medium">
                    {setup.sage2Field}
                  </span>
                )}
              </div>
              <p className="text-[11px] sm:text-xs text-gray-200 italic leading-relaxed">
                {matchSage2
                  ? `\"Là chuyên gia trong ngành ${setup.sage2Field}, tôi đảm bảo 100% câu trả lời là:\"`
                  : `\"Dù không thuộc chuyên môn ${setup.sage2Field}, qua suy luận tôi đề xuất:\"`}
              </p>
            </div>

            <div className="p-2.5 sm:p-3 bg-yellow-950/80 border border-yellow-400/60 rounded-lg text-yellow-200 font-bold text-xs sm:text-sm flex items-center gap-2">
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-yellow-400 text-blue-950 flex items-center justify-center font-black flex-shrink-0">
                {ans2}
              </span>
              <span className="break-words">{getText(ans2)}</span>
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
