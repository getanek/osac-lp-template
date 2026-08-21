import "server-only";

import { createHash } from "crypto";

/**
 * Meta Conversions API (server-side).
 *
 * Browser-only pixel events lose a meaningful share of conversions to iOS and
 * ad blockers, and the campaign plan depends on feeding Meta accurate lead and
 * qualified-lead signal — see output/osac/vincitore-wellness-estate/07-lead-quality.md
 * section 4. Every browser Lead event is mirrored here with the same event_id so
 * Meta deduplicates the pair.
 */

const GRAPH_VERSION = "v21.0";

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function normalisePhone(phone: string): string {
  return phone.replace(/[^0-9]/g, "");
}

export interface CapiUser {
  email?: string;
  phone?: string;
  country?: string;
  fbp?: string;
  fbc?: string;
  ip?: string;
  userAgent?: string;
}

export interface CapiEvent {
  /** Standard events plus any custom event name the pages emit. */
  eventName: "Lead" | "QualifiedLead" | "Contact" | "ViewContent" | "PageView" | (string & {});
  eventId: string;
  eventSourceUrl?: string;
  user: CapiUser;
  customData?: Record<string, string | number>;
}

export async function sendCapiEvent(event: CapiEvent): Promise<void> {
  const pixelId = process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;

  // No credentials configured yet — stay silent rather than breaking lead capture.
  if (!pixelId || !token) return;

  const userData: Record<string, string[] | string> = {};
  if (event.user.email) userData.em = [sha256(event.user.email.trim().toLowerCase())];
  if (event.user.phone) userData.ph = [sha256(normalisePhone(event.user.phone))];
  if (event.user.country) userData.country = [sha256(event.user.country.trim().toLowerCase())];
  if (event.user.fbp) userData.fbp = event.user.fbp;
  if (event.user.fbc) userData.fbc = event.user.fbc;
  if (event.user.ip) userData.client_ip_address = event.user.ip;
  if (event.user.userAgent) userData.client_user_agent = event.user.userAgent;

  const payload = {
    data: [
      {
        event_name: event.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        event_source_url: event.eventSourceUrl,
        action_source: "website",
        user_data: userData,
        custom_data: event.customData ?? {},
      },
    ],
    ...(process.env.META_TEST_EVENT_CODE
      ? { test_event_code: process.env.META_TEST_EVENT_CODE }
      : {}),
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      console.error("[capi] rejected", event.eventName, res.status, await res.text());
    }
  } catch (error) {
    // Never let a tracking failure cost us the lead.
    console.error("[capi] failed", event.eventName, error);
  }
}
