import type { Metadata } from 'next';
import { Header } from '@/src/components/Header';
import { DemoCta } from '@/src/components/DemoCta';
import { Footer } from '@/src/components/Footer';

export const metadata: Metadata = {
  title: 'Book a demo | AutoDocs',
  description: 'See how AutoDocs handles your finance and logistics document workflows.',
};

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Header />
      <main>
        <h1 className="sr-only">Book an AutoDocs demo</h1>
        <DemoCta />
      </main>
      <Footer />
    </div>
  );
}
