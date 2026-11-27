import Link from "next/link";
import {
  ArrowRight,
  ArrowLeftRight,
  ArrowUpRight,
  FileText,
  Zap,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

import { LandingHero } from "./LandingHero";
import { LandingNavigation } from "./LandingNavigation";
import { LandingAnnouncementBar } from "./LandingAnnouncementBar";
import { DocsynecxFooter } from "./DocsynecxFooter";
import { IntelligenceLayer } from "./IntelligenceLayer";
import { LandingClosingCta } from "./LandingClosingCta";
import { CustomerReviewSliderFallback } from "./CustomerReviewSliderFallback";
import {
  DeferredCustomerReviewSlider,
  DeferredSharedFaqAccordion,
} from "./DeferredLandingSections";
import { landingDesks, landingFaqs } from "../content/landing";
import styles from "./LandingHome.module.css";

const DESK_IMAGES: Record<string, string> = {
  finance: "/images/finance-desk-background",
  shipment: "/images/logistics-desk-background",
  logistics: "/images/logistics-desk-background",
};

const benefits = [
  [
    "Less repetitive work",
    "Docsynecx reads, types and checks the documents that slow your team down.",
  ],
  [
    "People stay in charge",
    "Nothing is posted, sent or pushed until someone on your team approves it.",
  ],
  [
    "Your systems stay",
    "Tally, Zoho Books, CargoWise or your own ERP. Your team keeps working where they work today.",
  ],
  [
    "Numbers you can use",
    "See dues, cash, margins and delays without building a report in Excel.",
  ],
];
const BENEFIT_ITEMS = [
  { icon: Zap, tag: "Autonomous Flow" },
  { icon: ShieldCheck, tag: "Human Review Loop" },
  { icon: ArrowLeftRight, tag: "Two-Way System Sync" },
  { icon: TrendingUp, tag: "Actionable Visibility" },
];
const steps = [
  ["Understand", "Review your process, systems, document types and volumes."],
  ["Configure", "Map the workflow, validation points and integration needs."],
  ["Validate", "Test with representative documents and your team."],
  ["Scale", "Expand to more workflows as results are established."],
];
interface CustomerStoryOutcome {
  tag: string;
  name: string;
  metric: string;
  summary: string;
  copy: string;
  href?: string;
}

const stories: CustomerStoryOutcome[] = [
  {
    tag: "Logistics",
    name: "Freight Forwarders",
    metric: "60+ min → 15 min",
    summary: "Email to Booking",
    copy: "Shipment intake that once took about an hour per shipment now takes less than fifteen minutes.",
    href: "/customers",
  },
  {
    tag: "Automotive & EV",
    name: "Automotive & EV Dealer ",
    metric: "Days → hours",
    summary: "Bills",
    copy: "A month's spares, service and purchase bills now take hours instead of days.",
    href: "/customers",
  },
  {
    tag: "Business operations",
    name: "Manufacturer",
    metric: "In daily use",
    summary: "Assets & Purchase Bills",
    copy: "Used every day for asset and purchase bills, with every entry approved before it reaches the books.",
  },
  {
    tag: "Retail & Distribution",
    name: "OmniRetail Networks",
    metric: "94% automated",
    summary: "Multi-Vendor Invoicing",
    copy: "High-volume invoice auditing and trade documents posted directly without error delays.",
  },
  {
    tag: "Textile & Garments",
    name: "Global Fabrics Ltd",
    metric: "3x faster sync",
    summary: "Supplier & Export Manifests",
    copy: "Complex supplier bills and export manifests reconciled in minutes instead of days.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  copy,
  id,
}: {
  eyebrow: string;
  title: React.ReactNode;
  copy?: string;
  id: string;
}) {
  return (
    <div className={styles.sectionHeading}>
      <div>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 id={id}>{title}</h2>
      </div>
      {copy && <p className={styles.sectionCopy}>{copy}</p>}
    </div>
  );
}

function LandingFaqFallback() {
  return (
    <div
      className="space-y-2.5"
      role="region"
      aria-label="Frequently Asked Questions"
    >
      {landingFaqs.map((item, index) => (
        <details
          key={item.question}
          open={index === 0}
          className={`rounded-xl border transition-all duration-200 ${
            index === 0
              ? "border-[#18cb96]/45 bg-[#f4fbf8] shadow-2xs"
              : "border-slate-200/90 bg-white"
          }`}
        >
          <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 rounded-xl p-4 text-left [&::-webkit-details-marker]:hidden">
            <span className="text-sm font-bold text-slate-800">
              {item.question}
            </span>
            <span
              className="shrink-0 text-xl text-slate-500"
              aria-hidden="true"
            >
              ⌄
            </span>
          </summary>
          {item.answer && (
            <div className="px-4 pb-4 pt-1">
              <div className="border-l-2 border-[#18cb96]/45 pl-3 text-xs leading-relaxed text-slate-600 sm:text-[13px]">
                {item.answer}
              </div>
            </div>
          )}
        </details>
      ))}
    </div>
  );
}

export function LandingPage() {
  return (
    <div className={styles.page}>
      <a href="#main-content" className={styles.skipLink}>
        Skip to content
      </a>
      <LandingAnnouncementBar />
      <LandingNavigation variant="horizon" />
      <main id="main-content" className={styles.mainContent}>
        <LandingHero />
        <section className={styles.statStrip} aria-labelledby="outcomes-title">
          <div className="site-shell">
            <h2 id="outcomes-title" className={styles.eyebrow}>
              What customers see
            </h2>
            {/* <SectionHeading id="platform-title" eyebrow="What customers see" title={<>Real teams.<span>Real hours back.</span></>} /> */}
            <div className={styles.stats}>
              {stories.slice(0, 3).map((story, index) => {
                const Icon =
                  index === 0 ? Zap : index === 1 ? ShieldCheck : CheckCircle2;
                return (
                  <div key={story.name} className={styles.outcomeCard}>
                    <div className={styles.outcomeCardTop}>
                      <p className={styles.statValue}>{story.metric}</p>
                      <span
                        className={styles.outcomeIconBadge}
                        aria-hidden="true"
                      >
                        <Icon size={15} className="stroke-[2.2]" />
                      </span>
                    </div>
                    <div className={styles.outcomeCardBody}>
                      <h3 className={styles.outcomeTitle}>{story.name}</h3>
                      <p className={styles.outcomeSummary}>{story.summary}</p>
                      <p className={styles.outcomeCopy}>{story.copy}</p>
                    </div>
                    {/* {story.href && (
                      <Link href={story.href} className={styles.outcomeLink}>
                        <span>Read customer story</span>
                        <ArrowUpRight size={13} aria-hidden="true" />
                      </Link>
                    )} */}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section
          id="platform"
          className={`${styles.section} ${styles.platformSection}`}
          aria-labelledby="platform-title"
        >
          <div className="site-shell">
            <SectionHeading
              id="platform-title"
              eyebrow="Pick your desk"
              title={
                <>
                  Two desks.
                  <br />
                  <span>One way of working.</span>
                </>
              }
            />
            <div className={styles.desks}>
              {landingDesks.map((desk, index) => {
                const imageBase =
                  DESK_IMAGES[desk.id] ||
                  (index === 0
                    ? "/images/finance-desk-background"
                    : "/images/logistics-desk-background");
                return (
                  <article
                    key={desk.id}
                    id={desk.id}
                    className={styles.desk}
                    data-desk={desk.id}
                  >
                    <div className={styles.deskImageWrapper}>
                      <img
                        src={`${imageBase}-750-optimized.webp`}
                        srcSet={`${imageBase}-480.webp 480w, ${imageBase}-640.webp 640w, ${imageBase}-750-optimized.webp 750w, ${imageBase}-1200-optimized.webp 1200w`}
                        alt={`${desk.title} background`}
                        className={styles.deskImage}
                        loading="lazy"
                        decoding="async"
                        width={750}
                        height={480}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      />
                      <div className={styles.deskScrim} />
                    </div>

                    <div className={styles.deskCenterView}>
                      <h3 className={styles.deskCenterTitle}>{desk.title}</h3>
                    </div>

                    <div className={styles.deskHoverView}>
                      <div className={styles.deskHoverTop}>
                        <span className={styles.deskHoverEyebrow}>
                          {desk.tag}
                        </span>
                        <span className={styles.deskHoverIcon}>
                          {index === 0 ? (
                            <FileText size={20} aria-hidden="true" />
                          ) : (
                            <ArrowLeftRight size={20} aria-hidden="true" />
                          )}
                        </span>
                      </div>

                      <div className={styles.deskHoverBody}>
                        <h3 className={styles.deskHoverTitle}>{desk.title}</h3>
                        <p className={styles.deskHoverCopy}>{desk.copy}</p>
                        <ul className={styles.deskHoverChips}>
                          {desk.features.map((feature) => (
                            <li key={feature}>{feature}</li>
                          ))}
                        </ul>
                      </div>

                      <div className={styles.deskHoverFooter}>
                        <Link href={desk.href} className={styles.deskHoverLink}>
                          Explore {desk.title}
                          <ArrowRight size={16} aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <p className={styles.deskText}>
              Start with the workflow that takes the most effort today. Expand
              as your teams are ready.
            </p>
          </div>
        </section>
        <section
          id="why-docsynecx"
          className={`${styles.section} ${styles.whySection}`}
          aria-labelledby="why-title"
        >
          <div className="site-shell">
            <SectionHeading
              id="why-title"
              eyebrow="Why Docsynecx"
              title={
                <>
                  Less typing. <span>More clarity.</span>
                </>
              }
            />
            <div className={styles.benefits}>
              {benefits.map(([title, copy], index) => {
                const item = BENEFIT_ITEMS[index] || BENEFIT_ITEMS[0];
                const IconComponent = item.icon;
                return (
                  <article key={title} className={styles.benefitCard}>
                    <div className={styles.benefitVisual}>
                      <div className={styles.benefitIconBox}>
                        <div className={styles.benefitRingOuter} />
                        <div className={styles.benefitRingInner} />
                        <span className={styles.benefitIconBadge}>
                          <IconComponent
                            size={26}
                            strokeWidth={2.2}
                            aria-hidden="true"
                          />
                        </span>
                        <span className={styles.benefitTag}>
                          <span className={styles.benefitDot} />
                          {item.tag}
                        </span>
                      </div>
                    </div>

                    <div className={styles.benefitContent}>
                      <span className={styles.benefitNumber}>0{index + 1}</span>
                      <h3 className={styles.benefitTitle}>{title}</h3>
                      <p className={styles.benefitCopy}>{copy}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        <IntelligenceLayer />
        <section
          id="customers"
          className={`${styles.section} ${styles.customersSection}`}
          aria-labelledby="customers-title"
        >
          <div className="site-shell">
            <SectionHeading
              id="customers-title"
              eyebrow="Testimonials"
              title={
                <>
                  Real workflows.
                  <br />
                  <span>Meaningful time saved.</span>
                </>
              }
            />
            <DeferredCustomerReviewSlider>
              <CustomerReviewSliderFallback />
            </DeferredCustomerReviewSlider>
          </div>
        </section>
        <section
          id="faq"
          className={`${styles.section} ${styles.faqSection}`}
          aria-labelledby="faq-title"
        >
          <div className={`site-shell ${styles.faqLayout}`}>
            <h2 id="faq-title" className="sr-only">
              Frequently asked questions
            </h2>
            <DeferredSharedFaqAccordion items={landingFaqs}>
              <LandingFaqFallback />
            </DeferredSharedFaqAccordion>
          </div>
        </section>
        <LandingClosingCta />
      </main>
      <DocsynecxFooter />
    </div>
  );
}
