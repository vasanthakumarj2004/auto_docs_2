'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import {
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  CheckCheck,
  ChevronRight,
  FileCheck2,
  FileText,
  Inbox,
  Layers,
  Navigation,
  ShieldCheck,
} from 'lucide-react';
import base from '../LandingPage.module.css';
import s from './LogisticsWorkflow.module.css';

const steps = [
  {
    name: 'Enquiry',
    description: 'Capture freight requirements directly from emails, PDFs and packing lists.',
    icon: Inbox,
    heading: 'Your freight enquiry inbox',
    label: '3 sample RFQs',
  },
  {
    name: 'Quotation',
    description: 'Source carrier spot tariffs, apply margin safeguards and issue customer quotes.',
    icon: BarChart3,
    heading: 'Review margin & carrier options',
    label: 'QUOTE-7201',
  },
  {
    name: 'Operations',
    description: 'Create forwarding jobs, verify bills of lading and hand off confirmed bookings to CargoWise.',
    icon: Building2,
    heading: 'From accepted quote to CargoWise',
    label: 'CargoWise One',
  },
  {
    name: 'Visibility',
    description: 'Monitor ocean and road milestones in real time with automatic exception alerts.',
    icon: Navigation,
    heading: 'Milestone telemetry & tracking',
    label: 'Active shipments',
  },
];

function EnquiryView() {
  return (
    <>
      <div className={s.summary}>
        <span className={s.summaryIcon}>
          <Inbox size={22} />
        </span>
        <div>
          <strong>One inbox for customer freight RFQs</strong>
          <p>Emails, packing lists & rate requests</p>
        </div>
      </div>
      <div className={s.invoiceList}>
        {[
          ['Pacific Ocean Forwarding', 'CNSHA → INNSA · 2x40\' HC', '$2,420'],
          ['Apex Global Logistics', 'SGSIN → AEJEA · 1x20\' GP', '$1,350'],
          ['EuroFreight Continental', 'DEHAM → USNYC · 4 Pallets', '$890'],
        ].map(([name, reference, amount]) => (
          <div key={name}>
            <FileText size={17} />
            <div>
              <strong>{name}</strong>
              <small>{reference}</small>
            </div>
            <span>
              {amount}
              <small>
                <Check size={10} />
                Captured
              </small>
            </span>
          </div>
        ))}
      </div>
      <div className={s.note}>
        <FileCheck2 size={14} />
        <span>Cargo specs, destination ports and equipment ready for rate review.</span>
      </div>
    </>
  );
}

function QuotationView() {
  return (
    <>
      <div className={s.reviewHeading}>
        <div>
          <small>Pacific Ocean Forwarding · QUOTE-7201</small>
          <strong>
            $2,850<span>.00</span>
          </strong>
        </div>
        <span className={s.badge}>Margin checks</span>
      </div>
      <div className={s.checks}>
        {[
          ['Carrier spot rates', 'Maersk Line confirmed ($2,420)'],
          ['Margin safeguard (+12%)', 'Applied (+$290 margin)'],
          ['Transit schedule', '18 Days direct ocean'],
        ].map(([label, status]) => (
          <div key={label}>
            <span>
              <Check size={13} />
            </span>
            <strong>{label}</strong>
            <small>{status}</small>
          </div>
        ))}
      </div>
      <div className={`${s.note} ${s.accentNote}`}>
        <ShieldCheck size={17} />
        <div>
          <strong>Your operators maintain commercial control.</strong>
          <p>Review rate spread and confirm margin before sending quote.</p>
        </div>
      </div>
    </>
  );
}

function OperationsView() {
  return (
    <>
      <div className={s.mappingHeader}>
        <span>
          <FileCheck2 size={15} />
          Confirmed quote
        </span>
        <ArrowRight size={14} />
        <span>
          <Building2 size={15} />
          CargoWise One
        </span>
      </div>
      <dl className={s.ledger}>
        <div>
          <dt>Origin Port</dt>
          <dd>CNSHA (Shanghai Terminal)</dd>
        </div>
        <div>
          <dt>Destination Port</dt>
          <dd>INNSA (Nhava Sheva)</dd>
        </div>
        <div>
          <dt>Bill of Lading</dt>
          <dd>Verified (B/L #MSK-92810)</dd>
        </div>
        <div>
          <dt>Forwarding Job</dt>
          <dd>CW-88219 (Auto-created)</dd>
        </div>
      </dl>
      <div className={s.posted}>
        <span>
          <CheckCheck size={23} />
        </span>
        <div>
          <strong>Forwarding job created in CargoWise</strong>
          <p>CW-88219 · All trade documents linked</p>
        </div>
        <Check size={16} />
      </div>
      <div className={s.note}>
        <Layers size={14} />
        <span>Keep quote acceptance, trade documents and CargoWise in sync.</span>
      </div>
    </>
  );
}

function VisibilityView() {
  return (
    <>
      <div className={s.metrics}>
        <div>
          <small>Active shipments</small>
          <strong>42</strong>
          <span>Across 6 trade lanes</span>
        </div>
        <div>
          <small>Milestone alerts</small>
          <strong>00</strong>
          <span>All shipments on schedule</span>
        </div>
      </div>
      <div className={s.chart}>
        <div>
          <strong>Weekly shipment throughput</strong>
          <span>This month</span>
        </div>
        <div
          className={s.bars}
          role="img"
          aria-label="Illustrative shipment milestones: week one 18, week two 26, week three 24, week four 42 shipments."
        >
          {[45, 68, 60, 100].map((height, index) => (
            <div key={index}>
              <div style={{ height: `${height}%` }}>
                <span>{['18', '26', '24', '42'][index]}</span>
              </div>
              <small>W{index + 1}</small>
            </div>
          ))}
        </div>
      </div>
      <div className={s.note}>
        <FileText size={14} />
        <span>Follow each shipment milestone back to underlying carrier telemetry.</span>
      </div>
    </>
  );
}

const views = [EnquiryView, QuotationView, OperationsView, VisibilityView];

export function LogisticsWorkflow() {
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
    <section id="freight-operating-workflow" className={`${base.section} ${s.section}`} aria-labelledby="logistics-workflow-title">
      <div className="site-shell">
        <div className={s.heading}>
          <p className={`${base.eyebrow} ${s.eyebrow}`}>FREIGHT OPERATING WORKFLOW</p>
          <h2 id="logistics-workflow-title">
            Enquiry. Quotation.<br />
            <span>Operations. Visibility.</span>
          </h2>
          <p className={s.intro}>
            Follow a freight shipment from initial customer enquiry to destination delivery. Every step keeps your operators in control, your data verified, and your customers informed.
          </p>
        </div>
        <div className={s.layout}>
          <div className={s.tabs} role="tablist" aria-label="Logistics workflow stages" aria-orientation="vertical">
            {steps.map(({ name, description }, index) => (
              <button
                type="button"
                role="tab"
                key={name}
                className={s.tab}
                id={`workflow-tab-${index}`}
                aria-controls={`workflow-panel-${index}`}
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
                  <i />
                  <i />
                  <i />
                </span>
                <span>
                  Logistics Desk <span className={s.slash}>/</span> Workflow
                </span>
                <span className={s.windowStatus}>
                  <i />
                  Product preview
                </span>
              </div>
              <div className={s.windowBody}>
                <div className={s.sidebar} aria-hidden="true">
                  <span className={s.sidebarLabel}>WORKSPACE</span>
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
                      id={`workflow-panel-${index}`}
                      aria-labelledby={`workflow-tab-${index}`}
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
              <span>Illustrative product view · Sample freight data</span>
              <span>0{active + 1} / 04</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
