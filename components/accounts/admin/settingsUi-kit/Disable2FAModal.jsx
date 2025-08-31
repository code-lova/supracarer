"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaTimes, FaEye, FaEyeSlash, FaShieldAlt } from "react-icons/fa";
import * as Yup from "yup";

const passwordConfirmationSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
});

const Disable2FAModal = ({ showModal, setShowModal, onConfirm, isLoading }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  if (!showModal) return null;

  const handleSubmit = (values, { setSubmitting }) => {
    onConfirm(values.password);
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 transition-opacity duration-300">
      <div className="bg-white rounded-lg max-w-md w-full p-6 transform transition-all duration-300 scale-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
              <FaShieldAlt className="text-red-600 text-lg" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Disable Two-Factor Authentication
            </h2>
          </div>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        <div className="mb-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-yellow-600 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-yellow-800 font-medium">
                Security Warning
              </p>
            </div>
            <p className="text-sm text-yellow-700 mt-1">
              Disabling 2FA will make your account less secure. You'll only need
              your password to log in.
            </p>
          </div>

          <p className="text-gray-700 mb-2">
            To confirm this action, please enter your current password:
          </p>
        </div>

        <Formik
          initialValues={{ password: "" }}
          validationSchema={passwordConfirmationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter your current password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-gray-400" />
                    ) : (
                      <FaEye className="text-gray-400" />
                    )}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-xs mt-1"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !values.password.trim()}
                  className="flex-1 px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? "Disabling..." : "Disable 2FA"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Disable2FAModal;
