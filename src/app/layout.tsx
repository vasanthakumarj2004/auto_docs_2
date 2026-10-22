import type { Metadata, Viewport } from 'next';
import React from 'react';
import '@/src/index.css';
import { RouterProvider } from '@/src/lib/router';
import { VideoProvider } from '@/src/components/video/VideoContext';
import { ThemeSwitcher } from '@/src/components/ThemeSwitcher';

export const viewport: Viewport = {
  themeColor: '#8B32F7',
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
        url: '/autodocs-logo.svg',
        width: 1200,
        height: 630,
        alt: 'AutoDocs Document AI Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AutoDocs — Grow the business, not the data-entry desk',
    description:
      'Bills read, checked, paid and posted to Tally. Emails become CargoWise jobs. Your team handles exceptions, not typing.',
    images: ['/autodocs-logo.svg'],
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
  name: 'AutoDocs',
  url: 'https://autodocs.com',
  logo: 'https://autodocs.com/autodocs-logo.svg',
  description:
    'AI-powered document automation for finance and logistics teams running on Tally, Zoho Books, and CargoWise.',
  sameAs: [
    'https://www.linkedin.com/company/autodocs',
    'https://twitter.com/autodocs',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    url: 'https://autodocs.com/#demo',
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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('autodocs-theme');if(t&&t.indexOf('custom:')===0){var h=parseInt(t.split(':')[1],10);if(!isNaN(h)){var isY=h>=35&&h<=75,bL=isY?45:54,sL=isY?38:45,tL=isY?25:32,s=document.documentElement.style;document.documentElement.setAttribute('data-theme','custom');s.setProperty('--color-brand','hsl('+h+', 92%, '+bL+'%)');s.setProperty('--color-brand-strong','hsl('+h+', 94%, '+sL+'%)');s.setProperty('--color-brand-soft','hsl('+h+', 90%, 97%)');s.setProperty('--color-brand-border','hsl('+h+', 80%, 86%)');s.setProperty('--color-brand-text','hsl('+h+', 92%, '+tL+'%)');s.setProperty('--color-brand-50','hsl('+h+', 90%, 97%)');s.setProperty('--color-brand-100','hsl('+h+', 85%, 93%)');s.setProperty('--color-brand-200','hsl('+h+', 80%, 86%)');s.setProperty('--color-brand-400','hsl('+h+', 80%, 70%)');s.setProperty('--color-brand-500','hsl('+h+', 92%, '+bL+'%)');s.setProperty('--color-brand-800','hsl('+h+', 92%, '+tL+'%)');s.setProperty('--color-brand-900','hsl('+h+', 95%, 22%)');}}else if(t){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-slate-800 antialiased font-sans" suppressHydrationWarning>
        <RouterProvider>
          <VideoProvider>{children}</VideoProvider>
        </RouterProvider>
        <ThemeSwitcher />
      </body>
    </html>
  );
}
