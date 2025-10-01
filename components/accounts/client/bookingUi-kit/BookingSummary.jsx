import { MediumBtn } from "@components/core/button";
import React from "react";
import {
  FiCalendar,
  FiClock,
  FiHeart,
  FiPhone,
  FiMail,
  FiFileText,
  FiCheckCircle,
} from "react-icons/fi";
import {
  FaStethoscope,
  FaNotesMedical,
  FaUserInjured,
  FaBed,
} from "react-icons/fa";

const BookingSummary = ({ formValues, onBack, onSubmit, isLoading }) => {
  const SectionCard = ({
    icon: Icon,
    title,
    children,
    iconColor = "text-blue-500",
  }) => (
    <div className="mb-6 last:mb-0">
      <div className="flex items-center mb-4">
        <div className={`p-2 rounded-lg bg-gray-100 mr-3 ${iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        {children}
      </div>
    </div>
  );

  const InfoItem = ({ label, value, className = "" }) => (
    <div
      className={`flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100 last:border-b-0 ${className}`}
    >
      <span className="text-sm font-medium text-gray-600 mb-1 sm:mb-0">
        {label}:
      </span>
      <span className="text-sm text-gray-800 font-medium">{value || "—"}</span>
    </div>
  );

  const formatTimeWithPeriod = (time, period) => {
    return time ? `${time} ${period}` : "—";
  };
  return (
    <div className="w-full h-[86vh] rounded-2xl overflow-hidden flex flex-col">
      {/* Fixed Header */}
      <div className="bg-slate-gray2 text-white p-4 text-center flex-shrink-0">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-1">
          <FiCheckCircle className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-1">Booking Summary</h1>
        <p className="text-blue-100 text-sm md:text-base">
          Please review your appointment details before submitting
        </p>
      </div>

      {/* Scrollable Content */}
      <div
        className="flex-1 overflow-y-scroll p-4"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#60a5fa #e5e7eb",
          scrollbarGutter: "stable",
        }}
      >
        <div className="space-y-6">
          {/* Basic Information */}
          <SectionCard
            icon={FaStethoscope}
            title="Care Information"
            iconColor="text-red-500"
          >
            <div className="space-y-0">
              <InfoItem
                label="Care Duration"
                value={formValues.care_duration}
              />
              <InfoItem
                label="Duration Value"
                value={
                  formValues.care_duration_value
                    ? `${formValues.care_duration_value} hours`
                    : "—"
                }
              />
              <InfoItem label="Care Type" value={formValues.care_type} />
              {formValues.accommodation &&
                formValues.accommodation !== "No" && (
                  <InfoItem
                    label="Accommodation"
                    value={formValues.accommodation}
                  />
                )}
              {formValues.meal && formValues.meal !== "No" && (
                <InfoItem label="Meal" value={formValues.meal} />
              )}
              {formValues.num_of_meals && (
                <InfoItem
                  label="Number of Meals"
                  value={formValues.num_of_meals}
                />
              )}
            </div>
          </SectionCard>

          {/* Services */}
          <SectionCard
            icon={FaNotesMedical}
            title="Medical Services & Care Details"
            iconColor="text-green-500"
          >
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-gray-600 block mb-2">
                  Medical Services:
                </span>
                {formValues.medical_services &&
                formValues.medical_services.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {formValues.medical_services.map((service, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                      >
                        <FiHeart className="w-3 h-3 mr-1" />
                        {service}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-sm text-gray-500 italic">
                    No medical services selected
                  </span>
                )}
              </div>

              <div>
                <span className="text-sm font-medium text-gray-600 block mb-2">
                  Additional Services:
                </span>
                {formValues.other_extra_service &&
                formValues.other_extra_service.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {formValues.other_extra_service.map((service, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        <FaBed className="w-3 h-3 mr-1" />
                        {service}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-sm text-gray-500 italic">
                    No additional services selected
                  </span>
                )}
              </div>

              {formValues.special_notes && (
                <div>
                  <span className="text-sm font-medium text-gray-600 block mb-2">
                    Special Notes:
                  </span>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {formValues.special_notes}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </SectionCard>

          {/* Schedule */}
          <SectionCard
            icon={FiCalendar}
            title="Appointment Schedule"
            iconColor="text-purple-500"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <FiCalendar className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">Start Date</span>
                </div>
                <p className="text-lg font-semibold text-gray-800 ml-6">
                  {formValues.start_date || "—"}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <FiCalendar className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">End Date</span>
                </div>
                <p className="text-lg font-semibold text-gray-800 ml-6">
                  {formValues.end_date || "—"}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <FiClock className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">Start Time</span>
                </div>
                <p className="text-lg font-semibold text-gray-800 ml-6">
                  {formatTimeWithPeriod(
                    formValues.start_time,
                    formValues.start_time_period
                  )}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <FiClock className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">End Time</span>
                </div>
                <p className="text-lg font-semibold text-gray-800 ml-6">
                  {formatTimeWithPeriod(
                    formValues.end_time,
                    formValues.end_time_period
                  )}
                </p>
              </div>
            </div>
          </SectionCard>

          {/* Requester Information */}
          <SectionCard
            icon={FaUserInjured}
            title="Requester Information"
            iconColor="text-orange-500"
          >
            <div className="space-y-0">
              <InfoItem
                label="Requesting For"
                value={formValues.requesting_for}
              />
              {formValues.someone_name && (
                <InfoItem label="Full Name" value={formValues.someone_name} />
              )}
              {formValues.someone_email && (
                <InfoItem
                  label="Email Address"
                  value={
                    <div className="flex items-center">
                      <FiMail className="w-4 h-4 text-gray-400 mr-2" />
                      {formValues.someone_email}
                    </div>
                  }
                />
              )}
              {formValues.someone_phone && (
                <InfoItem
                  label="Phone Number"
                  value={
                    <div className="flex items-center">
                      <FiPhone className="w-4 h-4 text-gray-400 mr-2" />
                      {formValues.someone_phone}
                    </div>
                  }
                />
              )}
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Fixed Action Buttons */}
      <div className="bg-gray-50 border-t border-gray-200 p-4 flex-shrink-0">
        <div className="flex item-center justify-between">
          <MediumBtn
            text="Back to Edit"
            color="gray"
            onClick={onBack}
            disabled={isLoading}
            icon={<FiFileText className="mr-2 w-4 h-4" />}
          />

          <MediumBtn
            onClick={onSubmit}
            text="Submit Booking"
            color="carerBlue"
            loading={isLoading}
            loadingText="Submitting Appointment..."
            icon={<FiCheckCircle className="mr-2 w-4 h-4" />}
          />
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          By submitting this booking, you agree to our terms and conditions
        </p>
      </div>
    </div>
  );
};

export default BookingSummary;
