import { EnergyCalculatorForm } from "@/components/BillCalculator";
import { Locale, i18nConfig } from "@/i18n";
import { useEffect } from "react";

type Props = {
  params: {
    locale: Locale;
  };
};

const BillCalculator = async ({ params }: Props) => {
  const { locale } = await params;
  return (
    <div className="mx-auto max-w-md">
      <div className="mb-4 rounded border border-gray-200 p-8 shadow-lg">
        <EnergyCalculatorForm locale={locale} />
      </div>
      <div className="text-sm">
        <span className="text-red-500">**</span>LT-A Tariff Customer(Single
        Phase Meter) rates only.
      </div>
    </div>
  );
};

export default BillCalculator;
