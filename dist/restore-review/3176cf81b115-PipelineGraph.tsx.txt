'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Check, FileText, Sparkles, CheckCircle2 } from 'lucide-react';
import { pipelineInvoice } from './mockData';

interface PipelineGraphProps {
  isPaused?: boolean;
  onStateChange?: (isPosted: boolean) => void;
}

export const PipelineGraph: React.FC<PipelineGraphProps> = ({
  isPaused = false,
  onStateChange,
}) => {
  // Master Clock time in seconds: t in [0.00, 5.50]
  const [time, setTime] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // SVG Paths references to compute getPointAtLength(s)
  const incomingPathRef = useRef<SVGPathElement>(null);
  const elbowPathRef = useRef<SVGPathElement>(null);

  // Pulse head coordinates
  const [incomingPulse, setIncomingPulse] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0,
    y: 342,
    visible: false,
  });
  const [elbowPulse, setElbowPulse] = useState<{ x: number; y: number; visible: boolean }>({
    x: 583,
    y: 195,
    visible: false,
  });

  const LOOP_DURATION = 5.5; // 5.50s master cycle

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setReducedMotion(true);
      setTime(4.2); // Static State B at t = 4.2s
      if (process.env.NODE_ENV !== 'production') {
        console.info('[PipelineGraph] Reduced motion active: holding static State B at t=4.2s');
      }
    }
  }, []);

  // Master Clock requestAnimationFrame loop
  useEffect(() => {
    if (reducedMotion || isPaused || isHovered) return;

    let animId: number;
    let startTime = performance.now() - time * 1000;

    const tick = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const t = elapsed % LOOP_DURATION;
      setTime(t);

      // Notify parent on State B (Posted) transition
      if (onStateChange) {
        onStateChange(t >= 3.55 && t <= 5.2);
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [reducedMotion, isPaused, isHovered, onStateChange, time]);

  // Compute pulse positions using getPointAtLength
  useEffect(() => {
    // 1. Incoming Pulse: active during t in [0.30, 0.90]
    if (time >= 0.3 && time <= 0.9 && incomingPathRef.current) {
      const path = incomingPathRef.current;
      const totalLen = path.getTotalLength();
      // Ease in-out factor
      const progress = (time - 0.3) / 0.6;
      const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      const pt = path.getPointAtLength(eased * totalLen);
      setIncomingPulse({ x: pt.x, y: pt.y, visible: true });
    } else {
      setIncomingPulse((prev) => (prev.visible ? { ...prev, visible: false } : prev));
    }

    // 2. Elbow Pulse: active during t in [2.20, 3.20]
    if (time >= 2.2 && time <= 3.2 && elbowPathRef.current) {
      const path = elbowPathRef.current;
      const totalLen = path.getTotalLength();
      const progress = (time - 2.2) / 1.0;
      const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      const pt = path.getPointAtLength(eased * totalLen);
      setElbowPulse({ x: pt.x, y: pt.y, visible: true });
    } else {
      setElbowPulse((prev) => (prev.visible ? { ...prev, visible: false } : prev));
    }
  }, [time]);

  // Derived animation states
  // Node 2 states
  const isInputDotActive = time >= 0.9 && time <= 2.2;
  const isScanActive = time >= 0.3 && time <= 1.5;
  const scanSweepPercent = Math.min(100, Math.max(15, ((time - 0.3) / 1.2) * 100));
  const isOutputPillActive = time >= 1.5 && time <= 2.2;

  // Connector states
  const isElbowActive = time >= 1.5 && time <= 3.2;

  // Node 3 states
  const isRingNodeActive = time >= 2.9 && time <= 4.0;
  const chipMatched2B = time >= 2.4 || (time >= 3.6 && time <= 5.2);
  const chipVerified = time >= 2.7 || (time >= 3.6 && time <= 5.2);
  const progressFill = time < 2.2 ? 41 : Math.min(100, 41 + ((time - 2.2) / 0.8) * 59);

  // Morph state: State A flips out at 3.20s, State B flips in at 3.55s
  const isStateB = time >= 3.55 && time <= 5.2;
  const isFlipping = time >= 3.2 && time < 3.55;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-full select-none flex flex-col justify-between"
      style={{ minHeight: '340px' }}
    >
      {/* ================= SVG CONNECTOR LAYER BEHIND NODES ================= */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 1000 470"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          {/* Arrowhead marker for Link 1 */}
          <marker
            id="arrowhead"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 2 L 8 5 L 0 8 z" fill="#a9c9bd" />
          </marker>
        </defs>

        {/* 1. Incoming Path: Left edge (y=342) up into Node 2 input (332, 195) */}
        <path
          ref={incomingPathRef}
          d="M 0 342 H 215 C 290 342, 262 195, 332 195"
          stroke={incomingPulse.visible ? '#1f9d55' : '#a9c9bd'}
          strokeWidth={incomingPulse.visible ? '2.5' : '1.5'}
          strokeLinecap="round"
          className="transition-colors duration-200"
        />
        {incomingPulse.visible && (
          <path
            d="M 0 342 H 215 C 290 342, 262 195, 332 195"
            stroke="#10b981"
            strokeWidth="6"
            strokeOpacity="0.25"
            strokeLinecap="round"
          />
        )}

        {/* 2. Link 1: Straight from Node 1 (223, 195) to Node 2 (332, 195) */}
        <line
          x1="223"
          y1="195"
          x2="330"
          y2="195"
          stroke="#a9c9bd"
          strokeWidth="1.5"
          strokeLinecap="round"
          markerEnd="url(#arrowhead)"
        />
        {/* Capsule Port at x=250 */}
        <rect
          x="244"
          y="190"
          width="12"
          height="10"
          rx="5"
          fill="#ffffff"
          stroke="#a9c9bd"
          strokeWidth="1.2"
        />

        {/* 3. Elbow Connector: Node 2 output (583, 195) to Node 3 ring node (645, 358) */}
        <path
          ref={elbowPathRef}
          d="M 583 195 H 600 Q 612 195 612 207 V 340 Q 612 358 630 358 H 645"
          stroke={isElbowActive ? '#1f9d55' : '#a9c9bd'}
          strokeWidth={isElbowActive ? '2.5' : '1.5'}
          strokeLinecap="round"
          className="transition-colors duration-200"
        />
        {isElbowActive && (
          <path
            d="M 583 195 H 600 Q 612 195 612 207 V 340 Q 612 358 630 358 H 645"
            stroke="#10b981"
            strokeWidth="6"
            strokeOpacity="0.25"
            strokeLinecap="round"
          />
        )}

        {/* Pulse Heads with White Core & Green Glow */}
        {incomingPulse.visible && (
          <g transform={`translate(${incomingPulse.x}, ${incomingPulse.y})`}>
            <circle r="10" fill="#10b981" fillOpacity="0.5" />
            <circle r="4" fill="#ffffff" />
          </g>
        )}
        {elbowPulse.visible && (
          <g transform={`translate(${elbowPulse.x}, ${elbowPulse.y})`}>
            <circle r="10" fill="#10b981" fillOpacity="0.5" />
            <circle r="4" fill="#ffffff" />
          </g>
        )}

        {/* Node 2 Input Dot at (332, 195) */}
        <g transform="translate(332, 195)">
          {isInputDotActive && (
            <circle r="12" fill="#10b981" fillOpacity="0.3" className="animate-ping" />
          )}
          <circle
            r="4.5"
            fill={isInputDotActive ? '#1f9d55' : '#ffffff'}
            stroke={isInputDotActive ? '#1f9d55' : '#a9c9bd'}
            strokeWidth="1.5"
          />
        </g>

        {/* Node 2 Output Pill Port at (583, 195) */}
        <rect
          x="575"
          y="190"
          width="16"
          height="10"
          rx="5"
          fill={isOutputPillActive ? '#1f9d55' : '#ffffff'}
          stroke={isOutputPillActive ? '#1f9d55' : '#a9c9bd'}
          strokeWidth="1.5"
          className="transition-colors duration-200"
        />

        {/* Node 3 Ring Node Port at (645, 358) */}
        <g transform="translate(645, 358)">
          {isRingNodeActive && (
            <circle r="14" fill="#10b981" fillOpacity="0.35" className="animate-ping" />
          )}
          <circle
            r="7"
            fill={isRingNodeActive ? '#1f9d55' : '#ffffff'}
            stroke={isRingNodeActive ? '#1f9d55' : '#a9c9bd'}
            strokeWidth="1.8"
          />
          <circle
            r="3"
            fill={isRingNodeActive ? '#ffffff' : '#a9c9bd'}
          />
        </g>
      </svg>

      {/* ================= 3-COLUMN INTERACTIVE NODES GRID ================= */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-4 items-start w-full h-full">

        {/* ================= NODE 1: STEP 01 (Incoming bill) ================= */}
        <div className="md:col-span-4 flex flex-col justify-between h-full">
          {/* Header */}
          <div className="mb-2">
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Step 01</span>
              <span className="bg-[#ede9fe] text-[#6d28d9] border border-[#ddd6fe] text-[9.5px] font-semibold px-2 py-0.5 rounded-md">
                Ingestion
              </span>
            </div>
            <h3 className="text-xs font-bold text-slate-900 leading-tight">Incoming bill</h3>
            <p className="text-[10px] text-slate-500">Email • PDF • Scan</p>
          </div>

          {/* Invoice Card */}
          <div className="rounded-xl bg-white border border-slate-200/90 shadow-xs p-3 min-h-[190px] flex flex-col justify-between">
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

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-medium">Invoice</span>
                <span className="text-xs font-extrabold text-slate-900 font-mono">{pipelineInvoice.totalAmount}</span>
              </div>

              {/* Placeholder preview lines */}
              <div className="mt-2 space-y-1.5 opacity-60">
                <div className="h-1.5 w-3/4 bg-slate-200 rounded-full" />
                <div className="h-1.5 w-1/2 bg-slate-200 rounded-full" />
              </div>
            </div>

            {/* Bottom Captured status */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                <Check size={10} className="stroke-[3]" />
                Captured
              </span>
              <span className="text-[9px] font-mono text-slate-400">27AAB...</span>
            </div>
          </div>
        </div>

        {/* ================= NODE 2: STEP 02 (Reading & Check) ================= */}
        <div className="md:col-span-4 flex flex-col justify-between h-full">
          {/* Header */}
          <div className="mb-2">
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Step 02</span>
            </div>
            <h3 className="text-xs font-bold text-slate-900 leading-tight">Reading &amp; Check</h3>
            <p className="text-[10px] text-slate-500">Zero manual keying</p>
          </div>

          {/* Node Card with Green Tint Inset */}
          <div className="relative rounded-xl bg-white border border-emerald-200/90 shadow-xs p-3 min-h-[190px] flex flex-col justify-between overflow-hidden">
            {/* Top Info */}
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  No Duplicate
                </div>
                <span className="text-slate-400 text-xs tracking-widest">•••</span>
              </div>

              {/* Inset Green Card with AI Extractor and Glow Sheen */}
              <div className="mt-2.5 p-2 rounded-lg bg-emerald-50/70 border border-emerald-200/80 relative overflow-hidden">
                {isScanActive && (
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent transition-all duration-300 pointer-events-none"
                    style={{ width: '40%', transform: `translateX(${scanSweepPercent * 2}%)` }}
                  />
                )}
                <div className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                    <Sparkles size={12} />
                  </span>
                  <div>
                    <div className="text-[11px] font-bold text-slate-900 leading-tight">AI Extractor</div>
                    <div className="text-[9px] text-slate-500">Reading fields</div>
                  </div>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between text-[10px]">
                <span className="text-slate-500">Confidence</span>
                <span className="font-mono font-bold text-emerald-700">99.8%</span>
              </div>
            </div>

            {/* Bottom Reading Progress Bar */}
            <div className="mt-2 pt-2 border-t border-slate-100">
              <div className="h-1.5 w-full bg-emerald-100/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-200"
                  style={{ width: `${scanSweepPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= NODE 3: STEP 03 (AUTO-MORPHING A ↔ B) ================= */}
        <div className="md:col-span-4 flex flex-col justify-between h-full">
          {/* Header */}
          <div className="mb-2">
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

          {/* Morph Container with 3D Flip */}
          <div className="relative min-h-[190px] [perspective:1000px]">

            {/* Ghost stack layers for State B */}
            <div
              className={`absolute -inset-1 bg-slate-100 rounded-xl translate-y-1.5 translate-x-1 -z-10 border border-slate-200/70 shadow-2xs transition-opacity duration-300 ${
                isStateB ? 'opacity-80' : 'opacity-0'
              }`}
              aria-hidden="true"
            />
            <div
              className={`absolute -inset-1 bg-slate-200/50 rounded-xl translate-y-3 translate-x-2 -z-20 border border-slate-300/50 shadow-2xs transition-opacity duration-300 ${
                isStateB ? 'opacity-50' : 'opacity-0'
              }`}
              aria-hidden="true"
            />

            {/* ---------------- STATE A: AI EXTRACTOR ---------------- */}
            <div
              className={`rounded-xl bg-white border border-slate-200/90 shadow-xs p-3 min-h-[190px] flex flex-col justify-between transition-all duration-350 ease-out absolute inset-0 ${
                !isStateB
                  ? 'opacity-100 rotate-y-0 scale-100 z-10 pointer-events-auto'
                  : 'opacity-0 rotate-y-90 scale-95 z-0 pointer-events-none'
              }`}
            >
              {/* 3px Green Accent Bar on Left Edge */}
              <div className="absolute left-0 top-3 bottom-3 w-[3px] bg-[#10b981] rounded-r" />

              <div>
                <div className="flex items-center justify-between pl-1">
                  <span className="text-xs font-bold text-slate-900">AI Extractor</span>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-bold px-1.5 py-0.5 rounded">
                    Done
                  </span>
                </div>
                <div className="text-[9.5px] text-slate-400 pl-1 mt-0.5">Reading telemetry</div>

                {/* Checks chips */}
                <div className="mt-2.5 flex flex-wrap gap-1 pl-1">
                  <span
                    className={`text-[9px] font-semibold px-1.5 py-0.5 rounded transition-all duration-200 ${
                      chipMatched2B ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-50 text-slate-400'
                    }`}
                  >
                    Matched 2B
                  </span>
                  <span
                    className={`text-[9px] font-semibold px-1.5 py-0.5 rounded transition-all duration-200 ${
                      chipVerified ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-50 text-slate-400'
                    }`}
                  >
                    Verified
                  </span>
                </div>

                {/* Timestamp & Progress */}
                <div className="mt-2.5 pl-1">
                  <div className="flex items-center justify-between text-[9px] text-slate-400 mb-1">
                    <span>Timestamp</span>
                    <span className="font-mono text-slate-600 font-bold">4.2s</span>
                  </div>
                  <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-200"
                      style={{ width: `${progressFill}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Tags */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[9px] pl-1">
                <span className="text-emerald-700 font-semibold">3-way ✓</span>
                <span className="text-slate-400">18% IGST</span>
              </div>
            </div>

            {/* ---------------- STATE B: TALLY PRIME SYNCED ---------------- */}
            <div
              className={`rounded-xl bg-white border-2 border-emerald-400/80 shadow-md p-3 min-h-[190px] flex flex-col justify-between transition-all duration-350 ease-out relative overflow-hidden ${
                isStateB
                  ? 'opacity-100 rotate-y-0 scale-100 z-10 pointer-events-auto'
                  : 'opacity-0 -rotate-y-90 scale-95 z-0 pointer-events-none'
              }`}
            >
              {/* 3px Green Accent Bar on Left Edge */}
              <div className="absolute left-0 top-3 bottom-3 w-[3px] bg-[#10b981] rounded-r" />

              {/* Diagonal Ribbon */}
              <div className="absolute -right-6 top-2.5 bg-[#10b981] text-white text-[7.5px] font-extrabold tracking-wider uppercase py-0.5 px-6 rotate-45 shadow-xs pointer-events-none">
                01 Pipeline
              </div>

              <div>
                <div className="flex items-center justify-between pr-4 pl-1">
                  <span className="text-sm font-black italic tracking-tight text-slate-800 font-serif">
                    Tally Prime
                  </span>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-bold px-1.5 py-0.5 rounded-full inline-flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Synced
                  </span>
                </div>

                <div className="mt-1 flex items-center gap-1.5 text-[10px] font-semibold text-slate-700 pl-1">
                  <CheckCircle2 size={12} className="text-emerald-600" />
                  Auto-voucher created
                </div>

                {/* Sub-box with voucher ID */}
                <div className="mt-2 px-2 py-1 rounded-md bg-emerald-50/70 border border-emerald-200/80 text-[9.5px] font-mono text-slate-700 pl-1">
                  #PUR-8492 · Freight In · #89283
                </div>
              </div>

              {/* Bottom Posted Button Bar */}
              <div className="mt-2 w-full py-1.5 rounded-lg bg-[#10B981] text-white font-bold text-xs text-center shadow-[0_4px_12px_rgba(16,185,129,0.3)] flex items-center justify-center gap-1.5">
                <Check size={13} className="stroke-[3]" />
                <span>Posted</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
