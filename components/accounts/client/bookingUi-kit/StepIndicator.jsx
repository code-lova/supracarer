import React from "react";

const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8 p-4 bg-light-blue-bg rounded-lg mb-6">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div key={index} className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-full text-white text-sm flex items-center justify-center
              ${isCompleted ? "bg-green-500" : isActive ? "bg-carer-blue" : "bg-gray-300"}`}
            >
              {isCompleted ? "✓" : index + 1}
            </div>
            <span className={`text-sm ${isActive ? "font-semibold" : "text-gray-600"}`}>
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
