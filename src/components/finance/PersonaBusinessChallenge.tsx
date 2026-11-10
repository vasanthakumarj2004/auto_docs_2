'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import {
  AlertCircle,
  Archive,
  BarChart3,
  Check,
  CheckCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  Copy,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  FolderArchive,
  Layers,
  Mail,
  MessageSquare,
  Receipt,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
} from 'lucide-react';
import base from '../LandingPage.module.css';
import s from './InvoiceBusinessChallenge.module.css';
import type { PersonaData } from '../../content/financePersonas';

interface PersonaBusinessChallengeProps {
  persona: PersonaData['slug'];
}

/* ==========================================================================
   1. BUSINESS OWNERS PREVIEWS
   ========================================================================== */
function OwnerCashPreview() {
  return (
    <>
      <div className={`${s.floatingFile} ${s.fileOne}`}>
        <BarChart3 size={14} />Runway: 4.8 months
      </div>
      <div className={`${s.floatingFile} ${s.fileTwo}`}>
        <Receipt size={14} />Payables radar
      </div>
      <div className={s.window}>
        <div className={s.windowHeader}>
          <span><BarChart3 size={16} />Cash & commitments console</span>
          <span className={s.pill}>Real-time view</span>
        </div>
        <div className={s.invoiceSummary}>
          <div>
            <small>Upcoming payables this week</small>
            <strong>₹14,80,000<span> across 18 bills</span></strong>
          </div>
          <span className={s.documentIcon}><BarChart3 size={24} /></span>
        </div>
        <div className={s.checkRows}>
          {[
            ['Critical vendor dues (0–7 days)', '₹6,40,000 · High priority'],
            ['Approved spares purchase order', '₹4,20,000 · Verified & committed'],
            ['GST & statutory obligations', '₹4,20,000 · Due 20th Nov'],
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
            <strong>Live working capital radar</strong>
            <p>Know exact cash obligations before approving payments.</p>
          </div>
          <ChevronRight size={15} />
        </div>
        <div className={s.windowFooter}>
          <FileCheck2 size={14} />
          Direct connection with live TallyPrime balances
          <ChevronRight size={14} />
        </div>
      </div>
      <div className={s.result}>
        <CheckCheck size={15} />
        Real-time financial commitments visible without waiting for month-end reports.
      </div>
    </>
  );
}

function OwnerVariancePreview() {
  return (
    <>
      <div className={`${s.floatingFile} ${s.fileOne}`}>
        <ShieldAlert size={14} />Price hike +20.8%
      </div>
      <div className={`${s.floatingFile} ${s.fileTwo}`}>
        <Copy size={14} />Duplicate blocked
      </div>
      <div className={s.window}>
        <div className={s.windowHeader}>
          <span><ShieldAlert size={16} />Vendor rate & duplicate audit</span>
          <span className={s.pill}>Protected</span>
        </div>
        <div className={s.documentList}>
          {[
            { title: 'Apex Industrial Spares · Rate Hike', detail: 'Current ₹1,450 vs Past ₹1,200 (+20.8%)', status: 'Flagged' },
            { title: 'Prime Components · Duplicate Check', detail: 'INV-4821 compared against past 90 days', status: 'Clean' },
            { title: 'Metro Logistics · Tax Validation', detail: '18% IGST checked against HSN 8482.10', status: 'Verified' },
          ].map(({ title, detail, status }, i) => (
            <div className={s.documentRow} key={title} style={{ animationDelay: `${i * 100}ms` }}>
              <span className={s.documentIcon}>
                {status === 'Flagged' ? <AlertCircle size={20} color="#f59e0b" /> : <FileText size={20} />}
              </span>
              <div>
                <strong>{title}</strong>
                <small>{detail}</small>
              </div>
              <span
                className={s.pill}
                style={status === 'Flagged' ? { color: '#d97706', borderColor: '#fcd34d' } : undefined}
              >
                {status}
              </span>
            </div>
          ))}
        </div>
        <div className={s.reviewNote}>
          <span className={s.reviewDot} style={{ background: '#f59e0b' }} />
          <div>
            <strong>Historical rate increase held</strong>
            <p>Prevents margin creep before owner sign-off.</p>
          </div>
          <ChevronRight size={15} />
        </div>
        <div className={s.windowFooter}>
          <FileCheck2 size={14} />
          Protects your margins from silent vendor price increases
          <ChevronRight size={14} />
        </div>
      </div>
      <div className={s.result}>
        <ShieldCheck size={15} />
        Automated historical price benchmarking and duplicate detection.
      </div>
    </>
  );
}

function OwnerApprovalPreview() {
  return (
    <>
      <div className={`${s.floatingFile} ${s.fileOne}`}>
        <Smartphone size={14} />Mobile approval
      </div>
      <div className={`${s.floatingFile} ${s.fileTwo}`}>
        <FileText size={14} />INV-8210.pdf
      </div>
      <div className={s.window}>
        <div className={s.windowHeader}>
          <span><Smartphone size={16} />1-Tap executive review</span>
          <span className={s.pill}>Mobile link</span>
        </div>
        <div className={s.invoiceSummary}>
          <div>
            <small>Prime Components Pvt Ltd · High-value bill</small>
            <strong>₹2,45,000<span>.00</span></strong>
          </div>
          <span className={s.documentIcon}><Receipt size={24} /></span>
        </div>
        <div className={s.checkRows}>
          {[
            ['Threshold rule triggered', 'Bills > ₹1,00,000 require MD sign-off'],
            ['Supporting documents attached', 'PO-3021, Delivery Challan, Tax Invoice'],
            ['Ledger destination', 'Plant Spares & Consumables · Tally verified'],
          ].map(([label, status], i) => (
            <div key={label} style={{ animationDelay: `${i * 120}ms` }}>
              <Check size={15} />
              <span>{label}</span>
              <strong>{status}</strong>
            </div>
          ))}
        </div>
        <div className={s.extraction}>
          <div>
            <Sparkles size={15} />
            <strong>Ready for 1-tap sign-off</strong>
            <span>One tap</span>
          </div>
          <p>Tap approve from your phone to post the voucher straight into TallyPrime</p>
        </div>
        <div className={s.windowFooter}>
          <CheckCircle2 size={14} />
          Approve or query bills anywhere without opening accounting software
          <ChevronRight size={14} />
        </div>
      </div>
      <div className={s.result}>
        <CheckCheck size={15} />
        High-value invoices reviewed and approved anywhere in seconds.
      </div>
    </>
  );
}

function OwnerAIPreview() {
  return (
    <>
      <div className={`${s.floatingFile} ${s.fileOne}`}>
        <Sparkles size={14} />AI Intelligence
      </div>
      <div className={`${s.floatingFile} ${s.fileTwo}`}>
        <FileText size={14} />Zero staff disruption
      </div>
      <div className={s.window}>
        <div className={s.windowHeader}>
          <span><MessageSquare size={16} />Conversational finance intelligence</span>
          <span className={s.pill}>Instant query</span>
        </div>
        <div className={s.documentList}>
          <div className={s.documentRow}>
            <span className={s.documentIcon}><MessageSquare size={20} /></span>
            <div>
              <strong>Owner prompt</strong>
              <small>&ldquo;Show top 5 vendor payables due this week and compare with last month.&rdquo;</small>
            </div>
          </div>
          <div className={s.documentRow} style={{ background: '#f8fafc' }}>
            <span className={s.documentIcon}><Sparkles size={20} color="#059669" /></span>
            <div>
              <strong>Docsynecx Intelligence</strong>
              <small>Found ₹18.4L in upcoming vendor payables across 5 suppliers. Down 8.4% from October cycle.</small>
            </div>
          </div>
        </div>
        <div className={s.checkRows}>
          {[
            ['Top supplier: Metro Steels', '₹7,20,000 due 12th Nov'],
            ['Secondary: Apex Industrial', '₹4,10,000 due 14th Nov'],
            ['Source verification', 'All 5 vouchers linked directly to Tally'],
          ].map(([label, status], i) => (
            <div key={label} style={{ animationDelay: `${i * 120}ms` }}>
              <Check size={15} />
              <span>{label}</span>
              <strong>{status}</strong>
            </div>
          ))}
        </div>
        <div className={s.windowFooter}>
          <FileCheck2 size={14} />
          Instant answers without halting your accounts team for reports
          <ChevronRight size={14} />
        </div>
      </div>
      <div className={s.result}>
        <Sparkles size={15} />
        Plain-English business queries answered instantly with source-backed data.
      </div>
    </>
  );
}

/* ==========================================================================
   2. FINANCE TEAMS PREVIEWS
   ========================================================================== */
function FinanceApprovalMatrixPreview() {
  return (
    <>
      <div className={`${s.floatingFile} ${s.fileOne}`}>
        <Clock size={14} />SLA: 4h remaining
      </div>
      <div className={`${s.floatingFile} ${s.fileTwo}`}>
        <Users size={14} />3 Dept Matrix
      </div>
      <div className={s.window}>
        <div className={s.windowHeader}>
          <span><Users size={16} />Departmental approval matrix</span>
          <span className={s.pill}>Auto-routed</span>
        </div>
        <div className={s.documentList}>
          {[
            { dept: 'Plant Operations · INV-4821', approver: 'Approved by K. Raman (Ops Head)', status: 'Approved' },
            { dept: 'IT & Cloud Infrastructure · INV-3910', approver: 'Awaiting Dept Head · Auto-reminder sent', status: 'Pending' },
            { dept: 'Logistics Freight Bills · INV-8820', approver: 'Approved by Dispatch Lead', status: 'Approved' },
          ].map(({ dept, approver, status }, i) => (
            <div className={s.documentRow} key={dept} style={{ animationDelay: `${i * 100}ms` }}>
              <span className={s.documentIcon}>
                {status === 'Pending' ? <Clock size={20} color="#f59e0b" /> : <CheckCircle2 size={20} />}
              </span>
              <div>
                <strong>{dept}</strong>
                <small>{approver}</small>
              </div>
              <span
                className={s.pill}
                style={status === 'Pending' ? { color: '#d97706', borderColor: '#fcd34d' } : undefined}
              >
                {status}
              </span>
            </div>
          ))}
        </div>
        <div className={s.reviewNote}>
          <span className={s.reviewDot} />
          <div>
            <strong>Automated escalation rules</strong>
            <p>Unanswered approvals auto-escalate before month-end cutoff.</p>
          </div>
          <ChevronRight size={15} />
        </div>
        <div className={s.windowFooter}>
          <FileCheck2 size={14} />
          Automatic Slack & email alerts eliminate manual manager chasing
          <ChevronRight size={14} />
        </div>
      </div>
      <div className={s.result}>
        <CheckCheck size={15} />
        Automated routing matrices eliminate manager approval bottlenecks.
      </div>
    </>
  );
}

function FinanceBatchCrunchPreview() {
  return (
    <>
      <div className={`${s.floatingFile} ${s.fileOne}`}>
        <Layers size={14} />Batch: 142 Invoices
      </div>
      <div className={`${s.floatingFile} ${s.fileTwo}`}>
        <Sparkles size={14} />1.2s / document
      </div>
      <div className={s.window}>
        <div className={s.windowHeader}>
          <span><Layers size={16} />High-volume batch ingestion</span>
          <span className={s.pill}>142 / 142 complete</span>
        </div>
        <div className={s.documentList}>
          {[
            { vendor: 'Prime Components', inv: 'INV-4821', note: '14 line items parsed · GST verified' },
            { vendor: 'Metro Industrial', inv: 'INV-1068', note: 'Ledgers auto-mapped · PO 3-way matched' },
            { vendor: 'Apex Logistics', inv: 'INV-0294', note: 'Voucher PUR-2026-829 posted to Tally' },
          ].map(({ vendor, inv, note }, i) => (
            <div className={s.documentRow} key={inv} style={{ animationDelay: `${i * 100}ms` }}>
              <span className={s.documentIcon}><FileText size={20} /></span>
              <div>
                <strong>{vendor} · {inv}</strong>
                <small>{note}</small>
              </div>
              <Check size={15} />
            </div>
          ))}
        </div>
        <div className={s.extraction}>
          <div>
            <Sparkles size={15} />
            <strong>Month-end queue cleared</strong>
            <span>Completed</span>
          </div>
          <div className={s.progress}><span /></div>
          <p>142 supplier invoices validated and ready for ledger posting in 3 minutes</p>
        </div>
        <div className={s.windowFooter}>
          <FileCheck2 size={14} />
          Batch intake clears backlogs days ahead of reporting cutoff
          <ChevronRight size={14} />
        </div>
      </div>
      <div className={s.result}>
        <CheckCheck size={15} />
        Batch intake accelerates month-end closing from weeks to hours.
      </div>
    </>
  );
}

function FinanceAuditTrailPreview() {
  return (
    <>
      <div className={`${s.floatingFile} ${s.fileOne}`}>
        <ShieldCheck size={14} />Permanent source link
      </div>
      <div className={`${s.floatingFile} ${s.fileTwo}`}>
        <Archive size={14} />Audit trail locked
      </div>
      <div className={s.window}>
        <div className={s.windowHeader}>
          <span><ShieldCheck size={16} />Immutable audit & compliance trail</span>
          <span className={s.pill}>Audit ready</span>
        </div>
        <div className={s.invoiceSummary}>
          <div>
            <small>Voucher PUR-2026-0841 · Original PDF linked</small>
            <strong>₹1,85,400<span>.00</span></strong>
          </div>
          <span className={s.documentIcon}><Receipt size={24} /></span>
        </div>
        <div className={s.checkRows}>
          {[
            ['Source invoice PDF', 'Permanently attached to Tally voucher'],
            ['Approver signature & timestamp', 'V. Sundaram (Controller) · 08 Nov 14:22 IST'],
            ['Ledger reconciliation status', 'Chart of accounts verified & immutable'],
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
            <strong>1-Click statutory audit readiness</strong>
            <p>Pull up source PDFs and approvals directly from Tally.</p>
          </div>
          <ChevronRight size={15} />
        </div>
        <div className={s.windowFooter}>
          <FileCheck2 size={14} />
          Eliminates physical filing cabinets and document hunting forever
          <ChevronRight size={14} />
        </div>
      </div>
      <div className={s.result}>
        <ShieldCheck size={15} />
        Every posted voucher is permanently linked to its audit history.
      </div>
    </>
  );
}

function FinanceGstMatchPreview() {
  return (
    <>
      <div className={`${s.floatingFile} ${s.fileOne}`}>
        <Receipt size={14} />GSTR-2B synced
      </div>
      <div className={`${s.floatingFile} ${s.fileTwo}`}>
        <ShieldCheck size={14} />ITC claim safe
      </div>
      <div className={s.window}>
        <div className={s.windowHeader}>
          <span><Receipt size={16} />GSTR-2B automated reconciliation</span>
          <span className={s.pill}>Matched</span>
        </div>
        <div className={s.documentList}>
          {[
            { item: 'Supplier GSTIN 33AABCT1332F1ZX', detail: 'Active · Regular tax filer confirmed', tag: 'Verified' },
            { item: 'Invoice Total vs 2B Portal', detail: '₹74,045.00 matched to supplier filing', tag: 'Matched' },
            { item: 'Input Tax Credit (ITC) Eligible', detail: '₹11,295.00 confirmed and safe to claim', tag: '100% ITC' },
          ].map(({ item, detail, tag }, i) => (
            <div className={s.documentRow} key={item} style={{ animationDelay: `${i * 100}ms` }}>
              <span className={s.documentIcon}><FileCheck2 size={20} /></span>
              <div>
                <strong>{item}</strong>
                <small>{detail}</small>
              </div>
              <span className={s.pill}>{tag}</span>
            </div>
          ))}
        </div>
        <div className={s.reviewNote}>
          <span className={s.reviewDot} />
          <div>
            <strong>Automated mismatch detection</strong>
            <p>Flags unfiled vendor invoices before filing GSTR-3B.</p>
          </div>
          <ChevronRight size={15} />
        </div>
        <div className={s.windowFooter}>
          <FileCheck2 size={14} />
          Zero ITC loss and automated compliance protection
          <ChevronRight size={14} />
        </div>
      </div>
      <div className={s.result}>
        <CheckCheck size={15} />
        Continuous 2B reconciliation eliminates tax compliance notices.
      </div>
    </>
  );
}

/* ==========================================================================
   3. ACCOUNTS TEAMS PREVIEWS
   ========================================================================== */
function AccountsRetypingPreview() {
  return (
    <>
      <div className={`${s.floatingFile} ${s.fileOne}`}>
        <FileSpreadsheet size={14} />INV-4821.pdf
      </div>
      <div className={`${s.floatingFile} ${s.fileTwo}`}>
        <Receipt size={14} />Zero manual typing
      </div>
      <div className={s.window}>
        <div className={s.windowHeader}>
          <span><FileSpreadsheet size={16} />Granular line-item extraction</span>
          <span className={s.pill}>Auto-parsed</span>
        </div>
        <div className={s.documentList}>
          {[
            { item: 'High Tensile Flange Bolt M12', specs: 'Qty: 500 · Rate: ₹42.00 · HSN: 7318 · 18% GST', code: 'Mapped' },
            { item: 'Heavy Hex Nut M12 Grade 8', specs: 'Qty: 500 · Rate: ₹18.50 · HSN: 7318 · 18% GST', code: 'Mapped' },
            { item: 'Spring Washer Stainless Steel', specs: 'Qty: 1000 · Rate: ₹4.20 · HSN: 7318 · 18% GST', code: 'Mapped' },
          ].map(({ item, specs, code }, i) => (
            <div className={s.documentRow} key={item} style={{ animationDelay: `${i * 100}ms` }}>
              <span className={s.documentIcon}><FileText size={20} /></span>
              <div>
                <strong>{item}</strong>
                <small>{specs}</small>
              </div>
              <span className={s.pill}>{code}</span>
            </div>
          ))}
        </div>
        <div className={s.extraction}>
          <div>
            <Sparkles size={15} />
            <strong>All fields mapped to Tally ledgers</strong>
            <span>Complete</span>
          </div>
          <div className={s.progress}><span /></div>
          <p>Quantities · Unit rates · Discounts · HSN · Tax splits · Grand total</p>
        </div>
        <div className={s.windowFooter}>
          <FileCheck2 size={14} />
          Post 50-line invoices in 1 click instead of 45 minutes of typing
          <ChevronRight size={14} />
        </div>
      </div>
      <div className={s.result}>
        <CheckCheck size={15} />
        Direct extraction of multi-page line items with zero manual retyping.
      </div>
    </>
  );
}

function AccountsLayoutPreview() {
  return (
    <>
      <div className={`${s.floatingFile} ${s.fileOne}`}>
        <Layers size={14} />Rotated scan
      </div>
      <div className={`${s.floatingFile} ${s.fileTwo}`}>
        <Sparkles size={14} />Auto-deskewed
      </div>
      <div className={s.window}>
        <div className={s.windowHeader}>
          <span><Layers size={16} />Universal layout & OCR normalizer</span>
          <span className={s.pill}>50+ formats</span>
        </div>
        <div className={s.documentList}>
          {[
            { source: 'Vendor A: 3-Column Legacy Invoice', result: 'Normalized to standard purchase voucher structure', tag: 'Parsed' },
            { source: 'Vendor B: Mobile Photo Snapshot', result: 'Skew corrected · Contrast boosted · Text extracted', tag: 'Normalized' },
            { source: 'Vendor C: Multi-Page Tabular Breakdown', result: '2-page line items combined into single voucher', tag: 'Ready' },
          ].map(({ source, result, tag }, i) => (
            <div className={s.documentRow} key={source} style={{ animationDelay: `${i * 100}ms` }}>
              <span className={s.documentIcon}><FileText size={20} /></span>
              <div>
                <strong>{source}</strong>
                <small>{result}</small>
              </div>
              <span className={s.pill}>{tag}</span>
            </div>
          ))}
        </div>
        <div className={s.reviewNote}>
          <span className={s.reviewDot} />
          <div>
            <strong>Universal template independence</strong>
            <p>Processes diverse vendor templates without setup hassle.</p>
          </div>
          <ChevronRight size={15} />
        </div>
        <div className={s.windowFooter}>
          <FileCheck2 size={14} />
          Intelligent OCR normalizes diverse supplier documents seamlessly
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

function AccountsTaxMathPreview() {
  return (
    <>
      <div className={`${s.floatingFile} ${s.fileOne}`}>
        <Receipt size={14} />HSN: 8482.10
      </div>
      <div className={`${s.floatingFile} ${s.fileTwo}`}>
        <Check size={14} />Round-off verified
      </div>
      <div className={s.window}>
        <div className={s.windowHeader}>
          <span><Receipt size={16} />Automated tax & round-off reconciliation</span>
          <span className={s.pill}>Reconciled</span>
        </div>
        <div className={s.invoiceSummary}>
          <div>
            <small>Prime Components Pvt Ltd · Tax verification</small>
            <strong>₹74,045<span>.00</span></strong>
          </div>
          <span className={s.documentIcon}><Receipt size={24} /></span>
        </div>
        <div className={s.checkRows}>
          {[
            ['Taxable value: ₹62,750.00', 'Sum of line items verified'],
            ['CGST 9% (₹5,647.50) + SGST 9% (₹5,647.50)', 'Exact mathematical match'],
            ['HSN code 8482.10 rate check', '18% tax bracket validated'],
            ['Round-off adjustment (+₹0.00)', 'Reconciled to invoice grand total'],
          ].map(([label, status], i) => (
            <div key={label} style={{ animationDelay: `${i * 120}ms` }}>
              <Check size={15} />
              <span>{label}</span>
              <strong>{status}</strong>
            </div>
          ))}
        </div>
        <div className={s.windowFooter}>
          <FileCheck2 size={14} />
          Automated mathematical checks protect ledger balance integrity
          <ChevronRight size={14} />
        </div>
      </div>
      <div className={s.result}>
        <CheckCheck size={15} />
        Instant tax calculations with automated round-off reconciliation.
      </div>
    </>
  );
}

function AccountsDuplicatePreview() {
  return (
    <>
      <div className={`${s.floatingFile} ${s.fileOne}`}>
        <Copy size={14} />INV-1068 held
      </div>
      <div className={`${s.floatingFile} ${s.fileTwo}`}>
        <ShieldAlert size={14} />Duplicate blocked
      </div>
      <div className={s.window}>
        <div className={s.windowHeader}>
          <span><Copy size={16} />Active duplicate prevention guard</span>
          <span className={s.pill}>Blocked</span>
        </div>
        <div className={s.documentList}>
          {[
            { inv: 'INV-4821', vendor: 'Prime Components', status: 'Unique bill · Ready to post' },
            { inv: 'INV-1068', vendor: 'Metro Supplies', status: 'Duplicate detected · Already posted 02 Nov' },
            { inv: 'INV-0294', vendor: 'Apex Services', status: 'Unique bill · Ready to post' },
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
                <span className={s.pill} style={{ color: '#d97706', borderColor: '#fcd34d' }}>Blocked</span>
              ) : (
                <Check size={15} />
              )}
            </div>
          ))}
        </div>
        <div className={s.reviewNote}>
          <span className={s.reviewDot} style={{ background: '#f59e0b' }} />
          <div>
            <strong>Duplicate voucher blocked</strong>
            <p>Prevents double payment and eliminates painful reversal entries.</p>
          </div>
          <ChevronRight size={15} />
        </div>
        <div className={s.windowFooter}>
          <FileCheck2 size={14} />
          Compares vendor GSTIN, invoice number, and dates in real time
          <ChevronRight size={14} />
        </div>
      </div>
      <div className={s.result}>
        <Sparkles size={15} />
        Active duplicate shield prevents double payments before entry.
      </div>
    </>
  );
}

/* ==========================================================================
   4. CA FIRMS PREVIEWS
   ========================================================================== */
function CADocumentDumpPreview() {
  return (
    <>
      <div className={`${s.floatingFile} ${s.fileOne}`}>
        <FolderArchive size={14} />12 clients live
      </div>
      <div className={`${s.floatingFile} ${s.fileTwo}`}>
        <Mail size={14} />Drop portal active
      </div>
      <div className={s.window}>
        <div className={s.windowHeader}>
          <span><FolderArchive size={16} />Multi-client document intake portal</span>
          <span className={s.pill}>Intake active</span>
        </div>
        <div className={s.documentList}>
          {[
            { client: 'Apex Engineering Pvt Ltd', docs: '48 bills ingested via client email box', status: 'Processed' },
            { client: 'Kovai Textiles Hub', docs: '32 bills uploaded via secure drop link', status: 'Processed' },
            { client: 'Rajadurai E-Vehicles', docs: '18 bills scanned & auto-extracted', status: 'Processed' },
          ].map(({ client, docs, status }, i) => (
            <div className={s.documentRow} key={client} style={{ animationDelay: `${i * 100}ms` }}>
              <span className={s.documentIcon}><FileText size={20} /></span>
              <div>
                <strong>{client}</strong>
                <small>{docs}</small>
              </div>
              <span className={s.pill}>{status}</span>
            </div>
          ))}
        </div>
        <div className={s.extraction}>
          <div>
            <Sparkles size={15} />
            <strong>Organized by client entity & FY</strong>
            <span>Sorted</span>
          </div>
          <p>Clients send documents directly without halting your staff for follow-ups</p>
        </div>
        <div className={s.windowFooter}>
          <FileCheck2 size={14} />
          Clients drop documents into dedicated portals without calling your office
          <ChevronRight size={14} />
        </div>
      </div>
      <div className={s.result}>
        <CheckCheck size={15} />
        Organized client document collection eliminates deadline panics.
      </div>
    </>
  );
}

function CAArticleProductivityPreview() {
  return (
    <>
      <div className={`${s.floatingFile} ${s.fileOne}`}>
        <Users size={14} />5x throughput
      </div>
      <div className={`${s.floatingFile} ${s.fileTwo}`}>
        <Sparkles size={14} />Article review mode
      </div>
      <div className={s.window}>
        <div className={s.windowHeader}>
          <span><Users size={16} />Article assistant review console</span>
          <span className={s.pill}>High speed</span>
        </div>
        <div className={s.documentList}>
          {[
            { article: 'Article: Priya R.', speed: '42 vouchers reviewed & synced to Tally', time: '35 mins' },
            { article: 'Article: Karthik M.', speed: '38 vouchers reviewed & synced to Tally', time: '28 mins' },
            { article: 'Article: Ananya S.', speed: '56 vouchers reviewed & synced to Tally', time: '40 mins' },
          ].map(({ article, speed, time }, i) => (
            <div className={s.documentRow} key={article} style={{ animationDelay: `${i * 100}ms` }}>
              <span className={s.documentIcon}><Users size={20} /></span>
              <div>
                <strong>{article}</strong>
                <small>{speed} · {time}</small>
              </div>
              <Check size={15} />
            </div>
          ))}
        </div>
        <div className={s.reviewNote}>
          <span className={s.reviewDot} />
          <div>
            <strong>From data punchers to data reviewers</strong>
            <p>Articles verify confidence scores and approve vouchers in seconds.</p>
          </div>
          <ChevronRight size={15} />
        </div>
        <div className={s.windowFooter}>
          <FileCheck2 size={14} />
          Articles spend billable hours reviewing pre-extracted vouchers
          <ChevronRight size={14} />
        </div>
      </div>
      <div className={s.result}>
        <CheckCheck size={15} />
        Articles process 5x more client vouchers in the same billable hours.
      </div>
    </>
  );
}

function CAGstr2bPreview() {
  return (
    <>
      <div className={`${s.floatingFile} ${s.fileOne}`}>
        <FileCheck2 size={14} />GSTR-2B auto-match
      </div>
      <div className={`${s.floatingFile} ${s.fileTwo}`}>
        <ShieldCheck size={14} />ITC protected
      </div>
      <div className={s.window}>
        <div className={s.windowHeader}>
          <span><FileCheck2 size={16} />Client ITC audit & GSTR-2B match</span>
          <span className={s.pill}>Audit complete</span>
        </div>
        <div className={s.invoiceSummary}>
          <div>
            <small>Client: Kovai Textiles · GSTR-2B review</small>
            <strong>₹3,42,000<span> ITC audited</span></strong>
          </div>
          <span className={s.documentIcon}><Receipt size={24} /></span>
        </div>
        <div className={s.checkRows}>
          {[
            ['Eligible ITC matched (2B vs Books)', '₹3,18,500 (93.1%) · Reconciled'],
            ['Supplier bill not filed in 2B', '₹23,500 · Notice generated to vendor'],
            ['Tax rate & HSN discrepancies', '0 records · 100% compliant'],
          ].map(([label, status], i) => (
            <div key={label} style={{ animationDelay: `${i * 120}ms` }}>
              <Check size={15} />
              <span>{label}</span>
              <strong>{status}</strong>
            </div>
          ))}
        </div>
        <div className={s.windowFooter}>
          <FileCheck2 size={14} />
          Automated reconciliation flags supplier compliance issues before filing
          <ChevronRight size={14} />
        </div>
      </div>
      <div className={s.result}>
        <ShieldCheck size={15} />
        Instant GSTR-2B matching safeguards client Input Tax Credit.
      </div>
    </>
  );
}

function CAClientAuditPreview() {
  return (
    <>
      <div className={`${s.floatingFile} ${s.fileOne}`}>
        <Layers size={14} />Multi-tenant vault
      </div>
      <div className={`${s.floatingFile} ${s.fileTwo}`}>
        <Archive size={14} />1-Click audit pack
      </div>
      <div className={s.window}>
        <div className={s.windowHeader}>
          <span><Layers size={16} />Multi-company client vault & audit search</span>
          <span className={s.pill}>Audit ready</span>
        </div>
        <div className={s.documentList}>
          {[
            { field: 'Client Entity', value: 'Apex Engineering Pvt Ltd (FY 2025-26)' },
            { field: 'Tax Scrutiny Query', value: 'Voucher PUR-1082 (₹4,80,000 Capital Spares)' },
            { field: 'Attached Source Pack', value: 'Tax Invoice, e-Way Bill, Inspection Note, Ledger Log' },
          ].map(({ field, value }, i) => (
            <div className={s.documentRow} key={field} style={{ animationDelay: `${i * 100}ms` }}>
              <span className={s.documentIcon}><Archive size={20} /></span>
              <div>
                <strong>{field}</strong>
                <small>{value}</small>
              </div>
              <Check size={15} />
            </div>
          ))}
        </div>
        <div className={s.reviewNote}>
          <span className={s.reviewDot} />
          <div>
            <strong>One-click statutory audit pack</strong>
            <p>Export linked source PDFs and approval logs instantly.</p>
          </div>
          <ChevronRight size={15} />
        </div>
        <div className={s.windowFooter}>
          <FileCheck2 size={14} />
          Instant document retrieval saves hours during statutory audits
          <ChevronRight size={14} />
        </div>
      </div>
      <div className={s.result}>
        <ShieldCheck size={15} />
        Immutable audit trails with one-click source document retrieval.
      </div>
    </>
  );
}

/* ==========================================================================
   CONFIG MAPPING PER PERSONA
   ========================================================================== */
interface ChallengeConfig {
  name: string;
  title: string;
  description: string;
  icon: typeof FileSpreadsheet;
  Preview: () => JSX.Element;
}

const personaConfigs: Record<
  PersonaData['slug'],
  {
    eyebrow: string;
    title: string;
    intro: string;
    challenges: ChallengeConfig[];
  }
> = {
  'business-owners': {
    eyebrow: 'THE BUSINESS CHALLENGE',
    title: 'Financial friction shouldn’t\nslow your business down.',
    intro:
      'Running a growing business requires knowing where every rupee is committed before cash leaves your account. See how Docsynecx provides instant executive clarity.',
    challenges: [
      {
        name: 'Closing Blindspots',
        title: 'Flying blind between month-end closes',
        description: 'Crucial purchasing and expenditure figures remain buried in accounting ledgers until your accounts team closes books weeks later.',
        icon: BarChart3,
        Preview: OwnerCashPreview,
      },
      {
        name: 'Rate Variances',
        title: 'Uncontrolled rate variances & repeats',
        description: 'Vendor price hikes, duplicate invoices, and incorrect tax charges slip through because no single system flags historical discrepancies.',
        icon: ShieldAlert,
        Preview: OwnerVariancePreview,
      },
      {
        name: 'Approval Delays',
        title: 'Approval bottlenecks on owner desks',
        description: 'Bills pile up in emails and paper folders awaiting your sign-off without contextual supporting documents or purchase histories.',
        icon: Smartphone,
        Preview: OwnerApprovalPreview,
      },
      {
        name: 'Key Staff Reliance',
        title: 'Reliance on key staff for basic numbers',
        description: 'Simple queries about vendor dues or project expenses require halting your finance team to pull ad-hoc reports from Tally.',
        icon: MessageSquare,
        Preview: OwnerAIPreview,
      },
    ],
  },

  'finance-teams': {
    eyebrow: 'THE BUSINESS CHALLENGE',
    title: 'Invoice workflows shouldn’t\nslow down your finance team.',
    intro:
      'As transaction volumes multiply, manual review routines turn finance teams into paper-pushing bottlenecks. See how Docsynecx automates approval hierarchies and month-end closes.',
    challenges: [
      {
        name: 'Approval Bottlenecks',
        title: 'Chasing managers for approval sign-offs',
        description: 'Unapproved invoices get stuck in departmental inboxes, delaying month-end reporting and missing supplier early-payment discounts.',
        icon: Clock,
        Preview: FinanceApprovalMatrixPreview,
      },
      {
        name: 'Month-End Crunch',
        title: 'Month-end processing crunches',
        description: 'Batches of supplier bills flood in during the final days of the month, forcing late hours of tedious verification and entry.',
        icon: Layers,
        Preview: FinanceBatchCrunchPreview,
      },
      {
        name: 'Scattered Audits',
        title: 'Scattered audit trails and missing documents',
        description: 'Tracking down which manager approved an invoice or where the original tax bill is stored creates stress during internal and statutory audits.',
        icon: ShieldCheck,
        Preview: FinanceAuditTrailPreview,
      },
      {
        name: 'GST Discrepancies',
        title: 'Reconciliation discrepancies and GST mismatches',
        description: 'Discrepancies between physical bills, accounting entries, and GSTR-2B portal filings cause credit blocks and compliance notices.',
        icon: Receipt,
        Preview: FinanceGstMatchPreview,
      },
    ],
  },

  'accounts-teams': {
    eyebrow: 'THE BUSINESS CHALLENGE',
    title: 'Manual data entry shouldn’t\nslow accounts executives down.',
    intro:
      'Typing thousands of numbers and item descriptions line-by-line is slow, stressful, and prone to human error. See how Docsynecx turns manual typing into automated review.',
    challenges: [
      {
        name: 'Manual Retyping',
        title: 'Mind-numbing manual bill retyping',
        description: 'Typing vendor names, dates, invoice numbers, item codes, quantities, and rates from paper or split-screen PDFs into Tally.',
        icon: FileSpreadsheet,
        Preview: AccountsRetypingPreview,
      },
      {
        name: 'Messy Layouts',
        title: 'Messy, rotated, and inconsistent layouts',
        description: 'Every vendor formats their bill differently—some on two pages, some handwritten, and some with complex multi-tier tables.',
        icon: Layers,
        Preview: AccountsLayoutPreview,
      },
      {
        name: 'Tax & HSN Math',
        title: 'Time lost calculating tax splits & HSN',
        description: 'Manually verifying whether SGST+CGST equals 18% or if an interstate transaction requires IGST across dozen-item bills.',
        icon: Receipt,
        Preview: AccountsTaxMathPreview,
      },
      {
        name: 'Duplicate Bills',
        title: 'The nightmare of duplicate bills',
        description: 'Entering a bill that was already received last week via email, causing awkward supplier calls and tedious reversal entries.',
        icon: Copy,
        Preview: AccountsDuplicatePreview,
      },
    ],
  },

  'ca-firms': {
    eyebrow: 'THE BUSINESS CHALLENGE',
    title: 'Client document chaos shouldn’t\noverwhelm your CA practice.',
    intro:
      'From missing client bills to tax season overtime, document processing drains valuable advisory hours from your firm. See how Docsynecx scales client bookkeeping.',
    challenges: [
      {
        name: 'Client Dumps',
        title: 'Clients dumping mixed document batches late',
        description: 'Clients send bagfuls of paper receipts, WhatsApp photo snaps, and chaotic PDF dumps right as GST filing deadlines loom.',
        icon: FolderArchive,
        Preview: CADocumentDumpPreview,
      },
      {
        name: 'Article Entry Grind',
        title: 'Junior staff trapped in endless data entry',
        description: 'Trainees and articles spend 80% of their time manually punching vouchers into Tally instead of auditing, reconciling, and advising.',
        icon: Users,
        Preview: CAArticleProductivityPreview,
      },
      {
        name: '2B & ITC Friction',
        title: 'GSTR-2B mismatch headaches & blocked ITC',
        description: 'Reconciling client purchase records against the GST portal reveals unfiled supplier bills and miscalculated tax values too late.',
        icon: FileCheck2,
        Preview: CAGstr2bPreview,
      },
      {
        name: 'Audit Fragmentation',
        title: 'Audit trail fragmentation across multiple clients',
        description: 'When clients face scrutiny or queries from tax departments, locating the original source bill and ledger justification takes hours.',
        icon: Archive,
        Preview: CAClientAuditPreview,
      },
    ],
  },
};

export function PersonaBusinessChallenge({ persona }: PersonaBusinessChallengeProps) {
  const config = personaConfigs[persona];
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % config.challenges.length;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index + config.challenges.length - 1) % config.challenges.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = config.challenges.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  const [titleLine1, titleLine2] = config.title.split('\n');

  return (
    <section
      className={`${base.section} ${base.alternate} ${s.section}`}
      aria-labelledby={`persona-challenge-title-${persona}`}
      id="business-challenge-workspace"
    >
      <div className="site-shell">
        <div className={s.heading}>
          <p className={`${base.eyebrow} ${s.eyebrow}`}>{config.eyebrow}</p>
          <h2 id={`persona-challenge-title-${persona}`}>
            {titleLine1}
            {titleLine2 && (
              <>
                <br />
                {titleLine2}
              </>
            )}
          </h2>
          <p className={s.intro}>{config.intro}</p>
        </div>
        <div className={s.workspace}>
          <div className={s.steps} role="tablist" aria-label="Explore the operational bottlenecks" aria-orientation="vertical">
            {config.challenges.map(({ name, title, description, icon: Icon }, index) => (
              <button
                key={name}
                type="button"
                role="tab"
                id={`persona-step-${persona}-${index}`}
                aria-controls={`persona-preview-${persona}-${index}`}
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
            {config.challenges.map(({ Preview }, index) => (
              <div
                key={index}
                role="tabpanel"
                id={`persona-preview-${persona}-${index}`}
                aria-labelledby={`persona-step-${persona}-${index}`}
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
