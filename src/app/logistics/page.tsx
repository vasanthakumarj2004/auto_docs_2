import { LogisticsOverviewPage } from '@/src/components/logistics/LogisticsOverviewPage';
import { logisticsMetadata } from '@/src/lib/logisticsOverviewMetadata';

export const metadata = logisticsMetadata('overview');
export default function LegacyLogisticsPage() {
  return <LogisticsOverviewPage page="overview" />;
}
