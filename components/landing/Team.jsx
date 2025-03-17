"use client";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { team } from "@constants/index";

const Team = () => {
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
    <div className="my-24">
      <h1 className="capitalize underline text-tranquil-teal text-base font-bold text-center">
        Our Expert Team
      </h1>
      <div className="pageSection text-center my-4 font-extralight px-4 text-base leading-6 lg:px-40">
       
        <div className="text-center mt-2 text-carer-blue">
          <h2 className="text-3xl lg:text-4xl font-bold">
            We are passionate about
          </h2>
          <h2 className="text-3xl lg:text-4xl font-bold">
            {" "}
             advancing home health care.
          </h2>
        </div>
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
                <p className="text-slate-gray font-light">{member.position}</p>
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
  );
};

export default Team;
