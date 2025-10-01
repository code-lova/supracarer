import React from "react";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

const ErrorState = ({
  icon: Icon = FiAlertTriangle,
  title = "Something went wrong",
  description = "An error occurred while loading the data.",
  actionLabel = "Try Again",
  onAction,
  error,
  iconClassName = "text-6xl text-red-400",
  className = "",
}) => {
  // Extract error message if error object is provided
  const errorMessage = error?.message || description;

  return (
    <div className={`flex-1 flex items-center justify-center ${className}`}>
      <div className="text-center">
        <Icon className={`${iconClassName} mx-auto mb-4`} />
        <h3 className="text-xl font-semibold text-red-900 mb-2">{title}</h3>
        <p className="text-red-700 mb-4">{errorMessage}</p>
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2 mx-auto"
          >
            <FiRefreshCw className="w-4 h-4" />
            <span>{actionLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;
