"use client";

import { useState, FormEvent, ChangeEvent, FocusEvent } from "react";
import Button from "@/components/ui/Button";
import { validateName, validateEmail, validateMessage } from "@/lib/validation";

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
      <div className="rounded-[var(--radius-lg)] border-2 border-accent/20 bg-accent-light p-8 text-center lg:p-12">
        <div className="mb-4 text-4xl">✓</div>
        <h3 className="mb-2 text-2xl font-bold text-text">Message sent!</h3>
        <p className="mb-6 text-lg text-text-secondary">
          Thanks for reaching out. I&apos;ll review your message and get back to you within one business day.
        </p>
        <Button href="/" variant="primary">
          Back to home
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-6">
        {!FORMSPREE_ENDPOINT && (
          <div
            className="rounded-[var(--radius-md)] border border-accent/20 bg-accent-light p-4"
            role="alert"
          >
            <p className="text-sm font-medium text-text">
              Form is not configured yet.
            </p>
          </div>
        )}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-text"
          >
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="w-full rounded-[var(--radius-md)] border border-border bg-surface px-4 py-3 text-text transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
          {errors.name && (
            <p
              id="name-error"
              className="mt-2 text-sm text-accent"
              role="alert"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-text"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="w-full rounded-[var(--radius-md)] border border-border bg-surface px-4 py-3 text-text transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
          {errors.email && (
            <p
              id="email-error"
              className="mt-2 text-sm text-accent"
              role="alert"
            >
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="company"
            className="mb-2 block text-sm font-medium text-text"
          >
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full rounded-[var(--radius-md)] border border-border bg-surface px-4 py-3 text-text transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-text"
          >
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={6}
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-error" : undefined}
            className="w-full rounded-[var(--radius-md)] border border-border bg-surface px-4 py-3 text-text transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
          {errors.message && (
            <p
              id="message-error"
              className="mt-2 text-sm text-accent"
              role="alert"
            >
              {errors.message}
            </p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="budget"
              className="mb-2 block text-sm font-medium text-text"
            >
              Budget
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full rounded-[var(--radius-md)] border border-border bg-surface px-4 py-3 text-text transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              <option value="">Select budget</option>
              <option value="< €2k">&lt; €2k</option>
              <option value="€2k–€5k">€2k–€5k</option>
              <option value="€5k–€10k">€5k–€10k</option>
              <option value="€10k+">€10k+</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="timeline"
              className="mb-2 block text-sm font-medium text-text"
            >
              Timeline
            </label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className="w-full rounded-[var(--radius-md)] border border-border bg-surface px-4 py-3 text-text transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
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
          <div
            className="rounded-[var(--radius-md)] border border-accent/20 bg-accent-light p-4"
            role="alert"
          >
            <p className="text-sm font-medium text-text">
              Something went wrong. Please try again or contact us directly.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <p className="text-sm text-text-muted">* Required fields</p>
          <Button
            type="submit"
            variant="primary"
            disabled={formState === "submitting"}
          >
            {formState === "submitting" ? "Sending..." : "Send message"}
          </Button>
        </div>
      </div>
    </form>
  );
}
