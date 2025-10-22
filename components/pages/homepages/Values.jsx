import React from "react";
import FeatureBg from "../FeatureBg";
import Subscription from "@components/landing/Subscription";
import Footer from "@components/landing/Footer";
import { coreValues } from "@constants";

const Values = () => {
  return (
    <section>
      <FeatureBg heading="Our Values" subheading="Life at Supracarer" />

      {/* Main Content Section */}
      <div className="py-6 lg:py-2 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-tranquil-teal/10 px-4 py-2 rounded-full text-sm font-semibold text-tranquil-teal mb-4">
              <span className="w-2 h-2 bg-tranquil-teal rounded-full"></span>
              <span>What Drives Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              At Supracarer, our values guide every decision we make and shape
              the care we provide. These principles define who we are and how we
              serve our community.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div
                key={value.id}
                className="group relative bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-tranquil-teal/30 hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Decorative Corner Element */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-tranquil-teal/10 to-transparent rounded-bl-[100px] rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Icon Container */}
                <div className="relative z-10 flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-tranquil-teal/10 to-custom-green/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <div className="transform group-hover:scale-110 transition-transform duration-300">
                      {value.icon}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-tranquil-teal transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {value.description}
                  </p>
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-tranquil-teal to-custom-green rounded-full group-hover:w-3/4 transition-all duration-300"></div>
              </div>
            ))}
          </div>

          {/* Bottom CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-br from-tranquil-teal via-custom-green to-haven-blue rounded-3xl p-12 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                  Join Our Mission
                </h3>
                <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                  Be part of a team that's transforming home care with compassion,
                  compassion, integrity, and excellence at every step.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/signup"
                    className="inline-block px-8 py-4 bg-white text-tranquil-teal font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    Get Started Today
                  </a>
                  <a
                    href="/contact-us"
                    className="inline-block px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full border-2 border-white/50 hover:bg-white/20 transition-all duration-300"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Subscription />

      <Footer />
    </section>
  );
};

export default Values;
