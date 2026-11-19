export interface PersonaChallenge {
  number: string;
  title: string;
  description: string;
}

export interface PersonaFeature {
  tag: string;
  title: string;
  description: string;
}

export interface PersonaFaq {
  question: string;
  answer: string;
}

export interface ProcessStepItem {
  number: string;
  phase: string;
  title: string;
  description: string;
  output: string;
  iconName: 'Inbox' | 'Sparkles' | 'ShieldCheck' | 'CheckCheck';
}

export interface PersonaData {
  slug: 'business-owners' | 'finance-teams' | 'accounts-teams' | 'ca-firms';
  navTitle: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  accent: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  microline: string;
  visualTitle: string;
  visualLabel: string;
  tiles: [string, string][];
  chip: string;
  challengesEyebrow: string;
  challengesTitle: string;
  challengesDescription: string;
  challenges: PersonaChallenge[];
  capabilitiesEyebrow: string;
  capabilitiesTitle: string;
  capabilitiesDescription: string;
  checklist: string[];
  features: PersonaFeature[];
  processEyebrow: string;
  processTitle: string;
  processDescription: string;
  processSteps: string[];
  processFlow?: ProcessStepItem[];
  proofLabel: string;
  proofTitle: string;
  proofMetricFrom: string;
  proofMetricTo: string;
  proofDescription: string;
  proofLink: string;
  proofLinkText: string;
  faqsEyebrow: string;
  faqsTitle: string;
  faqs: PersonaFaq[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
}

export const financePersonas: Record<PersonaData['slug'], PersonaData> = {
  'business-owners': {
    slug: 'business-owners',
    navTitle: 'Business Owners',
    metaTitle: 'For Business Owners · Docsynecx Finance Desk',
    metaDescription: 'For business owners on Tally Prime: see cash, what you owe and what you are owed, approve the bills that matter in one click, and ask your numbers questions in plain words.',
    eyebrow: 'For business owners',
    headline: 'Know where every rupee stands.',
    accent: 'Without waiting for month-end.',
    description: "See your cash, what you owe and what you're owed. Sign off the bills that matter in one click, and ask your numbers questions in plain words. All from the Tally Prime your team already uses.",
    primaryCta: 'Book a demo',
    secondaryCta: 'What you get',
    microline: 'Nothing is posted to Tally without approval. You decide which bills need yours.',
    visualTitle: 'Owner view',
    visualLabel: 'This week',
    tiles: [
      ['Cash and commitments', 'One view, straight from Tally'],
      ['One-click approval', 'With the bill attached'],
    ],
    chip: 'Price & duplicate checks · Flagged before you sign',
    challengesEyebrow: 'SOUND FAMILIAR?',
    challengesTitle: 'Four things that keep owners guessing.',
    challengesDescription: 'Your numbers are all in Tally. Docsynecx puts them where you can see and act on them.',
    challenges: [
      {
        number: '01 · Month-end',
        title: 'Blind until the books close',
        description: 'Spending and dues only show up weeks later, when accounts closes the month. Now: cash, dues and spending, current every day.',
      },
      {
        number: '02 · Leaks',
        title: 'Price hikes and repeat bills',
        description: 'A supplier raises a rate or bills twice, and nobody notices. Now: flagged before the bill reaches you.',
      },
      {
        number: '03 · Approvals',
        title: 'Bills piling up on your desk',
        description: 'Paper folders and emails, with no context or purchase history. Now: sign off in one click, with the bill and its history.',
      },
      {
        number: '04 · Questions',
        title: 'Asking staff for basic numbers',
        description: 'Every "what do we owe Metro?" stops your accounts team. Now: ask Docsynecx and get the answer yourself.',
      },
    ],
    capabilitiesEyebrow: 'WHAT YOU GET',
    capabilitiesTitle: 'Control of the money, without doing the accounts.',
    capabilitiesDescription: 'Gain control of upcoming dues, approvals, collections, and price checks without doing accounting chores.',
    checklist: [
      'Supplier bills sorted by due date to prevent cash pinches',
      'Set approval thresholds to sign off only on high-value bills',
      'Overdue customer tracking with team-approved payment reminders',
      'Automatic comparison of item rates against past purchase orders',
      'Ask performance and margin questions in plain words',
      'Every Tally voucher linked with its original source proof',
    ],
    features: [
      {
        tag: 'CASH CONTROL',
        title: "What's due, before it's due",
        description: 'Supplier bills sorted by due date, so there are no cash pinches or late fees.',
      },
      {
        tag: 'APPROVALS',
        title: 'Sign off only what matters',
        description: 'Set an amount. Smaller bills go straight to accounts, bigger ones come to you.',
      },
      {
        tag: 'COLLECTIONS',
        title: 'Who owes you, and how late',
        description: 'Overdue customers in one list, with reminders your team approves and sends.',
      },
      {
        tag: 'PRICE CHECKS',
        title: 'No silent price creep',
        description: 'Item rates compared with past purchases, and repeat bills flagged.',
      },
      {
        tag: 'ASK QUESTIONS',
        title: 'Answers without opening Tally',
        description: 'Margins, top expenses, supplier dependence. Ask in plain words.',
      },
      {
        tag: 'AUDIT-READY',
        title: 'Every voucher has its proof',
        description: 'Each entry linked to the original bill, who approved it and when.',
      },
    ],
    processEyebrow: 'HOW IT WORKS',
    processTitle: 'Your team does the work. You keep control.',
    processDescription: 'One supplier bill, from the inbox to Tally, with you in the loop only when it counts.',
    processSteps: ['Bills come in', 'Docsynecx checks them', 'You sign off the big ones', 'Posted to Tally'],
    processFlow: [
      {
        number: '01',
        phase: 'Inbox',
        title: 'Bills come in',
        description: 'Email, WhatsApp or upload. Branch bills and utility bills too.',
        output: 'Every bill in one inbox, from every branch.',
        iconName: 'Inbox',
      },
      {
        number: '02',
        phase: 'Checks',
        title: 'Docsynecx checks them',
        description: 'GST, totals, duplicates and price changes, before anyone approves.',
        output: "Problems caught before anyone signs, not after the money's gone.",
        iconName: 'Sparkles',
      },
      {
        number: '03',
        phase: 'Your approvals',
        title: 'You sign off the big ones',
        description: 'Routine bills go to accounts. High-value bills and odd prices come to you.',
        output: 'Only the bills that need you, with everything you need to decide.',
        iconName: 'ShieldCheck',
      },
      {
        number: '04',
        phase: 'Tally Prime',
        title: 'Posted to Tally',
        description: 'A purchase voucher, with the bill and your approval linked.',
        output: 'Proof on every voucher, ready for your auditor.',
        iconName: 'CheckCheck',
      },
    ],
    proofLabel: 'CUSTOMER STORY',
    proofTitle: 'Automobile E-Vehicles Dealer',
    proofMetricFrom: 'Days',
    proofMetricTo: 'hours',
    proofDescription: 'Spares, service bills and purchase vouchers across several branches now take hours instead of days, and the owner still signs off on what matters.',
    proofLink: '/demo/#demo-form',
    proofLinkText: 'See customer outcome',
    faqsEyebrow: 'OWNER QUESTIONS',
    faqsTitle: 'What owners ask us first.',
    faqs: [
      {
        question: 'Do we have to stop using Tally Prime?',
        answer: 'No. Docsynecx works with your existing Tally company and ledgers. Your team keeps working in Tally as they do today.',
      },
      {
        question: 'What do I see when a bill needs my approval?',
        answer: 'The bill itself, the checks it passed or failed, and what you paid this supplier before. Approve in one click.',
      },
      {
        question: 'How does it stop duplicate payments?',
        answer: 'Every bill is compared with ones already received, by supplier, bill number, amount and date. Anything that looks like a repeat is flagged before approval.',
      },
      {
        question: 'Does anything go into Tally without approval?',
        answer: 'No. Every entry is reviewed and approved first, by your team or by you, depending on the limits you set.',
      },
      {
        question: 'How long does it take to get started?',
        answer: 'The first-time setup with Tally Prime takes minutes. Then we test with your own bills and train your team in a single session.',
      },
    ],
    ctaEyebrow: 'SEE YOUR OWN NUMBERS',
    ctaTitle: 'Thirty minutes. Your own Tally. Real answers.',
    ctaDescription: "Bring the question you always ask your accounts team. We'll answer it from your books in the demo.",
    ctaButtonText: 'Book a demo',
  },

  'finance-teams': {
    slug: 'finance-teams',
    navTitle: 'Finance Teams',
    metaTitle: 'For Finance Teams · Docsynecx Finance Desk',
    metaDescription:
      'For finance teams on Tally Prime: every supplier invoice in one queue, GST and duplicates checked, exceptions first, and vouchers posted with the bill attached after your team approves.',
    eyebrow: 'For finance teams',
    headline: 'Close the month faster.',
    accent: 'With every invoice checked.',
    description:
      'Every supplier invoice in one queue. GST and duplicates checked automatically. Approved by your team and posted to Tally Prime with the bill attached. Your team reviews the exceptions, not every line.',
    primaryCta: 'Book a demo',
    secondaryCta: 'See how it works',
    microline: 'Nothing is posted to Tally Prime until your team approves it.',
    visualTitle: 'Month-end queue',
    visualLabel: 'Nov 2026',
    tiles: [
      ['Batch Processing', 'Automated intake'],
      ['Exception Triage', 'Confidence review'],
    ],
    chip: '412 invoices · 386 ready · 26 exceptions',
    challengesEyebrow: 'SOUND FAMILIAR?',
    challengesTitle: 'Four things that make month-end late.',
    challengesDescription:
      'Docsynecx takes the checking and chasing off your team, so the books close on time.',
    challenges: [
      {
        number: '01 · Approvals',
        title: "Invoices stuck in someone's inbox",
        description:
          'Managers forget to sign off, and early-payment discounts slip away. Now: every invoice in one queue, with who has it and how long.',
      },
      {
        number: '02 · Month-end',
        title: 'The last-week flood',
        description:
          'Bills pile up in the final days, and the team works late to check and enter them. Now: batches read and checked as they arrive.',
      },
      {
        number: '03 · Audits',
        title: '"Who approved this, and where\'s the bill?"',
        description:
          'Hunting through folders and emails when the auditors ask. Now: the bill, edits and approval, one click from the voucher.',
      },
      {
        number: '04 · GST',
        title: 'Tax errors found too late',
        description:
          'Wrong splits and GSTINs surface at filing time, as blocked credit. Now: GSTIN, HSN and tax splits checked on every bill.',
      },
    ],
    capabilitiesEyebrow: 'WHAT YOU GET',
    capabilitiesTitle: 'Control over volume, without adding people.',
    capabilitiesDescription:
      'Standardise workflows, reduce cycle time, and keep your team in full control of every entry.',
    checklist: [
      'Every source in one queue: email, WhatsApp, and portal uploads',
      'GSTIN, HSN, and tax splits automatically calculated and compared',
      'Review only exceptions: unsure fields, duplicates, and tax mismatches',
      'Configurable approval rules by branch, department, or bill value',
      'Bank statement reconciliation in the same connected workspace',
      'Comprehensive audit trails logging every edit, approval, and rejection reason',
    ],
    features: [
      {
        tag: 'INTAKE',
        title: 'Every source, one queue',
        description:
          'Email, WhatsApp, portal upload and batch upload from branches.',
      },
      {
        tag: 'GST CHECKS',
        title: 'GSTIN, HSN and tax splits',
        description:
          'CGST, SGST and IGST worked out from the lines and compared with the bill.',
      },
      {
        tag: 'EXCEPTIONS',
        title: "Review only what's unclear",
        description:
          'Unsure fields, duplicates and tax mismatches flagged. The rest is ready to approve.',
      },
      {
        tag: 'APPROVALS',
        title: 'Approval rules by department and amount',
        description:
          'Route bills by branch, department or value, with reminders to approvers.',
      },
      {
        tag: 'BANKING',
        title: 'Reconciliation in the same place',
        description:
          'Bank lines matched to your sales and purchase entries.',
      },
      {
        tag: 'AUDIT TRAIL',
        title: 'Every step on record',
        description:
          'Edits, approvals and rejection reasons, with the bill linked to its voucher.',
      },
    ],
    processEyebrow: 'HOW IT WORKS',
    processTitle: 'From a month of invoices to posted vouchers.',
    processDescription: 'Four steps, with your team in control of every entry.',
    processSteps: [
      'Everything in one queue',
      'Read and checked',
      'Your team approves',
      'Posted to Tally Prime',
    ],
    processFlow: [
      {
        number: '01',
        phase: 'Intake',
        title: 'Everything in one queue',
        description:
          'Email, WhatsApp, portal and branch uploads, in batches.',
        output: 'One queue for the whole month',
        iconName: 'Inbox',
      },
      {
        number: '02',
        phase: 'Checks',
        title: 'Read and checked',
        description:
          'Line items, HSN, GST and duplicates checked on every invoice.',
        output: 'Exceptions flagged for review',
        iconName: 'Sparkles',
      },
      {
        number: '03',
        phase: 'Approvals',
        title: 'Your team approves',
        description:
          'Routed by your approval rules. Clear invoices approved in batches.',
        output: 'Approved & logged',
        iconName: 'ShieldCheck',
      },
      {
        number: '04',
        phase: 'Posting',
        title: 'Posted to Tally Prime',
        description:
          'Purchase vouchers to the right ledgers, bill attached.',
        output: 'Right ledgers, bill attached',
        iconName: 'CheckCheck',
      },
    ],
    proofLabel: 'CUSTOMER STORY',
    proofTitle: 'A Logistics Company',
    proofMetricFrom: '2 hrs',
    proofMetricTo: '2 min',
    proofDescription:
      'Hundreds of recurring supplier documents a month. Review and entry that took hours now takes minutes, and the team still checks every entry.',
    proofLink: '/demo/#demo-form',
    proofLinkText: 'Read the case study',
    faqsEyebrow: 'FINANCE QUESTIONS',
    faqsTitle: 'What finance managers ask before rollout.',
    faqs: [
      {
        question: 'Will our accountants still check entries before posting?',
        answer:
          'Yes. Nothing goes to Tally Prime until your team approves it. Unclear fields and flagged invoices are shown first.',
      },
      {
        question: 'Can we set approval rules by department or amount?',
        answer:
          'Yes. Route invoices by department, branch, category or amount, for example invoices over ₹50,000 going to a director. Approvers get reminders, and every step is logged.',
      },
      {
        question: 'Does it handle credit and debit notes?',
        answer:
          'Yes. They come into the same queue as supplier invoices and go through the same checks.',
      },
      {
        question: 'What about multiple branches?',
        answer:
          'Branches send bills into the same queue by email, WhatsApp or upload, so the finance team sees the whole month in one place.',
      },
      {
        question: 'How long does it take to get started?',
        answer:
          'The first-time setup with Tally Prime takes minutes. Then we test with your own invoices and train your team in a single session.',
      },
    ],
    ctaEyebrow: 'SEE IT ON YOUR OWN MONTH-END',
    ctaTitle: "Bring last month's invoices. We'll run them with you.",
    ctaDescription:
      "Share a batch of real supplier invoices. In the demo you'll see them read, checked and the exceptions sorted, ready to approve into Tally Prime.",
    ctaButtonText: 'Book a demo',
  },

  'accounts-teams': {
    slug: 'accounts-teams',
    navTitle: 'Accounts Teams',
    metaTitle: 'For Accounts Teams · Docsynecx Finance Desk',
    metaDescription:
      'For accounts teams on Tally Prime: stop retyping bills. Docsynecx reads every line item, HSN and tax, suggests ledgers and drafts the voucher. You check it and post in one click.',
    eyebrow: 'For accounts teams',
    headline: 'Stop retyping bills.',
    accent: 'Check them and post to Tally.',
    description:
      'Docsynecx reads every line of the bill, item, HSN, quantity, rate and tax, suggests the right ledgers and drafts the voucher. You check it against the bill and post it to Tally Prime in one click.',
    primaryCta: 'Book a demo',
    secondaryCta: 'See your new routine',
    microline: 'You review every bill. Nothing is posted to Tally until you approve it.',
    visualTitle: 'Bharat Fasteners',
    visualLabel: 'INV-7312',
    tiles: [
      ['PDF Line Items', 'Auto-extracted'],
      ['Tally Voucher', 'PUR-829 posted'],
    ],
    chip: 'Ready to post · 3 lines · Tax checks out',
    challengesEyebrow: 'SOUND FAMILIAR?',
    challengesTitle: "Four things that fill an accounts executive's day.",
    challengesDescription:
      'Docsynecx does the typing and the maths. You do the checking.',
    challenges: [
      {
        number: '01 · Typing',
        title: 'Retyping every bill',
        description:
          'Supplier, date, bill number, item codes, quantities and rates, typed from a PDF on the other screen. Now: read for you, line by line.',
      },
      {
        number: '02 · Layouts',
        title: 'Messy, rotated, two-page bills',
        description:
          "Every supplier's bill looks different, and some are scans of handwritten copies. Now: all read the same way. Anything unclear is highlighted.",
      },
      {
        number: '03 · Tax maths',
        title: 'CGST, SGST or IGST?',
        description:
          'Checking splits and HSN codes across a twelve-line bill, with a calculator. Now: tax worked out from the lines and checked against the total.',
      },
      {
        number: '04 · Duplicates',
        title: 'The bill you already entered',
        description:
          'It came by email last week, and now on paper. Then come the reversal entries. Now: flagged before you post it.',
      },
    ],
    capabilitiesEyebrow: 'WHAT YOU GET',
    capabilitiesTitle: "Check bills, don't type them.",
    capabilitiesDescription:
      'Keep your hands off the number pad. Docsynecx extracts every field with high precision and prepares the complete Tally voucher for your approval.',
    checklist: [
      'Line items: descriptions, HSN, quantities, rates, discounts and tax',
      'Ledgers suggested from your past accounting history',
      'Unsure fields highlighted so you check what matters first',
      'Duplicates blocked before a bill enters Tally twice',
      'Automatic mathematical validation of taxes and round-offs',
      'Batch upload to clear dozens of bills in a single sitting',
    ],
    features: [
      {
        tag: 'LINE ITEMS',
        title: 'Every line, even on long bills',
        description:
          'Descriptions, HSN, quantities, rates, discounts and tax, across multi-page tables.',
      },
      {
        tag: 'LEDGERS',
        title: 'Ledgers suggested for you',
        description:
          'Supplier, purchase and tax ledgers suggested from your past entries. You confirm.',
      },
      {
        tag: 'UNSURE FIELDS',
        title: 'Highlighted for you',
        description:
          'Anything unclear on the bill is flagged, so you check it first.',
      },
      {
        tag: 'DUPLICATES',
        title: 'No bill entered twice',
        description:
          'Checked by supplier GSTIN, bill number, date and amount.',
      },
      {
        tag: 'TOTALS',
        title: 'Tax and round-off checked',
        description:
          "Taxable value plus tax compared with the bill's grand total.",
      },
      {
        tag: 'BATCHES',
        title: 'Clear a pile in one sitting',
        description:
          'Upload dozens of bills at once and work through them in order.',
      },
    ],
    processEyebrow: 'YOUR NEW ROUTINE',
    processTitle: 'Upload. Check. Confirm. Post.',
    processDescription:
      'One supplier bill, from a PDF to a purchase voucher in Tally Prime.',
    processSteps: [
      'Upload the bills',
      'Check the details',
      'Confirm the ledgers',
      'Post to Tally Prime',
    ],
    processFlow: [
      {
        number: '01',
        phase: 'Upload',
        title: 'Upload the bills',
        description:
          'One bill or a batch. PDF, scan, email or WhatsApp. No renaming or sorting.',
        output: 'Drop in & start checking',
        iconName: 'Inbox',
      },
      {
        number: '02',
        phase: 'Check',
        title: 'Check the details',
        description:
          'Supplier, GSTIN, date, lines and totals, against the bill.',
        output: 'Totals & line items verified',
        iconName: 'Sparkles',
      },
      {
        number: '03',
        phase: 'Confirm',
        title: 'Confirm the ledgers',
        description:
          "Suggested from how you've booked this supplier before.",
        output: 'Ledgers mapped & confirmed',
        iconName: 'ShieldCheck',
      },
      {
        number: '04',
        phase: 'Post',
        title: 'Post to Tally Prime',
        description:
          'One click. A purchase voucher with the bill attached.',
        output: 'PUR voucher created in Tally',
        iconName: 'CheckCheck',
      },
    ],
    proofLabel: 'CUSTOMER STORY',
    proofTitle: 'A Busy Operations Team',
    proofMetricFrom: 'Hours',
    proofMetricTo: 'minutes',
    proofDescription:
      'Purchase bills and asset documents come in every day. The team now checks and posts them in minutes, instead of spending hours retyping.',
    proofLink: '/demo/#demo-form',
    proofLinkText: 'See customer outcome',
    faqsEyebrow: 'ACCOUNTS QUESTIONS',
    faqsTitle: 'What accounts teams ask about daily use.',
    faqs: [
      {
        question: 'Does it create real vouchers in Tally Prime?',
        answer:
          'Yes. Purchase vouchers in your Tally company, using your own ledger names, with the bill attached.',
      },
      {
        question: 'What if a bill has 50 line items?',
        answer:
          'Every line is read, including tables that run over several pages. You check them in one list.',
      },
      {
        question: "What if it isn't sure about a field?",
        answer:
          'The field is highlighted so you check it first. Nothing is guessed silently, and nothing posts until you approve.',
      },
      {
        question: 'Do we need technical skills?',
        answer:
          'No. If you can use Tally, you can use Docsynecx. We train your team in a single session.',
      },
      {
        question: 'How long does it take to get started?',
        answer:
          'The first-time setup with Tally Prime takes minutes. Then we test it with your own bills.',
      },
    ],
    ctaEyebrow: 'SEE IT ON YOUR OWN BILLS',
    ctaTitle: "Bring your messiest bill. We'll post it with you.",
    ctaDescription:
      "Two pages, rotated, handwritten, fifty lines. In the demo you'll see it read, checked and ready to post to Tally Prime.",
    ctaButtonText: 'Book a demo',
  },

  'ca-firms': {
    slug: 'ca-firms',
    navTitle: 'CA Firms',
    metaTitle: 'For CA Firms · Docsynecx Finance Desk',
    metaDescription:
      "For CA firms on Tally Prime: clients send bills by email, WhatsApp or upload. Docsynecx reads them, checks GST and drafts vouchers in each client's Tally company for your team to approve.",
    eyebrow: 'For CA firms',
    headline: "Every client's bills, in one place.",
    accent: 'Posted to the right Tally company.',
    description:
      "Clients send bills and bank statements by email, WhatsApp or upload. Docsynecx reads them, checks GST and duplicates, and drafts vouchers in each client's own Tally company. Your articles review and approve, instead of typing.",
    primaryCta: 'Book a demo',
    secondaryCta: 'See how it works',
    microline: "Nothing is posted to a client's books until your team approves it.",
    visualTitle: 'Your clients',
    visualLabel: 'This week',
    tiles: [
      ['Client Companies', 'Multi-tenant intake'],
      ['GST Reconciliation', '2B matching ready'],
    ],
    chip: '12 companies · 98 bills received · 89 ready',
    challengesEyebrow: 'SOUND FAMILIAR?',
    challengesTitle: 'Four things that eat into every filing season.',
    challengesDescription:
      'Docsynecx takes the collecting and typing off your team, so they can review, reconcile and advise.',
    challenges: [
      {
        number: '01 · Late batches',
        title: 'Bills arrive in a heap, at the deadline',
        description:
          'Paper receipts, WhatsApp photos and PDF dumps, days before filing. Now: clients send as they go, sorted by client automatically.',
      },
      {
        number: '02 · Entry',
        title: 'Articles stuck typing vouchers',
        description:
          'Trainees punch bills into Tally instead of learning to audit. Now: they check drafts and approve in batches.',
      },
      {
        number: '03 · GST',
        title: 'Tax errors found at filing time',
        description:
          'Wrong splits and GSTINs show up when the return is due. Now: GSTIN, HSN and tax checked on every bill.',
      },
      {
        number: '04 · Audits',
        title: '"Where\'s the original bill?"',
        description:
          'Hours lost hunting a source document when a client gets a query. Now: the bill is linked to its voucher, one click away.',
      },
    ],
    capabilitiesEyebrow: 'WHAT YOU GET',
    capabilitiesTitle: 'More clients, without more typing.',
    capabilitiesDescription:
      'Equip your firm with automated document intake, standard ledger mapping, and high-speed Tally voucher posting.',
    checklist: [
      'One workspace, many companies: switch between client entities effortlessly',
      'Clients send bills directly by email, WhatsApp or simple portal upload',
      'Automated GSTIN, HSN, and tax calculation validation on every bill',
      'Vouchers drafted directly into each client’s respective Tally company',
      'Client bank statement categorization and reconciliation support',
      'Immutable audit trails linking every posted voucher to its original bill',
    ],
    features: [
      {
        tag: 'CLIENTS',
        title: 'One workspace, many companies',
        description:
          'Switch between clients. Each keeps its own Tally company, ledgers and voucher types.',
      },
      {
        tag: 'INTAKE',
        title: 'Clients send it straight in',
        description:
          'By email, WhatsApp or upload. No chasing, no couriered bags of paper.',
      },
      {
        tag: 'GST CHECKS',
        title: 'GSTIN, HSN and tax splits',
        description:
          'CGST, SGST and IGST worked out from the lines and compared with each bill.',
      },
      {
        tag: 'VOUCHERS',
        title: "Drafted in the client's Tally",
        description:
          "Ledgers suggested from that client's past entries. Your team confirms.",
      },
      {
        tag: 'BANKING',
        title: 'Client bank statements too',
        description:
          'Categorised, matched to the books and pushed to Tally.',
      },
      {
        tag: 'AUDIT TRAIL',
        title: 'Every voucher has its source',
        description:
          'The original bill linked to its voucher, with who approved it and when.',
      },
    ],
    processEyebrow: 'HOW IT WORKS',
    processTitle: "From a client's pile of bills to posted vouchers.",
    processDescription: 'Four steps, with your team approving every entry.',
    processSteps: [
      'Clients send bills',
      'Read and checked',
      'Articles review',
      "Posted to each client's Tally",
    ],
    processFlow: [
      {
        number: '01',
        phase: 'Intake',
        title: 'Clients send bills',
        description:
          'Bills and bank statements by email, WhatsApp or upload, sorted by client.',
        output: 'Sorted automatically by client',
        iconName: 'Inbox',
      },
      {
        number: '02',
        phase: 'Checks',
        title: 'Read and checked',
        description:
          'Lines, HSN, GST and duplicates, with inter- or intra-state tax worked out.',
        output: 'Tax & duplicate checks passed',
        iconName: 'Sparkles',
      },
      {
        number: '03',
        phase: 'Review',
        title: 'Articles review',
        description:
          'Suggested ledgers and flags checked in batches, client by client.',
        output: 'Batch reviewed in one sitting',
        iconName: 'ShieldCheck',
      },
      {
        number: '04',
        phase: 'Post',
        title: "Posted to each client's Tally",
        description:
          'Vouchers in the right company, with the bill attached.',
        output: 'Linked vouchers in client Tally',
        iconName: 'CheckCheck',
      },
    ],
    proofLabel: 'PRACTICE OUTCOME',
    proofTitle: 'Multi-Client Turnaround',
    proofMetricFrom: 'Days',
    proofMetricTo: 'hours',
    proofDescription:
      'Clients send bills as they go, sorted by client automatically. Articles review and approve vouchers in minutes.',
    proofLink: '/demo/#demo-form',
    proofLinkText: 'See multi-client demo',
    faqsEyebrow: 'CA PRACTICE QUESTIONS',
    faqsTitle: 'What CA firms ask us first.',
    faqs: [
      {
        question: 'Can we manage many client Tally companies from one account?',
        answer:
          'Yes. Each client has its own profile, with its own Tally company, ledgers and voucher types.',
      },
      {
        question: 'How do clients send us documents?',
        answer:
          "By email, WhatsApp or upload. Bills land in your firm's queue, already sorted by client.",
      },
      {
        question: 'Is client data kept separate?',
        answer:
          "Yes. Each client's documents and books sit in their own profile. We'll take you through security and access in the demo.",
      },
      {
        question: 'Does anything post without our review?',
        answer:
          "No. Your team approves every entry before it goes into a client's Tally.",
      },
      {
        question: 'How long does it take to get started?',
        answer:
          'The first-time setup with Tally Prime takes minutes. Then add clients one by one, starting with your busiest.',
      },
    ],
    ctaEyebrow: 'SEE IT ON A REAL CLIENT',
    ctaTitle: "Bring one client's messy month. We'll run it with you.",
    ctaDescription:
      "Pick the client whose bills you dread. In the demo you'll see them read, checked and ready to post to their Tally company.",
    ctaButtonText: 'Book a demo',
  },
};
