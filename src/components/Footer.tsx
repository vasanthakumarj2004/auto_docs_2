import React from 'react';
import { FileText } from 'lucide-react';

interface FooterColumnProps {
  title: string;
  links: string[];
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => {
  const getHref = (link: string) => {
    switch (link) {
      case 'Free calculator':
        return '#calculator';
      case 'Finance desk':
        return '#finance';
      case 'Shipment desk':
        return '#logistics';
      case 'Contact':
      case 'Book a demo':
        return '#demo';
      default:
        return '#top';
    }
  };

  return (
    <div>
      <h4 className="text-xs font-extrabold text-slate-950">{title}</h4>
      <div className="mt-3 flex flex-col gap-2 text-xs text-slate-500">
        {links.map((link) => (
          <a
            key={link}
            href={getHref(link)}
            className="transition-colors hover:text-slate-900"
          >
            {link}
          </a>
        ))}
      </div>
    </div>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer id="resources" className="bg-white pt-12">
      <div className="site-shell">
        <div className="grid gap-10 border-b border-slate-200 pb-10 sm:grid-cols-2 md:grid-cols-6">
          <div className="sm:col-span-2">
            <a href="#top" className="flex items-center gap-2.5">
              <span className="brand-mark h-6 w-6">
                <FileText size={13} />
              </span>
              <span className="font-extrabold tracking-[-0.04em] text-slate-950">Docsynecx</span>
            </a>
            <p className="mt-4 max-w-xs text-xs leading-5 text-slate-500">
              Less typing. More business.
              <br />
              Document workflows for the desks that keep your business moving.
            </p>
          </div>

          <FooterColumn title="Platform" links={['Finance desk', 'Shipment desk', 'How it works']} />
          <FooterColumn title="Integrations" links={['Tally', 'Zoho Books', 'CargoWise']} />
          <FooterColumn title="Solutions" links={['Accounts payable', 'Freight operations', 'Document checks']} />

          <div>
            <FooterColumn title="Resources" links={['Free calculator', 'Trade insights', 'Help centre']} />
            <h4 className="mt-6 text-xs font-extrabold text-slate-950">Company</h4>
            <div className="mt-3 flex flex-col gap-2 text-xs text-slate-500">
              <a href="#top" className="hover:text-slate-900">
                About us
              </a>
              <a href="#demo" className="hover:text-slate-900">
                Contact
              </a>
              <a href="#demo" className="hover:text-slate-900">
                Book a demo
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 py-6 text-[10px] text-slate-400 sm:flex-row">
          <span>© 2024 Docsynecx. All rights reserved.</span>
          <span className="flex gap-6">
            <a href="#top" className="hover:text-slate-600">
              Privacy
            </a>
            <a href="#top" className="hover:text-slate-600">
              Terms
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};
