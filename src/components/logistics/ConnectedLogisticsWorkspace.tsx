'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import {
  ArrowDownLeft,
  ArrowUpRight,
  BarChart3,
  Check,
  CheckCheck,
  ChevronRight,
  FileCheck2,
  FileText,
  Inbox,
  Mail,
  Navigation,
  PackageCheck,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import base from '../LandingPage.module.css';
import s from './ConnectedLogisticsWorkspace.module.css';

const steps = [
  {
    name: 'Enquiry',
    title: 'Capture customer requirements from email.',
    description: 'Move freight enquiries from inbox to quotation. Read cargo details, volumes, weights and destination ports without manual typing.',
    icon: Inbox,
  },
  {
    name: 'Quotation',
    title: 'Gather vendor rates & compare options.',
    description: 'Compare carrier options side-by-side, apply margin rules, and generate competitive customer quotations in minutes.',
    icon: BarChart3,
  },
  {
    name: 'Operations',
    title: 'Book shipments & validate trade documents.',
    description: 'Support the operational handoff from accepted quote to shipment job. Extract bills of lading, verify container seals and sync to CargoWise.',
    icon: PackageCheck,
  },
  {
    name: 'Visibility',
    title: 'Real-time milestones & margin insight.',
    description: 'Track ocean and road movements, receive automated exception alerts, and build a clearer view of shipment profitability.',
    icon: Navigation,
  },
];

function EnquiryPreview() {
  return (
    <>
      <div className={`${s.floatingFile} ${s.fileOne}`}>
        <FileText size={14} />
        Packing_List.pdf
      </div>
      <div className={`${s.floatingFile} ${s.fileTwo}`}>
        <Mail size={14} />
        Shipper RFQ email
      </div>
      <div className={s.window}>
        <div className={s.windowHeader}>
          <span>
            <Inbox size={16} />
            Freight enquiry inbox
          </span>
          <span className={s.pill}>3 enquiries</span>
        </div>
        <div className={s.documentList}>
          {[
            { name: 'Pacific Ocean Forwarding', detail: 'CNSHA → INNSA · 2x40\' HC · 24,500 kg' },
            { name: 'Apex Global Logistics', detail: 'SGSIN → AEJEA · 1x20\' GP · 12,200 kg' },
            { name: 'EuroFreight Continental', detail: 'DEHAM → USNYC · 4 Pallets · 1,850 kg' },
          ].map((item, i) => (
            <div className={s.documentRow} key={item.name} style={{ animationDelay: `${i * 100}ms` }}>
              <span className={s.documentIcon}>
                <FileText size={20} />
              </span>
              <div>
                <strong>{item.name}</strong>
                <small>{item.detail}</small>
              </div>
              <Check size={15} />
            </div>
          ))}
        </div>
        <div className={s.extraction}>
          <div>
            <Sparkles size={15} />
            <strong>Cargo & voyage specs captured</strong>
            <span>Complete</span>
          </div>
          <div className={s.progress}>
            <span />
          </div>
          <p>Ports · Equipment · Volume · Gross Weight · HS Codes</p>
        </div>
        <div className={s.windowFooter}>
          <FileCheck2 size={14} />
          Ready for carrier rate comparison
          <ChevronRight size={14} />
        </div>
      </div>
      <div className={s.result}>
        <CheckCheck size={15} />
        Less retyping. Turn customer RFQs into structured quotes in minutes.
      </div>
    </>
  );
}

function QuotationPreview() {
  return (
    <>
      <div className={`${s.floatingFile} ${s.fileOne}`}>
        <FileText size={14} />
        Spot tariffs linked
      </div>
      <div className={s.window}>
        <div className={s.windowHeader}>
          <span>
            <BarChart3 size={16} />
            Carrier rate comparison
          </span>
          <span className={s.pill}>QUOTE-7201</span>
        </div>
        <div className={s.invoiceSummary}>
          <div>
            <small>Target sell quotation · 2x40&apos; HC</small>
            <strong>$2,850<span>.00</span></strong>
          </div>
          <span className={s.documentIcon}>
            <FileCheck2 size={26} />
          </span>
        </div>
        <div className={s.checkRows}>
          {[
            ['Maersk Line spot tariff (CNSHA → INNSA)', '$2,420 (Confirmed)'],
            ['Commercial margin rule (+12%)', '+$290 (Applied)'],
            ['Transit schedule (Direct ocean)', '18 Days (Verified)'],
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
            <strong>Commercial margin safeguards active</strong>
            <p>Approve final operator margin before dispatching to client.</p>
          </div>
          <ChevronRight size={15} />
        </div>
      </div>
      <div className={s.result}>
        <BarChart3 size={15} />
        Compare ocean & air options. Protect every shipment margin.
      </div>
    </>
  );
}

function OperationsPreview() {
  return (
    <>
      <div className={`${s.floatingFile} ${s.fileTwo}`}>
        <PackageCheck size={14} />
        CargoWise One linked
      </div>
      <div className={s.window}>
        <div className={s.windowHeader}>
          <span>
            <PackageCheck size={16} />
            Shipment ops & trade docs
          </span>
          <span className={s.pill}>BOOK-9042</span>
        </div>
        <div className={s.metrics}>
          <div>
            <small>Master B/L</small>
            <strong>Verified</strong>
            <span>100% matched to manifest</span>
          </div>
          <div>
            <small>Container Seals</small>
            <strong>Matched</strong>
            <span>2 of 2 units verified</span>
          </div>
        </div>
        <div className={s.checkRows}>
          {[
            ['Bill of Lading verification', 'No discrepancies'],
            ['CargoWise One job creation', 'Job #CW-88219 (Synced)'],
            ['Port Gate-In & shipping bill', 'Cleared for loading'],
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
          Zero retyping · Synchronized with CargoWise One
          <ChevronRight size={14} />
        </div>
      </div>
      <div className={s.result}>
        <ShieldCheck size={15} />
        Direct operational handoff from accepted quotation to job.
      </div>
    </>
  );
}

function VisibilityPreview() {
  return (
    <>
      <div className={`${s.floatingFile} ${s.fileOne}`}>
        <Navigation size={14} />
        Live AIS Telemetry
      </div>
      <div className={s.window}>
        <div className={s.windowHeader}>
          <span>
            <Navigation size={16} />
            Milestone telemetry & tracking
          </span>
          <span className={s.pill}>Live Tracking</span>
        </div>
        <div className={s.insight}>
          <span className={s.documentIcon}>
            <Navigation size={22} />
          </span>
          <div>
            <small>VESSEL: MSC OSCAR · VOY 2408</small>
            <strong>En route: Shanghai → Nhava Sheva</strong>
            <p>Estimated arrival Nov 04, 2026 · Ocean leg 64% complete.</p>
          </div>
        </div>
        <div className={s.reportRows}>
          {[
            ['Container MSKU-9182390', 'At Sea · On schedule for port gate-in'],
            ['Customer milestone portal', 'Live link active · 0 exception alerts'],
            ['Destination customs clearance', 'Pre-filing complete · Nov 06 delivery'],
          ].map(([title, copy], i) => (
            <div key={title} style={{ animationDelay: `${i * 100}ms` }}>
              <FileText size={16} />
              <div>
                <strong>{title}</strong>
                <small>{copy}</small>
              </div>
              <ArrowUpRight size={15} />
            </div>
          ))}
        </div>
        <div className={s.windowFooter}>
          <CheckCheck size={14} />
          Proactive milestone updates sent to customer
          <ChevronRight size={14} />
        </div>
      </div>
      <div className={s.result}>
        <Sparkles size={15} />
        Real-time container tracking with automated customer alerts.
      </div>
    </>
  );
}

const previews = [EnquiryPreview, QuotationPreview, OperationsPreview, VisibilityPreview];

export function ConnectedLogisticsWorkspace() {
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
      aria-labelledby="connected-logistics-title"
      id="connected-logistics-workspace"
    >
      <div className="site-shell">
        <div className={s.heading}>
          <p className={`${base.eyebrow} ${s.eyebrow}`}>ONE CONNECTED FREIGHT WORKFLOW</p>
          <h2 id="connected-logistics-title">
            From customer enquiry<br /><span>to shipment visibility.</span>
          </h2>
          <p className={s.intro}>
            Freight forwarding teams need more than disconnected spreadsheets. Link customer enquiries, vendor rates, quotations, bookings, shipment documents and tracking through one intelligent operating platform.
          </p>
        </div>

        <div className={s.workspace}>
          {/* Left Step Selector */}
          <div
            className={s.steps}
            role="tablist"
            aria-label="Explore the freight forwarding workflow"
            aria-orientation="vertical"
          >
            {steps.map(({ name, title, description, icon: Icon }, index) => (
              <button
                key={name}
                type="button"
                role="tab"
                id={`logistics-step-${index}`}
                aria-controls={`logistics-preview-${index}`}
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
                    <Icon size={14} aria-hidden="true" />
                    {name}
                  </span>
                  <strong>{title}</strong>
                  <span className={s.description}>{description}</span>
                </span>
                <ChevronRight className={s.stepArrow} size={16} aria-hidden="true" />
              </button>
            ))}
          </div>

          {/* Right Visual Flow Showcase with White BG Cards matching Finance Desk */}
          <div className={s.stage}>
            <div className={s.glow} aria-hidden="true" />
            {previews.map((Preview, index) => (
              <div
                key={index}
                role="tabpanel"
                id={`logistics-preview-${index}`}
                aria-labelledby={`logistics-step-${index}`}
                hidden={active !== index}
                tabIndex={0}
                className={s.preview}
              >
                {active === index && <Preview />}
              </div>
            ))}
            <p className={s.caption}>
              <span>ILLUSTRATIVE PRODUCT VIEW</span>
              <span>0{active + 1} / 04</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
