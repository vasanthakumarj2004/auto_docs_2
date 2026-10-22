'use client';
import React from 'react';
import { Clock, AlertTriangle, EyeOff } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const TheProblem: React.FC = () => {
  const { ref: sectionRef } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={sectionRef} id="problem" className="border-b border-slate-200/80 bg-[#FAFAFA] py-16 sm:py-24">
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
            className="rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-sm p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-4px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.9)] hover:border-violet-300/80 hover:shadow-[0_12px_32px_-8px_rgba(139,50,247,0.12)] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-brand-violet flex flex-col justify-between"
          >
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-brand-violet border border-orange-100 mb-5 shadow-2xs">
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
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" />
                  AutoDocs AI
                </span>
                <span className="font-bold text-violet-700">4.2s</span>
              </div>
              <div className="h-1.5 w-full bg-slate-200/90 rounded-full overflow-hidden">
                <div className="h-full bg-violet-500 rounded-full w-[4%]" />
              </div>
            </div>
          </SpotlightCard>

          {/* Card 2 */}
          <SpotlightCard
            tabIndex={0}
            className="rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-sm p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-4px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.9)] hover:border-violet-300/80 hover:shadow-[0_12px_32px_-8px_rgba(139,50,247,0.12)] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-brand-violet flex flex-col justify-between"
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
            className="rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-sm p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-4px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.9)] hover:border-violet-300/80 hover:shadow-[0_12px_32px_-8px_rgba(139,50,247,0.12)] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-brand-violet flex flex-col justify-between"
          >
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 border border-slate-200 mb-5 shadow-2xs">
                <EyeOff size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-950 mb-2">Blind spots in approval chains</h3>
              <p className="text-xs leading-relaxed text-slate-600">
                Invoices sit in physical inboxes or WhatsApp chats with zero audit trail, leading to missed vendor discounts and delayed shipment releases.
              </p>
            </div>

            {/* Diagnostic Telemetry Footer Box: Audit Trail Status */}
            <div className="mt-6 pt-4 border-t border-slate-100 bg-slate-50/70 rounded-xl p-3.5 space-y-1.5">
              <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-1.5 font-bold">
                Cryptographic Audit Trail
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-600">Hash Verification</span>
                <span className="text-violet-700 font-bold">SHA-256 Validated</span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-600">Audit Trail Lock</span>
                <span className="text-violet-700 font-bold">Immutable Ledger</span>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};
