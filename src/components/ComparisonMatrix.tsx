import React from 'react';
import { Scale, Check, X, Sparkles } from 'lucide-react';
import { comparisonTable } from '../data/featuresData';

export const ComparisonMatrix: React.FC = () => {
  return (
    <section id="comparison" className="border-b border-slate-200 bg-white py-16 sm:py-24">
      <div className="site-shell">
        <div className="mx-auto max-w-3xl text-center">
          <div className="eyebrow mb-4">
            <Scale size={13} className="text-blue-600" />
            <span>Market Benchmark</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-4xl">
            Why forwarders and finance teams choose Docsynecx.
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Generic OCR breaks when layouts shift. Legacy RPA breaks when software updates. Docsynecx is purpose-built
            with domain reasoning for international trade and financial workflows.
          </p>
        </div>

        {/* Responsive Comparison Table */}
        <div className="mt-12 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[700px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-700">
                <th className="p-4 font-bold uppercase tracking-wider text-[10px] text-slate-400">Capability</th>
                <th className="p-4 font-extrabold text-blue-700 bg-blue-50/50 border-x border-blue-200/60">
                  <div className="flex items-center gap-1.5">
                    <Sparkles size={13} className="text-blue-600" />
                    <span>Docsynecx</span>
                  </div>
                </th>
                <th className="p-4 font-bold text-slate-600">Generic OCR</th>
                <th className="p-4 font-bold text-slate-600">Legacy RPA</th>
                <th className="p-4 font-bold text-slate-600">Manual Entry Desk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonTable.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-bold text-slate-900">{row.dimension}</td>
                  <td className="p-4 font-bold text-blue-900 bg-blue-50/30 border-x border-blue-100/70">
                    <div className="flex items-start gap-1.5">
                      <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{row.docsynecx}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-500">
                    <div className="flex items-start gap-1.5">
                      <X size={14} className="text-rose-400 shrink-0 mt-0.5" />
                      <span>{row.ocr}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-500">
                    <div className="flex items-start gap-1.5">
                      <X size={14} className="text-rose-400 shrink-0 mt-0.5" />
                      <span>{row.rpa}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-500">
                    <div className="flex items-start gap-1.5">
                      <X size={14} className="text-rose-400 shrink-0 mt-0.5" />
                      <span>{row.manual}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
