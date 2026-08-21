/**
 * Landing page registry — one record per live landing page.
 *
 * Every page has its own Pixxi form, its own Meta campaign and its own
 * targeting, so nothing here is global. Adding a landing page means adding one
 * entry below; the lead API, the UTM contract and the reporting all key off it.
 *
 * Fill the TODO fields before a page takes paid traffic. Anything still marked
 * TODO is picked up by `npm run lp:check` (scripts/check-lp-registry.ts) and
 * listed in output/osac/vincitore-wellness-estate/08-landing-page-registry.md.
 */

import type { Lang, MarketId } from "./markets";

export type LpStatus = "draft" | "ready" | "live" | "paused";

export interface PixxiBinding {
  /**
   * Pixxi form ID this page submits to. One form per landing page so the CRM
   * can report source without parsing notes. Overridable by env for rotation:
   * PIXXI_FORM_ID_<ENV_KEY>, then PIXXI_FORM_ID as a last resort.
   */
  formId: string | null;
  /** Suffix for the env override, e.g. VWE_INDIA -> PIXXI_FORM_ID_VWE_INDIA. */
  envKey: string;
  /** Name to give the form inside Pixxi, so the CRM list is self-describing. */
  formName: string;
  /** Written into the Pixxi lead so agents see the origin at a glance. */
  sourceLabel: string;
}

export interface MetaBinding {
  /** Campaign name in Ads Manager. Keep identical to the string used here. */
  campaignName: string;
  /** Ad set names expected to point at this page. */
  adSets: string[];
  /** utm_campaign value. Must match what the ad URLs actually carry. */
  utmCampaign: string;
  /** Optional per-page pixel. Falls back to NEXT_PUBLIC_META_PIXEL_ID. */
  pixelId?: string;
}

export interface TargetingBinding {
  /** Countries the ad sets target, ISO-3166 alpha-2. */
  countries: string[];
  /** Cities to emphasise, free text as entered in Ads Manager. */
  cities: string[];
  ageMin: number;
  ageMax: number;
  /** Primary language of the creative pointing here. */
  creativeLanguage: string;
  /** Monthly media budget in AED allocated to this page. */
  monthlyBudgetAed: number;
  /** Expected cost per lead in AED — used to flag drift in reporting. */
  targetCplAed: [number, number];
}

export interface ComplianceBinding {
  /**
   * Trakheesi listing number — what a Dubai property ad must display as its
   * permit number. Verifiable on the DLD permit card at `permitQrUrl`.
   */
  trakheesiPermit: string | null;
  /** Broker ORN. Same across pages unless a sister company runs one. */
  orn: string | null;
  /** DLD validation link behind the permit QR code. */
  permitQrUrl?: string;
  /** Permit expiry. Ads must stop or the permit be renewed by this date. */
  permitExpires?: string;
}

export interface LandingPage {
  /** Stable key. Used in UTMs, CRM labels and reporting joins. */
  slug: string;
  path: string;
  project: string;
  projectName: string;
  market: MarketId;
  lang: Lang;
  status: LpStatus;
  pixxi: PixxiBinding;
  meta: MetaBinding;
  targeting: TargetingBinding;
  compliance: ComplianceBinding;
  /** Free notes for the desk — anything a new agent would need to know cold. */
  notes?: string;
}

/* ── live pages ────────────────────────────────────────────── */

const VWE = {
  project: "vincitore-wellness-estate",
  projectName: "Vincitore Wellness Estate",
};

/**
 * "OSAC WEB PIXEL", dataset REPLACE_WITH_PIXEL_ID, on ad account REPLACE_WITH_AD_ACCOUNT_ID
 * (OSAC Properties Lead Gen). Set per page rather than only in env so the
 * binding is version-controlled and a future project can point at its own pixel
 * without touching deploy config.
 */
const OSAC_PIXEL = "REPLACE_WITH_PIXEL_ID";

/**
 * Trakheesi permit for Vincitore Wellness Estate, issued to OSAC PROPERTIES
 * L.L.C (DED licence REDACTED), transaction REDACTED, project number REDACTED.
 * Expires 3 January 2027 — ads must stop or the permit be renewed by then.
 */
const VWE_COMPLIANCE = {
  trakheesiPermit: "REPLACE_WITH_TRAKHEESI_PERMIT",
  orn: "REPLACE_WITH_ORN", // OSAC Properties LLC — as published on osacproperties.com property pages
  permitQrUrl:
    "https://trakheesi.dubailand.gov.ae/rev/madmoun/listing/validation?khevJujtDig=4CRUUQ6R7Z9OKNFJD1WBVYTSXYPSASHPRBYWBJATVQKJPCYRW",
  permitExpires: "2027-01-03",
};

const ENCHANTE_PROJECT = {
  project: "enchante",
  projectName: "Enchanté by Grid Properties",
};

/**
 * Enchanté's Trakheesi permit, read off the DLD validation card behind the QR
 * (2026-08-09): listing number REPLACE_WITH_TRAKHEESI_PERMIT, transaction REDACTED, issued to OSAC
 * PROPERTIES L.L.C (licence REDACTED), project "Enchante By GRID" (no. 4460),
 * end date 03/01/2027.
 */
const ENCHANTE_COMPLIANCE = {
  trakheesiPermit: "REPLACE_WITH_TRAKHEESI_PERMIT",
  orn: "REPLACE_WITH_ORN", // OSAC Properties LLC — as published on osacproperties.com property pages
  permitQrUrl:
    "https://trakheesi.dubailand.gov.ae/rev/madmoun/listing/validation?khevJujtDig=XTE6T5OR56YGUQW5M37IVBHQBR7ZBZHK0KYAUAOREOPAFXPRC",
};

export const LANDING_PAGES: LandingPage[] = [
  {
    slug: "vwe-europe",
    path: "/lp/vincitore-wellness-estate/europe",
    ...VWE,
    market: "europe",
    lang: "en",
    status: "draft",
    pixxi: {
      formId: "REPLACE_WITH_PIXXI_FORM_ID",
      envKey: "VWE_EUROPE",
      formName: "OSAC | Vincitore Wellness Estate | Europe LP",
      sourceLabel: "LP Europe",
    },
    meta: {
      campaignName: "VWE | EUROPE | Leads",
      adSets: ["AS-EU1 UK", "AS-EU2 DE+NL+CH"],
      utmCampaign: "vwe_europe",
      pixelId: OSAC_PIXEL,
    },
    targeting: {
      countries: ["GB", "DE", "NL", "CH", "BE", "IE"],
      cities: ["London", "Manchester", "Birmingham", "Edinburgh"],
      ageMin: 33,
      ageMax: 60,
      creativeLanguage: "English",
      monthlyBudgetAed: 20000,
      targetCplAed: [90, 160],
    },
    compliance: VWE_COMPLIANCE,
    notes:
      "Golden Visa and the tax position lead. Highest ticket of the three markets; push 2BR/3BR.",
  },

  {
    slug: "vwe-india",
    path: "/lp/vincitore-wellness-estate/india",
    ...VWE,
    market: "india",
    lang: "en",
    status: "draft",
    pixxi: {
      formId: "REPLACE_WITH_PIXXI_FORM_ID",
      envKey: "VWE_INDIA",
      formName: "OSAC | Vincitore Wellness Estate | India LP",
      sourceLabel: "LP India",
    },
    meta: {
      campaignName: "VWE | INDIA | Leads",
      adSets: ["AS-IN1 India English"],
      utmCampaign: "vwe_india",
      pixelId: OSAC_PIXEL,
    },
    targeting: {
      countries: ["IN"],
      /**
       * Tier-2 rather than the metros, +40km radius on each. Every Dubai
       * developer bids on Mumbai and Delhi, so CPMs there are bid up by
       * competitors selling the same thing. These cities carry business-owner
       * wealth with far less auction competition.
       */
      cities: [
        "Bhubaneswar, Odisha",
        "Coimbatore, Tamil Nadu",
        "Indore, Madhya Pradesh",
        "Lucknow, Uttar Pradesh",
        "Surat, Gujarat",
        "Visakhapatnam, Andhra Pradesh",
      ],
      ageMin: 30,
      ageMax: 55,
      creativeLanguage: "English",
      monthlyBudgetAed: 14000,
      targetCplAed: [35, 65],
    },
    compliance: VWE_COMPLIANCE,
    notes:
      "LRS is the hook: booking on a 3BR is ~USD 176k, inside one person's annual limit. Agents must be able to answer LRS and the 20% TCS calmly.",
  },

  {
    slug: "vwe-ethiopia",
    path: "/lp/vincitore-wellness-estate/ethiopia",
    ...VWE,
    market: "ethiopia",
    lang: "en",
    status: "draft",
    pixxi: {
      formId: "REPLACE_WITH_PIXXI_FORM_ID",
      envKey: "VWE_ETHIOPIA",
      formName: "OSAC | Vincitore Wellness Estate | Ethiopia LP (EN)",
      sourceLabel: "LP Ethiopia EN",
    },
    meta: {
      campaignName: "VWE | ETHIOPIA | Leads",
      adSets: ["AS-ET2 Addis English"],
      utmCampaign: "vwe_ethiopia",
      pixelId: OSAC_PIXEL,
    },
    targeting: {
      countries: ["ET"],
      cities: ["Addis Ababa"],
      ageMin: 30,
      ageMax: 60,
      creativeLanguage: "English",
      monthlyBudgetAed: 3000,
      targetCplAed: [8, 25],
    },
    compliance: VWE_COMPLIANCE,
    notes:
      "Hard budget cap. Judge on cost per FUNDABLE lead, not CPL — the funds-source step disqualifies birr-in-Ethiopia leads to nurture.",
  },

  {
    slug: "vwe-europe-ar",
    path: "/lp/vincitore-wellness-estate/europe/ar",
    ...VWE,
    market: "europe",
    lang: "ar",
    status: "draft",
    pixxi: {
      formId: "REPLACE_WITH_PIXXI_FORM_ID",
      envKey: "VWE_EUROPE_AR",
      formName: "OSAC | Vincitore Wellness Estate | Europe LP (AR)",
      sourceLabel: "LP Europe AR",
    },
    meta: {
      campaignName: "VWE | EUROPE | Leads",
      adSets: ["AS-EU2 UK Arabic"],
      utmCampaign: "vwe_europe_ar",
      pixelId: OSAC_PIXEL,
    },
    targeting: {
      countries: ["GB"],
      cities: ["London", "Manchester", "Birmingham"],
      ageMin: 33,
      ageMax: 60,
      creativeLanguage: "Arabic",
      monthlyBudgetAed: 4000,
      targetCplAed: [90, 160],
    },
    compliance: VWE_COMPLIANCE,
    notes:
      "Arabic-speaking buyers resident in Britain, not Gulf residents. Own Pixxi form so the Arabic creative is judged on its own conversion rather than blended into the English UK number. Arabic copy needs a native review before launch.",
  },
  {
    slug: "vwe-ethiopia-am",
    path: "/lp/vincitore-wellness-estate/ethiopia/am",
    ...VWE,
    market: "ethiopia",
    lang: "am",
    status: "draft",
    pixxi: {
      formId: "REPLACE_WITH_PIXXI_FORM_ID",
      envKey: "VWE_ETHIOPIA_AM",
      formName: "OSAC | Vincitore Wellness Estate | Ethiopia LP (AM)",
      sourceLabel: "LP Ethiopia AM",
    },
    meta: {
      campaignName: "VWE | ETHIOPIA | Leads",
      adSets: ["AS-ET1 Addis Amharic"],
      utmCampaign: "vwe_ethiopia_am",
      pixelId: OSAC_PIXEL,
    },
    targeting: {
      countries: ["ET"],
      cities: ["Addis Ababa"],
      ageMin: 30,
      ageMax: 60,
      creativeLanguage: "Amharic",
      monthlyBudgetAed: 3000,
      targetCplAed: [8, 25],
    },
    compliance: VWE_COMPLIANCE,
    notes:
      "Separate Pixxi form from the English page so Amharic creative can be judged on its own conversion, not blended. Amharic copy needs a native review before launch.",
  },
  /* ── Enchanté by Grid Properties, Arjan ──────────────────── */

  {
    slug: "enchante-europe",
    path: "/lp/enchante/europe",
    ...ENCHANTE_PROJECT,
    market: "europe",
    lang: "en",
    status: "draft",
    pixxi: {
      formId: "REPLACE_WITH_PIXXI_FORM_ID",
      envKey: "ENCHANTE_EUROPE",
      formName: "OSAC | Enchanté | Europe LP",
      sourceLabel: "LP Enchanté Europe",
    },
    meta: {
      campaignName: "ENCHANTE | EUROPE | Leads",
      adSets: ["AS-EU1 UK", "AS-EU2 DE+NL+CH"],
      utmCampaign: "enchante_europe",
      pixelId: OSAC_PIXEL,
    },
    targeting: {
      countries: ["GB", "DE", "NL", "CH", "BE", "IE"],
      cities: ["London", "Manchester", "Birmingham"],
      ageMin: 30,
      ageMax: 58,
      creativeLanguage: "English",
      monthlyBudgetAed: 6000,
      targetCplAed: [60, 120],
    },
    compliance: ENCHANTE_COMPLIANCE,
    notes:
      "Price-led, not visa-led. Nothing here clears AED 2M so the Golden Visa section does not render. Lead with the AED 92,100 booking figure.",
  },

  {
    slug: "enchante-india",
    path: "/lp/enchante/india",
    ...ENCHANTE_PROJECT,
    market: "india",
    lang: "en",
    status: "draft",
    pixxi: {
      formId: "REPLACE_WITH_PIXXI_FORM_ID",
      envKey: "ENCHANTE_INDIA",
      formName: "OSAC | Enchanté | India LP",
      sourceLabel: "LP Enchanté India",
    },
    meta: {
      campaignName: "ENCHANTE | INDIA | Leads",
      adSets: ["AS-IN1 Mumbai+Delhi", "AS-IN2 Blr+Hyd+Chn+Pune"],
      utmCampaign: "enchante_india",
      pixelId: OSAC_PIXEL,
    },
    targeting: {
      countries: ["IN"],
      cities: ["Mumbai", "Delhi NCR", "Bengaluru", "Hyderabad", "Chennai", "Pune"],
      ageMin: 28,
      ageMax: 52,
      creativeLanguage: "English",
      monthlyBudgetAed: 5000,
      targetCplAed: [25, 55],
    },
    compliance: ENCHANTE_COMPLIANCE,
    notes:
      "The whole apartment, not just the booking, fits inside one LRS year at about USD 169k. That is a stronger line here than on Vincitore.",
  },

  {
    slug: "enchante-germany",
    path: "/lp/enchante/germany",
    ...ENCHANTE_PROJECT,
    market: "germany",
    lang: "en",
    status: "draft",
    pixxi: {
      formId: "REPLACE_WITH_PIXXI_FORM_ID",
      envKey: "ENCHANTE_GERMANY",
      formName: "OSAC | Enchanté | Germany LP",
      sourceLabel: "LP Enchanté Germany",
    },
    meta: {
      campaignName: "ENCHANTE | GERMANY | Leads",
      adSets: ["AS-DE1 Arabic speakers"],
      utmCampaign: "enchante_germany",
      pixelId: OSAC_PIXEL,
    },
    targeting: {
      countries: ["DE"],
      cities: ["Berlin", "Hamburg", "Munich", "Frankfurt", "Cologne", "Düsseldorf"],
      ageMin: 30,
      ageMax: 58,
      creativeLanguage: "Arabic",
      monthlyBudgetAed: 4500,
      targetCplAed: [70, 140],
    },
    compliance: ENCHANTE_COMPLIANCE,
    notes:
      "Targeting is Arabic, the page is English, the call is Arabic. Ad creative must be Arabic or the audience will not self-identify. Tiger desk handles these.",
  },

  {
    slug: "enchante-canada",
    path: "/lp/enchante/canada",
    ...ENCHANTE_PROJECT,
    market: "canada",
    lang: "en",
    status: "draft",
    pixxi: {
      formId: "REPLACE_WITH_PIXXI_FORM_ID",
      envKey: "ENCHANTE_CANADA",
      formName: "OSAC | Enchanté | Canada LP",
      sourceLabel: "LP Enchanté Canada",
    },
    meta: {
      campaignName: "ENCHANTE | CANADA | Leads",
      adSets: ["AS-CA1 Arabic speakers"],
      utmCampaign: "enchante_canada",
      pixelId: OSAC_PIXEL,
    },
    targeting: {
      countries: ["CA"],
      cities: ["Toronto", "Montreal", "Ottawa", "Calgary", "Edmonton", "Vancouver"],
      ageMin: 30,
      ageMax: 58,
      creativeLanguage: "Arabic",
      monthlyBudgetAed: 4500,
      targetCplAed: [70, 140],
    },
    compliance: ENCHANTE_COMPLIANCE,
    notes:
      "Agents should expect the T1135 reporting question; the FAQ answers it without giving tax advice.",
  },

  {
    slug: "enchante-germany-ar",
    path: "/lp/enchante/germany/ar",
    ...ENCHANTE_PROJECT,
    market: "germany",
    lang: "ar",
    status: "draft",
    pixxi: {
      formId: "REPLACE_WITH_PIXXI_FORM_ID",
      envKey: "ENCHANTE_GERMANY_AR",
      formName: "OSAC | Enchanté | Germany LP (AR)",
      sourceLabel: "LP Enchanté Germany AR",
    },
    meta: {
      campaignName: "ENCHANTE | GERMANY | Leads",
      adSets: ["AS-DE1 Arabic speakers"],
      utmCampaign: "enchante_germany_ar",
      pixelId: OSAC_PIXEL,
    },
    targeting: {
      countries: ["DE"],
      cities: ["Berlin", "Hamburg", "Munich", "Frankfurt", "Cologne", "Düsseldorf"],
      ageMin: 30,
      ageMax: 58,
      creativeLanguage: "Arabic",
      monthlyBudgetAed: 4500,
      targetCplAed: [70, 140],
    },
    compliance: ENCHANTE_COMPLIANCE,
    notes:
      "Separate Pixxi form from the English page so Arabic creative is judged on its own conversion, not blended. ARABIC COPY IS UNREVIEWED: the Tiger desk must read it before this takes paid traffic. The page promises an Arabic-speaking advisor, so call routing has to honour that or the variant does more harm than the English one.",
  },

  {
    slug: "enchante-canada-ar",
    path: "/lp/enchante/canada/ar",
    ...ENCHANTE_PROJECT,
    market: "canada",
    lang: "ar",
    status: "draft",
    pixxi: {
      formId: "REPLACE_WITH_PIXXI_FORM_ID",
      envKey: "ENCHANTE_CANADA_AR",
      formName: "OSAC | Enchanté | Canada LP (AR)",
      sourceLabel: "LP Enchanté Canada AR",
    },
    meta: {
      campaignName: "ENCHANTE | CANADA | Leads",
      adSets: ["AS-CA1 Arabic speakers"],
      utmCampaign: "enchante_canada_ar",
      pixelId: OSAC_PIXEL,
    },
    targeting: {
      countries: ["CA"],
      cities: ["Toronto", "Montreal", "Ottawa", "Calgary", "Edmonton", "Vancouver"],
      ageMin: 30,
      ageMax: 58,
      creativeLanguage: "Arabic",
      monthlyBudgetAed: 4500,
      targetCplAed: [70, 140],
    },
    compliance: ENCHANTE_COMPLIANCE,
    notes: "Same as the German Arabic page. Unreviewed Arabic; Tiger desk to sign off before launch.",
  },
];

/* ── lookups ───────────────────────────────────────────────── */

export function getLandingPage(slug: string): LandingPage | undefined {
  return LANDING_PAGES.find((p) => p.slug === slug);
}

export function findLandingPage(
  project: string,
  market: MarketId,
  lang: Lang
): LandingPage | undefined {
  return LANDING_PAGES.find(
    (p) => p.project === project && p.market === market && p.lang === lang
  );
}

/**
 * Pixxi form for a page: env override first (rotation without a deploy), then
 * the registry value, then the legacy single-form env as a last resort so a
 * missing entry degrades to "lead still reaches the CRM".
 */
export function resolvePixxiFormId(page?: LandingPage): string | undefined {
  if (page) {
    const fromEnv = process.env[`PIXXI_FORM_ID_${page.pixxi.envKey}`];
    if (fromEnv) return fromEnv;
    if (page.pixxi.formId) return page.pixxi.formId;
  }
  const fallback = process.env.PIXXI_FORM_ID;
  return fallback && fallback !== "placeholder_replace_with_real_form_id"
    ? fallback
    : undefined;
}

/** Fields a page must have filled before it can take paid traffic. */
export function readinessGaps(page: LandingPage): string[] {
  const gaps: string[] = [];
  if (!resolvePixxiFormId(page)) gaps.push("pixxi.formId");
  if (!page.compliance.trakheesiPermit) gaps.push("compliance.trakheesiPermit");
  if (!page.compliance.orn) gaps.push("compliance.orn");
  if (!page.meta.pixelId && !process.env.NEXT_PUBLIC_META_PIXEL_ID) gaps.push("meta.pixelId");
  return gaps;
}
