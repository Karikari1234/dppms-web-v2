import { Locale } from "@/i18n";

export const onlineMetersTranslations = {
  title: {
    en: 'Online Prepaid Meters Dashboard',
    bn: 'অনলাইন প্রিপেইড মিটার ড্যাশবোর্ড'
  },
  subtitle: {
    en: 'Real-time monitoring and statistics of online prepaid meters across different regions',
    bn: 'বিভিন্ন অঞ্চলে অনলাইন প্রিপেইড মিটারের রিয়েল-টাইম মনিটরিং এবং পরিসংখ্যান'
  },
  benefitsTitle: {
    en: 'Benefits of Online Meters',
    bn: 'অনলাইন মিটারের সুবিধাসমূহ'
  },
  benefits: {
    en: [
      'Real-time monitoring of electricity consumption',
      'Instant recharge and activation',
      'Remote diagnostics and troubleshooting',
      'Accurate billing and consumption tracking',
      'Reduced operational costs for utility providers'
    ],
    bn: [
      'বিদ্যুৎ ব্যবহারের রিয়েল-টাইম মনিটরিং',
      'তাৎক্ষণিক রিচার্জ এবং সক্রিয়করণ',
      'দূরবর্তী ডায়াগনস্টিক্স এবং সমস্যা সমাধান',
      'সঠিক বিলিং এবং ব্যবহার ট্র্যাকিং',
      'উপযোগিতা প্রদানকারীদের জন্য কম অপারেশনাল খরচ'
    ]
  },
  benefitsDescription: {
    en: [
      'Track your electricity usage in real-time with detailed insights',
      'Add credit to your meter instantly without delays or waiting periods',
      'Identify and resolve issues remotely without requiring technician visits',
      'Get precise billing information and monitor your consumption patterns',
      'Reduced maintenance and operational expenses for utility companies'
    ],
    bn: [
      'বিস্তারিত অন্তর্দৃষ্টি সহ রিয়েল-টাইমে আপনার বিদ্যুৎ ব্যবহার ট্র্যাক করুন',
      'বিলম্ব বা অপেক্ষার সময় ছাড়াই তাৎক্ষণিকভাবে আপনার মিটারে ক্রেডিট যোগ করুন',
      'টেকনিশিয়ান পরিদর্শন ছাড়াই দূরবর্তীভাবে সমস্যা চিহ্নিত করুন এবং সমাধান করুন',
      'সঠিক বিলিং তথ্য পান এবং আপনার ব্যবহারের প্যাটার্ন পর্যবেক্ষণ করুন',
      'উপযোগিতা কোম্পানিগুলির জন্য কম রক্ষণাবেক্ষণ এবং পরিচালনা ব্যয়'
    ]
  }
};

export function getOnlineMetersTranslations(locale: Locale) {
  return {
    title: onlineMetersTranslations.title[locale],
    subtitle: onlineMetersTranslations.subtitle[locale],
    benefitsTitle: onlineMetersTranslations.benefitsTitle[locale],
    benefits: onlineMetersTranslations.benefits[locale],
    benefitsDescription: onlineMetersTranslations.benefitsDescription[locale],
  };
}