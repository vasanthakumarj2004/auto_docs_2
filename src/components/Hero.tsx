import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { personas } from '../data/featuresData';
import { FinanceDeskVisual } from './FinanceDeskVisual';
import { ShipmentVisual } from './ShipmentVisual';

export const Hero: React.FC = () => {
  const [selectedPersona, setSelectedPersona] = useState<'forwarders' | 'finance' | 'brokers'>('forwarders');
  const activeData = personas[selectedPersona];

  return (
    <section id="top" className="hero-section border-b border-slate-200/80 pt-8 pb-16 lg:py-20">
      <div className="site-shell">
        {/* Persona Selector Pill Navigation (Inspired by Wove.com) */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex flex-wrap items-center justify-center gap-1 rounded-full border border-slate-200 bg-white/80 p-1 shadow-sm backdrop-blur-md">
            {(['forwarders', 'finance', 'brokers'] as const).map((key) => {
              const persona = personas[key];
              const isActive = selectedPersona === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedPersona(key)}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  {persona.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="eyebrow mb-6">
              <Sparkles size={12} className="text-blue-600" />
              <span>{activeData.badge}</span>
            </div>

            <h1 className="max-w-[650px] text-4xl font-extrabold leading-[1.08] tracking-[-0.055em] text-slate-950 sm:text-6xl transition-all duration-300">
              {activeData.headline}
            </h1>

            <p className="mt-6 max-w-xl text-[15px] leading-7 text-slate-600 transition-all duration-300">
              {activeData.subheadline}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#demo" className="button-primary text-xs">
                {activeData.primaryCta} <ArrowRight size={14} />
              </a>
              <a
                href={selectedPersona === 'forwarders' ? '#logistics' : '#finance'}
                className="button-secondary text-xs"
              >
                {activeData.secondaryCta}
              </a>
            </div>

            {/* Persona Bullet Points */}
            <div className="mt-9 space-y-2.5">
              {activeData.bulletPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-2.5 text-xs font-medium text-slate-600">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Live Card corresponding to Persona */}
          <div className="lg:col-span-6">
            <div className="relative">
              <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-teal-500/10 to-indigo-500/10 blur-xl opacity-70" />
              <div className="relative">
                {selectedPersona === 'forwarders' ? (
                  <ShipmentVisual />
                ) : (
                  <FinanceDeskVisual />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Persona Metric Row */}
        <div className="mt-14 grid grid-cols-1 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {activeData.metrics.map((metric, i) => (
            <div key={i} className="px-5 py-3 first:pl-3">
              <div className="text-2xl font-extrabold tracking-tight text-slate-950 font-mono">
                {metric.value}
              </div>
              <div className="mt-1 text-xs text-slate-500 font-medium">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
