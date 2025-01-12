"use client";

import { i18nConfig, Locale } from "@/i18n";
import { getTranslation, TranslationKey } from "@/lib/i18n/getTranslation";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const redirectToLocale = (locale: Locale, pathname: string) => {
  if (!pathname || pathname === "/") return `/${locale}`;

  const pathParts = pathname.split("/");
  pathParts[1] = locale;

  return pathParts.join("/");
};

const LocaleSelector = ({ locale }: { locale: Locale }) => {
  const pathname = usePathname();
  const router = useRouter();
  // console.log(pathname);
  const [currentLocale, setCurrentLocale] = useState<Locale>(locale);
  const [translation, setTranslation] = useState<TranslationKey>(
    () => (key: string) => key,
  );

  // Load the translation function
  useEffect(() => {
    async function loadTranslation() {
      try {
        const translationFn = await getTranslation(locale);
        setTranslation(() => translationFn); // Set the loaded translation function
      } catch (error) {
        console.error("Error loading translation:", error);
      }
    }
    loadTranslation();
  }, [locale]);

  const localeInfo = {
    en: { native: "English", default: "English" },
    bn: { native: "বাংলা", default: "Bangla" },
  };

  const toggleLocale = () => {
    const newLocale = currentLocale === "en" ? "bn" : "en";
    setCurrentLocale(newLocale);
    const newPath = redirectToLocale(newLocale, pathname);
    router.push(newPath);
  };

  return (
    <div className="relative flex">
      <button
        className="hover:bg-neutral-100 flex h-12 w-12 items-center justify-center rounded-lg"
        onClick={toggleLocale}
      >
        <div>
          <Link href={redirectToLocale(currentLocale, pathname)}>
            <div className="hover:bg-neutral-100 flex items-center justify-center rounded-md border bg-white px-3 py-2">
              <h2 className="text-md font-medium text-red-800">
                {translation("nav.localeSelector.lang")}
              </h2>
            </div>
          </Link>
        </div>
      </button>
    </div>
  );
};

function LanguageIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
      />
    </svg>
  );
}

export default LocaleSelector;
