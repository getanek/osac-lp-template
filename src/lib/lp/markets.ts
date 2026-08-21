/**
 * Market lookup across projects.
 *
 * Content lives in markets-<project>.ts; shared shapes and answers live in
 * markets-shared.ts. This module only resolves one from the other.
 */

import type { Lang, Market, MarketContent, MarketId } from "./markets-shared";
import { VINCITORE_MARKETS } from "./markets-vincitore";
import { ENCHANTE_MARKETS } from "./markets-enchante";

export * from "./markets-shared";

export const MARKETS_BY_PROJECT: Record<string, Partial<Record<MarketId, Market>>> = {
  "vincitore-wellness-estate": VINCITORE_MARKETS,
  enchante: ENCHANTE_MARKETS,
};

/** Back-compat for anything still assuming the Vincitore market set. */
export const MARKETS = VINCITORE_MARKETS;

export function getMarket(projectSlug: string, marketId: MarketId): Market {
  const market = MARKETS_BY_PROJECT[projectSlug]?.[marketId];
  if (!market) {
    throw new Error(`No market content for ${projectSlug}/${marketId}`);
  }
  return market;
}

export const MARKET_IDS: MarketId[] = ["europe", "india", "ethiopia", "germany", "canada"];

export function marketContent(market: Market, lang: Lang): MarketContent {
  if (lang === "am" && market.am) return market.am;
  if (lang === "ar" && market.ar) return market.ar;
  return market.en;
}

export { toUsd } from "./project";
