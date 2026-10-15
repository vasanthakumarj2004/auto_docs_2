import React from 'react';
import { FileText } from 'lucide-react';
import { useRouter } from '../lib/router';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();

  const handleLink = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    navigate(href);
  };

  return (
    <footer id="resources" className="border-t border-slate-200 bg-white pt-16 pb-8">
      <div className="site-shell">
        <div className="grid gap-10 border-b border-slate-200 pb-12 sm:grid-cols-2 md:grid-cols-6">
          {/* Brand Info */}
          <div className="sm:col-span-2">
            <a
              href="/"
              onClick={(e) => handleLink(e, '/')}
              className="flex items-center gap-2.5"
            >
              <span className="brand-mark h-6 w-6">
                <FileText size={13} />
              </span>
              <span className="font-extrabold tracking-[-0.04em] text-slate-950">
                Docsynecx
              </span>
            </a>
            <p className="mt-4 max-w-xs text-xs leading-5 text-slate-500">
              Less typing. More business.
              <br />
              Document workflows for the desks that keep your business moving.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-extrabold text-slate-950">Platform</h4>
            <div className="mt-3 flex flex-col gap-2.5 text-xs text-slate-500">
              <a
                href="#finance"
                onClick={(e) => handleLink(e, '#finance')}
                className="transition-colors hover:text-slate-900"
              >
                Finance desk
              </a>
              <a
                href="#logistics"
                onClick={(e) => handleLink(e, '#logistics')}
                className="transition-colors hover:text-slate-900"
              >
                Shipment desk
              </a>
              <a
                href="#how-it-works"
                onClick={(e) => handleLink(e, '#how-it-works')}
                className="transition-colors hover:text-slate-900"
              >
                How it works
              </a>
            </div>
          </div>

          {/* Integrations */}
          <div>
            <h4 className="text-xs font-extrabold text-slate-950">Integrations</h4>
            <div className="mt-3 flex flex-col gap-2.5 text-xs text-slate-500">
              <span className="transition-colors hover:text-slate-900 cursor-pointer">Tally</span>
              <span className="transition-colors hover:text-slate-900 cursor-pointer">Zoho Books</span>
              <span className="transition-colors hover:text-slate-900 cursor-pointer">CargoWise</span>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-xs font-extrabold text-slate-950">Solutions</h4>
            <div className="mt-3 flex flex-col gap-2.5 text-xs text-slate-500">
              <span className="transition-colors hover:text-slate-900 cursor-pointer">Accounts payable</span>
              <span className="transition-colors hover:text-slate-900 cursor-pointer">Freight operations</span>
              <span className="transition-colors hover:text-slate-900 cursor-pointer">Document checks</span>
            </div>
          </div>

          {/* Resources & Company */}
          <div>
            <h4 className="text-xs font-extrabold text-slate-950">Resources</h4>
            <div className="mt-3 flex flex-col gap-2.5 text-xs text-slate-500">
              <a
                href="/calculator"
                onClick={(e) => handleLink(e, '/calculator')}
                className="transition-colors hover:text-slate-900 font-semibold text-brand-blue"
              >
                Free calculator
              </a>
              <span className="transition-colors hover:text-slate-900 cursor-pointer">Trade insights</span>
              <a
                href="#faq"
                onClick={(e) => handleLink(e, '#faq')}
                className="transition-colors hover:text-slate-900"
              >
                Help centre
              </a>
            </div>

            <h4 className="mt-6 text-xs font-extrabold text-slate-950">Company</h4>
            <div className="mt-3 flex flex-col gap-2.5 text-xs text-slate-500">
              <a
                href="/"
                onClick={(e) => handleLink(e, '/')}
                className="transition-colors hover:text-slate-900"
              >
                About us
              </a>
              <a
                href="#demo"
                onClick={(e) => handleLink(e, '#demo')}
                className="transition-colors hover:text-slate-900"
              >
                Contact
              </a>
              <a
                href="#demo"
                onClick={(e) => handleLink(e, '#demo')}
                className="transition-colors hover:text-slate-900"
              >
                Book a demo
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col justify-between gap-3 pt-6 text-[11px] text-slate-400 sm:flex-row">
          <span>© 2024 Docsynecx. All rights reserved.</span>
          <span className="flex gap-6">
            <a href="/" onClick={(e) => handleLink(e, '/')} className="hover:text-slate-600">
              Privacy
            </a>
            <a href="/" onClick={(e) => handleLink(e, '/')} className="hover:text-slate-600">
              Terms
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};
