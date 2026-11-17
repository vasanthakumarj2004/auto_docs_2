import { ArrowRight, Check, CircleCheck, ClipboardList, FileCheck2, FileText, Layers, ListChecks, Plug, Rocket, Settings2, ShieldCheck, SlidersHorizontal, Users, type LucideIcon } from 'lucide-react';
import base from '../LandingPage.module.css';
import s from './FinanceGetStarted.module.css';

type WorkflowStep = { icon: LucideIcon; title: string; detail: string; emphasis?: boolean };
const stages: { title: string; description: string; steps: WorkflowStep[]; outcome: string }[] = [
  {
    title: 'Discover',
    description: 'Your documents, your team and where to start.',
    steps: [
      { icon: FileText, title: 'Your documents', detail: 'Types, formats and volumes' },
      { icon: Users, title: 'Your team', detail: 'Who reviews and who approves' },
      { icon: ClipboardList, title: 'Where to start', detail: 'Usually supplier invoices', emphasis: true },
    ],
    outcome: 'We agree where to start',
  },
  {
    title: 'Configure',
    description: 'Connect TallyPrime and set your rules.',
    steps: [
      { icon: Layers, title: 'Connect TallyPrime', detail: 'Your company and ledgers' },
      { icon: Plug, title: 'Map the workflow', detail: 'From inbox to posted entry', emphasis: true },
      { icon: SlidersHorizontal, title: 'Review rules', detail: 'Fields, checks and team access' },
    ],
    outcome: 'Set up around your Tally company',
  },
  {
    title: 'Test',
    description: 'Run it on your own invoices.',
    steps: [
      { icon: FileText, title: 'Your own invoices', detail: 'Everyday business files' },
      { icon: FileCheck2, title: 'Check the results', detail: 'Fields, tax and ledgers', emphasis: true },
      { icon: ShieldCheck, title: 'Your team signs off', detail: 'Before anything posts' },
    ],
    outcome: 'Tested on your own invoices first',
  },
  {
    title: 'Go live',
    description: 'Approve your first real invoices into Tally.',
    steps: [
      { icon: ListChecks, title: 'Team ready', detail: 'Logins and permissions' },
      { icon: CircleCheck, title: 'Start approving', detail: 'Your first real invoices', emphasis: true },
      { icon: Rocket, title: 'Grow when ready', detail: 'Add banking, reminders, reports' },
    ],
    outcome: 'Your team stops typing invoices',
  },
];

export function FinanceGetStarted() {
  return <section id="get-started" className={`${base.section} ${s.section}`} aria-labelledby="finance-get-started-title">
    <div className="site-shell">
      <div className={s.heading}>
        <div>
          <p className={`${base.eyebrow} ${s.eyebrow}`}>Live in minutes</p>
          <h2 id="finance-get-started-title">Connect TallyPrime immediately.<br /><span>Approve your first invoice in minutes.</span></h2>
          <p className={s.intro}>We set it up around your TallyPrime company, your ledgers and who approves what. You test it on your own invoices before anything is posted.</p>
        </div>
        <div className={s.overview} aria-hidden="true">
          {[ClipboardList, Settings2, ShieldCheck, Rocket].map((Icon, index) => <div key={index}><span><Icon size={22} strokeWidth={1.5} /></span>{index < 3 && <i />}</div>)}
        </div>
      </div>
      <ol className={s.cards}>
        {stages.map(({ title, description, steps, outcome }, index) => <li className={s.card} key={title}>
          <div className={s.cardHeading}><span className={s.number}>0{index + 1}</span><h3>{title}</h3>{index < 3 && <ArrowRight size={15} aria-hidden="true" />}</div>
          <p className={s.description}>{description}</p>
          <ol className={s.workflow} aria-label={`${title} steps`}>
            {steps.map(({ icon: Icon, title: stepTitle, detail, emphasis }) => <li key={stepTitle} className={s.workflowStep} data-emphasis={emphasis || undefined}>
              <span className={s.icon}><Icon size={15} strokeWidth={1.7} aria-hidden="true" /></span>
              <div><strong>{stepTitle}</strong><span>{detail}</span></div>
            </li>)}
          </ol>
          <p className={s.outcome}><Check size={13} aria-hidden="true" />{outcome}</p>
        </li>)}
      </ol>
    </div>
  </section>;
}
