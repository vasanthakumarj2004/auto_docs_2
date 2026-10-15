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
            className="reveal-init stagger-1 rounded-xl border border-slate-200/90 bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-slate-300 focus-visible:outline-2 focus-visible:outline-brand-blue"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange-50 text-brand-orange border border-orange-100 mb-5">
              <Clock size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-950 mb-2">Hours of manual retyping</h3>
            <p className="text-xs leading-relaxed text-slate-600">
              Operations and finance staff spend 30–60 minutes per batch re-keying line items, vendor details, and container specs by hand.
            </p>
          </SpotlightCard>

          {/* Card 2 */}
          <SpotlightCard
            tabIndex={0}
            className="reveal-init stagger-2 rounded-xl border border-slate-200/90 bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-slate-300 focus-visible:outline-2 focus-visible:outline-brand-blue"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-rose-50 text-rose-600 border border-rose-100 mb-5">
              <AlertTriangle size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-950 mb-2">Inconsistent & error-prone keying</h3>
            <p className="text-xs leading-relaxed text-slate-600">
              Manual typos lead to GST mismatches, rejected ledger postings, and discrepancies across Bills of Lading and commercial invoices.
            </p>
          </SpotlightCard>

          {/* Card 3 */}
          <SpotlightCard
            tabIndex={0}
            className="reveal-init stagger-3 rounded-xl border border-slate-200/90 bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-slate-300 focus-visible:outline-2 focus-visible:outline-brand-blue"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-brand-navy border border-slate-200 mb-5">
              <EyeOff size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-950 mb-2">Zero operational visibility</h3>
            <p className="text-xs leading-relaxed text-slate-600">
              Critical documents live trapped in shared Outlook and Gmail inboxes with no real-time audit trail or automated exception routing.
            </p>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};
