"use client";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// Fake data for current month
const incomeData = [
  { label: "Income", value: 850000, color: "#22c55e" },
  { label: "Profit", value: 320000, color: "#3b82f6" },
];
const total = incomeData.reduce((sum, d) => sum + d.value, 0);

export default function PieChartIncome() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [selectedMonth, setSelectedMonth] = React.useState(11); // December default

  // Generate fake data for selected month
  const fakeIncome =
    500000 + selectedMonth * 30000 + Math.floor(Math.random() * 100000);
  const fakeProfit = Math.floor(fakeIncome * (0.3 + Math.random() * 0.2));
  const incomeData = [
    { label: "Income", value: fakeIncome, color: "#22c55e" },
    { label: "Profit", value: fakeProfit, color: "#3b82f6" },
  ];
  const total = incomeData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6 flex flex-col items-center min-h-[220px] w-full">
      <div className="w-full flex flex-col items-center">
        {/* Month filter form */}
        <form
          className="mb-4 flex items-center gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <label
            htmlFor="month"
            className="text-sm font-medium text-haven-blue"
          >
            Month:
          </label>
          <select
            id="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-haven-blue"
          >
            {months.map((m, idx) => (
              <option key={m} value={idx}>
                {m}
              </option>
            ))}
          </select>
          <span className="text-xs text-gray-400">2025</span>
        </form>
        <div className="text-lg font-semibold text-haven-blue mb-2">
          Income & Profit ({months[selectedMonth]})
        </div>
        <div className="relative w-40 h-40 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={incomeData}
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
                {incomeData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [
                  `₦${value.toLocaleString()}`,
                  name,
                ]}
                contentStyle={{
                  borderRadius: 8,
                  boxShadow: "0 2px 8px #0001",
                  background: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center total */}
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center pointer-events-none">
            <span className="text-sm font-bold text-slate-gray">Total</span>
            <span className="text-xs font-bold text-green-600">
              ₦{total.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Legend with color circles and labels */}
        <div className="flex flex-wrap gap-4 justify-center mt-2">
          {incomeData.map((d) => (
            <div
              key={d.label}
              className="flex items-center gap-2 text-sm text-slate-gray"
            >
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ background: d.color }}
              ></span>
              <span>
                {d.label}:{" "}
                <span className="font-bold">₦{d.value.toLocaleString()}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
