import { FinancePersonaPage } from '@/src/components/finance/FinancePersonaPage';
import { personaMetadata } from '@/src/lib/personaMetadata';

export const metadata = personaMetadata('business-owners');

export default function BusinessOwnersPage() {
  return <FinancePersonaPage persona="business-owners" />;
}
