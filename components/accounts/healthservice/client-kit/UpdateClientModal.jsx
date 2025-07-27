"use client";
import { MediumBtn } from "@components/core/button";
import React, { useState } from "react";

const UpdateClientModal = ({ isOpen, onClose, patient, onUpdate }) => {
  const [status, setStatus] = useState(patient?.ststus || "confirmed");

  if (!isOpen || !patient) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ status });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-bold mb-4 text-tranquil-teal">
          Update Patient Status ({patient.name})
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block mb-1 font-semibold">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
            >
              <option value="confirmed">Confirmed</option>
              <option value="ongoing">Ongoing</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <MediumBtn color="red" text="Cancel" onClick={onClose} />

            <MediumBtn text="Update" color="darkblue" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateClientModal;
