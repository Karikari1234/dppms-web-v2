import { Locale } from "@/i18n";
import { getTranslation } from "@/lib/i18n/getTranslation";

const VideoEmbed = async ({ locale }: { locale: Locale }) => {
  const translation = await getTranslation(locale);

  const videos = [
    {
      id: "1V3fOSFWBLwi_49q3UppmMJs35zTuC8yd",
      label: {
        en: "BPDB Prepaid Metering System Overview",
        bn: "বিপিডিবি প্রিপেইড মিটারিং সিস্টেমের সারসংক্ষেপ",
      },
      logo: "/site-logo.png",
    },
    {
      id: "1Z_9MXIagKmA84ByAyNH-JiSb1RCfTQpT",
      label: {
        en: "BPDB Prepaid Meter Vending using Bkash Mobile App",
        bn: "বিপিডিবি প্রিপেইড মিটার ভেন্ডিং বিকাশ মোবাইল অ্যাপ ব্যবহার করে",
      },
      logo: "/bkash-logo.png",
    },
  ];

  return (
    <div>
      <h1 className="heading-text mb-4 !text-center md:mb-8">
        {translation("video_embed.title")}
      </h1>
      <div className="flex flex-wrap justify-center gap-4">
        {videos.map((video, index) => (
          <div
            key={index}
            className="relative w-[45%] pb-[25.3125%] max-w-full group overflow-hidden"
          >
            <iframe
              src={`https://drive.google.com/file/d/${video.id}/preview`}
              title={`Video ${index + 1}`}
              allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full border-none pointer-events-auto"
            ></iframe>

            {/* Overlay container */}
            <div className="pointer-events-none absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center px-4 py-6">
              {/* Logo (only on hover with animation) */}
              <div className="mb-3 opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-110 transition-all duration-500 ease-in-out">
                <img
                  src={video.logo}
                  alt="Logo"
                  className="w-20 h-20 object-contain pointer-events-none"
                />
              </div>

              {/* Label text (only on hover) */}
              <p className="text-base md:text-lg font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-60 px-3 py-2 rounded">
                {video.label[locale]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoEmbed;
