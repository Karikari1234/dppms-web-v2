import { Locale } from "@/i18n";
import { announcements, formatDate } from "@/lib/announcements";
import { FileText, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";

type Props = {
  params: {
    locale: Locale;
  };
};

export default async function AllNoticesPage({ params }: Props) {
  const { locale } = params;
  
  const translations = {
    title: {
      en: "All Announcements",
      bn: "সমস্ত ঘোষণা"
    },
    subtitle: {
      en: "Important notices and updates from BPDB",
      bn: "বিপিডিবি থেকে গুরুত্বপূর্ণ বিজ্ঞপ্তি এবং আপডেট"
    },
    viewDocument: {
      en: "View Document",
      bn: "নথি দেখুন"
    },
    viewPage: {
      en: "View Page",
      bn: "পেজ দেখুন"
    },
    new: {
      en: "New",
      bn: "নতুন"
    }
  };

  // Helper function to get appropriate URL and button text
  const getUrlInfo = (url: string) => {
    // Check if it's an internal page (not a PDF)
    if (!url.endsWith('.pdf')) {
      // Replace /en/ with the current locale
      return {
        url: url.replace('/en/', `/${locale}/`),
        text: translations.viewPage[locale],
        isExternal: false
      };
    }
    return {
      url,
      text: translations.viewDocument[locale],
      isExternal: true
    };
  };

  return (
    <div className="my-8">
      <h1 className="heading-text mb-2 text-center !text-4xl md:!text-4xl">
        {translations.title[locale]}
      </h1>
      <p className="text-center text-green mb-8 font-medium">
        {translations.subtitle[locale]}
      </p>

      <div className="mx-auto max-w-4xl space-y-6">
        {announcements.map((announcement) => {
          const urlInfo = getUrlInfo(announcement.documentUrl);
          
          return (
            <div 
              key={announcement.id}
              className="rounded-xl bg-white p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-gray-800 tracking-tight">
                      {announcement.title[locale]}
                    </h3>
                    {announcement.isNew && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {translations.new[locale]}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500">
                    {formatDate(announcement.date, locale)}
                  </p>
                </div>
                
                <Link 
                  href={urlInfo.url} 
                  target={urlInfo.isExternal ? "_blank" : undefined}
                  className="rounded bg-green px-4 py-2 text-white hover:bg-green-deep transition-colors flex items-center"
                >
                  {urlInfo.isExternal ? (
                    <FileText size={18} className="mr-2" />
                  ) : (
                    <ExternalLink size={18} className="mr-2" />
                  )}
                  {urlInfo.text}
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
