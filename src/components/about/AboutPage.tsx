import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Target,
  Compass,
  CheckCircle2,
  Cpu,
  Layers,
  Server,
  ShieldCheck,
  UserCheck,
  Zap,
  Award,
  HeartHandshake,
} from 'lucide-react';
import { LandingNavigation } from '../LandingNavigation';
import { ShipsyFooter } from '../ShipsyFooter';
import s from './AboutPage.module.css';

export function AboutPage() {
  const whyPoints = [
    {
      title: 'AI-driven data capture from any document format',
      description:
        'Intelligently parse PDFs, scanned images, multi-page bills, and digital spreadsheets with multi-modal neural extractors.',
      icon: Cpu,
    },
    {
      title: 'Built for enterprise scalability & industry use cases',
      description:
        'Proven architecture tailored specifically for high-volume accounts payable, logistics, freight forwarders, and distribution.',
      icon: Layers,
    },
    {
      title: 'On-premise and secure cloud deployment options',
      description:
        'Flexible enterprise deployment paradigms built to comply with data sovereignty, banking mandates, and private enterprise clouds.',
      icon: Server,
    },
    {
      title: 'Secure, compliant, and easy to integrate',
      description:
        'Pre-built bi-directional connectors for Tally Prime, Zoho Books, and CargoWise with automated reconciliation checks.',
      icon: ShieldCheck,
    },
    {
      title: 'Human-in-the-loop workflows for higher accuracy',
      description:
        'Exception-only review queues allow teams to inspect edge cases without slowing down automated high-confidence straight-through posting.',
      icon: UserCheck,
    },
  ];

  const principles = [
    {
      title: 'Accuracy-first approach',
      description:
        'Our AI models are trained for maximum accuracy. We continuously improve our extraction algorithms to ensure your data is captured correctly, every time.',
      icon: Award,
    },
    {
      title: 'Focus on innovation',
      description:
        'Technology is our craft and we back it up with continuous R&D investments. We stay ahead of the curve to bring you the latest in document AI.',
      icon: Zap,
    },
    {
      title: 'Customer-first philosophy',
      description:
        'It’s our customers’ trust and success that drives us. No matter the size of your business, we’re here to help you eliminate manual document processing.',
      icon: HeartHandshake,
    },
  ];

  return (
    <div className={s.pageWrapper}>
      <LandingNavigation />

      {/* Hero Section */}
      <section className={s.heroSection}>
        <div className={s.shell}>
          <div className={s.badge}>
            <Sparkles size={13} className={s.badgeIcon} />
            <span>INTELLIGENT DOCUMENT PROCESSING PLATFORM</span>
          </div>

          <h1 className={s.heroTitle}>The Story Behind Docsynecx Innovation</h1>

          <p className={s.heroSubtitle}>
            Transforming document processing with intelligent automation
          </p>

          <div className={s.heroActions}>
            <Link href="/demo/" className={s.primaryBtn}>
              <span>Get Started Free</span>
              <ArrowRight size={16} />
            </Link>
            <Link href="/demo/" className={s.secondaryBtn}>
              <span>Request Demo</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Narrative Block */}
      <section className={s.narrativeSection}>
        <div className={s.shell}>
          <div className={s.narrativeCard}>
            <h2 className={s.narrativeHeader}>About Docsynecx</h2>
            <div className={s.narrativeBody}>
              <p>
                <strong>Docsynecx</strong> is an enterprise-grade Document AI platform built by{' '}
                <strong>SynecxAI Labs Private Limited</strong> to help organizations unlock the value
                hidden within their operational documents.
              </p>
              <p>
                We specialize in transforming unstructured and semi-structured documents — such as
                invoices, bills of lading, forms, contracts, and shipping reports — into accurate,
                structured, and actionable data using advanced machine learning and artificial
                intelligence. Our platform enables businesses to automate document-intensive
                workflows, improve operational throughput, maintain strict compliance, and gain
                real-time business insights.
              </p>
              <p>
                Designed for scale, security, and enterprise reliability, Docsynecx integrates
                seamlessly with major ERPs, accounting systems, and logistics suites (including Tally,
                Zoho Books, and CargoWise), empowering finance, operations, and compliance teams to
                move faster with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className={s.missionVisionSection}>
        <div className={s.shell}>
          <div className={s.missionVisionGrid}>
            {/* Mission Card */}
            <div className={s.mvCard}>
              <div className={s.mvIconWrapper}>
                <Target size={24} className={s.mvIcon} />
              </div>
              <h3 className={s.mvTitle}>Our Mission</h3>
              <p className={s.mvText}>
                To simplify and automate complex document workflows through AI-powered
                intelligence, enabling organizations to focus on strategic work while we handle the
                data.
              </p>
            </div>

            {/* Vision Card */}
            <div className={s.mvCard}>
              <div className={s.mvIconWrapper}>
                <Compass size={24} className={s.mvIcon} />
              </div>
              <h3 className={s.mvTitle}>Our Vision</h3>
              <p className={s.mvText}>
                To become the global standard in document automation by making enterprise-grade IDP
                accessible, intelligent, and scalable for every business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Docsynecx */}
      <section className={s.whySection}>
        <div className={s.shell}>
          <div className={s.sectionHeader}>
            <span className={s.sectionEyebrow}>Enterprise Capabilities</span>
            <h2 className={s.sectionTitle}>Why Choose Docsynecx?</h2>
            <p className={s.sectionSub}>
              Engineered from the ground up to solve complex enterprise document bottlenecks.
            </p>
          </div>

          <div className={s.whyGrid}>
            {whyPoints.map((point, index) => {
              const IconComp = point.icon;
              return (
                <div key={index} className={s.whyCard}>
                  <div className={s.whyIconBox}>
                    <IconComp size={20} className={s.whyIcon} />
                  </div>
                  <div className={s.whyContent}>
                    <h3 className={s.whyItemTitle}>{point.title}</h3>
                    <p className={s.whyItemDesc}>{point.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Principles */}
      <section className={s.principlesSection}>
        <div className={s.shell}>
          <div className={s.sectionHeader}>
            <span className={s.sectionEyebrow}>Our Foundation</span>
            <h2 className={s.sectionTitle}>The core values and principles that drive us</h2>
            <p className={s.sectionSub}>
              Guided by relentless engineering rigor and commitment to customer accuracy.
            </p>
          </div>

          <div className={s.principlesGrid}>
            {principles.map((pr, idx) => {
              const IconComponent = pr.icon;
              return (
                <div key={idx} className={s.principleCard}>
                  <div className={s.principleIconBox}>
                    <IconComponent size={22} className={s.principleIcon} />
                  </div>
                  <h3 className={s.principleTitle}>{pr.title}</h3>
                  <p className={s.principleDesc}>{pr.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Conversion CTA Banner */}
      <section className={s.ctaSection}>
        <div className={s.shell}>
          <div className={s.ctaCard}>
            <div className={s.ctaContent}>
              <h2 className={s.ctaHeadline}>Ready to Automate Your Document Workflow?</h2>
              <p className={s.ctaSubtext}>
                Experience the power of our IDP solution for seamless document processing and
                intelligent data extraction.
              </p>
              <div className={s.ctaBtnRow}>
                <Link href="/demo/" className={s.ctaWhiteBtn}>
                  <span>Start Free Trial</span>
                  <ArrowRight size={16} />
                </Link>
                <Link href="/contact/" className={s.ctaOutlineBtn}>
                  <span>Talk to Experts</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ShipsyFooter />
    </div>
  );
}
