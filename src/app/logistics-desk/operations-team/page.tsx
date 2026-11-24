import { LogisticsPersonaPage } from '@/src/components/logistics/LogisticsPersonaPage';
import { logisticsPersonaMetadata } from '@/src/lib/logisticsPersonaMetadata';

export const metadata = logisticsPersonaMetadata('operations-team');

export default function OperationsTeamRoute() {
  return <LogisticsPersonaPage persona="operations-team" />;
}
