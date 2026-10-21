'use client';

import React from 'react';
import { useRouter } from '../../lib/router';

export const HeroStage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="relative w-full h-full flex flex-col justify-center select-none py-8 lg:py-12">
      {/* 1. Tag Pill */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8eafb]/95 border border-[#c7d2fe]/70 shadow-xs mb-6 w-fit backdrop-blur-sm">
        <span className="h-2 w-2 rounded-full bg-[#3b82f6] animate-pulse" />
        <span className="text-xs sm:text-[13px] font-semibold text-[#2f3de0] tracking-tight">
          For businesses that run on Tally, an ERP, or CargoWise
        </span>
      </div>

      {/* 2. 4-Line Balanced Headline */}
      <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-[-0.03em] leading-[1.13] text-left text-wrap-balance">
        <span className="text-white block">Grow the</span>
        <span className="text-white block">business, not</span>
        <span className="text-white/85 block">not the data-</span>
        <span className="text-white/80 block">entry desk.</span>
      </h1>

      {/* 3. Subtext */}
      <p className="mt-6 text-base sm:text-[18px] text-white/90 leading-[1.55] max-w-[530px] font-normal">
        Bills read, checked, paid and posted to Tally. Emails become CargoWise jobs. Your team handles exceptions, not typing.
      </p>

      {/* 4. Dual CTA Buttons with Right Arrow Chips */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        {/* Blue CTA: Run a finance desk */}
        <a
          href="/finance"
          onClick={(e) => {
            e.preventDefault();
            navigate('/finance');
          }}
          className="group relative h-[46px] w-[208px] rounded-[8px] bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold text-[15px] shadow-[0_10px_25px_-5px_rgba(37,99,235,0.5)] inline-flex items-center justify-between pl-5 pr-1.5 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer overflow-hidden"
        >
          <span>Run a finance desk</span>
          <span className="h-[34px] w-[38px] rounded-[6px] bg-white/16 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5">
            <svg
              className="h-4 w-4 text-white stroke-[2.4]"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="8" x2="13" y2="8" />
              <polyline points="9 4 13 8 9 12" />
            </svg>
          </span>
        </a>

        {/* Green CTA: Run the logistics desk */}
        <a
          href="/logistics"
          onClick={(e) => {
            e.preventDefault();
            navigate('/logistics');
          }}
          className="group relative h-[46px] w-[229px] rounded-[8px] bg-[#10B981] hover:bg-[#059669] text-white font-semibold text-[15px] shadow-[0_10px_25px_-5px_rgba(16,185,129,0.45)] inline-flex items-center justify-between pl-5 pr-1.5 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer overflow-hidden"
        >
          <span>Run the logistics desk</span>
          <span className="h-[34px] w-[38px] rounded-[6px] bg-white/16 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5">
            <svg
              className="h-4 w-4 text-white stroke-[2.4]"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="8" x2="13" y2="8" />
              <polyline points="9 4 13 8 9 12" />
            </svg>
          </span>
        </a>
      </div>

      {/* 5. Trust Bullets */}
      <div className="mt-8 flex flex-wrap items-center gap-8 text-[15px] text-white/85 font-medium">
        <span className="inline-flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-[#3ee0a6] shadow-[0_0_8px_#3ee0a6]" />
          Built around your approvals
        </span>
        <span className="inline-flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-[#1fd18a] shadow-[0_0_8px_#1fd18a]" />
          No rip-and-replace
        </span>
      </div>
    </div>
  );
};
