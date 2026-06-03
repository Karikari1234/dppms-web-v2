"use client";

import { AlertTriangle } from "lucide-react";
import { Locale } from "@/i18n";

interface TariffChangeScrollProps {
  locale: Locale;
}

const translations = {
  label: {
    en: "Tariff Update",
    bn: "ট্যারিফ আপডেট",
  },
  message: {
    en: "New electricity tariff rate is effective from June 2026. Please use the applicable tariff rate when calculating prepaid meter charges.",
    bn: "নতুন বিদ্যুৎ ট্যারিফ রেট জুন ২০২৬ থেকে কার্যকর হয়েছে। প্রিপেইড মিটার চার্জ হিসাব করার সময় অনুগ্রহ করে প্রযোজ্য ট্যারিফ রেট ব্যবহার করুন।",
  },
};

const TariffChangeScroll = ({ locale }: TariffChangeScrollProps) => {
  const message = translations.message[locale];

  return (
    <div className="mx-auto max-w-full rounded-md border border-green-light bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
      <div className="flex items-center overflow-hidden">
        <div className="flex shrink-0 items-center bg-green px-3 py-3 text-sm font-semibold text-white md:text-base">
          <AlertTriangle size={16} className="mr-2" />
          <span className="whitespace-nowrap">{translations.label[locale]}</span>
        </div>

        <div className="relative flex-1 overflow-hidden bg-white py-3">
          <div className="animate-[tariff-scroll_22s_linear_infinite] whitespace-nowrap text-sm font-semibold text-gray-800 md:text-base">
            <span className="px-8">{message}</span>
            <span className="px-8">{message}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TariffChangeScroll;
