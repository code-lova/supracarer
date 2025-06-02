import React from "react";

const DashboardSkeletonLoader = () => {
  return (
    <>
      <div className="animate-pulse flex flex-col md:flex-row justify-between items-center w-full">
        <div className="w-[300px] h-6 bg-gray-300 rounded mt-6 md:mt-0" />

        <div className="hidden md:flex items-center gap-4">
          <div className="w-[50px] h-[50px] bg-gray-300 rounded-full" />
          <div className="flex flex-col gap-2">
            <div className="w-[100px] h-5 bg-gray-300 rounded" />
            <div className="w-[120px] h-4 bg-gray-200 rounded" />
          </div>
        </div>

        <div className="md:hidden flex items-center gap-4 border-2 rounded-full h-20 w-[250px] py-8 px-4 my-12">
          <div className="w-[50px] h-[50px] bg-gray-300 rounded-full" />
          <div className="flex flex-col gap-2">
            <div className="w-[80px] h-5 bg-gray-300 rounded" />
            <div className="w-[100px] h-4 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSkeletonLoader;
