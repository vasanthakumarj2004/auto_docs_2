import { LogisticsPage } from '@/src/components/logistics/LogisticsPages';
import { logisticsMetadata } from '@/src/lib/logisticsMetadata';

export const metadata = logisticsMetadata('overview');
export default function LegacyLogisticsPage() {
  return <LogisticsPage page="overview" />;
}
