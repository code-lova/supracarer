import { FaDollarSign } from "@node_modules/react-icons/fa";
import React from "react";

const ServiceChargeCard = () => {
  return (
    <div className="bg-white w-full h-[100px] border-2 rounded-2xl shadow-md px-3 py-1">
      <div className="flex items-center justify-between">
        <p className="text-slate-gray text-sm font-semibold mb-3 mt-1">
          Service Charge
        </p>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-tranquil-teal">₦5,000</h2>
        <FaDollarSign className="text-tranquil-teal" size={40} />
      </div>
    </div>
  );
};

export default ServiceChargeCard;
