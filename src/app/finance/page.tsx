import type { Metadata } from 'next';
import React from 'react';
import { Header } from '@/src/components/Header';
import { FinancePage } from '@/src/views/FinancePage';
import { Footer } from '@/src/components/Footer';

export const metadata: Metadata = {
  title: 'AI Accounts Payable & Tally Automation Desk',
  description:
    'Automate vendor bill processing, GST verification, 3-way matching, and auto-post vouchers directly into Tally and Zoho Books. Eliminate 95% of manual ledger entry with Docsynecx.',
  alternates: {
    canonical: 'https://docsynecx.com/finance/',
  },
  openGraph: {
    title: 'AI Accounts Payable & Tally Automation Desk | Docsynecx',
    description:
      'Automate vendor bill processing, GST verification, 3-way matching, and auto-post vouchers directly into Tally and Zoho Books.',
    url: 'https://docsynecx.com/finance/',
    type: 'website',
    images: [
      {
        url: '/Docsynecx-Logo.svg',
        width: 1200,
        height: 630,
        alt: 'Docsynecx Finance Desk',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Accounts Payable & Tally Automation Desk | Docsynecx',
    description:
      'Automate vendor bill processing, GST verification, 3-way matching, and auto-post vouchers directly into Tally and Zoho Books.',
    images: ['/Docsynecx-Logo.svg'],
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Docsynecx Finance Desk',
  provider: {
    '@type': 'Organization',
    name: 'Docsynecx',
    url: 'https://docsynecx.com',
  },
  serviceType: 'Accounts Payable Automation & ERP Voucher Posting',
  description:
    'End-to-end automation of accounts payable: invoice extraction, duplicate detection, GST validation, and automated posting into TallyPrime and Zoho Books.',
  url: 'https://docsynecx.com/finance/',
};

export default function FinanceRoutePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <div className="min-h-screen max-w-full overflow-x-clip lg:overflow-visible bg-white text-slate-800">
        <Header />
        <FinancePage />
        <Footer />
      </div>
    </>
  );
}
