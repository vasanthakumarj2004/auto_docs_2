import type { Metadata } from 'next';
import { SolutionsPage } from '@/src/components/SolutionsPage';

export const metadata: Metadata = {
  title: 'Industry Solutions — Automotive, Manufacturing, Textile, Retail & Logistics | Docsynecx',
  description:
    'Purpose-built AI document automation workflows for Automotive, Industrial Manufacturing, Textile & Garments, Retail & Distribution, and Logistics & Freight Forwarders. Integrate with Tally, SAP, and CargoWise.',
  alternates: {
    canonical: '/solutions',
  },
  openGraph: {
    title: 'Industry Solutions — Docsynecx Document AI Platform',
    description:
      'Purpose-built AI document automation workflows for Automotive, Industrial Manufacturing, Textile & Garments, Retail & Distribution, and Logistics & Freight Forwarders.',
    url: 'https://docsynecx.com/solutions',
    siteName: 'Docsynecx',
  },
};

export default function SolutionsRoute() {
  return <SolutionsPage />;
}
