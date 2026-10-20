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
            className="group rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-sm p-7 sm:p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-4px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.9)] hover:border-blue-300/80 hover:shadow-[0_12px_32px_-8px_rgba(37,99,235,0.12)] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-brand-blue flex flex-col justify-between"
          >
            <div>
              {/* Enterprise Architecture Visual Header */}
              <div className="mb-6 rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 space-y-2.5">
                <div className="flex items-center justify-between text-[9px] font-mono">
                  <span className="font-bold text-slate-400 uppercase tracking-wider">Enterprise Architecture</span>
                  <span className="inline-flex items-center gap-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold px-2 py-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Zero Screen-Scrapers · 100% Native Schema
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 rounded-lg border border-slate-200/90 bg-white p-2.5 shadow-2xs font-mono text-[9.5px]">
                  <div className="rounded bg-blue-50 border border-blue-200 px-2 py-0.5 font-bold text-brand-blue flex items-center gap-1 shrink-0">
                    <span className="brand-mark h-3.5 w-3.5 rounded text-[7px]">D</span>
                    Docsynecx Engine
                  </div>
                  <div className="flex items-center gap-1 text-[8px] font-semibold text-slate-500 shrink-0">
                    <span className="h-px w-2 sm:w-3 bg-slate-300" />
                    <span>Native XML / eAdaptor API</span>
                    <span className="h-px w-2 sm:w-3 bg-slate-300" />
                  </div>
                  <div className="flex items-center gap-1 text-[9px] font-bold text-slate-800 shrink-0">
                    <span className="rounded bg-slate-100 px-1.5 py-0.5">TallyPrime</span>
                    <span className="text-slate-300">|</span>
                    <span className="rounded bg-slate-100 px-1.5 py-0.5">Zoho Books</span>
                    <span className="text-slate-300">|</span>
                    <span className="rounded bg-slate-100 px-1.5 py-0.5">CargoWise One</span>
                  </div>
                </div>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy text-white shadow-sm mb-5 transition-all duration-300 group-hover:scale-105 group-hover:bg-brand-blue">
                <Database size={22} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-950 mb-3">
                Built natively for Tally and CargoWise
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Docsynecx integrates directly into your existing Tally Prime and CargoWise environments via native XML and eAdaptor connections. No screen scrapers, no brittle browser plugins, and zero disruption to how your desks operate.
              </p>
            </div>
          </SpotlightCard>

          {/* Card 2 */}
          <SpotlightCard
            tabIndex={0}
            className="group rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-sm p-7 sm:p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-4px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.9)] hover:border-blue-300/80 hover:shadow-[0_12px_32px_-8px_rgba(37,99,235,0.12)] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-brand-blue flex flex-col justify-between"
          >
            <div>
              {/* Domain Schema Token Grid Visual Header */}
              <div className="mb-6 rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 space-y-2.5">
                <div className="flex items-center justify-between text-[9px] font-mono">
                  <span className="font-bold text-slate-400 uppercase tracking-wider">Pre-Trained Domain Entities</span>
                  <span className="text-brand-blue font-bold font-mono text-[9px]">Zero-Shot Parsing</span>
                </div>
                <div className="flex flex-wrap gap-1.5 font-mono text-[9.5px]">
                  <span className="rounded-md border border-blue-200/90 bg-white px-2 py-0.5 text-slate-800 font-semibold shadow-2xs">
                    [ GSTIN & 2A/2B Rules ]
                  </span>
                  <span className="rounded-md border border-emerald-200/90 bg-white px-2 py-0.5 text-slate-800 font-semibold shadow-2xs">
                    [ HSN / SAC Codes ]
                  </span>
                  <span className="rounded-md border border-teal-200/90 bg-white px-2 py-0.5 text-slate-800 font-semibold shadow-2xs">
                    [ Multi-Container BL ]
                  </span>
                  <span className="rounded-md border border-blue-200/90 bg-white px-2 py-0.5 text-slate-800 font-semibold shadow-2xs">
                    [ 3-Way PO Matching ]
                  </span>
                  <span className="rounded-md border border-amber-200/90 bg-white px-2 py-0.5 text-slate-800 font-semibold shadow-2xs">
                    [ Freight Payables ]
                  </span>
                </div>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy text-white shadow-sm mb-5 transition-all duration-300 group-hover:scale-105 group-hover:bg-brand-blue">
                <Brain size={22} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-950 mb-3">
                Trained on trade and accounting schemas
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Our AI understands commercial invoice structures, GST portal rules, HSN codes, multi-container BL weight matching, and freight payables. It identifies line items and exceptions right out of the box with zero template training.
              </p>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};
