import type { Metadata } from 'next';
import React from 'react';
import { ContactPage } from '@/src/components/contact/ContactPage';

export const metadata: Metadata = {
  title: 'Contact Docsynecx — Talk to us | Enterprise Document AI',
  description:
    'Real people read every message and reply within 24 hours. Automate finance documents, freight operations, or reach the Docsynecx team in Coimbatore, Tamil Nadu.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Docsynecx — Talk to us | Enterprise Document AI',
    description:
      'Real people read every message and reply within 24 hours. Automate finance documents, freight operations, or reach the Docsynecx team in Coimbatore, Tamil Nadu.',
    url: 'https://docsynecx.com/contact',
    siteName: 'Docsynecx',
    type: 'website',
  },
};

export default function ContactRoute() {
  return <ContactPage />;
}
