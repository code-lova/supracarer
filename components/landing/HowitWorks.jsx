import React from "react";
import { FaArrowRight, FaCheckCircle, FaMobileAlt } from "react-icons/fa";
import { howItWorkSteps } from "@constants";

const HowitWorks = () => {
  return (
    <div className="relative bg-gradient-to-br from-gray-50 via-white to-haven-blue/2 py-20 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-tranquil-teal/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-custom-green/10 rounded-full blur-3xl"></div>

      <div className="pageSection relative z-10 py-20">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-tranquil-teal/10 text-tranquil-teal px-4 py-2 rounded-full text-sm font-medium border border-tranquil-teal/20 mb-6">
            <FaMobileAlt className="text-lg" />
            <span>Simple & Seamless Process</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            How <span className="text-tranquil-teal">Supracarer</span> Works
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Get started with our easy 5-step process. From registration to care
            delivery, we make healthcare accessible and efficient.
          </p>
        </div>

        {/* Desktop View - Timeline Style */}
        <div className="hidden lg:block mb-16">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-tranquil-teal via-custom-green to-haven-blue opacity-20"></div>

            <div className="grid grid-cols-5 gap-8">
              {howItWorkSteps.map((step, index) => (
                <div key={step.id} className="relative">
                  {/* Step Number Badge */}
                  <div className="flex justify-center mb-6">
                    <div
                      className={`w-20 h-20 bg-${step.color}  rounded-full flex items-center justify-center shadow-lg z-10 relative group hover:scale-110 transition-transform duration-300`}
                    >
                      <step.icon className="text-white text-2xl" />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-gray-100">
                        <span
                          className={`text-sm font-bold text-${step.color}`}
                        >
                          {step.id}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Step Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-64 flex flex-col">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed flex-1">
                      {step.description}
                    </p>
                    <div className="pt-4 border-t border-gray-100 mt-auto">
                      <span
                        className={`text-xs font-semibold text-${step.color} uppercase tracking-wide`}
                      >
                        Step {step.id} of 5
                      </span>
                    </div>
                  </div>

                  {/* Arrow Between Steps */}
                  {index < howItWorkSteps.length - 1 && (
                    <div className="absolute top-10 -right-4 z-0">
                      <FaArrowRight className="text-2xl text-gray-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tablet View - Two Column Grid */}
        <div className="hidden md:block lg:hidden mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {howItWorkSteps.map((step) => (
              <div
                key={step.id}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="flex items-start gap-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br from-${step.color} to-${step.color}/70 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300 relative`}
                  >
                    <step.icon className="text-white text-2xl" />
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-gray-100">
                      <span className={`text-xs font-bold text-${step.color}`}>
                        {step.id}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {step.description}
                    </p>
                    <span
                      className={`text-sm font-semibold text-${step.color} uppercase tracking-wide`}
                    >
                      Step {step.id} of 5
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View - Vertical Timeline */}
        <div className="block md:hidden">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-tranquil-teal via-custom-green to-haven-blue opacity-20"></div>

            <div className="space-y-8">
              {howItWorkSteps.map((step) => (
                <div key={step.id} className="relative pl-20">
                  {/* Step Icon */}
                  <div className="absolute left-0 top-0">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br from-${step.color} to-${step.color}/70 rounded-full flex items-center justify-center shadow-lg z-10 relative`}
                    >
                      <step.icon className="text-white text-xl" />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-gray-100">
                        <span
                          className={`text-xs font-bold text-${step.color}`}
                        >
                          {step.id}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                      {step.description}
                    </p>
                    <span
                      className={`text-xs font-semibold text-${step.color} uppercase tracking-wide`}
                    >
                      Step {step.id} of 5
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Benefits Section */}
        <div className="mt-20 bg-gradient-to-br from-tranquil-teal/10 to-custom-green/10 rounded-3xl p-8 md:p-12 border border-tranquil-teal/20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose Supracarer?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our comprehensive healthcare
              platform designed for your convenience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: FaCheckCircle,
                title: "Quick Matching",
                description:
                  "Get matched with healthcare professionals in minutes",
                color: "tranquil-teal",
              },
              {
                icon: FaCheckCircle,
                title: "Verified Professionals",
                description:
                  "All healthcare workers are certified and verified",
                color: "custom-green",
              },
              {
                icon: FaCheckCircle,
                title: "24/7 Support",
                description:
                  "Round-the-clock customer support for your peace of mind",
                color: "haven-blue",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div
                    className={`w-14 h-14 bg-${benefit.color} rounded-xl flex items-center justify-center shadow-md`}
                  >
                    <benefit.icon className="text-white text-2xl" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Ready to Get Started?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-tranquil-teal to-custom-green text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Register Now
              <FaArrowRight className="ml-2" />
            </a>
            <a
              href="/contact-us"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-tranquil-teal text-tranquil-teal font-semibold rounded-xl hover:bg-tranquil-teal hover:text-white transition-all duration-200"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowitWorks;
