"use client";
import ShortCodeTable from "@/components/ShortCodeTable";
import { Locale, i18nConfig } from "@/i18n";
import { getTranslation } from "@/lib/i18n/getTranslation";

type Props = {
  params: {
    locale: Locale;
  };
};

const MeterShortCodes = async ({ params }: Props) => {
  const { locale } = await params;
  const translation = await getTranslation(locale);
  return (
    <div className="">
      <div className="mb-2 text-xl font-bold leading-normal animate-once md:text-left md:text-4xl md:leading-tight">
        {translation("meterShortCode.title")}
      </div>
      <p
        className="mb-8 md:w-2/3
      "
      >
        {translation("meterShortCode.description")}
      </p>
      <ShortCodeTable locale={locale}></ShortCodeTable>
    </div>
  );
};

export default MeterShortCodes;
