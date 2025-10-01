"use client";
import React, { useState } from "react";
import {
  FaEye,
  FaCalendarAlt,
  FaClock,
  FaStethoscope,
  FaBan,
  FaTrash,
  FaUserNurse,
  FaSearch,
  FaTimes,
  FaUserEdit,
} from "react-icons/fa";

import CancelAppointmentModal from "../client/appointmentUi-kit/CancelAppointmentModal";
import CompleteAppointmentModal from "../client/appointmentUi-kit/CompleteAppointmentModal";
import StatusPill from "@components/core/StatusPill";
import DateFormatter from "@components/core/DateFormatter";
import EmptyState from "@components/core/EmptyState";
import TableSkeleton from "@components/core/skeleton/TableSkeleton";
import { TableFilters, TablePagination } from "@components/core/table";
import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  showAllBookingRequests,
  processBookingRequest,
  completeBookingRequest,
  cancelBookingRequest,
  deleteBookingRequest,
} from "@service/request/admin/booking";
import { MediumBtn } from "@components/core/button";
import AppointmentDetailsModal from "../client/appointmentUi-kit/AppointmentDetailsModal";
import ThreeDotDropdown from "@components/core/button/ThreeDotDropdown";
import HealthWorkerModal from "./bookingUi-kit/HealthWorkerModal";

const BookingRequest = () => {
  const queryClient = useQueryClient();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [appointmentToComplete, setAppointmentToComplete] = useState(null);
  const [isHealthWorkerModalOpen, setIsHealthWorkerModalOpen] = useState(false);
  const [appointmentToMatch, setAppointmentToMatch] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
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
    queryKey: ["appointments", statusFilter, sortBy, currentPage, searchQuery],
    queryFn: () =>
      showAllBookingRequests({
        status: statusFilter,
        sort: sortBy,
        page: currentPage,
        per_page: itemsPerPage,
        search: searchQuery || undefined,
      }),
    retry: 2,
    staleTime: 60 * 1000,
    keepPreviousData: true,
  });

  // Cancel booking mutation
  const cancelBookingMutation = useMutation({
    mutationFn: ({ uuid, reason }) => cancelBookingRequest(uuid, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      handleCloseModal();
      setIsCancelModalOpen(false);
      setAppointmentToCancel(null);
      toast.success("Appointment cancelled successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to cancel appointment");
    },
  });

  // Delete booking mutation
  const deleteBookingMutation = useMutation({
    mutationFn: deleteBookingRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      handleCloseModal();
      toast.success("Appointment deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete appointment");
    },
  });

  // Complete booking mutation
  const completeBookingMutation = useMutation({
    mutationFn: ({ uuid, rating, review }) =>
      completeBookingRequest(uuid, rating, review),
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

  // Assign health worker mutation
  const assignWorkerMutation = useMutation({
    mutationFn: ({ bookingUuid, healthWorkerUuid }) =>
      processBookingRequest(bookingUuid, healthWorkerUuid),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["healthWorkers"] });
      handleCloseHealthWorkerModal();
      toast.success("Health worker assigned successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to assign health worker");
    },
  });

  // Extract appointments from the API response and transform the data structure
  const appointments = React.useMemo(() => {
    if (!appointmentsData?.data) return [];
    const rawData = Array.isArray(appointmentsData.data)
      ? appointmentsData.data
      : [appointmentsData.data];
    return rawData.map((appointment, index) => ({
      ...appointment,
      id: (currentPage - 1) * itemsPerPage + index + 1,
      medical_services: appointment.others?.[0]?.medical_services || [],
      other_extra_services: appointment.others?.[0]?.other_extra_service || [],
      health_worker: appointment.health_worker || null,
    }));
  }, [appointmentsData, currentPage, itemsPerPage]);

  const totalItems = appointmentsData?.meta?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentAppointments = appointments;

  React.useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, sortBy, searchQuery]);

  const handlePageChange = (page) => setCurrentPage(page);
  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };
  const handleCancelAppointment = (bookingUuid) => {
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

  const handleMatchBooking = (appointment) => {
    setAppointmentToMatch(appointment);
    setIsHealthWorkerModalOpen(true);
  };

  const handleCloseHealthWorkerModal = () => {
    setIsHealthWorkerModalOpen(false);
    setAppointmentToMatch(null);
  };

  const handleSelectWorker = (worker) => {
    if (appointmentToMatch && worker) {
      assignWorkerMutation.mutate({
        bookingUuid: appointmentToMatch.uuid,
        healthWorkerUuid: worker.uuid,
      });
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
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

  // Function to generate dropdown actions for each appointment
  const getActionsBtn = (appointment) =>
    [
      {
        label: "View Details",
        icon: <FaEye />,
        onClick: () => handleViewDetails(appointment),
      },
      {
        label: "Match Booking",
        icon: <FaUserNurse />,
        onClick: () => handleMatchBooking(appointment),
        // only show if appointment is pending
        hidden: appointment.status !== "Pending",
      },
      {
        label: "Reassign Worker",
        icon: <FaUserEdit />,
        onClick: () => handleMatchBooking(appointment),
        // only show if appointment is processing or confirmed and has assigned worker
        hidden: !["Processing", "Confirmed"].includes(appointment.status) || !appointment.health_worker,
      },
      {
        label: "Cancel",
        icon: <FaBan />,
        danger: true,
        onClick:
          appointment.status === "Pending"
            ? () => handleCancelAppointment(appointment.uuid)
            : undefined,
        // Only show if appointment is Pending
        hidden: appointment.status !== "Pending",
      },
      {
        label: "Delete",
        icon: <FaTrash />,
        danger: true,
        onClick:
          appointment.status === "Cancelled"
            ? () => handleDeleteAppointment(appointment.uuid)
            : undefined,
        // Only show if appointment is Cancelled
        hidden: appointment.status !== "Cancelled",
      },
    ].filter((action) => !action.hidden);

  return (
    <div className="w-full max-w-8xl mx-auto px-2 sm:px-4 md:px-1 py-2">
      <div className="xl:h-[690px] bg-white rounded-2xl shadow-lg px-5 py-6 flex flex-col">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <h1 className="text-2xl font-bold text-dark-blue mb-4 md:mb-0">
            Booking Requests
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
            {searchQuery && (
              <span className="ml-2">
                | Search:{" "}
                <span className="font-semibold text-carer-blue">
                  "{searchQuery}"
                </span>
              </span>
            )}
          </div>
        </div>

        {/* Search Field */}
        <div className="mb-4">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by booking reference..."
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-gray-500"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <TableFilters
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          statusOptions={statusOptions}
          sortOptions={sortOptions}
          quickFilterStatuses={quickFilterStatuses}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          {isLoading && <TableSkeleton rows={5} className="flex-1" />}

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

          {!isLoading && !isError && (
            <>
              {/* Mobile View */}
              <div className="block md:hidden max-h-[68vh] flex-1 overflow-y-auto">
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

                      <div className="flex item-center justify-center space-x-2">
                        <MediumBtn
                          onClick={() => handleViewDetails(appointment)}
                          text="View"
                          color="gray"
                          icon={<FaEye className="mr-1" />}
                        />

                        {appointment.status === "Pending" && (
                          <>
                            <MediumBtn
                              onClick={() => handleMatchBooking(appointment)}
                              text="Match"
                              color="blue"
                              icon={<FaUserNurse className="mr-1" />}
                            />
                            <MediumBtn
                              onClick={() =>
                                handleCancelAppointment(appointment.uuid)
                              }
                              loading={cancelBookingMutation.isPending}
                              text="Cancel"
                              color="orange"
                              icon={<FaBan className="mr-1" />}
                            />
                          </>
                        )}

                        {["Processing", "Confirmed"].includes(appointment.status) && appointment.health_worker && (
                          <MediumBtn
                            onClick={() => handleMatchBooking(appointment)}
                            text="Reassign"
                            color="blue"
                            icon={<FaUserEdit className="mr-1" />}
                          />
                        )}

                        {appointment.status === "Cancelled" && (
                          <MediumBtn
                            onClick={() =>
                              handleDeleteAppointment(appointment.uuid)
                            }
                            loading={deleteBookingMutation.isPending}
                            text="Delete"
                            color="red"
                            icon={<FaTrash className="mr-1" />}
                          />
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
                      <tr className="bg-slate-gray2 text-white">
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
                                {appointment?.user.name}
                              </div>
                              {appointment.requesting_for === "Someone" ? (
                                <div className="text-xs text-slate-gray">
                                  Someone: {appointment.someone_name}
                                </div>
                              ) : (
                                <div className="text-xs text-slate-gray">
                                  {appointment.requesting_for}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <ThreeDotDropdown
                                options={getActionsBtn(appointment)}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {appointments.length === 0 && (
                <EmptyState
                  icon={FaCalendarAlt}
                  title={
                    searchQuery
                      ? "No Appointments Found"
                      : statusFilter === "All"
                      ? "No Appointments Found"
                      : `No ${statusFilter} Appointments`
                  }
                  description={
                    searchQuery
                      ? `No appointments found matching "${searchQuery}". Try adjusting your search terms.`
                      : statusFilter === "All"
                      ? "You haven't made any booking requests yet."
                      : `You don't have any ${statusFilter.toLowerCase()} appointments.`
                  }
                  actionLabel={
                    searchQuery
                      ? "Clear Search"
                      : statusFilter !== "All"
                      ? "View All Appointments"
                      : null
                  }
                  onAction={
                    searchQuery
                      ? handleClearSearch
                      : statusFilter !== "All"
                      ? () => setStatusFilter("All")
                      : null
                  }
                />
              )}
            </>
          )}
        </div>

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

      <AppointmentDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        appointment={selectedAppointment}
        onCancelAppointment={handleCancelAppointment}
        onDeleteAppointment={handleDeleteAppointment}
        onCompleteAppointment={handleCompleteAppointment}
        isCancelling={cancelBookingMutation.isPending}
        isDeleting={deleteBookingMutation.isPending}
      />

      <CancelAppointmentModal
        isOpen={isCancelModalOpen}
        onClose={handleCloseCancelModal}
        onConfirm={handleConfirmCancellation}
        isLoading={cancelBookingMutation.isPending}
        appointmentDetails={
          appointmentToCancel && {
            reference: appointmentToCancel.booking_reference,
          }
        }
      />

      <CompleteAppointmentModal
        isOpen={isCompleteModalOpen}
        onClose={handleCloseCompleteModal}
        onSubmit={handleSubmitComplete}
        isLoading={completeBookingMutation.isPending}
        healthWorkerName={appointmentToComplete?.healthWorkerName}
      />

      <HealthWorkerModal
        isOpen={isHealthWorkerModalOpen}
        onClose={handleCloseHealthWorkerModal}
        onSelectWorker={handleSelectWorker}
        selectedAppointment={appointmentToMatch}
        isAssigning={assignWorkerMutation.isPending}
        isReassignment={appointmentToMatch?.health_worker ? true : false}
      />
    </div>
  );
};

export default BookingRequest;
