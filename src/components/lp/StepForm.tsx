"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, ChevronLeft, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPANY_INFO } from "@/lib/constants";
import type { LpCopy } from "@/lib/lp/copy";
import type { Market } from "@/lib/lp/markets";
import { trackEvent, type TrackContext } from "@/lib/lp/track";
import {
  FUNDS_OPTIONS,
  GOLDEN_VISA_OPTIONS,
  HANDOVER_FUNDING_OPTIONS,
  TIMELINE_OPTIONS,
  type LeadAnswers,
  type LpProject,
} from "@/lib/lp/project";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match?.[2];
}

type StepKey =
  | "budget"
  | "unit"
  | "timeline"
  | "goldenVisa"
  | "funds"
  | "handoverFunding"
  | "contact";

interface Props {
  t: LpCopy;
  p: LpProject;
  market: Market;
  ctx: TrackContext;
  id?: string;
  compact?: boolean;
}

/**
 * One question per step. A single question with large tap targets converts
 * materially better than a wall of fields, and each answered step is a
 * commitment that makes the next one likelier — so an abandon at step 4 still
 * tells us more than a completed one-page form from an unqualified visitor.
 *
 * Note there is no "where are you based" question: the market page already
 * answers it.
 */
export function StepForm({ t, p, market, ctx, id, compact }: Props) {
  // The Golden Visa step only exists where the project can actually deliver
  // one. On a project whose top unit is under the AED 2M threshold, asking is
  // worse than not asking: it plants an expectation the desk has to unwind.
  const steps = useMemo<StepKey[]>(() => {
    const base: StepKey[] = ["budget", "unit", "timeline"];
    if (p.goldenVisa.applicable) base.push("goldenVisa");
    if (market.asksFundsSource) base.push("funds");
    if (p.asksHandoverFunding) base.push("handoverFunding");
    base.push("contact");
    return base;
  }, [market.asksFundsSource, p.goldenVisa.applicable, p.asksHandoverFunding]);

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<LeadAnswers>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(`${market.dialCode} `);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [touched, setTouched] = useState(false);
  const utm = useRef<Record<string, string>>({});

  const step = steps[index];
  const total = steps.length;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const collected: Record<string, string> = {};
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) collected[key] = value;
    }
    utm.current = collected;
  }, []);

  const eventId = useMemo(() => `lp-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`, []);

  // Must carry a country code. A local-format number is uncallable from Dubai
  // and hashes to something Meta can never match against.
  const phoneDigits = phone.replace(/[^0-9]/g, "");
  const phoneValid = phone.trim().startsWith("+") && phoneDigits.length >= 9 && phoneDigits.length <= 15;
  const contactComplete = name.trim().length > 1 && phoneValid;

  function answer(key: keyof LeadAnswers, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    // Advance immediately — the click is the answer, no second tap on "next".
    if (index < steps.length - 1) {
      setIndex((i) => i + 1);
      trackEvent("LeadFormStep", ctx, { step: index + 2 });
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!contactComplete || status === "sending") return;

    setStatus("sending");
    try {
      const res = await fetch("/api/lp-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...answers,
          location: market.id,
          name,
          phone: `+${phoneDigits}`,
          email,
          project: p.slug,
          market: market.id,
          lang: t.lang,
          eventId,
          fbp: readCookie("_fbp"),
          fbc: readCookie("_fbc"),
          utm: utm.current,
          pageUrl: window.location.href,
        }),
      });
      if (!res.ok) throw new Error("failed");
      const result = (await res.json()) as { qualified?: boolean };

      // Browser copy only — the API already sent the server copy with the same
      // eventId while writing the lead, so Meta deduplicates.
      //
      // A disqualified lead fires a custom event, never "Lead". Standard Lead
      // is what the campaign optimises toward, so reporting someone who cannot
      // fund the purchase teaches the auction to go and find more of them.
      if (result.qualified === false) {
        window.fbq?.("trackCustom", "LeadUnqualified", {
          content_name: p.slug,
          market: market.id,
        });
      } else {
        window.fbq?.(
          "track",
          "Lead",
          { content_name: p.slug, market: market.id },
          { eventID: eventId }
        );
      }
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div
        id={id}
        className="scroll-mt-24 rounded-lg border border-gold-border bg-gold-soft p-8 text-center"
      >
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-gold-border bg-paper-card">
          <Check className="h-6 w-6 text-gold" />
        </div>
        <h3 className="text-xl font-semibold text-ink">{t.successTitle}</h3>
        <p className="mx-auto mt-3 max-w-sm text-[14px] leading-relaxed text-ink-secondary">
          {t.successBody}
        </p>
        <a
          href={`tel:${COMPANY_INFO.phone.replace(/\s/g, "")}`}
          onClick={() => trackEvent("Contact", ctx, { channel: "phone", placement: "success" })}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-ink px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[2px] text-white transition-opacity hover:opacity-90"
        >
          <Phone className="h-4 w-4" />
          {t.successCta}
        </a>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={submit}
      className={cn(
        "scroll-mt-24 rounded-lg border border-line bg-paper-card",
        compact ? "p-6" : "p-6 md:p-8"
      )}
    >
      <div className="mb-6">
        <h3 className="text-[17px] font-semibold text-ink">{t.formTitle}</h3>
        <div className="mt-3 flex items-center gap-3">
          <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-line-strong">
            <div
              className="h-full bg-gold-bright transition-all duration-300"
              style={{ width: `${((index + 1) / total) * 100}%` }}
            />
          </div>
          <span className="shrink-0 text-[11px] uppercase tracking-[1.5px] text-ink-muted">
            {t.formStep.replace("{n}", String(index + 1)).replace("{total}", String(total))}
          </span>
        </div>
      </div>

      {step === "budget" && (
        <Question
          label={t.fieldBudget}
          options={p.options.budget}
          onPick={(v) => answer("budget", v)}
          t={t}
        />
      )}
      {step === "unit" && (
        <Question label={t.fieldUnit} options={p.options.unit} onPick={(v) => answer("unit", v)} t={t} />
      )}
      {step === "timeline" && (
        <Question
          label={t.fieldTimeline}
          options={TIMELINE_OPTIONS}
          onPick={(v) => answer("timeline", v)}
          t={t}
        />
      )}
      {step === "goldenVisa" && (
        <Question
          label={t.fieldVisa}
          options={GOLDEN_VISA_OPTIONS}
          onPick={(v) => answer("goldenVisa", v)}
          t={t}
        />
      )}
      {step === "handoverFunding" && (
        <Question
          label={t.fieldHandoverFunding}
          hint={t.fieldHandoverFundingHint}
          options={HANDOVER_FUNDING_OPTIONS}
          onPick={(v) => answer("handoverFunding", v)}
          t={t}
        />
      )}
      {step === "funds" && (
        <Question
          label={t.fieldFunds}
          hint={t.fieldFundsHint}
          options={FUNDS_OPTIONS}
          onPick={(v) => answer("funds", v)}
          t={t}
        />
      )}

      {step === "contact" && (
        <div className="space-y-4">
          <p className="text-[14px] font-medium text-ink">{t.contactHeading}</p>
          <Field
            label={t.fieldName}
            value={name}
            onChange={setName}
            invalid={touched && name.trim().length < 2}
            t={t}
            autoComplete="name"
          />
          <Field
            label={t.fieldPhone}
            value={phone}
            onChange={setPhone}
            invalid={touched && !phoneValid}
            t={t}
            type="tel"
            autoComplete="tel"
            dir="ltr"
            placeholder={`${market.dialCode} 000 000 000`}
          />
          <Field
            label={t.fieldEmail}
            value={email}
            onChange={setEmail}
            t={t}
            type="email"
            autoComplete="email"
            optional
          />

          {status === "error" && <p className="text-[13px] text-danger">{t.errorBody}</p>}

          <button
            type="submit"
            disabled={status === "sending"}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-8 py-4 text-[12px] font-semibold uppercase tracking-[2px] text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {status === "sending" ? t.submitting : t.submit}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </button>

          <p className="text-[11px] leading-relaxed text-ink-muted">{t.consent}</p>
        </div>
      )}

      {index > 0 && (
        <button
          type="button"
          onClick={() => setIndex((i) => i - 1)}
          className="mt-5 flex items-center gap-1 text-[12px] text-ink-muted transition-colors hover:text-ink"
        >
          <ChevronLeft className="h-3 w-3 rtl:rotate-180" />
          {t.back}
        </button>
      )}
    </form>
  );
}

function Question({
  label,
  hint,
  options,
  onPick,
  t,
}: {
  label: string;
  hint?: string;
  options: readonly { value: string; label: string }[];
  onPick: (v: string) => void;
  t: LpCopy;
}) {
  return (
    <fieldset>
      <legend className="mb-1 block text-[15px] font-medium text-ink">{label}</legend>
      {hint && <p className="mb-4 text-[12px] leading-relaxed text-ink-muted">{hint}</p>}
      <div className={cn("flex flex-col gap-2", !hint && "mt-4")}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onPick(option.value)}
            className="group flex items-center justify-between rounded-md border border-line px-4 py-3.5 text-start text-[13px] text-ink-secondary transition-all duration-150 hover:border-gold-border hover:bg-gold-soft hover:text-ink"
          >
            {t.labels?.[option.value] ?? option.label}
            <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 rtl:rotate-180" />
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function Field({
  label,
  value,
  onChange,
  invalid,
  t,
  type = "text",
  placeholder,
  autoComplete,
  optional,
  dir,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  invalid?: boolean;
  t: LpCopy;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  optional?: boolean;
  /**
   * Force left-to-right for this input regardless of page direction. A phone
   * number typed into an RTL field has its dial code and digit groups reordered
   * on screen by the bidi algorithm, so the user watches themselves type a
   * number that looks wrong and corrects a mistake they never made.
   */
  dir?: "ltr" | "rtl";
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-medium text-ink">
        {label}
        {invalid && <span className="ms-2 text-[11px] font-normal text-danger">{t.required}</span>}
      </span>
      <input
        type={type}
        value={value}
        required={!optional}
        placeholder={placeholder}
        autoComplete={autoComplete}
        dir={dir}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full rounded-md border bg-paper px-3.5 py-3 text-[14px] text-ink outline-none transition-colors placeholder:text-ink-muted",
          invalid ? "border-danger/60" : "border-line focus:border-gold-border"
        )}
      />
    </label>
  );
}
