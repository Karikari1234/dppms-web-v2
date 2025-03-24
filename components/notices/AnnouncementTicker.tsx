"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Bell, ExternalLink } from "lucide-react";
import { Locale } from "@/i18n";
import { Announcement, announcements, formatDate } from "@/lib/announcements";

interface AnnouncementTickerProps {
  locale: Locale;
}

const AnnouncementTicker = ({ locale }: AnnouncementTickerProps) => {
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const translations = {
    news: {
      en: "News:",
      bn: "সংবাদ:"
    },
    all: {
      en: "All",
      bn: "সব"
    },
    new: {
      en: "NEW",
      bn: "নতুন"
    },
    clickToView: {
      en: "Click to view",
      bn: "দেখতে ক্লিক করুন"
    }
  };

  // Auto rotate announcements every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentAnnouncementIndex(
          (prevIndex) => (prevIndex + 1) % announcements.length
        );
        setIsAnimating(false);
        setScrollPosition(0); // Reset scroll position for new announcement
      }, 500); // Half second for the animation
    }, 10000); // Increased to 10 seconds to give enough time for scrolling

    return () => clearInterval(timer);
  }, []);

  // Handle horizontal scrolling for text
  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;
    
    const textWidth = textRef.current.scrollWidth;
    const containerWidth = containerRef.current.clientWidth;
    
    // Only scroll if text is wider than container
    if (textWidth > containerWidth) {
      const animationDuration = textWidth * 15; // Adjust speed here
      
      const scrollTimer = setInterval(() => {
        setScrollPosition((prev) => {
          // Reset when it scrolls past the end
          if (prev >= textWidth) {
            return -containerWidth;
          }
          return prev + 1;
        });
      }, 30);
      
      return () => clearInterval(scrollTimer);
    }
  }, [currentAnnouncementIndex, isAnimating]);

  const currentAnnouncement = announcements[currentAnnouncementIndex];
  
  // Adjust URL for locale-specific pages
  const getUrl = (url: string) => {
    // Check if it's an internal page (not a PDF)
    if (!url.endsWith('.pdf')) {
      // Replace /en/ with the current locale
      return url.replace('/en/', `/${locale}/`);
    }
    return url;
  };

  // Determine if it's an external document or internal page
  const isExternalDocument = (url: string) => {
    return url.endsWith('.pdf');
  };

  // Format date in Bengali style for bn locale
  const getFormattedDate = (dateString: string) => {
    if (locale === 'bn') {
      // Extract day and month from the date string
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1; // JavaScript months are 0-indexed
      const year = date.getFullYear();
      
      // Convert to Bengali format (day month, year)
      return `(${day} মার্চ, ${year})`;
    }
    
    // For English, use standard format
    return `(${new Date(dateString).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })})`;
  };

  return (
    <div className="my-2">
      <div className="mx-auto max-w-full rounded-md border border-green-light bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center w-full">
          {/* News Label with icon */}
          <div className="flex items-center bg-green px-2 py-3 md:p-3 text-white rounded-l-md">
            <Bell size={16} className="mr-1 md:mr-2" />
            <span className="font-medium text-sm md:text-base whitespace-nowrap">{translations.news[locale]}</span>
          </div>
          
          {/* Scrolling content with horizontal ticker effect */}
          <div 
            ref={containerRef}
            className="relative flex-1 overflow-hidden px-2 md:px-4 py-3 group hover:bg-gray-50 transition-colors"
          >
            <div 
              ref={contentRef}
              className={`transition-transform duration-500 ${isAnimating ? 'transform -translate-y-10 opacity-0' : 'transform translate-y-0 opacity-100'}`}
            >
              <Link 
                href={getUrl(currentAnnouncement.documentUrl)}
                target={isExternalDocument(currentAnnouncement.documentUrl) ? "_blank" : undefined}
                className="flex items-center cursor-pointer"
              >
                <div className="flex items-center overflow-hidden">
                  <span 
                    ref={textRef}
                    style={{ 
                      transform: `translateX(-${scrollPosition}px)`,
                      transition: 'transform 0.1s linear',
                      whiteSpace: 'nowrap'
                    }}
                    className="text-gray-800 group-hover:text-green font-semibold tracking-tight mr-2 text-sm md:text-base"
                  >
                    {currentAnnouncement.title[locale]}
                  </span>
                  
                  {/* New badge and date - these don't scroll with the text */}
                  <div className="flex-shrink-0 flex items-center">
                    {currentAnnouncement.isNew && (
                      <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 md:px-2 md:py-1 rounded-full flex-shrink-0 whitespace-nowrap">
                        {translations.new[locale]}
                      </span>
                    )}
                    <span className="text-gray-500 text-xs md:text-sm ml-2 flex-shrink-0 whitespace-nowrap">
                      {getFormattedDate(currentAnnouncement.date)}
                    </span>
                    
                    {/* Visual indicator for clickable link */}
                    <div className="ml-2 flex items-center text-green">
                      {isExternalDocument(currentAnnouncement.documentUrl) ? (
                        <ExternalLink size={16} className="flex-shrink-0" />
                      ) : (
                        <ChevronRight size={16} className="flex-shrink-0" />
                      )}
                    </div>
                  </div>
                </div>
              </Link>
              
              {/* Small hint text - visible on hover */}
              <div className="absolute right-4 top-0 text-xs text-green opacity-0 group-hover:opacity-100 transition-opacity mt-1 hidden md:block">
                {translations.clickToView[locale]}
              </div>
            </div>
          </div>
          
          {/* All button */}
          <Link 
            href={`/${locale}/all-notices`}
            className="bg-gray-100 hover:bg-gray-200 px-3 py-3 md:px-4 text-gray-700 font-medium rounded-r-md transition-colors whitespace-nowrap text-sm md:text-base"
          >
            {translations.all[locale]}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementTicker;
