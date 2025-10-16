import React from "react";
import { contactInfo, contactStats } from "@constants";
import { FaClock, FaPaperPlane, FaCheckCircle } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="relative bg-gradient-to-br from-gray-50 via-white to-tranquil-teal/3 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-tranquil-teal/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-custom-green/5 rounded-full blur-3xl"></div>

      <div className="pageSection relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-tranquil-teal/10 text-tranquil-teal px-4 py-2 rounded-full text-sm font-medium border border-tranquil-teal/20 mb-6">
            <FaPaperPlane className="text-lg" />
            <span>We're Here to Help</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Get in <span className="text-tranquil-teal">Touch</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Have questions about Supracarer? Our team is ready to assist you
            with personalized support and guidance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Information */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Contact Information
              </h2>
              <p className="text-gray-600 mb-8">
                Reach out to us through any of these channels. We're committed
                to providing you with the best support experience.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div
                    key={info.id}
                    className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:border-tranquil-teal/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-14 h-14 bg-${info.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300`}
                      >
                        <info.icon className="text-white text-xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-1">
                          {info.title}
                        </h3>
                        <p className="text-gray-900 font-semibold mb-1">
                          {info.detail}
                        </p>
                        <p className="text-sm text-gray-500">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="mt-8 bg-gradient-to-br from-tranquil-teal/10 to-custom-green/10 rounded-2xl p-6 border border-tranquil-teal/20">
                <div className="flex items-start gap-3">
                  <FaClock className="text-tranquil-teal text-2xl mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">
                      Business Hours
                    </h4>
                    <div className="text-sm text-gray-700 space-y-1">
                      <p>
                        <span className="font-semibold">Monday - Friday:</span>{" "}
                        8:00 AM - 5:00 PM
                      </p>
                      <p>
                        <span className="font-semibold">Saturday:</span> 9:00 AM
                        - 3:00 PM
                      </p>
                      <p>
                        <span className="font-semibold">Sunday:</span> Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Contact Us */}
            <div className="bg-gradient-to-br from-haven-blue/10 to-carer-blue/10 rounded-2xl p-6 border border-haven-blue/20">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                What We Can Help You With
              </h3>
              <ul className="space-y-3">
                {[
                  "General inquiries about our services",
                  "Partnership and collaboration opportunities",
                  "Technical support and assistance",
                  "Feedback and suggestions",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FaCheckCircle className="text-custom-green text-lg mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="full-name"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="full-name"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-tranquil-teal focus:ring-2 focus:ring-tranquil-teal/20 outline-none transition-all duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="johndoe@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-tranquil-teal focus:ring-2 focus:ring-tranquil-teal/20 outline-none transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="+233 54-914-8087"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-tranquil-teal focus:ring-2 focus:ring-tranquil-teal/20 outline-none transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-tranquil-teal focus:ring-2 focus:ring-tranquil-teal/20 outline-none transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows="6"
                    placeholder="Tell us more about your inquiry..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-tranquil-teal focus:ring-2 focus:ring-tranquil-teal/20 outline-none transition-all duration-200 resize-none"
                    required
                  ></textarea>
                </div>

                <div className="bg-tranquil-teal/5 rounded-xl p-4 border border-tranquil-teal/20">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">
                      Response Time:
                    </span>{" "}
                    We typically respond within 24 hours during business days.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-tranquil-teal to-custom-green text-white font-semibold py-4 px-8 rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <FaPaperPlane />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 mb-10 max-w-5xl mx-auto">
          {contactStats.map((stat, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-${stat.color}/10 to-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 border border-${stat.color}/20`}
            >
              <div className="flex justify-center mb-3">
                <div
                  className={`w-14 h-14 bg-${stat.color} rounded-xl flex items-center justify-center shadow-md`}
                >
                  <stat.icon className="text-white text-2xl" />
                </div>
              </div>
              <div className={`text-3xl font-bold text-${stat.color} mb-2`}>
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
