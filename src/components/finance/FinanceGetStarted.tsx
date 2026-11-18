import { ArrowRight, Check, CircleCheck, ClipboardList, FileCheck2, FileText, Layers, ListChecks, Plug, Rocket, Settings2, ShieldCheck, SlidersHorizontal, Users, type LucideIcon } from 'lucide-react';
import { financeSetup } from '../../content/finance';
import base from '../LandingPage.module.css';
import s from './FinanceGetStarted.module.css';

const stageIcons: LucideIcon[][] = [
  [FileText, Users, ClipboardList],
  [Layers, Plug, SlidersHorizontal],
  [FileText, FileCheck2, ShieldCheck],
  [ListChecks, CircleCheck, Rocket],
];

export function FinanceGetStarted() {
  return (
    <section id="setup" className={`${base.section} ${s.section}`} aria-labelledby="setup-h">
      <div className="site-shell">
        <div className={s.heading}>
          <div>
            <p className={`${base.eyebrow} ${s.eyebrow}`}>{financeSetup.eyebrow}</p>
            <h2 id="setup-h">
              <span className={s.line}>{financeSetup.headline}</span>
              {'accent' in financeSetup && (
                <>
                  <br />
                  <span className={`${s.line} ${s.accentLine}`}>{financeSetup.accent}</span>
                </>
              )}
            </h2>
            <p className={s.intro}>{financeSetup.description}</p>
          </div>
          <div className={s.overview} aria-hidden="true">
            {[ClipboardList, Settings2, ShieldCheck, Rocket].map((Icon, index) => (
              <div key={index}>
                <span>
                  <Icon size={22} strokeWidth={1.5} />
                </span>
                {index < 3 && <i />}
              </div>
            ))}
          </div>
        </div>
        <ol className={s.cards}>
          {financeSetup.stages.map(({ title, description, items, outcome }, index) => (
            <li className={s.card} key={title}>
              <div className={s.cardHeading}>
                <span className={s.number}>0{index + 1}</span>
                <h3>{title}</h3>
                {index < 3 && <ArrowRight size={15} aria-hidden="true" />}
              </div>
              <p className={s.description}>{description}</p>
              <ol className={s.workflow} aria-label={`${title} steps`}>
                {items.map((step, stepIdx) => {
                  const Icon = stageIcons[index]?.[stepIdx] || FileText;
                  return (
                    <li key={step.label} className={s.workflowStep} data-emphasis={stepIdx === 1 || (index === 0 && stepIdx === 2) ? true : undefined}>
                      <span className={s.icon}>
                        <Icon size={15} strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      <div>
                        <strong>{step.label}</strong>
                        <span>{step.detail}</span>
                      </div>
                    </li>
                  );
                })}
              </ol>
              <p className={s.outcome}>
                <Check size={13} aria-hidden="true" />
                {outcome}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
