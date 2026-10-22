import type { Metadata } from 'next';
import React from 'react';
import { Header } from '@/src/components/Header';
import { CalculatorPage } from '@/src/views/CalculatorPage';
import { Footer } from '@/src/components/Footer';

export const metadata: Metadata = {
  title: 'Free Accounts Payable & Data-Entry ROI Calculator',
  description:
    'Calculate your monthly hours and financial savings with AutoDocs AI automation. Estimate ledger entry time reduction for Tally, Zoho Books, and CargoWise.',
  alternates: {
    canonical: 'https://autodocs.com/calculator/',
  },
  openGraph: {
    title: 'Free Accounts Payable ROI Calculator | AutoDocs',
    description:
      'Calculate your monthly hours and financial savings with AutoDocs AI automation.',
    url: 'https://autodocs.com/calculator/',
    type: 'website',
    images: [
      {
        url: '/AutoDocs-Logo.svg',
        width: 1200,
        height: 630,
        alt: 'AutoDocs ROI Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Accounts Payable ROI Calculator | AutoDocs',
    description:
      'Calculate your monthly hours and financial savings with AutoDocs AI automation.',
    images: ['/AutoDocs-Logo.svg'],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AutoDocs ROI Calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  description:
    'Free calculator to estimate time and cost savings when automating invoice and logistics document processing into Tally and CargoWise.',
  url: 'https://autodocs.com/calculator/',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default function CalculatorRoutePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <div className="min-h-screen max-w-full overflow-x-clip lg:overflow-visible bg-white text-slate-800">
        <Header />
        <CalculatorPage />
        <Footer />
      </div>
    </>
  );
}
