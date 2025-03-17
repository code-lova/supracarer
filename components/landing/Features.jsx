import React from "react";
import Image from "next/image";
import { features } from "@constants/index";

const Features = () => {
  return (
    <div className="bg-gradient-to-r from-transparent to-gray-200 py-10 relative">
      <div className="pageSection">
        <h1 className="capitalize text-tranquil-teal text-base font-bold text-center">
          Features
        </h1>
        <div className="text-center mt-2 text-carer-blue">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Why Our Services Stand Out
          </h2>
          <h2 className="text-3xl lg:text-4xl font-bold">
            {" "}
            Making a Difference
          </h2>
        </div>
        <p className="text-3xl lg:text-4xl font-bold text-carer-blue text-center mt-2"></p>

        <div className="grid grid-cols-1 gap-y-9 md:grid md:grid-cols-3 md:gap-x-4 lg:grid lg:grid-cols-3 lg:gap-x-4 my-6">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="border border-gray-400 rounded-lg p-6 transitioning shadow-lg"
            >
              <Image
                src={feature.icon}
                width={70}
                height={20}
                className=" object-contain mx-auto"
              />
              <h3 className="font-bold text-tranquil-teal uppercase mt-4 leading-6 text-base tracking-wider text-center">
                {feature.title}
              </h3>
              <p className="text-semi-dark mt-4 leading-6 text-base tracking-wider text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
