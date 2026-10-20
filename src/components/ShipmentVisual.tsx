'use client';
import React from 'react';
import { Inbox, ArrowDown, Check, ShieldCheck, FileText } from 'lucide-react';

interface ShipmentVisualProps {
  activeStep?: number;
}

export const ShipmentVisual: React.FC<ShipmentVisualProps> = ({ activeStep = 0 }) => {
  return (
    <div className="w-full flex flex-col justify-between h-full gap-3">
      {/* Top Customer Inbox Card (Spotlighted on Step 01) */}
      <div
        className={`rounded-xl border p-3.5 transition-all duration-300 ${
          activeStep === 0
            ? 'border-teal-400 bg-teal-50/20 ring-2 ring-teal-500/25 shadow-sm'
            : 'border-slate-200 bg-white shadow-2xs'
        }`}
      >
        <div className="flex items-center justify-between text-[10px]">
          <span className="flex items-center gap-1.5 font-bold text-slate-800">
            <Inbox size={12} className="text-teal-600" />
            Customer inbox
          </span>
          <div className="flex items-center gap-2">
            {activeStep === 0 && (
              <span className="rounded bg-teal-50 border border-teal-200 px-1.5 py-0.5 text-[8px] font-mono font-bold text-teal-800">
                Parsing Active
              </span>
            )}
            <span className="text-[9px] text-slate-400 font-mono">09:41 AM</span>
          </div>
        </div>
        <p className="mt-1.5 text-xs font-bold text-slate-950">New booking: Chennai → Singapore</p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          <span
            className={`inline-flex items-center gap-1 rounded px-2 py-0.5 font-mono text-[9px] font-medium border transition-colors ${
              activeStep === 0
                ? 'bg-teal-50 border-teal-300 text-teal-900 font-semibold'
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            <FileText size={9} /> Bill of lading.pdf
          </span>
          <span
            className={`inline-flex items-center gap-1 rounded px-2 py-0.5 font-mono text-[9px] font-medium border transition-colors ${
              activeStep === 0
                ? 'bg-teal-50 border-teal-300 text-teal-900 font-semibold'
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            <FileText size={9} /> Packing list.pdf
          </span>
          <span
            className={`inline-flex items-center gap-1 rounded px-2 py-0.5 font-mono text-[9px] font-medium border transition-colors ${
              activeStep === 0
                ? 'bg-teal-50 border-teal-300 text-teal-900 font-semibold'
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            <FileText size={9} /> Invoice.pdf
          </span>
        </div>
      </div>

      {/* Center Emerald Verification Bridge (Spotlighted on Step 02) */}
      <div className="flex flex-col items-center justify-center py-1">
        <span
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[9.5px] font-bold font-mono transition-all duration-300 ${
            activeStep === 1
              ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400/50 scale-105'
              : 'bg-teal-800 text-white shadow-2xs'
          }`}
        >
          <ArrowDown size={11} className={activeStep === 1 ? 'animate-bounce' : ''} />
          ✓ Read & cross-checked in 110s
        </span>

        {/* Live Field-Match Micro-Strip */}
        {activeStep === 1 && (
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-emerald-300 bg-white px-2.5 py-1 text-[8.5px] font-mono font-bold text-emerald-800 shadow-2xs animate-fadeIn">
            <ShieldCheck size={10} className="text-emerald-600" />
            <span>BL ↔ Packing List ↔ Invoice</span>
            <span className="text-slate-300">·</span>
            <span>1 x 40&apos; HC · 18,400 kg · 0 Discrepancies</span>
          </div>
        )}
      </div>

      {/* Bottom CargoWise Job Card (Spotlighted on Step 03) */}
      <div
        className={`rounded-xl border p-3.5 transition-all duration-300 ${
          activeStep === 2
            ? 'border-emerald-400 bg-emerald-50/20 ring-2 ring-emerald-500/25 shadow-sm'
            : 'border-slate-200 bg-white shadow-2xs'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-slate-950 font-mono">
            CargoWise job · S00038421
          </span>
          <div className="flex items-center gap-1.5">
            {activeStep === 2 && (
              <span className="rounded bg-teal-50 border border-teal-200 px-1.5 py-0.5 text-[8px] font-mono font-bold text-teal-800">
                eAdaptor XML Payload Ready
              </span>
            )}
            <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[8.5px] font-bold uppercase text-emerald-800 font-mono">
              Job created
            </span>
          </div>
        </div>

        <div className="mt-2.5 grid grid-cols-2 gap-3 text-[9.5px] text-slate-500">
          <div>
            <span className="block text-slate-400 font-mono text-[8.5px] uppercase">Origin → destination</span>
            <b className="text-slate-900 font-mono">INMAA → SGSIN</b>
          </div>
          <div>
            <span className="block text-slate-400 font-mono text-[8.5px] uppercase">Shipment</span>
            <b className="text-slate-900 font-mono">1 x 40&apos; HC · Sea export</b>
          </div>
        </div>

        <div className="mt-2.5 border-t border-slate-100 pt-2 text-[9.5px] font-bold text-emerald-700 font-mono flex items-center justify-between">
          <span className="flex items-center">
            <Check size={12} className="mr-1 inline shrink-0" />
            3 documents cross-checked · ready for review
          </span>
        </div>

        {activeStep === 2 && (
          <div className="mt-2 border-t border-emerald-200/60 pt-1.5 text-[8.5px] font-mono font-semibold text-emerald-800 flex items-center gap-1">
            <ShieldCheck size={10} className="text-emerald-600 shrink-0" />
            Customs HS & Freight Payables Aligned · Ready for CargoWise eAdaptor posting
          </div>
        )}
      </div>

      <p className="text-center text-[9px] font-semibold text-teal-800">
        Illustrative workflow · from email to structured shipment
      </p>
    </div>
  );
};
