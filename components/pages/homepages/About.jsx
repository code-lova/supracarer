"use client";
import React, { useRef } from "react";
import Footer from "../Footer";
import Image from "next/image";
import { team } from "@constants/index";
import Link from "next/link";
import FeatureBg from "../FeatureBg";
import { aboutUs, mission, vision } from "@constants/index";
import { FlagSolid } from "@components/core/flag";
import { SharpDiamond } from "@components/core/diamond";
import { abtWhatWeOffer } from "@constants/index";
import { NormalBtn } from "@components/core/button";

export const About = () => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };
  return (
    <section>
      <FeatureBg
        heading="Learn More About Supracarer"
        subheading="Your holistic health journey, empowered by technology"
      />

      <div className="pageSection">
        <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between gap-8 md:gap-2 mt-[35px]">
          <div className="relative w-full md:w-[550px] h-[400px] md:h-[700px] rounded-3xl overflow-hidden md:overflow-visible">
            <div className="greenVerticalTextBox">
              <span
                className="text-xl uppercase font-semibold transform -rotate-180"
                style={{ writingMode: "vertical-lr" }}
              >
                Best elderly care for your family
              </span>
            </div>

            <div className="relative w-full h-full">
              <Image
                src="/assets/images/about1-1.webp"
                alt="Hero Background"
                fill
                style={{ objectFit: "cover" }}
                loading="lazy"
                className="rounded-3xl"
              />
              <div className="hidden md:block absolute inset-4 border-4 border-white rounded-3xl pointer-events-none"></div>
            </div>
          </div>

          <div className="w-[97%] md:w-1/2 pl-0 md:pl-[10px]">
            <h1 className="capitalize text-green-600 text-base font-bold">
              Get to know us
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold blue_gradient">
              Who We Are
            </h2>
            {aboutUs.map((abt) => (
              <p
                className="mt-4 text-base font-semi-thick text-semi-dark leading-8 text-justify"
                key={abt.id}
              >
                {abt.statement}
              </p>
            ))}

            <div className="mt-8 flex flex-col gap-6">
              <div className="flex justify-start gap-4">
                <div>
                  <FlagSolid
                    color="#fff"
                    className="bg-green-600 p-2 rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-110 hover:bg-blue-600"
                  />
                </div>

                <div>
                  {mission.map((mision) => (
                    <div key={mision.title} className="">
                      <h1 className="font-semibold text-green-600 text-xl underline">
                        {mision.title}
                      </h1>
                      <p className="leading-8 font-semi-thick text-semi-dark text-base">
                        {mision.mission}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-start gap-4">
                <div>
                  <SharpDiamond
                    color="#fff"
                    className="bg-green-600 p-2 rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-110 hover:bg-blue-600"
                  />
                </div>
                <div>
                  {vision.map((vison) => (
                    <div key={vison.title}>
                      <h1 className="font-semibold text-green-600 text-xl underline">
                        {vison.title}
                      </h1>
                      <p className="leading-8 font-semi-thick text-semi-dark text-base">
                        {vison.vision}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grayBackground mt-20">
        <h1 className="capitalize text-green-600 text-base font-bold text-center">
          What we offer
        </h1>

        <div className="text-center mt-2">
          <h2 className="text-3xl lg:text-4xl font-bold">
            We're committed to deliver
          </h2>
          <h2 className="text-3xl lg:text-4xl font-bold">
            high quality service
          </h2>
        </div>
        <div className="flex flex-col justify-center items-center lg:flex-row gap-5 mt-16">
          {abtWhatWeOffer.map((service) => (
            <div
              key={service.id}
              className="px-4 w-[380px] h-[500px] bg-custom-white rounded-xl border-2 border-green-600 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-none"
            >
              <div className="mt-6 w-[350px] h-[250px] mx-auto relative overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.name}
                  width={300}
                  height={400}
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                  className="w-full h-full mx-auto rounded-3xl transition-all duration-300 group-hover:scale-95"
                />
              </div>

              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto relative -top-10 border border-green-600 shadow-xl flex items-center justify-center transition-all duration-300 group-hover:scale-90">
                {service.icon}
              </div>
              <div className="-mt-3">
                <div className="flex flex-col gap-2">
                  <h1 className="font-semibold text-semi-dark text-center text-xl">
                    {service.name}
                  </h1>
                  <p className="leading-8 font-semi-thick text-semi-dark text-sm text-center">
                    {service.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto lg:border border-gray-400 rounded-md w-auto h-auto lg:w-[700px] lg:h-[80px] mt-16 flex flex-col lg:flex-row items-center lg:gap-6 ">
          <p className="block lg:hidden text-xl lg:text-sm font-light text-center lg:text-start lg:mt-6 mb-6 px-6 py-2">
            Need any kind of Elderly Care services?
            <br className="mt-3" />
            <span className="mt-5 block">Send a request now.</span>
          </p>
          <p className="hidden lg:block text-xl lg:text-sm font-light text-center lg:mt-6 mb-6 px-8 py-2">
            Need any kind of Elderly Care services? Send a request now.
          </p>
          <NormalBtn href="/signin" children="Request a Nurse" />
        </div>
      </div>

      {/* our expert team */}
      <div className="mt-16">
        <h1 className="text-3xl font-bold text-center blue_gradient font-montserrat tracking-widest">
          Our Expert Team
        </h1>
        <div className="pageSection text-center my-4 font-extralight px-4 text-base leading-6 lg:px-40">
          <p className="text-semi-dark text-lg leading-7">
            Our team is a dedicated group of healthcare
            <br className="hidden lg:block" />
            professionals, technologists, and innovators passionate about
            improving home health care.
          </p>
        </div>

        <div className="relative w-full max-w-[1200px] mx-auto mb-20">
          {/* Left Button (Mobile Only) */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-400 p-2 rounded-md shadow-lg focus:outline-none z-10 md:hidden"
          >
            &lt;
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex lg:justify-center space-x-4 py-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory md:overflow-hidden w-full"
          >
            {team.map((member) => (
              <div
                key={member.id}
                className="w-[250px] sm:w-[280px] h-[350px] flex-shrink-0 border border-gray-400 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg p-2 shadow-lg text-center snap-start"
              >
                <div className="w-[200px] h-[200px] rounded-full overflow-hidden mx-auto">
                  <Image
                    className="mx-auto"
                    src={member.image}
                    style={{ objectFit: "cover" }}
                    width={250}
                    height={100}
                    alt={member.name}
                  />
                </div>

                <div className="py-4">
                  <h1 className="text-sm font-semibold">{member.name}</h1>
                  <p className="text-slate-gray font-light">
                    {member.position}
                  </p>
                </div>

                <Link
                  href={member.socials.linkedin.link}
                  className="flex items-center justify-center space-x-2"
                  target="__blank"
                >
                  <p className="text-lg font-bold">Connect</p>
                  <Image
                    src={member.socials.linkedin.icon}
                    width={23}
                    height={20}
                    alt="LinkedIn"
                  />
                </Link>
              </div>
            ))}
          </div>

          {/* Right Button (Mobile Only) */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-md shadow-lg focus:outline-none md:hidden"
          >
            &gt;
          </button>
        </div>
      </div>

      <Footer />
    </section>
  );
};
