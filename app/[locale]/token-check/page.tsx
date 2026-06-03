import { CheckInputForm } from "@/components/CheckTokenForm";
import TariffNoticePopup from "@/components/notices/TariffNoticePopup";
import { Locale, i18nConfig } from "@/i18n";

type Props = {
  params: {
    locale: Locale;
  };
};

const CheckToken = async ({ params }: Props) => {
  const { locale } = await params;
  return (
    <div className="mx-auto max-w-md">
      <TariffNoticePopup locale={locale} />
      <div className="mb-4 rounded border border-gray-200 p-8 shadow-lg">
        <CheckInputForm locale={locale}/>
      </div>
    </div>
  );
};

export default CheckToken;
