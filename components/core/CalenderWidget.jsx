"use client";

import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // CHANGED: store multiple selected dates
  const [selectedDates, setSelectedDates] = useState([]);

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  // UPDATED: toggle date selection
  const today = new Date();
  const handleDateClick = (date) => {
    // Only allow future dates (today or after)
    if (date < today.setHours(0, 0, 0, 0)) return;

    const alreadySelected = selectedDates.some((d) => isSameDay(d, date));
    if (alreadySelected) {
      setSelectedDates((prev) => prev.filter((d) => !isSameDay(d, date)));
    } else {
      setSelectedDates((prev) => [...prev, date]);
    }

    console.log(
      "Selected Dates:",
      [
        ...(alreadySelected
          ? selectedDates.filter((d) => !isSameDay(d, date))
          : [...selectedDates, date]),
      ].map((d) => format(d, "yyyy-MM-dd"))
    );
  };

  const renderHeader = () => (
    <div className="flex items-center justify-between p-4 border-b">
      <button
        onClick={handlePrevMonth}
        className="text-tranquil-teal hover:text-ever-green"
      >
        <FaChevronLeft />
      </button>
      <h2 className="text-md font-bold text-tranquil-teal">
        {format(currentDate, "MMMM yyyy")}
      </h2>
      <button
        onClick={handleNextMonth}
        className="text-tranquil-teal hover:text-ever-green"
      >
        <FaChevronRight />
      </button>
    </div>
  );

  const renderDays = () => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="grid grid-cols-7 gap-2 py-2">
        {dayNames.map((day, i) => (
          <div key={i} className="text-xs font-bold text-center text-gray-500">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, "d");
        const cloneDay = day;
        const isCurrentMonth = isSameMonth(day, monthStart);

        // Check if day is in selectedDates
        const isSelected = selectedDates.some((d) => isSameDay(d, cloneDay));
        const isPast = cloneDay < today.setHours(0, 0, 0, 0);

        days.push(
          <div
            key={day.toString()}
            className={`text-center text-sm p-1 rounded-lg transition-all duration-150
              ${!isCurrentMonth ? "text-gray-300" : "text-gray-700"}
              ${
                isSelected ? "bg-tranquil-teal text-white" : "hover:bg-gray-100"
              }
              ${isPast ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
            onClick={() => handleDateClick(cloneDay)}
          >
            {formattedDate}
          </div>
        );

        day = addDays(day, 1);
      }

      rows.push(
        <div className="grid grid-cols-7 gap-2" key={day.toString()}>
          {days}
        </div>
      );

      days = [];
    }

    return <div className="space-y-1 py-1 font-semibold">{rows}</div>;
  };

  return (
    <>
      {renderHeader()}
      <div className="px-2">
        {renderDays()}
        {renderCells()}
      </div>
    </>
  );
};

export default CalendarWidget;
