import React from 'react';
import { CircleAlert } from 'lucide-react';

export const FinanceDeskVisual: React.FC = () => {
  const bills = [
    ['INV-2018', 'Alpha Components', 'Posted to Tally'],
    ['BILL-3081', 'Shivraj Traders', 'Posted to Tally'],
    ['INV-0021', 'Prime Components', 'Duplicate hold'],
    ['BILL-2082', 'Jaxon Industrial', 'Posted to Tally'],
  ];

  return (
    <div className="dashboard-card">
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-700">
          <span className="brand-mark h-4 w-4 rounded text-[8px]">D</span>
          Docsynecx <span className="font-normal text-slate-400">/ Finance desk</span>
        </div>
        <span className="flex items-center gap-1 text-[9px] font-semibold text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Tally connected
        </span>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-950">Vendor bills</h3>
            <p className="mt-1 text-[10px] text-slate-400">From inbox to books. 24-hour auto-syncing.</p>
          </div>
          <span className="rounded border border-blue-100 bg-blue-50 px-2 py-1 text-[9px] font-bold text-blue-700">
            Demo workspace
          </span>
        </div>

        <div className="mt-5 flex gap-4 border-b border-slate-100 text-[10px] font-bold">
          <span className="border-b-2 border-blue-600 pb-2 text-blue-600">
            All bills <b className="ml-1 rounded-full bg-blue-50 px-1.5 py-0.5 text-[8px]">24</b>
          </span>
          <span className="pb-2 text-slate-400">
            Needs review <b className="ml-1 font-normal">1</b>
          </span>
          <span className="pb-2 text-slate-400">
            Posted <b className="ml-1 font-normal">23</b>
          </span>
        </div>

        <div className="mt-2 overflow-x-auto">
          <table className="w-full min-w-[420px] text-left text-[9px]">
            <thead>
              <tr className="border-b border-slate-100 uppercase tracking-wider text-slate-400">
                <th className="py-2 font-bold">Bill no</th>
                <th className="font-bold">Vendor</th>
                <th className="font-bold">GST check</th>
                <th className="text-right font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {bills.map(([billNo, vendor, status]) => (
                <tr key={billNo} className="border-b border-slate-50">
                  <td className="py-2 font-mono font-bold text-slate-700">{billNo}</td>
                  <td className="text-slate-600">{vendor}</td>
                  <td className="text-emerald-600">
                    <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Verified
                  </td>
                  <td className="text-right">
                    <span
                      className={`rounded border px-1.5 py-1 text-[8px] font-semibold ${
                        status === 'Duplicate hold'
                          ? 'border-amber-200 bg-amber-50 text-amber-700'
                          : 'border-emerald-200 bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex justify-between text-[9px] text-slate-400">
          <span>Sync active just now</span>
          <span className="font-bold text-blue-600">View activity →</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 bg-slate-950 px-4 py-2 text-[10px] font-semibold text-white">
        <CircleAlert size={12} className="text-amber-400" />
        Duplicate held; not paid twice
      </div>
    </div>
  );
};
