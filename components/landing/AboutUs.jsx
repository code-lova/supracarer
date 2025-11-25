import React from "react";
import Image from "next/image";
import { Doctor } from "@components/core/icon/doctor";
import { Nurse } from "@components/core/icon/nurse";
import { NormalBtn } from "@components/core/button";

const AboutUs = () => {
  return (
    <div className="pageSection my-16 md:my-8">
      <div className="flex flex-col-reverse md:flex-row justify-center md:justify-between gap-8 md:gap-10 lg:gap-12 items-center">
        <div className="relative w-full md:w-1/2 h-[350px] md:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl group">
          {/* Modern Vertical Badge */}
          <div className="absolute -left-1 top-8 z-20 bg-custom-green text-white px-4 py-8 rounded-r-xl shadow-lg">
            <span
              className="text-sm uppercase font-semibold tracking-wider transform -rotate-180"
              style={{ writingMode: "vertical-lr" }}
            >
              FOR FAMILIES AND INDIVIDUALS
            </span>
          </div>

          <div className="hidden md:block relative w-full h-full">
            <Image
              src="/assets/images/startup_nurse.webp"
              alt="supracarer_home-care app"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              loading="lazy"
              className="rounded-2xl group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          <div className="block md:hidden relative w-full h-full">
            <Image
              src="/assets/images/carer5.webp"
              alt="supracarer_home app"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              loading="lazy"
              className="rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>

        <div className="w-full md:w-1/2 px-4 md:px-0">
          <div className="inline-flex items-center gap-2 bg-tranquil-teal/10 text-tranquil-teal px-4 py-2 rounded-full text-sm font-semibold border border-tranquil-teal/20 mb-4">
            <span className="w-2 h-2 bg-tranquil-teal rounded-full animate-pulse"></span>
            <span>Get to Know Us</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mt-4 mb-4">
            Living Life to the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tranquil-teal to-custom-green">
              Fullest
            </span>{" "}
            Begins Now
          </h2>

          <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-3">
            We are a pioneering healthcare technology company dedicated to
            revolutionizing home health care through our innovative platform.
          </p>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            We also provide NCD prevention and management tools and resources.
          </p>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-tranquil-teal/5 border border-tranquil-teal/10 hover:border-tranquil-teal/30 transition-all duration-300 group">
              <div className="bg-tranquil-teal p-3 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-carer-blue flex-shrink-0">
                <Doctor color="#fff" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-base font-bold text-haven-blue mb-2">
                  Quality Service
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Top-notch medical care for comfort and well-being.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-tranquil-teal/5 border border-tranquil-teal/10 hover:border-tranquil-teal/30 transition-all duration-300 group">
              <div className="bg-tranquil-teal p-3 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-carer-blue flex-shrink-0">
                <Nurse color="#fff" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-base font-bold text-haven-blue mb-2">
                  Professional Home Care
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Skilled professionals from a multidisciplinary team.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <NormalBtn href="/about" children="Discover More" />
             <NormalBtn href="/pricing" children="Our Care Package" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
