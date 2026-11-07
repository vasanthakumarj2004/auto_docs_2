import { ArrowRight, Check, CircleCheck, ClipboardList, FileCheck2, FileText, Layers, ListChecks, Plug, Rocket, Settings2, ShieldCheck, SlidersHorizontal, Users, type LucideIcon } from 'lucide-react';
import base from '../LandingPage.module.css';
import s from './FinanceGetStarted.module.css';

type WorkflowStep = { icon: LucideIcon; title: string; detail: string; emphasis?: boolean };
const stages: { title: string; description: string; steps: WorkflowStep[]; outcome: string }[] = [
  {
    title: 'Discover',
    description: 'Understand document volumes, systems and reporting needs.',
    steps: [
      { icon: FileText, title: 'Your documents', detail: 'Types, formats and volumes' },
      { icon: Users, title: 'Your team', detail: 'Roles and review responsibilities' },
      { icon: ClipboardList, title: 'Define the use case', detail: 'Agree on priorities and scope', emphasis: true },
    ],
    outcome: 'A shared starting point',
  },
  {
    title: 'Configure',
    description: 'Set up the selected workflows and integrations.',
    steps: [
      { icon: Layers, title: 'Workflow mapping', detail: 'From document intake to output' },
      { icon: Plug, title: 'Connect your systems', detail: 'TallyPrime and agreed integrations', emphasis: true },
      { icon: SlidersHorizontal, title: 'Review rules', detail: 'Fields, checks and team access' },
    ],
    outcome: 'A workflow built around you',
  },
  {
    title: 'Validate',
    description: 'Test with sample documents and review outputs.',
    steps: [
      { icon: FileText, title: 'Sample documents', detail: 'Use your everyday business files' },
      { icon: FileCheck2, title: 'Review the results', detail: 'Check captured fields and outputs', emphasis: true },
      { icon: ShieldCheck, title: 'Team sign-off', detail: 'Confirm the workflow is ready' },
    ],
    outcome: 'Confidence before rollout',
  },
  {
    title: 'Go live',
    description: 'Roll out and expand based on agreed scope.',
    steps: [
      { icon: ListChecks, title: 'Rollout checklist', detail: 'Confirm access and team readiness' },
      { icon: Rocket, title: 'Launch the workflow', detail: 'Start with your agreed use case', emphasis: true },
      { icon: CircleCheck, title: 'Review and expand', detail: 'Build on what works for your team' },
    ],
    outcome: 'A focused path forward',
  },
];

export function FinanceGetStarted() {
  return <section id="get-started" className={`${base.section} ${s.section}`} aria-labelledby="finance-get-started-title">
    <div className="site-shell">
      <div className={s.heading}>
        <div>
          <p className={`${base.eyebrow} ${s.eyebrow}`}>GET STARTED</p>
          <h2 id="finance-get-started-title">Start with a focused<br />finance use case.</h2>
          <p className={s.intro}>Discovery, workflow mapping, configuration, validation and rollout based on your systems and business needs.</p>
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
