"use client";
import React, { useState } from "react";
import { FaEnvelope, FaBell, FaCheckCircle } from "react-icons/fa";

const Subscription = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your subscription logic here
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
    }, 3000);
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
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email address"
                      className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder-white/70 outline-none text-sm md:text-base"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-4 bg-white text-tranquil-teal font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2 text-sm md:text-base"
                  >
                    <span>Subscribe</span>
                    <FaEnvelope className="text-lg" />
                  </button>
                </div>
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
