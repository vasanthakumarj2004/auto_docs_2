'use client';

import React, { useState } from 'react';
import { 
  ArrowRight, 
  Check, 
  CheckCheck, 
  ChevronDown, 
  Copy, 
  FileCheck2, 
  FileText, 
  History, 
  LockKeyhole, 
  ShieldCheck, 
  Ship, 
  Workflow 
} from 'lucide-react';
import s from './LogisticsDesk.module.css';

const steps = [
  {
    label: 'Booking & BL read',
    icon: Ship,
    title: 'An ocean bill you can review. Not re-key.',
    copy: 'Capture shipper, consignee, container count, port pair and vessel details in one unified view. Your documentation team reviews exceptions before anything moves forward.',
    points: [
      'Carrier BL, container numbers & seal IDs captured',
      'Vessel, voyage and port routing verified',
      'A clean handoff into CargoWise One',
    ],
  },
  {
    label: 'Check weight & packing',
    icon: Copy,
    title: 'Catch discrepancies before the carrier cutoff.',
    copy: 'Reconcile bills of lading against customer packing lists. Surface weight variations, piece count mismatches and container typos before customs filing.',
    points: [
      'Compare gross weight, tare and piece counts',
      'Flag packing list variations exceeding tolerance',
      'Prevent customs holds, demurrage and rolled cargo',
    ],
  },
  {
    label: 'Pre-fill customs',
    icon: FileText,
    title: 'HS code mapping and entry drafting.',
    copy: 'Extract commercial invoice line items and match them against customer tariff profiles. Automatically prepare customs declaration drafts with verified tariff codes.',
    points: [
      'Line-item HS code extraction and validation',
      'Incoterms, currency and duty pre-calculation',
      'One-click export into customs declaration software',
    ],
  },
  {
    label: 'Post to CargoWise',
    icon: Workflow,
    title: 'Native eAdaptor job creation.',
    copy: 'Post reviewed shipment bookings, consolidations, and containers directly into CargoWise One via native XML interfaces. No screen scraping, no extensions.',
    points: [
      'Native eAdaptor XML job posting (#S00038421)',
      'Attached customer emails and original PDF paperwork',
      'Traceable shipment audit sequence with job references',
    ],
  },
];

function ShipmentSummary() {
  return (
    <div className={s.invoiceSummary}>
      <div>
        <span className={s.micro}>HAPAG-LLOYD · HL-9384721</span>
        <strong>Booking #BKG-84920</strong>
        <span>Ocean Import FCL · 2 × 40HC Containers</span>
      </div>
      <div className={s.invoiceAmount}>
        <span>Gross shipment weight</span>
        <strong>24,500<span> KG</span></strong>
      </div>
    </div>
  );
}

export function LogisticsWorkbench() {
  const [active, setActive] = useState(0);
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [approved, setApproved] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);
  const current = steps[active];

  function handleTabKey(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
        ? steps.length - 1
        : (index + (event.key === 'ArrowRight' ? 1 : -1) + steps.length) % steps.length;
    setActive(next);
    document.getElementById(`logistics-tab-${next}`)?.focus();
  }

  return (
    <>
      <div className={s.tabs} role="tablist" aria-label="Explore the Logistics Desk workflow">
        {steps.map(({ label, icon: Icon }, index) => (
          <button
            key={label}
            id={`logistics-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls="logistics-workbench-panel"
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => handleTabKey(event, index)}
          >
            <span className={s.tabNumber}>0{index + 1}</span>
            <Icon size={17} aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div
        className={s.workbenchLayout}
        id="logistics-workbench-panel"
        role="tabpanel"
        aria-labelledby={`logistics-tab-${active}`}
        tabIndex={0}
      >
        <div className={s.workbenchCopy}>
          <span className={s.eyebrow}>ONE CONNECTED WORKFLOW / 0{active + 1}</span>
          <h3>{current.title}</h3>
          <p>{current.copy}</p>
          <ul className={s.checkList}>
            {current.points.map((point) => (
              <li key={point}>
                <Check size={16} aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
          <a href="/#demo" className={s.textLink}>
            See it with your forwarder workflow <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>

        <div className={s.workbenchWindow}>
          <div className={s.windowBar}>
            <span>
              <span className={s.appIcon}>
                <Ship size={16} />
              </span>
              AutoDocs <span className={s.windowDivider}>/</span> Logistics Desk
            </span>
            <span className={s.sampleBadge}>Interactive preview · Sample shipment</span>
          </div>

          <div className={s.previewBody}>
            {/* TAB 0: BL READ & VALIDATE */}
            {active === 0 && (
              <div className={s.panelContent}>
                <div className={s.previewHeading}>
                  <span className={s.micro}>OCEAN BILL OF LADING</span>
                  <span className={s.status}>
                    <CheckCheck size={13} />
                    Document parsed
                  </span>
                </div>
                <ShipmentSummary />
                <div className={s.tableScroll} tabIndex={0} role="region" aria-label="Sample container details">
                  <table className={s.invoiceTable}>
                    <caption className="sr-only">Ocean container line breakdown</caption>
                    <thead>
                      <tr>
                        <th>Container / Seal</th>
                        <th>Packages</th>
                        <th>Weight</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          HLXU-4920194
                          <small>Seal: HL-98214 · 40HC</small>
                        </td>
                        <td>850 CTN</td>
                        <td>14,200 KG</td>
                      </tr>
                      <tr>
                        <td>
                          HLXU-8391024
                          <small>Seal: HL-98215 · 40HC</small>
                        </td>
                        <td>620 CTN</td>
                        <td>10,300 KG</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>Total (2 Containers)</td>
                        <td>1,470 CTN</td>
                        <td>24,500 KG</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div className={s.checkTiles}>
                  <span>
                    <Check size={14} />
                    Container numbers valid
                  </span>
                  <span>
                    <Check size={14} />
                    Port pair matched (JEA → INNSA)
                  </span>
                  <span>
                    <Check size={14} />
                    Consignee entity verified
                  </span>
                </div>
                <div className={s.previewAction}>
                  <span>
                    <FileText size={15} />
                    Original customer email attached
                  </span>
                  <button type="button" onClick={() => setActive(1)}>
                    Inspect weight cross-check <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 1: INTEGRITY CHECK / MISMATCH */}
            {active === 1 && (
              <div className={s.panelContent}>
                <div className={s.previewHeading}>
                  <span className={s.micro}>INTEGRITY AUDIT</span>
                  <span className={s.holdStatus}>
                    <LockKeyhole size={13} />
                    Weight variance
                  </span>
                </div>
                <div className={s.holdBanner}>
                  <ShieldCheck size={24} />
                  <div>
                    <strong>BL ↔ Packing List variance detected.</strong>
                    <p>Gross weight difference of 320 KG exceeds tolerance. Held for forwarder verification.</p>
                  </div>
                </div>
                <div className={s.recordComparison}>
                  {['Carrier Bill of Lading', 'Customer Packing List'].map((label, index) => (
                    <div key={label}>
                      <span className={s.micro}>{label}</span>
                      <FileText size={22} />
                      <strong>{index === 0 ? 'HL-9384721' : 'PL-84920'}</strong>
                      <span>TransWorld Logistics LLC</span>
                      <b>{index === 0 ? '24,500 KG' : '24,180 KG'}</b>
                      <small>{index === 0 ? 'Ocean BL document' : 'Declared packing list (Δ -320 KG)'}</small>
                    </div>
                  ))}
                </div>
                <button
                  className={s.disclosureButton}
                  type="button"
                  aria-expanded={comparisonOpen}
                  aria-controls="logistics-match-details"
                  onClick={() => setComparisonOpen(!comparisonOpen)}
                >
                  Compare matching fields{' '}
                  <ChevronDown
                    size={16}
                    style={{ transform: comparisonOpen ? 'rotate(180deg)' : undefined }}
                  />
                </button>
                {comparisonOpen && (
                  <ul id="logistics-match-details" className={s.matchDetails}>
                    {[
                      { field: 'Shipper Identity', status: 'Exact match' },
                      { field: 'Consignee Entity', status: 'Exact match' },
                      { field: 'Container Numbers', status: '2 / 2 Matched' },
                      { field: 'Weight Tolerance', status: 'Δ -320 KG (Variance)' },
                    ].map(({ field, status }) => (
                      <li key={field}>
                        <span>{field}</span>
                        <span>
                          <Check size={14} />
                          {status}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                <p className={s.previewNote}>Original carrier document stays permanently linked to the exception record.</p>
              </div>
            )}

            {/* TAB 2: HS CODE & CUSTOMS PRE-FILL */}
            {active === 2 && (
              <div className={s.panelContent}>
                <div className={s.previewHeading}>
                  <span className={s.micro}>CUSTOMS TARIFF MAPPING</span>
                  <span className={s.status}>{approved ? 'Draft exported' : 'Ready for review'}</span>
                </div>
                <ShipmentSummary />
                <div className={s.ruleBar}>
                  <FileCheck2 size={16} />
                  <span>Forwarder profile: Auto-map HS 8507.60 for Lithium Battery packs with duty pre-calculation.</span>
                </div>
                <ol className={s.approvalTimeline}>
                  <li data-complete="true">
                    <span className={s.timelineIcon}>
                      <Check size={15} />
                    </span>
                    <div>
                      <strong>Document extraction</strong>
                      <span>Commercial invoice line items & descriptions parsed</span>
                    </div>
                    <small>Checked</small>
                  </li>
                  <li data-complete={approved}>
                    <span className={s.timelineIcon}>{approved ? <Check size={15} /> : '02'}</span>
                    <div>
                      <strong>Tariff validation</strong>
                      <span>
                        {approved
                          ? 'HS codes mapped and verified against customer tariff ledger'
                          : 'Review mapped codes and declared customs value'}
                      </span>
                    </div>
                    <small>{approved ? 'Verified' : 'Your turn'}</small>
                  </li>
                  <li>
                    <span className={s.timelineIcon}>03</span>
                    <div>
                      <strong>Customs declaration pre-fill</strong>
                      <span>{approved ? 'Entry draft ready for CargoWise Customs' : 'Waiting for verification'}</span>
                    </div>
                    <LockKeyhole size={14} />
                  </li>
                </ol>
                <div className={s.approvalActions}>
                  <button
                    type="button"
                    className={s.miniPrimary}
                    onClick={() => (approved ? setActive(3) : setApproved(true))}
                  >
                    {approved ? 'View CargoWise job preview' : 'Approve customs draft'}
                    <ArrowRight size={15} />
                  </button>
                  {approved && (
                    <button type="button" className={s.resetButton} onClick={() => setApproved(false)}>
                      Reset preview
                    </button>
                  )}
                </div>
                <p className={s.previewNote} role="status">
                  {approved
                    ? 'Sample entry updated. Ready for eAdaptor CargoWise XML transfer.'
                    : 'Try the tariff verification workflow using this illustrative shipment.'}
                </p>
              </div>
            )}

            {/* TAB 3: CARGOWISE POSTING */}
            {active === 3 && (
              <div className={s.panelContent}>
                <div className={s.previewHeading}>
                  <span className={s.micro}>CARGOWISE EADAPTOR POSTING</span>
                  <span className={s.status}>
                    <CheckCheck size={13} />
                    Job created
                  </span>
                </div>
                <div className={s.postingSuccess}>
                  <span>
                    <CheckCheck size={27} />
                  </span>
                  <div>
                    <strong>From shipment paperwork to CargoWise job.</strong>
                    <p>
                      Forwarding Job <b>#S00038421</b> · BKG-84920
                    </p>
                  </div>
                </div>
                <div className={s.journal}>
                  <div>
                    <span>Field</span>
                    <span>Document Value</span>
                    <span>CargoWise Mapping</span>
                  </div>
                  <div>
                    <strong>Shipment Type</strong>
                    <span>Ocean Import FCL</span>
                    <span>OIM.FCL.SEA</span>
                  </div>
                  <div>
                    <strong>Routing Pair</strong>
                    <span>JEA → INNSA</span>
                    <span>AEJEA / INNSA</span>
                  </div>
                  <div>
                    <strong>Containers</strong>
                    <span>2 × 40HC</span>
                    <span>HLXU4920194, HLXU8391024</span>
                  </div>
                  <div>
                    <strong>Job Status</strong>
                    <b>Created & Linked</b>
                    <b>eAdaptor Synced</b>
                  </div>
                </div>
                <button
                  className={s.disclosureButton}
                  type="button"
                  aria-expanded={auditOpen}
                  aria-controls="logistics-audit-details"
                  onClick={() => setAuditOpen(!auditOpen)}
                >
                  <span>
                    <History size={16} />
                    {auditOpen ? 'Hide audit trail' : 'Show audit trail'}
                  </span>
                  <ChevronDown
                    size={16}
                    style={{ transform: auditOpen ? 'rotate(180deg)' : undefined }}
                  />
                </button>
                {auditOpen && (
                  <ol id="logistics-audit-details" className={s.auditTrail}>
                    <li>
                      <span>10:42</span> Booking email & carrier BL parsed from Outlook
                    </li>
                    <li>
                      <span>10:43</span> Weight delta confirmed within customer threshold; customs pre-filled
                    </li>
                    <li>
                      <span>10:44</span> Native eAdaptor XML created CargoWise Job #S00038421
                    </li>
                  </ol>
                )}
                <p className={s.previewNote}>Illustrative posting. Native eAdaptor XML connects securely to your live CargoWise database.</p>
              </div>
            )}
          </div>

          <div className={s.windowFooter}>
            <ShieldCheck size={13} />
            <span>Your forwarding rules. Zero coordinate templates. Native eAdaptor sync.</span>
            <span>0{active + 1} / 04</span>
          </div>
        </div>
      </div>
    </>
  );
}
