import FAQAccordion from "@/components/FAQ";
import { Locale, i18nConfig } from "@/i18n";
import { getTranslation } from "@/lib/i18n/getTranslation";

type Props = {
  params: {
    locale: Locale;
  };
};

const FAQ = async ({ params }: Props) => {
  const { locale } = await params;
  const translation = await getTranslation(locale);
  return (
    <div className="md:mx-auto md:w-5/6">
      <h1 className="heading-text mb-4 !text-left !text-3xl md:mb-8 md:!text-4xl">
        {translation("faq.title")}
      </h1>
      <FAQAccordion locale={locale}></FAQAccordion>
    </div>
  );
};

export default FAQ;
