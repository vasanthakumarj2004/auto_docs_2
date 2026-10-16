import type { Metadata } from 'next';
import React from 'react';
import { Header } from '@/src/components/Header';
import { FinancePage } from '@/src/views/FinancePage';
import { Footer } from '@/src/components/Footer';

export const metadata: Metadata = {
  title: 'Accounts Payable Automation | Docsynecx',
  description:
    'Automate vendor bill processing, GST verification, and voucher auto-posting directly to Tally and Zoho Books.',
  alternates: {
    canonical: 'https://docsynecx.com/finance/',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AccountsPayableAliasPage() {
  return (
    <div className="min-h-screen max-w-full overflow-x-clip lg:overflow-visible bg-white text-slate-800">
      <Header />
      <FinancePage />
      <Footer />
    </div>
  );
}
