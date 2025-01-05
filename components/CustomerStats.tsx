"use client";

import CustomerChart from "./CustomerChart";
import { Locale } from "@/i18n";
import { getTranslation } from "@/lib/i18n/getTranslation";

const CustomerStats = async ({ locale }: { locale: Locale }) => {
  const translation = await getTranslation(locale);
  return (
    <div className="space-y-4 text-base  md:space-y-10">
      <h1 className="heading-text mb-5 !text-left !text-4xl">
      {translation("customerStats.title")}
      </h1>
      <p className="text-gray-700">
      {translation("customerStats.intro")}
      </p>
      <p className="text-gray-700">
      {translation("customerStats.monthlyData")}
      </p>
      <div className="h-96">
        <CustomerChart locale={locale}></CustomerChart>
      </div>
      <p className="text-gray-700">
      {translation("customerStats.summary")}
      </p>
    </div>
  );
};

export default CustomerStats;
