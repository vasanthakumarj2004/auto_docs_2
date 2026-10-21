'use client';

import React from 'react';
import { useRouter } from '../../lib/router';

export const HeroStage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="relative w-full h-full flex flex-col justify-center select-none py-8 lg:py-12 z-10">
      {/* 1. Frosted Tag Pill matching reference video */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8ebfa]/92 border border-blue-200/80 shadow-xs mb-6 w-fit backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563EB]" />
        </span>
        <span className="text-xs sm:text-[13px] font-semibold text-[#2563EB] tracking-tight">
          For businesses that run on Tally, an ERP, or CargoWise
        </span>
      </div>

      {/* 2. 4-Line Balanced Headline with Crisp Contrast */}
      <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-[-0.03em] leading-[1.12] text-left text-wrap-balance drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
        <span className="text-white block">Grow the</span>
        <span className="text-white block">business, not</span>
        <span className="text-white/90 block">not the data-</span>
        <span className="text-white/85 block">entry desk.</span>
      </h1>

      {/* 3. Subtext */}
      <p className="mt-6 text-base sm:text-[18px] text-slate-100/95 leading-[1.58] max-w-[530px] font-normal drop-shadow-[0_1px_4px_rgba(0,0,0,0.25)]">
        Bills read, checked, paid and posted to Tally. Emails become CargoWise jobs. Your team handles exceptions, not typing.
      </p>

      {/* 4. Dual CTA Buttons with Arrow Chips */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        {/* Blue CTA: Run a finance desk */}
        <a
          href="/finance"
          onClick={(e) => {
            e.preventDefault();
            navigate('/finance');
          }}
          className="group relative h-[46px] w-[210px] rounded-[10px] bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold text-[15px] shadow-[0_10px_25px_-5px_rgba(37,99,235,0.55),inset_0_1px_0_0_rgba(255,255,255,0.3)] inline-flex items-center justify-between pl-5 pr-1.5 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer overflow-hidden"
        >
          <span>Run a finance desk</span>
          <span className="h-[34px] w-[38px] rounded-[7px] bg-white/16 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5">
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
          className="group relative h-[46px] w-[230px] rounded-[10px] bg-[#10B981] hover:bg-[#059669] text-white font-semibold text-[15px] shadow-[0_10px_25px_-5px_rgba(16,185,129,0.5),inset_0_1px_0_0_rgba(255,255,255,0.3)] inline-flex items-center justify-between pl-5 pr-1.5 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer overflow-hidden"
        >
          <span>Run the logistics desk</span>
          <span className="h-[34px] w-[38px] rounded-[7px] bg-white/16 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5">
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
      <div className="mt-8 flex flex-wrap items-center gap-8 text-[15px] text-white/90 font-medium">
        <span className="inline-flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-[#3ee0a6] shadow-[0_0_10px_#3ee0a6]" />
          Built around your approvals
        </span>
        <span className="inline-flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-[#1fd18a] shadow-[0_0_10px_#1fd18a]" />
          No rip-and-replace
        </span>
      </div>
    </div>
  );
};
