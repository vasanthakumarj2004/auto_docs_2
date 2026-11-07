'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import {
  ArrowRight,
  Building2,
  Check,
  CheckCheck,
  ChevronRight,
  CreditCard,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  Inbox,
  Layers,
  Receipt,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import base from '../LandingPage.module.css';
import s from './BankingWorkflowOverview.module.css';

const steps = [
  {
    name: 'Provide',
    description: 'Upload or submit bank statements across supported PDF, Excel, and scan formats.',
    icon: Inbox,
    heading: 'Multi-bank statement ingestion',
    label: '3 statements queued',
  },
  {
    name: 'Structure',
    description: 'AI standardizes dates, narrations, reference IDs, and debit/credit transaction details.',
    icon: FileSpreadsheet,
    heading: 'Standardized transaction extraction',
    label: '142 rows extracted',
  },
  {
    name: 'Compare',
    description: 'Rules-based reconciliation matches statement lines against accounting ledger vouchers in real time.',
    icon: ShieldCheck,
    heading: 'Automated ledger reconciliation',
    label: '99.4% Matched',
  },
  {
    name: 'Post',
    description: 'Approved and reconciled entries post directly into TallyPrime, creating bank vouchers with audit trail.',
    icon: Building2,
    heading: 'Direct posting to TallyPrime',
    label: 'Vouchers synced',
  },
];

function ProvideView() {
  return (
    <div className={s.panelContent}>
      <div className={s.summary}>
        <span className={s.summaryIcon}><Inbox size={22} /></span>
        <div>
          <strong>Multi-bank statement intake</strong>
          <p>Drag & drop PDFs, Excel spreadsheets, or scanned statements</p>
        </div>
      </div>
      <div className={s.statementList}>
        {[
          ['HDFC Bank · Current A/c 5020...', 'Oct 2024 · PDF statement', '₹14,52,200', 'Uploaded'],
          ['ICICI Bank · Corporate A/c 0019...', 'Oct 2024 · Excel / CSV', '₹8,24,450', 'Uploaded'],
          ['State Bank of India · CA 3381...', 'Oct 2024 · Scanned statement', '₹2,81,800', 'Uploaded'],
        ].map(([name, detail, amount, status]) => (
          <div key={name}>
            <FileText size={17} />
            <div>
              <strong>{name}</strong>
              <small>{detail}</small>
            </div>
            <span>
              {amount}
              <small><Check size={10} />{status}</small>
            </span>
          </div>
        ))}
      </div>
      <div className={s.note}>
        <FileCheck2 size={14} />
        <span>Multi-bank statement formats parsed into consistent transaction records.</span>
      </div>
    </div>
  );
}

function StructureView() {
  return (
    <div className={s.panelContent}>
      <div className={s.summary}>
        <span className={s.summaryIcon}><Sparkles size={22} /></span>
        <div>
          <strong>Standardized transaction extraction</strong>
          <p>Dates, reference IDs, clean narrations, and debit/credit amounts</p>
        </div>
      </div>
      <table className={s.extractTable}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Narration / Reference</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>03 Oct</td>
            <td>NEFT / Apex Enterprises / INV-9281</td>
            <td><span className={s.confidencePill}>Credit</span></td>
            <td>+₹1,45,200</td>
          </tr>
          <tr>
            <td>05 Oct</td>
            <td>RTGS / Metro Supplies / CHQ-482</td>
            <td><span className={s.confidencePill}>Debit</span></td>
            <td>-₹82,450</td>
          </tr>
          <tr>
            <td>08 Oct</td>
            <td>UPI / POS Daily Settlement 9842</td>
            <td><span className={s.confidencePill}>Credit</span></td>
            <td>+₹12,800</td>
          </tr>
          <tr>
            <td>11 Oct</td>
            <td>Bank AMC & Ledger Service Charges</td>
            <td><span className={s.confidencePill}>Debit</span></td>
            <td>-₹1,180</td>
          </tr>
        </tbody>
      </table>
      <div className={s.note}>
        <Layers size={14} />
        <span>Clean narrations ready for automatic ledger matching and reconciliation.</span>
      </div>
    </div>
  );
}

function CompareView() {
  return (
    <div className={s.panelContent}>
      <div className={s.reviewHeading}>
        <div>
          <small>Reconciliation Match Engine · 142 items</small>
          <strong>₹25,58,450<span>.00</span></strong>
        </div>
        <span className={s.badge}>99.4% Match</span>
      </div>
      <div className={s.checks}>
        {[
          ['NEFT Cr ₹1,45,200', 'Apex Ent. (Sales Ledger)', '100% Match'],
          ['RTGS Dr ₹82,450', 'Metro Supplies (Bill #482)', '100% Match'],
          ['UPI Cr ₹12,800', 'Daily POS Collections', '100% Match'],
          ['Debit ₹1,180', 'Bank Charges Ledger', 'Auto-assigned'],
        ].map(([item, match, status]) => (
          <div key={item}>
            <span><Check size={13} /></span>
            <div>
              <strong>{item}</strong>
              <small style={{ color: 'var(--landing-muted)', display: 'block', fontSize: '8px' }}>{match}</small>
            </div>
            <small>{status}</small>
          </div>
        ))}
      </div>
      <div className={`${s.note} ${s.accentNote}`}>
        <ShieldCheck size={17} />
        <div>
          <strong>Reconciliation review with full visibility.</strong>
          <p>Matched entries verified against bank statements; exceptions flagged for review.</p>
        </div>
      </div>
    </div>
  );
}

function PostView() {
  return (
    <div className={s.panelContent}>
      <div className={s.mappingHeader}>
        <span><FileCheck2 size={15} />Reconciled statement</span>
        <ArrowRight size={14} />
        <span><Building2 size={15} />TallyPrime</span>
      </div>
      <dl className={s.ledger}>
        <div>
          <dt>Bank ledger</dt>
          <dd>HDFC Bank Current A/c</dd>
        </div>
        <div>
          <dt>Company</dt>
          <dd>ABC Enterprises Pvt Ltd</dd>
        </div>
        <div>
          <dt>Period</dt>
          <dd>01 Oct 2024 – 31 Oct 2024</dd>
        </div>
        <div>
          <dt>Vouchers created</dt>
          <dd>142 Payment / Receipt / Contra</dd>
        </div>
      </dl>
      <div className={s.posted}>
        <span><CheckCheck size={23} /></span>
        <div>
          <strong>TallyPrime vouchers created</strong>
          <p>Bank ledgers reconciled · Source transaction IDs linked</p>
        </div>
        <Check size={16} />
      </div>
      <div className={s.note}>
        <RefreshCw size={14} />
        <span>Zero manual double-entry. Keep statements and accounting books fully synced.</span>
      </div>
    </div>
  );
}

const views = [ProvideView, StructureView, CompareView, PostView];

export function BankingWorkflowOverview() {
  const [activeStep, setActiveStep] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (index + 1) % steps.length;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (index - 1 + steps.length) % steps.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = steps.length - 1;
    }
    if (nextIndex !== null) {
      setActiveStep(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  const ActiveView = views[activeStep];

  return (
    <section id="workflow" className={`${base.section} ${s.section}`} aria-labelledby="banking-workflow-title">
      <div className="site-shell">
        <div className={s.heading}>
          <div className={s.eyebrow}>
            <span>WORKFLOW OVERVIEW</span>
          </div>
          <h2 id="banking-workflow-title">
            From bank statement to<br />
            <span>reconciled books.</span>
          </h2>
          <p className={s.intro}>
            Follow statement data from initial intake to automated matching, exception review, and final TallyPrime voucher creation. Every step keeps your records and finance team in control.
          </p>
        </div>

        <div className={s.layout}>
          <div className={s.tabs} role="tablist" aria-label="Banking reconciliation workflow steps" aria-orientation="vertical">
            {steps.map((step, index) => {
              const isSelected = activeStep === index;
              return (
                <button
                  key={step.name}
                  ref={(el) => { tabRefs.current[index] = el; }}
                  role="tab"
                  id={`banking-wf-tab-${index}`}
                  aria-selected={isSelected}
                  aria-controls={`banking-wf-panel-${index}`}
                  tabIndex={isSelected ? 0 : -1}
                  className={s.tab}
                  onClick={() => setActiveStep(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                >
                  <span className={s.number}>{index + 1}</span>
                  <div className={s.tabText}>
                    <strong>{step.name}</strong>
                    <span>{step.description}</span>
                  </div>
                  <ChevronRight size={18} className={s.tabArrow} aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <div className={s.preview}>
            <div className={s.glow} aria-hidden="true" />
            <div className={s.window}>
              <div className={s.windowBar}>
                <div className={s.dots}>
                  <i /><i /><i />
                </div>
                <span>Finance Desk <span className={s.slash}>/</span> Banking Reconciliation</span>
                <span className={s.windowStatus}><i />Product preview</span>
              </div>
              <div className={s.windowBody}>
                <div className={s.sidebar} aria-hidden="true">
                  <span className={s.sidebarLabel}>WORKFLOW</span>
                  {steps.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.name} data-active={activeStep === index}>
                        <Icon size={13} />
                        <span>{item.name}</span>
                      </div>
                    );
                  })}
                  <div className={`${s.sidebarBottom} ${s.note}`}>
                    <Check size={11} />
                    <span>Your team in control</span>
                  </div>
                </div>

                <div
                  id={`banking-wf-panel-${activeStep}`}
                  role="tabpanel"
                  aria-labelledby={`banking-wf-tab-${activeStep}`}
                  tabIndex={0}
                  className={s.panel}
                >
                  <div className={s.panelHeading}>
                    <h3>{steps[activeStep].heading}</h3>
                    <span>{steps[activeStep].label}</span>
                  </div>
                  <ActiveView />
                </div>
              </div>
            </div>
            <div className={s.caption}>
              <span>Illustrative product view · Bank statement & reconciliation</span>
              <span>0{activeStep + 1} / 04</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
