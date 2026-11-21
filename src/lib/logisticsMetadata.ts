import type { Metadata } from 'next';
import { type LogisticsSlug } from '../content/logistics';
import { constructMetadata } from './seo';

export function logisticsMetadata(slug: LogisticsSlug): Metadata {
  return constructMetadata(`/logistics-desk/${slug}/`);
}
