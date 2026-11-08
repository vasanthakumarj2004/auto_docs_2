'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import {
  AlertCircle,
  Check,
  CheckCheck,
  ChevronRight,
  Copy,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  Layers,
  Mail,
  Receipt,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import base from '../LandingPage.module.css';
import s from './InvoiceBusinessChallenge.module.css';

const challenges = [
  {
    name: 'Manual Retyping',
    title: 'Stop typing invoice data by hand.',
    description: 'Accounts teams spend hours keying vendor names, invoice numbers, dates, and line items into accounting software.',
    icon: FileSpreadsheet,
  },
  {
    name: 'Layout Formats',
    title: 'Invoices arrive in every structure.',
    description: 'Scanned paper, digital PDFs, spreadsheets, and emails all have different structures and field placements.',
    icon: Layers,
  },
  {
    name: 'GST & HSN Checks',
    title: 'Complex tax splits and HSN validation.',
    description: 'Verifying tax splits, CGST, SGST, IGST calculations and HSN codes across complex multi-item invoices drains hours.',
    icon: ShieldCheck,
  },
  {
    name: 'Duplicate Detection',
    title: 'Catch repeated bills and batch risks.',
    description: 'Processing batches of invoices without duplicate detection risks double-payments and costly ledger corrections.',
    icon: Copy,
  },
];

function RetypingPreview() {
  return (
    <>
      <div className={`${s.floatingFile} ${s.fileOne}`}>
        <FileText size={14} />INV-4821.pdf
      </div>
      <div className={`${s.floatingFile} ${s.fileTwo}`}>
        <Receipt size={14} />Zero manual typing
      </div>
      <div className={s.window}>
        <div className={s.windowHeader}>
          <span><FileSpreadsheet size={16} />Invoice data extraction</span>
          <span className={s.pill}>Automated intake</span>
        </div>
        <div className={s.documentList}>
          {[
            { vendor: 'Prime Components', inv: 'INV-4821', type: 'PDF invoice · Line items parsed' },
            { vendor: 'Metro Supplies', inv: 'INV-1068', type: 'Email invoice · Ledger mapped' },
            { vendor: 'Apex Services', inv: 'INV-0294', type: 'Scanned bill · Fields extracted' },
          ].map(({ vendor, inv, type }, i) => (
            <div className={s.documentRow} key={inv} style={{ animationDelay: `${i * 100}ms` }}>
              <span className={s.documentIcon}><FileText size={20} /></span>
              <div>
                <strong>{vendor}</strong>
                <small>{inv} · {type}</small>
              </div>
              <Check size={15} />
            </div>
          ))}
        </div>
        <div className={s.extraction}>
          <div>
            <Sparkles size={15} />
            <strong>Invoice details captured</strong>
            <span>Complete</span>
          </div>
          <div className={s.progress}><span /></div>
          <p>Supplier name · Invoice date · Line items · HSN · Total amount</p>
        </div>
        <div className={s.windowFooter}>
          <FileCheck2 size={14} />
          Direct extraction into accounting ledgers
          <ChevronRight size={14} />
        </div>
      </div>
      <div className={s.result}>
        <CheckCheck size={15} />
        Direct extraction into accounting ledgers with zero manual re-entry.
      </div>
    </>
  );
}

function LayoutsPreview() {
  return (
    <>
      <div className={`${s.floatingFile} ${s.fileOne}`}>
        <FileText size={14} />Scanned PDF
      </div>
      <div className={`${s.floatingFile} ${s.fileTwo}`}>
        <Mail size={14} />Vendor email
      </div>
      <div className={s.window}>
        <div className={s.windowHeader}>
          <span><Layers size={16} />Multi-layout normalization</span>
          <span className={s.pill}>50+ formats</span>
        </div>
        <div className={s.documentList}>
          {[
            { label: 'Digital Tax Invoice', format: 'Standard 2-column table · 100% matched', tag: 'Ready' },
            { label: 'Scanned Hardcopy Bill', format: 'OCR text recognition & skew corrected', tag: 'Parsed' },
            { label: 'Vendor Email Attachment', format: 'PDF + email metadata combined', tag: 'Ready' },
          ].map(({ label, format, tag }, i) => (
            <div className={s.documentRow} key={label} style={{ animationDelay: `${i * 100}ms` }}>
              <span className={s.documentIcon}><FileText size={20} /></span>
              <div>
                <strong>{label}</strong>
                <small>{format}</small>
              </div>
              <span className={s.pill}>{tag}</span>
            </div>
          ))}
        </div>
        <div className={s.extraction}>
          <div>
            <Sparkles size={15} />
            <strong>Universal layout parsing</strong>
            <span>Standardized</span>
          </div>
          <div className={s.progress}><span /></div>
          <p>Converts diverse vendor templates into uniform accounting records</p>
        </div>
        <div className={s.windowFooter}>
          <FileCheck2 size={14} />
          Works across all vendor invoice templates
          <ChevronRight size={14} />
        </div>
      </div>
      <div className={s.result}>
        <ShieldCheck size={15} />
        Consistent structured data regardless of source document layout.
      </div>
    </>
  );
}

function TaxChecksPreview() {
  return (
    <>
      <div className={`${s.floatingFile} ${s.fileOne}`}>
        <Check size={14} />HSN: 8482.10
      </div>
      <div className={`${s.floatingFile} ${s.fileTwo}`}>
        <ShieldCheck size={14} />18% IGST checked
      </div>
      <div className={s.window}>
        <div className={s.windowHeader}>
          <span><ShieldCheck size={16} />Tax & compliance verification</span>
          <span className={s.pill}>Automated audit</span>
        </div>
        <div className={s.invoiceSummary}>
          <div>
            <small>Prime Components Pvt Ltd · INV-4821</small>
            <strong>₹74,045<span>.00</span></strong>
          </div>
          <span className={s.documentIcon}><Receipt size={26} /></span>
        </div>
        <div className={s.checkRows}>
          {[
            ['GSTIN format & status', 'Active & verified'],
            ['HSN code 8482.10 rate', '18% rate confirmed'],
            ['IGST calculation ₹11,295', 'Reconciled to line items'],
          ].map(([label, status], i) => (
            <div key={label} style={{ animationDelay: `${i * 120}ms` }}>
              <Check size={15} />
              <span>{label}</span>
              <strong>{status}</strong>
            </div>
          ))}
        </div>
        <div className={s.reviewNote}>
          <span className={s.reviewDot} />
          <div>
            <strong>Tax compliance guaranteed</strong>
            <p>Calculations verified before posting to TallyPrime.</p>
          </div>
          <ChevronRight size={15} />
        </div>
      </div>
      <div className={s.result}>
        <CheckCheck size={15} />
        Automated 3-way tax calculations with instant exception flags.
      </div>
    </>
  );
}

function DuplicatesPreview() {
  return (
    <>
      <div className={`${s.floatingFile} ${s.fileOne}`}>
        <Copy size={14} />Batch: 18 invoices
      </div>
      <div className={`${s.floatingFile} ${s.fileTwo}`}>
        <ShieldAlert size={14} />Duplicate held
      </div>
      <div className={s.window}>
        <div className={s.windowHeader}>
          <span><Copy size={16} />Batch audit & duplicate control</span>
          <span className={s.pill}>Protected</span>
        </div>
        <div className={s.documentList}>
          {[
            { inv: 'INV-4821', vendor: 'Prime Components', status: 'Unique · Verified' },
            { inv: 'INV-1068', vendor: 'Metro Supplies', status: 'Duplicate held · Flagged' },
            { inv: 'INV-0294', vendor: 'Apex Services', status: 'Unique · Verified' },
          ].map(({ inv, vendor, status }, i) => (
            <div className={s.documentRow} key={inv} style={{ animationDelay: `${i * 100}ms` }}>
              <span className={s.documentIcon}>
                {status.includes('Duplicate') ? <AlertCircle size={20} color="#f59e0b" /> : <FileText size={20} />}
              </span>
              <div>
                <strong>{vendor} · {inv}</strong>
                <small>{status}</small>
              </div>
              {status.includes('Duplicate') ? (
                <span className={s.pill} style={{ color: '#d97706', borderColor: '#fcd34d' }}>Held</span>
              ) : (
                <Check size={15} />
              )}
            </div>
          ))}
        </div>
        <div className={s.reviewNote}>
          <span className={s.reviewDot} style={{ background: '#f59e0b' }} />
          <div>
            <strong>Duplicate invoice held for review</strong>
            <p>Prevents double payment before voucher is created.</p>
          </div>
          <ChevronRight size={15} />
        </div>
      </div>
      <div className={s.result}>
        <Sparkles size={15} />
        Batch processing with continuous duplicate detection and reviewer controls.
      </div>
    </>
  );
}

const previews = [RetypingPreview, LayoutsPreview, TaxChecksPreview, DuplicatesPreview];

export function InvoiceBusinessChallenge() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % challenges.length;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index + challenges.length - 1) % challenges.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = challenges.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section
      className={`${base.section} ${base.alternate} ${s.section}`}
      aria-labelledby="invoice-challenge-title"
      id="business-challenge-workspace"
    >
      <div className="site-shell">
        <div className={s.heading}>
          <p className={`${base.eyebrow} ${s.eyebrow}`}>THE BUSINESS CHALLENGE</p>
          <h2 id="invoice-challenge-title">
            Invoice processing shouldn’t<br />slow down your finance team.
          </h2>
          <p className={s.intro}>
            Manual re-entry, mismatched layouts, and scattered checks drain hours from finance teams.
            See how each operational bottleneck transforms into automated workflow clarity.
          </p>
        </div>
        <div className={s.workspace}>
          <div className={s.steps} role="tablist" aria-label="Explore the business challenges" aria-orientation="vertical">
            {challenges.map(({ name, title, description, icon: Icon }, index) => (
              <button
                key={name}
                type="button"
                role="tab"
                id={`challenge-step-${index}`}
                aria-controls={`challenge-preview-${index}`}
                aria-selected={active === index}
                tabIndex={active === index ? 0 : -1}
                ref={(element) => {
                  tabs.current[index] = element;
                }}
                onClick={() => setActive(index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={s.step}
              >
                <span className={s.stepNumber}>0{index + 1}</span>
                <span className={s.stepCopy}>
                  <span className={s.stepLabel}>
                    <Icon size={15} />
                    {name}
                  </span>
                  <strong>{title}</strong>
                  <span className={s.description}>{description}</span>
                </span>
                <ChevronRight className={s.stepArrow} size={16} />
              </button>
            ))}
          </div>
          <div className={s.stage}>
            <div className={s.glow} aria-hidden="true" />
            {previews.map((Preview, index) => (
              <div
                key={index}
                role="tabpanel"
                id={`challenge-preview-${index}`}
                aria-labelledby={`challenge-step-${index}`}
                hidden={active !== index}
                tabIndex={0}
                className={s.preview}
              >
                {active === index && <Preview />}
              </div>
            ))}
            <p className={s.caption}>
              ILLUSTRATIVE PRODUCT VIEW <span>0{active + 1} / 04</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
