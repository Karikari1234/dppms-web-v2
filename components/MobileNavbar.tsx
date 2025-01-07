"use client";

import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
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

const NavList = ({ locale, openNav, onOpenNavChange }: Props) => {

  return (
    <ul className="my-2 flex flex-col gap-2 text-sm lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {topMenu.map((item) => (
        //console.log("Menu item:", item.title[locale]),
        <li
          key={`${locale}-${item.route}`}
          className="text-center text-black"
          onClick={() => onOpenNavChange(!openNav)}
        >
          <Link href={item.title[locale] === 'BPDB Care Point' || item.title[locale] === 'বিপিডিবি কেয়ার পয়েন্ট' ? `${item.route}`: `/${locale}${item.route}`}>{item.title[locale]}</Link>
        </li>
      ))}
    </ul>
  );
};

export const MobileNavbar = ({ locale }: { locale: Locale }) => {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="mx-auto mb-4 max-w-full rounded px-6 py-3">
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className="flex items-center">
          <Link className="mr-3 block h-12 w-12 md:h-8 md:w-16" href="/">
            <div className="relative mx-auto h-12 w-12">
              <Image
                src="/site-logo.png"
                alt="BPDB logo"
                fill={true}
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "contain" }}
              ></Image>
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
