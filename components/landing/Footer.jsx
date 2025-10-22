import React from "react";
import Image from "next/image";
import { companySocials } from "@constants/index";
import { emailDetail, phoneDetail, addressDetail } from "@utils/Contact";
import Link from "next/link";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative w-full bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="pageSection py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/assets/images/logo.png"
                width={180}
                height={150}
                alt="Supracarer logo"
                className="object-contain w-[200px] brightness-0 invert"
              />
            </div>
            <p className="text-sm leading-relaxed text-gray-400 mb-6">
              Get personalized home care services with our highly trained
              caregivers, reliable assistance, round-the-clock services, and
              more!
            </p>
            {/* Social Links */}
            <div className="flex space-x-3">
              {companySocials.map((social) => (
                <Link
                  key={social.id}
                  href={social.link}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-tranquil-teal transition-all duration-300 group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
                    {social.icon}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4 relative inline-block">
              Useful Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-tranquil-teal"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/faq"
                  className="text-sm hover:text-tranquil-teal duration-300 hover:pl-2 inline-block transition-all"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm hover:text-tranquil-teal duration-300 hover:pl-2 inline-block transition-all"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm hover:text-tranquil-teal duration-300 hover:pl-2 inline-block transition-all"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm hover:text-tranquil-teal duration-300 hover:pl-2 inline-block transition-all"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4 relative inline-block">
              Resources
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-custom-green"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/blog"
                  className="text-sm hover:text-custom-green duration-300 hover:pl-2 inline-block transition-all"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/features"
                  className="text-sm hover:text-custom-green duration-300 hover:pl-2 inline-block transition-all"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-sm hover:text-custom-green duration-300 hover:pl-2 inline-block transition-all"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-sm hover:text-custom-green duration-300 hover:pl-2 inline-block transition-all"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Services & Contact */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4 relative inline-block">
              Our Services
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-haven-blue"></span>
            </h3>
            <ul className="space-y-3 mb-6">
              <li>
                <Link
                  href="/for-nurses"
                  className="text-sm hover:text-haven-blue duration-300 hover:pl-2 inline-block transition-all"
                >
                  For Nurses
                </Link>
              </li>
              <li>
                <Link
                  href="/for-the-sick"
                  className="text-sm hover:text-haven-blue duration-300 hover:pl-2 inline-block transition-all"
                >
                  For The Sick
                </Link>
              </li>
              <li>
                <Link
                  href="/for-elderly"
                  className="text-sm hover:text-haven-blue duration-300 hover:pl-2 inline-block transition-all"
                >
                  For The Elderly
                </Link>
              </li>
              <li>
                <Link
                  href="/for-health-professionals"
                  className="text-sm hover:text-haven-blue duration-300 hover:pl-2 inline-block transition-all"
                >
                  For Health Professionals
                </Link>
              </li>
            </ul>

            {/* Contact Info */}
            <div className="space-y-3 mt-6 pt-6 border-t border-gray-800">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-tranquil-teal text-sm mt-1 flex-shrink-0" />
                <p className="text-xs text-gray-400">{addressDetail?.detail}</p>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-custom-green text-sm flex-shrink-0" />
                <Link
                  href={`mailto:${emailDetail?.detail}`}
                  className="text-xs text-gray-400 hover:text-custom-green transition-colors duration-300"
                >
                  {emailDetail?.detail}
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-haven-blue text-sm flex-shrink-0" />
                <Link
                  href={`tel:${phoneDetail?.detail}`}
                  className="text-xs text-gray-400 hover:text-haven-blue transition-colors duration-300"
                >
                  {phoneDetail?.detail}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="pageSection py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Supracarer. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/terms"
                className="text-xs text-gray-400 hover:text-tranquil-teal transition-colors duration-300"
              >
                Terms
              </Link>
              <Link
                href="/privacy-policy"
                className="text-xs text-gray-400 hover:text-tranquil-teal transition-colors duration-300"
              >
                Privacy
              </Link>
              <Link
                href="/contact-us"
                className="text-xs text-gray-400 hover:text-tranquil-teal transition-colors duration-300"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
