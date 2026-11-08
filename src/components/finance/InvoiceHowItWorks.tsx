'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import {
  ArrowRight,
  Building2,
  Check,
  CheckCheck,
  ChevronRight,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  Inbox,
  Layers,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import base from '../LandingPage.module.css';
import s from './InvoiceHowItWorks.module.css';

const steps = [
  {
    name: 'Upload',
    description: 'Upload or submit supplier invoice documents via PDF, email, or bulk scanner.',
    icon: Inbox,
    heading: 'Multi-channel invoice intake',
    label: '3 documents in queue',
  },
  {
    name: 'Extract',
    description: 'AI identifies header fields, vendor details, line items, and tax calculations in seconds.',
    icon: FileSpreadsheet,
    heading: 'Automated data & line-item capture',
    label: 'INV-4821 extracted',
  },
  {
    name: 'Review',
    description: 'Your team reviews extracted data, validates checks, and resolves exceptions with full context.',
    icon: ShieldCheck,
    heading: 'Human-in-the-loop validation',
    label: 'Validation checks',
  },
  {
    name: 'Post',
    description: 'Approved information moves into TallyPrime or ERP, creating vouchers with source documents linked.',
    icon: Building2,
    heading: 'Direct posting to TallyPrime',
    label: 'Voucher synced',
  },
];

function UploadView() {
  return (
    <>
      <div className={s.summary}>
        <span className={s.summaryIcon}><Inbox size={22} /></span>
        <div>
          <strong>Unified intake for all supplier invoices</strong>
          <p>Drag & drop PDFs, scans, email attachments, and batch uploads</p>
        </div>
      </div>
      <div className={s.invoiceList}>
        {[
          ['Prime Components', 'INV-4821 · PDF invoice', '₹74,045'],
          ['Metro Supplies', 'INV-1068 · Email attachment', '₹32,450'],
          ['Apex Services', 'INV-0294 · Scanned document', '₹18,500'],
        ].map(([name, reference, amount]) => (
          <div key={name}>
            <FileText size={17} />
            <div>
              <strong>{name}</strong>
              <small>{reference}</small>
            </div>
            <span>
              {amount}
              <small><Check size={10} />Uploaded</small>
            </span>
          </div>
        ))}
      </div>
      <div className={s.note}>
        <FileCheck2 size={14} />
        <span>Automatic document classification and queueing ready for extraction.</span>
      </div>
    </>
  );
}

function ExtractView() {
  return (
    <>
      <div className={s.reviewHeading}>
        <div>
          <small>Prime Components Pvt Ltd · INV-4821</small>
          <strong>₹74,045<span>.00</span></strong>
        </div>
        <span className={s.badge}>
          <Sparkles size={11} style={{ marginRight: '4px', verticalAlign: 'middle', display: 'inline' }} />
          AI Extracted
        </span>
      </div>
      <table className={s.extractTable} aria-label="Extracted line items">
        <thead>
          <tr>
            <th>ITEM DESCRIPTION</th>
            <th>QTY</th>
            <th>HSN</th>
            <th>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {[
            { desc: 'Precision bearings', qty: '100', hsn: '8482.10', amt: '₹32,500' },
            { desc: 'Motor assemblies', qty: '50', hsn: '8501.20', amt: '₹21,000' },
            { desc: 'Control switches', qty: '25', hsn: '8536.50', amt: '₹9,250' },
          ].map((item) => (
            <tr key={item.desc}>
              <td>{item.desc}</td>
              <td>{item.qty}</td>
              <td><span className={s.confidencePill}>{item.hsn}</span></td>
              <td>{item.amt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={s.note}>
        <Sparkles size={14} />
        <span>Taxable: ₹62,750 · IGST 18%: ₹11,295 · Line totals reconciled automatically.</span>
      </div>
    </>
  );
}

function ReviewView() {
  return (
    <>
      <div className={s.reviewHeading}>
        <div>
          <small>INV-4821 · Prime Components</small>
          <strong>₹74,045<span>.00</span></strong>
        </div>
        <span className={s.badge}>Reviewer console</span>
      </div>
      <div className={s.checks}>
        {[
          ['Required fields verified', 'Captured'],
          ['GSTIN & HSN rates', '18% IGST matched'],
          ['Duplicate check', 'No duplicate found'],
          ['Total calculation audit', 'Reconciled'],
        ].map(([label, status]) => (
          <div key={label}>
            <span><Check size={13} /></span>
            <strong>{label}</strong>
            <small>{status}</small>
          </div>
        ))}
      </div>
      <div className={`${s.note} ${s.accentNote}`}>
        <ShieldCheck size={17} />
        <div>
          <strong>Your team maintains final control.</strong>
          <p>Review confidence indicators, verify ledger mapping, and approve.</p>
        </div>
      </div>
    </>
  );
}

function PostView() {
  return (
    <>
      <div className={s.mappingHeader}>
        <span><FileCheck2 size={15} />Approved Invoice</span>
        <ArrowRight size={14} />
        <span><Building2 size={15} />TallyPrime</span>
      </div>
      <dl className={s.ledger}>
        <div><dt>Supplier ledger</dt><dd>Prime Components Pvt Ltd</dd></div>
        <div><dt>Purchase account</dt><dd>Components Purchase A/c</dd></div>
        <div><dt>Tax ledger</dt><dd>Input IGST @ 18%</dd></div>
      </dl>
      <div className={s.posted}>
        <span><CheckCheck size={23} /></span>
        <div>
          <strong>Purchase voucher created in TallyPrime</strong>
          <p>PUR-829 · Source invoice PDF permanently linked</p>
        </div>
        <Check size={16} />
      </div>
      <div className={s.note}>
        <Layers size={14} />
        <span>Zero manual retyping. Full audit trail preserved in your accounts.</span>
      </div>
    </>
  );
}

const views = [UploadView, ExtractView, ReviewView, PostView];

export function InvoiceHowItWorks() {
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

  return (
    <section id="how-it-works" className={`${base.section} ${s.section}`} aria-labelledby="invoice-workflow-title">
      <div className="site-shell">
        <div className={s.heading}>
          <p className={`${base.eyebrow} ${s.eyebrow}`}>HOW IT WORKS</p>
          <h2 id="invoice-workflow-title">
            Upload. Extract.<br />
            <span>Review. Post.</span>
          </h2>
          <p className={s.intro}>
            Follow a supplier invoice from initial intake to final TallyPrime voucher creation.
            Every step keeps the data, the verification rules, and your finance team connected.
          </p>
        </div>
        <div className={s.layout}>
          <div className={s.tabs} role="tablist" aria-label="Invoice automation workflow steps" aria-orientation="vertical">
            {steps.map(({ name, description }, index) => (
              <button
                type="button"
                role="tab"
                key={name}
                className={s.tab}
                id={`invoice-tab-${index}`}
                aria-controls={`invoice-panel-${index}`}
                aria-selected={active === index}
                tabIndex={active === index ? 0 : -1}
                ref={(node) => {
                  tabs.current[index] = node;
                }}
                onClick={() => setActive(index)}
                onKeyDown={(event) => navigate(event, index)}
              >
                <span className={s.number}>{index + 1}</span>
                <span className={s.tabText}>
                  <strong>{name}</strong>
                  <span>{description}</span>
                </span>
                <ChevronRight className={s.tabArrow} size={15} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className={s.preview}>
            <div className={s.glow} aria-hidden="true" />
            <div className={s.window}>
              <div className={s.windowBar}>
                <span className={s.dots} aria-hidden="true">
                  <i /><i /><i />
                </span>
                <span>
                  Finance Desk <span className={s.slash}>/</span> Invoice Automation
                </span>
                <span className={s.windowStatus}>
                  <i />Product preview
                </span>
              </div>
              <div className={s.windowBody}>
                <div className={s.sidebar} aria-hidden="true">
                  <span className={s.sidebarLabel}>WORKFLOW</span>
                  {steps.map(({ name, icon: Icon }, index) => (
                    <div key={name} data-active={index === active}>
                      <Icon size={14} />
                      <span>{name}</span>
                    </div>
                  ))}
                  <div className={s.sidebarBottom}>
                    <ShieldCheck size={13} />
                    <span>Your team in control</span>
                  </div>
                </div>
                <div className={s.panelArea}>
                  {views.map((View, index) => (
                    <div
                      role="tabpanel"
                      key={index}
                      id={`invoice-panel-${index}`}
                      aria-labelledby={`invoice-tab-${index}`}
                      hidden={active !== index}
                      tabIndex={0}
                      className={s.panel}
                    >
                      {active === index && (
                        <div className={s.panelContent}>
                          <div className={s.panelHeading}>
                            <h3>{steps[index].heading}</h3>
                            <span>{steps[index].label}</span>
                          </div>
                          <View />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className={s.caption}>
              <span>Illustrative product view · Sample invoice data</span>
              <span>0{active + 1} / 04</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
