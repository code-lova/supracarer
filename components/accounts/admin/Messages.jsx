"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import DataTable from "react-data-table-component";
import {
  FiMessageCircle,
  FiUser,
  FiCalendar,
  FiEye,
  FiSearch,
  FiCornerUpLeft,
} from "react-icons/fi";
import { FaEnvelope, FaReply } from "react-icons/fa";
import TableFilters from "@components/core/table/TableFilters";
import ThreeDotDropdown from "@components/core/button/ThreeDotDropdown";
import MessageModal from "./MessageModal";
import { getHealthworkerMessages } from "@service/request/admin/messages";
import DateFormatter from "@components/core/DateFormatter";
import StatusPill from "@components/core/StatusPill";
import EmptyState from "@components/core/EmptyState";
import ErrorState from "@components/core/ErrorState";

const Messages = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reset to first page when searching
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Build query parameters
  const queryParams = useMemo(
    () => ({
      page: currentPage,
      per_page: perPage,
      ...(debouncedSearchTerm && { search: debouncedSearchTerm }),
      ...(statusFilter !== "All" && { status: statusFilter }),
      ...(sortBy && { sort: sortBy }),
    }),
    [currentPage, perPage, debouncedSearchTerm, statusFilter, sortBy]
  );

  // Fetch messages data
  const {
    data: messagesData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["healthworkerMessages", queryParams],
    queryFn: () => getHealthworkerMessages(queryParams),
    keepPreviousData: true,
    staleTime: 30 * 1000, // 30 seconds
  });

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, sortBy]);

  // Status and sort options for filters
  const statusOptions = ["All", "Pending", "Replied"];
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "subject_asc", label: "Subject A-Z" },
    { value: "subject_desc", label: "Subject Z-A" },
  ];
  const quickFilterStatuses = ["Pending", "Replied"];

  // Get data from API response
  const messages = messagesData?.data || [];
  const totalRows = messagesData?.meta?.total || 0;


  // Priority badge component
  const PriorityBadge = ({ priority }) => {
    const priorityConfig = {
      High: "bg-red-100 text-red-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Low: "bg-green-100 text-green-800",
    };

    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          priorityConfig[priority] || "bg-gray-100 text-gray-800"
        }`}
      >
        {priority || "Normal"}
      </span>
    );
  };


  // Truncate text
  const truncateText = (text, maxLength = 50) => {
    if (!text) return "-";
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  // Table columns
  const columns = [
    {
      name: "Health Worker",
      selector: (row) => row.user?.name || "Unknown",
      sortable: true,
      minWidth: "200px",
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
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <FiUser className="w-5 h-5 text-gray-400" />
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900 truncate">
              {row.user?.name || "Unknown User"}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {row.user?.email || "No email"}
            </p>
          </div>
        </div>
      ),
    },
    {
      name: "Subject",
      selector: (row) => row.subject,
      sortable: true,
      minWidth: "250px",
      cell: (row) => (
        <div className="py-2">
          <p className="text-sm font-medium text-gray-900">
            {truncateText(row.subject, 40)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Ref: {row.reference || "N/A"}
          </p>
        </div>
      ),
    },
    {
      name: "Message",
      selector: (row) => row.message,
      minWidth: "300px",
      cell: (row) => (
        <div className="py-2">
          <p className="text-sm text-gray-700">
            {truncateText(row.message, 60)}
          </p>
        </div>
      ),
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      minWidth: "120px",
      cell: (row) => <StatusPill status={row.status} size="sm" />,
    },
    {
      name: "Replies",
      selector: (row) => row.reply_count || 0,
      sortable: true,
      minWidth: "100px",
      cell: (row) => (
        <div className="flex items-center space-x-1">
          <FaReply className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-700">{row.reply_count || 0}</span>
        </div>
      ),
    },
    {
      name: "Date",
      selector: (row) => row.created_at,
      sortable: true,
      minWidth: "150px",
      cell: (row) => (
        <div className="flex items-center space-x-1 py-2">
          <FiCalendar className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-700">
            <DateFormatter date={row.created_at} format="short" />
          </span>
        </div>
      ),
    },
    {
      name: "Actions",
      minWidth: "80px",
      cell: (row) => {
        const dropdownOptions = [
          {
            label: "View Message",
            onClick: () => handleViewMessage(row),
            icon: <FiEye className="w-4 h-4" />,
          },
          {
            label: "Reply",
            onClick: () => handleReplyMessage(row),
            icon: <FiCornerUpLeft className="w-4 h-4" />,
          },
        ];

        return (
          <ThreeDotDropdown
            options={dropdownOptions}
            menuId={`message-dropdown-${row.uuid || row.id}`}
          />
        );
      },
    },
  ];

  // Action handlers
  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const handleReplyMessage = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
    // The modal will handle showing the reply form
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  // Custom styles for the data table
  const customStyles = {
    header: {
      style: {
        minHeight: "56px",
      },
    },
    headRow: {
      style: {
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: "#e5e7eb",
        backgroundColor: "#f9fafb",
      },
    },
    headCells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: "#e5e7eb",
        },
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: "#e5e7eb",
        },
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <FaEnvelope className="w-6 h-6 mr-3 text-blue-600" />
            Support Messages
          </h1>
          <p className="text-gray-600 mt-1">
            Manage support messages from health workers
          </p>
        </div>

        <div className="flex items-center gap-3">
          {!isLoading && (
            <>
              <div className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
                {totalRows} Total Messages
              </div>
              <div className="px-3 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm font-medium">
                {messages.filter((msg) => msg.status === "Pending").length}{" "}
                Pending
              </div>
              <div className="px-3 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                {messages.filter((msg) => msg.status === "Replied").length}{" "}
                Replied
              </div>
            </>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by health worker name, email, subject, message, or reference..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Filters */}
      <TableFilters
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        statusOptions={statusOptions}
        sortOptions={sortOptions}
        quickFilterStatuses={quickFilterStatuses}
      />

      {/* Data Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <DataTable
          columns={columns}
          data={messages}
          progressPending={isLoading}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          paginationDefaultPage={currentPage}
          onChangeRowsPerPage={handlePerPageChange}
          onChangePage={handlePageChange}
          paginationRowsPerPageOptions={[10, 15, 25, 50]}
          customStyles={customStyles}
          highlightOnHover
          pointerOnHover
          responsive
          noDataComponent={
            isError ? (
              <ErrorState
                icon={FiMessageCircle}
                title="Failed to load messages"
                error={error}
                onAction={refetch}
                className="py-12"
              />
            ) : (
              <EmptyState
                icon={FiMessageCircle}
                title="No messages found"
                description={
                  searchTerm || statusFilter !== "All"
                    ? "Try adjusting your search terms or filters."
                    : "No support messages have been received yet."
                }
                className="py-12"
              />
            )
          }
        />
      </div>

      {/* Message Modal */}
      <MessageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        messageData={selectedMessage}
      />
    </div>
  );
};

export default Messages;
