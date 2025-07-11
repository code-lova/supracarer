import React from "react";
import { FaCalendarAlt } from "react-icons/fa";


const AppointmentCard = () => {
  return (
    <div className="bg-white w-full h-[100px] border-2 rounded-2xl shadow-md py-1 px-3">
      <div className="flex items-center justify-center">
        <p className="text-slate-gray text-sm font-semibold mt-1">
          Upcoming Appointments
        </p>
      </div>
      <div className="flex items-center justify-between mt-2 mb-2">
        <h2 className="text-xl font-bold text-tranquil-teal">
          4<span className="text-xs px-1 text-tranquil-teal ">total</span>
        </h2>
        <FaCalendarAlt className="text-tranquil-teal" size={30} />
      </div>
      <h2 className="font-bold text-custom-green text-sm text-center capitalize">
        This Month
      </h2>
    </div>
  );
};

export default AppointmentCard;
