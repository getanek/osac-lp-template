import { redirect } from "next/navigation";

/**
 * Bare project URL sends traffic to the European page — the default English
 * market. Campaign traffic should always link to a market page directly.
 */
export default function Page() {
  redirect("/lp/vincitore-wellness-estate/europe");
}
