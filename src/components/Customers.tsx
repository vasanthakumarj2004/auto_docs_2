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
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="flex items-center justify-center gap-2 rounded border border-slate-200 bg-slate-50 px-3 py-3 text-[10px] font-semibold text-slate-400"
            >
              <span className="h-3 w-3 rounded bg-slate-200" />
              Customer logo
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
