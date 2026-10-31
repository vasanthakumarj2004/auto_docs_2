'use client';

import { useState } from 'react';
import { Check, RotateCcw } from 'lucide-react';
import { DocsynecxLogo } from './DocsynecxLogo';
import { useLandingLayout } from './LandingLayoutProvider';
import styles from './WhatWeDo.module.css';

const steps = [
  {
    title: 'You decide what runs on its own.',
    description: 'Set the rules for your team. Validated invoices and shipments move forward, while approvals and exceptions stay in your hands.',
  },
  {
    title: 'Every document is checked against the others.',
    description: 'Before data reaches CargoWise, Docsynecx cross-checks the invoice, packing list and bill of lading. A weight or carton count that does not match is flagged for review.',
  },
  {
    title: 'Every exception tells you why.',
    description: 'See the exact discrepancy, correct it and move the work forward. Your team has a clear record of what was checked, what changed and who approved it.',
  },
];

const shipments = [
  { id: 'S00418273', service: 'Ocean FCL', route: 'SHA → LAX' },
  { id: 'S00418274', service: 'Air', route: 'FRA → ATL' },
  { id: 'S00418276', service: 'Ocean LCL', route: 'NGB → SAV' },
  { id: 'S00418277', service: 'Ocean FCL', route: 'HCM → LGB' },
];

function SyncedStatus() {
  return <span className={styles.synced}>Synced <Check size={13} strokeWidth={1.6} aria-hidden="true" /></span>;
}

export function WhatWeDo() {
  const { appearance } = useLandingLayout();
  const [resolved, setResolved] = useState(false);

  return (
    <section id="what-we-do" className={styles.section} data-appearance={appearance} aria-labelledby="what-we-do-title">
      <div className={`site-shell ${styles.layout}`}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>What we do</span>
          <h2 id="what-we-do-title">Clean work goes straight through. <span>Anything else waits for you.</span></h2>
          <ol className={styles.steps}>
            {steps.map((step, index) => (
              <li key={step.title}>
                <span className={styles.stepNumber} aria-hidden="true">0{index + 1}</span>
                <div><h3>{step.title}</h3><p>{step.description}</p></div>
              </li>
            ))}
          </ol>
          <p className={styles.takeaway}><strong>Routine work keeps moving.</strong> Your team focuses on the exceptions, with every check and correction in view.</p>
        </div>

        <div className={styles.example}>
          <div className={styles.workbench} role="region" aria-label="Interactive shipment review example">
            <header className={styles.panelHeading}>
              <DocsynecxLogo className={styles.logo} variant="header" />
              <span className={styles.panelLabel}>Shipments · Today</span>
              <span className={styles.syncBadge}>Auto-sync on</span>
            </header>
            <ul className={styles.shipments} aria-label="Synced sample shipments">
              {shipments.map(shipment => (
                <li className={styles.shipmentRow} key={shipment.id}>
                  <span className={styles.shipmentId}>{shipment.id}</span>
                  <span className={styles.shipmentRoute}>{shipment.service} · {shipment.route}</span>
                  <SyncedStatus />
                </li>
              ))}
            </ul>

            <div className={styles.exception} data-resolved={resolved}>
              <div className={styles.shipmentRow}>
                <span className={styles.shipmentId}>S00418275</span>
                <span className={styles.shipmentRoute}>Ocean FCL · BUS → SAV</span>
                {resolved ? <SyncedStatus /> : <span className={styles.reviewStatus}>Needs review</span>}
              </div>
              <div className={styles.exceptionBody}>
                <div className={styles.comparison}>
                  <div className={styles.comparisonHeading} id="shipment-weight-heading">{resolved ? 'Total weight now matches' : 'Total weight does not match'}</div>
                  <table aria-labelledby="shipment-weight-heading">
                    <thead className={styles.srOnly}><tr><th scope="col">Document</th><th scope="col">Total weight</th></tr></thead>
                    <tbody>
                      <tr><th scope="row">Commercial invoice</th><td>14,800 kg</td></tr>
                      <tr><th scope="row">Packing list</th><td>14,800 kg</td></tr>
                      <tr><th scope="row">Bill of lading</th><td className={resolved ? styles.corrected : styles.mismatch}>{resolved ? '14,800 kg' : '8,140 kg'}{resolved && <Check size={12} aria-label="Corrected" />}</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className={styles.resolution}>
                  <p>{resolved ? 'Weight corrected. This sample shipment is now synced.' : 'Two documents agree. Review the third before it moves.'}</p>
                  <button type="button" className={styles.fixButton} onClick={() => setResolved(value => !value)}>
                    {resolved ? <><RotateCcw size={13} aria-hidden="true" />Replay demo</> : 'Fix & push'}
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.activity}>
              <h3>Activity log</h3>
              <ol>
                <li><time>09:41</time><span>Docsynecx · synced S00418277 to CargoWise</span></li>
                <li><time>09:41</time><span>Docsynecx · held S00418275, weight mismatch</span></li>
                {resolved && <li className={styles.newActivity}><time>09:46</time><span>You · corrected weight to 14,800 kg, pushed S00418275</span></li>}
              </ol>
            </div>
          </div>
          <p className={styles.exampleNote}>Interactive example · Sample shipment data</p>
          <p className={styles.srOnly} role="status">{resolved ? 'Sample shipment S00418275 corrected to 14,800 kilograms and synced. Activity log updated.' : 'Sample shipment S00418275 is held for a weight mismatch.'}</p>
        </div>
      </div>
    </section>
  );
}
