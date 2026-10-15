import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { FeatureSection } from './components/FeatureSection';
import { BillReviewVisual } from './components/BillReviewVisual';
import { ShipmentVisual } from './components/ShipmentVisual';
import { Calculator } from './components/Calculator';
import { Customers } from './components/Customers';
import { DemoCta } from './components/DemoCta';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';

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
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fcfdff] text-slate-800">
      <Header />
      <main id="top">
        <Hero />
        <Stats />
        <FeatureSection
          id="finance"
          label="Finance desk"
          title="Every bill read, checked and posted."
          copy="From a vendor PDF to your books, keep every check in one flow. Your finance team stays in control of approvals and exceptions."
          steps={financeSteps}
          visual={<BillReviewVisual />}
        />
        <FeatureSection
          id="logistics"
          label="Shipment desk"
          title="Customer emails become CargoWise jobs."
          copy="Give your operations team a job to review, not an inbox to retype. Shipment details move together, with checks built in."
          steps={logisticsSteps}
          visual={<ShipmentVisual />}
          reverse={true}
        />
        <Calculator />
        <Customers />
        <DemoCta />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default App;
