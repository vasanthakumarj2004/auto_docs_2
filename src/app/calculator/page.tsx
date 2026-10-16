import type { Metadata } from 'next';
import React from 'react';
import { Header } from '@/src/components/Header';
import { CalculatorPage } from '@/src/views/CalculatorPage';
import { Footer } from '@/src/components/Footer';

export const metadata: Metadata = {
  title: 'Free Accounts Payable & Data-Entry ROI Calculator',
  description:
    'Calculate your monthly hours and financial savings with Docsynecx AI automation. Estimate ledger entry time reduction for Tally, Zoho Books, and CargoWise.',
  alternates: {
    canonical: 'https://docsynecx.com/calculator/',
  },
  openGraph: {
    title: 'Free Accounts Payable ROI Calculator | Docsynecx',
    description:
      'Calculate your monthly hours and financial savings with Docsynecx AI automation.',
    url: 'https://docsynecx.com/calculator/',
    type: 'website',
    images: [
      {
        url: '/Docsynecx-Logo.svg',
        width: 1200,
        height: 630,
        alt: 'Docsynecx ROI Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Accounts Payable ROI Calculator | Docsynecx',
    description:
      'Calculate your monthly hours and financial savings with Docsynecx AI automation.',
    images: ['/Docsynecx-Logo.svg'],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Docsynecx ROI Calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  description:
    'Free calculator to estimate time and cost savings when automating invoice and logistics document processing into Tally and CargoWise.',
  url: 'https://docsynecx.com/calculator/',
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
