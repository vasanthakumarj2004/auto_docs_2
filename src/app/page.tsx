import type { Metadata } from 'next';
import { LandingPage } from '@/src/components/LandingPage';
import { landingFaqs } from '@/src/content/landing';
import { constructMetadata, faqSchema, jsonLd } from '@/src/lib/seo';

export const metadata: Metadata = constructMetadata('/');

export default function HomePage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(landingFaqs)) }} />
    <LandingPage />
  </>;
}
