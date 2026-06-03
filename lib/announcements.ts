// Announcements data structure with i18n support
export interface Announcement {
  id: string;
  title: {
    en: string;
    bn: string;
  };
  date: string;
  documentUrl: string;
  isNew?: boolean;
}

export const announcements: Announcement[] = [
  {
    id: "tariff-effective-june-2026",
    title: {
      bn: "নতুন ট্যারিফ রেট জুন ২০২৬ থেকে কার্যকর হয়েছে",
      en: "New tariff rate is effective from June 2026",
    },
    date: "2026-06-02",
    documentUrl: "/en/bill-calculator",
    isNew: true,
  },
  {
    id: "announcement-1",
    title: {
      bn: "প্রিপেইড মিটার ব্যবহারে, বিদ্যুৎ খরচ আসবে নিয়ন্ত্রণে",
      en: "Using prepaid meters will help control electricity costs",
    },
    date: "2025-03-24",
    documentUrl: "/documents/prepaid-meter-awareness-06-04-25.pdf",
    isNew: true,
  },
  {
    id: "announcement-2",
    title: {
      bn: "প্রিপেইড মিটারের শর্ট কোড সমূহ এখানে দেখুন",
      en: "View all prepaid meter short codes here",
    },
    date: "2025-03-15",
    documentUrl: "/en/meter-short-codes",
  },
  {
    id: "announcement-3",
    title: {
      bn: "প্রিপেইড মিটার সম্পর্কে সচরাচর জিজ্ঞাসিত প্রশ্নাবলী",
      en: "Frequently asked questions about prepaid meters",
    },
    date: "2025-03-01",
    documentUrl: "/en/faq",
  },
];

// Helper function to format dates based on locale
export const formatDate = (dateString: string, locale: string) => {
  return new Date(dateString).toLocaleDateString(locale === "bn" ? "bn-BD" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};
