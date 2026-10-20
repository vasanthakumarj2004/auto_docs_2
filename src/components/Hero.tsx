'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Activity, TableProperties, Video } from 'lucide-react';
import { FinanceDeskVisual } from './FinanceDeskVisual';
import { ProcessingFlowVisual } from './ProcessingFlowVisual';
import { useRouter } from '../lib/router';

export const Hero: React.FC = () => {
  const { navigate } = useRouter();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  // Auto-cycle timer with progress bar
  useEffect(() => {
    if (isPaused) return;

    const intervalMs = 50;
    const cycleDurationMs = 6000;
    const stepIncrement = (intervalMs / cycleDurationMs) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveTab((cur) => (cur + 1) % 3);
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPaused, activeTab]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    setProgress(0);
    setIsPaused(true);
  };

  // Walkthrough video controls
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeChapter, setActiveChapter] = useState<number>(0);
  const videoCardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const chapters = [
    { label: '00:00 PDF Capture', offset: 0 },
    { label: '00:45 GST Check', offset: 37.5 },
    { label: '01:20 Tally Post', offset: 66.7 },
  ];

  return (
    <section className="relative border-b border-slate-200/80 hero-section pt-8 pb-14 lg:py-0 overflow-hidden">
      {/* Soft Ambient Radial Blue Glow behind Hero Container */}
      <div className="pointer-events-none absolute inset-0 -top-24 flex items-center justify-center overflow-hidden" aria-hidden="true">
        <div className="h-[640px] w-[960px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.09)_0%,rgba(16,185,129,0.04)_45%,transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      </div>

      <div className="site-shell relative z-10 grid items-start gap-8 lg:gap-12 lg:grid-cols-12">
        {/* Left Column: Vertically centered in visible area under sticky navbar, and STICKY */}
        <div className="lg:col-span-5 lg:sticky lg:top-[68px] lg:h-[calc(100vh-68px)] lg:flex lg:flex-col lg:justify-center z-10">
          <div className="max-w-[540px]">
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
              <a
                href="/finance"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/finance');
                }}
                className="group btn-arrow btn-arrow-blue cursor-pointer"
              >
                <span className="btn-arrow-label">Run a finance desk</span>
                <span className="btn-arrow-chip" aria-hidden="true">
                  <svg className="btn-arrow-icon group-hover:translate-x-0.5 transition-transform duration-200" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
                className="group btn-arrow btn-arrow-teal cursor-pointer"
              >
                <span className="btn-arrow-label">Run the logistics desk</span>
                <span className="btn-arrow-chip" aria-hidden="true">
                  <svg className="btn-arrow-icon group-hover:translate-x-0.5 transition-transform duration-200" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="8" x2="13" y2="8" />
                    <polyline points="9 4 13 8 9 12" />
                  </svg>
                </span>
              </a>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-6 text-[12px] font-semibold text-slate-500">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Built around your approvals
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                No rip-and-replace
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Unified Enterprise Telemetry Console Frame */}
        <div className="lg:col-span-7 py-4 lg:py-10">
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="group/console relative rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-sm shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_36px_-6px_rgba(15,23,42,0.08),inset_0_1px_0_0_rgba(255,255,255,0.9)] hover:border-blue-300/80 hover:shadow-[0_16px_40px_-8px_rgba(37,99,235,0.12)] transition-all duration-300 overflow-hidden"
          >
            {/* Top Segmented Control Tab Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200/80 bg-slate-50/90 px-3 py-2 sm:px-4 sm:py-2.5 gap-2">
              <div className="inline-flex rounded-xl bg-slate-200/60 p-1 text-[11px] font-semibold" role="tablist" aria-label="Console modes">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 0}
                  onClick={() => handleTabClick(0)}
                  suppressHydrationWarning
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[11px] tracking-tight transition-all cursor-pointer ${
                    activeTab === 0
                      ? 'bg-white text-blue-700 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Activity size={12} className={activeTab === 0 ? 'text-blue-600' : 'text-slate-400'} />
                  <span>Live Pipeline</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 1}
                  onClick={() => handleTabClick(1)}
                  suppressHydrationWarning
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[11px] tracking-tight transition-all cursor-pointer ${
                    activeTab === 1
                      ? 'bg-white text-blue-700 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <TableProperties size={12} className={activeTab === 1 ? 'text-blue-600' : 'text-slate-400'} />
                  <span>Finance Bill Queue</span>
                  <span className="rounded bg-slate-200/80 px-1.5 py-0.2 text-[9px] text-slate-700 font-bold">24</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 2}
                  onClick={() => handleTabClick(2)}
                  suppressHydrationWarning
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[11px] tracking-tight transition-all cursor-pointer ${
                    activeTab === 2
                      ? 'bg-white text-blue-700 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Video size={12} className={activeTab === 2 ? 'text-blue-600' : 'text-slate-400'} />
                  <span>2-Min Walkthrough</span>
                </button>
              </div>

              {/* Status pill right side */}
              <div className="hidden md:flex items-center gap-2">
                <span className="font-mono text-[10px] text-slate-400 tracking-tight flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Auto-sync telemetry
                </span>
              </div>
            </div>

            {/* Subtle Progress Bar Under Tabs */}
            <div className="h-0.5 w-full bg-slate-100 overflow-hidden" aria-hidden="true">
              <div
                className="h-full bg-brand-blue transition-[width] duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Console Content Body - All 3 modes stay rendered in DOM for SEO (CLS = 0) */}
            <div className="relative p-3 sm:p-5 min-h-[440px] flex flex-col justify-center">
              {/* Tab 1: Live Pipeline */}
              <div
                className={`transition-opacity duration-300 ${
                  activeTab === 0
                    ? 'opacity-100 relative z-10'
                    : 'opacity-0 absolute inset-3 sm:inset-5 pointer-events-none -z-10'
                }`}
              >
                <ProcessingFlowVisual isCentered={activeTab === 0} />
              </div>

              {/* Tab 2: Finance Bill Queue */}
              <div
                className={`transition-opacity duration-300 ${
                  activeTab === 1
                    ? 'opacity-100 relative z-10'
                    : 'opacity-0 absolute inset-3 sm:inset-5 pointer-events-none -z-10'
                }`}
              >
                <FinanceDeskVisual isCentered={activeTab === 1} />
              </div>

              {/* Tab 3: 2-Min Walkthrough Frame */}
              <div
                className={`transition-opacity duration-300 ${
                  activeTab === 2
                    ? 'opacity-100 relative z-10'
                    : 'opacity-0 absolute inset-3 sm:inset-5 pointer-events-none -z-10'
                }`}
              >
                <div className="w-full">
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
                    suppressHydrationWarning
                    className="relative aspect-video w-full rounded-xl overflow-hidden flex flex-col items-center justify-center p-6 text-center text-white group cursor-pointer bg-[#0B1120] border border-slate-800 shadow-2xl transition-all hover:border-brand-blue focus-visible:outline-2 focus-visible:outline-brand-blue"
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

                    {/* Radial Ambient Glow */}
                    <div className="absolute inset-0 bg-radial from-brand-blue/20 to-transparent pointer-events-none" />

                    {/* Animated ambient pulse waves when active */}
                    {isPlaying && (
                      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(47,61,224,0.25)_0%,transparent_70%)] animate-pulse" />
                      </div>
                    )}

                    {/* Play Trigger */}
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue text-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-blue-hover">
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
                      <span className="font-mono text-xs font-bold tracking-wide uppercase text-blue-300 block">
                        [ Video Slot: Product Walkthrough (2 min) ]
                      </span>
                      <p className="mt-1 text-xs text-slate-300 max-w-sm">
                        {isPlaying
                          ? 'Live demo walkthrough active. Click or press space to pause.'
                          : 'Watch vendor invoices read, validated for GST, and posted to Tally Prime in real time.'}
                      </p>
                    </div>

                    {/* Interactive Chapter Markers */}
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-3 inset-x-4 flex items-center justify-between pointer-events-auto"
                    >
                      <div className="flex items-center gap-1.5 font-mono text-[9px] text-slate-300">
                        {chapters.map((ch, idx) => (
                          <button
                            key={ch.label}
                            type="button"
                            suppressHydrationWarning
                            onClick={() => {
                              setActiveChapter(idx);
                              if (!isPlaying) togglePlay();
                            }}
                            className={`rounded px-2 py-0.5 border transition-all cursor-pointer ${
                              activeChapter === idx
                                ? 'bg-blue-600/80 border-blue-400 text-white font-bold'
                                : 'bg-slate-900/60 border-slate-700/60 text-slate-400 hover:text-white'
                            }`}
                          >
                            {ch.label}
                          </button>
                        ))}
                      </div>
                      <span className="font-mono text-[9px] text-slate-400">1080p HD</span>
                    </div>

                    {/* Bottom Video Progress Scrubber Bar */}
                    <div className="absolute bottom-0 inset-x-0 bg-slate-900/90 px-4 py-2.5 flex items-center justify-between text-[9px] font-mono text-slate-400 border-t border-slate-800/80">
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
        </div>
      </div>
    </section>
  );
};
