"use client";
import React, { useState } from "react";
import { FaStar, FaTimes } from "react-icons/fa";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { validateCompleteAppointment } from "@schema/client/booking/ValidationSchema";
import { MediumBtn } from "@components/core/button";

const CompleteAppointmentModal = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  healthWorkerName,
}) => {
  React.useEffect(() => {
    if (isOpen) {
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Complete Appointment
            </h2>
            <p className="text-sm text-gray-500">
              Rate your experience with{" "}
              {healthWorkerName || "the health worker"}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <FaTimes className="text-gray-400" />
          </button>
        </div>
        <Formik
          initialValues={{ rating: 0, review: "" }}
          validationSchema={validateCompleteAppointment}
          onSubmit={(values, { setSubmitting }) => {
            onSubmit(values);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
            isSubmitting,
          }) => (
            <Form className="p-6">
              {/* Star Rating */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFieldValue("rating", star)}
                      onMouseEnter={() => setFieldValue("hoverRating", star)}
                      onMouseLeave={() => setFieldValue("hoverRating", 0)}
                      className="focus:outline-none"
                      aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                    >
                      <FaStar
                        className={`text-2xl transition-colors ${
                          (values.hoverRating || values.rating) >= star
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Select a rating between 1 and 5 stars
                </p>
                {errors.rating && touched.rating && (
                  <p className="text-sm text-red-600 mt-1">{errors.rating}</p>
                )}
              </div>
              {/* Review Textarea */}
              <div className="mb-4">
                <label
                  htmlFor="review"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Review <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="review"
                  name="review"
                  value={values.review}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Share your experience..."
                  rows={4}
                  disabled={isLoading || isSubmitting}
                  className={`w-full px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 transition-colors ${
                    errors.review && touched.review
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  } disabled:bg-gray-50 disabled:opacity-50`}
                />
                {errors.review && touched.review && (
                  <p className="text-sm text-red-600 mt-1">{errors.review}</p>
                )}
              </div>
              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <MediumBtn
                  text="Cancel"
                  type="button"
                  color="gray"
                  loading={isLoading || isSubmitting}
                  onClick={onClose}
                />

                <MediumBtn
                  text="Submit & Complete"
                  type="submit"
                  color="green"
                  loadingText="Submitting..."
                  loading={isLoading || isSubmitting}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CompleteAppointmentModal;
