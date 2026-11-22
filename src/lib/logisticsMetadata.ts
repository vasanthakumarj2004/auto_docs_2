import type { Metadata } from 'next';
import { type LogisticsSlug } from '../content/logistics';
import { constructMetadata } from './seo';

export function logisticsMetadata(slug: LogisticsSlug): Metadata {
  const normalized = slug.toLowerCase() === 'rfq-to-booking' ? 'rfq-to-booking' : slug;
  return constructMetadata(`/logistics-desk/${normalized}/`);
}
