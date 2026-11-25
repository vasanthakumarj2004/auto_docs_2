'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Check, CheckCircle2 } from 'lucide-react';
import { LandingNavigation } from '../LandingNavigation';
import { ShipsyFooter } from '../ShipsyFooter';
import { FinanceClosingCta } from '../finance/FinanceClosingCta';
import { trackEvent } from '@/src/lib/analytics';
import { EVENT_PRICING_VIEW } from '@/src/lib/analytics-events';
import s from './PricingPage.module.css';

const formatIndianNumber = (num: number): string => {
  return Math.round(num).toLocaleString('en-IN');
};

const formatIndianRupees = (num: number): string => {
  const rounded = Math.round(num);
  if (rounded >= 100000) {
    return '₹' + (Math.round(rounded / 10000) / 10).toLocaleString('en-IN') + 'L';
  }
  return '₹' + rounded.toLocaleString('en-IN');
};

export function PricingPage() {
  const [desk, setDesk] = useState<'finance' | 'logistics'>('finance');

  // Sync with URL hash or localStorage on mount
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'logistics' || hash === 'finance') {
      setDesk(hash);
      return;
    }
    try {
      const stored = localStorage.getItem('dsx-desk');
      if (stored === 'logistics' || stored === 'finance') {
        setDesk(stored);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Track pricing_view when the pricing page is opened or desk selection changes
  useEffect(() => {
    trackEvent(EVENT_PRICING_VIEW, { plan_viewed: desk });
  }, [desk]);

  const handleDeskSwitch = (newDesk: 'finance' | 'logistics') => {
    setDesk(newDesk);
    try {
      localStorage.setItem('dsx-desk', newDesk);
      window.history.replaceState(null, '', newDesk === 'logistics' ? '#logistics' : '#finance');
    } catch {
      // Ignore storage errors
    }
  };

  // ── Finance Estimator State ──
  const [financeBills, setFinanceBills] = useState<number>(500);
  const [financeMinutes, setFinanceMinutes] = useState<number>(6);
  const [financeRate, setFinanceRate] = useState<number>(300);

  const finHours = (Math.max(0, financeBills) * Math.max(0, financeMinutes)) / 60;
  const finCost = finHours * Math.max(0, financeRate);
  const finDays = finHours / 8;

  // ── Logistics Estimator State ──
  const [logSp, setLogSp] = useState<number>(3);
  const [logEnq, setLogEnq] = useState<number>(700);
  const [logQpd, setLogQpd] = useState<number>(6);
  const [logDays, setLogDays] = useState<number>(24);
  const [logMb, setLogMb] = useState<number>(40);
  const [logMa, setLogMa] = useState<number>(15);
  const [logWin, setLogWin] = useState<number>(20);
  const [logMar, setLogMar] = useState<number>(8000);

  const sp = Math.max(1, logSp);
  const enq = Math.max(0, logEnq);
  const qpd = Math.max(0, logQpd);
  const days = Math.max(1, Math.min(31, logDays));
  const mb = Math.max(1, logMb);
  const ma = Math.max(1, logMa);
  const winRate = Math.min(100, Math.max(0, logWin)) / 100;
  const mar = Math.max(0, logMar);

  const capB = sp * qpd * days;
  const capA = (capB * mb) / ma;
  const qb = Math.min(capB, enq);
  const qa = Math.min(capA, enq);
  const xb = Math.max(0, enq - qb);
  const xa = Math.max(0, enq - qa);
  const wb = qb * winRate;
  const wa = qa * winRate;
  const pb = wb * mar;
  const pa = wa * mar;
  const gain = pa - pb;
  const extraShip = wa - wb;
  const hoursBack = qa * ma < sp * qpd * days * mb ? (sp * qpd * days * mb - qa * ma) / 60 / sp : 0;

  return (
    <div className={s.page}>
      <a href="#main-content" className={s.skipLink}>
        Skip to content
      </a>

      {/* Global Navigation */}
      <LandingNavigation />

      <main id="main-content" className={s.mainContent}>
        {/* 1 HERO SECTION */}
        <section className={s.viewportHero} aria-label="Pricing">
          <div className={`site-shell ${s.heroGrid}`}>
            <div className={s.heroCopy}>
              <div className={s.deskSwitch} role="group" aria-label="Choose your desk">
                <span className={s.dsLabel}>Pricing for</span>
                <button
                  type="button"
                  data-set="finance"
                  aria-pressed={desk === 'finance'}
                  onClick={() => handleDeskSwitch('finance')}
                >
                  Finance Desk
                </button>
                <button
                  type="button"
                  data-set="logistics"
                  aria-pressed={desk === 'logistics'}
                  onClick={() => handleDeskSwitch('logistics')}
                >
                  Logistics Desk
                </button>
              </div>

              {desk === 'finance' ? (
                <div>
                  <h1 id="hero-h" className={s.heroTitle}>
                    Pay for the hours you get back. <br />
                    <span>Not for software you don&apos;t use.</span>
                  </h1>
                  <p className={s.heroSub}>
                    Your plan is sized to how many bills you handle. Start with invoices, add more once
                    it&apos;s paying for itself.
                  </p>
                </div>
              ) : (
                <div>
                  <h1 className={s.heroTitle}>
                    Pay for the shipments you move. <br />
                    <span>Not for features you don&apos;t need.</span>
                  </h1>
                  <p className={s.heroSub}>
                    Pick the parts of the job you want off your team&apos;s desk. Your price follows your
                    shipment volume.
                  </p>
                </div>
              )}

              <div className={s.heroActions}>
                <Link className={s.primaryBtn} href="/demo/#demo-form">
                  <span>Get your proposal</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <a className={s.secondaryBtn} href="#estimate">
                  <span>Is it worth it?</span>
                  <ArrowDown size={15} aria-hidden="true" />
                </a>
              </div>

              <p className={s.promise}>
                <CheckCircle2 size={18} aria-hidden="true" />
                <span>Everything you get is written down before you sign. No surprises.</span>
              </p>
            </div>

            {/* Live Mock Preview Card with 3D Depth Backdrop & Ghost Card matching InvoiceAutomationPage */}
            <div className={s.heroVisualWrapper}>
              <div className={s.ambientGlow} aria-hidden="true" />
              <div className={s.ghostCardBehind} aria-hidden="true" />

              <div
                className={s.qcard}
                role="region"
                aria-label={desk === 'finance' ? 'Finance Desk value overview' : 'Logistics Desk value overview'}
              >
                <div className={s.qcardTop}>
                  <span>
                    <strong>What your money buys</strong>
                  </span>
                  <span className={`${s.statusBadge} ${desk === 'finance' ? s.ok : s.info}`}>
                    {desk === 'finance' ? 'Finance Desk' : 'Logistics Desk'}
                  </span>
                </div>
                <div className={s.qcardBody}>
                  <div className={s.qcardRows}>
                    {desk === 'finance' ? (
                      <>
                        <div className={s.qcardRow}>
                          <span className={s.rowWho}>Hours of typing</span>
                          <span className={s.rowWhat}>handed to Docsynecx</span>
                          <span className={`${s.statusBadge} ${s.ok}`}>Back</span>
                        </div>
                        <div className={s.qcardRow}>
                          <span className={s.rowWho}>GST and duplicate slips</span>
                          <span className={s.rowWhat}>caught before they post</span>
                          <span className={`${s.statusBadge} ${s.ok}`}>Caught</span>
                        </div>
                        <div className={s.qcardRow}>
                          <span className={s.rowWho}>Month-end backlog</span>
                          <span className={s.rowWhat}>cleared as bills arrive</span>
                          <span className={`${s.statusBadge} ${s.ok}`}>Gone</span>
                        </div>
                        <div className={s.qcardRow}>
                          <span className={s.rowWho}>Your sign-off</span>
                          <span className={s.rowWhat}>on every entry</span>
                          <span className={`${s.statusBadge} ${s.purple}`}>Kept</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={s.qcardRow}>
                          <span className={s.rowWho}>Quotes to customers</span>
                          <span className={s.rowWhat}>out while the enquiry is fresh</span>
                          <span className={`${s.statusBadge} ${s.ok}`}>Sooner</span>
                        </div>
                        <div className={s.qcardRow}>
                          <span className={s.rowWho}>Shipment details</span>
                          <span className={s.rowWhat}>typed once, not three times</span>
                          <span className={`${s.statusBadge} ${s.ok}`}>Once</span>
                        </div>
                        <div className={s.qcardRow}>
                          <span className={s.rowWho}>&quot;Where&apos;s my cargo?&quot;</span>
                          <span className={s.rowWhat}>answered before they ask</span>
                          <span className={`${s.statusBadge} ${s.ok}`}>Ahead</span>
                        </div>
                        <div className={s.qcardRow}>
                          <span className={s.rowWho}>Your sign-off</span>
                          <span className={s.rowWhat}>before anything goes out</span>
                          <span className={`${s.statusBadge} ${s.purple}`}>Kept</span>
                        </div>
                      </>
                    )}
                  </div>

                  

                  <p className={s.sampleNote}>Sample overview · Everything verified before posting</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2 PLANS & MODULES SECTION */}
        <section className={s.section} id="plans" aria-label="Plans">
          <div className="site-shell">
            {desk === 'finance' ? (
              <div>
                <div className={s.secHead}>
                  <span className={s.eyebrow}>Finance Desk plans</span>
                  <h2 id="plans-h">
                    Two plans. <span>Pick the one that fits your desk today.</span>
                  </h2>
                </div>
                <div className={s.planGrid}>
                  <article className={s.planCard}>
                    <div className={s.planHeader}>
                      <span className={s.planBadge}>Starter</span>
                      <h3 className={s.planName}>Get the bills off your team&apos;s desk.</h3>
                      <p className={s.planFit}>
                        <b>For you if</b> one or two people spend their days keying bills into Tally.
                      </p>
                    </div>
                    <ul className={s.planList}>
                      <li>
                        <span className={s.checkBadge} aria-hidden="true">
                          <Check size={13} strokeWidth={2.8} />
                        </span>
                        <span>Bills read line by line, from portal, email or WhatsApp</span>
                      </li>
                      <li>
                        <span className={s.checkBadge} aria-hidden="true">
                          <Check size={13} strokeWidth={2.8} />
                        </span>
                        <span>GST, duplicate and total checks on every bill</span>
                      </li>
                      <li>
                        <span className={s.checkBadge} aria-hidden="true">
                          <Check size={13} strokeWidth={2.8} />
                        </span>
                        <span>Approve in one click, posted to TallyPrime</span>
                      </li>
                      <li>
                        <span className={s.checkBadge} aria-hidden="true">
                          <Check size={13} strokeWidth={2.8} />
                        </span>
                        <span>Setup and training for your team</span>
                      </li>
                    </ul>
                    <div className={s.planFooter}>
                      <Link className={s.secondaryBtn} href="https://invoice.docsynecx.com/signin/">
                        <span>Talk to us about Starter</span>
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </Link>
                    </div>
                  </article>

                  <article className={`${s.planCard} ${s.planCardAdvanced}`}>
                    <div className={s.planHeader}>
                      <span className={`${s.planBadge} ${s.planBadgePill}`}>
                        Professional · For growing teams
                      </span>
                      <h3 className={s.planName}>Run the whole finance desk on it.</h3>
                      <p className={s.planFit}>
                        <b>For you if</b> bills come from many branches, or month-end always runs late.
                      </p>
                    </div>
                    <ul className={s.planList}>
                      <li>
                        <span className={s.checkBadge} aria-hidden="true">
                          <Check size={13} strokeWidth={2.8} />
                        </span>
                        <span>
                          <b>Everything in Starter</b>, plus
                        </span>
                      </li>
                      <li>
                        <span className={s.checkBadge} aria-hidden="true">
                          <Check size={13} strokeWidth={2.8} />
                        </span>
                        <span>Higher monthly volumes</span>
                      </li>
                      <li>
                        <span className={s.checkBadge} aria-hidden="true">
                          <Check size={13} strokeWidth={2.8} />
                        </span>
                        <span>Approval rules by department, branch or amount</span>
                      </li>
                      <li>
                        <span className={s.checkBadge} aria-hidden="true">
                          <Check size={13} strokeWidth={2.8} />
                        </span>
                        <span>Zoho Books or your own ERP, as well as Tally</span>
                      </li>
                      <li>
                        <span className={s.checkBadge} aria-hidden="true">
                          <Check size={13} strokeWidth={2.8} />
                        </span>
                        <span>Priority support</span>
                      </li>
                    </ul>
                    <div className={s.planFooter}>
                      <Link className={s.primaryBtn} href="https://invoice.docsynecx.com/signin/">
                        <span>Talk to us about Professional</span>
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                </div>

                <div className={s.addons}>
                  <span className={s.addonsLabel}>Add when you&apos;re ready</span>
                  <div className={s.addonRow}>
                    <Link className={s.addonPill} href="/finance-desk/banking-reconciliation/">
                      Banking &amp; Reconciliation
                    </Link>
                    <Link className={s.addonPill} href="/finance-desk/payment-reminders/">
                      Payment Reminders
                    </Link>
                    <Link className={s.addonPill} href="/finance-desk/docsynecx-intelligence/">
                      Docsynecx Intelligence
                    </Link>
                    <Link className={s.addonPill} href="/finance-desk/accounts-payable/">
                      <span>Accounts Payable</span>
                      <span className={s.upTag}>Upcoming</span>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className={s.secHead}>
                  <span className={s.eyebrow}>Logistics Desk modules</span>
                  <h2>
                    Take one module, <br />
                    <span>or all three.</span>
                  </h2>
                  <p>
                    Each one takes a job off your team. Together, an enquiry becomes a tracked shipment
                    with no retyping in between.
                  </p>
                </div>
                <div className={s.modGrid}>
                  <article className={s.modCard}>
                    <div className={s.modTop}>
                      <span className={s.mono}>Module 01</span>
                    </div>
                    <h3 className={s.modTitle}>Email to Booking</h3>
                    <p className={s.modLead}>
                      Enquiries read, vendor rates requested and compared, quotes drafted for you to
                      send.
                    </p>
                    <p className={s.modWin}>Win the quote while the enquiry is still warm.</p>
                  </article>

                  <article className={s.modCard}>
                    <div className={s.modTop}>
                      <span className={s.mono}>Module 02</span>
                    </div>
                    <h3 className={s.modTitle}>Shipment Operations</h3>
                    <p className={s.modLead}>
                      Jobs created from shipment documents, checked, and pushed to CargoWise, your ERP, or
                      kept in Docsynecx.
                    </p>
                    <p className={s.modWin}>Type each shipment once, not three times.</p>
                  </article>

                  <article className={s.modCard}>
                    <div className={s.modTop}>
                      <span className={s.mono}>Module 03</span>
                    </div>
                    <h3 className={s.modTitle}>Shipment Tracking</h3>
                    <p className={s.modLead}>
                      Carrier and transporter updates, milestones and ETAs in one place, with alerts when
                      things slip.
                    </p>
                    <p className={s.modWin}>Tell customers before they chase you.</p>
                  </article>

                  <article className={`${s.modCard} ${s.modCardFeat}`}>
                    <div className={s.modTop}>
                      <span className={s.mono}>All three</span>
                      <span className={s.upTag}>Complete</span>
                    </div>
                    <h3 className={s.modTitle}>Docsynecx Complete</h3>
                    <p className={s.modLead}>
                      The full flow, from enquiry to delivery, scoped as one plan for your operation.
                    </p>
                    <p className={s.modWin}>One setup, one proposal, one team to call.</p>
                  </article>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 3 ESTIMATOR SECTION */}
        <section className={`${s.section} ${s.sectionAlternate}`} id="estimate" aria-labelledby="est-h">
          <div className="site-shell">
            {/* Interactive Calculator Desk Tab Switcher */}
            <div className={s.estTabSwitch} role="tablist" aria-label="Choose your desk">
              <button
                type="button"
                role="tab"
                aria-selected={desk === 'finance'}
                className={`${s.estTabBtn} ${desk === 'finance' ? s.estTabActive : ''}`}
                onClick={() => handleDeskSwitch('finance')}
              >
                Finance Desk
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={desk === 'logistics'}
                className={`${s.estTabBtn} ${desk === 'logistics' ? s.estTabActive : ''}`}
                onClick={() => handleDeskSwitch('logistics')}
              >
                Logistics Desk
              </button>
            </div>

            {desk === 'finance' ? (
              <div className={s.estFinanceGrid}>
                <div className={s.secHead} style={{ marginBottom: 0 }}>
                  <span className={s.eyebrow}>Is it worth it?</span>
                  <h2 id="est-h">
                    See what the manual work <br />
                    <span>costs you today.</span>
                  </h2>
                  <p>
                    Use your own numbers. If your plan costs less than this, it pays for itself, before
                    counting the mistakes it catches.
                  </p>
                  <div className={s.estCtaRow}>
                    <Link className={s.primaryBtn} href="/demo/#demo-form">
                      <span>Bring your numbers to the demo</span>
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                <form className={s.estForm} onSubmit={(e) => e.preventDefault()}>
                  <label className={s.estLabel}>
                    Bills typed each month
                    <input
                      className={s.estInput}
                      type="number"
                      min="0"
                      step="10"
                      value={financeBills}
                      onChange={(e) => setFinanceBills(Number(e.target.value))}
                      inputMode="numeric"
                    />
                  </label>
                  <label className={s.estLabel}>
                    Minutes to type and check one
                    <input
                      className={s.estInput}
                      type="number"
                      min="0"
                      step="1"
                      value={financeMinutes}
                      onChange={(e) => setFinanceMinutes(Number(e.target.value))}
                      inputMode="numeric"
                    />
                  </label>
                  <label className={s.estLabel}>
                    Cost of an hour of your team (₹)
                    <input
                      className={s.estInput}
                      type="number"
                      min="0"
                      step="50"
                      value={financeRate}
                      onChange={(e) => setFinanceRate(Number(e.target.value))}
                      inputMode="numeric"
                    />
                  </label>
                  <div className={s.estOutBox} aria-live="polite">
                    <div>
                      <span className={s.estNum}>{formatIndianNumber(finHours)}</span>
                      <span className={s.estText}>hours of typing a month</span>
                    </div>
                    <div>
                      <span className={s.estNum}>₹{formatIndianNumber(finCost)}</span>
                      <span className={s.estText}>spent on typing a month</span>
                    </div>
                    <div>
                      <span className={s.estNum}>
                        {(Math.round(finDays * 10) / 10).toLocaleString('en-IN')}
                      </span>
                      <span className={s.estText}>working days back, every month</span>
                    </div>
                  </div>
                  <p className={s.estNote}>
                    Based only on what you enter. Bring it to the demo and we&apos;ll size a plan around it.
                  </p>
                </form>
              </div>
            ) : (
              <div className={s.estLogisticsLayout}>
                <div className={s.secHead}>
                  <span className={s.eyebrow}>Is it worth it?</span>
                  <h2 id="est-h">
                    More quotes out. <br />
                    <span>More shipments won.</span>
                  </h2>
                  <p>
                    Every enquiry you can&apos;t quote in time goes to someone else. Put in your sales
                    team&apos;s numbers and see the difference faster quoting makes.
                  </p>
                </div>

                <form
                  className={`${s.estForm} ${s.estFormLogistics}`}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <label className={s.estLabel}>
                    Sales people quoting
                    <input
                      className={s.estInput}
                      type="number"
                      min="1"
                      step="1"
                      value={logSp}
                      onChange={(e) => setLogSp(Number(e.target.value))}
                      inputMode="numeric"
                    />
                  </label>
                  <label className={s.estLabel}>
                    Enquiries a month
                    <input
                      className={s.estInput}
                      type="number"
                      min="0"
                      step="10"
                      value={logEnq}
                      onChange={(e) => setLogEnq(Number(e.target.value))}
                      inputMode="numeric"
                    />
                  </label>
                  <label className={s.estLabel}>
                    Quotes per person a day
                    <input
                      className={s.estInput}
                      type="number"
                      min="0"
                      step="1"
                      value={logQpd}
                      onChange={(e) => setLogQpd(Number(e.target.value))}
                      inputMode="numeric"
                    />
                  </label>
                  <label className={s.estLabel}>
                    Working days a month
                    <input
                      className={s.estInput}
                      type="number"
                      min="1"
                      max="31"
                      step="1"
                      value={logDays}
                      onChange={(e) => setLogDays(Number(e.target.value))}
                      inputMode="numeric"
                    />
                  </label>
                  <label className={s.estLabel}>
                    Minutes per quote today
                    <input
                      className={s.estInput}
                      type="number"
                      min="1"
                      step="5"
                      value={logMb}
                      onChange={(e) => setLogMb(Number(e.target.value))}
                      inputMode="numeric"
                    />
                  </label>
                  <label className={s.estLabel}>
                    Minutes with Docsynecx (estimate)
                    <input
                      className={s.estInput}
                      type="number"
                      min="1"
                      step="1"
                      value={logMa}
                      onChange={(e) => setLogMa(Number(e.target.value))}
                      inputMode="numeric"
                    />
                  </label>
                  <label className={s.estLabel}>
                    Quotes turned to shipments (%)
                    <input
                      className={s.estInput}
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      value={logWin}
                      onChange={(e) => setLogWin(Number(e.target.value))}
                      inputMode="numeric"
                    />
                  </label>
                  <label className={s.estLabel}>
                    Profit per shipment (₹)
                    <input
                      className={s.estInput}
                      type="number"
                      min="0"
                      step="500"
                      value={logMar}
                      onChange={(e) => setLogMar(Number(e.target.value))}
                      inputMode="numeric"
                    />
                  </label>
                  <div className={s.baContainer} aria-live="polite">
                    <table className={s.baTable}>
                      <thead>
                        <tr>
                          <th scope="col">
                            <span className={s.sr}>Measure</span>
                          </th>
                          <th scope="col">Today</th>
                          <th scope="col" className={s.baAfter}>
                            With Docsynecx
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">Quotes sent a month</th>
                          <td>{formatIndianNumber(qb)}</td>
                          <td className={s.baAfter}>{formatIndianNumber(qa)}</td>
                        </tr>
                        <tr>
                          <th scope="row">Enquiries missed</th>
                          <td>{formatIndianNumber(xb)}</td>
                          <td className={s.baAfter}>{formatIndianNumber(xa)}</td>
                        </tr>
                        <tr>
                          <th scope="row">Shipments won</th>
                          <td>{formatIndianNumber(wb)}</td>
                          <td className={s.baAfter}>{formatIndianNumber(wa)}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className={s.baGainBox}>
                      <span className={s.baGainNum}>
                        {extraShip > 0 ? '+' : ''}
                        {formatIndianNumber(extraShip)}
                      </span>
                      <span className={s.baGainText}>
                        more shipments won a month, from the same team
                      </span>
                      <span className={s.baGainSub}>
                        <b>
                          {gain > 0 ? '+' : ''}
                          {formatIndianRupees(gain)}
                        </b>{' '}
                        extra profit a month
                      </span>
                      <span className={s.baGainSub}>
                        {hoursBack >= 1
                          ? `About ${formatIndianNumber(hoursBack)} hours a month back for each sales person.`
                          : 'Your team is now quoting every enquiry you get.'}
                      </span>
                    </div>
                  </div>
                  <p className={s.estNote}>
                    Assumes your win rate stays the same. Every figure comes from the numbers you enter.
                    We&apos;ll measure your real minutes per quote on your own enquiries in the demo.
                  </p>
                </form>
              </div>
            )}
          </div>
        </section>

        {/* 4 IN EVERY PLAN SECTION */}
        <section className={s.section} aria-labelledby="inc-h">
          <div className="site-shell">
            <div className={s.secHead}>
              <span className={s.eyebrow}>In every plan</span>
              <h2 id="inc-h">
                What every plan <span>comes with.</span>
              </h2>
            </div>
            {desk === 'finance' ? (
              <div className={s.viewsGrid}>
                <article className={s.viewCard}>
                  <span className={s.mono}>Control</span>
                  <h3 className={s.viewTitle}>Nothing posts without you</h3>
                  <p className={s.viewDesc}>
                    Every entry is reviewed and approved by your team before it reaches Tally.
                  </p>
                </article>
                <article className={s.viewCard}>
                  <span className={s.mono}>Fast start</span>
                  <h3 className={s.viewTitle}>Tally connected in minutes</h3>
                  <p className={s.viewDesc}>
                    Tested on your own bills, with your team trained in one session.
                  </p>
                </article>
                <article className={s.viewCard}>
                  <span className={s.mono}>Proof</span>
                  <h3 className={s.viewTitle}>Every voucher has its bill</h3>
                  <p className={s.viewDesc}>
                    Each entry linked to the original document, who approved it and when.
                  </p>
                </article>
              </div>
            ) : (
              <div className={s.viewsGrid}>
                <article className={s.viewCard}>
                  <span className={s.mono}>Control</span>
                  <h3 className={s.viewTitle}>Nothing goes out unchecked</h3>
                  <p className={s.viewDesc}>
                    No quote, job or update goes to a customer or carrier until your team says yes.
                  </p>
                </article>
                <article className={s.viewCard}>
                  <span className={s.mono}>Fast start</span>
                  <h3 className={s.viewTitle}>Live in about a week</h3>
                  <p className={s.viewDesc}>
                    Set up on your own lanes, emails and documents, with your team trained.
                  </p>
                </article>
                <article className={s.viewCard}>
                  <span className={s.mono}>Your system</span>
                  <h3 className={s.viewTitle}>Keep how you work</h3>
                  <p className={s.viewDesc}>
                    Jobs pushed to CargoWise or your ERP, or run on Docsynecx on its own.
                  </p>
                </article>
              </div>
            )}
          </div>
        </section>

        {/* 5 HOW PRICING WORKS SECTION */}
        <section className={`${s.section} ${s.sectionAlternate}`} aria-labelledby="hw-h">
          <div className="site-shell">
            <div className={s.secHead}>
              <span className={s.eyebrow}>How pricing works</span>
              <h2 id="hw-h">
                Three steps <span>to a price that fits.</span>
              </h2>
            </div>
            <ol className={s.hwList}>
              <li className={s.hwItem}>
                <span className={s.hwNum}>1</span>
                <h3 className={s.hwTitle}>Tell us your volume</h3>
                {desk === 'finance' ? (
                  <p className={s.hwDesc}>
                    Roughly how many bills a month, and which jobs eat the most time.
                  </p>
                ) : (
                  <p className={s.hwDesc}>
                    Roughly how many shipments a month, and where your team loses the most time.
                  </p>
                )}
              </li>
              <li className={s.hwItem}>
                <span className={s.hwNum}>2</span>
                <h3 className={s.hwTitle}>See it on your own work</h3>
                {desk === 'finance' ? (
                  <p className={s.hwDesc}>A 30-minute demo using a few of your real bills.</p>
                ) : (
                  <p className={s.hwDesc}>
                    A 30-minute demo using a few of your real enquiry and shipment emails.
                  </p>
                )}
              </li>
              <li className={s.hwItem}>
                <span className={s.hwNum}>3</span>
                <h3 className={s.hwTitle}>Get a written proposal</h3>
                <p className={s.hwDesc}>
                  One price, sized to your volume, with everything included listed clearly.
                </p>
              </li>
            </ol>
          </div>
        </section>

        {/* 6 FAQ SECTION */}
        <section className={s.section} id="faq" aria-labelledby="faq-h">
          <div className="site-shell">
            <div className={s.faqLayout}>
              <div className={s.faqHeading}>
                <div>
                  <p className={s.faqEyebrow}>Pricing questions</p>
                  <h2 id="faq-h" className={s.faqTitle}>
                    Straight answers.
                  </h2>
                  <p className={s.faqDescription}>
                    Anything else?{' '}
                    <Link href="/demo/#demo-form">Ask us in the demo.</Link>
                  </p>
                </div>
              </div>
              {desk === 'finance' ? (
                <div className={s.faqContainer}>
                  <details className={s.faqDetails} open>
                    <summary className={s.faqSummary}>Why isn&apos;t there a price on this page?</summary>
                    <p className={s.faqAnswer}>
                      A business with 200 bills a month shouldn&apos;t pay the same as one with 5,000. We size
                      your plan to your volume, so you never pay for capacity you won&apos;t use.
                    </p>
                  </details>
                  <details className={s.faqDetails}>
                    <summary className={s.faqSummary}>Can we start small?</summary>
                    <p className={s.faqAnswer}>
                      Yes. Most teams start with invoices, then add banking, reminders or reports once
                      they&apos;ve seen the time it saves.
                    </p>
                  </details>
                  <details className={s.faqDetails}>
                    <summary className={s.faqSummary}>How soon do we see results?</summary>
                    <p className={s.faqAnswer}>
                      TallyPrime connects in minutes, so your first bills can be read the same day.
                    </p>
                  </details>
                  <details className={s.faqDetails}>
                    <summary className={s.faqSummary}>Does anything post without our approval?</summary>
                    <p className={s.faqAnswer}>
                      No. On every plan, your team approves every entry before it reaches your books.
                    </p>
                  </details>
                </div>
              ) : (
                <div className={s.faqContainer}>
                  <details className={s.faqDetails} open>
                    <summary className={s.faqSummary}>Why isn&apos;t there a price on this page?</summary>
                    <p className={s.faqAnswer}>
                      A forwarder moving 50 shipments a month shouldn&apos;t pay the same as one moving 2,000.
                      Your price follows your modules and volume.
                    </p>
                  </details>
                  <details className={s.faqDetails}>
                    <summary className={s.faqSummary}>Can we start with one module?</summary>
                    <p className={s.faqAnswer}>
                      Yes. Many teams start with Email to Booking or Shipment Operations, then add the rest
                      when they&apos;re ready.
                    </p>
                  </details>
                  <details className={s.faqDetails}>
                    <summary className={s.faqSummary}>Do we need CargoWise?</summary>
                    <p className={s.faqAnswer}>
                      No. Jobs can go to CargoWise, your own ERP, or stay in Docsynecx on its own.
                    </p>
                  </details>
                  <details className={s.faqDetails}>
                    <summary className={s.faqSummary}>Does anything go out without our approval?</summary>
                    <p className={s.faqAnswer}>
                      No. Your team checks every quote, job and update before it goes to a customer or
                      carrier.
                    </p>
                  </details>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 7 CLOSING SECTION — EXACT DESIGN FROM /invoice-automation */}
        <FinanceClosingCta
          eyebrow="YOUR PRICE, YOUR NUMBERS"
          title={
            <>
              Find out what it would cost.<br />
              <span>And what it would save.</span>
            </>
          }
          copy={
            desk === 'finance'
              ? 'Thirty minutes, a few of your own bills, and a proposal sized to how your accounts team actually works.'
              : 'Thirty minutes, a few of your own shipment emails, and a proposal sized to how your operation actually runs.'
          }
          // steps={[
          //   'Book a 30-minute demo',
          //   'See your own work handled',
          //   'Get a written proposal',
          // ]}
          primaryHref="/demo/#demo-form"
          primaryText="Get your proposal"
          secondaryHref={desk === 'finance' ? '/finance-desk/' : '/logistics-desk/'}
          secondaryText={desk === 'finance' ? 'Explore Finance Desk' : 'Explore Logistics Desk'}
        />
      </main>

      {/* Global Footer */}
      <ShipsyFooter showCta={false} />
    </div>
  );
}

export default PricingPage;
