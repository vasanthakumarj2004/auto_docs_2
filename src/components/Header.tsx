'use client';
import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useRouter } from '../lib/router';
import { NavDropdown } from './NavDropdown';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const { currentPath, navigate } = useRouter();
  const isFinanceActive = currentPath === '/finance' || currentPath === '/accounts-payable';
  const isLogisticsActive = currentPath === '/logistics' || currentPath === '/logistics-trade';

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    setMobileResourcesOpen(false);
    navigate(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md transition-all">
      <div className="site-shell flex h-16 items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
        {/* Brand Logo */}
        <div className="flex items-center justify-start">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/');
            }}
            className="group inline-flex items-center"
            aria-label="AutoDocs home"
          >
            <img
              src="/AutoDocs-Logo.svg"
              alt="AutoDocs"
              className="h-8 sm:h-9 w-auto object-contain transition-opacity group-hover:opacity-90"
            />
          </a>
        </div>

        {/* Desktop Nav - Centered */}
        <nav className="hidden items-center justify-center gap-6 lg:gap-8 md:flex" aria-label="Main navigation">
          <a
            href="/finance"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/finance');
            }}
            className={`inline-flex items-center py-1 text-[13px] font-medium transition-colors duration-150 ${
              isFinanceActive
                ? 'text-brand-violet font-semibold'
                : 'text-slate-600 hover:text-brand-violet'
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
            className={`inline-flex items-center py-1 text-[13px] font-medium transition-colors duration-150 ${
              isLogisticsActive
                ? 'text-brand-violet font-semibold'
                : 'text-slate-600 hover:text-brand-violet'
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
            className="inline-flex items-center py-1 text-[13px] font-medium text-slate-600 transition-colors duration-150 hover:text-brand-violet"
          >
            Industries
          </a>
          <a
            href="#customers"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#customers');
            }}
            className="inline-flex items-center py-1 text-[13px] font-medium text-slate-600 transition-colors duration-150 hover:text-brand-violet"
          >
            Customers
          </a>

          {/* Resources Dropdown */}
          <NavDropdown onNavigate={handleLinkClick} currentPath={currentPath} />

          <a
            href="/calculator"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/calculator');
            }}
            className={`inline-flex items-center py-1 text-[13px] font-medium transition-colors duration-150 ${
              currentPath === '/calculator'
                ? 'text-brand-violet font-semibold'
                : 'text-slate-600 hover:text-brand-violet'
            }`}
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
            className="group inline-flex items-center gap-2 text-[12.5px] font-medium text-slate-600 transition-colors hover:text-brand-violet"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-violet transition-transform duration-150 group-hover:scale-125" />
            <span>Free calculator</span>
          </a>
          <a
            href="#demo"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#demo');
            }}
            className="button-primary rounded-lg px-3.5 py-1.5 text-[12.5px] font-semibold shadow-sm active:scale-[0.98]"
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
              className={`text-sm font-medium transition-colors ${
                isFinanceActive ? 'text-brand-violet font-semibold' : 'text-slate-700 hover:text-brand-violet'
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
              className={`text-sm font-medium transition-colors ${
                isLogisticsActive ? 'text-brand-violet font-semibold' : 'text-slate-700 hover:text-brand-violet'
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
              className="text-sm font-medium text-slate-700 transition-colors hover:text-brand-violet"
            >
              The Problem
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#how-it-works');
              }}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-brand-violet"
            >
              How it works
            </a>
            <a
              href="#why-autodocs"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#why-autodocs');
              }}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-brand-violet"
            >
              Why AutoDocs
            </a>
            <a
              href="#customers"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#customers');
              }}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-brand-violet"
            >
              Customers
            </a>

            {/* Mobile Resources Accordion */}
            <div className="border-y border-slate-100 py-1">
              <button
                type="button"
                onClick={() => setMobileResourcesOpen((prev) => !prev)}
                className="flex w-full items-center justify-between py-2 text-sm font-medium text-slate-700 hover:text-brand-violet transition-colors"
                aria-expanded={mobileResourcesOpen}
              >
                <span>Resources & Products</span>
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${
                    mobileResourcesOpen ? 'rotate-180 text-brand-violet' : 'text-slate-400'
                  }`}
                />
              </button>
              {mobileResourcesOpen && (
                <div className="flex flex-col gap-2 pb-2 pl-2 pt-1 border-l-2 border-brand-violet/30 ml-1">
                  <a
                    href="/finance"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('/finance');
                    }}
                    className="text-xs font-medium text-slate-600 hover:text-brand-violet flex items-center justify-between pr-2 transition-colors"
                  >
                    <span>Invoice Automation (Tally / ERP)</span>
                    <span className="text-[9px] font-bold text-brand-violet bg-violet-50 px-1.5 py-0.5 rounded">NEW</span>
                  </a>
                  <a
                    href="/logistics"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('/logistics');
                    }}
                    className="text-xs font-medium text-slate-600 hover:text-brand-violet flex items-center justify-between pr-2 transition-colors"
                  >
                    <span>Logistics & Supply Chain (CargoWise)</span>
                  </a>
                  <a
                    href="#how-it-works"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('#how-it-works');
                    }}
                    className="text-xs font-medium text-slate-600 hover:text-brand-violet transition-colors"
                  >
                    Workflows & Approvals
                  </a>
                  <a
                    href="/calculator"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('/calculator');
                    }}
                    className="text-xs font-medium text-slate-600 hover:text-brand-violet flex items-center justify-between pr-2 transition-colors"
                  >
                    <span>Free ROI Calculator</span>
                    <span className="text-[9px] font-bold text-violet-700 bg-violet-50 px-1.5 py-0.5 rounded">LIVE</span>
                  </a>
                  <a
                    href="#faq"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('#faq');
                    }}
                    className="text-xs font-medium text-slate-600 hover:text-brand-violet transition-colors"
                  >
                    FAQ & Help Center
                  </a>
                </div>
              )}
            </div>

            <a
              href="#faq"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#faq');
              }}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-brand-violet"
            >
              FAQ
            </a>
            <a
              href="/calculator"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/calculator');
              }}
              className="group flex items-center gap-2 text-sm font-medium text-slate-700 transition-colors hover:text-brand-violet pt-1"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-violet transition-transform group-hover:scale-125" />
              <span>Free calculator</span>
            </a>
            <a
              href="#demo"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#demo');
              }}
              className="button-primary rounded-lg mt-2 w-fit px-5 py-2 text-xs font-semibold shadow-sm active:scale-[0.98]"
            >
              Book a demo
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
