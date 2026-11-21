import type { Metadata } from 'next';
import { SolutionsPage } from '@/src/components/SolutionsPage';
import { constructMetadata } from '@/src/lib/seo';

export const metadata: Metadata = constructMetadata('/solutions/');

export default function SolutionsRoute() {
  return <SolutionsPage />;
}
