import React from 'react';
import { CountUp } from './CountUp';
import { 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Mail, 
  Database,
  ScanLine
} from 'lucide-react';

interface ProcessingFlowVisualProps {
  isCentered?: boolean;
}

export const ProcessingFlowVisual: React.FC<ProcessingFlowVisualProps> = ({ isCentered = false }) => {
  return (
    <div className={`card-stack-3d w-full ${isCentered ? 'is-centered' : ''}`}>
      {/* 2 Faint Ghost Cards Behind for 3D Layered Depth */}
      <div className="ghost-card-1" aria-hidden="true" />
      <div className="ghost-card-2" aria-hidden="true" />

      {/* Main 3D Card Container */}
      <div className="main-card-3d overflow-hidden">
        {/* Card Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-200/90 bg-slate-50/90 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2 text-[11px] font-extrabold text-slate-900">
            <span className="brand-mark h-4 w-4 rounded text-[8px] flex items-center justify-center font-bold">A</span>
            <span>Automated Processing Flow</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="floating-badge-1 flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-2.5 py-0.5 text-[9px] font-bold text-violet-700 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" />
              Live Pipeline
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-3.5 sm:p-4.5">
          {/* 3-Step Horizontal Flow Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 sm:gap-2.5">
            
            {/* ================= STEP 01: 3D INCOMING BILL BOX ================= */}
            <div className="relative group/step1 flex flex-col rounded-xl border border-slate-200/90 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/60 p-3 shadow-xs transition-all duration-300 hover:shadow-md hover:border-violet-300">
              {/* Step Header */}
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] font-bold uppercase text-slate-400 font-mono tracking-wider">
                  Step 01
                </span>
                <span className="flex items-center gap-1 rounded bg-violet-50 px-1.5 py-0.5 text-[8px] font-semibold text-violet-700 border border-violet-100/80">
                  <Mail size={9} /> Ingestion
                </span>
              </div>

              {/* Step Title & Subtitle */}
              <div className="mb-2.5">
                <div className="text-[11.5px] font-extrabold text-slate-900 leading-tight">Incoming bill</div>
                <div className="text-[9.5px] text-slate-500">Email • PDF • Scan</div>
              </div>

              {/* 3D Realistic Layered Document Graphic with True Isometric Depth */}
              <div className="relative mt-auto pt-2 pb-0.5">
                {/* Secondary Ghost Document Behind (Tilted 3D Paper Sheet) */}
                <div 
                  className="absolute inset-x-1.5 -top-1 h-[106px] rounded-lg border border-slate-200/70 bg-gradient-to-b from-slate-100 to-slate-200/80 shadow-2xs transition-transform duration-300 pointer-events-none" 
                  style={{
                    transform: 'perspective(500px) rotateY(-8deg) rotateX(6deg) translateZ(-10px) translateX(-4px) translateY(-3px)',
                  }}
                  aria-hidden="true" 
                />

                {/* Primary 3D Realistic Bill / Invoice Sheet */}
                <div 
                  className="relative z-10 rounded-lg border border-slate-200/90 bg-white p-2 shadow-[0_10px_22px_-5px_rgba(11,19,48,0.14),0_3px_6px_-2px_rgba(11,19,48,0.06)] transition-all duration-300 group-hover/step1:shadow-[0_16px_28px_-6px_rgba(139,50,247,0.22)]"
                  style={{
                    transform: 'perspective(500px) rotateY(-5deg) rotateX(4deg) translateZ(8px)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Document Header with PDF Tag */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                    <div className="flex items-center gap-1 overflow-hidden">
                      <span className="flex h-3.5 items-center gap-0.5 px-1 rounded bg-rose-500 text-[7.5px] font-black text-white shadow-2xs">
                        <FileText size={7.5} /> PDF
                      </span>
                      <span className="font-mono text-[9px] font-bold text-slate-800 truncate">
                        INV-8492.pdf
                      </span>
                    </div>
                    <span className="text-[7.5px] font-medium text-slate-400 font-mono shrink-0">
                      142 KB
                    </span>
                  </div>

                  {/* Simulated Invoice Rows & Values */}
                  <div className="mt-1.5 space-y-1">
                    <div className="flex items-center justify-between text-[8px]">
                      <span className="text-slate-600 truncate max-w-[70px] font-medium">Apex Freight</span>
                      <span className="font-mono font-bold text-slate-950">₹1,42,800</span>
                    </div>

                    {/* Skeleton lines representing bill line-items */}
                    <div className="flex items-center gap-1">
                      <div className="h-1 w-1/2 rounded-full bg-slate-200" />
                      <div className="h-1 w-1/4 rounded-full bg-slate-100" />
                      <div className="h-1 w-1/4 rounded-full bg-slate-200" />
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-1 w-1/3 rounded-full bg-slate-100" />
                      <div className="h-1 w-2/3 rounded-full bg-slate-200" />
                    </div>
                  </div>

                  {/* Floating 3D Capture Pill */}
                  <div className="mt-2 flex items-center justify-between pt-1 border-t border-slate-100/90 text-[7.5px]">
                    <span className="flex items-center gap-1 font-bold text-violet-600">
                      <span className="h-1 w-1 rounded-full bg-violet-500 animate-ping" />
                      Captured
                    </span>
                    <span className="font-mono text-slate-400">27AAB...</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Connecting Arrow 1 with Animated SVG Data Pulse */}
            <div className="hidden md:flex flex-col items-center justify-center px-1">
              <svg width="42" height="18" viewBox="0 0 42 18" className="overflow-visible" aria-hidden="true">
                <line x1="2" y1="9" x2="34" y2="9" stroke="#E0CAFE" strokeWidth="2" strokeDasharray="3 3" />
                <polygon points="34,5 42,9 34,13" fill="#8B32F7" />
                <circle r="3" fill="#8B32F7">
                  <animateMotion path="M 2,9 L 34,9" dur="1.8s" repeatCount="indefinite" />
                </circle>
              </svg>
              <span className="text-[7.5px] font-bold text-[#8B32F7] font-mono mt-0.5 uppercase tracking-tighter">OCR·PARSE</span>
            </div>

            {/* ================= STEP 02: 3D READING / GST-CHECK BOX ================= */}
            <div className="relative group/step2 flex flex-col rounded-xl border border-violet-200 bg-gradient-to-b from-violet-50/40 via-white to-violet-50/40 p-3 shadow-xs transition-all duration-300 hover:shadow-md hover:border-violet-500">
              {/* Step Header */}
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] font-bold uppercase text-violet-700 font-mono tracking-wider">
                  Step 02
                </span>
                <span className="flex items-center gap-1 rounded bg-[#8B32F7] text-white px-1.5 py-0.5 text-[8px] font-bold shadow-2xs">
                  <Sparkles size={8} /> <CountUp end={99.8} decimals={1} suffix="%" /> Match
                </span>
              </div>

              {/* Step Title & Subtitle */}
              <div className="mb-2.5">
                <div className="text-[11.5px] font-extrabold text-slate-900 leading-tight">
                  Reading & Check
                </div>
                <div className="text-[9.5px] text-violet-700 font-semibold">Zero manual keying</div>
              </div>

              {/* 3D Active Scanning UI Card with Isometric Tilt */}
              <div className="relative mt-auto pt-2 pb-0.5">
                <div 
                  className="relative z-10 rounded-lg border border-violet-200/90 bg-white p-2 shadow-[0_10px_22px_-5px_rgba(139,50,247,0.14),0_3px_6px_-2px_rgba(11,19,48,0.06)] transition-all duration-300 group-hover/step2:shadow-[0_16px_28px_-6px_rgba(139,50,247,0.22)]"
                  style={{
                    transform: 'perspective(500px) rotateY(-2deg) rotateX(4deg) translateZ(8px)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Subtle Laser Scan Beam Indicator */}
                  <div className="flex items-center justify-between border-b border-violet-100 pb-1">
                    <span className="flex items-center gap-1 font-mono text-[8.5px] font-bold text-violet-700">
                      <ScanLine size={10} className="text-violet-700" />
                      AI Extractor
                    </span>
                    <span className="inline-flex items-center gap-0.5 rounded bg-violet-50 px-1 py-0.2 text-[7.5px] font-bold text-violet-700 border border-violet-200">
                      <ShieldCheck size={8} /> Validated
                    </span>
                  </div>

                  {/* Extraction Details */}
                  <div className="mt-1.5 space-y-1 text-[8px]">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">GST Portal:</span>
                      <span className="font-semibold text-violet-700">Matched 2B</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">PO Match:</span>
                      <span className="font-semibold text-slate-800">3-Way ✓</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Duplicate:</span>
                      <span className="font-semibold text-violet-700">None found</span>
                    </div>
                  </div>

                  <div className="mt-2 pt-1 border-t border-slate-100 flex items-center justify-between text-[7.5px]">
                    <span className="font-mono text-slate-400">Tax Type:</span>
                    <span className="font-mono font-bold text-violet-700">18% IGST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Connecting Arrow 2 with Animated SVG Data Pulse */}
            <div className="hidden md:flex flex-col items-center justify-center px-1">
              <svg width="42" height="18" viewBox="0 0 42 18" className="overflow-visible" aria-hidden="true">
                <line x1="2" y1="9" x2="34" y2="9" stroke="#E0CAFE" strokeWidth="2" strokeDasharray="3 3" />
                <polygon points="34,5 42,9 34,13" fill="#8B32F7" />
                <circle r="3" fill="#8B32F7">
                  <animateMotion path="M 2,9 L 34,9" dur="1.8s" repeatCount="indefinite" />
                </circle>
              </svg>
              <span className="text-[7.5px] font-bold text-violet-700 font-mono mt-0.5 uppercase tracking-tighter">POST·XML</span>
            </div>

            {/* ================= STEP 03: 3D POSTED TO TALLY BOX ================= */}
            <div className="relative group/step3 flex flex-col rounded-xl border border-violet-200 bg-gradient-to-b from-violet-50/40 via-white to-violet-50/30 p-3 shadow-xs transition-all duration-300 hover:shadow-md hover:border-violet-500">
              {/* Step Header */}
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] font-bold uppercase text-violet-700 font-mono tracking-wider">
                  Step 03
                </span>
                <span className="flex items-center gap-1 rounded bg-violet-600 text-white px-1.5 py-0.5 text-[8px] font-bold shadow-2xs">
                  <CheckCircle2 size={8} /> Posted
                </span>
              </div>

              {/* Step Title & Subtitle */}
              <div className="mb-2.5">
                <div className="text-[11.5px] font-extrabold text-slate-900 leading-tight">
                  Posted to Tally
                </div>
                <div className="text-[9.5px] text-violet-700 font-semibold truncate">Auto-voucher created</div>
              </div>

              {/* 3D Tally Prime Success Voucher Card with Isometric Tilt */}
              <div className="relative mt-auto pt-2 pb-0.5">
                <div 
                  className="relative z-10 rounded-lg border border-violet-200/90 bg-white p-2 shadow-[0_10px_22px_-5px_rgba(139,50,247,0.16),0_3px_6px_-2px_rgba(11,19,48,0.06)] transition-all duration-300 group-hover/step3:shadow-[0_16px_28px_-6px_rgba(139,50,247,0.24)]"
                  style={{
                    transform: 'perspective(500px) rotateY(1deg) rotateX(4deg) translateZ(8px)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-violet-100 pb-1">
                    <span className="flex items-center gap-1 font-mono text-[8.5px] font-bold text-slate-900">
                      <Database size={10} className="text-violet-600" />
                      Tally Prime
                    </span>
                    <span className="text-[7.5px] font-bold text-violet-700 font-mono">
                      SYNCED
                    </span>
                  </div>

                  {/* Voucher Data */}
                  <div className="mt-1.5 space-y-1 text-[8px]">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Vch No:</span>
                      <span className="font-mono font-bold text-slate-800">#PUR-8492</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Ledger:</span>
                      <span className="font-medium text-slate-800 truncate max-w-[65px]">Freight In</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Status:</span>
                      <span className="font-semibold text-violet-700">Approved</span>
                    </div>
                  </div>

                  <div className="mt-2 pt-1 border-t border-slate-100 flex items-center justify-between text-[7.5px]">
                    <span className="font-mono text-slate-400">Audit ID:</span>
                    <span className="font-bold text-violet-600">#89283</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Live Pipeline Info Banner */}
          <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200/80 bg-slate-50/80 px-3 py-1.5 text-[9.5px] text-slate-600">
            <div className="flex items-center gap-2">
              <span className="flex h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" />
              <span className="font-medium text-slate-700">Direct ERP & Tally Prime Sync</span>
            </div>
            <div className="flex items-center gap-2.5 font-mono text-[9px]">
              <span className="text-slate-500">Avg speed: <strong className="text-slate-800"><CountUp end={4.2} decimals={1} suffix="s" /></strong></span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500">Accuracy: <strong className="text-violet-700"><CountUp end={99.8} decimals={1} suffix="%" /></strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
