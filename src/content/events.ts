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
  positioning: "South Asia's Largest & Premier Multimodal Logistics Exhibition & Conference",
  exhibitor: 'Docsynecx',
  booth: 'Q53',
  date: 'To be announced',
  venue: 'The Summit Business Bay (G4)',
  location: 'Chakala, Andheri East, Mumbai 400093',
  fullAddress: 'G4, The Summit Business Bay, Andheri-Kurla Road, Chakala, Andheri East, Mumbai 400093',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=The+Summit+Business+Bay+Andheri+Kurla+Road+Chakala+Mumbai+400093',
  summary:
    'Join Docsynecx at India International Cargo Show 2026 and discover how intelligent document automation streamlines multimodal freight forwarding, rate comparison, and accounting handoffs.',
  highlights: [
    {
      title: 'Live Product Demonstrations',
      description: 'Experience hands-on workflows converting shipping emails, bills of lading, and invoices directly into connected operating systems.',
    },
    {
      title: 'Meet Our Leadership & Solutions Team',
      description: 'Connect 1-on-1 with Docsynecx engineers and logistics domain experts to discuss your specific operational challenges.',
    },
    {
      title: 'Custom Workflow Scoping',
      description: 'Explore tailored integration architectures for CargoWise, TallyPrime, and custom enterprise freight setups.',
    },
    {
      title: 'Multimodal Industry Networking',
      description: 'Exchange actionable insights with air cargo, maritime, warehousing, and transportation leaders from across South Asia.',
    },
  ],
};
