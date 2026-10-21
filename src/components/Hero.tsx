'use client';

import React from 'react';
import { HeroStage } from './hero/HeroStage';
import { HeroStageBackdrop } from './hero/HeroStageBackdrop';
import { HeroProductPanel } from './hero/HeroProductPanel';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[#F4F7FA] min-h-[720px] lg:min-h-[820px] flex items-center pt-24 pb-12 lg:pt-28 lg:pb-16 border-b border-slate-200/80">
      
      {/* ================= 1. ASYMMETRIC SPLIT-SCREEN BACKDROP ================= */}
      
      {/* Right Canvas Ambient Dotted Matrix & Subtle Radial Glow (lg:w-[38%]) */}
      <div 
        className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[42%] bg-[radial-gradient(#cbd5e1_1.2px,transparent_1.2px)] [background-size:16px_16px] opacity-75 z-0" 
        aria-hidden="true" 
      />
      <div 
        className="pointer-events-none absolute top-1/2 right-12 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-blue-500/[0.04] blur-3xl z-0" 
        aria-hidden="true" 
      />

      {/* Left Stage Container: 67.8% width on desktop with 48px rounded right corners */}
      <div 
        className="absolute inset-y-0 left-0 w-full lg:w-[67.8%] lg:rounded-r-[48px] overflow-hidden shadow-2xl z-0"
      >
        <HeroStageBackdrop />
      </div>

      {/* ================= 2. SITE SHELL & FOREGROUND GRID ================= */}
      <div className="site-shell relative z-10 grid items-start gap-10 lg:gap-8 lg:grid-cols-12 w-full py-2">
        
        {/* ================= LEFT COLUMN CONTENT (lg:col-span-5) ================= */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 lg:h-[620px] flex flex-col justify-center z-10 max-w-[540px]">
          <HeroStage />
        </div>

        {/* ================= RIGHT COLUMN: OVERLAPPING CONSOLE (lg:col-span-7) ================= */}
        <div className="lg:col-span-7 min-w-0 z-10 lg:-ml-4 xl:-ml-6">
          <HeroProductPanel />
        </div>

      </div>
    </section>
  );
};
