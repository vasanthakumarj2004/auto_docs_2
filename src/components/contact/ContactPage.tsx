'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  RefreshCw,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Sparkles,
  Clock,
  Building2,
} from 'lucide-react';
import { LandingNavigation } from '../LandingNavigation';
import { ShipsyFooter } from '../ShipsyFooter';
import { trackContactSubmit, trackGenerateLead } from '@/src/lib/marketing-analytics';
import s from './ContactPage.module.css';

export function ContactPage() {
  // Math Captcha State
  const [num1, setNum1] = useState(4);
  const [num2, setNum2] = useState(4);
  const [userCaptcha, setUserCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState('');

  // Form Field State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    description: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Generate random math captcha on mount
  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 8) + 1; // 1-8
    const b = Math.floor(Math.random() * 8) + 1; // 1-8
    setNum1(a);
    setNum2(b);
    setUserCaptcha('');
    setCaptchaError('');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Please enter your full name.';
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid work email address.';
    }
    if (!formData.phone.trim()) errors.phone = 'Please enter your contact phone number.';
    if (!formData.company.trim()) errors.company = 'Please enter your company or organization name.';
    if (!formData.description.trim()) errors.description = 'Please let us know how we can help you.';

    const expected = num1 + num2;
    if (!userCaptcha.trim()) {
      setCaptchaError('Please solve the captcha.');
      errors.captcha = 'Required';
    } else if (parseInt(userCaptcha.trim(), 10) !== expected) {
      setCaptchaError(`Incorrect answer. What is ${num1} + ${num2}?`);
      errors.captcha = 'Incorrect';
    } else {
      setCaptchaError('');
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Track contact submit attempt
    trackContactSubmit('contact_page');

    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Track generate_lead ONLY after confirmed 2xx server response
      trackGenerateLead({
        leadSource: 'contact_page',
        formName: 'contact_us',
      });
    }, 800);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      company: '',
      description: '',
    });
    setIsSubmitted(false);
    generateCaptcha();
  };

  const scrollToForm = () => {
    const el = document.getElementById('contact-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={s.pageWrapper}>
      <LandingNavigation />

      {/* Hero Header */}
      <section className={s.heroSection}>
        <div className={s.shell}>
          <div className={s.badge}>
            <Sparkles size={13} className={s.badgeIcon} />
            <span>GET IN TOUCH</span>
          </div>

          <h1 className={s.heroTitle}>Contact Us</h1>

          <p className={s.heroSubtitle}>
            We&rsquo;re here to help. Whether you have questions about our AI solutions, need a
            demo, or want to discuss your enterprise business needs.
          </p>

          <div className={s.heroActions}>
            <button type="button" onClick={scrollToForm} className={s.primaryBtn}>
              <span>Talk to Sales</span>
              <Send size={15} />
            </button>
            <Link href="/demo/" className={s.secondaryBtn}>
              <Calendar size={15} />
              <span>Book A Demo</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Grid: Form + Contact Info */}
      <section id="contact-form-section" className={s.mainSection}>
        <div className={s.shell}>
          <div className={s.contactGrid}>
            {/* Left Column: Form Card */}
            <div className={s.formCard}>
              {isSubmitted ? (
                <div className={s.successBox}>
                  <div className={s.successIconBox}>
                    <CheckCircle2 size={40} className={s.successIcon} />
                  </div>
                  <h2 className={s.successTitle}>Thank You!</h2>
                  <p className={s.successDesc}>
                    Your message has been received. Our team will review your requirements and get
                    back to you at <strong>{formData.email}</strong> within 24 hours.
                  </p>
                  <button type="button" onClick={handleReset} className={s.resetBtn}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <div className={s.formHeader}>
                    <h2 className={s.formTitle}>Send us a Message</h2>
                    <p className={s.formSub}>
                      Fill out the form and we&rsquo;ll get back to you within 24 hours.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className={s.form} noValidate>
                    <div className={s.fieldGroup}>
                      <label htmlFor="fullName" className={s.label}>
                        Full Name <span className={s.required}>*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        className={`${s.input} ${formErrors.fullName ? s.inputError : ''}`}
                        required
                      />
                      {formErrors.fullName && (
                        <span className={s.errorText}>{formErrors.fullName}</span>
                      )}
                    </div>

                    <div className={s.inputRow}>
                      <div className={s.fieldGroup}>
                        <label htmlFor="email" className={s.label}>
                          Email Address <span className={s.required}>*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@company.com"
                          className={`${s.input} ${formErrors.email ? s.inputError : ''}`}
                          required
                        />
                        {formErrors.email && (
                          <span className={s.errorText}>{formErrors.email}</span>
                        )}
                      </div>

                      <div className={s.fieldGroup}>
                        <label htmlFor="phone" className={s.label}>
                          Phone Number <span className={s.required}>*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className={`${s.input} ${formErrors.phone ? s.inputError : ''}`}
                          required
                        />
                        {formErrors.phone && (
                          <span className={s.errorText}>{formErrors.phone}</span>
                        )}
                      </div>
                    </div>

                    <div className={s.fieldGroup}>
                      <label htmlFor="company" className={s.label}>
                        Company Name <span className={s.required}>*</span>
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company or business name"
                        className={`${s.input} ${formErrors.company ? s.inputError : ''}`}
                        required
                      />
                      {formErrors.company && (
                        <span className={s.errorText}>{formErrors.company}</span>
                      )}
                    </div>

                    <div className={s.fieldGroup}>
                      <label htmlFor="description" className={s.label}>
                        Your Message <span className={s.required}>*</span>
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Tell us about your document volume, current ERP, or automation goals..."
                        className={`${s.textarea} ${formErrors.description ? s.inputError : ''}`}
                        required
                      />
                      {formErrors.description && (
                        <span className={s.errorText}>{formErrors.description}</span>
                      )}
                    </div>

                    {/* Math Captcha Verification */}
                    <div className={s.captchaGroup}>
                      <label htmlFor="captchaAnswer" className={s.label}>
                        Captcha Verification <span className={s.required}>*</span>
                      </label>
                      <div className={s.captchaRow}>
                        <div className={s.captchaChallenge}>
                          <span>{num1} + {num2} = ?</span>
                          <button
                            type="button"
                            onClick={generateCaptcha}
                            className={s.refreshCaptchaBtn}
                            title="Generate new calculation"
                            aria-label="Refresh Captcha"
                          >
                            <RefreshCw size={14} />
                          </button>
                        </div>
                        <input
                          type="text"
                          id="captchaAnswer"
                          value={userCaptcha}
                          onChange={(e) => {
                            setUserCaptcha(e.target.value);
                            setCaptchaError('');
                          }}
                          placeholder="Enter Answer"
                          className={`${s.input} ${s.captchaInput} ${captchaError ? s.inputError : ''}`}
                          maxLength={3}
                          required
                        />
                      </div>
                      {captchaError && <span className={s.errorText}>{captchaError}</span>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={s.submitBtn}
                    >
                      {isSubmitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send size={16} />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Right Column: Contact Details Card */}
            <div className={s.infoCard}>
              <div className={s.infoHeader}>
                <span className={s.infoEyebrow}>Direct Support</span>
                <h2 className={s.infoTitle}>Contact Information</h2>
                <p className={s.infoSub}>
                  Having any questions or want to learn more? Reach out to us anytime. We are always
                  here to help you.
                </p>
              </div>

              <div className={s.channelList}>
                {/* Email Row */}
                <div className={s.channelItem}>
                  <div className={s.channelIconBox}>
                    <Mail size={18} className={s.channelIcon} />
                  </div>
                  <div className={s.channelContent}>
                    <span className={s.channelLabel}>Customer Success</span>
                    <a href="mailto:success@docsynecx.com" className={s.channelLink}>
                      success@docsynecx.com
                    </a>
                  </div>
                </div>

                <div className={s.channelItem}>
                  <div className={s.channelIconBox}>
                    <Mail size={18} className={s.channelIcon} />
                  </div>
                  <div className={s.channelContent}>
                    <span className={s.channelLabel}>General Inquiries</span>
                    <a href="mailto:hello@docsynecx.com" className={s.channelLink}>
                      hello@docsynecx.com
                    </a>
                  </div>
                </div>

                {/* Phone Rows */}
                <div className={s.channelItem}>
                  <div className={s.channelIconBox}>
                    <Phone size={18} className={s.channelIcon} />
                  </div>
                  <div className={s.channelContent}>
                    <span className={s.channelLabel}>Desk Line</span>
                    <a href="tel:04222212342" className={s.channelLink}>
                      0422 221 2342
                    </a>
                  </div>
                </div>

                <div className={s.channelItem}>
                  <div className={s.channelIconBox}>
                    <Phone size={18} className={s.channelIcon} />
                  </div>
                  <div className={s.channelContent}>
                    <span className={s.channelLabel}>Mobile / WhatsApp Support</span>
                    <a href="tel:+919344776623" className={s.channelLink}>
                      +91 93447 76623
                    </a>
                  </div>
                </div>

                {/* Office Location */}
                <div className={s.channelItem}>
                  <div className={s.channelIconBox}>
                    <MapPin size={18} className={s.channelIcon} />
                  </div>
                  <div className={s.channelContent}>
                    <span className={s.channelLabel}>Corporate Headquarters</span>
                    <p className={s.channelAddress}>
                      SynecxAI Labs Private Limited<br />
                      S.F.NO 497, Thadagam Main Road, Kanuvai,<br />
                      Coimbatore, Tamil Nadu, India - 641108
                    </p>
                  </div>
                </div>
              </div>

              {/* Book Demo Callout Card inside Info Card */}
              <div className={s.demoCallout}>
                <div className={s.demoCalloutHeader}>
                  <Building2 size={20} className={s.demoCalloutIcon} />
                  <div>
                    <h3 className={s.demoCalloutTitle}>Looking for a live walkthrough?</h3>
                    <p className={s.demoCalloutText}>
                      See Docsynecx process your documents into Tally or CargoWise in real time.
                    </p>
                  </div>
                </div>
                <Link href="/demo/" className={s.demoCalloutBtn}>
                  <span>Book A Demo</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ShipsyFooter />
    </div>
  );
}
