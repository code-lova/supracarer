"use client";
import React, { useState } from "react";
import Image from "next/image";
import { navLinks } from "@constants";
import Link from "next/link";
import { ProfileFill } from "@components/core/icon/profile";
import { OutlineEmail } from "@components/core/icon/envelope";
import { BaselinePhoneInTalk } from "@components/core/icon/phone";
import { OutlineAccessTime } from "@components/core/icon/time";
import { companySocials } from "@constants";
import { emailDetail, phoneDetail } from "@utils/Contact";
import { NormalBtn } from "@components/core/button";
import NavLinks from "@components/core/NavLinks";

const Navbar = () => {
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  // Close menu on link click
  const handleNavClick = () => {
    setToggle(false);
  };

  return (
    <div>
      <div className="hidden md:flex md:-mt-8 lg:mt-0 bg-haven-blue w-full fixed z-50 padding text-white item-center justify-between">
        <div className="w-full flex items-center justify-between mt-2 lg:-mt-1 md:mt-6">
          <div className="flex items-center justify-between gap-4 ">
            <div className="flex item-center space-x-1">
              <OutlineEmail />
              <Link
                href={`mailto:${emailDetail?.detail}`}
                className="text-xs md:text-sm"
              >
                {emailDetail?.detail}
              </Link>
            </div>
            <div className="flex item-center space-x-1">
              <OutlineAccessTime />
              <p className="text-xs md:text-sm">Available 24/7</p>
            </div>
            <div className="flex item-center space-x-1">
              <BaselinePhoneInTalk />
              <Link
                href={`tel:${phoneDetail?.detail}`}
                className="text-xs md:text-sm"
              >
                {phoneDetail?.detail}
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {companySocials.map((socials) => (
              <div key={socials.id}>
                <a href={socials.link} target="__blank" title={socials.name}>
                  {socials.icon}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <nav className="bg-custom-white -mt-2 md:-mt-8 fixed shadow-md z-50 md:top-20 w-full padding text-xs">
        <div className="flex items-center justify-between">
          <div>
            <Image
              src="/assets/images/logo.png"
              width={175}
              height={50}
              alt="Supracarer logo"
              className="mx-auto"
            />
          </div>
          <ul
            className={`${
              toggle ? "flex" : "hidden"
            } nav-control`}
          >
            <NavLinks
              navLinks={navLinks}
              mobileDropdownOpen={mobileDropdownOpen}
              setMobileDropdownOpen={setMobileDropdownOpen}
              handleNavClick={handleNavClick}
            />
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
          <div className="hidden lg:flex items-center gap-4 cursor-pointer">
            <div className="flex items-center justify-between">
              <ProfileFill color="#006838" />
              <Link className="font-bold text-sm text-[#006838]" href="/signin">
                Login
              </Link>
            </div>
            <NormalBtn href="/signup" children="Sign Up" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
