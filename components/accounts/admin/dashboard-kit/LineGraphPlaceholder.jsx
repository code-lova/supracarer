import React from "react";

export default function LineGraphPlaceholder() {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6 flex flex-col items-center justify-center min-h-[220px]">
      <div className="w-full h-32 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-full mb-4" />
      <div className="text-lg font-semibold text-gray-700">
        Appointments per Month (Curved Line Graph Placeholder)
      </div>
    </div>
  );
}
