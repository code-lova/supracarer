"use client";
import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { FiUser, FiMail, FiBriefcase } from "react-icons/fi";
import { FaEye, FaBan } from "react-icons/fa";
import StatusPill from "../../core/StatusPill";
import UserDetailsModal from "./users-ui-kit/UserDetailsModal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllUsers,
  updateUser,
  blockUser,
} from "@service/request/admin/user";
import { FiRefreshCw } from "react-icons/fi";
import toast from "react-hot-toast";
import AdminTableSkeleton from "@components/core/skeleton/AdminTableSkeleton";
import ThreeDotDropdown from "@components/core/button/ThreeDotDropdown";
import ErrorState from "@components/core/ErrorState";

export default function Users() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [verifiedFilter, setVerifiedFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const sortBy = "created_at";
  const queryClient = useQueryClient();

  // Compose query params for API
  const queryParams = {
    search,
    role: roleFilter,
    email_verified:
      verifiedFilter === ""
        ? undefined
        : verifiedFilter === "verified"
        ? true
        : false,
    sort_by: sortBy,
    sort_order: sortOrder,
  };

  const {
    data: usersData,
    isLoading,
    isError,
    refetch,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["users", queryParams],
    queryFn: () => fetchAllUsers(queryParams),
    keepPreviousData: true,
    retry: false,
    staleTime: 60 * 1000, // 1 minute
  });

  // Support both array and object response
  const users = Array.isArray(usersData) ? usersData : usersData?.users || [];

  const updateMutation = useMutation({
    mutationFn: ({ id, values }) => updateUser(id, values),
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries(["users"]);
      setModalOpen(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update user");
    },
  });

  const blockUserMutation = useMutation({
    mutationFn: (userData) => blockUser(userData.uuid),
    onSuccess: (data, variables) => {
      // Use the original user's status to determine the action performed
      const wasActive = variables.originalStatus === "1";
      const action = wasActive ? "blocked" : "unblocked";
      toast.success(`User ${action} successfully`);
      queryClient.invalidateQueries(["users"]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to block/unblock user");
    },
  });

  const columns = useMemo(
    () => [
      {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "300px",
        cell: (row) => (
          <span className="flex items-center gap-1">
            <FiUser className="text-slate-gray" />
            <span className="text-haven-blue">{row.name}</span>
          </span>
        ),
      },
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
        name: "Role",
        selector: (row) => row.role,
        sortable: true,
        width: "160px",
        cell: (row) => (
          <span className="flex items-center">
            <FiBriefcase className="text-slate-gray mr-1" />
            <span className="capitalize text-haven-blue">{row.role}</span>
          </span>
        ),
      },
      {
        name: "Verified",
        selector: (row) => row.email_verified_at,
        sortable: true,
        width: "120px",
        cell: (row) => (
          <StatusPill
            status={row.email_verified_at ? "Verified" : "Unverified"}
            size="sm"
          />
        ),
      },
      {
        name: "Status",
        selector: (row) => row.is_active,
        sortable: true,
        width: "120px",
        cell: (row) => (
          <StatusPill
            status={row.is_active === "1" ? "Active" : "Blocked"}
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
              label: "View",
              onClick: () => handleViewUser(row),
              icon: <FaEye className="w-4 h-4" />,
            },
            {
              label: row.is_active === "1" ? "Block" : "Unblock",
              onClick: () => handleBlockUser(row),
              icon: <FaBan className="w-4 h-4" />,
              disabled: blockUserMutation.isLoading,
            },
          ];

          return (
            <ThreeDotDropdown
              options={dropdownOptions}
              menuId={`user-dropdown-${row.uuid || row.id}`}
            />
          );
        },
      },
    ],
    []
  );

  // Action handlers
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleBlockUser = (user) => {
    const action = user.is_active === "1" ? "block" : "unblock";
    const confirmMessage = `Are you sure you want to ${action} ${user.name}?`;

    if (window.confirm(confirmMessage)) {
      // Pass user data including original status for correct toast message
      blockUserMutation.mutate({
        uuid: user.uuid,
        originalStatus: user.is_active,
      });
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
        <h2 className="text-2xl font-bold mb-4 text-haven-blue">All Users</h2>
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-haven-blue w-full sm:w-1/3"
          />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-haven-blue w-full sm:w-1/4"
          >
            <option value="">All Roles</option>
            <option value="Client">Client</option>
            <option value="Healthworker">Health Worker</option>
            <option value="Admin">Admin</option>
          </select>
          <select
            value={verifiedFilter}
            onChange={(e) => setVerifiedFilter(e.target.value)}
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-haven-blue w-full sm:w-1/4"
          >
            <option value="">All Users</option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-haven-blue w-full sm:w-1/4"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
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
              title="Error loading users."
              error={error}
              onAction={refetch}
              className="py-12"
            />
          ) : (
            <DataTable
              columns={columns}
              data={users}
              customStyles={customStyles}
              responsive
              highlightOnHover
              pagination
            />
          )}
        </div>
      </div>
      <UserDetailsModal
        user={selectedUser}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onUpdate={(values) => {
          updateMutation.mutate({ id: selectedUser.uuid, values });
        }}
        isLoading={updateMutation.isLoading}
        error={updateMutation.error}
      />
    </>
  );
}
