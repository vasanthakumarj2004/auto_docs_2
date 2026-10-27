'use client';
import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const { error } = await supabase.from('contact_submissions').insert({
        submission_type: 'newsletter',
        email: email.trim(),
      });

      if (error) {
        console.error('Supabase newsletter error:', error);
        setStatus('error');
      } else {
        setStatus('success');
        setEmail('');
      }
    } catch (err) {
      console.error('Newsletter exception:', err);
      setStatus('success');
      setEmail('');
    }
  };

  return (
    <section id="newsletter" className="border-b border-slate-200 bg-white py-8 scroll-mt-16">
      <div className="site-shell flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h3 className="text-sm font-extrabold text-slate-950">Get product updates and trade news.</h3>
          <p className="mt-1 text-xs text-slate-500">Useful notes for finance and logistics teams. No noise.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
          <div className="relative flex-1">
            <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              suppressHydrationWarning
              className="form-input pl-9"
              placeholder="Your work email"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'submitting'}
            suppressHydrationWarning
            className="button-primary whitespace-nowrap disabled:opacity-60"
          >
            {status === 'success' ? 'Subscribed' : status === 'submitting' ? 'Sending…' : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  );
};
