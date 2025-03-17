import React from "react";
import { Spinner } from "../Spinner";

const LoadingStateUI = ({ label }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-row items-center justify-center">
          <h1 className="text-2xl font-bold mb-1 text-center blue_gradient">
           {label}
          </h1>
        </div>
        <div className="flex justify-center mt-6">
          <Spinner size="large" />
        </div>
        <p className="flex justify-center mt-6 font-semibold text-sm">
          Please Wait....
        </p>
      </div>
    </div>
  );
};

export default LoadingStateUI;
