"use client";

import React from 'react';
import { Locale } from '@/i18n';

interface BenefitsSectionProps {
  locale: Locale;
  translations: {
    title: string;
    benefits: string[];
    descriptions?: string[];
  };
}

export const BenefitsSection = ({ locale, translations }: BenefitsSectionProps) => {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {translations.title}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {translations.benefits.map((benefit, index) => (
          <div 
            key={index} 
            className="p-4 border border-green-light rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-green-light rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">{index + 1}</span>
              </div>
              <h3 className="text-lg font-semibold">{benefit}</h3>
            </div>
            {translations.descriptions && translations.descriptions[index] && (
              <p className="text-gray-600 ml-11">
                {translations.descriptions[index]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsSection;