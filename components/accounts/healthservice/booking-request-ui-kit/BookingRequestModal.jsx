import React from "react";
import { IoCloseCircle } from "react-icons/io5";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUser,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { MdLocalHospital, MdAccessTime } from "react-icons/md";
import { BiUserCheck } from "react-icons/bi";
import StatusPill from "@components/core/StatusPill";
import { MediumBtn } from "@components/core/button";

const BookingRequestModal = ({ showModal, patient, onClose }) => {
  if (!showModal || !patient) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
        {/* Header with Close Button */}
        <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-100 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-ever-green">
              Booking Request Details
            </h2>
            <p className="text-slate-gray text-sm">
              Complete client and appointment information
            </p>
          </div>
          <button
            className="text-gray-400 hover:text-red-600 transition-colors duration-200"
            onClick={onClose}
            aria-label="Close modal"
          >
            <IoCloseCircle size={32} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-8">
          {/* Client Info Section */}
          <div className="bg-gradient-to-r from-tranquil-teal/10 to-ever-green/10 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
              {patient.client?.image ? (
                <img
                  src={patient.client?.image}
                  alt={patient.client?.name || "Client"}
                  className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border-4 border-tranquil-teal shadow-lg mx-auto md:mx-0"
                />
              ) : (
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-200 rounded-full border-4 border-tranquil-teal shadow-lg mx-auto md:mx-0 flex items-center justify-center">
                  <span className="text-2xl md:text-3xl font-bold text-gray-600">
                    {patient.client?.name?.[0]?.toUpperCase() || "U"}
                  </span>
                </div>
              )}

              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-ever-green mb-2">
                  {patient.client?.name}
                </h3>
                <div className="flex items-center justify-center md:justify-start mb-2">
                  <MdLocalHospital className="w-5 h-5 mr-2 text-tranquil-teal" />
                  <span className="text-lg font-semibold text-slate-gray">
                    {patient.medical_services?.[0] || "General Care"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-slate-gray">
                  <span className="flex items-center">
                    <BiUserCheck className="w-4 h-4 mr-1" />
                    Ref: {patient.booking_reference}
                  </span>
                  <span className="flex items-center">
                    <FaEnvelope className="w-4 h-4 mr-1" />
                    {patient.client?.email}
                  </span>
                  <span className="flex items-center">
                    <FaPhone className="w-4 h-4 mr-1" />
                    {patient.client?.phone}
                  </span>
                </div>
                <div className="mt-3 flex gap-2 justify-center md:justify-start">
                  <StatusPill status={patient.status} />
                  {patient.is_urgent && (
                    <span className="px-3 py-1 bg-red-100 text-red-600 text-xs rounded-full font-medium">
                      🚨 Urgent Request
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Date & Time */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-ever-green mb-4 flex items-center">
                <FaCalendarAlt className="w-5 h-5 mr-2" />
                Schedule Information
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date</p>
                  <p className="font-semibold text-slate-gray">
                    {patient.start_date}
                  </p>
                  {patient.end_date !== patient.start_date && (
                    <p className="text-sm text-gray-500">
                      to {patient.end_date}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Time</p>
                  <p className="font-semibold text-slate-gray flex items-center">
                    <FaClock className="w-4 h-4 mr-2 text-tranquil-teal" />
                    {patient.start_time?.slice(0, 5)}{" "}
                    {patient.start_time_period} -{" "}
                    {patient.end_time?.slice(0, 5)} {patient.end_time_period}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Duration & Type</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-tranquil-teal/20 text-tranquil-teal text-sm rounded-full font-medium">
                      {patient.care_duration} ({patient.care_duration_value}hrs)
                    </span>
                    <span className="px-3 py-1 bg-ever-green/20 text-ever-green text-sm rounded-full font-medium">
                      {patient.care_type}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-ever-green mb-4 flex items-center">
                <FaMapMarkerAlt className="w-5 h-5 mr-2" />
                Location Details
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Address</p>
                  <p className="font-semibold text-slate-gray">
                    {patient.client?.location?.address}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Region & Country</p>
                  <p className="text-sm text-slate-gray">
                    <span className="font-medium">
                      {patient.client?.location?.region}
                    </span>
                    , {patient.client?.location?.country}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Booking Information
                  </p>
                  <p className="text-sm text-slate-gray">
                    <span className="font-medium">Reference:</span>{" "}
                    {patient.booking_reference}
                  </p>
                  <p className="text-sm text-slate-gray">
                    <span className="font-medium">Created:</span>{" "}
                    {new Date(patient.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-slate-gray">
                    <span className="font-medium">Religion:</span>{" "}
                    {patient.client?.religion || "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="space-y-6">
            {/* Medical Services */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-ever-green mb-4">
                Medical Services Required
              </h4>
              <div className="flex flex-wrap gap-2">
                {patient.medical_services && patient.medical_services.length > 0 ? (
                  patient.medical_services?.map((service, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-tranquil-teal/20 text-tranquil-teal text-sm rounded-full font-medium border border-tranquil-teal/30"
                    >
                      {service}
                    </span>
                  ))
                ): (
                  <span className="text-gray-500 text-sm">
                    Care Coordinator offering details
                  </span>
                )}
                
              </div>
            </div>

            {/* Extra Services */}
            {patient.other_extra_services &&
              patient.other_extra_services.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h4 className="text-lg font-semibold text-ever-green mb-4">
                    Additional Services
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {patient.other_extra_services.map((service, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full font-medium border border-gray-200"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </div>

          {/* Special Notes */}
          {patient.special_notes && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-ever-green mb-3 flex items-center">
                <MdAccessTime className="w-5 h-5 mr-2" />
                Special Notes & Instructions
              </h4>
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <p className="text-slate-gray leading-relaxed">
                  {patient.special_notes}
                </p>
              </div>
            </div>
          )}

          {/* Requesting Information */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-ever-green mb-3">
              Booking Request Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Requesting For</p>
                <p className="font-semibold text-slate-gray">
                  {patient.requesting_for}
                </p>
              </div>
              {patient.requesting_for !== "Self" && patient.someone_name && (
                <>
                  <div>
                    <p className="text-gray-500 mb-1">Requester Name</p>
                    <p className="font-semibold text-slate-gray">
                      {patient.someone_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Requester Phone</p>
                    <p className="font-medium text-slate-gray">
                      {patient.someone_phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Requester Email</p>
                    <p className="font-medium text-slate-gray">
                      {patient.someone_email}
                    </p>
                  </div>
                </>
              )}

              {patient.care_duration === "Shift" && (
                <>
                  <div>
                    <p className="text-gray-500 mb-1">Accommodation Needed</p>
                    <p className="font-semibold text-slate-gray">
                      {patient.accommodation}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Meals Required</p>
                    <p className="font-semibold text-slate-gray">
                      {patient.meal}{" "}
                      {patient.num_of_meals &&
                        `(${patient.num_of_meals} meals)`}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Action Footer */}
          <div className="bg-gray-50 rounded-xl p-6 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MediumBtn
                onClick={onClose}
                text="Close Details"
                color="gray"
              />

              <MediumBtn
                text="Contact Client"
                disabled
                color="green"
                icon={<FaUser className="mr-1" />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingRequestModal;
