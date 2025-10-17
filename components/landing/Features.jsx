import React from "react";
import Image from "next/image";
import { keyBenefits } from "@constants";
import {
  FaArrowRight,
  FaCheckCircle,
  FaUserFriends,
  FaHeartbeat,
  FaClock,
} from "react-icons/fa";
import { NormalBtn } from "@components/core/button";

const Features = () => {
  return (
    <div className="bg-gradient-to-r from-transparent to-gray-50 py-20 relative">
      {/* Key Benefits Section */}
      <div className="relative bg-gradient-to-br from-gray-50 via-white to-tranquil-teal/5 py-20 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-custom-green/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-haven-blue/10 rounded-full blur-3xl"></div>

        <div className="pageSection relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-tranquil-teal/10 text-tranquil-teal px-4 py-2 rounded-full text-sm font-medium border border-tranquil-teal/20 mb-6">
              <FaCheckCircle className="text-lg" />
              <span>Why Choose Supracarer</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Built for <span className="text-tranquil-teal">Families</span> &{" "}
              <span className="text-custom-green">Professionals</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Experience a platform designed to connect families seeking quality
              care with dedicated healthcare professionals. Discover the
              benefits that make Supracarer the trusted choice.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {keyBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={benefit.id}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent hover:-translate-y-2"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Gradient Overlay on Hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-${benefit.color}/5 to-${benefit.color}/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  ></div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 bg-${benefit.color} rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="text-white text-2xl" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-tranquil-teal transition-colors duration-300">
                      {benefit.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed text-base">
                      {benefit.description}
                    </p>

                    {/* Arrow Icon */}
                    <div className="mt-4 flex items-center text-tranquil-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm font-medium mr-2">
                        Learn more
                      </span>
                      <FaArrowRight className="text-sm" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Platform Overview Section with Image */}
      <div className="pageSection py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/images/supracarer_features_platform.webp"
                alt="Supracarer Platform Interface"
                width={600}
                height={500}
                className="w-full h-auto object-cover"
                priority
              />
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-tranquil-teal rounded-lg flex items-center justify-center">
                    <FaUserFriends className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Built by</p>
                    <p className="text-xl font-bold text-gray-800">
                      Founding Team
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-custom-green/20 rounded-full blur-2xl -z-10"></div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 bg-custom-green/10 text-custom-green px-4 py-2 rounded-full text-sm font-medium border border-custom-green/20 mb-6">
              <FaHeartbeat className="text-lg" />
              <span>Comprehensive Platform</span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
              A Complete Homecare Ecosystem
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Supracarer empowers your wellness journey by offering tailored
              health plans, convenient appointment scheduling, and comprehensive
              care support. The platform creates personalized strategies to meet
              unique health goals while providing continuous assistance for
              building healthier habits.
            </p>

            {/* Feature Points */}
            <div className="space-y-4 mb-8">
              {[
                "Easy booking with certified healthcare practitioners",
                "Real-time notifications and communication",
                "Secure payment processing",
                "24/7 customer support for peace of mind",
              ].map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-tranquil-teal/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <FaCheckCircle className="text-tranquil-teal text-sm" />
                  </div>
                  <p className="text-gray-700">{point}</p>
                </div>
              ))}
            </div>

            {/* CTA Button */}

            <NormalBtn href="/signup">Get Started Today</NormalBtn>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-tranquil-teal to-custom-green py-16">
        <div className="pageSection">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Building the Future of Homecare
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              We're a passionate and committed to revolutionizing how families
              connect with healthcare professionals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FaUserFriends className="text-3xl" />
              </div>
              <h3 className="text-4xl lg:text-5xl font-bold">Early Access</h3>
              <p className="text-lg opacity-90">Join Our Launch Community</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FaHeartbeat className="text-3xl" />
              </div>
              <h3 className="text-4xl lg:text-5xl font-bold">MVP Ready</h3>
              <p className="text-lg opacity-90">Beta Testing Phase</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FaClock className="text-3xl" />
              </div>
              <h3 className="text-4xl lg:text-5xl font-bold">24/7</h3>
              <p className="text-lg opacity-90">Support Available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="pageSection py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
            Ready to Experience Quality Care?
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Join families and healthcare professionals who trust Supracarer for
            seamless, quality homecare services. Get started today and
            experience the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NormalBtn href="/signup">Sign Up Now</NormalBtn>
            <NormalBtn href="/about">Learn More</NormalBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
