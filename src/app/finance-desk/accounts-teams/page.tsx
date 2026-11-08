import { FinancePersonaPage } from '@/src/components/finance/FinancePersonaPage';
import { personaMetadata } from '@/src/lib/personaMetadata';

export const metadata = personaMetadata('accounts-teams');

export default function AccountsTeamsPage() {
  return <FinancePersonaPage persona="accounts-teams" />;
}
