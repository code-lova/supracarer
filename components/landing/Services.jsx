import React from "react";
import Image from "next/image";
import { abtWhatWeOffer } from "@constants/index";
import { NormalBtn } from "@components/core/button";

const Services = () => {
  return (
    <div className="pageSection my-20 ml-4 mr-4 mb-12">
      <h1 className="capitalize text-tranquil-teal text-base font-bold text-center">
        What we offer
      </h1>

      <div className="text-center mt-2 text-carer-blue">
        <h2 className="text-2xl lg:text-4xl font-bold">
          We're committed to deliver
        </h2>
        <h2 className="text-2xl lg:text-4xl font-bold">high quality service</h2>
      </div>

      <div className="flex flex-col justify-center items-center lg:flex-row gap-5 mt-16">
        {abtWhatWeOffer.map((service) => (
          <div
            key={service.id}
            className="px-4 w-[380px] h-[500px] bg-custom-white rounded-xl border-2 border-ever-green transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-none"
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

            <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto relative -top-10 border border-ever-green shadow-xl flex items-center justify-center transition-all duration-300 group-hover:scale-90">
              {service.icon}
            </div>
            <div className="-mt-3">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold text-ever-green text-center text-xl">
                  {service.name}
                </h1>
                <p className="leading-8 text-semi-dark text-sm text-center">
                  {service.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto lg:border border-gray-400 rounded-md w-auto h-auto lg:w-[700px] lg:h-[80px] mt-16 flex flex-col lg:flex-row items-center lg:gap-6 ">
        <p className="block lg:hidden text-xl lg:text-sm text-center lg:text-start lg:mt-6 mb-6 px-6 py-2">
          In Need of Elderly Care service ?.
          <br className="mt-3" />
          <span className="mt-5 block">Book a professional caregiver.</span>
        </p>
        <p className="hidden lg:block text-xl lg:text-sm text-center lg:mt-6 mb-6 px-6 py-2">
          In Need of Elderly Care service ?. Book a professional caregiver.
        </p>
        <NormalBtn href="/signin" children="Get Care Now" />
      </div>
    </div>
  );
};

export default Services;
