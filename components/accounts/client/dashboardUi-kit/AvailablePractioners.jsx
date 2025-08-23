import React from "react";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { showVerifiedHealthWorker } from "@service/request/client/dashboard/index";
import AvailablePractionersSkeleton from "@components/core/skeleton/AvailablePractionersSkeleton";

const AvailablePractioners = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["verified-health-workers"],
    queryFn: showVerifiedHealthWorker,
    staleTime: 60 * 1000,
    retry: 2,
  });

  const practitioners = data?.verified_health_workers || [];

  if (isLoading) {
    return <AvailablePractionersSkeleton />;
  }
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-[1.01] h-[396px]">
      <div className="flex justify-between items-center border-b-2 w-full h-[50px] px-4">
        <div>
          <h3 className="text-dark-blue font-semibold text-lg">
            Our Verified Health Practitioners
          </h3>
        </div>
        <MdOutlineVerifiedUser
          size={24}
          className="text-dark-blue cursor-pointer hover:text-carer-blue"
        />
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 gap-2 h-[299px] w-full overflow-y-auto">
          {isError && (
            <div className="text-center text-red-500">
              Error loading practitioners.{" "}
              <button onClick={() => refetch()} className="underline">
                Retry
              </button>
            </div>
          )}
          {!isError && practitioners.length === 0 && (
            <div className="text-center text-slate-gray">
              No verified practitioners found.
            </div>
          )}
          {!isError &&
            practitioners.map((practitioner) => (
              <div
                key={practitioner.uuid}
                className="flex items-start gap-4 border-l-4 rounded-md p-4 bg-light-blue-bg border-dark-blue-border"
              >
                {/* Practitioner Image */}
                {practitioner.image ? (
                  <img
                    src={practitioner.image}
                    alt={practitioner.name}
                    className="w-16 h-16 rounded-md object-cover flex-shrink-0 bg-gray-200"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-md bg-gray-300 flex-shrink-0" />
                )}

                {/* Details */}
                <div className="flex flex-col">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-semibold text-dark-blue">
                      {practitioner.name}
                    </h4>
                    {/* Star rating value */}
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-dark-blue">
                        {practitioner.star_rating !== null
                          ? practitioner.star_rating
                          : "N/A"}
                      </span>
                    </div>
                    {/* Stars below */}
                    <div className="flex items-center text-yellow-500 text-sm mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < Math.round(practitioner.star_rating || 0)
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }
                        />
                      ))}
                      {/* Count of ratings */}
                      <span className="ml-2 text-xs text-dark-blue">
                        {practitioner.reviews?.length > 0
                          ? `(${practitioner.reviews.length} rating${
                              practitioner.reviews.length > 1 ? "s" : ""
                            })`
                          : "(No ratings)"}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-gray mt-1">
                    {practitioner.practitioner}
                  </p>
                  <p className="text-xs text-slate-gray mt-1">
                    Gender: {practitioner.gender}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AvailablePractioners;
