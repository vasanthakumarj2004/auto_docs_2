export interface EventInfo {
  name: string;
  shortName: string;
  category: string;
  positioning: string;
  exhibitor: string;
  booth: string;
  date: string;
  venue: string;
  location: string;
  fullAddress: string;
  mapsUrl: string;
  summary: string;
  highlights: Array<{
    title: string;
    description: string;
  }>;
}

export const IICS_2026_EVENT: EventInfo = {
  name: 'India International Cargo Show 2026',
  shortName: 'IICS 2026',
  category: 'Multimodal Logistics Exhibition & Conference',
  positioning: "South Asia's Premier Multimodal Logistics Exhibition",
  exhibitor: 'Docsynecx',
  booth: 'Q53',
  date: '02 · 03 · 04 Dec 2026',
  venue: 'Jio World Convention Centre',
  location: 'Bandra Kurla Complex (BKC), Mumbai',
  fullAddress: 'Jio World Convention Centre, G Block BKC, Bandra Kurla Complex, Bandra East, Mumbai 400098',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jio+World+Convention+Centre+Bandra+Kurla+Complex+Mumbai',
  summary:
    'Experience AI document automation live at Booth Q53 — turn freight emails, B/Ls, and invoices directly into CargoWise & ERP workflows.',
  highlights: [
    {
      title: 'Live Product Demos',
      description: 'Convert shipment emails and trade documents directly into CargoWise & Tally.',
    },
    {
      title: '1-on-1 Consultations',
      description: 'Meet our specialists to solve your high-volume document bottlenecks.',
    },
    {
      title: 'Custom Workflow Scoping',
      description: 'Explore tailored architectures for your enterprise freight stack.',
    },
    {
      title: 'Multimodal Networking',
      description: 'Exchange insights with freight and logistics leaders from across South Asia.',
    },
  ],
};
