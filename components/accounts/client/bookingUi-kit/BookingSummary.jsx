import { MediumBtn } from "@components/core/button";
import React from "react";

const BookingSummary = ({ formValues, onBack, onSubmit, isLoading }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 text-dark-blue">
        Verify Booking Summary
      </h2>

      <section className="mb-4">
        <h3 className="font-semibold mb-2">Step 1: Basic Info</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <li>
            <strong>Care Duration:</strong> {formValues.care_duration || "—"}
          </li>
          <li>
            <strong>Duration Value:</strong>{" "}
            {formValues.care_duration_value || "—"}
          </li>
          <li>
            <strong>Care Type:</strong> {formValues.care_type || "—"}
          </li>
          {formValues.accommodation && (
            <li>
              <strong>Accommodation:</strong> {formValues.accommodation || "—"}
            </li>
          )}
          {formValues.meal && (
            <li>
              <strong>Meal:</strong> {formValues.meal || "—"}
            </li>
          )}
          {formValues.num_of_meals && (
            <li>
              <strong>Number of Meals:</strong> {formValues.num_of_meals || "—"}
            </li>
          )}
        </ul>
      </section>

      <section className="mb-4">
        <h3 className="font-semibold mb-2">Step 2: Care Details</h3>
        <div className="mb-2">
          <strong>Medical Services:</strong>{" "}
          {formValues.medical_services.length > 0
            ? formValues.medical_services.join(", ")
            : "—"}
        </div>
        <div className="mb-2">
          <strong>Other Extra Services:</strong>{" "}
          {formValues.other_extra_services.length > 0
            ? formValues.other_extra_services.join(", ")
            : "—"}
        </div>
        <div>
          <strong>Special Notes:</strong> {formValues.special_notes || "—"}
        </div>
      </section>

      <section className="mb-4">
        <h3 className="font-semibold mb-2">Step 3: Schedule</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <li>
            <strong>Start Date:</strong> {formValues.start_date || "—"}
          </li>
          <li>
            <strong>End Date:</strong> {formValues.end_date || "—"}
          </li>
          <li>
            <strong>Start Time:</strong> {formValues.start_time || "—"}
            {formValues.start_time_period}
          </li>
          <li>
            <strong>End Time:</strong> {formValues.end_time || "—"}
            {formValues.end_time_period}
          </li>
        </ul>
      </section>

      <section className="mb-4">
        <h3 className="font-semibold mb-2">Step 4: Requester Info</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <li>
            <strong>Requesting For:</strong> {formValues.requesting_for || "—"}
          </li>
          {formValues.someone_name && (
            <li>
              <strong>Name:</strong> {formValues.someone_name || "—"}
            </li>
          )}

          {formValues.someone_email && (
            <li>
              <strong>Email:</strong> {formValues.someone_email || "—"}
            </li>
          )}

          {formValues.someone_phone && (
            <li>
              <strong>Phone:</strong> {formValues.someone_phone || "—"}
            </li>
          )}
        </ul>
      </section>

      <div className="flex justify-between mt-6">
        <MediumBtn
          text="Back"
          color="gray"
          onClick={onBack}
          disabled={isLoading}
        />

        <MediumBtn
          onClick={onSubmit}
          text="Submit Booking"
          color="darkblue"
          loading={isLoading}
          loadingText="Submitting Appointment..."
        />
      </div>
    </div>
  );
};

export default BookingSummary;
