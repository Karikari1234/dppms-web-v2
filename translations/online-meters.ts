import { Locale } from "@/i18n";

interface OnlineMetersTranslations {
  title: string;
  subtitle: string;
  statsOverview: string;
  totalMeters: string;
  latestMonthCount: string;
  monthlyGrowth: string;
  growthPercentage: string;
  timeSeriesChart: string;
  geographicalChart: string;
  benefitsTitle: string;
  benefits: string[];
  benefitsDescription?: string[];
  region: string;
  count: string;
  percentage: string;
}

const translations: Record<Locale, OnlineMetersTranslations> = {
  en: {
    title: "Online Prepaid Meters Dashboard",
    subtitle: "Real-time monitoring and statistics of online prepaid meters across different regions",
    statsOverview: "Online Meters Overview",
    totalMeters: "Total Online Meters",
    latestMonthCount: "Latest Month Count",
    monthlyGrowth: "Monthly Growth",
    growthPercentage: "Growth Percentage",
    timeSeriesChart: "Monthly Online Meters Growth",
    geographicalChart: "Geographical Distribution of Online Meters",
    benefitsTitle: "Benefits of Online Meters",
    benefits: [
      "Real-time monitoring of electricity consumption",
      "Instant recharge and activation",
      "Remote diagnostics and troubleshooting",
      "Accurate billing and consumption tracking",
      "Reduced operational costs for utility providers"
    ],
    benefitsDescription: [
      "Monitor electricity usage in real-time from anywhere",
      "Purchase and activate power instantly without delay",
      "Identify and resolve issues remotely without on-site visits",
      "Track exactly how much power is being used and when",
      "Lower administrative costs for BPDB and improved service delivery"
    ],
    region: "Region",
    count: "Number of Meters",
    percentage: "Percentage"
  },
  bn: {
    title: "অনলাইন প্রিপেইড মিটার ড্যাশবোর্ড",
    subtitle: "বিভিন্ন অঞ্চলে অনলাইন প্রিপেইড মিটারের রিয়েল-টাইম মনিটরিং এবং পরিসংখ্যান",
    statsOverview: "অনলাইন মিটার সংক্ষিপ্ত বিবরণ",
    totalMeters: "মোট অনলাইন মিটার",
    latestMonthCount: "সর্বশেষ মাসের সংখ্যা",
    monthlyGrowth: "মাসিক বৃদ্ধি",
    growthPercentage: "বৃদ্ধির শতাংশ",
    timeSeriesChart: "মাসিক অনলাইন মিটার বৃদ্ধি",
    geographicalChart: "অনলাইন মিটারের ভৌগলিক বণ্টন",
    benefitsTitle: "অনলাইন মিটারের সুবিধাসমূহ",
    benefits: [
      "বিদ্যুৎ ব্যবহারের রিয়েল-টাইম মনিটরিং",
      "তাৎক্ষণিক রিচার্জ এবং সক্রিয়করণ",
      "দূরবর্তী ডায়াগনস্টিক এবং সমস্যা সমাধান",
      "সঠিক বিলিং এবং খরচ ট্র্যাকিং",
      "ইউটিলিটি প্রদানকারীদের জন্য কম পরিচালন ব্যয়"
    ],
    benefitsDescription: [
      "যেকোন জায়গা থেকে রিয়েল-টাইমে বিদ্যুৎ ব্যবহার মনিটর করুন",
      "বিলম্ব ছাড়াই তাৎক্ষণিকভাবে পাওয়ার কিনুন এবং সক্রিয় করুন",
      "অন-সাইট পরিদর্শন ছাড়াই দূরবর্তীভাবে সমস্যা চিহ্নিত করুন এবং সমাধান করুন",
      "কতটা বিদ্যুৎ ব্যবহার করা হচ্ছে এবং কখন তা সঠিকভাবে ট্র্যাক করুন",
      "বিপিডিবির জন্য কম প্রশাসনিক খরচ এবং উন্নত সেবা প্রদান"
    ],
    region: "অঞ্চল",
    count: "মিটারের সংখ্যা",
    percentage: "শতাংশ"
  }
};

export const getOnlineMetersTranslations = (locale: Locale): OnlineMetersTranslations => {
  return translations[locale];
};