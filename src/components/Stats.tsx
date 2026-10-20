'use client';
import React from 'react';
import { CountUp } from './CountUp';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const Stats: React.FC = () => {
  const { ref: statsRowRef } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="border-b border-slate-200/80 bg-white py-14">
      <div className="site-shell space-y-12">
        {/* Architectural Bento Metrics Container */}
        <div
          ref={statsRowRef}
          className="rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-sm shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-4px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.9)] p-6 sm:p-8 divide-y md:divide-y-0 md:divide-x divide-slate-200/80 grid md:grid-cols-3 gap-6 md:gap-0"
        >
          {/* Cell 1 */}
          <div className="md:px-6 md:first:pl-0 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Processing Velocity
              </span>
              <span className="font-mono text-[10px] tracking-tight rounded-md px-2 py-0.5 border bg-emerald-50 text-emerald-700 border-emerald-200 font-bold shadow-2xs">
                -98.3% CYCLE TIME
              </span>
            </div>
            <div>
              <div className="text-3xl font-extrabold tracking-[-0.04em] text-slate-950 font-mono">
                <CountUp end={2} /> hrs → <CountUp end={2} /> min
              </div>
              <div className="mt-1.5 text-xs text-slate-500 font-medium">
                FTL logistics: email to CargoWise
              </div>
            </div>
          </div>

          {/* Cell 2 */}
          <div className="pt-6 md:pt-0 md:px-6 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Turnaround Rate
              </span>
              <span className="font-mono text-[10px] tracking-tight rounded-md px-2 py-0.5 border bg-blue-50 text-blue-700 border-blue-200 font-bold shadow-2xs">
                10x FASTER POSTING
              </span>
            </div>
            <div>
              <div className="text-3xl font-extrabold tracking-[-0.04em] text-slate-950 font-mono">
                Days → hours
              </div>
              <div className="mt-1.5 text-xs text-slate-500 font-medium">
                Rejections & re-fetches: purchase and spares
              </div>
            </div>
          </div>

          {/* Cell 3 */}
          <div className="pt-6 md:pt-0 md:px-6 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400">
                System Reliability
              </span>
              <span className="font-mono text-[10px] tracking-tight rounded-md px-2 py-0.5 border bg-emerald-50 text-emerald-700 border-emerald-200 font-bold shadow-2xs inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                99.8% FIELD ACCURACY
              </span>
            </div>
            <div>
              <div className="text-3xl font-extrabold tracking-[-0.04em] text-slate-950 font-mono">
                In daily use
              </div>
              <div className="mt-1.5 text-xs text-slate-500 font-medium">
                Job billing: assets and purchase bills
              </div>
            </div>
          </div>
        </div>

        {/* Labeled Logo Slot with Enterprise Double-Bordered Capsules */}
        <div id="customers">
          <div className="flex flex-col justify-between gap-2 text-[11px] sm:flex-row sm:items-center">
            <span className="font-bold text-slate-800 tracking-tight">
              Trusted by teams that run on Tally and CargoWise
            </span>
            <span className="text-[10px] text-slate-400">
              Customer logos pending permission
            </span>
          </div>

          <div
            className="marquee-container mask-marquee-edges mt-4 overflow-hidden py-2"
            aria-label="Trusted customer logos"
          >
            <div className="animate-marquee-track flex gap-4 pr-4">
              {/* Primary logo set */}
              <div className="flex shrink-0 gap-4">
                {Array.from({ length: 6 }, (_, i) => (
                  <div
                    key={`logo-primary-${i}`}
                    tabIndex={0}
                    className="group relative flex shrink-0 min-w-[170px] sm:min-w-[190px] items-center justify-between rounded-xl border border-slate-200/90 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/50 p-1 shadow-xs transition-all duration-300 hover:border-blue-300 hover:shadow-sm focus-visible:border-brand-blue"
                  >
                    <div className="flex w-full items-center justify-between rounded-lg border border-slate-100/90 bg-white px-3.5 py-2.5 text-[11px] font-semibold text-slate-700 transition-colors group-hover:text-slate-950">
                      <span className="flex items-center gap-2">
                        <span className="h-3.5 w-3.5 rounded bg-slate-200/90 transition-colors group-hover:bg-brand-blue" />
                        Customer logo
                      </span>
                      <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                        Verified
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Seamless clone set for infinite loop (hidden on reduced motion) */}
              <div className="marquee-duplicate flex shrink-0 gap-4" aria-hidden="true">
                {Array.from({ length: 6 }, (_, i) => (
                  <div
                    key={`logo-clone-${i}`}
                    className="group relative flex shrink-0 min-w-[170px] sm:min-w-[190px] items-center justify-between rounded-xl border border-slate-200/90 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/50 p-1 shadow-xs transition-all duration-300 hover:border-blue-300 hover:shadow-sm"
                  >
                    <div className="flex w-full items-center justify-between rounded-lg border border-slate-100/90 bg-white px-3.5 py-2.5 text-[11px] font-semibold text-slate-700 transition-colors group-hover:text-slate-950">
                      <span className="flex items-center gap-2">
                        <span className="h-3.5 w-3.5 rounded bg-slate-200/90 transition-colors group-hover:bg-brand-blue" />
                        Customer logo
                      </span>
                      <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                        Verified
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
