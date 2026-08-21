/**
 * Enchanté by Grid Properties, Arjan. Landing page data.
 *
 * Source: Geniemap project 7663 with all 59 unit records (scraped 2026-06-02).
 * Prices are two months old at time of build and must be re-confirmed with Grid
 * before they are quoted to a client.
 *
 * Two things in the developer's own marketing are deliberately absent here
 * because the unit data does not support them: a "recording studio" amenity,
 * and a 20% down payment (the itemised plan starts at 10% and totals 100%).
 * See output/osac/enchante-grid/01-fact-sheet.md.
 *
 * Note there is no Golden Visa content anywhere in this project. The top unit
 * is AED 1,375,000 against a AED 2,000,000 threshold, so the section is omitted
 * rather than argued. Visa-driven buyers belong on Vincitore.
 */

import type { LpProject, PaymentPlan, UnitRow } from "./project";

const DLD_RATE = 0.04;
const ADMIN_FEE = 5000;

/** 10% + 4% DLD + AED 5,000 admin. */
function booking(price: number) {
  return Math.round((price * 0.1 + price * DLD_RATE + ADMIN_FEE) / 100) * 100;
}

const UNITS: UnitRow[] = [
  {
    type: "Studio",
    sqftFrom: 342,
    sqftTo: 427,
    priceFrom: 622_000,
    priceTo: 725_000,
    bookingFrom: booking(622_000),
    goldenVisa: "no",
  },
  {
    type: "1 Bedroom",
    sqftFrom: 541,
    sqftTo: 839,
    priceFrom: 888_000,
    priceTo: 1_195_000,
    bookingFrom: booking(888_000),
    goldenVisa: "no",
  },
  {
    type: "2 Bedroom",
    sqftFrom: 952,
    sqftTo: 973,
    priceFrom: 1_290_000,
    priceTo: 1_375_000,
    bookingFrom: booking(1_290_000),
    goldenVisa: "no",
  },
];

export const PRICE_FROM = UNITS[0].priceFrom;

/**
 * One plan, as issued. Only 40% falls due before handover, which is the honest
 * strength; the 60% on completion is the honest weakness and the copy says so
 * rather than dressing it as a monthly plan.
 */
const PAYMENT_PLANS: PaymentPlan[] = [
  {
    id: "standard",
    name: "40 / 60",
    pitch: "10% to book, 60% only on handover",
    rows: [
      { label: "10% + 4% DLD + AED 5,000 admin", when: "On booking" },
      { label: "10%", when: "Within 30 days" },
      { label: "10%", when: "April 2027" },
      { label: "10%", when: "April 2028" },
      { label: "60%", when: "On handover" },
    ],
  },
];

const R = "/lp/enchante/renders";

export const UNIT_OPTIONS = [
  { value: "studio", label: "Studio, AED 622K to 725K" },
  { value: "1br", label: "1 Bedroom, AED 888K to 1.20M" },
  { value: "2br", label: "2 Bedroom, AED 1.29M to 1.38M" },
  { value: "unsure", label: "Not sure yet, send me everything" },
] as const;

export const BUDGET_OPTIONS = [
  { value: "under-700k", label: "Under AED 700K" },
  { value: "700k-1m", label: "AED 700K to 1M" },
  { value: "1m-1.4m", label: "AED 1M to 1.4M" },
  { value: "above-1.4m", label: "Above AED 1.4M" },
] as const;

export const ENCHANTE: LpProject = {
  slug: "enchante",
  name: "Enchanté",
  developer: "Grid Properties",
  community: "Arjan, Dubailand",
  city: "Dubai",
  ownership: "Freehold",
  finish: "Semi-furnished with kitchen appliances",
  serviceCharge: 15,
  coords: { lat: 25.055813293822, lng: 55.233412283327 },
  handover: { label: "Q4 2028", detail: "13 December" },

  units: UNITS,
  paymentPlans: PAYMENT_PLANS,

  amenities: [
    "Temperature-controlled swimming pool",
    "Lagoon style swimming pool",
    "Pool deck",
    "Kids splash pad",
    "Open kids play area",
    "SPA",
    "Sauna",
    "Steam",
    "Shared gym & fitness",
    "Yoga area",
    "Meditation zone",
    "Jogging tracks",
    "Coworking zone",
    "Indoor multipurpose space",
    "Green lawn (dog park)",
    "Landscaped garden",
    "BBQ",
    "Social zone",
    "Leisure areas",
    "Recreational areas",
    "Resting areas",
    "Sitting area",
    "Dining outlets (coffee houses & restaurants)",
    "Lobby",
    "Lift",
    "Central A/C",
    "Security and CCTV",
  ],

  driveTimes: [
    { minutes: 2, place: "Miracle Garden & Butterfly Garden" },
    { minutes: 10, place: "Global Village" },
    { minutes: 12, place: "Dubai Hills Mall" },
    { minutes: 15, place: "Mall of the Emirates" },
  ],

  media: {
    hero: {
      src: `${R}/render-04.webp`,
      alt: "Enchanté by Grid Properties in Arjan, Dubai, at dusk",
    },
    facade: {
      src: `${R}/render-02.webp`,
      alt: "Enchanté residential building with landscaped grounds, Arjan, Dubai",
    },
    gallery: [
      {
        src: `${R}/render-01.webp`,
        alt: "Aerial view of the pool deck between the two wings of the building",
        caption: "The pool deck between the wings",
      },
      {
        src: `${R}/render-12.webp`,
        alt: "Lagoon style swimming pool surrounded by planting",
        caption: "Lagoon style, temperature-controlled pool",
      },
      {
        src: `${R}/render-21.webp`,
        alt: "Building lobby with a mature tree planted at its centre",
        caption: "The 50-year-old tree in the lobby",
      },
      {
        src: `${R}/render-08.webp`,
        alt: "Living and dining space with floor to ceiling glazing",
        caption: "Living spaces with panoramic windows",
      },
      {
        src: `${R}/render-10.webp`,
        alt: "Bedroom with built-in wardrobes and a warm natural palette",
        caption: "Bedrooms with built-in wardrobes",
      },
      {
        src: `${R}/render-14.webp`,
        alt: "Fitness room with cardio equipment along a glazed wall",
        caption: "Shared gym and fitness",
      },
      {
        src: `${R}/render-15.webp`,
        alt: "Yoga and stretching room with hanging swings",
        caption: "Yoga area and spa floor",
      },
      {
        src: `${R}/render-22.webp`,
        alt: "Coworking room with a long shared table and planting",
        caption: "Coworking zone",
      },
    ],
    floorPlans: [
      { type: "Studio", src: "/lp/enchante/plans/studio.webp" },
      { type: "1 Bedroom", src: "/lp/enchante/plans/1br.webp" },
      { type: "2 Bedroom", src: "/lp/enchante/plans/2br.webp" },
    ],
    permitQr: "/lp/enchante/trakheesi-qr.png",
  },

  // Nothing here reaches AED 2M, so the Golden Visa section does not render.
  goldenVisa: { threshold: 2_000_000, applicable: false },

  // The studio leads. "Under AED 100,000 to book a freehold Dubai home" is the
  // single most repeatable line in this campaign, and 18 of 59 units are studios.
  featuredUnitIndex: 0,
  planShorthand: "40 / 60",
  planShorthandNote: "10% to book",

  // The plan ends in 60% at handover, so how that gets covered decides whether
  // the sale is possible at all. It is this project's equivalent of the
  // Ethiopian funds-source question.
  asksHandoverFunding: true,

  options: { unit: UNIT_OPTIONS, budget: BUDGET_OPTIONS },

  // No trackRecord: Grid's delivery history has not been verified against Dubai
  // Land Department records, so the section does not render. Do not populate
  // this from the broker pack; check the completed projects first.

  /**
   * Every string here exists because the shared copy states a Vincitore fact:
   * a AED 3,600 admin fee, three payment plans, a three-bedroom layout, Majan,
   * Al Barari, a wellness resort, an AED 889,000 entry point. On this project
   * each of those is wrong, and wrong on a compliance-bearing page.
   */
  copy: {
    en: {
      pricesNote:
        "Booking figure includes the 4% Dubai Land Department fee and the AED 5,000 admin fee. Prices are indicative and subject to availability on the day.",
      plansTitle: "How the payment works",
      plansCta: "Ask an advisor about the schedule",
      amenitiesTitle: "Twenty-seven facilities inside the building",
      locationTitle: "Arjan is closer than people think",
      locationSub:
        "At the junction of Sheikh Mohammed Bin Zayed Road and Umm Suqeim Road, two minutes from Miracle Garden.",
      galleryTitle: "A building built around its courtyard",
      plansImagesSub:
        "Dimensioned plans for the studio, one and two bedroom apartments are sent with your shortlist.",
      whyOsacItems: [
        "Advisors who match an apartment to your budget, from the AED 622,000 entry point upward.",
        "Direct developer access to released inventory and payment plans, not portal listings.",
        "The whole purchase handled remotely: video walkthrough, paperwork, escrow, handover.",
        "Honest numbers before you commit: service charges, fees and exit costs, not a headline yield.",
      ],
    },
  },

  schemaDescription:
    "Off-plan apartments in Arjan, Dubai. Studios to two bedrooms from AED 622,000, semi-furnished, handover December 2028.",
};

export { UNITS, PAYMENT_PLANS };
