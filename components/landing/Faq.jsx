"use client";
import React, { useState } from "react";
import Image from "next/image";
import { faqs } from "@constants/index";
import { NormalBtn } from "@components/core/button";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";

const Faq = () => {
  const [openFaq, setOpenFaq] = useState(faqs[10].id); // Set the first accordion item open in general

  const toggleAccodion = (id) => {
    setOpenFaq(id === openFaq ? null : id); // Close the item if it's already open, else open it
  };

  const generalFaqs = faqs.filter((faq) => faq.role === "general").slice(0, 3);

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-2 md:py-24 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-tranquil-teal/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-custom-green/5 rounded-full blur-3xl"></div>

      <div className="pageSection relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-tranquil-teal/10 text-tranquil-teal px-4 py-2 rounded-full text-sm font-medium border border-tranquil-teal/20 mb-6">
            <FaQuestionCircle className="text-lg" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Get Answers to Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tranquil-teal to-custom-green">
              Questions
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            Everything you need to know about Supracarer and how we can help you
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image Side */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src="/assets/images/faq-img.webp"
                width={600}
                height={500}
                className="object-cover w-full group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                alt="FAQ illustration"
              />
              {/* Overlay with badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg">
                <p className="text-sm font-bold text-gray-800">
                  Still have questions?
                </p>
                <p className="text-xs text-gray-600">We're here to help 24/7</p>
              </div>
            </div>
          </div>

          {/* FAQs Side */}
          <div className="order-1 lg:order-2 space-y-4">
            {generalFaqs.map((faq, index) => (
              <div
                key={faq.id}
                className="group"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <button
                  className={`w-full text-left transition-all duration-300 rounded-xl border-2 ${
                    openFaq === faq.id
                      ? "bg-gradient-to-r from-tranquil-teal to-custom-green border-tranquil-teal shadow-lg"
                      : "bg-white border-gray-200 hover:border-tranquil-teal/50 hover:shadow-md"
                  }`}
                  onClick={() => toggleAccodion(faq.id)}
                >
                  <div className="flex items-center justify-between p-5 md:p-6">
                    <h3
                      className={`text-base md:text-lg font-semibold pr-4 ${
                        openFaq === faq.id ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {faq.question}
                    </h3>
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        openFaq === faq.id
                          ? "bg-white/20 text-white"
                          : "bg-tranquil-teal/10 text-tranquil-teal"
                      }`}
                    >
                      <FaChevronDown
                        className={`text-sm transition-transform duration-300 ${
                          openFaq === faq.id ? "transform rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openFaq === faq.id
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="bg-white border-2 border-t-0 border-gray-100 rounded-b-xl p-5 md:p-6 -mt-2">
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Help Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            Can't Find What You're Looking For?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our support team is ready to answer any questions you might have.
            Get in touch with us anytime.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/contact-us"
              className="px-8 py-4 bg-tranquil-teal text-white font-semibold rounded-full hover:bg-tranquil-teal/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Contact Support
            </a>
            <a
              href="/faq"
              className="px-8 py-4 bg-white text-tranquil-teal font-semibold rounded-full border-2 border-tranquil-teal hover:bg-tranquil-teal/5 transition-all duration-300"
            >
              Browse All FAQs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
