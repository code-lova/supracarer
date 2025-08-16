"use client";
import React, { useState } from "react";
import {
  FaEye,
  FaCalendarAlt,
  FaClock,
  FaStethoscope,
  FaBan,
  FaTrash,
} from "react-icons/fa";
import AppointmentDetailsModal from "./appointmentUi-kit/AppointmentDetailsModal";
import CancelAppointmentModal from "./appointmentUi-kit/CancelAppointmentModal";
import CompleteAppointmentModal from "./appointmentUi-kit/CompleteAppointmentModal";
import StatusPill from "@components/core/StatusPill";
import DateFormatter from "@components/core/DateFormatter";
import EmptyState from "@components/core/EmptyState";
import TableSkeleton from "@components/core/skeleton/TableSkeleton";
import { TableFilters, TablePagination } from "@components/core/table";
import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  showBooking,
  cancelBooking,
  deleteBooking,
  completeBooking,
} from "@service/request/client/bookingApt";

const Appointments = () => {
  const queryClient = useQueryClient();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [appointmentToComplete, setAppointmentToComplete] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch appointments data using React Query with server-side filtering
  const {
    data: appointmentsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["appointments", statusFilter, sortBy, currentPage],
    queryFn: () =>
      showBooking({
        status: statusFilter,
        sort: sortBy,
        page: currentPage,
        per_page: itemsPerPage,
      }),
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
    keepPreviousData: true, // Keep previous data while fetching new data
  });

  // Cancel booking mutation
  const cancelBookingMutation = useMutation({
    mutationFn: ({ uuid, reason }) => cancelBooking(uuid, reason),
    onSuccess: () => {
      // Invalidate and refetch appointments data
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      // Close modals
      handleCloseModal();
      setIsCancelModalOpen(false);
      setAppointmentToCancel(null);
      // Show success toast
      toast.success("Appointment cancelled successfully");
    },
    onError: (error) => {
      console.error("Error cancelling appointment:", error.message);
      // Show error toast
      toast.error(error.message || "Failed to cancel appointment");
    },
  });

  // Delete booking mutation
  const deleteBookingMutation = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      // Invalidate and refetch appointments data
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      // Close modal if open
      handleCloseModal();
      // Show success toast
      toast.success("Appointment deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting appointment:", error.message);
      // Show error toast
      toast.error(error.message || "Failed to delete appointment");
    },
  });

  // Complete booking mutation
  const completeBookingMutation = useMutation({
    mutationFn: ({ uuid, rating, review }) =>
      completeBooking(uuid, rating, review),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      handleCloseCompleteModal();
      handleCloseModal();
      toast.success("Appointment marked as done and review submitted!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to complete appointment");
    },
  });

  // Extract appointments from the API response and transform the data structure
  const appointments = React.useMemo(() => {
    if (!appointmentsData?.data) return [];

    // Handle both single appointment and array of appointments
    const rawData = Array.isArray(appointmentsData.data)
      ? appointmentsData.data
      : [appointmentsData.data];

    // Transform the data to match our component's expected structure
    return rawData.map((appointment, index) => ({
      ...appointment,
      id: (currentPage - 1) * itemsPerPage + index + 1, // Auto-increment ID based on pagination
      medical_services: appointment.others?.[0]?.medical_services || [],
      other_extra_services: appointment.others?.[0]?.other_extra_service || [],
      // Include health worker details if available
      health_worker: appointment.health_worker || null,
    }));
  }, [appointmentsData, currentPage, itemsPerPage]);

  // Get pagination info from API response
  const totalItems = appointmentsData?.meta?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Since data is already filtered and sorted on the server, we use it directly
  const currentAppointments = appointments;

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, sortBy]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleCancelAppointment = (bookingUuid) => {
    // Find the appointment to get details for the modal
    const appointment = appointments?.find((apt) => apt.uuid === bookingUuid);
    setAppointmentToCancel(appointment);
    setIsCancelModalOpen(true);
  };

  const handleConfirmCancellation = (reason) => {
    if (appointmentToCancel) {
      cancelBookingMutation.mutate({
        uuid: appointmentToCancel.uuid,
        reason: reason,
      });
    }
  };

  const handleCloseCancelModal = () => {
    setIsCancelModalOpen(false);
    setAppointmentToCancel(null);
  };

  const handleDeleteAppointment = (bookingUuid) => {
    if (
      window.confirm(
        "Are you sure you want to delete this appointment? This action cannot be undone."
      )
    ) {
      deleteBookingMutation.mutate(bookingUuid);
    }
  };

  const handleCompleteAppointment = (bookingUuid, healthWorkerName) => {
    const appointment = appointments?.find((apt) => apt.uuid === bookingUuid);
    setAppointmentToComplete({ ...appointment, healthWorkerName });
    setIsCompleteModalOpen(true);
  };

  const handleSubmitComplete = ({ rating, review }) => {
    if (appointmentToComplete) {
      completeBookingMutation.mutate({
        uuid: appointmentToComplete.uuid,
        rating,
        review,
      });
    }
  };

  const handleCloseCompleteModal = () => {
    setIsCompleteModalOpen(false);
    setAppointmentToComplete(null);
  };

  const statusOptions = [
    "All",
    "Pending",
    "Processing",
    "Confirmed",
    "Ongoing",
    "Done",
    "Cancelled",
  ];
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "start_date_asc", label: "Start Date (Earliest)" },
    { value: "start_date_desc", label: "Start Date (Latest)" },
  ];
  const quickFilterStatuses = ["All", "Pending", "Confirmed", "Ongoing"];

  return (
    <div className="pageContent">
      <div className="xl:h-[690px] bg-white rounded-2xl shadow-lg px-5 py-6 flex flex-col">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <h1 className="text-2xl font-bold text-dark-blue mb-4 md:mb-0">
            My Appointments
          </h1>
          <div className="text-sm text-gray-600">
            Total Bookings:{" "}
            <span className="font-semibold text-carer-blue">
              {isLoading ? "..." : totalItems}
            </span>
            {statusFilter !== "All" && (
              <span className="ml-2">
                | Showing:{" "}
                <span className="font-semibold text-carer-blue">
                  {statusFilter} appointments
                </span>
              </span>
            )}
          </div>
        </div>

        {/* Filter and Sort Controls */}
        <TableFilters
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          statusOptions={statusOptions}
          sortOptions={sortOptions}
          quickFilterStatuses={quickFilterStatuses}
        />

        {/* Content Area - Flex grow to fill remaining space */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Loading State */}
          {isLoading && <TableSkeleton rows={5} className="flex-1" />}

          {/* Error State */}
          {isError && (
            <EmptyState
              icon={FaCalendarAlt}
              title="Error Loading Appointments"
              description={
                error?.message || "Something went wrong. Please try again."
              }
              actionLabel="Retry"
              onAction={refetch}
            />
          )}

          {/* Content - Only show when not loading and no error */}
          {!isLoading && !isError && (
            <>
              {/* Mobile View */}
              <div className="block md:hidden flex-1 overflow-y-auto">
                <div className="space-y-4 pr-2">
                  {currentAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 shadow-sm"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-dark-blue">
                            Booking #{appointment.booking_reference}
                          </h3>

                          <p className="text-sm text-slate-gray">
                            Created:{" "}
                            <DateFormatter
                              date={appointment.created_at}
                              format="short"
                            />
                          </p>
                        </div>
                        <StatusPill status={appointment.status} size="sm" />
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm">
                          <FaCalendarAlt className="text-carer-blue mr-2" />
                          <span>
                            <DateFormatter
                              date={appointment.start_date}
                              format="short"
                            />{" "}
                            -{" "}
                            <DateFormatter
                              date={appointment.end_date}
                              format="short"
                            />
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <FaClock className="text-carer-green mr-2" />
                          <span>
                            {appointment.start_time}{" "}
                            {appointment.start_time_period} -{" "}
                            {appointment.end_time} {appointment.end_time_period}
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <FaStethoscope className="text-red-500 mr-2" />
                          <span>
                            {appointment.care_duration} -{" "}
                            {appointment.care_duration_value}hrs (
                            {appointment.care_type})
                          </span>
                        </div>
                        {appointment.health_worker && (
                          <div className="flex items-center text-sm text-green-600 font-medium">
                            <span className="mr-2">✓</span>
                            Health Worker: {appointment.health_worker.name}
                          </div>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewDetails(appointment)}
                          className="flex-1 bg-carer-blue text-white py-2 px-4 rounded-lg hover:bg-haven-blue transition-colors flex items-center justify-center"
                        >
                          <FaEye className="mr-2" />
                          View Details
                        </button>

                        {/* Quick Cancel Button for Pending appointments */}
                        {appointment.status === "Pending" && (
                          <button
                            onClick={() =>
                              handleCancelAppointment(appointment.uuid)
                            }
                            disabled={cancelBookingMutation.isLoading}
                            className="bg-orange-500 text-white py-2 px-3 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Cancel"
                          >
                            <FaBan />
                          </button>
                        )}

                        {/* Quick Delete Button for Cancelled appointments */}
                        {appointment.status === "Cancelled" && (
                          <button
                            onClick={() =>
                              handleDeleteAppointment(appointment.uuid)
                            }
                            disabled={deleteBookingMutation.isLoading}
                            className="bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop View */}
              <div className="hidden md:block flex-1 overflow-hidden">
                <div className="h-full overflow-y-auto">
                  <table className="w-full">
                    <thead className="sticky top-0 z-10">
                      <tr className="bg-gradient-to-r from-carer-blue to-blue-500 text-white">
                        <th className="px-4 py-4 text-left rounded-tl-lg">
                          Booking ID
                        </th>
                        <th className="px-4 py-4 text-left">Status</th>
                        <th className="px-4 py-4 text-left">Schedule</th>
                        <th className="px-4 py-4 text-left">Care Details</th>
                        <th className="px-4 py-4 text-left">Services</th>
                        <th className="px-4 py-4 text-left">Requester</th>
                        <th className="px-4 py-4 text-center rounded-tr-lg">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentAppointments.map((appointment, index) => (
                        <tr
                          key={appointment.id}
                          className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }`}
                        >
                          <td className="px-4 py-4">
                            <div>
                              <div className="font-semibold text-dark-blue">
                                #{appointment.id}
                              </div>
                              <div className="text-sm text-slate-gray">
                                <DateFormatter
                                  date={appointment.created_at}
                                  format="short"
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <StatusPill status={appointment.status} size="sm" />
                          </td>
                          <td className="px-4 py-4">
                            <div className="space-y-1">
                              <div className="flex items-center text-sm">
                                <FaCalendarAlt className="text-carer-blue mr-1" />
                                <span>
                                  <DateFormatter
                                    date={appointment.start_date}
                                    format="short"
                                  />
                                </span>
                              </div>
                              <div className="flex items-center text-sm">
                                <FaClock className="text-green-600 mr-1" />
                                <span>
                                  {appointment.start_time}{" "}
                                  {appointment.start_time_period}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="space-y-1">
                              <div className="text-sm font-medium">
                                {appointment.care_duration}
                              </div>
                              <div className="text-sm text-slate-gray">
                                {appointment.care_duration_value}hrs -{" "}
                                {appointment.care_type}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="space-y-1">
                              <div className="text-sm">
                                {appointment.medical_services?.length || 0}{" "}
                                medical service(s)
                              </div>
                              <div className="text-xs text-slate-gray">
                                {appointment.other_extra_services?.length > 0 &&
                                  `+${appointment.other_extra_services.length} extra`}
                              </div>
                              {appointment.health_worker && (
                                <div className="text-xs text-green-600 font-medium">
                                  ✓ Worker Assigned
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="space-y-1">
                              <div className="text-sm font-medium">
                                {appointment.requesting_for}
                              </div>
                              {appointment.requesting_for === "Someone" && (
                                <div className="text-xs text-slate-gray">
                                  {appointment.someone_name}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <button
                                onClick={() => handleViewDetails(appointment)}
                                className="bg-carer-blue text-white px-3 py-2 rounded-lg hover:bg-haven-blue transition-colors flex items-center"
                                title="View Details"
                              >
                                <FaEye className="mr-1" />
                                View
                              </button>

                              {/* Quick Cancel Button for Pending appointments */}
                              {appointment.status === "Pending" && (
                                <button
                                  onClick={() =>
                                    handleCancelAppointment(appointment.uuid)
                                  }
                                  disabled={cancelBookingMutation.isLoading}
                                  className="bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                  title="Cancel Appointment"
                                >
                                  <FaBan />
                                </button>
                              )}

                              {/* Quick Delete Button for Cancelled appointments */}
                              {appointment.status === "Cancelled" && (
                                <button
                                  onClick={() =>
                                    handleDeleteAppointment(appointment.uuid)
                                  }
                                  disabled={deleteBookingMutation.isLoading}
                                  className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                  title="Delete Appointment"
                                >
                                  <FaTrash />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Empty State */}
              {appointments.length === 0 && (
                <EmptyState
                  icon={FaCalendarAlt}
                  title={
                    statusFilter === "All"
                      ? "No Appointments Found"
                      : `No ${statusFilter} Appointments`
                  }
                  description={
                    statusFilter === "All"
                      ? "You haven't made any booking requests yet."
                      : `You don't have any ${statusFilter.toLowerCase()} appointments.`
                  }
                  actionLabel={
                    statusFilter !== "All" ? "View All Appointments" : null
                  }
                  onAction={
                    statusFilter !== "All" ? () => setStatusFilter("All") : null
                  }
                />
              )}
            </>
          )}
        </div>

        {/* Pagination */}
        {!isLoading &&
          !isError &&
          appointments.length > 0 &&
          totalPages > 1 && (
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              filteredItems={totalItems}
              onPageChange={handlePageChange}
            />
          )}
      </div>

      {/* Appointment Details Modal */}
      <AppointmentDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        appointment={selectedAppointment}
        onCancelAppointment={handleCancelAppointment}
        onDeleteAppointment={handleDeleteAppointment}
        onCompleteAppointment={handleCompleteAppointment}
        isCancelling={cancelBookingMutation.isLoading}
        isDeleting={deleteBookingMutation.isLoading}
      />

      {/* Cancel Appointment Modal */}
      <CancelAppointmentModal
        isOpen={isCancelModalOpen}
        onClose={handleCloseCancelModal}
        onConfirm={handleConfirmCancellation}
        isLoading={cancelBookingMutation.isLoading}
        appointmentDetails={
          appointmentToCancel && {
            reference: appointmentToCancel.booking_reference,
          }
        }
      />

      {/* Complete Appointment Modal */}
      <CompleteAppointmentModal
        isOpen={isCompleteModalOpen}
        onClose={handleCloseCompleteModal}
        onSubmit={handleSubmitComplete}
        isLoading={completeBookingMutation.isLoading}
        healthWorkerName={appointmentToComplete?.healthWorkerName}
      />
    </div>
  );
};

export default Appointments;
