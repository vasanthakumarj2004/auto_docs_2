'use client';
import React, { useState, useMemo } from 'react';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import { useRouter } from '../lib/router';
import { SpotlightCard } from './SpotlightCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const CalculatorBar: React.FC = () => {
  const [documents, setDocuments] = useState<number>(1200);
  const [minutes, setMinutes] = useState<number>(5);
  const [staffCost, setStaffCost] = useState<number>(40000);
  const { navigate } = useRouter();
  const { ref: sectionRef } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  const totals = useMemo(() => {
    const hours = Math.round((documents * minutes) / 60);
    const cost = Math.round(hours * (staffCost / 160));
    // AutoDocs reduces repetitive data entry by ~96.5%, leaving only exceptions (~3.5%)
    const automatedHours = Math.max(0.5, Math.round(hours * 0.035 * 10) / 10);
    return { hours, cost, automatedHours };
  }, [documents, minutes, staffCost]);

  return (
    <section
      ref={sectionRef}
      id="calculator"
      className="relative border-b border-white/10 bg-[#160c20] text-[#fafafa] py-16 sm:py-24 scroll-mt-16 overflow-hidden"
    >
      {/* Subtle ambient gradient lighting */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,50,247,0.16),transparent_70%)] opacity-80"
        aria-hidden="true"
      />

      <div className="site-shell relative z-10 space-y-6">
        {/* Dark Navy Calculator Bar */}
        <SpotlightCard dark className="dark-banner border border-white/10 bg-white/[0.04] backdrop-blur-md transition-all duration-300 hover:shadow-xl">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
              What is retyping costing you?
            </h2>
            <p className="mt-1 text-xs text-slate-300">
              Put a number on the hours your team spends moving data by hand.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => navigate('/calculator')}
              suppressHydrationWarning
              className="button-primary text-xs"
            >
              See my number
            </button>
            <a href="/demo/" className="button-dark text-xs border border-white/20 hover:border-white/40">
              Book a demo
            </a>
          </div>
        </SpotlightCard>

        {/* The cost of doing it by hand Box */}
        <SpotlightCard
          dark
          className="rounded-2xl border border-white/10 bg-[#22132e]/90 backdrop-blur-md p-5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)] sm:p-8 transition-all duration-300 hover:border-violet-500/40"
        >
          <div className="flex flex-col justify-between gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-center">
            <h3 className="text-base font-extrabold text-white">
              The cost of doing it by hand
            </h3>
            <span className="w-fit rounded bg-white/10 border border-white/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-300 font-mono">
              Illustrative example · not verified savings
            </span>
          </div>

          <div className="grid gap-8 pt-7 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7">
              <div className="grid gap-3 sm:grid-cols-3">
                {/* Input 1 */}
                <div className="rounded-xl border border-white/10 bg-black/30 p-3 block focus-within:border-brand-violet transition-all">
                  <span className="block text-[10px] font-bold text-slate-300">Documents a month</span>
                  <div className="mt-1.5 flex items-center justify-between">
                    <input
                      type="number"
                      min="1"
                      value={documents}
                      onChange={(e) => setDocuments(Math.max(0, Number(e.target.value)))}
                      suppressHydrationWarning
                      className="w-full border-0 bg-transparent p-0 font-extrabold text-white outline-none text-base font-mono"
                    />
                    <div className="flex items-center gap-1 shrink-0 ml-1">
                      <button
                        type="button"
                        onClick={() => setDocuments((prev) => Math.max(100, prev - 100))}
                        className="h-5 w-5 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                        aria-label="Decrease documents by 100"
                      >
                        <Minus size={10} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDocuments((prev) => prev + 100)}
                        className="h-5 w-5 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                        aria-label="Increase documents by 100"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="100"
                    value={documents}
                    onChange={(e) => setDocuments(Number(e.target.value))}
                    className="mt-2 w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-violet-500"
                  />
                  <span className="mt-1 block text-[9px] text-slate-400 font-mono">documents</span>
                </div>

                {/* Input 2 */}
                <div className="rounded-xl border border-white/10 bg-black/30 p-3 block focus-within:border-brand-violet transition-all">
                  <span className="block text-[10px] font-bold text-slate-300">Minutes each</span>
                  <div className="mt-1.5 flex items-center justify-between">
                    <input
                      type="number"
                      min="1"
                      value={minutes}
                      onChange={(e) => setMinutes(Math.max(0, Number(e.target.value)))}
                      suppressHydrationWarning
                      className="w-full border-0 bg-transparent p-0 font-extrabold text-white outline-none text-base font-mono"
                    />
                    <div className="flex items-center gap-1 shrink-0 ml-1">
                      <button
                        type="button"
                        onClick={() => setMinutes((prev) => Math.max(1, prev - 1))}
                        className="h-5 w-5 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                        aria-label="Decrease minutes by 1"
                      >
                        <Minus size={10} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setMinutes((prev) => prev + 1)}
                        className="h-5 w-5 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                        aria-label="Increase minutes by 1"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={minutes}
                    onChange={(e) => setMinutes(Number(e.target.value))}
                    className="mt-2 w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-violet-500"
                  />
                  <span className="mt-1 block text-[9px] text-slate-400 font-mono">minutes</span>
                </div>

                {/* Input 3 */}
                <div className="rounded-xl border border-white/10 bg-black/30 p-3 block focus-within:border-brand-violet transition-all">
                  <span className="block text-[10px] font-bold text-slate-300">Staff cost a month</span>
                  <div className="mt-1.5 flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm font-extrabold text-white mr-0.5">₹</span>
                      <input
                        type="number"
                        min="1"
                        value={staffCost}
                        onChange={(e) => setStaffCost(Math.max(0, Number(e.target.value)))}
                        suppressHydrationWarning
                        className="w-full border-0 bg-transparent p-0 font-extrabold text-white outline-none text-base font-mono"
                      />
                    </div>
                    <div className="flex items-center gap-1 shrink-0 ml-1">
                      <button
                        type="button"
                        onClick={() => setStaffCost((prev) => Math.max(10000, prev - 5000))}
                        className="h-5 w-5 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                        aria-label="Decrease staff cost by 5000"
                      >
                        <Minus size={10} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setStaffCost((prev) => prev + 5000)}
                        className="h-5 w-5 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                        aria-label="Increase staff cost by 5000"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="15000"
                    max="120000"
                    step="5000"
                    value={staffCost}
                    onChange={(e) => setStaffCost(Number(e.target.value))}
                    className="mt-2 w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-violet-500"
                  />
                  <span className="mt-1 block text-[9px] text-slate-400 font-mono">per person</span>
                </div>
              </div>

              <p className="mt-5 text-[10px] leading-5 text-slate-400">
                Assumes 160 working hours per person/month (₹{Math.round(staffCost / 160)}/hour).{' '}
                {documents.toLocaleString('en-IN')} x {minutes} = {totals.hours.toLocaleString('en-IN')} hours.{' '}
                {totals.hours.toLocaleString('en-IN')} x ₹{Math.round(staffCost / 160)} = ₹{totals.cost.toLocaleString('en-IN')} in staff time.
              </p>
            </div>

            {/* Results Display */}
            <div className="rounded-xl border border-white/10 bg-black/40 p-6 lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 block font-mono">
                  Time & cost lost to retyping / month
                </span>
                <div className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-violet-400 flex items-baseline font-mono">
                  <span>{totals.hours.toLocaleString('en-IN')} hrs</span>
                  <span className="mx-2 font-normal text-slate-500">/</span>
                  <span className="text-white">₹{totals.cost.toLocaleString('en-IN')}</span>
                </div>
                <p className="mt-2 text-[10px] text-slate-400">
                  An estimate of manual effort, not guaranteed savings.
                </p>

                {/* Before vs. After Efficiency Bar */}
                <div className="mt-5 pt-4 border-t border-white/10 space-y-2.5">
                  <div className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Manual vs. AutoDocs Impact
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className="text-slate-300">Manual Keying:</span>
                      <span className="font-bold text-white">{totals.hours.toLocaleString('en-IN')} hrs / mo</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-500 rounded-full w-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className="text-violet-300 font-semibold flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
                        With AutoDocs:
                      </span>
                      <span className="font-bold text-violet-300">~{totals.automatedHours} hrs / mo (Exceptions only)</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-violet-500 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.max(4, Math.min(100, (totals.automatedHours / Math.max(1, totals.hours)) * 100))}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/calculator')}
                suppressHydrationWarning
                className="mt-6 flex items-center text-[11px] font-bold text-violet-300 hover:text-white transition-colors"
              >
                Get the full breakdown <ArrowRight size={13} className="ml-1" />
              </button>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
};
