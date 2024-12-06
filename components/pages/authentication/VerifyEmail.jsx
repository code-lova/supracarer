"use client";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { verifyEmailRequest } from "@service/request/auth/verifyEmailRequest";
import { useRouter } from "next/navigation";
import { logoutRequest } from "@service/request/auth/logoutRequest";
import { queryClient } from "@config/ReactQueryProvider";


const VerifyEmail = () => {
  const navigate = useRouter();
    const { id: code } = useParams();
    const { isLoading, isSuccess, isError, error } = useQuery({
        queryKey: ["emailVerification", code],
        queryFn: () => verifyEmailRequest(code),
        enabled: !!code, // Only run query if `code` is available
    });

    const { mutate:signOut } = useMutation({
      mutationFn: logoutRequest,
      onSettled: () => {
        queryClient.clear();
        navigate.push("/signin", { replace: true })
      }
    });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-row items-center justify-center">
          <h1 className="text-2xl font-bold mb-1 text-center uppercase blue_gradient">
            Email verification
          </h1>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center mt-4">
            <div className="loader mr-2" />
            <p className="text-base font-bold text-custom-green">Verifying your email...</p>
          </div>
        )}

        {isSuccess && (
          <div className="font-semibold text-center mt-6 green_gradient">
           <p className="text-base">Your email has been successfully verified. Thank you!</p>
          </div>
        )}

        {isError && (
          <div className="font-semibold text-center mt-6 text-red-500">
            {error?.message || "Link is either invalid or expired."}
            <Link href="/forgot-password" >
                <p className="mt-2 text-custom-green">Get a new link</p>
            </Link>
          </div>
        )}

        <div className="mt-10 flex flex-row justify-between">
          <button
            onClick={signOut}
            className="flex items-center text-custom-green hover:text-green-700 transition-colors duration-300"
          >
            <span className="mr-2">&#8592;</span>
            <p className="font-bold text-base">Login</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
