import type { Metadata } from 'next';
import { financeCapabilities, financePageCopy, financeRoot, type FinanceSlug } from '../content/finance';

export function financeMetadata(page: 'overview' | FinanceSlug): Metadata {
  const label = page === 'overview' ? 'Finance Desk' : financeCapabilities.find(item => item.slug === page)!.title;
  const title = `${label}${page === 'accounts-payable' ? ' — Upcoming' : ''} | Docsynecx`;
  const description = financePageCopy[page].description;
  const url = `https://docsynecx.com${financeRoot}${page === 'overview' ? '' : `${page}/`}`;
  return {
    metadataBase: new URL('https://docsynecx.com'), title: { absolute: title }, description,
    authors: [{ name: 'Docsynecx' }], creator: 'Docsynecx', publisher: 'SynecX AI Labs Private Limited',
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: 'Docsynecx', type: 'website' },
    twitter: { title, description },
  };
}
