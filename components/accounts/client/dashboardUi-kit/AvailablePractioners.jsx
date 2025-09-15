import React from "react";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { FaStar, FaUserMd } from "react-icons/fa";
import { showVerifiedHealthWorker } from "@service/request/client/dashboard/index";
import AvailablePractionersSkeleton from "@components/core/skeleton/AvailablePractionersSkeleton";
import ErrorState from "@components/core/ErrorState";
import EmptyState from "@components/core/EmptyState";

const AvailablePractioners = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["verified-health-workers"],
    queryFn: showVerifiedHealthWorker,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  const practitioners = data?.verified_health_workers || [];

  if (isLoading) {
    return <AvailablePractionersSkeleton />;
  }
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 h-[360px] border-2">
      {/* Header */}
      <div className="bg-gradient-to-r from-dark-blue to-carer-blue w-full h-[55px] rounded-t-xl flex items-center justify-between px-4">
        <h3 className="text-white font-bold text-md">
          Verified Health Practitioners
        </h3>
        <MdOutlineVerifiedUser size={20} className="text-white" />
      </div>

      {/* Content */}
      <div className="p-4 h-[265px] flex flex-col">
        {isError ? (
          <div className="flex-1 flex items-center justify-center">
            <ErrorState
              title="Failed to load practitioners"
              description="Unable to fetch verified health practitioners"
              onAction={refetch}
              icon={FaUserMd}
              size="sm"
            />
          </div>
        ) : practitioners.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState
              title="No practitioners found"
              description="No verified health practitioners available at the moment"
              icon={FaUserMd}
              size="sm"
            />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
            <div className="space-y-3">
              {practitioners.map((practitioner) => (
                <div
                  key={practitioner.uuid}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 border border-gray-200"
                >
                  {/* Practitioner Image */}
                  <div className="flex-shrink-0">
                    {practitioner.image ? (
                      <img
                        src={practitioner.image}
                        alt={practitioner.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-dark-blue/20"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-dark-blue/10 flex items-center justify-center">
                        <span className="text-dark-blue font-semibold text-lg">
                          {practitioner.name?.charAt(0)?.toUpperCase() || "P"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-dark-blue truncate">
                      {practitioner.name}
                    </h4>
                    <p className="text-xs text-slate-gray truncate">
                      {practitioner.practitioner}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-1">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FaStar
                            key={i}
                            className={`text-xs ${
                              i < Math.round(practitioner.star_rating || 0)
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-medium text-dark-blue">
                        {practitioner.star_rating !== null
                          ? practitioner.star_rating.toFixed(1)
                          : "N/A"}
                      </span>
                      <span className="text-xs text-slate-gray">
                        ({practitioner.reviews?.length || 0})
                      </span>
                    </div>
                  </div>

                  {/* Gender Badge */}
                  <div className="flex-shrink-0">
                    <span className="text-xs bg-dark-blue/10 text-dark-blue px-2 py-1 rounded-full">
                      {practitioner.gender}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailablePractioners;
