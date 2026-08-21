/**
 * Project shape shared by every landing page.
 *
 * The page components used to import Vincitore's data module directly, which
 * meant a second project could not exist without duplicating them. Everything
 * project-specific now lives behind this interface and is passed down as a
 * prop, so adding a project is a data change, not a component change.
 */

import type { LpCopy } from "./copy";
import type { Lang } from "./markets-shared";

export interface UnitRow {
  type: string;
  sqftFrom: number;
  sqftTo: number;
  priceFrom: number;
  priceTo: number;
  /** Cash needed to book: down payment + DLD + admin fee. */
  bookingFrom: number;
  /** Only for projects with a monthly instalment plan. */
  monthlyFrom?: number;
  goldenVisa: "yes" | "upper-units" | "no";
}

export interface PaymentPlan {
  id: string;
  name: string;
  pitch: string;
  rows: { label: string; when: string }[];
}

export interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
}

export interface FloorPlan {
  type: string;
  src: string;
}

export interface ProjectMedia {
  hero: { src: string; alt: string };
  facade: { src: string; alt: string };
  gallery: GalleryItem[];
  floorPlans: FloorPlan[];
  /** Trakheesi permit QR, served from public/. */
  permitQr: string;
}

export interface TrackRecordItem {
  name: string;
  community: string;
  year: string;
  status: "Delivered" | "Under construction";
}

export interface LpProject {
  slug: string;
  name: string;
  developer: string;
  community: string;
  city: string;
  /** Freehold, leasehold. Shown in copy, not computed. */
  ownership: string;
  finish: string;
  /** AED per sqft, per year. */
  serviceCharge: number;
  coords: { lat: number; lng: number };
  handover: { label: string; detail: string };

  units: UnitRow[];
  paymentPlans: PaymentPlan[];
  amenities: string[];
  driveTimes: { minutes: number; place: string }[];

  media: ProjectMedia;

  /**
   * Golden Visa only applies where a unit clears the AED 2M threshold. Where it
   * does not, the section is omitted entirely rather than shown as a negative:
   * a page that argues about a visa you cannot get sells against itself.
   */
  goldenVisa: { threshold: number; applicable: boolean };

  /** Index into `units` for the hero opportunity card. */
  featuredUnitIndex: number;
  /** Headline plan shorthand on that card, e.g. "20 / 80". */
  planShorthand: string;
  planShorthandNote: string;

  /**
   * Ask how the handover balance will be covered. True where the plan ends in a
   * balloon payment large enough that the answer decides whether the sale can
   * happen at all.
   */
  asksHandoverFunding?: boolean;

  /** Answer options for the step form, since price bands differ by project. */
  options: {
    unit: readonly { value: string; label: string }[];
    budget: readonly { value: string; label: string }[];
  };

  /**
   * The developer's delivery history. Omitted where we have not verified one:
   * the section then does not render at all. An invented track record on a page
   * asking overseas buyers to wire six figures is not a growth tactic.
   */
  trackRecord?: {
    title: string;
    /** "{delivered}" is replaced with the count of delivered projects. */
    sub: string;
    items: TrackRecordItem[];
  };

  /**
   * Copy in copy.ts is shared by every project, so anything in it that states a
   * project fact (admin fee, number of payment plans, which layouts exist, the
   * community name) has to be overridden here or the page states a falsehood
   * in Vincitore's words. Checked against the rendered DOM, not by eye.
   */
  copy?: Partial<Record<Lang, Partial<LpCopy>>>;

  /** schema.org description for the Residence node. */
  schemaDescription: string;
}

export const AED_PER_USD = 3.6725;

export function toUsd(aed: number): number {
  return Math.round(aed / AED_PER_USD);
}

export function fmtAED(n: number): string {
  return `AED ${n.toLocaleString("en-US")}`;
}

export function priceFrom(project: LpProject): number {
  return Math.min(...project.units.map((u) => u.priceFrom));
}

/** True when any unit carries a monthly instalment, which drives a table column. */
export function hasMonthly(project: LpProject): boolean {
  return project.units.some((u) => u.monthlyFrom);
}

/* ── lead answers and scoring ──────────────────────────────── */

export interface LeadAnswers {
  unit?: string;
  budget?: string;
  timeline?: string;
  purpose?: string;
  goldenVisa?: string;
  location?: string;
  funds?: string;
  handoverFunding?: string;
}

/**
 * Hard disqualifiers, meaning the purchase cannot complete rather than the
 * buyer is merely cold. "Just researching" is NOT one of these: that is a
 * timing problem, and timing changes.
 *
 * This drives what we report to Meta. A disqualified lead is still stored and
 * still reaches the CRM, but it is not sent as a Lead conversion, because the
 * optimiser spends the rest of the budget finding more people exactly like the
 * last person we called a conversion. Reporting an unfundable lead as a win
 * teaches it to buy more unfundable leads.
 */
export function disqualifyReason(a: LeadAnswers): string | null {
  if (a.funds === "birr-in-ethiopia") return "funds-in-birr";
  if (a.handoverFunding === "need-monthly") return "needs-monthly-plan";
  return null;
}

export function isQualified(a: LeadAnswers): boolean {
  return disqualifyReason(a) === null;
}

export const TIMELINE_OPTIONS = [
  { value: "30-days", label: "Within 30 days" },
  { value: "1-3-months", label: "1 to 3 months" },
  { value: "3-6-months", label: "3 to 6 months" },
  { value: "researching", label: "Just researching" },
] as const;

export const PURPOSE_OPTIONS = [
  { value: "live", label: "To live in" },
  { value: "invest", label: "To invest or rent out" },
  { value: "both", label: "Both" },
] as const;

export const GOLDEN_VISA_OPTIONS = [
  { value: "main-reason", label: "Yes, a main reason" },
  { value: "bonus", label: "Yes, a bonus" },
  { value: "not-important", label: "Not important to me" },
] as const;

/**
 * Asked where the plan ends in a large balloon payment. The last option is a
 * hard disqualifier: someone who needs the whole purchase spread monthly cannot
 * complete a 40/60 plan, and no amount of agent time changes that.
 */
export const HANDOVER_FUNDING_OPTIONS = [
  { value: "cash-ready", label: "I expect to have the funds available by then" },
  { value: "mortgage", label: "I would arrange a mortgage on the completed property" },
  { value: "sell-asset", label: "I would sell another asset to cover it" },
  { value: "need-monthly", label: "I would need it spread into monthly payments instead" },
] as const;

/** Ethiopia only. This question is the entire qualification strategy there. */
export const FUNDS_OPTIONS = [
  { value: "foreign-account", label: "I hold funds in a foreign-currency account outside Ethiopia" },
  { value: "family-abroad", label: "A family member abroad would transfer on my behalf" },
  { value: "business-abroad", label: "My business holds earnings abroad" },
  { value: "birr-in-ethiopia", label: "Funds are in Ethiopia, in birr" },
] as const;

/**
 * CRM lead score. Mirrors the model in
 * output/osac/vincitore-wellness-estate/04-lead-form-and-landing-page.md.
 * >= 6 call within 5 minutes (senior agent), 3-5 contact within 5 minutes,
 * <= 2 automated nurture only.
 *
 * `topBudget` is the project's own top budget band, because "high budget" on a
 * AED 1.4M ceiling is not the same answer as on a AED 3.5M one.
 */
export function scoreLead(a: LeadAnswers, opts?: { topBudgets?: string[] }): number {
  let score = 0;
  const top = opts?.topBudgets ?? ["above-3.5m", "2m-3.5m"];

  if (a.timeline === "30-days") score += 3;
  else if (a.timeline === "1-3-months") score += 2;

  if (a.budget && top.includes(a.budget)) score += 3;
  else if (a.budget && a.budget !== "under-1m" && a.budget !== "under-700k") score += 2;

  if (a.goldenVisa === "main-reason") score += 2;

  if (a.purpose === "invest" || a.purpose === "both") score += 1;

  if (a.location === "europe" || a.location === "germany" || a.location === "canada") score += 2;
  else if (a.location === "india") score += 1;

  if (a.location === "ethiopia") {
    if (a.funds === "birr-in-ethiopia") score -= 4;
    else if (a.funds) score += 2;
  }

  if (a.handoverFunding === "need-monthly") score -= 4;
  else if (a.handoverFunding) score += 1;

  if (a.unit && a.unit !== "unsure") score += 1;

  return score;
}

export function leadTier(score: number, answers?: LeadAnswers): "hot" | "warm" | "nurture" {
  // A disqualified lead is never hot, whatever the rest of the answers say.
  if (answers && !isQualified(answers)) return "nurture";
  if (score >= 6) return "hot";
  if (score >= 3) return "warm";
  return "nurture";
}
