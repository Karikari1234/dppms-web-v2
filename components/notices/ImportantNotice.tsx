import { Locale } from "@/i18n";
import Link from "next/link";
import { FileText } from "lucide-react";
import Image from "next/image";

interface ImportantNoticeProps {
  locale: Locale;
}

const ImportantNotice = ({ locale }: ImportantNoticeProps) => {
  // Translations for this component
  const translations = {
    title: {
      en: "Important Notice",
      bn: "গুরুত্বপূর্ণ বিজ্ঞপ্তি"
    },
    subtitle: {
      en: "From Ministry of Power, Energy and Mineral Resources Bangladesh",
      bn: "বিদ্যুৎ, জ্বালানি ও খনিজ সম্পদ মন্ত্রণালয় বাংলাদেশ"
    },
    description: {
      en: "Official guidelines on prepaid meter usage, charges and rebates from BPDB",
      bn: "বিপিডিবি থেকে প্রিপেইড মিটার ব্যবহার, চার্জ এবং রিবেট সম্পর্কিত আধিকারিক নির্দেশিকা"
    },
    viewDocument: {
      en: "View Document",
      bn: "নথি দেখুন"
    }
  };

  return (
    <div className="my-6">
      <h2 className="heading-text mb-2 text-center !text-3xl md:!text-3xl">
        {translations.title[locale]}
      </h2>
      <p className="text-center text-green mb-6 font-medium">
        {translations.subtitle[locale]}
      </p>

      <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full md:w-1/4 flex justify-center">
            <div className="relative h-24 w-24 md:h-32 md:w-32 p-4 bg-green/10 rounded-full flex items-center justify-center">
              <FileText size={48} className="text-green" />
            </div>
          </div>
          
          <div className="w-full md:w-3/4 flex flex-col items-center md:items-start text-center md:text-left">
            <p className="text-gray-700 mb-6 text-lg">{translations.description[locale]}</p>
            <Link 
              href="/documents/prepaid-meter-guidelines.pdf" 
              target="_blank"
              className="rounded bg-green px-6 py-3 text-white hover:bg-green-deep transition-colors flex items-center"
            >
              <FileText size={20} className="mr-2" />
              {translations.viewDocument[locale]}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportantNotice;