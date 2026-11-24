import { LogisticsPersonaPage } from '@/src/components/logistics/LogisticsPersonaPage';
import { logisticsPersonaMetadata } from '@/src/lib/logisticsPersonaMetadata';

export const metadata = logisticsPersonaMetadata('pricing-sourcing');

export default function PricingSourcingRoute() {
  return <LogisticsPersonaPage persona="pricing-sourcing" />;
}
