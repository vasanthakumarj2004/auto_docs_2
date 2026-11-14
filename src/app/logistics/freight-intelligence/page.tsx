import { LogisticsPage } from '@/src/components/logistics/LogisticsPages';
import { logisticsMetadata } from '@/src/lib/logisticsMetadata';

export const metadata = logisticsMetadata('freight-intelligence');

export default function FreightIntelligencePage() {
  return <LogisticsPage slug="freight-intelligence" />;
}
