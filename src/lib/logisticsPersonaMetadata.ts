import type { Metadata } from 'next';
import { type LogisticsPersonaSlug } from '../content/logisticsPersonas';
import { constructMetadata } from './seo';

export function logisticsPersonaMetadata(slug: LogisticsPersonaSlug): Metadata {
  return constructMetadata(`/logistics-desk/${slug}/`);
}
