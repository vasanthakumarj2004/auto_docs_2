'use client';

import React, { useState, useEffect } from 'react';
import { Check, CheckCircle2, FileText, FileCheck2 } from 'lucide-react';
import { pipelineInvoice } from './mockData';

interface PipelineViewProps {
  isPaused?: boolean;
}

export const PipelineView: React.FC<PipelineViewProps> = ({ isPaused = false }) => {
  // Toggle between State A (AI Extractor) and State B (Tally Prime Synced)
  // Defaults to State B (Tally Prime Synced) matching the reference video/image
  const [isStateB, setIsStateB] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    if (isPaused || isHovered) return;
    const motionPref = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionPref.matches) return;

    const timer = setInterval(() => {
      if (!document.hidden) {
        setIsStateB((prev) => !prev);
      }
    }, 2600);

    return () => clearInterval(timer);
  }, [isPaused, isHovered]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full h-full flex flex-col justify-between select-none"
    >
      {/* 3-Column Interactive Node-Graph Canvas */}
      <div className="relative rounded-xl bg-[#FAFCFF] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:14px_14px] border border-slate-200/70 p-3 sm:p-4 min-h-[295px] grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-4 items-start">
        
        {/* Animated SVG Bezier Connectors Overlay (Desktop) */}
        <svg
          className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-10"
          viewBox="0 0 600 280"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="curveGrad1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <linearGradient id="curveGrad2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>

          {/* Curve 1: Step 01 Right Port -> Step 02 Left Port */}
          <path
            d="M 194 140 H 208"
            stroke="url(#curveGrad1)"
            strokeWidth="2.2"
            strokeDasharray="4 4"
            strokeLinecap="round"
          />
          {/* Flowing packet 1 */}
          <circle r="3" fill="#10b981">
            <animateMotion
              path="M 194 140 H 208"
              dur="1.4s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Curve 2: Step 02 Right Port -> Swooping down into Step 03 Bottom-Left Port */}
          <path
            d="M 392 140 C 404 140, 396 215, 404 215 C 409 215, 412 205, 415 195"
            stroke="url(#curveGrad2)"
            strokeWidth="2.2"
            strokeDasharray="4 4"
            strokeLinecap="round"
          />
          {/* Flowing packet 2 */}
          <circle r="3" fill="#10b981">
            <animateMotion
              path="M 392 140 C 404 140, 396 215, 404 215 C 409 215, 412 205, 415 195"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Curve 3: Direct upper connection into Step 03 */}
          <path
            d="M 392 140 C 400 140, 402 110, 412 110"
            stroke="url(#curveGrad2)"
            strokeWidth="1.8"
            strokeDasharray="3 3"
            strokeOpacity="0.4"
            strokeLinecap="round"
          />
        </svg>

        {/* ================= COLUMN 1: STEP 01 ================= */}
        <div className="md:col-span-4 flex flex-col">
          {/* Header directly on top of card */}
          <div className="mb-2.5">
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Step 01</span>
              <span className="bg-blue-50 text-blue-600 border border-blue-200 text-[9.5px] font-semibold px-2 py-0.5 rounded-md">
                01 Pipeline
              </span>
            </div>
            <h3 className="text-xs font-bold text-slate-900 leading-tight">Incoming bill</h3>
            <p className="text-[10px] text-slate-500">Email • PDF • Scan</p>
          </div>

          {/* Node Card */}
          <div className="relative rounded-xl bg-white border border-slate-200/90 shadow-sm p-3 min-h-[184px] flex flex-col justify-between">
            {/* Top row */}
            <div>
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-md bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center font-bold text-[9px] shrink-0">
                  <FileText size={12} className="stroke-[2.5]" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-800 truncate leading-tight">Apex Freight</div>
                  <div className="text-[9px] text-slate-400">INV-8492</div>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-medium">Invoice</span>
                <span className="text-xs font-extrabold text-slate-900 font-mono">{pipelineInvoice.totalAmount}</span>
              </div>
            </div>

            {/* Bottom status */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                <Check size={10} className="stroke-[3]" />
                Delivered
              </span>
              <span className="text-[9px] font-mono text-slate-400">{pipelineInvoice.fileSize}</span>
            </div>

            {/* Right Connection Port Dot */}
            <span
              className="hidden md:block h-2.5 w-2.5 rounded-full bg-blue-500 ring-4 ring-blue-100 absolute -right-1.25 top-1/2 -translate-y-1/2 z-20"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* ================= COLUMN 2: STEP 02 ================= */}
        <div className="md:col-span-4 flex flex-col">
          {/* Header directly on top of card */}
          <div className="mb-2.5">
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Step 02</span>
            </div>
            <h3 className="text-xs font-bold text-slate-900 leading-tight">Reading &amp; Check</h3>
            <p className="text-[10px] text-slate-500">Record-level Telemetry</p>
          </div>

          {/* Node Card */}
          <div className="relative rounded-xl bg-emerald-50/40 border border-emerald-300/80 shadow-sm p-3 min-h-[184px] flex flex-col justify-between">
            {/* Left Connection Port Dot */}
            <span
              className="hidden md:block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100 absolute -left-1.25 top-1/2 -translate-y-1/2 z-20"
              aria-hidden="true"
            />

            {/* Content */}
            <div>
              <div className="flex items-center justify-between">
                <span className="h-7 w-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <FileCheck2 size={15} />
                </span>
                <span className="text-slate-400 text-xs tracking-widest">•••</span>
              </div>

              <div className="mt-2.5">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  <Check size={13} className="text-emerald-600 stroke-[3]" />
                  No Duplicate
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Record-level Telemetry</div>
                <div className="text-[10px] font-mono text-emerald-700 font-semibold mt-1">99.8% confidence</div>
              </div>
            </div>

            {/* Bottom progress bar */}
            <div className="mt-2.5">
              <div className="h-1.5 w-full bg-emerald-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-4/5 rounded-full animate-pulse" />
              </div>
            </div>

            {/* Right Connection Port Dot */}
            <span
              className="hidden md:block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100 absolute -right-1.25 top-1/2 -translate-y-1/2 z-20"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* ================= COLUMN 3: STEP 03 (AUTO-MORPHING) ================= */}
        <div className="md:col-span-4 flex flex-col">
          {/* Header directly on top of card */}
          <div className="mb-2.5">
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Step 03</span>
              <span className="text-[9.5px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                Auto-sync
              </span>
            </div>
            <h3 className="text-xs font-bold text-slate-900 leading-tight">
              {isStateB ? 'Tally Prime Synced' : 'AI Extractor'}
            </h3>
            <p className="text-[10px] text-slate-500">
              {isStateB ? 'Voucher Generated' : 'Response Telemetry'}
            </p>
          </div>

          {/* Morphing Container — Both states mounted for SEO & CLS = 0 */}
          <div className="relative min-h-[184px]">
            {/* Ghost card layers for State B (matching reference) */}
            <div
              className={`absolute -inset-1 bg-slate-100 rounded-xl translate-y-1.5 translate-x-1 -z-10 border border-slate-200/70 shadow-xs transition-opacity duration-500 ${
                isStateB ? 'opacity-80' : 'opacity-0'
              }`}
              aria-hidden="true"
            />
            <div
              className={`absolute -inset-1 bg-slate-200/50 rounded-xl translate-y-3 translate-x-2 -z-20 border border-slate-300/50 shadow-xs transition-opacity duration-500 ${
                isStateB ? 'opacity-50' : 'opacity-0'
              }`}
              aria-hidden="true"
            />

            {/* STATE B: TALLY PRIME SYNCED (Active in reference screenshot) */}
            <div
              className={`rounded-xl bg-white border-2 border-emerald-400/80 shadow-md p-3 relative overflow-hidden transition-all duration-500 ease-out min-h-[184px] flex flex-col justify-between ${
                isStateB
                  ? 'opacity-100 scale-100 z-10 pointer-events-auto'
                  : 'opacity-0 scale-95 z-0 pointer-events-none absolute inset-0'
              }`}
            >
              {/* Left connection port for swooping curve */}
              <span
                className="hidden md:block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100 absolute -left-1.25 bottom-6 z-20"
                aria-hidden="true"
              />

              {/* Diagonal corner ribbon */}
              <div className="absolute -right-6 top-3 bg-emerald-500 text-white text-[8px] font-extrabold tracking-wider uppercase py-0.5 px-7 rotate-45 shadow-xs pointer-events-none">
                01 Pipeline
              </div>

              {/* Tally Header */}
              <div>
                <div className="flex items-center justify-between pr-4">
                  <div>
                    <span
                      className="text-xl font-black italic tracking-tight text-slate-800"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      Tally
                    </span>
                    <span className="text-[7.5px] font-bold italic text-slate-400 block -mt-1 font-serif tracking-wider">
                      POWER OF SIMPLICITY
                    </span>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-1.5 py-0.5 rounded-full inline-flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Synced
                  </span>
                </div>

                <div className="mt-1 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Tally Prime</span>
                  <span className="text-[10px] text-slate-500 font-mono">#VCH-8492</span>
                </div>

                {/* Sub-box: Auto-voucher created */}
                <div className="mt-2 px-2.5 py-1.5 rounded-lg bg-emerald-50/70 border border-emerald-200/80 text-[11px] font-semibold text-slate-800 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Auto-voucher created
                  </span>
                </div>
              </div>

              {/* Bottom Posted Button */}
              <button
                type="button"
                className="mt-2.5 w-full py-1.5 rounded-lg bg-[#10B981] hover:bg-emerald-600 text-white font-bold text-xs text-center shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Check size={13} className="stroke-[3]" />
                Posted
              </button>
            </div>

            {/* STATE A: AI EXTRACTOR (Morphs every ~2.5s) */}
            <div
              className={`rounded-xl bg-white border border-slate-200/90 shadow-md p-3 relative overflow-hidden transition-all duration-500 ease-out min-h-[184px] flex flex-col justify-between ${
                !isStateB
                  ? 'opacity-100 scale-100 z-10 pointer-events-auto'
                  : 'opacity-0 scale-95 z-0 pointer-events-none absolute inset-0'
              }`}
            >
              {/* Left connection port */}
              <span
                className="hidden md:block h-2.5 w-2.5 rounded-full bg-blue-500 ring-4 ring-blue-100 absolute -left-1.25 top-1/2 -translate-y-1/2 z-20"
                aria-hidden="true"
              />

              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">AI Extractor</h4>
                    <p className="text-[9.5px] text-slate-400">Response Telemetry</p>
                  </div>
                  <span className="bg-blue-50 text-blue-600 border border-blue-200 text-[9px] font-bold px-1.5 py-0.5 rounded">
                    Active
                  </span>
                </div>

                <div className="mt-2 p-2 rounded-lg bg-slate-50 border border-slate-200/80 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10.5px] font-semibold text-slate-700">Matched 2B</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[9.5px] font-bold px-1.5 py-0.2 rounded">
                      Verified
                    </span>
                  </div>
                  <div className="text-[9.5px] font-mono text-slate-500">Timestamp: 3.2ms</div>
                </div>

                <div className="mt-1.5 p-2 rounded-lg bg-emerald-50/50 border border-emerald-200/80 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10.5px] font-semibold text-slate-700">GST Portal Match</span>
                    <span className="bg-emerald-500 text-white text-[9.5px] font-bold px-1.5 py-0.2 rounded">
                      Verified
                    </span>
                  </div>
                  <div className="text-[9.5px] font-mono text-slate-600">Status: 04:20 · 100% Tax Math</div>
                </div>
              </div>

              <div className="mt-2 w-full py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 font-semibold text-[11px] text-center">
                Ready for Sync
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ================= DOCKED FOOTER TELEMETRY CARDS ================= */}
      <div className="mt-3 flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 relative">
        {/* Left Card: Apex Freight */}
        <div className="flex-1 w-full rounded-xl bg-white border border-slate-200/90 p-2.5 shadow-xs flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <FileText size={14} className="stroke-[2.5]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-slate-900 truncate">Apex Freight</div>
            <div className="text-[9.5px] text-slate-500 truncate">142 KB · Scan from CargoWise</div>
          </div>
        </div>

        {/* Center Indicator Arrow */}
        <span className="text-slate-400 text-xs font-bold hidden sm:block shrink-0" aria-hidden="true">
          →
        </span>

        {/* Right Card: Post-XML */}
        <div className="flex-1 w-full rounded-xl bg-white border border-slate-200/90 p-2.5 shadow-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-7 w-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 size={16} />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900">Post-XML</div>
              <div className="text-[9.5px] text-slate-400">Posted</div>
            </div>
          </div>

          <div className="w-18 sm:w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden shrink-0">
            <div className="h-full bg-emerald-500 w-full rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
