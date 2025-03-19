"use client";

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LabelList
} from 'recharts';
import { Locale } from '@/i18n';

// Define the structure of the geographical data
interface RegionData {
  region: string;
  count: number;
}

interface GeographicalDistributionProps {
  data: RegionData[];
  locale: Locale;
  total: number;
}

const GeographicalDistribution = ({ data, locale, total }: GeographicalDistributionProps) => {
  // Colors for the bars - modified to be more distinct
  const colors = ['#3b4eae', '#1e9148', '#20bcb3'];

  // Format the data to include percentages
  const formattedData = data.map((item, index) => ({
    ...item,
    percentage: Math.round((item.count / total) * 100),
    color: colors[index % colors.length]
  }));

  // Translations
  const translations = {
    title: {
      en: 'Geographical Distribution of Online Meters',
      bn: 'অনলাইন মিটারের ভৌগলিক বণ্টন'
    },
    region: {
      en: 'Region',
      bn: 'অঞ্চল'
    },
    count: {
      en: 'Number of Meters',
      bn: 'মিটারের সংখ্যা'
    },
    percentage: {
      en: 'Percentage',
      bn: 'শতাংশ'
    }
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded shadow-md">
          <p className="font-bold">{payload[0].payload.region}</p>
          <p className="text-green">
            {locale === 'en' ? translations.count.en : translations.count.bn}: 
            {' '}{payload[0].payload.count.toLocaleString()}
          </p>
          <p className="text-green">
            {locale === 'en' ? translations.percentage.en : translations.percentage.bn}: 
            {' '}{payload[0].payload.percentage}%
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
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={formattedData}
            margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number" 
              tickFormatter={(value) => value.toLocaleString()}
            />
            <YAxis 
              type="category" 
              dataKey="region" 
              tick={{ fill: '#333', fontSize: 14, fontWeight: 'bold' }}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="count" 
              name={locale === 'en' ? translations.count.en : translations.count.bn}
              barSize={40}
            >
              {formattedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <LabelList 
                dataKey="count" 
                position="insideRight" 
                fill="#FFFFFF" 
                formatter={(value: number) => value.toLocaleString()}
                style={{ fontWeight: 'bold', fontSize: '12px' }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GeographicalDistribution;