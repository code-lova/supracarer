"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaUsers,
  FaUserMd,
  FaCalendarAlt,
  FaShieldAlt,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import LoaderButton from "@components/core/LoaderButton";

const BetaLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-tranquil-teal/5">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-tranquil-teal via-custom-green to-haven-blue py-16 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium border border-white/30 mb-8">
            <FaShieldAlt className="text-lg" />
            <span>Beta Testing Program</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Join Supracarer
            <span className="block text-white/90">Beta Testing</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-4xl mx-auto mb-12">
            Be among the first to experience our innovative homecare platform
            connecting families with trusted healthcare professionals.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup">
              <LoaderButton
                text="Join Beta Testing"
                className="bg-white text-tranquil-teal hover:bg-gray-50 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
              />
            </Link>
            <Link
              href="/signin"
              className="text-white hover:text-white/80 font-medium text-lg flex items-center gap-2 transition-colors duration-300"
            >
              Already have an account? Sign In
              <FaArrowRight className="text-sm" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* What Supracarer Does */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            What is <span className="text-tranquil-teal">Supracarer</span>?
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            <p className="text-lg text-gray-600 leading-relaxed">
              Supracarer is a comprehensive homecare platform that seamlessly
              connects families seeking quality care with qualified healthcare
              professionals, ensuring a simple and efficient process for
              everyone.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our mission is to provide compassionate, high-quality, and
              comprehensive home care services that empower individuals and
              families with trusted, compassionate Healthcare professionals.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We recognize the critical need for personalized healthcare in the
              home environment, building a community where care meets
              convenience and innovation.
            </p>
          </div>
        </div>

        {/* Who It's For */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-tranquil-teal/10 rounded-xl flex items-center justify-center">
                <FaUsers className="text-tranquil-teal text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                For Individuals & Families
              </h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-custom-green mt-1 flex-shrink-0" />
                <span className="text-gray-600">
                  Access to verified healthcare professionals
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-custom-green mt-1 flex-shrink-0" />
                <span className="text-gray-600">
                  Personalized care tailored to your needs
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-custom-green mt-1 flex-shrink-0" />
                <span className="text-gray-600">
                  24/7 support and flexible scheduling
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-custom-green mt-1 flex-shrink-0" />
                <span className="text-gray-600">
                  Safe and secure platform for peace of mind
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-custom-green/10 rounded-xl flex items-center justify-center">
                <FaUserMd className="text-custom-green text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                For Healthcare Professionals
              </h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-tranquil-teal mt-1 flex-shrink-0" />
                <span className="text-gray-600">
                  Flexible work opportunities
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-tranquil-teal mt-1 flex-shrink-0" />
                <span className="text-gray-600">Competitive compensation</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-tranquil-teal mt-1 flex-shrink-0" />
                <span className="text-gray-600">
                  Professional development support
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-tranquil-teal mt-1 flex-shrink-0" />
                <span className="text-gray-600">Streamlined job matching</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Beta Details */}
        <div className="bg-gradient-to-r from-tranquil-teal/5 to-custom-green/5 rounded-2xl p-8 mb-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-tranquil-teal/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FaCalendarAlt className="text-tranquil-teal text-2xl" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Beta End Date
              </h4>
              <p className="text-gray-600">February 6th, 2026</p>
              <p className="text-sm text-gray-500 mt-1">Limited time access</p>
            </div>

            <div>
              <div className="w-16 h-16 bg-custom-green/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-custom-green text-2xl" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Exclusive Access
              </h4>
              <p className="text-gray-600">Limited beta testers</p>
              <p className="text-sm text-gray-500 mt-1">
                First come, first served
              </p>
            </div>

            <div>
              <div className="w-16 h-16 bg-haven-blue/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-haven-blue text-2xl" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Feedback Matters
              </h4>
              <p className="text-gray-600">Shape the future</p>
              <p className="text-sm text-gray-500 mt-1">
                Your input drives improvements
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 mb-16">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <FaShieldAlt className="text-amber-600 text-xl" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-amber-800 mb-3">
                Important Disclaimer
              </h4>
              <p className="text-amber-700 leading-relaxed">
                <strong>
                  This platform is in beta and not for medical emergencies.
                </strong>{" "}
                Supracarer is currently in testing phase. While we strive to
                provide high-quality services, beta features may have
                limitations. For medical emergencies, please contact emergency
                services immediately (911 or local emergency number).
              </p>
              <p className="text-amber-700 leading-relaxed mt-3">
                By joining the beta program, you acknowledge that this is a
                testing environment and services may be subject to change.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Ready to Join the Beta?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Be part of shaping the future of homecare. Join our exclusive beta
            testing program and help us build a platform that truly serves
            healthcare needs.
          </p>
          <Link href="/signup">
            <LoaderButton
              text="Get Started Today"
              className="bg-gradient-to-r from-tranquil-teal to-custom-green text-white hover:from-tranquil-teal/90 hover:to-custom-green/90 px-10 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 mx-auto"
            />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">
            © 2026 Supracarer. All rights reserved. |{" "}
            <Link
              href="/privacy-policy"
              className="text-tranquil-teal hover:text-custom-green font-medium"
            >
              Privacy Policy
            </Link>{" "}
            |{" "}
            <Link
              href="/terms"
              className="text-tranquil-teal hover:text-custom-green font-medium"
            >
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BetaLanding;
