import type { Metadata } from 'next';
import { type PersonaData } from '../content/financePersonas';
import { constructMetadata } from './seo';

export function personaMetadata(slug: PersonaData['slug']): Metadata {
  return constructMetadata(`/finance-desk/${slug}/`);
}
