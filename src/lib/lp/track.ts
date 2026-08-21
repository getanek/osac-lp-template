/**
 * Client-side tracking helper for the landing pages.
 *
 * Sends every event twice on purpose: once through the browser pixel when it
 * exists, and once to our own /api/lp-events, which forwards it to Meta
 * server-side. Both carry the same eventId, so Meta deduplicates. When a
 * content blocker kills fbevents.js — or while the GTM container still ships no
 * tags — the server copy is the only one that arrives, and it is enough.
 */

export interface TrackContext {
  project: string;
  market: string;
  lang: string;
}

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match?.[2];
}

export function newEventId(prefix = "lp"): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function trackEvent(
  eventName: string,
  ctx: TrackContext,
  custom?: Record<string, string | number>,
  eventId = newEventId()
): void {
  if (typeof window === "undefined") return;

  const standard = ["PageView", "ViewContent", "Contact", "Lead"].includes(eventName);
  if (standard) {
    window.fbq?.("track", eventName, custom, { eventID: eventId });
  } else {
    window.fbq?.("trackCustom", eventName, custom, { eventID: eventId });
  }

  const payload = JSON.stringify({
    eventName,
    eventId,
    pageUrl: window.location.href,
    project: ctx.project,
    market: ctx.market,
    lang: ctx.lang,
    fbp: readCookie("_fbp"),
    fbc: readCookie("_fbc"),
    custom,
  });

  // keepalive so the request survives the page being closed on an outbound
  // WhatsApp click, which is exactly when Contact fires.
  try {
    void fetch("/api/lp-events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    });
  } catch {
    // Tracking must never break the page.
  }
}
