import React from "react";
import Link from "next/link";
import { FaPencilAlt } from "react-icons/fa";
import { useUserContext } from "@context/userContext";
import { FaMapMarkerAlt } from "react-icons/fa";

const ProfileCard = () => {
  const { user } = useUserContext();
  const userDetails = user?.data;

  return (
    <>
      <div className="bg-white w-full h-[279px] border-2 rounded-2xl shadow-md">
        <div className="bg-tranquil-teal w-full h-[55px] rounded-xl flex items-center justify-between px-4">
          <h2 className="text-md font-bold text-white">My Profile</h2>
          <Link
            href="/health-service/profile"
            className="bg-ever-green p-2 rounded-md hover:bg-gray-200 transition-colors duration-300"
          >
            <FaPencilAlt
              className="text-white cursor-pointer hover:text-tranquil-teal"
              size={16}
            />
          </Link>
        </div>
        <div className="px-3 py-3">
          <div className="w-full flex items-center space-x-4 mb-6">
            {userDetails?.image_url ? (
              <img
                src={userDetails?.image_url}
                alt="Profile"
                className="w-28 h-28 rounded-full border-2 border-tranquil-teal"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-ever-green flex items-center justify-center text-white text-4xl font-bold border-2 border-tranquil-teal">
                {userDetails?.fullname?.[0]?.toUpperCase() || "U"}
              </div>
            )}

            <div className="w-[200px]">
              <h3 className="text-lg font-semibold text-tranquil-teal -mt-2 capitalize">
                {userDetails?.fullname || "UserName"}
              </h3>
              <p className="text-sm text-gray-500 font-semibold capitalize">
                {userDetails?.practitioner || "Practitioner"}
              </p>
              <div className="mt-6 flex items-center gap-2 text-slate-gray text-sm">
                <FaMapMarkerAlt className="text-tranquil-teal" />
                <span>
                  {userDetails?.region || "Not Set"}, {userDetails?.country}

                </span>
              </div>
            </div>
          </div>

          <div className="w-[330px] flex items-center justify-between space-x-1">
            <div className="grid grid-cols-1 gap-1 w-full text-center">
              <h2 className="text-slate-gray text-xs font-bold">
                Gender
              </h2>
              <p className="text-sm text-tranquil-teal font-semibold">
                {userDetails?.gender || "Not provided"}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-1 w-full border-l border-slate-gray pl-2 ml-4 text-center">
              <h2 className="text-slate-gray text-xs font-bold">
                Working Hours
              </h2>
              <p className="text-sm text-tranquil-teal font-semibold">
                {userDetails?.working_hours || "8am - 5pm"}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-1 w-full border-l border-slate-gray pl-2 ml-4 text-center">
              <h2 className="text-slate-gray text-xs font-bold">Service Charge</h2>
              <p className="text-sm text-tranquil-teal font-semibold capitalize">
                {userDetails?.service_charge || "Not provided"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
