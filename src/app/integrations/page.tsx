import { LogisticsPage } from '@/src/components/logistics/LogisticsPages';
import { logisticsMetadata } from '@/src/lib/logisticsMetadata';

export const metadata = logisticsMetadata('integrations');

export default function IntegrationsRoute() {
  return <LogisticsPage slug="integrations" />;
}
