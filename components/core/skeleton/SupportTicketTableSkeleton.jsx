import React from "react";

const SupportTicketTableSkeleton = ({ rows = 3, columns = 4 }) => {
  // Get the appropriate grid class based on columns
  const getGridClass = (cols) => {
    const gridClasses = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      7: "grid-cols-7",
      8: "grid-cols-8",
    };
    return gridClasses[cols] || "grid-cols-4";
  };

  const gridClass = getGridClass(columns);

  return (
    <div className="animate-pulse">
      {/* Responsive Table Skeleton */}
      <div className="overflow-x-auto">
        <div className="min-w-full bg-white rounded-lg border border-gray-200">
          {/* Table Header */}
          <div className="bg-gray-50 border-b border-gray-200 px-2 sm:px-4 py-3">
            <div className={`grid ${gridClass} gap-2 sm:gap-4`}>
              {Array.from({ length: columns }).map((_, index) => (
                <div
                  key={index}
                  className="h-4 bg-gray-200 rounded w-16 sm:w-20"
                ></div>
              ))}
            </div>
          </div>

          {/* Table Rows */}
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="border-b border-gray-200 px-2 sm:px-4 py-3 sm:py-4"
            >
              <div className={`grid ${gridClass} gap-2 sm:gap-4 items-center`}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <div key={colIndex}>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Pagination Skeleton */}
          <div className="px-2 sm:px-4 py-3 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
              <div className="h-4 bg-gray-200 rounded w-24 sm:w-32"></div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="h-6 w-6 sm:h-8 sm:w-8 bg-gray-200 rounded"></div>
                <div className="h-6 w-6 sm:h-8 sm:w-8 bg-gray-200 rounded"></div>
                <div className="h-6 w-6 sm:h-8 sm:w-8 bg-gray-200 rounded"></div>
                <div className="h-6 w-6 sm:h-8 sm:w-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportTicketTableSkeleton;
