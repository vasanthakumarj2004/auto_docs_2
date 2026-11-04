import type { Metadata } from 'next';
import { LandingPage } from '@/src/components/LandingPage';
import { landingFaqs } from '@/src/content/landing';

const title = 'Docsynecx — Intelligent finance and logistics workflows';
const description = 'Two focused workspaces. One connected platform. Automate document-heavy finance and shipment workflows with Docsynecx, alongside TallyPrime, CargoWise and your existing systems.';

export const metadata: Metadata = {
  metadataBase: new URL('https://docsynecx.com'),
  title: { absolute: title },
  description,
  authors: [{ name: 'Docsynecx', url: 'https://docsynecx.com' }],
  creator: 'Docsynecx',
  publisher: 'SynecX AI Labs Private Limited',
  alternates: { canonical: 'https://docsynecx.com/' },
  openGraph: { title, description, url: 'https://docsynecx.com/', siteName: 'Docsynecx' },
  twitter: { title, description },
};

const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: landingFaqs.map(({ question, answer }) => ({
    '@type': 'Question', name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
};

export default function HomePage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema).replace(/</g, '\\u003c') }} />
    <LandingPage />
  </>;
}
