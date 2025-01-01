import featureData from "../lib/features.json";
import FeatureBox, { FeatureProps } from "./featureBox";
import { Locale } from "@/i18n";
import { getTranslation } from "@/lib/i18n/getTranslation";
import LocaleSelector from "@/components/locale-selector";

const AboutComponent = async ({ locale }: { locale: Locale }) => {
  const items = (featureData as FeatureProps[]).map((item) => {
    return (
      <div key={item.order}>
        <FeatureBox {...item}></FeatureBox>
      </div>
    );
  });
  const translation = await getTranslation(locale);
  return (
    <div>
      <h1 className="heading-text mb-4 !text-left md:mb-8">
        {translation("about.benefit_title")}
      </h1>
      <div className="mb-8 flex flex-col space-y-4 text-base text-gray-700 md:mb-16 md:flex-row md:space-x-4 md:space-y-0">
        <div>
          {translation("about.benefit_part_1")}
        </div>
        <div>
          {translation("about.benefit_part_2")}
        </div>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-2 p-1 md:grid-cols-4 md:grid-rows-1 md:gap-8 ">
        {items}
      </div>
    </div>
  );
};

export default AboutComponent;
