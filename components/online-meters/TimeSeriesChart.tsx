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
  ResponsiveContainer,
  Label
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
    JANUARY: { en: 'Jan', bn: 'জান' },
    FEBRUARY: { en: 'Feb', bn: 'ফেব' },
    MARCH: { en: 'Mar', bn: 'মার্চ' },
    APRIL: { en: 'Apr', bn: 'এপ্রিল' },
    MAY: { en: 'May', bn: 'মে' },
    JUNE: { en: 'Jun', bn: 'জুন' },
    JULY: { en: 'Jul', bn: 'জুলাই' },
    AUGUST: { en: 'Aug', bn: 'আগ' },
    SEPTEMBER: { en: 'Sep', bn: 'সেপ' },
    OCTOBER: { en: 'Oct', bn: 'অক্ট' },
    NOVEMBER: { en: 'Nov', bn: 'নভে' },
    DECEMBER: { en: 'Dec', bn: 'ডিসে' },
  };

  return monthTranslations[monthName]?.[locale] || monthName;
};

// Format the tick for the X-axis to show both month and year in a compact format
const formatXAxisTick = (value: string, locale: Locale) => {
  const [month, year] = value.split(' ');
  const formattedMonth = formatMonthName(month, locale);
  // Show only the last two digits of the year to save space
  const shortYear = year.slice(2);
  return `${formattedMonth}, '${shortYear}`;
};

// Format the tick for the Y-axis to use K for thousands
// Modified to always return a string to satisfy TypeScript
const formatYAxisTick = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return value.toString();
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
    month: entry.month_num,
    year: entry.year
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
            margin={{ top: 30, right: 50, left: 30, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              tickFormatter={(value) => formatXAxisTick(value, locale)}
              height={60}
              interval={1} // Show every other tick to reduce overlap
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
                      fontSize={11}
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
              width={70}
              tickFormatter={formatYAxisTick}
              padding={{ top: 20 }}
              orientation="right"
            >
              <Label
                value={locale === 'en' ? translations.yAxis.en : translations.yAxis.bn}
                angle={90}
                position="right"
                offset={15}
                style={{ textAnchor: 'middle', fontSize: '12px', fill: '#666' }}
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top"
              height={36}
              wrapperStyle={{ paddingBottom: '10px' }}
            />
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