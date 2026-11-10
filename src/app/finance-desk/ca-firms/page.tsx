import { FinancePersonaPage } from '@/src/components/finance/FinancePersonaPage';
import { personaMetadata } from '@/src/lib/personaMetadata';

export const metadata = personaMetadata('ca-firms');

export default function CaFirmsPage() {
  return <FinancePersonaPage persona="ca-firms" />;
}
