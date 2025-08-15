import React from "react";

const TableSkeleton = ({ rows = 5, className = "" }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {/* Mobile Skeleton */}
      <div className="block md:hidden space-y-4">
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-24"></div>
                <div className="h-3 bg-gray-200 rounded w-32"></div>
              </div>
              <div className="h-6 bg-gray-300 rounded-full w-16"></div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 bg-gray-300 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-40"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 bg-gray-300 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-32"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 bg-gray-300 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-48"></div>
              </div>
            </div>

            <div className="h-10 bg-gray-300 rounded-lg w-full"></div>
          </div>
        ))}
      </div>

      {/* Desktop Skeleton */}
      <div className="hidden md:block">
        <table className="w-full">
          <thead className="sticky top-0 z-10">
            <tr className="bg-gradient-to-r from-carer-blue to-blue-500">
              <th className="px-4 py-4 text-left rounded-tl-lg">
                <div className="h-4 bg-blue-400 rounded w-20"></div>
              </th>
              <th className="px-4 py-4 text-left">
                <div className="h-4 bg-blue-400 rounded w-16"></div>
              </th>
              <th className="px-4 py-4 text-left">
                <div className="h-4 bg-blue-400 rounded w-20"></div>
              </th>
              <th className="px-4 py-4 text-left">
                <div className="h-4 bg-blue-400 rounded w-24"></div>
              </th>
              <th className="px-4 py-4 text-left">
                <div className="h-4 bg-blue-400 rounded w-18"></div>
              </th>
              <th className="px-4 py-4 text-left">
                <div className="h-4 bg-blue-400 rounded w-20"></div>
              </th>
              <th className="px-4 py-4 text-center rounded-tr-lg">
                <div className="h-4 bg-blue-400 rounded w-16 mx-auto"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, index) => (
              <tr
                key={index}
                className={`border-b border-gray-100 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-4 py-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-12"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="h-6 bg-gray-300 rounded-full w-16"></div>
                </td>
                <td className="px-4 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1">
                      <div className="h-3 w-3 bg-gray-300 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="h-3 w-3 bg-gray-300 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="space-y-1">
                    <div className="h-3 bg-gray-300 rounded w-16"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="space-y-1">
                    <div className="h-3 bg-gray-300 rounded w-20"></div>
                    <div className="h-3 bg-gray-200 rounded w-12"></div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="space-y-1">
                    <div className="h-3 bg-gray-300 rounded w-12"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="h-8 bg-gray-300 rounded-lg w-16 mx-auto"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSkeleton;
