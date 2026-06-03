"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n";
import Image from "next/image";

interface TariffNoticePopupProps {
  locale: Locale;
}

const translations = {
  title: {
    en: "New tariff rate notice",
    bn: "নতুন ট্যারিফ রেট সংক্রান্ত বিজ্ঞপ্তি",
  },
  message: {
    en: "The new tariff rate is effective from June 2026.",
    bn: "নতুন ট্যারিফ রেট জুন ২০২৬ থেকে কার্যকর হয়েছে।",
  },
  action: {
    en: "Got it",
    bn: "ঠিক আছে",
  },
};

const TariffNoticePopup = ({ locale }: TariffNoticePopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(10);

  const canClose = secondsRemaining === 0;

  useEffect(() => {
    setIsOpen(true);
    const timer = window.setInterval(() => {
      setSecondsRemaining((seconds) => Math.max(seconds - 1, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="tariff-effective-title"
        className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded bg-white p-6 shadow-xl"
      >
        <h2
          id="tariff-effective-title"
          className="mb-3 text-xl font-semibold text-gray-900"
        >
          {translations.title[locale]}
        </h2>
        <p className="mb-5 text-base leading-relaxed text-gray-700">
          {translations.message[locale]}
        </p>
        <div className="mb-5 max-h-[65vh] w-full overflow-y-auto rounded border border-gray-200 bg-gray-50">
          <Image
            src="/images/new-token-insert.PNG"
            alt="New token insert notice"
            width={1264}
            height={843}
            className="h-auto w-full"
            sizes="(max-width: 768px) calc(100vw - 48px), 624px"
            priority
          />
        </div>
        {canClose ? (
          <div className="flex justify-end">
            <Button
              type="button"
              className="bg-green text-white"
              onClick={() => setIsOpen(false)}
            >
              {translations.action[locale]}
            </Button>
          </div>
        ) : (
          <p className="text-right text-sm font-medium text-gray-600">
            You can close the pop up in {secondsRemaining} seconds.
          </p>
        )}
      </div>
    </div>
  );
};

export default TariffNoticePopup;
