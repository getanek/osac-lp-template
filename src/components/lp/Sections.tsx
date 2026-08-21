import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { COMPANY_INFO } from "@/lib/constants";
import type { LpCopy } from "@/lib/lp/copy";
import { toUsd } from "@/lib/lp/markets";
import { fmtAED, hasMonthly, type LpProject } from "@/lib/lp/project";
import { PlanTabs } from "./PlanTabs";

/* ── shell ─────────────────────────────────────────────────── */

export function LpSection({
  label,
  title,
  sub,
  children,
  className,
  id,
}: {
  label?: string;
  title?: string;
  sub?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-20 py-14 md:py-24", className)}>
      <Container className="max-w-[1180px]">
        {(label || title) && (
          <div className="mb-8 md:mb-14">
            {label && (
              <p className="mb-3 text-[10.5px] uppercase tracking-[2.5px] text-gold">{label}</p>
            )}
            {title && (
              <h2 className="max-w-2xl text-[25px] font-light leading-[1.2] tracking-[-0.01em] text-ink md:text-[36px]">
                {title}
              </h2>
            )}
            {sub && (
              <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-ink-secondary">{sub}</p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}

/* ── minimal header ────────────────────────────────────────── */

export function LpHeader({
  t,
  languageSwitch,
}: {
  t: LpCopy;
  /** Only the Ethiopian pages carry a language switch. */
  languageSwitch?: { href: string; label: string };
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <Container className="flex h-[68px] max-w-[1180px] items-center justify-between md:h-[80px]">
        {/* Deliberately not a link. The homepage is the biggest leak on a paid
            landing page — a visitor who clicks through to browse listings does
            not come back to the form. Gold wordmark on transparent reads
            correctly on the light surface. */}
        <Image
          src="/osac-logo-gold.png"
          alt="OSAC Properties"
          width={1000}
          height={500}
          priority
          sizes="(max-width: 768px) 96px, 116px"
          className="h-[48px] w-auto shrink-0 md:h-[58px]"
        />
        <div className="flex items-center gap-4 md:gap-5">
          {languageSwitch && (
            <Link
              href={languageSwitch.href}
              className="rounded-full border border-line-strong px-3 py-1 text-[11px] text-ink-secondary transition-colors hover:text-ink md:text-[12px]"
            >
              {languageSwitch.label}
            </Link>
          )}
          {/*
            dir="ltr" is load-bearing on the Arabic pages. A phone number is
            Latin digits with neutral characters (+ and spaces) around them, so
            inside an RTL block the bidi algorithm reorders the groups and the
            number renders backwards. The digits are correct either way; only
            the display is wrong, which is worse, because it looks like a typo.
          */}
          <a
            href={`tel:${COMPANY_INFO.phone.replace(/\s/g, "")}`}
            dir="ltr"
            className="text-[12.5px] text-ink transition-colors hover:text-gold md:text-[13px]"
          >
            {COMPANY_INFO.phone}
          </a>
        </div>
      </Container>
    </header>
  );
}

/* ── gallery ───────────────────────────────────────────────── */

export function LpGallery({ t, p }: { t: LpCopy; p: LpProject }) {
  const [lead, ...rest] = p.media.gallery;

  return (
    <LpSection label={t.galleryLabel} title={t.galleryTitle} className="bg-paper-alt">
      <div className="grid gap-3 md:grid-cols-2">
        <figure className="group relative overflow-hidden rounded-xl">
          <div className="relative aspect-[4/3] md:aspect-[4/5]">
            <Image
              src={lead.src}
              alt={lead.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 text-[13px] text-white">
            {lead.caption}
          </figcaption>
        </figure>

        <div className="grid grid-cols-2 gap-3">
          {rest.slice(0, 4).map((item) => (
            <figure key={item.src} className="group overflow-hidden rounded-xl">
              <div className="relative aspect-[4/3] md:aspect-[3/2]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="px-1 pt-2 text-[11.5px] leading-snug text-ink-muted">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </LpSection>
  );
}

/* ── floor plans (gated) ───────────────────────────────────── */

export function LpFloorPlans({ t, p }: { t: LpCopy; p: LpProject }) {
  return (
    <LpSection label={t.plansImagesLabel} title={t.plansImagesTitle} sub={t.plansImagesSub}>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {p.media.floorPlans.map((plan) => (
          <a
            key={plan.type}
            href="#lead-form"
            className="group overflow-hidden rounded-xl border border-line bg-paper-card p-3 transition-colors hover:border-gold-border"
          >
            <div className="relative aspect-square overflow-hidden rounded-lg bg-paper-alt">
              <Image
                src={plan.src}
                alt={`${plan.type} floor plan`}
                fill
                sizes="(max-width: 768px) 45vw, 22vw"
                className="object-contain p-2 blur-[3px] transition-all duration-500 group-hover:blur-[1.5px]"
              />
              <span className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-white/90 via-white/20 to-transparent pb-3 text-center text-[10px] font-semibold uppercase tracking-[1.5px] text-gold">
                {t.plansImagesCta}
              </span>
            </div>
            <p className="pt-2.5 text-center text-[12.5px] text-ink">{plan.type}</p>
          </a>
        ))}
      </div>
    </LpSection>
  );
}

/* ── prices ────────────────────────────────────────────────── */

export function LpPrices({
  t,
  p,
  secondaryCurrency,
}: {
  t: LpCopy;
  p: LpProject;
  /** Overseas markets see a USD equivalent under the AED price. */
  secondaryCurrency?: boolean;
}) {
  // Only projects with a monthly instalment plan get the monthly column.
  const monthly = hasMonthly(p);
  return (
    <LpSection id="prices" label={t.pricesLabel} title={t.pricesTitle}>
      {/* Mobile gets cards. A five-column table at 430px is a scroll trap. */}
      <div className="grid gap-3 md:hidden">
        {p.units.map((u) => (
          <div key={u.type} className="rounded-xl border border-line bg-paper-card p-4">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[15px] font-medium text-ink">{u.type}</span>
              <span className="text-[11.5px] text-ink-muted">
                {u.sqftFrom === u.sqftTo
                  ? `${u.sqftFrom.toLocaleString()} sqft`
                  : `${u.sqftFrom.toLocaleString()}–${u.sqftTo.toLocaleString()} sqft`}
              </span>
            </div>

            {u.goldenVisa !== "no" && (
              <span className="mt-2 inline-block rounded border border-gold-border bg-gold-soft px-2 py-0.5 text-[9.5px] uppercase tracking-[1px] text-gold">
                {u.goldenVisa === "yes" ? t.goldenVisaTag : t.goldenVisaTagUpper}
              </span>
            )}

            <dl
              className={cn(
                "mt-4 grid gap-2 border-t border-line pt-3",
                monthly ? "grid-cols-3" : "grid-cols-2"
              )}
            >
              <div>
                <dt className="text-[9.5px] uppercase tracking-[1px] text-ink-muted">
                  {t.colPrice}
                </dt>
                <dd className="mt-1 text-[13px] text-ink">{fmtAED(u.priceFrom)}</dd>
              </div>
              <div>
                <dt className="text-[9.5px] uppercase tracking-[1px] text-ink-muted">
                  {t.colBooking}
                </dt>
                <dd className="mt-1 text-[13px] text-ink-secondary">{fmtAED(u.bookingFrom)}</dd>
              </div>
              {monthly && u.monthlyFrom && (
                <div>
                  <dt className="text-[9.5px] uppercase tracking-[1px] text-ink-muted">
                    {t.colMonthly}
                  </dt>
                  <dd className="mt-1 text-[13px] text-gold">{fmtAED(u.monthlyFrom)}</dd>
                </div>
              )}
            </dl>
          </div>
        ))}
      </div>

      <div className="hidden md:block">
        <table className="w-full border-collapse text-start">
          <thead>
            <tr className="border-b border-line-strong">
              {[
                t.colType,
                t.colSize,
                t.colPrice,
                t.colBooking,
                ...(monthly ? [t.colMonthly] : []),
              ].map((h) => (
                <th
                  key={h}
                  className="pb-3 text-[10.5px] font-medium uppercase tracking-[1.5px] text-ink-muted"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {p.units.map((u) => (
              <tr key={u.type} className="border-b border-line">
                <td className="py-5 pe-4">
                  <span className="block text-[15px] text-ink">{u.type}</span>
                  {u.goldenVisa !== "no" && (
                    <span className="mt-1 inline-block rounded border border-gold-border bg-gold-soft px-2 py-0.5 text-[10px] uppercase tracking-[1px] text-gold">
                      {u.goldenVisa === "yes" ? t.goldenVisaTag : t.goldenVisaTagUpper}
                    </span>
                  )}
                </td>
                <td className="py-5 pe-4 text-[13px] text-ink-secondary">
                  {u.sqftFrom === u.sqftTo
                    ? `${u.sqftFrom.toLocaleString()} sqft`
                    : `${u.sqftFrom.toLocaleString()} – ${u.sqftTo.toLocaleString()} sqft`}
                </td>
                <td className="py-5 pe-4">
                  <span className="block text-[15px] text-ink">{fmtAED(u.priceFrom)}</span>
                  {secondaryCurrency && (
                    <span className="text-[11px] text-ink-muted">
                      ≈ USD {toUsd(u.priceFrom).toLocaleString()}
                    </span>
                  )}
                </td>
                <td className="py-5 pe-4 text-[13px] text-ink-secondary">
                  {fmtAED(u.bookingFrom)}
                </td>
                {monthly && (
                  <td className="py-5 text-[13px] text-gold">
                    {u.monthlyFrom ? fmtAED(u.monthlyFrom) : "—"}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-5 max-w-2xl text-[11.5px] leading-relaxed text-ink-muted">{t.pricesNote}</p>
    </LpSection>
  );
}

/* ── golden visa ───────────────────────────────────────────── */

export function LpGoldenVisa({ t, p }: { t: LpCopy; p: LpProject }) {
  return (
    <LpSection className="bg-paper-alt">
      <div className="rounded-2xl border border-gold-border bg-gold-soft p-6 md:p-12">
        <p className="text-[10.5px] uppercase tracking-[2.5px] text-gold">{t.visaLabel}</p>
        <h2 className="mt-4 max-w-2xl text-[23px] font-light leading-[1.25] text-ink md:text-[32px]">
          {t.visaTitle}
        </h2>
        <p className="mt-5 max-w-2xl text-[13.5px] leading-relaxed text-ink-secondary">
          {t.visaBody}
        </p>

        <div className="mt-7 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap">
          {p.units.map((u) => (
            <div
              key={u.type}
              className={cn(
                "rounded-lg border px-4 py-3",
                u.goldenVisa === "yes" ? "border-gold-border bg-paper-card" : "border-line bg-white/60"
              )}
            >
              <span className="block text-[13px] text-ink">{u.type}</span>
              <span
                className={cn(
                  "text-[10.5px]",
                  u.goldenVisa === "yes" ? "text-gold" : "text-ink-muted"
                )}
              >
                {u.goldenVisa === "yes"
                  ? t.goldenVisaTag
                  : u.goldenVisa === "upper-units"
                    ? t.goldenVisaTagUpper
                    : "—"}
              </span>
            </div>
          ))}
        </div>

        <a
          href="#lead-form"
          className="mt-8 inline-block w-full rounded-lg bg-ink px-8 py-4 text-center text-[11.5px] font-semibold uppercase tracking-[2px] text-white transition-opacity hover:opacity-90 sm:w-auto"
        >
          {t.visaCta}
        </a>

        <p className="mt-6 max-w-2xl text-[11px] leading-relaxed text-ink-muted">
          {t.visaDisclaimer}
        </p>
      </div>
    </LpSection>
  );
}

/* ── payment plans ─────────────────────────────────────────── */

export function LpPlans({ t, p }: { t: LpCopy; p: LpProject }) {
  return (
    <LpSection label={t.plansLabel} title={t.plansTitle}>
      <PlanTabs plans={p.paymentPlans} />
      <a
        href="#lead-form"
        className="mt-8 inline-block text-[13px] text-gold underline underline-offset-4 transition-opacity hover:opacity-70"
      >
        {t.plansCta}
      </a>
    </LpSection>
  );
}

/* ── amenities ─────────────────────────────────────────────── */

export function LpAmenities({ t, p }: { t: LpCopy; p: LpProject }) {
  return (
    <LpSection label={t.amenitiesLabel} title={t.amenitiesTitle} className="bg-paper-alt">
      <ul className="grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2 md:grid-cols-3">
        {p.amenities.map((a) => (
          <li key={a} className="flex items-start gap-2.5 text-[13px] text-ink-secondary">
            <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-gold" />
            {a}
          </li>
        ))}
      </ul>
    </LpSection>
  );
}

/* ── location ──────────────────────────────────────────────── */

export function LpLocation({ t, p }: { t: LpCopy; p: LpProject }) {
  return (
    <LpSection label={t.locationLabel} title={t.locationTitle} sub={t.locationSub}>
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <ul>
          {p.driveTimes.map((d) => (
            <li key={d.place} className="flex items-baseline gap-5 border-b border-line py-4">
              <span className="w-12 shrink-0 text-[22px] font-light text-gold">{d.minutes}</span>
              <span className="text-[13.5px] text-ink">{d.place}</span>
            </li>
          ))}
        </ul>

        <a
          href={`https://maps.google.com/?q=${p.coords.lat},${p.coords.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-xl border border-line bg-paper-card text-center"
        >
          <MapPin className="h-6 w-6 text-gold" />
          <span className="text-[14px] text-ink">{p.community}</span>
          <span className="text-[12px] text-ink-muted underline underline-offset-4">
            {t.openInMaps}
          </span>
        </a>
      </div>
    </LpSection>
  );
}

/* ── footer ────────────────────────────────────────────────── */

export function LpFooter({
  compliance,
  permitQr,
  goldenVisa,
}: {
  /** Permit QR image for this project, from public/. */
  permitQr: string;
  /** Suppresses the Golden Visa line where the project cannot deliver one. */
  goldenVisa?: boolean;
  /** From the page's registry entry. */
  compliance?: {
    trakheesiPermit: string | null;
    orn: string | null;
    permitQrUrl?: string;
    permitExpires?: string;
  };
}) {
  const permit = compliance?.trakheesiPermit;
  const orn = compliance?.orn || process.env.NEXT_PUBLIC_OSAC_ORN;

  return (
    <footer className="border-t border-line bg-paper-alt py-10 pb-28 md:pb-10">
      <Container className="max-w-[1180px]">
        <Image
          src="/osac-logo-gold.png"
          alt="OSAC Properties"
          width={1000}
          height={500}
          sizes="104px"
          className="mb-6 h-[52px] w-auto"
        />

        <div className="flex flex-col gap-4 text-[12px] text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>
            {COMPANY_INFO.name} · {COMPANY_INFO.address}
          </p>
          <p>
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/\s/g, "")}`}
              dir="ltr"
              className="hover:text-ink"
            >
              {COMPANY_INFO.phone}
            </a>
            {" · "}
            <Link href="/privacy" className="hover:text-ink">
              Privacy
            </Link>
            {" · "}
            <Link href="/terms" className="hover:text-ink">
              Terms
            </Link>
          </p>
        </div>
        {/* Dubai property ads must display the Trakheesi permit number. The QR
            resolves to the DLD permit card, so a buyer can verify the listing
            without taking our word for it. Identifiers render only when real —
            a visible placeholder reads as an unlicensed operator. */}
        <div className="mt-5 flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-start">
          {permit && compliance?.permitQrUrl && (
            <a
              href={compliance.permitQrUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
              aria-label="Verify this listing with Dubai Land Department"
            >
              <Image
                src={permitQr}
                alt="Dubai Land Department permit QR code"
                width={171}
                height={171}
                sizes="72px"
                className="h-[72px] w-[72px] rounded border border-line bg-white"
              />
            </a>
          )}

          <div>
            <p className="text-[11px] leading-relaxed text-ink-muted">
              {[
                `DED ${COMPANY_INFO.ded}`,
                orn && `ORN ${orn}`,
                permit && `Permit No. ${permit}`,
              ]
                .filter(Boolean)
                .join(" · ")}
              {permit && compliance?.permitQrUrl && (
                <>
                  {" · "}
                  <a
                    href={compliance.permitQrUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-ink"
                  >
                    Verified by Dubai Land Department
                  </a>
                </>
              )}
            </p>
            <p className="mt-2 text-[11px] leading-relaxed text-ink-muted">
              Prices, payment plans and availability are supplied by the developer and are subject
              to change without notice.
              {goldenVisa &&
                " Golden Visa eligibility is determined by UAE authorities, not by OSAC Properties."}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
