// export interface MenuItem {
//   title: string;
//   route: string;
// }
export interface MenuItem {
  title: {
    en: string;
    bn: string;
  };
  route: string;
}


// export const topMenu: Array<MenuItem> = [
//   { title: "Home", route: "/" },
//   { title: "About", route: "/about" },
//   {
//     title: "BPDB Care Point",
//     route: "https://carepoint.bpdbprepaid.gov.bd",
//   },
//   { title: "Calculate Meter Charges", route: "/bill-calculator" },
//   { title: "Check Meter Token", route: "/token-check" },
//   { title: "FAQ", route: "/faq" },
// ];

export const topMenu: Array<MenuItem> = [
  { 
    title: { en: "Home", bn: "হোম" }, 
    route: `/` 
  },
  { 
    title: { en: "About", bn: "সম্পর্কে" }, 
    route: `/about` 
  },
  {
    title: { en: "BPDB Care Point", bn: "বিপিডিবি কেয়ার পয়েন্ট" },
    route: "https://carepoint.bpdbprepaid.gov.bd",
  },
  { 
    title: { en: "Calculate Meter Charges", bn: "মিটার চার্জ হিসাব করুন" }, 
    route: `/bill-calculator` 
  },
  { 
    title: { en: "Check Meter Token", bn: "মিটার টোকেন দেখুন" }, 
    route: `/token-check` 
  },
  { 
    title: { en: "FAQ", bn: "সচরাচর জিজ্ঞাসা" }, 
    route: `/faq` 
  },
];

// export interface MenuItem {
//   title: {
//     en: string;
//     bn: string;
//   };
//   route: string;
// }