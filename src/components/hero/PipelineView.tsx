'use client';
import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Mail, 
  Sparkles, 
  Database,
  ArrowRight
} from 'lucide-react';
import { pipelineInvoice, pipelineVoucher } from './mockData';

interface PipelineViewProps {
  isPaused?: boolean;
}

export const PipelineView: React.FC<PipelineViewProps> = ({ isPaused = false }) => {
  const [phase, setPhase] = useState<number>(5);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase(5);
      return;
    }

    if (isPaused) {
      setPhase(5);
      return;
    }

    let isMounted = true;
    let timeouts: NodeJS.Timeout[] = [];

    const runSequence = () => {
      setPhase(0);
      timeouts.push(setTimeout(() => { if (isMounted) setPhase(1); }, 700));
      timeouts.push(setTimeout(() => { if (isMounted) setPhase(2); }, 2400));
      timeouts.push(setTimeout(() => { if (isMounted) setPhase(3); }, 3600));
      timeouts.push(setTimeout(() => { if (isMounted) setPhase(4); }, 4400));
      timeouts.push(setTimeout(() => { if (isMounted) setPhase(5); }, 5600));
      timeouts.push(setTimeout(() => { if (isMounted) runSequence(); }, 8000));
    };

    runSequence();

    return () => {
      isMounted = false;
      timeouts.forEach(clearTimeout);
    };
  }, [isPaused]);

  return (
    <div className="w-full flex flex-col justify-between h-full space-y-3">
      {/* 3-Column Processing Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.05fr)_auto_minmax(0,1fr)] items-stretch gap-1.5 sm:gap-2">
        
        {/* ================= COLUMN 1: INCOMING BILL ================= */}
        <div className="flex flex-col rounded-xl border border-slate-200/90 bg-gradient-to-b from-white via-slate-50/40 to-slate-100/50 p-2.5 sm:p-3 shadow-xs">
          {/* Column Header */}
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/70">
            <div className="flex items-center gap-1.5">
              <span className="flex h-4.5 w-4.5 items-center justify-center rounded bg-blue-50 text-blue-700 font-mono text-[9.5px] font-bold border border-blue-200/70">
                01
              </span>
              <span className="text-[11.5px] font-bold text-slate-900">Incoming bill</span>
            </div>
            <span className="inline-flex items-center gap-1 rounded bg-blue-50/80 px-1.5 py-0.2 font-mono text-[9.5px] font-semibold text-blue-700 border border-blue-200/60">
              <Mail size={9} /> PDF
            </span>
          </div>

          {/* Paper Tax Invoice Card */}
          <div 
            className={`mt-2 flex-1 rounded-lg border border-slate-200/90 bg-white p-2.5 shadow-[0_3px_10px_-2px_rgba(15,23,42,0.06)] transition-all duration-500 relative flex flex-col justify-between ${
              phase >= 0 ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-1 text-[10.5px]">
                <div className="flex items-center gap-1">
                  <span className="h-3.5 px-1 rounded bg-rose-500 text-[8px] font-extrabold text-white flex items-center gap-0.5">
                    <FileText size={8} /> PDF
                  </span>
                  <span className="font-mono font-bold text-slate-900">{pipelineInvoice.invoiceNo}</span>
                </div>
                <span className="font-mono text-slate-400 text-[9.5px]">{pipelineInvoice.date}</span>
              </div>

              {/* Vendor & GSTIN */}
              <div className="mt-1.5 text-[11px]">
                <div className="font-extrabold text-slate-950 leading-tight truncate">{pipelineInvoice.vendor}</div>
                <div className="font-mono text-[9.5px] text-slate-500 mt-0.5">GSTIN: {pipelineInvoice.gstin}</div>
              </div>

              {/* Line items preview */}
              <div className="mt-2 border-t border-slate-100 pt-1 space-y-0.5 text-[10.5px]">
                {pipelineInvoice.lineItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-slate-600">
                    <span className="truncate max-w-[110px] text-[10px]">{item.description}</span>
                    <span className="font-mono tabular-nums text-slate-900 font-medium text-[10px]">{item.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Strip */}
            <div className="mt-2 border-t border-slate-200 pt-1.5 flex items-center justify-between text-xs font-bold">
              <span className="text-slate-500 font-mono text-[10px]">Total (18% IGST)</span>
              <span className="font-mono tabular-nums text-blue-700 text-[12.5px] font-extrabold">{pipelineInvoice.totalAmount}</span>
            </div>

            {/* Scanning highlight overlay */}
            {phase === 1 && (
              <div 
                className="absolute inset-0 rounded-lg border-2 border-blue-500 bg-blue-500/10 pointer-events-none transition-all duration-700 animate-pulse"
                aria-hidden="true"
              />
            )}
          </div>

          {/* Source confirmation pill */}
          <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>{pipelineInvoice.fileSize}</span>
            <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200/60 text-[9.5px]">
              <CheckCircle2 size={9} className="text-emerald-600" /> Captured
            </span>
          </div>
        </div>

        {/* CONNECTOR 1: OCR-PARSE */}
        <div className="hidden lg:flex flex-col items-center justify-center px-0.5">
          <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            OCR
          </span>
          <div className="relative h-12 w-0.5 border-r border-dashed border-slate-300">
            <div 
              className={`absolute w-1.5 h-1.5 rounded-full -left-[2.5px] bg-blue-600 shadow-sm transition-all duration-700 ${
                phase >= 1 ? 'top-8 opacity-100 scale-110' : 'top-1 opacity-40'
              }`}
            />
          </div>
          <ArrowRight size={12} className="text-slate-400 mt-1" />
        </div>

        {/* ================= COLUMN 2: READING & CHECK ================= */}
        <div className="flex flex-col rounded-xl border border-slate-200/90 bg-white p-2.5 sm:p-3 shadow-xs">
          {/* Column Header */}
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/70">
            <div className="flex items-center gap-1.5">
              <span className="flex h-4.5 w-4.5 items-center justify-center rounded bg-blue-50 text-blue-700 font-mono text-[9.5px] font-bold border border-blue-200/70">
                02
              </span>
              <span className="text-[11.5px] font-bold text-slate-900">Reading & check</span>
            </div>
            <span className="inline-flex items-center gap-1 rounded bg-blue-600 px-1.5 py-0.2 font-mono text-[9px] font-bold text-white shadow-2xs">
              <Sparkles size={9} /> 99.8% Match
            </span>
          </div>

          {/* Extracted Fields Checklist */}
          <div className="mt-2 space-y-1.5 flex-1 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="text-[9.5px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Extracted Fields
              </div>
              
              <div className="grid grid-cols-2 gap-1 text-[10.5px]">
                <div className={`p-1 rounded border transition-colors ${phase >= 1 ? 'border-blue-200 bg-blue-50/50' : 'border-slate-100 bg-slate-50/60'}`}>
                  <span className="block text-[8.5px] text-slate-400 font-mono uppercase">Vendor GSTIN</span>
                  <span className="font-mono text-slate-900 font-semibold truncate block text-[10px]">33AABCP1234A</span>
                </div>
                <div className={`p-1 rounded border transition-colors ${phase >= 1 ? 'border-blue-200 bg-blue-50/50' : 'border-slate-100 bg-slate-50/60'}`}>
                  <span className="block text-[8.5px] text-slate-400 font-mono uppercase">Inv Date</span>
                  <span className="font-mono text-slate-900 font-semibold block text-[10px]">{pipelineInvoice.date}</span>
                </div>
              </div>

              <div className={`p-1 rounded border text-[10.5px] flex items-center justify-between transition-colors ${phase >= 1 ? 'border-blue-200 bg-blue-50/50' : 'border-slate-100 bg-slate-50/60'}`}>
                <span className="text-[9.5px] text-slate-500 font-mono">Taxable / IGST</span>
                <span className="font-mono tabular-nums text-slate-900 font-semibold text-[10px]">₹1,21,017 + ₹21,783</span>
              </div>
            </div>

            {/* Validation Checkpoints */}
            <div className="mt-1 border-t border-slate-100 pt-1.5 space-y-1">
              <div className="text-[9.5px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Pre-Posting Checks
              </div>

              <div className={`flex items-center justify-between text-[10.5px] p-1 rounded border transition-all duration-300 ${
                phase >= 2 ? 'border-emerald-200 bg-emerald-50/60 text-emerald-900 font-medium' : 'border-slate-100 bg-slate-50/50 text-slate-400'
              }`}>
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={11} className={phase >= 2 ? 'text-emerald-600' : 'text-slate-300'} />
                  GST Portal: Matched 2B
                </span>
                <span className="font-mono text-[8.5px] font-bold">LIVE API</span>
              </div>

              <div className={`flex items-center justify-between text-[10.5px] p-1 rounded border transition-all duration-300 ${
                phase >= 2 ? 'border-emerald-200 bg-emerald-50/60 text-emerald-900 font-medium' : 'border-slate-100 bg-slate-50/50 text-slate-400'
              }`}>
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={11} className={phase >= 2 ? 'text-emerald-600' : 'text-slate-300'} />
                  PO match: 3-way
                </span>
                <span className="font-mono text-[8.5px] font-bold">100% OK</span>
              </div>

              <div className={`flex items-center justify-between text-[10.5px] p-1 rounded border transition-all duration-300 ${
                phase >= 2 ? 'border-emerald-200 bg-emerald-50/60 text-emerald-900 font-medium' : 'border-slate-100 bg-slate-50/50 text-slate-400'
              }`}>
                <span className="flex items-center gap-1">
                  <ShieldCheck size={11} className={phase >= 2 ? 'text-emerald-600' : 'text-slate-300'} />
                  Duplicate: none found
                </span>
                <span className="font-mono text-[8.5px] font-bold">CLEAR</span>
              </div>
            </div>
          </div>
        </div>

        {/* INTERSTITIAL APPROVAL GATE & CONNECTOR 2: POST-XML */}
        <div className="hidden lg:flex flex-col items-center justify-center px-0.5">
          {/* Approval Node */}
          <div className={`flex flex-col items-center rounded border p-1 text-center transition-all duration-300 ${
            phase >= 3 
              ? 'border-emerald-300 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500/20' 
              : 'border-slate-200 bg-slate-50 text-slate-400'
          }`}>
            <div className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-emerald-600 text-white text-[8px] font-bold font-mono">
              AC
            </div>
            <span className="text-[7.5px] font-mono font-bold mt-0.5 uppercase">Approved</span>
          </div>

          {/* Pulse Connector */}
          <div className="flex flex-col items-center mt-1">
            <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
              XML
            </span>
            <div className="relative h-10 w-0.5 border-r border-dashed border-slate-300">
              <div 
                className={`absolute w-1.5 h-1.5 rounded-full -left-[2.5px] bg-emerald-600 shadow-sm transition-all duration-700 ${
                  phase >= 4 ? 'top-6 opacity-100 scale-110' : 'top-1 opacity-40'
                }`}
              />
            </div>
            <ArrowRight size={12} className="text-slate-400 mt-0.5" />
          </div>
        </div>

        {/* ================= COLUMN 3: POSTED TO TALLY ================= */}
        <div className="flex flex-col rounded-xl border border-slate-200/90 bg-gradient-to-b from-white via-slate-50/40 to-slate-100/50 p-2.5 sm:p-3 shadow-xs">
          {/* Column Header */}
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/70">
            <div className="flex items-center gap-1.5">
              <span className="flex h-4.5 w-4.5 items-center justify-center rounded bg-emerald-50 text-emerald-700 font-mono text-[9.5px] font-bold border border-emerald-200/70">
                03
              </span>
              <span className="text-[11.5px] font-bold text-slate-900">Posted to Tally</span>
            </div>
            <span className="inline-flex items-center gap-1 rounded bg-emerald-100/80 px-1.5 py-0.2 font-mono text-[9.5px] font-bold text-emerald-800 border border-emerald-200">
              <Database size={9} /> Tally
            </span>
          </div>

          {/* Tally Voucher Card */}
          <div 
            className={`mt-2 flex-1 rounded-lg border border-slate-200/90 bg-white p-2.5 shadow-xs transition-all duration-500 relative flex flex-col justify-between ${
              phase >= 4 ? 'border-emerald-300 bg-white ring-1 ring-emerald-500/20' : 'border-slate-200/80 bg-slate-50/70'
            }`}
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-1 text-[10.5px]">
                <span className="font-mono text-slate-500 text-[9.5px]">Purchase Voucher</span>
                <span className="font-mono font-bold text-emerald-700 text-[11.5px]">{pipelineVoucher.voucherNo}</span>
              </div>

              <div className="mt-1.5 text-[11px] space-y-1">
                <div>
                  <span className="block text-[8.5px] text-slate-400 font-mono uppercase">Ledger Account</span>
                  <span className="font-semibold text-slate-900 block truncate text-[10.5px]">{pipelineVoucher.ledger}</span>
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono border-t border-slate-100 pt-1">
                  <span className="text-slate-500">Audit ID:</span>
                  <span className="font-bold text-slate-800">{pipelineVoucher.auditId}</span>
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-slate-500">Synced:</span>
                  <span className="text-slate-700">10:42:11</span>
                </div>
              </div>
            </div>

            {/* Total Posted Row */}
            <div className="mt-2 border-t border-slate-200 pt-1.5 flex items-center justify-between text-xs font-bold">
              <span className="text-slate-500 font-mono text-[10px]">Voucher Total</span>
              <span className="font-mono tabular-nums text-slate-950 font-extrabold text-[12.5px]">{pipelineInvoice.totalAmount}</span>
            </div>

            {/* POSTED STAMP */}
            {phase >= 4 && (
              <div 
                className="absolute top-7 right-2 rotate-[-12deg] rounded border-2 border-emerald-600 bg-emerald-50/95 px-2 py-0.2 text-center text-emerald-800 font-mono text-[10px] font-black uppercase tracking-wider shadow-sm transition-all duration-300 scale-100"
              >
                ✓ POSTED
              </div>
            )}
          </div>

          {/* Under Column 3: Subtle Bracket Strip */}
          <div className="mt-1.5 rounded bg-emerald-50/70 border border-emerald-200/60 px-1.5 py-0.5 text-center font-mono text-[9px] font-semibold text-emerald-900 truncate">
            Writes back to your books, nothing replaced
          </div>
        </div>

      </div>

      {/* Live Event Log */}
      <div className="rounded-xl border border-slate-200/80 bg-slate-900 px-3 py-2 text-slate-300 font-mono text-[10.5px] shadow-inner select-none">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1 mb-1 text-[9.5px] text-slate-400">
          <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Event Stream
          </span>
          <span>Buffer: 3 active events</span>
        </div>

        <div className="space-y-0.5 text-[10.5px] leading-relaxed">
          {phase >= 4 && (
            <div className="flex items-center gap-2 text-emerald-400 transition-opacity duration-300">
              <span className="text-slate-500 text-[9.5px]">10:42:11</span>
              <span className="truncate">Voucher #PUR-8492 posted to Tally Prime · Audit ID #89283 confirmed</span>
            </div>
          )}
          {phase >= 2 && (
            <div className="flex items-center gap-2 text-blue-300 transition-opacity duration-300">
              <span className="text-slate-500 text-[9.5px]">10:42:09</span>
              <span className="truncate">GSTIN 33AABCP1234A1Z5 verified · 2B return matched · 0 duplicates</span>
            </div>
          )}
          {phase >= 0 && (
            <div className="flex items-center gap-2 text-slate-300 transition-opacity duration-300">
              <span className="text-slate-500 text-[9.5px]">10:42:07</span>
              <span className="truncate">Email received from apex@freight.com · Ingested INV-8492.pdf (142 KB)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
