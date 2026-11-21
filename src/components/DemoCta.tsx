'use client';
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useRouter } from '../lib/router';
import { useScrollReveal } from '../hooks/useScrollReveal';
import s from './DemoCta.module.css';

export interface DemoCtaProps {
  intent?: 'demo' | 'accounts-payable';
  hideHeader?: boolean;
}

export const DemoCta: React.FC<DemoCtaProps> = ({
  intent = 'demo',
  hideHeader = false,
}) => {
  const interest = intent === 'accounts-payable';
  const [formData, setFormData] = useState({
    email: '',
    company: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<'email' | 'company' | 'message', string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const { navigate } = useRouter();
  const { ref: sectionRef } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  const handleChange = (field: 'email' | 'company' | 'message', value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: Partial<Record<'email' | 'company' | 'message', string>> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid work email address';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please tell us what you would like to improve';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');

    try {
      const { error } = await supabase.from('contact_submissions').insert({
        submission_type: 'demo',
        email: formData.email.trim(),
        company: formData.company.trim(),
        message: interest
          ? `[Accounts Payable interest — upcoming capability] ${formData.message.trim()}`
          : formData.message.trim(),
      });

      if (error) {
        console.error('Supabase submission error:', error);
        setStatus('error');
      } else {
        setStatus('success');
        setFormData({ email: '', company: '', message: '' });
        setErrors({});
      }
    } catch (err) {
      console.error('Submission exception:', err);
      setStatus('error');
    }
  };

  const formCardContent = (
    <div className={`${s.formCard} relative mx-auto max-w-3xl text-left`}>
      <form
        id={interest ? 'interest-form' : 'demo-form'}
        onSubmit={handleSubmit}
        noValidate
        className={s.form}
      >
        <div className={s.rowTwoCol}>
          <div className={s.fieldGroup}>
            <label htmlFor="demo-email" className={s.label}>
              Work email <span className={s.requiredStar}>*</span>
            </label>
            <input
              id="demo-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="you@company.com"
              className={`${s.input} ${errors.email ? s.inputError : ''}`}
              aria-required="true"
              aria-invalid={!!errors.email}
            />
            {errors.email && <span className={s.errorMessage}>{errors.email}</span>}
          </div>

          <div className={s.fieldGroup}>
            <label htmlFor="demo-company" className={s.label}>
              Company <span className={s.requiredStar}>*</span>
            </label>
            <input
              id="demo-company"
              type="text"
              required
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              placeholder="Your company"
              className={`${s.input} ${errors.company ? s.inputError : ''}`}
              aria-required="true"
              aria-invalid={!!errors.company}
            />
            {errors.company && <span className={s.errorMessage}>{errors.company}</span>}
          </div>
        </div>

        <div className={s.fieldGroup}>
          <label htmlFor="demo-message" className={s.label}>
            What would you like to improve? <span className={s.requiredStar}>*</span>
          </label>
          <textarea
            id="demo-message"
            required
            rows={3}
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            placeholder={
              interest
                ? 'Supplier invoice volumes, approval process and accounting system'
                : 'Bills, shipment emails, or both?'
            }
            className={`${s.textarea} ${errors.message ? s.inputError : ''}`}
            aria-required="true"
            aria-invalid={!!errors.message}
          />
          {errors.message && <span className={s.errorMessage}>{errors.message}</span>}
        </div>

        <div className={s.bottomRow}>
          <div>
            {status === 'success' && (
              <p role="status" aria-live="polite" className={`${s.statusMsg} ${s.statusSuccess}`}>
                Thanks — we’ll be in touch shortly.
              </p>
            )}
            {status === 'error' && (
              <p role="status" aria-live="polite" className={`${s.statusMsg} ${s.statusError}`}>
                Something went wrong. Please try again.
              </p>
            )}
            {status === 'idle' && (
              <p role="status" aria-live="polite" className={s.statusMsg}>
                No pressure, just a useful conversation.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className={s.submitBtn}
          >
            <span>
              {status === 'submitting'
                ? 'Sending…'
                : interest
                ? 'Register interest'
                : 'Request a demo'}
            </span>
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );

  if (hideHeader) {
    return formCardContent;
  }

  return (
    <section
      ref={sectionRef}
      className="cta-section relative overflow-hidden bg-[#fafafa]"
      id={interest ? 'interest-form-section' : 'demo'}
    >
      <div className="site-shell relative z-10 text-center">
        <h2 className="text-3xl font-extrabold tracking-[-0.045em] text-slate-950 sm:text-5xl">
          {interest ? 'Register your interest.' : 'Stop retyping. Start growing.'}
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-slate-600">
          {interest
            ? 'Tell us what your payables team needs. Accounts Payable is in progress and is not available yet.'
            : 'A cleaner finance desk. A faster shipment desk. More room for what’s next.'}
        </p>  

        {!interest && (
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="#demo-form"
              className="button-primary inline-flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
            >
              <span>Book a demo</span>
              <ArrowRight size={15} aria-hidden="true" />
            </a>
            <button
              onClick={() => navigate('/calculator')}
              suppressHydrationWarning
              className="button-secondary transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0"
            >
              Try the free calculator
            </button>
          </div>
        )}

        <div className="mt-10">{formCardContent}</div>
      </div>
    </section>
  );
};
