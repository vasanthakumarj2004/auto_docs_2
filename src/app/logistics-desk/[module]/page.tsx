import { notFound } from 'next/navigation';
import { LogisticsPage } from '@/src/components/logistics/LogisticsPages';
import { logisticsModules } from '@/src/content/logistics';
import { logisticsMetadata } from '@/src/lib/logisticsMetadata';

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(logisticsModules).map(item => ({ module: item.slug }));
}

type Props = { params: Promise<{ module: string }> };

async function getModule(params: Props['params']) {
  const { module } = await params;
  const item = Object.values(logisticsModules).find(item => item.slug === module);
  if (!item) notFound();
  return item.slug;
}

export async function generateMetadata({ params }: Props) {
  return logisticsMetadata(await getModule(params));
}

export default async function LogisticsModulePage({ params }: Props) {
  return <LogisticsPage slug={await getModule(params)} />;
}
