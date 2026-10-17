import React from 'react';
import { Receipt, Check, ArrowRight } from 'lucide-react';

export const BillReviewVisual: React.FC = () => {
  return (
    <div className="feature-card">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800">
          <span className="brand-mark h-4 w-4 rounded">
            <Receipt size={10} />
          </span>
          Bill review
        </div>
        <span className="rounded border border-emerald-200 bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-700">
          Ready to post
        </span>
      </div>

      <div className="grid gap-4 py-4 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Tax invoice</span>
          <p className="mt-2 text-[11px] font-bold text-slate-800">Prime Components</p>
          <p className="mt-1 text-[9px] text-slate-500">INV-0018 · 16 Oct 2024</p>
          <div className="mt-4 flex justify-between border-t border-slate-200 pt-2 text-[9px] text-slate-600">
            <span>Maintenance parts</span>
            <span>₹16,606</span>
          </div>
          <div className="mt-2 flex justify-between text-[11px] font-extrabold text-slate-950">
            <span>Total</span>
            <span>₹19,595</span>
          </div>
        </div>

        <div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Checked before it moves</span>
          <div className="mt-3 space-y-2 text-[10px] text-slate-700">
            <p>
              <Check size={12} className="mr-1 inline text-emerald-500" />
              GST & line items totals verified
            </p>
            <p>
              <Check size={12} className="mr-1 inline text-emerald-500" />
              No duplicate bill found
            </p>
            <p>
              <Check size={12} className="mr-1 inline text-emerald-500" />
              Approval recorded
            </p>
          </div>
          <div className="mt-4 flex items-center justify-center gap-1 rounded border border-blue-100 bg-blue-50 py-2 text-[9px] font-bold text-blue-700">
            <ArrowRight size={12} />
            Posted to Tally: voucher 4101
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-3 text-center text-[9px] text-slate-400">
        Illustrative workflow · your approvals rules, your books
      </div>
    </div>
  );
};
