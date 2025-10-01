"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const SupportTicketModal = ({
  showNewTicketModal,
  setShowNewTicketModal,
  onCreateTicket,
  isLoading = false,
  validationSchema,
}) => {
  if (!showNewTicketModal) return null;

  const initialValues = {
    subject: "",
    message: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    onCreateTicket(values);
    setShowNewTicketModal(false)
    resetForm();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6">
        <h2 className="text-xl font-bold mb-4 text-dark-blue">
          Create Support Ticket
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <Field
                  type="text"
                  name="subject"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-carer-blue text-xs md:text-base"
                  placeholder="Brief description of your issue"
                />
                <ErrorMessage
                  name="subject"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <Field
                  as="textarea"
                  name="message"
                  rows={4}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-carer-blue text-xs md:text-base"
                  placeholder="Detailed description of your issue"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewTicketModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-xs md:text-base"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-carer-blue text-white rounded-lg hover:bg-haven-blue text-xs md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading || isSubmitting}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating...
                    </div>
                  ) : (
                    "Create Ticket"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SupportTicketModal;
