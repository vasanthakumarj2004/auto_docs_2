import type { Metadata, Viewport } from "next";
import React from "react";
import Script from "next/script";
import "@/src/index.css";
import { darkThemeInitScript } from "@/src/lib/darkTheme";
import { ConsentProvider } from "@/src/context/ConsentContext";
import { DeferredGlobalFeatures } from "@/src/components/DeferredGlobalFeatures";
import { jsonLd } from "@/src/lib/seo";

const GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Caveat:wght@500;700&family=Inter:wght@400;600;800&family=Allura&family=Alex+Brush&display=swap";

export const viewport: Viewport = {
  themeColor: "#2E8B57",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://docsynecx.com"),
  title: {
    default: "AI Finance & Logistics Automation Platform - Docsynecx",
    template: "%s",
  },
  description:
    "Automate finance and freight workflows with Docsynecx. Process supplier invoices, reconcile bank statements, manage freight RFQs and shipment documents with human approval.",
  keywords: [
    "AI finance and logistics automation",
    "invoice automation",
    "freight forwarding automation",
    "document processing software",
    "workflow automation",
    "TallyPrime automation",
    "CargoWise automation",
  ],
  authors: [{ name: "Docsynecx", url: "https://docsynecx.com" }],
  creator: "Docsynecx",
  publisher: "SynecX AI Labs Private Limited",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "AI Finance & Logistics Automation Platform - Docsynecx",
    description:
      "Automate finance and freight workflows with Docsynecx. Process supplier invoices, reconcile bank statements, manage freight RFQs and shipment documents with human approval.",
    url: "https://docsynecx.com/",
    siteName: "Docsynecx",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/Docsynecx-Logo.svg",
        width: 1200,
        height: 630,
        alt: "Docsynecx AI Finance & Logistics Automation Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Finance & Logistics Automation Platform - Docsynecx",
    description:
      "Automate finance and freight workflows with Docsynecx. Process supplier invoices, reconcile bank statements, manage freight RFQs and shipment documents with human approval.",
    images: ["/Docsynecx-Logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo-icon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Docsynecx",
  url: "https://docsynecx.com",
  logo: "https://docsynecx.com/Docsynecx-Logo.svg",
  description:
    "AI-powered document automation for finance and logistics teams running on Tally, Zoho Books, and CargoWise.",
  sameAs: [
    "https://www.linkedin.com/company/docsynecx",
    "https://www.instagram.com/docsynecx",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: "https://docsynecx.com/contact/",
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
          rel="preload"
          as="image"
          href="/videos/main-layout-two-poster.webp"
          type="image/webp"
          fetchPriority="high"
        />
        <link
          rel="ai-catalog"
          type="application/json"
          href="/.well-known/ai-catalog.json"
        />
        <link rel="ard" type="application/json" href="/.well-known/ard.json" />
        <link
          rel="alternate"
          type="text/plain"
          href="/llms.txt"
          title="LLM Documentation"
        />
        <Script
          id="google-fonts-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){var link=document.createElement('link');link.rel='stylesheet';link.href='${GOOGLE_FONTS_URL}';document.head.appendChild(link);})();`,
          }}
        />
        <noscript>
          <link rel="stylesheet" href={GOOGLE_FONTS_URL} />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd(organizationSchema),
          }}
        />
        <Script
          id="theme-custom-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{localStorage.removeItem('docsynecx-theme');localStorage.removeItem('docsynecx-brand-hex');localStorage.removeItem('docsynecx-dark-theme');document.documentElement.setAttribute('data-theme','sea-green');}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className="min-h-screen bg-white text-slate-800 antialiased font-sans"
        suppressHydrationWarning
      >
        <ConsentProvider>
          {children}
          <DeferredGlobalFeatures />
        </ConsentProvider>
      </body>
    </html>
  );
}
