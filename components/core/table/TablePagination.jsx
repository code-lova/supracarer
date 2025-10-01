import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TablePagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  filteredItems,
  onPageChange,
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const getPaginationRange = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between border-t pt-4 flex-shrink-0">
      <div className="text-sm text-gray-600 mb-4 sm:mb-0">
        Showing {startIndex + 1} to {Math.min(endIndex, filteredItems)} of{" "}
        {filteredItems} items
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg border ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-600 hover:bg-gray-50 border-gray-300"
          }`}
        >
          <FaChevronLeft />
        </button>

        {totalPages <= 7
          ? // Show all pages if total pages <= 7
            Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-3 py-2 rounded-lg border text-sm ${
                  currentPage === page
                    ? "bg-slate-gray2 text-white border-slate-gray2"
                    : "bg-white text-gray-600 hover:bg-gray-50 border-gray-300"
                }`}
              >
                {page}
              </button>
            ))
          : // Show pagination with dots for large page counts
            getPaginationRange().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === "number" && onPageChange(page)}
                disabled={page === "..."}
                className={`px-3 py-2 rounded-lg border text-sm ${
                  currentPage === page
                    ? "bg-slate-gray2 text-white border-slate-gray2"
                    : page === "..."
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                    : "bg-white text-gray-600 hover:bg-gray-50 border-gray-300"
                }`}
              >
                {page}
              </button>
            ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-lg border ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-600 hover:bg-gray-50 border-gray-300"
          }`}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
