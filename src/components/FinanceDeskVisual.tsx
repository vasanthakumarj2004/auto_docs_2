'use client';
import React from 'react';
import { CircleAlert } from 'lucide-react';
import { CountUp } from './CountUp';

export const FinanceDeskVisual: React.FC<{ isCentered?: boolean }> = ({ isCentered = false }) => {
  const [activeTab, setActiveTab] = React.useState<'all' | 'needs-review' | 'posted'>('all');
  const [isCrossfading, setIsCrossfading] = React.useState(false);

  const allBills = [
    ['INV-4821', 'Alpha Components', 'Posted to Tally'],
    ['INV-0892', 'Shivraj Traders', 'Posted to Tally'],
    ['INV-3847', 'Prime Components', 'Duplicate hold'],
    ['INV-1104', 'Jaxon Industrial', 'Posted to Tally'],
  ];

  const handleTabChange = (tab: 'all' | 'needs-review' | 'posted') => {
    if (tab === activeTab) return;
    setIsCrossfading(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsCrossfading(false);
    }, 120);
  };

  const filteredBills = allBills.filter(([, , status]) => {
    if (activeTab === 'needs-review') return status === 'Duplicate hold';
    if (activeTab === 'posted') return status === 'Posted to Tally';
    return true;
  });

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
            <span className="brand-mark h-4 w-4 rounded text-[8px]">A</span>
            AutoDocs <span className="font-normal text-slate-400">/ Finance desk</span>
          </div>
          <span className="floating-badge-2 flex items-center gap-1.5 rounded-full border border-violet-200/80 bg-white px-2.5 py-0.5 text-[9px] font-bold text-violet-700 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" />
            Tally connected
          </span>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-950">Vendor bills</h3>
              <p className="mt-1 text-[10px] text-slate-400">From inbox to books. 24-hour auto-syncing.</p>
            </div>
            <span className="floating-badge-1 rounded border border-violet-200 bg-violet-50/90 px-2.5 py-1 text-[9px] font-bold text-violet-800 shadow-sm">
              Demo workspace
            </span>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 border-b border-slate-100 pb-2">
            <div className="flex gap-4 text-[10px] font-bold" role="tablist" aria-label="Bill categories">
              <button
                role="tab"
                aria-selected={activeTab === 'all'}
                onClick={() => handleTabChange('all')}
                suppressHydrationWarning
                className={`pb-1 transition-all relative cursor-pointer outline-none ${
                  activeTab === 'all'
                    ? 'border-b-2 border-brand-violet text-brand-violet font-bold'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                All bills <b className={`ml-1 rounded-full px-1.5 py-0.5 text-[8px] transition-colors ${activeTab === 'all' ? 'bg-violet-50 text-violet-700' : 'bg-slate-100 text-slate-500'}`}><CountUp end={24} /></b>
              </button>

              <button
                role="tab"
                aria-selected={activeTab === 'needs-review'}
                onClick={() => handleTabChange('needs-review')}
                suppressHydrationWarning
                className={`pb-1 transition-all relative cursor-pointer outline-none ${
                  activeTab === 'needs-review'
                    ? 'border-b-2 border-amber-500 text-amber-600 font-bold'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Needs review <b className={`ml-1 rounded-full px-1.5 py-0.5 text-[8px] transition-colors ${activeTab === 'needs-review' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'}`}><CountUp end={2} /></b>
              </button>

              <button
                role="tab"
                aria-selected={activeTab === 'posted'}
                onClick={() => handleTabChange('posted')}
                suppressHydrationWarning
                className={`pb-1 transition-all relative cursor-pointer outline-none ${
                  activeTab === 'posted'
                    ? 'border-b-2 border-violet-600 text-violet-600 font-bold'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Posted <b className={`ml-1 rounded-full px-1.5 py-0.5 text-[8px] transition-colors ${activeTab === 'posted' ? 'bg-violet-50 text-violet-600' : 'bg-slate-100 text-slate-500'}`}><CountUp end={22} /></b>
              </button>
            </div>

            {/* Elevated dark floating alert pill */}
            <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#231134] text-white px-2.5 py-0.5 shadow-md border border-slate-700/80 text-[8.5px] font-mono shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-300 font-semibold">Duplicate hold</span>
              <span className="text-slate-400">· not paid twice</span>
            </div>
          </div>

          <div className="mt-2 overflow-x-auto min-h-[160px]">
            <table className="w-full min-w-[420px] text-left text-[9px]">
              <thead>
                <tr className="border-b border-slate-100 uppercase tracking-wider text-slate-400">
                  <th className="py-2.5 font-bold">Bill no</th>
                  <th className="font-bold">Vendor</th>
                  <th className="font-bold">GST check</th>
                  <th className="text-right font-bold">Status</th>
                </tr>
              </thead>
              <tbody className={`transition-all duration-150 ease-out ${isCrossfading ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'}`}>
                {filteredBills.map(([billNo, vendor, status]) => (
                  <tr key={billNo} className="border-b border-slate-50 transition-colors hover:bg-slate-50/60">
                    <td className="py-2.5 font-mono font-bold text-slate-800">{billNo}</td>
                    <td className="text-slate-600 font-medium">{vendor}</td>
                    <td>
                      <span className="inline-flex items-center gap-1.5 text-violet-700 font-semibold rounded bg-violet-50 px-2 py-0.5 border border-violet-100 shadow-2xs">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-500" />
                        Verified
                      </span>
                    </td>
                    <td className="text-right">
                      <span
                        className={`inline-block rounded border px-2 py-0.5 text-[8.5px] font-bold shadow-2xs ${
                          status === 'Duplicate hold'
                            ? 'floating-badge-2 border-amber-200 bg-amber-50 text-amber-700'
                            : 'floating-badge-1 border-violet-200 bg-violet-50 text-violet-700'
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
            <span className="font-bold text-brand-violet hover:underline cursor-pointer">View activity →</span>
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
