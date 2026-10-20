'use client';
import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { BillReviewVisual } from './BillReviewVisual';
import { ShipmentVisual } from './ShipmentVisual';

interface FeatureSectionProps {
  id: string;
  label: string;
  title: string;
  copy: string;
  steps: [string, string, string][];
  visual?: ReactNode;
  visualType?: 'finance' | 'logistics';
  reverse?: boolean;
}

const stepEyebrowsMap: Record<string, string[]> = {
  finance: [
    '01 · INVOICE & GST INTELLIGENCE',
    '02 · APPROVAL & TALLY SYNC',
    '03 · DUPLICATE GUARDRAILS',
  ],
  logistics: [
    '01 · INBOX TO STRUCTURED JOB',
    '02 · MULTI-DOCUMENT RECONCILIATION',
    '03 · CUSTOMS & FREIGHT AP ALIGNMENT',
  ],
};

const stepBadgesMap: Record<string, string[][]> = {
  finance: [
    ['✓ GSTIN & HSN/SAC rates verified', '✓ 100% line-item & tax math extraction'],
    ['✓ Multi-level approval recorded', '✓ Direct XML push to Tally voucher #829'],
    ['✓ Cross-checked against historical vendor ledger', '✓ Automatic duplicate hold before payout'],
  ],
  logistics: [
    ['✓ Auto-ingest attachment-heavy booking emails', '✓ Instant shipper, consignee & port mapping'],
    ['✓ Container, seal, weight & package count matched', '✓ Read & cross-checked in 110s'],
    ['✓ HS codes & commercial invoice values verified', '✓ Ready for CargoWise eAdaptor posting'],
  ],
};

const breadcrumbsMap: Record<string, string[]> = {
  finance: [
    'Docsynecx · Read & GST-check',
    'Docsynecx · Approve & post to Tally',
    'Docsynecx · Duplicate protection',
  ],
  logistics: [
    'Docsynecx · Booking intake',
    'Docsynecx · Document cross-check',
    'Docsynecx · CargoWise & AP sync',
  ],
};

export const FeatureSection: React.FC<FeatureSectionProps> = ({
  id,
  label,
  title,
  copy,
  steps,
  visual,
  visualType,
  reverse = false,
}) => {
  const runwayRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (!runwayRef.current) return;
        if (window.innerWidth < 1024) return; // on mobile, manual step click

        const rect = runwayRef.current.getBoundingClientRect();
        const topOffset = 80; // height of fixed header / sticky top offset
        const runwayHeight = rect.height;
        const windowHeight = window.innerHeight;
        const totalScrollable = runwayHeight - windowHeight;

        if (totalScrollable <= 0) return;

        const scrolled = -rect.top + topOffset;
        const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));

        if (progress < 0.33) {
          setActiveStep(0);
        } else if (progress < 0.67) {
          setActiveStep(1);
        } else {
          setActiveStep(2);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    if (typeof window !== 'undefined' && window.innerWidth >= 1024 && runwayRef.current) {
      const rect = runwayRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const runwayTop = rect.top + scrollTop;
      const runwayHeight = rect.height;
      const windowHeight = window.innerHeight;
      const totalScrollable = runwayHeight - windowHeight;

      if (totalScrollable > 0) {
        const targetProgress = index === 0 ? 0.05 : index === 1 ? 0.5 : 0.95;
        const targetScrollY = runwayTop - 80 + totalScrollable * targetProgress;

        window.scrollTo({
          top: Math.max(0, targetScrollY),
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <section
      ref={runwayRef}
      id={id}
      className="relative lg:h-[220vh] border-b border-slate-200/80 bg-white scroll-mt-16"
    >
      <div className="lg:sticky lg:top-20 lg:min-h-[calc(100vh-5rem)] flex items-center py-16 lg:py-8 w-full">
        <div className="site-shell grid items-center gap-10 lg:gap-14 lg:grid-cols-12 w-full">
          {/* Column 1: Copy & Progressive Scroll Accordion */}
          <div className={`lg:col-span-6 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
            <span
              className={`section-label font-mono text-[11px] font-bold uppercase tracking-wider ${
                reverse ? 'text-brand-teal' : 'text-brand-blue'
              }`}
            >
              {label}
            </span>
            <h2 className="mt-2 max-w-xl text-3xl font-extrabold leading-[1.15] tracking-[-0.05em] text-slate-950 sm:text-4xl">
              {title}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">{copy}</p>

            <div className="mt-8 space-y-3" role="list">
              {steps.map(([num, stepTitle, stepDesc], index) => {
                const isActive = activeStep === index;
                const eyebrow =
                  visualType && stepEyebrowsMap[visualType]
                    ? stepEyebrowsMap[visualType][index]
                    : `${num} · STEP`;
                const badges =
                  visualType && stepBadgesMap[visualType]
                    ? stepBadgesMap[visualType][index]
                    : [];

                return (
                  <div
                    key={num}
                    role="listitem"
                    tabIndex={0}
                    onClick={() => handleStepClick(index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleStepClick(index);
                      }
                    }}
                    className={`transition-all duration-300 cursor-pointer outline-none select-none ${
                      isActive
                        ? reverse
                          ? 'my-2 rounded-2xl border border-teal-300/90 bg-teal-50/40 p-5 shadow-sm ring-1 ring-teal-500/20'
                          : 'my-2 rounded-2xl border border-blue-300/90 bg-blue-50/40 p-5 shadow-sm ring-1 ring-blue-500/20'
                        : 'rounded-xl border border-slate-200/70 bg-transparent px-4 py-3.5 hover:border-slate-300 hover:bg-slate-50/70'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div
                          className={`font-mono text-[11px] font-bold uppercase tracking-wider transition-colors ${
                            isActive
                              ? reverse
                                ? 'text-teal-700'
                                : 'text-blue-700'
                              : 'text-slate-400'
                          }`}
                        >
                          {eyebrow}
                        </div>
                        <h3
                          className={`mt-1 font-bold transition-all ${
                            isActive
                              ? 'text-lg text-slate-950 font-extrabold'
                              : 'text-sm text-slate-600 font-semibold'
                          }`}
                        >
                          {stepTitle}
                        </h3>
                      </div>

                      <div className="shrink-0 pt-0.5">
                        <span
                          className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold font-mono transition-all ${
                            isActive
                              ? reverse
                                ? 'bg-teal-600 text-white shadow-xs'
                                : 'bg-blue-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-400'
                          }`}
                        >
                          {num}
                        </span>
                      </div>
                    </div>

                    {/* Collapsible Content with CSS Grid 0-CLS smooth transition */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isActive
                          ? 'grid-rows-[1fr] opacity-100 mt-2.5'
                          : 'grid-rows-[0fr] opacity-0 overflow-hidden'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-xs leading-5 text-slate-600">{stepDesc}</p>

                        {/* Checkmark pills */}
                        {badges.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {badges.map((badge, bIdx) => (
                              <span
                                key={bIdx}
                                className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10.5px] font-medium font-mono ${
                                  reverse
                                    ? 'bg-teal-100/70 text-teal-900 border border-teal-300/70'
                                    : 'bg-blue-100/70 text-blue-900 border border-blue-300/70'
                                }`}
                              >
                                {badge}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Step progress bar line */}
                        <div className="mt-3.5 h-1 w-full rounded-full bg-slate-200/70 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              reverse ? 'bg-teal-600 w-full' : 'bg-blue-600 w-full'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Persistent Window Stage */}
          <div className={`lg:col-span-6 w-full ${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
            {/* Outer Frosted Bezel */}
            <div className="rounded-3xl bg-slate-100/80 p-3 sm:p-4 border border-slate-200/90 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.08)]">
              {/* Inner macOS Window */}
              <div className="rounded-2xl bg-white border border-slate-200/90 shadow-sm overflow-hidden min-h-[440px] flex flex-col justify-between">
                {/* Permanent macOS Window Top Bar */}
                <div className="flex items-center justify-between border-b border-slate-200/80 bg-slate-50/90 px-4 py-3 select-none">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="ml-2 font-mono text-[11px] font-medium text-slate-500">
                      {visualType && breadcrumbsMap[visualType]
                        ? breadcrumbsMap[visualType][activeStep] || 'Docsynecx'
                        : 'Docsynecx Telemetry'}
                    </span>
                  </div>

                  {/* Right Status Pill */}
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold font-mono ${
                      reverse
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                        : 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {visualType === 'finance' ? 'Ready to post' : 'Live'}
                  </span>
                </div>

                {/* Main Interactive Visual Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center">
                  {visualType === 'finance' ? (
                    <BillReviewVisual activeStep={activeStep} />
                  ) : visualType === 'logistics' ? (
                    <ShipmentVisual activeStep={activeStep} />
                  ) : (
                    visual
                  )}
                </div>

                {/* Bottom Status / Domain Caption */}
                <div className="border-t border-slate-100 bg-slate-50/70 px-4 py-2.5 text-center text-[11px] font-medium text-slate-500">
                  {visualType === 'finance'
                    ? 'Same review workflow, your approval rules, zero retyping.'
                    : 'From attachment-heavy email to structured shipment.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
