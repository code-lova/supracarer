"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaKey, FaShieldAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { MediumBtn } from "@components/core/button";

const SecurityTab = ({
  userDetails,
  showCurrentPassword,
  setShowCurrentPassword,
  showNewPassword,
  setShowNewPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  passwordMutation,
  handlePasswordUpdate,
  enable2FaMutation,
  disable2FaMutation,
  handle2FAToggle,
  userSessions,
  sessionsLoading,
  handleLogoutAllDevices,
  logoutAllDevicesMutation,
  changePasswordSchema,
}) => {
  return (
    <div className="space-y-6">
      {/* Password Update Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex items-center mb-4">
          <FaKey className="text-carer-blue mr-3 text-xl" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Change Password
            </h3>
            <p className="text-sm text-gray-600">
              Update your password to keep your account secure
            </p>
          </div>
        </div>

        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={changePasswordSchema}
          onSubmit={handlePasswordUpdate}
        >
          {() => (
            <Form className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <Field
                    name="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    className="login-form-input pr-10"
                    placeholder="Enter your current password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <FaEyeSlash className="text-gray-400" />
                    ) : (
                      <FaEye className="text-gray-400" />
                    )}
                  </button>
                </div>
                <ErrorMessage
                  name="currentPassword"
                  component="div"
                  className="text-red-600 text-xs mt-1"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <Field
                    name="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    className="login-form-input pr-10"
                    placeholder="Enter your new password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <FaEyeSlash className="text-gray-400" />
                    ) : (
                      <FaEye className="text-gray-400" />
                    )}
                  </button>
                </div>
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-red-600 text-xs mt-1"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Field
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className="login-form-input pr-10"
                    placeholder="Confirm your new password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash className="text-gray-400" />
                    ) : (
                      <FaEye className="text-gray-400" />
                    )}
                  </button>
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-600 text-xs mt-1"
                />
              </div>

              <div className="pt-4">
                <MediumBtn
                  loading={passwordMutation.isPending}
                  loadingText="Updating..."
                  text="Update Password"
                  color="carerBlue"
                  type="submit"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FaShieldAlt
              className={`mr-3 text-xl ${
                userDetails?.two_fa_enabled ? "text-green-500" : "text-gray-400"
              }`}
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                2Fa Authentication
              </h3>
              <p className="text-sm text-gray-600">
                {userDetails?.two_fa_enabled
                  ? "Your account is protected with 2FA"
                  : "Add an extra layer of security to your account"}
              </p>
            </div>
          </div>
          <button
            onClick={handle2FAToggle}
            disabled={
              enable2FaMutation.isPending || disable2FaMutation.isPending
            }
            className={`px-4 py-2 text-sm rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              userDetails?.two_fa_enabled
                ? "bg-red-600 text-white hover:bg-red-700"
                : "border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {enable2FaMutation.isPending || disable2FaMutation.isPending
              ? "Processing..."
              : userDetails?.two_fa_enabled
              ? "Disable"
              : "Enable"}
          </button>
        </div>
      </div>

      {/* Login History */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Login Activity
          </h3>
          <button
            onClick={handleLogoutAllDevices}
            disabled={logoutAllDevicesMutation.isPending}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {logoutAllDevicesMutation.isPending
              ? "Logging out..."
              : "Logout All Devices"}
          </button>
        </div>

        {sessionsLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-48"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        ) : userSessions?.data?.length > 0 ? (
          <div className="space-y-3">
            {userSessions.data.map((session, index) => {
              const isActiveSession = session.status === "active";
              const lastUsed = session.last_used_at
                ? new Date(session.last_used_at).toLocaleString()
                : "Unknown";
              const deviceInfo = `${session.browser || "Unknown Browser"} on ${
                session.platform || "Unknown OS"
              }`;

              return (
                <div
                  key={session.id || index}
                  className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {index === 0 ? "Current Session" : `Session ${index + 1}`}
                    </p>
                    <p className="text-xs text-gray-500">
                      {deviceInfo} • {lastUsed}
                    </p>
                    {session.ip_address && (
                      <p className="text-xs text-gray-400">
                        IP: {session.ip_address}
                      </p>
                    )}
                    {session.device && (
                      <p className="text-xs text-gray-400">
                        Device: {session.device}
                      </p>
                    )}
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      isActiveSession
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {isActiveSession ? "Active" : "Inactive"}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">
              No recent login activity found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityTab;
