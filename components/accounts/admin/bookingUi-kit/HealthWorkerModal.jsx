import React, { useState } from "react";
import { createPortal } from "react-dom";
import {
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import {
  FaUserMd,
  FaStethoscope,
  FaCalendarTimes,
  FaStar,
  FaExclamationTriangle,
  FaHome,
  FaCertificate,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getAllhealthWorkers } from "@service/request/admin/booking";
import TableSkeleton from "@components/core/skeleton/TableSkeleton";
import EmptyState from "@components/core/EmptyState";
import { MediumBtn } from "@components/core/button";
import StatusPill from "@components/core/StatusPill";

const HealthWorkerModal = ({
  isOpen,
  onClose,
  onSelectWorker,
  selectedAppointment,
  isAssigning = false,
  isReassignment = false,
}) => {
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [expandedWorkers, setExpandedWorkers] = useState(new Set());

  // Fetch health workers
  const {
    data: healthWorkersData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["healthWorkers"],
    queryFn: getAllhealthWorkers,
    enabled: isOpen, // Only fetch when modal is open
    staleTime: 60 * 1000, // 5 minutes
    retry: 2,
  });

  const healthWorkers = healthWorkersData?.health_workers || [];

  // Helper function to check if worker is unavailable for appointment dates or already assigned
  const checkAvailabilityConflict = (worker, appointment) => {
    // Check if worker is already assigned to another appointment
    if (worker.is_assigned) {
      return {
        type: "assigned",
        reason: "Already assigned to another appointment",
        dates: [],
      };
    }

    // Check if worker is in processing state (assigned but not confirmed)
    if (worker.is_processing) {
      return {
        type: "processing",
        reason: "Assignment pending confirmation",
        dates: [],
      };
    }

    // Check for date conflicts
    if (!worker.unavailable_dates || !appointment) return null;

    const appointmentStartDate = new Date(appointment.start_date)
      .toISOString()
      .split("T")[0];
    const appointmentEndDate = new Date(appointment.end_date)
      .toISOString()
      .split("T")[0];

    const conflictingDates = worker.unavailable_dates.filter(
      (unavailableDate) => {
        const unavailableDay = unavailableDate.date;
        return (
          unavailableDay >= appointmentStartDate &&
          unavailableDay <= appointmentEndDate
        );
      }
    );

    if (conflictingDates.length > 0) {
      return {
        type: "dates",
        reason: "Unavailable for selected dates",
        dates: conflictingDates,
      };
    }

    return null;
  };

  // Helper function to format currency in Ghana Cedis
  const formatGhanaCurrency = (amount) => {
    return `₵${parseFloat(amount).toFixed(2)}`;
  };

  const handleSelectWorker = (worker) => {
    // Toggle selection: if the same worker is clicked, unselect them
    if (selectedWorker?.id === worker.id) {
      setSelectedWorker(null);
    } else {
      setSelectedWorker(worker);
    }
  };

  const toggleWorkerDetails = (workerId) => {
    setExpandedWorkers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(workerId)) {
        newSet.delete(workerId);
      } else {
        newSet.add(workerId);
      }
      return newSet;
    });
  };

  const handleConfirmSelection = () => {
    if (selectedWorker) {
      // Call the parent function - the parent handles async states via React Query
      onSelectWorker(selectedWorker);
      // Don't close the modal here - let the parent close it via the mutation onSuccess
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedWorker(null);
    setExpandedWorkers(new Set());
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black bg-opacity-50 p-2">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[98vh] md:max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-slate-gray2 text-white p-4 md:p-6">
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-4">
              <h2 className="text-xl md:text-2xl font-bold flex items-center">
                <FaUserMd className="mr-2 md:mr-3 text-lg md:text-xl" />
                {isReassignment
                  ? "Reassign Health Worker"
                  : "Select Health Worker"}
              </h2>
              <p className="text-blue-100 mt-1 text-sm md:text-base">
                {isReassignment
                  ? `Choose a new health worker for booking #${selectedAppointment?.booking_reference}`
                  : `Choose a health worker for booking #${selectedAppointment?.booking_reference}`}
              </p>
              {isReassignment && selectedAppointment?.health_worker && (
                <p className="text-blue-100 text-xs md:text-sm mt-2">
                  Currently assigned to:{" "}
                  {selectedAppointment.health_worker.name}
                </p>
              )}
            </div>
            <button
              onClick={handleClose}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-colors flex-shrink-0"
              aria-label="Close"
            >
              <FiX className="text-lg md:text-xl" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(95vh-200px)] md:max-h-[calc(90vh-200px)]">
          {isLoading && (
            <div className="space-y-4">
              <TableSkeleton rows={4} />
            </div>
          )}

          {isError && (
            <EmptyState
              icon={FaUserMd}
              title="Error Loading Health Workers"
              description={
                error?.message || "Something went wrong. Please try again."
              }
            />
          )}

          {!isLoading && !isError && healthWorkers.length === 0 && (
            <EmptyState
              icon={FaUserMd}
              title="No Health Workers Available"
              description="There are currently no health workers available for assignment."
            />
          )}

          {!isLoading && !isError && healthWorkers.length > 0 && (
            <div className="space-y-4">
              <div className="text-sm text-gray-600 mb-4">
                Found {healthWorkers.length} available health worker
                {healthWorkers.length !== 1 ? "s" : ""}
              </div>

              <div className="grid gap-4">
                {healthWorkers.map((worker) => {
                  const availabilityConflict = checkAvailabilityConflict(
                    worker,
                    selectedAppointment
                  );
                  const isCurrentlyAssigned =
                    isReassignment &&
                    selectedAppointment?.health_worker?.uuid === worker.uuid;
                  const isUnavailable =
                    availabilityConflict !== null || isCurrentlyAssigned;

                  return (
                    <div
                      key={worker.id}
                      className={`border-2 rounded-xl p-3 md:p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedWorker?.id === worker.id
                          ? "border-haven-blue bg-blue-50 shadow-lg"
                          : isCurrentlyAssigned
                          ? "border-green-200 bg-green-50 opacity-75 cursor-not-allowed"
                          : isUnavailable
                          ? availabilityConflict?.type === "assigned"
                            ? "border-orange-200 bg-orange-50 opacity-75 cursor-not-allowed"
                            : availabilityConflict?.type === "processing"
                            ? "border-yellow-200 bg-yellow-50 opacity-75 cursor-not-allowed"
                            : "border-red-200 bg-red-50 opacity-75 cursor-not-allowed"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() =>
                        !isUnavailable && handleSelectWorker(worker)
                      }
                    >
                      {/* Currently Assigned Indicator */}
                      {isCurrentlyAssigned && (
                        <div className="mb-3 p-2 bg-green-100 border border-green-300 rounded-lg">
                          <div className="flex items-center text-green-700 text-sm">
                            <FaUserMd className="mr-2" />
                            <span className="font-medium">
                              Currently Assigned
                            </span>
                          </div>
                          <div className="text-xs text-green-600 mt-1">
                            This worker is currently assigned to this
                            appointment awaiting confirmation.
                          </div>
                        </div>
                      )}
                      {/* Processing Status Indicator */}
                      {/* {!isCurrentlyAssigned && worker.is_processing && (
                        <div className="mb-3 p-2 bg-yellow-100 border border-yellow-300 rounded-lg">
                          <div className="flex items-center text-yellow-700 text-sm">
                            <FaExclamationTriangle className="mr-2" />
                            <span className="font-medium">
                              Assignment Pending Confirmation
                            </span>
                          </div>
                          <div className="text-xs text-yellow-600 mt-1">
                            This health worker has been assigned to another
                            appointment but hasn't confirmed yet. They cannot be
                            assigned to another appointment at this time.
                          </div>
                        </div>
                      )}{" "} */}
                      {/* Unavailability Warning */}
                      {isUnavailable && !isCurrentlyAssigned && (
                        <div
                          className={`mb-3 p-2 border rounded-lg ${
                            availabilityConflict?.type === "assigned"
                              ? "bg-orange-100 border-orange-300"
                              : availabilityConflict?.type === "processing"
                              ? "bg-yellow-100 border-yellow-300"
                              : "bg-red-100 border-red-300"
                          }`}
                        >
                          <div
                            className={`flex items-center text-sm ${
                              availabilityConflict?.type === "assigned"
                                ? "text-orange-700"
                                : availabilityConflict?.type === "processing"
                                ? "text-yellow-700"
                                : "text-red-700"
                            }`}
                          >
                            <FaExclamationTriangle className="mr-2" />
                            <span className="font-medium">
                              {availabilityConflict?.reason}
                            </span>
                          </div>
                          {availabilityConflict?.type === "processing" && (
                            <div className="text-xs text-yellow-600 mt-1">
                              This health worker has been assigned to an
                              appointment but hasn't confirmed yet.
                            </div>
                          )}
                          {availabilityConflict?.type === "dates" &&
                            availabilityConflict?.dates?.length > 0 && (
                              <div className="text-xs text-red-600 mt-1">
                                Conflicting dates:{" "}
                                {availabilityConflict.dates
                                  .map((d) => d.date)
                                  .join(", ")}
                              </div>
                            )}
                        </div>
                      )}
                      <div className="flex items-start gap-3 md:gap-4">
                        {/* Profile Image */}
                        <div className="flex-shrink-0">
                          {worker.image ? (
                            <img
                              src={worker.image}
                              alt={worker.name}
                              className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-gray-200"
                            />
                          ) : (
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                              <FaUserMd className="text-white text-lg md:text-xl" />
                            </div>
                          )}
                        </div>

                        {/* Worker Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-base md:text-lg font-semibold text-gray-900 truncate pr-2">
                              {worker.name}
                            </h3>
                            <div className="flex items-center space-x-1 md:space-x-2 flex-shrink-0">
                              {worker.is_assigned && (
                                <StatusPill status="Assigned" size="sm" />
                              )}
                              {worker.is_processing && (
                                <StatusPill status="Processing" size="sm" />
                              )}
                              <StatusPill
                                status={
                                  worker.is_active === "1"
                                    ? "Active"
                                    : "Inactive"
                                }
                                size="sm"
                              />
                            </div>
                          </div>

                          {/* Essential Details - Always Visible */}
                          <div className="grid grid-cols-1 gap-2 md:gap-3 text-xs md:text-sm">
                            <div className="flex items-center text-gray-600">
                              <FiMail className="mr-2 text-blue-500 flex-shrink-0" />
                              <span className="truncate">{worker.email}</span>
                            </div>

                            {worker.phone && (
                              <div className="flex items-center text-gray-600">
                                <FiPhone className="mr-2 text-green-500 flex-shrink-0" />
                                <span>{worker.phone}</span>
                              </div>
                            )}

                            <div className="flex item-center justify-between">
                              <div className="flex item-center space-x-4">
                                {worker.practitioner && (
                                  <div className="flex items-center text-gray-600">
                                    <FaStethoscope className="mr-2 text-red-500 flex-shrink-0" />
                                    <span className="capitalize">
                                      {worker.practitioner}
                                    </span>
                                  </div>
                                )}

                                {worker.region && (
                                  <div className="flex items-center text-gray-600">
                                    <FiMapPin className="mr-1 text-purple-500 flex-shrink-0" />
                                    <span>{worker.region}</span>
                                  </div>
                                )}
                              </div>
                              <div>
                                {/* Toggle Button */}
                                <div className="mt-0">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleWorkerDetails(worker.id);
                                    }}
                                    className="flex items-center text-haven-blue hover:text-blue-800 text-sm font-medium transition-colors"
                                  >
                                    {expandedWorkers.has(worker.id) ? (
                                      <>
                                        <FiChevronUp className="mr-1" />
                                        Hide Details
                                      </>
                                    ) : (
                                      <>
                                        <FiChevronDown className="mr-1" />
                                        Show Details
                                      </>
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Expanded Details - Only show when expanded */}
                          {expandedWorkers.has(worker.id) && (
                            <div className="mt-3 space-y-3 border-t pt-3">
                              {/* Additional Contact Info */}
                              <div className="grid grid-cols-1 gap-2 text-xs md:text-sm">
                                {worker.address && (
                                  <div className="flex items-center text-gray-600">
                                    <FaHome className="mr-2 text-orange-500 flex-shrink-0" />
                                    <span className="truncate">
                                      {worker.address}
                                    </span>
                                  </div>
                                )}

                                {worker.country && (
                                  <div className="flex items-center text-gray-600">
                                    <FiMapPin className="mr-2 text-purple-500 flex-shrink-0" />
                                    <span>{worker.country}</span>
                                  </div>
                                )}

                                {worker.working_hours && (
                                  <div className="flex items-center text-gray-600">
                                    <FiClock className="mr-2 text-indigo-500 flex-shrink-0" />
                                    <span>{worker.working_hours}</span>
                                  </div>
                                )}
                              </div>

                              {/* About Section */}
                              {worker.about && (
                                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                  <span className="text-sm font-medium text-gray-700 block mb-1">
                                    About
                                  </span>
                                  <p className="text-sm text-gray-600">
                                    {worker.about}
                                  </p>
                                </div>
                              )}

                              {/* Guided Rate System Info */}
                              {worker.guided_rate_system &&
                                worker.guided_rate_system.length > 0 && (
                                  <div className="mt-3 space-y-3">
                                    {worker.guided_rate_system.map(
                                      (rateSystem, index) => (
                                        <div
                                          key={index}
                                          className="p-3 bg-green-50 border border-green-200 rounded-lg"
                                        >
                                          <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-700 flex items-center">
                                              <FiDollarSign className="mr-1 text-green-600" />
                                              Rate Information
                                            </span>
                                            <span className="text-lg font-bold text-green-600">
                                              {formatGhanaCurrency(
                                                rateSystem.guided_rate
                                              )}
                                            </span>
                                          </div>

                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600 mb-2">
                                            <div className="flex items-center">
                                              <FaCertificate className="mr-1 text-blue-500" />
                                              <span className="font-medium">
                                                Type:
                                              </span>
                                              <span className="ml-1 capitalize">
                                                {rateSystem.rate_type}
                                              </span>
                                            </div>
                                            <div className="flex items-center">
                                              <FaStethoscope className="mr-1 text-red-500" />
                                              <span className="font-medium">
                                                Nurse Type:
                                              </span>
                                              <span className="ml-1 uppercase">
                                                {rateSystem.nurse_type}
                                              </span>
                                            </div>
                                            <div className="flex items-center">
                                              <FiClock className="mr-1 text-indigo-500" />
                                              <span className="font-medium">
                                                Duration:
                                              </span>
                                              <span className="ml-1">
                                                {rateSystem.care_duration}
                                              </span>
                                            </div>
                                          </div>

                                          {rateSystem.guided_rate_justification && (
                                            <div className="mt-2 p-2 bg-white rounded border">
                                              <span className="text-xs font-medium text-gray-700 block mb-1">
                                                Justification:
                                              </span>
                                              <p className="text-xs text-gray-600">
                                                {
                                                  rateSystem.guided_rate_justification
                                                }
                                              </p>
                                            </div>
                                          )}

                                          {/* Service Types */}
                                          {rateSystem.service_types &&
                                            rateSystem.service_types.length >
                                              0 && (
                                              <div className="mt-2">
                                                <span className="text-xs font-medium text-gray-700 block mb-1">
                                                  Services Offered:
                                                </span>
                                                <div className="flex flex-wrap gap-1">
                                                  {rateSystem.service_types.map(
                                                    (service, serviceIndex) => (
                                                      <span
                                                        key={serviceIndex}
                                                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                                                      >
                                                        {service.service_type}
                                                      </span>
                                                    )
                                                  )}
                                                </div>
                                              </div>
                                            )}
                                        </div>
                                      )
                                    )}
                                  </div>
                                )}

                              {/* Unavailable Dates */}
                              {worker.unavailable_dates &&
                                worker.unavailable_dates.length > 0 && (
                                  <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-sm font-medium text-gray-700 flex items-center">
                                        <FaCalendarTimes className="mr-1 text-orange-600" />
                                        Unavailable Dates
                                      </span>
                                      <span className="text-xs text-orange-600">
                                        {worker.unavailable_dates.length}{" "}
                                        date(s)
                                      </span>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                      {worker.unavailable_dates
                                        .slice(0, 5)
                                        .map((unavailableDate, dateIndex) => (
                                          <span
                                            key={dateIndex}
                                            className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full"
                                          >
                                            {new Date(
                                              unavailableDate.date
                                            ).toLocaleDateString()}
                                          </span>
                                        ))}
                                      {worker.unavailable_dates.length > 5 && (
                                        <span className="text-xs text-orange-600">
                                          +{worker.unavailable_dates.length - 5}{" "}
                                          more
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}

                              {/* Assignment Status Indicator */}
                              {worker.is_assigned && (
                                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                  <div className="flex items-center text-yellow-700 text-sm">
                                    <FaExclamationTriangle className="mr-2" />
                                    <span className="font-medium">
                                      Currently assigned to another appointment
                                    </span>
                                  </div>
                                </div>
                              )}

                              {/* Processing Status Indicator */}
                              {worker.is_processing && !worker.is_assigned && (
                                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                  <div className="flex items-center text-blue-700 text-sm">
                                    <FaExclamationTriangle className="mr-2" />
                                    <span className="font-medium">
                                      Assignment pending confirmation
                                    </span>
                                  </div>
                                  <div className="text-xs text-blue-600 mt-1">
                                    This health worker has been assigned to an
                                    appointment but hasn't confirmed yet
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Selection Indicator */}
                        {selectedWorker?.id === worker.id && !isUnavailable && (
                          <div className="flex-shrink-0">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                              <FiUser className="text-white text-sm" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isLoading && !isError && healthWorkers.length > 0 && (
          <div className="border-t p-4 md:p-6 bg-gray-50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0">
              <div className="text-xs md:text-sm text-gray-600 text-center md:text-left">
                {selectedWorker ? (
                  <span className="font-medium text-haven-blue">
                    Selected: {selectedWorker.name}
                  </span>
                ) : (
                  `Please select a health worker to ${
                    isReassignment ? "reassign" : "assign"
                  }`
                )}
              </div>
              <div className="flex space-x-3 justify-center md:justify-end">
                <MediumBtn onClick={handleClose} text="Cancel" color="gray" />
                <MediumBtn
                  onClick={handleConfirmSelection}
                  text={isReassignment ? "Reassign Worker" : "Assign Worker"}
                  loadingText={
                    isReassignment ? "Reassigning..." : "Assigning..."
                  }
                  color="darkblue"
                  loading={isAssigning}
                  disabled={!selectedWorker}
                  icon={<FaUserMd className="mr-1" />}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>,
    document.body
  );
};

export default HealthWorkerModal;
