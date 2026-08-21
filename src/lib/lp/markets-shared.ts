/**
 * Market content shape and the answers that are true of any Dubai off-plan
 * purchase, regardless of project.
 *
 * One page per market, not one page with a language switch. The hook, the
 * currency, the objections and the compliance framing all differ by market —
 * see output/osac/vincitore-wellness-estate/05-geo-playbook.md. The Ethiopian
 * page additionally carries the funds-source question, which is the entire
 * qualification strategy for that market.
 *
 * Kept apart from markets.ts because the per-project market modules import
 * these, and markets.ts imports the per-project modules. Sharing one file for
 * both ends produces a circular import that only fails at runtime, during
 * Next's page-data collection, with a TDZ error that names nothing useful.
 */

import { AED_PER_USD } from "./project";

export type MarketId = "europe" | "india" | "ethiopia" | "germany" | "canada";
export type Lang = "en" | "am" | "ar";

export interface MarketFaq {
  q: string;
  a: string;
}

export interface MarketContent {
  flag: string;
  eyebrow: string;
  h1: string;
  sub: string;
  /** Four value props under the hero, baseline pattern. */
  props: string[];
  /** Numbered 01–04 section. */
  why: { title: string; body: string }[];
  faqs: MarketFaq[];
  /** Sits directly under the hero form. Market-specific reassurance. */
  disclaimer: string;
}

export interface Market {
  id: MarketId;
  path: string;
  /**
   * Country dialling code for this market. The field is prefilled with it and
   * validation requires it: a number typed in local format is uncallable from
   * Dubai, and hashes to something Meta can never match on.
   */
  dialCode: string;
  /** Show a converted price alongside AED. */
  secondaryCurrency?: { code: "USD"; perAed: number };
  /** Ethiopia only: the funds-source step. */
  asksFundsSource: boolean;
  metaTitle: string;
  metaDescription: string;
  en: MarketContent;
  am?: MarketContent;
  ar?: MarketContent;
}

export const USD = { code: "USD" as const, perAed: 1 / AED_PER_USD };

/* ── shared, market-neutral answers ───────────────────────── */

export function faqOwnership(projectName: string): MarketFaq {
  return {
    q: "Can foreigners legally own property in Dubai?",
    a: `Yes. ${projectName} is in a freehold zone, which means full foreign ownership with the title deed registered in your own name at the Dubai Land Department. There is no requirement to be a UAE resident.`,
  };
}

export const FAQ_REMOTE: MarketFaq = {
  q: "Do I have to fly to Dubai to buy?",
  a: "No. The purchase can be completed remotely by power of attorney, with digital signing and remote identity verification. Most of our overseas buyers see the property in person for the first time after handover.",
};

export const FAQ_ESCROW: MarketFaq = {
  q: "Where does my money actually go before handover?",
  a: "Into the project's escrow account, which is regulated by the Dubai Land Department under UAE off-plan law. Instalments are released to the developer against verified construction progress, not paid to them directly on booking.",
};

export const FAQ_VISA: MarketFaq = {
  q: "Can this support a UAE Golden Visa application?",
  a: "Property investment of AED 2,000,000 or more can support a 10-year Golden Visa application. Every three-bedroom residence here is above that threshold. Eligibility is determined by UAE authorities for the specific buyer and property, and we confirm it in writing before you commit.",
};

/** Where nothing in the project reaches AED 2M, say so rather than dodge it. */
export const FAQ_NO_VISA: MarketFaq = {
  q: "Does this qualify for the UAE Golden Visa?",
  a: "No. The Golden Visa threshold is a property investment of AED 2,000,000 and the largest apartment here is AED 1,375,000. If a 10-year visa is your main reason for buying, tell the advisor on the call and they will show you projects that clear the threshold instead of selling you one that does not.",
};

export function faqReturns(serviceCharge: number, handoverYear: number): MarketFaq {
  return {
    q: "What returns should I realistically expect?",
    a: `We do not quote a headline yield. Rental performance depends on the specific unit, the handover market in ${handoverYear}, service charges at AED ${serviceCharge} per sqft, vacancy and management costs. We will model those against a specific unit with you rather than give you a number that sells but does not hold.`,
  };
}

export const FAQ_DEVELOPER_GRID: MarketFaq = {
  q: "Who is Grid Properties?",
  a: "A UAE developer founded in 2019, based at The Opus by Omniyat in Business Bay. Smaller than the names you will have heard of, which is part of why the price per square foot is roughly fifteen per cent under the Arjan average. Your protection is structural rather than reputational: instalments go into a Dubai Land Department regulated escrow account and are released against verified construction progress.",
};

