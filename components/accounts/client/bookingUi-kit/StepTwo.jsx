"use client";
import React, { useState } from "react";
import { StepTwoValidationSchema } from "@schema/client/booking/ValidationSchema";
import { MediumBtn } from "@components/core/button";
import { medicalServicesOptions, extraServicesOptions } from "@constants";
import WordCountTextarea from "@components/core/WordCountTextarea";
import { isFeatureEnabled } from "@config/features";
import { FaInfoCircle, FaUserNurse, FaHeadset } from "react-icons/fa";

const StepTwo = ({
  values,
  handleChange,
  goToNextStep,
  goToPrevStep,
  setFormValues,
}) => {
  const [errors, setErrors] = useState({});
  const serviceSelectionEnabled = isFeatureEnabled("CLIENT_SERVICE_SELECTION");

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
      // If service selection is disabled, skip validation and go to next step
      if (!serviceSelectionEnabled) {
        setErrors({});
        goToNextStep();
        return;
      }

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

  // Render informational message when service selection is disabled
  const renderManualServiceInfo = () => (
    <div className="px-1">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-2 lg:p-10 text-center">
        <div className="flex justify-center mb-3 sm:mb-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <FaUserNurse className="text-white text-lg sm:text-2xl" />
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">
          Service Selection Coming Soon!
        </h3>

        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed px-4 sm:px-8">
          For now, our care coordinators will personally discuss your care
          services.
        </p>

        <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8 border border-blue-100 shadow-sm">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <FaHeadset className="text-blue-600 text-lg sm:text-xl" />
            <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
              What happens next?
            </h4>
          </div>

          <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
            <div className="flex items-start gap-2 sm:gap-3 text-left">
              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5 sm:mt-2"></div>
              <span className="leading-relaxed">
                Our team will contact you within 24 hours
              </span>
            </div>
            <div className="flex items-start gap-2 sm:gap-3 text-left">
              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5 sm:mt-2"></div>
              <span className="leading-relaxed">
                We'll discuss your specific care requirements
              </span>
            </div>
            <div className="flex items-start gap-2 sm:gap-3 text-left">
              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5 sm:mt-2"></div>
              <span className="leading-relaxed">
                Get matched with qualified healthcare professionals
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-6 w-full h-auto">
      {/* Conditional Rendering Based on Feature Flag */}
      {serviceSelectionEnabled ? (
        <>
          {/* Banner */}
          <div className="bg-light-pink-bg text-dark-pink-border px-4 py-2 rounded-md text-center w-full max-w-4xl">
            Select the services you want to include
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
                {renderOptions("other_extra_service", extraServicesOptions)}
              </div>
            </div>

            {/* Special Notes */}
            <div className="md:col-span-2">
              <WordCountTextarea
                name="special_notes"
                label="Special Notes (Language preference, mobility needs, special diets, religious considerations, pets at home, etc.)"
                value={values.special_notes || ""}
                onChange={(text) => {
                  // Lets use a synthetic event to match handleChange expectations
                  const syntheticEvent = {
                    target: {
                      name: "special_notes",
                      value: text,
                      type: "textarea",
                    },
                  };
                  handleChange(syntheticEvent);
                }}
                maxWords={100}
                rows={6}
                placeholder="Let us know anything important..."
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                showErrorMessage={false}
              />
              {errors.special_notes && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.special_notes}
                </p>
              )}
            </div>
          </div>
        </>
      ) : (
        // Show informational message when feature is disabled
        renderManualServiceInfo()
      )}

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
          color="carerBlue"
          onClick={handleValidationAndNext}
        />
      </div>
    </div>
  );
};

export default StepTwo;
