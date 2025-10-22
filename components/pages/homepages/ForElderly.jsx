"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@components/landing/Footer";
import Subscription from "@components/landing/Subscription";
import {
  FaHeart,
  FaUserMd,
  FaClock,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import {
  simpleProcessForElderly,
  elderlyBenefits,
  elderlyServices,
} from "@constants";

const ForElderly = () => {
  return (
    <section className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-tranquil-teal via-custom-green to-haven-blue py-24 lg:py-32 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

        <div className="pageSection relative z-10 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-white space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/30">
                <FaHeart className="text-lg" />
                <span>Elderly Care Services</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Quality Care for Your Loved Ones
              </h1>

              <p className="text-xl text-white/90 leading-relaxed">
                Professional, compassionate homecare services that allow seniors
                to live independently and comfortably in their own homes.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/signin"
                  className="px-8 py-4 bg-white text-tranquil-teal rounded-lg font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  Book Care Now
                  <FaArrowRight />
                </Link>
                <Link
                  href="/contact-us"
                  className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-tranquil-teal transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/images/002.webp"
                alt="Elderly Care"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-tranquil-teal rounded-lg flex items-center justify-center">
                    <FaCheckCircle className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Trusted Care</p>
                    <p className="text-lg font-bold text-gray-800">
                      Qualified Professionals
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-tranquil-teal/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-custom-green/5 rounded-full blur-3xl"></div>

        <div className="pageSection relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-tranquil-teal/10 text-tranquil-teal px-4 py-2 rounded-full text-sm font-medium border border-tranquil-teal/20 mb-6">
              <FaCheckCircle className="text-lg" />
              <span>Why Choose Us</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Benefits of Our{" "}
              <span className="text-tranquil-teal">Elderly Care</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We provide comprehensive care that prioritizes comfort, dignity,
              and independence for your elderly loved ones
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {elderlyBenefits.map((benefit, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div
                  className={`w-16 h-16 bg-${benefit.color} rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}
                >
                  <benefit.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <div className="bg-gradient-to-br from-gray-50 via-white to-tranquil-teal/5 py-20">
        <div className="pageSection">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-custom-green/10 text-custom-green px-4 py-2 rounded-full text-sm font-medium border border-custom-green/20">
                <FaUserMd className="text-lg" />
                <span>Our Services</span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800">
                Comprehensive Care{" "}
                <span className="text-custom-green">Services</span>
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                Our trained caregivers provide a wide range of services to
                support daily living activities and medical needs, ensuring your
                loved ones receive the best care possible.
              </p>

              {/* Services List */}
              <div className="space-y-4">
                {elderlyServices.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="w-12 h-12 bg-tranquil-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <service.icon className="text-tranquil-teal text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">
                        {service.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/images/nursing-aid.png"
                alt="Caregiver with elderly patient"
                fill
                className="object-cover"
                style={{ objectPosition: "center 10%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20">
        <div className="pageSection">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-haven-blue/10 text-haven-blue px-4 py-2 rounded-full text-sm font-medium border border-haven-blue/20 mb-6">
              <FaClock className="text-lg" />
              <span>Simple Process</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Getting Started is Easy
            </h2>
            <p className="text-lg text-gray-600">
              Three simple steps to connect your loved ones with professional
              care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {simpleProcessForElderly.map((item, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center"
              >
                <div className="text-6xl font-bold text-tranquil-teal/10 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-tranquil-teal via-custom-green to-haven-blue py-20">
        <div className="pageSection text-center text-white">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Provide the Best Care?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join families who trust Supracarer for compassionate, professional
            elderly care services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-4 bg-white text-tranquil-teal rounded-lg font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              Get Started Now
              <FaArrowRight />
            </Link>
            <Link
              href="/contact-us"
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-tranquil-teal transition-all duration-300 flex items-center justify-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      <Subscription />
      <Footer />
    </section>
  );
};

export default ForElderly;
