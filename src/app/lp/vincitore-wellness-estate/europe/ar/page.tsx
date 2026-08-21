import type { Metadata } from "next";
import { MarketPage } from "@/components/lp/MarketPage";
import { VINCITORE } from "@/lib/lp/vincitore-wellness-estate";
import { getMarket } from "@/lib/lp/markets";

const market = getMarket(VINCITORE.slug, "europe");

export const metadata: Metadata = {
  title: {
    absolute:
      "شقق في دبي من 800,000 درهم للمشترين العرب في بريطانيا | فينشيتوري ولنس إستيت | OSAC Properties",
  },
  description:
    "شقق تملك حر في دبي من 800,000 درهم، مع مسبح خاص في كل وحدة. إقامة ذهبية لعشر سنوات من مليونَي درهم. مستشارون يتحدثون العربية في دبي. الشراء عن بُعد من المملكة المتحدة.",
  alternates: { canonical: `${market.path}/ar` },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <MarketPage project={VINCITORE} marketId="europe" lang="ar" />;
}
