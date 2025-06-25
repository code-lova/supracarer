"use client";
import React, { useState } from "react";
import FeatureBg from "../FeatureBg";
import Subscription from "@components/landing/Subscription";
import Footer from "@components/landing/Footer";
import { faqs } from "@constants";
import { FaqItem } from "@components/core/FaqItem";


const categories = ["All", "Client", "Caregiver", "General"];

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
    <section>
      <FeatureBg
        heading="FAQs"
        subheading="Frequently Ask Question from our clients"
      />

      <div className="pageSection mb-10">
        <div className="text-center text-carer-blue px-4 leading-6 lg:px-40">
          <h2 className="text-3xl lg:text-4xl font-bold uppercase mb-6">
            Frequently Asked Questions
          </h2>
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-1/2 p-3 border border-gray-300 rounded-md mb-6 text-haven-blue"
          />

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-carer-blue text-white"
                    : "bg-gray-200 text-carer-blue hover:bg-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-4 overflow-y-auto max-h-[500px] px-2">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => <FaqItem key={index} {...faq} />)
          ) : (
            <p className="text-center text-gray-500">No matching FAQs found.</p>
          )}
        </div>
      </div>

      <Subscription />

      <Footer />
    </section>
  );
};

export default Faq;
