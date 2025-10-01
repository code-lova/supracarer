"use client";

import React, { useEffect, useState } from "react";
import { FaHeartPulse } from "react-icons/fa6";
import { StepFourValidationSchema } from "@schema/client/booking/ValidationSchema";
import { MediumBtn } from "@components/core/button";

const StepFour = ({
  values,
  handleChange,
  setFormValues,
  goToPrevStep,
  goToPreview,
}) => {
  const [errors, setErrors] = useState({});

  // Reset dependent fields when 'requesting_for' changes
  useEffect(() => {
    if (values.requesting_for === "Self") {
      setFormValues((prev) => ({
        ...prev,
        someone_name: "",
        someone_email: "",
        someone_phone: "",
      }));
    }
  }, [values.requesting_for, setFormValues]);

  const handlePreview = async () => {
    console.log("Validating with values:", values);
    try {
      await StepFourValidationSchema.validate(values, { abortEarly: false });
      setErrors({});
      goToPreview();
    } catch (err) {
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
      {/* Greeting */}
      <div className="bg-green-100 text-green-700 py-2 px-4 rounded mb-4 text-center w-full max-w-md">
        Almost there! Who is this care request for?
      </div>

      <FaHeartPulse className="text-green-600 mb-6" size={120} />

      {/* Select for requesting_for */}
      <div className="w-full max-w-3xl mb-6">
        <label
          htmlFor="requesting_for"
          className="block text-sm font-semibold mb-1"
        >
          Requesting For
        </label>
        <select
          id="requesting_for"
          name="requesting_for"
          value={values.requesting_for || ""}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
        >
          <option value="">Select</option>
          <option value="Self">Self</option>
          <option value="Someone">Someone</option>
        </select>
        {errors.requesting_for && (
          <p className="text-red-500 text-sm mt-1">{errors.requesting_for}</p>
        )}
      </div>

      {/* Extra info when someone else is selected */}
      {values.requesting_for === "Someone" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
          <div className="flex flex-col">
            <label
              htmlFor="someone_name"
              className="text-sm font-semibold mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="someone_name"
              name="someone_name"
              value={values.someone_name || ""}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2"
              placeholder="Full name"
            />
            {errors.someone_name && (
              <p className="text-red-500 text-sm mt-1">{errors.someone_name}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="someone_email"
              className="text-sm font-semibold mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="someone_email"
              name="someone_email"
              value={values.someone_email || ""}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2"
              placeholder="example@mail.com"
            />
            {errors.someone_email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.someone_email}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="someone_phone"
              className="text-sm font-semibold mb-1"
            >
              Phone
            </label>
            <input
              type="tel"
              id="someone_phone"
              name="someone_phone"
              value={values.someone_phone || ""}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2"
              placeholder="+123..."
            />
            {errors.someone_phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.someone_phone}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between w-full max-w-3xl mt-6">
        <MediumBtn text="Back" color="gray" onClick={goToPrevStep} />

        <MediumBtn text="Preview" color="carerBlue" onClick={handlePreview} />
      </div>
    </div>
  );
};

export default StepFour;
