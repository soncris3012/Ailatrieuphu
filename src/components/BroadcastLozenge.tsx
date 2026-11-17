'use client';

import React, { useId } from 'react';

interface QuestionLozengeProps {
  level: number;
  category: string;
  question: string;
  isMilestone?: boolean;
  isLoading?: boolean;
}

export const QuestionLozenge: React.FC<QuestionLozengeProps> = ({
  level,
  category,
  question,
  isMilestone = false,
  isLoading = false,
}) => {
  const uid = useId().replace(/:/g, '');
  const fillGradId = `qFill_${uid}`;
  const rimGradId = `qRim_${uid}`;

  return (
    <div className="relative w-full py-2 sm:py-2.5">
      {/* Full-width edge-to-edge VTV3 horizontal metallic wing line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -left-4 -right-4 sm:-left-8 sm:-right-8 h-[2px] -translate-y-1/2 bg-gradient-to-r from-transparent via-sky-300/75 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -left-4 -right-4 sm:-left-8 sm:-right-8 h-[6px] -translate-y-1/2 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent blur-[2px]"
      />

      {/* Top Centered Broadcast Tag */}
      <div className="relative z-20 -mb-1.5 sm:-mb-2.5 flex justify-center">
        <div
          className={`inline-flex max-w-[92%] flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 rounded-full border px-2.5 sm:px-3.5 py-0.5 text-[9px] sm:text-xs font-extrabold uppercase tracking-wide sm:tracking-wider shadow-[0_2px_12px_rgba(0,0,0,0.75)] ${
            isMilestone
              ? 'border-amber-200 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-slate-950'
              : 'border-sky-300/75 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 text-amber-300'
          }`}
        >
          <span>CÂU HỎI SỐ {level}</span>
          {isMilestone && (
            <span className="rounded bg-slate-950/20 px-1.5 py-0.2 text-[8px] sm:text-[10px] font-black text-slate-950">
              • MỐC AN TOÀN
            </span>
          )}
          <span
            className={`hidden sm:inline ${
              isMilestone ? 'text-slate-900/75' : 'text-sky-400/70'
            }`}
          >
            |
          </span>
          <span
            className={`truncate font-bold ${
              isMilestone ? 'text-slate-950' : 'text-sky-200'
            }`}
          >
            {category}
          </span>
        </div>
      </div>

      {/* Main Double-Bevel SVG Hexagonal Question Frame */}
      <div className="relative z-10 w-full min-h-[84px] sm:min-h-[104px] md:min-h-[116px] flex items-center justify-center px-8 sm:px-12 md:px-16 py-4 sm:py-5">
        <svg
          aria-hidden="true"
          viewBox="0 0 1000 160"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full drop-shadow-[0_10px_28px_rgba(0,0,0,0.8)]"
        >
          <defs>
            <linearGradient id={fillGradId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f2b7a" stopOpacity="0.97" />
              <stop offset="48%" stopColor="#071547" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#030924" stopOpacity="0.99" />
            </linearGradient>
            <linearGradient id={rimGradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="22%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#f8fafc" />
              <stop offset="78%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#93c5fd" />
            </linearGradient>
          </defs>

          {/* Outer hexagonal lozenge with crisp metallic rim */}
          <polygon
            points="4,80 34,8 966,8 996,80 966,152 34,152"
            fill={`url(#${fillGradId})`}
            stroke={`url(#${rimGradId})`}
            strokeWidth="2.8"
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
          />

          {/* Inner secondary broadcast bevel line */}
          <polygon
            points="12,80 39,14 961,14 988,80 961,146 39,146"
            fill="none"
            stroke={isMilestone ? '#fde047' : '#38bdf8'}
            strokeOpacity="0.45"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Left & Right internal diamond pips */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 rotate-45 h-2 w-2 sm:h-2.5 sm:w-2.5 bg-gradient-to-br from-amber-200 to-amber-500 shadow-[0_0_8px_rgba(251,191,36,0.9)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 rotate-45 h-2 w-2 sm:h-2.5 sm:w-2.5 bg-gradient-to-br from-amber-200 to-amber-500 shadow-[0_0_8px_rgba(251,191,36,0.9)]"
        />

        {/* Question Copy */}
        <h2
          className={`relative z-10 text-center font-semibold tracking-[0.01em] text-white break-words leading-snug sm:leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] ${
            question.length > 135
              ? 'text-xs sm:text-sm md:text-base'
              : question.length > 90
              ? 'text-sm sm:text-base md:text-lg'
              : 'text-sm sm:text-lg md:text-xl'
          }`}
        >
          {isLoading ? 'Đang kết nối trường quay VTV3...' : question}
        </h2>
      </div>
    </div>
  );
};

export type AnswerLozengeStatus = 'idle' | 'selected' | 'correct' | 'wrong' | 'hidden';

interface AnswerLozengeProps {
  letter: 'A' | 'B' | 'C' | 'D';
  text: string;
  status: AnswerLozengeStatus;
  disabled?: boolean;
  onClick: () => void;
}

export const AnswerLozenge: React.FC<AnswerLozengeProps> = ({
  letter,
  text,
  status,
  disabled = false,
  onClick,
}) => {
  const uid = useId().replace(/:/g, '');
  const fillGradId = `ansFill_${uid}`;
  const rimGradId = `ansRim_${uid}`;

  const isHidden = status === 'hidden';
  const isSelected = status === 'selected';
  const isCorrect = status === 'correct';
  const isWrong = status === 'wrong';

  let fillStops: [string, string, string] = ['#0d2468', '#06113a', '#02071c'];
  let rimStops: [string, string, string] = ['#60a5fa', '#e2e8f0', '#60a5fa'];
  let innerRimColor = '#38bdf8';

  if (isSelected) {
    fillStops = ['#fde047', '#f59e0b', '#b45309'];
    rimStops = ['#fffbeb', '#fef08a', '#f59e0b'];
    innerRimColor = '#ffffff';
  } else if (isCorrect) {
    fillStops = ['#34d399', '#10b981', '#065f46'];
    rimStops = ['#ecfdf5', '#6ee7b7', '#10b981'];
    innerRimColor = '#d1fae5';
  } else if (isWrong) {
    fillStops = ['#f87171', '#dc2626', '#7f1d1d'];
    rimStops = ['#fee2e2', '#fca5a5', '#ef4444'];
    innerRimColor = '#fecaca';
  } else if (isHidden) {
    fillStops = ['#091334', '#050b21', '#020512'];
    rimStops = ['#334155', '#475569', '#334155'];
    innerRimColor = '#334155';
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isHidden}
      aria-hidden={isHidden}
      tabIndex={isHidden ? -1 : 0}
      className={`group relative w-full text-left flex items-center min-h-[50px] sm:min-h-[58px] px-5 sm:px-8 py-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
        isHidden
          ? 'opacity-35 cursor-default pointer-events-none'
          : disabled
          ? 'cursor-default'
          : 'cursor-pointer hover:scale-[1.01] active:scale-[0.99]'
      } ${isSelected ? 'animate-amber-pulse' : ''} ${isCorrect ? 'animate-emerald-flash' : ''}`}
    >
      {/* Double-bevel hexagonal answer lozenge SVG */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full drop-shadow-[0_4px_14px_rgba(0,0,0,0.65)]"
      >
        <defs>
          <linearGradient id={fillGradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={fillStops[0]} stopOpacity="0.97" />
            <stop offset="52%" stopColor={fillStops[1]} stopOpacity="0.98" />
            <stop offset="100%" stopColor={fillStops[2]} stopOpacity="0.99" />
          </linearGradient>
          <linearGradient id={rimGradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={rimStops[0]} />
            <stop offset="50%" stopColor={rimStops[1]} />
            <stop offset="100%" stopColor={rimStops[2]} />
          </linearGradient>
        </defs>

        <polygon
          points="3,50 28,6 972,6 997,50 972,94 28,94"
          fill={`url(#${fillGradId})`}
          stroke={`url(#${rimGradId})`}
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
        />

        <polygon
          points="10,50 32,12 968,12 990,50 968,88 32,88"
          fill="none"
          stroke={innerRimColor}
          strokeOpacity={isHidden ? 0.2 : 0.45}
          strokeWidth="1.1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Hover subtle glow on idle interactive lozenges */}
      {status === 'idle' && !disabled && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 inset-y-1.5 rounded-full bg-amber-400/0 transition-colors duration-200 group-hover:bg-amber-400/12"
        />
      )}

      {/* Content */}
      {!isHidden ? (
        <div className="relative z-10 flex w-full items-center gap-2 sm:gap-2.5 min-w-0">
          {/* VTV3 Signature Diamond Pip */}
          <span
            aria-hidden="true"
            className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rotate-45 flex-shrink-0 transition-transform group-hover:scale-110 ${
              isSelected || isCorrect || isWrong
                ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]'
                : 'bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.75)]'
            }`}
          />

          {/* Option Letter */}
          <span
            className={`font-display text-sm sm:text-base md:text-lg font-extrabold flex-shrink-0 ${
              isSelected
                ? 'text-slate-950'
                : isCorrect || isWrong
                ? 'text-white'
                : 'text-amber-300 group-hover:text-amber-200'
            }`}
          >
            {letter}:
          </span>

          {/* Option Text */}
          <span
            className={`font-semibold leading-snug break-words min-w-0 flex-1 ${
              isSelected
                ? 'text-slate-950'
                : 'text-white'
            } ${
              text.length > 52
                ? 'text-xs sm:text-sm'
                : 'text-xs sm:text-sm md:text-base'
            }`}
          >
            {text}
          </span>
        </div>
      ) : (
        <span className="relative z-10 h-5" />
      )}
    </button>
  );
};
