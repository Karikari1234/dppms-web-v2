import React from 'react';

export default function Loading() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green"></div>
      <p className="mt-4 text-xl font-semibold text-green">Loading data...</p>
    </div>
  );
}
