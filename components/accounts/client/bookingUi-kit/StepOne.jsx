"use client";
import React, { useState } from "react";
import { FaHeartPulse } from "react-icons/fa6";
import { stepOneValidationSchema } from "@schema/client/booking/ValidationSchema";
import { MediumBtn, NormalBtn } from "@components/core/button";
import CustomSelect from "@components/core/CustomSelect";

const StepOne = ({ values, goToNextStep, setFormValues, userDetails }) => {
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

  const durationValueOptions =
    values.care_duration === "Shift"
      ? [
          { value: "8", label: "8 hours" },
          { value: "12", label: "12 hours" },
          { value: "24", label: "24 hours (live-in)" },
        ]
      : values.care_duration === "Hourly"
      ? [
          { value: "1", label: "1 hour" },
          { value: "2", label: "2 hours" },
          { value: "3", label: "3 hours" },
        ]
      : [];

  const careTypeOptions =
    values.care_duration === "Shift" && values.care_duration_value === "24"
      ? [{ value: "Live-in", label: "Live-in" }]
      : values.care_duration === "Shift" &&
        ["8", "12"].includes(values.care_duration_value)
      ? [{ value: "Live-out", label: "Live-out" }]
      : values.care_duration === "Hourly"
      ? [{ value: "Live-out", label: "Live-out" }]
      : [];

  const yesNoOptions = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Header banner */}
      <div className="bg-light-blue-bg text-dark-blue-border px-4 py-2 rounded-md text-center w-full max-w-4xl text-sm font-medium border border-blue-200">
        Let&apos;s get started with your booking
      </div>

      <FaHeartPulse className="text-carer-blue" size={80} />

      {/* Form card */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white rounded-xl shadow-3xl border border-gray-100 p-6"
      >
        {/* Core booking fields */}
        <p className="text-xs font-semibold text-slate-gray uppercase tracking-wider mb-3">
          Booking Details
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* care_duration */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Care Duration
            </label>
            <CustomSelect
              name="care_duration"
              value={values.care_duration}
              onChange={handleChange}
              options={[
                { value: "Hourly", label: "Hourly" },
                { value: "Shift", label: "Shift" },
              ]}
            />
            {errors.care_duration && (
              <p className="text-danger-red text-xs mt-1">{errors.care_duration}</p>
            )}
          </div>

          {/* care_duration_value */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Duration Value
            </label>
            <CustomSelect
              name="care_duration_value"
              value={values.care_duration_value}
              onChange={handleChange}
              options={durationValueOptions}
              placeholder={values.care_duration ? "Select" : "Select duration first"}
            />
            {errors.care_duration_value && (
              <p className="text-danger-red text-xs mt-1">
                {errors.care_duration_value}
              </p>
            )}
          </div>

          {/* care_type */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Care Type
            </label>
            <CustomSelect
              name="care_type"
              value={values.care_type}
              onChange={handleChange}
              options={careTypeOptions}
              placeholder={values.care_duration_value ? "Select" : "Select value first"}
            />
            {errors.care_type && (
              <p className="text-danger-red text-xs mt-1">{errors.care_type}</p>
            )}
          </div>
        </div>

        {/* Conditional Live-in fields */}
        {isLiveIn24 && (
          <div className="mt-5 pt-5 border-t border-gray-100">
            <p className="text-xs font-semibold text-slate-gray uppercase tracking-wider mb-3">
              Live-in Preferences
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* accommodation */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Accommodation
                </label>
                <CustomSelect
                  name="accommodation"
                  value={values.accommodation}
                  onChange={handleChange}
                  options={yesNoOptions}
                />
                {errors.accommodation && (
                  <p className="text-danger-red text-xs mt-1">{errors.accommodation}</p>
                )}
              </div>

              {/* meal */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Meal
                </label>
                <CustomSelect
                  name="meal"
                  value={values.meal}
                  onChange={handleChange}
                  options={yesNoOptions}
                />
                {errors.meal && (
                  <p className="text-danger-red text-xs mt-1">{errors.meal}</p>
                )}
              </div>

              {/* num_of_meals */}
              {values.meal === "Yes" && (
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Number of Meals
                  </label>
                  <CustomSelect
                    name="num_of_meals"
                    value={values.num_of_meals}
                    onChange={handleChange}
                    options={[
                      { value: "1", label: "1" },
                      { value: "2", label: "2" },
                      { value: "3", label: "3" },
                    ]}
                  />
                  {errors.num_of_meals && (
                    <p className="text-danger-red text-xs mt-1">
                      {errors.num_of_meals}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {userDetails && userDetails?.address ? (
          <div className="mt-6 text-center">
            <MediumBtn text="Next" color="carerBlue" type="submit" />
          </div>
        ) : (
          <div className="mt-6 flex flex-col items-center gap-3">
            <div className="w-full rounded-lg bg-light-pink-bg border border-pink-200 px-4 py-3 text-center text-sm text-dark-pink-border">
              Please update your profile first to continue booking.
            </div>
            <NormalBtn href="/client/profile" children="Update Profile" />
          </div>
        )}
      </form>
    </div>
  );
};

export default StepOne;
