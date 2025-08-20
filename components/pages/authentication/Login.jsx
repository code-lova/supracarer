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
import TwoFactorAuth from "./TwoFactorAuth";

const Login = () => {
  const { data: session, status } = useSession();
  const { refetchUser } = useUserContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [pendingCredentials, setPendingCredentials] = useState(null);
  const [twoFactorData, setTwoFactorData] = useState(null);

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

    try {
      // First, check credentials with backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Real-User-Agent": navigator.userAgent,
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
            userAgent: navigator.userAgent,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      // Check if user has 2FA enabled
      if (data.requires_2fa) {
        // Store credentials and 2FA data for later use
        setPendingCredentials({
          email: values.email,
          password: values.password,
        });
        setTwoFactorData(data);
        setShowTwoFactor(true);
        setLoading(false);
        toast.success(data.message || "Verification code sent to your email");
      } else {
        // Proceed with normal login through NextAuth
        const result = await signIn("credentials", {
          redirect: false,
          email: values.email,
          userAgent: navigator.userAgent,
          password: values.password,
        });

        if (result?.error) {
          if (result.error === "2FA_REQUIRED") {
            // This shouldn't happen here, but just in case
            toast.error("2FA verification required");
          } else {
            toast.error("Invalid email or password");
          }
          setLoading(false);
        } else {
          toast.success("Login successful");
          refetchUser();
        }
      }
    } catch (error) {
      toast.error(error.message || "Login failed");
      setLoading(false);
    }

    setSubmitting(false);
  };

  const handle2FASuccess = async (verificationData) => {
    setLoading(true);
    
    try {
      // If the verification data contains user information and token, use it directly
      if (verificationData.user && verificationData.accessToken) {
        // Create a session using the verification response data
        const result = await signIn("credentials", {
          redirect: false,
          email: verificationData.user.email,
          // Pass the verification data to NextAuth
          userDataFromVerification: JSON.stringify(verificationData),
          skipBackendCall: true,
        });

        if (result?.error) {
          throw new Error("Session creation failed");
        }
      } else {
        // Fallback: try the normal login flow
        const result = await signIn("credentials", {
          redirect: false,
          email: pendingCredentials.email,
          userAgent: navigator.userAgent,
          password: pendingCredentials.password,
          verified2FA: true,
        });

        if (result?.error) {
          throw new Error("Login failed after verification");
        }
      }

      toast.success("Login successful");
      refetchUser();
      // Clean up state
      setShowTwoFactor(false);
      setPendingCredentials(null);
      setTwoFactorData(null);
    } catch (error) {
      console.error("2FA success handler error:", error);
      toast.error(error.message || "Login failed after verification");
      setLoading(false);
      setShowTwoFactor(false);
      setPendingCredentials(null);
      setTwoFactorData(null);
    }
  };

  const handleBackToLogin = () => {
    setShowTwoFactor(false);
    setPendingCredentials(null);
    setTwoFactorData(null);
    setLoading(false);
  };

  if (
    (status === "loading" && status !== "authenticated") ||
    status === "authenticated"
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingStateUI />
      </div>
    );
  }

  // Show 2FA form if user has 2FA enabled
  if (showTwoFactor) {
    return (
      <TwoFactorAuth
        onVerificationSuccess={handle2FASuccess}
        userEmail={twoFactorData?.meta?.email || pendingCredentials?.email}
        onBack={handleBackToLogin}
      />
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
