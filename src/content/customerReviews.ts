export interface CustomerReview {
  id: string;
  industry: string;
  company: string;
  copy: string;
}

export const customerReviews: CustomerReview[] = [
  {
    id: 'tri-connect-logistics',
    industry: 'Logistics',
    company: 'TriConnect Logistics',
    copy: 'Docsynecx simplifies our enquiry-to-booking process, reducing manual coordination and improving workflow efficiency',
  },
  {
    id: 'rajadurai-ev',
    industry: 'Automotive & EV',
    company: 'EV Vehicles',
    copy: 'Manual document workload reduced from days to hours through an AI-assisted workflow.',
  },
  {
    id: 'arishfirma',
    industry: 'Business Operations',
    company: 'Arishfirma',
    copy: 'Regular operational use for asset and purchase bill workflows.',
  },
];
