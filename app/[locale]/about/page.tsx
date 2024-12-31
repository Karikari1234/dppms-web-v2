import CustomerStats from "@/components/CustomerStats";
import AboutComponent from "@/components/About";
import ZonePercentageTable from "@/components/ZonePercentageTable";
import BPDBAdvantagesAndRelatedComponent from "@/components/BPDBAdvantagesAndRelatedComponent";
import PrepaidMeterCharges from "@/components/VendingScenarios";
import VendingOptionComponent from "@/components/VendingOptionComponent";
import { Locale, i18nConfig } from "@/i18n";

type Props = {
  params: {
    locale: Locale;
  };
};

const About = async ({ params }: Props) => {
  const { locale } = await params;
  return (
    <div className="space-y-8">
      <AboutComponent locale={locale} />
      <PrepaidMeterCharges />
      <VendingOptionComponent />
      <ZonePercentageTable />
      <CustomerStats />
    </div>
  );
};

export default About;
