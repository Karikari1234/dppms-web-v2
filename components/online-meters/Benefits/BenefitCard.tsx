"use client";

import React from 'react';

interface BenefitCardProps {
  title: string;
  description: string;
  iconSvg: string;
}

export const BenefitCard = ({ title, description, iconSvg }: BenefitCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-green-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex items-center mb-4">
        <div 
          className="flex-shrink-0 bg-green-100 text-green-600 rounded-full p-3 mr-4" 
          dangerouslySetInnerHTML={{ __html: iconSvg }}
        />
        <h3 className="font-semibold text-lg text-green-800">{title}</h3>
      </div>
      <p className="text-gray-600 ml-14">{description}</p>
    </div>
  );
};

export default BenefitCard;