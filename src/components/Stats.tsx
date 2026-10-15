import React from 'react';

interface StatProps {
  value: string;
  label: string;
}

const StatItem: React.FC<StatProps> = ({ value, label }) => {
  return (
    <div className="px-0 py-4 first:pl-0 md:px-6 md:py-3">
      <div className="text-xl font-extrabold tracking-[-0.04em] text-slate-950">{value}</div>
      <div className="mt-1 text-[10px] text-slate-500">{label}</div>
    </div>
  );
};

export const Stats: React.FC = () => {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="site-shell grid divide-y divide-slate-200 py-3 md:grid-cols-3 md:divide-x md:divide-y-0">
        <StatItem value="2 hrs → 2 min" label="FTL logistics: email to CargoWise" />
        <StatItem value="Days → hours" label="Rejections & re-fetches: purchase and spares" />
        <StatItem value="In daily use" label="Job billing: assets and purchase bills" />
      </div>
    </section>
  );
};
