"use client";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registrationSchema } from "@schema/auth";
import toast from "react-hot-toast";
import LoaderButton from "@components/core/LoaderButton";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { registerRequest } from "@service/request/auth/registerRequest";
import LoadingStateUI from "@components/core/loading";
import useRedirectIfAuthenticated from "@hooks/useRedirectIfAuthenticated";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const status = useRedirectIfAuthenticated();
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate } = useMutation({
    mutationFn: registerRequest,
    onMutate: () => {
      setLoading(true); // Set loading to true when mutation starts
    },
    onSuccess: (data, variables, context) => {
      toast.success("A verification code was sent to your email");
      localStorage.setItem("verificationEmail", data.user.email);
      // Clear form by resetting Formik
      if (context?.resetForm) {
        context.resetForm();
      }
      // Set registration complete and navigate immediately
      setRegistrationComplete(true);
      setLoading(false);
      // Navigate after a brief delay to show success message
      setTimeout(() => {
        navigate.push("/verify-email");
      }, 1000);
    },
    onError: (error) => {
      const errorMessage = error?.message || "Validation error occured";
      toast.error(errorMessage);
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const handleSubmit = (values, { resetForm }) => {
    mutate(values, {
      onSuccess: () => {
        resetForm();
      },
    });
  };

  // Show loading screen when actively registering
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingStateUI label="Creating your account..." />
      </div>
    );
  }

  // Show success state after registration complete
  if (registrationComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingStateUI label="Redirecting to verification..." />
      </div>
    );
  }

  // Show loading screen when authenticated (redirect)
  if (status === "authenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingStateUI />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center uppercase text-custom-green">
          Create an account
        </h1>

        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            role: "",
            practitioner: "",
            password: "",
            password_confirmation: "",
          }}
          validationSchema={registrationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, resetForm }) => (
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <Field
                  name="name"
                  type="text"
                  className="login-form-input"
                  placeholder="John Doe"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="login-form-input"
                  placeholder="you@example.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <Field
                  name="phone"
                  type="text"
                  className="login-form-input"
                  placeholder="+23346579304"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Please select a role
                </label>
                <Field
                  name="role"
                  as="select"
                  className="login-form-input"
                  onChange={(e) => {
                    const role = e.target.value;
                    setSelectedRole(role);
                    setFieldValue("role", role);
                    if (role !== "healthworker") {
                      setFieldValue("practitioner", "");
                    }
                  }}
                >
                  <option value="">Select a role</option>
                  <option value="healthworker">Healthcare Professional</option>
                  <option value="client">Client</option>
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              {selectedRole === "healthworker" && (
                <div>
                  <label
                    htmlFor="practitioner"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Practitioner Type
                  </label>
                  <Field
                    name="practitioner"
                    as="select"
                    className="login-form-input"
                  >
                    <option value="">Select practitioner</option>
                    <option value="nurse">Nurse</option>
                  </Field>
                  <ErrorMessage
                    name="practitioner"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              )}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="login-form-input"
                    placeholder="••••••••"
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
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="password_confirmation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Field
                    name="password_confirmation"
                    type={showConfirmPassword ? "text" : "password"}
                    className="login-form-input"
                    placeholder="••••••••"
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
                  name="password_confirmation"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <LoaderButton
                loading={loading}
                loadingText="Creating account..."
                text="Create account"
                type="submit"
              />
            </Form>
          )}
        </Formik>

        <div className="mt-4 flex flex-row justify-between">
          <Link
            href="/"
            className="flex items-center text-custom-green hover:text-green-700 transition-colors duration-300"
          >
            <span className="mr-2">&#8592;</span>Go Back
          </Link>
          <Link
            href="/signin"
            className="flex items-center text-custom-green hover:text-green-700 transition-colors duration-300"
          >
            Have an account? SignIn
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
