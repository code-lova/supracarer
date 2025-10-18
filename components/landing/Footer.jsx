import React from "react";
import Image from "next/image";
import { companySocials } from "@constants/index";
import { emailDetail, phoneDetail, addressDetail } from "@utils/Contact";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative w-full bg-footer bg-cover p-6">
      <div className="grid grid-cols-1 gap-6 md:px-8 lg:grid lg:grid-cols-3 pb-14">
        <div>
          <Image
            src="/assets/images/logo.png"
            width={180}
            height={150}
            alt="Supracarer logo"
            className="object-fill w-[200px]"
          />
          <p className="mt-4">
            Get personalized home care services with our ​highly trained
            caregivers, reliable ​assistance, round-the-clock services, ​and
            more!
          </p>
          <div className="flex space-x-2 mt-4">
            {companySocials.map((socials) => (
              <div key={socials.id} className="">
                <Link href={socials.link}>{socials.icon}</Link>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2">
          <div className="flex justify-evenly">
            <div>
              <h1 className="font-bold text-ever-green underline text-lg">
                Useful Links
              </h1>
              <ul className="mt-2 p-3">
                <li className="hover:underline xl:transitioning">
                  <Link href="/faq">FAQs</Link>
                </li>
                <li className="hover:underline xl:transitioning">
                  <Link href="/about">About</Link>
                </li>
                <li className="hover:underline xl:transitioning">
                  <Link href="/terms">Terms & Conditions</Link>
                </li>
                <li className="hover:underline xl:transitioning">
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </li>
              </ul>
            </div>

            <div>
              <h1 className="font-bold text-ever-green underline text-lg">
                Resources
              </h1>
              <ul className="p-3">
                <li className="hover:underline xl:transitioning">
                  <Link href="/blog">Blog</Link>
                </li>
                <li className="hover:underline xl:transitioning">
                  <Link href="/features">Features</Link>
                </li>
                <li className="hover:underline xl:transitioning">
                  <Link href="/how-it-works">How it works</Link>
                </li>
                <li className="hover:underline xl:transitioning">
                  <Link href="/contact-us">Support</Link>
                </li>
              </ul>
            </div>

            <div>
              <h1 className="font-bold text-ever-green underline text-lg">
                Professionals
              </h1>
              <ul className="p-3">
                <li className="hover:underline xl:transitioning">
                  <Link href="/for-nurses">For Nurses</Link>
                </li>
                <li className="hover:underline xl:transitioning">
                  <Link href="/for-the-sick">The Sick</Link>
                </li>
                <li className="hover:underline xl:transitioning">
                  <Link href="/for-elderly">The Elderly</Link>
                </li>
                <li className="hover:underline xl:transitioning">
                  <Link href="/for-health-professionals">Health Professionals</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <h1 className="font-bold text-ever-green underline text-lg">
            Contacts
          </h1>

          <div className="flex space-x-2 mt-4">
            <p className="font-bold">Address:</p>
            <p>{addressDetail?.detail}</p>
          </div>
          <div className="flex space-x-2 mt-4">
            <Link href={`mailto:${emailDetail?.detail}`} className="font-bold">
              Email: {emailDetail?.detail}
            </Link>
          </div>
          <div className="flex space-x-2 mt-4">
            <Link href={`tel:${phoneDetail?.detail}`} className="font-bold">
              Phone: {phoneDetail?.detail}
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 w-full bg-gray-500 text-center py-4">
        <p className="text-white">© 2025 Supracarer. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
