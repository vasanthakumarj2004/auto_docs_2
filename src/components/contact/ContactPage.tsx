'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Mail,
  Phone,
  Send,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Compass,
  ReceiptText,
  Truck,
  LifeBuoy,
  Sparkles,
  Clock,
  Calendar,
} from 'lucide-react';
import { LandingNavigation } from '../LandingNavigation';
import { ShipsyFooter } from '../ShipsyFooter';
import { FinanceClosingCta } from '../finance/FinanceClosingCta';
import s from './ContactPage.module.css';

export function ContactPage() {
  // Satellite toggle state for Google Map
  const [isSat, setIsSat] = useState(false);

  // Math Captcha State
  const [num1, setNum1] = useState(4);
  const [num2, setNum2] = useState(4);
  const [userCaptcha, setUserCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState('');

  // Form Field State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    description: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 8) + 1;
    const b = Math.floor(Math.random() * 8) + 1;
    setNum1(a);
    setNum2(b);
    setUserCaptcha('');
    setCaptchaError('');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Please enter your full name.';
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid work email address.';
    }
    if (!formData.phone.trim()) errors.phone = 'Please enter your contact phone number.';
    if (!formData.company.trim()) errors.company = 'Please enter your company or organization name.';
    if (!formData.description.trim()) errors.description = 'Please let us know how we can help you.';

    const expected = num1 + num2;
    if (!userCaptcha.trim()) {
      setCaptchaError('Please solve the captcha.');
      errors.captcha = 'Required';
    } else if (parseInt(userCaptcha.trim(), 10) !== expected) {
      setCaptchaError(`Incorrect answer. What is ${num1} + ${num2}?`);
      errors.captcha = 'Incorrect';
    } else {
      setCaptchaError('');
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      company: '',
      description: '',
    });
    setUserCaptcha('');
    setCaptchaError('');
    generateCaptcha();
    setIsSubmitted(false);
  };

  const scrollToForm = () => {
    const target = document.getElementById('contact-form');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const reasonRoutes = [
    {
      no: '01',
      title: 'Automate finance documents',
      desc: 'Invoices, bank reconciliation, GST and posting to Tally or Zoho.',
      href: '/demo/?track=finance',
      meta: 'Opens demo booking',
      metaIcon: Calendar,
      cta: 'Book a finance demo',
      icon: ReceiptText,
      iconBg: '#E8F9F3',
      iconColor: '#0B6B4E',
      isExternal: false,
    },
    {
      no: '02',
      title: 'Automate freight operations',
      desc: 'RFQ-to-booking, shipment ops and CargoWise jobs from email.',
      href: '/demo/?track=logistics',
      meta: 'Opens demo booking',
      metaIcon: Calendar,
      cta: 'Book a logistics demo',
      icon: Truck,
      iconBg: '#E0F2FE',
      iconColor: '#0284C7',
      isExternal: false,
    },
    {
      no: '03',
      title: 'I need support',
      desc: 'Existing customer with a question or an issue to fix.',
      href: 'mailto:success@docsynecx.com',
      meta: 'Reply within 24 hours',
      metaIcon: Clock,
      cta: 'success@docsynecx.com',
      icon: LifeBuoy,
      iconBg: '#F3E8FF',
      iconColor: '#7C3AED',
      isExternal: true,
    },
    {
      no: '04',
      title: 'Something else',
      desc: 'Partnerships, careers, press, or a plain question.',
      href: 'mailto:hello@docsynecx.com',
      meta: 'Reply within 24 hours',
      metaIcon: Clock,
      cta: 'hello@docsynecx.com',
      icon: Sparkles,
      iconBg: '#FEF3C7',
      iconColor: '#D97706',
      isExternal: true,
    },
  ];

  return (
    <div className={s.pageWrapper}>
      <LandingNavigation />

      {/* 1. Hero Section */}
      <section className={s.heroSection}>
        <div className={s.shell}>
          <div className={s.heroContent}>
            <div className={s.eyebrow}>CONTACT</div>
            <h1 className={s.heroTitle}>
              Talk <span>to us.</span>
            </h1>
            <p className={s.heroSubtitle}>
              Real people read every message and reply within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Reach Out By Reason */}
      <section className={s.reasonsSection}>
        <div className={s.shell}>
          <div className={s.sectionHeader}>
            <div className={s.eyebrow}>FIND YOUR WAY TO US</div>
            <h2 className={s.sectionHeading}>
              Choose the conversation{' '}
              <span>that best fits your needs.</span>
            </h2>
            <p className={s.sectionLead}>
              Choose the topic that best matches your needs, and we&apos;ll connect you with the right team.
            </p>
          </div>

          <div className={s.cardsGrid}>
            {reasonRoutes.map((r) => {
              const IconComp = r.icon;
              const MetaIconComp = r.metaIcon;

              const cardContent = (
                <>
                  <div>
                    <div className={s.cardTopRow}>
                      <div
                        className={s.cardIconBadge}
                        style={{ backgroundColor: r.iconBg, color: r.iconColor }}
                      >
                        <IconComp size={22} />
                      </div>
                      <div className={s.cardArrowCircle} aria-hidden="true">
                        <ArrowUpRight size={17} />
                      </div>
                    </div>

                    <div className={s.cardBody}>
                      <h3 className={s.cardTitle}>{r.title}</h3>
                      <p className={s.cardDesc}>{r.desc}</p>
                    </div>
                  </div>

                  <div className={s.cardBottomMeta}>
                    <div className={s.cardMetaTag}>
                      <MetaIconComp size={14} />
                      <span>{r.meta}</span>
                    </div>
                    <span className={s.cardActionText}>
                      <span>{r.cta}</span>
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </>
              );

              if (r.isExternal) {
                return (
                  <a
                    key={r.no}
                    href={r.href}
                    className={s.reasonCard}
                  >
                    {cardContent}
                  </a>
                );
              }

              return (
                <Link
                  key={r.no}
                  href={r.href}
                  className={s.reasonCard}
                >
                  {cardContent}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Direct Contact & Company Details */}
      <section className={s.infoSplitSection}>
        <div className={s.shell}>
          <div className={s.splitGrid}>
            {/* Direct Card (Refined White Card UX) */}
            <div className={s.directCard}>
              <div className={s.directEyebrow}>REACH US DIRECTLY</div>
              <h3 className={s.directTitle}>Email or call</h3>
              <p className={s.directSubtitle}>
                One inbox, real people on the other end.
              </p>
              <div className={s.directLinksList}>
                <a href="mailto:hello@docsynecx.com" className={s.directLinkRow}>
                  <div className={s.directIconWrap}>
                    <Mail size={18} />
                  </div>
                  <div className={s.directLinkContent}>
                    <span className={s.directLinkLabel}>Email us directly</span>
                    <span className={s.directLinkValue}>hello@docsynecx.com</span>
                  </div>
                  <ArrowRight size={16} className={s.directLinkArrow} />
                </a>

                <a href="tel:+919344776623" className={s.directLinkRow}>
                  <div className={s.directIconWrap}>
                    <Phone size={18} />
                  </div>
                  <div className={s.directLinkContent}>
                    <span className={s.directLinkLabel}>Call us (India)</span>
                    <span className={s.directLinkValue}>+91 93447 76623</span>
                  </div>
                  <ArrowRight size={16} className={s.directLinkArrow} />
                </a>
              </div>
            </div>

            {/* Company Card (White) */}
            <div className={s.companyCard}>
              <div className={s.eyebrow}>COMPANY DETAILS</div>
              <h3 className={s.companyTitle}>For your records</h3>

              <div className={s.detailsList}>
                <div className={s.detailRow}>
                  <span className={s.detailLabel}>Entity</span>
                  <span className={s.detailValue}>
                    SynecxAI Labs Private Limited
                  </span>
                </div>

                <div className={s.detailRow}>
                  <span className={s.detailLabel}>HQ</span>
                  <span className={s.detailValue}>
                    Coimbatore, Tamil Nadu, India
                  </span>
                </div>

                <div className={s.detailRow}>
                  <span className={s.detailLabel}>GSTIN</span>
                  <span className={s.detailValue}>
                    33ABNCS3469C1Z9
                  </span>
                </div>

                <div className={s.detailRow}>
                  <span className={s.detailLabel}>Web</span>
                  <span className={s.detailValue}>
                    docsynecx.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Find Us Section (Google Maps Layout) */}
      <section className={s.findUsSection}>
        <div className={s.shell}>
          <div className={s.findUsHeader}>
            <div className={s.eyebrow}>FIND US</div>
            <h2 className={s.sectionHeading}>Coimbatore, Tamil Nadu.</h2>
            <p className={s.sectionLead}>
              Where the Docsynecx team builds. Visiting? Message us first so someone is there to meet you.
            </p>
          </div>

          <div className={s.googleMapContainer}>
            {/* Live Google Map Iframe with SynecX AI Labs pin & native place card */}
            <iframe
              src={`https://maps.google.com/maps?q=SynecX%20AI%20Labs%20Private%20Limited,%20Thadagam%20Main%20Road,%20Kanuvai,%20Coimbatore,%20Tamil%20Nadu%20641108&t=${isSat ? 'k' : 'm'}&z=15&ie=UTF8&iwloc=&output=embed`}
              title="SynecX AI Labs Google Map Location"
              className={s.googleMapIframe}
              loading="lazy"
              allowFullScreen
            />

            {/* Satellite / Street Map Mode Toggle Thumbnail */}
            <button
              type="button"
              onClick={() => setIsSat((prev) => !prev)}
              aria-label={isSat ? 'Switch to Map view' : 'Switch to Satellite view'}
              className={s.gmSatThumbnailBtn}
              style={{
                backgroundImage: isSat
                  ? 'url("https://maps.gstatic.com/tactile/layerswitcher/vector_1x.png")'
                  : 'url("https://maps.gstatic.com/tactile/layerswitcher/satellite_1x.png")',
                backgroundColor: isSat ? '#ffffff' : '#1e3a1e',
              }}
              title={isSat ? 'Switch to Default Map' : 'Switch to Satellite Imagery'}
            />
          </div>

          <div style={{ textAlign: 'center' }}>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=SynecX+AI+Labs+Kanuvai+Coimbatore"
              target="_blank"
              rel="noopener noreferrer"
              className={s.getDirectionsBottom}
            >
              Get directions <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* 6. Closing CTA Banner matching FinanceClosingCta design */}
      <FinanceClosingCta
        bg="white"
        eyebrow="LET'S BUILD SOMETHING SMARTER."
        title={
          <>
            Your documents. <br />
            <span>Connected. Automated.</span>
          </>
        }
        copy="See how Docsynecx transforms document processing into structured data and seamlessly syncs it with your ERP systems."
        primaryHref="/demo/#demo-form"
        primaryText="Book a demo"
      />

      <ShipsyFooter />
    </div>
  );
}
