import CustomerStats from "@/components/CustomerStats";
import AboutComponent from "@/components/About";
import ZonePercentageTable from "@/components/ZonePercentageTable";
import BPDBAdvantagesAndRelatedComponent from "@/components/BPDBAdvantagesAndRelatedComponent";
import PrepaidMeterCharges from "@/components/VendingScenarios";
import VendingOptionComponent from "@/components/VendingOptionComponent";

const About = () => {
  return (
    <div className="space-y-8">
      <AboutComponent />
      <PrepaidMeterCharges />
      <VendingOptionComponent />
      <ZonePercentageTable />
      <CustomerStats />
    </div>
  );
};

export default About;
