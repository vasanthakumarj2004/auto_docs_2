'use client';

import React from 'react';
import { useRouter } from '../../lib/router';

export const HeroStage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="relative w-full flex flex-col justify-start select-none pt-1 pb-4 z-10">
      {/* 1. Frosted Tag Pill with High Contrast */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-50 border border-violet-200/90 shadow-xs mb-5 w-fit select-none">
        <span className="relative flex h-2 w-2">
          <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-600" />
        </span>
        <span className="text-xs sm:text-[13px] font-bold text-violet-900 tracking-tight">
          For businesses that run on Tally, an ERP, or CargoWise
        </span>
      </div>

      {/* 2. 4-Line Balanced Headline with Crisp Contrast */}
      <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-[-0.03em] leading-[1.12] text-left text-wrap-balance text-slate-950">
        <span className="block">Grow the</span>
        <span className="block">business, not</span>
        <span className="block">the data-</span>
        <span className="block">entry desk.</span>
      </h1>

      {/* 3. Subtext */}
      <p className="mt-5 text-base sm:text-[18px] text-slate-600 leading-[1.58] max-w-[530px] font-normal">
        Bills read, checked, paid and posted to Tally. Emails become CargoWise jobs. Your team handles exceptions, not typing.
      </p>

      {/* 4. Reference fill rises from the bottom on hover or keyboard focus. */}
      <div className="mt-7 flex flex-wrap items-center gap-4">
        {/* Royal Violet CTA: Run a finance desk */}
        <a
          href="/finance"
          onClick={(e) => {
            e.preventDefault();
            navigate('/finance');
          }}
          className="desk-button w-[210px]"
        >
          <span>Run a finance desk</span>
          <span className="desk-button-icon" aria-hidden="true">
            <svg
              className="h-4 w-4 stroke-[2.4]"
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

        {/* Matching violet CTA: Run the logistics desk */}
        <a
          href="/logistics"
          onClick={(e) => {
            e.preventDefault();
            navigate('/logistics');
          }}
          className="desk-button w-[230px]"
        >
          <span>Run the logistics desk</span>
          <span className="desk-button-icon" aria-hidden="true">
            <svg
              className="h-4 w-4 stroke-[2.4]"
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
      <div className="mt-7 flex flex-wrap items-center gap-8 text-[15px] text-slate-600 font-medium">
        <span className="inline-flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-brand-violet" />
          Built around your approvals
        </span>
        <span className="inline-flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-brand-violet" />
          No rip-and-replace
        </span>
      </div>
    </div>
  );
};
