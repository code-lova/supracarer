import { FaRegHeart } from "react-icons/fa";
import React from "react";

const HealthTipsCard = () => {
  return (
    <div className="bg-gradient-to-r from-[#e6f7ff] via-[#f0faff] to-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-[1.02] w-full h-[160px] flex items-center justify-between">
      {/* Text Content */}
      <div className=" w-[210px] lg:w-[260px]">
        <h3 className="text-carer-blue font-semibold text-lg mb-4">
          Health Tip of the Day
        </h3>
        <p className="text-slate-600 text-sm">
          💧 Stay hydrated and rest after each appointment booking.!!
        </p>
      </div>

      {/* Icon Area */}
      <div className="flex items-center justify-center w-[70px] h-[70px] rounded-full bg-white shadow-inner border border-blue-100">
        <FaRegHeart size={38} className="text-carer-blue" />
      </div>
    </div>
  );
};

export default HealthTipsCard;
