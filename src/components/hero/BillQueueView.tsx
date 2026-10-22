'use client';
import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Download, 
  Check, 
  CircleAlert, 
  CheckCircle2, 
  X, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  ExternalLink,
  Filter
} from 'lucide-react';
import { initialQueueBills, BillQueueItem } from './mockData';

export const BillQueueView: React.FC = () => {
  const [bills, setBills] = useState<BillQueueItem[]>(initialQueueBills);
  const [filter, setFilter] = useState<'all' | 'needs-review' | 'posted'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBill, setSelectedBill] = useState<BillQueueItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const drawerTitleRef = useRef<HTMLHeadingElement>(null);
  const triggerRowRef = useRef<HTMLTableRowElement | null>(null);

  // Filter bills
  const filteredBills = bills.filter((b) => {
    const matchesFilter =
      filter === 'all'
        ? true
        : filter === 'needs-review'
        ? b.status === 'Needs review' || b.status === 'Duplicate hold'
        : b.status === 'Posted to Tally';

    const matchesSearch =
      b.billNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.gstin.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Calculate live counts
  const countAll = bills.length;
  const countNeedsReview = bills.filter((b) => b.status === 'Needs review' || b.status === 'Duplicate hold').length;
  const countPosted = bills.filter((b) => b.status === 'Posted to Tally').length;

  // Drawer accessibility: focus title on open, escape to close
  useEffect(() => {
    if (selectedBill) {
      drawerTitleRef.current?.focus();
    }
  }, [selectedBill]);

  const handleCloseDrawer = () => {
    setSelectedBill(null);
    triggerRowRef.current?.focus();
  };

  const handleRowSelect = (bill: BillQueueItem, e: React.MouseEvent | React.KeyboardEvent) => {
    triggerRowRef.current = e.currentTarget as HTMLTableRowElement;
    setSelectedBill(bill);
  };

  // Actions inside drawer
  const handleApprove = (billId: string) => {
    setBills((prev) =>
      prev.map((b) => {
        if (b.id === billId) {
          return {
            ...b,
            status: 'Posted to Tally' as const,
            explanation: undefined,
            auditTrail: [
              ...b.auditTrail,
              { step: 'Approved by Finance & posted to Tally Prime', time: 'Just now', actor: 'Finance Desk', status: 'completed' as const },
            ],
          };
        }
        return b;
      })
    );
    if (selectedBill && selectedBill.id === billId) {
      setSelectedBill((prev) => (prev ? { ...prev, status: 'Posted to Tally' } : null));
    }
    setToastMessage(`Voucher created & posted to Tally Prime for ${selectedBill?.billNo}`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleHold = (billId: string) => {
    setBills((prev) =>
      prev.map((b) => {
        if (b.id === billId) {
          return {
            ...b,
            status: 'Duplicate hold' as const,
            explanation: 'Payment hold applied by Finance reviewer.',
          };
        }
        return b;
      })
    );
    if (selectedBill && selectedBill.id === billId) {
      setSelectedBill((prev) => (prev ? { ...prev, status: 'Duplicate hold' } : null));
    }
    setToastMessage(`Payment hold placed on ${selectedBill?.billNo}`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div 
          role="status"
          className="absolute top-2 right-4 z-50 flex items-center gap-2 rounded-lg bg-slate-900 text-white px-3 py-1.5 font-mono text-[11px] shadow-lg border border-slate-700 animate-fadeIn"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================= HEADER & FILTER ROW ================= */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 border-b border-slate-100 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-slate-950">Vendor bills</h3>
              <span className="inline-flex items-center gap-1 rounded bg-violet-50 border border-violet-200/80 px-2 py-0.2 font-mono text-[9.5px] font-bold text-violet-700">
                Interactive demo
              </span>
            </div>
            <p className="mt-0.5 text-[11px] text-slate-500">
              From inbox to ledger entries. Zero retyping.
            </p>
          </div>

          {/* Search bar & export */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={12} className="absolute left-2.5 top-2 text-slate-400" />
              <input
                type="text"
                placeholder="Search bill or vendor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-7 w-44 sm:w-48 rounded-lg border border-slate-200 bg-slate-50/70 pl-7 pr-2.5 text-[11px] text-slate-800 placeholder-slate-400 outline-none focus:border-violet-500 focus:bg-white transition-all font-mono"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-2 text-slate-400 hover:text-slate-600"
                >
                  <X size={11} />
                </button>
              )}
            </div>

            <button
              type="button"
              title="Export report"
              onClick={() => {
                setToastMessage('Exporting bill records (CSV)...');
                setTimeout(() => setToastMessage(null), 2500);
              }}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all cursor-pointer"
            >
              <Download size={12} />
            </button>
          </div>
        </div>

        {/* Filter Chips Bar */}
        <div className="mt-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Bill filter chips">
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'all'}
              onClick={() => setFilter('all')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-mono transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-slate-900 text-white font-bold shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              <span>All bills</span>
              <span className={`rounded px-1.5 py-0.2 text-[9px] font-bold ${filter === 'all' ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-700'}`}>
                24
              </span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={filter === 'needs-review'}
              onClick={() => setFilter('needs-review')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-mono transition-all cursor-pointer ${
                filter === 'needs-review'
                  ? 'bg-amber-600 text-white font-bold shadow-2xs'
                  : 'bg-amber-50 text-amber-800 border border-amber-200/60 hover:bg-amber-100/80'
              }`}
            >
              <span>Needs review</span>
              <span className={`rounded px-1.5 py-0.2 text-[9px] font-bold ${filter === 'needs-review' ? 'bg-amber-700 text-white' : 'bg-amber-200/80 text-amber-900'}`}>
                1
              </span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={filter === 'posted'}
              onClick={() => setFilter('posted')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-mono transition-all cursor-pointer ${
                filter === 'posted'
                  ? 'bg-violet-600 text-white font-bold shadow-2xs'
                  : 'bg-violet-50 text-violet-800 border border-violet-200/60 hover:bg-violet-100/80'
              }`}
            >
              <span>Posted</span>
              <span className={`rounded px-1.5 py-0.2 text-[9px] font-bold ${filter === 'posted' ? 'bg-violet-700 text-white' : 'bg-violet-200/80 text-violet-900'}`}>
                23
              </span>
            </button>
          </div>

          <span className="hidden sm:inline font-mono text-[10px] text-slate-400">
            Click row to inspect
          </span>
        </div>
      </div>

      {/* ================= TABLE (Row height 52px, Sticky Header) ================= */}
      <div className="mt-2 flex-1 overflow-x-auto overflow-y-auto max-h-[340px] rounded-xl border border-slate-200/90 bg-white shadow-2xs">
        <table className="w-full text-left border-collapse text-[11.5px]">
          <thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 select-none">
            <tr>
              <th className="py-2.5 px-3">Bill No</th>
              <th className="py-2.5 px-3">Vendor / GSTIN</th>
              <th className="py-2.5 px-2 text-center">Date</th>
              <th className="py-2.5 px-3 text-right">Amount (₹)</th>
              <th className="py-2.5 px-2 text-center">GST Check</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-2 text-center">Owner</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-sans">
            {filteredBills.map((bill) => {
              const isSelected = selectedBill?.id === bill.id;
              return (
                <tr
                  key={bill.id}
                  tabIndex={0}
                  onClick={(e) => handleRowSelect(bill, e)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleRowSelect(bill, e);
                    }
                  }}
                  className={`h-[50px] transition-colors cursor-pointer outline-none ${
                    isSelected
                      ? 'bg-violet-50/80 ring-1 ring-inset ring-violet-500/30'
                      : 'hover:bg-slate-50/80 focus-visible:bg-violet-50/50'
                  }`}
                >
                  {/* Bill No */}
                  <td className="py-2 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                    {bill.billNo}
                  </td>

                  {/* Vendor & GSTIN */}
                  <td className="py-2 px-3">
                    <div className="font-bold text-slate-950 truncate max-w-[130px] sm:max-w-[150px]">
                      {bill.vendor}
                    </div>
                    <div className="font-mono text-[9.5px] text-slate-400 truncate">
                      {bill.gstin}
                    </div>
                  </td>

                  {/* Date */}
                  <td className="py-2 px-2 text-center font-mono text-[10.5px] text-slate-500 whitespace-nowrap">
                    {bill.date}
                  </td>

                  {/* Amount (₹ Lakh grouping, right-aligned, tabular numerals) */}
                  <td className="py-2 px-3 text-right font-mono tabular-nums font-bold text-slate-950 whitespace-nowrap">
                    {bill.amount}
                  </td>

                  {/* GST Check */}
                  <td className="py-2 px-2 text-center">
                    <span className="inline-flex items-center gap-1 rounded bg-violet-50 px-1.5 py-0.5 text-[9.5px] font-mono font-bold text-violet-800 border border-violet-200/70">
                      <Check size={10} className="text-violet-600" />
                      Verified
                    </span>
                  </td>

                  {/* Status Chip */}
                  <td className="py-2 px-3 whitespace-nowrap">
                    {bill.status === 'Posted to Tally' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-mono font-bold text-violet-800 border border-violet-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                        Posted to Tally
                      </span>
                    )}
                    {bill.status === 'Needs review' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-mono font-bold text-violet-800 border border-violet-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" />
                        Needs review
                      </span>
                    )}
                    {bill.status === 'Duplicate hold' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-mono font-bold text-amber-800 border border-amber-200">
                        <CircleAlert size={10} className="text-amber-600" />
                        Duplicate hold
                      </span>
                    )}
                  </td>

                  {/* Owner Avatar */}
                  <td className="py-2 px-2 text-center">
                    <span 
                      title={`Owner: ${bill.ownerName}`}
                      className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-700 font-mono text-[10px] font-bold border border-slate-200 shadow-2xs"
                    >
                      {bill.ownerInitials}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ================= BOTTOM INSIGHT STRIP ================= */}
      <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-slate-500 px-1">
        <div className="flex items-center gap-3">
          <span>Bills posted today: <b className="text-violet-700 font-bold">23</b></span>
          <span className="text-slate-300">·</span>
          <span>Held: <b className="text-amber-700 font-bold">1</b></span>
          <span className="text-slate-300">·</span>
          <span>Awaiting review: <b className="text-violet-700 font-bold">0</b></span>
        </div>
        <span className="text-slate-400 hidden sm:inline">100% audit logging active</span>
      </div>

      {/* ================= SLIDE-IN INSPECTION DRAWER (~42% Width) ================= */}
      {selectedBill && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-title"
          className="absolute inset-y-0 right-0 z-40 w-full sm:w-[44%] bg-white border-l border-slate-200 shadow-[-12px_0_30px_rgba(15,23,42,0.12)] flex flex-col justify-between p-4 transition-transform duration-300 ease-out animate-slideLeft overflow-y-auto"
        >
          {/* Drawer Top Header */}
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div>
                <span className="font-mono text-[10px] uppercase font-bold text-slate-400">
                  Bill Inspection
                </span>
                <h4 
                  ref={drawerTitleRef}
                  id="drawer-title"
                  tabIndex={-1}
                  className="text-sm font-extrabold text-slate-950 font-mono outline-none"
                >
                  {selectedBill.billNo}
                </h4>
              </div>

              <button
                type="button"
                onClick={handleCloseDrawer}
                className="flex h-6 w-6 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                aria-label="Close inspection drawer"
              >
                <X size={13} />
              </button>
            </div>

            {/* Duplicate Notice Banner if applicable */}
            {selectedBill.status === 'Duplicate hold' && (
              <div className="mt-3 rounded-lg border border-amber-300 bg-amber-50/90 p-2 text-[10.5px] font-mono text-amber-900">
                <div className="flex items-center gap-1.5 font-bold">
                  <CircleAlert size={12} className="text-amber-600 shrink-0" />
                  <span>Duplicate Guardrail Triggered</span>
                </div>
                <p className="mt-1 text-[10px] text-amber-800 leading-snug">
                  {selectedBill.explanation || 'Matches INV-0021. Held, not paid twice.'}
                </p>
              </div>
            )}

            {/* Extracted Details Card */}
            <div className="mt-3 rounded-lg border border-slate-200/80 bg-slate-50/70 p-3 text-[11px] space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500 font-mono text-[10px]">Vendor</span>
                <span className="font-bold text-slate-950 text-right">{selectedBill.vendor}</span>
              </div>
              <div className="flex justify-between font-mono text-[10.5px]">
                <span className="text-slate-500">GSTIN</span>
                <span className="text-slate-800">{selectedBill.gstin}</span>
              </div>
              <div className="flex justify-between font-mono text-[10.5px]">
                <span className="text-slate-500">Invoice Date</span>
                <span className="text-slate-800">{selectedBill.date}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-1.5 text-xs font-bold">
                <span className="font-mono text-slate-600">Total Amount</span>
                <span className="font-mono tabular-nums text-violet-700">{selectedBill.amount}</span>
              </div>
            </div>

            {/* Vertical Audit Trail Timeline */}
            <div className="mt-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Immutable Audit Trail
              </span>

              <div className="space-y-2 pl-1 border-l-2 border-slate-200 text-[10.5px] ml-2">
                {selectedBill.auditTrail.map((item, idx) => (
                  <div key={idx} className="relative pl-3">
                    <span 
                      className={`absolute -left-[5px] top-1 h-2 w-2 rounded-full ${
                        item.status === 'completed' ? 'bg-violet-500' : item.status === 'current' ? 'bg-amber-500' : 'bg-slate-300'
                      }`} 
                    />
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                      <span>{item.time}</span>
                      <span className="text-slate-500">{item.actor}</span>
                    </div>
                    <div className="text-slate-800 font-medium leading-tight">
                      {item.step}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Drawer Actions */}
          <div className="mt-4 border-t border-slate-100 pt-3 flex gap-2">
            <button
              type="button"
              onClick={() => handleApprove(selectedBill.id)}
              disabled={selectedBill.status === 'Posted to Tally'}
              className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 text-[11px] font-bold font-mono transition-all cursor-pointer ${
                selectedBill.status === 'Posted to Tally'
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-brand-violet text-white shadow-xs hover:bg-brand-violet-hover'
              }`}
            >
              <Check size={12} />
              {selectedBill.status === 'Posted to Tally' ? 'Already Posted' : 'Approve & Post'}
            </button>

            <button
              type="button"
              onClick={() => handleHold(selectedBill.id)}
              disabled={selectedBill.status === 'Duplicate hold'}
              className="flex items-center justify-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-bold font-mono text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
            >
              Hold
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
