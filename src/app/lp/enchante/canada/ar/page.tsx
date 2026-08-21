import type { Metadata } from "next";
import { MarketPage } from "@/components/lp/MarketPage";
import { ENCHANTE } from "@/lib/lp/enchante";
import { getMarket } from "@/lib/lp/markets";

const market = getMarket(ENCHANTE.slug, "canada");

export const metadata: Metadata = {
  title: { absolute: "شقق في دبي من 622,000 درهم للمشترين في كندا | إنشانتيه | OSAC Properties" },
  description: "شقق تملك حر في دبي من 622,000 درهم، أقل بنحو 15% من متوسط أرجان. مستشارون يتحدثون العربية في دبي. نحو 92,100 درهم للحجز. التسليم ديسمبر 2028.",
  alternates: { canonical: `${market.path}/ar` },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <MarketPage project={ENCHANTE} marketId="canada" lang="ar" />;
}
