'use client';
import React, { useEffect, useState, useRef } from 'react';
import { 
  Mail, 
  Search, 
  Check, 
  IndianRupee, 
  Upload, 
  ArrowRight, 
  Plus, 
  Sparkles
} from 'lucide-react';
import { useRouter } from '../lib/router';
import { StickyCtaBar } from '../components/StickyCtaBar';
import { MetricTransition } from '../components/MetricTransition';
import { AnimatedCheckmark } from '../components/AnimatedCheckmark';
import { SharedFaqAccordion, FaqItem } from '../components/SharedFaqAccordion';
import { FlowConnector } from '../components/FlowConnector';

// Config constant for bank partners label as required by spec
export const BANK_PARTNERS_LABEL = 'via your bank';

const faqList: FaqItem[] = [
  {
    question: 'Which banks can I pay vendors through?',
    answer: 'Integration details for approved banking partners will be announced shortly prior to general availability. No proprietary bank portal changes will be required.',
  },
  {
    question: 'Does the payment show up in Tally automatically?',
    answer: 'Yes. Once a vendor payment is authorized, both the purchase bill voucher and the corresponding bank payment voucher are created and reconciled automatically in Tally Prime.',
  },
  {
    question: 'Can the MD approve from his phone?',
    answer: 'Yes. Decision makers can review invoice line items, tax breakdowns, and vendor bank details via secure mobile links with one-tap approval.',
  },
];

export const FinancePage: React.FC = () => {
  const { navigate } = useRouter();
  const journeyRef = useRef<HTMLElement>(null);
  const [activeFlowStep, setActiveFlowStep] = useState<number>(0);

  // Manage SEO Document Title and Meta Description
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Finance Door — Docsynecx | Approve the bill. Pay the vendor. The entry posts itself.';

    const metaDescription = document.querySelector('meta[name="description"]');
    const originalDescription = metaDescription?.getAttribute('content') || '';
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'From vendor bill to paid and posted in Tally — without retyping a line. Built for businesses that run on Tally, not on spreadsheets.'
      );
    }

    window.scrollTo({ top: 0, behavior: 'instant' });

    return () => {
      document.title = originalTitle;
      if (metaDescription) {
        metaDescription.setAttribute('content', originalDescription);
      }
    };
  }, []);

  // Sequence flow row on scroll-in
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActiveFlowStep(5);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Progress through steps 1 -> 5 smoothly
          let current = 1;
          setActiveFlowStep(1);
          const interval = setInterval(() => {
            current += 1;
            setActiveFlowStep(current);
            if (current >= 5) {
              clearInterval(interval);
            }
          }, 450);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (journeyRef.current) {
      observer.observe(journeyRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white text-slate-800">
      {/* =========================================================================
          SECTION 1: HERO (left-aligned, light background, ambient dot matrix)
          ========================================================================= */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-[#fdfdfd] pt-16 pb-20 sm:pt-24 sm:pb-28">
        {/* Subtle Ambient Background Lighting & Dotted Matrix */}
        <div className="pointer-events-none absolute inset-0 bg-dot-matrix opacity-40" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60" aria-hidden="true">
          <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-orange-100/35 via-blue-100/25 to-transparent blur-3xl" />
        </div>

        <div className="site-shell relative z-10">
          <div className="max-w-3xl text-left">
            {/* Small Orange Tag: "NEW · FINANCE DOOR" */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-200/90 bg-orange-50/90 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-orange-700 shadow-2xs font-mono">
              <Sparkles size={11} className="text-orange-600" />
              <span>NEW · FINANCE DOOR</span>
            </div>

            {/* Headline */}
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[54px] font-extrabold leading-[1.08] tracking-[-0.035em] text-slate-950">
              Approve the bill. Pay the vendor.
              <br className="hidden sm:inline" />
              {' '}The entry posts itself.
            </h1>

            {/* Subtext */}
            <p className="mt-6 max-w-2xl text-[15px] sm:text-base leading-relaxed text-slate-600 font-medium">
              From vendor bill to paid and posted in Tally — without retyping a line. Built for businesses that run on Tally, not on spreadsheets.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => navigate('/#demo')}
                className="group button-primary text-sm px-6 py-3 cursor-pointer shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-blue"
              >
                <span>Book a demo</span>
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('accounts-payable');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate('/#demo');
                  }
                }}
                className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-xs sm:text-sm font-bold text-slate-800 transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 hover:-translate-y-0.5 cursor-pointer shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400"
              >
                Already on Invoice? Switch on payments →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: "ONE BILL'S JOURNEY" (cream background band with animated flow)
          ========================================================================= */}
      <section ref={journeyRef} className="border-b border-[#ede8de] bg-[#F8F6F1] py-16 sm:py-24">
        <div className="site-shell">
          {/* Small Uppercase Label */}
          <div className="text-left mb-8 sm:mb-10">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-500">
              ONE BILL'S JOURNEY
            </span>
          </div>

          {/* 5 Step Cards in one row with animated flow connectors (vertical stepper on mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-2 sm:gap-2 lg:gap-3">
            
            {/* 1. Bill arrives */}
            <div className={`flex flex-col items-center justify-center rounded-xl border bg-white p-5 text-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 min-h-[148px] ${
              activeFlowStep >= 1 ? 'border-slate-300 shadow-xs' : 'border-slate-200/90 shadow-2xs opacity-80'
            }`}>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 border border-slate-200/90 text-slate-700 mb-3 shadow-2xs">
                <Mail size={19} />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 leading-tight">Bill arrives</h3>
              <p className="mt-1 text-xs text-slate-500 font-medium">email or upload</p>
            </div>

            {/* Connector 1 */}
            <FlowConnector stepIndex={1} activeStep={activeFlowStep} />

            {/* 2. Read & checked */}
            <div className={`flex flex-col items-center justify-center rounded-xl border bg-white p-5 text-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 min-h-[148px] ${
              activeFlowStep >= 2 ? 'border-slate-300 shadow-xs' : 'border-slate-200/90 shadow-2xs opacity-80'
            }`}>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 border border-slate-200/90 text-slate-700 mb-3 shadow-2xs">
                <Search size={19} />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 leading-tight">Read & checked</h3>
              <p className="mt-1 text-xs text-slate-500 font-medium">GST · duplicate · PO</p>
            </div>

            {/* Connector 2 */}
            <FlowConnector stepIndex={2} activeStep={activeFlowStep} />

            {/* 3. Approved */}
            <div className={`flex flex-col items-center justify-center rounded-xl border bg-white p-5 text-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 min-h-[148px] ${
              activeFlowStep >= 3 ? 'border-slate-300 shadow-xs' : 'border-slate-200/90 shadow-2xs opacity-80'
            }`}>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 border border-slate-200/90 text-slate-700 mb-3 shadow-2xs">
                <Check size={19} />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 leading-tight">Approved</h3>
              <p className="mt-1 text-xs text-slate-500 font-medium">from one screen</p>
            </div>

            {/* Connector 3 */}
            <FlowConnector stepIndex={3} activeStep={activeFlowStep} />

            {/* 4. Vendor paid (HIGHLIGHT in amber/orange: new capability) */}
            <div className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-amber-300/90 bg-gradient-to-b from-[#fef7ee] to-[#fdeddb] p-5 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 min-h-[148px] ${
              activeFlowStep >= 4 ? 'pulse-step-amber' : 'opacity-85 shadow-xs'
            }`}>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-amber-200 text-amber-700 mb-3 shadow-xs">
                <IndianRupee size={19} />
              </div>
              <h3 className="text-sm font-extrabold text-amber-950 leading-tight">Vendor paid</h3>
              <p className="mt-1 text-xs text-amber-800/90 font-medium">
                {BANK_PARTNERS_LABEL}
              </p>
            </div>

            {/* Connector 4 */}
            <FlowConnector stepIndex={4} activeStep={activeFlowStep} />

            {/* 5. Posted to Tally (HIGHLIGHT in blue/lavender: where Tally gets updated) */}
            <div className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-blue-200 bg-gradient-to-b from-[#f0f2fe] to-[#e4e7fd] p-5 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 min-h-[148px] ${
              activeFlowStep >= 5 ? 'pulse-step-blue' : 'opacity-85 shadow-xs'
            }`}>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-blue-200 text-brand-blue mb-3 shadow-xs">
                <Upload size={19} />
              </div>
              <h3 className="text-sm font-extrabold text-slate-950 leading-tight">Posted to Tally</h3>
              <p className="mt-1 text-xs text-brand-blue font-medium">bill + payment entry</p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: TWO PRODUCT CARDS WITH A "+" BETWEEN THEM (3D Layered Cards)
          ========================================================================= */}
      <section id="accounts-payable" className="border-b border-slate-200/80 bg-white py-16 sm:py-24 scroll-mt-20">
        <div className="site-shell">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-8 lg:gap-10">
            
            {/* Left Card (neutral border): INVOICE AUTOMATION · START HERE */}
            <div className="card-3d-layered flex flex-col justify-between rounded-2xl border border-slate-200/90 border-t-2 border-t-brand-blue/70 bg-white p-7 sm:p-9 shadow-xs min-h-[290px]">
              <div className="card-3d-ghost card-3d-ghost-1" aria-hidden="true" />
              <div className="card-3d-ghost card-3d-ghost-2" aria-hidden="true" />

              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 block mb-5">
                  INVOICE AUTOMATION · START HERE
                </span>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                    <AnimatedCheckmark delayMs={100} />
                    <span>Bills read and GST-checked</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                    <AnimatedCheckmark delayMs={200} />
                    <span>Duplicates held</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                    <AnimatedCheckmark delayMs={300} />
                    <span>Posted to Tally, Zoho Books or ERP</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100">
                <a
                  href="/free-trial"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/free-trial');
                  }}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-blue hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-brand-blue rounded"
                >
                  Free trial →
                </a>
              </div>
            </div>

            {/* Centered Large "+" Separator */}
            <div className="flex items-center justify-center py-2 lg:py-0" aria-hidden="true">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-400 text-xl font-bold shadow-2xs">
                <Plus size={20} strokeWidth={2.5} />
              </span>
            </div>

            {/* Right Card (orange border): ACCOUNTS PAYABLE · ADD ON */}
            <div className="card-3d-layered flex flex-col justify-between rounded-2xl border-2 border-orange-300 border-t-2 border-t-orange-500 bg-gradient-to-b from-orange-50/25 via-white to-white p-7 sm:p-9 shadow-xs min-h-[290px]">
              <div className="card-3d-ghost card-3d-ghost-1" aria-hidden="true" />
              <div className="card-3d-ghost card-3d-ghost-2" aria-hidden="true" />

              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-orange-600 block mb-5">
                  ACCOUNTS PAYABLE · ADD ON
                </span>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                    <AnimatedCheckmark 
                      badgeClassName="bg-amber-50 text-amber-700 border border-amber-200"
                      delayMs={150} 
                    />
                    <span>Approval rules by amount and vendor</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                    <AnimatedCheckmark 
                      badgeClassName="bg-amber-50 text-amber-700 border border-amber-200"
                      delayMs={250} 
                    />
                    <span>Pay vendors from the same screen</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                    <AnimatedCheckmark 
                      badgeClassName="bg-amber-50 text-amber-700 border border-amber-200"
                      delayMs={350} 
                    />
                    <span>Payment entry posts itself</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100">
                <a
                  href="/#demo"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/#demo');
                  }}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-600 hover:text-orange-700 hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-orange-500 rounded"
                >
                  Book a demo →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: TWO CARDS SIDE BY SIDE (Customer Story & Questions Buyers Ask)
          ========================================================================= */}
      <section className="bg-white py-16 sm:py-24">
        <div className="site-shell">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start">
            
            {/* Left Card (green left border): CUSTOMER STORY */}
            <div className="card-3d-layered flex flex-col justify-between rounded-2xl border border-slate-200 border-l-[6px] border-l-emerald-500 bg-white p-7 sm:p-9 shadow-xs min-h-[240px]">
              <div className="card-3d-ghost card-3d-ghost-1" aria-hidden="true" />
              
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-3">
                  CUSTOMER STORY
                </span>

                <h3 className="text-xl font-extrabold text-slate-950 tracking-tight">
                  Rajadurai E-Vehicles
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-slate-600 font-medium">
                  Purchase, spares and service entry:{' '}
                  <MetricTransition
                    from="days"
                    to="hours."
                    accentClassName="text-emerald-700 font-extrabold"
                  />
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <a
                  href="/customers/rajadurai"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/customers/rajadurai');
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-emerald-600 rounded"
                >
                  Read the story →
                </a>
              </div>
            </div>

            {/* Right Card: QUESTIONS BUYERS ASK (Clean Accessible Accordion) */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-9 shadow-xs">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 block mb-5">
                QUESTIONS BUYERS ASK
              </span>

              <SharedFaqAccordion items={faqList} theme="blue" />
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SLIM STICKY BOTTOM CONVERSION CTA BAR
          ========================================================================= */}
      <StickyCtaBar
        theme="blue"
        badge="FINANCE DOOR"
        title="Approve the bill. Pay the vendor."
        subtext="The entry posts itself into Tally Prime."
        buttonText="Book a demo"
        onButtonClick={() => navigate('/#demo')}
      />
    </div>
  );
};
