import AboutComponent from "@/components/About";
import CustomerOrderInformationCard from "@/components/CustomerOrderInformationCard";
import FAQAccordion from "@/components/FAQ";
import HeroSection from "@/components/HeroSection";
import dynamic from "next/dynamic";
// Import VendingOptionComponent dynamically to support client component
const VendingOptionComponent = dynamic(() => import("@/components/VendingOptionComponent"), {
  ssr: false,
  loading: () => <div className="py-16 text-center flex justify-center items-center">
    <div className="animate-pulse text-green">Loading payment options...</div>
  </div>
});
import VideoEmbed from "@/components/BPDBVideo";
import { AnnouncementTicker } from "@/components/notices";
import { Locale, i18nConfig } from "@/i18n";
import { getTranslation } from "@/lib/i18n/getTranslation";

type Props = {
  params: {
    locale: Locale;
  };
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const translation = await getTranslation(locale);
  return (
    <div className="flex flex-col space-y-8">
      <AnnouncementTicker locale={locale} />
      <HeroSection locale={locale} />
      <VendingOptionComponent locale={locale} />
      <AboutComponent locale={locale} />
      <VideoEmbed locale={locale} />
      <h1 className="heading-text !text-center !text-4xl">
        {translation("faq.title")}
      </h1>
      <div className="md:mx-auto md:w-5/6">
        <FAQAccordion locale={locale}></FAQAccordion>
      </div>

      {/* <CustomerOrderInformationCard /> */}
    </div>
  );
}
