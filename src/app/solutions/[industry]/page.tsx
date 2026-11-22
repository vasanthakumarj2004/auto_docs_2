import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SOLUTIONS_DATA } from '@/src/content/solutions';
import { SolutionsPage } from '@/src/components/SolutionsPage';
import { constructMetadata } from '@/src/lib/seo';

interface PageProps {
  params: Promise<{ industry: string }>;
}

const INDUSTRY_ALIAS_MAP: Record<string, string> = {
  'automotive': 'automotive',
  'automotive-ev': 'automotive',
  'manufacturing': 'manufacturing',
  'industrial-manufacturing': 'manufacturing',
  'textile': 'textile',
  'textile-garments': 'textile',
  'retail': 'retail',
  'retail-distribution': 'retail',
  'logistics': 'logistics',
  'freight-logistics': 'logistics',
};

export function generateStaticParams() {
  return Object.keys(INDUSTRY_ALIAS_MAP).map((industry) => ({ industry }));
}

function resolveSolutionItem(industryParam: string) {
  const normalizedKey = INDUSTRY_ALIAS_MAP[industryParam.toLowerCase()] || industryParam.toLowerCase();
  return SOLUTIONS_DATA.find((s) => s.id === normalizedKey);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  return constructMetadata(`/solutions/${resolved.industry}/`);
}

export default async function IndustrySolutionRoute({ params }: PageProps) {
  const resolved = await params;
  const item = resolveSolutionItem(resolved.industry);
  if (!item) notFound();
  return <SolutionsPage />;
}
