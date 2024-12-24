import "./globals.css";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { MobileNavbar } from "@/components/MobileNavbar";
import { dir } from "i18next";
import { languages } from "@/app/i18n/settings";

export async function generateStaticParams(): Promise<{ lng: string }[]> {
  return languages.map((lng: string) => ({ lng }));
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
import Footer from "../components/common/Footer";
import Header from "@/components/common/Header";
import MprogressBar from "@/components/common/Progressbar";
import { I18nextProvider } from "react-i18next";

export const metadata: Metadata = {
  title: "Prepaid Metering System BPDB",
  description: "Prepaid Metering System BPDB",
};

export default async function RootLayout({
  children,
  params: { lng },
}: RootLayoutProps) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head>
        <title>BPDB Prepaid Metering System Website</title>
      </head>
      <body className={`${poppins.className} relative`}>
        <div className="hidden md:block">
          <Header />
        </div>
        <div className="md:hidden">
          <MobileNavbar></MobileNavbar>
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
