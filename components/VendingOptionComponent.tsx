"use client";

import Image from "next/image";
import { Locale } from "@/i18n";
import { useState } from "react";
import VideoModal from "./common/modals/VideoModal";

const VendingOptionComponent = ({ locale }: { locale: Locale }) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  
  // Hardcoded translations to avoid server component issues
  const translations: Record<string, {en: string, bn: string}> = {
    "vending_options.vending_partners": {
      en: "Our Vending Partners",
      bn: "আমাদের ভেন্ডিং পার্টনার"
    },
    "vending_options.gateways": {
      en: "Payment Gateways",
      bn: "পেমেন্ট গেটওয়ে"
    },
    "vending_options.web": {
      en: "Pay bills online through our partnered payment platforms",
      bn: "আমাদের অংশীদার পেমেন্ট প্ল্যাটফর্মের মাধ্যমে অনলাইনে বিল পরিশোধ করুন"
    }
  };

  // Simple translation function that doesn't rely on the server-side translation system
  const t = (key: string) => {
    // Check if the key exists in translations
    if (key in translations) {
      return translations[key][locale] || key;
    }
    return key;
  };

  return (
    <div>
      <div className="mb-8 flex flex-col justify-center space-y-6 md:items-center">
        <h6 className="text-3xl font-semibold md:text-3xl">{t("vending_options.vending_partners")}</h6>
        <h1 className="text-4xl font-semibold md:text-5xl">
          {t("vending_options.gateways")}
        </h1>
        <h6 className="text-lg md:text-xl">
          {t("vending_options.web")}
        </h6>
      </div>
      <div className="grid grid-cols-2 place-content-center place-items-center gap-4 md:mx-auto md:w-3/5 md:grid-cols-3 md:grid-rows-3">
        <button
          onClick={() => setIsVideoModalOpen(true)}
          className="relative mx-auto flex h-16 w-64 items-center justify-center group cursor-pointer overflow-hidden rounded-lg hover:shadow-lg transition-shadow duration-300"
        >
          {/* Video play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-300 z-10">
            <div className="bg-black/70 rounded-full p-3 transform scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          </div>
          
          {/* Tutorial text label */}
          <div className="absolute -bottom-10 group-hover:-bottom-6 left-0 right-0 text-sm text-center font-medium text-white bg-green py-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
            {locale === 'en' ? 'Watch Tutorial' : 'টিউটোরিয়াল দেখুন'}
          </div>
          
          {/* Logo image with pulse effect */}
          <div className="relative w-full h-full flex items-center justify-center p-3">
            <div className="absolute inset-0 bg-green/5 group-hover:bg-green/10 transition-colors duration-300"></div>
            <Image
              src="/bkash-logo.png"
              alt="bKash logo"
              fill={true}
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ objectFit: "contain" }}
              className="transition-all duration-700 ease-in-out group-hover:scale-110 relative z-0 p-2"
            />
            <div className="absolute -inset-1 bg-green/0 group-hover:bg-green/5 rounded-full group-hover:animate-ping opacity-75 transition-colors duration-300"></div>
          </div>
        </button>
        <a
          href="https://nagad.com.bd/services/?service=bill-pay"
          className="relative mx-auto flex h-24 w-24 items-center justify-center"
          target="_blank"
        >
          <Image
            src="/nagad-logo.svg"
            alt="brand logo"
            fill={true}
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "contain" }}
            className="transition duration-700 ease-in-out hover:scale-125 hover:grayscale-0"
          />
        </a>
        <a
          href="https://www.upaybd.com/services/details/bpdb-prepaid"
          className="relative mx-auto flex h-24 w-24 items-center justify-center"
          target="_blank"
        >
          <Image
            src="/upay-logo.webp"
            alt="brand logo"
            fill={true}
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "contain" }}
            className="transition duration-700 ease-in-out hover:scale-125 hover:grayscale-0"
          />
        </a>
        <a
          href="https://trustaxiatapay.com/services/pay-bill/"
          className="relative mx-auto flex h-16 w-16 items-center justify-center"
          target="_blank"
        >
          <Image
            src="/r-tap-logo.png"
            alt="brand logo"
            fill={true}
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "contain" }}
            className="transition duration-700 ease-in-out hover:scale-125 hover:grayscale-0"
          />
        </a>
        <a
          href="https://sslcommerz.com/"
          className="relative mx-auto flex h-8 w-32 items-center justify-center"
          target="_blank"
        >
          <Image
            src="/ssl-logo.png"
            alt="brand logo"
            fill={true}
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "contain" }}
            className="transition duration-700 ease-in-out hover:scale-125 hover:grayscale-0"
          />
        </a>
        <a
          href="https://m-money.robi.com.bd/robicash_web/index.html"
          className="relative mx-auto flex h-16 w-16 items-center justify-center"
          target="_blank"
        >
          <Image
            src="/r-robi-logo.png"
            alt="brand logo"
            fill={true}
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "contain" }}
            className="transition duration-700 ease-in-out hover:scale-125 hover:grayscale-0"
          />
        </a>
        <a
          href="https://www.grameenphone.com/bpdb"
          className="relative mx-auto h-16 w-64 items-center justify-center md:col-start-2"
          target="_blank"
        >
          <Image
            src="/r-gp-logo.png"
            alt="brand logo"
            fill={true}
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "contain" }}
            className="transition duration-700 ease-in-out hover:scale-125 hover:grayscale-0"
          />
        </a>
      </div>
      
      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoId="1Z_9MXIagKmA84ByAyNH-JiSb1RCfTQpT"
        title={locale === 'en' ? 'Pay Bill With bKash' : 'বিকাশের মাধ্যমে বিল পরিশোধ করুন'}
      />
    </div>
  );
};

export default VendingOptionComponent;