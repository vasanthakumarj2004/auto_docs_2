import { ArrowUpRight, Bell, Check, ChevronDown, CircleHelp, FileCheck2, FileText, LayoutDashboard, Mail, MoreHorizontal, Search, Settings2, Ship, Sparkles, Wallet } from 'lucide-react';
import styles from './DocsynecxDashboardPreview.module.css';

const documents = [
  { name: 'Purchase invoice', reference: 'INV-2026-0842', desk: 'Finance', system: 'TallyPrime', status: 'Posted', amount: '₹48,250', tone: 'green' },
  { name: 'Freight invoice', reference: 'INV-2026-0843', desk: 'Shipment', system: 'CargoWise', status: 'Validated', amount: '₹76,800', tone: 'green' },
  { name: 'Supplier invoice', reference: 'INV-2026-0844', desk: 'Finance', system: 'TallyPrime', status: 'Needs review', amount: '₹32,400', tone: 'amber' },
  { name: 'Bill of lading', reference: 'BL-2026-0128', desk: 'Shipment', system: 'CargoWise', status: 'Extracted', amount: '—', tone: 'neutral' },
];

// Illustrative product artwork: deliberately not exposed as working dashboard controls.
export function DocsynecxDashboardPreview() {
  return <figure className={styles.preview} role="img" aria-label="Illustrative Docsynecx dashboard showing document processing, invoice review, shipment documents, and connections to TallyPrime and CargoWise.">
    <div className={styles.dashboard} aria-hidden="true">
      <aside className={styles.sidebar}>
        <img src="/logo-icon.svg" width={26} height={26} alt="" className={styles.mark} />
        <span className={styles.activeIcon}><LayoutDashboard size={18} /></span>
        <span><FileText size={18} /></span><span><Wallet size={18} /></span>
        <span><Ship size={18} /></span><span><Mail size={18} /></span>
        <span><Sparkles size={18} /></span>
        <div className={styles.sidebarBottom}><CircleHelp size={18} /><Settings2 size={18} /><b>DS</b></div>
      </aside>
      <div className={styles.workspace}>
        <div className={styles.topbar}>
          <div className={styles.workspaceName}>Docsynecx <span>/</span> Workspace <ChevronDown size={12} /></div>
          <div className={styles.search}><Search size={13} /> Search documents, shipments… <kbd>⌘ K</kbd></div>
          <Bell size={16} /><span className={styles.avatar}>AK</span>
        </div>
        <div className={styles.content}>
          <div className={styles.pageHeading}><div><p>YOUR WORK, CONNECTED</p><h2>Workflow overview</h2></div><span className={styles.sampleLabel}>Demo workspace</span></div>
          <div className={styles.tabs}><span className={styles.selectedTab}>Overview</span><span>Finance Desk</span><span>Shipment Desk</span><span className={styles.dateFilter}>This month <ChevronDown size={11} /></span></div>
          <div className={styles.metrics}>
            <div><p>Documents processed <FileText size={14} /></p><strong>1,284</strong><small>Across finance & shipments</small></div>
            <div><p>Ready to post <FileCheck2 size={14} /></p><strong>186</strong><small><i /> Validated & approved</small></div>
            <div><p>Needs your review <Search size={14} /></p><strong>12</strong><small>Keep your team in control</small></div>
            <div><p>Active shipments <Ship size={14} /></p><strong>48</strong><small>Connected to CargoWise</small></div>
          </div>
          <div className={styles.insights}>
            <div className={styles.chartPanel}>
              <div className={styles.panelHeading}><h3>Document activity</h3><span><i /> Processed documents</span></div>
              <div className={styles.chart}>
                <div className={styles.axis}><span>400</span><span>300</span><span>200</span><span>100</span></div>
                <svg viewBox="0 0 560 154" preserveAspectRatio="none">
                  <path d="M0 12H560 M0 51H560 M0 90H560 M0 129H560" fill="none" stroke="#e9ece9" strokeDasharray="3 4" />
                  <path d="M0 130 C30 130 42 100 75 106 S118 125 150 91 S193 99 230 68 S272 81 310 52 S351 74 390 37 S438 49 478 22 S524 29 560 8 V154 H0Z" fill="#f0f6f2" />
                  <path d="M0 130 C30 130 42 100 75 106 S118 125 150 91 S193 99 230 68 S272 81 310 52 S351 74 390 37 S438 49 478 22 S524 29 560 8" fill="none" stroke="#315b46" strokeWidth="2" />
                  <circle cx="390" cy="37" r="4" fill="white" stroke="#315b46" strokeWidth="2" />
                </svg>
                <div className={styles.chartTooltip}>312 documents <ArrowUpRight size={11} /></div>
              </div>
              <div className={styles.chartDates}><span>Nov 01</span><span>Nov 05</span><span>Nov 10</span><span>Nov 15</span><span>Nov 20</span><span>Nov 25</span><span>Nov 30</span></div>
            </div>
            <div className={styles.workflowPanel}>
              <h3>From document to done</h3><p>Your workflow at a glance</p>
              {[
                ['Received', 'Email & upload', '1,308'],
                ['Extracted', 'AI reads the details', '1,296'],
                ['Validated', 'Checked against your rules', '1,284'],
                ['Synced', 'Posted to your systems', '1,098'],
              ].map(([title, label, value]) => <div className={styles.flowStep} key={title}><span className={styles.stepCheck}><Check size={10} /></span><div><strong>{title}</strong><small>{label}</small></div><b>{value}</b></div>)}
            </div>
          </div>
          <div className={styles.documents}>
            <div className={styles.panelHeading}><h3>Recent documents <span className={styles.count}>24</span></h3><span>View all documents <ArrowUpRight size={12} /></span></div>
            <table><thead><tr><th>Document</th><th>Desk</th><th>Destination</th><th>Status</th><th>Amount</th><th /></tr></thead>
              <tbody>{documents.map(doc => <tr key={doc.reference}><td><div className={styles.documentName}><span className={styles.fileIcon}><FileText size={16} /></span><div><strong>{doc.name}</strong><small>{doc.reference}</small></div></div></td><td>{doc.desk}</td><td>{doc.system}</td><td><span className={styles.status} data-tone={doc.tone}><i />{doc.status}</span></td><td>{doc.amount}</td><td><MoreHorizontal size={13} /></td></tr>)}</tbody>
            </table>
          </div>
          <div className={styles.connections}><span><i /> All systems connected</span><div>TallyPrime <Check size={10} /><span>·</span> CargoWise <Check size={10} /><span>·</span> Email <Check size={10} /></div><span>Illustrative data</span></div>
        </div>
      </div>
    </div>
    <figcaption className={styles.caption}>Docsynecx workspace · Illustrative product preview</figcaption>
  </figure>;
}
