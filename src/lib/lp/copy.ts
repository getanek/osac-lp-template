/**
 * Landing page copy: English, Amharic, Arabic.
 *
 * The Amharic variant exists for Ethiopian traffic and the Arabic variant for
 * Arabic-speaking buyers in Germany and Canada, where the ads are targeted by
 * language. See output/osac/vincitore-wellness-estate/05-geo-playbook.md.
 *
 * BOTH the Amharic and Arabic strings are a first pass by a non-native writer
 * and must be reviewed by a native speaker on the OSAC desk before the variant
 * takes paid traffic. The Ethio team covers Amharic, the Tiger desk Arabic.
 */

export type Lang = "en" | "am" | "ar";

export interface LpCopy {
  lang: Lang;
  dir: "ltr" | "rtl";
  hrefSelf: string;
  hrefOther: string;
  otherLabel: string;

  eyebrow: string;
  h1: string;
  sub: string;
  trust: string[];
  ctaPrimary: string;

  pricesTitle: string;
  pricesLabel: string;
  colType: string;
  colSize: string;
  colPrice: string;
  colBooking: string;
  colMonthly: string;
  pricesNote: string;
  goldenVisaTag: string;
  goldenVisaTagUpper: string;

  highlightsLabel: string;
  highlightsTitle: string;

  abroadLabel: string;
  abroadTitle: string;

  visaLabel: string;
  visaTitle: string;
  visaBody: string;
  visaCta: string;
  visaDisclaimer: string;

  plansLabel: string;
  plansTitle: string;
  plansCta: string;

  amenitiesLabel: string;
  amenitiesTitle: string;

  locationLabel: string;
  locationTitle: string;
  locationSub: string;

  faqLabel: string;
  faqTitle: string;

  finalTitle: string;
  finalSub: string;

  contactHeading: string;
  fieldFundsHint: string;

  trustChips: string[];
  regulatedLine: string;

  oppLabel: string;
  oppTitle: string;
  oppSub: string;
  oppTagOffPlan: string;
  oppFrom: string;
  oppPlan: string;
  oppHandover: string;
  oppNote: string;
  oppCta: string;

  briefLabel: string;
  briefTitle: string;
  briefSub: string;
  briefCardTitle: string;
  briefCardTag: string;
  briefItems: string[];
  briefNote: string;
  briefCta: string;

  whyLabel: string;
  whyOsacTitle: string;
  whyOsacItems: string[];

  galleryLabel: string;
  galleryTitle: string;

  plansImagesLabel: string;
  plansImagesTitle: string;
  plansImagesSub: string;
  plansImagesCta: string;

  openInMaps: string;


  trackLabel: string;
  trackTitle: string;
  trackSub: string;
  trackDelivered: string;
  trackBuilding: string;
  trackNote: string;

  testimonialsLabel: string;
  testimonialsTitle: string;

  formTitle: string;
  formSub: string;
  /** "{n}" and "{total}" are substituted at render time. A function here cannot cross the server-to-client boundary. */
  formStep: string;
  fieldUnit: string;
  fieldBudget: string;
  fieldTimeline: string;
  fieldPurpose: string;
  fieldVisa: string;
  fieldLocation: string;
  fieldFunds: string;
  fieldHandoverFunding: string;
  fieldHandoverFundingHint: string;
  fieldName: string;
  fieldPhone: string;
  fieldEmail: string;
  next: string;
  back: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  successCta: string;
  errorBody: string;
  consent: string;
  required: string;

  /**
   * Localised answer labels, keyed by the option value in the project's own
   * data module. English falls through to the option's own label, so only the
   * non-English variants need to fill this in.
   */
  labels?: Record<string, string>;
}

const trailer =
  "OSAC Properties · Dubai Land Department registered brokerage · ORN and permit number in the footer";

/** The same line in Arabic. An English trailer under Arabic consent copy reads
 *  as a template nobody finished, on the one line that has to look deliberate. */
const trailerAr =
  "OSAC Properties · وسيط عقاري مسجل لدى دائرة الأراضي والأملاك · رقم التسجيل ورقم التصريح في أسفل الصفحة";

export const EN: LpCopy = {
  lang: "en",
  dir: "ltr",
  hrefSelf: "/lp/vincitore-wellness-estate",
  hrefOther: "/lp/vincitore-wellness-estate/am",
  otherLabel: "አማርኛ",

  eyebrow: "Majan, Dubai · Handover June 2029",
  h1: "A private pool in every home",
  sub: "Vincitore Wellness Estate. Studios to three bedrooms in Majan, Dubai, from AED 800,000. Twenty per cent to book, then one per cent a month.",
  trust: ["Freehold ownership", "20% down, 1% monthly", "2% DLD waiver plan", "Semi-furnished"],
  ctaPrimary: "Get the price list",

  pricesTitle: "Prices and entry cost",
  pricesLabel: "What it actually costs",
  colType: "Residence",
  colSize: "Size",
  colPrice: "Price from",
  colBooking: "Cash to book",
  colMonthly: "Monthly at 1%",
  pricesNote:
    "Booking figure includes the 4% Dubai Land Department fee and the AED 3,600 admin fee. Prices are indicative and subject to availability on the day.",
  goldenVisaTag: "Golden Visa eligible",
  goldenVisaTagUpper: "Upper units qualify",

  highlightsLabel: "The building",
  highlightsTitle: "Why this one is different",

  abroadLabel: "Buying from outside the UAE",
  abroadTitle: "You can do all of this without leaving home",

  visaLabel: "Residency",
  visaTitle: "Buy from AED 2M and you qualify for a 10-year UAE Golden Visa",
  visaBody:
    "A property investment of AED 2,000,000 or more can qualify you, your spouse and your children for ten-year UAE residency. Every three-bedroom residence here clears that line comfortably, and the larger two-bedrooms sit just under it.",
  visaCta: "Send me the units that qualify",
  visaDisclaimer:
    "Golden Visa eligibility depends on current UAE immigration rules and developer approval status. We confirm your eligibility in writing before you commit to anything.",

  plansLabel: "Payment",
  plansTitle: "Three ways to pay",
  plansCta: "Which plan fits me? Ask an advisor",

  amenitiesLabel: "Facilities",
  amenitiesTitle: "Twenty-plus wellness facilities inside the building",

  locationLabel: "Location",
  locationTitle: "Majan is closer than people think",
  locationSub: "Direct access from Sheikh Mohammed Bin Zayed Road, with Al Barari as a neighbour.",

  faqLabel: "Questions",
  faqTitle: "The things buyers ask first",

  finalTitle: "Get the full price list, floor plans and payment plans",
  finalSub: "Prepared and sent by a Dubai-based advisor, usually within the hour.",

  contactHeading: "Where should we send your shortlist?",
  fieldFundsHint:
    "We ask this first because it decides whether the purchase is workable. There is no wrong answer, and it stays between us.",

  trustChips: [
    "Dubai Land Department registered",
    "Regulated project escrow",
    "Unit-level price comparisons",
    "Remote buyer support",
  ],
  regulatedLine: "Regulated by the Dubai Land Department (RERA)",

  oppLabel: "Current opportunity",
  oppTitle: "See the actual numbers before you enquire",
  oppSub:
    "Your shortlist starts from released units that match your budget. This is the level of pricing and transaction detail we prepare for you — not a generic Dubai brochure.",
  oppTagOffPlan: "Off-plan",
  oppFrom: "From",
  oppPlan: "Plan",
  oppHandover: "Handover",
  oppNote:
    "Availability, pricing, specification and payment terms are confirmed with the developer at enquiry.",
  oppCta: "Request this and comparable units",

  briefLabel: "What you receive",
  briefTitle: "Know exactly what you are comparing before you commit",
  briefSub:
    "Your brief is built around units that are actually released, with the commercial detail you need to make a first decision from abroad.",
  briefCardTitle: "Private acquisition brief",
  briefCardTag: "Prepared for you",
  briefItems: [
    "Released units and current asking prices",
    "Payment schedule and the exact cash needed to book",
    "Handover date and the developer's delivery record",
    "Service charges, DLD fees and rental assumptions",
  ],
  briefNote:
    "Figures are supplied per released unit. Rental and value projections are estimates, not guarantees, and should be reviewed with your own legal and tax advisers.",
  briefCta: "Build my shortlist",

  whyLabel: "Why Dubai",
  whyOsacTitle: "Why buy through OSAC",
  whyOsacItems: [
    "Advisors who match a residence to your budget, from the AED 800,000 entry point upward.",
    "Direct developer access to released inventory and payment plans, not portal listings.",
    "The whole purchase handled remotely: video walkthrough, paperwork, escrow, handover.",
    "Honest numbers before you commit — service charges, fees and exit costs, not a headline yield.",
  ],

  galleryLabel: "The building",
  galleryTitle: "A wellness resort that happens to be your address",

  plansImagesLabel: "Layouts",
  plansImagesTitle: "Floor plans for every layout",
  plansImagesSub:
    "Dimensioned plans for the studio, one, two and three bedroom residences are sent with your shortlist.",
  plansImagesCta: "Unlock plans",

  openInMaps: "Open in Google Maps",


  trackLabel: "Developer track record",
  trackTitle: "Vincitore has been delivering in Dubai since 2018",
  trackSub:
    "{delivered} completed projects handed over, and three more in construction. You can verify every one of them with the Dubai Land Department.",
  trackDelivered: "Delivered",
  trackBuilding: "Handover",
  trackNote:
    "Project list and handover dates are as published by the developer and Dubai Land Department records. Past delivery is not a guarantee of future performance.",

  testimonialsLabel: "Buyers",
  testimonialsTitle: "What buyers say after handover",

  formTitle: "Get your private shortlist",
  formSub: "Floor plans and payment schedules included.",
  formStep: "Step {n} of {total}",
  fieldUnit: "Which size are you looking at?",
  fieldBudget: "What is your budget?",
  fieldTimeline: "When are you looking to buy?",
  fieldPurpose: "Are you buying to live in or to invest?",
  fieldVisa: "Would a 10-year UAE Golden Visa matter to you?",
  fieldLocation: "Where are you based?",
  fieldFunds: "How would the payment be made?",
  fieldHandoverFunding: "The final 60% is due at handover in December 2028. How would you cover it?",
  fieldHandoverFundingHint:
    "We ask because this plan ends in one large payment rather than small monthly ones. There is no wrong answer, but a straight one saves you three years of instalments on a purchase you cannot finish.",
  fieldName: "Full name",
  fieldPhone: "Phone number with country code",
  fieldEmail: "Email address",
  next: "Continue",
  back: "Back",
  submit: "Send me prices and floor plans",
  submitting: "Sending",
  successTitle: "Your price list is on the way",
  successBody:
    "An advisor is preparing your shortlist now and will be in touch shortly. If you would rather not wait, call us and we will send it straight away.",
  successCta: "Call us now",
  errorBody: "Something went wrong sending that. Please try again, or call us on the number above.",
  consent: `By submitting you agree to be contacted about this project. ${trailer}.`,
  required: "Required",
};

export const AM: LpCopy = {
  lang: "am",
  dir: "ltr",
  hrefSelf: "/lp/vincitore-wellness-estate/am",
  hrefOther: "/lp/vincitore-wellness-estate",
  otherLabel: "English",

  eyebrow: "ማጃን፣ ዱባይ · ርክክብ ሰኔ 2029",
  h1: "በእያንዳንዱ ቤት ውስጥ የግል መዋኛ ገንዳ",
  sub: "ቪንቺቶሬ ዌልነስ እስቴት። በዱባይ ማጃን አካባቢ ስቱዲዮ እስከ ሶስት መኝታ ቤት፣ ከ800,000 ድርሃም ጀምሮ። 20% በቅድሚያ፣ ከዚያ በወር 1%።",
  trust: ["ሙሉ የባለቤትነት መብት", "20% ቅድመ ክፍያ፣ በወር 1%", "የ2% DLD ቅናሽ እቅድ", "በከፊል የተዘጋጀ"],
  ctaPrimary: "የዋጋ ዝርዝር ይቀበሉ",

  pricesTitle: "ዋጋና የመጀመሪያ ክፍያ",
  pricesLabel: "በእውነት ምን ያህል ያስወጣል",
  colType: "የቤት ዓይነት",
  colSize: "ስፋት",
  colPrice: "ዋጋ ከ",
  colBooking: "ለቦታ ማስያዝ የሚከፈል",
  colMonthly: "በወር 1%",
  pricesNote:
    "የማስያዣ ክፍያው የ4% የዱባይ መሬት አስተዳደር ክፍያንና የ3,600 ድርሃም የአስተዳደር ክፍያን ያካትታል። ዋጋዎች እንደ ክፍሎቹ ተገኝነት ሊለወጡ ይችላሉ።",
  goldenVisaTag: "ለወርቅ ቪዛ ብቁ",
  goldenVisaTagUpper: "ትላልቆቹ ክፍሎች ብቁ ናቸው",

  highlightsLabel: "ስለ ህንጻው",
  highlightsTitle: "ይህ ለምን ለየት ይላል",

  abroadLabel: "ከኢትዮጵያ ሆነው መግዛት",
  abroadTitle: "ሁሉንም ነገር ከቤትዎ ሆነው መፈጸም ይችላሉ",

  visaLabel: "የመኖሪያ ፈቃድ",
  visaTitle: "ከ2 ሚሊዮን ድርሃም በላይ ሲገዙ ለ10 ዓመት የተባበሩት አረብ ኤምሬትስ ወርቅ ቪዛ ብቁ ይሆናሉ",
  visaBody:
    "ከ2,000,000 ድርሃም በላይ የሆነ የንብረት ግዢ ለእርስዎ፣ ለትዳር አጋርዎና ለልጆችዎ የአስር ዓመት የመኖሪያ ፈቃድ ሊያስገኝ ይችላል። እዚህ ያሉት ሶስት መኝታ ቤቶች በሙሉ ከዚህ መስፈርት በላይ ናቸው።",
  visaCta: "ብቁ የሆኑትን ክፍሎች ላኩልኝ",
  visaDisclaimer:
    "የወርቅ ቪዛ ብቁነት አሁን ባለው የኤምሬትስ የኢሚግሬሽን ህግና በአልሚው የፈቃድ ሁኔታ ላይ የተመሰረተ ነው። ማንኛውንም ውሳኔ ከመወሰንዎ በፊት ብቁነትዎን በጽሁፍ እናረጋግጣለን።",

  plansLabel: "የክፍያ እቅድ",
  plansTitle: "ሶስት የክፍያ አማራጮች",
  plansCta: "የቱ እቅድ ይስማማኛል? አማካሪ ያናግሩ",

  amenitiesLabel: "አገልግሎቶች",
  amenitiesTitle: "በህንጻው ውስጥ ከ20 በላይ የጤናና ደህንነት አገልግሎቶች",

  locationLabel: "አካባቢ",
  locationTitle: "ማጃን ከሚታሰበው በላይ ቅርብ ነው",
  locationSub: "ከሼክ መሐመድ ቢን ዛይድ መንገድ ቀጥታ መግቢያ አለው፤ አል ባራሪ ጎረቤቱ ነው።",

  faqLabel: "ጥያቄዎች",
  faqTitle: "ገዢዎች መጀመሪያ የሚጠይቁት",

  finalTitle: "ሙሉ የዋጋ ዝርዝር፣ የቤት ንድፎችና የክፍያ እቅዶች ያግኙ",
  finalSub: "በዱባይ ካለ አማካሪ ተዘጋጅቶ አብዛኛውን ጊዜ በአንድ ሰዓት ውስጥ ይላካል።",

  contactHeading: "ዝርዝሩን ወዴት እንላክልዎት?",
  fieldFundsHint:
    "ይህን አስቀድመን የምንጠይቀው ግዢው ሊሳካ የሚችል መሆኑን ስለሚወስን ነው። የተሳሳተ መልስ የለም፤ በእኛና በእርስዎ መካከል ብቻ ይቀራል።",

  trustChips: [
    "በዱባይ መሬት አስተዳደር የተመዘገበ",
    "ቁጥጥር የሚደረግበት የፕሮጀክት ኤስክሮ",
    "በክፍል ደረጃ የዋጋ ንጽጽር",
    "ከርቀት ለሚገዙ ድጋፍ",
  ],
  regulatedLine: "በዱባይ መሬት አስተዳደር (RERA) ቁጥጥር ስር",

  oppLabel: "አሁን ያለ ዕድል",
  oppTitle: "ከመጠየቅዎ በፊት ትክክለኛዎቹን ቁጥሮች ይመልከቱ",
  oppSub:
    "ዝርዝርዎ የሚጀምረው ከበጀትዎ ጋር ከሚስማሙ በእውነት ከተለቀቁ ክፍሎች ነው። ይህ ለእርስዎ የምናዘጋጀው የዋጋና የግብይት ዝርዝር ደረጃ ነው።",
  oppTagOffPlan: "ኦፍ-ፕላን",
  oppFrom: "ከ",
  oppPlan: "እቅድ",
  oppHandover: "ርክክብ",
  oppNote: "ተገኝነት፣ ዋጋ፣ ዝርዝር መግለጫና የክፍያ ውሎች በጥያቄ ወቅት ከአልሚው ጋር ይረጋገጣሉ።",
  oppCta: "ይህንንና ተመሳሳይ ክፍሎችን ይጠይቁ",

  briefLabel: "የሚያገኙት ነገር",
  briefTitle: "ከመወሰንዎ በፊት ምን እያነጻጸሩ እንደሆነ በትክክል ይወቁ",
  briefSub:
    "ዝርዝርዎ የሚዘጋጀው በእውነት ከተለቀቁ ክፍሎች ላይ ነው፤ ከውጭ ሆነው የመጀመሪያ ውሳኔ ለመስጠት የሚያስፈልግዎትን ሁሉ ይዟል።",
  briefCardTitle: "የግል የግዢ ማጠቃለያ",
  briefCardTag: "ለእርስዎ የተዘጋጀ",
  briefItems: [
    "የተለቀቁ ክፍሎችና አሁን ያሉ ዋጋዎች",
    "የክፍያ መርሃ ግብርና ለማስያዝ የሚያስፈልገው ትክክለኛ ገንዘብ",
    "የርክክብ ቀንና የአልሚው የማስረከብ ታሪክ",
    "የአገልግሎት ክፍያ፣ የDLD ክፍያና የኪራይ ግምቶች",
  ],
  briefNote:
    "አኃዞቹ በእያንዳንዱ የተለቀቀ ክፍል መሰረት ናቸው። የኪራይና የዋጋ ግምቶች ዋስትና ሳይሆኑ ግምቶች ናቸው፤ ከራስዎ የህግና የግብር አማካሪ ጋር ሊገመገሙ ይገባል።",
  briefCta: "ዝርዝሬን አዘጋጁልኝ",

  whyLabel: "ለምን ዱባይ",
  whyOsacTitle: "ለምን በOSAC በኩል",
  whyOsacItems: [
    "ከ800,000 ድርሃም ጀምሮ ከበጀትዎ ጋር የሚስማማ ቤት የሚያገናኙ አማካሪዎች።",
    "ቀጥታ ከአልሚው የተለቀቁ ክፍሎችና የክፍያ እቅዶች — ከድረ-ገጽ ማስታወቂያ አይደለም።",
    "ሙሉ ግዢው ከርቀት ይከናወናል፦ የቪዲዮ ጉብኝት፣ ሰነዶች፣ ኤስክሮ፣ ርክክብ።",
    "ከመወሰንዎ በፊት ግልጽ ቁጥሮች — የአገልግሎት ክፍያ፣ ወጪዎችና የመውጫ ወጪዎች።",
  ],

  galleryLabel: "ስለ ህንጻው",
  galleryTitle: "አድራሻዎ የሆነ የጤናና እረፍት መዝናኛ",

  plansImagesLabel: "የቤት ንድፎች",
  plansImagesTitle: "ለእያንዳንዱ ዓይነት የቤት ንድፍ",
  plansImagesSub:
    "የስቱዲዮ፣ የአንድ፣ የሁለትና የሶስት መኝታ ቤቶች ሙሉ የመለኪያ ንድፎች ከዝርዝርዎ ጋር ይላካሉ።",
  plansImagesCta: "ንድፎችን ይክፈቱ",

  openInMaps: "በጉግል ካርታ ይክፈቱ",


  trackLabel: "የአልሚው ልምድ",
  trackTitle: "ቪንቺቶሬ ከ2018 ጀምሮ በዱባይ እያስረከበ ነው",
  trackSub:
    "{delivered} ፕሮጀክቶች ተጠናቀው ተላልፈዋል፤ ሶስት ተጨማሪዎች በግንባታ ላይ ናቸው። እያንዳንዱን በዱባይ መሬት አስተዳደር ማረጋገጥ ይችላሉ።",
  trackDelivered: "ተላልፏል",
  trackBuilding: "ርክክብ",
  trackNote:
    "የፕሮጀክት ዝርዝርና የርክክብ ቀናት አልሚው ባሳተመውና በዱባይ መሬት አስተዳደር መዝገብ መሰረት ናቸው። ያለፈ አፈጻጸም ለወደፊቱ ዋስትና አይደለም።",

  testimonialsLabel: "ገዢዎች",
  testimonialsTitle: "ገዢዎች ከርክክብ በኋላ የሚሉት",

  formTitle: "የግል ዝርዝርዎን ያግኙ",
  formSub: "የቤት ንድፎችና የክፍያ እቅዶች ተካተዋል።",
  formStep: "ደረጃ {n} ከ{total}",
  fieldUnit: "የትኛውን መጠን እየፈለጉ ነው?",
  fieldBudget: "በጀትዎ ምን ያህል ነው?",
  fieldTimeline: "መቼ ለመግዛት አስበዋል?",
  fieldPurpose: "ለመኖር ነው ወይስ ለኢንቨስትመንት?",
  fieldVisa: "የ10 ዓመት የኤምሬትስ ወርቅ ቪዛ ለእርስዎ ጠቃሚ ነው?",
  fieldLocation: "የት ነው የሚኖሩት?",
  fieldFunds: "ክፍያው እንዴት ይፈጸማል?",
  fieldHandoverFunding: "የመጨረሻው 60% በርክክብ ጊዜ ይከፈላል። እንዴት ይሸፍኑታል?",
  fieldHandoverFundingHint:
    "ይህ እቅድ በትንንሽ ወርሃዊ ክፍያዎች ሳይሆን በአንድ ትልቅ ክፍያ ስለሚጠናቀቅ እንጠይቃለን። የተሳሳተ መልስ የለም።",
  fieldName: "ሙሉ ስም",
  fieldPhone: "ስልክ ቁጥር ከአገር ኮድ ጋር",
  fieldEmail: "ኢሜይል",
  next: "ቀጥል",
  back: "ተመለስ",
  submit: "ዋጋና ንድፎችን ላኩልኝ",
  submitting: "እየተላከ ነው",
  successTitle: "የዋጋ ዝርዝርዎ በመንገድ ላይ ነው",
  successBody:
    "አማካሪ ዝርዝርዎን በማዘጋጀት ላይ ነው፤ በቅርቡ ያገኝዎታል። መጠበቅ ካልፈለጉ ይደውሉልን፤ ወዲያውኑ እንልክልዎታለን።",
  successCta: "አሁን ይደውሉ",
  errorBody: "በመላክ ላይ ችግር ተፈጥሯል። እባክዎ እንደገና ይሞክሩ ወይም ከላይ ባለው ቁጥር ይደውሉ።",
  consent: "በመላክዎ ስለዚህ ፕሮጀክት እንድናገኝዎት ፈቃደኛ ይሆናሉ። OSAC Properties · በዱባይ መሬት አስተዳደር የተመዘገበ ደላላ።",
  required: "ያስፈልጋል",

  labels: {
    // unit
    studio: "ስቱዲዮ — ከ800 ሺህ እስከ 966 ሺህ ድርሃም",
    "1br": "1 መኝታ ቤት — ከ1.24 እስከ 1.55 ሚሊዮን ድርሃም",
    "2br": "2 መኝታ ቤት — ከ1.76 እስከ 2.30 ሚሊዮን ድርሃም",
    "3br": "3 መኝታ ቤት — ከ3.23 እስከ 3.49 ሚሊዮን ድርሃም",
    unsure: "እስካሁን አልወሰንኩም፤ ሁሉንም ላኩልኝ",
    // budget
    "under-1m": "ከ1 ሚሊዮን ድርሃም በታች",
    "1m-2m": "ከ1 እስከ 2 ሚሊዮን ድርሃም",
    "2m-3.5m": "ከ2 እስከ 3.5 ሚሊዮን ድርሃም",
    "above-3.5m": "ከ3.5 ሚሊዮን ድርሃም በላይ",
    // timeline
    "30-days": "በ30 ቀናት ውስጥ",
    "1-3-months": "ከ1 እስከ 3 ወር",
    "3-6-months": "ከ3 እስከ 6 ወር",
    researching: "እየተመለከትኩ ብቻ ነው",
    // purpose
    live: "ለመኖር",
    invest: "ለኢንቨስትመንት ወይም ለኪራይ",
    both: "ለሁለቱም",
    // golden visa
    "main-reason": "አዎ፣ ዋና ምክንያቴ ነው",
    bonus: "አዎ፣ ተጨማሪ ጥቅም ነው",
    "not-important": "አስፈላጊ አይደለም",
    // location
    india: "ሕንድ",
    europe: "እንግሊዝ ወይም አውሮፓ",
    ethiopia: "ኢትዮጵያ",
    "uae-gcc": "ኤምሬትስ ወይም ባህረ ሰላጤ አገራት",
    other: "ሌላ ቦታ",
    // funds (Ethiopia only)
    "foreign-account": "ከኢትዮጵያ ውጪ በውጭ ምንዛሪ ሂሳብ ገንዘብ አለኝ",
    "family-abroad": "በውጭ አገር ያለ የቤተሰብ አባል ይልክልኛል",
    "business-abroad": "የእኔ ንግድ በውጭ አገር ገቢ አለው",
    "birr-in-ethiopia": "ገንዘቡ በኢትዮጵያ ውስጥ በብር ነው",
  },
};

/**
 * Arabic, Modern Standard, for the Germany and Canada pages where Meta targets
 * by language. Written for a diaspora buyer, not a Gulf resident: the argument
 * is a freehold home in Dubai bought from abroad, not a local purchase.
 *
 * FIRST PASS BY A NON-NATIVE WRITER. The Tiger desk must read this before the
 * variant takes paid traffic. Numerals are kept as Western digits (622,000)
 * because prices are quoted that way in the contracts and on the DLD permit.
 */
export const AR: LpCopy = {
  lang: "ar",
  dir: "rtl",
  hrefSelf: "/lp/enchante/germany/ar",
  hrefOther: "/lp/enchante/germany",
  otherLabel: "English",

  eyebrow: "أرجان، دبي · التسليم ديسمبر 2028",
  h1: "شقة تملك حر في دبي",
  sub: "إنشانتيه من غريد بروبرتيز، أرجان، دبي. استوديوهات من 622,000 درهم، وغرفة وغرفتين حتى 1,375,000 درهم. عشرة بالمئة تحجز الشقة.",
  trust: ["تملك حر", "10% للحجز", "40 / 60", "نصف مفروشة"],
  ctaPrimary: "احصل على قائمة الأسعار",

  pricesTitle: "الأسعار والدفعة الأولى",
  pricesLabel: "التكلفة الحقيقية",
  colType: "نوع الوحدة",
  colSize: "المساحة",
  colPrice: "السعر من",
  colBooking: "المبلغ المطلوب للحجز",
  colMonthly: "الشهري",
  pricesNote:
    "مبلغ الحجز يشمل رسوم دائرة الأراضي والأملاك البالغة 4% ورسوم إدارية قدرها 5,000 درهم. الأسعار استرشادية وتخضع للتوفر يوم الحجز.",
  goldenVisaTag: "مؤهلة للإقامة الذهبية",
  goldenVisaTagUpper: "الوحدات الكبيرة مؤهلة",

  highlightsLabel: "المبنى",
  highlightsTitle: "ما الذي يميز هذا المشروع",

  abroadLabel: "الشراء من خارج الإمارات",
  abroadTitle: "يمكنك إتمام كل هذا دون مغادرة بلدك",

  visaLabel: "الإقامة",
  visaTitle: "الإقامة الذهبية تبدأ من 2 مليون درهم",
  visaBody:
    "استثمار عقاري بقيمة 2,000,000 درهم أو أكثر قد يؤهلك للإقامة الذهبية لعشر سنوات.",
  visaCta: "أرسل لي الوحدات المؤهلة",
  visaDisclaimer:
    "تحديد الأهلية للإقامة الذهبية يعود للسلطات الإماراتية وليس لنا. نؤكد لك ذلك كتابةً قبل أي التزام.",

  plansLabel: "الدفع",
  plansTitle: "كيف تتم الدفعات",
  plansCta: "اسأل المستشار عن جدول الدفع",

  amenitiesLabel: "المرافق",
  amenitiesTitle: "سبعة وعشرون مرفقاً داخل المبنى",

  locationLabel: "الموقع",
  locationTitle: "أرجان أقرب مما تظن",
  locationSub:
    "عند تقاطع شارع الشيخ محمد بن زايد وشارع أم سقيم، على بُعد دقيقتين من حديقة الزهور.",

  faqLabel: "أسئلة",
  faqTitle: "ما يسأل عنه المشترون أولاً",

  finalTitle: "احصل على قائمة الأسعار والمخططات وجداول الدفع كاملة",
  finalSub: "يجهزها مستشار في دبي ويرسلها عادةً خلال ساعة.",

  contactHeading: "إلى أين نرسل قائمتك؟",
  fieldFundsHint:
    "نسأل هذا أولاً لأنه يحدد ما إذا كانت عملية الشراء قابلة للتنفيذ. لا توجد إجابة خاطئة، وتبقى بيننا.",

  trustChips: [
    "وسيط مسجل لدى دائرة الأراضي والأملاك",
    "حساب ضمان خاضع للرقابة",
    "مقارنة أسعار لكل وحدة",
    "دعم المشتري عن بُعد",
  ],
  regulatedLine: "خاضع لرقابة دائرة الأراضي والأملاك في دبي (ريرا)",

  oppLabel: "الفرصة الحالية",
  oppTitle: "اطّلع على الأرقام الفعلية قبل أن تستفسر",
  oppSub:
    "تبدأ قائمتك من وحدات مطروحة فعلاً تناسب ميزانيتك. هذا مستوى التفاصيل الذي نعده لك، وليس كتيّباً عاماً عن دبي.",
  oppTagOffPlan: "على الخارطة",
  oppFrom: "من",
  oppPlan: "الخطة",
  oppHandover: "التسليم",
  oppNote: "يتم تأكيد التوفر والسعر والمواصفات وشروط الدفع مع المطوّر عند الاستفسار.",
  oppCta: "أرسل لي هذه الوحدة وما يماثلها",

  briefLabel: "ما الذي ستحصل عليه",
  briefTitle: "اعرف بالضبط ما الذي تقارنه قبل أن تلتزم",
  briefSub:
    "يُبنى ملفك على وحدات مطروحة فعلاً، مع التفاصيل التجارية التي تحتاجها لاتخاذ قرار أولي من الخارج.",
  briefCardTitle: "ملف استحواذ خاص",
  briefCardTag: "مُعد لك",
  briefItems: [
    "الوحدات المطروحة والأسعار الحالية",
    "جدول الدفع والمبلغ النقدي المطلوب للحجز بالضبط",
    "تاريخ التسليم وسجل المطوّر في التسليم",
    "رسوم الخدمة ورسوم الدائرة وافتراضات الإيجار",
  ],
  briefNote:
    "الأرقام مرتبطة بكل وحدة مطروحة. تقديرات الإيجار والقيمة تقديرات وليست ضمانات، وينبغي مراجعتها مع مستشارك القانوني والضريبي.",
  briefCta: "جهّز قائمتي",

  whyLabel: "لماذا دبي",
  whyOsacTitle: "لماذا الشراء عبر OSAC",
  whyOsacItems: [
    "مستشارون يطابقون الشقة مع ميزانيتك، بدءاً من 622,000 درهم.",
    "وصول مباشر إلى المطوّر وإلى الوحدات المطروحة وخطط الدفع، لا إعلانات المواقع.",
    "إتمام الشراء بالكامل عن بُعد: جولة بالفيديو، الأوراق، حساب الضمان، التسليم.",
    "أرقام صادقة قبل الالتزام: رسوم الخدمة والرسوم وتكاليف الخروج، لا عائد مبالغ فيه.",
  ],

  galleryLabel: "المبنى",
  galleryTitle: "مبنى بُني حول فنائه",

  plansImagesLabel: "المخططات",
  plansImagesTitle: "مخططات لكل نوع وحدة",
  plansImagesSub: "ترسل مخططات الاستوديو وغرفة وغرفتين بالأبعاد مع قائمتك.",
  plansImagesCta: "افتح المخططات",

  openInMaps: "افتح في خرائط جوجل",

  trackLabel: "سجل المطوّر",
  trackTitle: "سجل التسليم",
  trackSub: "{delivered} مشاريع مسلّمة. يمكنك التحقق من كل منها لدى دائرة الأراضي والأملاك.",
  trackDelivered: "تم التسليم",
  trackBuilding: "التسليم",
  trackNote:
    "قائمة المشاريع وتواريخ التسليم كما نشرها المطوّر وسجلات دائرة الأراضي والأملاك. التسليم السابق ليس ضماناً للأداء المستقبلي.",

  testimonialsLabel: "المشترون",
  testimonialsTitle: "ماذا يقول المشترون بعد التسليم",

  formTitle: "احصل على قائمتك الخاصة",
  formSub: "تشمل المخططات وجداول الدفع.",
  formStep: "الخطوة {n} من {total}",
  fieldUnit: "ما الحجم الذي تفكر فيه؟",
  fieldBudget: "ما هي ميزانيتك؟",
  fieldTimeline: "متى تنوي الشراء؟",
  fieldPurpose: "هل تشتري للسكن أم للاستثمار؟",
  fieldVisa: "هل تهمك الإقامة الذهبية لعشر سنوات؟",
  fieldLocation: "أين تقيم؟",
  fieldFunds: "كيف سيتم الدفع؟",
  fieldHandoverFunding: "آخر 60% تستحق عند التسليم في ديسمبر 2028. كيف ستغطيها؟",
  fieldHandoverFundingHint:
    "نسأل لأن هذه الخطة تنتهي بدفعة واحدة كبيرة لا بأقساط شهرية صغيرة. لا توجد إجابة خاطئة، لكن الإجابة الصريحة توفر عليك ثلاث سنوات من الأقساط في صفقة لا يمكنك إتمامها.",
  fieldName: "الاسم الكامل",
  fieldPhone: "رقم الهاتف مع رمز الدولة",
  fieldEmail: "البريد الإلكتروني",
  next: "متابعة",
  back: "رجوع",
  submit: "أرسل لي الأسعار والمخططات",
  submitting: "جارٍ الإرسال",
  successTitle: "قائمة الأسعار في الطريق إليك",
  successBody:
    "يقوم أحد المستشارين بإعداد قائمتك الآن وسيتواصل معك قريباً. إن كنت تفضل عدم الانتظار، اتصل بنا ونرسلها فوراً.",
  successCta: "اتصل بنا الآن",
  errorBody: "حدث خطأ أثناء الإرسال. حاول مرة أخرى أو اتصل بنا على الرقم أعلاه.",
  consent: `بإرسالك هذا النموذج توافق على أن نتواصل معك بخصوص هذا المشروع. ${trailerAr}.`,
  required: "مطلوب",

  labels: {
    // unit (Enchanté)
    studio: "استوديو — من 622 إلى 725 ألف درهم",
    "1br": "غرفة نوم واحدة — من 888 ألف إلى 1.20 مليون درهم",
    "2br": "غرفتا نوم — من 1.29 إلى 1.38 مليون درهم",
    unsure: "لم أقرر بعد، أرسلوا لي كل شيء",
    // budget (Enchanté bands)
    "under-700k": "أقل من 700 ألف درهم",
    "700k-1m": "من 700 ألف إلى مليون درهم",
    "1m-1.4m": "من مليون إلى 1.4 مليون درهم",
    "above-1.4m": "أكثر من 1.4 مليون درهم",
    // timeline
    "30-days": "خلال 30 يوماً",
    "1-3-months": "من شهر إلى ثلاثة أشهر",
    "3-6-months": "من ثلاثة إلى ستة أشهر",
    researching: "أستطلع فقط",
    // purpose
    live: "للسكن",
    invest: "للاستثمار أو التأجير",
    both: "كلاهما",
    // handover funding
    "cash-ready": "أتوقع أن تكون الأموال متاحة حينها",
    mortgage: "سأرتب تمويلاً عقارياً على الوحدة بعد اكتمالها",
    "sell-asset": "سأبيع أصلاً آخر لتغطيتها",
    "need-monthly": "سأحتاج إلى تقسيطها شهرياً بدلاً من ذلك",
    // golden visa
    "main-reason": "نعم، سبب رئيسي",
    bonus: "نعم، ميزة إضافية",
    "not-important": "غير مهمة بالنسبة لي",
  },
};

export const COPY: Record<Lang, LpCopy> = { en: EN, am: AM, ar: AR };
