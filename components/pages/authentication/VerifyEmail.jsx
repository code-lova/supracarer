"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { verifyEmailRequest } from "@service/request/auth/verifyEmailRequest";
import { verifyEmailSchema } from "@schema/auth";
import LoaderButton from "@components/core/LoaderButton";
import { useResendCountdown } from "@utils/useResendCountdown";
import { resendVerification } from "@service/request/auth/resendVerification";
import {
  FaEnvelope,
  FaCheckCircle,
  FaClock,
  FaArrowLeft,
} from "react-icons/fa";
import { MdEmail, MdSecurity } from "react-icons/md";

const VerifyEmail = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { timeLeft, resetCountdown, formatTime } = useResendCountdown();
  // No showResend state needed; timer logic handled in render

  useEffect(() => {
    const storedEmail = localStorage.getItem("verificationEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      router.push("/signup");
      toast.error("Forbidden, Please register first.");
    }
  }, []);

  useEffect(() => {
    const startTime = localStorage.getItem("verificationStartTime");
    if (!startTime) {
      const now = Date.now();
      localStorage.setItem("verificationStartTime", now);
    } else {
      resetCountdown();
    }
  }, []);

  const { mutate } = useMutation({
    mutationFn: verifyEmailRequest,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      toast.success("Email verified successfully!");
      router.push("/signin");
      setLoading(false);
    },
    onError: (error) => {
      toast.error(error.message || "Verification failed");
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
      localStorage.removeItem("verificationEmail");
      localStorage.removeItem("verificationStartTime");
    },
  });

  const handleSubmit = (values) => {
    mutate(values);
  };

  //Resend verification code
  const { mutate: resendCode, isPending: isResending } = useMutation({
    mutationFn: resendVerification,
    onSuccess: () => {
      toast.success(`Verification code resent to ${email}`);
    },
    onError: () => {
      toast.error("Too many request or failed to send.");
    },
  });

  const handleResend = () => {
    if (!email) {
      toast.error("No email found to resend verification.");
      return;
    }
    resendCode({ email });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full border border-gray-100">
        {/* Header Section */}
        <div className="text-center mb-8">
          {/* Email Icon with Animation */}
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-tranquil-teal to-custom-green rounded-full flex items-center justify-center shadow-lg">
              <MdEmail className="w-10 h-10 text-white" />
            </div>
            {/* Pulse animation */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-tranquil-teal/30 to-custom-green/30 animate-ping"></div>
            <div className="absolute top-1 right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Verify Your Email
          </h1>
          <p className="text-gray-600 mb-2">
            We've sent a verification code to
          </p>
          <p className="text-tranquil-teal font-semibold text-lg">{email}</p>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl px-4 py-2 flex items-center gap-2">
            <MdSecurity className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-700">
              Secure Verification
            </span>
          </div>
        </div>

        {/* Verification Form */}
        <Formik
          initialValues={{ email, code: "" }}
          enableReinitialize={true}
          validationSchema={verifyEmailSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-6">
              <Field type="hidden" name="email" />

              <div>
                <label
                  htmlFor="code"
                  className="block text-sm font-semibold text-gray-700 mb-3"
                >
                  Enter Verification Code
                </label>
                <div className="relative">
                  <Field
                    name="code"
                    type="text"
                    className="w-full px-4 py-4 text-center text-2xl font-mono tracking-widest border-2 border-gray-200 rounded-xl focus:border-tranquil-teal focus:ring-2 focus:ring-tranquil-teal/20 transition-all duration-200"
                    placeholder="000000"
                    maxLength="6"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <FaCheckCircle className="w-5 h-5 text-gray-300" />
                  </div>
                </div>
                <ErrorMessage
                  name="code"
                  component="div"
                  className="text-red-500 text-sm mt-2 flex items-center gap-1"
                />
              </div>

              <LoaderButton
                loading={loading}
                loadingText="Verifying..."
                type="submit"
                text="Verify Email"
                className="login-btn"
              />
            </Form>
          )}
        </Formik>

        {/* Resend Section */}
        <div className="mt-8 text-center">
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <FaEnvelope className="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Didn't receive the email? Check your spam folder or
            </p>

            {timeLeft > 0 ? (
              <div className="flex items-center justify-center gap-2">
                <FaClock className="w-4 h-4 text-amber-500" />
                <span className="text-sm text-gray-600">
                  Resend available in{" "}
                  <span className="font-bold text-amber-600">
                    {formatTime(timeLeft)}
                  </span>
                </span>
              </div>
            ) : (
              <button
                onClick={handleResend}
                disabled={isResending}
                className="inline-flex items-center gap-2 text-tranquil-teal font-semibold hover:text-custom-green transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaEnvelope className="w-4 h-4" />
                {isResending ? "Resending..." : "Resend verification code"}
              </button>
            )}
          </div>
        </div>

        {/* Back to Login */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <Link
            href="/signin"
            className="flex items-center justify-center gap-2 text-gray-600 hover:text-tranquil-teal transition-colors duration-200 font-medium"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
