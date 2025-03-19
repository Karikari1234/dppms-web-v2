import React from 'react';
import { Locale } from '@/i18n';
import { getTranslation } from '@/lib/i18n/getTranslation';
import TimeSeriesChart from '@/components/online-meters/TimeSeriesChart';
import GeographicalDistribution from '@/components/online-meters/GeographicalDistribution';
import SummaryStatistics from '@/components/online-meters/SummaryStatistics';

// Define the time series data type
interface TimeSeriesEntry {
  month_name: string;
  month_num: number;
  year: number;
  meter_count: number;
}

// Define the region data type
interface RegionData {
  region: string;
  count: number;
}

type Props = {
  params: {
    locale: Locale;
  };
};

const OnlineMetersPage = async ({ params }: Props) => {
  const { locale } = params;
  const translation = await getTranslation(locale);
  
  // Time series data
  const timeSeriesData: TimeSeriesEntry[] = [
    { month_name: "APRIL", month_num: 4, year: 2024, meter_count: 6331 },
    { month_name: "MAY", month_num: 5, year: 2024, meter_count: 19910 },
    { month_name: "JUNE", month_num: 6, year: 2024, meter_count: 25699 },
    { month_name: "JULY", month_num: 7, year: 2024, meter_count: 34949 },
    { month_name: "AUGUST", month_num: 8, year: 2024, meter_count: 36945 },
    { month_name: "SEPTEMBER", month_num: 9, year: 2024, meter_count: 243243 },
    { month_name: "OCTOBER", month_num: 10, year: 2024, meter_count: 266316 },
    { month_name: "NOVEMBER", month_num: 11, year: 2024, meter_count: 370380 },
    { month_name: "DECEMBER", month_num: 12, year: 2024, meter_count: 403483 },
    { month_name: "JANUARY", month_num: 1, year: 2025, meter_count: 374749 },
    { month_name: "FEBRUARY", month_num: 2, year: 2025, meter_count: 430898 },
    { month_name: "MARCH", month_num: 3, year: 2025, meter_count: 437738 }
  ];

  // Geographical data
  const geographicalData: RegionData[] = [
    { region: "Chittagong", count: 216074 },
    { region: "Comilla", count: 182001 },
    { region: "Sylhet", count: 45892 }
  ];

  // Calculate total meters
  const totalMeters = 353860; // Fixed total provided

  // Translations for the page
  const pageTranslations = {
    title: {
      en: 'Online Prepaid Meters Dashboard',
      bn: 'অনলাইন প্রিপেইড মিটার ড্যাশবোর্ড'
    },
    subtitle: {
      en: 'Real-time monitoring and statistics of online prepaid meters across different regions',
      bn: 'বিভিন্ন অঞ্চলে অনলাইন প্রিপেইড মিটারের রিয়েল-টাইম মনিটরিং এবং পরিসংখ্যান'
    },
    benefitsTitle: {
      en: 'Benefits of Online Meters',
      bn: 'অনলাইন মিটারের সুবিধাসমূহ'
    },
    benefits: {
      en: [
        'Real-time monitoring of electricity consumption',
        'Instant recharge and activation',
        'Remote diagnostics and troubleshooting',
        'Accurate billing and consumption tracking',
        'Reduced operational costs for utility providers'
      ],
      bn: [
        'বিদ্যুৎ ব্যবহারের রিয়েল-টাইম মনিটরিং',
        'তাৎক্ষণিক রিচার্জ এবং সক্রিয়করণ',
        'দূরবর্তী ডায়াগনস্টিক্স এবং সমস্যা সমাধান',
        'সঠিক বিলিং এবং ব্যবহার ট্র্যাকিং',
        'উপযোগিতা প্রদানকারীদের জন্য কম অপারেশনাল খরচ'
      ]
    }
  };

  return (
    <div className="w-full space-y-8 py-6">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="heading-text !text-center !text-4xl mb-4">
          {locale === 'en' ? pageTranslations.title.en : pageTranslations.title.bn}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {locale === 'en' ? pageTranslations.subtitle.en : pageTranslations.subtitle.bn}
        </p>
      </div>

      {/* Summary Statistics */}
      <div className="mb-8">
        <SummaryStatistics 
          data={timeSeriesData} 
          locale={locale} 
          totalMeters={totalMeters} 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <TimeSeriesChart data={timeSeriesData} locale={locale} />
        <GeographicalDistribution 
          data={geographicalData} 
          locale={locale} 
          total={totalMeters} 
        />
      </div>

      {/* Benefits Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center">
          {locale === 'en' ? pageTranslations.benefitsTitle.en : pageTranslations.benefitsTitle.bn}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pageTranslations.benefits[locale].map((benefit, index) => (
            <div key={index} className="bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-500 rounded-full p-1 mr-3">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700">{benefit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnlineMetersPage;