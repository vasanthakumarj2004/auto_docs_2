'use client';

import React from 'react';
import { ChevronRight, FileText, Plus, MessageSquare } from 'lucide-react';

interface HeroActivityRowProps {
  isPosted?: boolean;
}

export const SHOW_HELP_BUTTON = false;

export const HeroActivityRow: React.FC<HeroActivityRowProps> = ({ isPosted = false }) => {
  return (
    <div className="relative w-full mt-4 flex items-center justify-between gap-3 select-none z-20">
      {/* Container holding both activity cards, positioned to extend slightly left */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full">
        {/* Left Activity Card: Apex Freight */}
        <div className="rounded-xl bg-white/90 backdrop-blur-md border border-white/80 shadow-[0_8px_20px_-4px_rgba(15,23,42,0.1)] px-3 py-2 flex items-center gap-2.5 min-w-[200px] sm:min-w-[240px]">
          <span className="h-7 w-7 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center font-bold text-[10px] shrink-0">
            <FileText size={14} className="stroke-[2.2]" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-slate-800 truncate leading-tight">Apex Freight</div>
            <div className="text-[10px] text-slate-500 truncate">Bill captured · 10:42</div>
          </div>
        </div>

        {/* Right Activity Card: INV-8492 Status */}
        <div className="rounded-xl bg-white/90 backdrop-blur-md border border-white/80 shadow-[0_8px_20px_-4px_rgba(15,23,42,0.1)] px-3 py-2 flex items-center justify-between gap-3 flex-1 min-w-[220px]">
          <div className="flex items-center gap-2.5">
            <span className="h-7 w-7 rounded-lg bg-violet-50 border border-violet-200 text-violet-600 flex items-center justify-center font-bold text-[10px] shrink-0">
              <Plus size={14} className="stroke-[2.5]" />
            </span>
            <div>
              <div className="text-xs font-bold text-slate-800 leading-tight">INV-8492</div>
              <div className="text-[10px] text-slate-500 font-mono">
                {isPosted ? 'Posted to Tally Prime' : 'Captured · OCR complete'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 transition-colors duration-300 ${
                isPosted
                  ? 'bg-violet-50 text-violet-700 border border-violet-200'
                  : 'bg-violet-50 text-violet-700 border border-violet-200'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isPosted ? 'bg-violet-500' : 'bg-violet-500 animate-pulse'
                }`}
              />
              {isPosted ? 'Posted' : 'Captured'}
            </span>
            <button
              type="button"
              className="h-6 w-6 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="View invoice detail"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Optional Help Circle button behind SHOW_HELP_BUTTON flag */}
      {SHOW_HELP_BUTTON && (
        <div
          className="h-10 w-10 rounded-full bg-[#8B32F7] text-white shadow-lg flex items-center justify-center hover:scale-105 transition-all cursor-pointer shrink-0"
          title="AutoDocs Assistant"
          aria-label="AutoDocs Assistant"
        >
          <MessageSquare size={17} className="fill-current" />
        </div>
      )}
    </div>
  );
};
