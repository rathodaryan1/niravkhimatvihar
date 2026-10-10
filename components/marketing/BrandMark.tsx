'use client';

import React from 'react';

export interface BrandMarkProps {
  variant?: 'full' | 'compact' | 'mobile';
  theme?: 'dark' | 'light' | 'auto';
  className?: string;
  showText?: boolean;
}

export function BrandMark({
  variant = 'full',
  theme = 'auto',
  className = '',
  showText = true,
}: BrandMarkProps) {
  // Determine color styling based on theme
  const textColor =
    theme === 'light'
      ? 'text-[#FFFDF8]'
      : theme === 'dark'
      ? 'text-[#241A15]'
      : 'text-inherit';

  const subtextColor =
    theme === 'light'
      ? 'text-[#C7A15A]'
      : theme === 'dark'
      ? 'text-[#9B7049]'
      : 'text-[#C7A15A]';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Refined Monogram Emblem */}
      <div className="relative flex items-center justify-center shrink-0">
        {/* Outer Architectural Ring */}
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#3A2418] border border-[#C7A15A]/70 shadow-sm flex items-center justify-center relative overflow-hidden group">
          {/* Subtle Geometric Corner Accents */}
          <div className="absolute inset-1 rounded-full border border-[#C7A15A]/20 pointer-events-none" />
          
          {/* Monogram Text */}
          <span className="font-sans font-bold text-sm sm:text-base text-[#C7A15A] tracking-wider relative z-10">
            NK
          </span>
        </div>
      </div>

      {/* Typography Section */}
      {showText && (
        <div className="flex flex-col text-left">
          {variant === 'full' && (
            <>
              <span
                className={`font-sans font-bold text-sm sm:text-base tracking-wide leading-tight ${textColor}`}
              >
                SHRI NIRAV KHIMAT BHAVAN
              </span>
              <span
                className={`font-sans text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold mt-0.5 ${subtextColor}`}
              >
                PALITANA · GUJARAT
              </span>
            </>
          )}

          {variant === 'compact' && (
            <>
              <span
                className={`font-sans font-bold text-sm sm:text-base tracking-wide leading-tight ${textColor}`}
              >
                NIRAV KHIMAT BHAVAN
              </span>
              <span
                className={`font-sans text-[9px] uppercase tracking-wider font-semibold mt-0.5 ${subtextColor}`}
              >
                PALITANA
              </span>
            </>
          )}

          {variant === 'mobile' && (
            <>
              <span
                className={`font-sans font-bold text-sm tracking-wide leading-tight ${textColor}`}
              >
                NIRAV KHIMAT
              </span>
              <span
                className={`font-sans text-[8px] uppercase tracking-wider font-semibold ${subtextColor}`}
              >
                PALITANA
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
