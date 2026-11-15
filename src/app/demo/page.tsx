import type { Metadata } from 'next';
import { BookADemoPage } from '@/src/components/demo/BookADemoPage';

export const metadata: Metadata = {
  title: "Request a Demo — Docsynecx Intelligent Business Automation",
  description:
    "Request a tailored discovery session or live demo for Docsynecx Finance and Docsynecx Logistics. Automate document checks, reconciliation, and booking directly into Tally, Zoho Books, CargoWise, and Shipsy.",
  alternates: {
    canonical: '/demo',
  },
  openGraph: {
    title: "Request a Demo — Docsynecx Intelligent Business Automation",
    description:
      "Let's make your workflow more intelligent. Request a personalized demo or discovery session for Docsynecx Finance & Logistics.",
    url: 'https://docsynecx.com/demo',
    siteName: 'Docsynecx',
    type: 'website',
  },
};

export default function DemoRoute() {
  return <BookADemoPage />;
}
