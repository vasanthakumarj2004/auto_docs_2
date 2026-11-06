import { ArrowUpRight, BatteryFull, Check, ChevronLeft, FileText, MoreHorizontal, ShieldCheck, Signal, Wifi } from 'lucide-react';
import styles from './DocsynecxPhonePreview.module.css';

export function DocsynecxPhonePreview() {
  return <figure className={styles.preview} role="img" aria-label="Illustrative Docsynecx mobile preview: a purchase invoice for ₹48,250 has been extracted and validated, ready for human review before posting to TallyPrime.">
    <div className={styles.phone} aria-hidden="true">
      <div className={styles.screen}>
        <div className={styles.statusBar}><span>9:41</span><div className={styles.island} /><div className={styles.statusIcons}><Signal size={12} /><Wifi size={12} /><BatteryFull size={16} /></div></div>
        <div className={styles.appBar}><ChevronLeft size={17} /><img src="/Docsynecx-Logo.svg" width={108} height={31} alt="" /><MoreHorizontal size={18} /></div>
        <div className={styles.content}>
          <div className={styles.heading}><span>FINANCE DESK</span><span>Demo workspace</span></div>
          <div className={styles.invoiceCard}>
            <div className={styles.cardPattern} />
            <div className={styles.cardTop}><span className={styles.documentIcon}><FileText size={21} /></span><span className={styles.validated}><Check size={10} /> Validated</span></div>
            <p>Purchase invoice</p>
            <strong>₹48,250<span>.00</span></strong>
            <div className={styles.cardBottom}><span>Northstar Supplies<small>INV-2026-0842</small></span><ArrowUpRight size={17} /></div>
          </div>
          <div className={styles.sectionTitle}><h3>Document details</h3><FileText size={13} /></div>
          <dl className={styles.details}>
            <div><dt>Document type</dt><dd>Supplier invoice</dd></div>
            <div><dt>GST validation</dt><dd className={styles.verified}><Check size={11} /> Checked</dd></div>
            <div><dt>Destination</dt><dd>TallyPrime <span className={styles.connectionDot} /></dd></div>
          </dl>
          <div className={styles.progress}>
            {['Received', 'Extracted', 'Validated'].map(label => <div key={label}><span><Check size={10} /></span><small>{label}</small></div>)}
          </div>
          <div className={styles.review}><ShieldCheck size={23} /><div><strong>Ready for your review</strong><p>You approve. Docsynecx does the rest.</p></div></div>
          <span className={styles.reviewAction}>Review document <ArrowUpRight size={13} /></span>
          <p className={styles.sampleNote}>Illustrative document data</p>
        </div>
        <span className={styles.homeIndicator} />
      </div>
    </div>
  </figure>;
}
