'use client';
import React from 'react';
import { Clock, AlertTriangle, EyeOff } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const TheProblem: React.FC = () => {
  const { ref: sectionRef } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={sectionRef} id="problem" className="border-b border-slate-200/80 bg-[#f8f9fc] py-16 sm:py-24">
      <div className="site-shell">
        <div className="mx-auto max-w-3xl text-center">
          <div className="eyebrow mb-4">
            The Operational Reality
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-4xl">
            The data-entry desk bottleneck
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 max-w-xl mx-auto">
            Manual data entry between vendor PDFs, emails, Tally, and CargoWise is slow, error-prone, and invisible to management.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <SpotlightCard
            tabIndex={0}
            className="rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-sm p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-4px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.9)] hover:border-blue-300/80 hover:shadow-[0_12px_32px_-8px_rgba(37,99,235,0.12)] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-brand-blue flex flex-col justify-between"
          >
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-brand-orange border border-orange-100 mb-5 shadow-2xs">
                <Clock size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-950 mb-2">Hours of manual retyping</h3>
              <p className="text-xs leading-relaxed text-slate-600">
                Operations and finance staff spend 30–60 minutes per batch re-keying line items, vendor details, and container specs by hand.
              </p>
            </div>

            {/* Diagnostic Telemetry Footer Box: Latency Comparison */}
            <div className="mt-6 pt-4 border-t border-slate-100 bg-slate-50/70 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between text-[10.5px] font-mono">
                <span className="text-slate-500 font-medium">Manual Batch</span>
                <span className="font-bold text-amber-600">35m 00s</span>
              </div>
              <div className="h-1.5 w-full bg-slate-200/90 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full w-full" />
              </div>
              <div className="flex items-center justify-between text-[10.5px] font-mono pt-1">
                <span className="text-slate-800 font-bold flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Docsynecx AI
                </span>
                <span className="font-bold text-emerald-700">4.2s</span>
              </div>
              <div className="h-1.5 w-full bg-slate-200/90 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[4%]" />
              </div>
            </div>
          </SpotlightCard>

          {/* Card 2 */}
          <SpotlightCard
            tabIndex={0}
            className="rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-sm p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-4px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.9)] hover:border-blue-300/80 hover:shadow-[0_12px_32px_-8px_rgba(37,99,235,0.12)] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-brand-blue flex flex-col justify-between"
          >
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600 border border-rose-100 mb-5 shadow-2xs">
                <AlertTriangle size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-950 mb-2">Inconsistent & error-prone keying</h3>
              <p className="text-xs leading-relaxed text-slate-600">
                Manual typos lead to GST mismatches, rejected ledger postings, and discrepancies across Bills of Lading and commercial invoices.
              </p>
            </div>

            {/* Diagnostic Telemetry Footer Box: Common Exceptions */}
            <div className="mt-6 pt-4 border-t border-slate-100 bg-slate-50/70 rounded-xl p-3.5">
              <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-2 font-bold">
                Automated Exception Traps
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="font-mono text-[9px] rounded-md bg-rose-50 border border-rose-200/80 text-rose-700 px-2 py-0.5 font-semibold">
                  [ ! GSTIN Checksum Error ]
                </span>
                <span className="font-mono text-[9px] rounded-md bg-amber-50 border border-amber-200/80 text-amber-700 px-2 py-0.5 font-semibold">
                  [ ! HSN Tax Rate Mismatch ]
                </span>
                <span className="font-mono text-[9px] rounded-md bg-rose-50 border border-rose-200/80 text-rose-700 px-2 py-0.5 font-semibold">
                  [ ! BL Gross Weight Delta ]
                </span>
              </div>
            </div>
          </SpotlightCard>

          {/* Card 3 */}
          <SpotlightCard
            tabIndex={0}
            className="rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-sm p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-4px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.9)] hover:border-blue-300/80 hover:shadow-[0_12px_32px_-8px_rgba(37,99,235,0.12)] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-brand-blue flex flex-col justify-between"
          >
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-brand-navy border border-slate-200 mb-5 shadow-2xs">
                <EyeOff size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-950 mb-2">Zero operational visibility</h3>
              <p className="text-xs leading-relaxed text-slate-600">
                Critical documents live trapped in shared Outlook and Gmail inboxes with no real-time audit trail or automated exception routing.
              </p>
            </div>

            {/* Diagnostic Telemetry Footer Box: Inbox Status */}
            <div className="mt-6 pt-4 border-t border-slate-100 bg-slate-50/70 rounded-xl p-3.5">
              <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-2 font-bold">
                <span>Shared Inbox Bottleneck</span>
                <span className="text-rose-600 font-bold flex items-center gap-1 font-mono">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
                  SLA Risk
                </span>
              </div>
              <div className="flex items-center justify-between gap-1.5 rounded-lg border border-slate-200/90 bg-white px-2.5 py-1.5 font-mono text-[9.5px] text-slate-700 shadow-2xs">
                <span className="truncate text-slate-600 font-medium">shared-ap@company.com</span>
                <span className="text-slate-300">·</span>
                <span className="font-bold text-rose-600 shrink-0">42 Unprocessed PDFs</span>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};
