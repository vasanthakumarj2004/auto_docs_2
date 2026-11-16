import type { Metadata } from 'next';
import React from 'react';
import { ContactPage } from '@/src/components/contact/ContactPage';

export const metadata: Metadata = {
  title: 'Contact Us — Get in Touch with the Docsynecx Team',
  description:
    'Have questions about our AI document automation solutions or need a demo? Contact Docsynecx in Coimbatore, Tamil Nadu, India. We reply within 24 hours.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Docsynecx — Enterprise Document AI Support & Sales',
    description:
      'We’re here to help with your document automation requirements, Tally & CargoWise integrations, and enterprise scoping.',
    url: 'https://docsynecx.com/contact',
    siteName: 'Docsynecx',
    type: 'website',
  },
};

export default function ContactRoute() {
  return <ContactPage />;
}
