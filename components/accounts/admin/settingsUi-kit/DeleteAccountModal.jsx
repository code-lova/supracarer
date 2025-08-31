"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaTimes } from "react-icons/fa";

const DeleteAccountModal = ({
  showDeleteModal,
  setShowDeleteModal,
  deleteUserProfileSchema,
  handleDeleteAccount,
  deleteAccountMutation,
}) => {
  if (!showDeleteModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-red-600">Delete Account</h2>
          <button
            onClick={() => setShowDeleteModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 mb-2">
            Are you sure you want to delete your account? This action cannot be
            undone.
          </p>
          <p className="text-sm text-gray-600">
            All your data, including your profile, bookings, and preferences
            will be permanently removed.
          </p>
        </div>

        <Formik
          initialValues={{
            confirmation: "",
            reason: "",
          }}
          validationSchema={deleteUserProfileSchema}
          onSubmit={handleDeleteAccount}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type "DELETE_MY_ACCOUNT" to confirm
                </label>
                <Field
                  name="confirmation"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="DELETE_MY_ACCOUNT"
                />
                <ErrorMessage
                  name="confirmation"
                  component="div"
                  className="text-red-600 text-xs mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for deletion (required)
                </label>
                <Field
                  name="reason"
                  as="textarea"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Please tell us why you're deleting your account..."
                />
                <ErrorMessage
                  name="reason"
                  component="div"
                  className="text-red-600 text-xs mt-1"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    deleteAccountMutation.isPending ||
                    values.confirmation !== "DELETE_MY_ACCOUNT" ||
                    !values.reason.trim()
                  }
                  className="flex-1 px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {deleteAccountMutation.isPending
                    ? "Deleting..."
                    : "Delete Account"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
