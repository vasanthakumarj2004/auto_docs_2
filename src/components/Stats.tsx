import React from 'react';

export const Stats: React.FC = () => {
  return (
    <section className="border-b border-slate-200/80 bg-white py-12">
      <div className="site-shell space-y-10">
        {/* Proof Stat Row from Image */}
        <div className="grid divide-y divide-slate-200 rounded-xl border border-slate-200 bg-[#fcfdff] p-6 shadow-xs sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="px-4 py-3 first:pl-0">
            <div className="text-2xl font-extrabold tracking-[-0.04em] text-slate-950 font-mono">
              2 hrs → 2 min
            </div>
            <div className="mt-1 text-xs text-slate-500 font-medium">
              FTL logistics: email to CargoWise
            </div>
          </div>

          <div className="px-4 py-3 sm:pl-6">
            <div className="text-2xl font-extrabold tracking-[-0.04em] text-slate-950 font-mono">
              Days → hours
            </div>
            <div className="mt-1 text-xs text-slate-500 font-medium">
              Rejections & re-fetches: purchase and spares
            </div>
          </div>

          <div className="px-4 py-3 sm:pl-6">
            <div className="text-2xl font-extrabold tracking-[-0.04em] text-slate-950 font-mono">
              In daily use
            </div>
            <div className="mt-1 text-xs text-slate-500 font-medium">
              Job billing: assets and purchase bills
            </div>
          </div>
        </div>

        {/* Labeled Logo Slot from Image */}
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
            className="marquee-container mask-marquee-edges mt-4 overflow-hidden py-1"
            aria-label="Trusted customer logos"
          >
            <div className="animate-marquee-track flex gap-3 sm:gap-4 pr-3 sm:pr-4">
              {/* Primary logo set */}
              <div className="flex shrink-0 gap-3 sm:gap-4">
                {Array.from({ length: 6 }, (_, i) => (
                  <div
                    key={`logo-primary-${i}`}
                    tabIndex={0}
                    className="flex shrink-0 min-w-[150px] sm:min-w-[170px] items-center justify-center gap-2 rounded-lg border border-slate-200/90 bg-slate-50 px-4 py-3 text-[11px] font-semibold text-slate-400 transition-all duration-200 hover:border-slate-300 hover:bg-white hover:text-slate-600 hover:shadow-xs focus-visible:border-brand-blue"
                  >
                    <span className="h-3 w-3 rounded bg-slate-300/80" />
                    Customer logo
                  </div>
                ))}
              </div>

              {/* Seamless clone set for infinite loop (hidden on reduced motion) */}
              <div className="marquee-duplicate flex shrink-0 gap-3 sm:gap-4" aria-hidden="true">
                {Array.from({ length: 6 }, (_, i) => (
                  <div
                    key={`logo-clone-${i}`}
                    className="flex shrink-0 min-w-[150px] sm:min-w-[170px] items-center justify-center gap-2 rounded-lg border border-slate-200/90 bg-slate-50 px-4 py-3 text-[11px] font-semibold text-slate-400 transition-all duration-200 hover:border-slate-300 hover:bg-white hover:text-slate-600 hover:shadow-xs"
                  >
                    <span className="h-3 w-3 rounded bg-slate-300/80" />
                    Customer logo
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

