"use client";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registrationSchema } from "@schema/auth";
import toast from "react-hot-toast";
import LoaderButton from "@components/core/LoaderButton";
import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { registerRequest } from "@service/request/auth/registerRequest";
import LoadingStateUI from "@components/core/loading";
import useRedirectIfAuthenticated from "@hooks/useRedirectIfAuthenticated";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import PhoneInput from "@components/core/PhoneInput";

const Register = () => {
  const status = useRedirectIfAuthenticated();
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [retainedValues, setRetainedValues] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const { mutate } = useMutation({
    mutationFn: registerRequest,
    onMutate: () => {
      setLoading(true); // Set loading to true when mutation starts
    },
    onSuccess: (data, variables, context) => {
      toast.success("A verification code was sent to your email");
      localStorage.setItem("verificationEmail", data.user.email);
      // Clear retained values on success
      setRetainedValues({
        name: "",
        email: "",
        phone: "",
      });
      setSelectedRole("");
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

  const handleSubmit = (values, { resetForm, setFieldValue }) => {
    // Store values before submitting (exclude passwords for security)
    setRetainedValues({
      name: values.name,
      email: values.email,
      phone: values.phone,
    });

    mutate(values, {
      onSuccess: () => {
        resetForm();
      },
      onError: () => {
        // Restore all values except passwords on error
        setFieldValue("name", retainedValues.name || values.name);
        setFieldValue("email", retainedValues.email || values.email);
        setFieldValue("phone", retainedValues.phone || values.phone);
        setFieldValue("role", "");
        setFieldValue("practitioner", "");
        setFieldValue("password", "");
        setFieldValue("password_confirmation", "");
        // Update selected role for conditional field display
        setSelectedRole(retainedValues.role || values.role);
      },
    });
    console.log("values to submit ", values);
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
    <div className="h-screen flex overflow-hidden">
      <div className="w-full flex flex-col lg:grid lg:grid-cols-2">
        {/* Left Side - Form */}
        <div className="relative bg-white p-6 sm:p-8 lg:p-12 flex items-start lg:items-center justify-center order-2 lg:order-1 overflow-y-auto flex-1 lg:flex-none">
          <div className="w-full max-w-md py-8 lg:py-0">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </h1>
              <p className="text-gray-600 text-sm">Join Supracarer today</p>
            </div>

            <Formik
              initialValues={{
                name: retainedValues.name,
                email: retainedValues.email,
                phone: retainedValues.phone,
                role: "",
                practitioner: "",
                password: "",
                password_confirmation: "",
              }}
              validationSchema={registrationSchema}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {({ setFieldValue, resetForm }) => (
                <Form className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullname"
                      className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                      Full Name
                    </label>
                    <Field
                      name="name"
                      type="text"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-tranquil-teal focus:border-transparent transition-all duration-200 outline-none"
                      placeholder="John Doe"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Email and Phone in Grid */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-700 mb-1.5"
                      >
                        Email
                      </label>
                      <Field
                        name="email"
                        type="email"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-tranquil-teal focus:border-transparent transition-all duration-200 outline-none"
                        placeholder="you@example.com"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-gray-700 mb-1.5"
                      >
                        Phone Number
                      </label>
                      <Field name="phone">
                        {({ field, form, meta }) => (
                          <PhoneInput
                            value={field.value}
                            onChange={(value) =>
                              form.setFieldValue("phone", value)
                            }
                            error={
                              meta.touched && meta.error ? meta.error : null
                            }
                            placeholder="0124123456789"
                            required
                          />
                        )}
                      </Field>
                    </div>
                  </div>

                  {/* Role Selection */}
                  <div>
                    <label
                      htmlFor="role"
                      className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                      Select an Account Type
                    </label>
                    <Field
                      name="role"
                      as="select"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-tranquil-teal focus:border-transparent transition-all duration-200 outline-none bg-white appearance-none cursor-pointer select-dropdown"
                      onChange={(e) => {
                        const role = e.target.value;
                        setSelectedRole(role);
                        setFieldValue("role", role);
                        if (role !== "healthworker") {
                          setFieldValue("practitioner", "");
                        }
                      }}
                    >
                      <option value="">Choose</option>
                      <option value="healthworker">
                        Healthcare Professional
                      </option>
                      <option value="client">Client</option>
                    </Field>
                    <ErrorMessage
                      name="role"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Conditional Practitioner Type */}
                  {selectedRole === "healthworker" && (
                    <div className="animate-fade-in">
                      <label
                        htmlFor="practitioner"
                        className="block text-sm font-semibold text-gray-700 mb-1.5"
                      >
                        Practitioner Type
                      </label>
                      <Field
                        name="practitioner"
                        as="select"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-tranquil-teal focus:border-transparent transition-all duration-200 outline-none bg-white appearance-none cursor-pointer select-dropdown"
                      >
                        <option value="">Select type</option>
                        <option value="nurse">Nurse</option>
                      </Field>
                      <ErrorMessage
                        name="practitioner"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  )}

                  {/* Password Fields in Grid */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-gray-700 mb-1.5"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <Field
                          name="password"
                          type={showPassword ? "text" : "password"}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-tranquil-teal focus:border-transparent transition-all duration-200 outline-none"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <FaEyeSlash className="w-4 h-4" />
                          ) : (
                            <FaEye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="password_confirmation"
                        className="block text-sm font-semibold text-gray-700 mb-1.5"
                      >
                        Confirm
                      </label>
                      <div className="relative">
                        <Field
                          name="password_confirmation"
                          type={showConfirmPassword ? "text" : "password"}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-tranquil-teal focus:border-transparent transition-all duration-200 outline-none"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <FaEyeSlash className="w-4 h-4" />
                          ) : (
                            <FaEye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      <ErrorMessage
                        name="password_confirmation"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1">
                    <LoaderButton
                      loading={loading}
                      loadingText="Creating account..."
                      text="Create Account"
                      type="submit"
                    />
                  </div>
                </Form>
              )}
            </Formik>

            {/* Footer Links */}
            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-gray-200">
              <Link
                href="/"
                className="flex items-center text-gray-600 hover:text-tranquil-teal transition-colors duration-300 text-sm font-medium"
              >
                <span className="mr-2">←</span>
                <span>Back to Home</span>
              </Link>
              <Link
                href="/signin"
                className="flex items-center text-tranquil-teal hover:text-custom-green transition-colors duration-300 text-sm font-medium"
              >
                Have an account?
                <span className="ml-1 font-semibold">Sign In</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - Image & Content */}
        <div className="relative order-1 lg:order-2 overflow-hidden h-48 lg:h-auto">
          {/* Background Image */}
          <Image
            src="/assets/images/group_nurse.webp"
            fill
            style={{ objectFit: "cover" }}
            alt="Healthcare professionals"
            className="absolute inset-0"
            priority
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-tranquil-teal/90 via-custom-green/85 to-haven-blue/90"></div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center p-8 sm:p-12">
            <div className="text-white max-w-md text-center">
              <div className="hidden lg:inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium border border-white/30 mb-6">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                <span>Join Supracarer</span>
              </div>

              <h2 className="text-3xl sm:text-3xl lg:text-5xl font-bold mb-4 leading-tight">
                Your Healthcare Journey Starts Here
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Connect with trusted professionals and receive quality care at
                home.
              </p>

              {/* Features */}
              <div className="hidden lg:grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold">24/7</div>
                  <div className="text-white/80 text-xs sm:text-sm">
                    Available
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold">100%</div>
                  <div className="text-white/80 text-xs sm:text-sm">
                    Verified
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold">Safe</div>
                  <div className="text-white/80 text-xs sm:text-sm">
                    & Secure
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
