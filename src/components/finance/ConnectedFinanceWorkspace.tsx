'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import base from '../LandingPage.module.css';
import s from './ConnectedFinanceWorkspace.module.css';

interface FinanceStep {
  step: number;
  title: string;
  description: string;
}

const steps: FinanceStep[] = [
  {
    step: 1,
    title: 'Read the invoice',
    description:
      'PDFs, scans and email attachments in one inbox. Supplier, GSTIN, HSN, line items, tax and total picked up without retyping.',
  },
  {
    step: 2,
    title: 'Check it',
    description:
      'Tax totals checked against line items, and possible duplicates flagged. Your team reviews anything that looks off.',
  },
  {
    step: 3,
    title: 'Approve into TallyPrime',
    description:
      'Once approved, the entry goes to the right ledgers in your TallyPrime company.',
  },
  {
    step: 4,
    title: 'See the numbers',
    description:
      'Spend, supplier balances and tax summaries, with every figure one click from the invoice it came from.',
  },
];

/* ── Preview 1: Read the invoice ── */
function ReadInvoicePreview() {
  return (
    <div className={s.window}>
      <div className={s.windowHeader}>
        <span className={s.windowHeaderTitle}>Invoice inbox</span>
        <span className={s.headerBadge}>3 NEW TODAY</span>
      </div>

      <div className={s.itemList}>
        <div className={s.itemCard}>
          <div className={s.itemMain}>
            <strong className={s.itemTitle}>Prime Components</strong>
            <span className={s.itemMeta}>INV-4821 · PDF · ₹74,045</span>
          </div>
          <span className={s.statusBadge}>READY TO APPROVE</span>
        </div>

        <div className={s.itemCard}>
          <div className={s.itemMain}>
            <strong className={s.itemTitle}>Metro Supplies</strong>
            <span className={s.itemMeta}>INV-1068 · Email · ₹32,450</span>
          </div>
          <span className={s.statusBadge}>POSSIBLE DUPLICATE</span>
        </div>

        <div className={s.itemCard}>
          <div className={s.itemMain}>
            <strong className={s.itemTitle}>Apex Services</strong>
            <span className={s.itemMeta}>INV-0294 · Scan · ₹17,970</span>
          </div>
          <span className={s.statusBadge}>GST DOESN&apos;T MATCH</span>
        </div>
      </div>

      <div className={s.windowFooter}>
        <span>Less retyping. More time for review.</span>
      </div>
    </div>
  );
}

/* ── Preview 2: Check it ── */
function CheckItPreview() {
  return (
    <div className={s.window}>
      <div className={s.windowHeader}>
        <span className={s.windowHeaderTitle}>Checks · 2 to review</span>
        <span className={s.headerBadge}>WAITING FOR YOU</span>
      </div>

      <div className={s.itemList}>
        <div className={s.itemCard}>
          <div className={s.itemMain}>
            <strong className={s.itemTitle}>Metro Supplies · INV-1068</strong>
            <p className={s.itemDesc}>
              Same supplier, amount and date as INV-1061, entered 3 Nov
            </p>
          </div>
          <span className={s.statusBadge}>POSSIBLE DUPLICATE</span>
        </div>

        <div className={s.itemCard}>
          <div className={s.itemMain}>
            <strong className={s.itemTitle}>Apex Services · INV-0294</strong>
            <p className={s.itemDesc}>
              Lines on ₹15,000 at 18% give ₹2,700 GST. Invoice says ₹2,970
            </p>
          </div>
          <span className={s.statusBadge}>TAX MISMATCH</span>
        </div>
      </div>

      <div className={s.windowFooter}>
        <span>
          Caught before it reaches your books. Your team decides what to do with each one.
        </span>
      </div>
    </div>
  );
}

/* ── Preview 3: Approve into TallyPrime ── */
function ApproveTallyPreview() {
  return (
    <div className={s.window}>
      <div className={s.windowHeader}>
        <span className={s.windowHeaderTitle}>Post to TallyPrime · INV-4821</span>
        <span className={s.headerBadge}>APPROVED</span>
      </div>

      <div className={s.tableWrap}>
        <table className={s.ledgerTable}>
          <thead>
            <tr>
              <th className={s.thLedger}>LEDGER</th>
              <th className={s.thDrCr}>DR / CR</th>
              <th className={s.thAmount}>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={s.tdLedger}>Purchase @ 18%</td>
              <td className={s.tdDrCr}>Dr</td>
              <td className={s.tdAmount}>₹62,750</td>
            </tr>
            <tr>
              <td className={s.tdLedger}>Input CGST 9%</td>
              <td className={s.tdDrCr}>Dr</td>
              <td className={s.tdAmount}>₹5,647.50</td>
            </tr>
            <tr>
              <td className={s.tdLedger}>Input SGST 9%</td>
              <td className={s.tdDrCr}>Dr</td>
              <td className={s.tdAmount}>₹5,647.50</td>
            </tr>
            <tr>
              <td className={s.tdLedger}>Prime Components</td>
              <td className={s.tdDrCr}>Cr</td>
              <td className={s.tdAmount}>₹74,045</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={s.windowFooter}>
        <span>Posted to your TallyPrime company after approval, with the right ledgers.</span>
      </div>
    </div>
  );
}

/* ── Preview 4: See the numbers ── */
function SeeNumbersPreview() {
  return (
    <div className={s.window}>
      <div className={s.windowHeader}>
        <span className={s.windowHeaderTitle}>Spend by supplier · November</span>
        <span className={s.headerBadge}>FROM TALLY</span>
      </div>

      <div className={s.itemList}>
        <div className={s.itemCard}>
          <div className={s.itemMain}>
            <strong className={s.itemTitle}>Prime Components</strong>
            <span className={s.itemMeta}>14 invoices · click to see each one</span>
          </div>
          <span className={s.supplierAmount}>₹6.8 L</span>
        </div>

        <div className={s.itemCard}>
          <div className={s.itemMain}>
            <strong className={s.itemTitle}>Metro Supplies</strong>
            <span className={s.itemMeta}>9 invoices</span>
          </div>
          <span className={s.supplierAmount}>₹3.2 L</span>
        </div>

        <div className={s.itemCard}>
          <div className={s.itemMain}>
            <strong className={s.itemTitle}>Apex Services</strong>
            <span className={s.itemMeta}>6 invoices</span>
          </div>
          <span className={s.supplierAmount}>₹1.1 L</span>
        </div>
      </div>

      <div className={s.windowFooter}>
        <span>Every number traces back to the invoice it came from.</span>
      </div>
    </div>
  );
}

const previews = [
  ReadInvoicePreview,
  CheckItPreview,
  ApproveTallyPreview,
  SeeNumbersPreview,
];

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

  return (
    <section
      className={`${base.section} ${base.alternate} ${s.section}`}
      aria-labelledby="connected-finance-title"
      id="connected-finance-workspace"
    >
      <div className="site-shell">
        <div className={s.heading}>
          <p className={`${base.eyebrow} ${s.eyebrow}`}>How it works</p>
          <h2 id="connected-finance-title">
            From supplier invoice<br /><span>to TallyPrime, in four steps.</span>
          </h2>
          <p className={s.intro}>
            Your team checks and approves at every step that touches your books.
          </p>
        </div>

        <div className={s.workspace}>
          {/* Left Column: 4 Step Tabs */}
          <div
            className={s.steps}
            role="tablist"
            aria-label="Explore the finance workflow"
            aria-orientation="vertical"
          >
            {steps.map(({ step, title, description }, index) => {
              const isSelected = active === index;
              return (
                <button
                  key={step}
                  type="button"
                  role="tab"
                  id={`finance-step-${index}`}
                  aria-controls={`finance-preview-${index}`}
                  aria-selected={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  ref={(element) => {
                    tabs.current[index] = element;
                  }}
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  className={`${s.step} ${isSelected ? s.stepActive : ''}`}
                >
                  <span className={s.stepNumberBadge}>{step}</span>
                  <div className={s.stepCopy}>
                    <strong className={s.stepTitle}>{title}</strong>
                    <span className={s.description}>{description}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Interactive Window Preview */}
          <div className={s.stage}>
            <div className={s.ambientGlow} aria-hidden="true" />
            {previews.map((Preview, index) => (
              <div
                key={index}
                role="tabpanel"
                id={`finance-preview-${index}`}
                aria-labelledby={`finance-step-${index}`}
                hidden={active !== index}
                tabIndex={0}
                className={s.preview}
              >
                {active === index && <Preview />}
              </div>
            ))}
            <div className={s.microCaption}>
              SAMPLE DATA · EXAMPLE PRODUCT VIEW
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
