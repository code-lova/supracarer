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
  isToday,
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
  const [selectedDates, setSelectedDates] = useState([]);

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

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
      const previousDates = [...selectedDates];
      const toggledDate = new Date(date);

      const isCurrentlySelected = selectedDates.some((d) =>
        isSameDay(d, toggledDate)
      );

      if (isCurrentlySelected) {
        setSelectedDates((prev) =>
          prev.filter((d) => !isSameDay(d, toggledDate))
        );
      } else {
        setSelectedDates((prev) => [...prev, toggledDate]);
      }

      return { previousDates };
    },
    onSuccess: (data) => {
      const isRemoving = data.status === "removed";
      toast.success(
        isRemoving
          ? "You're now available on this date"
          : "Marked as unavailable",
        { duration: 2000 }
      );
    },
    onError: (err, variables, context) => {
      if (context?.previousDates) {
        setSelectedDates(context.previousDates);
      }
      toast.error("Something went wrong. Try again.");
    },
  });

  const handleDateClick = (date) => {
    const dateToCheck = new Date(date);
    dateToCheck.setHours(0, 0, 0, 0);

    if (dateToCheck < today) return;
    if (mutation.isPending) return;

    const formatted = format(date, "yyyy-MM-dd");
    mutation.mutate({ date: formatted });
  };

  const renderHeader = () => (
    <div className="flex items-center justify-between px-2 py-3">
      <button
        onClick={handlePrevMonth}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-tranquil-teal/10 text-tranquil-teal transition-colors"
      >
        <FaChevronLeft className="w-3 h-3" />
      </button>
      <h2 className="text-sm font-bold text-gray-800">
        {format(currentDate, "MMMM yyyy")}
      </h2>
      <button
        onClick={handleNextMonth}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-tranquil-teal/10 text-tranquil-teal transition-colors"
      >
        <FaChevronRight className="w-3 h-3" />
      </button>
    </div>
  );

  const renderDays = () => {
    const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    return (
      <div className="grid grid-cols-7 gap-1 mb-1">
        {dayNames.map((day, i) => (
          <div
            key={i}
            className="text-[10px] font-semibold text-center text-gray-400 uppercase tracking-wide py-1"
          >
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
        const cloneDay = new Date(day);
        cloneDay.setHours(0, 0, 0, 0);
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isSelected = selectedDates.some((d) => isSameDay(d, cloneDay));
        const isTodayDate = isToday(day);
        const isPast = cloneDay < today;

        days.push(
          <div
            key={day.toString()}
            onClick={() => !isPast && handleDateClick(cloneDay)}
            className={`
              relative flex items-center justify-center
              w-8 h-8 mx-auto text-xs font-medium rounded-full
              transition-all duration-200 select-none
              ${!isCurrentMonth ? "text-gray-300" : ""}
              ${
                isPast && isCurrentMonth
                  ? "text-gray-300 cursor-not-allowed"
                  : ""
              }
              ${
                !isPast && isCurrentMonth && !isSelected
                  ? "text-gray-700 hover:bg-tranquil-teal/10 cursor-pointer"
                  : ""
              }
              ${
                isSelected && isCurrentMonth
                  ? "bg-red-100 text-red-600 ring-2 ring-red-200"
                  : ""
              }
              ${
                isTodayDate && !isSelected
                  ? "bg-tranquil-teal text-white font-bold"
                  : ""
              }
              ${isTodayDate && isSelected ? "ring-2 ring-tranquil-teal" : ""}
              ${mutation.isPending ? "pointer-events-none" : ""}
            `}
          >
            {formattedDate}
            {isSelected && isCurrentMonth && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </div>
        );

        day = addDays(day, 1);
      }

      rows.push(
        <div className="grid grid-cols-7 gap-1" key={day.toString()}>
          {days}
        </div>
      );

      days = [];
    }

    return <div className="space-y-1">{rows}</div>;
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-3">
          <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
          <div className="grid grid-cols-7 gap-2">
            {[...Array(35)].map((_, i) => (
              <div
                key={i}
                className="h-8 w-8 bg-gray-100 rounded-full mx-auto"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2">
      {renderHeader()}
      {renderDays()}
      {renderCells()}

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-center gap-4 text-[10px]">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-tranquil-teal"></div>
            <span className="text-gray-500">Today</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-100 ring-1 ring-red-200 relative">
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            </div>
            <span className="text-gray-500">Unavailable</span>
          </div>
        </div>
        <p className="text-[10px] text-gray-400 text-center mt-2">
          Click on a date to toggle availability
        </p>
      </div>
    </div>
  );
};

export default CalendarWidget;
