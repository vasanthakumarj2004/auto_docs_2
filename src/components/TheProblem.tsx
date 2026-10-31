'use client';
import React from 'react';
import { Clock, AlertTriangle, EyeOff } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const TheProblem: React.FC = () => {
  const { ref: sectionRef } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={sectionRef} id="problem" className="relative border-b border-white/10 bg-[#21142e] text-[#fafafa] py-16 sm:py-24 overflow-hidden">
      {/* Subtle ambient gradient lighting */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,50,247,0.18),transparent_70%)] opacity-80"
        aria-hidden="true"
      />

      <div className="site-shell relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/20 text-[#cfa8ff] font-mono text-[11px] font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
            The Operational Reality
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-[-0.04em] text-white sm:text-4xl">
            The data-entry desk bottleneck
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#bcb2c6] max-w-xl mx-auto">
            Manual data entry between vendor PDFs, emails, Tally, and CargoWise is slow, error-prone, and invisible to management.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <SpotlightCard
            dark
            tabIndex={0}
            className="rounded-2xl border border-white/10 bg-[#281838]/90 backdrop-blur-md p-7 shadow-[0_16px_36px_-12px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:border-violet-400/40 hover:shadow-[0_20px_48px_-12px_rgba(139,50,247,0.25)] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-brand-violet flex flex-col justify-between"
          >
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400 border border-orange-500/25 mb-5 shadow-2xs">
                <Clock size={22} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Hours of manual retyping</h3>
              <p className="text-xs leading-relaxed text-[#bcb2c6]">
                Operations and finance staff spend 30–60 minutes per batch re-keying line items, vendor details, and container specs by hand.
              </p>
            </div>

            {/* Diagnostic Telemetry Footer Box: Latency Comparison */}
            <div className="mt-6 pt-4 border-t border-white/10 bg-black/30 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between text-[10.5px] font-mono">
                <span className="text-slate-400 font-medium">Manual Batch</span>
                <span className="font-bold text-amber-400">35m 00s</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full w-full" />
              </div>
              <div className="flex items-center justify-between text-[10.5px] font-mono pt-1">
                <span className="text-slate-200 font-bold flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
                  AutoDocs AI
                </span>
                <span className="font-bold text-violet-300">4.2s</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-violet-400 rounded-full w-[4%]" />
              </div>
            </div>
          </SpotlightCard>

          {/* Card 2 */}
          <SpotlightCard
            dark
            tabIndex={0}
            className="rounded-2xl border border-white/10 bg-[#281838]/90 backdrop-blur-md p-7 shadow-[0_16px_36px_-12px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:border-violet-400/40 hover:shadow-[0_20px_48px_-12px_rgba(139,50,247,0.25)] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-brand-violet flex flex-col justify-between"
          >
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/25 mb-5 shadow-2xs">
                <AlertTriangle size={22} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Inconsistent & error-prone keying</h3>
              <p className="text-xs leading-relaxed text-[#bcb2c6]">
                Manual typos lead to GST mismatches, rejected ledger postings, and discrepancies across Bills of Lading and commercial invoices.
              </p>
            </div>

            {/* Diagnostic Telemetry Footer Box: Common Exceptions */}
            <div className="mt-6 pt-4 border-t border-white/10 bg-black/30 rounded-xl p-3.5">
              <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-2 font-bold">
                Automated Exception Traps
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="font-mono text-[9px] rounded-md bg-rose-950/60 border border-rose-500/30 text-rose-300 px-2 py-0.5 font-semibold">
                  [ ! GSTIN Checksum Error ]
                </span>
                <span className="font-mono text-[9px] rounded-md bg-amber-950/60 border border-amber-500/30 text-amber-300 px-2 py-0.5 font-semibold">
                  [ ! HSN Tax Rate Mismatch ]
                </span>
                <span className="font-mono text-[9px] rounded-md bg-rose-950/60 border border-rose-500/30 text-rose-300 px-2 py-0.5 font-semibold">
                  [ ! BL Gross Weight Delta ]
                </span>
              </div>
            </div>
          </SpotlightCard>

          {/* Card 3 */}
          <SpotlightCard
            dark
            tabIndex={0}
            className="rounded-2xl border border-white/10 bg-[#281838]/90 backdrop-blur-md p-7 shadow-[0_16px_36px_-12px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:border-violet-400/40 hover:shadow-[0_20px_48px_-12px_rgba(139,50,247,0.25)] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-brand-violet flex flex-col justify-between"
          >
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300 border border-violet-500/25 mb-5 shadow-2xs">
                <EyeOff size={22} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Blind spots in approval chains</h3>
              <p className="text-xs leading-relaxed text-[#bcb2c6]">
                Invoices sit in physical inboxes or WhatsApp chats with zero audit trail, leading to missed vendor discounts and delayed shipment releases.
              </p>
            </div>

            {/* Diagnostic Telemetry Footer Box: Audit Trail Status */}
            <div className="mt-6 pt-4 border-t border-white/10 bg-black/30 rounded-xl p-3.5 space-y-1.5">
              <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-1.5 font-bold">
                Cryptographic Audit Trail
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-400">Hash Verification</span>
                <span className="text-violet-300 font-bold">SHA-256 Validated</span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-400">Audit Trail Lock</span>
                <span className="text-violet-300 font-bold">Immutable Ledger</span>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};
