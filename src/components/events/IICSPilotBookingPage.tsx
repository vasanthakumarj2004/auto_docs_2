'use client';

import React, { useState, useEffect } from 'react';
import { sendEventMeetingEmail, sendIICSPilotBookingEmail } from '@/src/lib/emailjs';
import { supabase } from '@/src/lib/supabase';

interface DaySchedule {
  id: string;
  l: string;
  iso: string;
  t: string[];
  x: string[];
}

const ALL_SLOTS = [
  '11:00',
  '11:20',
  '11:40',
  '12:00',
  '14:00',
  '14:20',
  '14:40',
  '15:00',
  '15:20',
  '15:40',
  '16:00',
];

function getTodayIso() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function createDaySchedule(dateIso: string): DaySchedule {
  const [y, m, d] = dateIso.split('-').map(Number);
  const dateObj = new Date(y, m - 1, d);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayOfWeek = dateObj.getDay(); // 0 is Sun, 6 is Sat, 1-5 is Mon-Fri
  const dayName = days[dayOfWeek];
  const monthName = months[dateObj.getMonth()];
  const dayNum = dateObj.getDate();

  const todayIso = getTodayIso();
  let label = `${dayName} ${dayNum} ${monthName}`;
  if (dateIso === todayIso) {
    label = `Today · ${dayNum} ${monthName}`;
  } else {
    const tmr = new Date();
    tmr.setDate(tmr.getDate() + 1);
    const tmrIso = `${tmr.getFullYear()}-${String(tmr.getMonth() + 1).padStart(2, '0')}-${String(tmr.getDate()).padStart(2, '0')}`;
    if (dateIso === tmrIso) {
      label = `Tomorrow · ${dayNum} ${monthName}`;
    }
  }

  // Only Monday to Friday allow slots (dayOfWeek 1 to 5). Saturday and Sunday are closed.
  const isAllowedWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;

  return {
    id: `day-${dateIso}`,
    l: label,
    iso: dateIso,
    t: isAllowedWeekday ? ALL_SLOTS : [],
    x: [],
  };
}

function generateUpcomingDays(count = 5): DaySchedule[] {
  const list: DaySchedule[] = [];
  const base = new Date();
  let offset = 0;
  // Generate upcoming days strictly for Mon, Tue, Wed, Thu, Fri
  while (list.length < count && offset < 30) {
    const d = new Date(base);
    d.setDate(base.getDate() + offset);
    offset++;
    const dow = d.getDay();
    if (dow === 0 || dow === 6) continue; // Skip Saturday and Sunday

    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const iso = `${y}-${m}-${day}`;
    list.push(createDaySchedule(iso));
  }
  return list;
}

const LS_KEY = 'iics26_bookings';

export function IICSPilotBookingPage() {
  const [step, setStep] = useState<number>(1);
  const [upcomingDays, setUpcomingDays] = useState<DaySchedule[]>(() => generateUpcomingDays(5));
  const [selectedDateIso, setSelectedDateIso] = useState<string>(() => {
    const d = new Date();
    // If Saturday (6) -> skip to Monday (+2)
    // If Sunday (0) -> skip to Monday (+1)
    // If Friday (5) after 16:00 -> skip to Monday (+3)
    // If Mon-Thu after 16:00 -> advance 1 day to next weekday
    if (d.getDay() === 6) {
      d.setDate(d.getDate() + 2);
    } else if (d.getDay() === 0) {
      d.setDate(d.getDate() + 1);
    } else if (d.getDay() === 5 && d.getHours() >= 16) {
      d.setDate(d.getDate() + 3);
    } else if (d.getHours() >= 16) {
      d.setDate(d.getDate() + 1);
    }
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  });
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [bookingRef, setBookingRef] = useState<string>('');
  const [consent, setConsent] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState<boolean>(false);

  // Form 1: Details
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Form 2: Desk
  const [role, setRole] = useState('Owner or director');
  const [system, setSystem] = useState('CargoWise');
  const [volume, setVolume] = useState('25 to 100');
  const [pain, setPain] = useState('Quoting from RFQ emails');

  // Errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [slotErr, setSlotErr] = useState('');
  const [dateErr, setDateErr] = useState('');
  const [sendErr, setSendErr] = useState('');

  // Local storage stored bookings
  const [mineBookings, setMineBookings] = useState<Record<string, { day: string; slot: string; data: any }>>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LS_KEY);
      if (stored) {
        setMineBookings(JSON.parse(stored));
      }
    } catch { }
  }, []);

  const saveMine = (obj: any) => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(obj));
      setMineBookings(obj);
    } catch { }
  };

  const getCurDay = (): DaySchedule => {
    const found = upcomingDays.find((d) => d.iso === selectedDateIso);
    if (found) return found;
    return createDaySchedule(selectedDateIso);
  };

  const getTakenOf = (d: DaySchedule) => {
    const x = d.x.slice();
    Object.keys(mineBookings).forEach((k) => {
      const item = mineBookings[k];
      if ((item.day === d.id || item.day === d.iso) && !x.includes(item.slot) && k !== bookingRef) {
        x.push(item.slot);
      }
    });

    // If day is Today, disable past slots so user cannot book past hours
    if (d.iso === getTodayIso()) {
      const now = new Date();
      const currentMin = now.getHours() * 60 + now.getMinutes();
      d.t.forEach((slotStr) => {
        const [h, m] = slotStr.split(':').map(Number);
        if (h * 60 + m <= currentMin && !x.includes(slotStr)) {
          x.push(slotStr);
        }
      });
    }

    return x;
  };

  const getOpenCount = (d: DaySchedule) => Math.max(0, d.t.length - getTakenOf(d).length);

  const getTotalOpenSlots = () => {
    let tot = 0;
    upcomingDays.forEach((d) => {
      tot += getOpenCount(d);
    });
    return tot;
  };

  const handleDateSelect = (isoStr: string) => {
    if (!isoStr) return;
    const today = getTodayIso();
    // Allow present and future dates only
    const targetIso = isoStr < today ? today : isoStr;

    const [y, m, d] = targetIso.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    const dow = dateObj.getDay();

    // Block Saturday (6) and Sunday (0) from being selected
    if (dow === 0 || dow === 6) {
      setDateErr('Saturday and Sunday are closed. Please select a weekday (Monday to Friday).');
      return;
    }

    setDateErr('');
    setSelectedDateIso(targetIso);
    setSelectedSlot('');
    setSlotErr('');

    setUpcomingDays((prev) => {
      if (prev.some((p) => p.iso === targetIso)) return prev;
      const newDay = createDaySchedule(targetIso);
      const merged = [...prev, newDay].sort((a, b) => a.iso.localeCompare(b.iso));
      return merged;
    });
  };

  const validateForm1 = () => {
    const errs: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) {
      errs['f-name'] = 'Enter your name.';
    } else if (!/^[a-zA-Z\s.'-]+$/.test(name.trim())) {
      errs['f-name'] = 'Name should contain only letters.';
    }
    if (!company.trim() || company.trim().length < 2) {
      errs['f-company'] = 'Enter your company.';
    } else if (!/^[a-zA-Z0-9\s.'&,-]+$/.test(company.trim())) {
      errs['f-company'] = 'Company contains invalid characters.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      errs['f-email'] = 'Enter a valid work email.';
    }
    const cleanPhone = phone.replace(/[\s\-()]/g, '');
    if (!cleanPhone) {
      errs['f-phone'] = 'Enter your mobile number.';
    } else if (/[a-zA-Z]/.test(phone)) {
      errs['f-phone'] = 'Letters and special characters are not allowed.';
    } else if (!/^(\+?91)?[6-9]\d{9}$/.test(cleanPhone) && !/^\+[1-9]\d{7,14}$/.test(cleanPhone) && !/^[6-9]\d{9}$/.test(cleanPhone)) {
      errs['f-phone'] = 'Enter a valid mobile number with country code (e.g. +91 98765 43210).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleForm1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm1()) {
      setStep(2);
      document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleForm2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleForm3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) {
      setSlotErr('Pick a time to continue.');
      return;
    }
    setSlotErr('');
    setStep(4);
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleWaitOtherTime = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!email.trim() || !validateForm1()) {
      setStep(1);
      document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    setIsSubmitting(true);
    const otherRef = 'IICS-REQ-' + Math.floor(1000 + Math.random() * 9000);
    setBookingRef(otherRef);

    // 1. Supabase record for custom slot request
    try {
      await supabase.from('contact_submissions').insert({
        submission_type: 'event_iics2026_pilot_custom_request',
        email: email.trim(),
        company: company.trim() || null,
        message: `[IICS 2026 Pilot Custom Slot Request ${otherRef}]
Attendee: ${name.trim()}
Email: ${email.trim()}
Mobile/WhatsApp: ${phone.trim()}
Company: ${company.trim()}
Reserved Slot: Custom Time Requested (To be coordinated)
Desk Role: ${role || 'N/A'}
Current Software: ${system || 'N/A'}
Weekly Quotes: ${volume || 'N/A'}
Operational Focus: ${pain || 'N/A'}
Location: Booth Q53, Jio World Convention Centre, Mumbai`,
      });
    } catch (err) {
      console.warn('Supabase log:', err);
    }

    // 2. EmailJS notification for custom slot request
    try {
      const emailRes = await sendIICSPilotBookingEmail({
        name: name.trim() || 'Attendee',
        email: email.trim(),
        phone: phone.trim() || 'N/A',
        company: company.trim() || 'N/A',
        ref: otherRef,
        day: 'Custom Time Requested',
        slot: 'To be scheduled',
        role,
        system,
        volume,
        pain,
        event: 'India International Cargo Show (IICS) 2026 (Custom Slot Request)',
        booth: 'Booth Q53',
        type: 'request',
      });
      if (!emailRes.success) {
        console.warn('EmailJS custom request delivery warning:', emailRes.error);
      }
    } catch (err) {
      console.warn('EmailJS log:', err);
    }

    setIsSubmitting(false);
    setStep(7);
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleForm4Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendErr('');
    if (!consent) {
      setErrors((prev) => ({ ...prev, 'f-consent': 'Please tick to continue.' }));
      return;
    }
    setErrors((prev) => {
      const next = { ...prev };
      delete next['f-consent'];
      return next;
    });

    setIsSubmitting(true);
    const ref = 'IICS-' + Math.floor(1000 + Math.random() * 9000);
    const cur = getCurDay();

    const bookingPayload = {
      name: name.trim(),
      company: company.trim(),
      email: email.trim(),
      phone: phone.trim(),
      role,
      system,
      volume,
      pain,
      day: cur.l,
      date: cur.iso,
      slot: selectedSlot,
      tz: 'IST',
      ref,
    };

    // 1. Supabase record with all details
    try {
      await supabase.from('contact_submissions').insert({
        submission_type: 'event_iics2026_pilot_booking',
        email: email.trim(),
        company: company.trim() || null,
        message: `[IICS 2026 Pilot Booking ${ref}]
Attendee: ${name.trim()}
Email: ${email.trim()}
Mobile/WhatsApp: ${phone.trim()}
Company: ${company.trim()}
Reserved Slot: ${cur.l} at ${selectedSlot} IST
Desk Role: ${role}
Current Software: ${system}
Weekly Quotes: ${volume}
Operational Focus: ${pain}
Location: Booth Q53, Jio World Convention Centre, Mumbai`,
      });
    } catch (err) {
      console.warn('Supabase log:', err);
    }

    // 2. EmailJS confirmation with all details
    try {
      const emailRes = await sendIICSPilotBookingEmail({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        company: company.trim(),
        ref,
        day: cur.l,
        slot: selectedSlot,
        role,
        system,
        volume,
        pain,
        event: 'India International Cargo Show (IICS) 2026',
        booth: 'Booth Q53',
        type: 'confirmation',
      });
      if (!emailRes.success) {
        console.warn('EmailJS confirmation delivery warning:', emailRes.error);
      }
    } catch (err) {
      console.warn('EmailJS log:', err);
    }

    // 3. Local state persistence
    const updated = { ...mineBookings };
    updated[ref] = { day: cur.id, slot: selectedSlot, data: bookingPayload };
    saveMine(updated);

    setBookingRef(ref);
    setIsSubmitting(false);
    setStep(5);
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const generateIcsUrl = () => {
    const cur = getCurDay();
    const dateFormatted = cur.iso.replace(/-/g, '');
    const [sh, sm] = selectedSlot.split(':').map(Number);
    let eh = sh;
    let em = sm + 20;
    if (em >= 60) {
      eh += 1;
      em -= 60;
    }
    const sTime = `${dateFormatted}T${String(sh).padStart(2, '0')}${String(sm).padStart(2, '0')}00`;
    const eTime = `${dateFormatted}T${String(eh).padStart(2, '0')}${String(em).padStart(2, '0')}00`;

    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Docsynecx//IICS 2026//EN',
      'BEGIN:VEVENT',
      `UID:${bookingRef}@docsynecx.com`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART;TZID=Asia/Kolkata:${sTime}`,
      `DTEND;TZID=Asia/Kolkata:${eTime}`,
      `SUMMARY:Docsynecx pilot onboarding (${bookingRef})`,
      'DESCRIPTION:20-minute online onboarding call. Keep one sample RFQ email and one shipping document ready. Call link will be sent by email and WhatsApp.',
      'LOCATION:Booth Q53, Jio World Convention Centre, BKC, Mumbai',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(lines);
  };

  const handleCancelBooking = () => {
    setShowCancelConfirm(true);
  };

  const confirmCancellation = () => {
    const updated = { ...mineBookings };
    delete updated[bookingRef];
    saveMine(updated);
    setSelectedSlot('');
    setBookingRef('');
    setShowCancelConfirm(false);
    setStep(6);
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleReschedule = () => {
    const updated = { ...mineBookings };
    delete updated[bookingRef];
    saveMine(updated);
    setSelectedSlot('');
    setStep(3);
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const curDay = getCurDay();
  const takenSlots = getTakenOf(curDay);

  const buttonWobbleStyle: React.CSSProperties = {
    background: '#C2410C',
    color: '#FFFFFF',
    textDecoration: 'none',
    fontWeight: 600,
    border: '2.5px solid #2B2B2B',
    borderRadius: '255px 12px 225px 12px/12px 225px 12px 255px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    display: 'inline-block',
  };

  const backButtonStyle: React.CSSProperties = {
    fontFamily: 'inherit',
    fontWeight: 600,
    background: 'transparent',
    border: '2px solid #2B2B2B',
    borderRadius: '12px',
    padding: '12px 20px',
    cursor: 'pointer',
    color: '#2B2B2B',
    textDecoration: 'none',
    display: 'inline-block',
  };

  return (
    <div
      style={{
        position: 'relative',
        background: '#F4EFE4',
        color: '#2B2B2B',
        fontFamily: 'Inter, sans-serif',
        fontSize: '18px',
        lineHeight: 1.5,
        overflow: 'hidden',
        minHeight: '100vh',
      }}
    >
      {/* Background SVG texture filters */}
      <svg
        width="100%"
        height="100%"
        style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}
        aria-hidden="true"
      >
        <defs>
          <filter id="rough">
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves={2} seed={4} result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale={3} />
          </filter>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={9} />
            <feColorMatrix values="0 0 0 0 0.2  0 0 0 0 0.2  0 0 0 0 0.2  0 0 0 0.09 0" />
          </filter>
          <pattern id="hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(40)">
            <line x1="0" y1="0" x2="0" y2="9" stroke="#2B2B2B" strokeWidth="1.4" opacity=".35" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      <div style={{ position: 'relative' }}>
        {/* HEADER */}
        <header
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            padding: '18px clamp(20px,5vw,72px)',
            borderBottom: '2px solid #2B2B2B',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px 14px' }}>
            <a href="/" title="Docsynecx Home" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
              <img
                src="/Docsynecx-Logo.svg"
                alt="Docsynecx"
                style={{ height: '36px', width: 'auto', display: 'block' }}
                width={160}
                height={45}
              />
            </a>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '18px' }}>
            <span style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: '28px', color: '#1F6B45' }}>
              IICS 2026 · Booth Q53
            </span>
            <a href="#book" style={{ ...buttonWobbleStyle, padding: '12px 22px' }}>
              Claim a pilot slot
            </a>
          </div>
        </header>

        {/* HERO SECTION */}
        <section
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '32px 48px',
            padding: 'clamp(32px,6vw,72px) clamp(20px,5vw,72px)',
          }}
        >
          <div style={{ flex: '1 1 460px', minWidth: 0 }}>
            <div
              style={{
                display: 'inline-block',
                fontWeight: 600,
                fontSize: '15px',
                color: '#1F6B45',
                border: '2px solid #1F6B45',
                borderRadius: '255px 10px 225px 10px/10px 225px 10px 255px',
                padding: '6px 16px',
              }}
            >
              India International Cargo Show 2026 · Mumbai · 2–4 December
            </div>
            <h1
              style={{
                fontFamily: 'Caveat, cursive',
                fontWeight: 700,
                fontSize: 'clamp(60px,8.4vw,128px)',
                lineHeight: 0.92,
                margin: '22px 0 0',
              }}
            >
              Quotes in 15 minutes, <span style={{ color: '#C2410C', whiteSpace: 'nowrap' }}>not 60+.</span>
            </h1>
            <p style={{ fontSize: 'clamp(18px,1.6vw,22px)', maxWidth: '560px', margin: '22px 0 0' }}>
              Meet Docsynecx at Booth Q53 and start a one-month pilot the same day. Four modules take the retyping off
              a freight forwarder's desk, from enquiry to payment.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '18px 28px', marginTop: '30px' }}>
              <a href="#book" style={{ ...buttonWobbleStyle, fontSize: '20px', padding: '15px 30px' }}>
                Claim a pilot slot
              </a>
              <a href="#modules" style={{ fontWeight: 600, color: '#1F6B45' }}>
                See the four modules
              </a>
            </div>
            <p style={{ fontSize: '15px', margin: '16px 0 0' }}>Limited to 25 teams · IICS 2026 bookings only</p>
          </div>

          {/* Hero SVG Cargo Ship Artwork */}
          <div style={{ flex: '1 1 420px', minWidth: 0, position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <svg
              viewBox="0 0 640 470"
              width="100%"
              style={{ display: 'block', maxWidth: '640px' }}
              role="img"
              aria-label="Sketch of a cargo ship loaded with containers beside a port crane, with a dotted route to Booth Q53"
            >
              <g fill="none" stroke="#2B2B2B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#rough)">
                <rect x="130" y="286" width="58" height="38" fill="url(#hatch)" />
                <path d="M140,286 L140,324 M152,286 L152,324 M164,286 L164,324 M176,286 L176,324" strokeWidth="1.5" />
                <rect x="192" y="286" width="58" height="38" fill="url(#hatch)" />
                <path d="M202,286 L202,324 M214,286 L214,324 M226,286 L226,324 M238,286 L238,324" strokeWidth="1.5" />
                <rect x="254" y="286" width="58" height="38" fill="url(#hatch)" />
                <path d="M264,286 L264,324 M276,286 L276,324 M288,286 L288,324 M300,286 L300,324" strokeWidth="1.5" />
                <rect x="316" y="286" width="58" height="38" fill="url(#hatch)" />
                <path d="M326,286 L326,324 M338,286 L338,324 M350,286 L350,324 M362,286 L362,324" strokeWidth="1.5" />
                <rect x="378" y="286" width="58" height="38" fill="url(#hatch)" />
                <path d="M388,286 L388,324 M400,286 L400,324 M412,286 L412,324 M424,286 L424,324" strokeWidth="1.5" />
                <rect x="160" y="246" width="58" height="38" fill="url(#hatch)" />
                <path d="M170,246 L170,284 M182,246 L182,284 M194,246 L194,284 M206,246 L206,284" strokeWidth="1.5" />
                <rect x="222" y="246" width="58" height="38" fill="url(#hatch)" />
                <path d="M232,246 L232,284 M244,246 L244,284 M256,246 L256,284 M268,246 L268,284" strokeWidth="1.5" />
                <rect x="284" y="246" width="58" height="38" fill="url(#hatch)" />
                <path d="M294,246 L294,284 M306,246 L306,284 M318,246 L318,284 M330,246 L330,284" strokeWidth="1.5" />
                <rect x="346" y="246" width="58" height="38" fill="url(#hatch)" />
                <path d="M356,246 L356,284 M368,246 L368,284 M380,246 L380,284 M392,246 L392,284" strokeWidth="1.5" />
                <rect x="222" y="206" width="58" height="38" fill="url(#hatch)" />
                <path d="M232,206 L232,244 M244,206 L244,244 M256,206 L256,244 M268,206 L268,244" strokeWidth="1.5" />
                <rect x="284" y="206" width="58" height="38" fill="url(#hatch)" />
                <path d="M294,206 L294,244 M306,206 L306,244 M318,206 L318,244 M330,206 L330,244" strokeWidth="1.5" />
                <path d="M70,326 L560,326 L520,386 L110,386 Z" fill="url(#hatch)" />
                <path d="M70,326 L560,326" />
                <rect x="450" y="236" width="60" height="90" />
                <path d="M462,256 L498,256 M462,276 L498,276 M462,296 L498,296" />
                <path d="M480,236 L480,212 M470,212 L490,212" />
                <path d="M20,150 L20,386 M66,150 L66,386 M20,150 L66,150 M20,200 L66,200 M20,250 L66,250 M20,300 L66,300 M20,350 L66,350 M20,150 L66,200 M66,200 L20,250 M20,250 L66,300 M66,300 L20,350" />
                <path d="M0,140 L330,140 M30,140 L30,126 M330,140 L330,200 M310,200 L350,200 L350,214 L310,214 Z" />
                <path d="M10,404 Q60,388 110,404 T210,404 T310,404 T410,404 T510,404 T610,404" />
                <path d="M40,430 Q90,416 140,430 T240,430 T340,430 T440,430 T540,430" strokeWidth="2" />
                <path d="M520,236 C590,170 610,130 580,78" stroke="#C2410C" strokeDasharray="3 10" />
                <circle cx="580" cy="62" r="18" stroke="#C2410C" fill="#F4EFE4" />
                <path d="M580,80 L580,96" stroke="#C2410C" />
              </g>
              <g fontFamily="Caveat, cursive" fontWeight="700" fill="#C2410C" textAnchor="middle">
                <text x="580" y="70" fontSize="20">Q53</text>
              </g>
              <g transform="translate(36,28) rotate(-6)">
                <path
                  d="M0,24 L24,0 L204,0 L204,78 L24,78 Z"
                  fill="#F4EFE4"
                  stroke="#2B2B2B"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#rough)"
                />
                <circle cx="26" cy="39" r="5" fill="none" stroke="#2B2B2B" strokeWidth="2" />
                <text x="44" y="38" fontFamily="Caveat, cursive" fontWeight="700" fontSize="34" fill="#2B2B2B">
                  Booth Q53
                </text>
                <text x="44" y="60" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="13" fill="#2B2B2B">
                  2–4 Dec · BKC, Mumbai
                </text>
              </g>
            </svg>

            {/* Circular Stamp Badge */}
            <div
              style={{
                position: 'absolute',
                right: 0,
                bottom: '-36px',
                width: '176px',
                height: '176px',
                borderRadius: '50%',
                background: '#1F6B45',
                color: '#FFFFFF',
                transform: 'rotate(-8deg)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: '8px',
                  border: '2px dashed #F4EFE4',
                  borderRadius: '50%',
                }}
              />
              <span style={{ fontWeight: 800, fontSize: '12px', letterSpacing: '.08em' }}>IICS 2026</span>
              <span style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: '46px', lineHeight: 0.9, marginTop: '4px' }}>
                1-month
              </span>
              <span style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: '46px', lineHeight: 0.9 }}>
                pilot
              </span>
              <span style={{ fontWeight: 600, fontSize: '13px', marginTop: '4px' }}>25 teams only</span>
            </div>
          </div>
        </section>

        {/* 4 HIGHLIGHTS STRIP */}
        <section style={{ padding: '0 clamp(20px,5vw,72px)' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 0,
              border: '2.5px solid #2B2B2B',
              borderRadius: '255px 12px 225px 12px/12px 225px 12px 255px',
              background: 'rgba(43,43,43,.05)',
            }}
          >
            <div style={{ flex: '1 1 220px', padding: '22px 26px' }}>
              <div style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: '36px', lineHeight: 1, color: '#1F6B45' }}>
                Same-day start
              </div>
              <div style={{ fontSize: '16px', marginTop: '6px' }}>Your pilot starts the day you book.</div>
            </div>
            <div style={{ flex: '1 1 220px', padding: '22px 26px' }}>
              <div style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: '36px', lineHeight: 1, color: '#1F6B45' }}>
                25 teams
              </div>
              <div style={{ fontSize: '16px', marginTop: '6px' }}>Limited, so slots go in order.</div>
            </div>
            <div style={{ flex: '1 1 220px', padding: '22px 26px' }}>
              <div style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: '36px', lineHeight: 1, color: '#1F6B45' }}>
                Up to 250 enquiries
              </div>
              <div style={{ fontSize: '16px', marginTop: '6px' }}>Run your own RFQs through it.</div>
            </div>
            <div style={{ flex: '1 1 220px', padding: '22px 26px' }}>
              <div style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: '36px', lineHeight: 1, color: '#1F6B45' }}>
                IICS 2026 only
              </div>
              <div style={{ fontSize: '16px', marginTop: '6px' }}>Book during the show, 2–4 Dec.</div>
            </div>
          </div>
        </section>

        {/* HOW THE PILOT WORKS */}
        <section id="how" style={{ padding: 'clamp(40px,7vw,88px) clamp(20px,5vw,72px) 0' }}>
          <h2 style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: 'clamp(44px,5.5vw,72px)', lineHeight: 1, margin: 0 }}>
            How the pilot works
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginTop: '28px' }}>
            <div
              style={{
                flex: '1 1 260px',
                border: '2.5px solid #2B2B2B',
                borderRadius: '12px 255px 12px 225px/225px 12px 255px 12px',
                padding: '26px',
              }}
            >
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: '#1F6B45',
                  color: '#FFFFFF',
                  fontFamily: 'Caveat, cursive',
                  fontWeight: 700,
                  fontSize: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                1
              </div>
              <div style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: '40px', lineHeight: 1, marginTop: '14px' }}>
                Pick a slot
              </div>
              <p style={{ margin: '8px 0 0', fontSize: '17px' }}>
                Choose an open 20-minute online slot from 6 December. Meet us at Booth Q53 on 2–4 December to get started in person.
              </p>
            </div>

            <div
              style={{
                flex: '1 1 260px',
                border: '2.5px solid #2B2B2B',
                borderRadius: '255px 12px 225px 12px/12px 225px 12px 255px',
                padding: '26px',
              }}
            >
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: '#1F6B45',
                  color: '#FFFFFF',
                  fontFamily: 'Caveat, cursive',
                  fontWeight: 700,
                  fontSize: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                2
              </div>
              <div style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: '40px', lineHeight: 1, marginTop: '14px' }}>
                Bring one RFQ
              </div>
              <p style={{ margin: '8px 0 0', fontSize: '17px' }}>
                Bring a sample RFQ email and one shipping document. We run them live with you.
              </p>
            </div>

            <div
              style={{
                flex: '1 1 260px',
                border: '2.5px solid #2B2B2B',
                borderRadius: '12px 255px 12px 225px/225px 12px 255px 12px',
                padding: '26px',
              }}
            >
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: '#1F6B45',
                  color: '#FFFFFF',
                  fontFamily: 'Caveat, cursive',
                  fontWeight: 700,
                  fontSize: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                3
              </div>
              <div style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: '40px', lineHeight: 1, marginTop: '14px' }}>
                Go live the same day
              </div>
              <p style={{ margin: '8px 0 0', fontSize: '17px' }}>
                RFQ to Booking is set up that day. We review your results together before the month ends.
              </p>
            </div>
          </div>
        </section>

        {/* FOUR MODULES SECTION */}
        <section id="modules" style={{ padding: 'clamp(40px,7vw,88px) clamp(20px,5vw,72px) 0' }}>
          <h2 style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: 'clamp(44px,5.5vw,72px)', lineHeight: 1, margin: 0 }}>
            Four modules, one calmer desk.
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginTop: '28px' }}>
            {/* Module 1 */}
            <div
              style={{
                flex: '1 1 250px',
                border: '2.5px solid #2B2B2B',
                borderRadius: '12px 255px 12px 225px/225px 12px 255px 12px',
                padding: '22px',
              }}
            >
              <svg width="100%" height="150" viewBox="20 90 290 180" aria-hidden="true" style={{ display: 'block' }}>
                <g fill="none" stroke="#2B2B2B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#rough)">
                  <rect x="30" y="120" width="90" height="62" />
                  <path d="M30,120 L75,155 L120,120" />
                  <path d="M135,150 L175,150 M165,140 L177,150 L165,160" stroke="#1F6B45" />
                  <rect x="190" y="100" width="100" height="130" fill="url(#hatch)" />
                  <path d="M205,125 L275,125 M205,145 L275,145 M205,165 L255,165" />
                  <circle cx="262" cy="205" r="22" fill="#F4EFE4" stroke="#1F6B45" />
                  <path d="M251,205 L259,213 L274,196" stroke="#1F6B45" />
                </g>
              </svg>
              <div style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: '38px', lineHeight: 1, marginTop: '10px' }}>
                <span style={{ color: '#1F6B45' }}>1</span> RFQ to Booking
              </div>
              <p style={{ margin: '8px 0 0', fontSize: '16px' }}>Enquiry in, quote out, booking confirmed. Most teams start here.</p>
            </div>

            {/* Module 2 */}
            <div
              style={{
                flex: '1 1 250px',
                border: '2.5px solid #2B2B2B',
                borderRadius: '255px 12px 225px 12px/12px 225px 12px 255px',
                padding: '22px',
              }}
            >
              <svg width="100%" height="150" viewBox="20 90 290 180" aria-hidden="true" style={{ display: 'block' }}>
                <g fill="none" stroke="#2B2B2B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#rough)">
                  <rect x="50" y="130" width="120" height="130" fill="url(#hatch)" />
                  <rect x="70" y="112" width="120" height="130" fill="#F4EFE4" />
                  <rect x="90" y="94" width="120" height="130" fill="#F4EFE4" />
                  <path d="M106,120 L190,120 M106,140 L190,140 M106,160 L170,160 M106,180 L186,180" />
                  <circle cx="230" cy="215" r="28" fill="#F4EFE4" stroke="#1F6B45" />
                  <path d="M217,215 L227,225 L244,204" stroke="#1F6B45" />
                </g>
              </svg>
              <div style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: '38px', lineHeight: 1, marginTop: '10px' }}>
                <span style={{ color: '#1F6B45' }}>2</span> Shipment Documents
              </div>
              <p style={{ margin: '8px 0 0', fontSize: '16px' }}>Documents read, checked and filled for you. No retyping.</p>
            </div>

            {/* Module 3 */}
            <div
              style={{
                flex: '1 1 250px',
                border: '2.5px solid #2B2B2B',
                borderRadius: '12px 255px 12px 225px/225px 12px 255px 12px',
                padding: '22px',
              }}
            >
              <svg width="100%" height="150" viewBox="20 90 290 180" aria-hidden="true" style={{ display: 'block' }}>
                <g fill="none" stroke="#2B2B2B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#rough)">
                  <path d="M30,235 C100,110 200,270 295,120" stroke="#1F6B45" strokeDasharray="3 10" />
                  <circle cx="295" cy="110" r="11" stroke="#1F6B45" />
                  <path d="M50,200 L170,200 L150,235 L70,235 Z" fill="url(#hatch)" />
                  <rect x="90" y="172" width="40" height="28" />
                  <rect x="62" y="186" width="22" height="14" />
                  <rect x="136" y="186" width="22" height="14" />
                  <rect x="195" y="204" width="50" height="28" />
                  <rect x="245" y="212" width="28" height="20" />
                  <circle cx="210" cy="238" r="7" />
                  <circle cx="258" cy="238" r="7" />
                </g>
              </svg>
              <div style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: '38px', lineHeight: 1, marginTop: '10px' }}>
                <span style={{ color: '#1F6B45' }}>3</span> Live Tracking
              </div>
              <p style={{ margin: '8px 0 0', fontSize: '16px' }}>Road and vessel in one view, so customers stop chasing you for updates.</p>
            </div>

            {/* Module 4 */}
            <div
              style={{
                flex: '1 1 250px',
                border: '2.5px solid #2B2B2B',
                borderRadius: '255px 12px 225px 12px/12px 225px 12px 255px',
                padding: '22px',
              }}
            >
              <svg width="100%" height="150" viewBox="20 90 290 180" aria-hidden="true" style={{ display: 'block' }}>
                <g fill="none" stroke="#2B2B2B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#rough)">
                  <rect x="40" y="110" width="130" height="140" fill="url(#hatch)" />
                  <rect x="52" y="122" width="106" height="116" fill="#F4EFE4" />
                  <path d="M62,148 L148,148 M62,172 L148,172 M62,196 L148,196 M62,220 L148,220 M100,134 L100,230" />
                  <path d="M66,150 L72,158 L80,142" stroke="#1F6B45" />
                  <ellipse cx="245" cy="232" rx="38" ry="11" />
                  <ellipse cx="245" cy="214" rx="38" ry="11" />
                  <ellipse cx="245" cy="196" rx="38" ry="11" />
                  <circle cx="262" cy="150" r="30" stroke="#1F6B45" />
                </g>
              </svg>
              <div style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: '38px', lineHeight: 1, marginTop: '10px' }}>
                <span style={{ color: '#1F6B45' }}>4</span> Finance &amp; Reconciliation
              </div>
              <p style={{ margin: '8px 0 0', fontSize: '16px' }}>Costs and invoices matched, so month-end stops hurting.</p>
            </div>
          </div>
        </section>

        {/* BOOKING SECTION (#book) */}
        <section
          id="book"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '32px 56px',
            padding: 'clamp(48px,8vw,104px) clamp(20px,5vw,72px) 0',
            alignItems: 'flex-start',
          }}
        >
          <div style={{ flex: '1 1 340px', minWidth: 0 }}>
            <h2
              style={{
                fontFamily: 'Caveat, cursive',
                fontWeight: 700,
                fontSize: 'clamp(48px,6vw,84px)',
                lineHeight: 0.95,
                margin: 0,
              }}
            >
              Claim your <span style={{ color: '#C2410C' }}>pilot slot.</span>
            </h2>
            <p style={{ margin: '18px 0 0', maxWidth: '460px' }}>
              Four short steps, about two minutes on your phone. You'll get a confirmation by email and WhatsApp straight away.
            </p>
            <ul style={{ margin: '18px 0 0', paddingLeft: '22px', maxWidth: '460px' }}>
              <li style={{ marginBottom: '8px' }}>Your pilot starts the same day you book.</li>
              <li style={{ marginBottom: '8px' }}>Limited to 25 teams, up to 250 enquiries each.</li>
              <li style={{ marginBottom: '8px' }}>Open slots run from 6 December. Visit Booth Q53, 2–4 December, to meet us first.</li>
              <li>Nothing to prepare yet: keep one sample RFQ email handy.</li>
            </ul>
          </div>

          <div
            style={{
              flex: '1 1 460px',
              minWidth: 0,
              border: '2.5px solid #2B2B2B',
              borderRadius: '255px 12px 225px 12px/12px 225px 12px 255px',
              background: 'rgba(255,255,255,.35)',
              padding: 'clamp(22px,3vw,36px)',
            }}
          >
            {/* Progress indicator */}
            {step <= 4 && (
              <div
                id="progress"
                aria-label="Progress"
                style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}
              >
                {[1, 2, 3, 4].map((i) => (
                  <i
                    key={i}
                    style={{
                      flex: 1,
                      height: '6px',
                      borderRadius: '3px',
                      background: step >= i ? '#1F6B45' : 'rgba(43,43,43,.18)',
                      transition: 'background 0.2s',
                    }}
                  />
                ))}
              </div>
            )}

            {/* STEP 1 */}
            {step === 1 && (
              <div id="step1">
                <div style={{ fontWeight: 600, fontSize: '14px', color: '#1F6B45' }}>STEP 1 OF 4 · YOUR DETAILS</div>
                <form onSubmit={handleForm1Submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '14px' }}>
                  <div>
                    <label htmlFor="f-name" style={{ display: 'block', fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>
                      Your name
                    </label>
                    <input
                      id="f-name"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => {
                        const sanitized = e.target.value.replace(/[^a-zA-Z\s.'-]/g, '');
                        setName(sanitized);
                        if (errors['f-name']) {
                          setErrors((prev) => {
                            const next = { ...prev };
                            delete next['f-name'];
                            return next;
                          });
                        }
                      }}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit',
                        fontSize: '15px',
                        padding: '12px 14px',
                        border: `2px solid ${errors['f-name'] ? '#B42318' : '#2B2B2B'}`,
                        borderRadius: '8px',
                        background: '#FFFDF8',
                      }}
                    />
                    {errors['f-name'] && <div style={{ color: '#B42318', fontSize: '14px', marginTop: '2px' }}>{errors['f-name']}</div>}
                  </div>

                  <div>
                    <label htmlFor="f-company" style={{ display: 'block', fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>
                      Company
                    </label>
                    <input
                      id="f-company"
                      type="text"
                      autoComplete="organization"
                      value={company}
                      onChange={(e) => {
                        const sanitized = e.target.value.replace(/[^a-zA-Z0-9\s.'&,-]/g, '');
                        setCompany(sanitized);
                        if (errors['f-company']) {
                          setErrors((prev) => {
                            const next = { ...prev };
                            delete next['f-company'];
                            return next;
                          });
                        }
                      }}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit',
                        fontSize: '15px',
                        padding: '12px 14px',
                        border: `2px solid ${errors['f-company'] ? '#B42318' : '#2B2B2B'}`,
                        borderRadius: '8px',
                        background: '#FFFDF8',
                      }}
                    />
                    {errors['f-company'] && <div style={{ color: '#B42318', fontSize: '14px', marginTop: '2px' }}>{errors['f-company']}</div>}
                  </div>

                  <div>
                    <label htmlFor="f-email" style={{ display: 'block', fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>
                      Work email
                    </label>
                    <input
                      id="f-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors['f-email']) {
                          setErrors((prev) => {
                            const next = { ...prev };
                            delete next['f-email'];
                            return next;
                          });
                        }
                      }}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit',
                        fontSize: '15px',
                        padding: '12px 14px',
                        border: `2px solid ${errors['f-email'] ? '#B42318' : '#2B2B2B'}`,
                        borderRadius: '8px',
                        background: '#FFFDF8',
                      }}
                    />
                    {errors['f-email'] && <div style={{ color: '#B42318', fontSize: '14px', marginTop: '2px' }}>{errors['f-email']}</div>}
                  </div>

                  <div>
                    <label htmlFor="f-phone" style={{ display: 'block', fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>
                      Mobile (WhatsApp)
                    </label>
                    <input
                      id="f-phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => {
                        const sanitized = e.target.value.replace(/[^\d+]/g, '').replace(/(?!^)\+/g, '');
                        setPhone(sanitized);
                        if (errors['f-phone']) {
                          setErrors((prev) => {
                            const next = { ...prev };
                            delete next['f-phone'];
                            return next;
                          });
                        }
                      }}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit',
                        fontSize: '15px',
                        padding: '12px 14px',
                        border: `2px solid ${errors['f-phone'] ? '#B42318' : '#2B2B2B'}`,
                        borderRadius: '8px',
                        background: '#FFFDF8',
                      }}
                    />
                    {errors['f-phone'] && <div style={{ color: '#B42318', fontSize: '14px', marginTop: '2px' }}>{errors['f-phone']}</div>}
                  </div>

                  <button type="submit" style={{ ...buttonWobbleStyle, fontSize: '19px', padding: '14px 24px' }}>
                    Continue
                  </button>
                </form>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div id="step2">
                <div style={{ fontWeight: 600, fontSize: '14px', color: '#1F6B45' }}>STEP 2 OF 4 · YOUR DESK</div>
                <p style={{ margin: '8px 0 0', fontSize: '15px' }}>Four quick answers so we set up the right modules before your call.</p>
                <form onSubmit={handleForm2Submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '14px' }}>
                  <div>
                    <label htmlFor="f-role" style={{ display: 'block', fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>
                      Your role
                    </label>
                    <select
                      id="f-role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit',
                        fontSize: '15px',
                        padding: '12px 14px',
                        border: '2px solid #2B2B2B',
                        borderRadius: '8px',
                        background: '#FFFDF8',
                      }}
                    >
                      <option>Owner or director</option>
                      <option>Operations head</option>
                      <option>Sales or pricing</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="f-system" style={{ display: 'block', fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>
                      System you use today
                    </label>
                    <select
                      id="f-system"
                      value={system}
                      onChange={(e) => setSystem(e.target.value)}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit',
                        fontSize: '15px',
                        padding: '12px 14px',
                        border: '2px solid #2B2B2B',
                        borderRadius: '8px',
                        background: '#FFFDF8',
                      }}
                    >
                      <option>CargoWise</option>
                      <option>Logi-Sys</option>
                      <option>Shipsy</option>
                      <option>Other/CustomERP</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="f-volume" style={{ display: 'block', fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>
                      Quotes or enquiries per week
                    </label>
                    <select
                      id="f-volume"
                      value={volume}
                      onChange={(e) => setVolume(e.target.value)}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit',
                        fontSize: '15px',
                        padding: '12px 14px',
                        border: '2px solid #2B2B2B',
                        borderRadius: '8px',
                        background: '#FFFDF8',
                      }}
                    >
                      <option>Under 25</option>
                      <option>25 to 100</option>
                      <option>100 to 250</option>
                      <option>More than 250</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="f-pain" style={{ display: 'block', fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>
                      Where does your desk lose the most time?
                    </label>
                    <select
                      id="f-pain"
                      value={pain}
                      onChange={(e) => setPain(e.target.value)}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit',
                        fontSize: '15px',
                        padding: '12px 14px',
                        border: '2px solid #2B2B2B',
                        borderRadius: '8px',
                        background: '#FFFDF8',
                      }}
                    >
                      <option>Quoting from RFQ emails</option>
                      <option>Shipment documents</option>
                      <option>Tracking updates</option>
                      <option>Finance and reconciliation</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                    <button type="button" onClick={() => setStep(1)} style={backButtonStyle}>
                      Back
                    </button>
                    <button type="submit" style={{ ...buttonWobbleStyle, fontSize: '19px', padding: '14px 24px' }}>
                      Continue to pick a slot
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div id="step3">
                <div style={{ fontWeight: 600, fontSize: '14px', color: '#1F6B45' }}>STEP 3 OF 4 · PICK YOUR SLOT</div>
                <div style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: '34px', lineHeight: 1.05, marginTop: '8px' }}>
                  Select your pilot walkthrough date & time
                </div>
                <div style={{ fontSize: '15px', marginTop: '4px', color: '#4B5563' }}>
                  {getTotalOpenSlots()} slots open across available dates. All times are IST (11:00 AM – 4:00 PM, Monday to Friday).
                </div>

                <form onSubmit={handleForm3Submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '14px' }}>
                  {/* Date Picker & Quick Days Selector */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                      <span style={{ fontSize: '15px', fontWeight: 700, color: '#111827' }}>
                        Choose Weekday (Mon – Fri):
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <label htmlFor="custom-date-picker" style={{ fontSize: '13px', fontWeight: 600, color: '#4B5563' }}>
                          Pick any date :
                        </label>
                        <input
                          id="custom-date-picker"
                          type="date"
                          min={getTodayIso()}
                          value={selectedDateIso}
                          onChange={(e) => handleDateSelect(e.target.value)}
                          aria-label="Pick booking date (present and future weekdays only)"
                          style={{
                            fontFamily: 'inherit',
                            fontSize: '14px',
                            fontWeight: 600,
                            padding: '7px 12px',
                            borderRadius: '8px',
                            border: dateErr ? '2px solid #B42318' : '2px solid #1F6B45',
                            background: '#FFFFFF',
                            color: '#111827',
                            cursor: 'pointer',
                            outline: 'none',
                          }}
                        />
                      </div>
                    </div>

                    {dateErr && (
                      <div style={{ color: '#B42318', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', background: '#FEF2F2', padding: '8px 12px', borderRadius: '6px', border: '1px solid #FEE2E2' }}>
                        <span>⚠️</span> {dateErr}
                      </div>
                    )}

                    {/* Quick Days Row: Mon to Fri */}
                    <div role="group" aria-label="Choose a weekday" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {upcomingDays.map((d) => {
                        const isCur = selectedDateIso === d.iso;
                        return (
                          <button
                            key={d.id}
                            type="button"
                            aria-pressed={isCur}
                            onClick={() => handleDateSelect(d.iso)}
                            style={{
                              fontFamily: 'inherit',
                              fontSize: '14px',
                              fontWeight: 600,
                              padding: '9px 14px',
                              borderRadius: '8px',
                              border: `2px solid ${isCur ? '#1F6B45' : '#2B2B2B'}`,
                              cursor: 'pointer',
                              background: isCur ? '#1F6B45' : 'transparent',
                              color: isCur ? '#FFFFFF' : '#2B2B2B',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            {d.l} · {getOpenCount(d)} open
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Slots Grid: Strictly 11:00 AM to 4:00 PM */}
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
                      Available 20-Min Slots (11:00 AM – 4:00 PM IST)
                    </div>
                    {curDay.t.length === 0 ? (
                      <div style={{ background: '#FFFBEB', border: '1px solid #FEF3C7', padding: '16px 20px', borderRadius: '8px', color: '#92400E', fontSize: '14px', fontWeight: 600 }}>
                        Weekend dates (Saturday & Sunday) are closed for pilot onboarding sessions. Please select any Monday to Friday to view available 11:00 AM – 4:00 PM slots.
                      </div>
                    ) : (
                      <div role="group" aria-label="Choose a time slot between 11:00 AM and 4:00 PM" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {curDay.t.map((t) => {
                          const taken = takenSlots.includes(t);
                          const isSel = selectedSlot === t;
                          if (taken) {
                            return (
                              <button
                                key={t}
                                type="button"
                                disabled
                                title={selectedDateIso === getTodayIso() ? 'Past time or taken' : 'Taken slot'}
                                style={{
                                  fontFamily: 'inherit',
                                  fontSize: '15px',
                                  fontWeight: 400,
                                  padding: '9px 14px',
                                  border: '2px dashed #8A8A8A',
                                  borderRadius: '8px',
                                  background: 'transparent',
                                  color: '#6B6B6B',
                                  textDecoration: 'line-through',
                                  cursor: 'not-allowed',
                                }}
                              >
                                {t}
                              </button>
                            );
                          }
                          return (
                            <button
                              key={t}
                              type="button"
                              aria-pressed={isSel}
                              onClick={() => {
                                setSelectedSlot(t);
                                setSlotErr('');
                              }}
                              style={{
                                fontFamily: 'inherit',
                                fontSize: '15px',
                                fontWeight: 600,
                                padding: '9px 14px',
                                borderRadius: '8px',
                                border: `2px solid ${isSel ? '#1F6B45' : '#2B2B2B'}`,
                                cursor: 'pointer',
                                background: isSel ? '#1F6B45' : 'transparent',
                                color: isSel ? '#FFFFFF' : '#2B2B2B',
                              }}
                            >
                              {t}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div style={{ fontSize: '14px' }}>
                    <strong>{curDay.l}: {getOpenCount(curDay)} slots open.</strong> Each slot is a 20-minute online onboarding call, in IST (11:00 AM – 4:00 PM). Crossed-out times are taken.
                  </div>

                  {slotErr && <div style={{ color: '#B42318', fontSize: '14px' }}>{slotErr}</div>}

                  <div style={{ fontSize: '14px' }}>
                    No time suits you?{' '}
                    <a
                      href="#"
                      onClick={handleWaitOtherTime}
                      style={{
                        color: '#1F6B45',
                        fontWeight: 600,
                        pointerEvents: isSubmitting ? 'none' : 'auto',
                        opacity: isSubmitting ? 0.6 : 1,
                      }}
                    >
                      {isSubmitting ? 'Submitting request…' : 'Ask us for another time'}
                    </a>.
                  </div>

                  <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                    <button type="button" onClick={() => setStep(2)} style={backButtonStyle}>
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!selectedSlot}
                      style={{
                        ...buttonWobbleStyle,
                        fontSize: '19px',
                        padding: '14px 24px',
                        background: selectedSlot ? '#C2410C' : '#8A8A8A',
                        cursor: selectedSlot ? 'pointer' : 'not-allowed',
                      }}
                    >
                      Review my booking
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div id="step4">
                <div style={{ fontWeight: 600, fontSize: '14px', color: '#1F6B45' }}>STEP 4 OF 4 · REVIEW AND CONFIRM</div>
                <div style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: '34px', lineHeight: 1.05, marginTop: '8px' }}>
                  Check your pilot booking
                </div>

                <dl style={{ margin: '14px 0 0', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 18px', fontSize: '16px' }}>
                  <dt style={{ fontWeight: 600 }}>Name</dt>
                  <dd style={{ margin: 0 }}>{name}</dd>
                  <dt style={{ fontWeight: 600 }}>Company</dt>
                  <dd style={{ margin: 0 }}>{company}</dd>
                  <dt style={{ fontWeight: 600 }}>Email</dt>
                  <dd style={{ margin: 0 }}>{email}</dd>
                  <dt style={{ fontWeight: 600 }}>Mobile</dt>
                  <dd style={{ margin: 0 }}>{phone}</dd>
                  <dt style={{ fontWeight: 600 }}>Slot</dt>
                  <dd style={{ margin: 0 }}>{curDay.l}, {selectedSlot} IST, online (20 min)</dd>
                  <dt style={{ fontWeight: 600 }}>Desk</dt>
                  <dd style={{ margin: 0 }}>{role} · {system} · {volume} per week</dd>
                  <dt style={{ fontWeight: 600 }}>Focus</dt>
                  <dd style={{ margin: 0 }}>{pain}</dd>
                </dl>

                <form onSubmit={handleForm4Submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                  <label style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '14px' }}>
                    <input
                      type="checkbox"
                      id="f-consent"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      style={{ width: '20px', height: '20px', marginTop: '2px', accentColor: '#1F6B45' }}
                    />
                    <span>
                      I agree to be contacted by email and WhatsApp about my pilot slot.{' '}
                      <a href="/privacy-policy" target="_blank" style={{ color: '#1F6B45' }}>
                        Privacy notice
                      </a>
                    </span>
                  </label>

                  {errors['f-consent'] && <div style={{ color: '#B42318', fontSize: '14px' }}>{errors['f-consent']}</div>}
                  {sendErr && <div style={{ color: '#B42318', fontSize: '14px' }}>{sendErr}</div>}

                  <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                    <button type="button" onClick={() => setStep(3)} disabled={isSubmitting} style={backButtonStyle}>
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{ ...buttonWobbleStyle, fontSize: '19px', padding: '14px 24px' }}
                    >
                      {isSubmitting ? 'Confirming...' : 'Confirm my slot'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 5: BOOKED */}
            {step === 5 && (
              <div id="step5">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: '#1F6B45',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    aria-hidden="true"
                  >
                    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 18 L14 26 L28 8" />
                    </svg>
                  </div>
                  <div style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: '54px', lineHeight: 1 }}>
                    You're booked.
                  </div>
                  <p style={{ margin: 0 }}>
                    Booking <strong>{bookingRef}</strong>: <strong>{curDay.l}, {selectedSlot} IST, online</strong>. We'll send the call link to <span>{email}</span> and your WhatsApp.
                  </p>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <a
                      href={generateIcsUrl()}
                      download={`docsynecx-pilot-${bookingRef}.ics`}
                      style={backButtonStyle}
                    >
                      Add to calendar
                    </a>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(`I booked a Docsynecx pilot slot at IICS 2026: ${curDay.l}, ${selectedSlot} IST. docsynecx.com/events/iics-2026/`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={backButtonStyle}
                    >
                      Share on WhatsApp
                    </a>
                  </div>
                  <div style={{ fontWeight: 600, marginTop: '6px' }}>What happens next</div>
                  <ol style={{ margin: 0, paddingLeft: '22px' }}>
                    <li style={{ marginBottom: '6px' }}>You get a confirmation by email and WhatsApp now, and a reminder 24 hours and 1 hour before.</li>
                    <li style={{ marginBottom: '6px' }}>Keep one sample RFQ email and one shipping document ready.</li>
                    <li style={{ marginBottom: '6px' }}>On the call we set up RFQ to Booking, and your one-month pilot starts the same day.</li>
                    <li>We review results with you before the month ends.</li>
                  </ol>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <button type="button" onClick={handleReschedule} style={backButtonStyle}>
                      Change my slot
                    </button>
                    <button type="button" onClick={handleCancelBooking} style={backButtonStyle}>
                      Cancel booking
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: CANCELLED */}
            {step === 6 && (
              <div id="step6">
                <div style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: '46px', lineHeight: 1 }}>
                  Booking cancelled.
                </div>
                <p>Your slot is free again. You can book a new one any time while slots are open.</p>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  style={{ ...buttonWobbleStyle, fontSize: '19px', padding: '14px 24px' }}
                >
                  Book a new slot
                </button>
              </div>
            )}

            {/* STEP 7: CUSTOM TIME REQUEST */}
            {step === 7 && (
              <div id="step7">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: '#1F6B45',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    aria-hidden="true"
                  >
                    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 18 L14 26 L28 8" />
                    </svg>
                  </div>
                  <div style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: '46px', lineHeight: 1 }}>
                    Thanks, we&apos;ll find a time.
                  </div>
                  <p style={{ margin: 0 }}>
                    Request reference: <strong>{bookingRef}</strong>. We&apos;ve registered your custom slot request for <strong>{name.trim() || 'your team'}</strong> ({company.trim() || 'Forwarder Desk'}). We&apos;ll reach you at <strong>{email.trim()}</strong> and WhatsApp ({phone.trim() || 'Mobile'}) with coordinated walkthrough options.
                  </p>
                  <p style={{ margin: 0, fontSize: '14px', color: '#4B5563' }}>
                    A confirmation summary has also been sent to your email. If your schedule opens up, you can also view and reserve one of the available live slots anytime.
                  </p>
                  <div>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      style={{ ...buttonWobbleStyle, fontSize: '19px', padding: '14px 24px' }}
                    >
                      See open slots
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* THE DIFFERENCE, IN NUMBERS */}
        <section style={{ padding: 'clamp(48px,8vw,104px) clamp(20px,5vw,72px) 0' }}>
          <h2 style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: 'clamp(44px,5.5vw,72px)', lineHeight: 1, margin: 0 }}>
            The difference, in numbers
          </h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px 24px',
              marginTop: '22px',
              borderTop: '2.5px solid #2B2B2B',
              borderBottom: '2.5px solid #2B2B2B',
              padding: '26px 0',
            }}
          >
            <div style={{ flex: '1 1 260px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: 'clamp(44px,4.6vw,64px)', lineHeight: 1, color: '#1F6B45' }}>
                60+ → 15 min
              </div>
              <div style={{ marginTop: '6px' }}>per quote</div>
            </div>
            <div style={{ flex: '1 1 260px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: 'clamp(44px,4.6vw,64px)', lineHeight: 1, color: '#1F6B45' }}>
                120 → 225
              </div>
              <div style={{ marginTop: '6px' }}>quotes a month</div>
            </div>
            <div style={{ flex: '1 1 260px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: 'clamp(44px,4.6vw,64px)', lineHeight: 1, color: '#1F6B45' }}>
                65% fewer
              </div>
              <div style={{ marginTop: '6px' }}>“where is my cargo?” emails</div>
            </div>
          </div>
          <div style={{ fontSize: '14px', marginTop: '10px' }}>Results as published on docsynecx.com.</div>
        </section>

        {/* QUESTIONS BEFORE YOU BOOK (ACCORDION) */}
        <section style={{ padding: 'clamp(48px,8vw,104px) clamp(20px,5vw,72px) 0', maxWidth: '900px' }}>
          <h2 style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: 'clamp(44px,5.5vw,72px)', lineHeight: 1, margin: 0 }}>
            Questions before you book
          </h2>
          <div style={{ marginTop: '22px' }}>
            <details style={{ borderTop: '2px solid #2B2B2B', padding: '16px 0' }}>
              <summary style={{ fontWeight: 600, fontSize: '19px', cursor: 'pointer' }}>Who is the pilot for?</summary>
              <p style={{ margin: '10px 0 0' }}>Freight forwarders managing email-based RFQs with Excel and manual workflows.</p>
            </details>
            <details style={{ borderTop: '2px solid #2B2B2B', padding: '16px 0' }}>
              <summary style={{ fontWeight: 600, fontSize: '19px', cursor: 'pointer' }}>What should I bring to the booth?</summary>
              <p style={{ margin: '10px 0 0' }}>One sample RFQ email and one shipping document. We run them live and set up RFQ to Booking the same day.</p>
            </details>
            <details style={{ borderTop: '2px solid #2B2B2B', padding: '16px 0' }}>
              <summary style={{ fontWeight: 600, fontSize: '19px', cursor: 'pointer' }}>What happens after the month?</summary>
              <p style={{ margin: '10px 0 0' }}>We review your results together before it ends and agree the next step. You'll know this at kickoff, so there are no surprises.</p>
            </details>
            <details style={{ borderTop: '2px solid #2B2B2B', borderBottom: '2px solid #2B2B2B', padding: '16px 0' }}>
              <summary style={{ fontWeight: 600, fontSize: '19px', cursor: 'pointer' }}>Can I book if I can't visit the booth?</summary>
              <p style={{ margin: '10px 0 0' }}>Yes. Pick any open online slot from 6 December. The offer is for teams who connect with us through IICS 2026.</p>
            </details>
          </div>
        </section>

        {/* FOOTER */}
        <footer
          style={{
            marginTop: 'clamp(48px,8vw,104px)',
            borderTop: '2.5px solid #2B2B2B',
            padding: '32px clamp(20px,5vw,72px) 40px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px 48px',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ flex: '1 1 320px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <a href="/" title="Docsynecx Home" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
                <img
                  src="/Docsynecx-Logo.svg"
                  alt="Docsynecx"
                  style={{ height: '34px', width: 'auto', display: 'block' }}
                  width={150}
                  height={42}
                />
              </a>
              <span style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: '38px', lineHeight: 1 }}>
                at IICS 2026
              </span>
            </div>
            <p style={{ margin: '8px 0 0' }}>
              Booth Q53 · 2–4 December 2026<br />
              Jio World Convention Centre, Bandra Kurla Complex, Mumbai
            </p>
          </div>
          <div style={{ flex: '1 1 260px' }}>
            <div style={{ fontWeight: 600 }}>Questions before the show?</div>
            <p style={{ margin: '6px 0 0' }}>+91 9344776623 · success@docsynecx.com</p>
            <p style={{ margin: '14px 0 0', fontSize: '14px' }}>Docsynecx by Synecx AI Labs Pvt Ltd.</p>
          </div>
        </footer>

        {/* CANCEL CONFIRMATION POPUP MODAL */}
        {showCancelConfirm && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-modal-title"
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(43, 43, 43, 0.65)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 99999,
              padding: '20px',
            }}
            onClick={() => setShowCancelConfirm(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#FFFDF8',
                color: '#2B2B2B',
                maxWidth: '440px',
                width: '100%',
                padding: '30px 24px',
                border: '2.5px solid #2B2B2B',
                borderRadius: '12px 255px 12px 225px/225px 12px 255px 12px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.25)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: '#FEE4E2',
                  color: '#B42318',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </div>
              <h3
                id="cancel-modal-title"
                style={{
                  fontFamily: 'Caveat, cursive',
                  fontWeight: 700,
                  fontSize: '34px',
                  lineHeight: 1.1,
                  margin: '0 0 10px',
                  color: '#2B2B2B',
                }}
              >
                Cancel this booking?
              </h3>
              <p style={{ margin: '0 0 24px', fontSize: '15px', color: '#555555', lineHeight: 1.5 }}>
                Are you sure you want to cancel your pilot onboarding slot? This slot will be released for other attendees.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setShowCancelConfirm(false)}
                  style={{
                    ...backButtonStyle,
                    padding: '10px 20px',
                    fontSize: '15px',
                  }}
                >
                  No, keep slot
                </button>
                <button
                  type="button"
                  onClick={confirmCancellation}
                  style={{
                    ...buttonWobbleStyle,
                    padding: '10px 20px',
                    fontSize: '15px',
                    background: '#B42318',
                    borderColor: '#2B2B2B',
                  }}
                >
                  Yes, cancel booking
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
