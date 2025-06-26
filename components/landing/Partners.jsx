import Image from "@node_modules/next/image";
import React from "react";

const Partners = () => {
  return (
    <div className="pageSection ml-4 pb-20 p-8">
      <div className="text-center text-carer-blue my-4 px-4 leading-6 lg:px-40">
        <h1 className="capitalize text-tranquil-teal text-base font-bold text-center underline">
          Our Partners
        </h1>
        <h2 className="text-3xl lg:text-4xl font-bold">
          We believe in driving
        </h2>
        <h2 className="text-3xl lg:text-4xl font-bold">
          {" "}
          impact through collaboration
        </h2>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-16">
        <div className="p-6 w-[200px] h-[200px] bg-white">
          <Image
            src="/assets/images/alx-ventures.webp"
            width={150}
            height={200}
            className=" object-contain mx-auto"
            loading="lazy"
          />
        </div>

        <div className="p-6 w-[200px] h-[200px] bg-white">
          <Image
            src="/assets/images/datamelon.webp"
            width={250}
            height={210}
            className=" object-contain mx-auto"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Partners;
