import { LogisticsOverviewPage } from '@/src/components/logistics/LogisticsOverviewPage';
import { logisticsMetadata } from '@/src/lib/logisticsOverviewMetadata';

export const metadata = logisticsMetadata('overview');
export default function LogisticsDeskOverview() {
  return <LogisticsOverviewPage page="overview" />;
}
