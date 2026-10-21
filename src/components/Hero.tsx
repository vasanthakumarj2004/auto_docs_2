'use client';

import React from 'react';
import { useRouter } from '../lib/router';
import { HeroProductPanel } from './hero/HeroProductPanel';

export const Hero: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <section className="relative overflow-hidden bg-[#F4F7FA] min-h-[680px] lg:min-h-[760px] flex items-center pt-24 pb-10 lg:pt-28 lg:pb-16 border-b border-slate-200/80">
      
      {/* ================= 1. ASYMMETRIC SPLIT-SCREEN BACKDROP ================= */}
      
      {/* Right Canvas Ambient Dotted Matrix & Subtle Radial Glow (lg:w-[36%]) */}
      <div 
        className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[40%] bg-[radial-gradient(#cbd5e1_1.2px,transparent_1.2px)] [background-size:16px_16px] opacity-75 z-0" 
        aria-hidden="true" 
      />
      <div 
        className="pointer-events-none absolute top-1/2 right-12 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-blue-500/[0.04] blur-3xl z-0" 
        aria-hidden="true" 
      />

      {/* Left Dark Ambient Data-Stream Container (w-full lg:w-[64%]) */}
      <div 
        className="absolute inset-y-0 left-0 w-full lg:w-[64%] bg-gradient-to-br from-[#12232B] via-[#1A313C] to-[#25424F] lg:rounded-r-[52px] overflow-hidden shadow-2xl z-0"
      >
        {/* Ambient background video (gracefully fallback if absent) */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity pointer-events-none"
          src="/videos/hero-bg.mp4"
        />

        {/* Soft glowing radial orbs */}
        <div className="pointer-events-none absolute -top-20 left-1/4 h-[440px] w-[440px] rounded-full bg-cyan-500/20 blur-[110px]" />
        <div className="pointer-events-none absolute bottom-0 left-8 h-[480px] w-[480px] rounded-full bg-emerald-500/15 blur-[130px]" />
        <div className="pointer-events-none absolute top-1/3 right-12 h-[380px] w-[380px] rounded-full bg-blue-600/15 blur-[100px]" />

        {/* ================= CSS/SVG Ambient Financial & Logistics Telemetry Canvas ================= */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          viewBox="0 0 1000 700" 
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="splineCyan" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="splineTeal" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* 3D Isometric / Angled Perspective Grid Lines */}
          <g stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.12">
            <line x1="-50" y1="620" x2="1050" y2="340" />
            <line x1="-50" y1="520" x2="1050" y2="240" />
            <line x1="-50" y1="420" x2="1050" y2="140" />
            <line x1="150" y1="750" x2="150" y2="200" strokeDasharray="3 3" strokeOpacity="0.1" />
            <line x1="380" y1="750" x2="380" y2="150" strokeDasharray="3 3" strokeOpacity="0.1" />
            <line x1="620" y1="750" x2="620" y2="100" strokeDasharray="3 3" strokeOpacity="0.1" />
            <line x1="850" y1="750" x2="850" y2="50" strokeDasharray="3 3" strokeOpacity="0.1" />
          </g>

          {/* Area Chart Fill */}
          <path 
            d="M -50 560 Q 250 460 500 540 T 1050 380 L 1050 720 L -50 720 Z" 
            fill="url(#areaFill)" 
          />

          {/* Flowing Financial Splines */}
          <path 
            d="M -50 560 Q 250 460 500 540 T 1050 380" 
            stroke="url(#splineCyan)" 
            strokeWidth="2.5" 
            strokeLinecap="round"
          />
          <path 
            d="M -50 460 Q 320 380 600 480 T 1050 290" 
            stroke="url(#splineTeal)" 
            strokeWidth="2" 
            strokeLinecap="round"
          />

          {/* Telemetry Node Circles with Rings */}
          <g>
            {/* Node 1 */}
            <circle cx="240" cy="480" r="10" fill="#38bdf8" fillOpacity="0.15" />
            <circle cx="240" cy="480" r="3.5" fill="#38bdf8" />
            
            {/* Node 2 */}
            <circle cx="500" cy="540" r="14" fill="#34d399" fillOpacity="0.15" />
            <circle cx="500" cy="540" r="4" fill="#34d399" />
            
            {/* Node 3 */}
            <circle cx="750" cy="420" r="10" fill="#38bdf8" fillOpacity="0.15" />
            <circle cx="750" cy="420" r="3.5" fill="#38bdf8" />

            {/* Node 4 */}
            <circle cx="600" cy="480" r="8" fill="#2dd4bf" fillOpacity="0.18" />
            <circle cx="600" cy="480" r="3" fill="#2dd4bf" />
          </g>

          {/* 3D Isometric Financial Data Blocks */}
          <g transform="translate(640, 260) scale(0.9)" opacity="0.45">
            <polygon points="40,10 70,25 70,60 40,45" fill="#1e3a47" stroke="#38bdf8" strokeWidth="1" />
            <polygon points="10,25 40,10 40,45 10,60" fill="#162c37" stroke="#38bdf8" strokeWidth="1" />
            <polygon points="40,10 70,25 40,40 10,25" fill="#264858" stroke="#38bdf8" strokeWidth="1" />
          </g>
          <g transform="translate(730, 210) scale(0.75)" opacity="0.35">
            <polygon points="40,10 70,25 70,75 40,60" fill="#1e3a47" stroke="#34d399" strokeWidth="1" />
            <polygon points="10,25 40,10 40,60 10,75" fill="#162c37" stroke="#34d399" strokeWidth="1" />
            <polygon points="40,10 70,25 40,40 10,25" fill="#264858" stroke="#34d399" strokeWidth="1" />
          </g>

          {/* Floating Logistics Badge (Truck icon as shown in reference) */}
          <g transform="translate(710, 480) scale(0.85)" opacity="0.75">
            <rect x="0" y="0" width="48" height="42" rx="10" fill="#1b333e" stroke="#38bdf8" strokeWidth="1.2" strokeOpacity="0.5" />
            <path d="M12 28h16M28 28V16H12v12zm0 0h5l4-5v-7h-9v12zm-11 3a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm17 0a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>

          {/* Floating Monospace Telemetry Numbers */}
          <text x="490" y="580" fill="#67e8f9" fontFamily="monospace" fontSize="17" fontWeight="bold" letterSpacing="0.05em">
            51,335
          </text>
          <text x="270" y="650" fill="#34d399" fillOpacity="0.85" fontFamily="monospace" fontSize="13" fontWeight="bold">
            189.545
          </text>
          <text x="760" y="445" fill="#38bdf8" fillOpacity="0.8" fontFamily="monospace" fontSize="11" fontWeight="600">
            8.73%
          </text>
          <text x="615" y="360" fill="#94a3b8" fillOpacity="0.6" fontFamily="monospace" fontSize="10">
            19
          </text>
          <text x="140" y="430" fill="#2dd4bf" fillOpacity="0.7" fontFamily="monospace" fontSize="11">
            -10,448
          </text>
          <text x="830" y="330" fill="#34d399" fillOpacity="0.75" fontFamily="monospace" fontSize="11">
            +99.8%
          </text>
          <text x="360" y="380" fill="#67e8f9" fillOpacity="0.7" fontFamily="monospace" fontSize="11">
            4.2s
          </text>
        </svg>

        {/* Soft Dark Vignette on Left Edge for Typographic Contrast */}
        <div 
          className="pointer-events-none absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-[#12232B]/95 via-[#12232B]/80 to-transparent z-[2]" 
          aria-hidden="true" 
        />
      </div>

      {/* ================= 2. SITE SHELL & FOREGROUND GRID ================= */}
      <div className="site-shell relative z-10 grid items-start gap-10 lg:gap-8 lg:grid-cols-12 w-full py-2">
        
        {/* ================= LEFT COLUMN CONTENT (lg:col-span-5) ================= */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 lg:h-[560px] flex flex-col justify-center z-10 max-w-[540px]">
          {/* Eyebrow Pill */}
          <div className="bg-white/90 backdrop-blur-md text-slate-800 text-xs font-medium px-4 py-1.5 rounded-full shadow-sm inline-flex items-center mb-5 border border-white/50 w-fit">
            For businesses that run on Tally, an ERP, or CargoWise
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[48px] font-extrabold tracking-tight leading-[1.08] text-white drop-shadow-sm">
            Grow the business,
            <br />
            not the data-entry desk.
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-slate-200/95 leading-relaxed mt-4 max-w-xl font-normal">
            Bills read, checked, paid and posted to Tally. Emails become CargoWise jobs. Your team handles exceptions, not typing.
          </p>

          {/* Dual CTA Buttons */}
          <div className="mt-7 flex flex-wrap gap-3.5">
            <a
              href="/finance"
              onClick={(e) => {
                e.preventDefault();
                navigate('/finance');
              }}
              className="bg-[#2563EB] hover:bg-blue-500 text-white font-semibold px-6 py-3.5 rounded-xl shadow-[0_8px_25px_-4px_rgba(37,99,235,0.6)] inline-flex items-center gap-2.5 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer text-sm"
            >
              <span>Run a finance desk</span>
              <svg 
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" 
                viewBox="0 0 16 16" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="3" y1="8" x2="13" y2="8" />
                <polyline points="9 4 13 8 9 12" />
              </svg>
            </a>

            <a
              href="/logistics"
              onClick={(e) => {
                e.preventDefault();
                navigate('/logistics');
              }}
              className="bg-[#10B981] hover:bg-emerald-500 text-white font-semibold px-6 py-3.5 rounded-xl shadow-[0_8px_25px_-4px_rgba(16,185,129,0.5)] inline-flex items-center gap-2.5 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer text-sm"
            >
              <span>Run the logistics desk</span>
              <svg 
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" 
                viewBox="0 0 16 16" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="3" y1="8" x2="13" y2="8" />
                <polyline points="9 4 13 8 9 12" />
              </svg>
            </a>
          </div>

          {/* Bottom Trust Row */}
          <div className="mt-6 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-200/90 font-medium">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              Built around your approvals
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              No rip-and-replace
            </span>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: OVERLAPPING CONSOLE (lg:col-span-7) ================= */}
        <div className="lg:col-span-7 min-w-0 z-10">
          <HeroProductPanel />
        </div>

      </div>
    </section>
  );
};
