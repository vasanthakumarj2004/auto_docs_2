import type { Metadata } from 'next';
import { type LogisticsSlug } from '../content/logisticsOverview';
import { constructMetadata } from './seo';

export function logisticsMetadata(page: 'overview' | LogisticsSlug): Metadata {
  const targetPath = page === 'overview' ? '/logistics-desk/' : `/logistics-desk/${page}/`;
  return constructMetadata(targetPath);
}
