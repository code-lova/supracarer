"use client";
import React from "react";
import Image from "next/image";
import { mission, vision, whatDrivesUs } from "@constants/index";
import { FlagSolid } from "@components/core/icon/flag";
import { SharpDiamond } from "@components/core/icon/diamond";
import Team from "@components/landing/Team";
import Services from "@components/landing/Services";
import Footer from "@components/landing/Footer";
import Subscription from "@components/landing/Subscription";
import { FaCheckCircle, FaUsers, FaAward } from "react-icons/fa";

export const About = () => {
  return (
    <section className="bg-white">
      {/* Hero Header Section */}
      <div className="relative bg-gradient-to-br from-tranquil-teal via-custom-green to-haven-blue py-10 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

        <div className="pageSection relative z-10 text-center py-10">
          <div className="max-w-4xl mx-auto mt-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Learn More About Supracarer
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Connecting families with trusted healthcare professionals
            </p>

            {/* Decorative Line */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <div className="w-20 h-1 bg-white/30 rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-20 h-1 bg-white/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Who We Are Section */}
      <div className="pageSection py-20">
        <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between gap-12 md:gap-16 items-center">
          {/* Image Section - Left */}
          <div className="relative w-full md:w-[550px] h-[650px] md:h-[750px] rounded-3xl overflow-hidden group">
            {/* Vertical Text Badge */}
            <div className="absolute -left-1 top-20 z-20 bg-custom-green text-white px-4 py-8 rounded-r-xl shadow-lg">
              <span
                className="text-sm uppercase font-semibold tracking-wider transform -rotate-180"
                style={{ writingMode: "vertical-lr" }}
              >
                Quality Care for Every Family
              </span>
            </div>

            {/* Main Image */}
            <div className="relative w-full h-full">
              <Image
                src="/assets/images/nursing-aid.png"
                alt="Healthcare Professional"
                fill
                style={{ objectFit: "cover" }}
                loading="lazy"
                className="rounded-3xl transition-transform duration-500 group-hover:scale-105"
              />
              {/* Decorative Border */}
              <div className="hidden md:block absolute inset-3 border-2 border-white/30 rounded-3xl pointer-events-none"></div>

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-3xl"></div>

              {/* Stats Badge */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold text-tranquil-teal">MVP</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Ready to Launch
                    </p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-custom-green">24/7</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Support Available
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-tranquil-teal/20 rounded-full blur-3xl -z-10"></div>
          </div>

          {/* Content Section - Right */}
          <div className="w-full md:w-1/2 space-y-8">
            {/* Section Badge */}
            <div className="inline-flex items-center gap-2 bg-tranquil-teal/10 text-tranquil-teal px-4 py-2 rounded-full text-sm font-medium border border-tranquil-teal/20">
              <FaUsers className="text-lg" />
              <span>Get to Know Us</span>
            </div>

            {/* Heading */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                Who <span className="text-tranquil-teal">We Are</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-tranquil-teal to-custom-green rounded-full"></div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-lg text-gray-600 leading-relaxed">
                A homecare platform that seamlessly connects{" "}
                <span className="font-semibold text-tranquil-teal">
                  families seeking quality care
                </span>{" "}
                with{" "}
                <span className="font-semibold text-custom-green">
                  qualified healthcare professionals
                </span>
                , ensuring a simple and efficient process for everyone.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We are dedicated to helping families find trusted, compassionate
                caregivers and nurses who provide high-quality support tailored
                to their specific needs, while empowering healthcare
                professionals with flexible opportunities.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                At Supracarer, we recognize the critical need for personalized
                healthcare in the home environment, building a community where
                care meets convenience.
              </p>
            </div>

            {/* Mission & Vision */}
            <div className="space-y-6 pt-4">
              {/* Mission */}
              <div className="flex gap-4 group">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-tranquil-teal to-custom-green rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <FlagSolid color="#fff" className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                    Our Mission
                    <FaCheckCircle className="text-tranquil-teal text-sm" />
                  </h3>
                  {mission.map((mision) => (
                    <p
                      key={mision.title}
                      className="text-gray-600 leading-relaxed"
                    >
                      {mision.mission}
                    </p>
                  ))}
                </div>
              </div>

              {/* Vision */}
              <div className="flex gap-4 group">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-haven-blue to-carer-blue rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <SharpDiamond color="#fff" className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                    Our Vision
                    <FaCheckCircle className="text-haven-blue text-sm" />
                  </h3>
                  {vision.map((vison) => (
                    <p
                      key={vison.title}
                      className="text-gray-600 leading-relaxed"
                    >
                      {vison.vision}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="bg-gradient-to-br from-gray-50 via-white to-tranquil-teal/5 py-20 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-custom-green/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-haven-blue/10 rounded-full blur-3xl"></div>

        <div className="pageSection relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-custom-green/10 text-custom-green px-4 py-2 rounded-full text-sm font-medium border border-custom-green/20 mb-6">
              <FaAward className="text-lg" />
              <span>Our Foundation</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              What Drives Us
            </h2>
            <p className="text-lg text-gray-600">
              Our core values guide every decision we make and every service we
              provide
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whatDrivesUs.map((value, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div
                  className={`w-16 h-16 bg-${value.color} rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}
                >
                  <value.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <Services />

      {/* Team Section */}
      <Team />

      {/* Subscription */}
      <Subscription />

      {/* Footer */}
      <Footer />
    </section>
  );
};
