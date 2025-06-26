"use client";
import React from "react";
import Image from "next/image";
import { team } from "@constants/index";

const Team = () => {
  return (
    <div className="pageSection my-24">
      <h1 className="capitalize underline text-tranquil-teal text-base font-bold text-center">
        Our Expert Team
      </h1>
      <div className="pageSection text-center my-4 font-extralight px-4 text-base leading-6 lg:px-40">
        <div className="text-center mt-2 text-carer-blue">
          <h2 className="text-2xl lg:text-4xl font-bold">
            We are passionate about
          </h2>
          <h2 className="text-2xl lg:text-4xl font-bold">
            {" "}
            advancing home health care.
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mt-12">
        {team.map((member) => (
          <div key={member.id} className="w-[250px] sm:w-[280px] h-[280px] text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <div className="w-[190px] h-[190px] overflow-hidden rounded-md mx-auto mb-4 border-2 border-carer-blue">
              <Image
                src={member.image}
                alt={member.name}
                width={180}
                height={180}
                className="object-cover w-[450px] h-[220px] transition-transform duration-300"
              />
            </div>
            <h1 className="text-md font-bold text-haven-blue">
              {member.name}
            </h1>
            <p className="text-slate-gray text-semi-dark text-sm">
              {member.position}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
