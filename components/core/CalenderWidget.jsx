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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  toggleUnavailableDate,
  getUnavailableDates,
} from "@service/request/healthworker/dasboard";
import toast from "react-hot-toast";

const CalendarWidget = () => {
  const queryClient = useQueryClient();
  const [currentDate, setCurrentDate] = useState(new Date());
  // CHANGED: store multiple selected dates
  const [selectedDates, setSelectedDates] = useState([]);

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  // UPDATED: toggle date selection
  const today = new Date();

  // Fetch existing unavailable dates
  const { data: unavailableDates = [], isLoading } = useQuery({
    queryKey: ["unavailableDates"],
    queryFn: getUnavailableDates,
    staleTime: 1000 * 60 * 5,
  });

  // Convert to Date objects for internal use
  React.useEffect(() => {
    if (unavailableDates.length > 0) {
      setSelectedDates(unavailableDates.map((date) => new Date(date)));
    }
  }, [unavailableDates]);

  const mutation = useMutation({
    mutationFn: toggleUnavailableDate,
    onMutate: async ({ date }) => {
      await queryClient.cancelQueries(["unavailableDates"]);

      const previousDates =
        queryClient.getQueryData(["unavailableDates"]) || [];

      const isRemoving = previousDates.includes(date);
      const newDates = isRemoving
        ? previousDates.filter((d) => d !== date)
        : [...previousDates, date];

      queryClient.setQueryData(["unavailableDates"], newDates);

      return { previousDates };
    },
    onSuccess: (data) => {
      const toggledDate = new Date(data.date);
      const isRemoving = data.status === "removed";

      setSelectedDates((prev) => {
        if (isRemoving) {
          return prev.filter((d) => !isSameDay(d, toggledDate));
        } else {
          return [...prev, toggledDate];
        }
      });
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(["unavailableDates"], context.previousDates);
      toast.error("Something went wrong. Try again.");
    },
  });

  const handleDateClick = (date) => {
    // Only allow future dates (today or after)
    if (date < today.setHours(0, 0, 0, 0)) return;

    const formatted = format(date, "yyyy-MM-dd");

    // Optimistically toggle state while waiting for response
    mutation.mutate({ date: formatted });
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
              ${!isCurrentMonth ? "text-gray-300" : "text-slate-gray"}
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

  if (isLoading || mutation.isPending) {
    return (
      <div className="p-4 text-gray-400 animate-pulse">Loading calendar...</div>
    );
  }

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
