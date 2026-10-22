'use client';
import React from 'react';
import { useRouter } from '../lib/router';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();

  const handleLink = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    navigate(href);
  };

  return (
    <footer id="resources" className="border-t border-violet-900/40 bg-gradient-to-b from-violet-950 via-violet-950 to-[#1B1224] text-white pt-16 pb-8">
      <div className="site-shell">
        <div className="grid gap-10 border-b border-gray-800 pb-12 sm:grid-cols-2 md:grid-cols-6">
          {/* Brand Info */}
          <div className="sm:col-span-2">
            <a
              href="/"
              onClick={(e) => handleLink(e, '/')}
              className="inline-flex items-center group outline-none"
              aria-label="AutoDocs home"
            >
              <img
                src="/autodocs-logo-footer.svg"
                alt="AutoDocs"
                className="h-10 sm:h-11 w-auto object-contain transition-all duration-300 group-hover:scale-[1.02] group-hover:opacity-95"
              />
            </a>
            <p className="mt-4 max-w-xs text-xs leading-5 text-gray-400">
              The AI-Powered Document Automation Platform for Intelligent Processing, Data Extraction, and Business Workflows.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Platform</h4>
            <div className="mt-3 flex flex-col gap-2.5 text-xs text-gray-400">
              <a
                href="/finance"
                onClick={(e) => handleLink(e, '/finance')}
                className="transition-all duration-200 hover:text-white hover:translate-x-0.5 focus-visible:outline-1 focus-visible:outline-violet-400"
              >
                Finance desk
              </a>
              <a
                href="/logistics"
                onClick={(e) => handleLink(e, '/logistics')}
                className="transition-all duration-200 hover:text-white hover:translate-x-0.5 focus-visible:outline-1 focus-visible:outline-violet-400"
              >
                Shipment desk
              </a>
              <a
                href="#how-it-works"
                onClick={(e) => handleLink(e, '#how-it-works')}
                className="transition-all duration-200 hover:text-white hover:translate-x-0.5 focus-visible:outline-1 focus-visible:outline-violet-400"
              >
                How it works
              </a>
            </div>
          </div>

          {/* Integrations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Integrations</h4>
            <div className="mt-3 flex flex-col gap-2.5 text-xs text-gray-400">
              <span className="transition-all duration-200 hover:text-white hover:translate-x-0.5 cursor-pointer">Tally</span>
              <span className="transition-all duration-200 hover:text-white hover:translate-x-0.5 cursor-pointer">Zoho Books</span>
              <span className="transition-all duration-200 hover:text-white hover:translate-x-0.5 cursor-pointer">CargoWise</span>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Solutions</h4>
            <div className="mt-3 flex flex-col gap-2.5 text-xs text-gray-400">
              <span className="transition-all duration-200 hover:text-white hover:translate-x-0.5 cursor-pointer">Accounts payable</span>
              <span className="transition-all duration-200 hover:text-white hover:translate-x-0.5 cursor-pointer">Freight operations</span>
              <span className="transition-all duration-200 hover:text-white hover:translate-x-0.5 cursor-pointer">Document checks</span>
            </div>
          </div>

          {/* Resources & Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Resources</h4>
            <div className="mt-3 flex flex-col gap-2.5 text-xs text-gray-400">
              <a
                href="/calculator"
                onClick={(e) => handleLink(e, '/calculator')}
                className="transition-all duration-200 hover:text-violet-300 hover:translate-x-0.5 font-semibold text-violet-400 focus-visible:outline-1 focus-visible:outline-violet-400"
              >
                Free calculator
              </a>
              <span className="transition-all duration-200 hover:text-white hover:translate-x-0.5 cursor-pointer">Trade insights</span>
              <a
                href="#faq"
                onClick={(e) => handleLink(e, '#faq')}
                className="transition-all duration-200 hover:text-white hover:translate-x-0.5 focus-visible:outline-1 focus-visible:outline-violet-400"
              >
                Help centre
              </a>
            </div>

            <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-white">Company</h4>
            <div className="mt-3 flex flex-col gap-2.5 text-xs text-gray-400">
              <a
                href="/"
                onClick={(e) => handleLink(e, '/')}
                className="transition-all duration-200 hover:text-white hover:translate-x-0.5 focus-visible:outline-1 focus-visible:outline-violet-400"
              >
                About us
              </a>
              <a
                href="#demo"
                onClick={(e) => handleLink(e, '#demo')}
                className="transition-all duration-200 hover:text-white hover:translate-x-0.5 focus-visible:outline-1 focus-visible:outline-violet-400"
              >
                Contact
              </a>
              <a
                href="#demo"
                onClick={(e) => handleLink(e, '#demo')}
                className="transition-all duration-200 hover:text-white hover:translate-x-0.5 focus-visible:outline-1 focus-visible:outline-violet-400"
              >
                Book a demo
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col justify-between gap-3 pt-6 text-[11px] text-gray-400 sm:flex-row">
          <span>© 2026 AutoDocs AI Labs Private Limited. All rights reserved.</span>
          <span className="flex gap-6">
            <a href="/" onClick={(e) => handleLink(e, '/')} className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="/" onClick={(e) => handleLink(e, '/')} className="hover:text-white transition-colors">
              Terms
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};
