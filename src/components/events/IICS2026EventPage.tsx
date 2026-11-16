'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Check,
  MapPin,
  Building2,
  ArrowUpRight,
  ArrowRight,
  Radio,
  Layers,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { LandingNavigation } from '../LandingNavigation';
import { ShipsyFooter } from '../ShipsyFooter';
import { IICS_2026_EVENT } from '@/src/content/events';
import s from './IICS2026EventPage.module.css';

export function IICS2026EventPage() {
  const event = IICS_2026_EVENT;

  const [isFlipped, setIsFlipped] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const passContainerRef = useRef<HTMLDivElement>(null);

  const handleFlipToggle = () => {
    setIsFlipped((prev) => !prev);
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      passContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Please enter your name';
    if (!formData.company.trim()) errors.company = 'Please enter your company';
    if (!formData.email.trim()) {
      errors.email = 'Please enter your work email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid work email';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Please enter your phone number';
    }
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setFormSubmitted(true);
  };

  return (
    <div className={s.pageWrapper}>
      {/* Global Navigation */}
      <LandingNavigation />

      <main className={s.mainContent}>
        {/* Subtle Background Pattern & Glow */}
        <div className={s.bgPattern} aria-hidden="true" />
        <div className={s.bgAmbientGlow} aria-hidden="true" />

        <div className="site-shell">
          <div className={s.viewportGrid}>
            {/* ============================================================= */}
            {/* LEFT COLUMN: Event Headline, Highlights & Direct Action       */}
            {/* ============================================================= */}
            <div className={s.pitchColumn}>
              {/* Eyebrow with Dash (same design as DOCSYNECX / FINANCE DESK) */}
              <p className={s.eyebrow}>
                {event.shortName} / EXHIBITOR
              </p>

              {/* Main Headline */}
              <h1 className={s.headline}>
                Meet Docsynecx at <span className={s.accent}>{event.shortName}</span>
              </h1>

              {/* Event Positioning Pill */}
              <div className={s.positioningPill}>
                <Layers size={14} aria-hidden="true" />
                <span>{event.positioning}</span>
              </div>

              {/* Concise Summary Description */}
              <p className={s.summary}>{event.summary}</p>

              {/* Crisp Bento Highlights */}
              <div className={s.highlightsGrid}>
                {event.highlights.map((item) => (
                  <div key={item.title} className={s.highlightCard}>
                    <div className={s.checkIconBox} aria-hidden="true">
                      <Check size={14} strokeWidth={2.8} />
                    </div>
                    <div className={s.highlightContent}>
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct CTAs */}
              <div className={s.actionRow}>
                <button
                  type="button"
                  onClick={handleFlipToggle}
                  className={`button-primary ${s.primaryCta}`}
                  aria-expanded={isFlipped}
                >
                  <span>{isFlipped ? 'View Exhibitor Pass' : `Book a Meeting at Booth ${event.booth}`}</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </button>

                <Link href="/contact/" className={`button-secondary ${s.secondaryCta}`}>
                  <span>Contact Our Team</span>
                </Link>
              </div>
            </div>

            {/* ============================================================= */}
            {/* RIGHT COLUMN: 3D Flip Exhibitor Pass & Meeting Form Card      */}
            {/* ============================================================= */}
            <div ref={passContainerRef} className={s.passContainer}>
              <div className={`${s.passFlipper} ${isFlipped ? s.isFlipped : ''}`}>
                {/* ---------------- FRONT FACE: OFFICIAL EXHIBITOR INVITATION PASS (DARK BLUE) ---------------- */}
                <div className={`${s.passCard} ${s.passFront}`} role="region" aria-label="IICS 2026 Exhibitor Invitation Pass">
                  {/* Real Physical Card Slipcase Notch */}
                  <div className={s.thumbNotch} aria-hidden="true" />

                  {/* Top Row: Dates/Venue on Left, Cargo Show Logo on Right */}
                  <div className={s.invitationTopRow}>
                    <div className={s.invitationDatesBlock}>
                      <span className={s.invitationDates}>{event.date}</span>
                      <span className={s.invitationVenue}>{event.venue}</span>
                      <span className={s.invitationLocation}>{event.location}</span>
                    </div>

                    <div className={s.cargoLogoCapsule}>
                      <img
                        src="/images/events/iics_cargo_logo.png"
                        alt="India International Cargo Show 2026"
                        className={s.cargoLogoImg}
                      />
                    </div>
                  </div>

                  {/* Gold Script "You're Invited" */}
                  <div className={s.scriptInvited}>You&apos;re Invited</div>

                  {/* Centerpiece Circular Medallion */}
                  <div className={s.medallionWrapper}>
                    <div className={s.circularMedallion}>
                      <svg className={s.medallionSkyline} viewBox="0 0 160 50" fill="currentColor" aria-hidden="true">
                        <path d="M0,50 L0,38 L12,38 L12,30 L16,30 L16,38 L30,38 L30,22 L34,22 L34,16 L38,16 L38,22 L42,22 L42,38 L54,38 L54,26 L60,26 L60,18 L64,14 L68,10 L72,14 L76,18 L76,26 L82,26 L82,38 L96,38 L96,20 L102,14 L108,20 L108,38 L122,38 L122,28 L128,28 L128,38 L142,38 L142,24 L146,24 L146,38 L160,38 L160,50 Z" />
                      </svg>
                      <div className={s.medallionInner}>
                        <span className={s.medallionTitle}>IICS</span>
                        <span className={s.medallionYear}>2026</span>
                        <span className={s.medallionEdition}>MUMBAI EDITION</span>
                      </div>
                    </div>
                  </div>

                  {/* Docsynecx Booth Callout Sticker */}
                  <div className={s.boothSticker}>
                    <div className={s.boothStickerLabel}>VISIT OUR BOOTH · {event.booth}</div>
                    <div className={s.boothLogoWrapper}>
                      <img
                        src="/Docsynecx-Logo.svg"
                        alt="Docsynecx"
                        className={s.boothLogoImg}
                        width={140}
                        height={36}
                      />
                    </div>
                    <a
                      href={event.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={s.boothStickerLoc}
                      title="Open Jio World Convention Centre in Google Maps"
                    >
                      <MapPin size={11} aria-hidden="true" />
                      <span>{event.venue} · {event.location}</span>
                      <ArrowUpRight size={10} aria-hidden="true" />
                    </a>
                  </div>

                  {/* Primary Pass Flip Action - Same behavior as Solution Page Button */}
                  <button
                    type="button"
                    onClick={() => setIsFlipped(true)}
                    className={`button-primary ${s.passButton}`}
                  >
                    <span>Plan Your Visit · Book Meeting</span>
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </button>

                  {/* Mumbai Architectural Skyline & Mumbai Edition (matching physical invitation) */}
                  <div className={s.bottomSkylineSection}>
                    <svg
                      className={s.mumbaiSkylineSvg}
                      viewBox="0 0 360 54"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.42)"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="0" y1="52" x2="360" y2="52" stroke="rgba(255, 255, 255, 0.28)" />
                      <rect x="8" y="30" width="14" height="22" />
                      <rect x="26" y="20" width="16" height="32" />
                      <line x1="34" y1="20" x2="34" y2="12" />
                      <rect x="46" y="26" width="16" height="26" />
                      <path d="M72,52 L72,16 L82,16 L82,10 Q92,3 102,10 L102,16 L112,16 L112,52" />
                      <path d="M84,52 L84,28 Q92,20 100,28 L100,52" />
                      <circle cx="92" cy="7" r="2.5" />
                      <line x1="72" y1="24" x2="112" y2="24" />
                      <rect x="122" y="18" width="28" height="34" />
                      <path d="M126,18 Q136,5 146,18" />
                      <line x1="136" y1="5" x2="136" y2="1" />
                      <rect x="160" y="10" width="16" height="42" />
                      <path d="M160,10 L168,0 L176,10" />
                      <circle cx="168" cy="18" r="3" />
                      <rect x="186" y="22" width="36" height="30" />
                      <path d="M196,22 Q204,11 212,22" />
                      <path d="M236,52 L250,7 L253,7 L267,52" />
                      <line x1="251" y1="12" x2="240" y2="52" />
                      <line x1="251" y1="20" x2="244" y2="52" />
                      <line x1="252" y1="12" x2="263" y2="52" />
                      <line x1="252" y1="20" x2="259" y2="52" />
                      <rect x="276" y="24" width="18" height="28" />
                      <rect x="300" y="14" width="18" height="38" />
                      <line x1="309" y1="14" x2="309" y2="7" />
                      <rect x="324" y="28" width="16" height="24" />
                      <rect x="344" y="34" width="12" height="18" />
                    </svg>
                    <div className={s.mumbaiEditionFooter}>
                      mumbai edition
                    </div>
                  </div>
                </div>

                {/* ---------------- BACK FACE: MEETING INTAKE FORM ---------------- */}
                <div className={`${s.passCard} ${s.passBack}`} role="region" aria-label="Booth Meeting Request Form">
                  {/* Back Header */}
                  <div className={s.passHeader}>
                    <span className={s.passEyebrow}>
                      <Radio size={13} aria-hidden="true" />
                      MEETING REGISTRATION
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsFlipped(false)}
                      className={s.flipBtn}
                      title="Flip back to Exhibitor Pass"
                    >
                      <RotateCcw size={11} aria-hidden="true" />
                      <span>Back to Pass</span>
                    </button>
                  </div>

                  {/* Back Content Area */}
                  {formSubmitted ? (
                    <div className={s.backSuccessState}>
                      <div className={s.backSuccessIcon} aria-hidden="true">
                        <CheckCircle2 size={36} />
                      </div>
                      <h3 className={s.backSuccessTitle}>Meeting Request Received!</h3>
                      <p className={s.backSuccessText}>
                        Thank you, <strong>{formData.name}</strong>. We’ve reserved your request for Booth {event.booth}. Our team will connect at <strong>{formData.email}</strong> to coordinate your meeting slot.
                      </p>
                      <div className={s.backSuccessActions}>
                        <button
                          type="button"
                          onClick={() => {
                            setFormSubmitted(false);
                            setFormData({ name: '', company: '', email: '', phone: '', message: '' });
                          }}
                          className={s.backResetBtn}
                        >
                          Submit another request
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsFlipped(false)}
                          className={s.backFlipBtn}
                        >
                          <span>Flip to Pass</span>
                          <RotateCcw size={12} aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className={s.backForm} noValidate>
                      <div className={s.eventTitleBlock}>
                        <h2 className={s.eventName}>Schedule a Meeting</h2>
                        <p className={s.eventCategory}>
                          Reserve a 1-on-1 consultation slot at Booth {event.booth}
                        </p>
                      </div>

                      <div className={s.backFormGrid}>
                        <div className={s.backFormField}>
                          <label htmlFor="pass-name" className={s.backFieldLabel}>
                            Name <span className={s.required}>*</span>
                          </label>
                          <input
                            id="pass-name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => {
                              setFormData({ ...formData, name: e.target.value });
                              if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                            }}
                            placeholder="Your full name"
                            className={`${s.passInput} ${formErrors.name ? s.passInputError : ''}`}
                            required
                          />
                          {formErrors.name && <span className={s.passErrorText}>{formErrors.name}</span>}
                        </div>

                        <div className={s.backFormField}>
                          <label htmlFor="pass-company" className={s.backFieldLabel}>
                            Company <span className={s.required}>*</span>
                          </label>
                          <input
                            id="pass-company"
                            type="text"
                            value={formData.company}
                            onChange={(e) => {
                              setFormData({ ...formData, company: e.target.value });
                              if (formErrors.company) setFormErrors({ ...formErrors, company: '' });
                            }}
                            placeholder="Company name"
                            className={`${s.passInput} ${formErrors.company ? s.passInputError : ''}`}
                            required
                          />
                          {formErrors.company && <span className={s.passErrorText}>{formErrors.company}</span>}
                        </div>

                        <div className={s.backFormField}>
                          <label htmlFor="pass-email" className={s.backFieldLabel}>
                            Work email <span className={s.required}>*</span>
                          </label>
                          <input
                            id="pass-email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => {
                              setFormData({ ...formData, email: e.target.value });
                              if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                            }}
                            placeholder="name@company.com"
                            className={`${s.passInput} ${formErrors.email ? s.passInputError : ''}`}
                            required
                          />
                          {formErrors.email && <span className={s.passErrorText}>{formErrors.email}</span>}
                        </div>

                        <div className={s.backFormField}>
                          <label htmlFor="pass-phone" className={s.backFieldLabel}>
                            Phone number <span className={s.required}>*</span>
                          </label>
                          <input
                            id="pass-phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => {
                              setFormData({ ...formData, phone: e.target.value });
                              if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                            }}
                            placeholder="+91 98765 43210"
                            className={`${s.passInput} ${formErrors.phone ? s.passInputError : ''}`}
                            required
                          />
                          {formErrors.phone && <span className={s.passErrorText}>{formErrors.phone}</span>}
                        </div>

                        <div className={`${s.backFormField} ${s.fullWidth}`}>
                          <label htmlFor="pass-message" className={s.backFieldLabel}>
                            Message <span className={s.optional}>(Optional)</span>
                          </label>
                          <textarea
                            id="pass-message"
                            rows={3}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Any specific workflows, integrations or preferred meeting time?"
                            className={s.passTextarea}
                          />
                        </div>
                      </div>

                      <div className={s.backFormActions}>
                        <button type="submit" className={`button-primary ${s.meetSubmitButton}`}>
                          <span>Meet us</span>
                          <ArrowUpRight size={15} aria-hidden="true" />
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Global Dark Navy Footer */}
      <ShipsyFooter />
    </div>
  );
}

export default IICS2026EventPage;
