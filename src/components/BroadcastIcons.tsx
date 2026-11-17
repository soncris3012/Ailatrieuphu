'use client';

import React, { useId } from 'react';

interface IconProps {
  className?: string;
}

export const SoundOnIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" fillOpacity="0.2" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" strokeLinecap="round" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" strokeLinecap="round" />
  </svg>
);

export const SoundOffIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" fillOpacity="0.15" />
    <line x1="23" y1="9" x2="17" y2="15" strokeLinecap="round" />
    <line x1="17" y1="9" x2="23" y2="15" strokeLinecap="round" />
  </svg>
);

export const TrophyIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className}>
    <path d="M8 21h8" strokeLinecap="round" />
    <path d="M12 17v4" strokeLinecap="round" />
    <path d="M7 4h10v6a5 5 0 0 1-10 0V4z" fill="currentColor" fillOpacity="0.22" />
    <path d="M17 5h2a2 2 0 0 1 2 2v1a3 3 0 0 1-3 3h-1" />
    <path d="M7 5H5a2 2 0 0 0-2 2v1a3 3 0 0 0 3 3h1" />
  </svg>
);

export const LadderIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <line x1="4" y1="6" x2="20" y2="6" strokeLinecap="round" />
    <line x1="4" y1="12" x2="20" y2="12" strokeLinecap="round" />
    <line x1="4" y1="18" x2="20" y2="18" strokeLinecap="round" />
  </svg>
);

export const WalkAwayIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M10 17l5-5-5-5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 12H3" strokeLinecap="round" />
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" strokeLinecap="round" />
  </svg>
);

export const PhoneWaveIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className}>
    <path
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16.92z"
      fill="currentColor"
      fillOpacity="0.2"
    />
    <path d="M14.5 2.5a7 7 0 0 1 7 7" strokeLinecap="round" />
    <path d="M14.5 6a3.5 3.5 0 0 1 3.5 3.5" strokeLinecap="round" />
  </svg>
);

export const CompanionIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className}>
    <circle cx="9" cy="7.5" r="3" fill="currentColor" fillOpacity="0.2" />
    <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5" strokeLinecap="round" />
    <circle cx="16.5" cy="8.5" r="2.5" />
    <path d="M16 14c2.8 0 5 1.7 5 4.5" strokeLinecap="round" />
  </svg>
);

export const SageScrollIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className}>
    <path d="M2 10l10-5 10 5-10 5-10-5z" fill="currentColor" fillOpacity="0.22" strokeLinejoin="round" />
    <path d="M6 12.5V17c0 1.8 2.7 3 6 3s6-1.2 6-3v-4.5" strokeLinecap="round" />
    <line x1="21" y1="10.5" x2="21" y2="16.5" strokeLinecap="round" />
  </svg>
);

export const CheckCrestIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <rect x="2.5" y="5" width="19" height="14" rx="2.5" fill="currentColor" fillOpacity="0.18" />
    <line x1="6" y1="9.5" x2="12" y2="9.5" strokeLinecap="round" />
    <line x1="6" y1="14" x2="17" y2="14" strokeLinecap="round" />
    <circle cx="16.5" cy="9.5" r="1.5" fill="currentColor" />
  </svg>
);

export const SparkleIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2l2.1 6.4L20.5 10.5 14.1 12.6 12 19l-2.1-6.4L3.5 10.5l6.4-2.1L12 2z" />
  </svg>
);

export const LockIcon: React.FC<IconProps> = ({ className = 'w-3 h-3' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className={className}>
    <rect x="5" y="11" width="14" height="10" rx="2" fill="currentColor" fillOpacity="0.25" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" strokeLinecap="round" />
  </svg>
);

export const MedalRankIcon: React.FC<{ rank: number; className?: string }> = ({
  rank,
  className = 'w-6 h-6',
}) => {
  const fill = rank === 1 ? '#facc15' : rank === 2 ? '#e2e8f0' : '#f59e0b';
  const stroke = rank === 1 ? '#854d0e' : rank === 2 ? '#475569' : '#78350f';
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <circle cx="12" cy="14" r="7.5" fill={fill} stroke={stroke} strokeWidth="1.5" />
      <path d="M8 3h8l-2 4h-4L8 3z" fill={fill} stroke={stroke} strokeWidth="1.2" />
      <text
        x="12"
        y="17"
        textAnchor="middle"
        fill="#0f172a"
        fontSize="8.5"
        fontWeight="900"
      >
        {rank}
      </text>
    </svg>
  );
};

interface LifelineMedallionProps {
  kind: '5050' | 'phone' | 'companion' | 'sage';
  used: boolean;
  locked?: boolean;
  className?: string;
}

export const LifelineMedallion: React.FC<LifelineMedallionProps> = ({
  kind,
  used,
  locked = false,
  className = 'w-14 h-9 sm:w-16 sm:h-10',
}) => {
  const uid = useId().replace(/:/g, '');
  const rimGrad = `ovalRim_${uid}`;
  const coreGrad = `ovalCore_${uid}`;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 120 76" className="h-full w-full drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]">
        <defs>
          <linearGradient id={rimGrad} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={used || locked ? '#64748b' : '#fef08a'} />
            <stop offset="40%" stopColor={used || locked ? '#475569' : '#f59e0b'} />
            <stop offset="70%" stopColor={used || locked ? '#94a3b8' : '#e2e8f0'} />
            <stop offset="100%" stopColor={used || locked ? '#334155' : '#93c5fd'} />
          </linearGradient>
          <radialGradient id={coreGrad} cx="50%" cy="32%" r="68%">
            <stop offset="0%" stopColor={used || locked ? '#1e293b' : '#2563eb'} />
            <stop offset="60%" stopColor={used || locked ? '#0f172a' : '#0f256e'} />
            <stop offset="100%" stopColor="#03071e" />
          </radialGradient>
        </defs>

        {/* Metallic outer oval bezel */}
        <ellipse
          cx="60"
          cy="38"
          rx="55"
          ry="33"
          fill={`url(#${coreGrad})`}
          stroke={`url(#${rimGrad})`}
          strokeWidth="4.2"
        />
        {/* Inner cyan hairline */}
        <ellipse
          cx="60"
          cy="38"
          rx="49"
          ry="27.5"
          fill="none"
          stroke={used || locked ? '#475569' : '#93c5fd'}
          strokeOpacity={used || locked ? 0.45 : 0.7}
          strokeWidth="1.2"
        />

        {/* Glossy top highlight arc */}
        <path
          d="M 22 28 Q 60 8 98 28"
          fill="none"
          stroke="#ffffff"
          strokeOpacity={used || locked ? 0.08 : 0.35}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Icon glyphs inside oval */}
        {kind === '5050' && (
          <text
            x="60"
            y="46"
            textAnchor="middle"
            fill={used ? '#94a3b8' : '#ffffff'}
            fontSize="24"
            fontWeight="900"
            letterSpacing="-0.5"
          >
            50:50
          </text>
        )}

        {kind === 'phone' && (
          <g
            transform="translate(42, 20) scale(1.5)"
            fill="none"
            stroke={used ? '#94a3b8' : '#fef08a'}
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M21 15.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.11 1h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a15 15 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 21 15.92z" />
            <path d="M14 2a6.5 6.5 0 0 1 6.5 6.5" />
          </g>
        )}

        {kind === 'companion' && (
          <g
            transform="translate(36, 17) scale(2)"
            fill="none"
            stroke={used ? '#94a3b8' : '#7dd3fc'}
            strokeWidth="1.9"
            strokeLinecap="round"
          >
            <circle cx="8.5" cy="7" r="2.8" fill={used ? '#64748b' : '#38bdf8'} fillOpacity="0.25" />
            <path d="M3 18.5c0-2.8 2.4-4.5 5.5-4.5s5.5 1.7 5.5 4.5" />
            <circle cx="16.5" cy="8.2" r="2.3" />
            <path d="M15.8 13.8c2.6.1 4.7 1.6 4.7 4.2" />
          </g>
        )}

        {kind === 'sage' && (
          <g
            transform="translate(36, 18) scale(2)"
            fill="none"
            stroke={used || locked ? '#94a3b8' : '#fde047'}
            strokeWidth="1.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            <path d="M2 9l10-4.5L22 9l-10 4.5L2 9z" fill={used || locked ? 'none' : '#fbbf24'} fillOpacity="0.25" />
            <path d="M6.5 11.5v4.3c0 1.5 2.5 2.6 5.5 2.6s5.5-1.1 5.5-2.6v-4.3" />
            <line x1="20.5" y1="9.5" x2="20.5" y2="15" />
          </g>
        )}

        {/* Thick crimson X strike overlay when used */}
        {used && (
          <g strokeLinecap="round">
            <line x1="24" y1="12" x2="96" y2="64" stroke="#7f1d1d" strokeWidth="9" />
            <line x1="96" y1="12" x2="24" y2="64" stroke="#7f1d1d" strokeWidth="9" />
            <line x1="24" y1="12" x2="96" y2="64" stroke="#ef4444" strokeWidth="5.5" />
            <line x1="96" y1="12" x2="24" y2="64" stroke="#ef4444" strokeWidth="5.5" />
          </g>
        )}
      </svg>

      {/* Lock pill badge for Question 6+ Sages */}
      {locked && !used && (
        <span className="absolute -top-1.5 -right-1.5 flex items-center gap-0.5 rounded-full border border-amber-300/80 bg-slate-950/95 px-1.5 py-0.5 text-[9px] font-black text-amber-300 shadow-md">
          <LockIcon className="h-2.5 w-2.5" />
          C6
        </span>
      )}
    </div>
  );
};
