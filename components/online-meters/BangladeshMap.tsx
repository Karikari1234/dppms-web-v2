"use client";

import React, { useEffect, useState } from 'react';
import { Locale } from '@/i18n';

// Define the structure of the meter data
interface RegionData {
  region: string;
  count: number;
}

interface BangladeshMapProps {
  data: RegionData[];
  locale: Locale;
  total: number;
}

const BangladeshMap = ({ data, locale, total }: BangladeshMapProps) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [leaflet, setLeaflet] = useState<any>(null);
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const [detailedRegionsData, setDetailedRegionsData] = useState<any>(null);
  
  // Translations
  const translations = {
    title: {
      en: 'Geographical Distribution of Online Meters',
      bn: 'অনলাইন মিটারের ভৌগলিক বণ্টন'
    },
    note: {
      en: 'N.B: Data is up to March 2025',
      bn: 'দ্রষ্টব্য: তথ্য মার্চ ২০২৫ পর্যন্ত'
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
    },
    legend: {
      en: 'Meter Density',
      bn: 'মিটার ঘনত্ব'
    },
    loading: {
      en: 'Loading map...',
      bn: 'মানচিত্র লোড হচ্ছে...'
    }
  };

  // Map regionName to match GeoJSON
  const getRegionNameForMatch = (name: string): string => {
    // Convert common variations
    const nameMap: Record<string, string> = {
      'Chittagong': 'Chattogram',
      'Comilla': 'Comilla',
      'Sylhet': 'Sylhet',
      'Dhaka': 'Dhaka',
      'Khulna': 'Khulna',
      'Rajshahi': 'Rajshahi',
      'Rangpur': 'Rangpur',
      'Barisal': 'Barishal',
      'Barishal': 'Barishal',
      'Mymensingh': 'Mymensingh'
    };
    
    return nameMap[name] || name;
  };

  // Map and legend setup
  useEffect(() => {
    // Dynamically import leaflet on client side
    const setupLeaflet = async () => {
      try {
        // Import leaflet and react-leaflet
        const L = await import('leaflet');
        const { MapContainer, TileLayer, GeoJSON, Tooltip, Popup } = await import('react-leaflet');
        
        // Set leaflet components for use in render
        setLeaflet({ L, MapContainer, TileLayer, GeoJSON, Tooltip, Popup });
        
        // Load the main GeoJSON data (all divisions)
        const response = await fetch('/geo/bangladesh-division-boundaries.json');
        const geoData = await response.json();
        
        // Load the detailed regions data (Chittagong, Comilla, Sylhet)
        const detailedResponse = await fetch('/geo/bangladesh-meter-regions.json');
        const detailedGeoData = await detailedResponse.json();
        
        // Process GeoJSON data - map our meter counts to the GeoJSON features
        const processedGeoData = {
          ...geoData,
          features: geoData.features.map((feature: any) => {
            // Find corresponding data in our meter data
            const matchName = getRegionNameForMatch(feature.properties.name);
            const regionData = data.find(d => 
              getRegionNameForMatch(d.region) === matchName ||
              d.region.toLowerCase() === feature.properties.name.toLowerCase()
            );
            
            return {
              ...feature,
              properties: {
                ...feature.properties,
                meters: regionData ? regionData.count : 0,
                percentage: regionData ? Math.round((regionData.count / total) * 100) : 0
              }
            };
          })
        };
        
        // Process detailed regions data
        const processedDetailedData = {
          ...detailedGeoData,
          features: detailedGeoData.features.map((feature: any) => {
            // Find corresponding data in our meter data
            const matchName = getRegionNameForMatch(feature.properties.name);
            const regionData = data.find(d => 
              getRegionNameForMatch(d.region) === matchName ||
              d.region.toLowerCase() === feature.properties.name.toLowerCase()
            );
            
            return {
              ...feature,
              properties: {
                ...feature.properties,
                meters: regionData ? regionData.count : 0,
                percentage: regionData ? Math.round((regionData.count / total) * 100) : 0
              }
            };
          })
        };
        
        setGeoJsonData(processedGeoData);
        setDetailedRegionsData(processedDetailedData);
        setMapLoaded(true);
      } catch (error) {
        console.error('Error setting up map:', error);
      }
    };
    
    setupLeaflet();
    
    // Add leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, [data, total]);
  
  // Get color based on meter density
  const getColor = (meters: number) => {
    return meters > 200000 ? '#034e7b' :
           meters > 100000 ? '#0570b0' :
           meters > 50000 ? '#3690c0' :
           meters > 20000 ? '#74a9cf' :
           meters > 10000 ? '#a6bddb' :
                         '#d0d1e6';
  };
  
  // Style function for GeoJSON
  const style = (feature: any) => {
    return {
      fillColor: getColor(feature.properties.meters),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  };
  
  // Highlight on hover
  const highlightFeature = (e: any) => {
    const layer = e.target;
    
    layer.setStyle({
      weight: 3,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.9
    });
    
    layer.bringToFront();
  };
  
  // Reset highlight
  const resetHighlight = (e: any) => {
    const layer = e.target;
    layer.setStyle(style(layer.feature));
  };
  
  // Each feature binding
  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight
    });
    
    const regionName = locale === 'en' ? feature.properties.name : feature.properties.bn_name;
    const meterCount = feature.properties.meters.toLocaleString();
    const percentage = feature.properties.percentage;
    
    layer.bindPopup(`
      <div class="font-bold">${regionName}</div>
      <div>${locale === 'en' ? translations.count.en : translations.count.bn}: ${meterCount}</div>
      <div>${locale === 'en' ? translations.percentage.en : translations.percentage.bn}: ${percentage}%</div>
    `);
  };
  
  // If not loaded, show loading
  if (!mapLoaded || !leaflet || !geoJsonData || !detailedRegionsData) {
    return (
      <div className="w-full bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2 text-center">
          {locale === 'en' ? translations.title.en : translations.title.bn}
        </h2>
        <div className="h-96 flex items-center justify-center bg-gray-100">
          <p>{locale === 'en' ? translations.loading.en : translations.loading.bn}</p>
        </div>
      </div>
    );
  }
  
  // Destructure Leaflet components
  const { MapContainer, TileLayer, GeoJSON } = leaflet;
  
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2 text-center">
        {locale === 'en' ? translations.title.en : translations.title.bn}
      </h2>
      <p className="text-sm text-gray-600 italic text-center mb-4">
        {locale === 'en' ? translations.note.en : translations.note.bn}
      </p>
      
      <div className="h-96 relative">
        <MapContainer 
          center={[23.685, 90.356]} 
          zoom={7} 
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Base layer with all divisions */}
          <GeoJSON 
            data={geoJsonData}
            style={style}
            onEachFeature={onEachFeature}
          />
          
          {/* Detailed layer for Chittagong, Comilla, and Sylhet */}
          <GeoJSON 
            data={detailedRegionsData}
            style={style}
            onEachFeature={onEachFeature}
          />
        </MapContainer>
      </div>
      
      {/* Legend */}
      <div className="mt-4">
        <p className="font-semibold mb-2 text-center">
          {locale === 'en' ? translations.legend.en : translations.legend.bn}
        </p>
        <div className="flex justify-center items-center space-x-2">
          {[
            {color: '#d0d1e6', label: '< 10,000'},
            {color: '#a6bddb', label: '10,000-20,000'},
            {color: '#74a9cf', label: '20,001-50,000'},
            {color: '#3690c0', label: '50,001-100,000'},
            {color: '#0570b0', label: '100,001-200,000'},
            {color: '#034e7b', label: '> 200,000'}
          ].map((item, index) => (
            <div key={index} className="flex items-center">
              <div 
                style={{ backgroundColor: item.color }} 
                className="w-4 h-4 inline-block mr-1"
              ></div>
              <span className="text-xs">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BangladeshMap;