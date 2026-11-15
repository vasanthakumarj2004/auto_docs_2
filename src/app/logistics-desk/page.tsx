import { LogisticsPage } from '@/src/components/logistics/LogisticsPages';
import { logisticsMetadata } from '@/src/lib/logisticsMetadata';

export const metadata = logisticsMetadata('overview');
export default function LogisticsDeskOverview() {
  return <LogisticsPage page="overview" />;
}
