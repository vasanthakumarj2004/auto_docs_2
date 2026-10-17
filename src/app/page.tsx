import type { Metadata } from 'next';
import React from 'react';
import { Header } from '@/src/components/Header';
import { Hero } from '@/src/components/Hero';
import { Stats } from '@/src/components/Stats';
import { TheProblem } from '@/src/components/TheProblem';
import { HowItWorks } from '@/src/components/HowItWorks';
import { FeatureSection } from '@/src/components/FeatureSection';
import { BillReviewVisual } from '@/src/components/BillReviewVisual';
import { ShipmentVisual } from '@/src/components/ShipmentVisual';
import { CalculatorBar } from '@/src/components/CalculatorBar';
import { WhyDocsynecx } from '@/src/components/WhyDocsynecx';
import { FaqSection } from '@/src/components/FaqSection';
import { DemoCta } from '@/src/components/DemoCta';
import { Newsletter } from '@/src/components/Newsletter';
import { Footer } from '@/src/components/Footer';

export const metadata: Metadata = {
  title: 'Docsynecx — Grow the business, not the data-entry desk',
  description:
    'Bills read, checked, paid and posted to Tally. Emails become CargoWise jobs. Your team handles exceptions, not typing.',
  alternates: {
    canonical: 'https://docsynecx.com/',
  },
};

const financeSteps: [string, string, string][] = [
  [
    '01',
    'Read and GST-check every bill',
    'Capture line items and validate GST details before posting.',
  ],
  [
    '02',
    'Approve, pay, post to Tally',
    'Move approved bills forward without entering the data again.',
  ],
  [
    '03',
    'Hold duplicates, never pay twice',
    'Flag a repeated bill before it reaches your payment queue.',
  ],
];

const logisticsSteps: [string, string, string][] = [
  [
    '01',
    'Emails become jobs',
    'Turn booking instructions into structured CargoWise entries.',
  ],
  [
    '02',
    'BL, packing list, invoice cross-checked',
    'Spot mismatches across shipment documents before they travel.',
  ],
  [
    '03',
    'Customs entry and freight AP checks',
    'Keep exceptions visible from customs through freight payables.',
  ],
];

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Docsynecx',
  operatingSystem: 'All (Cloud/Web-based)',
  applicationCategory: 'BusinessApplication',
  description:
    'Document AI platform for freight forwarding and finance desks. Automates voucher creation in Tally and job creation in CargoWise.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free trial available with custom enterprise pricing.',
  },
  featureList: [
    'Automated vendor bill extraction',
    'Real-time GST & arithmetic validation',
    'Direct Tally & Zoho Books voucher posting',
    'Automated CargoWise job entry from email',
    'Multi-document BL and packing list cross-check',
  ],
};

const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What systems does Docsynecx integrate with natively?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Docsynecx integrates directly with Tally Prime (via XML server and ODBC), CargoWise One (via native eAdaptor XML), Zoho Books, and major enterprise ERPs including SAP and Oracle NetSuite.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Docsynecx connect without disrupting our existing setup?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There is zero downtime and no rip-and-replace required. Docsynecx connects via official application APIs and shared inboxes. Your team continues working in Tally or CargoWise as usual.',
      },
    },
    {
      '@type': 'Question',
      name: 'How are duplicate invoices and GST mismatches prevented?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every incoming vendor bill undergoes a multi-layer verification check against your database and government GST portal APIs before posting. If an invoice matches an existing record, Docsynecx flags a Duplicate Hold.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Docsynecx process low-resolution scans and non-standard vendor formats?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Unlike template-based OCR engines that break when columns move, Docsynecx uses document vision models trained specifically on trade manifests, tax invoices, and packing lists.',
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <div className="min-h-screen max-w-full overflow-x-clip lg:overflow-visible bg-white text-slate-800">
        {/* 1. Sticky navbar */}
        <Header />

        <main id="top">
          {/* 2. Hero (two columns): tag, headline, subtext, buttons; flow card and video slot */}
          <Hero />

          {/* 3. Proof stat row and logo slot */}
          <Stats />

          {/* 4. The problem: 3 short cards */}
          <TheProblem />

          {/* 5. How it works: 5-step stepper */}
          <HowItWorks />

          {/* 6. Finance desk and Shipment desk cards */}
          <FeatureSection
            id="finance"
            label="FINANCE DESK"
            title="Every bill read, checked and posted."
            copy="From a vendor PDF to your books, keep every check in one flow. Your finance team stays in control of approvals and exceptions."
            steps={financeSteps}
            visual={<BillReviewVisual />}
          />
          <FeatureSection
            id="logistics"
            label="SHIPMENT DESK"
            title="Customer emails become CargoWise jobs."
            copy="Give your operations team a job to review, not an inbox to retype. Shipment details move together, with checks built in."
            steps={logisticsSteps}
            visual={<ShipmentVisual />}
            reverse={true}
          />

          {/* 7. Dark navy calculator bar linking to /calculator */}
          <CalculatorBar />

          {/* 8. Why Docsynecx: 2 feature cards */}
          <WhyDocsynecx />

          {/* 9. FAQ accordion */}
          <FaqSection />

          {/* 10. Final CTA band & Newsletter */}
          <DemoCta />
          <Newsletter />
        </main>

        {/* 11. Multi-column footer */}
        <Footer />
      </div>
    </>
  );
}
