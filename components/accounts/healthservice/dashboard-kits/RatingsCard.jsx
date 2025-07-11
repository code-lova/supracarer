"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FaChartLine, FaArrowUp, FaArrowDown } from "react-icons/fa";

const data = [
  { week: "Week 1", rating: 4.2 },
  { week: "Week 2", rating: 4.5 },
  { week: "Week 3", rating: 4.0 },
  { week: "Week 4", rating: 4.7 },
];

const RatingsCard = () => {
  const currentRating = data[data.length - 1].rating;
  const previousRating = data[data.length - 2].rating;
  const trendUp = currentRating >= previousRating;

  return (
    <div className="bg-white w-full h-[100px] border-2 rounded-2xl shadow-md flex items-center px-4 justify-between">
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-1">
          <FaChartLine className="text-tranquil-teal" size={20} />
          <h2 className="text-md font-semibold text-tranquil-teal">Ratings</h2>
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          {trendUp ? (
            <FaArrowUp className="text-green-600 mr-1" />
          ) : (
            <FaArrowDown className="text-red-500 mr-1" />
          )}
          <p>{currentRating} this month</p>
        </div>
      </div>

      <div className="w-[120px] h-[70px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical horizontal />
            <XAxis dataKey="week" hide />
            <YAxis domain={[3.5, 5]} hide />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="rating"
              stroke="#14B8A6"
              strokeWidth={2}
              dot={{ r: 3, stroke: "#14B8A6", fill: "#fff", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RatingsCard;
