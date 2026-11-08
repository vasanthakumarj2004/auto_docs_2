import { FinancePage } from '@/src/components/finance/FinancePages';
import { financeMetadata } from '@/src/lib/financeMetadata';

// Preserve existing bookmarks in the static export with the new canonical URL.
export const metadata = financeMetadata('accounts-payable');
export default function LegacyFinancePage() { return <FinancePage page="accounts-payable" />; }
