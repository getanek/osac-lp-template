import type { Metadata } from "next";
import { MarketPage } from "@/components/lp/MarketPage";
import { getMarket } from "@/lib/lp/markets";
import { VINCITORE } from "@/lib/lp/vincitore-wellness-estate";

const market = getMarket(VINCITORE.slug, "ethiopia");

export const metadata: Metadata = {
  title: { absolute: market.metaTitle },
  description: market.metaDescription,
  alternates: {
    canonical: market.path,
    languages: { en: market.path, am: `${market.path}/am` },
  },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <MarketPage project={VINCITORE} marketId="ethiopia" />;
}
