import TokenPageWrapperComponent from "@/components/TokenPageWrapperComponent";
import { Locale, i18nConfig } from "@/i18n";

type Props = {
  params: {
    locale: Locale;
  };
};

const ResultWithOnlyMeterNoPage = async ({ params }: Props) => {
  const { locale } = await params;
  return (
    <>
      <TokenPageWrapperComponent locale={locale}/>
    </>
  );
};

export default ResultWithOnlyMeterNoPage;
