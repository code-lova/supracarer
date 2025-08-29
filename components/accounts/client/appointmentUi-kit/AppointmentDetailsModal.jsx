"use client";
import { MediumBtn } from "@components/core/button";
import DateFormatter from "@components/core/DateFormatter";
import React from "react";
import {
  FaTimes,
  FaCalendarAlt,
  FaUser,
  FaHome,
  FaUtensils,
  FaStethoscope,
  FaClipboardList,
  FaUserMd,
  FaEnvelope,
  FaPhone,
  FaSpinner,
  FaTrash,
  FaBan,
  FaStar,
} from "react-icons/fa";

const AppointmentDetailsModal = ({
  isOpen,
  onClose,
  appointment,
  onCancelAppointment,
  onDeleteAppointment,
  onCompleteAppointment,
  isCancelling = false,
  isDeleting = false,
}) => {
  const handleCancelAppointment = (uuid) => {
    // Call the parent function - the parent handles async states via React Query
    onCancelAppointment(uuid);
    // Don't close the modal here - let the parent close it via the mutation onSuccess
  };

  const handleDeleteAppointment = (uuid) => {
    // Call the parent function - the parent handles async states via React Query
    onDeleteAppointment(uuid);
    // Don't close the modal here - let the parent close it via the mutation onSuccess
  };

  const handleCompleteAppointment = (uuid, healthWorkerName) => {
    // Call the parent function - the parent handles async states via React Query
    onCompleteAppointment(uuid, healthWorkerName);
    // Don't close the modal here - let the parent close it via the mutation onSuccess
  };

  if (!isOpen || !appointment) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto">
        {/* Header */}
        <div className="bg-slate-gray2 text-white p-6 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Booking Details</h2>
              <p className="text-blue-100 mt-1">
                Booking ID: #{appointment.booking_reference}
              </p>
            </div>
            <button
              onClick={onClose}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex justify-between items-center">
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                appointment.status === "Confirmed"
                  ? "bg-green-100 text-green-800"
                  : appointment.status === "Pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : appointment.status === "Cancelled"
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {appointment.status}
            </span>
            <span className="text-gray-500 text-sm">
              Created:{" "}
              <DateFormatter date={appointment.created_at} format="long" />
            </span>
          </div>

          {/* Schedule Information */}
          <div className="bg-blue-50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-carer-blue mb-3 flex items-center">
              <FaCalendarAlt className="mr-2" />
              Schedule Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-gray">
                  Start Date & Time
                </label>
                <p className="text-dark-gray-blue font-medium">
                  <DateFormatter date={appointment.start_date} format="long" />
                </p>
                <p className="text-dark-gray-blue">
                  <DateFormatter
                    time={appointment.start_time}
                    timePeriod={appointment.start_time_period}
                  />
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-gray">
                  End Date & Time
                </label>
                <p className="text-dark-gray-blue font-medium">
                  <DateFormatter date={appointment.end_date} format="long" />
                </p>
                <p className="text-dark-gray-blue">
                  <DateFormatter
                    time={appointment.end_time}
                    timePeriod={appointment.end_time_period}
                  />
                </p>
              </div>
            </div>
          </div>

          {/* Care Information */}
          <div className="bg-green-50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center">
              <FaStethoscope className="mr-2" />
              Care Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-gray">
                  Care Duration
                </label>
                <p className="text-dark-gray-blue font-medium">
                  {appointment.care_duration}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-gray">
                  Duration Value
                </label>
                <p className="text-dark-gray-blue font-medium">
                  {appointment.care_duration_value} hours
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-gray">
                  Care Type
                </label>
                <p className="text-dark-gray-blue font-medium">
                  {appointment.care_type}
                </p>
              </div>
            </div>
          </div>

          {/* Health Worker Information */}
          {appointment.health_worker ? (
            <div className="bg-teal-50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-teal-700 mb-3 flex items-center">
                <FaUserMd className="mr-2" />
                Assigned Health Worker
              </h3>
              <div className="flex items-start space-x-4">
                {appointment.health_worker.image && (
                  <img
                    src={appointment.health_worker.image}
                    alt={appointment.health_worker.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-teal-200"
                  />
                )}
                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-gray">
                        Name
                      </label>
                      <p className="text-dark-gray-blue font-medium">
                        {appointment.health_worker.name}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-gray">
                        Region
                      </label>
                      <p className="text-dark-gray-blue">
                        {appointment.health_worker.region || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-gray">
                        Email
                      </label>
                      <p className="text-dark-gray-blue flex items-center">
                        <FaEnvelope className="mr-2 text-teal-600" />
                        {appointment.health_worker.email}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-gray">
                        Phone
                      </label>
                      <p className="text-dark-gray-blue flex items-center">
                        <FaPhone className="mr-2 text-teal-600" />
                        {appointment.health_worker.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-4 border-2 border-dashed border-gray-300">
              <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                <FaUserMd className="mr-2" />
                Health Worker Assignment
              </h3>
              <p className="text-gray-600">
                A health worker has not been assigned to this appointment yet.
                You will be notified once an admin assigns a suitable health
                worker.
              </p>
            </div>
          )}

          {/* Accommodation & Meals */}
          {(appointment.accommodation === "Yes" ||
            appointment.meal === "Yes") && (
            <div className="bg-purple-50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-purple-700 mb-3 flex items-center">
                <FaHome className="mr-2" />
                Additional Services
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {appointment.accommodation === "Yes" && (
                  <div>
                    <label className="block text-sm font-medium text-slate-gray">
                      Accommodation
                    </label>
                    <p className="text-dark-gray-blue font-medium">Provided</p>
                  </div>
                )}
                {appointment.meal === "Yes" && (
                  <div>
                    <label className="block text-sm font-medium text-slate-gray">
                      Meals
                    </label>
                    <p className="text-dark-gray-blue font-medium flex items-center">
                      <FaUtensils className="mr-1" />
                      {appointment.num_of_meals} meal(s) per day
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Medical Services */}
          <div className="bg-red-50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-red-700 mb-3 flex items-center">
              <FaStethoscope className="mr-2" />
              Medical Services
            </h3>
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-slate-gray">
                  Required Services
                </label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {appointment.medical_services &&
                  appointment.medical_services.length > 0 ? (
                    appointment.medical_services.map((service, index) => (
                      <span
                        key={index}
                        className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm"
                      >
                        {service}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">
                      No medical services specified
                    </span>
                  )}
                </div>
              </div>
              {appointment.other_extra_services &&
                appointment.other_extra_services.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-slate-gray">
                      Extra Services
                    </label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {appointment.other_extra_services.map(
                        (service, index) => (
                          <span
                            key={index}
                            className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
                          >
                            {service}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>

          {/* Requester Information */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-dark-gray-blue mb-3 flex items-center">
              <FaUser className="mr-2" />
              Requester Information
            </h3>
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-slate-gray">
                  Requesting For
                </label>
                <p className="text-dark-gray-blue font-medium">
                  {appointment.requesting_for}
                </p>
              </div>
              {appointment.requesting_for === "Someone" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-gray">
                      Name
                    </label>
                    <p className="text-dark-gray-blue">
                      {appointment.someone_name}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-gray">
                      Email
                    </label>
                    <p className="text-dark-gray-blue">
                      {appointment.someone_email}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-gray">
                      Phone
                    </label>
                    <p className="text-dark-gray-blue">
                      {appointment.someone_phone}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Special Notes */}
          <div className="bg-yellow-50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-yellow-700 mb-3 flex items-center">
              <FaClipboardList className="mr-2" />
              Special Notes
            </h3>
            <p className="text-dark-gray-blue leading-relaxed">
              {appointment.special_notes}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t sticky bottom-0">
          <div className="flex justify-end space-x-3">
            <MediumBtn
              text="Close"
              type="button"
              color="gray"
              loading={isCancelling || isDeleting}
              onClick={onClose}
            />

            {/* Cancel Button - Only show for Pending appointments */}
            {appointment.status === "Pending" && (
              <MediumBtn
                onClick={() => handleCancelAppointment(appointment.uuid)}
                loading={isCancelling}
                loadingText="Cancelling..."
                text="Cancel Booking"
                color="orange"
                icon={<FaBan className="mr-2" />}
              />
            )}

            {/* Delete Button - Only show for Cancelled appointments */}
            {appointment.status === "Cancelled" && (
              <MediumBtn
                onClick={() => handleDeleteAppointment(appointment.uuid)}
                loading={isDeleting}
                loadingText="Deleting..."
                text="Delete Booking"
                color="red"
                icon={<FaTrash className="mr-2" />}
              />
            )}

            {/* Done Button - Only show for Ongoing appointments */}
            {appointment.status === "Ongoing" && (
              <MediumBtn
                onClick={() =>
                  handleCompleteAppointment(
                    appointment.uuid,
                    appointment.health_worker?.name
                  )
                }
                loading={false}
                text="Done"
                loadingText="Submitting..."
                color="green"
                icon={<FaStar className="mr-2" />}
              />
            )}

            {/* Contact Health Worker Button - Only show when worker is assigned and confirmed */}
            {appointment.health_worker &&
              appointment.status === "Confirmed" &&
              appointment.health_worker.phone && (
                <a
                  href={`tel:${appointment.health_worker.phone}`}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                  style={{ textDecoration: "none" }}
                >
                  Contact Health Worker
                </a>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentDetailsModal;
