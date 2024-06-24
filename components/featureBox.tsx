import Image from "next/image";

export interface FeatureProps {
  order: number;
  featureSVG: string;
  mainText: string;
  subText: string;
}

const FeatureBox = (featureProps: FeatureProps) => {
  return (
    <div className="flex flex-col items-start space-y-4 ">
      <div className="relative h-16 w-16">
        <Image
          src={featureProps.featureSVG}
          fill={true}
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: "contain" }}
          alt={featureProps.mainText}
        />
      </div>
      <div className="min-h-[3rem] max-w-[70%] text-lg font-bold ">
        {featureProps.mainText}
      </div>
      <div className="text-base text-gray-700 ">{featureProps.subText}</div>
    </div>
  );
};

export default FeatureBox;
