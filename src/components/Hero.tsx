'use client';
import React from 'react';
import { Play } from 'lucide-react';
import { useRouter } from '../lib/router';
import { HeroProductPanel } from './hero/HeroProductPanel';
import { HeroBackgroundVideo } from './hero/HeroBackgroundVideo';
import { VideoModal } from './video/VideoModal';
import { LoopVideo } from './video/LoopVideo';
import { videosConfig } from '../content/videos';

export const Hero: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <section className="relative border-b border-slate-200/80 hero-section pt-8 pb-14 lg:py-0 overflow-hidden group/hero">
      {/* Soft Ambient Radial Blue Glow behind Hero Container */}
      <div className="pointer-events-none absolute inset-0 -top-24 flex items-center justify-center overflow-hidden" aria-hidden="true">
        <div className="h-[640px] w-[960px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.09)_0%,rgba(16,185,129,0.04)_45%,transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      </div>

      {/* Hero Ambient Background Video (Pure-code generated, multiply blend) */}
      <HeroBackgroundVideo />

      <div className="site-shell relative z-10 grid items-start gap-8 lg:gap-12 lg:grid-cols-12">
        {/* Left Column: Vertically centered in visible area under sticky navbar, and STICKY */}
        <div className="lg:col-span-5 lg:sticky lg:top-[68px] lg:h-[calc(100vh-68px)] lg:flex lg:flex-col lg:justify-center z-10">
          <div className="max-w-[580px]">
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

            {/* Homepage Video Card Slot: VideoModal trigger with LoopVideo preview */}
            <div className="mt-6">
              <VideoModal
                config={videosConfig['hero-walkthrough']}
                trigger={
                  <div className="group flex items-center gap-3.5 rounded-xl border border-slate-200/90 bg-slate-50/70 p-2 pr-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)] hover:border-blue-400 hover:bg-blue-50/40 transition-all duration-200 cursor-pointer max-w-fit">
                    <div className="relative h-11 w-18 shrink-0 overflow-hidden rounded-lg border border-slate-700 bg-slate-900 shadow-xs">
                      <LoopVideo
                        config={videosConfig['hero-walkthrough']}
                        aspectRatio="16/9"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white shadow-xs group-hover:scale-110 transition-transform">
                          <Play size={10} className="translate-x-0.5 fill-white text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                        <span>Watch 2-Min Demo</span>
                        <span className="text-slate-300">·</span>
                        <span className="text-slate-500 font-normal">2:00</span>
                      </div>
                      <div className="text-xs font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                        See bills &amp; emails post autonomously
                      </div>
                    </div>
                  </div>
                }
              />
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-6 text-[12px] font-semibold text-slate-500">
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
          <HeroProductPanel />
        </div>
      </div>
    </section>
  );
};
