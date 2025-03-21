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

const Register = () => {
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);

  const { mutate } = useMutation({
    mutationFn: registerRequest,
    onMutate: () => {
      setLoading(true); // Set loading to true when mutation starts
    },
    onSuccess: () => {
      toast.success("A verification link was sent to your email");
      navigate.push("/success");
      setLoading(false); // Optionally reset loading state
    },
    onError: (error) => {
      const errorMessage = error?.message || "An error occured";
      toast.error(errorMessage);
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
        <h1 className="text-2xl font-bold mb-6 text-center uppercase blue_gradient">
          Create an account
        </h1>

        <Formik
          initialValues={{
            fullname: "",
            email: "",
            phone: "",
            role: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={registrationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <Field
                  name="fullname"
                  type="text"
                  className="login-form-input"
                  placeholder="John Doe"
                />
                <ErrorMessage
                  name="fullname"
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
                <Field name="role" as="select" className="login-form-input">
                  <option value="">Select a role</option>
                  <option value="nurse">Nurse</option>
                  <option value="client">Client</option>
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className="login-form-input"
                  placeholder="••••••••"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
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
