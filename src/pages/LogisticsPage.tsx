import React, { useEffect } from 'react';
import { 
  ArrowRight, 
  Sparkles
} from 'lucide-react';
import { useRouter } from '../lib/router';
import { StickyCtaBar } from '../components/StickyCtaBar';
import { MetricTransition } from '../components/MetricTransition';
import { AnimatedCheckmark } from '../components/AnimatedCheckmark';

export const LogisticsPage: React.FC = () => {
  const { navigate } = useRouter();

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

  return (
    <div className="bg-white text-slate-800">
      {/* =========================================================================
          SECTION 1: HERO (Two columns on desktop, ambient dot matrix & glow)
          ========================================================================= */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-[#fdfdfd] pt-16 pb-20 sm:pt-24 sm:pb-28">
        {/* Subtle Ambient Radial Glow & Dot Matrix */}
        <div className="pointer-events-none absolute inset-0 bg-dot-matrix opacity-40" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60" aria-hidden="true">
          <div className="absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-teal-100/35 via-emerald-100/25 to-transparent blur-3xl" />
        </div>

        <div className="site-shell relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Eyebrow, Headline, Subtext, Buttons */}
            <div className="lg:col-span-7 text-left">
              {/* Tag: FOR FREIGHT FORWARDERS ON CARGOWISE */}
              <div className="inline-flex items-center gap-1.5 rounded-full border border-teal-200/90 bg-teal-50/90 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-teal-800 shadow-2xs font-mono">
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
                  className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-xs sm:text-sm font-bold text-slate-800 transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 hover:-translate-y-0.5 cursor-pointer shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400"
                >
                  Send us a week of emails →
                </button>
              </div>
            </div>

            {/* Right Column: FT LOGISTICS Hero Stat Card (3D Layered Elevation) */}
            <div className="lg:col-span-5">
              <div className="card-3d-layered relative group/ft rounded-2xl border border-teal-800/60 bg-[#0B4A3F] p-8 sm:p-9 text-white shadow-xl min-h-[220px]">
                <div className="card-3d-ghost card-3d-ghost-1 bg-teal-900/40 border-teal-800/40" aria-hidden="true" />
                <div className="card-3d-ghost card-3d-ghost-2 bg-teal-950/20 border-teal-800/20" aria-hidden="true" />

                {/* Subtle Radial Glow */}
                <div className="pointer-events-none absolute inset-0 bg-radial from-teal-400/15 via-transparent to-transparent rounded-2xl" />

                {/* Card Tag */}
                <div className="relative z-10 flex items-center justify-between border-b border-teal-700/60 pb-4">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-teal-200">
                    FT LOGISTICS
                  </span>
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                {/* Big Hero Metric Transition */}
                <div className="relative z-10 mt-6">
                  <MetricTransition
                    from="2 hrs"
                    to="2 min"
                    className="text-4xl sm:text-5xl lg:text-[46px] font-extrabold font-mono tracking-tight text-white leading-none"
                    accentClassName="text-teal-200"
                  />
                  <p className="mt-3 text-xs sm:text-sm font-medium text-teal-100">
                    email-to-CargoWise posting
                  </p>
                </div>

                {/* Card Link */}
                <div className="relative z-10 mt-8 pt-4 border-t border-teal-700/60">
                  <a
                    href="/customers/ft-logistics"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/customers/ft-logistics');
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-teal-200 transition-colors hover:text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-teal-300 rounded"
                  >
                    Read the story →
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: BEFORE / AFTER (TODAY vs WITH DOCSYNECX)
          ========================================================================= */}
      <section className="border-b border-slate-200/80 bg-white py-16 sm:py-24">
        <div className="site-shell">
          <div className="card-3d-layered rounded-2xl border border-slate-200 bg-white p-7 sm:p-9 shadow-xs">
            <div className="card-3d-ghost card-3d-ghost-1" aria-hidden="true" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
              
              {/* Left Column: TODAY */}
              <div className="flex flex-col justify-between p-2 sm:p-3">
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-600 block mb-5">
                    TODAY
                  </span>

                  <div className="space-y-4 text-sm font-medium text-slate-700">
                    <p className="leading-snug">Open each email, find the BL</p>
                    <p className="leading-snug">Re-key shipper, consignee, ports</p>
                    <p className="leading-snug">Cross-check packing list by eye</p>
                    <p className="leading-snug">Create the job field by field</p>
                  </div>
                </div>
              </div>

              {/* Right Column: WITH DOCSYNECX (Soft Teal Container & Animated Checks) */}
              <div className="flex flex-col justify-between rounded-xl border border-teal-200/90 border-t-2 border-t-teal-600 bg-teal-50/45 p-6 sm:p-7 shadow-2xs">
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-teal-800 block mb-5">
                    WITH DOCSYNECX
                  </span>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                      <AnimatedCheckmark
                        badgeClassName="bg-emerald-100/90 text-emerald-800 border border-emerald-300/80"
                        delayMs={100}
                      />
                      <span>Documents collected from email</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                      <AnimatedCheckmark
                        badgeClassName="bg-emerald-100/90 text-emerald-800 border border-emerald-300/80"
                        delayMs={200}
                      />
                      <span>Key fields read and matched</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                      <AnimatedCheckmark
                        badgeClassName="bg-emerald-100/90 text-emerald-800 border border-emerald-300/80"
                        delayMs={300}
                      />
                      <span>Job created or updated in CargoWise</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                      <AnimatedCheckmark
                        badgeClassName="bg-emerald-100/90 text-emerald-800 border border-emerald-300/80"
                        delayMs={400}
                      />
                      <span>Team works only the flagged cases</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: "START WITH ONE WORKFLOW" (5 module cards in a row)
          ========================================================================= */}
      <section className="border-b border-slate-200/80 bg-[#fdfdfd] py-16 sm:py-24">
        <div className="site-shell">
          {/* Section Label */}
          <div className="text-left mb-8 sm:mb-10">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-400">
              START WITH ONE WORKFLOW
            </span>
          </div>

          {/* 5 Module Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* Card 1 */}
            <div className="flex flex-col justify-between rounded-xl border border-slate-200 border-t-2 border-t-teal-600/70 bg-white p-5 shadow-2xs transition-all duration-300 hover:shadow-md hover:border-slate-300 hover:-translate-y-1 min-h-[148px]">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                  Email → CargoWise job
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  the job is ready before your team opens the email
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col justify-between rounded-xl border border-slate-200 border-t-2 border-t-teal-600/70 bg-white p-5 shadow-2xs transition-all duration-300 hover:shadow-md hover:border-slate-300 hover:-translate-y-1 min-h-[148px]">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                  BL & packing list check
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  mismatches caught at intake
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col justify-between rounded-xl border border-slate-200 border-t-2 border-t-teal-600/70 bg-white p-5 shadow-2xs transition-all duration-300 hover:shadow-md hover:border-slate-300 hover:-translate-y-1 min-h-[148px]">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                  Customs entry
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  pre-filled line by line
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="flex flex-col justify-between rounded-xl border border-slate-200 border-t-2 border-t-teal-600/70 bg-white p-5 shadow-2xs transition-all duration-300 hover:shadow-md hover:border-slate-300 hover:-translate-y-1 min-h-[148px]">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                  Freight AP check
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  carrier charges vs expected cost
                </p>
              </div>
            </div>

            {/* Card 5: Quote to booking (warm peach / coming soon highlight) */}
            <div className="flex flex-col justify-between rounded-xl border border-orange-200/90 border-t-2 border-t-orange-400 bg-[#fef9f3] p-5 shadow-2xs transition-all duration-300 hover:shadow-md hover:border-orange-300 hover:-translate-y-1 min-h-[148px]">
              <div>
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
          SECTION 4: BOTTOM INFO CARDS & SOFT CTA (Retyping Audit)
          ========================================================================= */}
      <section id="retyping-audit" className="bg-white py-16 sm:py-24 scroll-mt-20">
        <div className="site-shell">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            
            {/* Card 1: POSTS INTO */}
            <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-2xs transition-all duration-200 hover:border-slate-300 hover:shadow-xs">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                  POSTS INTO
                </span>
                <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                  <strong className="font-extrabold">CargoWise One</strong> through native APIs · other TMS on request
                </p>
              </div>
            </div>

            {/* Card 2: FOR */}
            <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-2xs transition-all duration-200 hover:border-slate-300 hover:shadow-xs">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                  FOR
                </span>
                <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                  Forwarders in India · Middle East <span className="text-xs text-slate-500 font-normal">(Phase 2)</span>
                </p>
              </div>
            </div>

            {/* Card 3: Retyping Audit (Dark Navy Soft CTA) */}
            <div 
              onClick={() => navigate('/#demo')}
              className="group cursor-pointer flex flex-col justify-between rounded-xl border border-slate-800 bg-[#0b1330] p-6 text-white shadow-md transition-all duration-300 hover:shadow-xl hover:border-teal-500/60 hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-white tracking-wide">
                    Retyping Audit
                  </h3>
                  <ArrowRight size={14} className="text-teal-400 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-300 font-medium">
                  one week of shipment emails → your hours report
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-teal-300 font-semibold">
                <span>Request report</span>
                <span>Free 24h turnaround →</span>
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
        badge="LOGISTICS DOOR"
        title="Shipment emails in. CargoWise jobs out."
        subtext="Your documentation desk handles the exceptions — not the typing."
        buttonText="Book a demo"
        onButtonClick={() => navigate('/#demo')}
      />
    </div>
  );
};
