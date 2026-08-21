import { NextResponse } from "next/server";
import { sendCapiEvent } from "@/lib/lp/capi";
import { findLandingPage } from "@/lib/lp/registry";
import type { Lang, MarketId } from "@/lib/lp/markets";

/**
 * Server-side page events for the landing pages.
 *
 * The browser pixel is unreliable here: the GTM container ships no tags, and a
 * meaningful share of visitors run content blockers that kill fbevents.js
 * outright. This endpoint is same-origin, so it survives both — the page posts
 * the event to us and we forward it to Meta through the Conversions API with
 * the visitor's IP, user agent, fbp and fbc attached.
 *
 * Events carry the same eventId the browser pixel would use, so if fbevents
 * does load, Meta deduplicates the pair rather than counting twice.
 */

const ALLOWED = new Set([
  "PageView",
  "ViewContent",
  "Contact",
  "LeadFormStep",
  "ScrollHalf",
]);

interface EventBody {
  eventName?: string;
  eventId?: string;
  pageUrl?: string;
  project?: string;
  market?: string;
  lang?: string;
  fbp?: string;
  fbc?: string;
  custom?: Record<string, string | number>;
}

/**
 * Health check. Reports whether the deployment can actually reach Meta, without
 * exposing the token — POST returning ok:true says nothing, because a missing
 * token makes sendCapiEvent no-op silently on purpose.
 */
export async function GET() {
  const token = process.env.META_CAPI_TOKEN;
  const pixel = process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return NextResponse.json({
    capiConfigured: Boolean(token && pixel),
    pixelId: pixel ?? null,
    tokenPresent: Boolean(token),
    tokenLength: token ? token.length : 0,
    testEventCode: process.env.META_TEST_EVENT_CODE ? "set" : null,
    ornConfigured: Boolean(process.env.NEXT_PUBLIC_OSAC_ORN),
    permitConfigured: Boolean(process.env.NEXT_PUBLIC_VWE_PERMIT),
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as EventBody;
    const eventName = body.eventName;

    if (!eventName || !ALLOWED.has(eventName)) {
      return NextResponse.json({ error: "Unsupported event" }, { status: 400 });
    }

    const page = body.project
      ? findLandingPage(body.project, body.market as MarketId, (body.lang || "en") as Lang)
      : undefined;

    const forwardedFor = request.headers.get("x-forwarded-for");

    await sendCapiEvent({
      eventName,
      eventId: body.eventId || `lp-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      eventSourceUrl: body.pageUrl,
      user: {
        fbp: body.fbp,
        fbc: body.fbc,
        ip: forwardedFor?.split(",")[0]?.trim(),
        userAgent: request.headers.get("user-agent") || undefined,
      },
      customData: {
        ...(page ? { content_name: page.project, landing_page: page.slug } : {}),
        ...(body.custom || {}),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[lp-events] error", error);
    // Never surface tracking failures to the visitor.
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
