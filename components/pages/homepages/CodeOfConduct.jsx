import React from "react";
import { codeOfConductData } from "@constants";
import { FaUserShield, FaEnvelope } from "react-icons/fa";
import Footer from "@components/landing/Footer";
import Subscription from "@components/landing/Subscription";
import Link from "next/link";

const CodeOfConduct = () => {
  const { lastUpdated, intro, sections, footer } = codeOfConductData;

  return (
    <section className="bg-white">
      {/* Header Section */}
      <div className="relative bg-gradient-to-br from-gray-50 via-white to-tranquil-teal/5 py-20 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-custom-green/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-haven-blue/10 rounded-full blur-3xl"></div>

        <div className="pageSection relative z-10 mt-16">
          {/* Section Header */}
          <div className="text-center mb-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-tranquil-teal/10 text-tranquil-teal px-4 py-2 rounded-full text-sm font-medium border border-tranquil-teal/20 mb-6">
              <FaUserShield className="text-lg" />
              <span>Code of Conduct</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Healthcare Professional{" "}
              <span className="text-tranquil-teal">Code of Conduct</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">{intro}</p>
            <p className="text-sm text-gray-500 mt-4">
              Last Updated: {lastUpdated}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="pageSection py-16">
        <div className="max-w-4xl mx-auto">
          {sections.map((section) => (
            <div
              key={section.id}
              className="mb-12 pb-8 border-b border-gray-100 last:border-b-0"
            >
              {/* Section Title */}
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-tranquil-teal/10 text-tranquil-teal rounded-lg flex items-center justify-center text-sm font-bold">
                  {section.id}
                </span>
                {section.title}
              </h2>

              {/* Section Content */}
              {section.content && (
                <p className="text-gray-600 leading-relaxed mb-4 whitespace-pre-line">
                  {section.content}
                </p>
              )}

              {/* Items List */}
              {section.items && (
                <ul className="space-y-2 mb-4">
                  {section.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-tranquil-teal rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Note */}
              {section.note && (
                <p className="text-sm text-gray-500 italic mt-4 bg-gray-50 p-4 rounded-lg border-l-4 border-tranquil-teal">
                  {section.note}
                </p>
              )}
            </div>
          ))}

          {/* Footer Note */}
          {footer && (
            <div className="mt-8 p-6 bg-gradient-to-r from-tranquil-teal/5 to-custom-green/5 rounded-xl border border-tranquil-teal/20">
              <p className="text-gray-700 mb-3">{footer.text}</p>
              <p className="text-gray-700 flex items-center gap-3">
                <FaEnvelope className="text-tranquil-teal text-lg" />
                <span>Contact: </span>
                <Link
                  href="/contact-us"
                  className="text-tranquil-teal hover:underline font-medium"
                >
                  {footer.email}
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>

      <Subscription />
      <Footer />
    </section>
  );
};

export default CodeOfConduct;
