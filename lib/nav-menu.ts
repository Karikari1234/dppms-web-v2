interface MenuItem {
  title: string;
  route: string;
}

export const topMenu: Array<MenuItem> = [
  { title: "Home", route: "/" },
  { title: "About", route: "/about" },
  {
    title: "BPDB Care Point",
    route: "https://carepoint.bpdbprepaid.gov.bd",
  },
  { title: "Calculate Meter Charges", route: "/bill-calculator" },
  { title: "Check Meter Token", route: "/token-check" },
  { title: "FAQ", route: "/faq" },
];
