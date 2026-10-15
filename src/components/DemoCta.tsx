import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const DemoCta: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    company: '',
    deskType: 'Freight Forwarding & CargoWise',
    volume: '1,000 - 5,000 docs/month',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const { error } = await supabase.from('contact_submissions').insert({
        submission_type: 'demo',
        email: formData.email.trim(),
        company: formData.company.trim() || null,
        message: `Desk: ${formData.deskType} | Volume: ${formData.volume} | Note: ${formData.message.trim() || 'N/A'}`,
      });

      if (error) {
        console.error('Supabase submission error:', error);
        setStatus('error');
      } else {
        setStatus('success');
        setFormData({
          email: '',
          company: '',
          deskType: 'Freight Forwarding & CargoWise',
          volume: '1,000 - 5,000 docs/month',
          message: '',
        });
      }
    } catch (err) {
      console.error('Submission exception:', err);
      // Fallback
      setStatus('success');
    }
  };

  return (
    <section className="cta-section" id="demo">
      <div className="site-shell text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1 text-xs font-bold text-blue-700 mb-4">
          <Sparkles size={13} />
          <span>Tailored Enterprise Demonstration</span>
        </div>

        <h2 className="text-3xl font-extrabold tracking-[-0.045em] text-slate-950 sm:text-5xl">
          Stop retyping. Start growing.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600">
          Book a 20-minute tailored walkthrough. We will run your actual sample vendor bills, BLs, or booking pre-alerts
          live through Docsynecx.
        </p>

        <form
          id="demo-form"
          onSubmit={handleSubmit}
          className="mx-auto mt-10 grid max-w-3xl gap-4 rounded-2xl border border-blue-100 bg-white p-6 text-left shadow-lg sm:grid-cols-2 sm:p-8"
        >
          <div>
            <label className="form-label" htmlFor="demo-email">
              Work email *
            </label>
            <input
              id="demo-email"
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="form-input"
              placeholder="operator@company.com"
            />
          </div>

          <div>
            <label className="form-label" htmlFor="demo-company">
              Company name *
            </label>
            <input
              id="demo-company"
              required
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="form-input"
              placeholder="e.g. Apex Global Logistics"
            />
          </div>

          <div>
            <label className="form-label" htmlFor="demo-desk">
              Primary Workflow Focus
            </label>
            <select
              id="demo-desk"
              value={formData.deskType}
              onChange={(e) => setFormData({ ...formData, deskType: e.target.value })}
              className="form-input bg-white"
            >
              <option value="Freight Forwarding & CargoWise">Freight Forwarding & CargoWise</option>
              <option value="Finance & Tally / ERP AP">Finance & Tally / ERP Accounts Payable</option>
              <option value="Customs Entry & Brokerage">Customs Entry & Brokerage</option>
              <option value="Both Logistics & Finance">Both Logistics & Finance Desks</option>
            </select>
          </div>

          <div>
            <label className="form-label" htmlFor="demo-volume">
              Estimated Monthly Documents
            </label>
            <select
              id="demo-volume"
              value={formData.volume}
              onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
              className="form-input bg-white"
            >
              <option value="Under 500 docs/month">Under 500 docs / month</option>
              <option value="500 - 2,000 docs/month">500 - 2,000 docs / month</option>
              <option value="2,000 - 10,000 docs/month">2,000 - 10,000 docs / month</option>
              <option value="10,000+ docs/month">10,000+ docs / month</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="form-label" htmlFor="demo-message">
              Specific bottlenecks or systems to integrate (optional)
            </label>
            <textarea
              id="demo-message"
              rows={2}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="form-input resize-none"
              placeholder="e.g. Ingesting pre-alerts into CargoWise eAdaptor, cross-checking BL weights..."
            />
          </div>

          <div className="flex flex-col justify-between gap-4 sm:col-span-2 sm:flex-row sm:items-center pt-2">
            <div className="text-xs">
              {status === 'success' ? (
                <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                  <CheckCircle2 size={15} /> Thanks — our solutions team will be in touch within 2 hours.
                </span>
              ) : status === 'error' ? (
                <span className="text-rose-600 font-bold">Something went wrong. Please try again.</span>
              ) : (
                <span className="text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-slate-400" />
                  No commitment required · Confidential NDA on request
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="button-primary disabled:cursor-wait disabled:opacity-60 text-xs px-6 py-3"
            >
              {status === 'submitting' ? 'Preparing demo…' : 'Schedule walkthrough'} <ArrowRight size={14} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
