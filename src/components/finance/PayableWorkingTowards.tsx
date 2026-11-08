'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  Building2,
  Calendar,
  Check,
  CheckCheck,
  ChevronRight,
  Clock,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  Layers,
  Receipt,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import base from '../LandingPage.module.css';
import s from './PayableWorkingTowards.module.css';

const challenges = [
  {
    name: 'Supplier Invoices',
    title: 'Centralized supplier invoice management.',
    description: 'Organize incoming multi-vendor bills, purchase orders, and payment terms in one structured repository.',
    icon: FileSpreadsheet,
  },
  {
    name: 'Due-Date Tracking',
    title: 'Real-time payment due-date visibility.',
    description: 'Help teams review upcoming supplier due dates, avoid late fees, and prioritize cash obligations.',
    icon: Clock,
  },
  {
    name: 'Approval Workflows',
    title: 'Configurable multi-tier review & approvals.',
    description: 'Sequential authorization rules route invoices through department heads and finance controllers with full audit logging.',
    icon: ShieldCheck,
  },
  {
    name: 'Payables Reporting',
    title: 'Actionable aging & vendor analytics.',
    description: 'Dynamic aging buckets (0–30, 31–60, 60+ days), supplier balance trends, and liquidity forecasts.',
    icon: BarChart3,
  },
];

function SupplierInvoicesPreview() {
  return (
    <>
      <div className={`${s.floatingFile} ${s.fileOne}`}>
        <FileText size={14} />INV-9021.pdf
      </div>
      <div className={`${s.floatingFile} ${s.fileTwo}`}>
        <Building2 size={14} />Centralized repository
      </div>
      <div className={s.window}>
        <div className={s.windowHeader}>
          <span><Layers size={15} />Supplier invoice repository</span>
          <span className={s.pill}>Automated intake</span>
        </div>
        <div className={s.documentList}>
          <div className={s.documentRow} style={{ animationDelay: '100ms' }}>
            <div className={s.documentIcon}><Receipt size={17} /></div>
            <div>
              <strong>Prime Components · PO-8492</strong>
              <small>Net 30 terms · INV-9021 · Spare parts</small>
            </div>
            <div className={s.amountBadge}>
              ₹1,45,200
              <span>Line items parsed</span>
            </div>
          </div>
          <div className={s.documentRow} style={{ animationDelay: '200ms' }}>
            <div className={s.documentIcon}><Building2 size={17} /></div>
            <div>
              <strong>Metro Supplies · PO-1028</strong>
              <small>Net 15 terms · INV-4491 · Industrial supplies</small>
            </div>
            <div className={s.amountBadge}>
              ₹82,450
              <span>Line items parsed</span>
            </div>
          </div>
          <div className={s.documentRow} style={{ animationDelay: '300ms' }}>
            <div className={s.documentIcon}><FileText size={17} /></div>
            <div>
              <strong>Apex Services · Contract #29</strong>
              <small>Immediate terms · INV-0194 · Maintenance</small>
            </div>
            <div className={s.amountBadge}>
              ₹24,800
              <span>Line items parsed</span>
            </div>
          </div>
        </div>
        <div className={s.extraction}>
          <div>
            <Sparkles size={13} />
            <strong>Vendor invoice & PO terms matching</strong>
            <span>Verified</span>
          </div>
          <div className={s.progress}><span /></div>
          <p>Credit terms, supplier GSTINs, and purchase order linkages verified</p>
        </div>
        <div className={s.windowFooter}>
          <Check size={14} />
          <span>Centralized supplier repository ready for scheduling</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </>
  );
}

function DueDatePreview() {
  return (
    <>
      <div className={`${s.floatingFile} ${s.fileOne}`}>
        <Clock size={14} />₹1.07L Due this week
      </div>
      <div className={`${s.floatingFile} ${s.fileTwo}`}>
        <Calendar size={14} />Cash schedule
      </div>
      <div className={s.window}>
        <div className={s.invoiceSummary}>
          <div>
            <small>Upcoming Supplier Obligations</small>
            <strong>₹2,52,450<span>.00</span></strong>
          </div>
          <span className={s.pill}>Due dates tracked</span>
        </div>
        <div className={s.checkRows}>
          <div style={{ animationDelay: '100ms' }}>
            <Clock size={15} style={{ color: '#f59e0b' }} />
            <span>Metro Supplies · Due in 2 days (15 Nov)</span>
            <strong style={{ color: '#b45309' }}>₹82,450 · Priority</strong>
          </div>
          <div style={{ animationDelay: '200ms' }}>
            <Clock size={15} />
            <span>Apex Services · Due in 5 days (18 Nov)</span>
            <strong>₹24,800 · Scheduled</strong>
          </div>
          <div style={{ animationDelay: '300ms' }}>
            <Calendar size={15} />
            <span>Prime Components · Due in 14 days (27 Nov)</span>
            <strong>₹1,45,200 · On track</strong>
          </div>
        </div>
        <div className={s.reviewNote}>
          <span className={s.reviewDot} />
          <div>
            <strong>Automated cash obligations planning</strong>
            <p>Prioritize supplier payments, prevent overdue charges, and capture discounts</p>
          </div>
          <ChevronRight size={15} />
        </div>
      </div>
    </>
  );
}

function ApprovalPreview() {
  return (
    <>
      <div className={`${s.floatingFile} ${s.fileOne}`}>
        <CheckCheck size={14} />2-Tier Approval
      </div>
      <div className={`${s.floatingFile} ${s.fileTwo}`}>
        <ShieldCheck size={14} />Controller gate
      </div>
      <div className={s.window}>
        <div className={s.windowHeader}>
          <span><ShieldCheck size={15} />Sequential approval workflow</span>
          <span className={s.pill}>INV-9021 · ₹1.45L</span>
        </div>
        <div className={s.reportRows}>
          <div style={{ animationDelay: '100ms' }}>
            <Check size={16} />
            <div>
              <strong>Department Head Authorization</strong>
              <small>Operations Head · Verified receipt of materials</small>
            </div>
            <span className={s.tagApproved}>Approved ✓</span>
          </div>
          <div style={{ animationDelay: '200ms' }}>
            <Check size={16} />
            <div>
              <strong>Finance Controller Review</strong>
              <small>CFO Office · Verified budget & GST compliance</small>
            </div>
            <span className={s.tagApproved}>Approved ✓</span>
          </div>
          <div style={{ animationDelay: '300ms' }}>
            <Clock size={16} style={{ color: '#18cb96' }} />
            <div>
              <strong>Payment Disbursement Release</strong>
              <small>Queued for scheduled bank batch run</small>
            </div>
            <span className={s.tagResolved}>Ready to Pay</span>
          </div>
        </div>
        <div className={s.reviewNote}>
          <span className={s.reviewDot} />
          <div>
            <strong>Role-based approvals with audit trail</strong>
            <p>Every decision timestamped with user credentials and document history</p>
          </div>
          <ChevronRight size={15} />
        </div>
      </div>
    </>
  );
}

function ReportingPreview() {
  return (
    <>
      <div className={`${s.floatingFile} ${s.fileOne}`}>
        <TrendingUp size={14} />Aging breakdown
      </div>
      <div className={`${s.floatingFile} ${s.fileTwo}`}>
        <BarChart3 size={14} />Real-time analytics
      </div>
      <div className={s.window}>
        <div className={s.windowHeader}>
          <span><BarChart3 size={15} />Payables aging & cash flow overview</span>
          <span className={s.pill}>Portfolio view</span>
        </div>
        <div className={s.agingGrid}>
          <div className={s.agingCard}>
            <span>0 – 30 Days</span>
            <strong>₹14.8L</strong>
          </div>
          <div className={s.agingCard}>
            <span>31 – 60 Days</span>
            <strong>₹3.2L</strong>
          </div>
          <div className={s.agingCard}>
            <span>60+ Days</span>
            <strong style={{ color: '#dc2626' }}>₹0.8L</strong>
          </div>
        </div>
        <div className={s.documentList}>
          <div className={s.documentRow} style={{ animationDelay: '100ms' }}>
            <div className={s.documentIcon}><Building2 size={17} /></div>
            <div>
              <strong>Prime Components · 12 invoices</strong>
              <small>Current balance · No overdue amount</small>
            </div>
            <span className={s.tagApproved}>Healthy</span>
          </div>
          <div className={s.documentRow} style={{ animationDelay: '200ms' }}>
            <div className={s.documentIcon}><Building2 size={17} /></div>
            <div>
              <strong>Metro Supplies · 5 invoices</strong>
              <small>1 invoice approaching 30 days</small>
            </div>
            <span className={s.tagWarning}>Action Soon</span>
          </div>
        </div>
        <div className={s.windowFooter}>
          <Check size={14} />
          <span>Real-time visibility into supplier balances and working capital</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </>
  );
}

export function PayableWorkingTowards() {
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
    <section id="working-towards" className={`${base.section} ${s.section}`} aria-labelledby="working-towards-title">
      <div className="site-shell">
        <div className={s.heading}>
          <p className={`${base.eyebrow} ${s.eyebrow}`}>WHAT WE’RE WORKING TOWARDS</p>
          <h2 id="working-towards-title">
            A more connected way to manage payables.
          </h2>
          <p className={s.intro}>
            Accounts payable teams face scattered vendor communications, opaque approval bottlenecks, and manual cash obligations tracking. Explore the four connected capabilities Docsynecx is building to bring clarity to payables.
          </p>
        </div>

        <div className={s.workspace}>
          <div className={s.steps} role="tablist" aria-label="Explore accounts payable roadmap areas" aria-orientation="vertical">
            {challenges.map((challenge, index) => {
              const Icon = challenge.icon;
              const isSelected = activeTab === index;
              return (
                <button
                  key={challenge.name}
                  ref={(el) => { tabRefs.current[index] = el; }}
                  role="tab"
                  id={`payable-tab-${index}`}
                  aria-selected={isSelected}
                  aria-controls={`payable-panel-${index}`}
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
                id={`payable-panel-${index}`}
                role="tabpanel"
                aria-labelledby={`payable-tab-${index}`}
                className={s.preview}
                hidden={activeTab !== index}
              >
                {index === 0 && <SupplierInvoicesPreview />}
                {index === 1 && <DueDatePreview />}
                {index === 2 && <ApprovalPreview />}
                {index === 3 && <ReportingPreview />}

                <div className={s.result}>
                  <Check size={14} />
                  <span>
                    {index === 0 && 'Centralized supplier invoice repository with PO terms matching.'}
                    {index === 1 && 'Real-time due-date scheduling to optimize working capital.'}
                    {index === 2 && 'Configurable multi-tier approvals with full audit logging.'}
                    {index === 3 && 'Comprehensive payables aging and supplier balance intelligence.'}
                  </span>
                </div>
              </div>
            ))}
            <div className={s.caption}>
              <span>ROADMAP PREVIEW · UNDER DEVELOPMENT</span>
              <span>0{activeTab + 1} / 04</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
