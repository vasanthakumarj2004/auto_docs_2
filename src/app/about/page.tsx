import type { Metadata } from 'next';
import React from 'react';
import { AboutPage } from '@/src/components/about/AboutPage';

export const metadata: Metadata = {
  title: 'About Us — Docsynecx | Building Intelligent Business Solutions',
  description:
    'Meet Docsynecx — building intelligent solutions that make business operations simpler. Practical AI for real work, rooted in Coimbatore, building for businesses everywhere.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Us — Docsynecx | We Believe Technology Should Make Business Simpler',
    description:
      'Meet Docsynecx — building intelligent solutions that make business operations simpler. Practical AI for real work, rooted in Coimbatore, building for businesses everywhere.',
    url: 'https://docsynecx.com/about',
    siteName: 'Docsynecx',
    type: 'website',
  },
};

export default function AboutRoute() {
  return <AboutPage />;
}
