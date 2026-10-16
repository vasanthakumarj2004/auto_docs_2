import type { Metadata } from 'next';
import React from 'react';
import { Header } from '@/src/components/Header';
import { LogisticsPage } from '@/src/views/LogisticsPage';
import { Footer } from '@/src/components/Footer';

export const metadata: Metadata = {
  title: 'Logistics Document Automation & CargoWise Sync',
  description:
    'Turn customer booking emails and shipment paperwork into structured CargoWise jobs automatically. Spot document mismatches across BLs, packing lists, and invoices before freight moves.',
  alternates: {
    canonical: 'https://docsynecx.com/logistics/',
  },
  openGraph: {
    title: 'Logistics Document Automation & CargoWise Sync | Docsynecx',
    description:
      'Turn customer booking emails and shipment paperwork into structured CargoWise jobs automatically with AI checks.',
    url: 'https://docsynecx.com/logistics/',
    type: 'website',
    images: [
      {
        url: '/Docsynecx-Logo.svg',
        width: 1200,
        height: 630,
        alt: 'Docsynecx Logistics Desk',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Logistics Document Automation & CargoWise Sync | Docsynecx',
    description:
      'Turn customer booking emails and shipment paperwork into structured CargoWise jobs automatically with AI checks.',
    images: ['/Docsynecx-Logo.svg'],
  },
};

const logisticsServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Docsynecx Logistics Desk',
  provider: {
    '@type': 'Organization',
    name: 'Docsynecx',
    url: 'https://docsynecx.com',
  },
  serviceType: 'Freight Document Processing & CargoWise Job Automation',
  description:
    'Converts shipping instructions, bills of lading, arrival notices, and commercial invoices into structured CargoWise One jobs with exception detection.',
  url: 'https://docsynecx.com/logistics/',
};

export default function LogisticsRoutePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(logisticsServiceSchema),
        }}
      />
      <div className="min-h-screen max-w-full overflow-x-clip lg:overflow-visible bg-white text-slate-800">
        <Header />
        <LogisticsPage />
        <Footer />
      </div>
    </>
  );
}
