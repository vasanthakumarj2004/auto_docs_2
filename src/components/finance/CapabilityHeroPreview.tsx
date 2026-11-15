import type { ReactNode } from 'react';
import { ArrowDownLeft, ArrowLeftRight, ArrowUpRight, Check, CheckCheck, Clock3, FileCheck2, FileText, GitBranch, Landmark, Layers3, LockKeyhole, ScanLine, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import s from './CapabilityHeroPreview.module.css';

export type PreviewCapability = 'invoice-automation' | 'banking-reconciliation' | 'docsynecx-intelligence' | 'accounts-payable';

const titles = {
  'invoice-automation': 'Invoice review',
  'banking-reconciliation': 'Bank reconciliation',
  'docsynecx-intelligence': 'Business intelligence',
  'accounts-payable': 'Payables workspace',
};

function Status({ children, pending = false }: { children: ReactNode; pending?: boolean }) {
  return <span className={s.status} data-pending={pending || undefined}>{pending ? <Clock3 size={11} aria-hidden="true" /> : <Check size={11} aria-hidden="true" />}{children}</span>;
}

function InvoicePreview() {
  return <>
    <div className={s.sectionHeading}><div><span className={s.kicker}>DOCUMENT TO DATA</span><h2>Every field. Accounted for.</h2></div><span className={s.largeIcon}><ScanLine size={21} aria-hidden="true" /></span></div>
    <div className={s.invoiceSplit}>
      <div className={s.document}>
        <div className={s.fileBar}><FileText size={12} aria-hidden="true" /> INV-2048.pdf <span>1 / 1</span></div>
        <div className={s.paper}>
          <div className={s.paperTop}><span>TAX INVOICE</span><span className={s.paperStamp}>IN</span></div>
          <strong className={s.supplier}>Sample Supplies Co.</strong><p>Industrial supplies · Chennai</p>
          <div className={s.documentMeta}><span>Invoice number</span><mark>INV-2048</mark><span>Invoice date</span><strong>06 Nov 2026</strong></div>
          <div className={s.lineItem}><span>DESCRIPTION</span><span>INR</span></div>
          <div className={s.lineItem}><span>Industrial components</span><strong>48,000</strong></div>
          <div className={s.documentTotals}><span>Subtotal <b>48,000</b></span><span>GST · 18% <b>8,640</b></span><strong>Total <mark>₹56,640</mark></strong></div>
          <div className={s.scanEdge} aria-hidden="true" />
        </div>
      </div>
      <div className={s.fields}>
        <div className={s.panelLabel}><Sparkles size={13} aria-hidden="true" /> Extracted fields</div>
        <dl><div><dt>Supplier</dt><dd>Sample Supplies Co.<Check size={12} aria-hidden="true" /></dd></div><div><dt>Invoice number</dt><dd>INV-2048<Check size={12} aria-hidden="true" /></dd></div><div><dt>Tax amount</dt><dd>₹8,640<Check size={12} aria-hidden="true" /></dd></div><div><dt>Invoice total</dt><dd>₹56,640<Check size={12} aria-hidden="true" /></dd></div></dl>
        <div className={s.validation}><ShieldCheck size={17} aria-hidden="true" /><div><strong>Totals checked</strong><span>Ready for human review</span></div></div>
      </div>
    </div>
    <div className={s.bottomStrip}><span><FileCheck2 size={15} aria-hidden="true" /><strong>TallyPrime</strong></span><Status pending>Awaiting approval</Status></div>
    <p className={s.footnote}>Review and approve before posting to your accounting system.</p>
  </>;
}

const transactions = [
  { name: 'Supplier payment', ref: 'INV-2048', amount: '₹56,640', matched: true },
  { name: 'Customer receipt', ref: 'REC-0312', amount: '₹24,500', matched: true },
  { name: 'Bank charges', ref: 'No ledger match', amount: '₹450', matched: false },
];

function BankingPreview() {
  return <>
    <div className={s.sectionHeading}><div><span className={s.kicker}>STATEMENT TO LEDGER</span><h2>A clearer path to reconciliation.</h2></div><span className={s.largeIcon}><ArrowLeftRight size={21} aria-hidden="true" /></span></div>
    <div className={s.bankBridge}><div><Landmark size={19} aria-hidden="true" /><span>Bank statement<small>November 2026</small></span></div><span className={s.bridgeLine}><ArrowLeftRight size={15} aria-hidden="true" /></span><div><Layers3 size={19} aria-hidden="true" /><span>TallyPrime<small>Accounting entries</small></span></div></div>
    <div className={s.summary}><div><span>Transactions</span><strong>03</strong></div><div><span>Matched</span><strong className={s.teal}>02</strong></div><div><span>Needs review</span><strong className={s.amber}>01</strong></div></div>
    <div className={s.transactionList}>
      <div className={s.listHeading}><span>STATEMENT ENTRY</span><span>AMOUNT / STATUS</span></div>
      {transactions.map((item, index) => <div className={s.transaction} key={item.ref}>
        <span className={s.transactionIcon}>{index === 1 ? <ArrowDownLeft size={16} aria-hidden="true" /> : <ArrowUpRight size={16} aria-hidden="true" />}</span><div><strong>{item.name}</strong><span>{item.ref}</span></div><div><strong>{item.amount}</strong><Status pending={!item.matched}>{item.matched ? 'Matched' : 'Review'}</Status></div>
      </div>)}
    </div>
    <div className={s.callout}><ShieldCheck size={16} aria-hidden="true" /><span><strong>Exceptions stay visible.</strong> Your team reviews unmatched entries.</span></div>
  </>;
}

const revenue = [{ month: 'Jun', value: 7.8 }, { month: 'Jul', value: 8.4 }, { month: 'Aug', value: 9.1 }, { month: 'Sep', value: 10.8 }, { month: 'Oct', value: 11.2 }, { month: 'Nov', value: 12.4 }];

function IntelligencePreview() {
  return <>
    <div className={s.sectionHeading}><div><span className={s.kicker}>CONNECTED BUSINESS VIEW</span><h2>From numbers to understanding.</h2></div><span className={s.largeIcon}><TrendingUp size={21} aria-hidden="true" /></span></div>
    <div className={s.period}><span>Performance overview</span><span>Nov 2026 · Sample</span></div>
    <div className={`${s.summary} ${s.metrics}`}><div><span>Revenue</span><strong>₹12.4L</strong></div><div><span>Expenses</span><strong>₹8.1L</strong></div><div><span>Net result</span><strong className={s.teal}>₹4.3L</strong></div></div>
    <figure className={s.chart}>
      <figcaption><strong>Revenue trend</strong><span>INR lakhs</span></figcaption>
      <div className={s.bars} role="img" aria-label="Sample monthly revenue in lakhs: June 7.8, July 8.4, August 9.1, September 10.8, October 11.2, November 12.4.">
        {revenue.map(({ month, value }, i) => <div key={month} className={s.barColumn} aria-hidden="true"><span>{value.toFixed(1)}</span><div className={s.bar} data-current={i === 5 || undefined} style={{ height: `${value / 12.4 * 96}px` }} /><span>{month}</span></div>)}
      </div>
    </figure>
    <div className={s.insight}><span className={s.insightIcon}><Sparkles size={17} aria-hidden="true" /></span><div><span className={s.kicker}>ILLUSTRATIVE INSIGHT</span><strong>Revenue grew by ₹1.2L from October.</strong><p>Explore the underlying movements in your connected data.</p></div></div>
    <p className={s.footnote}>Sample figures · Decision support with human judgement.</p>
  </>;
}

function PayablePreview() {
  return <>
    <div className={s.sectionHeading}><div><span className={s.kicker}>A LOOK AT WHAT’S NEXT</span><h2>Supplier bills. A connected flow.</h2></div><span className={s.largeIcon}><GitBranch size={21} aria-hidden="true" /></span></div>
    <div className={s.development}><LockKeyhole size={15} aria-hidden="true" /><span><strong>Under development</strong> · Planned workflow preview</span></div>
    <ol className={s.approvalFlow}>{[{ icon: FileText, title: 'Capture' }, { icon: ShieldCheck, title: 'Approve' }, { icon: Clock3, title: 'Track' }].map(({ icon: Icon, title }, i) => <li key={title}><span className={s.flowIcon}><Icon size={19} aria-hidden="true" /></span><strong>{title}</strong><span>0{i + 1}</span></li>)}</ol>
    <div className={s.billCard}><div className={s.billTitle}><span className={s.billIcon}><FileText size={19} aria-hidden="true" /></span><div><strong>Sample Supplies Co.</strong><span>Supplier invoice · INV-2048</span></div><strong>₹56,640</strong></div>
      <div className={s.approvalRow}><span>Finance review</span><span className={s.plannedPill}>Planned approval step</span></div>
      <div className={s.approvalRow}><span>Payment visibility</span><span className={s.plannedPill}>Planned tracking</span></div>
    </div>
    <div className={s.roadmap}><span><CheckCheck size={15} aria-hidden="true" />Supplier workflows</span><span><Layers3 size={15} aria-hidden="true" />Payable visibility</span></div>
    <p className={s.footnote}>Concept illustration · Not yet available for deployment.</p>
  </>;
}

export function CapabilityHeroPreview({ page }: { page: PreviewCapability }) {
  return <div className={s.stage}>
    <div className={s.preview} role="group" aria-label={`${titles[page]}: illustrative product preview with sample data`}>
      <div className={s.toolbar}><span className={s.appIcon}><Layers3 size={15} aria-hidden="true" /></span><strong>Finance Desk</strong><span className={s.toolbarSlash}>/</span><span>{titles[page]}</span><span className={s.sampleBadge}>{page === 'accounts-payable' ? 'Upcoming' : 'Sample data'}</span></div>
      <div className={s.body}>
        {page === 'invoice-automation' && <InvoicePreview />}
        {page === 'banking-reconciliation' && <BankingPreview />}
        {page === 'docsynecx-intelligence' && <IntelligencePreview />}
        {page === 'accounts-payable' && <PayablePreview />}
      </div>
    </div>
  </div>;
}
