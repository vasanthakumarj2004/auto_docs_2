import { LogisticsPage } from '@/src/components/logistics/LogisticsPages';
import { logisticsMetadata } from '@/src/lib/logisticsMetadata';

export const metadata = logisticsMetadata('email-to-booking');

export default function EmailToBookingPage() {
  return <LogisticsPage slug="email-to-booking" />;
}
