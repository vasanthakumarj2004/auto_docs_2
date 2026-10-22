'use client';
import React from 'react';
import { Receipt, Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface BillReviewVisualProps {
  activeStep?: number;
}

export const BillReviewVisual: React.FC<BillReviewVisualProps> = ({ activeStep = 0 }) => {
  return (
    <div className="w-full flex flex-col justify-between h-full gap-4">
      {/* Sub-Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800">
          <span className="brand-mark h-5 w-5 rounded text-[9px] flex items-center justify-center font-bold">
            <Receipt size={11} />
          </span>
          <span>Bill review</span>
          <span className="text-slate-400 font-mono text-[11px] font-normal">
            (Prime Components · ₹74,095)
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400 font-medium">
          INV #829 · FY 2024-25
        </span>
      </div>

      {/* Main Split Body */}
      <div className="grid gap-4 sm:grid-cols-2 flex-1">
        {/* Left Extraction Panel (Spotlighted on Step 01) */}
        <div
          className={`relative rounded-xl border p-3.5 transition-all duration-300 flex flex-col justify-between ${
            activeStep === 0
              ? 'border-violet-400 bg-violet-50/30 ring-2 ring-violet-500/25 shadow-xs'
              : 'border-slate-200/80 bg-slate-50/60'
          }`}
        >
          {/* Step 01 Floating Badge */}
          {activeStep === 0 && (
            <div className="absolute -top-2.5 right-3 inline-flex items-center gap-1 rounded bg-[#8B32F7] px-2 py-0.5 text-[8.5px] font-mono font-bold text-white shadow-xs">
              <Sparkles size={8.5} />
              AI Field Confidence: 99.9%
            </div>
          )}

          <div>
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                Tax invoice
              </span>
              <span className="text-[8.5px] font-mono font-semibold text-slate-500">
                GSTIN: 33AABCP1234A1Z5
              </span>
            </div>
            <p className="mt-2 text-xs font-bold text-slate-900">Prime Components</p>
            <p className="mt-0.5 text-[9.5px] text-slate-500 font-mono">4 line items · 18% GST</p>

            <div className="mt-3 flex justify-between border-t border-slate-200/80 pt-2 text-[9.5px] text-slate-600">
              <span>Machined parts · 420 units</span>
              <span className="font-mono font-semibold text-slate-900">₹62,792</span>
            </div>
          </div>

          <div className="mt-3 flex justify-between border-t border-slate-200 pt-2 text-xs font-extrabold text-slate-950 font-mono">
            <span>Total</span>
            <span className="text-[#8B32F7] font-bold">₹74,095</span>
          </div>
        </div>

        {/* Right Verification Checklist (Spotlighted on Step 02 & Step 03) */}
        <div
          className={`rounded-xl border p-3.5 transition-all duration-300 flex flex-col justify-between ${
            activeStep === 1
              ? 'border-violet-400 bg-violet-50/25 ring-2 ring-violet-500/20 shadow-xs'
              : activeStep === 2
              ? 'border-amber-400 bg-amber-50/25 ring-2 ring-amber-500/20 shadow-xs'
              : 'border-slate-200/80 bg-white'
          }`}
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                Checked before it moves
              </span>
              {activeStep === 1 && (
                <span className="inline-flex items-center gap-1 rounded bg-violet-50 border border-violet-200 px-1.5 py-0.5 text-[8px] font-mono font-bold text-violet-800">
                  <ShieldCheck size={9} />
                  XML Sync Active
                </span>
              )}
            </div>

            <div className="mt-3 space-y-2 text-[10px] text-slate-700">
              <p className="flex items-center gap-1.5 font-medium">
                <Check size={12} className="text-violet-500 shrink-0" />
                GST & line items totals verified
              </p>

              {/* Step 03 Spotlight Zone */}
              <div
                className={`rounded-lg p-1.5 transition-all ${
                  activeStep === 2
                    ? 'bg-amber-100/70 border border-amber-300'
                    : ''
                }`}
              >
                <p className="flex items-center gap-1.5 font-medium text-slate-900">
                  <Check size={12} className="text-violet-500 shrink-0" />
                  No duplicate bill found
                </p>
                {activeStep === 2 && (
                  <div className="mt-1 font-mono text-[8.5px] text-amber-800 font-semibold pl-4">
                    Scanned 1,420 historical vouchers · Repeated Invoice #INV-1104 held automatically
                  </div>
                )}
              </div>

              <p className="flex items-center gap-1.5 font-medium">
                <Check size={12} className="text-violet-500 shrink-0" />
                Approval recorded
              </p>
            </div>
          </div>

          {/* Action Pill */}
          <div
            className={`mt-4 flex items-center justify-center gap-1.5 rounded-lg py-2 text-[9.5px] font-bold font-mono transition-all ${
              activeStep === 1
                ? 'bg-[#8B32F7] text-white shadow-sm ring-1 ring-violet-600'
                : 'border border-violet-100 bg-violet-50 text-violet-700'
            }`}
          >
            <ArrowRight size={12} />
            Posted to Tally: voucher #829
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="border-t border-slate-100 pt-2 text-center text-[9.5px] text-slate-400">
        Illustrative workflow · your approvals rules, your books
      </div>
    </div>
  );
};
