import type { Metadata } from 'next';
import { BookADemoPage } from '@/src/components/demo/BookADemoPage';
import { constructMetadata } from '@/src/lib/seo';

export const metadata: Metadata = constructMetadata('/demo/');

export default function DemoRoute() {
  return <BookADemoPage />;
}
