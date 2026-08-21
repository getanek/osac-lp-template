/**
 * Maps landing page answers onto Pixxi's native lead fields.
 *
 * Pixxi renders structured fields (Budget, Bedrooms, Size, Property Type,
 * Project Type, Buyer Type, Developers, Furnishing) on the lead detail view and
 * filters on them. Anything passed as free text in extraData shows as N/A in
 * those columns and cannot be filtered or reported on — so every answer that
 * has a native home gets one, and extraData carries only what Pixxi has no
 * field for (score, tier, timeline, Golden Visa intent, funds source, campaign).
 */

import type { LeadAnswers, UnitRow } from "./project";
import type { LandingPage } from "./registry";

/**
 * Pixxi's `budget` and `preferredSize` take a bare numeric range, "min-max"
 * with no separators, no currency and no unit. A formatted string like
 * "1,242,000 - 1,547,000AED" is accepted by the endpoint and then dropped, so
 * the lead lands with an empty Budget column.
 */
function numericRange(min: number, max: number): string {
  return min === max ? `${min}` : `${min}-${max}`;
}

const BUDGET_RANGES: Record<string, [number, number]> = {
  // Vincitore bands
  "under-1m": [500_000, 1_000_000],
  "1m-2m": [1_000_000, 2_000_000],
  "2m-3.5m": [2_000_000, 3_500_000],
  "above-3.5m": [3_500_000, 6_000_000],
  // Enchanté bands
  "under-700k": [500_000, 700_000],
  "700k-1m": [700_000, 1_000_000],
  "1m-1.4m": [1_000_000, 1_400_000],
  "above-1.4m": [1_400_000, 2_000_000],
};

const UNIT_TO_ROW: Record<string, number> = { studio: 0, "1br": 1, "2br": 2, "3br": 3 };

/** Pixxi enum: studio | 1 | 2 | 3 | 4 | 5 | 6 | 7+ */
const BEDROOMS: Record<string, string> = {
  studio: "studio",
  "1br": "1",
  "2br": "2",
  "3br": "3",
};

/** Pixxi enum: investor | homebuyer. "End User" is not a member and is dropped. */
const BUYER_TYPE: Record<string, string> = {
  live: "homebuyer",
  invest: "investor",
  both: "investor",
};

export interface PixxiFields {
  budget?: string;
  bedrooms?: string;
  preferredSize?: string;
  propertyType?: string;
  projectType?: string;
  buyerType?: string;
  furnishing?: string;
  preferredDeveloper?: string;
}

export interface PixxiProjectFacts {
  units: UnitRow[];
  /**
   * Developer NAME. The published spec says `preferredDeveloper` takes
   * comma-separated developer IDs, but the live endpoint rejects IDs
   * ("Error parsing preferred developer: 451") and accepts the name.
   */
  developer: string;
}

export function mapToPixxiFields(answers: LeadAnswers, project: PixxiProjectFacts): PixxiFields {
  const fields: PixxiFields = {
    // Facts of the project itself, true for every lead on these pages.
    propertyType: "Apartment",
    projectType: "off_plan",
    // `furnishing` is a lead PREFERENCE with enum furnished|unfurnished|any.
    // These projects are semi-furnished, which is not a member, and we never
    // ask the lead their preference, so sending anything here would be a
    // guess. The project's actual finish goes in extraData instead.
    preferredDeveloper: project.developer,
  };

  const row = answers.unit ? UNIT_TO_ROW[answers.unit] : undefined;
  const unit = row !== undefined ? project.units[row] : undefined;

  if (answers.unit && BEDROOMS[answers.unit]) fields.bedrooms = BEDROOMS[answers.unit];

  if (unit) {
    fields.preferredSize = numericRange(unit.sqftFrom, unit.sqftTo);
  }

  // Prefer the price band of the unit they picked; it is tighter and truer than
  // the budget bucket. Fall back to the bucket when they chose "not sure".
  if (unit) {
    fields.budget = numericRange(unit.priceFrom, unit.priceTo);
  } else if (answers.budget && BUDGET_RANGES[answers.budget]) {
    const [min, max] = BUDGET_RANGES[answers.budget];
    fields.budget = numericRange(min, max);
  }

  if (answers.purpose && BUYER_TYPE[answers.purpose]) {
    fields.buyerType = BUYER_TYPE[answers.purpose];
  }

  return fields;
}

const LABELS: Record<string, string> = {
  "30-days": "Within 30 days",
  "1-3-months": "1 to 3 months",
  "3-6-months": "3 to 6 months",
  researching: "Just researching",
  "main-reason": "Golden Visa is a main reason",
  bonus: "Golden Visa is a bonus",
  "not-important": "Golden Visa not important",
  "foreign-account": "Funds in a foreign-currency account outside Ethiopia",
  "family-abroad": "Family member abroad would transfer",
  "business-abroad": "Business holds earnings abroad",
  "birr-in-ethiopia": "Funds are in Ethiopia, in birr",
  "cash-ready": "Expects funds available at handover",
  mortgage: "Would mortgage the completed property",
  "sell-asset": "Would sell another asset",
  "need-monthly": "Needs monthly instalments instead — cannot fund the 60%",
  unsure: "Not sure yet",
};

const label = (v?: string) => (v ? LABELS[v] || v : undefined);

/**
 * Only what Pixxi has no native field for. Keep it short — an agent reads this
 * on a phone between calls.
 *
 * Must be an OBJECT of string values, and it is a REQUIRED field. Passing a
 * string here makes the endpoint answer HTTP 200 with `{code: 500}` in the
 * body and drop the lead entirely, which reads as success to any caller that
 * only checks the status code. Keys that match a Pixxi custom field title
 * populate that field; the rest land in the lead's activity log.
 */
export function buildExtraData(
  answers: LeadAnswers,
  score: number,
  tier: string,
  page: LandingPage | undefined,
  utm: Record<string, string> | undefined
): Record<string, string> {
  const campaign = `${utm?.utm_campaign || page?.meta.utmCampaign || "direct"}${
    utm?.utm_content ? ` / ${utm.utm_content}` : ""
  }`;

  const action =
    tier === "hot"
      ? "Call within 5 minutes."
      : tier === "warm"
        ? "Call or message within 5 minutes."
        : "Nurture only, do not spend agent time until they reply.";

  const entries: Array<[string, string | undefined]> = [
    ["Lead tier", `${tier.toUpperCase()} (score ${score})`],
    ["Action", action],
    ["Source", page ? page.pixxi.sourceLabel : "Landing page"],
    ["Project", page?.projectName],
    ["Campaign", campaign],
    ["Timeline", label(answers.timeline)],
    ["Golden Visa", label(answers.goldenVisa)],
    ["Funds", label(answers.funds)],
    ["Handover 60%", label(answers.handoverFunding)],
    ["Unit", answers.unit === "unsure" ? "Not sure yet, send everything" : undefined],
    [
      "Flag",
      answers.handoverFunding === "need-monthly" || answers.funds === "birr-in-ethiopia"
        ? "Not reported to Meta as a conversion: cannot fund the purchase as structured."
        : undefined,
    ],
  ];

  return Object.fromEntries(
    entries.filter((e): e is [string, string] => Boolean(e[1]))
  );
}
