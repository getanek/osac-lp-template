import type { MarketId } from "./markets";

/**
 * Social proof for the landing pages.
 *
 * Rule for this file: nothing invented. Testimonials ship empty and the section
 * does not render until real, attributable quotes are added — a fabricated
 * testimonial on a page asking overseas buyers to wire six figures is not a
 * growth tactic, it is fraud.
 *
 * Developer track records live on the project (see LpProject.trackRecord),
 * because they differ per developer and Grid's has not been verified.
 */

export interface Testimonial {
  quote: string;
  name: string;
  /** e.g. "Bought a 2 bedroom, 2024" */
  detail: string;
  market?: MarketId;
}

/**
 * EMPTY BY DESIGN. Add only real quotes with the buyer's permission — ideally
 * from the same market as the page. The section renders nothing until then.
 */
export const TESTIMONIALS: Testimonial[] = [];

export function testimonialsFor(market: MarketId): Testimonial[] {
  const matching = TESTIMONIALS.filter((x) => x.market === market);
  return matching.length ? matching : TESTIMONIALS.filter((x) => !x.market);
}
