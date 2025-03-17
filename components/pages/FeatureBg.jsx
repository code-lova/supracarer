import React from "react";
import Image from "next/image";

const FeatureBg = ({ heading, subheading }) => {
  return (
    <div className="w-full py-20 md:py-28">
      <div className="relative w-screen h-[318px]">
        <Image
          src="/assets/images/featuresBg.png"
          fill
          alt="feature-bg"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center max-w-[300px] mx-auto lg:max-w-full">
          <h1 className=" text-white text-3xl md:text-4xl font-bold text-center">
            { heading }
          </h1>
          <div className=" mt-4">
            <p className="text-white text-base font-medium py-2 text-center">
              { subheading }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureBg;
