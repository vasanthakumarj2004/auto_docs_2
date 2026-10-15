import React from 'react';
import { Mail, Search, FileCheck2, Database, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
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
    <section id="how-it-works" className="border-b border-slate-200/80 bg-white py-16 sm:py-24 scroll-mt-16">
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
          {/* Horizontal Connecting Line */}
          <div className="absolute top-[48px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-brand-blue/30 via-brand-teal/40 to-emerald-500/30 z-0" />

          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="relative z-10 flex flex-col items-center text-center">
                <div className="flex h-24 w-24 flex-col items-center justify-center rounded-2xl bg-brand-navy text-white shadow-md mb-4 border border-slate-800 transition-transform hover:-translate-y-1">
                  <span className="text-[10px] font-extrabold tracking-wider text-brand-orange mb-1 font-mono">
                    STEP {item.step}
                  </span>
                  <Icon size={26} className="text-white" />
                </div>
                <h3 className="text-sm font-bold text-slate-950 mb-1.5">{item.title}</h3>
                <p className="text-xs leading-relaxed text-slate-500 max-w-[190px]">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Mobile Vertical Stepper */}
        <div className="mt-12 space-y-6 md:hidden">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-navy text-white shadow-sm">
                  <span className="text-[9px] font-extrabold text-brand-orange font-mono">{item.step}</span>
                  <Icon size={18} className="text-white mt-0.5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-950 mb-1">{item.title}</h3>
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
