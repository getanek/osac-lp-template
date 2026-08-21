/**
 * Vincitore Wellness Estate — landing page data.
 *
 * Source: Geniemap project 6235 (scraped 2026-06-02). Prices are indicative and
 * must be re-confirmed with the developer before being quoted to a client.
 *
 * Imagery: renders were re-encoded to max 1920px webp (68MB to 14MB). The full
 * set lives in public/lp/vincitore/renders; only the picks below are used.
 * Developer brochures and the floor-plan PDF are deliberately not in public/,
 * they are the gated deliverable an advisor sends after the enquiry.
 */

import type { LpProject, PaymentPlan, UnitRow } from "./project";

export const AED_PER_USD = 3.6725;

const DLD_RATE = 0.04;
const ADMIN_FEE = 3600;

/** 20% + 4% DLD + AED 3,600 admin. */
function booking(price: number) {
  return Math.round((price * 0.2 + price * DLD_RATE + ADMIN_FEE) / 100) * 100;
}

const UNITS: UnitRow[] = [
  {
    type: "Studio",
    sqftFrom: 405,
    sqftTo: 452,
    priceFrom: 800_000,
    priceTo: 966_000,
    bookingFrom: booking(800_000),
    monthlyFrom: 8_000,
    goldenVisa: "no",
  },
  {
    type: "1 Bedroom",
    sqftFrom: 654,
    sqftTo: 808,
    priceFrom: 1_242_000,
    priceTo: 1_547_000,
    bookingFrom: booking(1_242_000),
    monthlyFrom: 12_420,
    goldenVisa: "no",
  },
  {
    type: "2 Bedroom",
    sqftFrom: 1057,
    sqftTo: 1396,
    priceFrom: 1_762_000,
    priceTo: 2_295_000,
    bookingFrom: booking(1_762_000),
    monthlyFrom: 17_620,
    goldenVisa: "upper-units",
  },
  {
    type: "3 Bedroom",
    sqftFrom: 2290,
    sqftTo: 2290,
    priceFrom: 3_233_000,
    priceTo: 3_487_000,
    bookingFrom: booking(3_233_000),
    monthlyFrom: 32_330,
    goldenVisa: "yes",
  },
];

export const PRICE_FROM = UNITS[0].priceFrom;

/** Three plans only. Five causes decision fatigue; agents hold the rest. */
const PAYMENT_PLANS: PaymentPlan[] = [
  {
    id: "low-entry",
    name: "Lowest entry",
    pitch: "Start with 10%",
    rows: [
      { label: "10% + 4% DLD + AED 3,600 admin", when: "On booking" },
      { label: "10%", when: "1 month after booking" },
      { label: "20%", when: "6 months after booking" },
      { label: "20%", when: "12 months after booking" },
      { label: "40%", when: "On handover" },
    ],
  },
  {
    id: "one-percent",
    name: "1% monthly",
    pitch: "Pay from income, not savings",
    rows: [
      { label: "20% + 4% DLD + AED 3,600 admin", when: "On booking" },
      { label: "36% at 1% monthly", when: "July 2026 to June 2029" },
      { label: "8%", when: "On handover" },
      { label: "36% at 1% monthly", when: "36 months after handover" },
    ],
  },
  {
    id: "dld-waiver",
    name: "2% DLD waiver",
    pitch: "Developer covers half the transfer fee",
    rows: [
      { label: "20% + 2% DLD only + AED 3,600 admin", when: "On booking" },
      { label: "3% quarterly, ten instalments", when: "Sep 2026 to Dec 2028" },
      { label: "50%", when: "On handover" },
    ],
  },
];

const R = "/lp/vincitore/renders";

export const UNIT_OPTIONS = [
  { value: "studio", label: "Studio — AED 800K to 966K" },
  { value: "1br", label: "1 Bedroom — AED 1.24M to 1.55M" },
  { value: "2br", label: "2 Bedroom — AED 1.76M to 2.30M" },
  { value: "3br", label: "3 Bedroom — AED 3.23M to 3.49M" },
  { value: "unsure", label: "Not sure yet, send me everything" },
] as const;

export const BUDGET_OPTIONS = [
  { value: "under-1m", label: "Under AED 1M" },
  { value: "1m-2m", label: "AED 1M to 2M" },
  { value: "2m-3.5m", label: "AED 2M to 3.5M" },
  { value: "above-3.5m", label: "Above AED 3.5M" },
] as const;

export const VINCITORE: LpProject = {
  slug: "vincitore-wellness-estate",
  name: "Vincitore Wellness Estate",
  developer: "Vincitore Real Estate Development",
  community: "Majan, Dubailand",
  city: "Dubai",
  ownership: "Freehold",
  finish: "Semi-furnished with kitchen appliances",
  serviceCharge: 16,
  coords: { lat: 25.085527574004, lng: 55.313307780502 },
  handover: { label: "Q2 2029", detail: "30 June" },

  units: UNITS,
  paymentPlans: PAYMENT_PLANS,

  amenities: [
    "Private pool in every residence",
    "Hydrotherapy areas",
    "Salt room",
    "Steam room",
    "Yoga studio",
    "Meditation zone",
    "Zen garden",
    "Bamboo forest walk",
    "Hanging park",
    "Clubhouse",
    "Shared gym & fitness",
    "Shared jacuzzi",
    "Climbing wall",
    "Multipurpose sports courts",
    "Coworking zone",
    "Library",
    "Lounge",
    "BBQ areas",
    "Landscaped gardens",
    "Walking paths",
    "Fountain",
  ],

  driveTimes: [
    { minutes: 5, place: "Miracle Garden & Butterfly Garden" },
    { minutes: 7, place: "Global Village" },
    { minutes: 10, place: "Mall of the Emirates" },
    { minutes: 15, place: "Downtown Dubai & Burj Khalifa" },
  ],

  media: {
    hero: {
      src: `${R}/render-11.webp`,
      alt: "Private terrace pool at Vincitore Wellness Estate with the Dubai skyline beyond",
    },
    facade: {
      src: `${R}/render-06.webp`,
      alt: "Vincitore Wellness Estate tower facade, Majan, Dubai",
    },
    gallery: [
      {
        src: `${R}/render-11.webp`,
        alt: "Private pool on a residence terrace",
        caption: "A private pool on your own terrace",
      },
      {
        src: `${R}/render-15.webp`,
        alt: "Landscaped lagoon pool with waterfall and planting",
        caption: "The lagoon and waterfall gardens",
      },
      {
        src: `${R}/render-22.webp`,
        alt: "Hydrotherapy pool in a stone-clad spa interior",
        caption: "Hydrotherapy suite",
      },
      {
        src: `${R}/render-30.webp`,
        alt: "Salt room with warm red lighting and tiered seating",
        caption: "Salt room and steam",
      },
      {
        src: `${R}/render-05.webp`,
        alt: "Bedroom interior with gold detailing and garden view",
        caption: "Interiors in neutral tones and gold",
      },
      {
        src: `${R}/render-23.webp`,
        alt: "Living room with floor to ceiling glazing",
        caption: "Semi-furnished living spaces",
      },
      {
        src: `${R}/render-16.webp`,
        alt: "Library and coworking room with timber shelving",
        caption: "Library and coworking",
      },
      {
        src: `${R}/render-33.webp`,
        alt: "Colonnaded pool terrace with planting",
        caption: "Colonnade pool terrace",
      },
    ],
    floorPlans: [
      { type: "Studio", src: "/lp/vincitore/plans/studio-1.webp" },
      { type: "1 Bedroom", src: "/lp/vincitore/plans/1br-2.webp" },
      { type: "2 Bedroom", src: "/lp/vincitore/plans/2br-4.webp" },
      { type: "3 Bedroom", src: "/lp/vincitore/plans/3br-6.webp" },
    ],
    permitQr: "/lp/vincitore/trakheesi-qr.png",
  },

  goldenVisa: { threshold: 2_000_000, applicable: true },

  // The three-bedroom leads: it clears the Golden Visa threshold, and it is how
  // the desk reaches AED 10M on fewer transactions.
  featuredUnitIndex: 3,
  planShorthand: "20 / 80",
  planShorthandNote: "1% monthly",

  options: { unit: UNIT_OPTIONS, budget: BUDGET_OPTIONS },

  /**
   * Vincitore's Dubai delivery history. Palacio, Benessere and Volare are handed
   * over; the rest are in construction. Independently checkable against Dubai
   * Land Department records, which is the point of showing it.
   */
  trackRecord: {
    title: "Vincitore has been delivering in Dubai since 2018",
    sub: "{delivered} completed projects handed over, and three more in construction. You can verify every one of them with the Dubai Land Department.",
    items: [
      { name: "Palacio", community: "Arjan", year: "2018", status: "Delivered" },
      { name: "Benessere", community: "Arjan", year: "2023", status: "Delivered" },
      { name: "Volare", community: "Arjan", year: "2025", status: "Delivered" },
      { name: "Dolce Vita", community: "Arjan", year: "2027", status: "Under construction" },
      {
        name: "Aqua Dimore",
        community: "Dubai Science Park",
        year: "2027",
        status: "Under construction",
      },
      {
        name: "Aqua Flora",
        community: "Dubai Science Park",
        year: "2027",
        status: "Under construction",
      },
    ],
  },

  /**
   * Arabic answer labels.
   *
   * The shared Arabic copy in copy.ts was written when Arabic was an
   * Enchanté-only language, so its `labels` map carries Enchanté's unit and
   * budget bands. Those keys collide with ours at different prices — `studio`
   * is AED 622K there and AED 800K here — and our `3br` and Golden Visa answers
   * do not exist there at all. Without this override the Arabic page renders
   * English option labels and, worse, Enchanté's prices.
   *
   * MarketPage merges shallowly (`{...COPY[lang], ...p.copy[lang]}`), so this
   * REPLACES the whole labels map rather than merging into it. Every key the
   * form can render has to be present here, not just the ones that differ.
   */
  copy: {
    ar: {
      labels: {
        // unit
        studio: "استوديو — من 800 إلى 966 ألف درهم",
        "1br": "غرفة نوم واحدة — من 1.24 إلى 1.55 مليون درهم",
        "2br": "غرفتا نوم — من 1.76 إلى 2.30 مليون درهم",
        "3br": "ثلاث غرف نوم — من 3.23 إلى 3.49 مليون درهم",
        unsure: "لم أقرر بعد، أرسلوا لي كل شيء",
        // budget
        "under-1m": "أقل من مليون درهم",
        "1m-2m": "من مليون إلى مليونَي درهم",
        "2m-3.5m": "من مليونين إلى 3.5 مليون درهم",
        "above-3.5m": "أكثر من 3.5 مليون درهم",
        // timeline
        "30-days": "خلال 30 يوماً",
        "1-3-months": "من شهر إلى ثلاثة أشهر",
        "3-6-months": "من ثلاثة إلى ستة أشهر",
        researching: "أستطلع فقط",
        // purpose
        live: "للسكن",
        invest: "للاستثمار أو التأجير",
        both: "كلاهما",
        // golden visa — applicable here, unlike Enchanté
        "main-reason": "نعم، وهو سببي الرئيسي",
        bonus: "نعم، كميزة إضافية",
        "not-important": "غير مهم بالنسبة لي",
        // location
        india: "الهند",
        europe: "بريطانيا أو أوروبا",
        ethiopia: "إثيوبيا",
        "uae-gcc": "الإمارات أو دول الخليج",
        other: "مكان آخر",
      },
    },
  },

  schemaDescription:
    "Off-plan wellness residences in Majan, Dubai. A private pool in every home, studios to three bedrooms, handover June 2029.",
};

export const PROJECT = VINCITORE;
export { UNITS, PAYMENT_PLANS };
export { fmtAED } from "./project";
