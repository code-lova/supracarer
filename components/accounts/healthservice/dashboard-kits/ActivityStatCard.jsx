import React from "react";
import RatingsChart from "./RatingsChart";

const ActivityStatCard = () => {
  return (
    <>
      <div className="bg-white w-full h-[279px] border-2 rounded-2xl shadow-md md:col-span-2">
        <div className="flex items-start gap-1 h-full py-2 px-1">
          <div className="bg-white w-full h-[250px]">
            <h1 className="px-2 py-3 text-tranquil-teal font-semibold text-xl">
              Rating Trends
            </h1>
            {/* Ratings Chart component */}
            <RatingsChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivityStatCard;
