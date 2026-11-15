'use client';

import React from 'react';
import Link from 'next/link';
import {
  Check,
  Calendar,
  MapPin,
  Building2,
  Sparkles,
  ArrowUpRight,
  Radio,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import { LandingNavigation } from '../LandingNavigation';
import { ShipsyFooter } from '../ShipsyFooter';
import { IICS_2026_EVENT } from '@/src/content/events';
import s from './IICS2026EventPage.module.css';

export function IICS2026EventPage() {
  const event = IICS_2026_EVENT;

  return (
    <div className={s.pageWrapper}>
      {/* Global Navigation (loads in default compact transitioned size) */}
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
              {/* Eyebrow Badge */}
              <div className={s.eyebrowBadge}>
                <span className={s.pulseDot} aria-hidden="true" />
                <span>{event.shortName} · EXHIBITOR</span>
              </div>

              {/* Main Headline */}
              <h1 className={s.headline}>
                Meet Docsynecx at <span className={s.accent}>{event.shortName}</span>
              </h1>

              {/* Event Positioning Pill */}
              <div className={s.positioningPill}>
                <Layers size={15} aria-hidden="true" />
                <span>{event.positioning}</span>
              </div>

              {/* Summary Description */}
              <p className={s.summary}>{event.summary}</p>

              {/* 4 Crisp Value Expectations */}
              <ul className={s.highlightsList} role="list">
                {event.highlights.map((item) => (
                  <li key={item.title} className={s.highlightItem}>
                    <span className={s.checkIconBox} aria-hidden="true">
                      <Check size={14} strokeWidth={2.8} />
                    </span>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Direct CTAs */}
              <div className={s.actionRow}>
                <Link
                  href="/demo/?event=iics-2026#demo-form"
                  className={s.primaryCta}
                >
                  <span>Book a Meeting at Booth {event.booth}</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>

                <Link href="/demo/" className={s.secondaryCta}>
                  <span>Contact Our Team</span>
                </Link>
              </div>
            </div>

            {/* ============================================================= */}
            {/* RIGHT COLUMN: The "Booth Q53" Exhibition Pass Card           */}
            {/* ============================================================= */}
            <div className={s.passContainer}>
              <div className={s.passCard} role="region" aria-label="IICS 2026 Exhibitor Pass">
                {/* Pass Header */}
                <div className={s.passHeader}>
                  <span className={s.passEyebrow}>
                    <Radio size={13} aria-hidden="true" />
                    OFFICIAL EXHIBITOR PASS
                  </span>
                  <span className={s.passBadgeYear}>2026</span>
                </div>

                {/* Event Name & Category */}
                <div className={s.eventTitleBlock}>
                  <h2 className={s.eventName}>{event.name}</h2>
                  <p className={s.eventCategory}>{event.category}</p>
                </div>

                {/* Centerpiece Booth Q53 Box */}
                <div className={s.boothHeroBox}>
                  <div className={s.boothLabel}>CONFIRMED EXHIBITOR LOCATION</div>
                  <div className={s.boothNumber}>BOOTH {event.booth}</div>
                  <div className={s.boothSub}>
                    <ShieldCheck size={14} color="#18cb96" aria-hidden="true" />
                    <span>Docsynecx Multimodal Automation Stand</span>
                  </div>
                </div>

                {/* Factsheet Grid */}
                <div className={s.factsheetGrid}>
                  <div className={s.factItem}>
                    <span className={s.factLabel}>Exhibitor</span>
                    <span className={s.factValue}>
                      <Building2 size={13} color="#18cb96" aria-hidden="true" />
                      {event.exhibitor}
                    </span>
                  </div>

                  <div className={s.factItem}>
                    <span className={s.factLabel}>Booth Number</span>
                    <span className={s.factValue} style={{ color: '#18cb96' }}>
                      {event.booth}
                    </span>
                  </div>

                  <div className={s.factItem}>
                    <span className={s.factLabel}>Event Dates</span>
                    <span className={s.pendingPill}>{event.date}</span>
                  </div>

                  <div className={s.factItem}>
                    <span className={s.factLabel}>City / State</span>
                    <span className={s.factValue}>
                      <MapPin size={13} color="#18cb96" aria-hidden="true" />
                      Mumbai, MH
                    </span>
                  </div>
                </div>

                {/* Confirmed Venue & Address Card */}
                <div className={s.venueCard}>
                  <div className={s.venueCardHeader}>
                    <span className={s.venueTitle}>
                      <Building2 size={13} color="#18cb96" aria-hidden="true" />
                      {event.venue}
                    </span>
                  </div>
                  <p className={s.venueAddressText}>{event.fullAddress}</p>
                  <a
                    href={event.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={s.directionsLink}
                  >
                    <span>View on Google Maps</span>
                    <ArrowUpRight size={12} aria-hidden="true" />
                  </a>
                </div>

                {/* Primary Pass Action */}
                <Link
                  href="/demo/?event=iics-2026#demo-form"
                  className={s.passButton}
                >
                  <span>Plan Your Visit to Booth {event.booth}</span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>

                <p className={s.passFooterNote}>
                  Official exhibition floor map link and visitor registration coordinates will be updated once confirmed by event organizers.
                </p>
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
