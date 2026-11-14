import type { Metadata } from 'next';
import { logisticsModules, logisticsPageCopy, logisticsRoot, type LogisticsSlug } from '../content/logistics';

export function logisticsMetadata(page: 'overview' | LogisticsSlug): Metadata {
  const label = page === 'overview' ? 'Logistics Desk' : logisticsModules.find(item => item.slug === page)!.title;
  const isRoadmap = page === 'freight-intelligence';
  const title = `${label}${isRoadmap ? ' — Roadmap Preview' : ''} | Docsynecx`;
  const description = logisticsPageCopy[page].description;
  const url = `https://docsynecx.com${logisticsRoot}${page === 'overview' ? '' : `${page}/`}`;
  return {
    metadataBase: new URL('https://docsynecx.com'),
    title: { absolute: title },
    description,
    authors: [{ name: 'Docsynecx' }],
    creator: 'Docsynecx',
    publisher: 'SynecX AI Labs Private Limited',
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: 'Docsynecx', type: 'website' },
    twitter: { title, description },
  };
}
