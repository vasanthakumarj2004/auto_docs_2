'use client';
import React, { useState } from 'react';
import { Mail, Search, FileCheck2, Database, CheckCircle2 } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const { ref: sectionRef } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  const steps = [
    {
      step: '01',
      title: 'Document comes in',
      desc: 'Via email, PDF, or customer upload — AutoDocs ingests it automatically.',
      icon: Mail,
      artifact: 'PDF · Scan · Pre-Alert Email',
    },
    {
      step: '02',
      title: 'Details extracted',
      desc: 'AutoDocs extracts line items, party ledgers, GSTIN, and shipment specs.',
      icon: Search,
      artifact: 'Line Items · GSTIN · Container #',
    },
    {
      step: '03',
      title: 'Cross-checked & matched',
      desc: 'Reconciles BL vs Packing List, checks GST portal, and verifies PO matching.',
      icon: FileCheck2,
      artifact: 'GST Portal · 3-Way PO · BL vs PL',
    },
    {
      step: '04',
      title: 'Pushed to system',
      desc: 'Voucher or job is built and pushed directly into Tally or CargoWise.',
      icon: Database,
      artifact: 'Tally XML · CargoWise eAdaptor',
    },
    {
      step: '05',
      title: 'Review exceptions only',
      desc: 'Your team reviews only flagged discrepancies — clean records post automatically.',
      icon: CheckCircle2,
      artifact: 'Exception Queue · Audit Log',
    },
  ];

  return (
    <section ref={sectionRef} id="how-it-works" className="border-b border-slate-200/80 bg-white py-16 sm:py-24 scroll-mt-16">
      <div className="site-shell">
        <div className="mx-auto max-w-3xl text-center">
          <div className="eyebrow mb-4">
            End-To-End Automation
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-4xl">
            How it works
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 max-w-xl mx-auto">
            From incoming bill or pre-alert email to verified system ledger — fully automated, fully auditable.
          </p>
        </div>

        {/* Desktop 5-Step Stepper with Continuous SVG Pipeline Track */}
        <div className="relative mt-16 hidden md:grid md:grid-cols-5 gap-5">
          {/* Continuous Horizontal SVG Pipeline Track with Animated Glowing Data Packet */}
          <div className="absolute top-[48px] left-[8%] right-[8%] h-[12px] overflow-visible z-0 pointer-events-none">
            <svg width="100%" height="12" viewBox="0 0 1000 12" preserveAspectRatio="none" className="overflow-visible" aria-hidden="true">
              <line x1="0" y1="6" x2="1000" y2="6" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="0" y1="6" x2="1000" y2="6" stroke="#8B32F7" strokeWidth="2" strokeOpacity="0.35" />
              <circle r="4.5" fill="#8B32F7">
                <animateMotion path="M 0,6 L 1000,6" dur="4.5s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

          {steps.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeStep === index;
            return (
              <div
                key={item.step}
                onMouseEnter={() => setActiveStep(index)}
                onFocus={() => setActiveStep(index)}
                onClick={() => setActiveStep(index)}
                tabIndex={0}
                className="relative z-10 flex flex-col items-center text-center cursor-pointer group outline-none"
              >
                {/* Step Icon Capsule */}
                <div
                  className={`flex h-24 w-24 flex-col items-center justify-center rounded-2xl bg-brand-ink text-white shadow-md mb-4 border transition-all duration-300 ${
                    isActive
                      ? 'border-brand-violet -translate-y-2 shadow-[0_16px_32px_-8px_rgba(139,50,247,0.35)] ring-2 ring-brand-violet/40 bg-gradient-to-b from-[#231134] to-[#1e293b]'
                      : 'border-slate-800 hover:-translate-y-1 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] font-extrabold tracking-wider text-brand-violet mb-1 font-mono">
                    STEP {item.step}
                  </span>
                  <Icon size={24} className={`transition-colors duration-200 ${isActive ? 'text-white' : 'text-slate-300'}`} />
                </div>

                <h3 className={`text-sm font-bold mb-1.5 transition-colors duration-200 ${isActive ? 'text-brand-violet font-extrabold' : 'text-slate-950'}`}>
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-500 max-w-[200px]">{item.desc}</p>

                {/* Monospace System Artifact Pill */}
                <div
                  className={`mt-3.5 inline-flex items-center rounded-md px-2 py-1 font-mono text-[9px] tracking-tight transition-all duration-200 ${
                    isActive
                      ? 'border border-violet-200 bg-violet-50/90 text-brand-violet font-bold shadow-2xs'
                      : 'border border-slate-200/80 bg-slate-50/70 text-slate-500 font-medium'
                  }`}
                >
                  {item.artifact}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Vertical Stepper */}
        <div className="mt-12 space-y-4 md:hidden">
          {steps.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeStep === index;
            return (
              <div
                key={item.step}
                onClick={() => setActiveStep(index)}
                className={`flex flex-col gap-2 p-4 rounded-xl border transition-all duration-200 ${
                  isActive
                    ? 'border-brand-violet bg-violet-50/40 shadow-xs ring-1 ring-brand-violet/30'
                    : 'border-slate-200/80 bg-slate-50/60'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-ink text-white shadow-sm">
                    <span className="text-[9px] font-extrabold text-brand-violet font-mono">{item.step}</span>
                    <Icon size={16} className="text-white mt-0.5" />
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold mb-0.5 ${isActive ? 'text-brand-violet' : 'text-slate-950'}`}>
                      {item.title}
                    </h3>
                    <p className="text-xs leading-5 text-slate-600">{item.desc}</p>
                  </div>
                </div>

                {/* Mobile Artifact Pill */}
                <div className="mt-1 self-start font-mono text-[9px] rounded-md px-2 py-0.5 border border-slate-200 bg-white text-slate-600 font-medium">
                  {item.artifact}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
