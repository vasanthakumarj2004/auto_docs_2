import React, { useState } from 'react';
import { FileText, ChevronDown, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50">
      {/* Top Announcement Bar inspired by Wove */}
      <div className="bg-slate-950 px-4 py-2 text-center text-[11px] font-semibold text-slate-300 transition-colors">
        <a
          href="#integrations"
          className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
        >
          <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[9px] font-bold text-blue-400 border border-blue-500/30">
            NEW
          </span>
          <span>Native CargoWise eAdaptor & Tally Prime XML Server Connectors</span>
          <ArrowRight size={12} className="text-blue-400" />
        </a>
      </div>

      {/* Main Navbar */}
      <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
        <div className="site-shell flex h-[68px] items-center justify-between">
          <a href="#top" className="group flex items-center gap-3" aria-label="Docsynecx home">
            <span className="brand-mark">
              <FileText size={16} strokeWidth={2.6} />
            </span>
            <div className="flex flex-col">
              <span className="text-[17px] font-extrabold tracking-[-0.04em] text-slate-950 transition-colors group-hover:text-blue-600 leading-tight">
                Docsynecx
              </span>
              <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase">
                Trade & Finance Engine
              </span>
            </div>
          </a>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
            <a
              href="#solutions"
              className="flex items-center gap-1 text-[12px] font-semibold text-slate-600 transition-colors hover:text-slate-950"
            >
              Solutions
              <ChevronDown size={12} className="text-slate-400" />
            </a>
            <a
              href="#rules"
              className="text-[12px] font-semibold text-slate-600 transition-colors hover:text-slate-950"
            >
              Rules Engine
            </a>
            <a
              href="#integrations"
              className="text-[12px] font-semibold text-slate-600 transition-colors hover:text-slate-950"
            >
              Integrations
            </a>
            <a
              href="#comparison"
              className="text-[12px] font-semibold text-slate-600 transition-colors hover:text-slate-950"
            >
              Why Docsynecx
            </a>
            <a
              href="#security"
              className="flex items-center gap-1 text-[12px] font-semibold text-slate-600 transition-colors hover:text-slate-950"
            >
              <ShieldCheck size={13} className="text-emerald-600" />
              Trust & Security
            </a>
          </nav>

          <div className="hidden items-center gap-4 sm:flex">
            <a
              href="#calculator"
              className="flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/70 px-3 py-1.5 text-[11px] font-bold text-amber-900 transition-all hover:bg-amber-100/80"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              Free ROI Calculator
            </a>
            <a href="#demo" className="button-primary px-4 py-2 text-[12px]">
              Book a demo
            </a>
          </div>

          <button
            className="rounded-lg p-2 text-slate-700 md:hidden hover:bg-slate-100"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="border-t border-slate-100 bg-white px-5 py-4 md:hidden" aria-label="Mobile navigation">
            <div className="flex flex-col gap-3.5">
              <a
                href="#solutions"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-slate-700 hover:text-blue-600"
              >
                Solutions
              </a>
              <a
                href="#rules"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-slate-700 hover:text-blue-600"
              >
                Rules Engine
              </a>
              <a
                href="#integrations"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-slate-700 hover:text-blue-600"
              >
                Integrations
              </a>
              <a
                href="#comparison"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-slate-700 hover:text-blue-600"
              >
                Why Docsynecx
              </a>
              <a
                href="#security"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-slate-700 hover:text-blue-600 flex items-center gap-1.5"
              >
                <ShieldCheck size={14} className="text-emerald-600" />
                Trust & Security
              </a>
              <a
                href="#calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-amber-800"
              >
                Free ROI Calculator
              </a>
              <a
                href="#demo"
                onClick={() => setMobileMenuOpen(false)}
                className="button-primary mt-2 w-fit px-5 py-2.5 text-xs"
              >
                Book a demo
              </a>
            </div>
          </nav>
        )}
      </header>
    </div>
  );
};
