"use client";
import React, { useState } from "react";

const NurseNotifications = () => {
  return (
    <>
      <div className="w-full h-[200px] bg-white rounded-3xl shadow-md px-5 py-6 md:col-span-2">
        <h2 className="text-2xl lg:text-3xl mt-6 md:mt-0 font-bold text-tranquil-teal">
          Nurse Notifications
        </h2>
        <p className="text-gray-600">
          Here you can view all your notifications related to patient care Lorem ipsum dolor sit 
          amet consectetur adipisicing elit. Veniam consequatur iure labore esse dolor? Sit voluptatem architecto 
          tenetur et enim.
          updates.
        </p>
      </div>
    </>
  );
};

export default NurseNotifications;
