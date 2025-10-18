"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@components/landing/Footer";
import Subscription from "@components/landing/Subscription";
import {
  FaBriefcaseMedical,
  FaCheckCircle,
  FaArrowRight,
  FaMobileAlt,
  FaClock,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { benefits, requirements, nurseAppFeatures } from "@constants";

const ForHealthProfessionals = () => {
  return (
    <section className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-custom-green via-tranquil-teal to-haven-blue py-24 lg:py-32 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

        <div className="pageSection relative z-10 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-white space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/30">
                <FaBriefcaseMedical className="text-lg" />
                <span>Join Our Healthcare Network</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Flexible Work Opportunities for Healthcare Professionals
              </h1>

              <p className="text-xl text-white/90 leading-relaxed">
                Connect with families in need and get full paying job offers
                that meet your field of expertise. Work on your terms with
                competitive pay and flexible scheduling.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/signup"
                  className="px-8 py-4 bg-white text-custom-green rounded-lg font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  Join Now
                  <FaArrowRight />
                </Link>
                <Link
                  href="/contact-us"
                  className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-custom-green transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/images/group_nurse.webp"
                alt="Healthcare Professionals"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-custom-green rounded-lg flex items-center justify-center">
                    <FaCheckCircle className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Health Care</p>
                    <p className="text-lg font-bold text-gray-800">
                      Certified Professionals
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
        <div className="absolute top-0 right-0 w-96 h-96 bg-custom-green/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-tranquil-teal/5 rounded-full blur-3xl"></div>

        <div className="pageSection relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-custom-green/10 text-custom-green px-4 py-2 rounded-full text-sm font-medium border border-custom-green/20 mb-6">
              <FaCheckCircle className="text-lg" />
              <span>Why Join Supracarer</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Benefits for{" "}
              <span className="text-custom-green">
                Healthcare Professionals
              </span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Join a platform that values your expertise, respects your time,
              and rewards your dedication to quality care
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
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

      {/* Platform Features */}
      <div className="bg-gradient-to-br from-gray-50 via-white to-custom-green/5 py-20">
        <div className="pageSection">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-tranquil-teal/10 text-tranquil-teal px-4 py-2 rounded-full text-sm font-medium border border-tranquil-teal/20">
                <FaMobileAlt className="text-lg" />
                <span>Platform Features</span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800">
                Everything You Need to{" "}
                <span className="text-tranquil-teal">Succeed</span>
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                Our platform provides all the tools you need to manage your
                work, connect with clients, and grow your healthcare practice.
              </p>

              {/* Features List */}
              <div className="space-y-4">
                {nurseAppFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="w-12 h-12 bg-custom-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="text-custom-green text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/images/supracarer_nurse.webp"
                alt="Healthcare professional using platform"
                fill
                className="object-cover"
                style={{ objectPosition: "center 10%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Requirements Section */}
      <div className="py-20">
        <div className="pageSection">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-haven-blue/10 text-haven-blue px-4 py-2 rounded-full text-sm font-medium border border-haven-blue/20 mb-6">
              <MdVerified className="text-lg" />
              <span>Requirements</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Who Can Join?
            </h2>
            <p className="text-lg text-gray-600">
              We're looking for qualified healthcare professionals who are
              passionate about providing quality care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requirements.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center border border-gray-100 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-custom-green/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-custom-green text-2xl" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-br from-gray-50 via-white to-tranquil-teal/5 py-20">
        <div className="pageSection">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-custom-green/10 text-custom-green px-4 py-2 rounded-full text-sm font-medium border border-custom-green/20 mb-6">
              <FaClock className="text-lg" />
              <span>Simple Process</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              How to Get Started
            </h2>
            <p className="text-lg text-gray-600">
              Four simple steps to start earning with flexible healthcare work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Create Profile",
                description:
                  "Sign up and complete your professional profile with credentials",
              },
              {
                step: "02",
                title: "Get Verified",
                description:
                  "Submit licenses and complete background verification (Coming Soon)",
              },
              {
                step: "03",
                title: "Receive Requests",
                description:
                  "Get notified about appointment requests matching your expertise",
              },
              {
                step: "04",
                title: "Start Working",
                description:
                  "Accept appointments and provide quality care to earn immediately",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
              >
                <div className="text-5xl font-bold text-custom-green/10 mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-custom-green via-tranquil-teal to-haven-blue py-20">
        <div className="pageSection text-center text-white">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Your Flexible Career?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join healthcare professionals who trust Supracarer for flexible work
            opportunities, competitive pay, and meaningful connections
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-4 bg-white text-custom-green rounded-lg font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              Join as Professional
              <FaArrowRight />
            </Link>
            <Link
              href="/for-nurses"
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-custom-green transition-all duration-300 flex items-center justify-center"
            >
              View More Details
            </Link>
          </div>
        </div>
      </div>

      <Subscription />
      <Footer />
    </section>
  );
};

export default ForHealthProfessionals;
