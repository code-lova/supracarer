import React from "react";

const HealthWorkerCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6">
        {/* Header with image and info */}
        <div className="flex items-center space-x-4 mb-4">
          {/* Profile image skeleton */}
          <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse"></div>

          <div className="flex-1 min-w-0">
            {/* Name skeleton */}
            <div className="h-5 bg-gray-200 rounded animate-pulse mb-2"></div>

            {/* Specialty skeleton */}
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mb-1"></div>

            {/* Location skeleton */}
            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </div>
        </div>

        {/* Rating and Stats */}
        <div className="flex items-center justify-between mb-4">
          <div>
            {/* Stars skeleton */}
            <div className="flex items-center space-x-1 mb-1">
              {Array.from({ length: 5 }, (_, index) => (
                <div
                  key={index}
                  className="w-4 h-4 bg-gray-200 rounded animate-pulse"
                ></div>
              ))}
            </div>

            {/* Rating badge skeleton */}
            <div className="h-6 w-12 bg-gray-200 rounded-full animate-pulse"></div>
          </div>

          <div className="text-right">
            {/* Review count skeleton */}
            <div className="h-6 w-8 bg-gray-200 rounded animate-pulse mb-1"></div>
            <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Button skeleton */}
        <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

// Component to render multiple skeleton cards
const HealthWorkerCardSkeletonGrid = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }, (_, index) => (
        <HealthWorkerCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default HealthWorkerCardSkeletonGrid;
export { HealthWorkerCardSkeleton };
