"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DataTable from "react-data-table-component";

import {
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiClock,
  FiUser,
  FiMessageSquare,
  FiX,
  FiHash,
} from "react-icons/fi";
import {
  FaTicketAlt,
  FaEnvelopeOpen,
  FaEnvelope,
  FaExclamationCircle,
  FaReply,
} from "react-icons/fa";
import {
  fetchSupportTickets,
  updateTicketStatus,
} from "@service/request/admin/supportTicket";
import ThreeDotDropdown from "@components/core/button/ThreeDotDropdown";
import StatusPill from "../../core/StatusPill";
import SupportTicketTableSkeleton from "@components/core/skeleton/SupportTicketTableSkeleton";
import EmptyState from "@components/core/EmptyState";
import TimeAgo from "@components/core/TimeAgo";
import DateFormatter from "@components/core/DateFormatter";

const SupportTicket = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(15);

  // Fetch support tickets with React Query
  const {
    data: ticketsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [
      "supportTickets",
      searchTerm,
      statusFilter,
      sortOption,
      currentPage,
      perPage,
    ],
    queryFn: () =>
      fetchSupportTickets({
        search: searchTerm || undefined,
        status: statusFilter || undefined,
        sort: sortOption,
        page: currentPage,
        per_page: perPage,
      }),
    keepPreviousData: true,
    staleTime: 30 * 1000, // 30 seconds
  });

  const tickets = ticketsData?.data || [];
  const meta = ticketsData?.meta || {};
  const summary = ticketsData?.summary || {};

  // Update ticket status mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ ticketId, status }) => updateTicketStatus(ticketId, status),
    onSuccess: () => {
      // Refetch tickets data to update the table
      refetch();
      // Also invalidate the support tickets cache
      queryClient.invalidateQueries(["supportTickets"]);
    },
    onError: (error) => {
      toast.error(error.message || "failed to update status");
    },
  });

  // Handle actions
  const handleReplyTicket = (ticket) => {
    console.log("Reply to ticket:", ticket.reference);
    // Navigate to ticket reply page with ticket UUID
    router.push(`/admin/support-ticket/reply?id=${ticket.uuid}`);
  };

  const handleCloseTicket = (ticket) => {
    console.log("Close/Reopen ticket:", ticket.reference);
    const newStatus = ticket.status === "Open" ? "Closed" : "Open";
    updateStatusMutation.mutate({
      ticketId: ticket.uuid,
      status: newStatus,
    });
  };

  // Table columns
  const columns = useMemo(
    () => [
      {
        name: "Reference",
        selector: (row) => row.reference,
        sortable: true,
        width: "120px",
        cell: (row) => (
          <div className="flex items-center">
            <FiHash className="text-gray-400 mr-1 text-sm" />
            <span className="font-mono text-sm font-medium text-blue-600">
              {row.reference}
            </span>
          </div>
        ),
      },
      {
        name: "Client",
        selector: (row) => row.user?.name || "Unknown",
        sortable: true,
        width: "200px",
        cell: (row) => (
          <div className="flex items-center space-x-3">
            {row.user?.image ? (
              <img
                src={row.user.image}
                alt={row.user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                <FiUser className="text-white text-sm" />
              </div>
            )}
            <div className="min-w-0">
              <div className="font-medium text-gray-900 truncate">
                {row.user?.name || "Unknown Client"}
              </div>
              <div className="text-sm text-gray-500 truncate">
                {row.user?.email || "No email"}
              </div>
            </div>
          </div>
        ),
      },
      {
        name: "Subject",
        selector: (row) => row.subject,
        sortable: true,
        width: "250px",
        cell: (row) => (
          <div className="max-w-xs">
            <div
              className="font-medium text-gray-900 truncate"
              title={row.subject} // Show full text on hover
            >
              {row.subject && row.subject.length > 35
                ? `${row.subject.substring(0, 35)}...`
                : row.subject}
            </div>
            <div className="text-sm text-gray-500 flex items-center mt-1">
              <FiMessageSquare className="mr-1" />
              {row.total_messages || 0} messages
            </div>
          </div>
        ),
      },
      {
        name: "Status",
        selector: (row) => row.status,
        sortable: true,
        width: "120px",
        cell: (row) => (
          <StatusPill
            status={row.status}
            size="sm"
            customColors={{
              Open: "bg-green-100 text-green-800",
              Closed: "bg-gray-100 text-gray-800",
            }}
          />
        ),
      },
      {
        name: "Priority",
        selector: (row) => row.awaiting_response,
        width: "140px",
        cell: (row) => (
          <div className="flex items-center">
            {row.awaiting_response === "admin" ? (
              <div className="flex items-center text-orange-600 bg-orange-100 px-2 py-1 rounded-full text-xs">
                <FaExclamationCircle className="mr-1" />
                Your Reply
              </div>
            ) : (
              <div className="flex items-center text-blue-600 bg-blue-100 px-2 py-1 rounded-full text-xs">
                <FiClock className="mr-1" />
                Client Turn
              </div>
            )}
          </div>
        ),
      },
      {
        name: "Last Activity",
        selector: (row) => row.last_message_at || row.created_at,
        sortable: true,
        width: "140px",
        cell: (row) => (
          <div className="text-sm">
            <div className="text-gray-900">
              <TimeAgo timestamp={row.last_message_at || row.created_at} format="custom" />
            </div>
            <div className="text-gray-500 text-xs">
              {row.last_sender?.name || "System"}
            </div>
          </div>
        ),
      },
      {
        name: "Created",
        selector: (row) => row.created_at,
        sortable: true,
        width: "140px",
        cell: (row) => (
          <div className="text-sm text-gray-600">
            <DateFormatter date={row.created_at} format="datetime" />
          </div>
        ),
      },
      {
        name: "Actions",
        width: "80px",
        cell: (row) => (
          <ThreeDotDropdown
            options={[
              {
                label: "Reply",
                onClick: () => handleReplyTicket(row),
                icon: <FaReply className="text-blue-500" />,
              },
              {
                label: row.status === "Open" ? "Close Ticket" : "Reopen Ticket",
                onClick: () => handleCloseTicket(row),
                icon:
                  row.status === "Open" ? (
                    <FiX className="text-red-500" />
                  ) : (
                    <FaEnvelopeOpen className="text-green-500" />
                  ),
                danger: row.status === "Open",
              },
            ]}
            menuId={`ticket-menu-${row.id}`}
          />
        ),
      },
    ],
    []
  );

  // Custom table styles
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#f8fafc",
        borderBottom: "1px solid #e2e8f0",
        fontSize: "14px",
        fontWeight: "600",
        color: "#374151",
      },
    },
    headCells: {
      style: {
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
    cells: {
      style: {
        paddingLeft: "16px",
        paddingRight: "16px",
        paddingTop: "12px",
        paddingBottom: "12px",
      },
    },
    rows: {
      style: {
        "&:hover": {
          backgroundColor: "#f8fafc",
        },
      },
    },
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Handle filter
  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  // Handle sort
  const handleSort = (sort) => {
    setSortOption(sort);
    setCurrentPage(1);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setSortOption("newest");
    setCurrentPage(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <FaTicketAlt className="mr-3 text-blue-500" />
              Support Tickets
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and respond to client support requests
            </p>
          </div>
          <button
            onClick={() => refetch()}
            className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <FiRefreshCw className="mr-2" />
            Refresh
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">
                  Total Tickets
                </p>
                <p className="text-2xl font-bold text-blue-900">
                  {summary.total_tickets || 0}
                </p>
              </div>
              <FaTicketAlt className="text-blue-500 text-2xl" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">
                  Open Tickets
                </p>
                <p className="text-2xl font-bold text-green-900">
                  {summary.open_tickets || 0}
                </p>
              </div>
              <FaEnvelopeOpen className="text-green-500 text-2xl" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  Closed Tickets
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {summary.closed_tickets || 0}
                </p>
              </div>
              <FaEnvelope className="text-gray-500 text-2xl" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by reference, subject, client name or email..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <FiFilter className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Status</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Sort */}
          <select
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="subject_asc">Subject A-Z</option>
            <option value="subject_desc">Subject Z-A</option>
            <option value="status_asc">Status A-Z</option>
            <option value="status_desc">Status Z-A</option>
          </select>

          {/* Reset */}
          {(searchTerm || statusFilter || sortOption !== "newest") && (
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden">
        {isLoading ? (
          <SupportTicketTableSkeleton rows={5} />
        ) : isError ? (
          <div className="p-6">
            <EmptyState
              icon={FaTicketAlt}
              title="Error Loading Tickets"
              description={
                error?.message || "Something went wrong. Please try again."
              }
            />
          </div>
        ) : tickets.length === 0 ? (
          <div className="p-6">
            <EmptyState
              icon={FaTicketAlt}
              title="No Support Tickets Found"
              description={
                searchTerm || statusFilter
                  ? "No tickets match your current filters."
                  : "No support tickets have been created yet."
              }
            />
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={tickets}
            customStyles={customStyles}
            responsive
            highlightOnHover
            pointerOnHover
            pagination
            paginationServer
            paginationTotalRows={meta.total || 0}
            paginationPerPage={perPage}
            paginationRowsPerPageOptions={[10, 15, 25, 50]}
            onChangeRowsPerPage={(newPerPage) => {
              setPerPage(newPerPage);
              setCurrentPage(1);
            }}
            onChangePage={setCurrentPage}
            paginationDefaultPage={currentPage}
          />
        )}
      </div>
    </div>
  );
};

export default SupportTicket;
