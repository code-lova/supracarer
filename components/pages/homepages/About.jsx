"use client";
import React, { useRef } from "react";
import Image from "next/image";
import FeatureBg from "../FeatureBg";
import { aboutUs, mission, vision } from "@constants/index";
import { FlagSolid } from "@components/core/icon/flag";
import { SharpDiamond } from "@components/core/icon/diamond";
import Team from "@components/landing/Team";
import Services from "@components/landing/Services";
import Footer from "@components/landing/Footer";
import Subscription from "@components/landing/Subscription";

export const About = () => {

  return (
    <section>
      <FeatureBg
        heading="Learn More About Supracarer"
        subheading="Your holistic health journey, empowered by technology"
      />

      <div className="pageSection">
        <div className="flex justify-center">
          <h2 className="text-4xl md:hidden font-bold text-carer-blue">
            Above and Beyond Care
          </h2>
        </div>
        <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between gap-8 md:gap-2 mt-[35px]">
          <div className="relative w-full md:w-[550px] h-[700px] md:h-[800px] rounded-3xl overflow-hidden md:overflow-visible">
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
                src="/assets/images/nursing-aid.png"
                alt="Hero Background"
                fill
                style={{ objectFit: "cover" }}
                loading="lazy"
                className="rounded-3xl"
              />
              <div className="hidden md:block absolute inset-2 border-2 border-white rounded-3xl pointer-events-none"></div>
            </div>
          </div>

          <div className="w-[97%] md:w-1/2 pl-0 md:pl-[10px]">
            <h1 className="capitalize text-tranquil-teal text-base font-bold">
              Get to know us
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-carer-blue">
              Who We Are
            </h2>
            {aboutUs.map((abt) => (
              <p
                className="mt-4 text-base text-semi-dark leading-7 md:text-justify"
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
                    className="bg-tranquil-teal p-2 rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-110 hover:bg-carer-blue"
                  />
                </div>

                <div>
                  {mission.map((mision) => (
                    <div key={mision.title} className="">
                      <h1 className="font-semibold text-tranquil-teal text-xl underline">
                        {mision.title}
                      </h1>
                      <p className="leading-8 text-base text-semi-dark">
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
                    className="bg-tranquil-teal p-2 rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-110 hover:bg-carer-blue"
                  />
                </div>
                <div>
                  {vision.map((vison) => (
                    <div key={vison.title}>
                      <h1 className="font-semibold text-tranquil-teal text-xl underline">
                        {vison.title}
                      </h1>
                      <p className="leading-8 text-base text-semi-dark">
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

      <Services />

      {/* our expert team */}
      <Team />

      <Subscription />

      <Footer />
    </section>
  );
};
