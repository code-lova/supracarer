"use client";
import React, { useState } from "react";
import Image from "next/image";
import { navLinks } from "@constants";
import Link from "next/link";
import { SharpSearch } from "@components/core/icon/search";
import { ProfileFill } from "@components/core/icon/profile";
import { OutlineEmail } from "@components/core/icon/envelope";
import { BaselinePhoneInTalk } from "@components/core/icon/phone";
import { OutlineAccessTime } from "@components/core/icon/time";
import { companySocials } from "@constants";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  // Close menu on link click
  const handleNavClick = () => {
    setToggle(false);
  };

  return (
    <div>
      <div className="hidden md:flex md:-mt-8 lg:mt-0 bg-haven-blue w-full fixed z-50 padding text-white item-center justify-between">
        <div className="w-full flex items-center justify-between mt-2 lg:-mt-1">
          <div className="flex items-center justify-between gap-4 ">
            <div className="flex item-center space-x-1">
              <OutlineEmail />
              <p className="text-xs md:text-sm">supracarer@gmail.com</p>
            </div>
            <div className="flex item-center space-x-1">
              <OutlineAccessTime />
              <p className="text-xs md:text-sm">
                Mon - Fri: 09.00am - 10.00 pm
              </p>
            </div>
            <div className="flex item-center space-x-1">
              <BaselinePhoneInTalk />
              <p className="text-xs md:text-sm">+233-234-567-890</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {companySocials.map((socials) => (
              <div key={socials.id}>
                <a href={socials.link}>{socials.icon}</a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <nav className="bg-custom-white -mt-2 md:-mt-8 fixed shadow-md z-50 md:top-20 w-full padding">
        <div className="flex items-center justify-between">
          <div>
            <Image
              src="/assets/images/logo.png"
              width={180}
              height={50}
              alt="Supracarer logo"
              className="mx-auto"
            />
          </div>
          <ul
            className={`${
              toggle ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
            } lg:flex flex-col px-6 lg:flex-row items-center gap-4 space-y-2 lg:space-y-0 lg:space-x-5 bg-gray-50 lg:bg-transparent absolute lg:static top-[78px] lg:top-0 left-0 w-full lg:w-auto p-5 lg:p-0 transition-all duration-500 ease-in-out delay-200 lg:transition-none lg:opacity-100 lg:translate-y-0`}
          >
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className="text-haven-blue py-2 hover:lg:text-custom-green lg:transitioning lg:py-2 font-bold text-[16px]"
                onClick={handleNavClick}
              >
                <Link href={nav.link}>{nav.title}</Link>
              </li>
            ))}
          </ul>
          {/* show this menu handburger button for smaller screens */}
          <Image
            className="cursor-pointer lg:hidden z-20"
            src={
              toggle ? "/assets/icons/closeb.svg" : "/assets/icons/menub.svg"
            }
            width={30}
            height={30}
            alt="menu"
            onClick={() => setToggle(!toggle)}
          />
          <div className="hidden lg:flex items-center gap-2 cursor-pointer">
            <ProfileFill color="#006838" />
            <SharpSearch color="#006838" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
