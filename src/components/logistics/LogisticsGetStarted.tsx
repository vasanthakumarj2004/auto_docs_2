import { ArrowRight, Check, CircleCheck, ClipboardList, FileCheck2, FileText, Layers, ListChecks, Mail, Navigation, PackageCheck, Plug, Rocket, Settings2, ShieldCheck, Ship, SlidersHorizontal, Users, type LucideIcon } from 'lucide-react';
import base from '../LandingPage.module.css';
import s from './LogisticsGetStarted.module.css';

type WorkflowStep = { icon: LucideIcon; title: string; detail: string; emphasis?: boolean };
const stages: { title: string; description: string; steps: WorkflowStep[]; outcome: string }[] = [
  {
    title: 'Discover',
    description: 'We look at your enquiry volumes, trade lanes and systems.',
    steps: [
      { icon: Mail, title: 'Enquiry channels', detail: 'Sales inboxes and RFQ emails' },
      { icon: Users, title: 'Who does what', detail: 'Pricing, operations and customer service' },
      { icon: ClipboardList, title: 'Where to start', detail: 'Ocean, air or road first', emphasis: true },
    ],
    outcome: 'We agree where to start',
  },
  {
    title: 'Configure',
    description: 'We set up your lanes, rate cards and CargoWise connection.',
    steps: [
      { icon: Layers, title: 'Your lanes', detail: 'Origins, destinations and container types' },
      { icon: Plug, title: 'Your systems', detail: 'CargoWise, your own ERP, rate tools', emphasis: true },
      { icon: SlidersHorizontal, title: 'Your margin rules', detail: 'Customer markups and approval limits' },
    ],
    outcome: 'Set up around your lanes and rate cards',
  },
  {
    title: 'Test',
    description: 'We run it on your real enquiries and shipping documents.',
    steps: [
      { icon: FileText, title: 'Real RFQs and B/Ls', detail: 'Your everyday documents' },
      { icon: FileCheck2, title: 'Quote and job checks', detail: 'Rates, transit times and VGM', emphasis: true },
      { icon: ShieldCheck, title: 'Your team signs off', detail: 'Before anything goes live' },
    ],
    outcome: 'Tested on your real enquiries first',
  },
  {
    title: 'Go live',
    description: 'Your desk starts using it, then you add branches and modules.',
    steps: [
      { icon: ListChecks, title: 'Team ready', detail: 'Logins, permissions and a walkthrough' },
      { icon: Rocket, title: 'Start quoting', detail: 'Email-to-Booking or Operations first', emphasis: true },
      { icon: CircleCheck, title: 'Grow when ready', detail: 'Add tracking, then more desks' },
    ],
    outcome: 'Your desk is quoting faster',
  },
];

export function LogisticsGetStarted() {
  return (
    <section id="setup" className={`${base.section} ${s.section}`} aria-labelledby="logistics-get-started-title">
      <div className="site-shell">
        <div className={s.heading}>
          <div>
            <p className={`${base.eyebrow} ${s.eyebrow}`}>LIVE IN ABOUT A WEEK</p>
            <h2 id="logistics-get-started-title">
              Up and running on your real enquiries<br /><span>in about a week.</span>
            </h2>
            <p className={s.intro}>
              We set it up around your lanes, your rate cards and your systems. You test it on real emails before any customer sees a quote.
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
