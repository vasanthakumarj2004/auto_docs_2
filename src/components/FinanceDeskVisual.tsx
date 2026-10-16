'use client';
import React, { useState } from 'react';
import { CircleAlert, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { CountUp } from './CountUp';

interface BillItem {
  id: string;
  vendor: string;
  amount: string;
  date: string;
  gstin: string;
  gstStatus: 'Verified' | 'Pending';
  status: 'Posted to Tally' | 'Duplicate hold';
  auditDetail: string;
}

export const FinanceDeskVisual: React.FC<{ isCentered?: boolean }> = ({ isCentered = false }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'needs-review' | 'posted'>('all');
  const [isCrossfading, setIsCrossfading] = useState(false);
  const [selectedBill, setSelectedBill] = useState<BillItem | null>(null);

  const bills: BillItem[] = [
    {
      id: 'INV-2018',
      vendor: 'Alpha Components',
      amount: '₹1,42,800',
      date: '14-10-2026',
      gstin: '33AABCA1234D1Z5',
      gstStatus: 'Verified',
      status: 'Posted to Tally',
      auditDetail: 'Voucher #PUR-2026-4428 auto-created in Tally Prime. 18% IGST matched to GSTR-2B portal.',
    },
    {
      id: 'BILL-3081',
      vendor: 'Shivraj Traders',
      amount: '₹84,250',
      date: '15-10-2026',
      gstin: '27AAACR4412K1Z9',
      gstStatus: 'Verified',
      status: 'Posted to Tally',
      auditDetail: 'PO #PO-9021 matched line-by-line. Bank payout schedule prepared via approved bank partner.',
    },
    {
      id: 'INV-0021',
      vendor: 'Prime Components',
      amount: '₹56,400',
      date: '15-10-2026',
      gstin: '29AAACH7409R1ZZ',
      gstStatus: 'Verified',
      status: 'Duplicate hold',
      auditDetail: 'DUPLICATE ALERT: Identical invoice number & amount found in voucher #VCH-9812 from 12-10-2026. Held for accountant approval.',
    },
    {
      id: 'BILL-2082',
      vendor: 'Jaxon Industrial',
      amount: '₹2,10,000',
      date: '16-10-2026',
      gstin: '07AAAAJ8819Q1ZP',
      gstStatus: 'Verified',
      status: 'Posted to Tally',
      auditDetail: 'Auto-reconciled with PO #PO-8814. TDS 194Q 0.1% ledger entry calculated automatically.',
    },
  ];

  const handleTabChange = (tab: 'all' | 'needs-review' | 'posted') => {
    if (tab === activeTab) return;
    setIsCrossfading(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsCrossfading(false);
    }, 140);
  };

  const filteredBills = bills.filter((b) => {
    if (activeTab === 'needs-review') return b.status === 'Duplicate hold';
    if (activeTab === 'posted') return b.status === 'Posted to Tally';
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
            <span className="brand-mark h-4 w-4 rounded text-[8px] flex items-center justify-center font-bold">D</span>
            <span>Docsynecx</span>
            <span className="font-normal text-slate-400">/ Finance desk</span>
          </div>
          <span className="floating-badge-2 flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-white px-2.5 py-0.5 text-[9px] font-bold text-emerald-700 shadow-sm font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Tally Prime connected
          </span>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-950">Vendor bills</h3>
              <p className="mt-0.5 text-[10px] text-slate-400">From inbox to ledger entries. Zero retyping.</p>
            </div>
            <span className="floating-badge-1 rounded border border-blue-200 bg-blue-50/90 px-2 py-0.5 text-[9px] font-bold text-brand-blue font-mono shadow-2xs">
              Interactive Demo
            </span>
          </div>

          {/* Accessible Tabs with Tabular Counters */}
          <div
            className="mt-4 flex gap-4 border-b border-slate-100 text-[10px] font-bold"
            role="tablist"
            aria-label="Vendor bill categories"
          >
            <button
              role="tab"
              aria-selected={activeTab === 'all'}
              onClick={() => handleTabChange('all')}
              className={`pb-2 transition-all relative cursor-pointer outline-none ${
                activeTab === 'all'
                  ? 'border-b-2 border-brand-blue text-brand-blue font-bold'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              All bills{' '}
              <b className={`ml-1 rounded-full px-1.5 py-0.2 text-[8px] font-mono tabular-nums transition-colors ${
                activeTab === 'all' ? 'bg-blue-50 text-brand-blue' : 'bg-slate-100 text-slate-500'
              }`}>
                <CountUp end={24} />
              </b>
            </button>

            <button
              role="tab"
              aria-selected={activeTab === 'needs-review'}
              onClick={() => handleTabChange('needs-review')}
              className={`pb-2 transition-all relative cursor-pointer outline-none ${
                activeTab === 'needs-review'
                  ? 'border-b-2 border-amber-500 text-amber-700 font-bold'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Needs review{' '}
              <b className={`ml-1 rounded-full px-1.5 py-0.2 text-[8px] font-mono tabular-nums transition-colors ${
                activeTab === 'needs-review' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500'
              }`}>
                <CountUp end={1} />
              </b>
            </button>

            <button
              role="tab"
              aria-selected={activeTab === 'posted'}
              onClick={() => handleTabChange('posted')}
              className={`pb-2 transition-all relative cursor-pointer outline-none ${
                activeTab === 'posted'
                  ? 'border-b-2 border-emerald-600 text-emerald-700 font-bold'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Posted{' '}
              <b className={`ml-1 rounded-full px-1.5 py-0.2 text-[8px] font-mono tabular-nums transition-colors ${
                activeTab === 'posted' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
              }`}>
                <CountUp end={23} />
              </b>
            </button>
          </div>

          {/* Interactive Data Table with Realistic Indian Mock Data */}
          <div className="mt-2 overflow-x-auto min-h-[160px]">
            <table className="w-full min-w-[460px] text-left text-[9px]">
              <thead>
                <tr className="border-b border-slate-100 uppercase tracking-wider text-slate-400 font-mono">
                  <th className="py-2.5 font-bold">Bill no</th>
                  <th className="font-bold">Vendor</th>
                  <th className="font-bold text-right">Amount</th>
                  <th className="font-bold">GST Check</th>
                  <th className="text-right font-bold">Status</th>
                </tr>
              </thead>
              <tbody
                className={`transition-all duration-140 ease-out ${
                  isCrossfading ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
                }`}
              >
                {filteredBills.map((bill) => (
                  <tr
                    key={bill.id}
                    onClick={() => setSelectedBill(selectedBill?.id === bill.id ? null : bill)}
                    className={`border-b border-slate-50 transition-colors cursor-pointer ${
                      selectedBill?.id === bill.id ? 'bg-blue-50/50' : 'hover:bg-slate-50/70'
                    }`}
                  >
                    <td className="py-2.5 font-mono font-bold text-slate-900">{bill.id}</td>
                    <td className="text-slate-700 font-medium">
                      <div>{bill.vendor}</div>
                      <div className="text-[8px] font-mono text-slate-400">{bill.gstin}</div>
                    </td>
                    <td className="text-right font-mono font-bold text-slate-900 tabular-nums">
                      {bill.amount}
                    </td>
                    <td>
                      <span className="inline-flex items-center gap-1 text-emerald-800 font-semibold rounded bg-emerald-50 px-1.5 py-0.5 border border-emerald-200 shadow-2xs text-[8px]">
                        <CheckCircle2 size={9} className="text-emerald-600" />
                        Verified
                      </span>
                    </td>
                    <td className="text-right">
                      <span
                        className={`inline-block rounded border px-2 py-0.5 text-[8.5px] font-bold font-mono shadow-2xs ${
                          bill.status === 'Duplicate hold'
                            ? 'border-amber-300 bg-amber-50 text-amber-800'
                            : 'border-emerald-200 bg-emerald-50 text-emerald-800'
                        }`}
                      >
                        {bill.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Interactive Row Detail Popover (Audit Explanation) */}
          {selectedBill && (
            <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50/70 p-3 text-[10px] text-slate-800 shadow-xs animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="flex items-center justify-between font-bold text-slate-950 mb-1">
                <span className="font-mono">{selectedBill.id} · Audit Trail Details</span>
                <button
                  type="button"
                  onClick={() => setSelectedBill(null)}
                  className="text-slate-400 hover:text-slate-600 p-0.5"
                  aria-label="Close details"
                >
                  <X size={12} />
                </button>
              </div>
              <p className="text-slate-600 leading-relaxed font-medium">{selectedBill.auditDetail}</p>
            </div>
          )}

          <div className="mt-3 flex justify-between text-[9px] text-slate-400">
            <span>Click any row to inspect audit trail</span>
            <span className="font-bold text-brand-blue hover:underline cursor-pointer">
              Full Tally Log →
            </span>
          </div>
        </div>

        {/* Floating Warning Banner */}
        <div className="flex items-center justify-center gap-2 border-t border-slate-900 bg-slate-950 px-4 py-2.5 text-[10px] font-semibold text-white">
          <CircleAlert size={13} className="text-amber-400" />
          <span>Duplicate held; not paid twice</span>
        </div>
      </div>
    </div>
  );
};
