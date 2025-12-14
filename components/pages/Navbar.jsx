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
    setMobileDropdownOpen(false);
  };

  return (
    <div>
      {/* Top Bar - Hidden on mobile */}
      <div className="hidden md:flex bg-gradient-to-r from-tranquil-teal via-custom-green to-haven-blue w-full fixed z-50 text-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex items-center justify-between">
            {/* Left Side - Contact Info */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 hover:text-white/80 transition-colors">
                <OutlineEmail />
                <Link
                  href={`mailto:${emailDetail?.detail}`}
                  className="text-xs lg:text-sm font-medium"
                >
                  {emailDetail?.detail}
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <OutlineAccessTime />
                <p className="text-xs lg:text-sm font-medium">Available 24/7</p>
              </div>
              <div className="flex items-center gap-2 hover:text-white/80 transition-colors">
                <BaselinePhoneInTalk />
                <Link
                  href={`tel:${phoneDetail?.detail}`}
                  className="text-xs lg:text-sm font-medium"
                >
                  {phoneDetail?.detail}
                </Link>
              </div>
            </div>

            {/* Right Side - Social Links */}
            <div className="flex items-center gap-3">
              {companySocials.map((socials) => (
                <a
                  key={socials.id}
                  href={socials.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={socials.name}
                  className="hover:scale-110 transition-transform duration-200"
                >
                  {socials.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white fixed shadow-md z-50 top-0 md:top-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" onClick={handleNavClick}>
                <Image
                  src="/assets/images/logo.png"
                  width={160}
                  height={45}
                  alt="Supracarer logo"
                  className="cursor-pointer"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1 px-8">
              <ul className="flex items-center gap-8">
                <NavLinks
                  navLinks={navLinks}
                  mobileDropdownOpen={mobileDropdownOpen}
                  setMobileDropdownOpen={setMobileDropdownOpen}
                  handleNavClick={handleNavClick}
                />
              </ul>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/signin"
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-tranquil-teal to-custom-green text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                <ProfileFill color="currentColor" />
                Account
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setToggle(!toggle)}
              aria-label="Toggle menu"
            >
              <Image
                src={
                  toggle
                    ? "/assets/icons/closeb.svg"
                    : "/assets/icons/menub.svg"
                }
                width={28}
                height={28}
                alt="menu"
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {toggle && (
          <div
            className="fixed inset-0 bg-black/50 lg:hidden z-40 transition-opacity duration-300"
            onClick={handleNavClick}
          />
        )}

        {/* Mobile Menu Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl lg:hidden z-50 transform transition-transform duration-300 ease-in-out ${
            toggle ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <Image
                src="/assets/images/logo.png"
                width={140}
                height={40}
                alt="Supracarer logo"
              />
              <button
                onClick={handleNavClick}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <Image
                  src="/assets/icons/closeb.svg"
                  width={24}
                  height={24}
                  alt="close"
                />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex-1 overflow-y-auto py-6 px-6">
              <ul className="flex flex-col">
                <NavLinks
                  navLinks={navLinks}
                  mobileDropdownOpen={mobileDropdownOpen}
                  setMobileDropdownOpen={setMobileDropdownOpen}
                  handleNavClick={handleNavClick}
                />
              </ul>
            </div>

            {/* Mobile Auth Buttons */}
            <div className="p-6 border-t border-gray-200 space-y-3">
              <Link
                href="/signin"
                onClick={handleNavClick}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 text-tranquil-teal border-2 border-tranquil-teal hover:bg-tranquil-teal hover:text-white font-semibold rounded-lg transition-all duration-200"
              >
                <ProfileFill color="currentColor" />
                <span>Login</span>
              </Link>
              <Link
                href="/signup"
                onClick={handleNavClick}
                className="block w-full px-4 py-3 bg-gradient-to-r from-tranquil-teal to-custom-green text-white text-center font-semibold rounded-lg hover:shadow-lg transition-all duration-200"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile Contact Info */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <OutlineEmail />
                  <Link
                    href={`mailto:${emailDetail?.detail}`}
                    className="hover:text-tranquil-teal transition-colors"
                  >
                    {emailDetail?.detail}
                  </Link>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <BaselinePhoneInTalk />
                  <Link
                    href={`tel:${phoneDetail?.detail}`}
                    className="hover:text-tranquil-teal transition-colors"
                  >
                    {phoneDetail?.detail}
                  </Link>
                </div>
                <div className="flex items-center gap-3 pt-3">
                  {companySocials.map((socials) => (
                    <a
                      key={socials.id}
                      href={socials.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={socials.name}
                      className="hover:scale-110 transition-transform duration-200"
                    >
                      {socials.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
