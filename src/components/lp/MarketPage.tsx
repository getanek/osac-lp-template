import { COMPANY_INFO } from "@/lib/constants";
import { COPY } from "@/lib/lp/copy";
import { getMarket, marketContent, type Lang, type MarketId } from "@/lib/lp/markets";
import { priceFrom, type LpProject } from "@/lib/lp/project";
import { findLandingPage } from "@/lib/lp/registry";
import { MetaPixel } from "./MetaPixel";
import { StepForm } from "./StepForm";
import { StickyBar } from "./StickyBar";
import {
  LpAmenities,
  LpFloorPlans,
  LpFooter,
  LpGallery,
  LpGoldenVisa,
  LpHeader,
  LpLocation,
  LpPlans,
  LpPrices,
  LpSection,
} from "./Sections";
import { TrackRecord, Testimonials } from "./Proof";
import {
  AcquisitionBrief,
  MarketDisclaimer,
  MarketFaq,
  MarketHero,
  OpportunityCard,
  TrustStrip,
  WhyMarket,
  WhyOsac,
} from "./MarketSections";

export function MarketPage({
  project: p,
  marketId,
  lang = "en",
}: {
  project: LpProject;
  marketId: MarketId;
  lang?: Lang;
}) {
  const market = getMarket(p.slug, marketId);
  const c = marketContent(market, lang);
  // Project overrides win over the shared strings.
  const t = { ...COPY[lang], ...(p.copy?.[lang] ?? {}) };
  // Pixel comes from the page's registry entry, falling back to the env default.
  const registryEntry = findLandingPage(p.slug, marketId, lang);
  const trackCtx = { project: p.slug, market: marketId, lang };

  // A market offers a switch when it actually has a second language written.
  // Ethiopia carries Amharic, Germany and Canada carry Arabic.
  const alt: { code: Lang; label: string } | undefined = market.am
    ? { code: "am", label: "አማርኛ" }
    : market.ar
      ? { code: "ar", label: "العربية" }
      : undefined;

  const languageSwitch = alt
    ? {
        href: lang === "en" ? `${market.path}/${alt.code}` : market.path,
        label: lang === "en" ? alt.label : "English",
      }
    : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Residence",
        name: p.name,
        description: p.schemaDescription,
        address: {
          "@type": "PostalAddress",
          addressLocality: p.community,
          addressRegion: p.city,
          addressCountry: "AE",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: p.coords.lat,
          longitude: p.coords.lng,
        },
      },
      {
        "@type": "Offer",
        price: priceFrom(p),
        priceCurrency: "AED",
        availability: "https://schema.org/InStock",
        seller: { "@type": "RealEstateAgent", name: COMPANY_INFO.name },
      },
      {
        "@type": "FAQPage",
        mainEntity: c.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  const form = (
    <div>
      <StepForm t={t} p={p} market={market} ctx={trackCtx} id="lead-form" />
      <MarketDisclaimer c={c} className="mt-4 px-1" />
    </div>
  );

  return (
    <>
      <MetaPixel pixelId={registryEntry?.meta.pixelId} ctx={trackCtx} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* The site body is dark; landing pages own a light surface. dir is set
          here rather than on <html>, because the site chrome around these pages
          stays left-to-right. */}
      <div className="bg-paper text-ink" dir={t.dir} lang={t.lang}>
        <LpHeader t={t} languageSwitch={languageSwitch} />

        <MarketHero c={c} p={p} form={form} />
        <TrustStrip t={t} />

        <OpportunityCard t={t} p={p} market={market} />
        <TrackRecord t={t} p={p} />
        <LpGallery t={t} p={p} />
        <AcquisitionBrief t={t} />
        <LpPrices t={t} p={p} secondaryCurrency={Boolean(market.secondaryCurrency)} />
        <LpFloorPlans t={t} p={p} />
        <WhyMarket t={t} c={c} />
        {p.goldenVisa.applicable && <LpGoldenVisa t={t} p={p} />}
        <LpPlans t={t} p={p} />
        <LpAmenities t={t} p={p} />
        <LpLocation t={t} p={p} />
        <WhyOsac t={t} />
        <Testimonials t={t} marketId={marketId} />
        <MarketFaq t={t} c={c} />

        <LpSection className="border-t border-line">
          <div className="grid gap-9 lg:grid-cols-[1fr_400px] lg:gap-16">
            <div>
              <h2 className="max-w-md text-[25px] font-light leading-[1.2] text-ink md:text-[34px]">
                {t.finalTitle}
              </h2>
              <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-ink-secondary">
                {t.finalSub}
              </p>
              <MarketDisclaimer c={c} className="mt-8 max-w-md" />
            </div>
            <StepForm
              t={t}
              p={p}
              market={market}
              ctx={trackCtx}
              id="lead-form-footer"
              compact
            />
          </div>
        </LpSection>

        <LpFooter
          compliance={registryEntry?.compliance}
          permitQr={p.media.permitQr}
          goldenVisa={p.goldenVisa.applicable}
        />
        <StickyBar t={t} ctx={trackCtx} />
      </div>
    </>
  );
}
