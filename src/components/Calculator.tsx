'use client';
import React, { useState, useMemo } from 'react';
import { ArrowRight, Calculator as CalcIcon, TrendingUp, Clock, AlertCircle } from 'lucide-react';

export const Calculator: React.FC = () => {
  const [documents, setDocuments] = useState<number>(1200);
  const [minutes, setMinutes] = useState<number>(5);
  const [staffCost, setStaffCost] = useState<number>(40000);

  const calculations = useMemo(() => {
    const monthlyHours = Math.round((documents * minutes) / 60);
    const annualHours = monthlyHours * 12;
    const monthlyCost = Math.round(monthlyHours * (staffCost / 160));
    const annualCost = monthlyCost * 12;
    // Estimated financial exposure from manual data entry mistakes & duplicate invoices
    const duplicateRiskMitigation = Math.round(documents * 240);

    return {
      monthlyHours,
      annualHours,
      monthlyCost,
      annualCost,
      duplicateRiskMitigation,
    };
  }, [documents, minutes, staffCost]);

  return (
    <section id="calculator" className="bg-white py-16 sm:py-24 border-b border-slate-200">
      <div className="site-shell space-y-6">
        <div className="dark-banner">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 mb-2">
              <CalcIcon size={14} />
              <span>Interactive ROI & Labor Cost Assessment</span>
            </div>
            <h2 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
              What is manual typing really costing your operations?
            </h2>
            <p className="mt-1 text-xs text-slate-400 max-w-xl">
              Every hour spent re-entering invoices, BLs, or booking notes into Tally and CargoWise is an hour not spent
              winning new freight customers or negotiating rates.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <a href="#calc-box" className="button-orange text-xs">
              Calculate my ROI
            </a>
            <a href="#demo" className="button-dark text-xs">
              Book a live walkthrough
            </a>
          </div>
        </div>

        <div id="calc-box" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg font-extrabold text-slate-950">Labor & Operational Cost Breakdown</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Adjust sliders to model your monthly document volume and team compensation.
              </p>
            </div>
            <span className="w-fit rounded bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700 border border-blue-100">
              Real-Time Dynamic Model
            </span>
          </div>

          <div className="grid gap-8 pt-7 lg:grid-cols-12 items-start">
            {/* Left Inputs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Slider 1: Documents */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                  <span>Monthly Document Volume</span>
                  <span className="font-mono text-blue-600 font-extrabold text-sm">{documents.toLocaleString()} docs</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="10000"
                  step="100"
                  value={documents}
                  onChange={(e) => setDocuments(Number(e.target.value))}
                  className="w-full mt-3"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Vendor invoices, Bills of Lading, Packing Lists, Pre-alerts
                </span>
              </div>

              {/* Slider 2: Minutes */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                  <span>Minutes to Read, Cross-Check & Key Each Document</span>
                  <span className="font-mono text-blue-600 font-extrabold text-sm">{minutes} mins</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={minutes}
                  onChange={(e) => setMinutes(Number(e.target.value))}
                  className="w-full mt-3"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Includes header extraction, line-item check, and system typing
                </span>
              </div>

              {/* Slider 3: Staff Cost */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                  <span>Monthly Cost per Data Entry Operator</span>
                  <span className="font-mono text-blue-600 font-extrabold text-sm">₹{staffCost.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="120000"
                  step="5000"
                  value={staffCost}
                  onChange={(e) => setStaffCost(Number(e.target.value))}
                  className="w-full mt-3"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Salary + benefits based on standard 160 operational hours/month
                </span>
              </div>
            </div>

            {/* Right Output Dashboard */}
            <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-slate-50/90 p-6">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                Estimated Operational Waste
              </span>

              <div className="mt-4 space-y-4">
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                    <Clock size={14} className="text-blue-500" />
                    <span>Time Lost to Manual Typing</span>
                  </div>
                  <div className="mt-1 text-2xl font-extrabold text-blue-600 font-mono">
                    {calculations.monthlyHours.toLocaleString()} hrs <span className="text-xs text-slate-400 font-normal">/ month</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    ({calculations.annualHours.toLocaleString()} hours every year)
                  </span>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                    <TrendingUp size={14} className="text-emerald-500" />
                    <span>Direct Salary Cost Sunk</span>
                  </div>
                  <div className="mt-1 text-2xl font-extrabold text-slate-950 font-mono">
                    ₹{calculations.monthlyCost.toLocaleString('en-IN')} <span className="text-xs text-slate-400 font-normal">/ month</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">
                    ₹{calculations.annualCost.toLocaleString('en-IN')} saved annually with Docsynecx
                  </span>
                </div>

                <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3 text-[11px] text-amber-900 flex items-start gap-2">
                  <AlertCircle size={15} className="text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Duplicate & Typo Risk Avoided: </span>
                    <span>
                      Estimated ₹{calculations.duplicateRiskMitigation.toLocaleString('en-IN')}/mo in avoided payment errors and customs hold fees.
                    </span>
                  </div>
                </div>
              </div>

              <a
                href="#demo"
                className="mt-6 button-primary w-full text-xs"
              >
                Get your company’s tailored audit <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
