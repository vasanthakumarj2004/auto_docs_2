import { LogisticsPage } from '@/src/components/logistics/LogisticsPages';
import { logisticsMetadata } from '@/src/lib/logisticsMetadata';

export const metadata = logisticsMetadata('shipment-operations');

export default function DirectShipmentOperationsPage() {
  return <LogisticsPage slug="shipment-operations" />;
}
