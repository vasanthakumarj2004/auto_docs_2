import type { Metadata } from 'next';
import { PricingPage } from '@/src/components/pricing/PricingPage';

export const metadata: Metadata = {
  title: 'Pricing & Plans — Docsynecx Finance & Logistics Document Automation',
  description:
    'Explore scope-based plans and modules across Docsynecx Finance and Docsynecx Logistics. Transparent, tailored enterprise scoping for your intelligent document automation workflows.',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: 'Pricing & Plans — Docsynecx Intelligent Business Automation',
    description:
      'Explore scope-based plans and modular configurations across Docsynecx Finance and Docsynecx Logistics.',
    url: 'https://docsynecx.com/pricing',
    siteName: 'Docsynecx',
  },
};

export default function PricingRoute() {
  return <PricingPage />;
}
