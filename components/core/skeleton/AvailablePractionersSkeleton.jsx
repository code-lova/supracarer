import React from "react";

const AvailablePractionersSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-lg animate-pulse h-[396px]">
    <div className="flex justify-between items-center border-b-2 w-full h-[50px] px-4">
      <div className="h-5 w-48 bg-gray-200 rounded" />
      <div className="h-4 w-6 bg-gray-200 rounded" />
    </div>
    <div className="p-6">
      <div className="grid grid-cols-1 gap-2 h-[299px] w-full overflow-y-auto">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 border-l-4 rounded-md p-4 bg-gray-100 border-gray-200"
          >
            <div className="w-16 h-16 rounded-md bg-gray-200 flex-shrink-0" />
            <div className="flex flex-col space-y-2 w-full">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-3 w-16 bg-gray-200 rounded" />
              <div className="h-3 w-20 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AvailablePractionersSkeleton;
