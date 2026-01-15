"use client";
import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { FiMail, FiCloudLightning, FiCalendar, FiDelete } from "react-icons/fi";
import StatusPill from "../../core/StatusPill";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { FiRefreshCw } from "react-icons/fi";
import toast from "react-hot-toast";
import AdminTableSkeleton from "@components/core/skeleton/AdminTableSkeleton";
import ThreeDotDropdown from "@components/core/button/ThreeDotDropdown";
import ErrorState from "@components/core/ErrorState";
import {
  fetchAllSubscribers,
  deleteSubscriber,
} from "@service/request/admin/subscribers";
import DateFormatter from "@components/core/DateFormatter";

export default function Subscribers() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const queryClient = useQueryClient();

  // Compose query params for API
  const queryParams = {
    search,
    status: statusFilter,
  };

  const {
    data: subscribersData,
    isLoading,
    isError,
    refetch,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["subscribers", queryParams],
    queryFn: () => fetchAllSubscribers(queryParams),
    retry: false,
    staleTime: 60 * 1000, // 1 minute
  });

  // Support both array and object response
  const subscribers = Array.isArray(subscribersData)
    ? subscribersData
    : Array.isArray(subscribersData?.subscribers)
    ? subscribersData.subscribers
    : Array.isArray(subscribersData?.data)
    ? subscribersData.data
    : Array.isArray(subscribersData?.subscribers?.data)
    ? subscribersData.subscribers.data
    : [];

  //console.log("subscribers:", subscribers);

  const deleteSubscriberMutation = useMutation({
    mutationFn: (subscriberUuid) => deleteSubscriber(subscriberUuid),
    onSuccess: () => {
      toast.success("Subscriber deleted successfully");
      queryClient.invalidateQueries(["subscribers"]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete subscriber");
    },
  });

  const columns = useMemo(
    () => [
      {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
        width: "290px",
        cell: (row) => (
          <span className="flex items-center">
            <span className="text-haven-blue">{row.email}</span>
          </span>
        ),
      },
      {
        name: "Source",
        selector: (row) => row.source,
        sortable: true,
        width: "100px",
        cell: (row) => (
          <span className="flex items-center">
            <span className="text-haven-blue">{row.source}</span>
          </span>
        ),
      },
      {
        name: "IP Address",
        selector: (row) => row.ip_address,
        sortable: true,
        width: "140px",
        cell: (row) => (
          <span className="flex items-center">
            <FiCloudLightning className="text-slate-gray mr-1" />
            <span className="capitalize text-haven-blue">{row.ip_address}</span>
          </span>
        ),
      },
      {
        name: "Subscribed At",
        selector: (row) => row.subscribed_at,
        sortable: true,
        width: "160px",
        cell: (row) => (
          <span className="flex items-center">
            <FiCalendar className="text-slate-gray mr-1" />
            <span className="capitalize text-haven-blue">
              <DateFormatter date={row.subscribed_at} format="short" />
            </span>
          </span>
        ),
      },
      {
        name: "Unsubscribed At",
        selector: (row) => row.unsubscribed_at,
        sortable: true,
        width: "160px",
        cell: (row) => (
          <span className="flex items-center">
            <FiCalendar className="text-slate-gray mr-1" />
            <span className="capitalize text-haven-blue">
               <DateFormatter date={row.unsubscribed_at} format="short" />
            </span>
          </span>
        ),
      },
      {
        name: "Status",
        selector: (row) => row.status,
        sortable: true,
        width: "160px",
        cell: (row) => (
          <StatusPill
            status={row.status === "active" ? "Active" : "Unsubscribed"}
            size="sm"
          />
        ),
      },
      {
        name: "Actions",
        cell: (row) => {
          const dropdownOptions = [
            {
              label: "Send Email",
              href: `/admin/send-emails`,
              icon: <FiMail className="w-4 h-4" />,
            },
            {
              label: "Delete Subscriber",
              onClick: () => handleDeleteSubscriber(row),
              icon: <FiDelete className="w-4 h-4" />,
              disabled: deleteSubscriberMutation.isLoading,
            },
          ];

          return (
            <ThreeDotDropdown
              options={dropdownOptions}
              menuId={`subscriber-dropdown-${row.uuid || row.id}`}
            />
          );
        },
      },
    ],
    []
  );

  const handleDeleteSubscriber = (subscriber) => {
    const confirmMessage = `Are you sure you want to delete subscriber ${subscriber.email}?`;

    if (window.confirm(confirmMessage)) {
      // Pass subscriber data for deletion
      deleteSubscriberMutation.mutate(subscriber.uuid);
    }
  };

  const customStyles = useMemo(
    () => ({
      table: {
        style: {
          minWidth: "100%",
        },
      },
      headRow: {
        style: {
          backgroundColor: "#f3f4f6",
          fontWeight: "bold",
          fontSize: "1rem",
        },
      },
      rows: {
        style: {
          fontSize: "0.95rem",
        },
      },
    }),
    []
  );

  return (
    <>
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 md:px-1 py-6">
        <h2 className="text-2xl font-bold mb-4 text-haven-blue">
          All Subscribers
        </h2>
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            placeholder="Search by email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-haven-blue w-full sm:w-1/3"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-haven-blue w-full sm:w-1/4"
          >
            <option value="">All Subscribers</option>
            <option value="active">Subscribed</option>
            <option value="unsubscribed">Unsubscribed</option>
          </select>
        </div>
        <div
          className="bg-white rounded-xl shadow p-2 sm:p-4"
          style={{ maxHeight: 580, overflow: "auto" }}
        >
          {isLoading || isFetching ? (
            <AdminTableSkeleton rows={4} />
          ) : isError ? (
            <ErrorState
              icon={FiRefreshCw}
              title="Error loading subscribers."
              error={error}
              onAction={refetch}
              className="py-12"
            />
          ) : (
            <DataTable
              columns={columns}
              data={subscribers}
              customStyles={customStyles}
              responsive
              highlightOnHover
              pagination
              noDataComponent={<div>No subscribers found</div>}
            />
          )}
        </div>
      </div>
    </>
  );
}
