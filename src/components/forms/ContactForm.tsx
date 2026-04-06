"use client";

import { useState, FormEvent, ChangeEvent, FocusEvent } from "react";
import Button from "@/components/ui/Button";
import { validateName, validateEmail, validateMessage } from "@/lib/validation";
import { trackLead } from "@/lib/analytics";

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "";

type FormData = {
  name: string;
  email: string;
  company: string;
  message: string;
  budget: string;
  timeline: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

type FormState = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-text placeholder:text-text-muted transition-all focus:border-accent focus:bg-surface focus:outline-none focus:ring-2 focus:ring-accent/15";

const labelClasses = "mb-2 block text-sm font-semibold text-text";

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
    budget: "",
    timeline: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formState, setFormState] = useState<FormState>("idle");

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        return validateName(value) || undefined;
      case "email":
        return validateEmail(value) || undefined;
      case "message":
        return validateMessage(value) || undefined;
      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      message: validateField("message", formData.message),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== undefined);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!FORMSPREE_ENDPOINT) {
      setFormState("error");
      return;
    }

    setFormState("submitting");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        trackLead({
          form_name: "contact_form",
          form_destination: "formspree",
          page_path: window.location.pathname,
        });
        setFormState("success");
        setFormData({
          name: "",
          email: "",
          company: "",
          message: "",
          budget: "",
          timeline: "",
        });
        setErrors({});
        setTouched({});
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  if (formState === "success") {
    return (
      <div className="rounded-2xl border-2 border-accent/20 bg-accent-light p-8 text-center lg:p-12">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white">
          <svg aria-hidden="true" className="h-7 w-7" fill="none" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="font-display text-2xl font-bold text-text">Message sent!</h3>
        <p className="mt-3 text-base leading-relaxed text-text-secondary">
          Thanks for reaching out. I&apos;ll review your message and get back to you within one business day.
        </p>
        <div className="mt-6">
          <Button href="/" variant="primary" showArrow>
            Back to home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-5">
        <h2 className="font-display text-xl font-bold text-text">Send a message</h2>

        {!FORMSPREE_ENDPOINT && (
          <div className="rounded-xl border border-accent/20 bg-accent-light p-4" role="alert">
            <p className="text-sm font-medium text-text">
              Form endpoint not configured yet.
            </p>
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClasses}>
              Name <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Your name"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`${inputClasses} ${errors.name ? "border-accent ring-2 ring-accent/15" : ""}`}
            />
            {errors.name && (
              <p id="name-error" className="mt-1.5 text-sm text-accent" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className={labelClasses}>
              Email <span className="text-accent">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="you@company.com"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`${inputClasses} ${errors.email ? "border-accent ring-2 ring-accent/15" : ""}`}
            />
            {errors.email && (
              <p id="email-error" className="mt-1.5 text-sm text-accent" role="alert">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="company" className={labelClasses}>
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your company (optional)"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="message" className={labelClasses}>
            Message <span className="text-accent">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={5}
            placeholder="Tell me what you're working on or struggling with in HubSpot..."
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`${inputClasses} resize-none ${errors.message ? "border-accent ring-2 ring-accent/15" : ""}`}
          />
          {errors.message && (
            <p id="message-error" className="mt-1.5 text-sm text-accent" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="budget" className={labelClasses}>
              Budget
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="">Select budget</option>
              <option value="< €2k">&lt; €2k</option>
              <option value="€2k–€5k">€2k–€5k</option>
              <option value="€5k–€10k">€5k–€10k</option>
              <option value="€10k+">€10k+</option>
            </select>
          </div>

          <div>
            <label htmlFor="timeline" className={labelClasses}>
              Timeline
            </label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="">Select timeline</option>
              <option value="ASAP">ASAP</option>
              <option value="This month">This month</option>
              <option value="Next month">Next month</option>
              <option value="This quarter">This quarter</option>
            </select>
          </div>
        </div>

        {formState === "error" && (
          <div className="rounded-xl border border-accent/20 bg-accent-light p-4" role="alert">
            <p className="text-sm font-medium text-text">
              Something went wrong. Please try again or reach out directly on LinkedIn.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-text-muted">
            <span className="text-accent">*</span> Required fields
          </p>
          <Button
            type="submit"
            variant="primary"
            size="md"
            showArrow
            disabled={formState === "submitting"}
          >
            {formState === "submitting" ? "Sending..." : "Send message"}
          </Button>
        </div>
      </div>
    </form>
  );
}
