import Image from "next/image";
import { Locale } from "@/i18n";
import { getTranslation } from "@/lib/i18n/getTranslation";

const VendingOptionComponent = async ({ locale }: { locale: Locale }) => {
  const translation = await getTranslation(locale);
  return (
    <div>
      <div className="mb-8 flex flex-col justify-center space-y-6 md:items-center">
        <h6 className="text-3xl font-semibold md:text-3xl">{translation("vending_options.vending_partners")}</h6>
        <h1 className="text-4xl font-semibold md:text-5xl">
        {translation("vending_options.gateways")}
        </h1>
        <h6 className="text-lg md:text-xl">
        {translation("vending_options.web")}
        </h6>
      </div>
      <div className="grid grid-cols-2 place-content-center place-items-center gap-4 md:mx-auto md:w-3/5 md:grid-cols-3 md:grid-rows-3">
        <a
          href="https://www.bkash.com/products-services/electricity-paybill"
          className="relative mx-auto flex h-16 w-64 items-center justify-center"
          target="_blank"
        >
          <Image
            src="/bkash-logo.png"
            alt="brand logo"
            fill={true}
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "contain" }}
            className="transition duration-700 ease-in-out hover:scale-125 hover:grayscale-0"
          ></Image>
        </a>
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
          ></Image>
        </a>
        <a
          href="https://www.upaybd.com/services/details/bpdb-prepaid"
          className="relative mx-auto flex  h-24 w-24 items-center justify-center"
          target="_blank"
        >
          <Image
            src="/upay-logo.webp"
            alt="brand logo"
            fill={true}
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "contain" }}
            className=" transition duration-700 ease-in-out hover:scale-125 hover:grayscale-0"
          ></Image>
        </a>
        <a
          href="https://trustaxiatapay.com/services/pay-bill/"
          className="relative mx-auto flex h-16 w-16  items-center justify-center"
          target="_blank"
        >
          <Image
            src="/r-tap-logo.png"
            alt="brand logo"
            fill={true}
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "contain" }}
            className="transition duration-700 ease-in-out hover:scale-125 hover:grayscale-0"
          ></Image>
        </a>
        <a
          href="https://sslcommerz.com/"
          className="relative mx-auto flex h-8 w-32  items-center justify-center"
          target="_blank"
        >
          <Image
            src="/ssl-logo.png"
            alt="brand logo"
            fill={true}
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "contain" }}
            className="transition duration-700 ease-in-out hover:scale-125 hover:grayscale-0"
          ></Image>
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
            className=" transition duration-700 ease-in-out hover:scale-125 hover:grayscale-0"
          ></Image>
        </a>
        <a
          href="https://www.grameenphone.com/bpdb"
          className="relative mx-auto  h-16 w-64  items-center justify-center md:col-start-2"
          target="_blank"
        >
          <Image
            src="/r-gp-logo.png"
            alt="brand logo"
            fill={true}
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "contain" }}
            className="transition duration-700 ease-in-out hover:scale-125 hover:grayscale-0"
          ></Image>
        </a>
      </div>
    </div>
  );
};

export default VendingOptionComponent;
