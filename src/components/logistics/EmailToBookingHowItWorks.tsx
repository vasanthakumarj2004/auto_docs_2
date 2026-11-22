'use client';

import React, { useRef, useState, type KeyboardEvent } from 'react';
import {
  Mail,
  Sparkles,
  Layers,
  CheckCircle2,
  ChevronRight,
  FileText,
  Ship,
  TrendingUp,
  FileCheck2,
  Check,
  CheckCheck,
  Plane,
  Anchor,
  Laptop,
  Boxes,
  type LucideIcon,
} from 'lucide-react';
import s from './EmailToBookingHowItWorks.module.css';

interface WorkflowStep {
  name: string;
  stepNumber: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const steps: WorkflowStep[] = [
  {
    stepNumber: '01',
    name: 'Enquiry Arrival',
    title: 'Customer enquiry arrives by email.',
    description: 'Information moves to the next stage with visibility and review checkpoints.',
    icon: Mail,
  },
  {
    stepNumber: '02',
    name: 'AI RFQ Preparation',
    title: 'AI reads details and prepares vendor RFQs.',
    description: 'Information moves to the next stage with visibility and review checkpoints.',
    icon: Sparkles,
  },
  {
    stepNumber: '03',
    name: 'Rate Comparison & Quote',
    title: 'Rates are compared and a quote is prepared.',
    description: 'Information moves to the next stage with visibility and review checkpoints.',
    icon: Layers,
  },
  {
    stepNumber: '04',
    name: 'Booking & Handoff',
    title: 'Customer confirmation is received and booking is coordinated.',
    description: 'Information moves to the next stage with visibility and review checkpoints.',
    icon: CheckCircle2,
  },
];

/* Step 1 Preview: Enquiry Arrival */
function Step1Preview() {
  return (
    <>
      <div className={`${s.floatingChip} ${s.chipTopRight}`}>
        <FileText size={14} />
        <span>Packing_List.pdf</span>
      </div>
      <div className={`${s.floatingChip} ${s.chipTopLeft}`}>
        <Mail size={14} />
        <span>Inbound Customer Email</span>
      </div>

      <div className={s.window}>
        <div className={s.windowHeader}>
          <span>
            <Mail size={16} />
            Customer Enquiry Intake
          </span>
          <span className={s.pill}>Automated Parsing</span>
        </div>

        <div className={s.imageBanner}>
          <img
            src="/images/industry-logistics.jpg"
            alt="Multi-modal Logistics Intake"
            className={s.bannerImg}
            width={860}
            height={353}
            loading="lazy"
            decoding="async"
          />
          <div className={s.bannerOverlay}>
            <span className={s.bannerTag}>
              <Plane size={13} /> Air &amp; Ocean Freight Intake
            </span>
          </div>
        </div>

        <div className={s.documentList}>
          <div className={s.documentRow}>
            <span className={s.documentIcon}>
              <FileText size={18} />
            </span>
            <div>
              <strong>Prime Importers Ltd · RFQ Ingestion</strong>
              <small>Enquiry for 2x40&apos; HC Shanghai (CNSHA) → Rotterdam (NLRTM)</small>
            </div>
            <Check size={16} />
          </div>

          <div className={s.documentRow}>
            <span className={s.documentIcon}>
              <Boxes size={18} />
            </span>
            <div>
              <strong>Cargo Specification Extracted</strong>
              <small>Auto Parts · 24,500 kg · Ready date: Nov 18 · Non-hazardous</small>
            </div>
            <Check size={16} />
          </div>
        </div>

        <div className={s.extraction}>
          <div className={s.extractionHeader}>
            <Sparkles size={14} />
            <strong>AI detail extraction complete</strong>
            <span>Review Ready</span>
          </div>
          <div className={s.progress}>
            <span className={s.progressBar} />
          </div>
          <p>Origin · Destination · Equipment (40&apos; HC) · Commodity · Target sailing</p>
        </div>

        <div className={s.windowFooter}>
          <FileCheck2 size={14} />
          <span>Information moves to the next stage with visibility and review checkpoints.</span>
          <ChevronRight size={14} />
        </div>
      </div>

      <div className={s.result}>
        <CheckCheck size={16} />
        <span>Automated customer enquiry parsing with zero manual retyping.</span>
      </div>
    </>
  );
}

/* Step 2 Preview: Vendor RFQ Prep */
function Step2Preview() {
  return (
    <>
      <div className={`${s.floatingChip} ${s.chipTopRight}`}>
        <Ship size={14} />
        <span>4 Carrier RFQs</span>
      </div>
      <div className={`${s.floatingChip} ${s.chipTopLeft}`}>
        <Sparkles size={14} />
        <span>Standard Template</span>
      </div>

      <div className={s.window}>
        <div className={s.windowHeader}>
          <span>
            <Sparkles size={16} />
            Vendor RFQ Preparation
          </span>
          <span className={s.pill}>Carriers Selected</span>
        </div>

        <div className={s.imageBanner}>
          <img
            src="/images/hero-collage/ind-logistics-3.jpg"
            alt="Container Ship & Harbor Cranes"
            className={s.bannerImg}
            width={800}
            height={533}
            loading="lazy"
            decoding="async"
          />
          <div className={s.bannerOverlay}>
            <span className={s.bannerTag}>
              <Anchor size={13} /> Ocean Carrier Network Dispatch
            </span>
          </div>
        </div>

        <div className={s.documentList}>
          <div className={s.documentRow}>
            <span className={s.documentIcon}>
              <Ship size={18} />
            </span>
            <div>
              <strong>Maersk Line · FCL 40&apos; HC</strong>
              <small>Shanghai → Rotterdam · Configured template RFQ applied</small>
            </div>
            <span className={s.pill}>Prepared</span>
          </div>

          <div className={s.documentRow}>
            <span className={s.documentIcon}>
              <Ship size={18} />
            </span>
            <div>
              <strong>MSC Mediterranean · Direct Service</strong>
              <small>Shanghai → Rotterdam · Spot &amp; contract rate queried</small>
            </div>
            <span className={s.pill}>Prepared</span>
          </div>
        </div>

        <div className={s.extraction}>
          <div className={s.extractionHeader}>
            <Sparkles size={14} />
            <strong>Vendor rate requests formatted</strong>
            <span>Ready for Send</span>
          </div>
          <div className={s.progress}>
            <span className={s.progressBar} />
          </div>
          <p>Standardized RFQs queued across approved carrier contacts</p>
        </div>

        <div className={s.windowFooter}>
          <FileCheck2 size={14} />
          <span>Information moves to the next stage with visibility and review checkpoints.</span>
          <ChevronRight size={14} />
        </div>
      </div>

      <div className={s.result}>
        <CheckCheck size={16} />
        <span>Multi-carrier rate requests generated using approved templates.</span>
      </div>
    </>
  );
}

/* Step 3 Preview: Rate Comparison & Quotation */
function Step3Preview() {
  return (
    <>
      <div className={`${s.floatingChip} ${s.chipTopRight}`}>
        <TrendingUp size={14} />
        <span>15% Margin Applied</span>
      </div>
      <div className={`${s.floatingChip} ${s.chipTopLeft}`}>
        <Layers size={14} />
        <span>Rates Normalized</span>
      </div>

      <div className={s.window}>
        <div className={s.windowHeader}>
          <span>
            <Layers size={16} />
            Rate Comparison &amp; Quotation
          </span>
          <span className={s.pill}>Best Option Ready</span>
        </div>

        <div className={s.imageBanner}>
          <img
            src="/images/logistics-desk-card.jpg"
            alt="Freight Analytics Dashboard"
            className={s.bannerImg}
            width={1376}
            height={768}
            loading="lazy"
            decoding="async"
          />
          <div className={s.bannerOverlay}>
            <span className={s.bannerTag}>
              <Laptop size={13} /> Rate Analytics &amp; Margin Rules
            </span>
          </div>
        </div>

        <div className={s.documentList}>
          <div className={s.documentRow}>
            <span className={s.documentIcon}>
              <Layers size={18} />
            </span>
            <div>
              <strong>Carrier Comparison Matrix</strong>
              <small>Maersk $2,350 (28d) · MSC $2,420 (26d) · CMA $2,500 (24d)</small>
            </div>
            <Check size={16} />
          </div>

          <div className={s.documentRow}>
            <span className={s.documentIcon}>
              <TrendingUp size={18} />
            </span>
            <div>
              <strong>Margin Engine &amp; Customer Pricing</strong>
              <small>Base $2,350 + $352.50 (15% margin) = Total Quote $2,702.50</small>
            </div>
            <Check size={16} />
          </div>
        </div>

        <div className={s.extraction}>
          <div className={s.extractionHeader}>
            <Sparkles size={14} />
            <strong>Customer quotation prepared</strong>
            <span>Complete</span>
          </div>
          <div className={s.progress}>
            <span className={s.progressBar} />
          </div>
          <p>Line-item charges · Validity dates · Free demurrage/detention terms included</p>
        </div>

        <div className={s.windowFooter}>
          <FileCheck2 size={14} />
          <span>Information moves to the next stage with visibility and review checkpoints.</span>
          <ChevronRight size={14} />
        </div>
      </div>

      <div className={s.result}>
        <CheckCheck size={16} />
        <span>Instant rate normalization and margin calculation with review controls.</span>
      </div>
    </>
  );
}

/* Step 4 Preview: Customer Confirmation & Booking */
function Step4Preview() {
  return (
    <>
      <div className={`${s.floatingChip} ${s.chipTopRight}`}>
        <CheckCircle2 size={14} />
        <span>Customer Confirmed</span>
      </div>
      <div className={`${s.floatingChip} ${s.chipTopLeft}`}>
        <Ship size={14} />
        <span>Booking Coordinated</span>
      </div>

      <div className={s.window}>
        <div className={s.windowHeader}>
          <span>
            <CheckCircle2 size={16} />
            Booking Coordination &amp; Handoff
          </span>
          <span className={s.pill}>Review Checkpoint</span>
        </div>

        <div className={s.imageBanner}>
          <img
            src="/images/hero-collage/ind-logistics-1.jpg"
            alt="Warehouse & Freight Logistics"
            className={s.bannerImg}
            width={800}
            height={533}
            loading="lazy"
            decoding="async"
          />
          <div className={s.bannerOverlay}>
            <span className={s.bannerTag}>
              <Boxes size={13} /> Operational Handoff &amp; Confirmation
            </span>
          </div>
        </div>

        <div className={s.documentList}>
          <div className={s.documentRow}>
            <span className={s.documentIcon}>
              <CheckCircle2 size={18} />
            </span>
            <div>
              <strong>Customer Acceptance Received</strong>
              <small>Quotation #QT-9042 approved by customer via email</small>
            </div>
            <Check size={16} />
          </div>

          <div className={s.documentRow}>
            <span className={s.documentIcon}>
              <FileText size={18} />
            </span>
            <div>
              <strong>Booking Coordinated &amp; Email Drafted</strong>
              <small>Reference #BKG-SHA-77291 · Acknowledgement email drafted</small>
            </div>
            <span className={s.pill}>Operator Review</span>
          </div>
        </div>

        <div className={s.extraction}>
          <div className={s.extractionHeader}>
            <Sparkles size={14} />
            <strong>Human review checkpoint ready</strong>
            <span>Verified</span>
          </div>
          <div className={s.progress}>
            <span className={s.progressBar} />
          </div>
          <p>Operator confirms final booking details before carrier booking is confirmed</p>
        </div>

        <div className={s.windowFooter}>
          <FileCheck2 size={14} />
          <span>Information moves to the next stage with visibility and review checkpoints.</span>
          <ChevronRight size={14} />
        </div>
      </div>

      <div className={s.result}>
        <CheckCheck size={16} />
        <span>Seamless handoff from quote acceptance to booking with team in control.</span>
      </div>
    </>
  );
}

const previews = [Step1Preview, Step2Preview, Step3Preview, Step4Preview];

export function EmailToBookingHowItWorks() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      next = (index + 1) % steps.length;
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      next = (index + steps.length - 1) % steps.length;
    } else if (event.key === 'Home') {
      next = 0;
    } else if (event.key === 'End') {
      next = steps.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section
      id="how-it-works"
      className={s.section}
      aria-labelledby="how-it-works-title"
    >
      <div className="site-shell">
        <div className={s.heading}>
          <p className={s.eyebrow}>HOW IT WORKS</p>
          <h2 id="how-it-works-title" className={s.headline}>
            A clear workflow, with people in control.
          </h2>
          <p className={s.intro}>
            Typical process flow. Exact steps are finalized during implementation discovery.
          </p>
        </div>

        <div className={s.workspace}>
          {/* Left Column: Interactive 4 Steps */}
          <div
            className={s.steps}
            role="tablist"
            aria-label="How Email to Booking works"
            aria-orientation="vertical"
          >
            {steps.map(({ name, stepNumber, title, description, icon: Icon }, index) => (
              <button
                key={stepNumber}
                type="button"
                role="tab"
                id={`workflow-step-${index}`}
                aria-controls={`workflow-preview-${index}`}
                aria-selected={active === index}
                tabIndex={active === index ? 0 : -1}
                ref={(element) => {
                  tabs.current[index] = element;
                }}
                onClick={() => setActive(index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={s.step}
              >
                <span className={s.stepNumber}>{stepNumber}</span>
                <span className={s.stepCopy}>
                  <span className={s.stepLabel}>
                    <Icon size={14} />
                    {name}
                  </span>
                  <strong>{title}</strong>
                  <span className={s.description}>{description}</span>
                </span>
                <ChevronRight className={s.stepArrow} size={16} />
              </button>
            ))}
          </div>

          {/* Right Column: Stage with Logistics Image & Window */}
          <div className={s.stage}>
            <div className={s.glow} aria-hidden="true" />
            {previews.map((Preview, index) => (
              <div
                key={index}
                role="tabpanel"
                id={`workflow-preview-${index}`}
                aria-labelledby={`workflow-step-${index}`}
                hidden={active !== index}
                tabIndex={0}
                className={s.preview}
              >
                {active === index && <Preview />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmailToBookingHowItWorks;
