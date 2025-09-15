"use client";
import { MediumBtn } from "@components/core/button";
import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { FaUser, FaEdit } from "react-icons/fa";

const UpdateClientModal = ({
  isOpen,
  onClose,
  patient,
  onUpdate,
  isUpdating = false,
}) => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (patient) {
      setStatus(patient.status || "Confirmed");
    }
  }, [patient]);

  if (!isOpen || !patient) return null;

  const clientName = `${patient.user?.name || ""}`.trim() || "Unknown Client";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-tranquil-teal text-white p-2 rounded-full">
              <FaEdit className="text-lg" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-tranquil-teal">
                Update Status
              </h2>
              <p className="text-sm text-gray-600">{clientName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoMdClose className="text-xl text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Current Status Display */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <FaUser className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Current Status</p>
                <p className="font-medium capitalize">
                  {patient.status || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Status Update */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Update Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tranquil-teal focus:border-transparent transition-colors"
              required
            >
              <option value="Ongoing">Ongoing</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between gap-3 mt-6 p-6 border-t border-gray-200">
          <MediumBtn
            type="button"
            color="red"
            text="Cancel"
            onClick={onClose}
            disabled={isUpdating}
          />
          <MediumBtn
            type="submit"
            text="Update Status"
            loadingText="Updating..."
            color="darkblue"
            onClick={() => onUpdate(patient.uuid)}
            loading={isUpdating}
            disabled={isUpdating}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateClientModal;
