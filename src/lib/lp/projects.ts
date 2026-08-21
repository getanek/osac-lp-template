/**
 * Every project that has landing pages, keyed by slug.
 *
 * The lead API resolves the posting project from this map, so a page can send
 * its own slug and get its own unit table, developer name and budget bands
 * without the route knowing anything about either project.
 */

import { ENCHANTE } from "./enchante";
import type { LpProject } from "./project";
import { VINCITORE } from "./vincitore-wellness-estate";

export const PROJECTS: Record<string, LpProject> = {
  [VINCITORE.slug]: VINCITORE,
  [ENCHANTE.slug]: ENCHANTE,
};

/** Used when a lead arrives with no slug, or one we do not recognise. */
export const DEFAULT_PROJECT = VINCITORE;

export { VINCITORE, ENCHANTE };
