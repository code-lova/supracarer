"use client";
import React from "react";
import {
  FiX,
  FiStar,
  FiCalendar,
  FiClock,
  FiMessageSquare,
  FiMapPin,
  FiUser,
} from "react-icons/fi";
import { FaUserMd, FaStethoscope, FaHeartbeat } from "react-icons/fa";
import DateFormatter from "@components/core/DateFormatter";

const ReviewsModal = ({ isOpen, onClose, healthWorker, reviews }) => {
  if (!isOpen) return null;

  // Render star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FiStar
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
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

  const getServiceIcon = (serviceType) => {
    switch (serviceType) {
      case "Aged Care":
        return <FaHeartbeat className="text-purple-500" />;
      case "Mental Health Support":
        return <FaUserMd className="text-blue-500" />;
      case "Nurse Escort":
        return <FaStethoscope className="text-green-500" />;
      case "Companionship Care":
        return <FiUser className="text-pink-500" />;
      default:
        return <FaStethoscope className="text-gray-500" />;
    }
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <img
                src={healthWorker.image}
                alt={healthWorker.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {healthWorker.name}
                </h2>
                <p className="text-gray-600">{healthWorker.specialty}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <FiMapPin className="w-4 h-4 mr-1" />
                  {healthWorker.location}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-1">
                  {renderStars(Math.round(averageRating))}
                </div>
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRatingColor(
                    averageRating
                  )}`}
                >
                  {averageRating.toFixed(1)}
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {reviews.length} review{reviews.length !== 1 ? "s" : ""}
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiX className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Reviews Content */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {reviews.length === 0 ? (
              <div className="text-center py-8">
                <FiMessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No reviews yet
                </h3>
                <p className="text-gray-600">
                  This health worker hasn't received any reviews yet.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    {/* Review Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={review.client.image}
                          alt={review.client.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">
                            {review.client.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {review.client.location}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          {renderStars(review.rating)}
                        </div>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRatingColor(
                            review.rating
                          )}`}
                        >
                          {review.rating}.0
                        </div>
                      </div>
                    </div>

                    {/* Appointment Info */}
                    <div className="mb-3 p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getServiceIcon(review.appointment.serviceType)}
                          <span className="text-sm font-medium text-gray-900">
                            {review.appointment.serviceType}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          REF: {review.appointment.bookingReference}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                        <div className="flex items-center">
                          <FiCalendar className="w-3 h-3 mr-1" />
                          <DateFormatter
                            date={review.appointment.date}
                            format="date"
                          />
                        </div>
                        <div className="flex items-center">
                          <FiClock className="w-3 h-3 mr-1" />
                          {review.appointment.duration}
                        </div>
                        <div className="flex item-center justify-between">
                          <span className="font-medium">
                            Shift: {review.appointment.shiftType}
                          </span>

                          <span className="font-medium">
                            Status: {review.appointment.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="mb-3">
                      <div className="flex items-center mb-2">
                        <FiMessageSquare className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">
                          Review
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        "{review.review}"
                      </p>
                    </div>

                    {/* Review Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200 text-xs text-gray-500">
                      <div>
                        <span className="font-medium">Reviewed:</span>{" "}
                        {review.reviewedAt}
                      </div>
                      <div>
                        <span className="font-medium">Service Date:</span>{" "}
                        <DateFormatter date={review.createdAt} format="date" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsModal;
