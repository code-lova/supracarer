"use client";
import React, { useState } from "react";
import { FaHeartPulse } from "react-icons/fa6";
import { MediumBtn } from "@components/core/button";
import { StepThreeValidationSchema } from "@schema/client/booking/ValidationSchema";

const StepThree = ({ values, handleChange, goToNextStep, goToPrevStep }) => {
  const [errors, setErrors] = useState({});

  const handleNext = async () => {
    console.log("Form values:", values); // Debug log

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

      {/* Navigation Buttons */}
      <div className="flex justify-between w-full max-w-3xl mt-6">
        <MediumBtn text="Back" color="gray" onClick={goToPrevStep} />

        <MediumBtn text="Next" color="darkblue" onClick={handleNext} />
      </div>
    </div>
  );
};

export default StepThree;
