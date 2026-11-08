import type { Metadata, Viewport } from 'next';
import React from 'react';
import '@/src/index.css';
import { ThemeSwitcher } from '@/src/components/ThemeSwitcher';
import { LandingLayoutProvider } from '@/src/components/LandingLayoutProvider';
import { darkThemeInitScript, LOGO_GREEN } from '@/src/lib/darkTheme';
import { CookieConsent } from '@/src/components/CookieConsent';
import { ConsentProvider } from '@/src/context/ConsentContext';

export const viewport: Viewport = {
  themeColor: LOGO_GREEN,
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
    <html lang="en" data-theme="logo" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: darkThemeInitScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500;1,6..72,600&display=swap"
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
            __html: `(function(){try{var bg=localStorage.getItem('autodocs-bg-color');if(bg&&bg.indexOf('#')===0){var st=document.documentElement.style;st.setProperty('--color-hero-bg',bg);st.setProperty('--landing-bg',bg);st.setProperty('--color-paper',bg);}var t=localStorage.getItem('autodocs-theme')||'logo';if(t==='current')t='logo';var bHex=localStorage.getItem('autodocs-brand-hex');var op=localStorage.getItem('autodocs-theme-opacity');var a=op?Math.max(0.05,Math.min(1,Number(op)/100)):1;var isCustomTheme=t==='custom'||(t&&t.indexOf('custom')===0)||(bHex&&!['logo','violet','green','light-green','sea-green','red','blue','yellow','orange'].includes(t));if(isCustomTheme&&bHex&&bHex.indexOf('#')===0){document.documentElement.setAttribute('data-theme','custom');var hex=bHex.slice(1);if(hex.length===3)hex=hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];var r=parseInt(hex.substring(0,2),16);var g=parseInt(hex.substring(2,4),16);var b=parseInt(hex.substring(4,6),16);if(!isNaN(r)&&!isNaN(g)&&!isNaN(b)){var s=document.documentElement.style;var brandRgba='rgba('+r+','+g+','+b+','+a+')';var strongR=Math.max(0,Math.round(r*0.85));var strongG=Math.max(0,Math.round(g*0.85));var strongB=Math.max(0,Math.round(b*0.85));var strongRgba='rgba('+strongR+','+strongG+','+strongB+','+a+')';var softRgba='rgba('+r+','+g+','+b+','+Math.min(1,a*0.12)+')';var borderRgba='rgba('+r+','+g+','+b+','+(a*0.35+0.1)+')';s.setProperty('--color-brand',brandRgba);s.setProperty('--color-brand-500',brandRgba);s.setProperty('--color-brand-strong',strongRgba);s.setProperty('--color-brand-soft',softRgba);s.setProperty('--color-brand-border',borderRgba);s.setProperty('--color-brand-text',bHex);s.setProperty('--color-brand-50',softRgba);s.setProperty('--color-brand-100','rgba('+r+','+g+','+b+',0.18)');s.setProperty('--color-brand-200','rgba('+r+','+g+','+b+',0.32)');s.setProperty('--color-brand-400','rgba('+r+','+g+','+b+',0.70)');s.setProperty('--color-brand-800',strongRgba);s.setProperty('--color-brand-900','rgba('+Math.round(r*0.6)+','+Math.round(g*0.6)+','+Math.round(b*0.6)+','+a+')');s.setProperty('--landing-green',brandRgba);}}else if(['logo','violet','green','light-green','sea-green','red','blue','yellow','orange'].includes(t)){document.documentElement.setAttribute('data-theme',t);}else{document.documentElement.setAttribute('data-theme','logo');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-slate-800 antialiased font-sans" suppressHydrationWarning>
        <ConsentProvider>
          <LandingLayoutProvider>
            {children}
            <ThemeSwitcher />
            <CookieConsent />
          </LandingLayoutProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
