'use client';
import React from 'react';

export interface MarqueeProps {
  children: React.ReactNode;
  speedSec?: number;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  speedSec = 30,
  pauseOnHover = true,
  reverse = false,
  className = '',
}) => {
  return (
    <div
      className={`group relative flex overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] ${className}`}
    >
      <div
        className={`flex shrink-0 items-center justify-around gap-8 min-w-full ${
          pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''
        }`}
        style={{
          animation: `marquee ${speedSec}s linear infinite ${reverse ? 'reverse' : 'normal'}`,
        }}
      >
        {children}
      </div>

      {/* Duplicate Track for Seamless Wrapping */}
      <div
        aria-hidden="true"
        className={`flex shrink-0 items-center justify-around gap-8 min-w-full ${
          pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''
        }`}
        style={{
          animation: `marquee ${speedSec}s linear infinite ${reverse ? 'reverse' : 'normal'}`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
