import React from "react";

const GrsLoaderSkeleton = () => {
  return (
    <div className="rounded-xl border border-tranquil-teal/30 bg-tranquil-teal/10 p-4 flex flex-col gap-4 shadow-sm animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex justify-between items-center">
          <div className="h-4 bg-gray-300 rounded w-32" />
          <div className="h-4 bg-gray-300 rounded w-24" />
        </div>
      ))}
      <div className="flex items-start gap-2 mt-2">
        <div className="h-4 bg-gray-300 rounded w-24" />
        <div className="flex flex-wrap gap-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-300 h-5 w-16 rounded" />
          ))}
        </div>
      </div>
      <div className="flex items-start gap-2">
        <div className="h-4 bg-gray-300 rounded w-24" />
        <div className="h-4 bg-gray-300 rounded w-full max-w-xs" />
      </div>
    </div>
  );
};

export default GrsLoaderSkeleton;
