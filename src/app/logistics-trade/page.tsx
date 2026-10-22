import type { Metadata } from 'next';
import React from 'react';
import { Header } from '@/src/components/Header';
import { LogisticsPage } from '@/src/views/LogisticsPage';
import { Footer } from '@/src/components/Footer';

export const metadata: Metadata = {
  title: 'Logistics & Trade Document Processing | AutoDocs',
  description:
    'Turn customer booking emails and shipment paperwork into structured CargoWise jobs automatically.',
  alternates: {
    canonical: 'https://autodocs.com/logistics/',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LogisticsTradeAliasPage() {
  return (
    <div className="min-h-screen max-w-full overflow-x-clip lg:overflow-visible bg-white text-slate-800">
      <Header />
      <LogisticsPage />
      <Footer />
    </div>
  );
}
