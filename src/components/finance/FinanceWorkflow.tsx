'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { ArrowRight, BarChart3, Building2, Check, CheckCheck, ChevronRight, FileCheck2, FileText, Inbox, Layers, ShieldCheck } from 'lucide-react';
import base from '../LandingPage.module.css';
import s from './FinanceWorkflow.module.css';

const steps = [
  { name: 'Documents', description: 'Bring supplier invoices into one place and capture the details your team needs.', icon: Inbox, heading: 'Your document inbox', label: '3 sample invoices' },
  { name: 'Validation', description: 'Review extracted fields, tax totals and potential duplicates before moving forward.', icon: ShieldCheck, heading: 'Review with confidence', label: 'INV-4821' },
  { name: 'Accounting', description: 'Map approved information to your ledgers and connect the entry to TallyPrime.', icon: Building2, heading: 'From invoice to accounting', label: 'TallyPrime' },
  { name: 'Reporting', description: 'Explore financial summaries and trace the numbers back to their source.', icon: BarChart3, heading: 'The bigger picture, connected', label: 'Sample overview' },
];

function Documents() {
  return <>
    <div className={s.summary}><span className={s.summaryIcon}><Inbox size={22} /></span><div><strong>One inbox for your invoices</strong><p>PDFs, scans and email attachments</p></div></div>
    <div className={s.invoiceList}>
      {[
        ['Prime Components', 'INV-4821 · PDF', '₹74,045'],
        ['Metro Supplies', 'INV-1068 · Email', '₹32,450'],
        ['Apex Services', 'INV-0294 · Scan', '₹18,500'],
      ].map(([name, reference, amount]) => <div key={name}><FileText size={17} /><div><strong>{name}</strong><small>{reference}</small></div><span>{amount}<small><Check size={10} />Captured</small></span></div>)}
    </div>
    <div className={s.note}><FileCheck2 size={14} /><span>Supplier, line items and tax details ready for review.</span></div>
  </>;
}

function Validation() {
  return <>
    <div className={s.reviewHeading}><div><small>Prime Components · INV-4821</small><strong>₹74,045<span>.00</span></strong></div><span className={s.badge}>Review checks</span></div>
    <div className={s.checks}>{[
      ['Required fields', 'Captured'], ['Tax totals', 'Matched'], ['Duplicate check', 'No match found'],
    ].map(([label, status]) => <div key={label}><span><Check size={13} /></span><strong>{label}</strong><small>{status}</small></div>)}</div>
    <div className={`${s.note} ${s.accentNote}`}><ShieldCheck size={17} /><div><strong>Your team makes the final decision.</strong><p>Review exceptions and confirm before posting.</p></div></div>
  </>;
}

function Accounting() {
  return <>
    <div className={s.mappingHeader}><span><FileCheck2 size={15} />Reviewed invoice</span><ArrowRight size={14} /><span><Building2 size={15} />TallyPrime</span></div>
    <dl className={s.ledger}>
      <div><dt>Supplier ledger</dt><dd>Prime Components</dd></div>
      <div><dt>Purchase ledger</dt><dd>Components purchase</dd></div>
      <div><dt>Tax ledger</dt><dd>Input IGST · 18%</dd></div>
    </dl>
    <div className={s.posted}><span><CheckCheck size={23} /></span><div><strong>Purchase voucher created</strong><p>PUR-829 · Source invoice linked</p></div><Check size={16} /></div>
    <div className={s.note}><Layers size={14} /><span>Keep the document and accounting entry connected.</span></div>
  </>;
}

function Reporting() {
  return <>
    <div className={s.metrics}><div><small>Invoice value</small><strong>₹12.8L</strong><span>48 invoices this month</span></div><div><small>Awaiting review</small><strong>06</strong><span>In your team's queue</span></div></div>
    <div className={s.chart}><div><strong>Weekly invoice value</strong><span>This month</span></div><div className={s.bars} role="img" aria-label="Illustrative invoice values: week one 2.1 lakh, week two 3.2 lakh, week three 2.8 lakh, week four 4.7 lakh rupees.">{[45, 68, 60, 100].map((height, index) => <div key={index}><div style={{ height: `${height}%` }}><span>{['₹2.1L', '₹3.2L', '₹2.8L', '₹4.7L'][index]}</span></div><small>W{index + 1}</small></div>)}</div></div>
    <div className={s.note}><FileText size={14} /><span>Follow each summary back to the underlying documents.</span></div>
  </>;
}

const views = [Documents, Validation, Accounting, Reporting];

export function FinanceWorkflow() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % steps.length;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index + steps.length - 1) % steps.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = steps.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return <section id="finance-workflow" className={`${base.section} ${s.section}`} aria-labelledby="finance-workflow-title">
    <div className="site-shell">
      <div className={s.heading}>
        <p className={`${base.eyebrow} ${s.eyebrow}`}>THE FINANCE WORKFLOW</p>
        <h2 id="finance-workflow-title">Capture. Validate.<br /><span>Understand. Act.</span></h2>
        <p className={s.intro}>Follow an invoice from its first capture to a clearer financial view. Every step keeps the information, the checks and your team connected.</p>
      </div>
      <div className={s.layout}>
        <div className={s.tabs} role="tablist" aria-label="Finance workflow stages" aria-orientation="vertical">
          {steps.map(({ name, description }, index) => <button type="button" role="tab" key={name} className={s.tab} id={`workflow-tab-${index}`} aria-controls={`workflow-panel-${index}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} ref={node => { tabs.current[index] = node; }} onClick={() => setActive(index)} onKeyDown={event => navigate(event, index)}>
            <span className={s.number}>{index + 1}</span><span className={s.tabText}><strong>{name}</strong><span>{description}</span></span><ChevronRight className={s.tabArrow} size={15} aria-hidden="true" />
          </button>)}
        </div>
        <div className={s.preview}>
          <div className={s.glow} aria-hidden="true" />
          <div className={s.window}>
            <div className={s.windowBar}><span className={s.dots} aria-hidden="true"><i /><i /><i /></span><span>Finance Desk <span className={s.slash}>/</span> Workflow</span><span className={s.windowStatus}><i />Product preview</span></div>
            <div className={s.windowBody}>
              <div className={s.sidebar} aria-hidden="true"><span className={s.sidebarLabel}>WORKSPACE</span>{steps.map(({ name, icon: Icon }, index) => <div key={name} data-active={index === active}><Icon size={14} /><span>{name}</span></div>)}<div className={s.sidebarBottom}><ShieldCheck size={13} /><span>Your team in control</span></div></div>
              <div className={s.panelArea}>{views.map((View, index) => <div role="tabpanel" key={index} id={`workflow-panel-${index}`} aria-labelledby={`workflow-tab-${index}`} hidden={active !== index} tabIndex={0} className={s.panel}>{active === index && <div className={s.panelContent}><div className={s.panelHeading}><h3>{steps[index].heading}</h3><span>{steps[index].label}</span></div><View /></div>}</div>)}</div>
            </div>
          </div>
          <p className={s.caption}><span>Illustrative product view · Sample data</span><span>0{active + 1} / 04</span></p>
        </div>
      </div>
    </div>
  </section>;
}
