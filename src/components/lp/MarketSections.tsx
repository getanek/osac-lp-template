import Image from "next/image";
import { ArrowRight, Check, FileText, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import type { LpCopy } from "@/lib/lp/copy";
import type { Market, MarketContent } from "@/lib/lp/markets";
import { toUsd } from "@/lib/lp/markets";
import { fmtAED, type LpProject } from "@/lib/lp/project";
import { LpSection } from "./Sections";

/* ── hero ──────────────────────────────────────────────────── */

export function MarketHero({
  c,
  p,
  form,
}: {
  c: MarketContent;
  p: LpProject;
  /** Includes the step form, the advisor card and the market disclaimer. */
  form: React.ReactNode;
}) {
  return (
    <section className="border-b border-line bg-paper">
      <Container className="max-w-[1180px] py-10 md:py-16">
        {/* Explicit grid placement so mobile order is headline → image → form →
            props, while desktop keeps the form in a right-hand column. One form
            instance only; duplicating it would duplicate the #lead-form anchor. */}
        <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-14">
          <div className="lg:col-start-1 lg:row-start-1">
            <p className="flex items-center gap-2.5 text-[10px] uppercase tracking-[2.5px] text-gold md:text-[10.5px]">
              <span aria-hidden className="text-[15px] leading-none">
                {c.flag}
              </span>
              {c.eyebrow}
            </p>

            <h1 className="mt-5 max-w-2xl text-[30px] font-light leading-[1.08] tracking-[-0.02em] text-ink md:mt-6 md:text-[50px]">
              {c.h1}
            </h1>

            <p className="mt-5 max-w-xl text-[14px] leading-relaxed text-ink-secondary md:mt-6">
              {c.sub}
            </p>

            {/* Mobile keeps a short image band, then the form. The value props
                come after: on a 430px screen the form has to be reachable in one
                thumb-flick, not buried under four bullet points. */}
            <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-xl lg:hidden">
              <Image
                src={p.media.hero.src}
                alt={p.media.hero.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>

          </div>

          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:pt-1">{form}</div>

          <ul className="max-w-xl space-y-3 lg:col-start-1 lg:row-start-2">
            {c.props.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[13.5px] leading-relaxed text-ink">
                <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-gold" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="relative hidden aspect-[21/9] w-full lg:block">
        <Image
          src={p.media.hero.src}
          alt={p.media.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}

/* ── trust strip ───────────────────────────────────────────── */

export function TrustStrip({ t }: { t: LpCopy }) {
  return (
    <div className="border-b border-line bg-paper-card py-5 md:py-6">
      <Container className="max-w-[1180px]">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-center md:flex md:flex-wrap md:items-center md:justify-center md:gap-x-10">
          {t.trustChips.map((chip) => (
            <li key={chip} className="text-[9.5px] uppercase tracking-[1.8px] text-ink-muted md:text-[10.5px]">
              {chip}
            </li>
          ))}
        </ul>
        <p className="mt-4 flex items-center justify-center gap-2 text-center text-[11px] text-ink-muted">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-gold" />
          {t.regulatedLine}
        </p>
      </Container>
    </div>
  );
}

/* ── current opportunity ───────────────────────────────────── */

export function OpportunityCard({
  t,
  p,
  market,
}: {
  t: LpCopy;
  p: LpProject;
  market: Market;
}) {
  // Which unit fronts the card is a per-project decision: Vincitore leads with
  // the three-bedroom that clears the Golden Visa threshold, Enchanté with the
  // studio that books for under AED 100,000.
  const unit = p.units[p.featuredUnitIndex];

  return (
    <LpSection label={t.oppLabel} title={t.oppTitle} sub={t.oppSub}>
      <div className="overflow-hidden rounded-2xl border border-line bg-paper-card">
        <div className="grid md:grid-cols-[1fr_1.05fr]">
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[340px]">
            <Image
              src={p.media.facade.src}
              alt={p.media.facade.alt}
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
            <span className="absolute start-4 top-4 rounded border border-white/40 bg-black/45 px-2.5 py-1 text-[9.5px] uppercase tracking-[1.5px] text-white backdrop-blur">
              {t.oppTagOffPlan}
            </span>
          </div>

          <div className="p-5 md:p-8">
            <p className="text-[10px] uppercase tracking-[2px] text-ink-muted">
              {p.developer}
            </p>
            <p className="mt-1.5 text-[20px] leading-tight text-ink md:text-[24px]">
              {p.name}
            </p>
            <p className="mt-1.5 text-[12.5px] text-ink-secondary">
              {p.community} · {unit.type} · {unit.sqftFrom.toLocaleString()} sqft
            </p>

            {/* At 430px a three-across row breaks "AED 3,233,000" over two
                lines, so the price takes the full width on mobile. */}
            <dl className="mt-6 grid grid-cols-2 gap-3 border-y border-line py-5 md:grid-cols-3">
              <div className="col-span-2 md:col-span-1">
                <dt className="text-[9.5px] uppercase tracking-[1.5px] text-ink-muted">
                  {t.oppFrom}
                </dt>
                <dd className="mt-1.5 text-[15px] text-ink md:text-[17px]">
                  {fmtAED(unit.priceFrom)}
                </dd>
                {market.secondaryCurrency && (
                  <dd className="text-[10.5px] text-ink-muted">
                    ≈ USD {toUsd(unit.priceFrom).toLocaleString()}
                  </dd>
                )}
              </div>
              <div>
                <dt className="text-[9.5px] uppercase tracking-[1.5px] text-ink-muted">
                  {t.oppPlan}
                </dt>
                <dd className="mt-1.5 text-[15px] text-ink md:text-[17px]">{p.planShorthand}</dd>
                <dd className="text-[10.5px] text-ink-muted">{p.planShorthandNote}</dd>
              </div>
              <div>
                <dt className="text-[9.5px] uppercase tracking-[1.5px] text-ink-muted">
                  {t.oppHandover}
                </dt>
                <dd className="mt-1.5 text-[15px] text-ink md:text-[17px]">
                  {p.handover.label}
                </dd>
                <dd className="text-[10.5px] text-ink-muted">{p.handover.detail}</dd>
              </div>
            </dl>

            <p className="mt-5 text-[12px] leading-relaxed text-ink-secondary">{t.oppNote}</p>

            <a
              href="#lead-form"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-6 py-4 text-center text-[10.5px] font-semibold uppercase leading-tight tracking-[1.5px] text-white transition-opacity hover:opacity-90 sm:w-auto sm:text-[11px] sm:tracking-[1.8px]"
            >
              {t.oppCta}
              <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
            </a>
          </div>
        </div>
      </div>
    </LpSection>
  );
}

/* ── what you receive ──────────────────────────────────────── */

export function AcquisitionBrief({ t }: { t: LpCopy }) {
  return (
    <LpSection className="bg-paper-alt">
      <div className="grid gap-9 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-[10.5px] uppercase tracking-[2.5px] text-gold">{t.briefLabel}</p>
          <h2 className="mt-4 max-w-md text-[25px] font-light leading-[1.2] text-ink md:text-[34px]">
            {t.briefTitle}
          </h2>
          <p className="mt-5 max-w-md text-[13.5px] leading-relaxed text-ink-secondary">
            {t.briefSub}
          </p>
          <a
            href="#lead-form"
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-6 py-4 text-[11px] font-semibold uppercase tracking-[1.8px] text-white transition-opacity hover:opacity-90 sm:w-auto"
          >
            {t.briefCta}
            <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
          </a>
        </div>

        <div className="rounded-2xl border border-line bg-paper-card p-5 md:p-7">
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-2 text-[13px] text-ink">
              <FileText className="h-4 w-4 text-gold" />
              {t.briefCardTitle}
            </span>
            <span className="text-[9.5px] uppercase tracking-[1.5px] text-ink-muted">
              {t.briefCardTag}
            </span>
          </div>

          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {t.briefItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 rounded-lg border border-line bg-paper p-3.5 text-[12.5px] leading-relaxed text-ink-secondary"
              >
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-5 text-[11px] leading-relaxed text-ink-muted">{t.briefNote}</p>
        </div>
      </div>
    </LpSection>
  );
}

/* ── why this market buys in Dubai (01–04) ─────────────────── */

export function WhyMarket({ t, c }: { t: LpCopy; c: MarketContent }) {
  return (
    <LpSection label={t.whyLabel}>
      <div className="grid gap-x-12 gap-y-8 md:grid-cols-2 md:gap-y-10">
        {c.why.map((item, i) => (
          <div key={item.title} className="border-t border-line-strong pt-5">
            <span className="text-[11.5px] tracking-[2px] text-gold">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-[16px] font-medium leading-snug text-ink">{item.title}</h3>
            <p className="mt-2.5 text-[13px] leading-relaxed text-ink-secondary">{item.body}</p>
          </div>
        ))}
      </div>
    </LpSection>
  );
}

/* ── why OSAC ──────────────────────────────────────────────── */

export function WhyOsac({ t }: { t: LpCopy }) {
  return (
    <LpSection className="bg-paper-alt">
      <h2 className="max-w-md text-[25px] font-light leading-[1.2] text-ink md:text-[34px]">
        {t.whyOsacTitle}
      </h2>
      <ul className="mt-8 grid gap-x-12 gap-y-4 md:mt-10 md:grid-cols-2">
        {t.whyOsacItems.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-[13.5px] leading-relaxed text-ink-secondary"
          >
            <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-gold" />
            {item}
          </li>
        ))}
      </ul>
    </LpSection>
  );
}

/* ── market FAQ ────────────────────────────────────────────── */

export function MarketFaq({ t, c }: { t: LpCopy; c: MarketContent }) {
  return (
    <LpSection label={t.faqLabel} title={t.faqTitle}>
      <div className="max-w-3xl">
        {c.faqs.map((f) => (
          <details key={f.q} className="group border-b border-line py-4 md:py-5">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[14.5px] leading-snug text-ink transition-colors marker:hidden hover:text-gold">
              {f.q}
              <span className="mt-0.5 shrink-0 text-[18px] leading-none text-gold transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-ink-secondary">{f.a}</p>
          </details>
        ))}
      </div>
    </LpSection>
  );
}

/* ── market compliance line ────────────────────────────────── */

export function MarketDisclaimer({ c, className }: { c: MarketContent; className?: string }) {
  return (
    <p className={cn("text-[10.5px] leading-relaxed text-ink-muted", className)}>{c.disclaimer}</p>
  );
}
