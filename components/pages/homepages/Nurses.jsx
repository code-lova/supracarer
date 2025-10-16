import React from "react";
import Link from "next/link";
import {
  FaDollarSign,
  FaStar,
  FaArrowRight,
  FaHandHoldingHeart,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import Subscription from "@components/landing/Subscription";
import Footer from "@components/landing/Footer";
import { NormalBtn } from "@components/core/button";
import Image from "next/image";
import {
  benefits,
  requirements,
  applicationSteps,
  dayInLife,
} from "@constants";

const Nurses = () => {
  return (
    <section>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-tranquil-teal/10 via-white to-custom-green/10 py-36 md:py-48 overflow-hidden">
        <div className="pageSection">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <div className="w-12 h-12 bg-gradient-to-br from-tranquil-teal to-custom-green rounded-xl flex items-center justify-center shadow-lg">
                  <FaHandHoldingHeart className="text-white text-xl" />
                </div>
                <span className="bg-tranquil-teal/10 text-tranquil-teal px-4 py-2 rounded-full text-sm font-medium border border-tranquil-teal/20">
                  🚀 Now Hiring Nurses
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                Your Nursing Career,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-tranquil-teal to-custom-green">
                  {" "}
                  Reimagined
                </span>
              </h1>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Join Ghana's innovative home healthcare platform where nurses
                will thrive. Be among the first to enjoy flexible schedules,
                competitive pay, and the satisfaction of providing personalized
                care in patients' homes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-tranquil-teal to-custom-green text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Join Our Founding Team
                  <FaArrowRight className="ml-2" />
                </Link>

                <a
                  href="#requirements"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-tranquil-teal text-tranquil-teal font-semibold rounded-xl hover:bg-tranquil-teal hover:text-white transition-all duration-200"
                >
                  View Requirements
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <MdVerified className="text-custom-green text-xl" />
                  <span className="text-sm text-gray-600">
                    Professional Platform
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-500" />
                  <span className="text-sm text-gray-600">
                    Built for Nurses, by Healthcare Experts
                  </span>
                </div>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="bg-transparent rounded-3xl p-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-tranquil-teal/30 to-transparent rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-custom-green/40 to-transparent rounded-full -ml-12 -mb-12"></div>

                <div className="relative text-center">
                  {/* Hero Image */}
                  <div className="relative w-full h-80 md:h-96 mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-tranquil-teal/10 to-custom-green/10">
                    <Image
                      src="/assets/images/supracarer_nurse.webp"
                      alt="Supracarer founding nurse team member"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Be Among Our Founding Nurses
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Join us at the beginning and help shape the future of home
                    healthcare in Ghana
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="pageSection py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Why Nurses Will Love{" "}
            <span className="text-tranquil-teal">Supracarer</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're building everything you need to thrive in your nursing career
            while maintaining work-life balance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border ${
                benefit.available
                  ? "border-gray-100"
                  : "border-dashed border-gray-300"
              } ${!benefit.available ? "opacity-75" : ""} relative`}
            >
              {!benefit.available && (
                <div className="absolute top-3 right-3">
                  <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full font-medium border border-yellow-200">
                    Coming Soon
                  </span>
                </div>
              )}
              <div
                className={`w-14 h-14 bg-${benefit.color} rounded-xl flex items-center justify-center mb-4 shadow-md`}
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

        <div className="text-center mt-12">
          <p className="text-sm text-gray-500 italic">
            * Core features are available at launch. Additional features will be
            rolled out based on founding member feedback.
          </p>
        </div>
      </div>

      {/* Application Requirements Section */}
      <div
        id="requirements"
        className="bg-gradient-to-br from-gray-50 to-tranquil-teal/5 py-20"
      >
        <div className="pageSection">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Application{" "}
              <span className="text-custom-green">Requirements</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Here's what you need to join our team of healthcare professionals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {requirements.map((req, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-tranquil-teal to-custom-green rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <req.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {req.title}
                </h3>
                <p className="text-sm text-gray-600">{req.description}</p>
              </div>
            ))}
          </div>

          {/* Application Process */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-4">
              Simple{" "}
              <span className="text-haven-blue">Application Process</span>
            </h3>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Get started today with our streamlined process. Additional
              verification steps will be added as we scale.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {applicationSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div
                    className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full ${
                      !step.available
                        ? "border-dashed border-2 border-gray-300 opacity-75"
                        : ""
                    } relative`}
                  >
                    {!step.available && (
                      <div className="absolute top-3 right-3 z-10">
                        <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-medium border border-yellow-200">
                          Coming Soon
                        </span>
                      </div>
                    )}
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={`text-5xl font-bold ${
                          step.available
                            ? "text-tranquil-teal/20"
                            : "text-gray-300"
                        }`}
                      >
                        {step.step}
                      </div>
                      <div
                        className={`w-12 h-12 ${
                          step.available
                            ? "bg-gradient-to-br from-tranquil-teal to-custom-green"
                            : "bg-gray-300"
                        } rounded-lg flex items-center justify-center shadow-md flex-shrink-0`}
                      >
                        <step.icon className="text-white text-xl" />
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 mb-3">
                      {step.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  {index < applicationSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <FaArrowRight
                        className={`text-2xl ${
                          step.available &&
                          applicationSteps[index + 1].available
                            ? "text-tranquil-teal"
                            : "text-gray-300"
                        }`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-gray-500 italic">
                * Currently, founding nurses can create profiles and start
                browsing opportunities. Full verification and orientation
                processes will be implemented before platform launch.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Day in the Life Section */}
      <div className="relative bg-gradient-to-br from-carer-blue/5 via-white to-haven-blue/10 py-20 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-tranquil-teal/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-custom-green/10 rounded-full blur-3xl"></div>

        <div className="pageSection relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              A Day in the <span className="text-carer-blue">Life</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how our seamless appointment system works from notification to
              completion
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 items-center max-w-7xl mx-auto">
            {/* Image Section - Takes up 3 columns */}
            <div className="order-2 lg:order-1 lg:col-span-3 relative">
              <div className="relative bg-white rounded-2xl shadow-xl">
                <div className="aspect-[2/2] md:aspect-[4/3] relative bg-gradient-to-br from-tranquil-teal/10 to-custom-green/10 rounded-xl overflow-hidden">
                  <Image
                    src="/assets/images/nurse-working.webp"
                    alt="Professional nurse showing steps in a day"
                    fill
                    className="object-contain w-96 h-96"
                  />
                </div>
              </div>
            </div>

            {/* Steps Section - Takes up 2 columns */}
            <div className="order-1 lg:order-2 lg:col-span-2 space-y-4">
              {dayInLife.map((item, index) => (
                <div key={index} className="group relative">
                  <div className="flex gap-4 items-start bg-white rounded-2xl p-2 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-tranquil-teal/30">
                    {/* Icon */}
                    <div
                      className={`w-10 h-10 flex-shrink-0 bg-${item.color} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}
                    >
                      <item.icon className="text-white text-lg" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div
                        className={`text-xs font-bold text-${item.color} uppercase tracking-wide mb-1`}
                      >
                        {item.time}
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {item.activity}
                      </p>
                    </div>
                  </div>

                  {/* Connecting Line */}
                  {index < dayInLife.length - 1 && (
                    <div className="ml-7 h-4 w-0.5 bg-gradient-to-b from-tranquil-teal/50 to-transparent"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Payment Info Card */}
          <div className="bg-gradient-to-br from-white via-tranquil-teal/5 to-custom-green/5 rounded-3xl p-8 mt-16 max-w-4xl mx-auto border border-tranquil-teal/20 shadow-xl">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-tranquil-teal to-custom-green rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <FaDollarSign className="text-white text-2xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  Get Paid Immediately
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  After completing an appointment and receiving patient
                  confirmation, you can request payment immediately. No waiting
                  for weekly payouts - get paid for each session as soon as it's
                  verified. Track all your earnings and payment requests in your
                  dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 mb-6">
              Ready to start your journey?
            </p>
            <NormalBtn href="/signup" children="Join Our Team Today" />
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="pageSection py-20">
        <div className="bg-gradient-to-r from-tranquil-teal to-custom-green rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>

          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Be among the founding nurses who will shape the future of home
              healthcare in Ghana. Start your application today and be part of
              building something special from day one.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-10 py-4 bg-white text-tranquil-teal font-bold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-lg"
              >
                Join Our Founding Team
                <FaArrowRight className="ml-3" />
              </Link>

              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center px-10 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-tranquil-teal transition-all duration-200 text-lg"
              >
                Contact Us
              </Link>
            </div>

            <p className="mt-8 text-sm opacity-75">
              Questions? Email us at{" "}
              <a
                href="mailto:careers@supracarer.com"
                className="underline font-semibold"
              >
                careers@supracarer.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <Subscription />

      <Footer />
    </section>
  );
};

export default Nurses;
