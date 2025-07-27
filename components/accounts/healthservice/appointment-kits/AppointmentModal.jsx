import React from "react";
import { IoCloseCircle } from "react-icons/io5";

const AppointmentModal = ({ showModal, patient, onClose }) => {
  if (!showModal || !patient) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-red-700 text-3xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          <IoCloseCircle />
        </button>
        <div className="flex flex-col items-center mt-6">
          <img
            src={patient.image}
            alt={patient.name}
            className="w-24 h-24 object-cover rounded-full mb-3 border-2 border-tranquil-teal"
          />
          <div className="font-bold text-tranquil-teal text-lg mb-1">
            {patient.name}
          </div>
          <div className="text-slate-gray text-sm mb-1">
            Age: <span className="font-medium">{patient.age}</span>
          </div>
          <div className="text-slate-gray text-sm mb-1">
            Email: <span className="font-medium">{patient.email}</span>
          </div>
          <div className="text-slate-gray text-sm mt-2 text-center">
            {patient.details}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
