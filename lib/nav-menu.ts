interface MenuItem {
  title: string;
  route: string;
}

export const topMenu: Array<MenuItem> = [
  { title: "Home", route: "/" },
  { title: "About", route: "/about" },
  {
    title: "BPDB Issue Tracking",
    route: "http://180.211.137.8:8001/",
  },
  { title: "Calculate Meter Charges", route: "/bill-calculator" },
  { title: "Check Meter Token", route: "/token-check" },
  { title: "FAQ", route: "/faq" },
];
