"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { steps } from "@constants";

const StepsToGetCare = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-tranquil-teal/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-custom-green/5 rounded-full blur-3xl"></div>

      <div className="pageSection relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-tranquil-teal/10 text-tranquil-teal px-4 py-2 rounded-full text-sm font-medium border border-tranquil-teal/20 mb-6">
            <span className="w-2 h-2 bg-tranquil-teal rounded-full animate-pulse"></span>
            <span>Simple Process</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Steps to Get{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tranquil-teal to-custom-green">
              Quality Care
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            Getting started with Supracarer is simple and straightforward.
            Follow these easy steps to connect with trusted healthcare
            professionals.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="space-y-12 md:space-y-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={step.id}
                className={`flex flex-col ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } gap-6 md:gap-8 lg:gap-12 items-center`}
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                {/* Image Side */}
                <div className="w-full md:w-1/2 relative group">
                  <div
                    className={`relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 border-2 ${step.borderColor}`}
                  >
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Overlay with step number */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div
                      className={`absolute top-4 ${
                        isEven ? "left-4" : "right-4"
                      } w-16 h-16 ${
                        step.iconBg
                      } rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg`}
                    >
                      {step.id}
                    </div>
                  </div>

                  {/* Decorative Element */}
                  <div
                    className={`absolute -z-10 ${
                      isEven ? "-right-4" : "-left-4"
                    } top-4 w-full h-full rounded-2xl bg-gradient-to-br ${
                      step.gradient
                    } opacity-50`}
                  ></div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 space-y-4">
                  {/* Icon */}
                  <div
                    className={`inline-flex w-16 h-16 ${step.iconBg} rounded-xl items-center justify-center shadow-lg`}
                  >
                    <IconComponent className="text-3xl text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Step Indicator */}
                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-sm font-medium text-gray-500">
                      Step {step.id} of {steps.length}
                    </span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full max-w-xs overflow-hidden">
                      <div
                        className={`h-full ${step.iconBg} rounded-full transition-all duration-1000`}
                        style={{ width: `${(step.id / steps.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-tranquil-teal/5 via-custom-green/5 to-haven-blue/5 rounded-2xl p-8 md:p-12 border border-gray-100">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of families who trust Supracarer for their home
            healthcare needs
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/signup">
              <button className="px-8 py-4 bg-tranquil-teal text-white font-semibold rounded-full hover:bg-tranquil-teal/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                Sign Up Now
              </button>
            </Link>
            <Link href="/how-it-works">
              <button className="px-8 py-4 bg-white text-tranquil-teal font-semibold rounded-full border-2 border-tranquil-teal hover:bg-tranquil-teal/5 transition-all duration-300">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsToGetCare;
