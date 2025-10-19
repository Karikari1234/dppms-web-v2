// lib/nav-menu.ts
export interface AppMenuItem {
  title: {
    en: string;
    bn: string;
  };
  route?: string; // optional if using children
  children?: Array<{
    title: { en: string; bn: string };
    route: string; // can be external
  }>;
}

export const topMenu: Array<AppMenuItem> = [
  { title: { en: "Home", bn: "হোম" }, route: `/` },
  { title: { en: "About", bn: "সম্পর্কে" }, route: `/about` },

  // Dropdown item
  {
    title: { en: "BPDB Care Point", bn: "বিপিডিবি কেয়ার পয়েন্ট" },
    children: [
      {
        title: { en: "Customer Portal", bn: "গ্রাহক পোর্টাল" },
        route: "https://care-point.bpdbprepaid.gov.bd",
      },
      {
        title: { en: "SND User Portal", bn: "এসএনডি ব্যবহারকারী পোর্টাল" },
        // If the SND URL is different, update this:
        route: "https://issuetrack.bpdbprepaid.gov.bd",
      },
    ],
  },

  { title: { en: "Calculate Meter Charges", bn: "মিটার চার্জ হিসাব করুন" }, route: `/bill-calculator` },
  { title: { en: "Check Meter Token", bn: "মিটার টোকেন দেখুন" }, route: `/token-check` },
  { title: { en: "Online Meters", bn: "অনলাইন মিটার" }, route: `/online-meters` },
  { title: { en: "FAQ", bn: "সচরাচর জিজ্ঞাসা" }, route: `/faq` },
];
