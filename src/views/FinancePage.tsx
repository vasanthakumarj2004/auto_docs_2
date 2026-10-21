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
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useRouter } from '../lib/router';
import { StickyCtaBar } from '../components/StickyCtaBar';
import { MetricTransition } from '../components/MetricTransition';
import { AnimatedCheckmark } from '../components/AnimatedCheckmark';
import { FlowConnector } from '../components/FlowConnector';

// Config constant for bank partners label as required by spec
export const BANK_PARTNERS_LABEL = 'via your bank';

interface FaqItem {
  question: string;
  answer: string;
}

const faqList: FaqItem[] = [
  {
    question: 'Which banks can I pay vendors through?',
    answer:
      'Integration details for approved banking partners will be announced shortly prior to general availability. No proprietary bank portal changes will be required.',
  },
  {
    question: 'Does the payment show up in Tally automatically?',
    answer:
      'Yes. Once a vendor payment is authorized, both the purchase bill voucher and the corresponding bank payment voucher are created and reconciled automatically in Tally Prime.',
  },
  {
    question: 'Can the MD approve from his phone?',
    answer:
      'Yes. Decision makers can review invoice line items, tax breakdowns, and vendor bank details via secure mobile links with one-tap approval.',
  },
];

export const FinancePage: React.FC = () => {
  const { navigate } = useRouter();
  const journeyRef = useRef<HTMLElement>(null);
  const [activeFlowStep, setActiveFlowStep] = useState<number>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="bg-white text-slate-800">
      {/* =========================================================================
          TIER 1: HERO SECTION (2-Column Split Hero with Live Outcome Card & Telemetry)
          ========================================================================= */}
      <section className="relative border-b border-slate-200/80 bg-[#fdfdfd] pt-6 sm:pt-8 lg:pt-10 pb-20 sm:pb-28">
        {/* Subtle Ambient Background Lighting & Dotted Matrix */}
        <div className="pointer-events-none absolute inset-0 bg-dot-matrix opacity-40" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60" aria-hidden="true">
          <div className="absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-emerald-100/35 via-blue-100/25 to-transparent blur-3xl" />
        </div>

        <div className="site-shell relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Eyebrow, Headline, Subtext, Buttons */}
            <div className="lg:col-span-7 text-left">
              {/* Tag: NEW · FINANCE DESK with live status dot */}
              <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-200/90 bg-orange-50/90 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-orange-700 shadow-2xs font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <Sparkles size={11} className="text-orange-600" />
                <span>NEW · FINANCE DESK</span>
              </div>

              {/* Headline */}
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[54px] font-extrabold leading-[1.08] tracking-[-0.035em] text-slate-950">
                Approve the bill. Pay the vendor.
                <br className="hidden sm:inline" />
                {' '}The entry posts itself.
              </h1>

              {/* Subtext */}
              <p className="mt-6 max-w-xl text-[15px] sm:text-base leading-relaxed text-slate-600 font-medium">
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
                  className="group rounded-lg border border-slate-300 bg-white px-5 py-3 text-xs sm:text-sm font-bold text-slate-800 transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 hover:-translate-y-0.5 cursor-pointer shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400 inline-flex items-center gap-1.5"
                >
                  <span>Already on invoice? Switch on payments</span>
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right Column: RAJADURAI E-VEHICLES Verified Outcome Card + Shipsy/Wove Live Telemetry */}
            <div className="lg:col-span-5">
              <div className="relative group/hero-rajadurai rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.12),0_1px_3px_rgba(15,23,42,0.06),inset_0_1px_1px_rgba(255,255,255,0.95)] p-6 md:p-8 text-slate-900 min-h-[220px] overflow-hidden">
                {/* Subtle Ambient Light Refraction Behind the Glass */}
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/[0.08] blur-3xl rounded-full pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-slate-400/[0.08] blur-3xl rounded-full pointer-events-none" />

                {/* Card Tag */}
                <div className="relative z-10 flex items-center justify-between border-b border-slate-200/80 pb-4">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                    RAJADURAI E-VEHICLES
                  </span>
                  <div className="flex items-center gap-1.5 rounded-full bg-slate-900/[0.04] backdrop-blur-md px-3 py-1 border border-slate-200/80 text-[10px] font-mono font-bold text-slate-700 shadow-2xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                    <span>✓ VERIFIED OUTCOME</span>
                  </div>
                </div>

                {/* Big Hero Metric Display */}
                <div className="relative z-10 mt-6">
                  <MetricTransition
                    from="Days"
                    to="hours"
                    className="text-4xl sm:text-5xl lg:text-[44px] font-extrabold font-mono tracking-tight text-slate-900 leading-none"
                    accentClassName="text-blue-600"
                  />
                  <p className="mt-3 text-xs sm:text-sm font-medium text-slate-500">
                    purchase, spares & service entry into TallyPrime
                  </p>
                </div>

                {/* Product Visual Showcase Image in Refined Inner Glass Container */}
                <div className="relative z-10 my-5 rounded-2xl bg-slate-950 p-2 border border-slate-200/80 shadow-md overflow-hidden group">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src="/images/finance-desk-card.jpg"
                      alt="Docsynecx Finance Desk - Invoice Automation & AP Telemetry"
                      width={1376}
                      height={768}
                      className="w-full aspect-video object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-900/80 backdrop-blur-md px-3 py-1 text-xs font-mono font-medium text-white shadow-sm">
                        <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                        TallyPrime Sync · 3-Way Match
                      </span>
                    </div>
                  </div>
                </div>

                {/* Docked Interactive Telemetry Strip */}
                <div className="relative z-10 mt-6 pt-4 border-t border-slate-200/80 space-y-2.5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5 font-bold text-slate-700">
                      <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                      LIVE TELEMETRY
                    </span>
                    <span className="text-slate-400">Direct ERP Sync · 3.8s</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 font-mono text-[10px]">
                    <div className="bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-xl p-3 text-slate-800 text-left shadow-2xs">
                      <div className="font-bold text-slate-900 flex items-center justify-between gap-1">
                        <span>1. Bill & GST Check</span>
                        <span className="text-blue-600 font-bold">✓</span>
                      </div>
                      <div className="text-[9px] text-slate-500 truncate mt-0.5">GSTIN · HSN · Guard</div>
                    </div>

                    <span className="text-slate-400 hidden sm:inline text-xs font-bold text-center">→</span>

                    <div className="bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-xl p-3 text-slate-800 text-left shadow-2xs">
                      <div className="font-bold text-slate-900 flex items-center justify-between gap-1">
                        <span>2. MD Payout</span>
                        <span className="text-blue-600 font-bold">✓</span>
                      </div>
                      <div className="text-[9px] text-slate-500 truncate mt-0.5">Rule matched · Paid</div>
                    </div>

                    <span className="text-slate-400 hidden sm:inline text-xs font-bold text-center">→</span>

                    <div className="bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-xl p-3 text-slate-800 text-left shadow-2xs">
                      <div className="font-bold text-slate-900 flex items-center justify-between gap-1">
                        <span>3. Tally Voucher</span>
                        <span className="text-blue-600 font-bold">✓</span>
                      </div>
                      <div className="text-[9px] text-slate-500 truncate mt-0.5">Auto-posted XML</div>
                    </div>
                  </div>
                </div>

                {/* Card Link */}
                <div className="relative z-10 mt-5 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('customer-story-rajadurai');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        navigate('/customers/rajadurai');
                      }
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 transition-colors hover:text-blue-700 cursor-pointer group/link rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-blue-400"
                  >
                    <span>Read the story</span>
                    <ArrowRight size={13} className="transition-transform duration-200 group-hover/link:translate-x-1" />
                  </button>
                  <span className="font-mono text-[10px] text-slate-500">TallyPrime Native</span>
                </div>
              </div>
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
              ONE BILL&apos;S JOURNEY
            </span>
          </div>

          {/* 5 Step Cards in one row with animated flow connectors */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-2 sm:gap-2 lg:gap-3">
            {/* 1. Bill arrives */}
            <div
              className={`flex flex-col items-center justify-center rounded-xl border bg-white p-5 text-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 min-h-[148px] ${
                activeFlowStep >= 1 ? 'border-slate-300 shadow-xs' : 'border-slate-200/90 shadow-2xs opacity-80'
              }`}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 border border-slate-200/90 text-slate-700 mb-3 shadow-2xs">
                <Mail size={19} />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 leading-tight">Bill arrives</h3>
              <p className="mt-1 text-xs text-slate-500 font-medium">email or upload</p>
            </div>

            {/* Connector 1 */}
            <FlowConnector stepIndex={1} activeStep={activeFlowStep} />

            {/* 2. Read & checked */}
            <div
              className={`flex flex-col items-center justify-center rounded-xl border bg-white p-5 text-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 min-h-[148px] ${
                activeFlowStep >= 2 ? 'border-slate-300 shadow-xs' : 'border-slate-200/90 shadow-2xs opacity-80'
              }`}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 border border-slate-200/90 text-slate-700 mb-3 shadow-2xs">
                <Search size={19} />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 leading-tight">Read & checked</h3>
              <p className="mt-1 text-xs text-slate-500 font-medium">GST · duplicate · PO</p>
            </div>

            {/* Connector 2 */}
            <FlowConnector stepIndex={2} activeStep={activeFlowStep} />

            {/* 3. Approved */}
            <div
              className={`flex flex-col items-center justify-center rounded-xl border bg-white p-5 text-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 min-h-[148px] ${
                activeFlowStep >= 3 ? 'border-slate-300 shadow-xs' : 'border-slate-200/90 shadow-2xs opacity-80'
              }`}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 border border-slate-200/90 text-slate-700 mb-3 shadow-2xs">
                <Check size={19} />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 leading-tight">Approved</h3>
              <p className="mt-1 text-xs text-slate-500 font-medium">from one screen</p>
            </div>

            {/* Connector 3 */}
            <FlowConnector stepIndex={3} activeStep={activeFlowStep} />

            {/* 4. Vendor paid */}
            <div
              className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-amber-300/90 bg-gradient-to-b from-[#fef7ee] to-[#fdeddb] p-5 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 min-h-[148px] ${
                activeFlowStep >= 4 ? 'pulse-step-amber' : 'opacity-85 shadow-xs'
              }`}
            >
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

            {/* 5. Posted to Tally */}
            <div
              className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-blue-200 bg-gradient-to-b from-[#f0f2fe] to-[#e4e7fd] p-5 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 min-h-[148px] ${
                activeFlowStep >= 5 ? 'pulse-step-blue' : 'opacity-85 shadow-xs'
              }`}
            >
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
          TIER 2: DUAL-MODULE BENTO CONTAINER (INVOICE AUTOMATION vs ACCOUNTS PAYABLE)
          ========================================================================= */}
      <section id="accounts-payable" className="border-b border-slate-200/80 bg-white py-16 sm:py-24 scroll-mt-20">
        <div className="site-shell">
          {/* Large Outer Rounded Bento Frame with Specular Border & Micro Dot Backdrop */}
          <div className="relative rounded-3xl border border-slate-200/90 bg-white p-6 md:p-10 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_36px_-6px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.9)] overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-40" aria-hidden="true" />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-stretch gap-8 lg:gap-10 relative z-10">
              {/* Left Column: INVOICE AUTOMATION · START HERE */}
              <div className="card-3d-layered flex flex-col justify-between rounded-2xl border border-slate-200/90 border-t-4 border-t-emerald-600 bg-white/95 backdrop-blur-sm p-7 sm:p-8 shadow-xs min-h-[340px]">
                <div className="card-3d-ghost card-3d-ghost-1" aria-hidden="true" />
                <div className="card-3d-ghost card-3d-ghost-2" aria-hidden="true" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                      INVOICE AUTOMATION · START HERE
                    </span>
                    <span className="font-mono text-[9px] rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 px-2 py-0.5 font-bold">
                      CORE MODULE
                    </span>
                  </div>

                  <div className="space-y-4">
                    {/* Item 1 */}
                    <div className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-800">
                      <div className="flex items-center gap-3">
                        <AnimatedCheckmark delayMs={100} />
                        <span>Bills read and GST-checked</span>
                      </div>
                      <span className="hidden sm:inline-flex rounded border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[10px] text-slate-500 font-bold tracking-tight">
                        GSTIN · HSN · 2A/2B
                      </span>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-800">
                      <div className="flex items-center gap-3">
                        <AnimatedCheckmark delayMs={200} />
                        <span>Duplicates held</span>
                      </div>
                      <span className="hidden sm:inline-flex rounded border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[10px] text-slate-500 font-bold tracking-tight">
                        Invoice # + Amount Guard
                      </span>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-800">
                      <div className="flex items-center gap-3">
                        <AnimatedCheckmark delayMs={300} />
                        <span>Posted to Tally, Zoho Books or ERP</span>
                      </div>
                      <span className="hidden sm:inline-flex rounded border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[10px] text-slate-500 font-bold tracking-tight">
                        Native XML / API
                      </span>
                    </div>
                  </div>

                  {/* Compact Live Schema Mini-Bar */}
                  <div className="my-6 rounded-xl border border-slate-200/80 bg-slate-50/80 p-3 shadow-2xs">
                    <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-1.5 font-bold">
                      <span>Extracted & Validated Schema</span>
                      <span className="text-emerald-700 font-bold flex items-center gap-1 font-mono">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Verified
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-1.5 font-mono text-[10.5px]">
                      <span className="font-bold text-slate-900">INV-4821</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-600 truncate font-medium">Prime Components</span>
                      <span className="text-slate-300">·</span>
                      <span className="font-bold text-slate-900">₹74,095</span>
                      <span className="rounded bg-emerald-100 border border-emerald-200 px-1.5 py-0.5 text-[9px] font-bold text-emerald-800">
                        ✓ Ready for Tally
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <a
                    href="/free-trial"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/free-trial');
                    }}
                    className="group inline-flex items-center gap-1.5 text-sm font-bold text-brand-blue hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-brand-blue rounded"
                  >
                    <span>Free trial</span>
                    <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>

              {/* Centered Desktop Connector Badge */}
              <div className="hidden lg:flex flex-col items-center justify-center -mx-4 z-20 self-center" aria-hidden="true">
                <span className="inline-flex items-center gap-1 rounded-full border border-slate-200/90 bg-white px-3 py-1 text-[11px] font-mono font-bold text-slate-600 shadow-md">
                  <span>Flows into</span>
                  <span className="text-brand-blue font-extrabold">→</span>
                </span>
              </div>

              {/* Mobile Separator "+" */}
              <div className="flex lg:hidden items-center justify-center py-2" aria-hidden="true">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-400 text-lg font-bold shadow-2xs">
                  <Plus size={18} strokeWidth={2.5} />
                </span>
              </div>

              {/* Right Column: ACCOUNTS PAYABLE · ADD ON */}
              <div className="card-3d-layered flex flex-col justify-between rounded-2xl border-2 border-amber-300/90 border-t-4 border-t-amber-500 bg-gradient-to-b from-amber-50/60 via-amber-50/20 to-white p-7 sm:p-8 shadow-xs min-h-[340px]">
                <div className="card-3d-ghost card-3d-ghost-1" aria-hidden="true" />
                <div className="card-3d-ghost card-3d-ghost-2" aria-hidden="true" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-700 block">
                      ACCOUNTS PAYABLE · ADD ON
                    </span>
                    <span className="font-mono text-[9px] rounded-md bg-amber-100/80 border border-amber-300 text-amber-800 px-2 py-0.5 font-bold">
                      PAYMENTS READY
                    </span>
                  </div>

                  <div className="space-y-4">
                    {/* Item 1 */}
                    <div className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-800">
                      <div className="flex items-center gap-3">
                        <AnimatedCheckmark 
                          badgeClassName="bg-amber-100 text-amber-800 border border-amber-300"
                          delayMs={150} 
                        />
                        <span>Approval rules by amount and vendor</span>
                      </div>
                      <span className="hidden sm:inline-flex rounded border border-amber-200 bg-amber-50 px-2 py-0.5 font-mono text-[10px] text-amber-800 font-bold tracking-tight">
                        Tiered Matrix · Mobile OK
                      </span>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-800">
                      <div className="flex items-center gap-3">
                        <AnimatedCheckmark 
                          badgeClassName="bg-amber-100 text-amber-800 border border-amber-300"
                          delayMs={250} 
                        />
                        <span>Pay vendors from the same screen</span>
                      </div>
                      <span className="hidden sm:inline-flex rounded border border-amber-200 bg-amber-50 px-2 py-0.5 font-mono text-[10px] text-amber-800 font-bold tracking-tight">
                        NEFT · RTGS · IMPS
                      </span>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-800">
                      <div className="flex items-center gap-3">
                        <AnimatedCheckmark 
                          badgeClassName="bg-amber-100 text-amber-800 border border-amber-300"
                          delayMs={350} 
                        />
                        <span>Payment entry posts itself</span>
                      </div>
                      <span className="hidden sm:inline-flex rounded border border-amber-200 bg-amber-50 px-2 py-0.5 font-mono text-[10px] text-amber-800 font-bold tracking-tight">
                        Auto Bank Reconciliation
                      </span>
                    </div>
                  </div>

                  {/* Compact Live Approval & Payout Mini-Bar */}
                  <div className="my-6 rounded-xl border border-amber-200/90 bg-white/95 p-3 shadow-2xs">
                    <div className="flex items-center justify-between text-[9px] font-mono text-amber-700 uppercase tracking-wider mb-1.5 font-bold">
                      <span>Autonomous Payout Execution</span>
                      <span className="text-emerald-700 font-bold flex items-center gap-1 font-mono">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Reconciled
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-1.5 font-mono text-[10.5px]">
                      <span className="font-semibold text-amber-900">&gt; ₹50,000 Rule</span>
                      <span className="text-amber-300">·</span>
                      <span className="text-slate-700 font-medium">MD Approved via Phone ✓</span>
                      <span className="rounded bg-emerald-100 border border-emerald-200 px-1.5 py-0.5 text-[9px] font-bold text-emerald-800">
                        ✓ Paid &amp; Posted to Tally
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-amber-200/60">
                  <a
                    href="/#demo"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/#demo');
                    }}
                    className="group inline-flex items-center gap-1.5 text-sm font-bold text-amber-700 hover:text-amber-800 hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-amber-500 rounded"
                  >
                    <span>Book a demo</span>
                    <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TIER 3: PROOF & FAQ BENTO GRID (Customer Story & Questions Buyers Ask)
          ========================================================================= */}
      <section className="bg-white py-16 sm:py-24">
        <div className="site-shell">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start">
            {/* Left Card: CUSTOMER STORY — Rajadurai E-Vehicles */}
            <div
              id="customer-story-rajadurai"
              className="card-3d-layered flex flex-col justify-between rounded-2xl border border-slate-200/90 border-l-[6px] border-l-emerald-500 bg-white/95 backdrop-blur-sm p-7 sm:p-9 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all duration-300 min-h-[300px] scroll-mt-24"
            >
              <div className="card-3d-ghost card-3d-ghost-1" aria-hidden="true" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                    CUSTOMER STORY
                  </span>
                  <span className="font-mono text-[10px] rounded-md px-2 py-0.5 border border-emerald-200 bg-emerald-50 text-emerald-800 font-bold shadow-2xs">
                    TallyPrime Native Integration
                  </span>
                </div>

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

                {/* 3-Pill Verified Impact Strip */}
                <div className="grid grid-cols-3 gap-2 pt-4 mt-4 border-t border-slate-100 font-mono text-center">
                  <div className="rounded-lg border border-slate-200/80 bg-slate-50/80 p-2.5">
                    <div className="text-base font-extrabold text-slate-900">100%</div>
                    <div className="text-[9px] text-slate-500 font-medium mt-0.5">Line-item GST check</div>
                  </div>
                  <div className="rounded-lg border border-slate-200/80 bg-slate-50/80 p-2.5">
                    <div className="text-base font-extrabold text-emerald-700">0</div>
                    <div className="text-[9px] text-slate-500 font-medium mt-0.5">Duplicate payouts</div>
                  </div>
                  <div className="rounded-lg border border-slate-200/80 bg-slate-50/80 p-2.5">
                    <div className="text-base font-extrabold text-slate-900">3 Categories</div>
                    <div className="text-[9px] text-slate-500 font-medium mt-0.5">Purchase · Spares · Service</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <a
                  href="/customers/rajadurai"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/customers/rajadurai');
                  }}
                  className="group inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-emerald-600 rounded"
                >
                  <span>Read the story</span>
                  <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Right Card: QUESTIONS BUYERS ASK (Interactive Accordion with Permanent DOM SEO Rendering) */}
            <div className="rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-sm p-7 sm:p-9 shadow-xs">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 block mb-5">
                QUESTIONS BUYERS ASK
              </span>

              <div className="space-y-3" role="region" aria-label="Frequently Asked Questions">
                {faqList.map((item, idx) => {
                  const isOpen = openFaqIndex === idx;
                  const answerId = `faq-answer-${idx}`;
                  const buttonId = `faq-button-${idx}`;
                  const numStr = String(idx + 1).padStart(2, '0');

                  return (
                    <div
                      key={idx}
                      className={`rounded-xl border transition-all duration-300 ${
                        isOpen
                          ? 'border-blue-500/30 bg-blue-50/20 shadow-2xs'
                          : 'border-slate-200/90 bg-white hover:border-blue-300/70 hover:bg-slate-50/40'
                      }`}
                    >
                      <button
                        id={buttonId}
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        aria-expanded={isOpen}
                        aria-controls={answerId}
                        className="flex w-full items-center justify-between gap-3 p-4 text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-brand-blue rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`font-mono text-[11px] font-bold px-1.5 py-0.5 rounded transition-colors ${
                              isOpen ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {numStr}
                          </span>
                          <span
                            className={`text-sm font-bold transition-colors ${
                              isOpen ? 'text-slate-950 font-extrabold' : 'text-slate-800 group-hover:text-slate-950'
                            }`}
                          >
                            {item.question}
                          </span>
                        </div>

                        <span
                          className={`shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180 text-brand-blue' : 'text-slate-400 group-hover:text-slate-600'
                          }`}
                        >
                          <ChevronDown size={17} />
                        </span>
                      </button>

                      {/* Always in DOM for SEO Crawlers, Smooth CSS Grid-Template-Rows Height Transition */}
                      <div
                        id={answerId}
                        role="region"
                        aria-labelledby={buttonId}
                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="px-4 pb-4 pt-1">
                            <div className="border-l-2 border-brand-blue/30 pl-3 text-xs sm:text-[13px] leading-relaxed text-slate-600">
                              {item.answer}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SLIM STICKY BOTTOM CONVERSION CTA BAR
          ========================================================================= */}
      <StickyCtaBar
        theme="blue"
        badge="FINANCE DESK"
        title="Approve the bill. Pay the vendor."
        subtext="The entry posts itself in Tally Prime."
        buttonText="Book a demo"
        onButtonClick={() => navigate('/#demo')}
      />
    </div>
  );
};
