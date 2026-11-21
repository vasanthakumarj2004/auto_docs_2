import type { Metadata } from 'next';
import { type FinanceSlug } from '../content/finance';
import { constructMetadata } from './seo';

export function financeMetadata(page: 'overview' | FinanceSlug): Metadata {
  const targetPath = page === 'overview' ? '/finance-desk/' : `/finance-desk/${page}/`;
  return constructMetadata(targetPath);
}
