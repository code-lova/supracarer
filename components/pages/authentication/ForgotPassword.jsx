"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { forgotPasswordSchema } from "@schema";
import toast from "react-hot-toast";
import LoaderButton from "@components/LoaderButton";
import { useMutation } from "@tanstack/react-query";
import { sendPasswordResetRequest } from "@service/request/sendPasswordResetRequest";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const { mutate, isSuccess } = useMutation({
    mutationFn: sendPasswordResetRequest,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      toast.success("A password reset link has been sent to your email!");
      setLoading(false);
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred. Please try again.");
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const handleSubmit = (values) => {
    mutate(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-row items-center justify-center">
          <h1 className="text-2xl font-bold mb-1 text-center uppercase blue_gradient">
            Forgot Password
          </h1>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Enter valid email
        </h2>

        {!isSuccess ? (
          <Formik
            initialValues={{ email: "" }}
            validationSchema={forgotPasswordSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="login-form-input"
                    placeholder="you@example.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <LoaderButton
                  loading={loading}
                  loadingText="Processing..."
                  type="submit"
                  text="Send Password Reset Link"
                  className="login-btn"
                />
              </Form>
            )}
          </Formik>
        ) : (
          <p className="text-center text-custom-green font-semibold mt-6">
            A Password reset link has been sent to your email address!
            <br /> Please check your inbox.
          </p>
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

export default ForgotPassword;
