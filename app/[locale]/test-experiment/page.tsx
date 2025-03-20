import React from 'react';
import { Locale } from '@/i18n';
import { getTranslation } from '@/lib/i18n/getTranslation';
import BangladeshMap from '@/components/online-meters/BangladeshMap';
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

const TestExperimentPage = async ({ params }: Props) => {
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

      {/* Geographic Visualization Focus */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Bangladesh Meter Distribution Map
        </h2>
        
        {/* Enhanced Map Visualization */}
        <div className="mb-8">
          <BangladeshMap 
            data={geographicalData} 
            locale={locale} 
            total={totalMeters} 
          />
          <p className="text-sm text-gray-600 italic text-center mt-2">
            Accurate geographical boundaries for Bangladeshi divisions
          </p>
        </div>
        
        {/* Time Series Chart */}
        <div className="mt-12 mb-8">
          <TimeSeriesChart data={timeSeriesData} locale={locale} />
        </div>
        
        {/* Traditional Bar Chart for Comparison */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Traditional Bar Chart View
          </h3>
          <GeographicalDistribution 
            data={geographicalData} 
            locale={locale} 
            total={totalMeters} 
          />
        </div>
      </div>

      {/* Benefits Section */}
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

export default TestExperimentPage;