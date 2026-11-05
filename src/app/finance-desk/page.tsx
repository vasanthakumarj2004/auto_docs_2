import { FinancePage } from '@/src/components/finance/FinancePages';
import { financeMetadata } from '@/src/lib/financeMetadata';

export const metadata = financeMetadata('overview');
export default function FinanceDeskOverview() { return <FinancePage />; }
