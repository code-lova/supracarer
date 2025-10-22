"use client";
import React from "react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { trustReasons } from "@constants";

const WhyFamiliesTrustUs = () => {
  return (
    <div className="bg-white py-16 md:py-10 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-tranquil-teal/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-custom-green/5 rounded-full blur-3xl"></div>

      <div className="pageSection relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-tranquil-teal/10 text-tranquil-teal px-4 py-2 rounded-full text-sm font-medium border border-tranquil-teal/20 mb-6">
            <span className="w-2 h-2 bg-tranquil-teal rounded-full animate-pulse"></span>
            <span>Trusted by Thousands</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Why Families{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tranquil-teal to-custom-green">
              Trust Us
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            Discover what makes Supracarer the preferred choice for families
            seeking quality home healthcare services
          </p>
        </div>

        {/* Trust Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {trustReasons.map((reason, index) => {
            const IconComponent = reason.icon;
            return (
              <div
                key={reason.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={reason.image}
                    alt={reason.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    style={{ objectPosition: "center 20%" }}
                  />
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent`}
                  ></div>

                  {/* Icon Badge */}
                  <div
                    className={`absolute top-4 right-4 w-12 h-12 ${reason.iconBg} rounded-xl flex items-center justify-center shadow-lg`}
                  >
                    <IconComponent className="text-2xl text-white" />
                  </div>

                  {/* Stats Badge */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                    <span className="text-sm font-bold text-gray-800">
                      {reason.stats}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-tranquil-teal transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {reason.description}
                  </p>

                  {/* Bottom Accent Line */}
                  <div
                    className={`mt-4 w-12 h-1 ${reason.iconBg} rounded-full group-hover:w-full transition-all duration-500`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-tranquil-teal to-custom-green rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <FaHeart className="text-white text-2xl" />
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Join Our Trusted Community
              </h3>
            </div>
            <p className="text-white/90 text-base md:text-lg mb-6 max-w-2xl mx-auto">
              Experience the peace of mind that comes from knowing your loved
              ones are in safe, caring hands
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/signup"
                className="px-8 py-4 bg-white text-tranquil-teal font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Get Started Today
              </a>
              <a
                href="/contact-us"
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full border-2 border-white/50 hover:bg-white/20 transition-all duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyFamiliesTrustUs;
