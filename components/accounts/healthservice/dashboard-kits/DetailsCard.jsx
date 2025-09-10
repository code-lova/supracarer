"use client";
import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import Image from "next/image";
import CurrentDateTime from "@components/core/CurrentDateTime";
import { useUserContext } from "@context/userContext";
import TimeAgo from "@components/core/TimeAgo";

const DetailsCard = () => {
  const { user } = useUserContext();

  const userDetails = user?.data;
  return (
    <>
      <div className="w-full h-[200px] md:h-[260px] border-2 bg-tranquil-teal rounded-3xl shadow-md px-4 py-4">
        <div className="flex item-center justify-between gap-4 md:gap-9">
          <div className="flex flex-col justify-between gap-6 h-full">
            <div className="flex items-center justify-between px-2 md:px-4 py-2 bg-ever-green rounded-lg w-[160px] md:w-[185px]">
              <FaRegCalendarAlt
                className="text-white cursor-pointer hover:text-tranquil-teal"
                size={16}
              />
              <CurrentDateTime showDateTime={true} textClass="text-white" />
            </div>

            <div className=" w-[200px] md:w-full">
              <h1 className="text-[13px] md:text-xl lg:text-3xl md:mt-0 font-bold text-white">
                Good Day,
              </h1>
              {userDetails && (
                <h2 className="text-[13px] md:text-xl capitalize lg:text-3xl md:mt-3 lg:-mt-3 font-bold text-white">
                  {userDetails.fullname || "Username"}
                </h2>
              )}
              <div className="text-white text-xs md:text-[15px] font-semibold">
                <CurrentDateTime showGreeting={true} textClass="text-white" />
              </div>
              <p className="text-white text-[10px] md:text-[13px] mt-2 md:mt-3">
                Last Activity:
              </p>
              <p className="text-white text-xs md:text-[10px]">
                <TimeAgo
                  timestamp={userDetails?.last_logged_in || new Date()}
                />
              </p>
            </div>
          </div>

          <div className="flex items-end h-full max-w-[130px] md:max-w-[170px] lg:max-w-[170px] w-full">
            <Image
              src="/assets/images/health.png"
              width={280}
              height={200}
              alt="Health Service"
              className="w-full h-auto object-contain -mt-4 md:-mt-4"
              style={{
                maxWidth: "100%",
                height: "auto",
                objectFit: "contain",
              }}
              priority
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsCard;
