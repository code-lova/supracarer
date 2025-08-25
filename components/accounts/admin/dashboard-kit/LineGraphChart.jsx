"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", appointments: 120 },
  { month: "Feb", appointments: 150 },
  { month: "Mar", appointments: 180 },
  { month: "Apr", appointments: 140 },
  { month: "May", appointments: 200 },
  { month: "Jun", appointments: 220 },
  { month: "Jul", appointments: 210 },
  { month: "Aug", appointments: 250 },
  { month: "Sep", appointments: 230 },
  { month: "Oct", appointments: 190 },
  { month: "Nov", appointments: 170 },
  { month: "Dec", appointments: 160 },
];

export default function LineGraphChart() {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6 flex flex-col items-center justify-center min-h-[320px] w-full">
      <div className="w-full">
        <div className="text-lg font-semibold text-gray-700 mb-2">Appointments per Month (2025)</div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="appointments" stroke="#6366f1" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
