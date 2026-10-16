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
      desc: 'Via email, PDF, or customer upload — Docsynecx ingests it automatically.',
      icon: Mail,
    },
    {
      step: '02',
      title: 'Details extracted',
      desc: 'Docsynecx extracts line items, party ledgers, GSTIN, and shipment specs.',
      icon: Search,
    },
    {
      step: '03',
      title: 'Cross-checked & matched',
      desc: 'Reconciles BL vs Packing List, checks GST portal, and verifies PO matching.',
      icon: FileCheck2,
    },
    {
      step: '04',
      title: 'Pushed to system',
      desc: 'Voucher or job is built and pushed directly into Tally or CargoWise.',
      icon: Database,
    },
    {
      step: '05',
      title: 'Review exceptions only',
      desc: 'Your team reviews only flagged discrepancies — clean records post automatically.',
      icon: CheckCircle2,
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

        {/* Desktop 5-Step Stepper with connecting line */}
        <div className="relative mt-16 hidden md:grid md:grid-cols-5 gap-6">
          {/* Horizontal Connecting Line with Raft-style beam pulse */}
          <div className="absolute top-[48px] left-[10%] right-[10%] h-[2px] overflow-hidden rounded-full bg-slate-200 z-0">
            <div className="h-full w-full bg-gradient-to-r from-brand-blue/35 via-brand-teal/40 to-emerald-500/35" />
            <div className="animate-beam-glow absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-brand-blue to-transparent" />
          </div>

          {steps.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeStep === index;
            return (
              <div
                key={item.step}
                onMouseEnter={() => setActiveStep(index)}
                onFocus={() => setActiveStep(index)}
                tabIndex={0}
                className={`reveal-init stagger-${index + 1} relative z-10 flex flex-col items-center text-center cursor-pointer group outline-none`}
              >
                <div
                  className={`flex h-24 w-24 flex-col items-center justify-center rounded-2xl bg-brand-navy text-white shadow-md mb-4 border transition-all duration-300 ${
                    isActive
                      ? 'border-brand-blue -translate-y-2 shadow-[0_12px_28px_-6px_rgba(47,61,224,0.35)] ring-2 ring-brand-blue/40'
                      : 'border-slate-800 hover:-translate-y-1 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] font-extrabold tracking-wider text-brand-orange mb-1 font-mono">
                    STEP {item.step}
                  </span>
                  <Icon size={26} className={`transition-colors duration-200 ${isActive ? 'text-white' : 'text-slate-200'}`} />
                </div>
                <h3 className={`text-sm font-bold mb-1.5 transition-colors duration-200 ${isActive ? 'text-brand-blue' : 'text-slate-950'}`}>
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-500 max-w-[190px]">{item.desc}</p>
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
                className={`reveal-init stagger-${index + 1} flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 ${
                  isActive
                    ? 'border-brand-blue bg-blue-50/40 shadow-xs'
                    : 'border-slate-200/80 bg-slate-50/60'
                }`}
              >
                <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-navy text-white shadow-sm">
                  <span className="text-[9px] font-extrabold text-brand-orange font-mono">{item.step}</span>
                  <Icon size={18} className="text-white mt-0.5" />
                </div>
                <div>
                  <h3 className={`text-sm font-bold mb-1 ${isActive ? 'text-brand-blue' : 'text-slate-950'}`}>
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-600">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
