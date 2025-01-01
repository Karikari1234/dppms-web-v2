import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/i18n";
import { getTranslation } from "@/lib/i18n/getTranslation";

const HeroSection = async ({ locale }: { locale: Locale }) => {
  return (
    <div className="grid lg:grid lg:grid-cols-hero lg:items-center lg:gap-4">
      <div className="row-start-2 lg:order-last lg:col-start-2 lg:row-start-1">
        <div className=" relative mx-auto h-[400px] max-w-[400px] md:h-[640px] md:max-w-[640px]">
          <Image
            priority={true}
            src="/hero-image.png"
            alt="BPDB logo"
            fill={true}
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "contain" }}
          ></Image>
        </div>
      </div>
      <div className="">
        <h1
          className={`mb-5  animate-fade-up text-center text-4xl font-bold animate-once md:text-left md:text-5xl md:leading-tight`}
        >
          Welcome to{" "}
          <span className="md:whitespace-nowrap">Prepaid Metering</span> System
          BPDB
        </h1>
        <p className="mb-5 animate-fade-up text-center text-lg leading-normal animate-once md:text-left md:text-xl">
          The smart and convenient way to pay for your electricity. With prepaid
          metering, you can monitor your energy consumption, and recharge your
          balance easily.
        </p>
        <div className="flex justify-center gap-1 md:justify-normal md:gap-6">
          <Link
            href="/bill-calculator
          "
          >
            <button className="rounded border border-green bg-green px-4 py-2 text-base font-semibold text-white shadow-2xl hover:border-transparent hover:bg-green-deep md:text-base">
              Calculate Meter Charges
            </button>
          </Link>
          <Link href="/token-check">
            <button className="rounded border border-green bg-transparent px-4 py-2 text-base font-semibold text-green md:text-base">
              Check last 3 recharge token
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
