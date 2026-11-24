import { LogisticsPersonaPage } from '@/src/components/logistics/LogisticsPersonaPage';
import { logisticsPersonaMetadata } from '@/src/lib/logisticsPersonaMetadata';

export const metadata = logisticsPersonaMetadata('freight-forwarders');

export default function FreightForwardersRoute() {
  return <LogisticsPersonaPage persona="freight-forwarders" />;
}
