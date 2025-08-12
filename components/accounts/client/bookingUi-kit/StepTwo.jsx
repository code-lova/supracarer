"use client";
import React, { useState } from "react";
import { StepTwoValidationSchema } from "@schema/client/booking/ValidationSchema";
import { MediumBtn } from "@components/core/button";
import { medicalServicesOptions, extraServicesOptions } from "@constants";

const StepTwo = ({
  values,
  handleChange,
  goToNextStep,
  goToPrevStep,
  setFormValues,
}) => {
  const [errors, setErrors] = useState({});

  const toggleMultiSelect = (fieldName, value) => {
    const current = values[fieldName] || [];
    if (current.includes(value)) {
      setFormValues((prev) => ({
        ...prev,
        [fieldName]: current.filter((item) => item !== value),
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [fieldName]: [...current, value],
      }));
    }
  };

  const handleValidationAndNext = async () => {
    console.log("Form values:", values); // Debug log

    try {
      await StepTwoValidationSchema.validate(values, { abortEarly: false });
      setErrors({});
      goToNextStep();
    } catch (err) {
      const formattedErrors = {};
      err.inner.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
    }
  };

  const renderOptions = (fieldName, options) =>
    options.map((option) => {
      const isSelected = values[fieldName]?.includes(option);
      return (
        <button
          key={option}
          type="button"
          onClick={() => toggleMultiSelect(fieldName, option)}
          className={`px-4 py-2 rounded-full text-sm border transition ${
            isSelected
              ? "bg-green-200 text-green-800 border-green-400"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {option}
        </button>
      );
    });

  return (
    <div className="flex flex-col items-center gap-6 w-full h-[520px] overflow-y-auto">
      {/* Banner */}
      <div className="bg-light-pink-bg text-dark-pink-border px-4 py-2 rounded-md text-center w-full max-w-4xl">
        Select the services you want to include bbb
      </div>

      {/* Form Fields */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        {/* Medical Services */}
        <div>
          <label className="block mb-2 text-base font-semibold text-dark-blue">
            Medical Services
          </label>
          <div className="flex flex-wrap gap-2">
            {renderOptions("medical_services", medicalServicesOptions)}
          </div>
          {errors.medical_services && (
            <p className="text-sm text-red-600 mt-1">
              {errors.medical_services}
            </p>
          )}
        </div>

        {/* Extra Services */}
        <div>
          <label className="block mb-2 text-base font-semibold text-dark-blue">
            Other Extra Services(Optional)
          </label>
          <div className="flex flex-wrap gap-2">
            {renderOptions("other_extra_services", extraServicesOptions)}
          </div>
        </div>

        {/* Special Notes */}
        <div className="md:col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Special Notes (Language preference, mobility needs, special diets,
            religious considerations, pets at home, etc.)
          </label>
          <textarea
            name="special_notes"
            rows={6}
            value={values.special_notes}
            onChange={handleChange}
            placeholder="Let us know anything important..."
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.special_notes && (
            <p className="text-sm text-red-600 mt-1">{errors.special_notes}</p>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex item-center justify-between gap-4 mt-4">
        <MediumBtn
          text="Back"
          type="button"
          color="gray"
          onClick={goToPrevStep}
        />

        <MediumBtn
          text="Next"
          color="darkblue"
          onClick={handleValidationAndNext}
        />
      </div>
    </div>
  );
};

export default StepTwo;
