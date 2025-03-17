import React from "react";
import Image from "next/image";
import { aboutUs, mission, vision } from "@constants/index";
import { Doctor } from "@components/core/icon/doctor";
import { Nurse } from "@components/core/icon/nurse";
import { NormalBtn } from "@components/core/button";

const AboutUs = () => {
  return (
    <div className="pageSection my-20 md:my-28">
      <div className="flex flex-col-reverse md:flex-row justify-center md:justify-between gap-8 md:gap-2 mt-8">
        <div className="relative w-full md:w-[550px] h-[400px] md:h-[700px] rounded-3xl overflow-hidden md:overflow-visible">
          <div className="greenVerticalTextBox">
            <span
              className="text-xl uppercase font-semibold transform -rotate-180"
              style={{ writingMode: "vertical-lr" }}
            >
              Best elderly care for your family
            </span>
          </div>

          <div className="hidden md:block relative w-full h-full">
            <Image
              src="/assets/images/holdinghands.webp"
              alt="home-care app"
              fill
              style={{ objectFit: "cover" }}
              loading="lazy"
              className="rounded-3xl"
            />
            <div className="hidden md:block absolute inset-2 border-2 border-white rounded-3xl pointer-events-none"></div>
          </div>
          <div className="block md:hidden">
            <Image
              src="/assets/images/carer5.webp"
              alt="home-care app"
              fill
              style={{ objectFit: "cover" }}
              loading="lazy"
              className="rounded-3xl px-2"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 px-4 md:px-0">
          <h1 className="capitalize text-tranquil-teal text-base font-bold">
            Get to know us
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-carer-blue leading-8 mt-4">
            Living life in the fullest begins right now with you
          </h2>
          <p className="mt-4 text-base text-semi-dark leading-7">
            We are a pioneering healthcare technology company dedicated to
            revolutionizing home health care through our innovative platform.
          </p>

          {mission.map((mision) => (
            <div key={mision.title} className="my-4">
              <h1 className="font-semibold text-tranquil-teal text-xl underline">
                {mision.title}
              </h1>
              <p className="leading-7 text-base text-semi-dark">
                {mision.mission}
              </p>
            </div>
          ))}

          {vision.map((vison) => (
            <div key={vison.title} className="my-4">
              <h1 className="font-semibold text-tranquil-teal text-xl underline">
                {vison.title}
              </h1>
              <p className="leading-7 text-base text-semi-dark">
                {vison.vision}
              </p>
            </div>
          ))}

          <div className="mt-8 flex flex-col lg:flex-row item-center justify-between gap-6">
            <div className="flex items-center gap-3 w-full md:w-[300px]">
              <div className="bg-tranquil-teal p-2 rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-110 hover:bg-carer-blue">
                <Doctor color="#fff" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-base font-bold text-haven-blue mb-2">
                  Quality Service
                </h2>
                <p className="text-sm text-semi-dark mb-2">
                  Top-notch medical care
                </p>
                <p className="text-sm text-semi-dark">
                  for comfort and well-being.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-[300px]">
              <div className="bg-tranquil-teal p-2 rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-110 hover:bg-carer-blue">
                <Nurse color="#fff" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-base font-bold text-haven-blue mb-2">
                  Expert Nursing
                </h2>
                <p className="text-sm text-semi-dark mb-2">
                  Skilled and compassionate.
                </p>
                <p className="text-sm text-semi-dark">
                  care for all.
                </p>
              </div>
            </div>
          </div>
          <div className="my-8">
            <NormalBtn href="/about" children="Discover more" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
