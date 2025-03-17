import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="mt-20 md:mt-24 relative w-full h-[400px] lg:h-[600px]">
      <Image
        src="/assets/images/hero-bg62.webp"
        fill
        style={{ objectFit: "cover" }}
        alt="Hero Background"
        className="absolute inset-0 mr-10"
        loading="lazy"
      />

      {/* Dark overlay */}
      {/* <div className="absolute inset-0 bg-black opacity-50"></div> */}

      <div className="mx-2 lg:mx-20 absolute inset-0 flex items-center justify-start p-4 lg:p-8 z-10">
        <div className="p-0 xl:p-2 w-[350px] md:w-[600px] lg:w-[700px]">
          <div className="relative w-fit">
            <h1 className="text-ever-green text-xl md:text-3xl tracking-widest relative inline-block">
              Welcome to Supracarer
              <span className="absolute left-0 bottom-0 w-full h-2 border-b-4 border-ever-green rounded-b-full"></span>
            </h1>
          </div>

          <h1 className="text-[30px] font-bold md:text-[40px] lg:text-6xl tracking-wider blue_gradient">
            In Home ​Healthcare ​App
          </h1>
          <p className="mt-4 text-base lg:text-xl w-[250px] xl:text-2xl md:w-[400px] xl:w-[610px] font-extralight tracking-widest leading-tight">
            Experience personalized care with Supracarer, where we connect you
            directly with highly trained caregivers and nurses.
          </p>
          {/* <p className=" mt-3 text-[14px] font-semibold w-[250px] lg:text-xl xl:text-2xl md:w-[400px] xl:w-[610px] xl:tracking-widest text-gray-700">
                    Be the first to get all premium features for free, when we launch. 
                </p> */}
          <Link href="/signin">
            <div className="flex justify-center items-center space-x-2 h-14 bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-500 rounded-lg w-[198px] mt-4 md:mt-12 transitioning shadow-2xl">
              <button className="text-white font-bold">Request a nurse</button>
              <span className="">
                <Image src="/assets/icons/arrow.svg" width={30} height={10} />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
