"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { resetPasswordSchema } from "@schema";
import toast from "react-hot-toast";
import LoaderButton from "@components/LoaderButton";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPasswordRequest } from "@service/request/auth/resetPasswordRequest";

const ResetPassword = () => {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const exp = searchParams.get("exp");

  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const currentTime = Date.now();
    if (code && exp && currentTime < Number(exp)) {
      setIsValid(true);
    } else {
      toast.error("The reset link has expired. Please request a new one.");
      navigate.push("/forgot-password"); // Redirect to forgot password page
    }
  }, [code, exp, navigate]);

  const handleSubmit = (values) => {
    if (!code || !isValid) {
      toast.error("Invalid or expired reset link.");
      return;
    }
    mutate({ ...values, resetVerificationCode: code });
  };

  const { mutate } = useMutation({
    mutationFn: resetPasswordRequest,
    onMutate: () => setLoading(true),
    onSuccess: () => {
      toast.success("Password reset successful!");
      navigate.push("/signin");
      setLoading(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to reset password.");
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-row items-center justify-center">
          <h1 className="text-2xl font-bold mb-10 text-center uppercase blue_gradient">
            Reset your password
          </h1>
        </div>

        {isValid && (
          <Formik
            initialValues={{ password: "", confirmPassword: "" }}
            validationSchema={resetPasswordSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-4">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="login-form-input"
                    placeholder="••••••••"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    className="login-form-input"
                    placeholder="••••••••"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <LoaderButton
                  loading={loading}
                  loadingText="Processing..."
                  type="submit"
                  text="Reset password"
                  className="login-btn"
                />
              </Form>
            )}
          </Formik>
        )}

        <div className="mt-4 flex flex-row justify-between">
          <Link
            href="/signin"
            className="flex items-center text-custom-green hover:text-green-700 transition-colors duration-300"
          >
            <span className="mr-2">&#8592;</span>
            <p>Back to SignIn</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
