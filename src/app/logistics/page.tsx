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
    canonical: 'https://autodocs.com/logistics/',
  },
  openGraph: {
    title: 'Logistics Document Automation & CargoWise Sync | AutoDocs',
    description:
      'Turn customer booking emails and shipment paperwork into structured CargoWise jobs automatically with AI checks.',
    url: 'https://autodocs.com/logistics/',
    type: 'website',
    images: [
      {
        url: '/AutoDocs-Logo.svg',
        width: 1200,
        height: 630,
        alt: 'AutoDocs Logistics Desk',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Logistics Document Automation & CargoWise Sync | AutoDocs',
    description:
      'Turn customer booking emails and shipment paperwork into structured CargoWise jobs automatically with AI checks.',
    images: ['/AutoDocs-Logo.svg'],
  },
};

const logisticsServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AutoDocs Logistics Desk',
  provider: {
    '@type': 'Organization',
    name: 'AutoDocs',
    url: 'https://autodocs.com',
  },
  serviceType: 'Freight Document Processing & CargoWise Job Automation',
  description:
    'Converts shipping instructions, bills of lading, arrival notices, and commercial invoices into structured CargoWise One jobs with exception detection.',
  url: 'https://autodocs.com/logistics/',
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
