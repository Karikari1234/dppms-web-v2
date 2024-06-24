"use client";
import Link from "next/link";
import Image from "next/image";

import { Avatar, Dropdown, Navbar } from "flowbite-react";

export default function NavbarWithDropdown() {
  return (
    <Navbar fluid rounded className="md:mx-auto md:w-5/6 md:py-6">
      <Link href="/">
        <div className="md:flex md:items-center">
          <Link className="mr-3 block h-16 w-16 md:h-16 md:w-16" href="/">
            <Image
              src="/site-logo.png"
              alt="BPDB logo"
              layout="responsive"
              width={100}
              height={100}
            ></Image>
          </Link>
          <div className="font-bold md:whitespace-nowrap md:text-3xl">
            Prepaid Metering System BPDB
          </div>
        </div>
      </Link>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={true}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active href="#">
          <p>Home</p>
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
