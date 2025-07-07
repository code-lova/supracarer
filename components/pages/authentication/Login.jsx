"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signIn, useSession } from "next-auth/react";
import { loginSchema } from "@schema/auth";
import toast from "react-hot-toast";
import LoaderButton from "@components/core/LoaderButton";
import { useRouter } from "next/navigation";
import { useUserContext } from "@context/userContext";
import LoadingStateUI from "@components/core/loading";

const Login = () => {
  const { data: session, status } = useSession();
  const { refetchUser } = useUserContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Redirect logged-in users to their respective dashboard
  useEffect(() => {
    if (status === "authenticated") {
      switch (session?.user?.role) {
        case "client":
          router.push("/client");
          break;
        case "healthworker":
          router.push("/health-service");
          break;
        case "admin":
          router.push("/admin");
          break;
        default:
          router.push("/signin");
      }
    }
  }, [session, status, router]);

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false, // Prevent NextAuth from handling redirects
      email: values.email,
      password: values.password,
    });

    if (result?.error) {
      toast.error("Invalid email or password");
      setLoading(false);
    } else {
      toast.success("Login successful");
      refetchUser();
    }

    setSubmitting(false);
  };

  if (
    (status === "loading" && status !== "authenticated") ||
    status === "authenticated"
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingStateUI label="Redirecting you in a sec..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-row items-center justify-center">
          <h1 className="text-2xl font-bold mb-1 text-center uppercase text-custom-green">
            Welcome Back
          </h1>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-haven-blue">Login</h2>

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
