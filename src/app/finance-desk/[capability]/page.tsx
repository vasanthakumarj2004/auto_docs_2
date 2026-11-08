import { notFound } from 'next/navigation';
import { FinancePage } from '@/src/components/finance/FinancePages';
import { financeCapabilities } from '@/src/content/finance';
import { financeMetadata } from '@/src/lib/financeMetadata';

export const dynamicParams = false;
export function generateStaticParams() { return financeCapabilities.map(item => ({ capability: item.slug })); }
type Props = { params: Promise<{ capability: string }> };
async function getCapability(params: Props['params']) {
  const { capability } = await params;
  const item = financeCapabilities.find(item => item.slug === capability);
  if (!item) notFound();
  return item.slug;
}
export async function generateMetadata({ params }: Props) { return financeMetadata(await getCapability(params)); }
export default async function FinanceCapabilityPage({ params }: Props) { return <FinancePage page={await getCapability(params)} />; }
