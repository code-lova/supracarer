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

const VerifyEmail = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { timeLeft, resetCountdown, formatTime } = useResendCountdown();
  const [showResend, setShowResend] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("verificationEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      router.push("/signup");
      toast.error("Forbidden, Please register first.");
    }

    if (timeLeft === 0) {
      setShowResend(true);

      const timeout = setTimeout(() => {
        setShowResend(false); // Hide after 60s
      }, 60000);

      return () => clearTimeout(timeout);
    }
  }, [timeLeft]);

  const { mutate } = useMutation({
    mutationFn: verifyEmailRequest,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      localStorage.removeItem("verificationEmail");
      localStorage.removeItem("verificationStartTime");
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
      resetCountdown();
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-center green_gradient mb-4">
            Verify Your Email
          </h1>

          <Formik
            initialValues={{ email, code: "" }}
            enableReinitialize={true}
            validationSchema={verifyEmailSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-4 w-full">
                <Field type="hidden" name="email" />

                <div>
                  <label htmlFor="code">Verification Code</label>
                  <Field name="code" type="text" className="login-form-input" />
                  <ErrorMessage
                    name="code"
                    component="div"
                    className="text-red-500 text-sm"
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

          <div className="mt-6 text-center">
            {timeLeft > 0 ? (
              <p className="text-sm text-gray-600">
                Didn’t receive the code? Resend available in{" "}
                <span className="font-semibold text-custom-green">
                  {formatTime(timeLeft)}
                </span>
              </p>
            ) : showResend ? (
              <button
                onClick={handleResend}
                disabled={isResending}
                className="text-custom-green font-semibold hover:underline disabled:opacity-50"
              >
                {isResending ? "Resending..." : "Resend verification code"}
              </button>
            ) : (
              <p className="text-sm text-gray-500 italic">
                Resend option expired
              </p>
            )}
          </div>
        </div>
        <Link href="/signin">
          <h2 className="text-base font-medium text-custom-green mb-6 text-center mt-8">
            {" "}
            {" <- "}Back to Login
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmail;
