import React from 'react';
import { ShieldCheck, Lock, Key, Server, FileCheck, ArrowRight } from 'lucide-react';
import { securityHighlights } from '../data/featuresData';
import { SpotlightCard } from './SpotlightCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const SecurityTrust: React.FC = () => {
  const icons = [Lock, Key, Server, FileCheck];
  const { ref: sectionRef } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={sectionRef} id="security" className="border-b border-slate-200 bg-[#fafcff] py-16 sm:py-24">
      <div className="site-shell">
        <div className="mx-auto max-w-3xl text-center">
          <div className="eyebrow mb-4">
            <ShieldCheck size={13} className="text-emerald-600" />
            <span>Bank-Grade Security</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-4xl">
            Trade & financial data is sensitive. We treat it that way.
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Enterprise forwarders and multi-entity enterprises entrust their confidential commercial invoices, shipping manifests,
            and ledgers to Docsynecx. Here is our security pledge.
          </p>
        </div>

        {/* 4 Security Pillars Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {securityHighlights.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <SpotlightCard
                key={i}
                tabIndex={0}
                className={`reveal-init stagger-${(i % 4) + 1} group rounded-xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-slate-300 focus-visible:outline-2 focus-visible:outline-brand-blue`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 border border-blue-100 transition-all duration-300 group-hover:scale-105 group-hover:bg-brand-blue group-hover:text-white">
                  <Icon size={18} />
                </span>
                <h3 className="mt-4 text-base font-extrabold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-600">{item.description}</p>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Trust Center Banner */}
        <SpotlightCard
          dark
          className="mt-10 rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8 text-white shadow-lg flex flex-col justify-between gap-6 sm:flex-row sm:items-center transition-all duration-300 hover:shadow-2xl"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>SOC 2 Type II Audited Architecture · ISO 27001 Aligned</span>
            </div>
            <h4 className="mt-2 text-lg font-extrabold">Need our Security Whitepaper or Vendor Risk Assessment?</h4>
            <p className="text-xs text-slate-400 mt-1">
              We provide NDA-protected compliance reports, DPA documentation, and penetration testing summaries.
            </p>
          </div>
          <a
            href="#demo"
            className="button-primary text-xs shrink-0 self-start sm:self-center"
          >
            Request security dossier <ArrowRight size={13} />
          </a>
        </SpotlightCard>
      </div>
    </section>
  );
};
