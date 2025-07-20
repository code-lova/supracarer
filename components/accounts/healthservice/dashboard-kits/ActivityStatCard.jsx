import React from "react";
import Piechart from "./Piechart";


const ActivityStatCard = () => {
  return (
    <>
      <div className="bg-white w-full h-[279px] border-2 rounded-2xl shadow-md md:col-span-2">
        <div className="flex items-center justify-center gap-1 h-full py-4 px-1">
          <div className="bg-white w-full h-[250px]">
            <h1 className="px-2 py-3 text-tranquil-teal font-semibold text-xl">
              Activity Stats
            </h1>
            {/* Placeholder for Piechart component */}
            <Piechart />
          </div>
          {/* Label for piechart */}
          <div className="bg-white w-[300px] h-[250px]">
            <div className="flex flex-col justify-between h-full px-2 py-3">
              <form
                action=""
                method="post"
                className="flex items-end justify-between mb-3"
              >
                <p> </p>
                <select
                  name=""
                  id=""
                  className="border-2 border-custom-green text-tranquil-teal font-semibold text-sm rounded-md p-1"
                >
                  <option value="">Month</option>
                  <option value="">August</option>
                  <option value="">September</option>
                </select>
              </form>

              <div className="flex flex-col bg-light-green border-2 rounded-xl items-start h-full px-4 py-2">
                <div className="mb-1">
                  <h2 className="font-bold text-2xl text-tranquil-teal">25</h2>
                  <p className="text-slate-gray font-semibold">Completed</p>
                </div>
                <div className="mb-1">
                  <h2 className="font-bold text-2xl text-tranquil-teal">5</h2>
                  <p className="text-slate-gray font-semibold">Missed</p>
                </div>
                <div className="mb-1">
                  <h2 className="font-bold text-2xl text-tranquil-teal">3</h2>
                  <p className="text-slate-gray font-semibold">Cancelled</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivityStatCard;
