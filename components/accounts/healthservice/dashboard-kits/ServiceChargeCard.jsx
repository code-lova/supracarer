import { GiTakeMyMoney } from "react-icons/gi";
import React from "react";

const ServiceChargeCard = () => {
  return (
    <div className="bg-white w-full h-[100px] border-2 rounded-2xl shadow-md px-3 py-1">
      <div className="flex items-center justify-center">
        <p className="text-slate-gray text-sm font-semibold mb-2 mt-1">
          GRS Service Rate
        </p>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-tranquil-teal mt-3">₵ 5,000</h2>
        <GiTakeMyMoney className="text-tranquil-teal" size={45} />
      </div>
    </div>
  );
};

export default ServiceChargeCard;
