'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Building2,
  Check,
  CheckCheck,
  ChevronRight,
  CreditCard,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  Layers,
  Receipt,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import base from '../LandingPage.module.css';
import s from './BankingWhyItMatters.module.css';

const challenges = [
  {
    name: 'Multi-Bank Formats',
    title: 'Statements arrive in disconnected formats.',
    description: 'Every bank formats transaction narrations, dates, debits, credits, and balances differently, forcing teams into tedious manual cleanup.',
    icon: Layers,
  },
  {
    name: 'Manual Matching',
    title: 'Line-by-line manual reconciliation drains days.',
    description: 'Comparing thousands of monthly statement entries against accounting ledger vouchers line-by-line is slow, exhausting, and prone to human oversight.',
    icon: FileSpreadsheet,
  },
  {
    name: 'Unmatched Variances',
    title: 'Investigating unexplained transaction variances.',
    description: 'Unidentified bank charges, interest debits, and missing vendor vouchers stall reconciliation and delay monthly books closing.',
    icon: AlertCircle,
  },
  {
    name: 'TallyPrime Sync',
    title: 'Eliminate double entry into your books.',
    description: 'Approved bank transactions and reconciliation status post directly into TallyPrime, creating accurate vouchers with zero manual re-entry.',
    icon: RefreshCw,
  },
];

function BankFormatsPreview() {
  return (
    <>
      <div className={`${s.floatingFile} ${s.fileOne}`}>
        <FileText size={14} />HDFC-Stmt-Oct.pdf
      </div>
      <div className={`${s.floatingFile} ${s.fileTwo}`}>
        <Building2 size={14} />Multi-bank supported
      </div>
      <div className={s.window}>
        <div className={s.windowHeader}>
          <span><Layers size={15} />Bank statement ingestion</span>
          <span className={s.pill}>Automated parsing</span>
        </div>
        <div className={s.documentList}>
          <div className={s.documentRow} style={{ animationDelay: '100ms' }}>
            <div className={s.documentIcon}><Receipt size={17} /></div>
            <div>
              <strong>HDFC Bank · Current A/c 5020...</strong>
              <small>NEFT / AXIS / INV-9281 · Normalized narration</small>
            </div>
            <div className={s.amountBadge}>
              +₹1,45,200
              <span>Credit · Cleared</span>
            </div>
          </div>
          <div className={s.documentRow} style={{ animationDelay: '200ms' }}>
            <div className={s.documentIcon}><Building2 size={17} /></div>
            <div>
              <strong>ICICI Bank · Corporate A/c 0019...</strong>
              <small>RTGS / CHQ / METRO-SUPPLY · Vendor payout</small>
            </div>
            <div className={s.amountBadge}>
              -₹82,450
              <span>Debit · Cleared</span>
            </div>
          </div>
          <div className={s.documentRow} style={{ animationDelay: '300ms' }}>
            <div className={s.documentIcon}><CreditCard size={17} /></div>
            <div>
              <strong>State Bank of India · CA 3381...</strong>
              <small>UPI / 984210 / DIRECT-SETTLE · POS settlement</small>
            </div>
            <div className={s.amountBadge}>
              +₹12,800
              <span>Credit · Cleared</span>
            </div>
          </div>
        </div>
        <div className={s.extraction}>
          <div>
            <Sparkles size={13} />
            <strong>Multi-bank statement normalization</strong>
            <span>100% Parsed</span>
          </div>
          <div className={s.progress}><span /></div>
          <p>Transaction dates, clean narrations, reference IDs, and debit/credit balances extracted</p>
        </div>
        <div className={s.windowFooter}>
          <Check size={14} />
          <span>Multi-bank statement normalization complete</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </>
  );
}

function MatchingPreview() {
  return (
    <>
      <div className={`${s.floatingFile} ${s.fileOne}`}>
        <FileCheck2 size={14} />142 / 142 Matched
      </div>
      <div className={`${s.floatingFile} ${s.fileTwo}`}>
        <CheckCheck size={14} />99.4% Auto-matched
      </div>
      <div className={s.window}>
        <div className={s.invoiceSummary}>
          <div>
            <small>Reconciled Transaction Volume</small>
            <strong>₹12,48,650<span>.00</span></strong>
          </div>
          <span className={s.pill}>Auto-reconciled</span>
        </div>
        <div className={s.checkRows}>
          <div style={{ animationDelay: '100ms' }}>
            <CheckCheck size={15} />
            <span>NEFT Cr ₹1,45,200 <small style={{ display: 'inline', color: 'var(--landing-muted)' }}>matches</small> Apex Ent. (Sales)</span>
            <strong>100% Match</strong>
          </div>
          <div style={{ animationDelay: '200ms' }}>
            <CheckCheck size={15} />
            <span>RTGS Dr ₹82,450 <small style={{ display: 'inline', color: 'var(--landing-muted)' }}>matches</small> Metro Supplies (Bill #482)</span>
            <strong>100% Match</strong>
          </div>
          <div style={{ animationDelay: '300ms' }}>
            <CheckCheck size={15} />
            <span>IMPS Dr ₹24,800 <small style={{ display: 'inline', color: 'var(--landing-muted)' }}>matches</small> Prime Components (Advance)</span>
            <strong>98.8% Match</strong>
          </div>
        </div>
        <div className={s.reviewNote}>
          <span className={s.reviewDot} />
          <div>
            <strong>Automated voucher matching engine</strong>
            <p>Statement dates and reference numbers cross-verified against ledger books</p>
          </div>
          <ChevronRight size={15} />
        </div>
      </div>
    </>
  );
}

function UnmatchedPreview() {
  return (
    <>
      <div className={`${s.floatingFile} ${s.fileOne}`}>
        <AlertCircle size={14} />3 Variances Flagged
      </div>
      <div className={`${s.floatingFile} ${s.fileTwo}`}>
        <ShieldAlert size={14} />Exception Review
      </div>
      <div className={s.window}>
        <div className={s.windowHeader}>
          <span><AlertCircle size={15} />Unmatched & exception investigation</span>
          <span className={s.pill}>Assisted review</span>
        </div>
        <div className={s.reportRows}>
          <div style={{ animationDelay: '100ms' }}>
            <AlertCircle size={16} style={{ color: '#f59e0b' }} />
            <div>
              <strong>HDFC Bank AMC & Service Charges</strong>
              <small>Debit ₹1,180 · Suggested: Bank Charges Ledger</small>
            </div>
            <span className={s.tagResolved}><Check size={11} />Auto-suggested</span>
          </div>
          <div style={{ animationDelay: '200ms' }}>
            <AlertCircle size={16} style={{ color: '#f59e0b' }} />
            <div>
              <strong>Direct UPI Payment #992810</strong>
              <small>Credit ₹4,500 · Suggested: Customer Advance Ledger</small>
            </div>
            <span className={s.tagResolved}><Check size={11} />Assigned</span>
          </div>
          <div style={{ animationDelay: '300ms' }}>
            <ShieldAlert size={16} style={{ color: '#ef4444' }} />
            <div>
              <strong>Cheque Return Variance #0912</strong>
              <small>Debit ₹18,500 · Flagged for controller investigation</small>
            </div>
            <span className={s.tagWarning}>Needs Review</span>
          </div>
        </div>
        <div className={s.reviewNote}>
          <span className={s.reviewDot} />
          <div>
            <strong>Variance investigation in seconds</strong>
            <p>One-click categorization keeps reconciliation moving without missing entries</p>
          </div>
          <ChevronRight size={15} />
        </div>
      </div>
    </>
  );
}

function TallySyncPreview() {
  return (
    <>
      <div className={`${s.floatingFile} ${s.fileOne}`}>
        <CheckCheck size={14} />TallyPrime Connected
      </div>
      <div className={`${s.floatingFile} ${s.fileTwo}`}>
        <RefreshCw size={14} />Direct Voucher Post
      </div>
      <div className={s.window}>
        <div className={s.windowHeader}>
          <span><RefreshCw size={15} />TallyPrime automated bookkeeping</span>
          <span className={s.pill}>Sync active</span>
        </div>
        <div className={s.reportRows}>
          <div style={{ animationDelay: '100ms' }}>
            <CheckCheck size={16} />
            <div>
              <strong>Payment Voucher #PV-2024-118</strong>
              <small>Metro Supplies · ₹82,450 · Bank ledger updated</small>
            </div>
            <span className={s.tagResolved}>Posted ✓</span>
          </div>
          <div style={{ animationDelay: '200ms' }}>
            <CheckCheck size={16} />
            <div>
              <strong>Receipt Voucher #RV-2024-094</strong>
              <small>Apex Enterprises · ₹1,45,200 · Customer ledger cleared</small>
            </div>
            <span className={s.tagResolved}>Posted ✓</span>
          </div>
          <div style={{ animationDelay: '300ms' }}>
            <CheckCheck size={16} />
            <div>
              <strong>Contra Voucher #CV-2024-031</strong>
              <small>Cash Transfer to HDFC Bank · ₹25,000</small>
            </div>
            <span className={s.tagResolved}>Posted ✓</span>
          </div>
        </div>
        <div className={s.extraction}>
          <div>
            <ShieldCheck size={13} />
            <strong>Direct bookkeeping into TallyPrime</strong>
            <span>Audit ready</span>
          </div>
          <div className={s.progress}><span /></div>
          <p>Bank ledgers, payment vouchers, and reconciliation dates linked with full audit trail</p>
        </div>
        <div className={s.windowFooter}>
          <Check size={14} />
          <span>Zero manual data entry required</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </>
  );
}

export function BankingWhyItMatters() {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (index + 1) % challenges.length;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (index - 1 + challenges.length) % challenges.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = challenges.length - 1;
    }
    if (nextIndex !== null) {
      setActiveTab(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <section id="why-it-matters" className={`${base.section} ${s.section}`} aria-labelledby="why-it-matters-title">
      <div className="site-shell">
        <div className={s.heading}>
          <p className={`${base.eyebrow} ${s.eyebrow}`}>WHY IT MATTERS</p>
          <h2 id="why-it-matters-title">
            Spend less time organising statement data.
          </h2>
          <p className={s.intro}>
            Bank reconciliation often involves fragmented statements, hours of manual ledger matching, and chasing down unexplained variances. See how each operational bottleneck transforms into automated clarity.
          </p>
        </div>

        <div className={s.workspace}>
          <div className={s.steps} role="tablist" aria-label="Explore banking and reconciliation challenges" aria-orientation="vertical">
            {challenges.map((challenge, index) => {
              const Icon = challenge.icon;
              const isSelected = activeTab === index;
              return (
                <button
                  key={challenge.name}
                  ref={(el) => { tabRefs.current[index] = el; }}
                  role="tab"
                  id={`banking-tab-${index}`}
                  aria-selected={isSelected}
                  aria-controls={`banking-panel-${index}`}
                  tabIndex={isSelected ? 0 : -1}
                  className={s.step}
                  onClick={() => setActiveTab(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                >
                  <span className={s.stepNumber}>0{index + 1}</span>
                  <div className={s.stepCopy}>
                    <span className={s.stepLabel}>
                      <Icon size={14} aria-hidden="true" />
                      {challenge.name}
                    </span>
                    <strong>{challenge.title}</strong>
                    <span className={s.description}>{challenge.description}</span>
                  </div>
                  <ChevronRight size={18} className={s.stepArrow} aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <div className={s.stage}>
            <div className={s.glow} aria-hidden="true" />
            {challenges.map((challenge, index) => (
              <div
                key={challenge.name}
                id={`banking-panel-${index}`}
                role="tabpanel"
                aria-labelledby={`banking-tab-${index}`}
                className={s.preview}
                hidden={activeTab !== index}
              >
                {index === 0 && <BankFormatsPreview />}
                {index === 1 && <MatchingPreview />}
                {index === 2 && <UnmatchedPreview />}
                {index === 3 && <TallySyncPreview />}

                <div className={s.result}>
                  <Check size={14} />
                  <span>
                    {index === 0 && 'Multi-bank statement ingestion with automatic narration parsing.'}
                    {index === 1 && 'Automated rules-based transaction matching against ledger accounts.'}
                    {index === 2 && 'Smart exception flags and assisted ledger categorization.'}
                    {index === 3 && 'Direct, validated voucher creation in TallyPrime with audit trail.'}
                  </span>
                </div>
              </div>
            ))}
            <div className={s.caption}>
              <span>ILLUSTRATIVE PRODUCT VIEW</span>
              <span>0{activeTab + 1} / 04</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
