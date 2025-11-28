"use client";

import { EnergyCalculatorForm } from "@/components/BillCalculatorForAll";
import { Locale } from "@/i18n";

type Props = {
  params: {
    locale: Locale;
  };
};

const translation = {
  en: {
    billCalculatorPage: {
      description: "LT-A Tariff Customer (Single Phase Meter) rates only.",
    },
  },
  bn: {
    billCalculatorPage: {
      description: "LT-A ট্যারিফ গ্রাহক (সিঙ্গেল ফেজ মিটার) এর জন্য শুধুমাত্র।",
    },
  },
};

export default function BillCalculator({ params }: Props) {
  const locale = params.locale;

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-4 rounded border border-gray-200 p-8 shadow-lg">
        <EnergyCalculatorForm locale={locale} />
      </div>

      {/* <div className="text-sm">
        <span className="text-red-500">**</span>
        {translation[locale].billCalculatorPage.description}
      </div> */}
    </div>
  );
}
