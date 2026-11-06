'use client';

import React from 'react';
import { useRouter } from '../../lib/router';
import { useLandingLayout } from '../LandingLayoutProvider';

export const HeroStage: React.FC = () => {
  const { navigate } = useRouter();
  const { appearance } = useLandingLayout();
  const isDark = appearance === 'dark';

  return (
    <div className="relative w-full flex flex-col justify-start select-none pt-1 pb-4 z-10">
      {/* 1. Frosted Tag Pill with High Contrast */}
      <div
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full shadow-xs mb-5 w-fit select-none border transition-colors ${
          isDark
            ? 'bg-white/[0.06] border-white/15 text-violet-200'
            : 'bg-violet-50 border-violet-200/90 text-violet-900'
        }`}
      >
        <span className="relative flex h-2 w-2">
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              isDark ? 'bg-violet-400' : 'bg-violet-600'
            }`}
          />
        </span>
        <span
          className={`text-xs sm:text-[13px] font-bold tracking-tight ${
            isDark ? 'text-violet-200' : 'text-violet-900'
          }`}
        >
          For businesses that run on Tally, an ERP, or CargoWise
        </span>
      </div>

      {/* 2. 4-Line Balanced Headline with Crisp Contrast */}
      <h1
        className={`text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-[-0.03em] leading-[1.12] text-left text-wrap-balance transition-colors ${
          isDark ? 'text-white' : 'text-slate-950'
        }`}
      >
        <span className="block">Grow the</span>
        <span className="block">business, not</span>
        <span className="block">the data-</span>
        <span className="block">entry desk.</span>
      </h1>

      {/* 3. Subtext */}
      <p
        className={`mt-5 text-base sm:text-[18px] leading-[1.58] max-w-[530px] font-normal transition-colors ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}
      >
        Bills read, checked, paid and posted to Tally. Emails become CargoWise jobs. Your team handles exceptions, not typing.
      </p>

      {/* 4. Desk CTAs */}
      <div className="mt-7 flex flex-wrap items-center gap-4">
        {/* Royal Violet CTA: Run a finance desk */}
        <a
          href="/finance"
          onClick={(e) => {
            e.preventDefault();
            navigate('/finance');
          }}
          className="desk-button desk-button-finance w-[210px]"
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
          className="desk-button desk-button-shipment w-[230px]"
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
      <div
        className={`mt-7 flex flex-wrap items-center gap-8 text-[15px] font-medium transition-colors ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}
      >
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
