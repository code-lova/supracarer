import { MediumBtn } from "@components/core/button";
import React from "react";

const ClientDetailsModal = ({ patient, isOpen, onClose }) => {
  if (!isOpen || !patient) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-bold mb-4 text-tranquil-teal">
          Client Details
        </h2>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Name:</strong> {patient.name}
          </p>
          <p>
            <strong>Age:</strong> {patient.age}
          </p>
          <p>
            <strong>Region:</strong> {patient.region}
          </p>
          <p>
            <strong>Status:</strong> {patient.status}
          </p>
          <p>
            <strong>Date of Booking:</strong> {patient.bookingDate}
          </p>
        </div>
        <div className="mt-4 flex justify-end">
          <MediumBtn onClick={onClose} text="Close" color="darkblue" />
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsModal;
