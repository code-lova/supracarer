"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";
import { useEffect, useState } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

const NavLinks = ({
  navLinks,
  mobileDropdownOpen,
  setMobileDropdownOpen,
  handleNavClick,
}) => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(null);

  return (
    <>
      {navLinks.map((nav) =>
        nav.subNav ? (
          <li
            key={nav.id}
            className="relative py-2 font-bold text-[16px] text-haven-blue"
            onMouseEnter={() => !isMobile && setDesktopDropdownOpen(nav.id)}
            onMouseLeave={() => !isMobile && setDesktopDropdownOpen(null)}
            onClick={() => isMobile && setMobileDropdownOpen((prev) => !prev)}
          >
            <div
              className={`flex items-center space-x-1 cursor-pointer hover:text-custom-green`}
            >
              <span
                className={
                  pathname.includes(nav.subNav[0].link)
                    ? "text-custom-green"
                    : ""
                }
              >
                {nav.title}
              </span>
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  isMobile
                    ? mobileDropdownOpen
                      ? "rotate-180"
                      : ""
                    : desktopDropdownOpen === nav.id
                    ? "rotate-180"
                    : ""
                }`}
              />
            </div>

            <ul
              className={`transition-all duration-300 transform ${
                isMobile
                  ? mobileDropdownOpen
                    ? "block"
                    : "hidden"
                  : desktopDropdownOpen === nav.id
                  ? "absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 opacity-100 translate-y-0"
                  : "absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              {nav.subNav.map((sub) => (
                <li key={sub.id} className="px-4 mt-2 py-3 hover:bg-gray-100">
                  <Link
                    href={sub.link}
                    className={`flex items-center space-x-2 ${
                      pathname === sub.link
                        ? "text-custom-green"
                        : "text-haven-blue"
                    }`}
                    onClick={handleNavClick}
                  >
                    {sub.icon}
                    <span>{sub.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ) : (
          <li
            key={nav.id}
            className={`py-2 font-bold text-[16px] hover:text-custom-green ${
              pathname === nav.link ? "text-custom-green" : "text-haven-blue"
            }`}
            onClick={handleNavClick}
          >
            <Link href={nav.link}>{nav.title}</Link>
          </li>
        )
      )}

      {/* Sign In and Sign Up only on mobile */}
      {isMobile && (
        <>
          <li className="py-2 font-bold text-[16px] text-haven-blue hover:text-custom-green">
            <Link href="/signin" onClick={handleNavClick}>
              Account
            </Link>
          </li>
        </>
      )}
    </>
  );
};

export default NavLinks;
