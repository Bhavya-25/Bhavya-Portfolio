"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { FormInput } from "./form-input";
import { FormTextarea } from "./form-textarea";
import { FormSelect } from "./form-select";
import { FormChipGroup } from "./form-chip-group";
import { FormRadioGroup } from "./form-radio-group";
import { FormFileUpload } from "./form-file-upload";
import { Button } from "@/components/ui/button";

const PROJECT_TYPES = [
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "Creative Development",
  "Shopify",
  "WordPress",
  "API Integration",
  "Other",
];

const SERVICES_OPTIONS = [
  "Full-Stack Development",
  "Frontend Development",
  "Backend / API",
  "UI/UX Design",
  "Mobile App",
  "Shopify Store",
  "WordPress Site",
  "Design System",
  "Three.js / Creative",
  "Ongoing Support",
];

const BUDGET_OPTIONS = ["Under $2k", "$2k – $5k", "$5k – $15k", "$15k+", "Not sure yet"];

const TIMELINE_OPTIONS = ["ASAP", "1–2 months", "3–6 months", "Flexible / not sure"];

const CONTACT_METHODS = ["Email", "Phone"];

type Status = "idle" | "loading" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "message" | "consent" | "attachment", string>>;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [servicesRequired, setServicesRequired] = useState<string[]>([]);
  const startedAt = useRef(0);
  const submittingRef = useRef(false);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const validate = (data: FormData): Errors => {
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (name.length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter a valid email.";
    if (message.length < 10) next.message = "Tell me a little more about the project.";
    if (!data.get("consent")) next.consent = "Please confirm before sending.";

    return next;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("startedAt", String(startedAt.current));

    const fieldErrors = validate(data);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0 || errors.attachment) return;

    submittingRef.current = true;
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: data,
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        setStatus("error");
        setErrorMessage(result.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      form.reset();
      setServicesRequired([]);
    } catch {
      setStatus("error");
      setErrorMessage("Couldn't reach the server. Please try again.");
    } finally {
      submittingRef.current = false;
    }
  };

  if (status === "success") {
    return (
      <div className="cta-success flex flex-col items-center gap-5 rounded-2xl border border-border-strong bg-surface px-8 py-16 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-ink">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <p className="font-display text-2xl font-medium tracking-tight text-ink">
          Thank you! Your message has been received.
        </p>
        <p className="max-w-sm text-sm text-ink-muted md:text-base">
          I&apos;ll personally review your project and respond within 24
          hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint transition-colors duration-300 ease-out hover:text-accent"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="hp_field">Leave this field empty</label>
        <input type="text" id="hp_field" name="hp_field" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="cta-field grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormInput id="name" name="name" label="Name *" required error={errors.name} />
        <FormInput id="email" name="email" type="email" label="Email *" required error={errors.email} />
      </div>

      <div className="cta-field grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormInput id="phone" name="phone" type="tel" label="Phone (optional)" />
        <FormInput id="company" name="company" label="Company (optional)" />
      </div>

      <div className="cta-field">
        <FormInput id="website" name="website" type="text" label="Website (optional)" />
      </div>

      <div className="cta-field grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormSelect
          id="projectType"
          name="projectType"
          label="Project Type"
          placeholder="Select project type"
          options={PROJECT_TYPES}
        />
        <FormSelect
          id="timeline"
          name="timeline"
          label="Timeline"
          placeholder="Select timeline"
          options={TIMELINE_OPTIONS}
        />
      </div>

      <div className="cta-field">
        <FormSelect
          id="budget"
          name="budget"
          label="Budget"
          placeholder="Select budget range"
          options={BUDGET_OPTIONS}
        />
      </div>

      <div className="cta-field">
        <FormChipGroup
          label="Services Required"
          name="servicesRequired"
          options={SERVICES_OPTIONS}
          selected={servicesRequired}
          onChange={setServicesRequired}
        />
      </div>

      <div className="cta-field">
        <FormTextarea
          id="message"
          name="message"
          label="Message *"
          required
          rows={7}
          placeholder="Tell me about your idea..."
          error={errors.message}
        />
      </div>

      <div className="cta-field">
        <FormFileUpload
          name="attachment"
          label="Attachment"
          error={errors.attachment}
          onError={(message) => setErrors((prev) => ({ ...prev, attachment: message || undefined }))}
        />
      </div>

      <div className="cta-field">
        <FormRadioGroup
          label="Preferred Contact Method"
          name="preferredContact"
          options={CONTACT_METHODS}
        />
      </div>

      <div className="cta-field">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-muted">
          <input
            type="checkbox"
            name="consent"
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-border-strong accent-accent"
          />
          I agree to be contacted regarding this inquiry.
        </label>
        <p
          className={`mt-1.5 overflow-hidden font-mono text-[11px] text-accent transition-all duration-300 ease-out ${
            errors.consent ? "max-h-6 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {errors.consent}
        </p>
      </div>

      {status === "error" && (
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
          {errorMessage}
        </p>
      )}

      <div className="cta-submit">
        <Button
          type="submit"
          shape="block"
          state={status === "error" ? "idle" : status}
          loadingLabel="Sending…"
          successLabel="Message Sent"
          dataCursor="Send"
        >
          Start Your Project
        </Button>
      </div>
    </form>
  );
}
