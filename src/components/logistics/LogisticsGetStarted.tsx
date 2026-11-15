import { ArrowRight, Check, CircleCheck, ClipboardList, FileCheck2, FileText, Layers, ListChecks, Mail, Navigation, PackageCheck, Plug, Rocket, Settings2, ShieldCheck, Ship, SlidersHorizontal, Users, type LucideIcon } from 'lucide-react';
import base from '../LandingPage.module.css';
import s from './LogisticsGetStarted.module.css';

type WorkflowStep = { icon: LucideIcon; title: string; detail: string; emphasis?: boolean };
const stages: { title: string; description: string; steps: WorkflowStep[]; outcome: string }[] = [
  {
    title: 'Discover',
    description: 'Understand customer enquiry volumes, trade lanes and forwarding systems.',
    steps: [
      { icon: Mail, title: 'Enquiry channels', detail: 'Email inboxes, customer portals & RFQs' },
      { icon: Users, title: 'Forwarding desk roles', detail: 'Pricing, operations & customer service' },
      { icon: ClipboardList, title: 'Agree use cases', detail: 'Prioritize ocean, air or road workflows', emphasis: true },
    ],
    outcome: 'A focused starting point',
  },
  {
    title: 'Configure',
    description: 'Map trade lane workflows, rate cards and CargoWise integrations.',
    steps: [
      { icon: Layers, title: 'Trade lane mapping', detail: 'Origins, destinations & container types' },
      { icon: Plug, title: 'System connections', detail: 'CargoWise, custom ERPs & rate tools', emphasis: true },
      { icon: SlidersHorizontal, title: 'Margin rules', detail: 'Customer markups & approval limits' },
    ],
    outcome: 'A workflow tailored to your desk',
  },
  {
    title: 'Validate',
    description: 'Test with live customer enquiries and actual shipping documents.',
    steps: [
      { icon: FileText, title: 'Sample RFQs & B/Ls', detail: 'Test with everyday trade documents' },
      { icon: FileCheck2, title: 'Quote & job checks', detail: 'Validate rates, transit times & VGM', emphasis: true },
      { icon: ShieldCheck, title: 'Operator sign-off', detail: 'Confirm the workflow is production ready' },
    ],
    outcome: 'Confidence before customer rollout',
  },
  {
    title: 'Go live',
    description: 'Roll out and expand across branches and forwarding desks.',
    steps: [
      { icon: ListChecks, title: 'Desk readiness', detail: 'User permissions & team onboarding' },
      { icon: Rocket, title: 'Launch the workflow', detail: 'Start with Email-to-Booking or Ops', emphasis: true },
      { icon: CircleCheck, title: 'Continuous scale', detail: 'Add tracking & margin analytics' },
    ],
    outcome: 'Immediate operational acceleration',
  },
];

export function LogisticsGetStarted() {
  return (
    <section id="get-started" className={`${base.section} ${s.section}`} aria-labelledby="logistics-get-started-title">
      <div className="site-shell">
        <div className={s.heading}>
          <div>
            <p className={`${base.eyebrow} ${s.eyebrow}`}>FLEXIBLE ADOPTION</p>
            <h2 id="logistics-get-started-title">
              Start with the workflow<br /><span>you need.</span>
            </h2>
            <p className={s.intro}>
              Choose the modules that fit your forwarding operations today. Implementation scope and integrations are tailored to your trade lanes, systems and team processes.
            </p>
          </div>
          <div className={s.overview} aria-hidden="true">
            {[ClipboardList, Settings2, ShieldCheck, Rocket].map((Icon, index) => (
              <div key={index}>
                <span><Icon size={22} strokeWidth={1.5} /></span>
                {index < 3 && <i />}
              </div>
            ))}
          </div>
        </div>
        <ol className={s.cards}>
          {stages.map(({ title, description, steps, outcome }, index) => (
            <li className={s.card} key={title}>
              <div className={s.cardHeading}>
                <span className={s.number}>0{index + 1}</span>
                <h3>{title}</h3>
                {index < 3 && <ArrowRight size={15} aria-hidden="true" />}
              </div>
              <p className={s.description}>{description}</p>
              <ol className={s.workflow} aria-label={`${title} steps`}>
                {steps.map(({ icon: Icon, title: stepTitle, detail, emphasis }) => (
                  <li key={stepTitle} className={s.workflowStep} data-emphasis={emphasis || undefined}>
                    <span className={s.icon}><Icon size={15} strokeWidth={1.7} aria-hidden="true" /></span>
                    <div>
                      <strong>{stepTitle}</strong>
                      <span>{detail}</span>
                    </div>
                  </li>
                ))}
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
