import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SOLUTIONS_DATA } from '@/src/content/solutions';
import { SolutionsPage } from '@/src/components/SolutionsPage';
import { constructMetadata } from '@/src/lib/seo';

interface PageProps {
  params: Promise<{ industry: string }> | { industry: string };
}

export function generateStaticParams() {
  return SOLUTIONS_DATA.map((solution) => ({
    industry: solution.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const item = SOLUTIONS_DATA.find((s) => s.id === resolved.industry);
  if (!item) return { title: 'Industry Solution | Docsynecx' };

  return constructMetadata(`/solutions/${resolved.industry}/`);
}

export default async function IndustrySolutionRoute({ params }: PageProps) {
  const resolved = await params;
  const item = SOLUTIONS_DATA.find((s) => s.id === resolved.industry);
  if (!item) notFound();
  return <SolutionsPage />;
}
