"use client";

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Locale } from '@/i18n';

// Define the structure of the time series data
interface TimeSeriesEntry {
  month_name: string;
  month_num: number;
  year: number;
  meter_count: number;
}

interface TimeSeriesChartProps {
  data: TimeSeriesEntry[];
  locale: Locale;
}

// Format the month name based on the locale
const formatMonthName = (monthName: string, locale: Locale) => {
  const monthTranslations: Record<string, Record<Locale, string>> = {
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
  };

  return monthTranslations[monthName]?.[locale] || monthName;
};

// Format the tick for the X-axis
const formatXAxisTick = (value: string, locale: Locale) => {
  const [month, year] = value.split(' ');
  const formattedMonth = formatMonthName(month, locale);
  return `${formattedMonth}`;
};

// Format the tick for the Y-axis to use K for thousands
const formatYAxisTick = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return value;
};

const TimeSeriesChart = ({ data, locale }: TimeSeriesChartProps) => {
  // Sort the data by year and month
  const sortedData = [...data].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return a.month_num - b.month_num;
  });

  // Format the data for the chart
  const formattedData = sortedData.map(entry => ({
    name: `${entry.month_name} ${entry.year}`,
    "Online Meters": entry.meter_count,
    monthYear: `${formatMonthName(entry.month_name, locale)} ${entry.year}`,
  }));

  // Translations
  const translations = {
    title: {
      en: 'Monthly Online Meters Growth',
      bn: 'মাসিক অনলাইন মিটার বৃদ্ধি'
    },
    yAxis: {
      en: 'Number of Meters',
      bn: 'মিটারের সংখ্যা'
    },
    tooltipLabel: {
      en: 'Online Meters',
      bn: 'অনলাইন মিটার'
    }
  };

  // Custom tooltip to display formatted values
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const entry = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded shadow-md">
          <p className="font-bold">{entry.monthYear}</p>
          <p className="text-green">
            {locale === 'en' ? translations.tooltipLabel.en : translations.tooltipLabel.bn}: 
            {' '}{payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">
        {locale === 'en' ? translations.title.en : translations.title.bn}
      </h2>
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{ top: 20, right: 40, left: 20, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              tickFormatter={(value) => formatXAxisTick(value, locale)}
              height={60}
              tick={(props) => {
                const { x, y, payload } = props;
                return (
                  <g transform={`translate(${x},${y})`}>
                    <text 
                      x={0} 
                      y={0} 
                      dy={16} 
                      textAnchor="end" 
                      fill="#666"
                      fontSize={12}
                      transform="rotate(-45)"
                    >
                      {formatXAxisTick(payload.value, locale)}
                    </text>
                  </g>
                );
              }}
            />
            <YAxis 
              domain={[0, 500000]}
              tickCount={6}
              width={90}
              tickFormatter={(value) => value.toLocaleString()}
              padding={{ top: 20 }}
              orientation="right"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="Online Meters" 
              stroke="#1e9148" 
              activeDot={{ r: 8 }} 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TimeSeriesChart;