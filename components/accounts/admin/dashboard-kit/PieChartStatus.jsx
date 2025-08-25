"use client";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const statuses = [
  { label: "Pending", value: 30, color: "#facc15" },
  { label: "Processing", value: 20, color: "#3b82f6" },
  { label: "Confirmed", value: 25, color: "#22c55e" },
  { label: "Ongoing", value: 10, color: "#a78bfa" },
  { label: "Cancel", value: 5, color: "#ef4444" },
  { label: "Done", value: 10, color: "#6b7280" },
];
const total = statuses.reduce((sum, s) => sum + s.value, 0);

export default function PieChartStatus() {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6 flex flex-col items-center min-h-[220px] w-full">
      <div className="w-full flex flex-col items-center">
        <div className="text-lg font-semibold text-haven-blue mb-2 flex items-start">
          Appointment Status (August)
        </div>
        <div className="relative w-40 h-40 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statuses}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                label={false}
                isAnimationActive={true}
              >
                {statuses.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => [`${value}`, name]}
                contentStyle={{
                  borderRadius: 8,
                  boxShadow: "0 2px 8px #0001",
                  background: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center total */}
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-xs font-semi-bold text-slate-gray pointer-events-none">
            <p>Appointments </p>
            <p>{total}</p>
          </div>
        </div>

        {/* Legend with color circles and status names */}
        <div className="flex flex-wrap gap-4 justify-center mt-2">
          {statuses.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-1 text-sm text-slate-gray"
            >
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ background: s.color }}
              ></span>
              <div className="flex space-x-1">
                <span>{s.label}</span>
                <span>({s.value})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
