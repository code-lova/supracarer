"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation } from "@tanstack/react-query";
import { verify2FA, resend2FA } from "@service/request/auth/verify2FA";
import { verify2FASchema } from "@schema/auth";
import toast from "react-hot-toast";
import LoaderButton from "@components/core/LoaderButton";
import { useResendCountdown } from "@utils/useResendCountdown";

const TwoFactorAuth = ({ onVerificationSuccess, userEmail, onBack }) => {
  const { countdown, startCountdown, isCountdownActive } = useResendCountdown();

  // Verify 2FA mutation
  const verify2FAMutation = useMutation({
    mutationFn: (code) => verify2FA(code, userEmail),
    onSuccess: (data) => {
      //toast.success("2FA verification successful");
      onVerificationSuccess(data);
    },
    onError: (err) => {
      toast.error(err.message || "Invalid verification code");
    },
  });

  // Resend 2FA mutation
  const resend2FAMutation = useMutation({
    mutationFn: () => resend2FA(userEmail),
    onSuccess: () => {
      toast.success("New verification code sent to your email");
      startCountdown(60); // 60 second countdown
    },
    onError: (err) => {
      toast.error(err.message || "Failed to resend verification code");
    },
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    verify2FAMutation.mutate(values.code);
    setSubmitting(false);
  };

  const handleResendCode = () => {
    if (!isCountdownActive) {
      resend2FAMutation.mutate();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2 text-gray-900">
            Two-Factor Authentication
          </h1>
          <p className="text-gray-600">
            We've sent a 6-digit verification code to
          </p>
          <p className="text-sm font-medium text-blue-600 mt-1">{userEmail}</p>
        </div>

        <Formik
          initialValues={{ code: "" }}
          validationSchema={verify2FASchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-6">
              <div>
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Verification Code
                </label>
                <Field
                  type="text"
                  name="code"
                  className="w-full px-4 py-3 text-center text-lg font-mono border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="000000"
                  maxLength={6}
                />
                <ErrorMessage
                  name="code"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <LoaderButton
                loading={verify2FAMutation.isPending}
                loadingText="Verifying..."
                type="submit"
                text="Verify Code"
              />
            </Form>
          )}
        </Formik>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-3">Didn't receive the code?</p>
          <button
            onClick={handleResendCode}
            disabled={isCountdownActive || resend2FAMutation.isPending}
            className="text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed font-medium"
          >
            {resend2FAMutation.isPending
              ? "Sending..."
              : isCountdownActive
              ? `Resend code in ${countdown}s`
              : "Resend code"}
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onBack}
            className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-300"
          >
            ← Back to login
          </button>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
