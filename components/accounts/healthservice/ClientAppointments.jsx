"use client";
import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  getHealthWorkerAppointments,
  updateToOngoingRequest,
} from "@service/request/healthworker/request";
import ClientDetailsModal from "./client-kit/ClientDetailsModal";
import UpdateClientModal from "./client-kit/UpdateClientModal";
import { GrUpdate } from "react-icons/gr";
import { TbListDetails } from "react-icons/tb";
import StatusPill from "@components/core/StatusPill";
import EmptyState from "@components/core/EmptyState";
import ErrorState from "@components/core/ErrorState";
import TableFilters from "@components/core/table/TableFilters";
import DataTable from "react-data-table-component";
import { FaCalendarAlt, FaUserMd, FaClock, FaSearch } from "react-icons/fa";
import AdminTableSkeleton from "@components/core/skeleton/AdminTableSkeleton";
import ThreeDotDropdown from "@components/core/button/ThreeDotDropdown";
import DateFormatter from "@components/core/DateFormatter";

const ClientAppointments = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllAppointments, setShowAllAppointments] = useState(false);

  const queryClient = useQueryClient();

  const statusOptions = ["All", "Confirmed", "Ongoing", "Done"];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "start_date_asc", label: "Start Date (Earliest)" },
    { value: "start_date_desc", label: "Start Date (Latest)" },
  ];

  const quickFilterStatuses = ["All", "Done", "Confirmed", "Ongoing"];

  // Build query params
  const queryParams = {
    ...(statusFilter !== "All" && { status: statusFilter }),
    ...(sortBy && { sort: sortBy }),
    ...(searchTerm && { search: searchTerm }),
  };

  const {
    data: appointmentsData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["healthWorkerAppointments", queryParams],
    queryFn: () => getHealthWorkerAppointments(queryParams),
    staleTime: 1000 * 60, // 1 minutes
    enabled: searchTerm.length > 0 || showAllAppointments, // Only fetch when searching or showing all
  });

  const appointments = appointmentsData?.data || [];

  // Mutation for updating to ongoing booking requests
  const updateToOngoingMutation = useMutation({
    mutationFn: updateToOngoingRequest,
    onSuccess: () => {
      toast.success("Status updated to Ongoing!");
      setShowUpdate(false);
      queryClient.invalidateQueries({
        queryKey: ["healthWorkerAppointments"],
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update appointment status.");
    },
  });

  const handleUpdate = (appointmentUuid) => {
    if (appointmentUuid) {
      updateToOngoingMutation.mutate(appointmentUuid);
    } else {
      toast.error("Invalid appointment data. Missing UUID.");
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setSortBy("newest");
    setShowAllAppointments(false);
  };

  // Custom DataTable styles - minimal and clean
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#088272",
        borderBottomWidth: "1px",
        borderBottomColor: "#e5e7eb",
        minHeight: "62px",
      },
    },
    headCells: {
      style: {
        color: "#ffffff",
        fontSize: "14px",
        fontWeight: "600",
        padding: "20px",
      },
    },
    cells: {
      style: {
        padding: "16px",
      },
    },
    rows: {
      style: {
        "&:hover": {
          backgroundColor: "#f9fafb",
        },
      },
    },
  };

  // Define simplified columns for the DataTable
  const columns = useMemo(
    () => [
      {
        name: "Client",
        selector: (row) => row.user?.name || "Unknown Client",
        sortable: true,
        grow: 2,
        cell: (row) => (
          <div className="flex items-center space-x-3 py-2">
            <div className="flex-shrink-0">
              {row.user?.image ? (
                <img
                  src={row.user.image}
                  alt={row.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-tranquil-teal rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {(row.user?.name || "U").charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-gray-900 truncate">
                {row.user?.name || "Unknown Client"}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {row.booking_reference}
              </p>
            </div>
          </div>
        ),
      },
      {
        name: "Contact",
        selector: (row) => row.user?.phone || "N/A",
        sortable: false,
        width: "150px",
        hide: "sm",
        cell: (row) => (
          <div className="min-w-0">
            <p className="text-sm text-gray-800 truncate">
              {row.user?.phone || "N/A"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {row.user?.email
                ? row.user.email.length > 15
                  ? row.user.email.substring(0, 15) + "..."
                  : row.user.email
                : "N/A"}
            </p>
          </div>
        ),
      },
      {
        name: "Service",
        selector: (row) => row.others?.[0]?.medical_services?.[0] || "N/A",
        sortable: false,
        width: "160px",
        cell: (row) => {
          const services = row.others?.[0]?.medical_services || [];
          const extraServices = row.others?.[0]?.other_extra_service || [];
          return (
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {services[0] || "Confidential"}
              </p>
              {services.length > 1 && (
                <p className="text-xs text-gray-500">
                  +{services.length - 1} more
                </p>
              )}
              {extraServices.length > 0 && (
                <p className="text-xs text-blue-600 truncate">
                  Extra: {extraServices[0]}
                </p>
              )}
            </div>
          );
        },
      },
      {
        name: "Schedule",
        selector: (row) => row.start_date || "N/A",
        sortable: true,
        width: "200px",
        cell: (row) => (
          <div className="min-w-0">
            <div className="flex items-center space-x-1 mb-1">
              <FaCalendarAlt className="text-gray-400 text-xs flex-shrink-0" />
              <span className="text-sm font-medium truncate">
                <DateFormatter date={row.start_date} format="short" />
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <FaClock className="text-gray-400 text-xs flex-shrink-0" />
              <span className="text-xs text-gray-600 truncate">
                {row.start_time?.slice(0, 5)} {row.start_time_period} -{" "}
                {row.end_time?.slice(0, 5)} {row.end_time_period}
              </span>
            </div>
            <p className="text-xs text-gray-500 truncate">
              {row.care_duration}: {row.care_duration_value}hrs
            </p>
          </div>
        ),
      },
      {
        name: "Status",
        selector: (row) => row.status,
        sortable: true,
        width: "150px",
        cell: (row) => <StatusPill status={row.status} />,
      },
      {
        name: "Actions",
        sortable: false,
        width: "100px",
        cell: (row) => {
          const dropdownOptions = [
            {
              label: "View details",
              onClick: () => {
                setSelectedAppointment(row);
                setShowDetails(true);
              },
              icon: <TbListDetails className="w-4 h-4" />,
            },
            // Only show Update option if status is Confirmed
            ...(row.status === "Confirmed"
              ? [
                  {
                    label: "Update Appointment",
                    onClick: () => {
                      setSelectedAppointment(row);
                      setShowUpdate(true);
                    },
                    icon: <GrUpdate className="w-4 h-4" />,
                  },
                ]
              : []),
          ];

          return (
            <ThreeDotDropdown
              options={dropdownOptions}
              menuId={`appt-dropdown-${row.uuid || row.id}`}
            />
          );
        },
      },
    ],
    []
  );

  // Filter appointments based on search term and status
  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const clientName = appointment.user?.name || "";
      const bookingRef = appointment.booking_reference || "";
      const matchesSearch =
        searchTerm === "" ||
        clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bookingRef.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || appointment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [appointments, searchTerm, statusFilter]);

  if (error) {
    return (
      <div className="pageContainer">
        <div className="w-full h-full xl:h-[669px] bg-white rounded-3xl shadow-md px-5 py-6 mb-6 md:mb-0">
          <ErrorState
            title="Failed to load appointments"
            description={
              error.message ||
              "Something went wrong while fetching appointments."
            }
            onAction={refetch}
            icon={FaUserMd}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="pageContainer">
      {/* Header Section */}
      <div className="mb-8 mt-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-tranquil-teal to-custom-green rounded-xl flex items-center justify-center shadow-lg">
            <FaUserMd className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Appointments
            </h1>
            <p className="text-gray-600 text-sm">
              View all your appointments you have accepted
            </p>
          </div>
        </div>
      </div>
      <div className="w-full bg-white rounded-3xl shadow-md px-5 py-6 mb-6 md:mb-0">
        <h2 className="text-xl font-bold text-tranquil-teal mb-6 flex items-center justify-between">
          <span>My Appointments</span>
          {(searchTerm || showAllAppointments) && (
            <button
              onClick={handleReset}
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-lg transition-colors"
            >
              Reset View
            </button>
          )}
        </h2>

        {/* Show filters when there's a search term or showing all appointments */}
        {(searchTerm || showAllAppointments) && (
          <TableFilters
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            statusOptions={statusOptions}
            sortOptions={sortOptions}
            quickFilterStatuses={quickFilterStatuses}
          />
        )}

        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            {/* Search input text box */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-tranquil-teal" />
              </div>
              <input
                type="text"
                placeholder="Search by client name or booking reference..."
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-tranquil-teal focus:border-tranquil-teal transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <FaSearch className="text-tranquil-teal" />
                </button>
              )}
            </div>

            {!searchTerm && !showAllAppointments && (
              <button
                onClick={() => setShowAllAppointments(true)}
                className="px-4 py-3 bg-tranquil-teal text-white rounded-xl hover:bg-ever-green transition-colors font-medium text-sm"
              >
                Show All Appointments
              </button>
            )}
          </div>
        </div>

        {/* Show results only when searching or showing all appointments */}
        {searchTerm || showAllAppointments ? (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            {isLoading ? (
              <div className="h-96 flex items-center justify-center">
                <AdminTableSkeleton />
              </div>
            ) : appointments.length === 0 ? (
              <div className="h-96 flex items-center justify-center p-8">
                <EmptyState
                  icon={FaCalendarAlt}
                  title="No appointments found"
                  description={
                    searchTerm
                      ? "No appointments match your search criteria."
                      : "You don't have any appointments yet."
                  }
                />
              </div>
            ) : (
              <div className="h-[500px] sm:h-[500px] w-full min-w-full overflow-hidden flex flex-col">
                <DataTable
                  columns={columns}
                  data={filteredAppointments}
                  pagination
                  paginationPerPage={10}
                  paginationRowsPerPageOptions={[5, 10, 15, 20]}
                  highlightOnHover
                  striped
                  responsive
                  customStyles={customStyles}
                  noDataComponent={
                    <div className="p-8">
                      <EmptyState
                        icon={FaCalendarAlt}
                        title="No appointments match your filters"
                        description="Try adjusting your search criteria or filters."
                      />
                    </div>
                  }
                  fixedHeader
                  fixedHeaderScrollHeight="400px"
                  dense
                />
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <FaCalendarAlt className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-gray mb-2">
                  Find Your Appointments
                </h3>
                <p className="text-slate-gray mb-6">
                  Search for specific appointments or view all your scheduled
                  appointments.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                  <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Quick Search
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Search by client name</li>
                    <li>• Use booking reference</li>
                    <li>• Instant results</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
                  <h4 className="font-medium text-green-800 mb-2 flex items-center">
                    <FaCalendarAlt className="w-4 h-4 mr-2" />
                    View All
                  </h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• See all appointments</li>
                    <li>• Filter and sort</li>
                    <li>• Comprehensive view</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <ClientDetailsModal
        patient={selectedAppointment}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />

      {selectedAppointment && (
        <UpdateClientModal
          patient={selectedAppointment}
          isOpen={showUpdate}
          onClose={() => setShowUpdate(false)}
          onUpdate={handleUpdate}
          isUpdating={updateToOngoingMutation.isPending}
        />
      )}
    </div>
  );
};

export default ClientAppointments;
