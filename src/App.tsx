import React from 'react';
import { useRouter } from './lib/router';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { TheProblem } from './components/TheProblem';
import { HowItWorks } from './components/HowItWorks';
import { FeatureSection } from './components/FeatureSection';
import { BillReviewVisual } from './components/BillReviewVisual';
import { ShipmentVisual } from './components/ShipmentVisual';
import { CalculatorBar } from './components/CalculatorBar';
import { WhyDocsynecx } from './components/WhyDocsynecx';
import { FaqSection } from './components/FaqSection';
import { DemoCta } from './components/DemoCta';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { CalculatorPage } from './pages/CalculatorPage';
import { FinancePage } from './pages/FinancePage';
import { LogisticsPage } from './pages/LogisticsPage';

const financeSteps: [string, string, string][] = [
  ['01', 'Read and GST-check every bill', 'Capture line items and validate GST details before posting.'],
  ['02', 'Approve, pay, post to Tally', 'Move approved bills forward without entering the data again.'],
  ['03', 'Hold duplicates, never pay twice', 'Flag a repeated bill before it reaches your payment queue.'],
];

const logisticsSteps: [string, string, string][] = [
  ['01', 'Emails become jobs', 'Turn booking instructions into structured CargoWise entries.'],
  ['02', 'BL, packing list, invoice cross-checked', 'Spot mismatches across shipment documents before they travel.'],
  ['03', 'Customs entry and freight AP checks', 'Keep exceptions visible from customs through freight payables.'],
];

export const App: React.FC = () => {
  const { currentPath } = useRouter();

  // If on /logistics or /logistics-trade route, render LogisticsPage
  if (currentPath === '/logistics' || currentPath === '/logistics-trade') {
    return (
      <div className="min-h-screen max-w-full overflow-x-clip lg:overflow-visible bg-white text-slate-800">
        <Header />
        <LogisticsPage />
        <Footer />
      </div>
    );
  }

  // If on /finance or /accounts-payable route, render FinancePage
  if (currentPath === '/finance' || currentPath === '/accounts-payable') {
    return (
      <div className="min-h-screen max-w-full overflow-x-clip lg:overflow-visible bg-white text-slate-800">
        <Header />
        <FinancePage />
        <Footer />
      </div>
    );
  }

  // If on /calculator route, render CalculatorPage with shared Header and Footer
  if (currentPath === '/calculator') {
    return (
      <div className="min-h-screen max-w-full overflow-x-clip lg:overflow-visible bg-white text-slate-800">
        <Header />
        <CalculatorPage />
        <Footer />
      </div>
    );
  }

  // Placeholder routes
  if (currentPath === '/free-trial') {
    return (
      <div className="min-h-screen max-w-full overflow-x-clip lg:overflow-visible bg-white text-slate-800">
        <Header />
        <div className="py-24 text-center site-shell">
          <span className="font-mono text-xs uppercase tracking-wider text-brand-blue font-bold">Early Access</span>
          <h1 className="mt-3 text-3xl font-extrabold text-slate-950 sm:text-4xl">Free Trial Registration</h1>
          <p className="mt-3 text-sm text-slate-600 max-w-md mx-auto">
            Free trial registrations are being onboarded in batches alongside our banking partner rollout.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button onClick={() => window.location.href = '/#demo'} className="button-primary cursor-pointer">Book a demo for instant access</button>
            <button onClick={() => window.location.href = '/finance'} className="button-secondary cursor-pointer">Back to Finance</button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (currentPath === '/customers/rajadurai') {
    return (
      <div className="min-h-screen max-w-full overflow-x-clip lg:overflow-visible bg-white text-slate-800">
        <Header />
        <div className="py-24 text-center site-shell">
          <span className="font-mono text-xs uppercase tracking-wider text-emerald-700 font-bold">Customer Case Study</span>
          <h1 className="mt-3 text-3xl font-extrabold text-slate-950 sm:text-4xl">Rajadurai E-Vehicles</h1>
          <p className="mt-3 text-sm text-slate-600 max-w-lg mx-auto">
            Case study: How Rajadurai E-Vehicles condensed purchase, spares and service ledger entries from days to hours with Docsynecx.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button onClick={() => window.location.href = '/#demo'} className="button-primary cursor-pointer">Book a walkthrough</button>
            <button onClick={() => window.location.href = '/finance'} className="button-secondary cursor-pointer">Back to Finance</button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (currentPath === '/customers/ft-logistics') {
    return (
      <div className="min-h-screen max-w-full overflow-x-clip lg:overflow-visible bg-white text-slate-800">
        <Header />
        <div className="py-24 text-center site-shell">
          <span className="font-mono text-xs uppercase tracking-wider text-teal-700 font-bold">Customer Case Study</span>
          <h1 className="mt-3 text-3xl font-extrabold text-slate-950 sm:text-4xl">FT Logistics</h1>
          <p className="mt-3 text-sm text-slate-600 max-w-lg mx-auto">
            How FT Logistics slashed shipment email-to-CargoWise job posting time from 2 hours to 2 minutes with Docsynecx.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button onClick={() => window.location.href = '/#demo'} className="button-teal cursor-pointer">Book a demo</button>
            <button onClick={() => window.location.href = '/logistics'} className="button-secondary cursor-pointer">Back to Logistics</button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Otherwise render Homepage with exact 11 sections in order
  return (
    <div className="min-h-screen max-w-full overflow-x-clip lg:overflow-visible bg-white text-slate-800">
      {/* 1. Sticky navbar */}
      <Header />

      <main id="top">
        {/* 2. Hero (two columns): tag, headline, subtext, buttons; flow card and video slot */}
        <Hero />

        {/* 3. Proof stat row and logo slot from the image */}
        <Stats />

        {/* 4. The problem: 3 short cards */}
        <TheProblem />

        {/* 5. How it works: 5-step stepper */}
        <HowItWorks />

        {/* 6. Finance desk and Shipment desk cards from the image */}
        <FeatureSection
          id="finance"
          label="FINANCE DESK"
          title="Every bill read, checked and posted."
          copy="From a vendor PDF to your books, keep every check in one flow. Your finance team stays in control of approvals and exceptions."
          steps={financeSteps}
          visual={<BillReviewVisual />}
        />
        <FeatureSection
          id="logistics"
          label="SHIPMENT DESK"
          title="Customer emails become CargoWise jobs."
          copy="Give your operations team a job to review, not an inbox to retype. Shipment details move together, with checks built in."
          steps={logisticsSteps}
          visual={<ShipmentVisual />}
          reverse={true}
        />

        {/* 7. Dark navy calculator bar linking to /calculator */}
        <CalculatorBar />

        {/* 8. Why Docsynecx: 2 feature cards */}
        <WhyDocsynecx />

        {/* 9. FAQ accordion */}
        <FaqSection />

        {/* 10. Final CTA band */}
        <DemoCta />
        <Newsletter />
      </main>

      {/* 11. Multi-column footer */}
      <Footer />
    </div>
  );
};

export default App;
