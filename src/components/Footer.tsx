import React from 'react';
import { useRouter } from '../lib/router';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();

  const handleLink = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    navigate(href);
  };

  return (
    <footer id="resources" className="border-t border-gray-800 bg-gray-900 text-white pt-16 pb-8">
      <div className="site-shell">
        <div className="grid gap-10 border-b border-gray-800 pb-12 sm:grid-cols-2 md:grid-cols-6">
          {/* Brand Info */}
          <div className="sm:col-span-2">
            <a
              href="/"
              onClick={(e) => handleLink(e, '/')}
              className="flex items-center"
              aria-label="Docsynecx home"
            >
              <img
                src="/Docsynecx-Logo-footer.svg"
                alt="Docsynecx"
                className="h-10 sm:h-11 w-auto object-contain transition-opacity hover:opacity-90"
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
                className="transition-colors hover:text-white"
              >
                Finance desk
              </a>
              <a
                href="/logistics"
                onClick={(e) => handleLink(e, '/logistics')}
                className="transition-colors hover:text-white"
              >
                Shipment desk
              </a>
              <a
                href="#how-it-works"
                onClick={(e) => handleLink(e, '#how-it-works')}
                className="transition-colors hover:text-white"
              >
                How it works
              </a>
            </div>
          </div>

          {/* Integrations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Integrations</h4>
            <div className="mt-3 flex flex-col gap-2.5 text-xs text-gray-400">
              <span className="transition-colors hover:text-white cursor-pointer">Tally</span>
              <span className="transition-colors hover:text-white cursor-pointer">Zoho Books</span>
              <span className="transition-colors hover:text-white cursor-pointer">CargoWise</span>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Solutions</h4>
            <div className="mt-3 flex flex-col gap-2.5 text-xs text-gray-400">
              <span className="transition-colors hover:text-white cursor-pointer">Accounts payable</span>
              <span className="transition-colors hover:text-white cursor-pointer">Freight operations</span>
              <span className="transition-colors hover:text-white cursor-pointer">Document checks</span>
            </div>
          </div>

          {/* Resources & Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Resources</h4>
            <div className="mt-3 flex flex-col gap-2.5 text-xs text-gray-400">
              <a
                href="/calculator"
                onClick={(e) => handleLink(e, '/calculator')}
                className="transition-colors hover:text-blue-300 font-semibold text-blue-400"
              >
                Free calculator
              </a>
              <span className="transition-colors hover:text-white cursor-pointer">Trade insights</span>
              <a
                href="#faq"
                onClick={(e) => handleLink(e, '#faq')}
                className="transition-colors hover:text-white"
              >
                Help centre
              </a>
            </div>

            <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-white">Company</h4>
            <div className="mt-3 flex flex-col gap-2.5 text-xs text-gray-400">
              <a
                href="/"
                onClick={(e) => handleLink(e, '/')}
                className="transition-colors hover:text-white"
              >
                About us
              </a>
              <a
                href="#demo"
                onClick={(e) => handleLink(e, '#demo')}
                className="transition-colors hover:text-white"
              >
                Contact
              </a>
              <a
                href="#demo"
                onClick={(e) => handleLink(e, '#demo')}
                className="transition-colors hover:text-white"
              >
                Book a demo
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col justify-between gap-3 pt-6 text-[11px] text-gray-400 sm:flex-row">
          <span>© 2026 SynecxAI Labs Private Limited. All rights reserved.</span>
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
