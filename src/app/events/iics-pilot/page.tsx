import type { Metadata } from 'next';
import { IICSPilotBookingPage } from '@/src/components/events/IICSPilotBookingPage';
import { constructMetadata } from '@/src/lib/seo';

export const metadata: Metadata = constructMetadata('/events/iics-pilot/');

export default function IICSPilotRoute() {
  return <IICSPilotBookingPage />;
}
