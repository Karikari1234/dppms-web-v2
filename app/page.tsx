import AboutComponent from "@/components/About";
import CustomerOrderInformationCard from "@/components/CustomerOrderInformationCard";
import MyComponent from "@/components/DummyDataFetch";
import FAQAccordion from "@/components/FAQ";
import HeroSection from "@/components/HeroSection";
import VendingOptionComponent from "@/components/VendingOptionComponent";

export default function Home({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  return (
    <div className="flex flex-col space-y-2">
      <HeroSection />
      <VendingOptionComponent />
      <AboutComponent />
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

/*
userName: zubayer
userPass: m7PM%2Flj%2BMYKoUcaydxQQe6Ez6Qal5N5DQAArpAmFcgOn%2BTLK3tN%2BVA%3D%3D
meterNo: 010100000010
customerNo: 3214789
*/

/*
userName=zubayer&userPass=m7PM%2Flj%2BMYKoUcaydxQQe6Ez6Qal5N5DQAArpAmFcgOn%2BTLK3tN%2BVA%3D%3D&meterNo=010100000010&customerNo=3214789*/
