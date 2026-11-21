import type { Metadata } from 'next';
import { IICS2026EventPage } from '@/src/components/events/IICS2026EventPage';
import { constructMetadata } from '@/src/lib/seo';

export const metadata: Metadata = constructMetadata('/events/iics-2026/');

export default function IICS2026Route() {
  return <IICS2026EventPage />;
}
