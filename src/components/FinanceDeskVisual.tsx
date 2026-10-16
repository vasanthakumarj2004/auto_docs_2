'use client';
import React from 'react';
import { CircleAlert } from 'lucide-react';
import { CountUp } from './CountUp';

export const FinanceDeskVisual: React.FC<{ isCentered?: boolean }> = ({ isCentered = false }) => {
  const [activeTab, setActiveTab] = React.useState<'all' | 'needs-review' | 'posted'>('all');
  const [isCrossfading, setIsCrossfading] = React.useState(false);
  const [selectedBillNo, setSelectedBillNo] = React.useState<string | null>('INV-0021');
  const [activePopover, setActivePopover] = React.useState<string | null>(null);

  const tabs: Array<{ id: 'all' | 'needs-review' | 'posted'; label: string; count: number }> = [
    { id: 'all', label: 'All bills', count: 24 },
    { id: 'needs-review', label: 'Needs review', count: 1 },
    { id: 'posted', label: 'Posted', count: 23 },
  ];

  const allBills: Array<{
    no: string;
    vendor: string;
    status: 'Posted to Tally' | 'Duplicate hold';
    detail: string;
  }> = [
    { no: 'INV-2018', vendor: 'Alpha Components', status: 'Posted to Tally', detail: 'Line items & GST matched. Synced into Tally ledger.' },
    { no: 'BILL-3081', vendor: 'Shivraj Traders', status: 'Posted to Tally', detail: 'Line items & GST matched. Synced into Tally ledger.' },
    { no: 'INV-0021', vendor: 'Prime Components', status: 'Duplicate hold', detail: 'Duplicate hold: Same invoice number detected. Payment blocked.' },
    { no: 'BILL-2082', vendor: 'Jaxon Industrial', status: 'Posted to Tally', detail: 'Line items & GST matched. Synced into Tally ledger.' },
  ];

  const handleTabChange = (tab: 'all' | 'needs-review' | 'posted') => {
    if (tab === activeTab) return;
    setIsCrossfading(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsCrossfading(false);
    }, 140);
  };

  const handleKeyDownTab = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = (index + 1) % tabs.length;
      handleTabChange(tabs[next].id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = (index - 1 + tabs.length) % tabs.length;
      handleTabChange(tabs[prev].id);
    }
  };

  const filteredBills = allBills.filter((bill) => {
    if (activeTab === 'needs-review') return bill.status === 'Duplicate hold';
    if (activeTab === 'posted') return bill.status === 'Posted to Tally';
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

          {/* Interactive WAI-ARIA Accessible Tablist */}
          <div className="mt-5 flex gap-4 border-b border-slate-100 text-[10px] font-bold" role="tablist" aria-label="Bill categories">
            {tabs.map((tab, idx) => {
              const isActive = activeTab === tab.id;
              const badgeColor =
                tab.id === 'needs-review'
                  ? isActive ? 'bg-amber-100 text-amber-700 font-bold' : 'bg-slate-100 text-slate-500'
                  : tab.id === 'posted'
                  ? isActive ? 'bg-emerald-100 text-emerald-700 font-bold' : 'bg-slate-100 text-slate-500'
                  : isActive ? 'bg-blue-100 text-brand-blue font-bold' : 'bg-slate-100 text-slate-500';

              const activeIndicator =
                tab.id === 'needs-review' ? 'border-b-2 border-amber-500 text-amber-600' :
                tab.id === 'posted' ? 'border-b-2 border-emerald-600 text-emerald-600' :
                'border-b-2 border-brand-blue text-brand-blue';

              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => handleTabChange(tab.id)}
                  onKeyDown={(e) => handleKeyDownTab(e, idx)}
                  className={`pb-2 transition-all relative cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-brand-blue rounded-t ${
                    isActive ? `${activeIndicator} font-bold` : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab.label}{' '}
                  <b className={`ml-1 rounded-full px-1.5 py-0.5 text-[8px] transition-colors ${badgeColor}`}>
                    <CountUp end={tab.count} />
                  </b>
                </button>
              );
            })}
          </div>

          {/* Tab Panel with Interactive Rows */}
          <div
            id={`panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            className="mt-2 overflow-x-auto min-h-[160px]"
          >
            <table className="w-full min-w-[420px] text-left text-[9px]">
              <thead>
                <tr className="border-b border-slate-100 uppercase tracking-wider text-slate-400">
                  <th className="py-2.5 font-bold">Bill no</th>
                  <th className="font-bold">Vendor</th>
                  <th className="font-bold">GST check</th>
                  <th className="text-right font-bold">Status</th>
                </tr>
              </thead>
              <tbody
                className={`transition-all duration-150 ease-out ${
                  isCrossfading ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
                }`}
              >
                {filteredBills.map((bill) => {
                  const isSelected = selectedBillNo === bill.no;
                  const isHold = bill.status === 'Duplicate hold';
                  const isPopoverVisible = activePopover === bill.no;

                  return (
                    <tr
                      key={bill.no}
                      onClick={() => setSelectedBillNo(bill.no)}
                      className={`border-b border-slate-50 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50/40 text-slate-900 font-semibold shadow-2xs'
                          : 'hover:bg-slate-50/60 text-slate-700'
                      }`}
                    >
                      <td className="py-2.5 font-mono font-bold text-slate-800">
                        <span className="flex items-center gap-1.5">
                          {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-brand-blue shrink-0" />}
                          {bill.no}
                        </span>
                      </td>
                      <td className="text-slate-600 font-medium">{bill.vendor}</td>
                      <td>
                        <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold rounded bg-emerald-50 px-2 py-0.5 border border-emerald-100 shadow-2xs">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Verified
                        </span>
                      </td>
                      <td className="text-right relative">
                        <div
                          className="inline-block relative"
                          onMouseEnter={() => setActivePopover(bill.no)}
                          onMouseLeave={() => setActivePopover(null)}
                          onFocus={() => setActivePopover(bill.no)}
                          onBlur={() => setActivePopover(null)}
                        >
                          <button
                            type="button"
                            tabIndex={0}
                            aria-label={`Status for ${bill.no}: ${bill.status}`}
                            className={`inline-block rounded border px-2 py-0.5 text-[8.5px] font-bold shadow-2xs transition-transform duration-150 hover:scale-[1.03] focus-visible:outline-1 focus-visible:outline-brand-blue ${
                              isHold
                                ? 'floating-badge-2 border-amber-200 bg-amber-50 text-amber-700 hover:border-amber-300'
                                : 'floating-badge-1 border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-300'
                            }`}
                          >
                            {bill.status}
                          </button>

                          {/* Detail popover on hover/focus */}
                          {isPopoverVisible && (
                            <div
                              role="tooltip"
                              className="absolute right-0 bottom-full mb-1.5 z-30 w-52 rounded-lg border border-slate-200 bg-slate-900 px-2.5 py-1.5 text-[8.5px] font-normal leading-snug text-slate-200 shadow-lg animate-fadeIn"
                            >
                              <div className="font-bold text-white mb-0.5 flex items-center gap-1">
                                <span className={`h-1.5 w-1.5 rounded-full ${isHold ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                                {bill.status}
                              </div>
                              {bill.detail}
                              <div className="absolute right-4 top-full h-0 w-0 border-x-4 border-x-transparent border-t-4 border-t-slate-900" />
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
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
