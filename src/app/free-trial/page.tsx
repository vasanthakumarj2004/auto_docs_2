import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';

export const metadata: Metadata = {
  title: 'Free Trial Registration | AutoDocs',
  description:
    'Register for the AutoDocs free trial. Batch onboarding for automated invoice and logistics document processing into Tally and CargoWise.',
  alternates: {
    canonical: 'https://autodocs.com/free-trial/',
  },
};

export default function FreeTrialPage() {
  return (
    <div className="min-h-screen max-w-full overflow-x-clip lg:overflow-visible bg-white text-slate-800">
      <Header />
      <div className="py-24 text-center site-shell">
        <span className="font-mono text-xs uppercase tracking-wider text-brand-violet font-bold">
          Early Access
        </span>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-950 sm:text-4xl">
          Free Trial Registration
        </h1>
        <p className="mt-3 text-sm text-slate-600 max-w-md mx-auto">
          Free trial registrations are being onboarded in batches alongside our
          banking partner rollout.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/#demo" className="button-primary cursor-pointer">
            Book a demo for instant access
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
