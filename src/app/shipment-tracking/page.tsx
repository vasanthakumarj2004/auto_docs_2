import { LogisticsPage } from '@/src/components/logistics/LogisticsPages';
import { logisticsMetadata } from '@/src/lib/logisticsMetadata';

export const metadata = logisticsMetadata('shipment-tracking');

export default function DirectShipmentTrackingPage() {
  return <LogisticsPage slug="shipment-tracking" />;
}
