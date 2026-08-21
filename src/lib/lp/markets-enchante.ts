/**
 * Enchanté by Grid Properties. Per-market landing page copy.
 *
 * Four English pages. Germany and Canada exist because the Tiger desk sells in
 * Arabic and the campaign targets Arabic-speaking residents in those two
 * countries; the targeting is Arabic, the page is English, and the Arabic is
 * offered where it actually matters, on the call.
 *
 * No market here mentions the Golden Visa as available. Nothing in the project
 * reaches AED 2,000,000, so FAQ_NO_VISA answers the question honestly instead.
 * The 60% due on handover is stated in every market rather than buried: it is
 * the plan's real weakness and a buyer finds out eventually either way.
 */

import {
  FAQ_DEVELOPER_GRID,
  FAQ_ESCROW,
  FAQ_NO_VISA,
  FAQ_REMOTE,
  USD,
  faqOwnership,
  faqReturns,
  type Market,
  type MarketFaq,
  type MarketId,
} from "./markets-shared";

const NAME = "Enchanté";
const PATH = "/lp/enchante";

/* ── answers shared by all four Enchanté markets ──────────── */

const FAQ_ENTRY: MarketFaq = {
  q: "What is the smallest amount I need to start?",
  a: "A studio at AED 622,000 books with 10% plus the 4% Dubai Land Department fee and a AED 5,000 admin fee, which is about AED 92,100, or roughly USD 25,100. After that it is 10% within thirty days and 10% in each of April 2027 and April 2028.",
};

const FAQ_HANDOVER_60: MarketFaq = {
  q: "Why is 60% due at handover?",
  a: "Because this is a 40/60 plan rather than a monthly one. Only 40% is spread across the build, and the balance falls due in December 2028 when you take the keys. That suits a buyer who will have capital available then, or who intends to arrange a mortgage against the completed property, and it does not suit someone who needs the whole purchase spread into small monthly payments. We would rather you know that now than at handover.",
};

const FAQ_PRICE: MarketFaq = {
  q: "Why is this cheaper than other Arjan projects?",
  a: "Arjan averages about AED 1,928 per square foot. Enchanté averages AED 1,636, roughly fifteen per cent under. The discount is mostly the developer: Grid is a 2019 company rather than a household name, and a smaller developer prices against that. The building specification, the freehold title and the escrow protection are the same either way.",
};

const FAQ_ARABIC: MarketFaq = {
  q: "Can I speak to someone in Arabic?",
  a: "Yes. The advisors handling this project are Arabic speakers based in Dubai, so the call, the paperwork walk-through and the follow-up can all be in Arabic. The written contract from the developer is in English and Arabic.",
};

const FAQ_SIZE: MarketFaq = {
  q: "How many units are there, and what is left?",
  a: "Fifty-nine apartments in total: eighteen studios, thirty-one one-bedrooms and ten two-bedrooms. The two-bedroom is both the scarcest layout and the deepest discount per square foot, so it tends to go first. Availability is confirmed with the developer at the time of your enquiry, not from this page.",
};

const DISCLAIMER_BASE =
  "OSAC Properties is a Dubai Land Department registered brokerage. We do not provide mortgages, financing, tax advice or immigration decisions. Prices and availability are supplied by the developer and change without notice.";

const WHY_ESCROW = {
  title: "Regulated escrow, not developer trust",
  body: "Off-plan instalments are paid into a project escrow account regulated by the Dubai Land Department and released against verified construction progress. You are never asked to send money to an individual or an agent.",
};

const WHY_PRICE = {
  title: "Priced under its own community",
  body: "Arjan averages roughly AED 1,928 per square foot. This building averages AED 1,636. You are buying the same district, the same freehold title and the same escrow protection at about fifteen per cent less per square foot.",
};

const WHY_PLAN = {
  title: "40% across three years, 60% at the keys",
  body: "Ten per cent books the apartment, ten per cent follows within a month, then ten per cent in April 2027 and again in April 2028. The remaining sixty per cent is due at handover in December 2028. It is a light plan up front and a heavy one at the end, and we say so before you commit.",
};

/* ── Arabic, for the language-targeted ad sets ────────────── */

const AR_FAQ_ENTRY: MarketFaq = {
  q: "ما أقل مبلغ أحتاجه للبدء؟",
  a: "استوديو بسعر 622,000 درهم يُحجز بدفع 10% إضافةً إلى رسوم دائرة الأراضي والأملاك البالغة 4% ورسوم إدارية قدرها 5,000 درهم، أي نحو 92,100 درهم. بعدها 10% خلال ثلاثين يوماً، ثم 10% في أبريل 2027 و10% في أبريل 2028.",
};

const AR_FAQ_HANDOVER_60: MarketFaq = {
  q: "لماذا 60% عند التسليم؟",
  a: "لأن هذه خطة 40/60 وليست خطة شهرية. يُوزَّع 40% فقط على سنوات البناء، ويستحق الباقي في ديسمبر 2028 عند استلام المفاتيح. هذا يناسب من سيتوفر لديه رأس المال حينها أو من ينوي ترتيب تمويل عقاري على الوحدة بعد اكتمالها، ولا يناسب من يحتاج إلى تقسيط شهري صغير. نفضّل أن تعرف ذلك الآن لا عند التسليم.",
};

const AR_FAQ_PRICE: MarketFaq = {
  q: "لماذا سعره أقل من مشاريع أرجان الأخرى؟",
  a: "متوسط أرجان نحو 1,928 درهماً للقدم المربعة، ومتوسط إنشانتيه 1,636 درهماً، أي أقل بنحو خمسة عشر بالمئة. الفارق سببه المطوّر بالدرجة الأولى: غريد شركة تأسست عام 2019 وليست اسماً معروفاً، والمطوّر الأصغر يسعّر على هذا الأساس. أما مواصفات البناء وسند الملكية الحر وحماية حساب الضمان فهي واحدة في الحالتين.",
};

const AR_FAQ_ARABIC: MarketFaq = {
  q: "هل يمكنني التحدث مع أحد بالعربية؟",
  a: "نعم. المستشارون المسؤولون عن هذا المشروع يتحدثون العربية ومقرهم دبي، فتكون المكالمة وشرح الأوراق والمتابعة بالعربية. عقد المطوّر مكتوب بالعربية والإنجليزية.",
};

const AR_FAQ_OWNERSHIP: MarketFaq = {
  q: "هل يستطيع غير الإماراتيين التملك في دبي؟",
  a: "نعم. إنشانتيه يقع في منطقة تملك حر، ما يعني ملكية كاملة لغير المواطنين مع تسجيل سند الملكية باسمك لدى دائرة الأراضي والأملاك. لا يُشترط أن تكون مقيماً في الإمارات.",
};

const AR_FAQ_REMOTE: MarketFaq = {
  q: "هل يجب أن أسافر إلى دبي للشراء؟",
  a: "لا. يمكن إتمام الشراء عن بُعد بوكالة قانونية، مع توقيع رقمي والتحقق من الهوية عن بُعد. معظم مشترينا من الخارج يرون العقار على الطبيعة لأول مرة بعد التسليم.",
};

const AR_FAQ_ESCROW: MarketFaq = {
  q: "أين تذهب أموالي قبل التسليم؟",
  a: "إلى حساب الضمان الخاص بالمشروع، وهو خاضع لرقابة دائرة الأراضي والأملاك بموجب قانون البيع على الخارطة. تُصرف الدفعات للمطوّر مقابل تقدم إنشائي موثّق، لا تُدفع له مباشرةً عند الحجز.",
};

const AR_FAQ_NO_VISA: MarketFaq = {
  q: "هل يؤهل هذا المشروع للإقامة الذهبية؟",
  a: "لا. حد الإقامة الذهبية استثمار عقاري بقيمة 2,000,000 درهم، وأكبر شقة هنا بسعر 1,375,000 درهم. إن كانت الإقامة لعشر سنوات هي سببك الرئيسي للشراء، أخبر المستشار في المكالمة وسيعرض عليك مشاريع تتجاوز الحد بدلاً من أن يبيعك مشروعاً لا يحققه.",
};

const AR_FAQ_DEVELOPER: MarketFaq = {
  q: "من هي غريد بروبرتيز؟",
  a: "مطوّر إماراتي تأسس عام 2019 ومقره برج ذا أوبس من أومنيات في الخليج التجاري. أصغر من الأسماء التي تعرفها، وهذا جزء من سبب انخفاض سعر القدم المربعة بنحو خمسة عشر بالمئة عن متوسط أرجان. حمايتك هنا نظامية لا سمعية: الدفعات تدخل حساب ضمان خاضعاً لرقابة دائرة الأراضي والأملاك وتُصرف مقابل تقدم إنشائي موثّق.",
};

const AR_FAQ_RETURNS: MarketFaq = {
  q: "ما العائد الذي يمكن توقعه واقعياً؟",
  a: "لا نعلن نسبة عائد جاهزة. أداء الإيجار يعتمد على الوحدة نفسها وعلى السوق عند التسليم في 2028 وعلى رسوم الخدمة البالغة 15 درهماً للقدم المربعة وعلى فترات الشغور وتكاليف الإدارة. نحسب ذلك معك على وحدة محددة بدلاً من إعطائك رقماً يبيع ولا يصمد.",
};

const AR_DISCLAIMER =
  "OSAC Properties وسيط عقاري مسجل لدى دائرة الأراضي والأملاك في دبي. لا نقدم تمويلاً عقارياً ولا استشارات ضريبية ولا قرارات هجرة. الأسعار والتوفر من المطوّر وتتغير دون إشعار.";

const AR_WHY_PRICE = {
  title: "سعر أقل من متوسط منطقته",
  body: "متوسط أرجان نحو 1,928 درهماً للقدم المربعة، ومتوسط هذا المبنى 1,636 درهماً. المنطقة نفسها وسند الملكية الحر نفسه وحماية حساب الضمان نفسها، بأقل من ذلك بنحو خمسة عشر بالمئة للقدم.",
};

const AR_WHY_ESCROW = {
  title: "حساب ضمان خاضع للرقابة، لا ثقة في المطوّر",
  body: "تُدفع أقساط البيع على الخارطة في حساب ضمان للمشروع خاضع لرقابة دائرة الأراضي والأملاك، وتُصرف مقابل تقدم إنشائي موثّق. لن يُطلب منك تحويل المال إلى شخص أو وسيط.",
};

const AR_WHY_PLAN = {
  title: "40% على ثلاث سنوات و60% عند المفاتيح",
  body: "عشرة بالمئة تحجز الشقة، وعشرة أخرى خلال شهر، ثم عشرة في أبريل 2027 وعشرة في أبريل 2028. الستون بالمئة الباقية تستحق عند التسليم في ديسمبر 2028. خطة خفيفة في بدايتها وثقيلة في نهايتها، ونقول ذلك قبل أن تلتزم.",
};

/* ── markets ──────────────────────────────────────────────── */

export const ENCHANTE_MARKETS: Partial<Record<MarketId, Market>> = {
  europe: {
    id: "europe",
    path: `${PATH}/europe`,
    dialCode: "+44",
    secondaryCurrency: USD,
    asksFundsSource: false,
    metaTitle: "Dubai Apartments from AED 622,000 | Enchanté, Arjan | OSAC Properties",
    metaDescription:
      "Freehold Dubai apartments from AED 622,000, about 15% under the Arjan average. Around AED 92,100 to book. Handover December 2028. Buy remotely from the UK or Europe.",
    en: {
      flag: "🇪🇺",
      eyebrow: "Dubai real estate · For buyers in the UK and Europe",
      h1: "A freehold Dubai apartment for under AED 100,000 down",
      sub: "Enchanté by Grid Properties, Arjan, Dubai. Studios from AED 622,000, one and two bedrooms to AED 1,375,000, at roughly fifteen per cent under the average price per square foot in the district. Ten per cent books it. OSAC prepares a private shortlist for buyers purchasing from the UK or Europe.",
      props: [
        "Around AED 92,100 to book a studio, including the DLD fee and admin",
        "Roughly 15% below the Arjan average per square foot",
        "No annual property tax, no capital gains tax and no tax on rental income for individuals",
        "Freehold title in your own name, purchased remotely by power of attorney",
      ],
      why: [
        WHY_PRICE,
        {
          title: "A tax position you cannot get at home",
          body: "The UAE levies no annual property tax, no capital gains tax and no income tax on rental income for individuals. Your own country's tax treatment of a foreign property still applies and should be reviewed with your adviser.",
        },
        WHY_ESCROW,
        WHY_PLAN,
      ],
      faqs: [
        faqOwnership(NAME),
        FAQ_ENTRY,
        FAQ_PRICE,
        FAQ_HANDOVER_60,
        FAQ_REMOTE,
        FAQ_ESCROW,
        FAQ_DEVELOPER_GRID,
        FAQ_NO_VISA,
        FAQ_SIZE,
        faqReturns(15, 2028),
      ],
      disclaimer: DISCLAIMER_BASE,
    },
  },

  india: {
    id: "india",
    path: `${PATH}/india`,
    dialCode: "+91",
    secondaryCurrency: USD,
    asksFundsSource: false,
    metaTitle: "Dubai Property for Indian Investors from AED 622,000 | Enchanté | OSAC Properties",
    metaDescription:
      "Freehold Dubai apartments from AED 622,000 (about USD 169,000). Booking is roughly USD 25,100, comfortably inside the LRS annual limit. Handover December 2028.",
    en: {
      flag: "🇮🇳",
      eyebrow: "Dubai real estate · For investors in India",
      h1: "A Dubai apartment that books for about USD 25,000",
      sub: "Enchanté by Grid Properties, Arjan, Dubai. Studios from AED 622,000, which is roughly USD 169,000, at about fifteen per cent under the district average per square foot. The booking payment sits at around USD 25,100, a fraction of one person's annual LRS limit. OSAC prepares a private shortlist for buyers purchasing from India.",
      props: [
        "Booking is roughly USD 25,100, well inside one person's USD 250,000 LRS year",
        "Roughly 15% below the Arjan average per square foot",
        "Freehold title in your own name, three and a half hours from Mumbai",
        "Purchased remotely: power of attorney, digital signing, escrow-protected instalments",
      ],
      why: [
        WHY_PRICE,
        {
          title: "The whole purchase fits inside LRS",
          body: "Under the Liberalised Remittance Scheme a resident individual may remit up to USD 250,000 per financial year, and immovable property abroad is a permitted use. At this price the entire apartment, not merely the booking, sits inside a single year's limit for most buyers, and the staged plan spreads it further.",
        },
        WHY_ESCROW,
        WHY_PLAN,
      ],
      faqs: [
        faqOwnership(NAME),
        FAQ_ENTRY,
        {
          q: "Does this breach my LRS limit?",
          a: "It should not. LRS permits up to USD 250,000 per person per financial year for permitted purposes including immovable property abroad. A studio here is around USD 169,000 in total and books for about USD 25,100. Confirm your own position with your chartered accountant.",
        },
        {
          q: "What about TCS on the remittance?",
          a: "Remittances above roughly ten lakh rupees in a financial year under LRS currently attract TCS at twenty per cent. TCS is creditable against your income tax liability, so it is a cash-flow cost rather than a lost cost. Your CA should confirm the current rate and your position.",
        },
        FAQ_PRICE,
        FAQ_HANDOVER_60,
        FAQ_REMOTE,
        FAQ_ESCROW,
        FAQ_DEVELOPER_GRID,
        FAQ_NO_VISA,
        faqReturns(15, 2028),
      ],
      disclaimer:
        "OSAC Properties is a Dubai Land Department registered brokerage. We do not provide loans, financing, tax advice or FEMA opinions. LRS and TCS positions must be confirmed with your own chartered accountant. Prices and availability are supplied by the developer and change without notice.",
    },
  },

  germany: {
    id: "germany",
    path: `${PATH}/germany`,
    dialCode: "+49",
    secondaryCurrency: USD,
    asksFundsSource: false,
    metaTitle: "Dubai Apartments from AED 622,000 for Buyers in Germany | Enchanté | OSAC Properties",
    metaDescription:
      "Freehold Dubai apartments from AED 622,000, about 15% under the Arjan average. Arabic-speaking advisors in Dubai. Around AED 92,100 to book. Handover December 2028.",
    en: {
      flag: "🇩🇪",
      eyebrow: "Dubai real estate · For buyers in Germany",
      h1: "A home in Dubai, arranged from Germany, in Arabic",
      sub: "Enchanté by Grid Properties, Arjan, Dubai. Studios from AED 622,000, one and two bedrooms to AED 1,375,000, at roughly fifteen per cent under the district average per square foot. Ten per cent books it. Your advisor is an Arabic speaker based in Dubai, so the call and the paperwork walk-through happen in your language.",
      props: [
        "Arabic-speaking advisors based in Dubai, not a call centre",
        "Around AED 92,100 to book a studio, including the DLD fee and admin",
        "Freehold title in your own name, six hours from Frankfurt",
        "Purchased remotely: power of attorney, digital signing, escrow-protected instalments",
      ],
      why: [
        WHY_PRICE,
        {
          title: "A base between Europe and home",
          body: "Dubai is roughly six hours from Frankfurt and inside four of Cairo, Amman, Beirut and the Gulf. For a family split between Germany and the region, a freehold apartment is a fixed point that belongs to you rather than a hotel booking each visit.",
        },
        WHY_ESCROW,
        WHY_PLAN,
      ],
      faqs: [
        FAQ_ARABIC,
        faqOwnership(NAME),
        FAQ_ENTRY,
        FAQ_PRICE,
        FAQ_HANDOVER_60,
        FAQ_REMOTE,
        FAQ_ESCROW,
        FAQ_DEVELOPER_GRID,
        FAQ_NO_VISA,
        {
          q: "How is this taxed in Germany?",
          a: "We do not advise on German tax. In general terms a German-resident owner declares foreign rental income and the Germany-UAE arrangements determine how it is treated, which is a question for a Steuerberater and not for a broker. What we can tell you precisely is the UAE side: no annual property tax, no capital gains tax and no tax on rental income for individuals.",
        },
        faqReturns(15, 2028),
      ],
      disclaimer:
        "OSAC Properties is a Dubai Land Department registered brokerage. We do not provide mortgages, financing, German tax advice or immigration decisions. Confirm your German tax position with your own adviser. Prices and availability are supplied by the developer and change without notice.",
    },
    ar: {
      flag: "🇩🇪",
      eyebrow: "عقارات دبي · للمشترين في ألمانيا",
      h1: "بيت في دبي، يُرتَّب من ألمانيا، بالعربية",
      sub: "إنشانتيه من غريد بروبرتيز، أرجان، دبي. استوديوهات من 622,000 درهم، وغرفة وغرفتين حتى 1,375,000 درهم، بسعر أقل بنحو خمسة عشر بالمئة من متوسط سعر القدم المربعة في المنطقة. عشرة بالمئة تحجز الشقة. مستشارك يتحدث العربية ومقره دبي، فتكون المكالمة وشرح الأوراق بلغتك.",
      props: [
        "مستشارون يتحدثون العربية ومقرهم دبي، لا مركز اتصال",
        "نحو 92,100 درهم لحجز استوديو، شاملة رسوم الدائرة والرسوم الإدارية",
        "سند ملكية حر باسمك، على بُعد ست ساعات من فرانكفورت",
        "شراء عن بُعد: وكالة قانونية، توقيع رقمي، أقساط محمية بحساب ضمان",
      ],
      why: [
        AR_WHY_PRICE,
        {
          title: "قاعدة بين أوروبا والوطن",
          body: "دبي على بُعد نحو ست ساعات من فرانكفورت وأقل من أربع من القاهرة وعمّان وبيروت والخليج. لعائلة موزعة بين ألمانيا والمنطقة، الشقة المملوكة نقطة ثابتة تخصّك بدل حجز فندقي في كل زيارة.",
        },
        AR_WHY_ESCROW,
        AR_WHY_PLAN,
      ],
      faqs: [
        AR_FAQ_ARABIC,
        AR_FAQ_OWNERSHIP,
        AR_FAQ_ENTRY,
        AR_FAQ_PRICE,
        AR_FAQ_HANDOVER_60,
        AR_FAQ_REMOTE,
        AR_FAQ_ESCROW,
        AR_FAQ_DEVELOPER,
        AR_FAQ_NO_VISA,
        {
          q: "كيف يُعامل هذا ضريبياً في ألمانيا؟",
          a: "لا نقدم استشارات ضريبية ألمانية. عموماً، المقيم في ألمانيا يصرّح بدخل الإيجار الأجنبي، وتحدد الترتيبات بين ألمانيا والإمارات كيفية معاملته، وهذا سؤال لمستشار ضريبي لا لوسيط عقاري. ما يمكننا تأكيده بدقة هو الجانب الإماراتي: لا ضريبة عقارية سنوية ولا ضريبة أرباح رأسمالية ولا ضريبة على دخل الإيجار للأفراد.",
        },
        AR_FAQ_RETURNS,
      ],
      disclaimer: AR_DISCLAIMER,
    },
  },

  canada: {
    id: "canada",
    path: `${PATH}/canada`,
    dialCode: "+1",
    secondaryCurrency: USD,
    asksFundsSource: false,
    metaTitle: "Dubai Apartments from AED 622,000 for Buyers in Canada | Enchanté | OSAC Properties",
    metaDescription:
      "Freehold Dubai apartments from AED 622,000, about 15% under the Arjan average. Arabic-speaking advisors in Dubai. Around AED 92,100 to book. Handover December 2028.",
    en: {
      flag: "🇨🇦",
      eyebrow: "Dubai real estate · For buyers in Canada",
      h1: "A home in Dubai, arranged from Canada, in Arabic",
      sub: "Enchanté by Grid Properties, Arjan, Dubai. Studios from AED 622,000, one and two bedrooms to AED 1,375,000, at roughly fifteen per cent under the district average per square foot. Ten per cent books it. Your advisor is an Arabic speaker based in Dubai, and the whole purchase can be completed without leaving Canada.",
      props: [
        "Arabic-speaking advisors based in Dubai, not a call centre",
        "Around AED 92,100 to book a studio, including the DLD fee and admin",
        "Freehold title in your own name, no UAE residency required to buy",
        "Purchased remotely: power of attorney, digital signing, escrow-protected instalments",
      ],
      why: [
        WHY_PRICE,
        {
          title: "Owned outright, held in dirhams",
          body: "The title is registered in your own name at the Dubai Land Department, and the UAE dirham has been pegged to the US dollar since 1997. That makes the currency exposure a Canadian dollar to US dollar question rather than an emerging-market one.",
        },
        WHY_ESCROW,
        WHY_PLAN,
      ],
      faqs: [
        FAQ_ARABIC,
        faqOwnership(NAME),
        FAQ_ENTRY,
        FAQ_PRICE,
        FAQ_HANDOVER_60,
        FAQ_REMOTE,
        FAQ_ESCROW,
        FAQ_DEVELOPER_GRID,
        FAQ_NO_VISA,
        {
          q: "What do I have to report in Canada?",
          a: "We do not advise on Canadian tax. In general terms a Canadian resident holding foreign property above CAD 100,000 in cost has a T1135 reporting obligation, and foreign rental income is reportable, which is a question for your accountant. The UAE side is straightforward: no annual property tax, no capital gains tax and no tax on rental income for individuals.",
        },
        faqReturns(15, 2028),
      ],
      disclaimer:
        "OSAC Properties is a Dubai Land Department registered brokerage. We do not provide mortgages, financing, Canadian tax advice or immigration decisions. Confirm your Canadian reporting position with your own accountant. Prices and availability are supplied by the developer and change without notice.",
    },
    ar: {
      flag: "🇨🇦",
      eyebrow: "عقارات دبي · للمشترين في كندا",
      h1: "بيت في دبي، يُرتَّب من كندا، بالعربية",
      sub: "إنشانتيه من غريد بروبرتيز، أرجان، دبي. استوديوهات من 622,000 درهم، وغرفة وغرفتين حتى 1,375,000 درهم، بسعر أقل بنحو خمسة عشر بالمئة من متوسط سعر القدم المربعة في المنطقة. عشرة بالمئة تحجز الشقة. مستشارك يتحدث العربية ومقره دبي، ويمكن إتمام الشراء بالكامل دون مغادرة كندا.",
      props: [
        "مستشارون يتحدثون العربية ومقرهم دبي، لا مركز اتصال",
        "نحو 92,100 درهم لحجز استوديو، شاملة رسوم الدائرة والرسوم الإدارية",
        "سند ملكية حر باسمك، دون اشتراط الإقامة في الإمارات",
        "شراء عن بُعد: وكالة قانونية، توقيع رقمي، أقساط محمية بحساب ضمان",
      ],
      why: [
        AR_WHY_PRICE,
        {
          title: "ملكية كاملة بعملة مربوطة بالدولار",
          body: "يُسجَّل سند الملكية باسمك لدى دائرة الأراضي والأملاك، والدرهم الإماراتي مربوط بالدولار الأمريكي منذ عام 1997. هذا يجعل تعرضك للعملة مسألة دولار كندي مقابل دولار أمريكي لا مسألة سوق ناشئة.",
        },
        AR_WHY_ESCROW,
        AR_WHY_PLAN,
      ],
      faqs: [
        AR_FAQ_ARABIC,
        AR_FAQ_OWNERSHIP,
        AR_FAQ_ENTRY,
        AR_FAQ_PRICE,
        AR_FAQ_HANDOVER_60,
        AR_FAQ_REMOTE,
        AR_FAQ_ESCROW,
        AR_FAQ_DEVELOPER,
        AR_FAQ_NO_VISA,
        {
          q: "ما الذي يجب أن أصرّح به في كندا؟",
          a: "لا نقدم استشارات ضريبية كندية. عموماً، المقيم في كندا الذي يملك عقاراً أجنبياً تتجاوز كلفته 100,000 دولار كندي عليه التزام بتقديم النموذج T1135، ودخل الإيجار الأجنبي يخضع للتصريح، وهذا سؤال لمحاسبك. أما الجانب الإماراتي فواضح: لا ضريبة عقارية سنوية ولا ضريبة أرباح رأسمالية ولا ضريبة على دخل الإيجار للأفراد.",
        },
        AR_FAQ_RETURNS,
      ],
      disclaimer: AR_DISCLAIMER,
    },
  },
};
