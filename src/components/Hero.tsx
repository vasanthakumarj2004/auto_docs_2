'use client';

import React from 'react';
import { HeroStage } from './hero/HeroStage';
import { HeroStageBackdrop } from './hero/HeroStageBackdrop';
import { HeroProductPanel } from './hero/HeroProductPanel';
import { useLandingLayout } from './LandingLayoutProvider';
import { HeroCentered } from './hero/HeroCentered';

export const Hero: React.FC = () => {
  const { layout, appearance } = useLandingLayout();
  if (layout === 'v2') return <HeroCentered />;

  const isDark = appearance === 'dark';

  return (
    <section
      data-hero-layout="v1"
      data-appearance={appearance}
      className={`relative overflow-hidden min-h-[calc(100svh-64px)] flex items-center pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-14 border-b transition-colors duration-300 ${
        isDark
          ? 'bg-[#100a21] border-[#2a203d] text-white'
          : 'bg-[#FAFAFA] border-slate-200/80 text-slate-800'
      }`}
    >
      {/* ================= 1. ASYMMETRIC SPLIT-SCREEN BACKDROP ================= */}
      
      {/* Right Canvas Ambient Dotted Matrix & Subtle Radial Glow (lg:w-[38%]) */}
      <div 
        className={`pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[42%] [background-size:16px_16px] z-0 transition-opacity duration-300 ${
          isDark
            ? 'bg-[radial-gradient(#ffffff15_1.2px,transparent_1.2px)] opacity-50'
            : 'bg-[radial-gradient(#cbd5e1_1.2px,transparent_1.2px)] opacity-75'
        }`} 
        aria-hidden="true" 
      />
      <div 
        className={`pointer-events-none absolute top-1/2 right-12 -translate-y-1/2 h-[450px] w-[450px] rounded-full blur-3xl z-0 transition-opacity duration-300 ${
          isDark
            ? 'bg-violet-600/[0.18]'
            : 'bg-violet-500/[0.04]'
        }`}
        aria-hidden="true" 
      />
      {isDark && (
        <div
          className="pointer-events-none absolute -top-24 left-1/4 h-[350px] w-[500px] rounded-full bg-violet-900/[0.22] blur-3xl z-0"
          aria-hidden="true"
        />
      )}

      {/* Left Stage Container: plain, clean static surface */}
      <div 
        className="absolute inset-y-0 left-0 w-full lg:w-[67.8%] lg:rounded-r-[48px] overflow-hidden bg-transparent z-0"
      >
        <HeroStageBackdrop />
      </div>

      {/* ================= 2. SITE SHELL & FOREGROUND GRID ================= */}
      <div className="site-shell relative z-10 grid items-center gap-10 lg:gap-8 lg:grid-cols-12 w-full my-auto">
        
        {/* ================= LEFT COLUMN CONTENT (lg:col-span-5) ================= */}
        <div className="lg:col-span-5 flex flex-col justify-center z-10 max-w-[540px]">
          <HeroStage />
        </div>

        {/* ================= RIGHT COLUMN: OVERLAPPING CONSOLE (lg:col-span-7) ================= */}
        <div className="lg:col-span-7 min-w-0 z-10 flex justify-center lg:justify-end">
          <div className="w-full max-w-[620px]">
            <HeroProductPanel />
          </div>
        </div>

      </div>
    </section>
  );
};
