import type { Metadata, Viewport } from 'next';
import React from 'react';
import '@/src/index.css';
import { RouterProvider } from '@/src/lib/router';
import { VideoProvider } from '@/src/components/video/VideoContext';

export const viewport: Viewport = {
  themeColor: '#2f3de0',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://docsynecx.com'),
  title: {
    default: 'Docsynecx — Grow the business, not the data-entry desk',
    template: '%s | Docsynecx',
  },
  description:
    'Bills read, checked, paid and posted to Tally. Emails become CargoWise jobs. Your team handles exceptions, not typing.',
  keywords: [
    'Docsynecx',
    'Tally automation',
    'CargoWise automation',
    'AI document processing',
    'accounts payable automation',
    'logistics document extraction',
    'automated voucher posting',
    'GST reconciliation',
    'Zoho Books automation',
    'freight invoice audit',
  ],
  authors: [{ name: 'Docsynecx', url: 'https://docsynecx.com' }],
  creator: 'Docsynecx',
  publisher: 'Docsynecx',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Docsynecx — Grow the business, not the data-entry desk',
    description:
      'Bills read, checked, paid and posted to Tally. Emails become CargoWise jobs. Your team handles exceptions, not typing.',
    url: 'https://docsynecx.com/',
    siteName: 'Docsynecx',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/Docsynecx-Logo.svg',
        width: 1200,
        height: 630,
        alt: 'Docsynecx Document AI Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Docsynecx — Grow the business, not the data-entry desk',
    description:
      'Bills read, checked, paid and posted to Tally. Emails become CargoWise jobs. Your team handles exceptions, not typing.',
    images: ['/Docsynecx-Logo.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Docsynecx',
  url: 'https://docsynecx.com',
  logo: 'https://docsynecx.com/Docsynecx-Logo.svg',
  description:
    'AI-powered document automation for finance and logistics teams running on Tally, Zoho Books, and CargoWise.',
  sameAs: [
    'https://www.linkedin.com/company/docsynecx',
    'https://twitter.com/docsynecx',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    url: 'https://docsynecx.com/#demo',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-slate-800 antialiased font-sans" suppressHydrationWarning>
        <RouterProvider>
          <VideoProvider>{children}</VideoProvider>
        </RouterProvider>
      </body>
    </html>
  );
}
