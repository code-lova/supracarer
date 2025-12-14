"use client";
import Image from "next/image";
import { FaRobot, FaComments, FaHeartbeat, FaClock } from "react-icons/fa";

const Suprabot = () => {
  const features = [
    {
      icon: FaComments,
      title: "24/7 Health Support",
      description: "Get instant answers to your health questions anytime",
    },
    {
      icon: FaHeartbeat,
      title: "Symptom Checker",
      description: "Understand your symptoms with AI-powered guidance",
    },
    {
      icon: FaClock,
      title: "Care Scheduling",
      description: "Book appointments and manage care seamlessly",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-tranquil-teal/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-tranquil-teal/10 px-4 py-2 rounded-full mb-6">
              <FaRobot className="text-tranquil-teal w-4 h-4" />
              <span className="text-tranquil-teal font-semibold text-sm">
                Coming Soon
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Meet{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tranquil-teal to-custom-green">
                Suprabot
              </span>
            </h2>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Your intelligent health companion powered by AI. Suprabot is
              designed to provide instant support, answer health-related
              questions, and help you navigate your care journey with ease.
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-tranquil-teal/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-tranquil-teal" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Coming Soon Button */}
            <button
              disabled
              className="inline-flex items-center gap-2 bg-gray-200 text-gray-500 px-6 py-3 rounded-full font-semibold cursor-not-allowed"
            >
              <FaRobot className="w-5 h-5" />
              <span>Coming Soon</span>
            </button>
          </div>

          {/* Right Side - Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              {/* Background Decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-tranquil-teal/20 to-custom-green/20 rounded-3xl transform rotate-3 scale-105"></div>

              {/* Image Container */}
              <div className="relative bg-white rounded-3xl shadow-xl p-6 sm:p-8">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto">
                  <Image
                    src="/assets/images/bot.webp"
                    alt="Suprabot - AI Health Assistant"
                    fill
                    style={{ objectFit: "contain" }}
                    className="drop-shadow-lg"
                    priority
                  />
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg animate-bounce">
                  <FaRobot className="w-6 h-6 text-tranquil-teal" />
                </div>

                <div className="absolute -bottom-2 -left-2 bg-gradient-to-r from-tranquil-teal to-custom-green text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  AI Powered
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Suprabot;
