import React from 'react';

export const Customers: React.FC = () => {
  return (
    <section id="customers" className="border-b border-slate-200 bg-white py-10">
      <div className="site-shell">
        <div className="flex flex-col justify-between gap-2 text-[11px] sm:flex-row sm:items-center">
          <span className="font-bold text-slate-800">
            Trusted by teams that run on Tally and CargoWise
          </span>
          <span className="text-[10px] text-slate-400">Customer logos pending permission</span>
        </div>
        <div
          className="marquee-container mask-marquee-edges mt-4 overflow-hidden py-1"
          aria-label="Trusted customer logos"
        >
          <div className="animate-marquee-track flex gap-3 sm:gap-4 pr-3 sm:pr-4">
            <div className="flex shrink-0 gap-3 sm:gap-4">
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={`cust-primary-${i}`}
                  tabIndex={0}
                  className="flex shrink-0 min-w-[150px] sm:min-w-[170px] items-center justify-center gap-2 rounded border border-slate-200 bg-slate-50 px-4 py-3 text-[10px] font-semibold text-slate-400 transition-all duration-200 hover:border-slate-300 hover:bg-white hover:text-slate-600 focus-visible:border-brand-blue"
                >
                  <span className="h-3 w-3 rounded bg-slate-200" />
                  Customer logo
                </div>
              ))}
            </div>
            <div className="marquee-duplicate flex shrink-0 gap-3 sm:gap-4" aria-hidden="true">
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={`cust-clone-${i}`}
                  className="flex shrink-0 min-w-[150px] sm:min-w-[170px] items-center justify-center gap-2 rounded border border-slate-200 bg-slate-50 px-4 py-3 text-[10px] font-semibold text-slate-400 transition-all duration-200 hover:border-slate-300 hover:bg-white hover:text-slate-600"
                >
                  <span className="h-3 w-3 rounded bg-slate-200" />
                  Customer logo
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
