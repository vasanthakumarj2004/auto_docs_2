'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  FileSpreadsheet,
  Check,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  Send,
} from 'lucide-react';
import s from './EmailToBookingCapabilities.module.css';

interface StepData {
  stepNum: string;
  shortLabel: string;
  subLabel: string;
  headline: string;
  description: string;
}

const STEPS: StepData[] = [
  {
    stepNum: 'STEP 1 OF 7',
    shortLabel: 'READ INCOMING',
    subLabel: 'Inbox read',
    headline: 'Read incoming customer enquiry emails and supported attachments',
    description:
      'Automatically ingest RFQ emails from customer sales inboxes, reading both the message body and supported attachments like packing lists and Excel spreadsheets.',
  },
  {
    stepNum: 'STEP 2 OF 7',
    shortLabel: 'IDENTIFY SHIPMENT',
    subLabel: 'Gaps flagged',
    headline: 'Identify shipment details and information gaps',
    description:
      'Extract vital freight parameters across equipment, origin/destination ports, and ready dates, while proactively flagging missing cargo details before carrier queries.',
  },
  {
    stepNum: 'STEP 3 OF 7',
    shortLabel: 'PREPARE VENDOR',
    subLabel: 'RFQs drafted',
    headline: 'Prepare vendor rate request emails using configured templates',
    description:
      'Instantly assemble standardized RFQ request emails to selected carrier and vendor partners with equipment specifications and corridor parameters.',
  },
  {
    stepNum: 'STEP 4 OF 7',
    shortLabel: 'COMPARE VENDOR',
    subLabel: 'Rates side by side',
    headline: 'Compare vendor rates, transit times and response details',
    description:
      'Parse incoming carrier rate quotations into a normalized side-by-side comparison matrix, automatically highlighting the most cost-effective and fastest options.',
  },
  {
    stepNum: 'STEP 5 OF 7',
    shortLabel: 'SUPPORT VENDOR',
    subLabel: 'Negotiation help',
    headline: 'Support vendor recommendations and email negotiation workflows',
    description:
      'Generate data-backed carrier recommendations and draft intelligent volume counter-offers to negotiate sharper buy rates before customer pricing.',
  },
  {
    stepNum: 'STEP 6 OF 7',
    shortLabel: 'PREPARE CUSTOMER',
    subLabel: 'Quote with margin',
    headline: 'Prepare customer quotations with configured margin inputs',
    description:
      'Calculate customer sell rates dynamically by applying your target commercial margins over selected carrier buy costs with interactive control.',
  },
  {
    stepNum: 'STEP 7 OF 7',
    shortLabel: 'DRAFT CUSTOMER',
    subLabel: 'You approve',
    headline: 'Draft customer acknowledgement and booking-related emails',
    description:
      'Assemble clean, professional customer quote responses and booking confirmations. Operators review and sign off before anything is dispatched.',
  },
];

export function EmailToBookingCapabilities() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [margin, setMargin] = useState<number>(12);
  const [step3Sent, setStep3Sent] = useState<boolean>(false);
  const [step5Status, setStep5Status] = useState<string | null>(null);
  const [step7Status, setStep7Status] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const isManualNavRef = useRef<boolean>(false);
  const manualTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeStep = STEPS[activeIdx];
  const vendorCost = 1180;
  const calculatedQuote = Math.round(vendorCost * (1 + margin / 100));

  // Auto-scroll flow tracking: automatically progresses through steps as user scrolls down
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ticking = false;

    const handleScroll = () => {
      if (isManualNavRef.current) return;
      if (window.innerWidth < 860) return; // Desktop scrollytelling

      const container = containerRef.current;
      const stage = stageRef.current;
      if (!container || !stage) return;

      const rect = container.getBoundingClientRect();
      const topOffset = 84; // Offset matching the fixed navigation bar

      // If user hasn't reached the sticky point yet, remain on Step 0
      if (rect.top > topOffset) {
        setActiveIdx((prev) => (prev !== 0 ? 0 : prev));
        return;
      }

      const stageHeight = stage.offsetHeight;
      const scrollableDist = rect.height - stageHeight;

      if (scrollableDist <= 0) return;

      const scrolled = topOffset - rect.top;

      // If user scrolled past the container, hold on the final step
      if (scrolled >= scrollableDist) {
        setActiveIdx((prev) => (prev !== STEPS.length - 1 ? STEPS.length - 1 : prev));
        return;
      }

      // Smooth progress between 0 and 1 mapped to 7 steps
      const progress = Math.max(0, Math.min(scrolled / scrollableDist, 0.9999));
      const stepIdx = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));

      setActiveIdx((prev) => (prev !== stepIdx ? stepIdx : prev));
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    const onWheel = () => {
      // User manual wheel interaction immediately releases any programmatic nav lock
      if (isManualNavRef.current) {
        isManualNavRef.current = false;
        if (manualTimeoutRef.current) {
          clearTimeout(manualTimeoutRef.current);
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('wheel', onWheel);
      if (manualTimeoutRef.current) {
        clearTimeout(manualTimeoutRef.current);
      }
    };
  }, []);

  const goToStep = (idx: number, scrollWindow: boolean = true) => {
    const clamped = Math.max(0, Math.min(STEPS.length - 1, idx));
    setActiveIdx(clamped);

    if (scrollWindow && typeof window !== 'undefined' && window.innerWidth >= 860) {
      const container = containerRef.current;
      const stage = stageRef.current;
      if (container && stage) {
        const rect = container.getBoundingClientRect();
        const topOffset = 84;
        const stageHeight = stage.offsetHeight;
        const scrollableDist = rect.height - stageHeight;

        if (scrollableDist > 0) {
          const stepProgress = (clamped + 0.5) / STEPS.length;
          const containerStartScrollY = window.scrollY + (rect.top - topOffset);
          const targetScrollY = containerStartScrollY + stepProgress * scrollableDist;

          isManualNavRef.current = true;
          if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
          manualTimeoutRef.current = setTimeout(() => {
            isManualNavRef.current = false;
          }, 700);

          window.scrollTo({
            top: targetScrollY,
            behavior: 'smooth',
          });
        }
      }
    }
  };

  const handleNext = () => {
    if (activeIdx < STEPS.length - 1) {
      goToStep(activeIdx + 1);
    }
  };

  const handlePrev = () => {
    if (activeIdx > 0) {
      goToStep(activeIdx - 1);
    }
  };

  return (
    <section
      id="capabilities"
      className={`${s.lightSection} ${s.emailBookingSection}`}
      aria-labelledby="capabilities-section-title"
    >
      <div className={s.emailBookingShell}>
        {/* Section Header */}
        <div className={s.sectionHeader}>
          <div className={s.eyebrow}>
            <span className={s.eyebrowDot} aria-hidden="true" />
            <span>WHAT IT HELPS YOUR TEAM DO</span>
          </div>
          <h2 id="capabilities-section-title" className={s.mainTitle}>
            Purpose-built capabilities for everyday operations.
          </h2>
          <p className={s.mainSubtitle}>
            Configure the workflow around your document types, business rules, review
            process and connected systems.
          </p>
        </div>

        {/* Scrollytelling Container */}
        <div ref={containerRef} className={s.scrollyContainer}>
          {/* Sticky Stage pinned while scrolling */}
          <div ref={stageRef} className={s.stickyStage}>
            <div className={s.workflowLayout}>
              {/* ZONE 1: LEFT VERTICAL STEPPER RAIL */}
              <nav aria-label="Capabilities Stepper" className={s.stepperRail}>
                <div className={s.stepperHeader}>
                  <span>ENQUIRY RECEIVED · QUOTE PENDING</span>
                </div>

                <ol className={s.stepsList}>
                  {STEPS.map((step, idx) => {
                    const isCompleted = idx < activeIdx;
                    const isActive = idx === activeIdx;

                    return (
                      <li
                        key={step.shortLabel}
                        className={s.stepItem}
                        data-active={isActive ? 'true' : 'false'}
                        data-completed={isCompleted ? 'true' : 'false'}
                      >
                        {idx < STEPS.length - 1 && (
                          <span className={s.stepLine} aria-hidden="true" />
                        )}

                        <span className={s.stepNode} aria-hidden="true">
                          {isCompleted ? (
                            <Check size={10} color="#ffffff" strokeWidth={3} />
                          ) : isActive ? (
                            <span className={s.stepNodeInner} />
                          ) : null}
                        </span>

                        <button
                          type="button"
                          className={s.stepButton}
                          onClick={() => goToStep(idx)}
                          aria-current={isActive ? 'step' : undefined}
                        >
                          <span className={s.stepTitle}>{step.shortLabel}</span>
                          <span className={s.stepSubtitle}>{step.subLabel}</span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </nav>

              {/* ZONE 2: CENTER HEADLINE & DESCRIPTION */}
              <div className={s.centerZone}>
                <div className={s.stepTag}>
                  <span>
                    {activeStep.stepNum} · {activeStep.shortLabel}
                  </span>
                </div>

                <h3 className={s.stepHeadline}>{activeStep.headline}</h3>
                <p className={s.stepDescription}>{activeStep.description}</p>

                <div className={s.quickNavRow}>
                  <button
                    type="button"
                    className={s.navArrowBtn}
                    onClick={handlePrev}
                    disabled={activeIdx === 0}
                    aria-label="Previous capability"
                  >
                    <ChevronLeft size={14} />
                    <span>Previous</span>
                  </button>

                  <button
                    type="button"
                    className={s.navArrowBtn}
                    onClick={handleNext}
                    disabled={activeIdx === STEPS.length - 1}
                    aria-label="Next capability"
                  >
                    <span>Next step</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* ZONE 3: RIGHT INTERACTIVE OPERATIONAL CARD */}
              <div className={s.cardZone} role="region" aria-label="Step operational card">
                {/* STEP 1: READ INCOMING */}
                {activeIdx === 0 && (
                  <div className={s.previewCard}>
                    <div className={s.cardHeaderBar}>
                      <span className={s.cardHeaderTitle}>INBOX · SALES@FORWARDER</span>
                      <span className={`${s.cardBadge} ${s.badgeBlue}`}>READING</span>
                    </div>

                    <div className={s.cardBody}>
                      <h4 className={s.emailSubject}>
                        Enquiry: 1×40HC Nhava Sheva → Jebel Ali
                      </h4>

                      <div className={s.emailBubble}>
                        &ldquo;Hi team, please quote for one 40HC. Cargo is ready 24 Nov.
                        Details are in the attached list. Thanks, Meera (Orion Trading)&rdquo;
                      </div>

                      <div className={s.attachmentList}>
                        <span className={s.attachmentChip}>
                          <FileText size={13} aria-hidden="true" />
                          <span>packing-list.pdf</span>
                        </span>
                        <span className={s.attachmentChip}>
                          <FileSpreadsheet size={13} aria-hidden="true" />
                          <span>enquiry.xlsx</span>
                        </span>
                      </div>
                    </div>

                    <div className={s.cardFooterBar}>
                      <span>2 ATTACHMENTS PARSED</span>
                      <span>SAMPLE DATA</span>
                    </div>
                  </div>
                )}

                {/* STEP 2: IDENTIFY SHIPMENT */}
                {activeIdx === 1 && (
                  <div className={s.previewCard}>
                    <div className={s.cardHeaderBar}>
                      <span className={s.cardHeaderTitle}>SHIPMENT DETAILS</span>
                      <span className={`${s.cardBadge} ${s.badgeAmber}`}>1 GAP</span>
                    </div>

                    <div className={s.cardBody}>
                      <div className={s.kvTable}>
                        <div className={s.kvRow}>
                          <span className={s.kvKey}>Origin</span>
                          <span className={s.kvVal}>Nhava Sheva (INNSA)</span>
                        </div>
                        <div className={s.kvRow}>
                          <span className={s.kvKey}>Destination</span>
                          <span className={s.kvVal}>Jebel Ali (AEJEA)</span>
                        </div>
                        <div className={s.kvRow}>
                          <span className={s.kvKey}>Equipment</span>
                          <span className={s.kvVal}>1 × 40HC</span>
                        </div>
                        <div className={s.kvRow}>
                          <span className={s.kvKey}>Cargo ready</span>
                          <span className={s.kvVal}>24 Nov</span>
                        </div>
                        <div className={s.kvRow}>
                          <span className={s.kvKey}>Gross weight</span>
                          <span className={s.pillWarning}>
                            <AlertCircle size={12} aria-hidden="true" />
                            <span>Missing · ask customer</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={s.cardFooterBar}>
                      <span>4 OF 5 FIELDS FOUND</span>
                      <span>SAMPLE DATA</span>
                    </div>
                  </div>
                )}

                {/* STEP 3: PREPARE VENDOR */}
                {activeIdx === 2 && (
                  <div className={s.previewCard}>
                    <div className={s.cardHeaderBar}>
                      <span className={s.cardHeaderTitle}>
                        RATE REQUEST · TEMPLATE: FCL-STANDARD
                      </span>
                      <span className={`${s.cardBadge} ${s.badgeBlue}`}>DRAFT</span>
                    </div>

                    <div className={s.cardBody}>
                      <div className={s.recipientRow}>
                        <span>To</span>
                        <span className={s.recipientVal}>3 vendors</span>
                      </div>

                      <div className={s.emailBubble}>
                        &ldquo;Please share your best all-in rate, transit time and validity
                        for 1×40HC, Nhava Sheva to Jebel Ali, ready 24 Nov.&rdquo;
                      </div>

                      <div className={s.cardActionRow}>
                        <button
                          type="button"
                          className={s.btnPrimaryGreen}
                          onClick={() => setStep3Sent(true)}
                        >
                          {step3Sent ? (
                            <>
                              <Check size={14} style={{ marginRight: 6 }} /> Sent to 3
                              vendors
                            </>
                          ) : (
                            <>
                              <Send size={13} style={{ marginRight: 6 }} /> Send to 3
                              vendors
                            </>
                          )}
                        </button>
                        <button type="button" className={s.btnOutline}>
                          Edit template
                        </button>
                      </div>
                    </div>

                    <div className={s.cardFooterBar}>
                      <span>YOU REVIEW BEFORE IT GOES</span>
                      <span>SAMPLE DATA</span>
                    </div>
                  </div>
                )}

                {/* STEP 4: COMPARE VENDOR */}
                {activeIdx === 3 && (
                  <div className={s.previewCard}>
                    <div className={s.cardHeaderBar}>
                      <span className={s.cardHeaderTitle}>VENDOR RESPONSES</span>
                      <span className={`${s.cardBadge} ${s.badgeGreen}`}>3 OF 3 IN</span>
                    </div>

                    <div className={s.cardBody}>
                      <table className={s.rateTable}>
                        <thead>
                          <tr>
                            <th>Vendor</th>
                            <th>Rate</th>
                            <th>Transit</th>
                            <th>Valid</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Vendor A</td>
                            <td>USD 1,240</td>
                            <td>7 d</td>
                            <td>30 Nov</td>
                          </tr>
                          <tr className={s.rateTableRowHighlighted}>
                            <td>Vendor B</td>
                            <td>USD 1,180</td>
                            <td>8 d</td>
                            <td>2 Dec</td>
                          </tr>
                          <tr>
                            <td>Vendor C</td>
                            <td>USD 1,260</td>
                            <td>6 d</td>
                            <td>28 Nov</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className={s.cardFooterBar}>
                      <span>LOWEST RATE HIGHLIGHTED</span>
                      <span>SAMPLE DATA</span>
                    </div>
                  </div>
                )}

                {/* STEP 5: SUPPORT VENDOR */}
                {activeIdx === 4 && (
                  <div className={s.previewCard}>
                    <div className={s.cardHeaderBar}>
                      <span className={s.cardHeaderTitle}>RECOMMENDATION</span>
                      <span className={`${s.cardBadge} ${s.badgeBlue}`}>
                        FOR YOUR REVIEW
                      </span>
                    </div>

                    <div className={s.cardBody}>
                      <h4 className={s.recommendationTitle}>
                        Vendor B offers the best rate. Ask for a better one before you accept.
                      </h4>

                      <div className={s.emailBubble}>
                        &ldquo;Draft reply: Thanks for the quick response. Could you improve
                        the rate to USD 1,150 for a confirmed booking this week?&rdquo;
                      </div>

                      <div className={s.cardActionRow}>
                        <button
                          type="button"
                          className={s.btnPrimaryGreen}
                          onClick={() => setStep5Status('approved')}
                        >
                          {step5Status === 'approved'
                            ? '✓ Approved & sent'
                            : 'Approve & send'}
                        </button>
                        <button
                          type="button"
                          className={s.btnOutline}
                          onClick={() => setStep5Status('refining')}
                        >
                          Refine tone
                        </button>
                      </div>
                    </div>

                    <div className={s.cardFooterBar}>
                      <span>NOTHING SENDS WITHOUT YOU</span>
                      <span>SAMPLE DATA</span>
                    </div>
                  </div>
                )}

                {/* STEP 6: PREPARE CUSTOMER (MARGIN CALCULATOR) */}
                {activeIdx === 5 && (
                  <div className={s.previewCard}>
                    <div className={s.cardHeaderBar}>
                      <span className={s.cardHeaderTitle}>MARGIN ENGINE</span>
                      <span className={`${s.cardBadge} ${s.badgeBlue}`}>INTERACTIVE</span>
                    </div>

                    <div className={s.cardBody}>
                      <div className={s.marginCalculator}>
                        <div className={s.marginRow}>
                          <span>Vendor cost</span>
                          <span className={s.marginVal}>USD 1,180</span>
                        </div>

                        <div className={s.sliderContainer}>
                          <div className={s.marginRow}>
                            <span>Target Margin</span>
                            <span className={s.marginVal} style={{ color: '#059669' }}>
                              {margin}%
                            </span>
                          </div>
                          <input
                            type="range"
                            min={5}
                            max={30}
                            value={margin}
                            onChange={(e) => setMargin(Number(e.target.value))}
                            className={s.sliderInput}
                            aria-label="Margin percentage slider"
                          />
                        </div>

                        <div className={s.quoteDisplayBlock}>
                          <span className={s.quoteLabel}>Quote to customer</span>
                          <span className={s.quoteAmount}>
                            USD {calculatedQuote.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={s.cardFooterBar}>
                      <span>DRAG THE MARGIN SLIDER</span>
                      <span>SAMPLE DATA</span>
                    </div>
                  </div>
                )}

                {/* STEP 7: DRAFT CUSTOMER (HUMAN GATE) */}
                {activeIdx === 6 && (
                  <div className={s.previewCard}>
                    <div className={s.cardHeaderBar}>
                      <span className={s.cardHeaderTitle}>DRAFT · REPLY TO MEERA</span>
                      <span className={`${s.cardBadge} ${s.badgeAmber}`}>
                        WAITING FOR YOU
                      </span>
                    </div>

                    <div className={s.cardBody}>
                      <div className={s.emailBubble}>
                        &ldquo;Hi Meera, thanks for your enquiry. Our rate for 1×40HC Nhava
                        Sheva to Jebel Ali is USD {calculatedQuote.toLocaleString()}, valid
                        until 2 Dec. Please send the gross weight so we can confirm the
                        booking.&rdquo;
                      </div>

                      <div className={s.cardActionRow}>
                        <button
                          type="button"
                          className={s.btnPrimaryGreen}
                          onClick={() => setStep7Status('approved')}
                        >
                          {step7Status === 'approved'
                            ? '✓ Dispatched to customer'
                            : 'Approve & send'}
                        </button>
                        <button
                          type="button"
                          className={s.btnOutline}
                          onClick={() => setStep7Status('refine')}
                        >
                          Refine tone
                        </button>
                        <button
                          type="button"
                          className={s.btnOutline}
                          onClick={() => setStep7Status('held')}
                        >
                          Hold
                        </button>
                      </div>
                    </div>

                    <div className={s.cardFooterBar}>
                      <span>PEOPLE STAY IN CONTROL</span>
                      <span>SAMPLE DATA</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmailToBookingCapabilities;
