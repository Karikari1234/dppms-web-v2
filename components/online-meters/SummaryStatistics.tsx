"use client";

import React from "react";
import { Locale } from "@/i18n";

interface TimeSeriesEntry {
  month_name: string;
  month_num: number;
  year: number;
  meter_count: number;
}

interface SummaryStatisticsProps {
  data: TimeSeriesEntry[];
  locale: Locale;
  totalMeters: number;
}

const SummaryStatistics = ({
  data,
  locale,
  totalMeters,
}: SummaryStatisticsProps) => {
  // Calculate statistics
  const latestMonth = data.slice(-1)[0];
  const previousMonth = data.slice(-2, -1)[0];
  const monthlyGrowth = latestMonth.meter_count - previousMonth.meter_count;
  const growthPercentage = parseFloat(
    ((monthlyGrowth / previousMonth.meter_count) * 100).toFixed(1),
  );

  // Translations
  const translations = {
    statsOverview: {
      en: "Online Meters Overview",
      bn: "অনলাইন মিটার সংক্ষিপ্ত বিবরণ",
    },
    totalMeters: {
      en: "Total Online Meters",
      bn: "মোট অনলাইন মিটার",
    },
    latestMonthCount: {
      en: "Latest Month Count",
      bn: "সর্বশেষ মাসের সংখ্যা",
    },
    monthlyGrowth: {
      en: "Monthly Growth",
      bn: "মাসিক বৃদ্ধি",
    },
    growthPercentage: {
      en: "Growth Percentage",
      bn: "বৃদ্ধির শতাংশ",
    },
  };

  return (
    <div className="w-full">
      <h2 className="mb-6 text-center text-2xl font-bold">
        {locale === "en"
          ? translations.statsOverview.en
          : translations.statsOverview.bn}
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Meters */}
        <div className="rounded-lg bg-white p-4 text-center shadow-md">
          <h3 className="mb-2 text-lg font-semibold text-gray-700">
            {locale === "en"
              ? translations.totalMeters.en
              : translations.totalMeters.bn}
          </h3>
          <p className="text-3xl font-bold text-green-deep">
            {totalMeters.toLocaleString()}
          </p>
        </div>

        {/* Latest Month Count */}
        <div className="rounded-lg bg-white p-4 text-center shadow-md">
          <h3 className="mb-2 text-lg font-semibold text-gray-700">
            {locale === "en"
              ? translations.latestMonthCount.en
              : translations.latestMonthCount.bn}
          </h3>
          <p className="text-3xl font-bold text-green-deep">
            {latestMonth.meter_count.toLocaleString()}
          </p>
          <p className="mt-1 text-sm text-gray-600">
            {latestMonth.month_name} {latestMonth.year}
          </p>
        </div>

        {/* Monthly Growth */}
        <div className="rounded-lg bg-white p-4 text-center shadow-md">
          <h3 className="mb-2 text-lg font-semibold text-gray-700">
            {locale === "en"
              ? translations.monthlyGrowth.en
              : translations.monthlyGrowth.bn}
          </h3>
          <p className="text-3xl font-bold text-green-deep">
            {monthlyGrowth > 0 ? "+" : ""}
            {monthlyGrowth.toLocaleString()}
          </p>
          <p className="mt-1 text-sm text-gray-600">
            {previousMonth.month_name} → {latestMonth.month_name}
          </p>
        </div>

        {/* Growth Percentage */}
        <div className="rounded-lg bg-white p-4 text-center shadow-md">
          <h3 className="mb-2 text-lg font-semibold text-gray-700">
            {locale === "en"
              ? translations.growthPercentage.en
              : translations.growthPercentage.bn}
          </h3>
          <p className="text-3xl font-bold text-green-deep">
            {growthPercentage > 0 ? "+" : ""}
            {growthPercentage}%
          </p>
          <p className="mt-1 text-sm text-gray-600">
            {previousMonth.month_name} → {latestMonth.month_name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryStatistics;
