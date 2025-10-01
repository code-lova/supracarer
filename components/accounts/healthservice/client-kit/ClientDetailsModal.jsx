import { MediumBtn } from "@components/core/button";
import React from "react";
import { IoMdClose } from "react-icons/io";
import {
  FaUser,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaBriefcaseMedical,
} from "react-icons/fa";
import DateFormatter from "@components/core/DateFormatter";

const ClientDetailsModal = ({ patient, isOpen, onClose }) => {
  if (!isOpen || !patient) return null;

  const clientName =
    patient.user?.name ||
    patient.client?.name ||
    `${patient.client?.first_name || ""} ${
      patient.client?.last_name || ""
    }`.trim() ||
    patient.name ||
    "Unknown Client";

  const services = patient.others?.[0]?.medical_services || [];
  const extraServices = patient.others?.[0]?.other_extra_service || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div
        className={`bg-white h-full w-full max-w-md transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-tranquil-teal">
            Client Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoMdClose className="text-xl text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Client Info Card */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-tranquil-teal text-white p-2 rounded-full">
                <FaUser className="text-lg" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {clientName}
                </h3>
                <p className="text-sm text-gray-600">Client Information</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaUser className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Contact</p>
                  <p className="font-medium">{patient.user?.phone || "N/A"}</p>
                  <p className="text-xs text-gray-500">
                    {patient.user?.email || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-medium">
                    {patient.user?.region || patient.user?.address || "N/A"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {patient.user?.country || ""}
                  </p>
                  <p className="text-xs text-gray-500">
                    {patient.user?.address || ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FaUser className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Religion</p>
                  <p className="font-medium">
                    {patient.user?.religion || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-ever-green text-white p-2 rounded-full">
                <FaCalendarAlt className="text-lg" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  Appointment Details
                </h3>
                <p className="text-sm text-gray-600">
                  Booking: {patient.booking_reference}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaCalendarAlt className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Schedule</p>
                  <p className="font-medium">
                    <DateFormatter date={patient.start_date} format="short" />{" "}
                    - <DateFormatter date={patient.end_date} format="short" />
                  </p>
                  <p className="text-xs text-gray-500">
                    {patient.start_time?.slice(0, 5)}{" "}
                    {patient.start_time_period} -{" "}
                    {patient.end_time?.slice(0, 5)} {patient.end_time_period}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FaBriefcaseMedical className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Care Details</p>
                  <p className="font-medium">
                    {patient.care_type} • {patient.care_duration}:{" "}
                    {patient.care_duration_value}h
                  </p>
                  <p className="text-xs text-gray-500">
                    Requesting for: {patient.requesting_for}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="font-medium capitalize">
                    {patient.status || "N/A"}
                  </p>
                  {patient.confirmed_at && (
                    <p className="text-xs text-gray-500">
                      Confirmed:{" "}
                      {new Date(patient.confirmed_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          {services.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                Medical Services
              </h3>
              <div className="space-y-2">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-tranquil-teal rounded-full"></div>
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Extra Services */}
          {extraServices.length > 0 && (
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                Extra Services
              </h3>
              <div className="space-y-2">
                {extraServices.map((service, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Special Notes */}
          {patient.special_notes && (
            <div className="bg-amber-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                Special Notes
              </h3>
              <p className="text-gray-600 text-sm">{patient.special_notes}</p>
            </div>
          )}

          {/* Accommodation & Meals */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">
              Additional Options
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Accommodation</p>
                <p className="font-medium">{patient.accommodation}</p>
              </div>
              <div>
                <p className="text-gray-600">Meals</p>
                <p className="font-medium">
                  {patient.meal}{" "}
                  {patient.num_of_meals && `(${patient.num_of_meals})`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
          <MediumBtn
            onClick={onClose}
            text="Close"
            color="darkblue"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsModal;
