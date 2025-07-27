"use client";
import React, { useState } from "react";
import AppointmentModal from "./appointment-kits/AppointmentModal";
import { mockPatients } from "@constants";
import { SmallBtn } from "@components/core/button";
import { FcAcceptDatabase } from "react-icons/fc";
import { PiWarningFill } from "react-icons/pi";

const Appointments = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPatient(null);
  };

  return (
    <div className="pageContainer">
      <div className="w-full h-full xl:h-[669px] bg-white rounded-3xl shadow-md px-5 py-6 md:col-span-2 mb-6 md:mb-0">
        <h2 className="text-xl lg:text-xl mt-6 md:mt-0 font-bold text-tranquil-teal">
          See all appointments here
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
          {mockPatients.map((patient) => (
            <div
              key={patient.id}
              className="bg-tranquil-teal/10 rounded-xl shadow-lg p-4 flex flex-col items-center"
            >
              <img
                src={patient.image}
                alt={patient.name}
                className="w-20 h-20 object-cover rounded-full mb-2 border-2 border-tranquil-teal"
              />
              <div className="font-bold text-tranquil-teal text-lg mb-1">
                {patient.name}
              </div>
              <div className="text-slate-gray text-sm mb-1">
                Age: <span className="font-medium">{patient.age}</span>
              </div>
              <div className="text-slate-gray text-xs mb-2">
                Email: <span className="font-medium">{patient.email}</span>
              </div>
              <button
                className="text-xs text-custom-green underline hover:text-tranquil-teal mb-6"
                onClick={() => handleViewDetails(patient)}
              >
                View Details
              </button>
              <div className="flex gap-2 mt-auto">
                {/* Add onClick props for action here */}
                <SmallBtn
                  icon={<FcAcceptDatabase />}
                  children="Accept"
                  color="green"
                />
                <SmallBtn
                  icon={<PiWarningFill />}
                  children="Reject"
                  color="red"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Modal for patient details */}
        <AppointmentModal
          showModal={showModal}
          patient={selectedPatient}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default Appointments;
