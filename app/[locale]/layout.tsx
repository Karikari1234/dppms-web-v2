import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { MobileNavbar } from "@/components/MobileNavbar";
import { Locale, i18nConfig } from "@/i18n";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
import Footer from "../../components/common/Footer";
import Header from "@/components/common/Header";
import MprogressBar from "@/components/common/Progressbar";

export const metadata: Metadata = {
  title: "Prepaid Metering System BPDB",
  description: "Prepaid Metering System BPDB",
};

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale: Locale) => ({ locale: locale }));
}

type Props = {
  children: React.ReactNode;
  params: {
    locale: Locale;
  };
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  return (
    <html lang={locale}>
      <head>
        <title>BPDB Prepaid Metering System Website</title>
      </head>
      <body className={`${poppins.className} relative`}>
        <div className="hidden md:block">
          <Header locale={locale} />
        </div>
        <div className="md:hidden">
          <MobileNavbar />
        </div>
        {/* <ResponsiveNavbar /> */}
        <main className="w-full px-1 md:mx-auto md:w-5/6 md:p-0 ">
          {children}
        </main>
        <Footer />
        <div className="hidden md:block">
          <Toaster />
        </div>
        {/* <Analytics /> */}
        <MprogressBar />
      </body>
    </html>
  );
}
