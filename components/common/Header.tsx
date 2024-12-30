import { topMenu } from "@/lib/nav-menu";
import Image from "next/image";
import Link from "next/link";
import LocaleSelector from "@/components/locale-selector";
import { Locale } from "@/i18n";
import { getTranslation } from "@/lib/i18n/getTranslation";

const Header = async ({ locale }: { locale: Locale }) => {
  const translation = await getTranslation(locale);
  // const mlocale = useLocale();
  // const t = useTranslations("Header");
  // const router = useRouter();
  // const pathname = usePathname();
  // const changeLocale = () => {
  //   mlocale == "en"
  //     ? router.push(pathname, { locale: "bn" })
  //     : router.push(pathname, { locale: "en" });
  // };
  return (
    <header className="hidden md:mx-auto md:mb-2 md:block md:w-5/6 md:pb-6">
      <div className="md:flex md:flex-row md:justify-between md:py-4">
        <div className="md:flex md:items-center">
          <Link
            className="relative mr-3 block h-16 w-16 md:h-12 md:w-12"
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
          <div className="font-black md:w-1/2 md:text-base">
            {translation("header.title")}
          </div>
        </div>
        <div className="md:flex md:flex-row md:items-center md:space-x-4">
          <div className="md:flex md:items-center md:space-x-4">
            <div className="md:flex md:min-w-max md:items-center">
              <div className="relative h-5 w-5">
                <Image
                  src="/phone-icon.svg"
                  fill={true}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "contain" }}
                  alt="phone icon"
                />
              </div>
              <div className="text-sm">
                {translation("header.phone_number")}
              </div>
            </div>
          </div>
          <div className="md:mt-2">
            <a
              href="https://www.facebook.com/groups/3715263025180679"
              target="_blank"
              className="md:flex md:min-w-max md:items-center"
            >
              <div className="relative mx-auto h-9 w-9">
                <Image
                  src="/facebook-icon.svg"
                  fill={true}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "contain" }}
                  alt="facebook icon"
                ></Image>
              </div>
            </a>
          </div>
          {/* <div>
            <button
              onClick={changeLocale}
              className="rounded border border-green bg-transparent px-4 py-2 text-green hover:border-transparent hover:bg-green hover:text-white"
            >
              {t("lang")}
            </button>
          </div> */}

          <LocaleSelector />
        </div>
      </div>
      <nav className="bg-green-light md:flex md:items-center md:justify-center">
        <ul className="md:flex md:justify-between md:text-sm md:font-semibold md:text-white">
          {topMenu.map((item) => (
            <li
              key={item.title}
              className="px-4 py-2 text-center hover:bg-white hover:text-green-light"
            >
              <Link
                href={item.route}
                target={item.route.startsWith("http") ? "_blank" : undefined}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
