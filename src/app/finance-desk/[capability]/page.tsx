import { notFound, redirect } from 'next/navigation';
import { FinancePage } from '@/src/components/finance/FinancePages';
import { financeCapabilities } from '@/src/content/finance';
import { financeMetadata } from '@/src/lib/financeMetadata';

export const dynamicParams = false;

const integrationRedirects: Record<string, string> = {
  'integration-tally': '/finance-desk/#integration-tally',
  'integration-zoho': '/finance-desk/#integration-zoho',
  'integration-erp': '/finance-desk/#integration-erp',
};

export function generateStaticParams() {
  const base = financeCapabilities.map(item => ({ capability: item.slug }));
  return [
    ...base,
    { capability: 'invoice-automation' },
    ...Object.keys(integrationRedirects).map(capability => ({ capability })),
  ];
}
type Props = { params: Promise<{ capability: string }> };
function getCapability(capability: string) {
  if (capability === 'invoice-automation') {
    return 'invoice-processing';
  }
  const item = financeCapabilities.find(item => item.slug === capability);
  if (!item) notFound();
  return item.slug;
}

export async function generateMetadata({ params }: Props) {
  const { capability } = await params;
  return financeMetadata(
    integrationRedirects[capability] ? 'overview' : getCapability(capability),
  );
}

export default async function FinanceCapabilityPage({ params }: Props) {
  const { capability } = await params;
  const integrationRedirect = integrationRedirects[capability];
  if (integrationRedirect) {
    if (process.env.NODE_ENV === 'development') redirect(integrationRedirect);
    return <FinancePage page="overview" />;
  }
  return <FinancePage page={getCapability(capability)} />;
}
