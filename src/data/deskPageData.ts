import React from 'react';
import { 
  Mail, 
  Search, 
  Check, 
  IndianRupee, 
  Upload, 
  FileCheck, 
  UploadCloud, 
  ShieldAlert, 
  Sparkles,
  FileText
} from 'lucide-react';
import { StepItem } from '../components/ui/Stepper';
import { FaqItem } from '../components/SharedFaqAccordion';

export interface DeskHeroConfig {
  tag: string;
  tagIcon: 'sparkles';
  headlineLine1: string;
  headlineLine2: string;
  subtext: string;
  primaryButtonText: string;
  primaryButtonAction: string;
  secondaryButtonText: string;
  secondaryButtonAction: string;
}

export interface DeskProductCard {
  tag: string;
  checks: string[];
  ctaText: string;
  ctaHref: string;
  accentBorder: 'neutral' | 'blue' | 'teal' | 'orange';
  cardBg?: string;
  badgeClassName?: string;
}

export interface DeskCustomerStory {
  company: string;
  context: string;
  fromMetric: string;
  toMetric: string;
  linkText: string;
  linkHref: string;
  accentColor: 'emerald' | 'teal';
}

export interface DeskClosingCta {
  badge: string;
  title: string;
  subtext: string;
  buttonText: string;
}

export interface DeskPageConfig {
  desk: 'finance' | 'logistics';
  seoTitle: string;
  seoDescription: string;
  theme: 'blue' | 'teal';
  hero: DeskHeroConfig;
  journeyTitle: string;
  journeySteps: StepItem[];
  productCards: {
    leftCard: DeskProductCard;
    rightCard: DeskProductCard;
  };
  customerStory: DeskCustomerStory;
  faqs: FaqItem[];
  closingCta: DeskClosingCta;
}

export const BANK_PARTNERS_LABEL = 'via your bank';

export const deskPageConfigs: Record<'finance' | 'logistics', DeskPageConfig> = {
  finance: {
    desk: 'finance',
    seoTitle: 'Finance Door — Docsynecx | Approve the bill. Pay the vendor. The entry posts itself.',
    seoDescription:
      'From vendor bill to paid and posted in Tally — without retyping a line. Built for businesses that run on Tally, not on spreadsheets.',
    theme: 'blue',
    hero: {
      tag: 'NEW · FINANCE DOOR',
      tagIcon: 'sparkles',
      headlineLine1: 'Approve the bill. Pay the vendor.',
      headlineLine2: 'The entry posts itself.',
      subtext:
        'From vendor bill to paid and posted in Tally — without retyping a line. Built for businesses that run on Tally, not on spreadsheets.',
      primaryButtonText: 'Book a demo',
      primaryButtonAction: '/#demo',
      secondaryButtonText: 'Already on Invoice? Switch on payments →',
      secondaryButtonAction: '#accounts-payable',
    },
    journeyTitle: "ONE BILL'S JOURNEY",
    journeySteps: [
      {
        number: '01',
        title: 'Bill arrives',
        subtitle: 'email or upload',
        icon: React.createElement(Mail, { size: 19 }),
      },
      {
        number: '02',
        title: 'Read & checked',
        subtitle: 'GST · duplicate · PO',
        icon: React.createElement(Search, { size: 19 }),
      },
      {
        number: '03',
        title: 'Approved',
        subtitle: 'from one screen',
        icon: React.createElement(Check, { size: 19 }),
      },
      {
        number: '04',
        title: 'Vendor paid',
        subtitle: BANK_PARTNERS_LABEL,
        icon: React.createElement(IndianRupee, { size: 19 }),
        isHighlight: true,
        highlightVariant: 'amber',
      },
      {
        number: '05',
        title: 'Posted to Tally',
        subtitle: 'bill + payment entry',
        icon: React.createElement(Upload, { size: 19 }),
        isHighlight: true,
        highlightVariant: 'blue',
      },
    ],
    productCards: {
      leftCard: {
        tag: 'INVOICE AUTOMATION · START HERE',
        checks: [
          'Bills read and GST-checked',
          'Duplicates held',
          'Posted to Tally, Zoho Books or ERP',
        ],
        ctaText: 'Free trial →',
        ctaHref: '/free-trial',
        accentBorder: 'blue',
      },
      rightCard: {
        tag: 'ACCOUNTS PAYABLE · ADD ON',
        checks: [
          'Approval rules by amount and vendor',
          'Pay vendors from the same screen',
          'Payment entry posts itself',
        ],
        ctaText: 'Book a demo →',
        ctaHref: '/#demo',
        accentBorder: 'orange',
        cardBg: 'from-orange-50/25 via-white to-white',
        badgeClassName: 'bg-amber-50 text-amber-700 border border-amber-200',
      },
    },
    customerStory: {
      company: 'Rajadurai E-Vehicles',
      context: 'Purchase, spares and service entry:',
      fromMetric: 'days',
      toMetric: 'hours.',
      linkText: 'Read the story →',
      linkHref: '/customers/rajadurai',
      accentColor: 'emerald',
    },
    faqs: [
      {
        question: 'Which banks can I pay vendors through?',
        answer:
          'Integration details for approved banking partners will be announced shortly prior to general availability. No proprietary bank portal changes will be required.',
      },
      {
        question: 'Does the payment show up in Tally automatically?',
        answer:
          'Yes. Once a vendor payment is authorized, both the purchase bill voucher and the corresponding bank payment voucher are created and reconciled automatically in Tally Prime.',
      },
      {
        question: 'Can the MD approve from his phone?',
        answer:
          'Yes. Decision makers can review invoice line items, tax breakdowns, and vendor bank details via secure mobile links with one-tap approval.',
      },
    ],
    closingCta: {
      badge: 'FINANCE DOOR',
      title: 'Approve the bill. Pay the vendor.',
      subtext: 'The entry posts itself into Tally Prime.',
      buttonText: 'Book a demo',
    },
  },
  logistics: {
    desk: 'logistics',
    seoTitle: 'Logistics Door — Docsynecx | Shipment emails in. CargoWise jobs out.',
    seoDescription:
      'Your documentation desk handles the exceptions — not the typing. Native CargoWise job creation from shipment emails and documents.',
    theme: 'teal',
    hero: {
      tag: 'FOR FREIGHT FORWARDERS ON CARGOWISE',
      tagIcon: 'sparkles',
      headlineLine1: 'Shipment emails in.',
      headlineLine2: 'CargoWise jobs out.',
      subtext:
        'Your documentation desk handles the exceptions — not the typing. Native CargoWise job creation from shipment emails and documents.',
      primaryButtonText: 'Book a demo',
      primaryButtonAction: '/#demo',
      secondaryButtonText: 'Send us a week of emails →',
      secondaryButtonAction: '#retyping-audit',
    },
    journeyTitle: "ONE SHIPMENT'S JOURNEY",
    journeySteps: [
      {
        number: '01',
        title: 'Email arrives',
        subtitle: 'docs collected from inbox',
        icon: React.createElement(Mail, { size: 19 }),
      },
      {
        number: '02',
        title: 'Read & checked',
        subtitle: 'BL vs packing list match',
        icon: React.createElement(Search, { size: 19 }),
      },
      {
        number: '03',
        title: 'Customs entry',
        subtitle: 'pre-filled line by line',
        icon: React.createElement(FileCheck, { size: 19 }),
      },
      {
        number: '04',
        title: 'CargoWise job created',
        subtitle: 'native API sync',
        icon: React.createElement(UploadCloud, { size: 19 }),
        isHighlight: true,
        highlightVariant: 'teal',
      },
      {
        number: '05',
        title: 'Freight AP check',
        subtitle: 'carrier charges vs expected',
        icon: React.createElement(ShieldAlert, { size: 19 }),
        isHighlight: true,
        highlightVariant: 'teal',
      },
    ],
    productCards: {
      leftCard: {
        tag: 'SHIPMENT INTAKE · CORE DESK',
        checks: [
          'Documents collected from email',
          'Key fields read and matched',
          'Job created or updated in CargoWise',
        ],
        ctaText: 'Send sample emails →',
        ctaHref: '/#demo',
        accentBorder: 'teal',
      },
      rightCard: {
        tag: 'CUSTOMS & AP AUDIT · ADD ON',
        checks: [
          'Customs entry pre-filled line by line',
          'Freight AP check: carrier charges vs expected',
          'Team works only the flagged cases',
        ],
        ctaText: 'Book a demo →',
        ctaHref: '/#demo',
        accentBorder: 'teal',
        cardBg: 'from-teal-50/25 via-white to-white',
        badgeClassName: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
      },
    },
    customerStory: {
      company: 'FT Logistics',
      context: 'Email-to-CargoWise posting:',
      fromMetric: '2 hrs',
      toMetric: '2 min',
      linkText: 'Read the story →',
      linkHref: '/customers/ft-logistics',
      accentColor: 'teal',
    },
    faqs: [
      {
        question: 'Which versions of CargoWise are supported?',
        answer:
          'CargoWise One via native enterprise eAdaptor integration and REST APIs. Other TMS systems (custom forwarder ERPs) are supported on request.',
      },
      {
        question: 'How does Docsynecx handle split or incomplete documents?',
        answer:
          'When an email contains partial documentation (such as a commercial invoice without packing list), Docsynecx flags the job with a specific missing-document tag and holds it in the exception queue without blocking automated workflows.',
      },
      {
        question: 'Can we set validation rules for specific carriers or ports?',
        answer:
          'Yes. Forwarders can configure automated cross-check rules by carrier, consignee, port pair, and incoterm directly from the admin desk.',
      },
    ],
    closingCta: {
      badge: 'LOGISTICS DOOR',
      title: 'Shipment emails in. CargoWise jobs out.',
      subtext: 'Your documentation desk handles the exceptions — not the typing.',
      buttonText: 'Book a demo',
    },
  },
};
