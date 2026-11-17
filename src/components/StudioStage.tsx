'use client';

import React, { useId } from 'react';

export const StudioStage: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#020515]"
    >
      {/* Deep VTV3 studio dome base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 65% at 50% 24%, rgba(28, 63, 168, 0.58) 0%, rgba(11, 24, 77, 0.72) 48%, rgba(2, 5, 20, 0.98) 100%)',
        }}
      />

      {/* Overhead volumetric spotlight beams */}
      <div
        className="animate-spotlight-sweep absolute -top-24 left-[12%] h-[125vh] w-[26vw] min-w-[200px] origin-top"
        style={{
          background:
            'linear-gradient(180deg, rgba(125, 211, 252, 0.22) 0%, rgba(56, 189, 248, 0.08) 45%, transparent 82%)',
          clipPath: 'polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)',
          filter: 'blur(12px)',
        }}
      />
      <div
        className="animate-spotlight-sweep-alt absolute -top-24 right-[12%] h-[125vh] w-[26vw] min-w-[200px] origin-top"
        style={{
          background:
            'linear-gradient(180deg, rgba(167, 139, 250, 0.20) 0%, rgba(59, 130, 246, 0.08) 45%, transparent 82%)',
          clipPath: 'polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)',
          filter: 'blur(12px)',
        }}
      />
      <div
        className="absolute -top-16 left-1/2 h-[88vh] w-[44vw] min-w-[280px] -translate-x-1/2 origin-top"
        style={{
          background:
            'linear-gradient(180deg, rgba(251, 191, 36, 0.14) 0%, rgba(59, 130, 246, 0.09) 40%, transparent 78%)',
          clipPath: 'polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)',
          filter: 'blur(16px)',
        }}
      />

      {/* Horizon studio truss glow & architectural arcs */}
      <svg
        className="absolute inset-0 h-full w-full opacity-55"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="floorRingGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.26" />
            <stop offset="55%" stopColor="#2563eb" stopOpacity="0.16" />
            <stop offset="85%" stopColor="#818cf8" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#020515" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="rimCyanGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0" />
            <stop offset="25%" stopColor="#38bdf8" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.7" />
            <stop offset="75%" stopColor="#38bdf8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Studio upper circular light truss */}
        <ellipse
          cx="720"
          cy="140"
          rx="520"
          ry="110"
          fill="none"
          stroke="url(#rimCyanGold)"
          strokeWidth="1.5"
          strokeOpacity="0.35"
        />
        <ellipse
          cx="720"
          cy="140"
          rx="420"
          ry="84"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="1"
          strokeDasharray="10 18"
          strokeOpacity="0.28"
        />

        {/* Perspective illuminated VTV3 circular studio floor */}
        <ellipse cx="720" cy="705" rx="680" ry="185" fill="url(#floorRingGlow)" />
        <ellipse
          cx="720"
          cy="715"
          rx="590"
          ry="135"
          fill="none"
          stroke="url(#rimCyanGold)"
          strokeWidth="2.5"
        />
        <ellipse
          cx="720"
          cy="715"
          rx="460"
          ry="98"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1.5"
          strokeOpacity="0.45"
        />
        <ellipse
          cx="720"
          cy="715"
          rx="300"
          ry="60"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="1.8"
          strokeOpacity="0.4"
        />

        {/* Subtle radial hot-seat floor spokes */}
        {[-520, -340, -170, 0, 170, 340, 520].map((offset) => (
          <line
            key={offset}
            x1={720 + offset * 0.25}
            y1="590"
            x2={720 + offset}
            y2="860"
            stroke="#60a5fa"
            strokeWidth="1"
            strokeOpacity="0.14"
          />
        ))}
      </svg>

      {/* Subtle studio vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, transparent 45%, rgba(1, 3, 14, 0.72) 100%)',
        }}
      />
    </div>
  );
};

interface VTV3LogoCrestProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const SIZE_CLASSES: Record<NonNullable<VTV3LogoCrestProps['size']>, string> = {
  sm: 'w-9 h-9 sm:w-10 sm:h-10',
  md: 'w-14 h-14 sm:w-16 sm:h-16',
  lg: 'w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44',
  xl: 'w-32 h-32 sm:w-44 sm:h-44 md:w-52 md:h-52',
};

export const VTV3LogoCrest: React.FC<VTV3LogoCrestProps> = ({ size = 'lg', className = '' }) => {
  const uid = useId().replace(/:/g, '');
  const goldRimId = `goldRim_${uid}`;
  const globeCoreId = `globeCore_${uid}`;
  const bannerGradId = `bannerGrad_${uid}`;
  const bannerStrokeId = `bannerStroke_${uid}`;

  const showDetailedText = size === 'lg' || size === 'xl' || size === 'md';

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${SIZE_CLASSES[size]} ${className}`}
    >
      <svg
        viewBox="0 0 240 240"
        className="h-full w-full drop-shadow-[0_0_24px_rgba(59,130,246,0.55)]"
        role="img"
        aria-label="Biểu trưng Ai Là Triệu Phú VTV3"
      >
        <defs>
          <linearGradient id={goldRimId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="28%" stopColor="#f59e0b" />
            <stop offset="55%" stopColor="#fffbeb" />
            <stop offset="78%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>

          <radialGradient id={globeCoreId} cx="45%" cy="38%" r="62%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="38%" stopColor="#312e81" />
            <stop offset="75%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#03071e" />
          </radialGradient>

          <linearGradient id={bannerGradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#08133a" />
            <stop offset="18%" stopColor="#1d4ed8" />
            <stop offset="50%" stopColor="#0f256e" />
            <stop offset="82%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#08133a" />
          </linearGradient>

          <linearGradient id={bannerStrokeId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        {/* Outer metallic bronze-gold ring */}
        <circle
          cx="120"
          cy="120"
          r="112"
          fill="#050b29"
          stroke={`url(#${goldRimId})`}
          strokeWidth="6"
        />
        <circle
          cx="120"
          cy="120"
          r="102"
          fill="none"
          stroke="#60a5fa"
          strokeOpacity="0.6"
          strokeWidth="1.6"
        />

        {/* Deep royal purple-sapphire globe core */}
        <circle
          cx="120"
          cy="120"
          r="94"
          fill={`url(#${globeCoreId})`}
          stroke="#38bdf8"
          strokeOpacity="0.55"
          strokeWidth="2"
        />

        {/* Globe geometric meridians & parallels */}
        <g stroke="#93c5fd" strokeOpacity="0.32" strokeWidth="1.2" fill="none">
          <ellipse cx="120" cy="120" rx="44" ry="92" />
          <ellipse cx="120" cy="120" rx="72" ry="92" />
          <ellipse cx="120" cy="120" rx="92" ry="38" />
          <ellipse cx="120" cy="120" rx="92" ry="68" />
          <line x1="28" y1="120" x2="212" y2="120" />
          <line x1="120" y1="28" x2="120" y2="212" />
        </g>

        {/* 8 golden cardinal diamond accents on outer ring */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x = 120 + Math.cos(rad) * 102;
          const y = 120 + Math.sin(rad) * 102;
          return (
            <rect
              key={deg}
              x={x - 3}
              y={y - 3}
              width="6"
              height="6"
              transform={`rotate(45 ${x} ${y})`}
              fill="#fde047"
            />
          );
        })}

        {/* Upper VTV3 arc subtitle */}
        {showDetailedText && (
          <text
            x="120"
            y="60"
            textAnchor="middle"
            fill="#fde68a"
            fontSize="11.5"
            fontWeight="800"
            letterSpacing="3"
          >
            VTV3 • CHƯƠNG TRÌNH
          </text>
        )}

        {/* Central hexagonal ribbon banner */}
        <polygon
          points="14,120 30,96 210,96 226,120 210,144 30,144"
          fill={`url(#${bannerGradId})`}
          stroke={`url(#${bannerStrokeId})`}
          strokeWidth="3"
        />
        <polygon
          points="20,120 33,101 207,101 220,120 207,139 33,139"
          fill="none"
          stroke="#93c5fd"
          strokeOpacity="0.45"
          strokeWidth="1"
        />

        {/* Banner title */}
        {showDetailedText ? (
          <text
            x="120"
            y="126.5"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="19"
            fontWeight="900"
            letterSpacing="0.8"
          >
            AI LÀ TRIỆU PHÚ
          </text>
        ) : (
          <text
            x="120"
            y="128"
            textAnchor="middle"
            fill="#fde047"
            fontSize="26"
            fontWeight="900"
          >
            ALTP
          </text>
        )}

        {/* Lower gold ribbon accent */}
        {showDetailedText && (
          <g>
            <polygon
              points="56,166 70,154 170,154 184,166 170,178 70,178"
              fill="#0a1647"
              stroke="#fbbf24"
              strokeWidth="1.6"
            />
            <text
              x="120"
              y="170"
              textAnchor="middle"
              fill="#fbbf24"
              fontSize="11"
              fontWeight="800"
              letterSpacing="1.8"
            >
              15.000 CÂU HỎI
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
