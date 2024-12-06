"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "@schema";
import toast from "react-hot-toast";
import LoaderButton from "@components/LoaderButton";
import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "@service/request/auth/loginRequest";
import { useRouter } from "next/navigation";


const Login = () => {
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);

  const { mutate } = useMutation({
    mutationFn: loginRequest,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      toast.success("Login successfully");
      navigate.push("/redirect")
      setLoading(false);
    },
    onError: () => {
      toast.error("Invalid email or password");
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
            Welcome Back
          </h1>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
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

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Field
                    type="checkbox"
                    name="remember"
                    className="h-4 w-4 rounded"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <Link
                  href="/forgot-password"
                  className="text-sm text-custom-green hover:text-green-700"
                >
                  Forgot password?
                </Link>
              </div>

              <LoaderButton
                loading={loading}
                loadingText="Processing..."
                type="submit"
                text="Login account"
                className="login-btn"
              />
            </Form>
          )}
        </Formik>

        <div className="mt-4 flex flex-row justify-between">
          <Link
            href="/"
            className="flex items-center text-custom-green hover:text-green-700 transition-colors duration-300"
          >
            <span className="mr-2">&#8592;</span>
            <p>Go Back</p>
          </Link>
          <Link
            href="/signup"
            className="flex items-center text-custom-green hover:text-green-700 transition-colors duration-300"
          >
            <p>SignUp</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
