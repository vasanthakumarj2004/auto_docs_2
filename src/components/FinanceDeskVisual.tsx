import React from 'react';
import { CircleAlert } from 'lucide-react';

export const FinanceDeskVisual: React.FC<{ isCentered?: boolean }> = ({ isCentered = false }) => {
  const bills = [
    ['INV-2018', 'Alpha Components', 'Posted to Tally'],
    ['BILL-3081', 'Shivraj Traders', 'Posted to Tally'],
    ['INV-0021', 'Prime Components', 'Duplicate hold'],
    ['BILL-2082', 'Jaxon Industrial', 'Posted to Tally'],
  ];

  return (
    <div className={`card-stack-3d w-full ${isCentered ? 'is-centered' : ''}`}>
      {/* 2 Faint Ghost Cards Behind Main Card for Layered Depth */}
      <div className="ghost-card-1" aria-hidden="true" />
      <div className="ghost-card-2" aria-hidden="true" />

      {/* Main 3D Card with Realistic Lighting */}
      <div className="main-card-3d overflow-hidden">
        {/* Card Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/90 px-4 py-3">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-800">
            <span className="brand-mark h-4 w-4 rounded text-[8px]">D</span>
            Docsynecx <span className="font-normal text-slate-400">/ Finance desk</span>
          </div>
          <span className="floating-badge-2 flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-white px-2.5 py-0.5 text-[9px] font-bold text-emerald-700 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Tally connected
          </span>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-950">Vendor bills</h3>
              <p className="mt-1 text-[10px] text-slate-400">From inbox to books. 24-hour auto-syncing.</p>
            </div>
            <span className="floating-badge-1 rounded border border-blue-200 bg-blue-50/90 px-2.5 py-1 text-[9px] font-bold text-blue-700 shadow-sm">
              Demo workspace
            </span>
          </div>

          <div className="mt-5 flex gap-4 border-b border-slate-100 text-[10px] font-bold">
            <span className="border-b-2 border-brand-blue pb-2 text-brand-blue">
              All bills <b className="ml-1 rounded-full bg-blue-50 px-1.5 py-0.5 text-[8px]">24</b>
            </span>
            <span className="pb-2 text-slate-400">
              Needs review <b className="ml-1 font-normal">1</b>
            </span>
            <span className="pb-2 text-slate-400">
              Posted <b className="ml-1 font-normal">23</b>
            </span>
          </div>

          <div className="mt-2 overflow-x-auto">
            <table className="w-full min-w-[420px] text-left text-[9px]">
              <thead>
                <tr className="border-b border-slate-100 uppercase tracking-wider text-slate-400">
                  <th className="py-2.5 font-bold">Bill no</th>
                  <th className="font-bold">Vendor</th>
                  <th className="font-bold">GST check</th>
                  <th className="text-right font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {bills.map(([billNo, vendor, status]) => (
                  <tr key={billNo} className="border-b border-slate-50 transition-colors hover:bg-slate-50/60">
                    <td className="py-2.5 font-mono font-bold text-slate-800">{billNo}</td>
                    <td className="text-slate-600 font-medium">{vendor}</td>
                    <td>
                      <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold rounded bg-emerald-50 px-2 py-0.5 border border-emerald-100 shadow-2xs">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Verified
                      </span>
                    </td>
                    <td className="text-right">
                      <span
                        className={`inline-block rounded border px-2 py-0.5 text-[8.5px] font-bold shadow-2xs ${
                          status === 'Duplicate hold'
                            ? 'floating-badge-2 border-amber-200 bg-amber-50 text-amber-700'
                            : 'floating-badge-1 border-emerald-200 bg-emerald-50 text-emerald-700'
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3.5 flex justify-between text-[9px] text-slate-400">
            <span>Sync active just now</span>
            <span className="font-bold text-brand-blue hover:underline cursor-pointer">View activity →</span>
          </div>
        </div>

        {/* Floating Warning Banner */}
        <div className="flex items-center justify-center gap-2 border-t border-slate-900 bg-slate-950 px-4 py-2.5 text-[10px] font-semibold text-white">
          <CircleAlert size={13} className="text-amber-400" />
          Duplicate held; not paid twice
        </div>
      </div>
    </div>
  );
};
