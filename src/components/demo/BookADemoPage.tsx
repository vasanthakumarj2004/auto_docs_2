"use client";

import React, {
  useEffect,
  useState,
  type FormEvent,
  type ChangeEvent,
} from "react";
import {
  Check,
  CheckCircle2,
  ArrowUpRight,
  ChevronDown,
  Info,
  MapPin,
  RotateCcw,
} from "lucide-react";
import { LandingNavigation } from "../LandingNavigation";
import { DocsynecxFooter } from "../DocsynecxFooter";
import { trackEvent } from "@/src/lib/analytics";
import {
  EVENT_DEMO_REQUEST,
  EVENT_GENERATE_LEAD,
} from "@/src/lib/analytics-events";
import { sendDemoEmail } from "@/src/lib/emailjs";
import s from "./BookADemoPage.module.css";

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  platform: "" | "logistics" | "finance";
  operationSoftware: string;
  moduleInterest: string;
  requirements: string;
}

const INITIAL_FORM: FormData = {
  name: "",
  company: "",
  email: "",
  phone: "",
  platform: "",
  operationSoftware: "",
  moduleInterest: "",
  requirements: "",
};

export function BookADemoPage() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (
      (window.location.pathname === "/demo/" ||
        window.location.pathname === "/demo") &&
      window.location.hash === "#demo-form"
    ) {
      window.location.replace(`/demo-form${window.location.search}`);
    }
  }, []);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;

    let finalValue = value;
    if (name === "phone") {
      finalValue = value.replace(/[^\d+]/g, "").replace(/(?!^)\+/g, "");
    }

    setFormData((prev) => {
      // If the user changes the platform, reset the conditional operationSoftware
      if (name === "platform") {
        return {
          ...prev,
          platform: value as FormData["platform"],
          operationSoftware: "",
        };
      }
      return {
        ...prev,
        [name]: finalValue,
      };
    });

    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Your name is required";
    }
    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Work email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid work email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone =
        "Phone number must only contain digits and optional leading +";
    }
    if (!formData.platform) {
      newErrors.platform = "Please select a platform";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitError(null);
    trackEvent(EVENT_DEMO_REQUEST, { source: "book_a_demo_page" });

    setIsSubmitting(true);

    try {
      const res = await sendDemoEmail({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        platform: formData.platform,
        operationSoftware: formData.operationSoftware,
        moduleInterest: formData.moduleInterest,
        requirements: formData.requirements,
      });

      if (res.success) {
        setIsSubmitted(true);
        trackEvent(EVENT_GENERATE_LEAD, {
          lead_source: "book_a_demo_page",
          form_name: "book_a_demo",
        });
      } else {
        setSubmitError(
          "Failed to send demo request. Please try again or reach out to us directly.",
        );
      }
    } catch (err) {
      console.log("Demo request submission error:", err);
      setSubmitError("Failed to send demo request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    setFormData(INITIAL_FORM);
    setErrors({});
    setSubmitError(null);
    setIsSubmitted(false);
  }

  return (
    <div className={s.pageWrapper}>
      {/* Global Navigation */}
      <LandingNavigation />

      <main className={s.mainContent}>
        <div className="site-shell">
          <div className={s.heroGrid}>
            {/* ================================================================= */}
            {/* LEFT COLUMN: Pitch, Value Prop & Checklist                         */}
            {/* ================================================================= */}
            <div className={s.pitchColumn}>
              {/* Eyebrow */}
              <p className={s.eyebrow}>LET&apos;S TALK</p>

              {/* H1 Headline */}
              <h1 className={s.headline}>
                Let&apos;s make your workflow{" "}
                <span className={s.accent}>more intelligent.</span>
              </h1>

              {/* Intro Paragraph */}
              <p className={s.intro}>
                Tell us a little about your business and the process you want to
                improve. Our team will get in touch to understand your
                requirements.
              </p>

              {/* Checklist */}
              <ul className={s.checklist} role="list">
                <li className={s.checkItem}>
                  <span className={s.checkIconWrapper} aria-hidden="true">
                    <Check size={15} strokeWidth={2.8} />
                  </span>
                  <span>Discuss your current workflow and challenges</span>
                </li>
                <li className={s.checkItem}>
                  <span className={s.checkIconWrapper} aria-hidden="true">
                    <Check size={15} strokeWidth={2.8} />
                  </span>
                  <span>Identify suitable modules and integrations</span>
                </li>
                <li className={s.checkItem}>
                  <span className={s.checkIconWrapper} aria-hidden="true">
                    <Check size={15} strokeWidth={2.8} />
                  </span>
                  <span>Define a practical demo or discovery session</span>
                </li>
              </ul>

              {/* Company Credential Line */}
              <div className={s.companyLine}>
                <MapPin
                  size={15}
                  className={s.companyIcon}
                  aria-hidden="true"
                />
                <span>
                  SynecX AI Labs Private Limited · Coimbatore, Tamil Nadu, India
                </span>
              </div>
            </div>

            {/* ================================================================= */}
            {/* RIGHT COLUMN: "Request a demo" Form Card                          */}
            {/* ================================================================= */}
            <div id="demo-form" className={s.formCard}>
              <div className={s.formHeader}>
                <h2 className={s.cardTitle}>Request a demo</h2>
                <p className={s.cardSubtext}>
                  Tell us what you're looking to automate. Our team will help
                  you find the right solution.
                </p>
              </div>

              {isSubmitted ? (
                /* Success Confirmation State */
                <div className={s.successCard} role="status">
                  <div className={s.successIconBadge}>
                    <CheckCircle2 size={36} strokeWidth={2.4} />
                  </div>
                  <h3 className={s.successTitle}>
                    Enquiry submitted successfully!
                  </h3>
                  <p className={s.successMessage}>
                    Thank you for reaching out, <strong>{formData.name}</strong>
                    . Our solutions team will review your requirements for{" "}
                    <strong>
                      {formData.platform === "logistics"
                        ? "Docsynecx Logistics"
                        : "Docsynecx Finance"}
                    </strong>{" "}
                    and get in touch with you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className={s.resetBtn}
                  >
                    <RotateCcw size={14} />
                    <span>Submit another enquiry</span>
                  </button>
                </div>
              ) : (
                /* Interactive Lead Capture Form */
                <form className={s.form} onSubmit={handleSubmit} noValidate>
                  {/* Row 1: Name & Company */}
                  <div className={s.rowTwoCol}>
                    <div className={s.fieldGroup}>
                      <label htmlFor="demo-name" className={s.label}>
                        Name <span className={s.requiredStar}>*</span>
                      </label>
                      <input
                        id="demo-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={`${s.input} ${errors.name ? s.inputError : ""}`}
                        aria-required="true"
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <span className={s.errorMessage}>{errors.name}</span>
                      )}
                    </div>

                    <div className={s.fieldGroup}>
                      <label htmlFor="demo-company" className={s.label}>
                        Company <span className={s.requiredStar}>*</span>
                      </label>
                      <input
                        id="demo-company"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company name"
                        className={`${s.input} ${errors.company ? s.inputError : ""}`}
                        aria-required="true"
                        aria-invalid={!!errors.company}
                      />
                      {errors.company && (
                        <span className={s.errorMessage}>{errors.company}</span>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Email & Phone */}
                  <div className={s.rowTwoCol}>
                    <div className={s.fieldGroup}>
                      <label htmlFor="demo-email" className={s.label}>
                        Email <span className={s.requiredStar}>*</span>
                      </label>
                      <input
                        id="demo-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Work email"
                        className={`${s.input} ${errors.email ? s.inputError : ""}`}
                        aria-required="true"
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <span className={s.errorMessage}>{errors.email}</span>
                      )}
                    </div>

                    <div className={s.fieldGroup}>
                      <label htmlFor="demo-phone" className={s.label}>
                        Phone <span className={s.requiredStar}>*</span>
                      </label>
                      <input
                        id="demo-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone number"
                        className={`${s.input} ${errors.phone ? s.inputError : ""}`}
                        aria-required="true"
                        aria-invalid={!!errors.phone}
                      />
                      {errors.phone && (
                        <span className={s.errorMessage}>{errors.phone}</span>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Platform Selection */}
                  <div className={s.fieldGroup}>
                    <label htmlFor="demo-platform" className={s.label}>
                      Platform <span className={s.requiredStar}>*</span>
                    </label>
                    <div className={s.selectWrapper}>
                      <select
                        id="demo-platform"
                        name="platform"
                        value={formData.platform}
                        onChange={handleChange}
                        className={`${s.select} ${errors.platform ? s.inputError : ""}`}
                        aria-required="true"
                        aria-invalid={!!errors.platform}
                      >
                        <option value="">Select platform</option>
                        <option value="logistics">Docsynecx Logistics</option>
                        <option value="finance">Docsynecx Finance</option>
                      </select>
                      <ChevronDown
                        size={18}
                        className={s.selectIcon}
                        aria-hidden="true"
                      />
                    </div>
                    {errors.platform && (
                      <span className={s.errorMessage}>{errors.platform}</span>
                    )}
                  </div>

                  {/* ============================================================= */}
                  {/* DYNAMIC FIELD (Above Row 4): "What runs your operation today?" */}
                  {/* ============================================================= */}
                  {formData.platform && (
                    <div className={s.conditionalFieldContainer}>
                      <div className={s.fieldGroup}>
                        <div className={s.conditionalHeader}>
                          <label
                            htmlFor="demo-operation-software"
                            className={s.label}
                          >
                            What runs your operation today?
                          </label>
                          <span className={s.conditionalBadge}>
                            {formData.platform === "logistics"
                              ? "Logistics ERP"
                              : "Finance System"}
                          </span>
                        </div>

                        <div className={s.selectWrapper}>
                          <select
                            id="demo-operation-software"
                            name="operationSoftware"
                            value={formData.operationSoftware}
                            onChange={handleChange}
                            className={`${s.select} ${s.conditionalSelect}`}
                          >
                            <option value="">
                              {formData.platform === "logistics"
                                ? "Select logistics system"
                                : "Select finance software"}
                            </option>

                            {formData.platform === "logistics" ? (
                              <>
                                <option value="cargowise">CargoWise</option>
                                <option value="logi-sys">Logi-Sys</option>
                                <option value="shipsy">Shipsy</option>
                                <option value="other">
                                  Other / Custom ERP
                                </option>
                              </>
                            ) : (
                              <>
                                <option value="tally">Tally</option>
                                <option value="zoho-books">Zoho Books</option>
                                <option value="other">
                                  Other / Custom Software
                                </option>
                              </>
                            )}
                          </select>
                          <ChevronDown
                            size={18}
                            className={s.selectIcon}
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Row 4: Module / Workflow */}
                  <div className={s.fieldGroup}>
                    <label htmlFor="demo-module" className={s.label}>
                      Module / workflow
                    </label>
                    <input
                      id="demo-module"
                      type="text"
                      name="moduleInterest"
                      value={formData.moduleInterest}
                      onChange={handleChange}
                      placeholder="Module or workflow of interest"
                      className={s.input}
                    />
                  </div>

                  {/* Row 5: Requirements (Textarea) */}
                  <div className={s.fieldGroup}>
                    <label htmlFor="demo-requirements" className={s.label}>
                      Requirements
                    </label>
                    <textarea
                      id="demo-requirements"
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleChange}
                      placeholder="Briefly describe your current process and requirements"
                      className={s.textarea}
                      rows={3}
                    />
                  </div>

                  {submitError && (
                    <div
                      className={s.errorMessage}
                      style={{ marginBottom: "1rem", display: "block" }}
                    >
                      {submitError}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className={s.submitBtn}
                    disabled={isSubmitting}
                  >
                    <span>
                      {isSubmitting ? "Submitting enquiry..." : "Submit Demo"}
                    </span>
                    {!isSubmitting && (
                      <ArrowUpRight size={17} aria-hidden="true" />
                    )}
                  </button>

                  {/* Privacy Policy Line */}
                  <p className={s.privacyLine}>
                    Your information will be used to respond to this enquiry.
                    Add your published privacy policy before launch.
                  </p>

                  {/* Implementation Note Banner */}
                  {/* <div className={s.implementationNote} role="note">
                    <Info size={16} aria-hidden="true" />
                    <span>
                      <strong>Implementation note:</strong> the form currently demonstrates
                      front-end behaviour only. Connect it to your CRM or API before publishing.
                    </span>
                  </div> */}
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Global Dark Navy Footer */}
      <DocsynecxFooter />
    </div>
  );
}

export default BookADemoPage;
