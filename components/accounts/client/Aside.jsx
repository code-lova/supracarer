"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { DashboardLinks, historyData } from "@constants/index";


const Aside = () => {
    const [active, setActive] = useState("");
    const [toggle, setToggle] = useState(false);
  return (
    <div>
      <aside className="bg-gray-800 fixed shadow-2xl z-50 top-0 left-0 w-full px-2 lg:px-2 lg:py-6 lg:w-[250px] lg:h-screen lg:fixed lg:left-0 lg:top-0 lg:bg-gray-800 lg:text-white">
        <div className="flex justify-between items-center mt-3 lg:flex-col lg:items-start lg:pt-4">
          <Link
            href="/"
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
          >
            <Image
              src="/assets/images/logo.png"
              width={180}
              height={50}
              alt="Supracarer logo"
              className="mx-auto"
            />
          </Link>
          <Image
            className="cursor-pointer lg:hidden"
            src={
              toggle ? "/assets/images/close.svg" : "/assets/images/menu.svg"
            }
            width={40}
            height={50}
            alt="menu"
            onClick={() => setToggle(!toggle)}
          />
        </div>

        <ul
          className={`${
            toggle ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } bg-mobile-nav`}
        >
          {DashboardLinks.map((nav) => (
            <li
              key={nav.id}
              className="text-white hover:underline py-2 hover:lg:text-white lg:transitioning lg:py-4 font-light text-[15px]"
              onClick={() => setActive(nav.title)}
            >
              <Link href={nav.link}>{nav.title}</Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Aside;
