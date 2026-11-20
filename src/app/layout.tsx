import type { Metadata, Viewport } from 'next';
import React from 'react';
import Script from 'next/script';
import '@/src/index.css';
import { LandingLayoutProvider } from '@/src/components/LandingLayoutProvider';
import { darkThemeInitScript, LOGO_GREEN } from '@/src/lib/darkTheme';
import { CookieConsent } from '@/src/components/CookieConsent';
import { ConsentProvider } from '@/src/context/ConsentContext';

export const viewport: Viewport = {
  themeColor: '#2E8B57',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://autodocs.com'),
  title: {
    default: 'AutoDocs — Grow the business, not the data-entry desk',
    template: '%s | AutoDocs',
  },
  description:
    'Bills read, checked, paid and posted to Tally. Emails become CargoWise jobs. Your team handles exceptions, not typing.',
  keywords: [
    'AutoDocs',
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
  authors: [{ name: 'AutoDocs', url: 'https://autodocs.com' }],
  creator: 'AutoDocs',
  publisher: 'AutoDocs',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'AutoDocs — Grow the business, not the data-entry desk',
    description:
      'Bills read, checked, paid and posted to Tally. Emails become CargoWise jobs. Your team handles exceptions, not typing.',
    url: 'https://autodocs.com/',
    siteName: 'AutoDocs',
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
    title: 'AutoDocs — Grow the business, not the data-entry desk',
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
      { url: '/logo-icon.svg', type: 'image/svg+xml' },
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
    'https://www.linkedin.com/company/autodocs',
    'https://twitter.com/autodocs',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    url: 'https://autodocs.com/demo/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="sea-green" suppressHydrationWarning>
      <head>
        <Script
          id="dark-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: darkThemeInitScript }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500;1,6..72,600&family=Allura&family=Alex+Brush&family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Script
          id="theme-custom-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{localStorage.removeItem('autodocs-theme');localStorage.removeItem('autodocs-brand-hex');localStorage.removeItem('autodocs-dark-theme');document.documentElement.setAttribute('data-theme','sea-green');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-slate-800 antialiased font-sans" suppressHydrationWarning>
        <ConsentProvider>
          <LandingLayoutProvider>
            {children}
            <CookieConsent />
          </LandingLayoutProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
