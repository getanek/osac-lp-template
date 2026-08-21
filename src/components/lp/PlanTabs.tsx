"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { PaymentPlan } from "@/lib/lp/project";

export function PlanTabs({ plans }: { plans: PaymentPlan[] }) {
  const [active, setActive] = useState(plans[1]?.id ?? plans[0].id);
  const plan = plans.find((p) => p.id === active) ?? plans[0];

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {plans.map((p) => (
          <button
            key={p.id}
            onClick={() => setActive(p.id)}
            className={cn(
              "rounded-md border px-4 py-2.5 text-start transition-all duration-150",
              p.id === active
                ? "border-gold-border bg-gold-soft"
                : "border-line hover:border-gold-border"
            )}
          >
            <span
              className={cn(
                "block text-[13px] font-semibold",
                p.id === active ? "text-ink" : "text-ink-secondary"
              )}
            >
              {p.name}
            </span>
            <span className="block text-[11px] text-ink-muted">{p.pitch}</span>
          </button>
        ))}
      </div>

      <ol className="mt-8 space-y-0 border-t border-line">
        {plan.rows.map((row, i) => (
          <li
            key={`${plan.id}-${i}`}
            className="flex flex-col gap-1 border-b border-line py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="text-[14px] text-ink">{row.label}</span>
            <span className="text-[12px] uppercase tracking-[1.5px] text-gold">{row.when}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
