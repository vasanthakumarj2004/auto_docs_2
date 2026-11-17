'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import base from '../LandingPage.module.css';
import s from './FinanceWorkflow.module.css';

interface IntelligenceView {
  number: string;
  tag: string;
  question: string;
  description: string;
  chips: string[];
}

const views: IntelligenceView[] = [
  {
    number: '01',
    tag: 'Financial',
    question: 'Are we making money, and how much cash do we have?',
    description:
      'Revenue and expenses next to profit, balance sheet and cash and bank positions. Every figure links back to the entries in Tally.',
    chips: ['P&L', 'Balance Sheet', 'Profitability', 'Revenue', 'Expenses', 'Cash & Bank'],
  },
  {
    number: '02',
    tag: 'Business',
    question: 'Who are our best customers, suppliers and products?',
    description:
      'See how sales and purchases connect to your customers, suppliers and products, so you know which relationships really pay.',
    chips: ['Sales', 'Purchases', 'Customers', 'Suppliers', 'Products', 'Inventory'],
  },
  {
    number: '03',
    tag: 'Working capital',
    question: "Who owes us, what do we owe, and what's overdue?",
    description:
      "All outstanding receivables and payables in one review, including what's overdue and by how long. We set the ageing periods you already use.",
    chips: ['Receivables', 'Payables', 'Overdue bills', 'Liquidity', 'Cash cycle'],
  },
  {
    number: '04',
    tag: 'Operations',
    question: 'Which stock is moving, and which is sitting?',
    description:
      'Stock movement and ageing next to purchase patterns and supplier performance, so you can spot dead stock and unreliable suppliers.',
    chips: ['Inventory movement', 'Stock ageing', 'Purchase patterns', 'Supplier performance'],
  },
  {
    number: '05',
    tag: 'AI',
    question: 'Why did that number change?',
    description:
      'Ask in plain words, like "Why did expenses go up in October?", and get an answer with the entries behind it. Every answer shows its source, so your accountant can check it before anyone acts.',
    chips: ['Ask a question', 'Find the cause', 'Insights', 'Suggested next steps'],
  },
  {
    number: '06',
    tag: 'Management',
    question: 'Is the monthly MIS ready?',
    description:
      'Choose the KPIs, comparison periods and schedule. The MIS is built and sent on time, with alerts when a number crosses a line you set.',
    chips: ['Monthly MIS', 'KPIs', 'This month vs last', 'Scheduled reports', 'Alerts'],
  },
];

export function FinanceWorkflow() {
  return (
    <section
      id="finance-workflow"
      className={`${base.section} ${s.section}`}
      aria-labelledby="finance-workflow-title"
    >
      <div className="site-shell">
        {/* Header */}
        <div className={s.heading}>
          <p className={`${base.eyebrow} ${s.eyebrow}`}>
            Docsynecx Intelligence · Six views
          </p>
          <h2 id="finance-workflow-title" className={s.headline}>
            Six questions your owners ask.<br /><span>Answered from your own books.</span>
          </h2>
          <p className={s.intro}>
            Each view is built from your TallyPrime data, and every figure links back to the entries behind it.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className={s.grid}>
          {views.map((item) => (
            <article key={item.number} className={s.card}>
              <div className={s.cardTop}>
                <span className={s.cardTag}>
                  {item.number} · {item.tag}
                </span>
              </div>
              <h3 className={s.cardQuestion}>{item.question}</h3>
              <p className={s.cardDescription}>{item.description}</p>
              <ul className={s.chipList} aria-label={`${item.tag} topics`}>
                {item.chips.map((chip) => (
                  <li key={chip} className={s.chip}>
                    {chip}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Bottom Area */}
        <div className={s.bottomArea}>
          <p className={s.bottomNote}>
            Built from your own TallyPrime data. What each view shows depends on what&apos;s recorded in Tally. In the demo we&apos;ll show you all six on your own books.
          </p>
          <div className={s.ctaWrap}>
            <Link href="/demo/#demo-form" className={s.demoButton}>
              <span>See your own numbers</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
