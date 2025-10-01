import React from "react";
import { FaFilter, FaSort } from "react-icons/fa";

const TableFilters = ({
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  statusOptions = [],
  sortOptions = [],
  quickFilterStatuses = [],
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-gray-50 rounded-lg flex-shrink-0">
      <div className="flex items-center space-x-2">
        <FaFilter className="text-haven-blue" />
        <label className="text-sm font-medium text-gray-700">
          Filter by Status:
        </label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-carer-blue focus:border-transparent"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <FaSort className="text-haven-blue" />
        <label className="text-sm font-medium text-gray-700">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-carer-blue focus:border-transparent"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Quick Status Filter Buttons */}
      {quickFilterStatuses.length > 0 && (
        <div className="flex flex-wrap gap-2 md:ml-auto">
          {quickFilterStatuses.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors ${
                statusFilter === status
                  ? "bg-slate-gray2 text-white"
                  : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TableFilters;
