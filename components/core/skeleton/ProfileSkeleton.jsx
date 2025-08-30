import React from "react";

const ProfileSkeleton = () => {
  return (
    <div className="w-full mx-auto px-1 py-4 space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gray-300"></div>
            <div>
              <div className="h-8 bg-gray-300 rounded w-48 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-64"></div>
            </div>
          </div>
          <div className="h-10 bg-gray-300 rounded w-32"></div>
        </div>

        {/* Profile Image Section Skeleton */}
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-300"></div>
          <div>
            <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-64 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-32"></div>
          </div>
        </div>
      </div>

      {/* Profile Information Skeleton */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-6">
          <div className="w-6 h-6 bg-gray-300 rounded mr-2"></div>
          <div className="h-6 bg-gray-300 rounded w-48"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Fields Skeleton */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className={index >= 6 ? "lg:col-span-2" : ""}>
              <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
              <div className="h-12 bg-gray-300 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings Skeleton */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-6">
          <div className="w-6 h-6 bg-gray-300 rounded mr-2"></div>
          <div className="h-6 bg-gray-300 rounded w-48"></div>
        </div>

        <div className="space-y-4">
          {/* Security Items Skeleton */}
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                <div>
                  <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
                  <div className="h-3 bg-gray-300 rounded w-32"></div>
                </div>
              </div>
              <div className="h-8 bg-gray-300 rounded w-24"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Account Information Skeleton */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-6">
          <div className="w-6 h-6 bg-gray-300 rounded mr-2"></div>
          <div className="h-6 bg-gray-300 rounded w-48"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, columnIndex) => (
            <div key={columnIndex} className="space-y-3">
              {Array.from({ length: 3 }).map((_, rowIndex) => (
                <div key={rowIndex} className="flex justify-between">
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
