"use client";
import React, { useState } from "react";
import { FaHeartPulse } from "react-icons/fa6";
import { stepOneValidationSchema } from "@schema/client/booking/ValidationSchema";
import { MediumBtn } from "@components/core/button";

const StepOne = ({ values, goToNextStep, setFormValues }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => {
      let updated = { ...prev, [name]: value };

      // Reset dependent fields
      if (name === "care_duration") {
        updated.care_duration_value = "";
        updated.care_type = "";
        updated.accommodation = "No";
        updated.meal = "No";
        updated.num_of_meals = "";
      }

      if (name === "care_duration_value") {
        updated.care_type = "";
        updated.accommodation = "No";
        updated.meal = "No";
        updated.num_of_meals = "";
      }

      if (name === "care_type") {
        updated.accommodation = "No";
        updated.meal = "No";
        updated.num_of_meals = "";
      }

      if (name === "accommodation" && value === "No") {
        // Reset accommodation dependent fields if any
      }

      if (name === "meal" && value === "No") {
        updated.num_of_meals = "";
      }

      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form values:", values); // Debug log

    try {
      await stepOneValidationSchema.validate(values, { abortEarly: false });
      goToNextStep();
    } catch (err) {
      console.log("Yup validation error:", err); // Debug log
      const formattedErrors = {};

      // Ensure it's a Yup ValidationError and has inner errors
      if (err.name === "ValidationError" && Array.isArray(err.inner)) {
        err.inner.forEach((error) => {
          if (error.path) {
            formattedErrors[error.path] = error.message;
          }
        });
      } else if (err.path) {
        // Handle single error case
        formattedErrors[err.path] = err.message;
      }

      setErrors(formattedErrors);
    }
  };

  const isLiveIn24 =
    values.care_duration === "Shift" &&
    values.care_duration_value === "24" &&
    values.care_type === "Live-in";

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="bg-light-pink-bg text-dark-pink-border px-4 py-2 rounded-md text-center w-full max-w-4xl">
        Let’s get started with your booking
      </div>

      <FaHeartPulse className="text-red-500 mb-4" size={120} />

      <form onSubmit={handleSubmit} className="w-full max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* care_duration */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Care Duration
            </label>
            <select
              name="care_duration"
              value={values.care_duration}
              onChange={handleChange}
              className="steper-form-input"
            >
              <option value="">Select</option>
              <option value="Hourly">Hourly</option>
              <option value="Shift">Shift</option>
            </select>
            {errors.care_duration && (
              <p className="text-red-500 text-sm">{errors.care_duration}</p>
            )}
          </div>

          {/* care_duration_value */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Duration Value
            </label>
            <select
              name="care_duration_value"
              value={values.care_duration_value}
              onChange={handleChange}
              className="steper-form-input"
            >
              <option value="">Select</option>
              {values.care_duration === "Shift" && (
                <>
                  <option value="8">8 hrs</option>
                  <option value="12">12 hrs</option>
                  <option value="24">24 hrs(live-in)</option>
                </>
              )}
              {values.care_duration === "Hourly" && (
                <>
                  <option value="1">1 hrs</option>
                  <option value="2">2 hrs</option>
                  <option value="3">3 hrs</option>
                </>
              )}
            </select>
            {errors.care_duration_value && (
              <p className="text-red-500 text-sm">
                {errors.care_duration_value}
              </p>
            )}
          </div>

          {/* care_type */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Care Type
            </label>
            <select
              name="care_type"
              value={values.care_type}
              onChange={handleChange}
              className="steper-form-input"
            >
              <option value="">Select</option>
              {values.care_duration === "Shift" &&
                values.care_duration_value === "24" && (
                  <option value="Live-in">Live-in</option>
                )}
              {values.care_duration === "Shift" &&
                ["8", "12"].includes(values.care_duration_value) && (
                  <option value="Live-out">Live-out</option>
                )}
              {values.care_duration === "Hourly" && (
                <option value="Live-out">Live-out</option>
              )}
            </select>
            {errors.care_type && (
              <p className="text-red-500 text-sm">{errors.care_type}</p>
            )}
          </div>

          {/* Conditional Fields */}
          {isLiveIn24 && (
            <>
              {/* accommodation */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Accommodation
                </label>
                <select
                  name="accommodation"
                  value={values.accommodation}
                  onChange={handleChange}
                  className="steper-form-input"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.accommodation && (
                  <p className="text-red-500 text-sm">{errors.accommodation}</p>
                )}
              </div>

              {/* meal */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Meal
                </label>
                <select
                  name="meal"
                  value={values.meal}
                  onChange={handleChange}
                  className="steper-form-input"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.meal && (
                  <p className="text-red-500 text-sm">{errors.meal}</p>
                )}
              </div>

              {/* num_of_meals */}
              {values.meal === "Yes" && (
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Number of Meals
                  </label>
                  <select
                    name="num_of_meals"
                    value={values.num_of_meals}
                    onChange={handleChange}
                    className="steper-form-input"
                  >
                    <option value="">Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                  {errors.num_of_meals && (
                    <p className="text-red-500 text-sm">
                      {errors.num_of_meals}
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        <div className="mt-6 text-center">
          <MediumBtn text="Next" color="carerBlue" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default StepOne;
