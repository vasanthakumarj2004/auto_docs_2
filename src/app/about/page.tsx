import type { Metadata } from 'next';
import React from 'react';
import { AboutPage } from '@/src/components/about/AboutPage';
import { constructMetadata } from '@/src/lib/seo';

export const metadata: Metadata = constructMetadata('/about/');

export default function AboutRoute() {
  return <AboutPage />;
}
