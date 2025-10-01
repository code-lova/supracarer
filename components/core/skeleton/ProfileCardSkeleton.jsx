import React from "react";

const ProfileCardSkeleton = () => (
  <div className="bg-white w-full rounded-2xl shadow-lg animate-pulse h-[280px]">
    <div className="flex items-center justify-between border-b-2 w-full h-[50px] px-4">
      <div className="h-5 w-32 bg-gray-200 rounded" />
      <div className="h-4 w-4 bg-gray-200 rounded" />
    </div>
    <div className="px-5">
      <div className="flex items-center space-x-4 mb-6 mt-2">
        <div className="w-20 h-20 rounded-full bg-gray-200" />
        <div className="space-y-2 w-[200px]">
          <div className="h-5 w-32 bg-gray-200 rounded" />
          <div className="h-4 w-24 bg-gray-200 rounded mt-2" />
        </div>
      </div>
      <div className="flex justify-between -mt-4">
        <div className="h-3 w-20 bg-gray-200 rounded" />
        <div className="h-3 w-16 bg-gray-200 rounded" />
      </div>
      <div className="w-full h-[1px] bg-gray-200 mt-2 mb-4" />
      <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
      <div className="space-y-3 pr-2 mt-5">
        <div className="h-8 w-full bg-gray-200 rounded" />
      </div>
    </div>
  </div>
);

export default ProfileCardSkeleton;
