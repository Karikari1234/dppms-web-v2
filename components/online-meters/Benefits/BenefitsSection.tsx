"use client";

import React from 'react';
import { Locale } from '@/i18n';
import { BenefitCard } from './BenefitCard';
import { benefitIcons } from '@/lib/online-meters/icons';

interface BenefitsSectionProps {
  locale: Locale;
  translations: {
    title: string;
    benefits: string[];
    descriptions: string[];
  };
}

export const BenefitsSection = ({ locale, translations }: BenefitsSectionProps) => {
  return (
    <div className="bg-gradient-to-br from-white to-green-50 p-8 rounded-xl shadow-lg border border-green-100">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-green-700 mb-2">
          {translations.title}
        </h2>
        <div className="w-20 h-1 bg-green-500 mx-auto rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {translations.benefits.map((benefit, index) => (
          <BenefitCard 
            key={index}
            title={benefit}
            description={translations.descriptions[index]}
            iconSvg={benefitIcons[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default BenefitsSection;