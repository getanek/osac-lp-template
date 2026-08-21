import type { Metadata } from "next";
import { MarketPage } from "@/components/lp/MarketPage";
import { ENCHANTE } from "@/lib/lp/enchante";
import { getMarket } from "@/lib/lp/markets";

const market = getMarket(ENCHANTE.slug, "germany");

export const metadata: Metadata = {
  title: { absolute: market.metaTitle },
  description: market.metaDescription,
  alternates: { canonical: market.path },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <MarketPage project={ENCHANTE} marketId="germany" />;
}
