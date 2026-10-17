'use client';
import React from 'react';
import { Database, Brain } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const WhyDocsynecx: React.FC = () => {
  const { ref: sectionRef } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={sectionRef} id="why-docsynecx" className="border-b border-slate-200/80 bg-white py-16 sm:py-24">
      <div className="site-shell">
        <div className="mx-auto max-w-3xl text-center">
          <div className="eyebrow mb-4">
            Domain Precision
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-4xl">
            Why finance and logistics teams choose Docsynecx
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 max-w-xl mx-auto">
            Purpose-built for international trade documents and Indian accounting workflows, not generic OCR templates.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {/* Card 1 */}
          <SpotlightCard
            tabIndex={0}
            className="group rounded-xl border border-slate-200/90 bg-[#f8f9fc] p-8 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_32px_-8px_rgba(11,19,48,0.1),0_4px_12px_-2px_rgba(11,19,48,0.04)] hover:border-brand-blue/30 hover:bg-white focus-visible:outline-2 focus-visible:outline-brand-blue"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy text-white shadow-sm mb-6 transition-all duration-300 group-hover:scale-105 group-hover:bg-brand-blue">
              <Database size={22} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-950 mb-3">
              Built natively for Tally and CargoWise
            </h3>
            <p className="text-sm leading-relaxed text-slate-600">
              Docsynecx integrates directly into your existing Tally Prime and CargoWise environments via native XML and eAdaptor connections. No screen scrapers, no brittle browser plugins, and zero disruption to how your desks operate.
            </p>
          </SpotlightCard>

          {/* Card 2 */}
          <SpotlightCard
            tabIndex={0}
            className="group rounded-xl border border-slate-200/90 bg-[#f8f9fc] p-8 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_32px_-8px_rgba(11,19,48,0.1),0_4px_12px_-2px_rgba(11,19,48,0.04)] hover:border-brand-blue/30 hover:bg-white focus-visible:outline-2 focus-visible:outline-brand-blue"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy text-white shadow-sm mb-6 transition-all duration-300 group-hover:scale-105 group-hover:bg-brand-blue">
              <Brain size={22} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-950 mb-3">
              Trained on trade and accounting schemas
            </h3>
            <p className="text-sm leading-relaxed text-slate-600">
              Our AI understands commercial invoice structures, GST portal rules, HSN codes, multi-container BL weight matching, and freight payables. It identifies line items and exceptions right out of the box with zero template training.
            </p>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};
