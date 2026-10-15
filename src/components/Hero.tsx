import React, { useState, useEffect, useRef } from 'react';
import { Play, ArrowRight, Pause } from 'lucide-react';
import { FinanceDeskVisual } from './FinanceDeskVisual';
import { useHeroAutoScroll } from '../hooks/useHeroAutoScroll';

export const Hero: React.FC = () => {
  const [centeredBlock, setCenteredBlock] = useState<number | null>(0);
  const block1Ref = useRef<HTMLDivElement>(null);
  const block2Ref = useRef<HTMLDivElement>(null);
  const block3Ref = useRef<HTMLDivElement>(null);

  const {
    currentStep,
    isAutoScrolling,
    isCancelled,
    stopAutoScroll,
    jumpToStep,
  } = useHeroAutoScroll({
    blockRefs: [block1Ref, block2Ref, block3Ref],
    initialDelay: 2000,
    moveDuration: 1200,
    pauseDuration: 2500,
  });

  useEffect(() => {
    const blocks = [block1Ref.current, block2Ref.current, block3Ref.current];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = blocks.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setCenteredBlock(index);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0.25,
      }
    );

    blocks.forEach((b) => b && observer.observe(b));
    return () => observer.disconnect();
  }, []);

  const activeBlockIndex = isAutoScrolling ? currentStep : (centeredBlock ?? currentStep);

  return (
    <section className="relative border-b border-slate-200/80 hero-section pt-8 pb-14 lg:py-0">
      <div className="site-shell grid items-start gap-8 lg:gap-12 lg:grid-cols-12">
        {/* Left Column: Vertically centered in visible area under sticky navbar, and STICKY */}
        <div className="lg:col-span-6 lg:sticky lg:top-[68px] lg:h-[calc(100vh-68px)] lg:flex lg:flex-col lg:justify-center z-10">
          <div className="max-w-[560px]">
            <div className="eyebrow mb-6">
              For businesses that run on Tally, an ERP, or CargoWise
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-[-0.055em] text-slate-950 sm:text-5xl lg:text-6xl">
              Grow the business,
              <br />
              not the data-entry desk.
            </h1>

            <p className="mt-6 text-[15px] leading-7 text-slate-600">
              Bills read, checked, paid and posted to Tally. Emails become CargoWise jobs. Your team handles exceptions, not typing.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#finance" className="button-primary">
                Run a finance desk
              </a>
              <a href="#logistics" className="button-teal">
                Run the logistics desk
              </a>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-6 text-[12px] font-semibold text-slate-500">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Built around your approvals
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                No rip-and-replace
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Scrolls normally with stacked blocks, each about 80vh tall and vertically centered */}
        <div className="relative lg:col-span-6 space-y-8 lg:space-y-0">
          {/* Subtle Ambient Radial Glow & Dotted Matrix Behind Right Column Stack */}
          <div className="pointer-events-none absolute inset-0 -inset-x-8 overflow-hidden opacity-60" aria-hidden="true">
            <div className="absolute top-1/4 right-0 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(232,234,251,0.85)_0%,rgba(225,243,238,0.4)_40%,transparent_70%)] blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(rgba(11,19,48,0.06)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_75%)]" />
          </div>

          {/* Hero Auto-Scroll Tour Controller & Progress Indicators (Desktop only) */}
          <div className="sticky top-[80px] z-30 mb-2 hidden justify-end lg:flex pointer-events-auto">
            <div className="inline-flex items-center gap-3 rounded-full border border-slate-200/90 bg-white/95 px-3.5 py-1.5 shadow-sm backdrop-blur-md">
              <div className="flex items-center gap-1.5" role="tablist" aria-label="Hero feature blocks">
                {[0, 1, 2].map((idx) => {
                  const isActive = activeBlockIndex === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => jumpToStep(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        isActive
                          ? 'w-6 bg-brand-blue'
                          : 'w-2 bg-slate-200 hover:bg-slate-300'
                      }`}
                      aria-label={`Jump to block ${idx + 1}`}
                      aria-selected={isActive}
                      role="tab"
                    />
                  );
                })}
              </div>

              {isAutoScrolling && !isCancelled && (
                <div className="flex items-center gap-1.5 border-l border-slate-200 pl-2.5">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-brand-blue animate-ping" />
                  <span className="text-[10px] font-semibold text-slate-500 font-mono">Auto</span>
                  <button
                    type="button"
                    onClick={stopAutoScroll}
                    className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900 cursor-pointer"
                    aria-label="Pause auto-scroll"
                    title="Pause auto-scroll"
                  >
                    <Pause size={10} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Block 1: Automated Processing Flow card */}
          <div
            ref={block1Ref}
            className="hero-perspective lg:min-h-[80vh] lg:flex lg:flex-col lg:justify-center py-6 lg:py-12"
          >
            <div className={`card-stack-3d w-full ${activeBlockIndex === 0 ? 'is-centered' : ''}`}>
              {/* 2 Faint Ghost Cards Behind */}
              <div className="ghost-card-1" aria-hidden="true" />
              <div className="ghost-card-2" aria-hidden="true" />

              {/* Main 3D Card */}
              <div className="main-card-3d p-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-[11px] font-extrabold text-slate-900 flex items-center gap-2">
                    <span className="brand-mark h-4 w-4 rounded text-[8px]">D</span>
                    Automated Processing Flow
                  </span>
                  <span className="floating-badge-1 rounded bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700 border border-emerald-100 shadow-2xs">
                    Live Pipeline
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2.5 items-center text-center">
                  {/* Step 01 */}
                  <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-3 shadow-2xs">
                    <span className="text-[9px] font-bold uppercase text-slate-400 block font-mono">Step 01</span>
                    <span className="text-xs font-bold text-slate-800 mt-1 block">Incoming bill</span>
                    <span className="text-[9px] text-slate-500 block mt-0.5">Email / PDF / Scan</span>
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:flex justify-center text-brand-blue">
                    <ArrowRight size={16} />
                  </div>

                  {/* Step 02 */}
                  <div className="floating-badge-2 rounded-lg border border-blue-200 bg-brand-lavender/50 p-3 shadow-xs">
                    <span className="text-[9px] font-bold uppercase text-brand-blue block font-mono">Step 02</span>
                    <span className="text-xs font-bold text-slate-900 mt-1 block">Reading / GST-check / Matching</span>
                    <span className="text-[9px] text-brand-blue font-semibold block mt-0.5">Zero manual keying</span>
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:flex justify-center text-emerald-600">
                    <ArrowRight size={16} />
                  </div>

                  {/* Step 03 */}
                  <div className="floating-badge-1 rounded-lg border border-emerald-200 bg-emerald-50/60 p-3 shadow-xs">
                    <span className="text-[9px] font-bold uppercase text-emerald-700 block font-mono">Step 03</span>
                    <span className="text-xs font-bold text-slate-900 mt-1 block">Posted to Tally</span>
                    <span className="text-[9px] text-emerald-700 font-semibold block mt-0.5">Voucher auto-created</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Block 2: Vendor bills table card */}
          <div
            ref={block2Ref}
            className="hero-perspective lg:min-h-[80vh] lg:flex lg:flex-col lg:justify-center py-6 lg:py-12"
          >
            <FinanceDeskVisual isCentered={activeBlockIndex === 1} />
          </div>

          {/* Block 3: Video card */}
          <div
            ref={block3Ref}
            className="hero-perspective lg:min-h-[80vh] lg:flex lg:flex-col lg:justify-center py-6 lg:py-12"
          >
            <div className={`card-stack-3d w-full ${activeBlockIndex === 2 ? 'is-centered' : ''}`}>
              {/* 2 Faint Ghost Cards Behind Dark Card */}
              <div className="ghost-card-dark-1" aria-hidden="true" />
              <div className="ghost-card-dark-2" aria-hidden="true" />

              {/* Main 3D Video Card */}
              <div className="main-card-3d-dark relative aspect-video w-full overflow-hidden flex flex-col items-center justify-center p-6 text-center text-white group cursor-pointer transition-all hover:border-brand-blue">
                <div className="absolute inset-0 bg-radial from-brand-blue/20 to-transparent pointer-events-none" />
                <div className="floating-badge-1 relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue text-white shadow-xl transition-transform group-hover:scale-110">
                  <Play size={22} className="ml-1 fill-white" />
                </div>
                <div className="relative mt-4">
                  <span className="floating-badge-2 text-xs font-bold tracking-wide uppercase text-blue-300 block font-mono">
                    [ Video Slot: Product Walkthrough (2 min) ]
                  </span>
                  <p className="mt-1 text-xs text-slate-300 max-w-sm">
                    Watch vendor invoices read, validated for GST, and posted to Tally Prime in real time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
