import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/i18n";
import { getTranslation } from "@/lib/i18n/getTranslation";

const Footer = async ({ locale }: { locale: Locale }) => {
  const translation = await getTranslation(locale);
  return (
    <footer className="mt-16 w-full bg-green text-white">
      <div className="px-2 py-6 md:mx-auto  md:w-5/6 md:p-0 md:py-12">
        <div className="md:mb-8 md:grid md:grid-cols-footer">
          <div className="mb-4 flex items-center md:col-span-1 md:min-w-[5rem] md:max-w-[250px] md:flex-col md:items-start">
            <Link
              className="relative mr-3 h-16 w-16 md:mb-4 md:h-16 md:w-16"
              href="/"
            >
              <Image
                src="/site-logo.png"
                alt="BPDB logo"
                fill={true}
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "contain" }}
              ></Image>
            </Link>
            <div className="text-semibold text-lg md:hidden">
              Prepaid Metering System
            </div>
            <div className="hidden text-sm font-light md:block md:leading-7">
              {translation("footer.site_description")}
            </div>
          </div>
          <div className="grid-row-3 mb-4 grid grid-cols-2 justify-between gap-4 md:col-span-4 md:mb-0 md:mt-2 md:grid-cols-4 md:justify-end md:gap-0 md:gap-x-0">
            <div className="">
              <div className="mb-1 font-semibold md:mb-8">{translation("footer.meter_manual")}</div>
              <ul className="flex flex-col space-y-2 md:space-y-4">
                <li>
                  <a
                    href="https://bpdb.portal.gov.bd/sites/default/files/files/bpdb.portal.gov.bd/page/8d4c02c3_c22c_479d_a287_f3f895d22929/2021-09-20-14-12-3435ce9c9d1d389f5e74b70ce4a7a4fc.pdf"
                    target="_blank"
                    className="text-sm font-light"
                  >
                    {translation("footer.hexing_manual")}
                  </a>
                </li>
                <li>
                  <a
                    href="https://bpdb.portal.gov.bd/sites/default/files/files/bpdb.portal.gov.bd/page/8d4c02c3_c22c_479d_a287_f3f895d22929/2021-09-20-14-13-8667f356d9c504ccac9aabf6f20b505e.pdf"
                    target="_blank"
                    className="text-sm font-light"
                  >
                    {translation("footer.inhe_manual")}
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    className="text-sm font-light"
                    href="https://bpdb.portal.gov.bd/sites/default/files/files/bpdb.portal.gov.bd/page/8d4c02c3_c22c_479d_a287_f3f895d22929/2021-09-20-14-14-b72bdbea5951d8d2704de5028cecd48e.pdf"
                  >
                    {translation("footer.liyong_manual")}
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    className="text-sm font-light"
                    href="https://bpdb.portal.gov.bd/sites/default/files/files/bpdb.portal.gov.bd/page/8d4c02c3_c22c_479d_a287_f3f895d22929/2021-09-20-14-15-d3e0e6a95820ca5ca971ea6804ed1a21.pdf"
                  >
                    {translation("footer.eastern_manual")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="mb-1 font-semibold md:mb-8">{translation("footer.quick_links")}</div>
              <ul className="flex flex-col space-y-2 md:space-y-4">
                <li>
                  <a
                    target="_blank"
                    className="text-sm font-light"
                    href="https://bpdb.portal.gov.bd/sites/default/files/files/bpdb.portal.gov.bd/page/8d4c02c3_c22c_479d_a287_f3f895d22929/2021-09-20-14-11-2d19fa954612b51b3d33dd4b0517f30f.pdf"
                  >
                    {translation("footer.system_operations_manual")}
                  </a>
                </li>
                <li>
                  <Link className="text-sm font-light" href="/bill-calculator">
                  {translation("footer.meter_charge_calculator")}
                  </Link>
                </li>
                <li>
                  <a className="text-sm font-light" href="/meter-short-codes">
                  {translation("footer.meter_short_codes")}
                  </a>
                </li>
                <li></li>
              </ul>
            </div>
            <div>
              <div className="mb-1 font-semibold md:mb-8">{translation("footer.about")}</div>
              <ul className="flex flex-col space-y-2 md:space-y-4">
                <li>
                  <Link className="text-sm font-light" href="/about">
                  {translation("footer.why_prepaid")}
                  </Link>
                </li>

                <li></li>
              </ul>
            </div>
            <div>
              <div className="mb-1 font-semibold md:mb-8">{translation("footer.help")}</div>
              <ul className="flex flex-col space-y-2 md:space-y-4">
                <li>
                  <Link className="text-sm font-light" href="/faq">
                  {translation("footer.faq")}
                  </Link>
                </li>
                <li>
                  <a
                    className="text-sm font-light"
                    href="https://www.facebook.com/groups/3715263025180679"
                    target="_blank"
                  >
                    {translation("footer.facebook_group")}
                  </a>
                </li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-xs">{translation("footer.built_by")} &copy; Copyright 2023.</div>
      </div>
    </footer>
  );
};

export default Footer;
