"use client";
import React from "react";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { UnsubscribeApi } from "@service/request/frontend/subscriber";
import toast from "react-hot-toast";
import { FiCheckCircle, FiSend, FiXCircle, FiMail } from "react-icons/fi";
import { MediumBtn, NormalBtn } from "@components/core/button";

const Unsubscriber = () => {
  const { uuid } = useParams();
  const router = useRouter();
  const [hasUnsubscribed, setHasUnsubscribed] = useState(false);

  const unsubscribeMutation = useMutation({
    mutationFn: (uuid) => UnsubscribeApi(uuid),
    onSuccess: (data) => {
      setHasUnsubscribed(true);
      toast.success(
        data.message || "Successfully unsubscribed from newsletter"
      );
      // Navigate to home after a short delay to show the success message
      setTimeout(() => {
        router.push("/");
      }, 2000);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to unsubscribe. Please try again.");
    },
  });

  const handleUnsubscribe = () => {
    if (uuid) {
      unsubscribeMutation.mutate(uuid);
    }
  };


  // Show success state after unsubscribe
  if (hasUnsubscribed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="text-custom-green mb-4">
              <FiCheckCircle className="w-16 h-16 mx-auto" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Unsubscribed Successfully
          </h1>

          <p className="text-gray-600 mb-6">
            You have been successfully unsubscribed from our newsletter.
            Redirecting to homepage...
          </p>

          <NormalBtn href="/" children="Go to Homepage Now" />
        </div>
      </div>
    );
  }

  // Show confirmation screen initially
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="text-blue-500 mb-4">
            <FiMail className="w-16 h-16 mx-auto" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Unsubscribe from Newsletter
        </h1>

        <p className="text-gray-600 mb-6">
          Are you sure you want to unsubscribe from our newsletter? You will no
          longer receive updates about SupraCarer.
        </p>

        <div className="space-y-3">
          <div className="flex justify-center items-center gap-4 mb-4">
            <MediumBtn
              onClick={handleUnsubscribe}
              text="Yes, Unsubscribe"
              loadingText="Unsubscribing..."
              loading={unsubscribeMutation.isPending}
              type="button"
              color="red"
              disabled={unsubscribeMutation.isPending}
              icon={<FiSend className="mr-1" />}
            />

            <MediumBtn
              text="Keep Subscription"
              type="button"
              color="darkblue"
              href="/"
            />
          </div>

          {unsubscribeMutation.isError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="mb-6">
                <div className="text-red-500 mb-4">
                  <FiXCircle className="w-16 h-16 mx-auto" />
                </div>
              </div>
              <p className="text-red-700 text-sm mb-2">
                Failed to unsubscribe. Please try again.
              </p>
              <MediumBtn
                onClick={handleUnsubscribe}
                text="Try Again"
                loadingText="Retrying..."
                loading={unsubscribeMutation.isPending}
                type="button"
                color="red"
                disabled={unsubscribeMutation.isPending}
                icon={<FiSend className="mr-1" />}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Unsubscriber;
