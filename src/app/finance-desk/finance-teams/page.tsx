import { FinancePersonaPage } from '@/src/components/finance/FinancePersonaPage';
import { personaMetadata } from '@/src/lib/personaMetadata';

export const metadata = personaMetadata('finance-teams');

export default function FinanceTeamsPage() {
  return <FinancePersonaPage persona="finance-teams" />;
}
