"use client";

import Image from "next/image";
import { Locale } from "@/i18n";
import { useState } from "react";
import VideoModal from "./common/modals/VideoModal";

const VendingOptionComponent = ({ locale }: { locale: Locale }) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<{ id: string; title: string } | null>(null);

  const openVideo = (id: string, title: string) => {
    setActiveVideo({ id, title });
    setIsVideoModalOpen(true);
  };

  const translations: Record<string, { en: string; bn: string }> = {
    "vending_options.vending_partners": {
      en: "Our Vending Partners",
      bn: "আমাদের ভেন্ডিং পার্টনার",
    },
    "vending_options.gateways": {
      en: "Payment Gateways",
      bn: "পেমেন্ট গেটওয়ে",
    },
    "vending_options.web": {
      en: "Pay bills online through our partnered payment platforms",
      bn: "আমাদের অংশীদার পেমেন্ট প্ল্যাটফর্মের মাধ্যমে অনলাইনে বিল পরিশোধ করুন",
    },
  };

  const t = (key: string) => translations[key]?.[locale] || key;

  const partnerList = [
    {
      key: "bkash",
      logo: "/bkash-logo.png",
      videoId: "1Z_9MXIagKmA84ByAyNH-JiSb1RCfTQpT",
      title: {
        en: "Pay Bill With bKash",
        bn: "বিকাশের মাধ্যমে বিল পরিশোধ করুন",
      },
    },
    {
      key: "nagad",
      logo: "/nagad-logo.svg",
      href: "https://nagad.com.bd/services/?service=bill-pay",
    },
    {
      key: "upay",
      logo: "/upay-logo.webp",
      // href: "https://www.upaybd.com/services/details/bpdb-prepaid",
      videoId: "13oPCxsUzU85W7IFJuR6VBQpD5y9bqr6a",
      title: {
        en: "Pay Bill With Upay",
        bn: "উপায়ের মাধ্যমে বিল পরিশোধ করুন",
      },
    },
    {
      key: "rtap",
      logo: "/r-tap-logo.png",
      // href: "https://trustaxiatapay.com/services/pay-bill/",
      videoId: "1XljCiSIEnCMdrH6B0Ezur0k49WyYCjD3",
      title: {
        en: "Pay Bill With TAP",
        bn: "ট্যাপের মাধ্যমে বিল পরিশোধ করুন",
      },
    },
    {
      key: "ssl",
      logo: "/ssl-logo.png",
      href: "https://sslcommerz.com/",
    },
    {
      key: "robi",
      logo: "/r-robi-logo.png",
      href: "https://m-money.robi.com.bd/robicash_web/index.html",
    },
    {
      key: "gp",
      logo: "/r-gp-logo.png",
      href: "https://www.grameenphone.com/bpdb",
    },
  ];

  return (
    <div>
      <div className="mb-8 flex flex-col justify-center space-y-6 md:items-center">
        <h6 className="text-3xl font-semibold md:text-3xl">
          {t("vending_options.vending_partners")}
        </h6>
        <h1 className="text-4xl font-semibold md:text-5xl">
          {t("vending_options.gateways")}
        </h1>
        <h6 className="text-lg md:text-xl">{t("vending_options.web")}</h6>
      </div>

      <div className="grid grid-cols-2 place-content-center place-items-center gap-4 md:mx-auto md:w-3/5 md:grid-cols-3 md:grid-rows-3">
        {partnerList.map((partner) => {
          const isVideo = !!partner.videoId;
          const sizeClass =
            partner.key === "bkash" || partner.key === "gp"
              ? "h-16 w-64"
              : "h-24 w-24";
          const colStartClass = partner.key === "gp" ? "md:col-start-2" : "";

          if (isVideo) {
            return (
              <button
                key={partner.key}
                onClick={() => openVideo(partner.videoId!, partner.title?.[locale] || "")}
                className={`group relative mx-auto flex items-center justify-center overflow-hidden rounded-lg ${sizeClass} ${colStartClass}`}
              >
                <div className="relative w-full h-full flex items-center justify-center p-3">
                  <div className="absolute inset-0 bg-green/5 group-hover:bg-green/10 transition-colors duration-300"></div>
                  <Image
                    src={partner.logo}
                    alt={`${partner.key} logo`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "contain" }}
                    className="transition-all duration-700 ease-in-out group-hover:scale-110 relative z-0 p-2"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-300 z-10">
                    <div className="bg-black/70 rounded-full p-3 transform scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="white"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                  </div>
                  <div className="absolute -inset-1 bg-green/0 group-hover:bg-green/5 rounded-full group-hover:animate-ping opacity-75 transition-colors duration-300"></div>
                </div>
              </button>
            );
          } else {
            return (
              <a
                key={partner.key}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative mx-auto flex items-center justify-center overflow-hidden rounded-lg ${sizeClass} ${colStartClass}`}
              >
                <Image
                  src={partner.logo}
                  alt={`${partner.key} logo`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "contain" }}
                  className="transition duration-700 ease-in-out hover:scale-125"
                />
              </a>
            );
          }
        })}
      </div>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoId={activeVideo?.id || ""}
        title={activeVideo?.title || ""}
      />
    </div>
  );
};

export default VendingOptionComponent;
