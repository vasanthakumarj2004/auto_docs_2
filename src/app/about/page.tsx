import type { Metadata } from 'next';
import React from 'react';
import { AboutPage } from '@/src/components/about/AboutPage';

export const metadata: Metadata = {
  title: 'About Docsynecx — AI-Powered Document Automation Platform',
  description:
    'Discover the story behind Docsynecx innovation, our mission, vision, and core engineering principles powering document intelligence for finance and logistics.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Docsynecx — The Story Behind Innovation',
    description:
      'Transforming document processing with enterprise AI. Discover our mission, core principles, and enterprise architecture.',
    url: 'https://docsynecx.com/about',
    siteName: 'Docsynecx',
    type: 'website',
  },
};

export default function AboutRoute() {
  return <AboutPage />;
}
