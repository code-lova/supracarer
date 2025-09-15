"use client";
import React from "react";
import { GiTakeMyMoney, GiReceiveMoney } from "react-icons/gi";
import {
  FaMoneyBillWave,
  FaCog,
  FaClock,
  FaUserMd,
  FaCalendarAlt,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getUserGrs } from "@service/request/healthworker/guidedrate";
import EmptyState from "@components/core/EmptyState";
import ErrorState from "@components/core/ErrorState";
import { GrsSkeleton } from "@components/core/skeleton/dashboard/hw";

const ServiceChargeCard = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["user-grs"],
    queryFn: getUserGrs,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Loading skeleton
  if (isLoading) {
    return <GrsSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white w-full h-[100px] border-2 rounded-2xl shadow-md px-3 py-1">
        <div className="h-full flex items-center justify-center">
          <ErrorState
            title="Failed to load rate"
            description={
              error.message || "Unable to fetch your guided rate system"
            }
            onAction={refetch}
            icon={GiTakeMyMoney}
            size="sm"
          />
        </div>
      </div>
    );
  }

  const grsData = data?.grs;

  // Empty state - no guided rate set
  if (!grsData) {
    return (
      <div className="bg-white w-full h-[100px] border-2 rounded-2xl shadow-md px-3 py-1">
        <div className="h-full flex items-center justify-center">
          <EmptyState
            title="No rate set"
            description="Configure your guided rate system to start earning"
            icon={FaCog}
            size="sm"
          />
        </div>
      </div>
    );
  }

  // Calculate what the health worker receives (80% after platform fee)
  const netAmount = grsData.guided_rate * 0.8;

  return (
    <div className="bg-white w-full h-[100px] border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="px-3 py-1 h-full flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-slate-gray text-xs font-semibold mt-1">
            GRS Service Rate
          </p>
          <div className="flex items-center gap-1">
            <FaCalendarAlt className="text-tranquil-teal text-xs" />
            <span className="text-xs text-tranquil-teal font-medium capitalize">
              {grsData.rate_type}
            </span>
            {grsData.nurse_type && (
              <>
                <FaUserMd className="text-custom-green text-xs ml-1" />
                <span className="text-xs text-custom-green font-semibold">
                  {grsData.nurse_type}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <h2 className="text-xl font-bold text-tranquil-teal">
                ₵ {grsData.guided_rate}
              </h2>
              <div className="flex items-center gap-1">
                <span className="text-xs text-green-600 font-semibold">
                  ₵ {netAmount.toFixed(0)}
                </span>
                <span className="text-xs text-slate-gray">You Get</span>
                <GiReceiveMoney className="text-xl text-tranquil-teal" />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="relative">
              <FaMoneyBillWave className="text-tranquil-teal text-3xl" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-custom-green rounded-full"></div>
            </div>
            <div className="flex items-center gap-1">
              <FaClock className="text-slate-gray text-xs" />
              <span className="text-xs text-slate-gray font-medium">
                {grsData.care_duration}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceChargeCard;
