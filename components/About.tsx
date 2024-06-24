import featureData from "../lib/features.json";
import FeatureBox, { FeatureProps } from "./featureBox";

const AboutComponent = () => {
  const items = (featureData as FeatureProps[]).map((item) => {
    return (
      <div key={item.order}>
        <FeatureBox {...item}></FeatureBox>
      </div>
    );
  });
  return (
    <div>
      <h1 className="heading-text mb-4 !text-left md:mb-8">
        Benefits of Prepaid Metering System
      </h1>
      <div className="mb-8 flex flex-col space-y-4 text-base text-gray-700 md:mb-16 md:flex-row md:space-x-4 md:space-y-0">
        <div>
          Postpaid billing is slow, costly, and error-prone. It relies on manual
          meter reading, bill preparation, and distribution. It also allows
          customers to delay or avoid paying for their electricity usage. This
          hurts the distribution units.
        </div>
        <div>
          Prepaid metering solves these problems. It is fast, cheap, and
          accurate. It uses smart meters that let customers monitor their
          consumption, recharge their balance, and enjoy uninterrupted power. It
          benefits both the customers and the distribution units.
        </div>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-2 p-1 md:grid-cols-4 md:grid-rows-1 md:gap-8 ">
        {items}
      </div>
    </div>
  );
};

export default AboutComponent;
