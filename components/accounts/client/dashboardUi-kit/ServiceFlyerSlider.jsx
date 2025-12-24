"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FiChevronLeft,
  FiChevronRight,
  FiGift,
  FiAlertCircle,
} from "react-icons/fi";
import { serviceFlyerRequest } from "@service/request/client/serviceFlyer";
import { Spinner } from "@components/core/Spinner";
import ErrorState from "@components/core/ErrorState";
import EmptyState from "@components/core/EmptyState";

const ServiceFlyerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const {
    data: flyersResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["clientServiceFlyers"],
    queryFn: serviceFlyerRequest.getClientServiceFlyers,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });

  const flyers = flyersResponse?.data || [];

  const nextSlide = useCallback(() => {
    if (flyers.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % flyers.length);
  }, [flyers.length]);

  /**
   * Move to the previous slide (loops to end)
   */
  const prevSlide = useCallback(() => {
    if (flyers.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + flyers.length) % flyers.length);
  }, [flyers.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // ============== Auto-Advance Effect ==============
  useEffect(() => {
    // Don't auto-advance if paused, loading, or no flyers
    if (isPaused || isLoading || flyers.length <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused, isLoading, flyers.length, nextSlide]);

  // Reset index when flyers change
  useEffect(() => {
    setCurrentIndex(0);
  }, [flyers.length]);

  // ============== Loading State ==============
  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-center h-48">
          <Spinner size="medium" />
        </div>
      </div>
    );
  }

  // ============== Error State ==============
  if (error) {
    return (
      <div className="w-full bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700">
            🎉 Promotions & Updates
          </h3>
        </div>
        <ErrorState
          icon={FiAlertCircle}
          title="Unable to load promotions"
          description="Please try again later"
          iconClassName="text-3xl text-red-400"
          className="py-8"
        />
      </div>
    );
  }

  // ============== Empty State ==============
  if (flyers.length === 0) {
    return (
      <div className="w-full bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700">
            🎉 Promotions & Updates
          </h3>
        </div>
        <EmptyState
          icon={FiGift}
          title="No promotions right now"
          description="Check back soon for updates!"
          iconClassName="text-3xl text-carer-blue"
          className="py-8"
        />
      </div>
    );
  }

  return (
    <div
      className="w-full bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700">
          🎉 Promotions & Updates
        </h3>
      </div>

      {/* Slider Container */}
      <div className="relative">
        {/* Slides Wrapper */}
        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {flyers.map((flyer) => (
              <div key={flyer.uuid} className="w-full flex-shrink-0">
                {/* Image Container - Responsive aspect ratio */}
                <div className="relative w-full ">
                  <img
                    src={flyer.image_url}
                    alt={flyer.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows - Only show if more than 1 slide */}
        {flyers.length > 1 && (
          <>
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
              style={{ opacity: isPaused ? 1 : 0.7 }}
              aria-label="Previous slide"
            >
              <FiChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
              style={{ opacity: isPaused ? 1 : 0.7 }}
              aria-label="Next slide"
            >
              <FiChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700" />
            </button>
          </>
        )}
      </div>

      {/* Title and Description Section */}
      {flyers[currentIndex] && (
        <div className="px-4 py-4 border-t border-gray-100">
          <h4 className="font-semibold text-carer-blue text-sm sm:text-base line-clamp-1">
            {flyers[currentIndex].title}
          </h4>
          {flyers[currentIndex].description && (
            <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mt-2">
              {flyers[currentIndex].description}
            </p>
          )}
        </div>
      )}

      {/* CSS for progress animation */}
      <style jsx>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default ServiceFlyerSlider;
