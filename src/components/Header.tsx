import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useRouter } from '../lib/router';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const { currentPath, navigate } = useRouter();
  const isFinanceActive = currentPath === '/finance' || currentPath === '/accounts-payable';
  const isLogisticsActive = currentPath === '/logistics' || currentPath === '/logistics-trade';

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    setResourcesOpen(false);
    navigate(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/95 backdrop-blur-md">
      <div className="site-shell flex h-[68px] items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
        {/* Brand Logo */}
        <div className="flex items-center justify-start">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/');
            }}
            className="group inline-flex items-center"
            aria-label="Docsynecx home"
          >
            <img
              src="/Docsynecx-Logo.svg"
              alt="Docsynecx"
              className="h-9 sm:h-10 w-auto object-contain transition-opacity group-hover:opacity-90"
            />
          </a>
        </div>

        {/* Desktop Nav - Centered */}
        <nav className="hidden items-center justify-center gap-6 lg:gap-7 md:flex" aria-label="Main navigation">
          <a
            href="/finance"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/finance');
            }}
            className={`inline-flex items-center py-1 text-[13px] font-semibold transition-colors ${
              isFinanceActive
                ? 'text-brand-blue font-bold'
                : 'text-slate-600 hover:text-slate-950'
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
            className={`inline-flex items-center py-1 text-[13px] font-semibold transition-colors ${
              isLogisticsActive
                ? 'text-brand-teal font-bold'
                : 'text-slate-600 hover:text-slate-950'
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
            className="inline-flex items-center py-1 text-[13px] font-semibold text-slate-600 transition-colors hover:text-slate-950"
          >
            Industries
          </a>
          <a
            href="#customers"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#customers');
            }}
            className="inline-flex items-center py-1 text-[13px] font-semibold text-slate-600 transition-colors hover:text-slate-950"
          >
            Customers
          </a>

          {/* Resources Dropdown */}
          <div className="relative inline-flex items-center">
            <button
              type="button"
              onClick={() => setResourcesOpen((prev) => !prev)}
              className="inline-flex items-center gap-1 py-1 text-[13px] font-semibold text-slate-600 transition-colors hover:text-slate-950 focus:outline-none cursor-pointer"
              aria-expanded={resourcesOpen}
            >
              <span>Resources</span>
              <ChevronDown
                size={12}
                className={`transition-transform duration-200 ${
                  resourcesOpen ? 'rotate-180 text-brand-blue' : 'text-slate-400'
                }`}
              />
            </button>
            {resourcesOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-lg z-50">
                <a
                  href="/calculator"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick('/calculator');
                  }}
                  className="block rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-blue"
                >
                  Free ROI Calculator
                </a>
                <a
                  href="#how-it-works"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick('#how-it-works');
                  }}
                  className="block rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-blue"
                >
                  How It Works
                </a>
                <a
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick('#faq');
                  }}
                  className="block rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-blue"
                >
                  FAQ & Support
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
            className="inline-flex items-center py-1 text-[13px] font-semibold text-slate-600 transition-colors hover:text-slate-950"
          >
            Pricing
          </a>
        </nav>

        {/* Right CTA cluster */}
        <div className="hidden items-center justify-end gap-5 md:flex">
          <a
            href="/calculator"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/calculator');
            }}
            className="inline-flex items-center gap-2 text-[12px] font-bold text-slate-700 transition-colors hover:text-brand-blue"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orange shrink-0" />
            <span>Free calculator</span>
          </a>
          <a
            href="#demo"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#demo');
            }}
            className="button-primary px-4 py-2 text-[12px]"
          >
            Book a demo
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center justify-end md:hidden">
          <button
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 cursor-pointer"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav className="border-t border-slate-100 bg-white px-5 py-4 md:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-3.5">
            <a
              href="/finance"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/finance');
              }}
              className={`text-sm font-semibold ${
                isFinanceActive ? 'text-brand-blue font-bold' : 'text-slate-700'
              }`}
            >
              Finance Desk
            </a>
            <a
              href="/logistics"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/logistics');
              }}
              className={`text-sm font-semibold ${
                isLogisticsActive ? 'text-brand-teal font-bold' : 'text-slate-700'
              }`}
            >
              Logistics Desk
            </a>
            <a
              href="#problem"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#problem');
              }}
              className="text-sm font-semibold text-slate-700"
            >
              The Problem
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#how-it-works');
              }}
              className="text-sm font-semibold text-slate-700"
            >
              How it works
            </a>
            <a
              href="#why-docsynecx"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#why-docsynecx');
              }}
              className="text-sm font-semibold text-slate-700"
            >
              Why Docsynecx
            </a>
            <a
              href="#customers"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#customers');
              }}
              className="text-sm font-semibold text-slate-700"
            >
              Customers
            </a>
            <a
              href="#faq"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#faq');
              }}
              className="text-sm font-semibold text-slate-700"
            >
              FAQ
            </a>
            <a
              href="/calculator"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/calculator');
              }}
              className="flex items-center gap-2 text-sm font-bold text-brand-orange pt-1"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
              Free calculator
            </a>
            <a
              href="#demo"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#demo');
              }}
              className="button-primary mt-2 w-fit px-5 py-2.5 text-xs"
            >
              Book a demo
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
