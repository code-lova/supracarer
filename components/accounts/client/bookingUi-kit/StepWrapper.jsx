import React from "react";
import StepIndicator from "./StepIndicator";

const StepWrapper = ({ steps, currentStep, children }) => {
  return (
    <div className="w-full mx-auto p-4">
      <StepIndicator steps={steps} currentStep={currentStep} />
      <div className="w-full bg-gray-50 p-6">
        {children}
      </div>
    </div>
  );
};

export default StepWrapper;
