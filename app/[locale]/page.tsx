import AboutComponent from "@/components/About";
import CustomerOrderInformationCard from "@/components/CustomerOrderInformationCard";
import FAQAccordion from "@/components/FAQ";
import HeroSection from "@/components/HeroSection";
import VendingOptionComponent from "@/components/VendingOptionComponent";
import VideoEmbed from "@/components/BPDBVideo";
import { Locale, i18nConfig } from "@/i18n";

type Props = {
  params: {
    locale: Locale;
  };
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  return (
    <div className="flex flex-col space-y-2">
      <HeroSection />
      <VendingOptionComponent />
      <AboutComponent locale={locale} />
      <VideoEmbed />
      <h1 className="heading-text !text-center !text-4xl">
        Frequently Asked Questions
      </h1>
      <div className="md:mx-auto md:w-5/6">
        <FAQAccordion></FAQAccordion>
      </div>

      {/* <CustomerOrderInformationCard /> */}
    </div>
  );
}
