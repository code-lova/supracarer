import React from "react";
import { SmallBtn } from "@components/core/button";
import { FcAcceptDatabase } from "react-icons/fc";
import { PiWarningFill } from "react-icons/pi";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { MdLocalHospital } from "react-icons/md";
import StatusPill from "@components/core/StatusPill";

const BookingRequestCard = ({
  request,
  onViewDetails,
  onConfirm,
  onContactSupport,
  isProcessing,
}) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
      {/* Status Badge and Urgent Indicator */}
      <div className="px-6 pt-4 pb-2 flex justify-between items-center">
        <StatusPill status={request.status} />
        {request.is_urgent && (
          <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full font-medium">
            🚨 Urgent
          </span>
        )}
      </div>

      {/* Client Info - Compact Version */}
      <div className="px-4 pb-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            {request.client?.image ? (
              <img
                src={request.client?.image}
                alt={request.client?.name || "Client"}
                className="w-16 h-16 object-cover rounded-full border-3 border-tranquil-teal shadow-md"
              />
            ) : (
              <span>{request.client?.name?.[0]?.toUpperCase() || "U"}</span>
            )}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-ever-green rounded-full border-2 border-white flex items-center justify-center">
              <FaUser className="w-2 h-2 text-white" />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="font-bold text-xl text-ever-green mb-1">
              {request.client?.name || "Client Name"}
            </h2>
            <div className="flex items-center text-slate-gray mb-1">
              <MdLocalHospital className="w-4 h-4 mr-1" />
              <span className="font-medium text-sm">
                {request.medical_services?.[0] || "General Care"}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              {request.care_type} • {request.care_duration} (
              {request.care_duration_value}h)
            </p>
            <p className="text-xs text-gray-500">
              Ref: {request.booking_reference}
            </p>
          </div>
        </div>

        {/* Quick Appointment Info */}
        <div className="bg-gray-50 rounded-lg p-2 mb-4">
          <div className="flex items-center justify-between gap-6 text-xs md:text-sm">
            <div className="flex items-center text-slate-gray">
              <FaCalendarAlt className="w-4 h-4 mr-2 text-tranquil-teal" />
              <span className="font-medium">{request.start_date}</span>
            </div>
            <div className="flex items-center text-slate-gray">
              <FaClock className="w-4 h-4 mr-2 text-tranquil-teal" />
              <span className="font-medium">
                {request.start_time?.slice(0, 5)}{request.start_time_period} -{" "}
                {request.end_time?.slice(0, 5)}{request.end_time_period}
              </span>
            </div>
          </div>
          <div className="flex items-center text-xs text-gray-500 mt-2">
            <FaMapMarkerAlt className="w-3 h-3 mr-1 text-tranquil-teal" />
            <span className="truncate">
              {request.client?.location?.address || "Address not provided"}
            </span>
          </div>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <span className="text-tranquil-teal font-medium">
              {request.client?.location?.region},{" "}
              {request.client?.location?.country}
            </span>
          </div>
        </div>

        {/* Primary Services Preview */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {request.medical_services?.slice(0, 2).map((service, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-tranquil-teal/20 text-tranquil-teal text-xs rounded-full font-medium"
              >
                {service}
              </span>
            ))}
            {request.medical_services?.length > 2 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                +{request.medical_services.length - 2} more
              </span>
            )}
            {request.other_extra_services?.length > 0 && (
              <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded-full font-medium">
                +{request.other_extra_services.length} extra
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onViewDetails(request)}
            className="flex-1 px-4 py-2 text-sm font-medium text-ever-green border border-ever-green rounded-lg hover:bg-ever-green hover:text-white transition-all duration-200"
            disabled={isProcessing}
          >
            View Details
          </button>

          <SmallBtn
            icon={<FcAcceptDatabase />}
            loading={isProcessing}
            text="Confirm"
            loadingText="...."
            color="green"
            onClick={() => onConfirm(request.id)}
            disabled={isProcessing}
          />
          <SmallBtn
            icon={<PiWarningFill />}
            text="Issues?"
            color="red"
            onClick={onContactSupport}
            disabled={isProcessing}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingRequestCard;
