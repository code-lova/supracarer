"use client";
import React from "react";
import { pricingPlan } from "@constants/index";
import { FaCheck, FaStar, FaHeart, FaShieldAlt } from "react-icons/fa";
import Link from "next/link";

const Pricing = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-custom-green/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-haven-blue/10 rounded-full blur-3xl"></div>

        {/* Header Section */}
        <div className="pageSection text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-custom-green/10 text-custom-green px-4 py-2 rounded-full text-sm font-medium mb-4">
            <FaHeart className="text-sm" />
            <span>Supracarer Care Packages</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Because every family deserves care,{" "}
            <span className="text-custom-green">comfort</span>, and{" "}
            <span className="text-tranquil-teal">peace of mind</span> at home.
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At Supracarer, we don't just focus on medical needs — we care for
            your whole health:
            <span className="font-semibold text-custom-green">
              {" "}
              medical, social, emotional, and psychological
            </span>
            . This holistic touch is built into everything we do.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {pricingPlan.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${
                plan.popular
                  ? `border-${plan.color} border-opacity-30`
                  : "border-gray-100"
              } overflow-hidden group flex flex-col h-full`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div
                  className={`absolute top-0 right-0 bg-${plan.color} text-white px-4 py-1 rounded-bl-2xl flex items-center gap-1 z-10`}
                >
                  <FaStar className="text-xs" />
                  <span className="text-sm font-medium">Popular</span>
                </div>
              )}

              <div className="p-8 flex-grow flex flex-col">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="text-4xl mb-4">{plan.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {plan.tagline}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {plan.subtitle}
                  </p>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-800">
                      {plan.amount}
                    </span>
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  </div>
                  {plan.includes && (
                    <div
                      className={`bg-${plan.color}/10 text-${plan.color} px-3 py-2 rounded-lg text-sm font-medium`}
                    >
                      Includes: {plan.includes}
                    </div>
                  )}
                </div>

                {/* Price Options (for variable pricing) */}
                {plan.priceOptions && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 text-center">
                      Price Options:
                    </h4>
                    <div className="space-y-2">
                      {plan.priceOptions.map((option, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                        >
                          <span className="text-sm text-gray-700">
                            {option.duration}
                          </span>
                          <span className="font-semibold text-gray-800">
                            {option.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                <div className="space-y-4 flex-grow">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FaShieldAlt className={`text-${plan.color}`} />
                    What's Included:
                  </h4>
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <FaCheck
                        className={`text-${plan.color} mt-1 flex-shrink-0 text-sm`}
                      />
                      <span className="text-gray-700 text-sm leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom decorative element */}
              <div
                className={`h-2 bg-gradient-to-r from-${plan.color} to-${plan.color}/70 mt-auto`}
              ></div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-custom-green/10 to-tranquil-teal/10 rounded-2xl p-8 max-w-4xl mx-auto border border-custom-green/20">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Need a Custom Plan?
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Every family is unique. If you need a combination of services or
              have specific requirements, our care coordinators can create a
              personalized care package just for you.
            </p>
            <Link href="/contact-us">
              <button className="bg-custom-green hover:bg-custom-green/90 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Contact Our Care Team
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
