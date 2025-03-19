import React from 'react';
import { Locale } from '@/i18n';
import { getTranslation } from '@/lib/i18n/getTranslation';
import TimeSeriesChart from '@/components/online-meters/TimeSeriesChart';
import GeographicalDistribution from '@/components/online-meters/GeographicalDistribution';
import SummaryStatistics from '@/components/online-meters/SummaryStatistics';
import { BenefitsSection } from '@/components/online-meters/Benefits';
import { timeSeriesData, geographicalData, totalMeters } from '@/lib/online-meters/data';
import { getOnlineMetersTranslations } from '@/translations/online-meters';

type Props = {
  params: {
    locale: Locale;
  };
};

const OnlineMetersPage = async ({ params }: Props) => {
  const { locale } = params;
  const translation = await getTranslation(locale);
  
  // Get page-specific translations
  const pageTranslations = getOnlineMetersTranslations(locale);

  return (
    <div className="w-full space-y-8 py-6">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="heading-text !text-center !text-4xl mb-4">
          {pageTranslations.title}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {pageTranslations.subtitle}
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

      {/* Benefits Section - Now a modular component */}
      <BenefitsSection 
        locale={locale} 
        translations={{
          title: pageTranslations.benefitsTitle,
          benefits: pageTranslations.benefits,
          descriptions: pageTranslations.benefitsDescription
        }}
      />
    </div>
  );
};

export default OnlineMetersPage;