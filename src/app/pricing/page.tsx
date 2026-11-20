import type { Metadata } from 'next';
import { PricingPage } from '@/src/components/pricing/PricingPage';

export const metadata: Metadata = {
  title: 'Pricing | Docsynecx',
  description:
    'Docsynecx Finance plans and Logistics modules, sized to your document volume. Pay for the hours you get back, with limits, modules and support written into your proposal.',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: 'Pricing | Docsynecx',
    description:
      'Docsynecx Finance plans and Logistics modules, sized to your document volume. Pay for the hours you get back, with limits, modules and support written into your proposal.',
    url: 'https://docsynecx.com/pricing',
    siteName: 'Docsynecx',
  },
};

export default function PricingRoute() {
  return <PricingPage />;
}
