import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { FinanceDeskVisual } from './FinanceDeskVisual';
import { ProcessingFlowVisual } from './ProcessingFlowVisual';
import { useHeroAutoScroll } from '../hooks/useHeroAutoScroll';
import { useRouter } from '../lib/router';

export const Hero: React.FC = () => {
  const { navigate } = useRouter();
  const [centeredBlock, setCenteredBlock] = useState<number | null>(0);
  const block1Ref = useRef<HTMLDivElement>(null);
  const block2Ref = useRef<HTMLDivElement>(null);
  const block3Ref = useRef<HTMLDivElement>(null);

  const { currentStep, isAutoScrolling } = useHeroAutoScroll({
    blockRefs: [block1Ref, block2Ref, block3Ref],
    initialDelay: 2000,
    moveDuration: 1200,
    pauseDuration: 2500,
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const videoCardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoCardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && isPlaying) {
          setIsPlaying(false);
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isPlaying]);

  const togglePlay = () => {
    const next = !isPlaying;
    setIsPlaying(next);
    if (videoRef.current) {
      if (next) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  };

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

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative border-b border-slate-200/80 hero-section pt-8 pb-14 lg:py-0">
      <div className="site-shell grid items-start gap-8 lg:gap-12 lg:grid-cols-12">
        {/* Left Column: Vertically centered in visible area under sticky navbar, and STICKY */}
        <div className="lg:col-span-6 lg:sticky lg:top-[68px] lg:h-[calc(100vh-68px)] lg:flex lg:flex-col lg:justify-center z-10">
          <div className="max-w-[560px]">
            <div className={`eyebrow mb-6 transition-all duration-500 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              For businesses that run on Tally, an ERP, or CargoWise
            </div>

            <h1 className={`text-4xl font-extrabold leading-[1.08] tracking-[-0.055em] text-slate-950 sm:text-5xl lg:text-6xl transition-all duration-500 ease-out delay-75 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              Grow the business,
              <br />
              not the data-entry desk.
            </h1>

            <p className={`mt-6 text-[15px] leading-7 text-slate-600 transition-all duration-500 ease-out delay-150 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              Bills read, checked, paid and posted to Tally. Emails become CargoWise jobs. Your team handles exceptions, not typing.
            </p>

            <div className={`mt-8 flex flex-wrap gap-3 transition-all duration-500 ease-out delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              <a
                href="/finance"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/finance');
                }}
                className="btn-arrow btn-arrow-blue cursor-pointer"
              >
                <span className="btn-arrow-label">Run a finance desk</span>
                <span className="btn-arrow-chip" aria-hidden="true">
                  <svg className="btn-arrow-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="8" x2="13" y2="8" />
                    <polyline points="9 4 13 8 9 12" />
                  </svg>
                </span>
              </a>
              <a
                href="/logistics"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/logistics');
                }}
                className="btn-arrow btn-arrow-teal cursor-pointer"
              >
                <span className="btn-arrow-label">Run the logistics desk</span>
                <span className="btn-arrow-chip" aria-hidden="true">
                  <svg className="btn-arrow-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="8" x2="13" y2="8" />
                    <polyline points="9 4 13 8 9 12" />
                  </svg>
                </span>
              </a>
            </div>

            <div className={`mt-9 flex flex-wrap items-center gap-6 text-[12px] font-semibold text-slate-500 transition-all duration-500 ease-out delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
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

        {/* Right Column: Scrolls normally with stacked blocks, each about 80-85vh tall and vertically centered */}
        <div className="relative lg:col-span-6 space-y-8 lg:space-y-0 lg:pb-36">
          {/* Subtle Ambient Radial Glow & Dotted Matrix Behind Right Column Stack */}
          <div className="pointer-events-none absolute inset-0 -inset-x-8 overflow-hidden opacity-60" aria-hidden="true">
            <div className="absolute top-1/4 right-0 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(232,234,251,0.85)_0%,rgba(225,243,238,0.4)_40%,transparent_70%)] blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(rgba(11,19,48,0.06)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_75%)]" />
          </div>

          {/* Block 1: Automated Processing Flow card */}
          <div
            ref={block1Ref}
            className="hero-perspective lg:min-h-[85vh] lg:flex lg:flex-col lg:justify-center py-6 lg:py-12"
          >
            <ProcessingFlowVisual isCentered={activeBlockIndex === 0} />
          </div>

          {/* Block 2: Vendor bills table card */}
          <div
            ref={block2Ref}
            className="hero-perspective lg:min-h-[85vh] lg:flex lg:flex-col lg:justify-center py-6 lg:py-12"
          >
            <FinanceDeskVisual isCentered={activeBlockIndex === 1} />
          </div>

          {/* Block 3: Video card */}
          <div
            ref={block3Ref}
            className="hero-perspective lg:min-h-[85vh] lg:flex lg:flex-col lg:justify-center py-6 lg:py-12"
          >
            <div className={`card-stack-3d w-full ${activeBlockIndex === 2 ? 'is-centered' : ''}`}>
              {/* 2 Faint Ghost Cards Behind Dark Card */}
              <div className="ghost-card-dark-1" aria-hidden="true" />
              <div className="ghost-card-dark-2" aria-hidden="true" />

              {/* Main 3D Video Card */}
              <div
                ref={videoCardRef}
                tabIndex={0}
                role="button"
                aria-label={isPlaying ? 'Pause product walkthrough video' : 'Play product walkthrough video'}
                onClick={togglePlay}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    togglePlay();
                  }
                }}
                className="main-card-3d-dark relative aspect-video w-full overflow-hidden flex flex-col items-center justify-center p-6 text-center text-white group cursor-pointer transition-all hover:border-brand-blue focus-visible:outline-2 focus-visible:outline-brand-blue"
              >
                {/* Looping video slot with playsInline, muted, preload */}
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  loop
                  preload="metadata"
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 pointer-events-none ${
                    isPlaying ? 'opacity-40' : 'opacity-0'
                  }`}
                />

                <div className="absolute inset-0 bg-radial from-brand-blue/20 to-transparent pointer-events-none" />

                {/* Animated ambient pulse waves when active */}
                {isPlaying && (
                  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(47,61,224,0.25)_0%,transparent_70%)] animate-pulse" />
                  </div>
                )}

                <div className="floating-badge-1 relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue text-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-blue-hover">
                  {isPlaying ? (
                    <Pause size={22} className="fill-white" />
                  ) : (
                    <Play size={22} className="ml-1 fill-white" />
                  )}
                  {isPlaying && (
                    <span className="absolute -inset-1 rounded-full border border-blue-400 animate-ping opacity-60" />
                  )}
                </div>

                <div className="relative mt-4">
                  <span className="floating-badge-2 text-xs font-bold tracking-wide uppercase text-blue-300 block font-mono">
                    [ Video Slot: Product Walkthrough (2 min) ]
                  </span>
                  <p className="mt-1 text-xs text-slate-300 max-w-sm">
                    {isPlaying
                      ? 'Live demo walkthrough active. Click or press space to pause.'
                      : 'Watch vendor invoices read, validated for GST, and posted to Tally Prime in real time.'}
                  </p>
                </div>

                {/* Bottom Video Progress Scrubber Bar */}
                <div className="absolute bottom-0 inset-x-0 bg-slate-900/85 px-4 py-2 flex items-center justify-between text-[9px] font-mono text-slate-400 border-t border-slate-800/80">
                  <span className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                    {isPlaying ? 'PLAYING' : 'READY'}
                  </span>
                  <div className="mx-3 flex-1 h-1 bg-slate-800 rounded-full overflow-hidden relative">
                    <div
                      className={`h-full bg-brand-blue transition-all duration-300 ${isPlaying ? 'w-2/5 animate-pulse' : 'w-0'}`}
                    />
                  </div>
                  <span>{isPlaying ? '0:24 / 2:00' : '0:00 / 2:00'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
