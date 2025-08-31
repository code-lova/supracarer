"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FiStar,
  FiMapPin,
  FiFilter,
  FiSearch,
  FiMessageSquare,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
} from "react-icons/fi";
import ReviewsModal from "./reviewUi-kit/ReviewsModal";
import HealthWorkerCardSkeletonGrid from "../../core/skeleton/HealthWorkerCardSkeleton";
import EmptyState from "@components/core/EmptyState";
import { fetchRatingsReviews } from "@service/request/admin/reviewsRatings";

const RatingsReviews = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("all");
  const [filterService, setFilterService] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalData, setModalData] = useState({
    isOpen: false,
    healthWorker: null,
    reviews: [],
  });

  const ITEMS_PER_PAGE = 9; // 3x3 grid for large screens

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Build query parameters
  const queryParams = useMemo(
    () => ({
      page: currentPage,
      limit: ITEMS_PER_PAGE,
      ...(debouncedSearchTerm && { search: debouncedSearchTerm }),
      ...(filterRating !== "all" && { rating: filterRating }),
      ...(filterService !== "all" && { service_type: filterService }),
    }),
    [currentPage, debouncedSearchTerm, filterRating, filterService]
  );

  // Fetch ratings and reviews data
  const {
    data: ratingsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["ratingsReviews", queryParams],
    queryFn: () => fetchRatingsReviews(queryParams),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, filterRating, filterService]);

  // Process the API data - group reviews by health worker
  const groupReviewsByHealthWorker = (reviews) => {
    const grouped = {};

    reviews.forEach((review) => {
      const healthWorkerId = review.healthworker.uuid;

      if (!grouped[healthWorkerId]) {
        grouped[healthWorkerId] = {
          healthWorker: {
            id: review.healthworker.uuid,
            name: review.healthworker.name,
            image: review.healthworker.image,
            specialty: "Health Worker", // Default since not in API
            location: review.healthworker.region || review.healthworker.country,
          },
          reviews: [],
          totalReviews: 0,
          averageRating: 0,
        };
      }

      // Add the review to this health worker
      grouped[healthWorkerId].reviews.push({
        id: review.id,
        rating: review.rating,
        review: review.review,
        reviewedAt: review.review_age,
        createdAt: review.created_at,
        client: {
          id: review.client.uuid,
          name: review.client.name,
          image: review.client.image,
          location: review.client.country,
        },
        appointment: {
          id: review.booking_appt.uuid,
          serviceType: review.medical_services_provided.join(", "),
          shiftType: `${review.booking_appt.care_duration_value}-hour (${review.booking_appt.care_type})`,
          date: review.booking_appt.start_date,
          duration: `${review.booking_appt.care_duration_value} hours`,
          status: review.booking_appt.status,
          bookingReference: review.booking_appt.booking_reference,
        },
      });
    });

    // Calculate averages for each health worker
    Object.values(grouped).forEach((group) => {
      group.totalReviews = group.reviews.length;
      group.averageRating =
        group.reviews.reduce((sum, review) => sum + review.rating, 0) /
        group.totalReviews;
    });

    return Object.values(grouped);
  };

  // Get the data from API response
  const reviews = ratingsData?.data || [];
  const healthWorkers = groupReviewsByHealthWorker(reviews);
  const totalItems = ratingsData?.meta?.total || 0;
  const totalPages = ratingsData?.meta?.last_page || 1;
  const currentItems = healthWorkers;

  // Modal handlers
  const openModal = (healthWorker, reviews) => {
    setModalData({
      isOpen: true,
      healthWorker,
      reviews,
    });
  };

  const closeModal = () => {
    setModalData({
      isOpen: false,
      healthWorker: null,
      reviews: [],
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Render star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FiStar
        key={index}
        className={`w-4 h-4 ${
          index < Math.round(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  // Get rating color
  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "text-green-600 bg-green-100";
    if (rating >= 3.5) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Health Worker Reviews
          </h1>
          <p className="text-gray-600">
            Monitor and manage health worker ratings and client feedback
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
            {currentItems.length} Health Workers
          </div>
          <div className="px-3 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
            {currentItems.reduce(
              (sum, group) => sum + (group.totalReviews || 0),
              0
            )}{" "}
            Total Reviews
          </div>
          {totalPages > 1 && (
            <div className="px-3 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium">
              Page {currentPage} of {totalPages}
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by health worker, client, service type, or review content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Rating Filter */}
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-400" />
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>

          {/* Service Filter */}
          <div>
            <select
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Services</option>
              <option value="Aged Care">Aged Care</option>
              <option value="Mental Health Support">
                Mental Health Support
              </option>
              <option value="Nurse Escort">Nurse Escort</option>
              <option value="Companionship Care">Companionship Care</option>
            </select>
          </div>
        </div>
      </div>

      {/* Health Worker Cards Grid */}
      {isLoading ? (
        <HealthWorkerCardSkeletonGrid count="3" />
      ) : isError ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium text-red-900 mb-2">
            Failed to load reviews
          </h3>
          <p className="text-red-700 mb-4">
            {error?.message || "An error occurred while fetching the data."}
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {currentItems.map((group) => (
            <div
              key={group.healthWorker.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              {/* Health Worker Card */}
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={group.healthWorker.image}
                    alt={group.healthWorker.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {group.healthWorker.name}
                    </h3>
                    <p className="text-gray-600 text-sm truncate">
                      {group.healthWorker.specialty}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <FiMapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span className="truncate">
                        {group.healthWorker.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rating and Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-1 mb-1">
                      {renderStars(group.averageRating)}
                    </div>
                    <div
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRatingColor(
                        group.averageRating
                      )}`}
                    >
                      {group.averageRating.toFixed(1)}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      {group.totalReviews}
                    </p>
                    <p className="text-xs text-gray-600">
                      review{group.totalReviews !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                {/* View Reviews Button */}
                <button
                  onClick={() => openModal(group.healthWorker, group.reviews)}
                  className="w-full flex items-center justify-center py-2 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors duration-200 font-medium text-sm"
                >
                  <FiEye className="w-4 h-4 mr-2" />
                  View All Reviews
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && !isError && (
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>

          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show first page, last page, current page, and pages around current page
              const showPage =
                page === 1 ||
                page === totalPages ||
                Math.abs(page - currentPage) <= 1;

              if (!showPage) {
                // Show ellipsis for gaps
                if (page === 2 && currentPage > 4) {
                  return (
                    <span key={page} className="px-2 py-1 text-gray-500">
                      ...
                    </span>
                  );
                }
                if (page === totalPages - 1 && currentPage < totalPages - 3) {
                  return (
                    <span key={page} className="px-2 py-1 text-gray-500">
                      ...
                    </span>
                  );
                }
                return null;
              }

              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <FiChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      )}

      {/* Empty State */}
      {currentItems.length === 0 && !isLoading && !isError && (
        <EmptyState
          icon={FiMessageSquare}
          title="No health workers found"
          description={
            searchTerm || filterRating !== "all" || filterService !== "all"
              ? "Try adjusting your search terms or filters to find health workers."
              : "No health workers with reviews available at the moment."
          }
          className="py-12"
        />
      )}

      {/* Reviews Modal */}
      <ReviewsModal
        isOpen={modalData.isOpen}
        onClose={closeModal}
        healthWorker={modalData.healthWorker}
        reviews={modalData.reviews}
      />

      {/* Overall Summary Stats */}
      {ratingsData?.summary && !isError && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Overall Review Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {ratingsData.summary.rating_distribution.map((item) => (
              <div key={item.rating} className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <span className="text-sm font-medium">{item.rating}</span>
                  <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {item.count}
                </div>
                <div className="text-xs text-gray-600">{item.percentage}%</div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Platform Average Rating:</span>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {renderStars(Math.round(ratingsData.summary.average_rating))}
                </div>
                <span className="font-semibold text-gray-900">
                  {ratingsData.summary.average_rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingsReviews;
