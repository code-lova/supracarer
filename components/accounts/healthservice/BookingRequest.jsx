"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import BookingRequestModal from "./booking-request-ui-kit/BookingRequestModal";
import BookingRequestCard from "./booking-request-ui-kit/BookingRequestCard";
import ContactSupportModal from "./booking-request-ui-kit/ContactSupportModal";
import {
  processingBookingRequest,
  acceptBookingRequest,
} from "@service/request/healthworker/request";
import { FaCalendarAlt, FaExclamationTriangle } from "react-icons/fa";
import EmptyState from "@components/core/EmptyState";
import LoadingStateUI from "@components/core/loading";
import { useUserContext } from "@context/userContext";
import Link from "next/link";
import toast from "react-hot-toast";
import ErrorState from "@components/core/ErrorState";
import { isFeatureEnabled } from "@config/features";


const BookingRequest = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  const queryClient = useQueryClient();
  const { user } = useUserContext();
  const userDetails = user?.data;

  const grsEnabled = isFeatureEnabled("GUIDED_RATE_SYSTEM")

  // Check if user has guided rate system setup
  const hasGuidedRateSystem = grsEnabled && userDetails?.has_guided_rate_system === true;

  // Fetch processing booking requests
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["processingBookingRequests"],
    queryFn: processingBookingRequest,
    staleTime: 10 * 1000,
    retry: 2,
  });

  const bookingRequests = data?.data || [];

  // Mutation for accepting booking requests
  const confirmBookingMutation = useMutation({
    mutationFn: acceptBookingRequest,
    onSuccess: () => {
      toast.success("Status confirmed successfully!");
      queryClient.invalidateQueries({
        queryKey: ["processingBookingRequests"],
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to confirm booking request.");
    },
  });

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPatient(null);
  };

  const handleConfirm = (bookingUuid) => {
    confirmBookingMutation.mutate(bookingUuid);
  };

  const handleContactSupport = () => {
    setShowSupportModal(true);
  };

  const handleCloseSupportModal = () => {
    setShowSupportModal(false);
  };

  if (isLoading) {
    return (
      <div className="pageContainer">
        <div className="bg-white h-full rounded-3xl shadow-lg p-6 mb-6">
          <div className="mb-2">
            <h1 className="text-2xl lg:text-3xl font-bold text-ever-green mb-2">
              Assigned Booking Requests
            </h1>
            <p className="text-slate-gray text-sm">
              Review and confirm booking requests assigned to you by admin
            </p>
          </div>

          {/* Loading State */}
          <div className="flex flex-col items-center justify-center">
            <LoadingStateUI />
            <p className="text-slate-gray mt-4 text-lg">
              Loading booking requests...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pageContainer">
        <div className="bg-white h-[89vh] rounded-3xl shadow-lg p-6 mb-6">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-ever-green mb-2">
              Assigned Booking Requests
            </h1>
            <p className="text-slate-gray text-sm">
              Review and confirm booking requests assigned to you by admin
            </p>
          </div>

          {/* Error State */}
          <div className="flex flex-col items-center justify-center py-20">
            <ErrorState
              title="Error Loading Requests"
              description={error.message || "Unable to fetch booking request"}
              onAction={refetch}
              icon={FaCalendarAlt}
              size="md"
            />
          </div>
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
            <FaCalendarAlt className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Booking Request
            </h1>
            <p className="text-gray-600 text-sm">
              View all assigned booking request
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white h-[85vh] rounded-3xl shadow-lg p-6 mb-6">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-ever-green mb-2">
            Assigned Booking Requests
          </h1>
          <p className="text-slate-gray text-sm">
            Review and confirm booking requests assigned to you by admin
          </p>
        </div>

        {/* Check for Guided Rate System Setup */}
        {!hasGuidedRateSystem && grsEnabled ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-8 max-w-md text-center">
              <FaExclamationTriangle className="text-orange-500 text-5xl mx-auto mb-4" />
              <h3 className="text-xl font-bold text-orange-700 mb-3">
                Setup Required
              </h3>
              <p className="text-orange-600 mb-6 text-sm leading-relaxed">
                You need to setup your Guided Rate System before you can start
                accepting booking requests. This helps ensure proper pricing for
                your services.
              </p>
              <Link
                href="/health-service/guided-rate-system"
                className="inline-flex items-center px-6 py-3 bg-tranquil-teal text-white font-semibold rounded-lg hover:bg-tranquil-teal/90 transition-colors duration-200"
              >
                Setup Guided Rate System
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Booking Requests List */}
            {bookingRequests.length > 0 ? (
              <div className="max-w-2xl mx-auto space-y-6">
                {bookingRequests.map((request) => (
                  <BookingRequestCard
                    key={request.id}
                    request={request}
                    onViewDetails={handleViewDetails}
                    onConfirm={handleConfirm}
                    onContactSupport={handleContactSupport}
                    isProcessing={confirmBookingMutation.isPending}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No Assigned Booking Requests"
                description="You don't have any assigned booking requests at the moment. New assignments will appear here when admin assigns bookings to you."
                icon={FaCalendarAlt}
                iconClassName="w-16 h-16 text-gray-400"
              />
            )}
          </>
        )}

        <BookingRequestModal
          showModal={showModal}
          patient={selectedPatient}
          onClose={handleCloseModal}
        />

        <ContactSupportModal
          isOpen={showSupportModal}
          onClose={handleCloseSupportModal}
        />
      </div>
    </div>
  );
};

export default BookingRequest;
