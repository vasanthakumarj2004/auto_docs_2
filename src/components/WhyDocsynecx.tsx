import React from 'react';
import { Database, Brain } from 'lucide-react';

export const WhyDocsynecx: React.FC = () => {
  return (
    <section id="why-docsynecx" className="border-b border-slate-200/80 bg-white py-16 sm:py-24">
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
          <div className="rounded-xl border border-slate-200 bg-[#f8f9fc] p-8 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy text-white shadow-sm mb-6">
              <Database size={22} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-950 mb-3">
              Built natively for Tally and CargoWise
            </h3>
            <p className="text-sm leading-relaxed text-slate-600">
              Docsynecx integrates directly into your existing Tally Prime and CargoWise environments via native XML and eAdaptor connections. No screen scrapers, no brittle browser plugins, and zero disruption to how your desks operate.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl border border-slate-200 bg-[#f8f9fc] p-8 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy text-white shadow-sm mb-6">
              <Brain size={22} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-950 mb-3">
              Trained on trade and accounting schemas
            </h3>
            <p className="text-sm leading-relaxed text-slate-600">
              Our AI understands commercial invoice structures, GST portal rules, HSN codes, multi-container BL weight matching, and freight payables. It identifies line items and exceptions right out of the box with zero template training.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
