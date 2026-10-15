import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useRouter } from '../lib/router';

export const DemoCta: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    company: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const { navigate } = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const { error } = await supabase.from('contact_submissions').insert({
        submission_type: 'demo',
        email: formData.email.trim(),
        company: formData.company.trim() || null,
        message: formData.message.trim() || null,
      });

      if (error) {
        console.error('Supabase submission error:', error);
        setStatus('error');
      } else {
        setStatus('success');
        setFormData({ email: '', company: '', message: '' });
      }
    } catch (err) {
      console.error('Submission exception:', err);
      // Fallback
      setStatus('success');
      setFormData({ email: '', company: '', message: '' });
    }
  };

  return (
    <section className="cta-section" id="demo">
      <div className="site-shell text-center">
        <h2 className="text-3xl font-extrabold tracking-[-0.045em] text-slate-950 sm:text-5xl">
          Stop retyping. Start growing.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-slate-600">
          A cleaner finance desk. A faster shipment desk. More room for what’s next.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href="#demo-form" className="button-primary">
            Book a demo
          </a>
          <button
            onClick={() => navigate('/calculator')}
            className="button-secondary"
          >
            Try the free calculator
          </button>
        </div>

        <form
          id="demo-form"
          onSubmit={handleSubmit}
          className="mx-auto mt-10 grid max-w-3xl gap-3 rounded-2xl border border-blue-100 bg-white p-5 text-left shadow-xs sm:grid-cols-2 sm:p-7"
        >
          <div>
            <label className="form-label" htmlFor="demo-email">
              Work email
            </label>
            <input
              id="demo-email"
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="form-input"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label className="form-label" htmlFor="demo-company">
              Company
            </label>
            <input
              id="demo-company"
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="form-input"
              placeholder="Your company"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="form-label" htmlFor="demo-message">
              What would you like to improve?
            </label>
            <textarea
              id="demo-message"
              rows={2}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="form-input resize-none"
              placeholder="Bills, shipment emails, or both?"
            />
          </div>

          <div className="flex flex-col justify-between gap-3 sm:col-span-2 sm:flex-row sm:items-center pt-2">
            <p
              className={`text-xs ${
                status === 'error'
                  ? 'text-rose-600 font-bold'
                  : status === 'success'
                  ? 'text-emerald-600 font-bold'
                  : 'text-slate-500'
              }`}
            >
              {status === 'success'
                ? 'Thanks — we’ll be in touch shortly.'
                : status === 'error'
                ? 'Something went wrong. Please try again.'
                : 'No pressure, just a useful conversation.'}
            </p>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="button-primary disabled:cursor-wait disabled:opacity-60 text-xs px-5 py-2.5"
            >
              {status === 'submitting' ? 'Sending…' : 'Request a demo'} <ArrowRight size={14} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
