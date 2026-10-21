'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useRouter } from '../lib/router';
import { NavDropdown } from './NavDropdown';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentPath, navigate } = useRouter();

  const isFinanceActive = currentPath === '/finance' || currentPath === '/accounts-payable';
  const isLogisticsActive = currentPath === '/logistics' || currentPath === '/logistics-trade';

  // Passive scroll listener for threshold > 20px
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Visual state: transparent hero overlay on '/' when not scrolled; solid white elsewhere
  const isHeroOverlay = currentPath === '/' && !isScrolled;

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    setMobileResourcesOpen(false);
    navigate(href);
  };

  return (
    <header
      className={`${
        currentPath === '/' ? 'fixed' : 'sticky'
      } top-0 inset-x-0 z-50 h-20 transition-all duration-300 ${
        isHeroOverlay
          ? 'bg-transparent border-b border-transparent shadow-none'
          : 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)]'
      }`}
    >
      <div className="site-shell h-full flex items-center justify-between">
        
        {/* ================= 1. LEFT ZONE: ADAPTIVE BRAND LOGO ================= */}
        <div className="flex items-center justify-start">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/');
            }}
            className="group inline-flex items-center gap-2.5 focus:outline-none select-none"
            aria-label="Docsynecx home"
          >
            {/* Blue Icon Mark */}
            <span className="brand-mark h-8 w-8 rounded-lg bg-blue-600 text-white shadow-sm font-bold flex items-center justify-center text-sm shrink-0">
              ~
            </span>

            {/* Wordmark & Subtitle */}
            <div className="flex flex-col">
              <div className="flex items-baseline font-extrabold tracking-tight text-lg leading-none">
                <span className={`transition-colors duration-300 ${isHeroOverlay ? 'text-white' : 'text-slate-900'}`}>
                  Doc
                </span>
                <span className={`ml-0.5 transition-colors duration-300 ${isHeroOverlay ? 'text-sky-400' : 'text-blue-600'}`}>
                  synecx
                </span>
              </div>
              <span
                className={`text-[8px] font-mono font-bold tracking-wider uppercase mt-0.5 transition-colors duration-300 ${
                  isHeroOverlay ? 'text-slate-300/80' : 'text-slate-500'
                }`}
              >
                DOCUMENT AI &amp; AUTOMATION
              </span>
            </div>
          </a>
        </div>

        {/* ================= 2. CENTER ZONE: FLOATING CAPSULE NAVIGATION ================= */}
        <nav className="hidden lg:flex items-center justify-center" aria-label="Main navigation">
          <div
            className={`transition-all duration-300 flex items-center gap-1 ${
              isHeroOverlay
                ? 'rounded-full bg-white/85 backdrop-blur-md border border-white/90 shadow-[0_8px_30px_rgba(15,23,42,0.08)] px-5 py-2'
                : 'bg-transparent border-transparent shadow-none px-2 py-1'
            }`}
          >
            <a
              href="/finance"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/finance');
              }}
              className={`text-sm font-medium px-3 py-1 rounded-full transition-colors ${
                isFinanceActive
                  ? 'text-blue-600 font-semibold bg-blue-50/80'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100/80'
              }`}
            >
              Finance
            </a>

            <a
              href="/logistics"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/logistics');
              }}
              className={`text-sm font-medium px-3 py-1 rounded-full transition-colors ${
                isLogisticsActive
                  ? 'text-emerald-600 font-semibold bg-emerald-50/80'
                  : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-100/80'
              }`}
            >
              Logistics
            </a>

            <a
              href="#problem"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#problem');
              }}
              className="text-sm font-medium px-3 py-1 rounded-full text-slate-700 hover:text-blue-600 hover:bg-slate-100/80 transition-colors"
            >
              Industries
            </a>

            <a
              href="#customers"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#customers');
              }}
              className="text-sm font-medium px-3 py-1 rounded-full text-slate-700 hover:text-blue-600 hover:bg-slate-100/80 transition-colors"
            >
              Customers
            </a>

            {/* Resources Dropdown */}
            <NavDropdown
              onNavigate={handleLinkClick}
              currentPath={currentPath}
              triggerClassName="text-sm font-medium px-3 py-1 rounded-full text-slate-700 hover:text-blue-600 hover:bg-slate-100/80 transition-colors inline-flex items-center gap-1.5 focus:outline-none cursor-pointer"
            />

            <a
              href="/calculator"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/calculator');
              }}
              className={`text-sm font-medium px-3 py-1 rounded-full transition-colors ${
                currentPath === '/calculator'
                  ? 'text-orange-600 font-semibold bg-orange-50/80'
                  : 'text-slate-700 hover:text-orange-600 hover:bg-slate-100/80'
              }`}
            >
              Pricing
            </a>
          </div>
        </nav>

        {/* ================= 3. RIGHT ZONE: ACTION CLUSTER ================= */}
        <div className="hidden md:flex items-center justify-end">
          <div
            className={`transition-all duration-300 flex items-center ${
              isHeroOverlay
                ? 'rounded-full bg-white/80 backdrop-blur-md border border-white/90 shadow-xs pl-4 pr-1.5 py-1.5 gap-4'
                : 'bg-transparent border-transparent shadow-none p-0 gap-5'
            }`}
          >
            {/* Free calculator with animated pulsing dot */}
            <a
              href="/calculator"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/calculator');
              }}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              <span>Free calculator</span>
            </a>

            {/* Book a demo CTA */}
            <a
              href="#demo"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#demo');
              }}
              className="inline-flex items-center justify-center rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.45)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              Book a demo
            </a>
          </div>
        </div>

        {/* ================= 4. RESPONSIVE MOBILE TOGGLE BUTTON ================= */}
        <div className="flex items-center justify-end lg:hidden">
          <button
            type="button"
            className="rounded-xl bg-white/90 backdrop-blur-md border border-slate-200/80 p-2 text-slate-800 shadow-xs hover:bg-white transition-colors cursor-pointer"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* ================= 5. RESPONSIVE MOBILE DRAWER ================= */}
      {mobileMenuOpen && (
        <nav
          className="border-t border-slate-100 bg-white/95 backdrop-blur-xl px-6 py-5 shadow-xl lg:hidden flex flex-col gap-3.5 animate-in slide-in-from-top-2 duration-200"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-3">
            <a
              href="/finance"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/finance');
              }}
              className={`text-sm font-medium transition-colors ${
                isFinanceActive ? 'text-blue-600 font-semibold' : 'text-slate-700 hover:text-blue-600'
              }`}
            >
              Finance
            </a>
            <a
              href="/logistics"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/logistics');
              }}
              className={`text-sm font-medium transition-colors ${
                isLogisticsActive ? 'text-emerald-600 font-semibold' : 'text-slate-700 hover:text-emerald-600'
              }`}
            >
              Logistics
            </a>
            <a
              href="#problem"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#problem');
              }}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-blue-600"
            >
              Industries
            </a>
            <a
              href="#customers"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#customers');
              }}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-blue-600"
            >
              Customers
            </a>

            {/* Mobile Resources Accordion */}
            <div className="border-y border-slate-100 py-1">
              <button
                type="button"
                onClick={() => setMobileResourcesOpen((prev) => !prev)}
                className="flex w-full items-center justify-between py-2 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
                aria-expanded={mobileResourcesOpen}
              >
                <span>Resources &amp; Products</span>
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${
                    mobileResourcesOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'
                  }`}
                />
              </button>
              {mobileResourcesOpen && (
                <div className="flex flex-col gap-2 pb-2 pl-2 pt-1 border-l-2 border-blue-500/30 ml-1">
                  <a
                    href="/finance"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('/finance');
                    }}
                    className="text-xs font-medium text-slate-600 hover:text-blue-600 flex items-center justify-between pr-2 transition-colors"
                  >
                    <span>Invoice Automation (Tally / ERP)</span>
                    <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">NEW</span>
                  </a>
                  <a
                    href="/logistics"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('/logistics');
                    }}
                    className="text-xs font-medium text-slate-600 hover:text-emerald-600 flex items-center justify-between pr-2 transition-colors"
                  >
                    <span>Logistics &amp; Supply Chain (CargoWise)</span>
                  </a>
                  <a
                    href="#how-it-works"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('#how-it-works');
                    }}
                    className="text-xs font-medium text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    Workflows &amp; Approvals
                  </a>
                  <a
                    href="/calculator"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('/calculator');
                    }}
                    className="text-xs font-medium text-slate-600 hover:text-orange-600 flex items-center justify-between pr-2 transition-colors"
                  >
                    <span>Free ROI Calculator</span>
                    <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">LIVE</span>
                  </a>
                  <a
                    href="#faq"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('#faq');
                    }}
                    className="text-xs font-medium text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    FAQ &amp; Help Center
                  </a>
                </div>
              )}
            </div>

            <a
              href="/calculator"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/calculator');
              }}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-orange-600"
            >
              Pricing
            </a>

            <div className="pt-2 flex flex-col gap-3">
              <a
                href="/calculator"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('/calculator');
                }}
                className="group flex items-center gap-2 text-sm font-semibold text-slate-700 transition-colors hover:text-orange-600"
              >
                <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                <span>Free calculator</span>
              </a>
              <a
                href="#demo"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('#demo');
                }}
                className="inline-flex items-center justify-center rounded-xl bg-[#2563EB] w-full py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-600"
              >
                Book a demo
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};
