"use client";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-base text-carer-blue">
          {question}
        </span>
        <FaChevronDown
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180 text-custom-green" : ""
          }`}
        />
      </button>

      <div
        className={`px-4 pt-0 pb-4 text-gray-700 text-sm transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {answer}
      </div>
    </div>
  );
};
