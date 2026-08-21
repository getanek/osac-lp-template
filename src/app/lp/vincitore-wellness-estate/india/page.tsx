import type { Metadata } from "next";
import { MarketPage } from "@/components/lp/MarketPage";
import { getMarket } from "@/lib/lp/markets";
import { VINCITORE } from "@/lib/lp/vincitore-wellness-estate";

const market = getMarket(VINCITORE.slug, "india");

export const metadata: Metadata = {
  title: { absolute: market.metaTitle },
  description: market.metaDescription,
  alternates: { canonical: market.path },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <MarketPage project={VINCITORE} marketId="india" />;
}
