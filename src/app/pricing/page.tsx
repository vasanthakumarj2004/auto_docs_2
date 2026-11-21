import type { Metadata } from 'next';
import { PricingPage } from '@/src/components/pricing/PricingPage';
import { constructMetadata } from '@/src/lib/seo';

export const metadata: Metadata = constructMetadata('/pricing/');

export default function PricingRoute() {
  return <PricingPage />;
}
