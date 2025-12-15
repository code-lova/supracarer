"use client";
import React, { useState, useCallback, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { FaEnvelope, FaBell, FaCheckCircle, FaSpinner } from "react-icons/fa";
import { subscriberSchema } from "@schema/frontend";
import { subscriber } from "@service/request/frontend/subscriber";
import toast from "react-hot-toast";


const Subscription = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: subscriber,
    onSuccess: (data) => {
      toast.success(data?.message || "Successfully subscribed!");
      setIsSubmitted(true);
      setEmail("");
      // Reset after 5 seconds to allow another subscription
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    },
    onError: (error) => {
      const errorMessage =
        error?.message || "Failed to subscribe. Please try again.";
      toast.error(errorMessage);
    },
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate email using Yup schema
    try {
      await subscriberSchema.validate({ email: email.trim() });
    } catch (validationError) {
      setError(validationError.message);
      return;
    }

    // Submit subscription
    mutate({
      email: email.trim().toLowerCase(),
    });
  };

  return (
    <div className="bg-gradient-to-br from-tranquil-teal via-custom-green to-haven-blue py-16 md:py-20 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>

      <div className="pageSection relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon Badge */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-full mb-6 border border-white/30">
            <FaBell className="text-white text-2xl animate-pulse" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Subscribe & Stay Updated
          </h2>

          {/* Description */}
          <p className="text-white/90 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Sign up to our newsletter and be the first to know about latest
            news, special offers, events, and exclusive discounts.
          </p>

          {/* Subscription Form */}
          <div className="max-w-2xl mx-auto">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="relative">
                <div className="flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 shadow-2xl">
                  <div className="flex-1 relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 text-lg" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError(""); // Clear error on input change
                      }}
                      required
                      disabled={isPending}
                      placeholder="Enter your email address"
                      maxLength={255}
                      autoComplete="email"
                      className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder-white/70 outline-none text-sm md:text-base disabled:opacity-50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="px-8 py-4 bg-white text-tranquil-teal font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2 text-sm md:text-base disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isPending ? (
                      <>
                        <FaSpinner className="text-lg animate-spin" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <FaEnvelope className="text-lg" />
                      </>
                    )}
                  </button>
                </div>

                {/* Error Message */}
                {error && (
                  <p className="text-white bg-red-500/80 backdrop-blur-sm text-sm mt-3 px-4 py-2 rounded-full inline-block">
                    {error}
                  </p>
                )}

                
              </form>
            ) : (
              <div className="bg-white/20 backdrop-blur-md rounded-full p-6 border border-white/30 flex items-center justify-center gap-3 animate-fade-in">
                <FaCheckCircle className="text-white text-2xl" />
                <span className="text-white font-semibold text-lg">
                  Thank you for subscribing!
                </span>
              </div>
            )}
          </div>

          {/* Benefits */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
            {[
              { icon: "🎯", text: "Exclusive Updates" },
              { icon: "💝", text: "Special Offers" },
              { icon: "🎉", text: "Early Access" },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-3xl mb-2">{benefit.icon}</div>
                <p className="text-white font-medium text-sm">{benefit.text}</p>
              </div>
            ))}
          </div>

          {/* Privacy Notice */}
          <p className="mt-8 text-white/70 text-xs md:text-sm">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
