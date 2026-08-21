import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { submitLead } from "@/lib/pixxi/leads";
import { sendCapiEvent } from "@/lib/lp/capi";
import {
  disqualifyReason,
  leadTier,
  scoreLead,
  type LeadAnswers,
} from "@/lib/lp/project";
import { PROJECTS, DEFAULT_PROJECT } from "@/lib/lp/projects";
import { findLandingPage, resolvePixxiFormId } from "@/lib/lp/registry";
import { buildExtraData, mapToPixxiFields } from "@/lib/lp/pixxi-map";
import type { Lang, MarketId } from "@/lib/lp/markets";

interface LpLeadBody extends LeadAnswers {
  name?: string;
  phone?: string;
  email?: string;
  project?: string;
  /** Landing page market, used to resolve the right Pixxi form. */
  market?: string;
  lang?: string;
  eventId?: string;
  fbp?: string;
  fbc?: string;
  utm?: Record<string, string>;
  pageUrl?: string;
}


/**
 * Config health check. Reports only whether each required binding is present,
 * never a value. Exists because a missing env var in the Hostinger build made
 * leads save to Supabase but silently never reach the CRM, which is invisible
 * from the browser and indistinguishable from success.
 */
export async function GET() {
  return NextResponse.json({
    ok: true,
    checks: {
      supabase: Boolean(
        (process.env.PORTAL_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL) &&
          (process.env.PORTAL_SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_KEY),
      ),
      pixxiToken: Boolean(process.env.PIXXI_API_TOKEN),
      capiToken: Boolean(process.env.META_CAPI_TOKEN),
      pixelId: Boolean(process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID),
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LpLeadBody;
    const { name, phone, email } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    const answers: LeadAnswers = {
      unit: body.unit,
      budget: body.budget,
      timeline: body.timeline,
      purpose: body.purpose,
      goldenVisa: body.goldenVisa,
      location: body.location,
      funds: body.funds,
      handoverFunding: body.handoverFunding,
    };

    const project = body.project || DEFAULT_PROJECT.slug;
    // Fall back rather than reject: an unknown slug must still cost us nothing.
    const lp = PROJECTS[project] ?? DEFAULT_PROJECT;

    // Budget bands differ per project, so "top band" is resolved from the
    // project's own options rather than hard-coded.
    const topBudgets = lp.options.budget.slice(-2).map((o) => o.value);
    const score = scoreLead(answers, { topBudgets });
    const tier = leadTier(score, answers);
    const disqualified = disqualifyReason(answers);
    const lang = (body.lang || "en") as Lang;

    // Each landing page has its own Pixxi form and its own campaign binding, so
    // the CRM can report by source without parsing note fields.
    const page = findLandingPage(project, (body.market || body.location) as MarketId, lang);

    // Normalise to E.164 before anything stores or hashes it. A local-format
    // number is uncallable from Dubai and unmatchable by Meta.
    const phoneE164 = `+${phone.replace(/[^0-9]/g, "")}`;

    // Persist first. Everything after this is best-effort and must never cost us the lead.
    const supabase = getSupabaseAdmin();
    const row = {
      project,
      lang,
      name,
      phone: phoneE164,
      email: email || null,
      unit_interest: answers.unit || null,
      budget: answers.budget || null,
      timeline: answers.timeline || null,
      purpose: answers.purpose || null,
      golden_visa: answers.goldenVisa || null,
      based_in: answers.location || null,
      funds_source: answers.funds || null,
      handover_funding: answers.handoverFunding || null,
      disqualified_reason: disqualified,
      score,
      tier,
      utm: body.utm || {},
      page_url: body.pageUrl || null,
      fbp: body.fbp || null,
      fbc: body.fbc || null,
    };

    let { error: dbError } = await supabase.from("lp_leads").insert(row);

    // handover_funding and disqualified_reason arrived with the disqualification
    // work and may not be migrated yet (scripts/migration-lp-leads-disqualification.sql).
    // PostgREST rejects the whole insert over an unknown column, so rather than
    // lose the lead, drop those two fields and write the rest.
    if (dbError && /handover_funding|disqualified_reason/.test(dbError.message)) {
      const { handover_funding: _hf, disqualified_reason: _dr, ...legacy } = row;
      ({ error: dbError } = await supabase.from("lp_leads").insert(legacy));
      if (!dbError) {
        console.warn("[lp-leads] wrote without disqualification columns; run the migration");
      }
    }

    if (dbError) console.error("[lp-leads] supabase insert failed", dbError.message);

    // Mirror the browser event server-side, deduplicated on event_id.
    //
    // Only a qualified lead is reported as "Lead". That is the event the
    // campaign optimises toward, so sending an unfundable one trains the
    // auction to find more people who cannot buy. The disqualified ones go out
    // under a custom name instead: still measurable, still usable as an
    // exclusion audience, but never a conversion target.
    const forwardedFor = request.headers.get("x-forwarded-for");
    await sendCapiEvent({
      eventName: disqualified ? "LeadUnqualified" : "Lead",
      eventId: body.eventId || `lp-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      eventSourceUrl: body.pageUrl,
      user: {
        email,
        phone: phoneE164,
        fbp: body.fbp,
        fbc: body.fbc,
        ip: forwardedFor?.split(",")[0]?.trim(),
        userAgent: request.headers.get("user-agent") || undefined,
      },
      customData: {
        content_name: project,
        lead_score: score,
        lead_tier: tier,
        ...(disqualified ? { disqualified_reason: disqualified } : {}),
        ...(page ? { landing_page: page.slug } : {}),
      },
    });

    // Push into Pixxi CRM so agents work it where they already work.
    const formId = resolvePixxiFormId(page);
    if (formId) {
      try {
        await submitLead({
          formId,
          name,
          email: email || "",
          phone: phoneE164,
          // Native Pixxi fields — these populate the columns the CRM filters
          // and reports on. Anything left in free text shows as N/A there.
          ...mapToPixxiFields(answers, { units: lp.units, developer: lp.developer }),
          extraData: buildExtraData(answers, score, tier, page, body.utm),
          propertyReference: project,
        });
      } catch (err) {
        // The Supabase row is the backup of record, so the lead is never lost.
        // It must still be loud: a silent catch here meant a broken CRM push
        // looked identical to a working one from the outside.
        console.error(
          "[lp-leads] pixxi push failed",
          page?.slug ?? project,
          err instanceof Error ? err.message : err,
        );
      }
    } else {
      console.error("[lp-leads] no pixxi form resolved, lead not in CRM", project, body.market, lang);
    }

    return NextResponse.json({ success: true, tier, qualified: !disqualified });
  } catch (error) {
    console.error("[lp-leads] error", error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
