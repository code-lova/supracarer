"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { DashboardLinks } from "@constants/index";

const BookANurse = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  return (
    <div className="lg:ml-[200px]">
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
      <header className="hidden w-full md:flex justify-end items-center gap-4 bg-blue-400 py-6 pr-10">
        <Link href="/messages">
          <Image
            src={"/assets/icons/icons8-envelope-48.png"}
            width={30}
            height={40}
            alt="menu"
          />
        </Link>
        <div className="bg-red-500 w-5 h-5 rounded-full mt-[-20px] ml-[-28px]">
          <p className="text-white text-center font-bold text-sm">1</p>
        </div>
        <Link href="/notifications">
          <Image
            src={"/assets/icons/icons8-bell-48.png"}
            width={30}
            height={40}
            alt="menu"
          />
        </Link>
        <div className="bg-red-500 w-5 h-5 rounded-full mt-[-20px] ml-[-28px]">
          <p className="text-white text-center font-bold text-sm">1</p>
        </div>
        <div className="w-[30px] h-[30px] rounded-full bg-white">
          <Link href="/profile">
            <Image
              src={"/assets/icons/icons8-user-48.png"}
              width={30}
              height={40}
              alt="menu"
            />
          </Link>
        </div>
      </header>
      <div className="lg:ml-[200px] mt-20 lg:mt-0 bg-white p-8 rounded-lg shadow-lg lg:max-w-4xl w-full">
        <div className="flex flex-row items-center justify-center">
          <h1 className="text-2xl font-bold mb-1 text-center uppercase blue_gradient">
            Book A Nurse
          </h1>
        </div>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-gray-700"
            >
              Firstname
            </label>
            <input
              type="text"
              id="name"
              className="login-form-input"
              placeholder="Omale"
              required
            />
          </div>

          <div>
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-700"
            >
              Lastname
            </label>
            <input
              type="text"
              id="lastname"
              className="login-form-input"
              placeholder="Victor"
              required
            />
          </div>
          <button type="submit" className="login-btn font-bold">
            PROCEED
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookANurse;
