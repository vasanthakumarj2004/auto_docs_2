'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  TableProperties, 
  Video, 
  ChevronDown, 
  Search, 
  ArrowUp, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { PipelineView } from './PipelineView';
import { BillQueueView } from './BillQueueView';
import { WalkthroughView } from './WalkthroughView';

interface HeroProductPanelProps {
  onTabChange?: (tabIndex: number) => void;
}

export const HeroProductPanel: React.FC<HeroProductPanelProps> = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    if (onTabChange) onTabChange(index);
  };

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={panelRef}
      className="relative w-full select-none"
    >
      {/* Outer Frosted-Glass Bezel (bridging dark panel and light canvas) */}
      <div className="relative rounded-[28px] bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_30px_70px_-15px_rgba(15,23,42,0.22),0_0_0_1px_rgba(148,163,184,0.15)] p-3 sm:p-4">
        
        {/* ================= TOP OUTER CONTROL BAR ================= */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 px-1">
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

        {/* ================= INNER APPLICATION WORKSPACE ================= */}
        <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xs p-3.5 sm:p-5 relative min-h-[460px] lg:h-[565px] flex flex-col justify-between overflow-hidden">
          
          {/* Header Row 1: Workspace Title & Sub-tabs */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
            <div className="flex items-center gap-3">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Live Pipeline</h2>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleTabClick(1)}
                className={`text-[11px] px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 1 ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <TableProperties size={12} />
                <span className="hidden sm:inline">Finance Bill Queue</span>
              </button>
              <button
                type="button"
                onClick={() => handleTabClick(2)}
                className={`text-[11px] px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 2 ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Video size={12} />
                <span className="hidden sm:inline">2-Min Walkthrough</span>
              </button>
            </div>
          </div>

          {/* Header Row 2: Filter & Search Sub-Bar */}
          <div className="flex items-center justify-between gap-2 pt-3 pb-1 shrink-0">
            <div className="flex items-center gap-2">
              <div className="bg-slate-50 border border-slate-200/80 text-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-lg flex items-center gap-1">
                <span>Live Pipeline</span>
                <ChevronDown size={11} className="text-slate-400" />
              </div>

              <div className="bg-slate-50 border border-slate-200/70 text-slate-400 text-[11px] px-2.5 py-1 rounded-lg w-28 sm:w-36 flex items-center gap-1.5">
                <Search size={11} />
                <span>Search</span>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-2xs">
              <ArrowUp size={11} className="text-emerald-600 stroke-[2.5]" />
              <span>Live Pipeline</span>
            </div>
          </div>

          {/* Workspace Body: Locked height across all 3 tabs */}
          <div className="mt-2 flex-1 flex flex-col justify-between lg:h-[480px] overflow-hidden">
            {activeTab === 0 && <PipelineView isPaused={!isVisible} />}
            {activeTab === 1 && <BillQueueView />}
            {activeTab === 2 && <WalkthroughView isPaused={activeTab !== 2} />}
          </div>

        </div>

        {/* Floating Chat Bubble Button (bottom-right edge of console as seen in reference) */}
        <div 
          className="absolute -bottom-2 -right-2 sm:-right-3 h-10 w-10 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:scale-105 hover:bg-blue-700 transition-all cursor-pointer z-30"
          title="Docsynecx Assistant"
          aria-label="Docsynecx Assistant"
        >
          <MessageSquare size={17} className="fill-current" />
        </div>

      </div>
    </div>
  );
};
