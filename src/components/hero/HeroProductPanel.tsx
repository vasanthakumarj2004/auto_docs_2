'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Activity, TableProperties, Video, ShieldCheck, Check } from 'lucide-react';
import { PipelineView } from './PipelineView';
import { BillQueueView } from './BillQueueView';
import { WalkthroughView } from './WalkthroughView';

interface HeroProductPanelProps {
  onTabChange?: (tabIndex: number) => void;
}

export const HeroProductPanel: React.FC<HeroProductPanelProps> = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isPermanentlyStopped, setIsPermanentlyStopped] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabListRef = useRef<HTMLDivElement>(null);

  // Stop auto-cycling permanently on user interaction
  const stopAutoCycle = () => {
    if (!isPermanentlyStopped) {
      setIsPermanentlyStopped(true);
      setProgress(0);
    }
  };

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    setProgress(0);
    stopAutoCycle();
    if (onTabChange) onTabChange(index);
  };

  // Keyboard navigation for tablist
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    stopAutoCycle();
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextTab = (index + 1) % 3;
      handleTabClick(nextTab);
      const buttons = tabListRef.current?.querySelectorAll('button[role="tab"]');
      (buttons?.[nextTab] as HTMLElement)?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevTab = (index - 1 + 3) % 3;
      handleTabClick(prevTab);
      const buttons = tabListRef.current?.querySelectorAll('button[role="tab"]');
      (buttons?.[prevTab] as HTMLElement)?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      handleTabClick(0);
      const buttons = tabListRef.current?.querySelectorAll('button[role="tab"]');
      (buttons?.[0] as HTMLElement)?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      handleTabClick(2);
      const buttons = tabListRef.current?.querySelectorAll('button[role="tab"]');
      (buttons?.[2] as HTMLElement)?.focus();
    }
  };

  // Auto-cycle effect (8s per tab, looping)
  useEffect(() => {
    // If reduced motion is preferred or user interacted, do not auto-cycle
    if (isPermanentlyStopped || isHovered) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const intervalMs = 60;
    const cycleDurationMs = 8000;
    const stepIncrement = (intervalMs / cycleDurationMs) * 100;

    const timer = setInterval(() => {
      // Pause if tab is hidden or element is off-screen
      if (document.hidden) return;

      setProgress((prev) => {
        if (prev >= 100) {
          setActiveTab((curr) => {
            const next = (curr + 1) % 3;
            if (onTabChange) onTabChange(next);
            return next;
          });
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPermanentlyStopped, isHovered, onTabChange]);

  // Pause when off-screen via IntersectionObserver
  useEffect(() => {
    if (!panelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting && !isPermanentlyStopped) {
          setIsHovered(true); // temporary pause while offscreen
        } else if (entry.isIntersecting && !isPermanentlyStopped) {
          setIsHovered(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(panelRef.current);
    return () => observer.disconnect();
  }, [isPermanentlyStopped]);

  return (
    <div 
      ref={panelRef}
      onMouseEnter={() => {
        setIsHovered(true);
        stopAutoCycle();
      }}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => stopAutoCycle()}
      onClick={() => stopAutoCycle()}
      onTouchStart={() => stopAutoCycle()}
      className="hero-perspective relative w-full select-none"
    >
      {/* Soft Ambient Lavender / Blue Glow Behind Product Frame */}
      <div 
        className="pointer-events-none absolute -inset-6 -z-20 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(232,234,251,0.7)_0%,rgba(37,99,235,0.06)_50%,transparent_75%)] blur-2xl" 
        aria-hidden="true" 
      />

      {/* 3D Stack Container: Two faint ghost layers behind + main product window */}
      <div className="card-stack-3d is-centered w-full">
        {/* Ghost Card 1 (-24px depth, 12px offset) */}
        <div className="ghost-card-1" aria-hidden="true" />
        
        {/* Ghost Card 2 (-12px depth, 6px offset) */}
        <div className="ghost-card-2" aria-hidden="true" />

        {/* ================= MAIN PRODUCT WINDOW FRAME ================= */}
        <div className="main-card-3d w-full min-h-[580px] rounded-2xl border border-slate-200/95 bg-white shadow-[0_20px_50px_-12px_rgba(15,23,42,0.12),0_4px_12px_rgba(15,23,42,0.04)] overflow-hidden flex flex-col justify-between">
          
          {/* ================= TITLE BAR (48px) ================= */}
          <div className="flex h-12 items-center justify-between border-b border-slate-200/80 bg-slate-50/95 px-4 select-none">
            {/* Left: macOS Window Traffic Lights & Breadcrumb */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <span className="brand-mark h-4 w-4 rounded text-[8px] flex items-center justify-center font-bold">D</span>
                <span className="font-semibold text-slate-900">Docsynecx</span>
                <span className="text-slate-400 font-normal">/</span>
                <span className="text-slate-500 font-medium font-mono text-[11px]">Finance desk</span>
              </div>
            </div>

            {/* Right: Tally Connected Chip & Telemetry Status */}
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10.5px] font-bold text-emerald-800 shadow-2xs">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Tally Prime connected
              </span>

              <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Auto-sync telemetry
              </span>
            </div>
          </div>

          {/* ================= TAB BAR (Segmented Control) ================= */}
          <div className="border-b border-slate-200/80 bg-slate-100/60 p-1.5 sm:px-3 sm:py-2">
            <div 
              ref={tabListRef}
              role="tablist" 
              aria-label="Docsynecx hero panel views" 
              className="grid grid-cols-3 gap-1.5 rounded-xl bg-slate-200/70 p-1 text-[11.5px] font-semibold"
            >
              {/* Tab 1: Live Pipeline */}
              <button
                type="button"
                role="tab"
                id="hero-tab-0"
                aria-selected={activeTab === 0}
                aria-controls="hero-panel-0"
                tabIndex={activeTab === 0 ? 0 : -1}
                onClick={() => handleTabClick(0)}
                onKeyDown={(e) => handleKeyDown(e, 0)}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 px-2 font-mono text-[11px] tracking-tight transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                  activeTab === 0
                    ? 'bg-white text-blue-800 font-extrabold shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Activity size={13} className={activeTab === 0 ? 'text-blue-600' : 'text-slate-400'} />
                <span className="truncate">Live Pipeline</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              </button>

              {/* Tab 2: Finance Bill Queue */}
              <button
                type="button"
                role="tab"
                id="hero-tab-1"
                aria-selected={activeTab === 1}
                aria-controls="hero-panel-1"
                tabIndex={activeTab === 1 ? 0 : -1}
                onClick={() => handleTabClick(1)}
                onKeyDown={(e) => handleKeyDown(e, 1)}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 px-2 font-mono text-[11px] tracking-tight transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                  activeTab === 1
                    ? 'bg-white text-blue-800 font-extrabold shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <TableProperties size={13} className={activeTab === 1 ? 'text-blue-600' : 'text-slate-400'} />
                <span className="truncate">Finance Bill Queue</span>
                <span className="rounded bg-slate-100 px-1.5 py-0.2 text-[9.5px] font-bold text-slate-700 border border-slate-300/80 shrink-0">
                  24
                </span>
              </button>

              {/* Tab 3: 2-Min Walkthrough */}
              <button
                type="button"
                role="tab"
                id="hero-tab-2"
                aria-selected={activeTab === 2}
                aria-controls="hero-panel-2"
                tabIndex={activeTab === 2 ? 0 : -1}
                onClick={() => handleTabClick(2)}
                onKeyDown={(e) => handleKeyDown(e, 2)}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 px-2 font-mono text-[11px] tracking-tight transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                  activeTab === 2
                    ? 'bg-white text-blue-800 font-extrabold shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Video size={13} className={activeTab === 2 ? 'text-blue-600' : 'text-slate-400'} />
                <span className="truncate">2-Min Walkthrough</span>
              </button>
            </div>
          </div>

          {/* Auto-Cycle Progress Indicator Line */}
          <div className="h-0.5 w-full bg-slate-100 overflow-hidden" aria-hidden="true">
            <div 
              className={`h-full bg-brand-blue transition-[width] duration-75 ease-linear ${isPermanentlyStopped ? 'w-0' : ''}`}
              style={{ width: isPermanentlyStopped ? '0%' : `${progress}%` }}
            />
          </div>

          {/* ================= MAIN CONTENT VIEWPORT (Fixed 500px, 0 CLS) ================= */}
          <div className="relative p-3 sm:p-4 min-h-[490px] flex-1 flex flex-col justify-center overflow-hidden">
            
            {/* View 1: Live Pipeline */}
            <div 
              id="hero-panel-0"
              role="tabpanel"
              aria-labelledby="hero-tab-0"
              className={`transition-all duration-350 ease-out ${
                activeTab === 0 
                  ? 'opacity-100 translate-y-0 relative z-10 w-full' 
                  : 'opacity-0 translate-y-2 absolute inset-3 sm:inset-4 pointer-events-none -z-10'
              }`}
            >
              <PipelineView isPaused={activeTab !== 0 || isHovered} />
            </div>

            {/* View 2: Finance Bill Queue */}
            <div 
              id="hero-panel-1"
              role="tabpanel"
              aria-labelledby="hero-tab-1"
              className={`transition-all duration-350 ease-out ${
                activeTab === 1 
                  ? 'opacity-100 translate-y-0 relative z-10 w-full' 
                  : 'opacity-0 translate-y-2 absolute inset-3 sm:inset-4 pointer-events-none -z-10'
              }`}
            >
              <BillQueueView />
            </div>

            {/* View 3: 2-Min Walkthrough */}
            <div 
              id="hero-panel-2"
              role="tabpanel"
              aria-labelledby="hero-tab-2"
              className={`transition-all duration-350 ease-out ${
                activeTab === 2 
                  ? 'opacity-100 translate-y-0 relative z-10 w-full' 
                  : 'opacity-0 translate-y-2 absolute inset-3 sm:inset-4 pointer-events-none -z-10'
              }`}
            >
              <WalkthroughView />
            </div>

          </div>

          {/* ================= FOOTER STATUS BAR (36px) ================= */}
          <div className="flex h-9 items-center justify-between border-t border-slate-200/80 bg-slate-50/90 px-4 text-[10.5px] font-mono text-slate-500 select-none">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="font-semibold text-slate-800">Direct ERP & Tally Prime Sync</span>
            </div>

            <div className="flex items-center gap-3">
              <span>Avg speed: <b className="text-slate-800 font-bold">4.2s</b></span>
              <span className="text-slate-300">|</span>
              <span>Accuracy: <b className="text-emerald-700 font-bold">99.8%</b></span>
              <span className="hidden sm:inline text-slate-300">|</span>
              <span className="hidden sm:inline text-slate-400">Illustrative demo data</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
