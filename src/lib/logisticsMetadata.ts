import type { Metadata } from 'next';
import { logisticsModules, type LogisticsSlug } from '../content/logistics';

export function logisticsMetadata(slug: LogisticsSlug): Metadata {
  const mod = logisticsModules[slug];
  const title = `${mod.moduleName} | Docsynecx Logistics`;
  const description = mod.heroDescription;
  const url = `https://docsynecx.com/logistics/${slug}/`;

  return {
    metadataBase: new URL('https://docsynecx.com'),
    title: { absolute: title },
    description,
    authors: [{ name: 'Docsynecx' }],
    creator: 'Docsynecx',
    publisher: 'SynecX AI Labs Private Limited',
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Docsynecx',
      type: 'website',
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
    },
  };
}
