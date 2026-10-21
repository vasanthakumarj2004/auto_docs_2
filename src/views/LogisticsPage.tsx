'use client';
import React, { useEffect, useState, useRef } from 'react';
import { 
  ArrowRight, 
  Sparkles,
  ShieldCheck,
  FileCheck2,
  Database
} from 'lucide-react';
import { useRouter } from '../lib/router';
import { StickyCtaBar } from '../components/StickyCtaBar';
import { MetricTransition } from '../components/MetricTransition';
import { AnimatedCheckmark } from '../components/AnimatedCheckmark';
import { FlowConnector } from '../components/FlowConnector';

export const LogisticsPage: React.FC = () => {
  const { navigate } = useRouter();
  const stepperRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  // Manage SEO Document Title and Meta Description
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Logistics Door — Docsynecx | Shipment emails in. CargoWise jobs out.';

    const metaDescription = document.querySelector('meta[name="description"]');
    const originalDescription = metaDescription?.getAttribute('content') || '';
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Your documentation desk handles the exceptions — not the typing. Native CargoWise job creation from shipment emails and documents.'
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

  // Sequence workflow stepper on scroll-in
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActiveStep(5);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let step = 1;
          setActiveStep(1);
          const interval = setInterval(() => {
            step += 1;
            setActiveStep(step);
            if (step >= 5) {
              clearInterval(interval);
            }
          }, 450);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (stepperRef.current) {
      observer.observe(stepperRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white text-slate-800">
      {/* =========================================================================
          TIER 1: HERO SECTION (2-Column Split Hero with FT Logistics Outcome Card & Telemetry)
          ========================================================================= */}
      <section className="relative border-b border-slate-200/80 bg-[#fdfdfd] pt-6 sm:pt-8 lg:pt-10 pb-20 sm:pb-28">
        {/* Subtle Ambient Radial Glow & Dot Matrix */}
        <div className="pointer-events-none absolute inset-0 bg-dot-matrix opacity-40" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60" aria-hidden="true">
          <div className="absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-teal-100/35 via-emerald-100/25 to-transparent blur-3xl" />
        </div>

        <div className="site-shell relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Eyebrow, Headline, Subtext, Buttons */}
            <div className="lg:col-span-7 text-left">
              {/* Tag: FOR FREIGHT FORWARDERS ON CARGOWISE with live status dot */}
              <div className="inline-flex items-center gap-1.5 rounded-full border border-teal-200/90 bg-teal-50/90 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-teal-800 shadow-2xs font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <Sparkles size={11} className="text-teal-600" />
                <span>FOR FREIGHT FORWARDERS ON CARGOWISE</span>
              </div>

              {/* Headline */}
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[54px] font-extrabold leading-[1.08] tracking-[-0.035em] text-slate-950">
                Shipment emails in.
                <br />
                CargoWise jobs out.
              </h1>

              {/* Subtext */}
              <p className="mt-6 max-w-xl text-[15px] sm:text-base leading-relaxed text-slate-600 font-medium">
                Your documentation desk handles the exceptions — not the typing.
              </p>

              {/* Buttons */}
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/#demo')}
                  className="group button-teal text-sm px-6 py-3 cursor-pointer shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500"
                >
                  <span>Book a demo</span>
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('retyping-audit');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      navigate('/#demo');
                    }
                  }}
                  className="group rounded-lg border border-slate-300 bg-white px-5 py-3 text-xs sm:text-sm font-bold text-slate-800 transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 hover:-translate-y-0.5 cursor-pointer shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400 inline-flex items-center gap-1.5"
                >
                  <span>Send us a week of emails</span>
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right Column: FT LOGISTICS Hero Proof Card + Shipsy/Wove Live Telemetry */}
            <div className="lg:col-span-5">
              <div className="relative group/ft rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.12),0_1px_3px_rgba(15,23,42,0.06),inset_0_1px_1px_rgba(255,255,255,0.95)] p-6 md:p-8 text-slate-900 min-h-[220px] overflow-hidden">
                {/* Subtle Ambient Light Refraction Behind the Glass */}
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/[0.08] blur-3xl rounded-full pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-slate-400/[0.08] blur-3xl rounded-full pointer-events-none" />

                {/* Card Tag */}
                <div className="relative z-10 flex items-center justify-between border-b border-slate-200/80 pb-4">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                    FT LOGISTICS
                  </span>
                  <div className="flex items-center gap-1.5 rounded-full bg-slate-900/[0.04] backdrop-blur-md px-3 py-1 border border-slate-200/80 text-[10px] font-mono font-bold text-slate-700 shadow-2xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                    <span>✓ VERIFIED OUTCOME</span>
                  </div>
                </div>

                {/* Big Hero Metric Transition */}
                <div className="relative z-10 mt-6">
                  <MetricTransition
                    from="2 hrs"
                    to="2 min"
                    className="text-4xl sm:text-5xl lg:text-[46px] font-extrabold font-mono tracking-tight text-slate-900 leading-none"
                    accentClassName="text-blue-600"
                  />
                  <p className="mt-3 text-xs sm:text-sm font-medium text-slate-500">
                    email-to-CargoWise posting
                  </p>
                </div>

                {/* Product Visual Showcase Image in Refined Inner Glass Container */}
                <div className="relative z-10 my-5 rounded-2xl bg-slate-950 p-2 border border-slate-200/80 shadow-md overflow-hidden group">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src="/images/logistics-desk-card.jpg"
                      alt="Docsynecx Logistics Desk - Freight Forwarding & CargoWise Job Telemetry"
                      width={1376}
                      height={768}
                      className="w-full aspect-video object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-900/80 backdrop-blur-md px-3 py-1 text-xs font-mono font-medium text-white shadow-sm">
                        <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                        CargoWise One · eAdaptor Sync
                      </span>
                    </div>
                  </div>
                </div>

                {/* Shipsy/Wove-Style Embedded Telemetry Console Inside Card */}
                <div className="relative z-10 my-5 rounded-2xl bg-white/70 border border-slate-200/80 p-3.5 sm:p-4 backdrop-blur-md shadow-2xs">
                  {/* Top Status Row: Packet Tag & Circular SVG Gauge */}
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
                    <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px]">
                      <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-slate-800">
                        <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                        LIVE TELEMETRY
                      </span>
                      <span className="text-slate-300">|</span>
                      <span className="text-slate-600 font-bold uppercase tracking-wide">
                        PACKET: BL + PL + INV
                      </span>
                      <span className="rounded-full bg-blue-50 border border-blue-200/80 px-2 py-0.5 text-[8px] font-bold text-blue-700">
                        Suspicious → Verified
                      </span>
                    </div>

                    {/* Circular SVG Confidence Gauge */}
                    <div className="flex items-center gap-1.5 font-mono text-[9px] text-slate-700 shrink-0">
                      <svg className="h-4 w-4 -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
                        <path
                          className="text-slate-200"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-blue-600"
                          stroke="currentColor"
                          strokeDasharray="99.8, 100"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span className="font-bold text-slate-900">99.8%</span>
                    </div>
                  </div>

                  {/* 3-Node Pulsing Horizontal Pipeline */}
                  <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 font-mono text-[10px]">
                    <div className="bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-xl p-3 text-slate-800 text-left shadow-2xs">
                      <div className="font-bold text-slate-900 flex items-center justify-between gap-1">
                        <span>1. Email &amp; PDF Split</span>
                        <span className="text-blue-600 font-bold">✓</span>
                      </div>
                      <div className="text-[9px] text-slate-500 truncate mt-0.5">BL · PL · Invoice</div>
                    </div>

                    {/* Animated Pulsing Connector 1 */}
                    <div className="hidden sm:flex items-center justify-center px-1" aria-hidden="true">
                      <div className="relative flex items-center">
                        <div className="h-0.5 w-4 bg-slate-300" />
                        <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-blue-500 animate-ping opacity-75" />
                        <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-blue-600" />
                      </div>
                    </div>

                    <div className="bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-xl p-3 text-slate-800 text-left shadow-2xs">
                      <div className="font-bold text-slate-900 flex items-center justify-between gap-1">
                        <span>2. Cross-Check</span>
                        <span className="text-blue-600 font-bold">✓</span>
                      </div>
                      <div className="text-[9px] text-slate-500 truncate mt-0.5">Ports · Weight · Marks</div>
                    </div>

                    {/* Animated Pulsing Connector 2 */}
                    <div className="hidden sm:flex items-center justify-center px-1" aria-hidden="true">
                      <div className="relative flex items-center">
                        <div className="h-0.5 w-4 bg-slate-300" />
                        <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-blue-500 animate-ping opacity-75" />
                        <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-blue-600" />
                      </div>
                    </div>

                    <div className="bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-xl p-3 text-slate-800 text-left shadow-2xs">
                      <div className="font-bold text-slate-900 flex items-center justify-between gap-1">
                        <span>3. CW1 Job #S00038421</span>
                        <span className="text-blue-600 font-bold">✓</span>
                      </div>
                      <div className="text-[9px] text-slate-500 truncate mt-0.5">Posted via eAdaptor</div>
                    </div>
                  </div>
                </div>

                {/* Card Link */}
                <div className="relative z-10 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                  <a
                    href="/customers/ft-logistics"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/customers/ft-logistics');
                    }}
                    className="group/link inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 transition-colors hover:text-blue-700 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-blue-400 rounded"
                  >
                    <span>Read the story</span>
                    <ArrowRight size={13} className="transition-transform duration-200 group-hover/link:translate-x-1" />
                  </a>
                  <span className="font-mono text-[10px] text-slate-500">eAdaptor Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TIER 2: DUAL-COLUMN WORKFLOW BENTO FRAME (TODAY vs WITH DOCSYNECX)
          ========================================================================= */}
      <section className="border-b border-slate-200/80 bg-white py-16 sm:py-24">
        <div className="site-shell">
          {/* Large Outer Rounded Bento Frame mirroring Tier 2 of /finance */}
          <div className="relative rounded-3xl border border-slate-200/90 bg-white p-6 md:p-10 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_36px_-6px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.9)] overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-40" aria-hidden="true" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch relative z-10">
              {/* Left Column: TODAY (Manual friction) */}
              <div className="flex flex-col justify-between p-2 sm:p-4 rounded-2xl border border-slate-200/80 bg-white/95">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-600 block">
                      TODAY
                    </span>
                    <span className="font-mono text-[9px] rounded-md bg-amber-50 border border-amber-200 text-amber-800 px-2 py-0.5 font-bold">
                      MANUAL BOTTLENECK
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    {/* Row 1 */}
                    <div
                      onMouseEnter={() => setHoveredRow(0)}
                      onMouseLeave={() => setHoveredRow(null)}
                      className={`flex items-center justify-between gap-3 p-2 rounded-xl transition-all ${
                        hoveredRow === 0 ? 'bg-amber-50/70 border border-amber-200 shadow-2xs' : 'border border-transparent'
                      }`}
                    >
                      <p className="text-sm font-medium text-slate-700 leading-snug">
                        Open each email, find the BL
                      </p>
                      <span className="hidden sm:inline-flex rounded border border-amber-200/80 bg-amber-50 px-2 py-0.5 font-mono text-[10px] text-amber-700 font-bold shrink-0">
                        15–25 min / shipment
                      </span>
                    </div>

                    {/* Row 2 */}
                    <div
                      onMouseEnter={() => setHoveredRow(1)}
                      onMouseLeave={() => setHoveredRow(null)}
                      className={`flex items-center justify-between gap-3 p-2 rounded-xl transition-all ${
                        hoveredRow === 1 ? 'bg-rose-50/70 border border-rose-200 shadow-2xs' : 'border border-transparent'
                      }`}
                    >
                      <p className="text-sm font-medium text-slate-700 leading-snug">
                        Re-key shipper, consignee, ports
                      </p>
                      <span className="hidden sm:inline-flex rounded border border-rose-200/80 bg-rose-50 px-2 py-0.5 font-mono text-[10px] text-rose-700 font-bold shrink-0">
                        High typo risk ↗
                      </span>
                    </div>

                    {/* Row 3 */}
                    <div
                      onMouseEnter={() => setHoveredRow(2)}
                      onMouseLeave={() => setHoveredRow(null)}
                      className={`flex items-center justify-between gap-3 p-2 rounded-xl transition-all ${
                        hoveredRow === 2 ? 'bg-amber-50/70 border border-amber-200 shadow-2xs' : 'border border-transparent'
                      }`}
                    >
                      <p className="text-sm font-medium text-slate-700 leading-snug">
                        Cross-check packing list by eye
                      </p>
                      <span className="hidden sm:inline-flex rounded border border-amber-200/80 bg-amber-50 px-2 py-0.5 font-mono text-[10px] text-amber-700 font-bold shrink-0">
                        Weight / Container mismatch
                      </span>
                    </div>

                    {/* Row 4 */}
                    <div
                      onMouseEnter={() => setHoveredRow(3)}
                      onMouseLeave={() => setHoveredRow(null)}
                      className={`flex items-center justify-between gap-3 p-2 rounded-xl transition-all ${
                        hoveredRow === 3 ? 'bg-rose-50/70 border border-rose-200 shadow-2xs' : 'border border-transparent'
                      }`}
                    >
                      <p className="text-sm font-medium text-slate-700 leading-snug">
                        Create the job field by field
                      </p>
                      <span className="hidden sm:inline-flex rounded border border-rose-200/80 bg-rose-50 px-2 py-0.5 font-mono text-[10px] text-rose-700 font-bold shrink-0">
                        120+ manual keystrokes
                      </span>
                    </div>
                  </div>
                </div>

                {/* Compact Diagnostic Strip */}
                <div className="mt-5 rounded-xl bg-slate-50 border border-slate-200/80 p-3 shadow-2xs">
                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-1 font-bold">
                    <span>Operational Cost Analysis</span>
                    <span className="text-amber-700 font-bold font-mono">Unmitigated Exposure</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-700 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span>Manual Bottleneck: 2 hrs avg. cycle time · Delayed pre-alerts &amp; demurrage risk</span>
                  </div>
                </div>
              </div>

              {/* Right Column: WITH DOCSYNECX (Tinted Emerald Card with Animated Checks & Outcome Metrics) */}
              <div className="flex flex-col justify-between rounded-2xl border-2 border-emerald-500/80 bg-emerald-50/25 p-6 sm:p-7 shadow-xs relative overflow-hidden">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-teal-900 block">
                      WITH DOCSYNECX
                    </span>
                    <span className="font-mono text-[9px] rounded-md bg-emerald-100 border border-emerald-300 text-emerald-800 px-2 py-0.5 font-bold">
                      AUTONOMOUS TELEMETRY
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    {/* Row 1 */}
                    <div
                      onMouseEnter={() => setHoveredRow(0)}
                      onMouseLeave={() => setHoveredRow(null)}
                      className={`flex items-center justify-between gap-3 p-2 rounded-xl transition-all ${
                        hoveredRow === 0 ? 'bg-emerald-100/60 border border-emerald-300 shadow-2xs' : 'border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                        <AnimatedCheckmark
                          badgeClassName="bg-emerald-100 text-emerald-800 border border-emerald-300"
                          delayMs={100}
                        />
                        <span>Documents collected from email</span>
                      </div>
                      <span className="hidden sm:inline-flex rounded border border-emerald-200/90 bg-emerald-100/80 px-2 py-0.5 font-mono text-[10px] text-emerald-800 font-bold shrink-0">
                        Auto-split PDFs
                      </span>
                    </div>

                    {/* Row 2 */}
                    <div
                      onMouseEnter={() => setHoveredRow(1)}
                      onMouseLeave={() => setHoveredRow(null)}
                      className={`flex items-center justify-between gap-3 p-2 rounded-xl transition-all ${
                        hoveredRow === 1 ? 'bg-emerald-100/60 border border-emerald-300 shadow-2xs' : 'border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                        <AnimatedCheckmark
                          badgeClassName="bg-emerald-100 text-emerald-800 border border-emerald-300"
                          delayMs={200}
                        />
                        <span>Key fields read and matched</span>
                      </div>
                      <span className="hidden sm:inline-flex rounded border border-emerald-200/90 bg-emerald-100/80 px-2 py-0.5 font-mono text-[10px] text-emerald-800 font-bold shrink-0">
                        BL ↔ PL ↔ Inv Checked
                      </span>
                    </div>

                    {/* Row 3 */}
                    <div
                      onMouseEnter={() => setHoveredRow(2)}
                      onMouseLeave={() => setHoveredRow(null)}
                      className={`flex items-center justify-between gap-3 p-2 rounded-xl transition-all ${
                        hoveredRow === 2 ? 'bg-emerald-100/60 border border-emerald-300 shadow-2xs' : 'border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                        <AnimatedCheckmark
                          badgeClassName="bg-emerald-100 text-emerald-800 border border-emerald-300"
                          delayMs={300}
                        />
                        <span>Job created or updated in CargoWise</span>
                      </div>
                      <span className="hidden sm:inline-flex rounded border border-emerald-200/90 bg-emerald-100/80 px-2 py-0.5 font-mono text-[10px] text-emerald-800 font-bold shrink-0">
                        &lt; 2 min via eAdaptor
                      </span>
                    </div>

                    {/* Row 4 */}
                    <div
                      onMouseEnter={() => setHoveredRow(3)}
                      onMouseLeave={() => setHoveredRow(null)}
                      className={`flex items-center justify-between gap-3 p-2 rounded-xl transition-all ${
                        hoveredRow === 3 ? 'bg-emerald-100/60 border border-emerald-300 shadow-2xs' : 'border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                        <AnimatedCheckmark
                          badgeClassName="bg-emerald-100 text-emerald-800 border border-emerald-300"
                          delayMs={400}
                        />
                        <span>Team works only the flagged cases</span>
                      </div>
                      <span className="hidden sm:inline-flex rounded border border-emerald-200/90 bg-emerald-100/80 px-2 py-0.5 font-mono text-[10px] text-emerald-800 font-bold shrink-0">
                        ~98% less manual keying
                      </span>
                    </div>
                  </div>
                </div>

                {/* Compact Live Verification Strip */}
                <div className="mt-5 rounded-xl bg-white/90 border border-emerald-200/90 p-3 shadow-xs">
                  <div className="flex items-center justify-between text-[9px] font-mono text-emerald-700 uppercase tracking-wider mb-1 font-bold">
                    <span>Autonomous Job Dispatch</span>
                    <span className="text-emerald-800 font-bold font-mono flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live eAdaptor Link
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-1.5 font-mono text-[10px]">
                    <span className="font-bold text-slate-900">INMAA → SGSIN</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-700 font-medium">1x40&apos; HC</span>
                    <span className="text-slate-300">·</span>
                    <span className="font-semibold text-slate-800">18,400 kg</span>
                    <span className="rounded bg-emerald-100 border border-emerald-200 px-1.5 py-0.5 text-[9px] font-bold text-emerald-800">
                      ✓ 3 Docs Cross-Checked &amp; Posted to CW1
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cross-Stage Capability Strip Inside Bottom of Tier 2 (Shipsy Architecture Pattern) */}
            <div className="mt-8 pt-6 border-t border-dashed border-slate-200/90 relative z-10">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>RUNS ACROSS EVERY SHIPMENT PACKET</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-[10px]">
                <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-3">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                    <FileCheck2 size={13} className="text-emerald-600" />
                    <span>DOCUMENT AI ENGINE</span>
                  </div>
                  <p className="text-[9px] text-slate-500 leading-relaxed font-sans">
                    Multi-page BL · Packing List · Commercial Invoice · Arrival Notice
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-3">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                    <ShieldCheck size={13} className="text-emerald-600" />
                    <span>DISCREPANCY GUARD</span>
                  </div>
                  <p className="text-[9px] text-slate-500 leading-relaxed font-sans">
                    Shipper/Consignee · Gross Weight · Container &amp; Seal # · HS Codes
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-3">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                    <Database size={13} className="text-emerald-600" />
                    <span>CARGOWISE SYNC</span>
                  </div>
                  <p className="text-[9px] text-slate-500 leading-relaxed font-sans">
                    Native XML / eAdaptor · Consol &amp; Shipment Creation · Audit Trail
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION: "START WITH ONE WORKFLOW" (Numbered Stepper with Flow Connectors)
          ========================================================================= */}
      <section ref={stepperRef} className="border-b border-[#ede8de] bg-[#F8F6F1] py-16 sm:py-24">
        <div className="site-shell">
          {/* Section Label */}
          <div className="text-left mb-8 sm:mb-10">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-500">
              START WITH ONE WORKFLOW
            </span>
          </div>

          {/* 5 Module Stepper Cards with Sequential Animated Connectors */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-2 sm:gap-2 lg:gap-3">
            {/* Step 1: Email → CargoWise job */}
            <div
              className={`flex flex-col justify-between rounded-xl border bg-white p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1 min-h-[160px] ${
                activeStep >= 1 ? 'border-teal-300/80 border-t-2 border-t-teal-600 shadow-xs' : 'border-slate-200/90 shadow-2xs opacity-85'
              }`}
            >
              <div>
                <span className="font-mono text-[11px] font-bold text-teal-700 bg-teal-50 border border-teal-200 rounded px-1.5 py-0.5 inline-block mb-3">
                  01
                </span>
                <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                  Email → CargoWise job
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  the job is ready before your team opens the email
                </p>
              </div>
            </div>

            {/* Connector 1 */}
            <FlowConnector stepIndex={1} activeStep={activeStep} />

            {/* Step 2: BL & packing list check */}
            <div
              className={`flex flex-col justify-between rounded-xl border bg-white p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1 min-h-[160px] ${
                activeStep >= 2 ? 'border-teal-300/80 border-t-2 border-t-teal-600 shadow-xs' : 'border-slate-200/90 shadow-2xs opacity-85'
              }`}
            >
              <div>
                <span className="font-mono text-[11px] font-bold text-teal-700 bg-teal-50 border border-teal-200 rounded px-1.5 py-0.5 inline-block mb-3">
                  02
                </span>
                <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                  BL & packing list check
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  mismatches caught at intake
                </p>
              </div>
            </div>

            {/* Connector 2 */}
            <FlowConnector stepIndex={2} activeStep={activeStep} />

            {/* Step 3: Customs entry */}
            <div
              className={`flex flex-col justify-between rounded-xl border bg-white p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1 min-h-[160px] ${
                activeStep >= 3 ? 'border-teal-300/80 border-t-2 border-t-teal-600 shadow-xs' : 'border-slate-200/90 shadow-2xs opacity-85'
              }`}
            >
              <div>
                <span className="font-mono text-[11px] font-bold text-teal-700 bg-teal-50 border border-teal-200 rounded px-1.5 py-0.5 inline-block mb-3">
                  03
                </span>
                <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                  Customs entry
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  pre-filled line by line
                </p>
              </div>
            </div>

            {/* Connector 3 */}
            <FlowConnector stepIndex={3} activeStep={activeStep} />

            {/* Step 4: Freight AP check */}
            <div
              className={`flex flex-col justify-between rounded-xl border bg-white p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1 min-h-[160px] ${
                activeStep >= 4 ? 'border-teal-300/80 border-t-2 border-t-teal-600 shadow-xs' : 'border-slate-200/90 shadow-2xs opacity-85'
              }`}
            >
              <div>
                <span className="font-mono text-[11px] font-bold text-teal-700 bg-teal-50 border border-teal-200 rounded px-1.5 py-0.5 inline-block mb-3">
                  04
                </span>
                <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                  Freight AP check
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  carrier charges vs expected cost
                </p>
              </div>
            </div>

            {/* Connector 4 */}
            <FlowConnector stepIndex={4} activeStep={activeStep} />

            {/* Step 5: Quote to booking */}
            <div
              className={`flex flex-col justify-between rounded-xl border border-orange-200/90 border-t-2 border-t-orange-400 bg-[#fef9f3] p-5 transition-all duration-300 hover:shadow-md hover:border-orange-300 hover:-translate-y-1 min-h-[160px] ${
                activeStep >= 5 ? 'shadow-xs' : 'shadow-2xs opacity-85'
              }`}
            >
              <div>
                <span className="font-mono text-[11px] font-bold text-orange-700 bg-orange-100/70 border border-orange-200 rounded px-1.5 py-0.5 inline-block mb-3">
                  05
                </span>
                <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                  Quote to booking
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-orange-800/80 font-medium">
                  coming — join the list
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TIER 3: BOTTOM 3-CARD BENTO GRID & STICKY CONVERSION DOCK
          ========================================================================= */}
      <section id="retyping-audit" className="bg-white py-16 sm:py-24 scroll-mt-20">
        <div className="site-shell">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Card 1: POSTS INTO CargoWise One + Native Integration Telemetry Strip */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-sm p-6 sm:p-7 shadow-xs transition-all duration-200 hover:border-slate-300 hover:shadow-md">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                  POSTS INTO
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-800 font-mono shadow-2xs">
                    CargoWise One
                  </span>
                  <span className="text-xs text-slate-600 font-medium">
                    through native APIs · other TMS on request
                  </span>
                </div>
              </div>

              {/* Native Integration Telemetry Strip */}
              <div className="mt-5 pt-4 border-t border-slate-100">
                <div className="flex flex-wrap gap-1.5 font-mono text-[9px]">
                  <span className="rounded bg-slate-100 border border-slate-200 px-2 py-0.5 text-slate-700 font-semibold">
                    [ eAdaptor XML ]
                  </span>
                  <span className="rounded bg-slate-100 border border-slate-200 px-2 py-0.5 text-slate-700 font-semibold">
                    [ Forwarding Shipments ]
                  </span>
                  <span className="rounded bg-slate-100 border border-slate-200 px-2 py-0.5 text-slate-700 font-semibold">
                    [ Customs &amp; AP ]
                  </span>
                  <span className="rounded bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-emerald-800 font-bold">
                    [ Zero Screen-Scraping ]
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: FOR Forwarders in India · Middle East (Phase 2) + Trade Lane & Mode Strip */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-sm p-6 sm:p-7 shadow-xs transition-all duration-200 hover:border-slate-300 hover:shadow-md">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                  FOR
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-slate-900">
                    Forwarders in
                  </span>
                  <span className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-bold text-slate-800 font-mono shadow-2xs">
                    India
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-700 font-mono shadow-2xs">
                    Middle East <span className="text-[10px] text-slate-400 ml-1">(Phase 2)</span>
                  </span>
                </div>
              </div>

              {/* Trade Lane & Mode Strip */}
              <div className="mt-5 pt-4 border-t border-slate-100">
                <div className="flex flex-wrap gap-1.5 font-mono text-[9px]">
                  <span className="rounded bg-slate-100 border border-slate-200 px-2 py-0.5 text-slate-700 font-semibold">
                    [ Ocean FCL / LCL ]
                  </span>
                  <span className="rounded bg-slate-100 border border-slate-200 px-2 py-0.5 text-slate-700 font-semibold">
                    [ Air Freight ]
                  </span>
                  <span className="rounded bg-slate-100 border border-slate-200 px-2 py-0.5 text-slate-700 font-semibold">
                    [ CHA &amp; Customs ]
                  </span>
                  <span className="rounded bg-slate-100 border border-slate-200 px-2 py-0.5 text-slate-700 font-semibold">
                    [ Multi-Branch Desks ]
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Retyping Audit (High-Craft Dark Navy #0B1120 Closing Card) */}
            <div 
              onClick={() => navigate('/#demo')}
              className="group cursor-pointer relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0B1120] p-6 sm:p-7 text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-teal-400/60 hover:-translate-y-0.5 overflow-hidden"
            >
              {/* Radial Top Blue/Emerald Ambient Glow */}
              <div className="pointer-events-none absolute inset-0 bg-radial from-teal-500/15 via-blue-500/5 to-transparent rounded-2xl" />

              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold text-white tracking-wide">
                    Retyping Audit
                  </h3>
                  <ArrowRight size={15} className="text-teal-400 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-300 font-medium">
                  one week of shipment emails → your hours report
                </p>

                {/* Report Preview Pill */}
                <div className="mt-4 inline-flex items-center rounded-md border border-teal-500/30 bg-teal-950/60 px-2.5 py-1 font-mono text-[9px] text-teal-200 font-medium tracking-tight">
                  Deliverable: Exact Time-Wasted &amp; Exception Rate Breakdown
                </div>
              </div>

              <div className="relative z-10 mt-6 pt-3.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-teal-300 font-semibold">
                <span className="group-hover:text-white transition-colors">Request report</span>
                <span className="group-hover:translate-x-0.5 transition-transform">Free 24h turnaround →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SLIM STICKY BOTTOM CONVERSION CTA BAR
          ========================================================================= */}
      <StickyCtaBar
        theme="teal"
        badge="LOGISTICS DESK"
        title="Shipment emails in. CargoWise jobs out."
        subtext="Your documentation desk handles the exceptions — not the typing."
        buttonText="Book a demo"
        onButtonClick={() => navigate('/#demo')}
      />
    </div>
  );
};
