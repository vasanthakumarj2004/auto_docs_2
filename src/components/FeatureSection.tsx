'use client';
import React, { useState, ReactNode } from 'react';
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
    'AutoDocs · Read & GST-check',
    'AutoDocs · Approve & post to Tally',
    'AutoDocs · Duplicate protection',
  ],
  logistics: [
    'AutoDocs · Booking intake',
    'AutoDocs · Document cross-check',
    'AutoDocs · CargoWise & AP sync',
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
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  return (
    <section
      id={id}
      className="relative border-b border-slate-200/80 bg-white scroll-mt-16 py-16 sm:py-24"
    >
      <div className="w-full">
        <div className="site-shell grid items-center gap-10 lg:gap-14 lg:grid-cols-12 w-full">
          {/* Column 1: Copy & Static Steps (Permanently Visible) */}
          <div className={`lg:col-span-6 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
            <span
              className={`section-label font-mono text-[11px] font-bold uppercase tracking-wider ${
                reverse ? 'text-brand-violet' : 'text-brand-violet'
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
                    className={`cursor-pointer outline-none select-none rounded-2xl border p-5 shadow-xs ${
                      isActive
                        ? reverse
                          ? 'border-violet-300/90 bg-violet-50/40 ring-1 ring-violet-500/20'
                          : 'border-violet-300/90 bg-violet-50/40 ring-1 ring-violet-500/20'
                        : 'border-slate-200/80 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div
                          className={`font-mono text-[11px] font-bold uppercase tracking-wider ${
                            isActive
                              ? reverse
                                ? 'text-violet-700'
                                : 'text-violet-700'
                              : 'text-slate-500'
                          }`}
                        >
                          {eyebrow}
                        </div>
                        <h3
                          className={`mt-1 font-bold ${
                            isActive
                              ? 'text-lg text-slate-950 font-extrabold'
                              : 'text-base text-slate-800 font-semibold'
                          }`}
                        >
                          {stepTitle}
                        </h3>
                      </div>

                      <div className="shrink-0 pt-0.5">
                        <span
                          className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold font-mono ${
                            isActive
                              ? reverse
                                ? 'bg-violet-600 text-white shadow-xs'
                                : 'bg-[#8B32F7] text-white shadow-xs'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {num}
                        </span>
                      </div>
                    </div>

                    {/* Permanently Visible Step Content (No Collapsing Accordion) */}
                    <div className="mt-2.5">
                      <p className="text-xs leading-5 text-slate-600">{stepDesc}</p>

                      {/* Checkmark pills */}
                      {badges.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {badges.map((badge, bIdx) => (
                            <span
                              key={bIdx}
                              className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10.5px] font-medium font-mono ${
                                reverse
                                  ? 'bg-violet-100/70 text-violet-900 border border-violet-300/70'
                                  : 'bg-violet-100/70 text-violet-900 border border-violet-300/70'
                              }`}
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Persistent Window Stage (Right-Side Product Mockup - UNTOUCHED) */}
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
                      <span className="h-2.5 w-2.5 rounded-full bg-violet-400" />
                    </div>
                    <span className="ml-2 font-mono text-[11px] font-medium text-slate-500">
                      {visualType && breadcrumbsMap[visualType]
                        ? breadcrumbsMap[visualType][activeStep] || 'AutoDocs'
                        : 'AutoDocs Telemetry'}
                    </span>
                  </div>

                  {/* Right Status Pill */}
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold font-mono ${
                      reverse
                        ? 'border-violet-200 bg-violet-50 text-violet-700'
                        : 'border-violet-200 bg-violet-50 text-violet-700'
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${reverse ? 'bg-violet-500' : 'bg-violet-500'} animate-pulse`} />
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
