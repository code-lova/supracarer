"use client";
import React, { useRef } from "react";
import Footer from "../Footer";
import Image from "next/image";
import { team } from "@constants/index";
import Link from "next/link";
import FeatureBg from "../FeatureBg";
import { aboutUs } from "@constants/index";
import { TelevisionAmbientLight } from "@components/core/vision";
import { Diamond } from "@components/core/mission";

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
              <p className="mt-4 text-lg leading-7 text-justify" key={abt.id}>
                {abt.statement}
              </p>
            ))}

            <div className="mt-8 flex flex-col gap-10">
              <div className="flex justify-start gap-4">
                <TelevisionAmbientLight color="#fff" className="bg-green-600 p-2 rounded-xl transitioning"/>
                <p>Mission </p>
              </div>
              <div className="flex justify-start gap-4">
                <Diamond color="#fff" className="bg-green-600 p-2 rounded-xl transitioning" />
                <p>Vision</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap md:flex-nowrap flex-col-reverse md:flex-row justify-center md:justify-between items-center gap-8 md:gap-16 mt-[100px]">
          <div className="relative w-full md:w-1/2 h-[300px] md:h-[400px] rounded-3xl overflow-hidden">
            <Image
              src="/assets/images/hero-bg2.jpg"
              alt="Hero Background"
              fill
              style={{ objectFit: "cover" }}
              loading="lazy"
            />
          </div>
          <div className="w-[97%] md:w-1/2 pl-0 md:pl-[30px]">
            <h1 className="text-3xl md:text-4xl text-center font-bold blue_gradient">
              Our Story
            </h1>
            <p className="mt-4 text-lg  text-center">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus
              recusandae sequi veritatis voluptates eius explicabo fugiat cumque
              natus provident enim, accusamus quidem consectetur molestias
              facere voluptas numquam magni suscipit quis?
            </p>
          </div>
        </div>

        <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center gap-8 md:gap-16 mt-[100px] px-4 md:px-0 md:mx-16">
          <div className="w-[97%] md:w-1/2 pl-0 md:pl-[30px]">
            <h1 className="text-3xl md:text-4xl text-center font-bold blue_gradient">
              Our Mission
            </h1>
            <p className="mt-4 text-lg  text-center">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus
              recusandae sequi veritatis voluptates eius explicabo fugiat cumque
              natus provident enim, accusamus quidem consectetur molestias
              facere voluptas numquam magni suscipit quis?
            </p>
          </div>
          <div className="relative w-full md:w-1/2 h-[300px] md:h-[400px] rounded-3xl overflow-hidden">
            <Image
              src="/assets/images/hero-bg6.jpg"
              alt="Hero Background"
              fill
              style={{ objectFit: "cover" }}
              loading="lazy"
            />
          </div>
        </div>

        <div className="flex flex-wrap md:flex-nowrap flex-col-reverse md:flex-row justify-center md:justify-between items-center gap-8 md:gap-16 mt-[100px] px-4 md:px-0 md:mx-16">
          <div className="relative w-full md:w-1/2 h-[300px] md:h-[400px] rounded-3xl overflow-hidden">
            <Image
              src="/assets/images/hero-bg2.jpg"
              alt="Hero Background"
              fill
              style={{ objectFit: "cover" }}
              loading="lazy"
            />
          </div>
          <div className="w-[97%] md:w-1/2 pl-0 md:pl-[30px]">
            <h1 className="text-3xl md:text-4xl text-center font-bold blue_gradient">
              Our Vision
            </h1>
            <p className="mt-4 text-lg  text-center">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus
              recusandae sequi veritatis voluptates eius explicabo fugiat cumque
              natus provident enim, accusamus quidem consectetur molestias
              facere voluptas numquam magni suscipit quis?
            </p>
          </div>
        </div>
      </div>

      <div className="ml-4 mb-12 bg-gradient-to-r from-transparent to-gray-200 py-20 relative">
        <h1 className="text-3xl font-bold text-center blue_gradient font-montserrat tracking-widest">
          Meet The Team
        </h1>
        <div className="text-center my-4 font-extralight px-4 text-base leading-6 lg:px-40">
          <p className="text-semi-dark text-lg leading-7">
            Our team is a dedicated group of healthcare professionals,
            technologists, and innovators passionate about improving home health
            care.
          </p>
        </div>

        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-md shadow-lg focus:outline-none z-10 md:hidden"
          >
            &lt;
          </button>
          <div
            className="flex overflow-x-scroll scrollbar-hide space-x-4 py-4"
            ref={scrollContainerRef}
          >
            {team.map((member) => (
              <div
                key={member.id}
                className="flex-shrink-0 border border-gray-400 bg-gradient-to-r from-gray-200 to-green-100 rounded-lg p-2 transitioning shadow-lg text-center  md:ml-14"
              >
                <Image
                  className="object-fill mx-auto"
                  src={member.image}
                  width={280}
                  height={250}
                />
                <div className="py-4">
                  <h1 className="text-slate-gray font-light">{member.name}</h1>
                  <p className="text-sm font-semibold">{member.position}</p>
                </div>
                <div className="flex justify-center space-x-4 mt-4 bg-slate-500 p-4 rounded-xl">
                  {/* <Link href={member.socials.facebook.link}>
                                    <Image src={member.socials.facebook.icon} width={20} height={20} />
                                </Link>
                                <Link href={member.socials.instagram.link}>
                                    <Image src={member.socials.instagram.icon} width={20} height={20} />
                                </Link> */}
                  <Link
                    href={member.socials.linkedin.link}
                    className="flex items-center space-x-2"
                  >
                    <p className="text-lg font-bold text-white">Connect</p>
                    <Image
                      src={member.socials.linkedin.icon}
                      width={23}
                      height={20}
                    />
                  </Link>
                  {/* <Link href={member.socials.twitter.link}>
                                    <Image src={member.socials.twitter.icon} width={20} height={20} />
                                </Link> */}
                </div>
              </div>
            ))}
          </div>
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
