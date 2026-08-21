"use client";

import type { LpCopy } from "@/lib/lp/copy";
import { trackEvent, type TrackContext } from "@/lib/lp/track";

interface Props {
  t: LpCopy;
  ctx: TrackContext;
}

/**
 * One CTA, pointing at the form. There is no messaging shortcut: a landing page
 * with two competing actions splits intent, and the qualifying steps are what
 * make a lead worth an agent's five minutes.
 */
export function StickyBar({ t, ctx }: Props) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line-strong bg-paper-card/95 backdrop-blur md:hidden">
      <div className="p-3">
        <a
          href="#lead-form"
          onClick={() => trackEvent("ViewContent", ctx, { section: "sticky_cta" })}
          className="flex items-center justify-center rounded-lg bg-ink py-3.5 text-[12px] font-semibold uppercase tracking-[1.5px] text-white"
        >
          {t.ctaPrimary}
        </a>
      </div>
    </div>
  );
}
