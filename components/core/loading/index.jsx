import React from "react";
import { Spinner } from "../Spinner";

const LoadingStateUI = ({ label }) => {
  return (
    <div className="py-9 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        {label && (
          <div className="flex flex-row items-center justify-center">
            <h1 className="text-2xl font-bold mb-1 text-center text-tranquil-teal">
              {label}
            </h1>
          </div>
        )}
        <div className="flex justify-center mt-6">
          <Spinner size="large" />
        </div>
        <p className="flex justify-center mt-6 font-semibold text-sm text-tranquil-teal">
          Please Wait....
        </p>
      </div>
    </div>
  );
};

export default LoadingStateUI;
