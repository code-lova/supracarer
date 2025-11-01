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
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";

const Login = () => {
  const { data: session, status } = useSession();
  const { refetchUser } = useUserContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [pendingCredentials, setPendingCredentials] = useState(null);
  const [twoFactorData, setTwoFactorData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [retainedEmail, setRetainedEmail] = useState("");

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

  const handleSubmit = async (values, { setSubmitting, setFieldValue }) => {
    setLoading(true);
    setRetainedEmail(values.email); // Store email before attempting login

    try {
      // Use NextAuth signIn for initial login
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        userAgent: navigator.userAgent,
        password: values.password,
      });

      // If NextAuth returns 2FA_REQUIRED, use the twoFactorData from result (do NOT call /login again)
      if (result?.error === "2FA_REQUIRED") {
        setPendingCredentials({
          email: values.email,
          password: values.password,
        });
        setTwoFactorData(result.twoFactorData);
        setShowTwoFactor(true);
        setLoading(false);
        toast.success(
          result.twoFactorData || "Verification code sent to your email"
        );
      } else if (result?.error === "2FA_REQUIRED") {
        toast.error("2FA verification required, but no data returned");
        setLoading(false);
      } else if (result?.error) {
        // Retain email but clear password on error
        setFieldValue("email", retainedEmail);
        setFieldValue("password", "");
        toast.error(
          result.error === "Invalid credentials"
            ? "Invalid email or password"
            : result.error
        );
        setLoading(false);
      } else {
        toast.success("Login successful");
        // Clear retained email on success
        setRetainedEmail("");
        // Note: refetchUser() removed - NextAuth session should handle user data
        // User context will automatically update when session changes
        // First-time login flag will be managed by the ProfileWarningModal based on actual user data
      }
    } catch (error) {
      // Retain email but clear password on error
      setFieldValue("email", retainedEmail);
      setFieldValue("password", "");
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
      // Note: refetchUser() removed - NextAuth session should handle user data
      // Clean up state
      setShowTwoFactor(false);
      setPendingCredentials(null);
      setTwoFactorData(null);
      // First-time login flag will be managed by the ProfileWarningModal based on actual user data
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

  // Show loading screen when actively logging in
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingStateUI label="Logging you in..." />
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
    <div className="h-screen flex overflow-hidden">
      <div className="w-full flex flex-col lg:grid lg:grid-cols-2">
        {/* Left Side - Form */}
        <div className="relative bg-white p-6 sm:p-8 lg:p-12 flex items-center justify-center order-2 lg:order-1 overflow-y-auto flex-1 lg:flex-none">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600 text-sm">Sign in to your account</p>
            </div>

            <Formik
              initialValues={{ email: retainedEmail, password: "" }}
              validationSchema={loginSchema}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {() => (
                <Form className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
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
                      htmlFor="password"
                      className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
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

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Field
                        type="checkbox"
                        name="remember"
                        className="h-4 w-4 rounded border-gray-300 text-tranquil-teal focus:ring-tranquil-teal"
                      />
                      <label
                        htmlFor="remember"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Remember me
                      </label>
                    </div>

                    <Link
                      href="/forgot-password"
                      className="text-sm text-tranquil-teal hover:text-custom-green font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="pt-1">
                    <LoaderButton
                      loading={loading}
                      loadingText="Signing in..."
                      type="submit"
                      text="Sign In"
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
                href="/signup"
                className="flex items-center text-tranquil-teal hover:text-custom-green transition-colors duration-300 text-sm font-medium"
              >
                Don't have an account?
                <span className="ml-1 font-semibold">Sign Up</span>
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
              <div className="hidden md:inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium border border-white/30 mb-6">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                <span>Welcome to Supracarer</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Quality Care at Your Fingertips
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Access trusted healthcare professionals and manage your care
                seamlessly.
              </p>

              {/* Features */}
              <div className="hidden md:grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
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

export default Login;
