import { Quote } from "lucide-react";
import type { LpCopy } from "@/lib/lp/copy";
import type { MarketId } from "@/lib/lp/markets";
import type { LpProject } from "@/lib/lp/project";
import { testimonialsFor } from "@/lib/lp/proof";
import { LpSection } from "./Sections";

/* ── developer track record ────────────────────────────────── */

export function TrackRecord({ t, p }: { t: LpCopy; p: LpProject }) {
  const record = p.trackRecord;
  if (!record?.items.length) return null;

  const delivered = record.items.filter((x) => x.status === "Delivered").length;

  return (
    <LpSection
      label={t.trackLabel}
      title={record.title}
      sub={record.sub.replace("{delivered}", String(delivered))}
    >
      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-6">
        {record.items.map((item) => (
          <div key={item.name} className="rounded-xl border border-line bg-paper-card p-4">
            <p className="text-[13.5px] leading-snug text-ink">{item.name}</p>
            <p className="mt-1 text-[11.5px] text-ink-muted">{item.community}</p>
            <p
              className={
                item.status === "Delivered"
                  ? "mt-3 text-[10.5px] uppercase tracking-[1px] text-gold"
                  : "mt-3 text-[10.5px] uppercase tracking-[1px] text-ink-muted"
              }
            >
              {item.status === "Delivered" ? t.trackDelivered : t.trackBuilding} {item.year}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-5 max-w-2xl text-[11px] leading-relaxed text-ink-muted">{t.trackNote}</p>
    </LpSection>
  );
}

/* ── testimonials (render only when real ones exist) ───────── */

export function Testimonials({ t, marketId }: { t: LpCopy; marketId: MarketId }) {
  const items = testimonialsFor(marketId);
  if (!items.length) return null;

  return (
    <LpSection label={t.testimonialsLabel} title={t.testimonialsTitle} className="bg-paper-alt">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <figure key={item.quote} className="rounded-xl border border-line bg-paper-card p-6">
            <Quote className="h-5 w-5 text-gold" />
            <blockquote className="mt-4 text-[13.5px] leading-relaxed text-ink-secondary">
              {item.quote}
            </blockquote>
            <figcaption className="mt-4 border-t border-line pt-4 text-[12px] text-ink">
              {item.name}
              <span className="block text-[11px] text-ink-muted">{item.detail}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </LpSection>
  );
}
