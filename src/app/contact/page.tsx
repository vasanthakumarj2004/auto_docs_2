import type { Metadata } from 'next';
import React from 'react';
import { ContactPage } from '@/src/components/contact/ContactPage';
import { constructMetadata } from '@/src/lib/seo';

export const metadata: Metadata = constructMetadata('/contact/');

export default function ContactRoute() {
  return <ContactPage />;
}
