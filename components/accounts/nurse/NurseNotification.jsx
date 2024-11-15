"use client";
import React, { useState } from "react";
import NurseAside from "./NurseAside";
import NurseHeader from "./NurseHeader";

const NurseNotifications = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <NurseAside />
      <div>
        <NurseHeader />
        <div className="lg:ml-[300px] rounded-3xl md:w-[1000px] w-full h-full md:p-20 p-8 bg-pink-400 md:mt-10 mt-28">
          <h2 className="lg:text-6xl md:text-4xl text-3xl font-bold text-white text-center mb-8">
            Notifications
          </h2>
          <div className="mt-5 flex flex-col gap-6">
            <div>
              <p className="text-2xl text-white">
                <span className="pr-5 text-2xl">&#128980;</span>Take your
                medications
              </p>
              <p className="pl-10 font-semibold text-cyan-400">
                27 July, 14:33
              </p>
            </div>
            <div>
              <p className="text-2xl text-white">
                <span className="pr-5 text-2xl">&#128980;</span>Take your
                medications
              </p>
              <p className="pl-10 font-semibold text-cyan-400">
                27 July, 14:33
              </p>
            </div>
            <div>
              <p className="text-2xl text-white">
                <span className="pr-5 text-2xl">&#128980;</span>Take your
                medications
              </p>
              <p className="pl-10 font-semibold text-cyan-400">
                27 July, 14:33
              </p>
            </div>
            <div>
              <p className="text-2xl text-white">
                <span className="pr-5 text-2xl">&#128980;</span>Take your
                medications
              </p>
              <p className="pl-10 font-semibold text-cyan-400">
                27 July, 14:33
              </p>
            </div>
            <div>
              <p className="text-2xl text-white">
                <span className="pr-5 text-2xl">&#128980;</span>Take your
                medications
              </p>
              <p className="pl-10 font-semibold text-cyan-400">
                27 July, 14:33
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NurseNotifications;
