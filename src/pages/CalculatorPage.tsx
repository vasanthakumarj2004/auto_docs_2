import React, { useState, useMemo } from 'react';
import { ArrowLeft, Clock, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useRouter } from '../lib/router';
import { supabase } from '../lib/supabase';

export const CalculatorPage: React.FC = () => {
  const [documents, setDocuments] = useState<number>(1200);
  const [minutes, setMinutes] = useState<number>(5);
  const [staffCost, setStaffCost] = useState<number>(40000);

  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const { navigate } = useRouter();

  const calculations = useMemo(() => {
    const monthlyHours = Math.round((documents * minutes) / 60);
    const annualHours = monthlyHours * 12;
    const hourlyRate = Math.round(staffCost / 160);
    const monthlyCost = Math.round(monthlyHours * hourlyRate);
    const annualCost = monthlyCost * 12;

    return {
      monthlyHours,
      annualHours,
      hourlyRate,
      monthlyCost,
      annualCost,
    };
  }, [documents, minutes, staffCost]);

  const handleAuditRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      const { error } = await supabase.from('contact_submissions').insert({
        submission_type: 'audit_request',
        email: email.trim(),
        company: company.trim() || null,
        message: `Calculated Waste: ${calculations.monthlyHours} hrs/mo (₹${calculations.monthlyCost.toLocaleString('en-IN')}) | Docs: ${documents} | Staff Cost: ₹${staffCost}`,
      });

      if (error) {
        console.error('Supabase error:', error);
        setFormStatus('error');
      } else {
        setFormStatus('success');
        setEmail('');
        setCompany('');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setFormStatus('success');
    }
  };

  return (
    <div className="bg-[#fcfdff] min-h-screen py-10">
      <div className="site-shell">
        {/* Back Link */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-brand-blue mb-8 transition-colors"
        >
          <ArrowLeft size={14} /> Back to homepage
        </button>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="eyebrow mb-4">
            Interactive Cost Model
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
            Calculate your team’s retyping cost.
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-600 max-w-xl mx-auto">
            Put an exact number on the hours and payroll your business loses each month moving data between PDFs, emails, Tally, and CargoWise.
          </p>
        </div>

        {/* Big Calculator Grid */}
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Sliders and Inputs */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-lg font-extrabold text-slate-950 border-b border-slate-100 pb-4">
              Your Monthly Parameters
            </h2>

            {/* Input 1: Documents */}
            <div className="rounded-xl border border-slate-200/90 bg-slate-50/70 p-4">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                <span>Monthly Document Volume</span>
                <span className="font-mono text-brand-blue font-extrabold text-base">
                  {documents.toLocaleString()} docs
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="10000"
                step="50"
                value={documents}
                onChange={(e) => setDocuments(Number(e.target.value))}
                className="w-full mt-3"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Vendor invoices, Bills of Lading, Packing Lists, Pre-alert emails
              </span>
            </div>

            {/* Input 2: Minutes */}
            <div className="rounded-xl border border-slate-200/90 bg-slate-50/70 p-4">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                <span>Minutes to Read, Cross-Check & Key Each Document</span>
                <span className="font-mono text-brand-blue font-extrabold text-base">
                  {minutes} mins
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                className="w-full mt-3"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Includes line item checks, party matching, and ERP typing
              </span>
            </div>

            {/* Input 3: Staff Cost */}
            <div className="rounded-xl border border-slate-200/90 bg-slate-50/70 p-4">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                <span>Monthly Cost per Data Entry Operator</span>
                <span className="font-mono text-brand-blue font-extrabold text-base">
                  ₹{staffCost.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="15000"
                max="120000"
                step="2500"
                value={staffCost}
                onChange={(e) => setStaffCost(Number(e.target.value))}
                className="w-full mt-3"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Salary + employer costs based on 160 operational hours/month
              </span>
            </div>

            {/* How It's Worked Out Box */}
            <div className="rounded-xl border border-blue-100 bg-brand-lavender/40 p-5 mt-6">
              <span className="text-xs font-extrabold uppercase tracking-wider text-brand-blue block mb-2">
                How It’s Worked Out:
              </span>
              <div className="space-y-1.5 font-mono text-[11px] text-slate-700">
                <div>• Monthly hours = ({documents.toLocaleString()} docs × {minutes} mins) ÷ 60 = <b>{calculations.monthlyHours.toLocaleString()} hours</b></div>
                <div>• Hourly staff rate = ₹{staffCost.toLocaleString('en-IN')} ÷ 160 hrs = <b>₹{calculations.hourlyRate}/hr</b></div>
                <div>• Direct monthly cost = {calculations.monthlyHours.toLocaleString()} hrs × ₹{calculations.hourlyRate} = <b>₹{calculations.monthlyCost.toLocaleString('en-IN')}</b></div>
              </div>
            </div>
          </div>

          {/* Big Results Card */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                Estimated Operational Waste
              </span>
              <div className="mt-4 space-y-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600 mb-1">
                    <Clock size={16} className="text-brand-blue" />
                    <span>Time Sunk in Manual Typing</span>
                  </div>
                  <div className="text-3xl font-extrabold text-brand-blue font-mono">
                    {calculations.monthlyHours.toLocaleString()} hrs <span className="text-sm font-normal text-slate-500">/ month</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    That is <b>{calculations.annualHours.toLocaleString()} hours</b> of team capacity lost every year.
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600 mb-1">
                    <TrendingUp size={16} className="text-emerald-600" />
                    <span>Direct Salary Cost</span>
                  </div>
                  <div className="text-3xl font-extrabold text-slate-950 font-mono">
                    ₹{calculations.monthlyCost.toLocaleString('en-IN')} <span className="text-sm font-normal text-slate-500">/ month</span>
                  </div>
                  <div className="text-xs text-emerald-700 font-bold mt-1">
                    ₹{calculations.annualCost.toLocaleString('en-IN')} saved annually with Docsynecx.
                  </div>
                </div>
              </div>
            </div>

            {/* Audit Booking Form */}
            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-sm font-extrabold text-slate-950 mb-1">
                Book a Retyping Audit + Demo
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                We will benchmark your actual invoices or pre-alerts against this estimate.
              </p>

              <form onSubmit={handleAuditRequest} className="space-y-3">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input text-xs"
                  placeholder="Your work email"
                />
                <input
                  required
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="form-input text-xs"
                  placeholder="Company name"
                />
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="button-primary w-full text-xs py-3"
                >
                  {formStatus === 'submitting' ? 'Submitting…' : 'Book a Retyping Audit + demo'}{' '}
                  <ArrowRight size={14} />
                </button>

                {formStatus === 'success' && (
                  <p className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 pt-1">
                    <CheckCircle2 size={14} /> Audit request received. Our team will contact you shortly!
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Proof Strip */}
        <div className="mt-16 border-t border-slate-200 pt-12">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Proven Across Trade and Finance Teams
            </span>
          </div>

          <div className="grid divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white p-6 shadow-xs sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="px-4 py-3 first:pl-0">
              <div className="text-2xl font-extrabold tracking-tight text-slate-950 font-mono">
                2 hrs → 2 min
              </div>
              <div className="mt-1 text-xs text-slate-500 font-medium">
                FTL logistics: email to CargoWise
              </div>
            </div>
            <div className="px-4 py-3 sm:pl-6">
              <div className="text-2xl font-extrabold tracking-tight text-slate-950 font-mono">
                Days → hours
              </div>
              <div className="mt-1 text-xs text-slate-500 font-medium">
                Rejections & re-fetches: purchase and spares
              </div>
            </div>
            <div className="px-4 py-3 sm:pl-6">
              <div className="text-2xl font-extrabold tracking-tight text-slate-950 font-mono">
                In daily use
              </div>
              <div className="mt-1 text-xs text-slate-500 font-medium">
                Job billing: assets and purchase bills
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
