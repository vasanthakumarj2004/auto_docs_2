import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';

export const metadata: Metadata = {
  title: 'Customer Case Study: Rajadurai E-Vehicles | Docsynecx',
  description:
    'How Rajadurai E-Vehicles condensed purchase, spares and service ledger entries from days to hours with Docsynecx automated Tally voucher posting.',
  alternates: {
    canonical: 'https://docsynecx.com/customers/rajadurai/',
  },
};

export default function RajaduraiCaseStudyPage() {
  return (
    <div className="min-h-screen max-w-full overflow-x-clip lg:overflow-visible bg-white text-slate-800">
      <Header />
      <div className="py-24 text-center site-shell">
        <span className="font-mono text-xs uppercase tracking-wider text-emerald-700 font-bold">
          Customer Case Study
        </span>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-950 sm:text-4xl">
          Rajadurai E-Vehicles
        </h1>
        <p className="mt-3 text-sm text-slate-600 max-w-lg mx-auto">
          Case study: How Rajadurai E-Vehicles condensed purchase, spares and
          service ledger entries from days to hours with Docsynecx.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/#demo" className="button-primary cursor-pointer">
            Book a walkthrough
          </Link>
          <Link href="/finance" className="button-secondary cursor-pointer">
            Back to Finance
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
