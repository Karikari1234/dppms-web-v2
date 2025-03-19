"use client";

import React from 'react';
import { Locale } from '@/i18n';

interface TimeSeriesEntry {
  month_name: string;
  month_num: number;
  year: number;
  meter_count: number;
}

interface SummaryStatisticsProps {
  data: TimeSeriesEntry[];
  locale: Locale;
  totalMeters: number;
}

const SummaryStatistics = ({ data, locale, totalMeters }: SummaryStatisticsProps) => {
  // Calculate the various statistics
  const calculateStatistics = () => {
    if (!data || data.length === 0) return null;

    // Sort the data by date
    const sortedData = [...data].sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.month_num - b.month_num;
    });

    // Get the latest month's count
    const latestMonth = sortedData[sortedData.length - 1];

    // Get the previous month's count
    const previousMonth = sortedData.length > 1 ? sortedData[sortedData.length - 2] : null;

    // Use fixed values for monthly growth and percentage (as provided)
    const monthlyGrowth = 6840;
    const monthlyGrowthPercentage = 1.59;

    return {
      totalCount: totalMeters,
      latestMonthCount: latestMonth.meter_count,
      latestMonth: {
        name: latestMonth.month_name,
        year: latestMonth.year
      },
      monthlyGrowth,
      monthlyGrowthPercentage
    };
  };

  const stats = calculateStatistics();

  // Translations
  const translations = {
    title: {
      en: 'Online Meters Overview',
      bn: 'অনলাইন মিটার সংক্ষিপ্ত বিবরণ'
    },
    totalMeters: {
      en: 'Total Online Meters',
      bn: 'মোট অনলাইন মিটার'
    },
    latestMonthCount: {
      en: 'Latest Month Count',
      bn: 'সর্বশেষ মাসে সংখ্যা'
    },
    monthlyGrowth: {
      en: 'Monthly Growth',
      bn: 'মাসিক বৃদ্ধি'
    },
    percentage: {
      en: 'Growth Percentage',
      bn: 'বৃদ্ধির শতাংশ'
    },
    monthNames: {
      JANUARY: { en: 'January', bn: 'জানুয়ারি' },
      FEBRUARY: { en: 'February', bn: 'ফেব্রুয়ারি' },
      MARCH: { en: 'March', bn: 'মার্চ' },
      APRIL: { en: 'April', bn: 'এপ্রিল' },
      MAY: { en: 'May', bn: 'মে' },
      JUNE: { en: 'June', bn: 'জুন' },
      JULY: { en: 'July', bn: 'জুলাই' },
      AUGUST: { en: 'August', bn: 'আগস্ট' },
      SEPTEMBER: { en: 'September', bn: 'সেপ্টেম্বর' },
      OCTOBER: { en: 'October', bn: 'অক্টোবর' },
      NOVEMBER: { en: 'November', bn: 'নভেম্বর' },
      DECEMBER: { en: 'December', bn: 'ডিসেম্বর' },
    }
  };

  if (!stats) return null;

  // Format month name based on locale
  const getMonthName = (month: string) => {
    return translations.monthNames[month as keyof typeof translations.monthNames]?.[locale] || month;
  };

  // Determine the appropriate color for growth indicator
  const getGrowthColorClass = (growth: number) => {
    if (growth > 0) return 'text-green-600';
    if (growth < 0) return 'text-red-600';
    return 'text-yellow-600';
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6 text-center">
        {locale === 'en' ? translations.title.en : translations.title.bn}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Latest Month Count Card */}
        <div className="bg-green-50 p-4 rounded-lg shadow border border-green-100">
          <h3 className="text-sm font-semibold text-gray-600 mb-1">
            {locale === 'en' ? translations.latestMonthCount.en : translations.latestMonthCount.bn}
          </h3>
          <p className="text-2xl font-bold text-green-600">
            {stats.latestMonthCount.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {getMonthName(stats.latestMonth.name)} {stats.latestMonth.year}
          </p>
        </div>
        
        {/* Monthly Growth Card */}
        <div className="bg-green-50 p-4 rounded-lg shadow border border-green-100">
          <h3 className="text-sm font-semibold text-gray-600 mb-1">
            {locale === 'en' ? translations.monthlyGrowth.en : translations.monthlyGrowth.bn}
          </h3>
          <p className={`text-2xl font-bold ${getGrowthColorClass(stats.monthlyGrowth)}`}>
            {stats.monthlyGrowth > 0 ? '+' : ''}{stats.monthlyGrowth.toLocaleString()}
          </p>
        </div>
        
        {/* Growth Percentage Card */}
        <div className="bg-green-50 p-4 rounded-lg shadow border border-green-100">
          <h3 className="text-sm font-semibold text-gray-600 mb-1">
            {locale === 'en' ? translations.percentage.en : translations.percentage.bn}
          </h3>
          <p className={`text-2xl font-bold ${getGrowthColorClass(stats.monthlyGrowthPercentage)}`}>
            {stats.monthlyGrowthPercentage > 0 ? '+' : ''}
            {stats.monthlyGrowthPercentage.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryStatistics;