"use client";
import React, { useState, useEffect, useCallback } from "react";
import { FaHeartPulse, FaRepeat } from "react-icons/fa6";
import { MediumBtn } from "@components/core/button";
import { StepThreeValidationSchema } from "@schema/client/booking/ValidationSchema";
import CustomSelect from "@components/core/CustomSelect";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  return `${d}-${m}-${y}`;
};

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

  const setFieldValue = useCallback(
    (fieldName, fieldValue) => {
      setFormValues((prev) => ({ ...prev, [fieldName]: fieldValue }));
    },
    [setFormValues]
  );

  const calculateEndTime = useCallback(() => {
    const { start_time, start_time_period, care_duration, care_duration_value } = values;

    if (!start_time || !start_time_period) return;

    const timeMatch = start_time.match(/^(\d{1,2}):(\d{2})$/);
    if (!timeMatch) return;

    let hours = parseInt(timeMatch[1], 10);
    const minutes = timeMatch[2];

    if (care_duration === "Shift" && care_duration_value === "24") {
      setFieldValue("end_time", start_time);
      setFieldValue("end_time_period", start_time_period);
      return;
    }

    const hourlyDurations = ["1", "2", "3", "8", "12"];
    if (hourlyDurations.includes(care_duration_value)) {
      const durationHours = parseInt(care_duration_value, 10);

      let hour24 = hours;
      if (start_time_period === "PM" && hours !== 12) hour24 = hours + 12;
      else if (start_time_period === "AM" && hours === 12) hour24 = 0;

      let endHour24 = hour24 + durationHours;
      if (endHour24 >= 24) endHour24 = endHour24 - 24;

      const endPeriod = endHour24 >= 12 ? "PM" : "AM";
      let endHour12 = endHour24 % 12;
      if (endHour12 === 0) endHour12 = 12;

      setFieldValue("end_time", `${endHour12}:${minutes}`);
      setFieldValue("end_time_period", endPeriod);
    }
  }, [values, setFieldValue]);

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
      console.log("Yup validation error:", err);
      const validationErrors = {};
      if (err.inner) {
        err.inner.forEach((e) => {
          validationErrors[e.path] = e.message;
        });
      }
      setErrors(validationErrors);
    }
  };

  const inputClass =
    "w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-2.5 text-sm text-slate-gray outline-none transition-all duration-200 focus:border-carer-blue focus:ring-2 focus:ring-carer-blue/20 focus:bg-white";

  const occurrenceOptions = [2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20, 25, 30].map((n) => ({
    value: String(n),
    label: `${n} times`,
  }));

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Banner */}
      <div className="bg-light-blue-bg text-dark-blue-border px-4 py-2 rounded-md text-center w-full max-w-4xl text-sm font-medium border border-blue-200">
        You&apos;re doing great! Let&apos;s set your schedule.
      </div>

      <FaHeartPulse className="text-carer-blue" size={80} />

      {/* Form card */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-3xl border border-gray-100 p-6 flex flex-col gap-6">

        {/* Date & Time */}
        <div>
          <p className="text-xs font-semibold text-slate-gray uppercase tracking-wider mb-3">
            Date &amp; Time
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Start Date */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                value={values.start_date || ""}
                onChange={handleChange}
                className={inputClass}
              />
              {errors.start_date && (
                <p className="text-danger-red text-xs mt-1">{errors.start_date}</p>
              )}
            </div>

            {/* End Date */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                value={values.end_date || ""}
                onChange={handleChange}
                className={inputClass}
              />
              {errors.end_date && (
                <p className="text-danger-red text-xs mt-1">{errors.end_date}</p>
              )}
            </div>

            {/* Start Time */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Start Time
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="start_time"
                  name="start_time"
                  value={values.start_time || ""}
                  onChange={handleChange}
                  placeholder="HH:mm"
                  maxLength={5}
                  className={`${inputClass} flex-1`}
                />
                <select
                  name="start_time_period"
                  value={values.start_time_period || "AM"}
                  onChange={handleChange}
                  className="border border-gray-200 bg-gray-50 rounded-lg px-3 py-2.5 text-sm text-slate-gray outline-none transition-all duration-200 focus:border-carer-blue focus:ring-2 focus:ring-carer-blue/20 focus:bg-white"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
              {errors.start_time && (
                <p className="text-danger-red text-xs mt-1">{errors.start_time}</p>
              )}
            </div>

            {/* End Time (auto-calculated) */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                End Time
                <span className="ml-1.5 text-xs font-normal text-gray-400">(auto-calculated)</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="end_time"
                  name="end_time"
                  value={values.end_time || ""}
                  readOnly
                  placeholder="HH:mm"
                  className={`${inputClass} flex-1 cursor-not-allowed opacity-70`}
                />
                <div className="border border-gray-200 bg-gray-50 rounded-lg px-3 py-2.5 text-sm text-slate-gray opacity-70 select-none">
                  {values.end_time_period || "AM"}
                </div>
              </div>
              {errors.end_time && (
                <p className="text-danger-red text-xs mt-1">{errors.end_time}</p>
              )}
            </div>
          </div>
        </div>

        {/* Recurring Booking */}
        <div className="pt-5 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-light-blue-bg rounded-lg">
              <FaRepeat className="text-carer-blue text-sm" />
            </div>
            <p className="text-xs font-semibold text-slate-gray uppercase tracking-wider">
              Recurring Booking
            </p>
          </div>

          {/* Is Recurring */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Would you like this appointment to repeat?
            </label>
            <div className="flex gap-3">
              {[
                { value: "No", label: "No, one-time only" },
                { value: "Yes", label: "Yes, repeat this booking" },
              ].map(({ value, label }) => (
                <label
                  key={value}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all duration-150 text-sm
                    ${values.is_recurring === value
                      ? "bg-light-blue-bg text-dark-blue-border border-carer-blue font-medium"
                      : "bg-gray-50 text-slate-gray border-gray-200 hover:border-carer-blue"
                    }`}
                >
                  <input
                    type="radio"
                    name="is_recurring"
                    value={value}
                    checked={values.is_recurring === value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  {label}
                </label>
              ))}
            </div>
            {errors.is_recurring && (
              <p className="text-danger-red text-xs mt-1">{errors.is_recurring}</p>
            )}
          </div>

          {/* Recurring Options */}
          {values.is_recurring === "Yes" && (
            <div className="space-y-5 pt-4 border-t border-gray-100">
              {/* Recurrence Type */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  How often should this repeat?
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Daily", "Weekly", "Monthly"].map((type) => (
                    <label
                      key={type}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all duration-150 text-sm
                        ${values.recurrence_type === type
                          ? "bg-light-blue-bg text-dark-blue-border border-carer-blue font-medium"
                          : "bg-gray-50 text-slate-gray border-gray-200 hover:border-carer-blue"
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
                      {type}
                    </label>
                  ))}
                </div>
                {errors.recurrence_type && (
                  <p className="text-danger-red text-xs mt-1">{errors.recurrence_type}</p>
                )}
              </div>

              {/* Weekly Days */}
              {values.recurrence_type === "Weekly" && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Which days of the week?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {WEEKDAYS.map((day) => (
                      <label
                        key={day}
                        className={`flex items-center justify-center px-3 py-2 rounded-lg border cursor-pointer transition-all duration-150 min-w-[56px]
                          ${values.recurrence_days?.includes(day)
                            ? "bg-light-blue-bg text-dark-blue-border border-carer-blue font-medium"
                            : "bg-gray-50 text-slate-gray border-gray-200 hover:border-carer-blue"
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
                    <p className="text-danger-red text-xs mt-1">{errors.recurrence_days}</p>
                  )}
                </div>
              )}

              {/* Recurrence End Type */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  When should the recurring appointments end?
                </label>
                <div className="flex flex-wrap gap-3 mb-3">
                  {[
                    { value: "date", label: "On a specific date" },
                    { value: "occurrences", label: "After a number of occurrences" },
                  ].map(({ value, label }) => (
                    <label
                      key={value}
                      className="flex items-center gap-2 cursor-pointer text-sm text-slate-gray"
                    >
                      <input
                        type="radio"
                        name="recurrence_end_type"
                        value={value}
                        checked={values.recurrence_end_type === value}
                        onChange={handleChange}
                        className="w-4 h-4 accent-carer-blue"
                      />
                      {label}
                    </label>
                  ))}
                </div>

                {values.recurrence_end_type === "date" && (
                  <div className="max-w-xs">
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      End recurring on
                    </label>
                    <input
                      type="date"
                      name="recurrence_end_date"
                      value={values.recurrence_end_date || ""}
                      onChange={handleChange}
                      min={values.start_date}
                      className={inputClass}
                    />
                    {errors.recurrence_end_date && (
                      <p className="text-danger-red text-xs mt-1">{errors.recurrence_end_date}</p>
                    )}
                  </div>
                )}

                {values.recurrence_end_type === "occurrences" && (
                  <div className="max-w-xs">
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Number of occurrences
                    </label>
                    <CustomSelect
                      name="recurrence_occurrences"
                      value={String(values.recurrence_occurrences || "")}
                      onChange={handleChange}
                      options={occurrenceOptions}
                      placeholder="Select occurrences"
                    />
                    {errors.recurrence_occurrences && (
                      <p className="text-danger-red text-xs mt-1">{errors.recurrence_occurrences}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Summary */}
              {values.recurrence_type && (
                <div className="p-3 bg-light-blue-bg border border-blue-200 rounded-lg">
                  <p className="text-sm text-dark-blue-border">
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
                      ? ` until ${formatDate(values.recurrence_end_date)}`
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
      </div>

      {/* Navigation */}
      <div className="flex justify-between w-full max-w-4xl">
        <MediumBtn text="Back" color="gray" onClick={goToPrevStep} />
        <MediumBtn text="Next" color="carerBlue" onClick={handleNext} />
      </div>
    </div>
  );
};

export default StepThree;
