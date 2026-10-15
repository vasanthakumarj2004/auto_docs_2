import React from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { FinanceDeskVisual } from './FinanceDeskVisual';

export const Hero: React.FC = () => {
  return (
    <section className="hero-section border-b border-slate-200/80 pt-12 pb-16 lg:py-20">
      <div className="site-shell grid items-center gap-12 lg:grid-cols-12">
        {/* Left Column: Tag, Headline, Subtext, Buttons from image */}
        <div className="lg:col-span-6">
          <div className="eyebrow mb-6">
            For businesses that run on Tally, an ERP, or CargoWise
          </div>

          <h1 className="max-w-[650px] text-4xl font-extrabold leading-[1.08] tracking-[-0.055em] text-slate-950 sm:text-6xl">
            Grow the business,
            <br />
            not the data-entry desk.
          </h1>

          <p className="mt-6 max-w-xl text-[15px] leading-7 text-slate-600">
            Bills read, checked, paid and posted to Tally. Emails become CargoWise jobs. Your team handles exceptions, not typing.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#finance" className="button-primary">
              Run a finance desk
            </a>
            <a href="#logistics" className="button-teal">
              Run the logistics desk
            </a>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-6 text-[12px] font-semibold text-slate-500">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Built around your approvals
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              No rip-and-replace
            </span>
          </div>
        </div>

        {/* Right Column: Flow Card & Labeled Video Slot */}
        <div className="lg:col-span-6 space-y-6">
          {/* Flow Card: Incoming bill -> Reading / GST-check / Matching -> Posted to Tally */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-[11px] font-extrabold text-slate-900 flex items-center gap-2">
                <span className="brand-mark h-4 w-4 rounded text-[8px]">D</span>
                Automated Processing Flow
              </span>
              <span className="rounded bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700 border border-emerald-100">
                Live Pipeline
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2.5 items-center text-center">
              {/* Node 1 */}
              <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-3">
                <span className="text-[9px] font-bold uppercase text-slate-400 block">Step 01</span>
                <span className="text-xs font-bold text-slate-800 mt-1 block">Incoming bill</span>
                <span className="text-[9px] text-slate-500 block mt-0.5">Email / PDF / Scan</span>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex justify-center text-brand-blue">
                <ArrowRight size={16} />
              </div>

              {/* Node 2 */}
              <div className="rounded-lg border border-blue-200 bg-brand-lavender/50 p-3">
                <span className="text-[9px] font-bold uppercase text-brand-blue block">Step 02</span>
                <span className="text-xs font-bold text-slate-900 mt-1 block">Reading / GST-check / Matching</span>
                <span className="text-[9px] text-brand-blue font-semibold block mt-0.5">Zero manual keying</span>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex justify-center text-emerald-600">
                <ArrowRight size={16} />
              </div>

              {/* Node 3 */}
              <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-3">
                <span className="text-[9px] font-bold uppercase text-emerald-700 block">Step 03</span>
                <span className="text-xs font-bold text-slate-900 mt-1 block">Posted to Tally</span>
                <span className="text-[9px] text-emerald-700 font-semibold block mt-0.5">Voucher auto-created</span>
              </div>
            </div>
          </div>

          {/* Interactive Live Finance Desk Preview from image */}
          <FinanceDeskVisual />

          {/* Labeled Video Slot (16:9) */}
          <div className="relative aspect-video w-full rounded-xl border border-dashed border-slate-300 bg-slate-950/95 overflow-hidden flex flex-col items-center justify-center p-6 text-center text-white shadow-md group cursor-pointer">
            <div className="absolute inset-0 bg-radial from-brand-blue/20 to-transparent pointer-events-none" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue text-white shadow-lg transition-transform group-hover:scale-110">
              <Play size={22} className="ml-1 fill-white" />
            </div>
            <div className="relative mt-4">
              <span className="text-xs font-bold tracking-wide uppercase text-blue-300 block">
                [ Video Slot: Product Walkthrough (2 min) ]
              </span>
              <p className="mt-1 text-xs text-slate-300 max-w-sm">
                Watch vendor invoices read, validated for GST, and posted to Tally Prime in real time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
