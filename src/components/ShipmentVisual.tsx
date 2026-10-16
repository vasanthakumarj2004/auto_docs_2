'use client';
import React, { useState } from 'react';
import { Inbox, CheckCircle2, AlertTriangle, X, ArrowRight } from 'lucide-react';
import { CountUp } from './CountUp';

interface ShipmentJob {
  id: string;
  carrier: string;
  route: string;
  container: string;
  docCount: number;
  status: 'Job created' | 'BL mismatch';
  auditDetail: string;
}

export const ShipmentVisual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'flagged' | 'posted'>('all');
  const [isCrossfading, setIsCrossfading] = useState(false);
  const [selectedJob, setSelectedJob] = useState<ShipmentJob | null>(null);

  const jobs: ShipmentJob[] = [
    {
      id: 'CW-S0002461',
      carrier: 'Maersk Line',
      route: 'INMAA → SGSIN',
      container: "1 x 40' HC · MSKU-882190-4",
      docCount: 3,
      status: 'Job created',
      auditDetail: 'All 3 documents (BL, Packing List, Commercial Invoice) verified. Consignee, HS code & weight matched. Created in CargoWise One.',
    },
    {
      id: 'CW-S0002462',
      carrier: 'Hapag-Lloyd',
      route: 'INNSA → NLRTM',
      container: "2 x 20' GP · HLXU-441201-1",
      docCount: 2,
      status: 'BL mismatch',
      auditDetail: 'EXCEPTION HELD: Gross weight discrepancy of 240 kg detected between Bill of Lading (14,240 kg) and Packing List (14,000 kg). Held for operator review.',
    },
    {
      id: 'CW-S0002463',
      carrier: 'MSC Shipping',
      route: 'INCOK → AEJEA',
      container: "1 x 40' OT · MSCU-109283-0",
      docCount: 3,
      status: 'Job created',
      auditDetail: 'Port pairs & notify party matched. Customs shipping bill pre-filled line-by-line in CargoWise One.',
    },
  ];

  const handleTabChange = (tab: 'all' | 'flagged' | 'posted') => {
    if (tab === activeTab) return;
    setIsCrossfading(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsCrossfading(false);
    }, 140);
  };

  const filteredJobs = jobs.filter((j) => {
    if (activeTab === 'flagged') return j.status === 'BL mismatch';
    if (activeTab === 'posted') return j.status === 'Job created';
    return true;
  });

  return (
    <div className="feature-card border-teal-200/80 bg-gradient-to-b from-white via-teal-50/20 to-teal-50/40 p-4 sm:p-5 shadow-sm">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-teal-800 text-white font-bold text-[9px]">CW</span>
          <span className="text-[11px] font-extrabold text-slate-900">CargoWise Intake Desk</span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-white px-2.5 py-0.5 text-[9px] font-bold text-teal-800 font-mono shadow-2xs">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Native API active
        </span>
      </div>

      {/* Tabs */}
      <div className="mt-3 flex gap-3 border-b border-slate-100 text-[10px] font-bold" role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === 'all'}
          onClick={() => handleTabChange('all')}
          className={`pb-1.5 transition-all relative cursor-pointer outline-none ${
            activeTab === 'all'
              ? 'border-b-2 border-brand-teal text-brand-teal font-bold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          All shipments <b className="ml-1 rounded-full bg-teal-50 text-brand-teal px-1.5 py-0.2 text-[8px] font-mono tabular-nums"><CountUp end={18} /></b>
        </button>

        <button
          role="tab"
          aria-selected={activeTab === 'flagged'}
          onClick={() => handleTabChange('flagged')}
          className={`pb-1.5 transition-all relative cursor-pointer outline-none ${
            activeTab === 'flagged'
              ? 'border-b-2 border-amber-500 text-amber-700 font-bold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Flagged <b className="ml-1 rounded-full bg-amber-100 text-amber-800 px-1.5 py-0.2 text-[8px] font-mono tabular-nums"><CountUp end={1} /></b>
        </button>

        <button
          role="tab"
          aria-selected={activeTab === 'posted'}
          onClick={() => handleTabChange('posted')}
          className={`pb-1.5 transition-all relative cursor-pointer outline-none ${
            activeTab === 'posted'
              ? 'border-b-2 border-emerald-600 text-emerald-700 font-bold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Job created <b className="ml-1 rounded-full bg-emerald-50 text-emerald-700 px-1.5 py-0.2 text-[8px] font-mono tabular-nums"><CountUp end={17} /></b>
        </button>
      </div>

      {/* Job list table */}
      <div className="mt-2.5 overflow-x-auto min-h-[140px]">
        <table className="w-full min-w-[420px] text-left text-[9px]">
          <thead>
            <tr className="border-b border-slate-100 uppercase tracking-wider text-slate-400 font-mono">
              <th className="py-2 font-bold">Job ID</th>
              <th className="font-bold">Carrier & Route</th>
              <th className="font-bold">Container</th>
              <th className="text-right font-bold">Status</th>
            </tr>
          </thead>
          <tbody
            className={`transition-all duration-140 ease-out ${
              isCrossfading ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
            }`}
          >
            {filteredJobs.map((job) => (
              <tr
                key={job.id}
                onClick={() => setSelectedJob(selectedJob?.id === job.id ? null : job)}
                className={`border-b border-slate-50 transition-colors cursor-pointer ${
                  selectedJob?.id === job.id ? 'bg-teal-50/70' : 'hover:bg-slate-50/70'
                }`}
              >
                <td className="py-2.5 font-mono font-bold text-slate-900">{job.id}</td>
                <td className="text-slate-700">
                  <div className="font-bold text-slate-900">{job.route}</div>
                  <div className="text-[8px] text-slate-400 font-medium">{job.carrier}</div>
                </td>
                <td className="font-mono text-slate-600 text-[8.5px]">{job.container}</td>
                <td className="text-right">
                  <span
                    className={`inline-block rounded border px-2 py-0.5 text-[8.5px] font-bold font-mono shadow-2xs ${
                      job.status === 'BL mismatch'
                        ? 'border-amber-300 bg-amber-50 text-amber-800'
                        : 'border-emerald-200 bg-emerald-50 text-emerald-800'
                    }`}
                  >
                    {job.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popover Audit Detail */}
      {selectedJob && (
        <div className="mt-2.5 rounded-lg border border-teal-200 bg-white p-3 text-[10px] text-slate-800 shadow-xs animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="flex items-center justify-between font-bold text-slate-950 mb-1">
            <span className="font-mono">{selectedJob.id} · Document Audit</span>
            <button
              type="button"
              onClick={() => setSelectedJob(null)}
              className="text-slate-400 hover:text-slate-600 p-0.5"
              aria-label="Close"
            >
              <X size={12} />
            </button>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium">{selectedJob.auditDetail}</p>
        </div>
      )}

      {/* Footer reassurance */}
      <div className="mt-3 border-t border-slate-100 pt-2 flex items-center justify-between text-[9px] text-slate-500">
        <span className="flex items-center gap-1 font-semibold text-emerald-800">
          <CheckCircle2 size={11} className="text-emerald-600" />
          <span>Exceptions flagged · No wrong data in CargoWise</span>
        </span>
        <span className="text-slate-400">Click row for details</span>
      </div>
    </div>
  );
};
