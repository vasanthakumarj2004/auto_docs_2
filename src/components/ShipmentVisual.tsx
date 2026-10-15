import React from 'react';
import { Inbox, ArrowDown, Check } from 'lucide-react';

export const ShipmentVisual: React.FC = () => {
  return (
    <div className="feature-card border-emerald-100 bg-emerald-50/40 p-4 sm:p-5">
      <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
        <div className="flex items-center justify-between text-[10px]">
          <span className="flex items-center gap-1.5 font-bold text-slate-800">
            <Inbox size={12} className="text-teal-600" />
            Customer inbox
          </span>
          <span className="text-[9px] text-slate-400">09:41 AM</span>
        </div>
        <p className="mt-3 text-[11px] font-bold text-slate-950">New booking: Chennai → Singapore</p>
        <div className="mt-2 flex flex-wrap gap-1">
          <span className="file-chip">Bill of lading.pdf</span>
          <span className="file-chip">Packing list.pdf</span>
          <span className="file-chip">Invoice.pdf</span>
        </div>
      </div>

      <div className="flex justify-center py-3">
        <span className="flex items-center gap-1 rounded-full bg-teal-700 px-3 py-1 text-[9px] font-bold text-white">
          <ArrowDown size={11} />
          Read + cross-check: UN0128
        </span>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-extrabold text-slate-950">CargoWise job · S0002461</span>
          <span className="rounded bg-emerald-100 px-1.5 py-1 text-[8px] font-bold uppercase text-emerald-800">
            Job created
          </span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 text-[9px] text-slate-500">
          <div>
            <span className="block text-slate-400">Origin → destination</span>
            <b className="text-slate-800">INMAA → SGSIN</b>
          </div>
          <div>
            <span className="block text-slate-400">Shipment</span>
            <b className="text-slate-800">1 x 40' HC · Sea export</b>
          </div>
        </div>
        <div className="mt-3 border-t border-slate-100 pt-2 text-[9px] font-bold text-emerald-700">
          <Check size={12} className="mr-1 inline" />
          3 documents cross-checked · ready for review
        </div>
      </div>

      <p className="pt-2 text-center text-[9px] font-semibold text-teal-800">
        Illustrative workflow · from email to structured shipment
      </p>
    </div>
  );
};
