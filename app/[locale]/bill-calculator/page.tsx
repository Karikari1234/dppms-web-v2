import { EnergyCalculatorForm } from "@/components/BillCalculator";
import { Locale, i18nConfig } from "@/i18n";
import { getTranslation } from "@/lib/i18n/getTranslation";
import { get } from "http";
import { useEffect } from "react";

type Props = {
  params: {
    locale: Locale;
  };
};

const translation = {
  en : {
      billCalculatorPage: {
      "description": "LT-A Tariff Customer(Single Phase Meter) rates only."
    }  
  },
  bn : {
    billCalculatorPage : {
    "description": "LT-A ট্যারিফ গ্রাহক (সিঙ্গেল ফেজ মিটার) এর জন্য শুধুমাত্র।"
  }
  }
}

const BillCalculator = async ({ params }: Props) => {
  const { locale } = await params;
  return (
    <div className="mx-auto max-w-md">
      <div className="mb-4 rounded border border-gray-200 p-8 shadow-lg">
        <EnergyCalculatorForm locale={locale} />
      </div>
      <div className="text-sm">
        <span className="text-red-500">**</span>{translation[locale].billCalculatorPage.description}
      </div>
    </div>
  );
};

export default BillCalculator;
