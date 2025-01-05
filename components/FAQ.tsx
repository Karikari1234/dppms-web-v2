import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqAccordionData } from "@/lib/faq-accordion-data";
import { Locale } from "@/i18n";
import { getTranslation } from "@/lib/i18n/getTranslation";

const FAQAccordion = async ({ locale }: { locale: Locale }) => {
  const translation = await getTranslation(locale);
  return (
    <div>
      <Accordion type="single" collapsible>
        {faqAccordionData.map((item) => (
          <AccordionItem value={item.id.toString()} key={item.id}>
            <AccordionTrigger className="text-left text-base">
              {item.question[locale]}
            </AccordionTrigger>
            <AccordionContent className="text-base ">
              {item.answer[locale]}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQAccordion;
