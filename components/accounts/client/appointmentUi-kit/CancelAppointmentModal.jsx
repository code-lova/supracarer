"use client";
import React, { useState } from "react";
import { FaTimes, FaBan, FaExclamationTriangle } from "react-icons/fa";

const CancelAppointmentModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  appointmentDetails,
}) => {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  // Reset reason and error when modal opens or appointment changes
  React.useEffect(() => {
    if (isOpen) {
      setReason("");
      setError("");
    }
  }, [isOpen, appointmentDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate reason
    if (!reason.trim()) {
      setError("Please provide a reason for cancellation");
      return;
    }

    if (reason.trim().length < 10) {
      setError(
        "Please provide a more detailed reason (at least 10 characters)"
      );
      return;
    }

    setError("");
    onConfirm(reason.trim());
  };

  const handleClose = () => {
    if (!isLoading) {
      setReason("");
      setError("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <FaExclamationTriangle className="text-red-600 text-lg" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Cancel Appointment
              </h2>
              <p className="text-sm text-gray-500">
                Please provide a reason for cancellation
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <FaTimes className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Appointment Info */}
          {appointmentDetails && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700">
                Booking ID: {appointmentDetails.reference}
              </p>
            </div>
          )}

          {/* Reason Textarea */}
          <div className="mb-4">
            <label
              htmlFor="cancellation-reason"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Reason for Cancellation <span className="text-red-500">*</span>
            </label>
            <textarea
              id="cancellation-reason"
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                if (error) setError("");
              }}
              placeholder="Please explain why you need to cancel this appointment..."
              rows={4}
              disabled={isLoading}
              className={`w-full px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 transition-colors ${
                error
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              } disabled:bg-gray-50 disabled:opacity-50`}
            />
            {error && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <FaExclamationTriangle className="mr-1 text-xs" />
                {error}
              </p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Minimum 10 characters required
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-base rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors disabled:opacity-50"
            >
              Keep Appointment
            </button>
            <button
              type="submit"
              disabled={isLoading || !reason.trim()}
              className="flex-1 px-4 py-2 bg-red-600 text-white text-base rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Cancelling...</span>
                </>
              ) : (
                <>
                  <FaBan className="text-sm" />
                  <span>Cancel</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CancelAppointmentModal;
