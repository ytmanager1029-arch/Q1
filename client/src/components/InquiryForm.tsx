import { useState } from "react";
import { Button } from "@/components/Button";
import { site } from "@/data/site";
import { api, ApiError, type InquiryPayload } from "@/lib/api";
import { cn } from "@/lib/cn";

const empty: InquiryPayload = {
  name: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  projectType: "",
  budget: "",
  timeline: "",
  message: "",
  source: "",
};

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
};

function Field({ id, label, required, error, children, className }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
        {label}
        {required ? <span className="ml-1 text-oxide">*</span> : null}
      </label>
      {children}
      {error ? (
        <p className="field-error text-[13px]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClass =
  "w-full border-0 border-b border-line bg-transparent py-3 text-[15px] outline-none transition-colors placeholder:text-mute/60 focus:border-ink";

export function InquiryForm({ compact = false }: { compact?: boolean }) {
  const [values, setValues] = useState<InquiryPayload>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  function set<K extends keyof InquiryPayload>(key: K, value: InquiryPayload[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }

  function validate() {
    const next: Record<string, string> = {};
    if (values.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Enter a valid email.";
    if (!values.projectType) next.projectType = "Select a project type.";
    if (values.message.trim().length < 20) next.message = "Tell us a little more (20+ characters).";
    if (values.website.trim()) {
      const ok = /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}([/\w.?#&=+-]*)?$/i.test(values.website.trim());
      if (!ok) next.website = "Enter a valid website.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setServerMessage("");
    try {
      const res = await api<{ message: string }>("/api/inquiries", {
        method: "POST",
        body: JSON.stringify(values),
      });
      setStatus("success");
      setServerMessage(res.message || "Your inquiry has been received. We'll be in touch soon.");
      setValues(empty);
    } catch (err) {
      setStatus("error");
      if (err instanceof ApiError) {
        setServerMessage(err.message);
        if (err.errors) {
          const next: Record<string, string> = {};
          for (const [k, v] of Object.entries(err.errors)) {
            if (v?.[0]) next[k] = v[0];
          }
          setErrors(next);
        }
      } else {
        setServerMessage("Something went wrong. Please try again.");
      }
    }
  }

  if (status === "success") {
    return (
      <div className="border border-line bg-mist px-6 py-10 md:px-10" role="status">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">08 — Received</p>
        <h3 className="mt-4 text-3xl tracking-tightest">Your inquiry is in.</h3>
        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-mute">{serverMessage}</p>
        <button
          type="button"
          className="mt-8 text-[13px] uppercase tracking-[0.12em] underline underline-offset-4"
          onClick={() => {
            setStatus("idle");
            setServerMessage("");
          }}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 md:grid-cols-2">
      <Field id="name" label="Full Name" required error={errors.name}>
        <input
          id="name"
          name="name"
          autoComplete="name"
          className={inputClass}
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
        />
      </Field>
      <Field id="email" label="Email" required error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={inputClass}
          value={values.email}
          onChange={(e) => set("email", e.target.value)}
        />
      </Field>
      <Field id="phone" label="Phone" error={errors.phone}>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className={inputClass}
          value={values.phone}
          onChange={(e) => set("phone", e.target.value)}
        />
      </Field>
      <Field id="company" label="Company" error={errors.company}>
        <input
          id="company"
          name="company"
          autoComplete="organization"
          className={inputClass}
          value={values.company}
          onChange={(e) => set("company", e.target.value)}
        />
      </Field>
      <Field id="website" label="Website" error={errors.website}>
        <input
          id="website"
          name="website"
          inputMode="url"
          placeholder="example.com"
          className={inputClass}
          value={values.website}
          onChange={(e) => set("website", e.target.value)}
        />
      </Field>
      <Field id="projectType" label="Project Type" required error={errors.projectType}>
        <select
          id="projectType"
          name="projectType"
          className={cn(inputClass, "appearance-none bg-transparent")}
          value={values.projectType}
          onChange={(e) => set("projectType", e.target.value)}
        >
          <option value="">Select</option>
          {site.projectTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>
      {compact ? null : (
        <>
          <Field id="budget" label="Budget Range">
            <select
              id="budget"
              name="budget"
              className={cn(inputClass, "appearance-none")}
              value={values.budget}
              onChange={(e) => set("budget", e.target.value)}
            >
              <option value="">Select</option>
              {site.budgets.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
          <Field id="timeline" label="Timeline">
            <select
              id="timeline"
              name="timeline"
              className={cn(inputClass, "appearance-none")}
              value={values.timeline}
              onChange={(e) => set("timeline", e.target.value)}
            >
              <option value="">Select</option>
              {site.timelines.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
        </>
      )}
      <Field id="message" label="Message" required error={errors.message} className="md:col-span-2">
        <textarea
          id="message"
          name="message"
          rows={5}
          className={cn(inputClass, "resize-y")}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
        />
      </Field>
      <Field id="source" label="How did you hear about us?" className={compact ? "md:col-span-2" : ""}>
        <select
          id="source"
          name="source"
          className={cn(inputClass, "appearance-none")}
          value={values.source}
          onChange={(e) => set("source", e.target.value)}
        >
          <option value="">Select</option>
          {site.sources.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>

      <div className="md:col-span-2 flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" arrow disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Send Project Inquiry"}
        </Button>
        {status === "error" ? (
          <p className="field-error text-[14px]" role="alert">
            {serverMessage}
          </p>
        ) : (
          <p className="text-[13px] text-mute">We reply to every serious inquiry.</p>
        )}
      </div>
    </form>
  );
}
