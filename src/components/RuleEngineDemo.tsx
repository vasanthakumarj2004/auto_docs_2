import React, { useState } from 'react';
import { Sliders, CheckCircle2, AlertTriangle, ArrowRight, Layers, FileCode, Check } from 'lucide-react';
import { interactiveRules, InteractiveRule } from '../data/featuresData';

export const RuleEngineDemo: React.FC = () => {
  const [selectedRule, setSelectedRule] = useState<InteractiveRule>(interactiveRules[0]);

  return (
    <section id="rules" className="border-b border-slate-200 bg-white py-16 sm:py-24">
      <div className="site-shell">
        <div className="mx-auto max-w-3xl text-center">
          <div className="eyebrow mb-4">
            <Sliders size={13} className="text-blue-600" />
            <span>Conditional Logic Engine</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-4xl">
            Rules as smart as your best operator.
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Set conditions once. Docsynecx evaluates every incoming document, triggers instant cross-checks, and writes
            clean payloads straight back to CargoWise or Tally — without manual babysitting.
          </p>
        </div>

        {/* Rule Engine Interactive Canvas */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 items-start">
          {/* Left: Selector List of Rules */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Select an Automation Scenario:
            </span>
            {interactiveRules.map((rule) => {
              const isSelected = selectedRule.id === rule.id;
              return (
                <button
                  key={rule.id}
                  onClick={() => setSelectedRule(rule)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/50 shadow-sm ring-1 ring-blue-500'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-900">{rule.system}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        rule.status === 'Auto-Executed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : rule.status === 'Held for Review'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {rule.status}
                    </span>
                  </div>
                  <p className="mt-2 text-xs font-semibold text-slate-700 leading-snug">
                    {rule.condition}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right: Live Interactive Simulator Card */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-slate-950 text-white p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Rule Engine Execution Flow</span>
                </div>
                <span className="rounded bg-slate-800 px-2.5 py-1 text-[10px] font-mono text-slate-400">
                  Source: {selectedRule.sampleDocument}
                </span>
              </div>

              {/* Step 1: Ingestion Event */}
              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                    <Layers size={13} />
                    <span>Trigger Event</span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-slate-100">
                    {selectedRule.event}
                  </p>
                </div>

                {/* Step 2: Evaluation */}
                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    {selectedRule.statusColor === 'emerald' ? (
                      <CheckCircle2 size={13} className="text-emerald-400" />
                    ) : (
                      <AlertTriangle size={13} className="text-amber-400" />
                    )}
                    <span>Condition Evaluated</span>
                  </div>
                  <p className="mt-1 text-sm font-mono text-slate-300">
                    IF {selectedRule.condition}
                  </p>
                </div>

                {/* Step 3: Writeback Action */}
                <div className="rounded-xl border border-emerald-900/60 bg-emerald-950/30 p-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <FileCode size={13} />
                    <span>Target Write-Back ({selectedRule.system})</span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-emerald-200">
                    THEN {selectedRule.action}
                  </p>
                </div>
              </div>

              {/* Execution Summary Footer */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <Check size={14} className="text-emerald-400" />
                  <span>Verified with native API payload</span>
                </div>
                <a
                  href="#demo"
                  className="inline-flex items-center gap-1 font-bold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Configure custom rules for your team <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
