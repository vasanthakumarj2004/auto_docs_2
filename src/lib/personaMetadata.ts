import type { Metadata } from 'next';
import { financePersonas, type PersonaData } from '../content/financePersonas';

export function personaMetadata(slug: PersonaData['slug']): Metadata {
  const data = financePersonas[slug];
  const title = data.metaTitle;
  const description = data.metaDescription;
  const url = `https://docsynecx.com/finance-desk/${slug}/`;
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
