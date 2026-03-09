"use client";

import React, { useEffect, useState } from "react";
import { FaHeartPulse } from "react-icons/fa6";
import { StepFourValidationSchema } from "@schema/client/booking/ValidationSchema";
import { MediumBtn } from "@components/core/button";
import CustomSelect from "@components/core/CustomSelect";

const StepFour = ({
  values,
  handleChange,
  setFormValues,
  goToPrevStep,
  goToPreview,
}) => {
  const [errors, setErrors] = useState({});

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

  const inputClass =
    "w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-2.5 text-sm text-slate-gray outline-none transition-all duration-200 focus:border-carer-blue focus:ring-2 focus:ring-carer-blue/20 focus:bg-white";

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Banner */}
      <div className="bg-light-blue-bg text-dark-blue-border px-4 py-2 rounded-md text-center w-full max-w-4xl text-sm font-medium border border-blue-200">
        Almost there! Who is this care request for?
      </div>

      <FaHeartPulse className="text-carer-blue" size={80} />

      {/* Form card */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-3xl border border-gray-100 p-6 flex flex-col gap-5">
        <p className="text-xs font-semibold text-slate-gray uppercase tracking-wider">
          Request Details
        </p>

        {/* Requesting For */}
        <div className="max-w-xs">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Requesting For
          </label>
          <CustomSelect
            name="requesting_for"
            value={values.requesting_for || ""}
            onChange={handleChange}
            options={[
              { value: "Self", label: "Self" },
              { value: "Someone", label: "Someone else" },
            ]}
            placeholder="Select"
          />
          {errors.requesting_for && (
            <p className="text-danger-red text-xs mt-1">{errors.requesting_for}</p>
          )}
        </div>

        {/* Someone else fields */}
        {values.requesting_for === "Someone" && (
          <div className="pt-4 border-t border-gray-100">
            <p className="text-xs font-semibold text-slate-gray uppercase tracking-wider mb-3">
              Contact Information
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="someone_name"
                  name="someone_name"
                  value={values.someone_name || ""}
                  onChange={handleChange}
                  placeholder="Full name"
                  className={inputClass}
                />
                {errors.someone_name && (
                  <p className="text-danger-red text-xs mt-1">{errors.someone_name}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="someone_email"
                  name="someone_email"
                  value={values.someone_email || ""}
                  onChange={handleChange}
                  placeholder="example@mail.com"
                  className={inputClass}
                />
                {errors.someone_email && (
                  <p className="text-danger-red text-xs mt-1">{errors.someone_email}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  id="someone_phone"
                  name="someone_phone"
                  value={values.someone_phone || ""}
                  onChange={handleChange}
                  placeholder="+123..."
                  className={inputClass}
                />
                {errors.someone_phone && (
                  <p className="text-danger-red text-xs mt-1">{errors.someone_phone}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between w-full max-w-4xl">
        <MediumBtn text="Back" color="gray" onClick={goToPrevStep} />
        <MediumBtn text="Preview" color="carerBlue" onClick={handlePreview} />
      </div>
    </div>
  );
};

export default StepFour;
