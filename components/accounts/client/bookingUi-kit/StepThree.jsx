"use client";
import React, { useState, useEffect, useCallback } from "react";
import { FaHeartPulse, FaRepeat } from "react-icons/fa6";
import { MediumBtn } from "@components/core/button";
import { StepThreeValidationSchema } from "@schema/client/booking/ValidationSchema";

const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const StepThree = ({
  values,
  handleChange,
  setFormValues,
  goToNextStep,
  goToPrevStep,
}) => {
  const [errors, setErrors] = useState({});

  /**
   * Helper function to set a specific field value
   */
  const setFieldValue = useCallback(
    (fieldName, fieldValue) => {
      setFormValues((prev) => ({
        ...prev,
        [fieldName]: fieldValue,
      }));
    },
    [setFormValues]
  );

  /**
   * Calculate and auto-populate end time based on start time and care duration
   */
  const calculateEndTime = useCallback(() => {
    const { start_time, start_time_period, care_duration, care_duration_value } =
      values;

    // Only calculate if we have start time and period
    if (!start_time || !start_time_period) return;

    // Validate time format (HH:mm)
    const timeMatch = start_time.match(/^(\d{1,2}):(\d{2})$/);
    if (!timeMatch) return;

    let hours = parseInt(timeMatch[1], 10);
    const minutes = timeMatch[2];

    // For 24-hour shift: end time is same as start time
    if (care_duration === "Shift" && care_duration_value === "24") {
      setFieldValue("end_time", start_time);
      setFieldValue("end_time_period", start_time_period);
      return;
    }

    // For hourly durations (1, 2, 3, 8, 12 hours)
    const hourlyDurations = ["1", "2", "3", "8", "12"];
    if (hourlyDurations.includes(care_duration_value)) {
      const durationHours = parseInt(care_duration_value, 10);

      // Convert to 24-hour format for calculation
      let hour24 = hours;
      if (start_time_period === "PM" && hours !== 12) {
        hour24 = hours + 12;
      } else if (start_time_period === "AM" && hours === 12) {
        hour24 = 0;
      }

      // Add duration hours
      let endHour24 = hour24 + durationHours;

      // Handle day overflow (keep within same day for hourly)
      if (endHour24 >= 24) {
        endHour24 = endHour24 - 24;
      }

      // Determine end time period (AM/PM)
      let endPeriod;
      if (endHour24 >= 12) {
        endPeriod = "PM";
      } else {
        endPeriod = "AM";
      }

      // Convert back to 12-hour format
      let endHour12 = endHour24 % 12;
      if (endHour12 === 0) endHour12 = 12;

      // Format end time
      const endTime = `${endHour12}:${minutes}`;

      setFieldValue("end_time", endTime);
      setFieldValue("end_time_period", endPeriod);
    }
  }, [values, setFieldValue]);

  // Auto-calculate end time when start time or period changes
  useEffect(() => {
    calculateEndTime();
  }, [
    values.start_time,
    values.start_time_period,
    values.care_duration,
    values.care_duration_value,
    calculateEndTime,
  ]);

  const handleNext = async () => {
    //console.log("Form values:", values); // Debug log

    try {
      await StepThreeValidationSchema.validate(values, {
        abortEarly: false,
        context: {
          care_duration_value: values.care_duration_value,
          care_duration: values.care_duration,
        },
      });
      setErrors({});
      goToNextStep();
    } catch (err) {
      console.log("Yup validation error:", err); // Debug log
      const validationErrors = {};
      if (err.inner) {
        err.inner.forEach((e) => {
          validationErrors[e.path] = e.message;
        });
      }
      setErrors(validationErrors);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Greeting banner */}
      <div className="bg-green-100 text-green-700 py-2 px-4 rounded mb-4 text-center w-full max-w-md">
        You're doing great! Let's set your schedule.
      </div>

      {/* Heart Icon */}
      <FaHeartPulse className="text-green-600 mb-6" size={120} />

      {/* Form layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
        {/* Start Date */}
        <div className="flex flex-col">
          <label htmlFor="start_date" className="text-sm font-semibold mb-1">
            Start Date
          </label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            value={values.start_date || ""}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
          {errors.start_date && (
            <p className="text-red-500 text-sm mt-1">{errors.start_date}</p>
          )}
        </div>

        {/* End Date */}
        <div className="flex flex-col">
          <label htmlFor="end_date" className="text-sm font-semibold mb-1">
            End Date
          </label>
          <input
            type="date"
            id="end_date"
            name="end_date"
            value={values.end_date || ""}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
          {errors.end_date && (
            <p className="text-red-500 text-sm mt-1">{errors.end_date}</p>
          )}
        </div>

        {/* Start Time Custom Input */}
        <div className="flex flex-col">
          <label htmlFor="start_time" className="text-sm font-semibold mb-1">
            Start Time
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              id="start_time"
              name="start_time"
              value={values.start_time || ""}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2"
              style={{ width: "120px" }}
              placeholder="HH:mm"
              pattern="^([0-1]\d|2[0-3]):([0-5]\d)$"
              maxLength={5}
            />
            <select
              name="start_time_period"
              value={values.start_time_period || "AM"}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-2 py-2"
              style={{ width: "70px" }}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
          {errors.start_time && (
            <p className="text-red-500 text-sm mt-1">{errors.start_time}</p>
          )}
        </div>

        {/* End Time Custom Input */}
        <div className="flex flex-col">
          <label htmlFor="end_time" className="text-sm font-semibold mb-1">
            End Time
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              id="end_time"
              name="end_time"
              value={values.end_time || ""}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2"
              style={{ width: "120px" }}
              placeholder="HH:mm"
              pattern="^([0-1]\d|2[0-3]):([0-5]\d)$"
              maxLength={5}
            />
            <select
              name="end_time_period"
              value={values.end_time_period || "AM"}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-2 py-2"
              style={{ width: "70px" }}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
          {errors.end_time && (
            <p className="text-red-500 text-sm mt-1">{errors.end_time}</p>
          )}
        </div>
      </div>

      {/* Recurring Booking Section */}
      <div className="w-full max-w-3xl mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FaRepeat className="text-blue-600 text-lg" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            Recurring Booking
          </h3>
        </div>

        {/* Is Recurring Toggle */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Would you like this appointment to repeat?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="is_recurring"
                value="No"
                checked={values.is_recurring === "No"}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-600">No, one-time only</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="is_recurring"
                value="Yes"
                checked={values.is_recurring === "Yes"}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-600">Yes, repeat this booking</span>
            </label>
          </div>
          {errors.is_recurring && (
            <p className="text-red-500 text-sm mt-1">{errors.is_recurring}</p>
          )}
        </div>

        {/* Recurring Options - Only show if is_recurring is Yes */}
        {values.is_recurring === "Yes" && (
          <div className="space-y-4 pt-4 border-t border-blue-200">
            {/* Recurrence Type */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                How often should this repeat?
              </label>
              <div className="flex flex-wrap gap-3">
                {["Daily", "Weekly", "Monthly"].map((type) => (
                  <label
                    key={type}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all ${
                      values.recurrence_type === type
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="recurrence_type"
                      value={type}
                      checked={values.recurrence_type === type}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="text-sm font-medium">{type}</span>
                  </label>
                ))}
              </div>
              {errors.recurrence_type && (
                <p className="text-red-500 text-sm mt-1">{errors.recurrence_type}</p>
              )}
            </div>

            {/* Weekly Days Selection */}
            {values.recurrence_type === "Weekly" && (
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Which days of the week?
                </label>
                <div className="flex flex-wrap gap-2">
                  {WEEKDAYS.map((day) => (
                    <label
                      key={day}
                      className={`flex items-center justify-center px-3 py-2 rounded-lg border cursor-pointer transition-all min-w-[80px] ${
                        values.recurrence_days?.includes(day)
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="recurrence_days"
                        value={day}
                        checked={values.recurrence_days?.includes(day)}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span className="text-xs font-medium">{day.slice(0, 3)}</span>
                    </label>
                  ))}
                </div>
                {errors.recurrence_days && (
                  <p className="text-red-500 text-sm mt-1">{errors.recurrence_days}</p>
                )}
              </div>
            )}

            {/* Recurrence End Type */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                When should the recurring appointments end?
              </label>
              <div className="flex flex-wrap gap-4 mb-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="recurrence_end_type"
                    value="date"
                    checked={values.recurrence_end_type === "date"}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-600">On a specific date</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="recurrence_end_type"
                    value="occurrences"
                    checked={values.recurrence_end_type === "occurrences"}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-600">After a number of occurrences</span>
                </label>
              </div>

              {/* End Date Input */}
              {values.recurrence_end_type === "date" && (
                <div className="mt-2">
                  <label className="text-sm text-gray-600 mb-1 block">
                    End recurring on:
                  </label>
                  <input
                    type="date"
                    name="recurrence_end_date"
                    value={values.recurrence_end_date || ""}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-xs"
                    min={values.start_date}
                  />
                  {errors.recurrence_end_date && (
                    <p className="text-red-500 text-sm mt-1">{errors.recurrence_end_date}</p>
                  )}
                </div>
              )}

              {/* Occurrences Input */}
              {values.recurrence_end_type === "occurrences" && (
                <div className="mt-2">
                  <label className="text-sm text-gray-600 mb-1 block">
                    Number of occurrences:
                  </label>
                  <select
                    name="recurrence_occurrences"
                    value={values.recurrence_occurrences || ""}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-xs"
                  >
                    <option value="">Select occurrences</option>
                    {[2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20, 25, 30].map((num) => (
                      <option key={num} value={num}>
                        {num} times
                      </option>
                    ))}
                  </select>
                  {errors.recurrence_occurrences && (
                    <p className="text-red-500 text-sm mt-1">{errors.recurrence_occurrences}</p>
                  )}
                </div>
              )}
            </div>

            {/* Recurring Summary */}
            {values.recurrence_type && (
              <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Summary:</strong>{" "}
                  {values.recurrence_type === "Daily" && "This appointment will repeat every day"}
                  {values.recurrence_type === "Weekly" &&
                    `This appointment will repeat every week on ${
                      values.recurrence_days?.length > 0
                        ? values.recurrence_days.join(", ")
                        : "selected days"
                    }`}
                  {values.recurrence_type === "Monthly" &&
                    "This appointment will repeat every month on the same date"}
                  {values.recurrence_end_type === "date" && values.recurrence_end_date
                    ? ` until ${values.recurrence_end_date}`
                    : ""}
                  {values.recurrence_end_type === "occurrences" && values.recurrence_occurrences
                    ? ` for ${values.recurrence_occurrences} occurrences`
                    : ""}
                  .
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between w-full max-w-3xl mt-6">
        <MediumBtn text="Back" color="gray" onClick={goToPrevStep} />

        <MediumBtn text="Next" color="carerBlue" onClick={handleNext} />
      </div>
    </div>
  );
};

export default StepThree;
