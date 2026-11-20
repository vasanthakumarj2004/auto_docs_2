"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  ShieldCheck,
  HeartHandshake,
  MapPin,
  Sparkles,
} from "lucide-react";
import { LandingNavigation } from "../LandingNavigation";
import { ShipsyFooter } from "../ShipsyFooter";
import { FinanceClosingCta } from "../finance/FinanceClosingCta";
import s from "./AboutPage.module.css";

export function AboutPage() {
  const principles = [
    {
      icon: Compass,
      title: "Innovation with purpose",
      description:
        "We use technology to solve meaningful problems. Every capability should have a clear role in making work simpler or better.",
    },
    {
      icon: ShieldCheck,
      title: "Trust through reliability",
      description:
        "We value accuracy, transparency and accountability. Businesses should understand how their workflows operate and feel confident using them.",
    },
    {
      icon: HeartHandshake,
      title: "People at the centre",
      description:
        "Automation should empower people, not add complexity. We design around the teams who use our solutions every day.",
    },
  ];

  return (
    <div className={s.pageWrapper}>
      <LandingNavigation />

      <main className={s.mainContent}>
        {/* ============================================================= */}
        {/* HERO SECTION: Centered Editorial Headline, Lead & Brand Notes */}
        {/* ============================================================= */}
        <section className={s.heroSection}>
          <div className={s.shell}>
            <div className={s.heroContentCentered}>
              <p className={s.heroEyebrow}>A little about us</p>

              <h1 className={s.heroTitle}>
                We believe technology should make{" "}
                <span className={s.accent}>business simpler.</span>
              </h1>

              <p className={s.heroLead}>
                Docsynecx is built around a simple idea: give businesses more
                time to move forward by making everyday operations more
                intelligent, connected and effortless.
              </p>

              <div className={s.heroTrustRow}>
                <div className={s.heroTrustCard}>
                  <div className={s.trustIconBox} aria-hidden="true">
                    <Sparkles size={17} strokeWidth={2.2} />
                  </div>
                  <div className={s.trustText}>
                    <strong>Built with purpose</strong>
                    <span>Practical AI for real work</span>
                  </div>
                </div>

                <div className={s.heroTrustCard}>
                  <div className={s.trustIconBox} aria-hidden="true">
                    <MapPin size={17} strokeWidth={2.2} />
                  </div>
                  <div className={s.trustText}>
                    <strong>Rooted in Coimbatore</strong>
                    <span>Building for businesses everywhere</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* SECTION 01: OUR STORY & STRATEGIC PILLARS                     */}
        {/* ============================================================= */}
        <section className={`${s.section} ${s.storySection}`} id="story">
          <div className={s.shell}>
            <div className={s.storyGrid}>
              <div className={s.storyHeadingCol}>
                <p className={s.eyebrow}>01 / Our story</p>
                <h2 className={s.sectionTitle}>
                  It started with a <span className={s.accent}>question.</span>
                </h2>
              </div>

              <div className={s.storyCopyCol}>
                <p className={s.storyLeadP}>
                  Why should capable people spend so much of their day moving
                  information from one place to another?
                </p>
                <p>
                  Across businesses, important work is often surrounded by
                  repetitive tasks  reading documents, entering details,
                  checking information and keeping different systems in sync.
                  These processes take time away from the decisions and
                  relationships that help a business grow.
                </p>
                <p>
                  We believed there was a better way. Our journey began in 2024
                  with a shared ambition to make artificial intelligence
                  practical and useful in everyday business operations.
                </p>
                <p>
                  That ambition shaped Docsynecx: a platform built to help teams
                  simplify document-heavy work, connect processes and spend more
                  time on what matters.
                </p>

                <blockquote className={s.pullquote}>
                  “We’re not building technology for technology’s sake. We’re
                  building it to make work better.”
                </blockquote>
              </div>
            </div>

            {/* Split Pillar Cards */}
            <div className={s.splitGrid}>
              <div className={s.splitCard}>
                <span className={s.splitNumber}>A DIFFERENT WAY TO THINK</span>
                <h3 className={s.splitTitle}>Start with the real work.</h3>
                <p className={s.splitDesc}>
                  We listen to the people doing the work, understand where
                  friction lives and build around the realities of their day.
                </p>
              </div>

              <div className={s.splitCard}>
                <span className={s.splitNumber}>A CLEARER AMBITION</span>
                <h3 className={s.splitTitle}>Make complexity feel simpler.</h3>
                <p className={s.splitDesc}>
                  We bring AI and automation into business workflows in ways
                  that are useful, dependable and easier to work with.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* SECTION 02: THE PEOPLE BEHIND DOCSYNECX (FOUNDERS)            */}
        {/* ============================================================= */}
        <section className={`${s.section} ${s.foundersSection}`} id="founders">
          <div className={s.shell}>
            <div className={s.sectionHeaderStacked}>
              <p className={s.eyebrow}>02 / The people behind Docsynecx</p>
              <h2 className={s.sectionTitle}>
                Where technology meets{" "}
                <span className={s.accent}>business vision.</span>
              </h2>
              <p className={s.sectionHeaderCopy}>
                Meet the people behind Docsynecx. Combining expertise in AI,
                technology, business strategy and operations, we are building
                intelligent solutions that make business operations simpler.
              </p>
            </div>

            <div className={s.founderGrid}>
              {/* Founder 1: Dr. Ragupathy */}
              <article className={s.founderCard}>
                <div className={s.founderVisual}>
                  <div className={s.visualOrbit1} aria-hidden="true" />
                  <div className={s.visualOrbit2} aria-hidden="true" />
                  <div className={s.initials}>RP</div>
                  <span className={s.visualBadge}>Founder profile</span>
                </div>

                <div className={s.founderContent}>
                  <span className={s.roleBadge}>Founder & CEO</span>
                  <h3 className={s.founderName}>Dr. Ragupathy Palaniswamy</h3>
                  <p className={s.credential}>
                    Ph.D. in Computer Science · Computer Vision
                  </p>

                  <p className={s.bioText}>
                    Dr. Ragupathy is a technology entrepreneur and business
                    leader with 15+ years of experience across academia,
                    research and industry R&D. Holding a Ph.D. in Computer
                    Science specializing in Computer Vision, he combines deep
                    expertise in AI and technology with business strategy and
                    product innovation.
                  </p>
                  <p className={s.bioText}>
                    At Docsynecx, he drives technology vision, product
                    development and business growth, translating real-world
                    business challenges into intelligent, scalable solutions.
                  </p>

                  <a
                    className={s.founderLink}
                    href="https://www.linkedin.com/in/dr-ragupathy-palaniswamy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Connect on LinkedIn</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </div>
              </article>

              {/* Founder 2: Boopana */}
              <article className={s.founderCard}>
                <div className={`${s.founderVisual} ${s.founderVisual2}`}>
                  <div className={s.visualOrbit1} aria-hidden="true" />
                  <div className={s.visualOrbit2} aria-hidden="true" />
                  <div className={s.initials}>B</div>
                  <span className={s.visualBadge}>Founder profile</span>
                </div>

                <div className={s.founderContent}>
                  <span className={s.roleBadge}>Co-founder</span>
                  <h3 className={s.founderName}>Boopana</h3>
                  <p className={s.credential}>
                    B.E. Electronics & Communication · MBA Finance
                  </p>

                  <p className={s.bioText}>
                    Boopana brings 5+ years of professional experience across
                    retail, business, operations, strategy and finance.
                  </p>
                  <p className={s.bioText}>
                    Combining an engineering foundation with an MBA in Finance,
                    She brings a practical understanding of how businesses
                    operate and grow. At Docsynecx, he contributes to business
                    strategy, operational development and growth  helping
                    translate customer needs into meaningful business solutions.
                  </p>

                  <a
                    className={s.founderLink}
                    href="https://www.linkedin.com/in/boopana-sriganesh"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Connect on LinkedIn</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* SECTION 03: WHAT GUIDES US (OUR PRINCIPLES)                   */}
        {/* ============================================================= */}
        <section
          className={`${s.section} ${s.principlesSection}`}
          id="principles"
        >
          <div className={s.shell}>
            <div className={s.principleHeader}>
              <p className={s.eyebrow}>03 / What guides us</p>
              <h2 className={s.sectionTitle}>
                Good technology starts with the{" "}
                <span className={s.accent}>right principles.</span>
              </h2>
              <p className={s.principleSub}>
                The way we build matters as much as what we build. These beliefs
                shape our products, our partnerships and the experience we
                create for customers.
              </p>
            </div>

            <div className={s.principleGrid}>
              {principles.map((pr) => {
                const IconComponent = pr.icon;
                return (
                  <article key={pr.title} className={s.principleCard}>
                    <div className={s.principleIconWrapper} aria-hidden="true">
                      <IconComponent size={20} strokeWidth={2.2} />
                    </div>
                    <h3 className={s.principleTitle}>{pr.title}</h3>
                    <p className={s.principleDesc}>{pr.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* SECTION 04: WHERE WE WORK (OFFICE IN COIMBATORE)             */}
        {/* ============================================================= */}
        <section className={`${s.section} ${s.officeSection}`} id="office">
          <div className={s.shell}>
            <div className={s.officeContent}>
              <p className={`${s.eyebrow} ${s.officeEyebrow}`}>
                04 / Where we work
              </p>
              <h2 className={s.officeTitle}>
                Rooted in Coimbatore.{" "}
                <span className={s.accent}>Building for everywhere.</span>
              </h2>
              <p className={s.officeDesc}>
                Coimbatore is where our ideas take shape, our team
                collaborates and we build technology for businesses with
                ambitions beyond borders.
              </p>

              <div className={s.officeLocationLine}>
                <span className={s.pulseGlowDot} aria-hidden="true" />
                <span className={s.locationName}>
                  Coimbatore, Tamil Nadu, India
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* CLOSING CTA BANNER: THE NEXT CHAPTER (FinanceClosingCta)      */}
        {/* ============================================================= */}
        <FinanceClosingCta
          eyebrow="THE NEXT CHAPTER"
          title={
            <>
              Let’s make business work<br />
              <span>better.</span>
            </>
          }
          copy="Whether you’re exploring intelligent automation, looking for a technology partner or simply curious about what we’re building, we’d love to hear from you."
          primaryHref="/contact/"
          primaryText="Start a conversation"
          secondaryHref="/demo/"
          secondaryText="Request a Demo"
        />
      </main>

      <ShipsyFooter />
    </div>
  );
}

export default AboutPage;
