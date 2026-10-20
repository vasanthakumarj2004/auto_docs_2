'use client';
import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Database, 
  Sparkles, 
  Mail, 
  Clock,
  ArrowRight
} from 'lucide-react';
import { walkthroughChapters, pipelineInvoice, pipelineVoucher } from './mockData';

interface WalkthroughViewProps {
  walkthroughVideoUrl?: string;
  isPaused?: boolean;
}

export const WalkthroughView: React.FC<WalkthroughViewProps> = ({ 
  walkthroughVideoUrl,
  isPaused = false 
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentChapter, setCurrentChapter] = useState<number>(0);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(14); // start at 0:14
  const videoRef = useRef<HTMLVideoElement>(null);

  const totalDurationSec = 120; // 2:00

  // Play/pause toggle
  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
    if (walkthroughVideoUrl && videoRef.current) {
      if (!isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  };

  // Chapter Jump
  const handleJumpChapter = (chapterIndex: number) => {
    setCurrentChapter(chapterIndex);
    setCurrentTimeSec(walkthroughChapters[chapterIndex].timeSec + 5);
  };

  // Scrubber click
  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetSec = Math.floor(clickRatio * totalDurationSec);
    setCurrentTimeSec(targetSec);

    // Map time to chapter
    if (targetSec < 30) setCurrentChapter(0);
    else if (targetSec < 60) setCurrentChapter(1);
    else if (targetSec < 90) setCurrentChapter(2);
    else setCurrentChapter(3);
  };

  // Playback timer
  useEffect(() => {
    if (!isPlaying || isPaused) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsPlaying(false);
      return;
    }

    const interval = setInterval(() => {
      setCurrentTimeSec((prev) => {
        const next = (prev + 1) % totalDurationSec;
        if (next < 30) setCurrentChapter(0);
        else if (next < 60) setCurrentChapter(1);
        else if (next < 90) setCurrentChapter(2);
        else setCurrentChapter(3);
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, isPaused]);

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = (currentTimeSec / totalDurationSec) * 100;
  const activeChapterData = walkthroughChapters[currentChapter];

  // If a real video URL is configured, render native video player
  if (walkthroughVideoUrl) {
    return (
      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
        <video
          ref={videoRef}
          src={walkthroughVideoUrl}
          playsInline
          muted
          loop
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white font-mono text-xs">
          <button type="button" onClick={togglePlay} className="flex items-center gap-1.5 bg-blue-600 px-3 py-1 rounded">
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <span>{formatTime(currentTimeSec)} / 2:00</span>
        </div>
      </div>
    );
  }

  // Interactive Storyboard Player View
  return (
    <div className="w-full h-full flex flex-col justify-between rounded-xl bg-slate-950 border border-slate-800 text-white p-3 sm:p-4 shadow-xl select-none">
      
      {/* ================= PLAYER TOP CONTROLS & CHAPTER CHIPS ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
        {/* Chapter Tabs */}
        <div className="flex items-center gap-1 font-mono text-[10px]" role="tablist" aria-label="Walkthrough chapters">
          {walkthroughChapters.map((ch, idx) => (
            <button
              key={ch.id}
              type="button"
              role="tab"
              aria-selected={currentChapter === idx}
              onClick={() => handleJumpChapter(idx)}
              className={`rounded px-2 py-1 transition-all cursor-pointer outline-none ${
                currentChapter === idx
                  ? 'bg-blue-600 text-white font-bold shadow-xs border border-blue-400'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800'
              }`}
            >
              {ch.label}
            </button>
          ))}
        </div>

        {/* Illustrative Demo Badge */}
        <span className="inline-flex items-center gap-1 rounded bg-slate-900 border border-slate-700/80 px-2 py-0.5 font-mono text-[9.5px] text-slate-400 self-start sm:self-auto">
          <Sparkles size={10} className="text-blue-400" />
          Illustrative demo
        </span>
      </div>

      {/* ================= STORYBOARD STAGE (Active Chapter Simulation) ================= */}
      <div className="relative my-3 flex-1 flex flex-col justify-center items-center overflow-hidden rounded-lg bg-slate-900/60 border border-slate-800/80 p-4">
        
        {/* Chapter 0: INTAKE */}
        {currentChapter === 0 && (
          <div className="w-full max-w-md space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5 font-bold text-blue-400">
                <Mail size={12} /> Chapter 01: Multi-Channel Intake
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold">● Ingestion Active</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-[10.5px] font-mono">
              <div className="rounded border border-blue-500/50 bg-blue-950/40 p-2 text-blue-200">
                <span className="block font-bold text-white">Shared Inbox</span>
                <span className="text-[9px] text-slate-400">bills@company.com</span>
              </div>
              <div className="rounded border border-slate-700 bg-slate-800/50 p-2 text-slate-300">
                <span className="block font-bold text-white">Vendor Portal</span>
                <span className="text-[9px] text-slate-400">Direct Upload</span>
              </div>
              <div className="rounded border border-slate-700 bg-slate-800/50 p-2 text-slate-300">
                <span className="block font-bold text-white">Scan Folder</span>
                <span className="text-[9px] text-slate-400">Network Folder</span>
              </div>
            </div>

            {/* Ingested Document Card */}
            <div className="rounded border border-slate-700 bg-slate-800/90 p-2.5 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="rounded bg-rose-500 px-1.5 py-0.2 text-[9px] font-black text-white">PDF</span>
                <div>
                  <div className="font-bold text-white">{pipelineInvoice.invoiceNo}</div>
                  <div className="text-[10px] text-slate-400">{pipelineInvoice.vendor}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-emerald-400">{pipelineInvoice.totalAmount}</div>
                <div className="text-[9.5px] text-slate-400">142 KB · 3 lines</div>
              </div>
            </div>
          </div>
        )}

        {/* Chapter 1: EXTRACT */}
        {currentChapter === 1 && (
          <div className="w-full max-w-md space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5 font-bold text-blue-400">
                <Sparkles size={12} /> Chapter 02: AI Field Extraction
              </span>
              <span className="rounded bg-blue-900/80 border border-blue-500/50 px-2 py-0.2 text-[9.5px] font-bold text-blue-200">
                99.8% Field Confidence
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="rounded border border-blue-500/40 bg-blue-950/30 p-2">
                <span className="block text-[9.5px] text-blue-300 uppercase">Vendor GSTIN</span>
                <span className="font-bold text-white text-[11px]">{pipelineInvoice.gstin}</span>
              </div>
              <div className="rounded border border-blue-500/40 bg-blue-950/30 p-2">
                <span className="block text-[9.5px] text-blue-300 uppercase">Invoice Date</span>
                <span className="font-bold text-white text-[11px]">{pipelineInvoice.date}</span>
              </div>
            </div>

            <div className="rounded border border-slate-700 bg-slate-800/80 p-2 text-xs font-mono flex justify-between items-center">
              <div>
                <span className="block text-[9.5px] text-slate-400 uppercase">Line Items Verified</span>
                <span className="text-slate-200">Ocean Freight + THC + BAF</span>
              </div>
              <span className="font-bold text-emerald-400 text-sm">{pipelineInvoice.totalAmount}</span>
            </div>
          </div>
        )}

        {/* Chapter 2: CHECK */}
        {currentChapter === 2 && (
          <div className="w-full max-w-md space-y-2.5 animate-fadeIn">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5 font-bold text-amber-400">
                <ShieldCheck size={12} /> Chapter 03: Pre-Posting Guardrails
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold">● 3 Checks Passed</span>
            </div>

            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between rounded border border-emerald-500/40 bg-emerald-950/30 p-2 text-emerald-200">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-emerald-400" />
                  Government GST Portal 2B Match
                </span>
                <span className="text-[10px] font-bold text-emerald-400">VERIFIED</span>
              </div>

              <div className="flex items-center justify-between rounded border border-emerald-500/40 bg-emerald-950/30 p-2 text-emerald-200">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-emerald-400" />
                  3-Way PO & Quantity Math Check
                </span>
                <span className="text-[10px] font-bold text-emerald-400">100% OK</span>
              </div>

              <div className="flex items-center justify-between rounded border border-amber-500/40 bg-amber-950/30 p-2 text-amber-200">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-amber-400" />
                  Historical Ledger Duplicate Check
                </span>
                <span className="text-[10px] font-bold text-amber-400">0 DUPLICATES</span>
              </div>
            </div>
          </div>
        )}

        {/* Chapter 3: POST */}
        {currentChapter === 3 && (
          <div className="w-full max-w-md space-y-2.5 animate-fadeIn">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                <Database size={12} /> Chapter 04: Zero-Touch Tally Posting
              </span>
              <span className="rounded bg-emerald-900/80 border border-emerald-500/50 px-2 py-0.2 text-[9.5px] font-bold text-emerald-300">
                Tally Prime Synced
              </span>
            </div>

            <div className="relative rounded border border-emerald-500/50 bg-slate-800/90 p-3 font-mono text-xs">
              <div className="flex justify-between items-center text-slate-400 text-[10px]">
                <span>Purchase Voucher</span>
                <span className="font-bold text-emerald-400 text-xs">{pipelineVoucher.voucherNo}</span>
              </div>

              <div className="mt-2 text-slate-200 text-xs space-y-1">
                <div>Ledger: <b className="text-white">{pipelineVoucher.ledger}</b></div>
                <div className="flex justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-700">
                  <span>Audit Trail ID: #89283</span>
                  <span>Amount: <b className="text-white text-xs">{pipelineInvoice.totalAmount}</b></span>
                </div>
              </div>

              {/* Verified Stamp */}
              <div className="absolute top-4 right-3 rotate-[-12deg] rounded border-2 border-emerald-400 bg-emerald-950/90 px-2.5 py-0.5 text-center text-emerald-300 font-black text-[10.5px] tracking-wider">
                ✓ POSTED
              </div>
            </div>

            <div className="rounded bg-emerald-950/40 border border-emerald-800/60 p-1.5 text-center font-mono text-[10px] text-emerald-300">
              Direct XML push · Your existing Tally ledger stays completely unchanged
            </div>
          </div>
        )}

      </div>

      {/* ================= BOTTOM CAPTION & VIDEO SCRUBBER BAR ================= */}
      <div className="space-y-2 border-t border-slate-800/80 pt-2.5">
        {/* Caption Line */}
        <div className="text-center font-sans text-xs text-slate-300 min-h-[18px]">
          {activeChapterData.desc}
        </div>

        {/* Scrubber & Controls */}
        <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
          {/* Play/Pause Button */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause walkthrough' : 'Play walkthrough'}
            className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} className="ml-0.5" />}
          </button>

          {/* Time indicator */}
          <span className="w-20 text-slate-300 tabular-nums">
            {formatTime(currentTimeSec)} / 2:00
          </span>

          {/* Interactive Scrub Bar */}
          <div 
            role="progressbar"
            aria-valuenow={currentTimeSec}
            aria-valuemin={0}
            aria-valuemax={120}
            onClick={handleScrubberClick}
            className="relative flex-1 h-2 rounded-full bg-slate-800 cursor-pointer overflow-hidden group"
          >
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-300 group-hover:bg-blue-400"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Restart */}
          <button
            type="button"
            title="Restart walkthrough"
            onClick={() => handleJumpChapter(0)}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-800 bg-slate-900 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw size={12} />
          </button>
        </div>
      </div>

    </div>
  );
};
