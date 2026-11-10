"use client";

import { useState, useRef, FormEvent, ChangeEvent, FocusEvent } from "react";
import Button from "@/components/ui/Button";
import { validateName, validateEmail, validateMessage } from "@/lib/validation";
import { trackLead, trackFormStart } from "@/lib/analytics";

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "";

type FormData = {
  name: string;
  email: string;
  company: string;
  message: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

type FormState = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-none border-0 border-b-[3px] border-ink bg-paper px-4 py-3.5 text-lg text-text placeholder:text-text-muted transition-colors hover:border-accent-action focus:border-accent";

const labelClasses = "mb-2 block font-bold text-text";

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formState, setFormState] = useState<FormState>("idle");
  const formStartFired = useRef(false);

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

  const handleFocus = () => {
    if (!formStartFired.current) {
      formStartFired.current = true;
      trackFormStart({ form_name: "contact_form", page_path: window.location.pathname });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstInvalidField = ["name", "email", "message"].find((name) =>
        validateField(name, formData[name as keyof FormData]),
      );
      if (firstInvalidField) {
        e.currentTarget.querySelector<HTMLElement>(`#${firstInvalidField}`)?.focus();
      }
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
          value: 1,
          currency: "EUR",
        });
        setFormState("success");
        setFormData({
          name: "",
          email: "",
          company: "",
          message: "",
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
      <div className="py-4 text-center lg:py-8" role="status">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-[5px] border-ink bg-line-green text-ink">
          <svg aria-hidden="true" className="h-7 w-7" fill="none" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="t-h2">Message sent!</h2>
        <p className="mt-3 text-lg leading-relaxed text-text-secondary">
          Thanks for reaching out. I&apos;ll read your message and get back to you soon.
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
    <form onSubmit={handleSubmit} onFocus={handleFocus} noValidate>
      <div className="space-y-5">
        <h2 className="t-h3">Send a message</h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClasses}>
              Name <span className="text-accent-text">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              autoComplete="name"
              placeholder="Your name"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`${inputClasses} ${errors.name ? "border-accent-action! bg-accent-light!" : ""}`}
            />
            {errors.name && (
              <p id="name-error" className="mt-1.5 text-sm font-semibold text-accent-text" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className={labelClasses}>
              Email <span className="text-accent-text">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="you@company.com"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`${inputClasses} ${errors.email ? "border-accent-action! bg-accent-light!" : ""}`}
            />
            {errors.email && (
              <p id="email-error" className="mt-1.5 text-sm font-semibold text-accent-text" role="alert">
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
            autoComplete="organization"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your company (optional)"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="message" className={labelClasses}>
            Message <span className="text-accent-text">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            minLength={20}
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={5}
            placeholder="Your question or idea..."
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-hint message-error" : "message-hint"}
            className={`${inputClasses} resize-none ${errors.message ? "border-accent-action! bg-accent-light!" : ""}`}
          />
          <p id="message-hint" className="mt-1.5 text-sm text-text-secondary">A little context helps. Please use at least 20 characters.</p>
          {errors.message && (
            <p id="message-error" className="mt-1.5 text-sm font-semibold text-accent-text" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        {formState === "error" && (
          <div className="border-l-[6px] border-accent bg-accent-light p-4" role="alert">
            <p className="font-semibold text-text">
              Something went wrong. Please try again or reach out directly on LinkedIn.
            </p>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <p className="text-sm text-text-muted">
            <span className="text-accent-text">*</span> Required fields
          </p>
          <Button
            type="submit"
            variant="primary"
            size="md"
            showArrow
            disabled={formState === "submitting" || !FORMSPREE_ENDPOINT}
          >
            {formState === "submitting" ? "Sending..." : "Send message"}
          </Button>
        </div>
      </div>
    </form>
  );
}
