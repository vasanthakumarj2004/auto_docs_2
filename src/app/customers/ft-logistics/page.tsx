import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import { VideoSlot } from '@/src/components/video/VideoSlot';
import { videosConfig } from '@/src/content/videos';

export const metadata: Metadata = {
  title: 'Customer Case Study: FT Logistics | AutoDocs',
  description:
    'How FT Logistics slashed shipment email-to-CargoWise job posting time from 2 hours to 2 minutes with AutoDocs automated document processing.',
  alternates: {
    canonical: 'https://autodocs.com/customers/ft-logistics/',
  },
};

export default function FtLogisticsCaseStudyPage() {
  return (
    <div className="min-h-screen max-w-full overflow-x-clip lg:overflow-visible bg-white text-slate-800">
      <Header />
      <div className="py-20 text-center site-shell">
        <span className="font-mono text-xs uppercase tracking-wider text-violet-700 font-bold">
          Customer Case Study
        </span>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-950 sm:text-4xl">
          FT Logistics
        </h1>
        <p className="mt-3 text-sm text-slate-600 max-w-lg mx-auto">
          How FT Logistics slashed shipment email-to-CargoWise job posting time
          from 2 hours to 2 minutes with AutoDocs.
        </p>

        {/* Customer Video Slot */}
        <div className="mt-8 max-w-2xl mx-auto text-left">
          <VideoSlot
            config={videosConfig['customer-story-ft-logistics']}
            aspectRatio="16:9"
            badgeType="soon"
          />
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <Link href="/#demo" className="button-primary cursor-pointer">
            Book a demo
          </Link>
          <Link href="/logistics" className="button-secondary cursor-pointer">
            Back to Logistics
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
