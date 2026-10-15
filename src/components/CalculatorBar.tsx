import React, { useState, useMemo } from 'react';
import { ArrowRight, Pencil } from 'lucide-react';
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
    return { hours, cost };
  }, [documents, minutes, staffCost]);

  return (
    <section ref={sectionRef} id="calculator" className="border-b border-slate-200/80 bg-white py-14 sm:py-20 scroll-mt-16">
      <div className="site-shell space-y-6">
        {/* Dark Navy Calculator Bar from Image with Raft-style metallic ambient glow */}
        <SpotlightCard dark className="dark-banner transition-all duration-300 hover:shadow-xl">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
              What is retyping costing you?
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Put a number on the hours your team spends moving data by hand.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => navigate('/calculator')}
              className="button-orange text-xs"
            >
              See my number
            </button>
            <a href="#demo" className="button-dark text-xs">
              Book a demo
            </a>
          </div>
        </SpotlightCard>

        {/* The cost of doing it by hand Box from Image */}
        <SpotlightCard className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 transition-all duration-300 hover:shadow-md">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-center">
            <h3 className="text-base font-extrabold text-slate-950">
              The cost of doing it by hand
            </h3>
            <span className="w-fit rounded bg-slate-100 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-400">
              Illustrative example · not verified savings
            </span>
          </div>

          <div className="grid gap-8 pt-7 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7">
              <div className="grid gap-3 sm:grid-cols-3">
                {/* Input 1 */}
                <label className="rounded-xl border border-slate-200 bg-slate-50 p-3 block focus-within:border-brand-blue focus-within:bg-white transition-all">
                  <span className="block text-[10px] font-bold text-slate-500">Documents a month</span>
                  <div className="mt-1 flex items-center justify-between">
                    <input
                      type="number"
                      min="1"
                      value={documents}
                      onChange={(e) => setDocuments(Math.max(0, Number(e.target.value)))}
                      className="w-full border-0 bg-transparent p-0 font-extrabold text-slate-950 outline-none text-base"
                    />
                    <Pencil size={12} className="text-slate-400 shrink-0" />
                  </div>
                  <span className="mt-1 block text-[9px] text-slate-400">documents</span>
                </label>

                {/* Input 2 */}
                <label className="rounded-xl border border-slate-200 bg-slate-50 p-3 block focus-within:border-brand-blue focus-within:bg-white transition-all">
                  <span className="block text-[10px] font-bold text-slate-500">Minutes each</span>
                  <div className="mt-1 flex items-center justify-between">
                    <input
                      type="number"
                      min="1"
                      value={minutes}
                      onChange={(e) => setMinutes(Math.max(0, Number(e.target.value)))}
                      className="w-full border-0 bg-transparent p-0 font-extrabold text-slate-950 outline-none text-base"
                    />
                    <Pencil size={12} className="text-slate-400 shrink-0" />
                  </div>
                  <span className="mt-1 block text-[9px] text-slate-400">minutes</span>
                </label>

                {/* Input 3 */}
                <label className="rounded-xl border border-slate-200 bg-slate-50 p-3 block focus-within:border-brand-blue focus-within:bg-white transition-all">
                  <span className="block text-[10px] font-bold text-slate-500">Staff cost a month</span>
                  <div className="mt-1 flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm font-extrabold text-slate-950 mr-0.5">₹</span>
                      <input
                        type="number"
                        min="1"
                        value={staffCost}
                        onChange={(e) => setStaffCost(Math.max(0, Number(e.target.value)))}
                        className="w-full border-0 bg-transparent p-0 font-extrabold text-slate-950 outline-none text-base"
                      />
                    </div>
                    <Pencil size={12} className="text-slate-400 shrink-0" />
                  </div>
                  <span className="mt-1 block text-[9px] text-slate-400">per person</span>
                </label>
              </div>

              <p className="mt-5 text-[10px] leading-5 text-slate-400">
                Assumes 160 working hours per person/month (₹{Math.round(staffCost / 160)}/hour).{' '}
                {documents.toLocaleString()} x {minutes} = {totals.hours.toLocaleString()} hours.{' '}
                {totals.hours.toLocaleString()} x ₹{Math.round(staffCost / 160)} = ₹{totals.cost.toLocaleString('en-IN')} in staff time.
              </p>
            </div>

            {/* Results Display */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-6 lg:col-span-5">
              <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 block">
                Time & cost lost to retyping / month
              </span>
              <div className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-brand-blue flex items-baseline">
                <span>{totals.hours.toLocaleString()} hrs</span>
                <span className="mx-2 font-normal text-slate-300">/</span>
                <span className="text-slate-950">₹{totals.cost.toLocaleString('en-IN')}</span>
              </div>
              <p className="mt-2 text-[10px] text-slate-500">
                An estimate of manual effort, not guaranteed savings.
              </p>
              <button
                onClick={() => navigate('/calculator')}
                className="mt-6 flex items-center text-[11px] font-bold text-brand-blue hover:text-brand-blue-hover transition-colors"
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
