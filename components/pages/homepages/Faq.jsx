"use client";
import React, { useState } from "react";
import Subscription from "@components/landing/Subscription";
import Footer from "@components/landing/Footer";
import { faqs } from "@constants";
import { FaqPageItem } from "@components/core/FaqPageItem";
import { FaSearch, FaQuestionCircle } from "react-icons/fa";

const categories = ["All", "Families and Individuals", "Healthcare Professionals", "General"];

const Faq = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === "All" || faq.role === selectedCategory.toLowerCase();
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="min-h-screen">
      {/* Hero Header */}
      <div className="relative pt-32 md:pt-36 pb-16 md:pb-24 bg-gradient-to-br from-tranquil-teal via-custom-green to-haven-blue overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

        <div className="pageSection relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30 mb-6">
            <FaQuestionCircle className="text-lg" />
            <span>Help Center</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
            Find answers to common questions about Supracarer
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white py-12 md:py-16 relative">
        <div className="pageSection">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-full text-gray-700 placeholder-gray-400 focus:border-tranquil-teal focus:outline-none transition-colors duration-300 shadow-md"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-tranquil-teal to-custom-green text-white scale-105 shadow-lg"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-tranquil-teal hover:scale-105"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-center mb-6">
            <p className="text-gray-600">
              Showing{" "}
              <span className="font-bold text-tranquil-teal">
                {filteredFaqs.length}
              </span>{" "}
              {filteredFaqs.length === 1 ? "result" : "results"}
            </p>
          </div>
        </div>
      </div>

      {/* FAQ List Section */}
      <div className="bg-white py-8 md:py-2">
        <div className="pageSection">
          <div className="max-w-4xl mx-auto">
            {filteredFaqs.length > 0 ? (
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <div
                    key={index}
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    <FaqPageItem {...faq} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                  <FaQuestionCircle className="text-gray-400 text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  No Results Found
                </h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any FAQs matching your search. Try different
                  keywords or browse by category.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="px-6 py-3 bg-tranquil-teal text-white font-semibold rounded-full hover:bg-tranquil-teal/90 transition-all duration-300 shadow-lg"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Still Need Help Section */}
      <div className="bg-white py-12 md:py-16">
        <div className="pageSection">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-tranquil-teal/5 via-custom-green/5 to-haven-blue/5 rounded-2xl p-8 md:p-12 border border-gray-100 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              Still Need Help?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our support team is here
              to help you anytime.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/contact-us"
                className="px-8 py-4 bg-tranquil-teal text-white font-semibold rounded-full hover:bg-tranquil-teal/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Contact Support
              </a>
              <a
                href="mailto:support@supracarer.com"
                className="px-8 py-4 bg-white text-tranquil-teal font-semibold rounded-full border-2 border-tranquil-teal hover:bg-tranquil-teal/5 transition-all duration-300"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>

      <Subscription />

      <Footer />
    </section>
  );
};

export default Faq;
