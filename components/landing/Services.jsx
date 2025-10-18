import React from "react";
import Image from "next/image";
import { abtWhatWeOffer } from "@constants/index";
import { NormalBtn } from "@components/core/button";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

const Services = () => {
  return (
    <div className="bg-white py-20 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-custom-green/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-tranquil-teal/5 rounded-full blur-3xl"></div>

      <div className="pageSection relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-custom-green/10 text-custom-green px-4 py-2 rounded-full text-sm font-medium border border-custom-green/20 mb-6">
            <FaCheckCircle className="text-lg" />
            <span>What We Offer</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Comprehensive Care{" "}
            <span className="text-custom-green">Solutions</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We're committed to delivering high-quality homecare services that
            connect families with the right healthcare professionals
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {abtWhatWeOffer.map((service, index) => (
            <div
              key={service.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Image Container */}
              <div className="relative w-full h-64 overflow-hidden bg-gray-50">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                  className="transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                {/* Icon Badge - Positioned on Image */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10">
                  <div className="w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-custom-green/20 group-hover:scale-110 group-hover:border-custom-green transition-all duration-300">
                    {service.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="pt-12 pb-8 px-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-custom-green transition-colors duration-300">
                  {service.name}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm mb-4">
                  {service.text}
                </p>

                {/* Learn More Link */}
                <Link href={service.link}>
                  <div className="flex items-center justify-center gap-2 text-tranquil-teal group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">Learn more</span>
                    <FaArrowRight className="text-sm" />
                  </div>
                </Link>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-custom-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="relative bg-gradient-to-r from-tranquil-teal via-custom-green to-haven-blue rounded-2xl p-10 shadow-xl overflow-hidden">
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Text Content */}
            <div className="text-white text-center lg:text-left flex-1">
              <h3 className="text-2xl lg:text-3xl font-bold mb-2">
                Need Care Service?
              </h3>
              <p className="text-lg opacity-90">
                Book for care service today and experience
                quality homecare
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex-shrink-0">
              <Link
                href="/signin"
                className="px-8 py-4 bg-white text-tranquil-teal rounded-lg font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2 group"
              >
                Get Care Now
                <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
