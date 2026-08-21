/**
 * Vincitore Wellness Estate — per-market landing page copy.
 *
 * Split out of markets.ts when Enchanté became the second project. The reasoning
 * behind each market's hook lives in
 * output/osac/vincitore-wellness-estate/05-geo-playbook.md.
 */

import {
  FAQ_ESCROW,
  FAQ_REMOTE,
  FAQ_VISA,
  USD,
  faqOwnership,
  faqReturns,
  type Market,
  type MarketId,
} from "./markets-shared";

const NAME = "Vincitore Wellness Estate";

/**
 * Arabic copy for the Europe market.
 *
 * Same buyer geography as the English page, different buyer: an Arabic speaker
 * living in the UK or Europe. The hook is not the property, it is that the
 * whole purchase happens in their language with an advisor sitting in Dubai.
 * That is the one thing a British estate agent cannot offer them, and it is the
 * same wedge that carries the Enchanté Germany and Canada pages.
 *
 * Golden Visa stays central here, unlike Enchanté where the ceiling sits below
 * the AED 2M threshold. Every three-bedroom in this project clears it.
 */
const AR_EUROPE = {
  flag: "🇬🇧",
  eyebrow: "عقارات دبي · للمشترين العرب في المملكة المتحدة",
  h1: "بيت في دبي، والإقامة التي تأتي معه",
  sub: "فينشيتوري ولنس إستيت، مجان، دبي. شقق تملك حر من 800,000 درهم، مع مسبح خاص في كل وحدة. الشراء من مليونَي درهم يتيح لك التقدم بطلب الإقامة الذهبية لعشر سنوات. من لندن، مستشارك يتحدث العربية ومقره دبي، فتكون المكالمة وشرح الأوراق بلغتك.",
  props: [
    "مستشارون يتحدثون العربية ومقرهم دبي، لا مركز اتصال",
    "سند ملكية حر باسمك، دون حاجة إلى إقامة إماراتية للشراء",
    "إقامة ذهبية لعشر سنوات عند الاستثمار من 2,000,000 درهم",
    "شراء عن بُعد من بريطانيا: وكالة قانونية، توقيع رقمي، أقساط محمية بحساب ضمان",
  ],
  why: [
    {
      title: "وضع ضريبي لا تجده في بريطانيا",
      body: "لا تفرض الإمارات ضريبة عقارية سنوية ولا ضريبة أرباح رأسمالية ولا ضريبة على دخل الإيجار للأفراد. تبقى معاملة المملكة المتحدة للعقار الأجنبي سارية على المقيمين فيها، وهي سؤال لمستشارك الضريبي لا للوسيط العقاري.",
    },
    {
      title: "قاعدة بين بريطانيا والمنطقة",
      body: "دبي على بُعد نحو سبع ساعات من لندن وأقل من أربع من القاهرة وعمّان وبيروت والخليج. لعائلة موزعة بين بريطانيا والمنطقة، الشقة المملوكة نقطة ثابتة تخصّك بدل حجز فندقي في كل زيارة.",
    },
    {
      title: "حساب ضمان خاضع للرقابة، لا ثقة بالمطوّر",
      body: "أقساط البيع على الخارطة تُودع في حساب ضمان للمشروع تشرف عليه دائرة الأراضي والأملاك في دبي، ويُفرج عنها مقابل تقدم إنشائي موثّق، لا إلى حساب المطوّر مباشرة.",
    },
    {
      title: "إقامة، لا مجرد أصل",
      body: "الاستثمار العقاري من 2,000,000 درهم يدعم إقامة ذهبية لعشر سنوات لك ولزوجك وأبنائك. كل وحدة بثلاث غرف نوم في هذا المشروع تتجاوز هذا الحد.",
    },
    {
      title: "أرقام صادقة قبل الالتزام",
      body: "نحسب رسوم الخدمة وفترات الشغور وأتعاب الإدارة وتكاليف الخروج على الوحدة نفسها، بدل عائد إعلاني لا يصمد أمام الواقع.",
    },
  ],
  faqs: [
    {
      q: "هل أتعامل مع شخص يتحدث العربية؟",
      a: "نعم. مستشارك يتحدث العربية ومقره دبي، وليس مركز اتصال في الخارج. المكالمة وشرح العقد والمتابعة بعد الشراء تجري بلغتك، والمستندات الرسمية تبقى بالإنجليزية والعربية كما تصدرها الجهات الرسمية في دبي.",
    },
    {
      q: "هل يمكنني الشراء وأنا مقيم في المملكة المتحدة؟",
      a: "نعم، ودون سفر. تتم العملية بوكالة قانونية وتوقيع رقمي وتحقق هوية عن بُعد، ويصدر سند الملكية باسمك أنت. كثير من مشترينا لا يزورون دبي إلا بعد التسليم. جنسيتك أو جواز سفرك لا يقيّدان التملك الحر في المناطق المخصصة لذلك.",
    },
    {
      q: "كم أحتاج نقداً لحجز وحدة؟",
      a: "تبدأ الأسعار من 800,000 درهم للاستوديو. خطة العشرين بالمئة تعني نحو 195,600 درهم عند الحجز شاملة رسوم دائرة الأراضي والرسوم الإدارية، ثم واحد بالمئة شهرياً. نرسل لك جدول الدفعات كاملاً للوحدة التي تختارها قبل أي التزام.",
    },
    {
      q: "كيف تعمل الإقامة الذهبية؟",
      a: "الاستثمار العقاري من 2,000,000 درهم يؤهلك للتقدم بطلب إقامة ذهبية لعشر سنوات قابلة للتجديد، تشمل الزوج والأبناء. القرار يعود للجهات الإماراتية المختصة وليس لنا، ونحن نوضح فقط أي الوحدات تتجاوز الحد.",
    },
    {
      q: "كيف أحوّل المبلغ من المملكة المتحدة؟",
      a: "بحوالة مصرفية دولية بالجنيه الإسترليني تُحوَّل إلى الدرهم، مباشرة إلى حساب ضمان المشروع الخاضع للرقابة. نزوّدك ببيانات الحساب كتابةً وعلى ورق المطوّر الرسمي. سيطلب مصرفك البريطاني إثبات مصدر الأموال، وهذا إجراء معتاد لشراء عقار بهذا الحجم ولا علاقة له بدبي.",
    },
    {
      q: "ماذا يحمي أموالي قبل التسليم؟",
      a: "قانون البيع على الخارطة في دبي. كل دفعة تدخل حساب ضمان مخصص للمشروع تحت إشراف دائرة الأراضي والأملاك، ولا يستطيع المطوّر سحبها إلا مقابل مراحل بناء موثّقة. المشروع مسجّل ويحمل تصريح إعلان رسمي.",
    },
    {
      q: "ما العائد الذي يمكن توقعه؟",
      a: "التسليم في يونيو 2029، ولا يبدأ دخل الإيجار قبله. عوائد مجان الحالية للوحدات المشابهة تقع في نطاق معقول، ونحن نحسبها لك بعد خصم رسوم الخدمة البالغة 16 درهماً للقدم المربعة والشغور والإدارة، لا قبلها. أي رقم يُقدَّم قبل هذا الخصم رقم تسويقي.",
    },
  ],
  disclaimer:
    "OSAC Properties وسيط عقاري مسجّل لدى دائرة الأراضي والأملاك في دبي. لا نقدم تمويلاً عقارياً ولا استشارات ضريبية ولا قرارات تتعلق بالإقامة. الأسعار والتوافر يوردها المطوّر وتتغير دون إشعار.",
};

export const VINCITORE_MARKETS: Partial<Record<MarketId, Market>> = {
  europe: {
    id: "europe",
    path: "/lp/vincitore-wellness-estate/europe",
    dialCode: "+44",
    secondaryCurrency: USD,
    asksFundsSource: false,
    metaTitle: "Dubai Property for European Buyers — Vincitore Wellness Estate | OSAC Properties",
    metaDescription:
      "Freehold Dubai residences from AED 800,000, with a private pool in every home. No property tax, no capital gains tax, and a 10-year Golden Visa from AED 2M. Buy remotely from the UK or Europe.",
    en: {
      flag: "🇪🇺",
      eyebrow: "Dubai real estate · For buyers in the UK and Europe",
      h1: "Own a Dubai residence, and the residency that comes with it",
      sub: "Vincitore Wellness Estate, Majan, Dubai. Freehold apartments from AED 800,000 with a private pool in every home. Buy from AED 2M and you can apply for a 10-year UAE Golden Visa. OSAC prepares a private shortlist for buyers purchasing from the UK or Europe.",
      props: [
        "Freehold title in your own name, no UAE residency required to buy",
        "No annual property tax, no capital gains tax and no tax on rental income for individuals",
        "10-year Golden Visa available on property investment from AED 2,000,000",
        "Purchased remotely — power of attorney, digital signing, escrow-protected instalments",
      ],
      why: [
        {
          title: "A tax position you cannot get at home",
          body: "The UAE levies no annual property tax, no capital gains tax and no income tax on rental income for individuals. Your own country's tax treatment of a foreign property still applies and should be reviewed with your adviser.",
        },
        {
          title: "Regulated escrow, not developer trust",
          body: "Off-plan instalments are paid into a project escrow account regulated by the Dubai Land Department and released against verified construction progress.",
        },
        {
          title: "Residency, not just an asset",
          body: "Property investment from AED 2,000,000 can support a 10-year Golden Visa for you, your spouse and your children. Every three-bedroom here clears that threshold.",
        },
        {
          title: "Honest numbers before you commit",
          body: "We model service charges, vacancy, management and exit costs against the specific unit rather than quoting a headline yield that does not survive contact with reality.",
        },
      ],
      faqs: [
        faqOwnership(NAME),
        FAQ_REMOTE,
        FAQ_ESCROW,
        FAQ_VISA,
        {
          q: "How do I transfer the money from the UK or Europe?",
          a: "By international bank transfer directly into the project's regulated escrow account. We provide the escrow details in writing, on developer letterhead. Your own bank may ask for source-of-funds documentation, which is normal for a property purchase of this size.",
        },
        faqReturns(16, 2029),
      ],
      disclaimer:
        "OSAC Properties is a Dubai Land Department registered brokerage. We do not provide mortgages, financing, tax advice or immigration decisions. Prices and availability are supplied by the developer and change without notice.",
    },
    ar: AR_EUROPE,
  },

  india: {
    id: "india",
    path: "/lp/vincitore-wellness-estate/india",
    dialCode: "+91",
    secondaryCurrency: USD,
    asksFundsSource: false,
    metaTitle: "Dubai Property for Indian Investors — Vincitore Wellness Estate | OSAC Properties",
    metaDescription:
      "Freehold Dubai apartments from AED 800,000 (about USD 218,000). Staged payment plans that fit inside the LRS annual limit, and a 10-year Golden Visa from AED 2M.",
    en: {
      flag: "🇮🇳",
      eyebrow: "Dubai real estate · For investors in India",
      h1: "A Dubai address that fits inside your LRS limit",
      sub: "Vincitore Wellness Estate, Majan, Dubai. Freehold apartments from AED 800,000 with a private pool in every home. Twenty per cent to book, then one per cent monthly — so the yearly outflow stays well within the Liberalised Remittance Scheme. OSAC prepares a private shortlist for buyers purchasing from India.",
      props: [
        "Booking payment on a three-bedroom is around USD 176,000 — inside one person's annual LRS limit",
        "Freehold title in your own name, four hours from Mumbai",
        "10-year Golden Visa available on property investment from AED 2,000,000",
        "Purchased remotely — power of attorney, digital signing, escrow-protected instalments",
      ],
      why: [
        {
          title: "The payment plan is the LRS answer",
          body: "Under the Liberalised Remittance Scheme a resident individual may remit up to USD 250,000 per financial year, and immovable property abroad is a permitted use. A staged plan spreads a three-bedroom purchase across four financial years, and a married couple has two limits.",
        },
        {
          title: "Regulated escrow, not developer trust",
          body: "Off-plan instalments are paid into a project escrow account regulated by the Dubai Land Department and released against verified construction progress.",
        },
        {
          title: "Residency for the family",
          body: "Property investment from AED 2,000,000 can support a 10-year Golden Visa for you, your spouse and your children. Every three-bedroom here clears that threshold.",
        },
        {
          title: "Dirham-denominated, dollar-pegged",
          body: "The UAE dirham has been pegged to the US dollar since 1997. Property prices and rental performance still vary by unit, location and market conditions.",
        },
      ],
      faqs: [
        faqOwnership(NAME),
        {
          q: "Does this breach my LRS limit?",
          a: "It should not. LRS permits up to USD 250,000 per person per financial year for permitted purposes including immovable property abroad. On the twenty per cent booking, a one-bedroom is roughly USD 68,000 and a three-bedroom roughly USD 176,000, with the balance spread across later financial years. Confirm your own position with your chartered accountant.",
        },
        {
          q: "What about TCS on the remittance?",
          a: "Remittances above roughly ten lakh rupees in a financial year under LRS currently attract TCS at twenty per cent. TCS is creditable against your income tax liability, so it is a cash-flow cost rather than a lost cost. Your CA should confirm the current rate and your position.",
        },
        FAQ_REMOTE,
        FAQ_ESCROW,
        FAQ_VISA,
        faqReturns(16, 2029),
      ],
      disclaimer:
        "OSAC Properties is a Dubai Land Department registered brokerage. We do not provide loans, financing, tax advice or FEMA opinions. LRS and TCS positions must be confirmed with your own chartered accountant. Prices and availability are supplied by the developer and change without notice.",
    },
  },

  ethiopia: {
    id: "ethiopia",
    path: "/lp/vincitore-wellness-estate/ethiopia",
    dialCode: "+251",
    secondaryCurrency: USD,
    asksFundsSource: true,
    metaTitle: "Dubai Property for Ethiopian Buyers — Vincitore Wellness Estate | OSAC Properties",
    metaDescription:
      "Freehold Dubai apartments from AED 800,000. Speak to an Amharic-speaking advisor in Dubai about ownership, payment plans and how the transfer works.",
    en: {
      flag: "🇪🇹",
      eyebrow: "Dubai real estate · For buyers from Ethiopia",
      h1: "Own property in Dubai, with an advisor who speaks your language",
      sub: "Vincitore Wellness Estate, Majan, Dubai. Freehold apartments from AED 800,000 with a private pool in every home. Twenty per cent to book, then one per cent monthly. OSAC has an Amharic-speaking advisor in Dubai who will walk you through ownership, the payment plan and how the transfer is arranged, start to finish.",
      props: [
        "Freehold title registered in your own name at the Dubai Land Department",
        "An Amharic-speaking advisor based in Dubai, not a call centre",
        "Instalments paid into a government-regulated escrow account, never to an individual",
        "Purchased remotely — you do not need to travel to Dubai to buy",
      ],
      why: [
        {
          title: "We tell you about the transfer before you commit",
          body: "Moving funds out of Ethiopia for a foreign property purchase is the hardest part of this transaction, and most brokers will not raise it until after you have signed. We ask about it in the first conversation, because a purchase you cannot fund helps nobody.",
        },
        {
          title: "Regulated escrow, not a private account",
          body: "Every instalment goes into the project's escrow account regulated by the Dubai Land Department. You will never be asked to send money to an individual, an agent or an unnamed company.",
        },
        {
          title: "A real title deed",
          body: "Freehold ownership registered in your own name at the Dubai Land Department, verifiable independently. Not a share, not a lease, not a promise.",
        },
        {
          title: "Residency for the family",
          body: "Property investment from AED 2,000,000 can support a 10-year UAE Golden Visa for you, your spouse and your children. Eligibility is confirmed in writing before you commit.",
        },
      ],
      faqs: [
        faqOwnership(NAME),
        {
          q: "How do I move the funds out of Ethiopia?",
          a: "Honestly: this is the part that needs checking first. Ethiopia's foreign exchange regime was substantially liberalised in July 2024, but the capital account remains restricted, and an individual resident moving capital abroad to buy foreign property is not a routine over-the-counter transaction. In practice most Ethiopian buyers complete a Dubai purchase using funds already held in a foreign-currency account outside Ethiopia, earnings held abroad by their business, or a family member abroad who transfers on their behalf. Tell us which of those applies to you and we will tell you straight away whether the purchase is workable.",
        },
        FAQ_REMOTE,
        FAQ_ESCROW,
        FAQ_VISA,
        {
          q: "How do I know OSAC Properties is real?",
          a: "We are a Dubai Land Department registered brokerage with a licensed office in Business Bay, Dubai. Our licence number and ORN are in the footer of this page and can be verified independently with the Dubai Land Department. We never ask for money to be sent to a personal account.",
        },
        faqReturns(16, 2029),
      ],
      disclaimer:
        "OSAC Properties is a Dubai Land Department registered brokerage. We do not provide loans, financing, visas or employment, and we do not advise on Ethiopian foreign exchange regulations. Confirm any outbound transfer with your bank and your own legal adviser before committing funds.",
    },
    am: {
      flag: "🇪🇹",
      eyebrow: "የዱባይ ሪል እስቴት · ከኢትዮጵያ ለሚገዙ",
      h1: "በዱባይ ንብረት ይኑርዎት፤ ቋንቋዎን ከሚናገር አማካሪ ጋር",
      sub: "ቪንቺቶሬ ዌልነስ እስቴት፣ ማጃን፣ ዱባይ። በእያንዳንዱ ቤት ውስጥ የግል መዋኛ ገንዳ ያለው፣ ከ800,000 ድርሃም ጀምሮ ሙሉ የባለቤትነት መብት ያለው አፓርታማ። 20% ለማስያዝ፣ ከዚያ በወር 1%። OSAC በዱባይ ውስጥ አማርኛ የሚናገር አማካሪ አለው፤ ስለ ባለቤትነት፣ ስለ ክፍያ እቅዱና ገንዘቡ እንዴት እንደሚተላለፍ ከጅምሩ እስከ መጨረሻው ያስረዳዎታል።",
      props: [
        "በዱባይ መሬት አስተዳደር በእርስዎ ስም የሚመዘገብ ሙሉ የባለቤትነት መብት",
        "በዱባይ የሚገኝ አማርኛ ተናጋሪ አማካሪ — የጥሪ ማዕከል አይደለም",
        "ክፍያዎች በመንግስት ቁጥጥር ስር ወዳለ የኤስክሮ ሂሳብ ይገባሉ፤ ለግለሰብ ፈጽሞ አይከፈልም",
        "ከርቀት መግዛት ይቻላል — ለመግዛት ወደ ዱባይ መጓዝ አያስፈልግዎትም",
      ],
      why: [
        {
          title: "ስለ ገንዘብ ዝውውሩ ቀድመን እንነግርዎታለን",
          body: "ከኢትዮጵያ ገንዘብ አውጥቶ የውጭ ንብረት መግዛት የዚህ ግብይት በጣም ከባዱ ክፍል ነው። አብዛኞቹ ደላሎች ይህን የሚያነሱት ከፈረሙ በኋላ ነው። እኛ ግን በመጀመሪያው ንግግር እንጠይቃለን፤ ምክንያቱም መክፈል የማይችሉት ግዢ ለማንም አይጠቅምም።",
        },
        {
          title: "ቁጥጥር የሚደረግበት ኤስክሮ እንጂ የግል ሂሳብ አይደለም",
          body: "እያንዳንዱ ክፍያ በዱባይ መሬት አስተዳደር ቁጥጥር ወደሚደረግበት የፕሮጀክቱ የኤስክሮ ሂሳብ ይገባል። ለግለሰብ፣ ለወኪል ወይም ስም ለሌለው ኩባንያ ገንዘብ እንዲልኩ ፈጽሞ አይጠየቁም።",
        },
        {
          title: "እውነተኛ የባለቤትነት ማረጋገጫ",
          body: "በዱባይ መሬት አስተዳደር በእርስዎ ስም የተመዘገበ ሙሉ ባለቤትነት፤ በራስዎ ማረጋገጥ ይችላሉ። ድርሻ አይደለም፣ ኪራይ አይደለም፣ ተስፋ አይደለም።",
        },
        {
          title: "ለቤተሰብ የመኖሪያ ፈቃድ",
          body: "ከ2,000,000 ድርሃም በላይ የሆነ የንብረት ግዢ ለእርስዎ፣ ለትዳር አጋርዎና ለልጆችዎ የ10 ዓመት የኤምሬትስ ወርቅ ቪዛ ሊያስገኝ ይችላል። ከመወሰንዎ በፊት ብቁነትዎ በጽሁፍ ይረጋገጣል።",
        },
      ],
      faqs: [
        {
          q: "የውጭ ዜጎች በዱባይ ንብረት በህጋዊ መንገድ መያዝ ይችላሉ?",
          a: "አዎ። ቪንቺቶሬ ዌልነስ እስቴት ሙሉ ባለቤትነት በሚፈቀድበት ዞን ውስጥ ነው። ይህ ማለት የባለቤትነት ማረጋገጫው በዱባይ መሬት አስተዳደር በእርስዎ ስም ይመዘገባል። የኤምሬትስ ነዋሪ መሆን አያስፈልግም።",
        },
        {
          q: "ገንዘቡን ከኢትዮጵያ እንዴት አወጣለሁ?",
          a: "በግልጽ እንነጋገር፦ ይህ መጀመሪያ መጣራት ያለበት ጉዳይ ነው። ኢትዮጵያ በሐምሌ 2024 የውጭ ምንዛሪ ስርዓቷን በእጅጉ ብታሻሽልም፣ የካፒታል ሂሳብ አሁንም የተገደበ ነው። አብዛኞቹ ኢትዮጵያውያን ገዢዎች ግዢውን የሚፈጽሙት ከኢትዮጵያ ውጪ ባለ የውጭ ምንዛሪ ሂሳብ ባለው ገንዘብ፣ ንግዳቸው በውጭ አገር ባስቀመጠው ገቢ፣ ወይም በውጭ አገር የሚኖር የቤተሰብ አባል በኩል ነው። ከእነዚህ የትኛው እንደሚመለከትዎ ይንገሩን፤ ግዢው ሊሳካ የሚችል መሆኑን ወዲያውኑ እንነግርዎታለን።",
        },
        {
          q: "ለመግዛት ወደ ዱባይ መምጣት አለብኝ?",
          a: "አያስፈልግም። ግዢው በውክልና ሰነድ፣ በዲጂታል ፊርማና በርቀት የማንነት ማረጋገጫ ከርቀት ሊጠናቀቅ ይችላል።",
        },
        {
          q: "ከርክክብ በፊት ገንዘቤ የት ነው የሚቀመጠው?",
          a: "በዱባይ መሬት አስተዳደር ቁጥጥር ወደሚደረግበት የፕሮጀክቱ የኤስክሮ ሂሳብ ይገባል። ክፍያዎች ለአልሚው የሚለቀቁት በተረጋገጠ የግንባታ ሂደት መሰረት እንጂ በቀጥታ አይደለም።",
        },
        {
          q: "OSAC Properties እውነተኛ መሆኑን እንዴት አውቃለሁ?",
          a: "በዱባይ ቢዝነስ ቤይ ውስጥ ፈቃድ ያለው ቢሮ ያለን፣ በዱባይ መሬት አስተዳደር የተመዘገብን ደላላ ነን። የፈቃድ ቁጥራችንና ORN በዚህ ገጽ ግርጌ ላይ ይገኛሉ፤ በራስዎ ማረጋገጥ ይችላሉ። ገንዘብ ወደ ግል ሂሳብ እንዲላክ ፈጽሞ አንጠይቅም።",
        },
        {
          q: "ምን ያህል ትርፍ መጠበቅ አለብኝ?",
          a: "የተጋነነ የትርፍ መጠን አንናገርም። የኪራይ ገቢ በክፍሉ ዓይነት፣ በ2029 በሚኖረው የገበያ ሁኔታ፣ በአገልግሎት ክፍያ (በካሬ ጫማ 16 ድርሃም)፣ በባዶ የመቆያ ጊዜና በአስተዳደር ወጪዎች ይወሰናል። ከእርስዎ ጋር ሆነን በተወሰነ ክፍል ላይ እነዚህን እናሰላለን።",
        },
      ],
      disclaimer:
        "OSAC Properties በዱባይ መሬት አስተዳደር የተመዘገበ ደላላ ነው። ብድር፣ ፋይናንስ፣ ቪዛ ወይም ስራ አንሰጥም፤ በኢትዮጵያ የውጭ ምንዛሪ ደንቦች ላይም ምክር አንሰጥም። ማንኛውንም ገንዘብ ከመላክዎ በፊት ከባንክዎና ከህግ አማካሪዎ ጋር ያረጋግጡ።",
    },
  },
};
