// components/MobileNavbar.tsx
"use client";

import React from "react";
import {
  Navbar,
  Collapse,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem as MTMenuItem,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { topMenu } from "@/lib/nav-menu";
import LocaleSelector from "@/components/locale-selector";
import { Locale } from "@/i18n";

interface Props {
  locale: Locale;
  openNav: boolean;
  onOpenNavChange: (openNav: boolean) => void;
}

const isExternal = (url: string) => /^https?:\/\//i.test(url);

const NavList = ({ locale, openNav, onOpenNavChange }: Props) => {
  return (
    <ul className="my-2 flex flex-col gap-2 text-sm lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {topMenu.map((item) => {
        const label = item.title[locale];

        // DROPDOWN: if the item has children, render a Menu
        if (item.children && item.children.length > 0) {
          return (
            <li key={`dropdown-${label}`} className="text-center text-black">
              <Menu placement="bottom">
                <MenuHandler>
                  <button
                    className="inline-flex items-center gap-1 hover:opacity-80"
                    type="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {label}
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>
                </MenuHandler>
                <MenuList className="p-1">
                  {item.children.map((child) => {
                    const childLabel = child.title[locale];
                    const href = child.route;
                    const external = isExternal(href);

                    return (
                      <MTMenuItem key={`child-${label}-${childLabel}`} className="p-0">
                        <Link
                          href={href}
                          target={external ? "_blank" : undefined}
                          rel={external ? "noopener noreferrer" : undefined}
                          className="block w-full px-3 py-2"
                          onClick={() => onOpenNavChange(false)}
                        >
                          {childLabel}
                        </Link>
                      </MTMenuItem>
                    );
                  })}
                </MenuList>
              </Menu>
            </li>
          );
        }

        // REGULAR LINK: if no children, use route
        const route = item.route ?? "/";
        const href = isExternal(route) ? route : `/${locale}${route}`;

        return (
          <li
            key={`${locale}-${route}-${label}`}
            className="text-center text-black"
            onClick={() => onOpenNavChange(!openNav)}
          >
            <Link
              href={href}
              target={isExternal(route) ? "_blank" : undefined}
              rel={isExternal(route) ? "noopener noreferrer" : undefined}
              className="hover:opacity-80"
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export const MobileNavbar = ({ locale }: { locale: Locale }) => {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () => {
    if (window.innerWidth >= 960) setOpenNav(false);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <Navbar className="mx-auto max-w-full rounded px-6 py-3">
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className="flex items-center">
          <Link className="mr-3 block h-12 w-12 md:h-8 md:w-16" href="/">
            <div className="relative mx-auto h-12 w-12">
              <Image
                src="/site-logo.png"
                alt="BPDB logo"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "contain" }}
              />
            </div>
          </Link>
          <div className="text-sm font-bold md:w-1/2">
            Prepaid Metering System BPDB
          </div>
        </div>

        <div className="hidden lg:block">
          <NavList
            locale={locale}
            openNav={openNav}
            onOpenNavChange={(newOpenNav: boolean) => setOpenNav(newOpenNav)}
          />
        </div>

        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>

      <Collapse open={openNav}>
        <NavList
          locale={locale}
          openNav={openNav}
          onOpenNavChange={(newOpenNav: boolean) => setOpenNav(newOpenNav)}
        />
      </Collapse>

      <LocaleSelector locale={locale} />
    </Navbar>
  );
};