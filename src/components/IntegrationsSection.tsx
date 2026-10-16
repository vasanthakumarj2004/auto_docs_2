'use client';
import React, { useState } from 'react';
import { Database, Check, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { integrationsData } from '../data/featuresData';

export const IntegrationsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(integrationsData[0].id);
  const activeIntegration = integrationsData.find((i) => i.id === activeTab) || integrationsData[0];

  return (
    <section id="integrations" className="border-b border-slate-200 bg-[#fafcff] py-16 sm:py-24">
      <div className="site-shell">
        <div className="mx-auto max-w-3xl text-center">
          <div className="eyebrow mb-4">
            <Database size={13} className="text-blue-600" />
            <span>Zero Rip-And-Replace</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-4xl">
            Works inside the systems you already run.
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            No new portals to learn. No changes to your operations workflow. Docsynecx connects to your existing
            logistics software and accounting ledgers via native protocols.
          </p>
        </div>

        {/* Integration System Tabs */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm">
            {integrationsData.map((item) => {
              const isSelected = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.name}</span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[9px] uppercase font-bold ${
                      isSelected ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Integration Details Card */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-blue-50 p-2.5 text-blue-600 border border-blue-100">
                  <Zap size={22} />
                </span>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-950">{activeIntegration.name}</h3>
                  <span className="text-xs font-semibold text-slate-400">{activeIntegration.type}</span>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                {activeIntegration.description}
              </p>

              <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {activeIntegration.capabilities.map((cap, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <Check size={14} className="text-emerald-500 shrink-0" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-4">
                <a href="#demo" className="button-primary text-xs">
                  Connect {activeIntegration.name} <ArrowRight size={13} />
                </a>
                <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                  <RefreshCw size={12} className="text-blue-500" />
                  Real-time synchronization
                </span>
              </div>
            </div>

            {/* Architecture diagram widget */}
            <div className="lg:col-span-5 rounded-xl border border-slate-100 bg-slate-50/70 p-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
                Live Data Pipeline:
              </span>
              <div className="space-y-3 font-mono text-[11px]">
                <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-xs">
                  <span className="text-slate-400 block text-[9px] uppercase">Source Layer</span>
                  <span className="font-bold text-slate-800">Email Inboxes, PDFs, Scanned Bills</span>
                </div>
                <div className="flex justify-center text-slate-400">↓ Docsynecx Domain AI</div>
                <div className="rounded-lg border border-blue-200 bg-blue-50/60 p-3 shadow-xs">
                  <span className="text-blue-500 block text-[9px] uppercase">Reconciliation Engine</span>
                  <span className="font-bold text-blue-950">GSTIN validation, 3-way matching, schema conversion</span>
                </div>
                <div className="flex justify-center text-slate-400">↓ Direct Secure Write-Back</div>
                <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-3 shadow-xs">
                  <span className="text-emerald-600 block text-[9px] uppercase">System of Record</span>
                  <span className="font-bold text-emerald-950">{activeIntegration.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom API Banner */}
        <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white/60 p-4 text-center text-xs text-slate-600">
          Running an in-house TMS or proprietary accounting database?{' '}
          <a href="#demo" className="font-bold text-blue-600 hover:underline">
            We provide custom REST & Webhook APIs for enterprise forwarders →
          </a>
        </div>
      </div>
    </section>
  );
};
