import { notFound } from 'next/navigation';
import { LogisticsPage } from '@/src/components/logistics/LogisticsPages';
import { logisticsModules } from '@/src/content/logistics';
import { logisticsMetadata } from '@/src/lib/logisticsMetadata';

export const dynamicParams = false;

export function generateStaticParams() {
  // Always emit lowercase canonical paths first to avoid Windows casing collisions
  const base = Object.values(logisticsModules).map(item => ({ module: item.slug.toLowerCase() }));
  return [
    ...base,
    { module: 'rfq-to-booking' },
    { module: 'email-to-booking' },
    { module: 'RFQ-to-booking' },
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
