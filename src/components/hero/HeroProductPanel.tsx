'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  TableProperties, 
  Video, 
  ChevronDown, 
  Search, 
  ArrowUp, 
} from 'lucide-react';
import { PipelineView } from './PipelineView';
import { BillQueueView } from './BillQueueView';
import { WalkthroughView } from './WalkthroughView';
import { HeroActivityRow } from './HeroActivityRow';
import { LivePipelinePanel } from './LivePipelinePanel';

interface HeroProductPanelProps {
  onTabChange?: (tabIndex: number) => void;
}

export const HeroProductPanel: React.FC<HeroProductPanelProps> = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isPosted, setIsPosted] = useState<boolean>(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    if (onTabChange) onTabChange(index);
  };

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={panelRef}
      data-hero-product-panel
      className="relative w-full select-none"
    >
      {activeTab === 0 ? (
        <LivePipelinePanel
          isPaused={!isVisible}
          isPosted={isPosted}
          onStateChange={setIsPosted}
          onTabChange={handleTabClick}
        />
      ) : (
      <div className="relative rounded-[28px] bg-white/75 backdrop-blur-[18px] backdrop-saturate-[1.15] border border-white/80 shadow-[0_40px_80px_-30px_rgba(6,20,36,0.45),inset_0_1px_0_0_rgba(255,255,255,0.9)] p-3 sm:p-4">
        
        {/* ================= 1. SINGLE GLASS SEGMENTED HEADER BAR ================= */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 px-1 border-b border-slate-200/60">
          {/* Left Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5" role="tablist">
            {/* Tab 0: Live Pipeline */}
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 0}
              onClick={() => handleTabClick(0)}
              className={`text-xs px-3.5 py-1.5 rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer ${
                activeTab === 0
                  ? 'bg-white text-slate-900 font-semibold shadow-xs border border-slate-200/90'
                  : 'text-slate-600 hover:text-slate-900 font-medium hover:bg-white/50'
              }`}
            >
              <Activity size={13} className="text-blue-600" />
              <span>Live Pipeline</span>
              <ChevronDown size={11} className="text-slate-400" />
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
            </button>

            {/* Tab 1: Finance Bill Queue */}
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 1}
              onClick={() => handleTabClick(1)}
              className={`text-xs px-3 py-1.5 rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer ${
                activeTab === 1
                  ? 'bg-white text-slate-900 font-semibold shadow-xs border border-slate-200/90'
                  : 'text-slate-600 hover:text-slate-900 font-medium hover:bg-white/50'
              }`}
            >
              <TableProperties size={13} />
              <span>Finance Bill Queue</span>
              <span className="bg-slate-200/80 text-slate-700 text-[10px] px-1.5 py-0.2 rounded-md font-semibold">
                24
              </span>
            </button>

            {/* Tab 2: 2-Min Walkthrough */}
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 2}
              onClick={() => handleTabClick(2)}
              className={`text-xs px-3 py-1.5 rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer ${
                activeTab === 2
                  ? 'bg-white text-slate-900 font-semibold shadow-xs border border-slate-200/90'
                  : 'text-slate-600 hover:text-slate-900 font-medium hover:bg-white/50'
              }`}
            >
              <Video size={13} />
              <span>2-Min Walkthrough</span>
            </button>
          </div>

          {/* Right Telemetry Status */}
          <div className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Auto-sync telemetry</span>
          </div>
        </div>

        {/* ================= 2. INNER TOOLBAR CARD ================= */}
        <div className="mt-3 rounded-xl bg-white/95 border border-slate-200/80 shadow-2xs px-3.5 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-900 tracking-tight">Live Pipeline</span>
            {/* Visual-only search input */}
            <div
              className="bg-slate-50 border border-slate-200/80 text-slate-400 text-[11px] px-2.5 py-1 rounded-md w-28 sm:w-36 flex items-center gap-1.5 select-none"
              aria-hidden="true"
            >
              <Search size={11} />
              <span>Search</span>
            </div>
          </div>

          {/* Right Live Pipeline Chip */}
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-2xs">
            <ArrowUp size={11} className="text-emerald-600 stroke-[2.5]" />
            <span>Live Pipeline</span>
          </div>
        </div>

        {/* ================= 3. CANVAS AREA (#eceff4) ================= */}
        <div className="mt-3 rounded-xl bg-[#eceff4] border border-slate-200/80 p-3 sm:p-4 min-h-[310px] overflow-hidden">
          {activeTab === 0 && (
            <PipelineView
              isPaused={!isVisible}
              onStateChange={(posted) => setIsPosted(posted)}
            />
          )}
          {activeTab === 1 && <BillQueueView />}
          {activeTab === 2 && <WalkthroughView isPaused={activeTab !== 2} />}
        </div>

        {/* ================= 4. ACTIVITY ROW OVERLAPPING BOTTOM ================= */}
        <HeroActivityRow isPosted={isPosted} />

      </div>
      )}
    </div>
  );
};
