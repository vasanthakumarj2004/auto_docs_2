'use client';

import React, { useState } from 'react';
import { ArrowRight, Check, CheckCheck, ChevronDown, Copy, FileCheck2, FileText, History, LockKeyhole, ShieldCheck, Users, Workflow } from 'lucide-react';
import s from './FinanceDesk.module.css';

const steps = [
  { label: 'Read & validate', icon: FileCheck2, title: 'A bill you can review. Not retype.', copy: 'Bring the invoice, line items and tax checks into one view. Your team reviews the details before anything moves forward.', points: ['Line items and HSN codes together', 'Tax calculations visible for review', 'A clear handoff to the next check'] },
  { label: 'Catch duplicates', icon: Copy, title: 'Catch the repeat before the payment.', copy: 'Compare a new bill with existing vendor records. Keep a possible duplicate on hold until someone has reviewed the match.', points: ['Compare vendor, invoice number and amount', 'See the earlier posting alongside the new bill', 'Keep the reason for the hold visible'] },
  { label: 'Route approvals', icon: Users, title: 'The right person. The right decision.', copy: 'Give approvers the bill and its checks in context. Keep the approval decision attached to the record, instead of buried in a message.', points: ['Approval rules by amount and vendor', 'A visible owner at each stage', 'A recorded decision before payment'] },
  { label: 'Post to Tally', icon: Workflow, title: 'Close the loop in your books.', copy: 'Carry the reviewed bill into a Tally voucher, with its ledger mapping and reference intact. Follow the record from source to posting.', points: ['Purchase and tax ledger mapping', 'Voucher reference alongside the original bill', 'A traceable sequence of checks and decisions'] },
];

function InvoiceSummary() {
  return <div className={s.invoiceSummary}>
    <div><span className={s.micro}>PRIME COMPONENTS PVT LTD</span><strong>Invoice INV-4821</strong><span>Purchase of components · INR</span></div>
    <div className={s.invoiceAmount}><span>Invoice total</span><strong>₹74,045.00</strong></div>
  </div>;
}

export function FinanceWorkbench() {
  const [active, setActive] = useState(0);
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [approved, setApproved] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);
  const current = steps[active];

  function handleTabKey(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? steps.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + steps.length) % steps.length;
    setActive(next);
    document.getElementById(`finance-tab-${next}`)?.focus();
  }

  return <>
    <div className={s.tabs} role="tablist" aria-label="Explore the Finance Desk workflow">
      {steps.map(({ label, icon: Icon }, index) => <button key={label} id={`finance-tab-${index}`} type="button" role="tab" aria-selected={active === index} aria-controls="finance-workbench-panel" tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={(event) => handleTabKey(event, index)}>
        <span className={s.tabNumber}>0{index + 1}</span><Icon size={17} aria-hidden="true" /><span>{label}</span>
      </button>)}
    </div>

    <div className={s.workbenchLayout} id="finance-workbench-panel" role="tabpanel" aria-labelledby={`finance-tab-${active}`} tabIndex={0}>
      <div className={s.workbenchCopy}>
        <span className={s.eyebrow}>ONE CONNECTED WORKFLOW / 0{active + 1}</span>
        <h3>{current.title}</h3>
        <p>{current.copy}</p>
        <ul className={s.checkList}>{current.points.map((point) => <li key={point}><Check size={16} aria-hidden="true" />{point}</li>)}</ul>
        <a href="/#demo" className={s.textLink}>See it with your workflow <ArrowRight size={16} aria-hidden="true" /></a>
      </div>

      <div className={s.workbenchWindow}>
        <div className={s.windowBar}><span><span className={s.appIcon}><FileCheck2 size={16} /></span>AutoDocs <span className={s.windowDivider}>/</span> Finance Desk</span><span className={s.sampleBadge}>Interactive preview · Sample data</span></div>
        <div className={s.previewBody}>
          {active === 0 && <div className={s.panelContent}>
            <div className={s.previewHeading}><span className={s.micro}>BILL REVIEW</span><span className={s.status}><CheckCheck size={13} />Checks complete</span></div>
            <InvoiceSummary />
            <div className={s.tableScroll} tabIndex={0} role="region" aria-label="Sample invoice line items">
              <table className={s.invoiceTable}><caption className="sr-only">Sample invoice with 18% IGST</caption><thead><tr><th>Item / HSN</th><th>Taxable</th><th>IGST · 18%</th></tr></thead><tbody>
                <tr><td>Lithium Cell 21700<small>HSN 850760</small></td><td>₹52,000.00</td><td>₹9,360.00</td></tr>
                <tr><td>BMS Controller 48V<small>HSN 850440</small></td><td>₹10,750.00</td><td>₹1,935.00</td></tr>
              </tbody><tfoot><tr><td>Total</td><td>₹62,750.00</td><td>₹11,295.00</td></tr></tfoot></table>
            </div>
            <div className={s.checkTiles}><span><Check size={14} />Line items captured</span><span><Check size={14} />Tax totals matched</span><span><Check size={14} />Ledger suggested</span></div>
            <div className={s.previewAction}><span><FileText size={15} />Source document attached</span><button type="button" onClick={() => setActive(1)}>Explore duplicate checks <ArrowRight size={14} /></button></div>
          </div>}

          {active === 1 && <div className={s.panelContent}>
            <div className={s.previewHeading}><span className={s.micro}>DUPLICATE REVIEW</span><span className={s.holdStatus}><LockKeyhole size={13} />On hold</span></div>
            <div className={s.holdBanner}><ShieldCheck size={24} /><div><strong>A matching bill already exists.</strong><p>This sample bill is held for review. No second payment is created.</p></div></div>
            <div className={s.recordComparison}>{['Incoming bill', 'Previously posted'].map((label, index) => <div key={label}><span className={s.micro}>{label}</span><FileText size={22} /><strong>INV-4821</strong><span>Prime Components Pvt Ltd</span><b>₹74,045.00</b><small>{index === 0 ? 'Received in the inbox' : 'Tally voucher PUR-829'}</small></div>)}</div>
            <button className={s.disclosureButton} type="button" aria-expanded={comparisonOpen} aria-controls="finance-match-details" onClick={() => setComparisonOpen(!comparisonOpen)}>Compare matching fields <ChevronDown size={16} style={{ transform: comparisonOpen ? 'rotate(180deg)' : undefined }} /></button>
            {comparisonOpen && <ul id="finance-match-details" className={s.matchDetails}>{['Vendor identity', 'Invoice number', 'Invoice total'].map((item) => <li key={item}><span>{item}</span><span><Check size={14} />Exact match</span></li>)}</ul>}
            <p className={s.previewNote}>The original posting stays linked to the review record.</p>
          </div>}

          {active === 2 && <div className={s.panelContent}>
            <div className={s.previewHeading}><span className={s.micro}>APPROVAL ROUTE</span><span className={s.status}>{approved ? 'Approved in preview' : 'Awaiting review'}</span></div>
            <InvoiceSummary />
            <div className={s.ruleBar}><Users size={16} /><span>Sample rule: bills above ₹50,000 require finance approval.</span></div>
            <ol className={s.approvalTimeline}>
              <li data-complete="true"><span className={s.timelineIcon}><Check size={15} /></span><div><strong>Accounts team</strong><span>Invoice and tax checks completed</span></div><small>Checked</small></li>
              <li data-complete={approved}><span className={s.timelineIcon}>{approved ? <Check size={15} /> : '02'}</span><div><strong>Finance approver</strong><span>{approved ? 'Sample approval recorded in the audit trail' : 'Review the bill and supporting checks'}</span></div><small>{approved ? 'Approved' : 'Your turn'}</small></li>
              <li><span className={s.timelineIcon}>03</span><div><strong>Payment handoff</strong><span>{approved ? 'Ready for the authorized payment process' : 'Waiting for approval'}</span></div><LockKeyhole size={14} /></li>
            </ol>
            <div className={s.approvalActions}><button type="button" className={s.miniPrimary} onClick={() => approved ? setActive(3) : setApproved(true)}>{approved ? 'View posting preview' : 'Approve sample bill'}<ArrowRight size={15} /></button>{approved && <button type="button" className={s.resetButton} onClick={() => setApproved(false)}>Reset preview</button>}</div>
            <p className={s.previewNote} role="status">{approved ? 'Preview updated. No payment or accounting entry was made.' : 'Try the approval flow using this illustrative record.'}</p>
          </div>}

          {active === 3 && <div className={s.panelContent}>
            <div className={s.previewHeading}><span className={s.micro}>TALLYPRIME POSTING</span><span className={s.status}><CheckCheck size={13} />Sample voucher</span></div>
            <div className={s.postingSuccess}><span><CheckCheck size={27} /></span><div><strong>From approved bill to voucher.</strong><p>Purchase voucher <b>PUR-829</b> · INV-4821</p></div></div>
            <div className={s.journal}><div><span>Ledger</span><span>Debit</span><span>Credit</span></div><div><strong>Purchase — components</strong><span>₹62,750</span><span>—</span></div><div><strong>Input IGST</strong><span>₹11,295</span><span>—</span></div><div><strong>Prime Components</strong><span>—</span><span>₹74,045</span></div><div><strong>Balanced entry</strong><b>₹74,045</b><b>₹74,045</b></div></div>
            <button className={s.disclosureButton} type="button" aria-expanded={auditOpen} aria-controls="finance-audit-details" onClick={() => setAuditOpen(!auditOpen)}><span><History size={16} />{auditOpen ? 'Hide audit trail' : 'Show audit trail'}</span><ChevronDown size={16} style={{ transform: auditOpen ? 'rotate(180deg)' : undefined }} /></button>
            {auditOpen && <ol id="finance-audit-details" className={s.auditTrail}><li><span>10:42</span>Bill received and fields captured</li><li><span>10:43</span>Checks completed; approval recorded</li><li><span>10:44</span>Voucher reference linked to source bill</li></ol>}
            <p className={s.previewNote}>Illustrative posting. No live Tally connection is used in this preview.</p>
          </div>}
        </div>
        <div className={s.windowFooter}><ShieldCheck size={13} /><span>Your rules. Your approvals. One connected record.</span><span>0{active + 1} / 04</span></div>
      </div>
    </div>
  </>;
}
