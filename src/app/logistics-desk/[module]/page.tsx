import { notFound } from 'next/navigation';
import { LogisticsPage } from '@/src/components/logistics/LogisticsPages';
import { logisticsModules } from '@/src/content/logistics';
import { logisticsMetadata } from '@/src/lib/logisticsMetadata';

export const dynamicParams = false;

export function generateStaticParams() {
  const base = Object.values(logisticsModules).map(item => ({ module: item.slug }));
  // Add lowercase and legacy aliases so all canonical URLs resolve safely
  return [
    ...base,
    { module: 'email-to-booking' },
    { module: 'rfq-to-booking' },
  ];
}

type Props = { params: Promise<{ module: string }> };

async function getModule(params: Props['params']) {
  const { module } = await params;
  const modLower = module.toLowerCase();

  // Normalize aliases to internal key
  if (modLower === 'email-to-booking' || modLower === 'rfq-to-booking') {
    return 'RFQ-to-booking';
  }

  const item = Object.values(logisticsModules).find(
    item => item.slug.toLowerCase() === modLower
  );
  if (!item) notFound();
  return item.slug;
}

export async function generateMetadata({ params }: Props) {
  const { module } = await params;
  return logisticsMetadata(await getModule(params));
}

export default async function LogisticsModulePage({ params }: Props) {
  return <LogisticsPage slug={await getModule(params)} />;
}
