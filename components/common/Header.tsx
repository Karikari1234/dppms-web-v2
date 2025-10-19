// components/common/Header.tsx
import Image from "next/image";
import Link from "next/link";
import LocaleSelector from "@/components/locale-selector";
import { Locale } from "@/i18n";
import { getTranslation } from "@/lib/i18n/getTranslation";
import { topMenu } from "@/lib/nav-menu";

const isExternal = (url: string) => /^https?:\/\//i.test(url);

const Header = async ({ locale }: { locale: Locale }) => {
  const translation = await getTranslation(locale);

  return (
    <header className="hidden md:mx-auto md:block md:w-5/6">
      <div className="md:flex md:flex-row md:justify-between md:py-4">
        <div className="md:flex md:items-center">
          <Link
            className="relative mr-3 block h-16 w-16 md:h-12 md:w-12"
            href={`/${locale}`}
          >
            <Image
              src="/site-logo.png"
              alt="BPDB logo"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ objectFit: "contain" }}
            />
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
                  fill
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
              rel="noopener noreferrer"
              className="md:flex md:min-w-max md:items-center"
            >
              <div className="relative mx-auto h-9 w-9">
                <Image
                  src="/facebook-icon.svg"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "contain" }}
                  alt="facebook icon"
                />
              </div>
            </a>
          </div>

          <LocaleSelector locale={locale} />
        </div>
      </div>

      {/* Desktop nav with hover dropdowns */}
      <nav className="bg-green-light md:flex md:items-center md:justify-center">
        <ul className="md:flex md:justify-between md:text-sm md:font-semibold md:text-white">
          {topMenu.map((item) => {
            const label = item.title[locale];

            // If the item has children, render a CSS hover dropdown
            if (item.children && item.children.length > 0) {
              return (
                <li
                  key={`dropdown-${label}`}
                  className="group relative px-4 py-2 text-center hover:bg-white hover:text-green-light md:text-lg"
                >
                  <div className="inline-flex items-center gap-1">
                    <span>{label}</span>
                    <svg
                      className="h-4 w-4 transition-transform group-hover:rotate-180"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.127l3.71-3.896a.75.75 0 111.08 1.04l-4.24 4.46a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  {/* Dropdown menu */}
                  <ul className="invisible absolute left-1/2 z-20 mt-2 w-56 -translate-x-1/2 rounded-md bg-white py-2 text-green-light opacity-0 shadow-lg ring-1 ring-black/5 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                    {item.children.map((child) => {
                      const childLabel = child.title[locale];
                      const href = child.route;
                      const external = isExternal(href);
                      return (
                        <li key={`child-${label}-${childLabel}`}>
                          <Link
                            href={href}
                            target={external ? "_blank" : undefined}
                            rel={external ? "noopener noreferrer" : undefined}
                            className="block px-4 py-2 hover:bg-green-50"
                          >
                            {childLabel}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            }

            // Regular link item
            const route = item.route ?? "/";
            const href = isExternal(route) ? route : `/${locale}${route}`;
            const external = isExternal(route);

            return (
              <li
                key={`${label}-${route}`}
                className="px-4 py-2 text-center hover:bg-white hover:text-green-light md:text-lg"
              >
                <Link
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
