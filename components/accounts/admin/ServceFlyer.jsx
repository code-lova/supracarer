import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field } from "formik";
import {
  SearchIcon,
  FilterIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  EyeIcon,
  EyeOffIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { serviceFlyerService } from "../../../service/request/admin/serviceFlyerRequest";
import {
  targetAudienceOptions,
  statusFilterOptions,
} from "../../../schema/admin/serviceFlyerSchema";
import ServiceFlyerEditModal from "./ServiceFlyerEditModal";
import LoaderButton from "../../core/LoaderButton";
import Spinner from "../../core/Spinner";
import EmptyState from "../../core/EmptyState";
import ErrorState from "../../core/ErrorState";

const ServiceFlyer = () => {
  const [filters, setFilters] = useState({
    search: "",
    target_audience: "",
    status: "",
    page: 1,
    per_page: 12,
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFlyer, setSelectedFlyer] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const queryClient = useQueryClient();

  // Fetch service flyers
  const {
    data: flyersData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["serviceFlyers", filters],
    queryFn: () => serviceFlyerService.getServiceFlyers(filters),
    keepPreviousData: true,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: serviceFlyerService.deleteServiceFlyer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceFlyers"] });
    },
  });

  // Toggle status mutation
  const toggleStatusMutation = useMutation({
    mutationFn: serviceFlyerService.toggleServiceFlyerStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceFlyers"] });
    },
  });

  const flyers = flyersData?.data?.data || [];
  const pagination = useMemo(
    () => ({
      currentPage: flyersData?.data?.current_page || 1,
      totalPages: flyersData?.data?.last_page || 1,
      total: flyersData?.data?.total || 0,
      perPage: flyersData?.data?.per_page || 12,
    }),
    [flyersData]
  );

  const handleSearch = (values) => {
    setFilters((prev) => ({ ...prev, ...values, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleCreateNew = () => {
    setSelectedFlyer(null);
    setIsEditModalOpen(true);
  };

  const handleEdit = (flyer) => {
    setSelectedFlyer(flyer);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (flyer) => {
    if (window.confirm(`Are you sure you want to delete "${flyer.title}"?`)) {
      try {
        await deleteMutation.mutateAsync(flyer.uuid);
      } catch (error) {
        console.error("Error deleting flyer:", error);
        alert("Failed to delete flyer. Please try again.");
      }
    }
  };

  const handleToggleStatus = async (flyer) => {
    try {
      await toggleStatusMutation.mutateAsync(flyer.uuid);
    } catch (error) {
      console.error("Error toggling status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const getAudienceBadgeColor = (audience) => {
    switch (audience) {
      case "client":
        return "bg-blue-100 text-blue-800";
      case "healthworker":
        return "bg-green-100 text-green-800";
      case "both":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (error) {
    return (
      <ErrorState message="Failed to load service flyers" onRetry={refetch} />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Service Flyers</h1>
          <p className="text-gray-600">
            Manage promotional flyers for your services
          </p>
        </div>
        <LoaderButton
          onClick={handleCreateNew}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          Create New Flyer
        </LoaderButton>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <Formik
          initialValues={filters}
          onSubmit={handleSearch}
          enableReinitialize
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1">
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Field
                      name="search"
                      type="text"
                      placeholder="Search flyers by title or description..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Filter Toggle */}
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
                    showFilters
                      ? "bg-blue-50 border-blue-300 text-blue-700"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FilterIcon className="w-4 h-4" />
                  Filters
                </button>

                {/* Search Button */}
                <LoaderButton
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Search
                </LoaderButton>
              </div>

              {/* Expanded Filters */}
              {showFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Target Audience
                      </label>
                      <Field
                        name="target_audience"
                        as="select"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">All Audiences</option>
                        {targetAudienceOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Field>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <Field
                        name="status"
                        as="select"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {statusFilterOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Field>
                    </div>
                  </div>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>

      {/* Results Summary */}
      {!isLoading && (
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>
            Showing {flyers.length} of {pagination.total} flyers
          </span>
          <span>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
        </div>
      )}

      {/* Flyers Grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : flyers.length === 0 ? (
        <EmptyState
          message="No service flyers found"
          description="Create your first service flyer to promote your services"
          action={
            <LoaderButton
              onClick={handleCreateNew}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create New Flyer
            </LoaderButton>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {flyers.map((flyer) => (
            <div
              key={flyer.uuid}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] bg-gray-100">
                <img
                  src={flyer.image_url}
                  alt={flyer.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Status overlay */}
                {!flyer.is_active && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="bg-red-600 text-white px-2 py-1 rounded text-sm font-medium">
                      Inactive
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">
                    {flyer.title}
                  </h3>
                </div>

                {flyer.description && (
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {flyer.description}
                  </p>
                )}

                {/* Meta information */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Sort: {flyer.sort_order}</span>
                    <span>
                      {new Date(flyer.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAudienceBadgeColor(
                        flyer.target_audience
                      )}`}
                    >
                      {
                        targetAudienceOptions.find(
                          (opt) => opt.value === flyer.target_audience
                        )?.label
                      }
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleEdit(flyer)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit flyer"
                    >
                      <EditIcon className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleToggleStatus(flyer)}
                      disabled={toggleStatusMutation.isPending}
                      className={`p-2 rounded-lg transition-colors ${
                        flyer.is_active
                          ? "text-gray-400 hover:text-orange-600 hover:bg-orange-50"
                          : "text-gray-400 hover:text-green-600 hover:bg-green-50"
                      }`}
                      title={
                        flyer.is_active ? "Deactivate flyer" : "Activate flyer"
                      }
                    >
                      {flyer.is_active ? (
                        <EyeOffIcon className="w-4 h-4" />
                      ) : (
                        <EyeIcon className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(flyer)}
                      disabled={deleteMutation.isPending}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete flyer"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <span>by</span>
                    <span className="font-medium">{flyer.creator?.name}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage <= 1 || isLoading}
              className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>

            <div className="flex space-x-1">
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1
              ).map((page) => {
                const isCurrentPage = page === pagination.currentPage;
                const shouldShow =
                  page === 1 ||
                  page === pagination.totalPages ||
                  (page >= pagination.currentPage - 1 &&
                    page <= pagination.currentPage + 1);

                if (
                  !shouldShow &&
                  page !== pagination.currentPage - 2 &&
                  page !== pagination.currentPage + 2
                ) {
                  return null;
                }

                if (
                  page === pagination.currentPage - 2 ||
                  page === pagination.currentPage + 2
                ) {
                  return (
                    <span key={page} className="px-2 py-1 text-gray-400">
                      ...
                    </span>
                  );
                }

                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    disabled={isLoading}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                      isCurrentPage
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={
                pagination.currentPage >= pagination.totalPages || isLoading
              }
              className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <ServiceFlyerEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        flyer={selectedFlyer}
        onSuccess={() => {
          // Modal handles success and closes itself
        }}
      />
    </div>
  );
};

export default ServiceFlyer;
