export interface VideoChapter {
  id: string;
  timeSec: number;
  label: string;
  title: string;
  description: string;
}

export interface VideoConfig {
  id: string;
  title: string;
  description: string;
  type: 'loop' | 'player' | 'modal' | 'facade' | 'slot';
  sources?: {
    webm?: string;
    mp4?: string;
  };
  poster: string;
  posterWidth?: number;
  posterHeight?: number;
  captionsVtt?: string;
  transcript?: string;
  durationSec?: number;
  chapters?: VideoChapter[];
  aspectRatio?: '16:9' | '4:3' | '1.3:1' | 'auto';
  embedUrl?: string; // YouTube or Vimeo privacy URL
  isPlaceholder?: boolean;
  placeholderText?: string;
  ariaLabel?: string;
}

export const videosConfig: Record<string, VideoConfig> = {
  'hero-walkthrough': {
    id: 'hero-walkthrough',
    title: 'Docsynecx Product Walkthrough (2 Min)',
    description: 'Watch vendor invoices read, validated for GST against government 2B portal, and posted to Tally Prime in real time with zero manual keying.',
    type: 'player',
    sources: {
      webm: '/videos/walkthrough.webm',
      mp4: '/videos/walkthrough.mp4',
    },
    poster: '/videos/posters/walkthrough-poster.webp',
    posterWidth: 1280,
    posterHeight: 720,
    captionsVtt: '/videos/captions/walkthrough.vtt',
    durationSec: 120,
    aspectRatio: '16:9',
    ariaLabel: 'Docsynecx two-minute product walkthrough video player',
    isPlaceholder: true, // until real production footage is uploaded
    placeholderText: 'Illustrative demo',
    chapters: [
      { id: 'intake', timeSec: 0, label: '00:00 Intake', title: 'Multi-Channel Bill Intake', description: 'Auto-ingests incoming bills from email, scan folders, and vendor portals without template setup.' },
      { id: 'extract', timeSec: 30, label: '00:30 Extract', title: 'AI Field Extraction', description: 'Reads line items, tax breakdowns, and vendor GSTIN with 99.8% field-level confidence.' },
      { id: 'check', timeSec: 60, label: '01:00 Check', title: 'GST & Duplicate Guardrails', description: 'Validates vendor GSTIN against government 2B portal and halts duplicates before payout.' },
      { id: 'post', timeSec: 90, label: '01:30 Post', title: 'Zero-Touch Tally Posting', description: 'Posts purchase vouchers directly into Tally Prime via native XML server. Your books stay unchanged.' },
    ],
    transcript: `Docsynecx automated walkthrough: In Chapter 1, incoming vendor invoices are captured from email, scans, and supplier portals. In Chapter 2, document AI models extract line items, amounts, and tax breakdowns with 99.8% precision. In Chapter 3, automated guardrails cross-reference government GST 2B portals and detect historical duplicate bills. In Chapter 4, approved vouchers post directly into Tally Prime through native XML server integrations without changing your existing chart of accounts.`,
  },

  'homepage-demo-modal': {
    id: 'homepage-demo-modal',
    title: 'Docsynecx Live Product Demo',
    description: 'Interactive demonstration of Docsynecx invoice reading, duplicate protection, and automated CargoWise and Tally voucher sync.',
    type: 'modal',
    sources: {
      webm: '/videos/demo-preview.webm',
      mp4: '/videos/demo-preview.mp4',
    },
    poster: '/videos/posters/demo-modal-poster.webp',
    posterWidth: 1280,
    posterHeight: 720,
    captionsVtt: '/videos/captions/walkthrough.vtt',
    durationSec: 120,
    aspectRatio: '16:9',
    ariaLabel: 'Watch Docsynecx live product demo video',
    isPlaceholder: true,
    placeholderText: 'Watch 2-Min Demo',
  },

  'finance-desk-loop': {
    id: 'finance-desk-loop',
    title: 'Finance Bill Reading & Tally Posting Loop',
    description: 'Automated extraction of vendor tax invoice INV-8492, GST 2B verification, and purchase voucher creation in Tally Prime.',
    type: 'loop',
    sources: {
      webm: '/videos/finance-loop.webm',
      mp4: '/videos/finance-loop.mp4',
    },
    poster: '/videos/posters/finance-loop-poster.webp',
    posterWidth: 960,
    posterHeight: 640,
    durationSec: 10,
    aspectRatio: '1.3:1',
    ariaLabel: 'Loop showing vendor bill extracted, verified for GST, and posted to Tally Prime',
    isPlaceholder: true,
  },

  'logistics-desk-loop': {
    id: 'logistics-desk-loop',
    title: 'Logistics Booking to CargoWise Job Loop',
    description: 'Booking email converted into structured shipment job, cross-checking Bill of Lading, Packing List, and commercial invoice.',
    type: 'loop',
    sources: {
      webm: '/videos/logistics-loop.webm',
      mp4: '/videos/logistics-loop.mp4',
    },
    poster: '/videos/posters/logistics-loop-poster.webp',
    posterWidth: 960,
    posterHeight: 640,
    durationSec: 10,
    aspectRatio: '1.3:1',
    ariaLabel: 'Loop showing customer booking email converted into CargoWise job S00038421',
    isPlaceholder: true,
  },

  'customer-story-rajadurai': {
    id: 'customer-story-rajadurai',
    title: 'Rajadurai E-Vehicles Case Study Video',
    description: 'How Rajadurai E-Vehicles reduced purchase invoice processing from days to hours across purchase, spares, and service entries.',
    type: 'slot',
    poster: '/videos/posters/rajadurai-poster.webp',
    posterWidth: 640,
    posterHeight: 360,
    aspectRatio: '16:9',
    isPlaceholder: true,
    placeholderText: 'Customer video coming soon',
    ariaLabel: 'Customer video coming soon — Rajadurai E-Vehicles case study',
  },

  'customer-story-ft-logistics': {
    id: 'customer-story-ft-logistics',
    title: 'FT Logistics Case Study Video',
    description: 'How FT Logistics cut email-to-CargoWise booking processing from 2 hours to 2 minutes.',
    type: 'slot',
    poster: '/videos/posters/ft-logistics-poster.webp',
    posterWidth: 640,
    posterHeight: 360,
    aspectRatio: '16:9',
    isPlaceholder: true,
    placeholderText: 'Customer video coming soon',
    ariaLabel: 'Customer video coming soon — FT Logistics case study',
  },

  'sample-video-facade': {
    id: 'sample-video-facade',
    title: 'Docsynecx Platform Architecture Overview',
    description: 'Deep dive into Docsynecx document intelligence and ERP integrations.',
    type: 'facade',
    embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1',
    poster: '/videos/posters/facade-poster.webp',
    posterWidth: 1280,
    posterHeight: 720,
    aspectRatio: '16:9',
    ariaLabel: 'Watch Docsynecx platform architecture overview video',
  },
};
