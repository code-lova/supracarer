import React from "react";
import Image from "next/image";
import { howItWorks } from "@constants/index";

const HowitWorks = () => {
  return (
    <div className="pageSection ml-4 mr-4 mb-1">
      <h1 className="text-3xl px-8 md:text-4xl mb-8 font-bold text-center text-carer-blue">
        Get Started with few easy steps
      </h1>
      <div>
        <div className="hidden md:block p-2 md:px-10">
          <Image
            className="object-cover w-full h-auto rounded-xl"
            src="/assets/images/how_we_work.png"
            width={1200}
            height={400}
          />
        </div>
        <div className="sm:block md:hidden p-0">
          {howItWorks.map((how) => (
            <div key={how.id} className="my-4">
              <h1 className="font-bold">{how.id}</h1>
              <h2>
                <p className="text-tranquil-teal font-bold text-lg tracking-wider">
                  {how.name}
                </p>
                <p className=" text-semi-dark text-base leading-8">
                  {how.description}
                </p>
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowitWorks;
