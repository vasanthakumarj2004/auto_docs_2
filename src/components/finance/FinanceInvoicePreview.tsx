import { Check, CheckCheck, FileCheck2, FileText, ShieldCheck } from 'lucide-react';
import s from './FinanceInvoicePreview.module.css';

const items = [
  { name: 'Precision bearings', quantity: '100', amount: '32,500' },
  { name: 'Motor assemblies', quantity: '50', amount: '21,000' },
  { name: 'Control switches', quantity: '25', amount: '9,250' },
];

export function FinanceInvoicePreview() {
  return <div className={s.preview} aria-label="Illustrative invoice extraction and TallyPrime posting with sample data">
    <div className={s.header}><span><FileCheck2 size={16} aria-hidden="true" /><strong>Finance Desk</strong><span className={s.headerDivider}>/</span>Invoice review</span><span className={s.confidence}><ShieldCheck size={12} aria-hidden="true" />High confidence</span></div>
    <div className={s.workspace}>
      <div className={s.document}>
        <div className={s.documentBar}><span><FileText size={12} aria-hidden="true" />INV-4821.pdf</span><span>1 / 1</span></div>
        <div className={s.paper}>
          <div className={s.paperHeading}><span>TAX INVOICE</span><span>ORIGINAL</span></div>
          <strong className={s.supplier}><mark>Prime Components</mark></strong>
          <p className={s.address}>Industrial Estate, Chennai<br />Tamil Nadu, India</p>
          <div className={s.invoiceMeta}><div><span>Invoice no.</span><strong><mark>INV-4821</mark></strong></div><div><span>Invoice date</span><strong><mark>18 Sep 2026</mark></strong></div></div>
          <div className={s.buyer}><span>BILL TO</span><strong>Acme Manufacturing</strong></div>
          <table className={s.documentTable} aria-label="Source invoice line items"><thead><tr><th>DESCRIPTION</th><th>QTY</th><th>AMOUNT</th></tr></thead><tbody>{items.map((item, index) => <tr key={item.name} data-highlight={index === 0 || undefined}><td>{item.name}</td><td>{item.quantity}</td><td>{item.amount}</td></tr>)}</tbody></table>
          <dl className={s.totals}><div><dt>Taxable value</dt><dd>₹62,750</dd></div><div><dt>IGST · 18%</dt><dd>₹11,295</dd></div><div className={s.total}><dt>Total (INR)</dt><dd><mark>₹74,045</mark></dd></div></dl>
        </div>
      </div>
      <div className={s.extracted}>
        <div className={s.fieldsHeader}><strong>Extracted fields</strong><span><Check size={11} aria-hidden="true" />Ready</span></div>
        <span className={s.label}>INVOICE DETAILS</span>
        <dl className={s.fieldGrid}><div><dt>Invoice no.</dt><dd>INV-4821</dd></div><div><dt>Date</dt><dd>18 Sep 2026</dd></div></dl>
        <dl className={s.parties}><div><dt>Supplier</dt><dd>Prime Components</dd><span><Check size={10} aria-hidden="true" />Supplier matched</span></div></dl>
        <div className={s.itemsHeading}><span className={s.label}>LINE ITEMS</span><span>03 captured</span></div>
        <table className={s.extractedTable} aria-label="Extracted invoice line items"><thead className={s.srOnly}><tr><th>Description</th><th>Amount in rupees</th></tr></thead><tbody>{items.map(item => <tr key={item.name}><td>{item.name}</td><td>₹{item.amount}</td></tr>)}</tbody></table>
        <div className={s.reconciled}><span><CheckCheck size={16} aria-hidden="true" /><strong>Totals reconciled</strong></span><p>3 line items · Tax totals checked</p></div>
      </div>
    </div>
    <div className={s.sync}>
      <div className={s.syncHeading}><span><span className={s.syncDot} />TALLYPRIME <span className={s.voucher}>· PUR-829</span></span><span className={s.synced}><Check size={10} aria-hidden="true" />Synced</span></div>
      <ol className={s.syncSteps}><li><Check size={11} aria-hidden="true" /><span>Fields mapped</span></li><li><Check size={11} aria-hidden="true" /><span>Voucher created</span></li><li><Check size={11} aria-hidden="true" /><span>Source linked</span></li></ol>
    </div>
  </div>;
}
