'use client';

import React from 'react';

interface MandalaPatternProps {
  className?: string;
  size?: number;
  opacity?: number;
  color?: string;
  animate?: boolean;
}

export function MandalaPattern({
  className = '',
  size = 500,
  opacity = 0.05,
  color = '#C7A15A',
  animate = false,
}: MandalaPatternProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${animate ? 'animate-spin-slow' : ''} ${className}`}
      style={{ opacity }}
    >
      <circle cx="250" cy="250" r="240" stroke={color} strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="250" cy="250" r="210" stroke={color} strokeWidth="0.75" />
      <circle cx="250" cy="250" r="180" stroke={color} strokeWidth="1.25" />
      <circle cx="250" cy="250" r="140" stroke={color} strokeWidth="0.75" strokeDasharray="3 3" />
      <circle cx="250" cy="250" r="100" stroke={color} strokeWidth="1" />
      <circle cx="250" cy="250" r="60" stroke={color} strokeWidth="1.5" />
      <circle cx="250" cy="250" r="20" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1" />

      {/* 12 Petals Layer */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = i * 30;
        return (
          <g key={`petal-${i}`} transform={`rotate(${angle} 250 250)`}>
            <path
              d="M 250 150 Q 270 200 250 250 Q 230 200 250 150 Z"
              stroke={color}
              strokeWidth="0.75"
              fill={color}
              fillOpacity="0.04"
            />
            <circle cx="250" cy="110" r="3" fill={color} />
          </g>
        );
      })}

      {/* 24 Rays Outer Layer */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = i * 15;
        return (
          <g key={`ray-${i}`} transform={`rotate(${angle} 250 250)`}>
            <line x1="250" y1="10" x2="250" y2="40" stroke={color} strokeWidth="0.75" />
            <circle cx="250" cy="35" r="1.5" fill={color} />
            <path
              d="M 245 60 Q 250 45 255 60 L 250 90 Z"
              stroke={color}
              strokeWidth="0.5"
              fill="none"
            />
          </g>
        );
      })}

      {/* 8 Floral Arcs */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = i * 45;
        return (
          <g key={`flower-${i}`} transform={`rotate(${angle} 250 250)`}>
            <path
              d="M 210 250 C 210 180, 290 180, 290 250"
              stroke={color}
              strokeWidth="0.75"
              fill="none"
            />
          </g>
        );
      })}
    </svg>
  );
}
