"use client";
import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { FiUser, FiBriefcase, FiMessageCircle } from "react-icons/fi";
import { FaBan } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getDeletedAccount } from "@service/request/admin/user";
import AdminTableSkeleton from "@components/core/skeleton/AdminTableSkeleton";
import ErrorState from "@components/core/ErrorState";
import EmptyState from "@components/core/EmptyState";
import DateFormatter from "@components/core/DateFormatter";

const DeletedAccount = () => {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const sortBy = "created_at";

  // Compose query params for API
  const queryParams = {
    search,
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
    queryKey: ["deletedaccount", queryParams],
    queryFn: () => getDeletedAccount(queryParams),
    keepPreviousData: true,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minute
  });

  // Support both array and object response
  const users = Array.isArray(usersData) ? usersData : usersData?.users || [];

  console.log("deleetd acc", users);

  const columns = useMemo(
    () => [
      {
        name: "FullName",
        selector: (row) => row.fullname,
        sortable: true,
        width: "200px",
        cell: (row) => (
          <span className="flex items-center gap-1">
            <FiUser className="text-slate-gray" />
            <span className="text-haven-blue">{row.fullname}</span>
          </span>
        ),
      },
      {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
        width: "200px",
        cell: (row) => (
          <span className="flex items-center">
            <span className="text-haven-blue">{row.email}</span>
          </span>
        ),
      },
      {
        name: "Reasons for deletion",
        selector: (row) => row.reasons_for_deletion,
        sortable: true,
        width: "560px",
        cell: (row) => (
          <span className="flex items-center">
            <span className="capitalize text-haven-blue">
              {row.reasons_for_deletion}
            </span>
          </span>
        ),
      },

      {
        name: "Deleted At",
        selector: (row) => row.created_at,
        sortable: true,
        width: "250px",
        cell: (row) => (
          <span className="flex items-center">
            <span className="capitalize text-haven-blue">
              <DateFormatter date={row.created_at} format="datetime" />
            </span>
          </span>
        ),
      },
    ],
    []
  );

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
          All Deleted Users
        </h2>
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-haven-blue w-full sm:w-1/3"
          />

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
          ) : (
            <DataTable
              columns={columns}
              data={users}
              customStyles={customStyles}
              responsive
              highlightOnHover
              pagination
              noDataComponent={
                isError ? (
                  <ErrorState
                    icon={FiUser}
                    title="Error loading deleted users."
                    error={error}
                    onAction={refetch}
                    className="py-12"
                  />
                ) : (
                  <EmptyState
                    icon={FiUser}
                    title="Users Not found"
                    description={
                      search
                        ? "Try adjusting your search terms."
                        : "No Deleted user account found"
                    }
                    className="py-12"
                  />
                )
              }
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DeletedAccount;
