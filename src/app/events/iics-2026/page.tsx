import type { Metadata } from 'next';
import { IICS2026EventPage } from '@/src/components/events/IICS2026EventPage';

export const metadata: Metadata = {
  title: 'Meet Docsynecx at IICS 2026 — Booth Q53 | India International Cargo Show',
  description:
    "Join Docsynecx at India International Cargo Show 2026 (Booth Q53), South Asia's premier multimodal logistics exhibition. Experience live intelligent document automation for air, ocean, and freight forwarding operations.",
  alternates: {
    canonical: '/events/iics-2026',
  },
  openGraph: {
    title: 'Meet Docsynecx at IICS 2026 — Booth Q53 | India International Cargo Show',
    description:
      "Docsynecx is exhibiting at Booth Q53 at IICS 2026. Explore next-generation document automation across freight forwarding, shipping, and logistics accounting.",
    url: 'https://docsynecx.com/events/iics-2026',
    siteName: 'Docsynecx',
    type: 'website',
  },
};

export default function IICS2026Route() {
  return <IICS2026EventPage />;
}
