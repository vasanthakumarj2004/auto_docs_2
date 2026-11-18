'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { financeIntelligenceViews, financeIntelligenceBottom } from '../../content/finance';
import base from '../LandingPage.module.css';
import s from './FinanceWorkflow.module.css';

export function FinanceWorkflow() {
  return (
    <section
      id="intel"
      className={`${base.section} ${s.section}`}
      aria-labelledby="intel-h"
    >
      <div className="site-shell">
        {/* Header */}
        <div className={s.heading}>
          <p className={`${base.eyebrow} ${s.eyebrow}`}>
            Docsynecx Intelligence · Six views
          </p>
          <h2 id="intel-h" className={s.headline}>
            Six questions your owners ask.<br /><span>Answered from your own books.</span>
          </h2>
          <p className={s.intro}>
            Each view is built from your TallyPrime data, and every figure links back to the entries behind it.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className={s.grid}>
          {financeIntelligenceViews.map((item) => (
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
            {financeIntelligenceBottom.note}
          </p>
          <div className={s.ctaWrap}>
            <Link href={financeIntelligenceBottom.buttonHref} className={s.demoButton}>
              <span>{financeIntelligenceBottom.buttonText}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
