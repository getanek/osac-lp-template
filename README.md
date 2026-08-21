# OSAC Landing Page Template

Next.js (App Router) landing page system. 11 pages across 2 projects x multiple markets/languages, each with its own lead form, tracking, and CRM binding.

## Structure

```
src/app/lp/<project>/<market>[/<lang>]/page.tsx   # one route per landing page
src/app/api/lp-leads/route.ts                     # lead submit endpoint (Supabase + Pixxi CRM)
src/app/api/lp-events/route.ts                    # Meta CAPI server events
src/components/lp/                                # shared UI: StepForm, MarketPage, MetaPixel, etc.
src/lib/lp/
  registry.ts        # single source of truth: every page, its form, campaign, compliance
  markets-*.ts       # per-market copy/targeting
  <project>.ts       # project content (units, plans, gallery, proof)
  capi.ts            # Meta Conversions API sender
  track.ts           # client-side event tracking
```

## Placeholders to fill

All IDs stripped. Search for `REPLACE_WITH_` and set:

- `REPLACE_WITH_PIXXI_FORM_ID` — one CRM form ID per page (in `registry.ts`), or set env `PIXXI_FORM_ID_<ENV_KEY>` per page
- `REPLACE_WITH_PIXEL_ID` — Meta pixel/dataset ID
- `REPLACE_WITH_TRAKHEESI_PERMIT` / `REPLACE_WITH_ORN` — RERA compliance numbers (legally required on Dubai RE ads)

## Env vars

```
PIXXI_FORM_ID_<ENV_KEY>        # per-page CRM form override
PIXXI_FORM_ID                  # fallback
META_PIXEL_ID
META_CAPI_ACCESS_TOKEN
NEXT_PUBLIC_SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
```

## How a page flows

```
Meta ad (utm_campaign=...)
  -> /lp/<project>/<market>
    -> multi-step form (StepForm)
      -> Supabase lp_leads (score, tier, UTMs)
      -> CRM form (per-page ID)
      -> Meta CAPI Lead event (deduped with browser pixel)
```

Add a new page: add a record to `registry.ts`, create the route folder, wire market copy in `markets-*.ts`.
