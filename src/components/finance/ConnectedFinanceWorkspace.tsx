'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { ArrowDownLeft, ArrowUpRight, BarChart3, Check, CheckCheck, ChevronRight, FileCheck2, FileText, Inbox, Mail, ShieldCheck, Sparkles } from 'lucide-react';
import base from '../LandingPage.module.css';
import s from './ConnectedFinanceWorkspace.module.css';

const steps = [
  { name: 'Capture', title: 'Every document. One starting point.', description: 'Bring invoices, PDFs and business documents together. Capture the details without entering them again.', icon: Inbox },
  { name: 'Validate', title: 'Confidence before the next step.', description: 'Review extracted fields, tax details and potential duplicates. Keep your team in control of exceptions.', icon: ShieldCheck },
  { name: 'Understand', title: 'Turn finance data into a clearer view.', description: 'Explore your financial information in context, from supplier balances to spending patterns.', icon: BarChart3 },
  { name: 'Act', title: 'Move forward with the full picture.', description: 'Use connected reports and insights to support decisions, with the source information close at hand.', icon: ArrowUpRight },
];

function CapturePreview() {
  return <>
    <div className={`${s.floatingFile} ${s.fileOne}`}><FileText size={14} />Invoice.pdf</div>
    <div className={`${s.floatingFile} ${s.fileTwo}`}><Mail size={14} />Vendor email</div>
    <div className={s.window}>
      <div className={s.windowHeader}><span><Inbox size={16} />Document inbox</span><span className={s.pill}>3 documents</span></div>
      <div className={s.documentList}>
        {['Prime Components', 'Metro Supplies', 'Apex Services'].map((name, i) => <div className={s.documentRow} key={name} style={{ animationDelay: `${i * 100}ms` }}><span className={s.documentIcon}><FileText size={20} /></span><div><strong>{name}</strong><small>{['INV-4821 · PDF invoice', 'INV-1068 · Email attachment', 'INV-0294 · Scanned invoice'][i]}</small></div><Check size={15} /></div>)}
      </div>
      <div className={s.extraction}><div><Sparkles size={15} /><strong>Invoice details captured</strong><span>Complete</span></div><div className={s.progress}><span /></div><p>Supplier · Line items · Tax details · Total</p></div>
      <div className={s.windowFooter}><FileCheck2 size={14} />Ready for your team to review<ChevronRight size={14} /></div>
    </div>
    <div className={s.result}><CheckCheck size={15} />Less retyping. More time for review.</div>
  </>;
}

function ValidatePreview() {
  return <>
    <div className={`${s.floatingFile} ${s.fileOne}`}><FileText size={14} />Source linked</div>
    <div className={s.window}>
      <div className={s.windowHeader}><span><ShieldCheck size={16} />Invoice review</span><span className={s.pill}>INV-4821</span></div>
      <div className={s.invoiceSummary}><div><small>Prime Components</small><strong>₹74,045<span>.00</span></strong></div><span className={s.documentIcon}><FileCheck2 size={26} /></span></div>
      <div className={s.checkRows}>{[['Invoice fields', 'Captured'], ['Tax totals', 'Matched'], ['Duplicate check', 'No match found']].map(([label, status], i) => <div key={label} style={{ animationDelay: `${i * 120}ms` }}><Check size={15} /><span>{label}</span><strong>{status}</strong></div>)}</div>
      <div className={s.reviewNote}><span className={s.reviewDot} /><div><strong>Your review stays in the loop</strong><p>Confirm the ledger before posting.</p></div><ChevronRight size={15} /></div>
    </div>
    <div className={s.result}><ShieldCheck size={15} />Your checks. Your final approval.</div>
  </>;
}

function UnderstandPreview() {
  return <>
    <div className={`${s.floatingFile} ${s.fileTwo}`}><BarChart3 size={14} />Connected data</div>
    <div className={s.window}>
      <div className={s.windowHeader}><span><BarChart3 size={16} />Finance overview</span><span className={s.pill}>This month</span></div>
      <div className={s.metrics}><div><small>Invoice value</small><strong>₹12.8L</strong><span>Across 48 invoices</span></div><div><small>Awaiting review</small><strong>06</strong><span>In your team's queue</span></div></div>
      <div className={s.chart}><div className={s.chartHeading}><strong>Spend by week</strong><span><i />Invoice value</span></div><div className={s.bars} aria-label="Illustrative weekly invoice values: 2.1, 3.2, 2.8 and 4.7 lakh rupees">{[45, 68, 60, 100].map((height, i) => <div key={i}><div style={{ height: `${height}%`, animationDelay: `${i * 90}ms` }}><span>{['₹2.1L', '₹3.2L', '₹2.8L', '₹4.7L'][i]}</span></div><small>Week {i + 1}</small></div>)}</div></div>
      <div className={s.windowFooter}><FileText size={14} />Every number connected to its source<ChevronRight size={14} /></div>
    </div>
    <div className={s.result}><BarChart3 size={15} />See the details behind the bigger picture.</div>
  </>;
}

function ActPreview() {
  return <>
    <div className={`${s.floatingFile} ${s.fileOne}`}><FileText size={14} />Monthly report</div>
    <div className={s.window}>
      <div className={s.windowHeader}><span><Sparkles size={16} />Insights & next steps</span><span className={s.pill}>Finance Desk</span></div>
      <div className={s.insight}><span className={s.documentIcon}><ArrowDownLeft size={23} /></span><div><small>SUPPLIER SPEND</small><strong>A clearer view of your commitments.</strong><p>Review supplier balances alongside the documents that explain them.</p></div></div>
      <div className={s.reportRows}>{[['Supplier summary', 'Balances and linked invoices'], ['Monthly finance report', 'Spending and review status'], ['Accounting handoff', 'Reviewed information for TallyPrime']].map(([title, copy], i) => <div key={title} style={{ animationDelay: `${i * 100}ms` }}><FileText size={16} /><div><strong>{title}</strong><small>{copy}</small></div><ArrowUpRight size={15} /></div>)}</div>
      <div className={s.windowFooter}><CheckCheck size={14} />Better context for your next decision<ChevronRight size={14} /></div>
    </div>
    <div className={s.result}><Sparkles size={15} />From business documents to useful insights.</div>
  </>;
}

const previews = [CapturePreview, ValidatePreview, UnderstandPreview, ActPreview];

export function ConnectedFinanceWorkspace() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % steps.length;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index + steps.length - 1) % steps.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = steps.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return <section className={`${base.section} ${base.alternate} ${s.section}`} aria-labelledby="connected-finance-title" id="connected-finance-workspace">
    <div className="site-shell">
      <div className={s.heading}><p className={`${base.eyebrow} ${s.eyebrow}`}>ONE CONNECTED FINANCE WORKSPACE</p><h2 id="connected-finance-title">From documents<br />to better decisions.</h2><p className={s.intro}>Finance teams need more than data entry. Connect invoice automation with financial and business intelligence, and make more of the information you already have.</p></div>
      <div className={s.workspace}>
        <div className={s.steps} role="tablist" aria-label="Explore the finance workflow" aria-orientation="vertical">
          {steps.map(({ name, title, description, icon: Icon }, index) => <button key={name} type="button" role="tab" id={`finance-step-${index}`} aria-controls={`finance-preview-${index}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} ref={element => { tabs.current[index] = element; }} onClick={() => setActive(index)} onKeyDown={event => handleKeyDown(event, index)} className={s.step}>
            <span className={s.stepNumber}>0{index + 1}</span><span className={s.stepCopy}><span className={s.stepLabel}><Icon size={15} />{name}</span><strong>{title}</strong><span className={s.description}>{description}</span></span><ChevronRight className={s.stepArrow} size={16} />
          </button>)}
        </div>
        <div className={s.stage}>
          <div className={s.glow} aria-hidden="true" />
          {previews.map((Preview, index) => <div key={index} role="tabpanel" id={`finance-preview-${index}`} aria-labelledby={`finance-step-${index}`} hidden={active !== index} tabIndex={0} className={s.preview}>{active === index && <Preview />}</div>)}
          <p className={s.caption}>ILLUSTRATIVE PRODUCT VIEW <span>0{active + 1} / 04</span></p>
        </div>
      </div>
    </div>
  </section>;
}
