"use client";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Completed", value: 25 },
  { name: "Missed", value: 5 },
  { name: "Cancelled", value: 3 },
];

const COLORS = ["#14B8A6", "#FACC15", "#F87171"]; // tranquil-teal, amber, red

const Piechart = () => {
  const [isMdUp, setIsMdUp] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMdUp(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full h-[190px] md:h-[190px] flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height={isMdUp ? "100%" : 150}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={70}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          {isMdUp && (
            <Legend layout="vertical" verticalAlign="middle" align="right" />
          )}
        </PieChart>
      </ResponsiveContainer>
      {!isMdUp && (
        <div className="flex flex-col items-start w-full mt-1">
          <div className="grid grid-cols-1 w-full max-w-xs">
            {data.map((entry, idx) => (
              <div
                key={entry.name}
                className="flex items-start justify-start gap-2 px-2"
              >
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                ></span>
                <span className="text-xs font-medium text-gray-700">
                  {entry.name}
                </span>
                <span className="text-xs text-gray-500">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Piechart;
