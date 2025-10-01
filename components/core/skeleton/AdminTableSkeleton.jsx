import React from "react";
import { FaEllipsisV } from "react-icons/fa";

const AdminTableSkeleton = ({ rows = 4, className = "" }) => (
  <div className={`w-full animate-pulse ${className}`}>
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr>
            <th colSpan={12} className="px-4 py-3 text-left">
              <div className="h-10 bg-gray-200 rounded w-full mb-2"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i}>
              {Array.from({ length: 6 }).map((__, j) => (
                <td
                  key={j}
                  className={
                    j === 5
                      ? "px-1 py-3 text-center align-middle w-12 min-w-[32px] max-w-[40px]"
                      : "px-4 py-3 text-center align-middle"
                  }
                  style={j === 5 ? { width: "40px" } : {}}
                >
                  {j === 5 ? (
                    <span className="inline-flex items-center justify-center w-8 h-8 mx-auto">
                      <FaEllipsisV className="text-gray-400 text-lg" />
                    </span>
                  ) : (
                    <div className="h-4 bg-gray-200 rounded w-full mx-auto"></div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AdminTableSkeleton;
