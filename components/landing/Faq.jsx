"use client";
import React, { useState } from "react";
import Image from "next/image";
import { faqs } from "@constants/index";
import { NormalBtn } from "@components/core/button";
import { FaChevronDown } from "react-icons/fa";

const Faq = () => {
  const [openFaq, setOpenFaq] = useState(faqs[10].id); // Set the first accordion item open in general

  const toggleAccodion = (id) => {
    setOpenFaq(id === openFaq ? null : id); // Close the item if it's already open, else open it
  };

  const generalFaqs = faqs.filter((faq) => faq.role === "general").slice(0, 3);

  return (
    <div className="ml-4 mb-12 bg-white">
      <h1 className="capitalize text-tranquil-teal text-base font-bold text-center">
        Frequently Asked Questions
      </h1>
      <div className="text-center text-carer-blue my-4 px-4 leading-6 lg:px-40">
        <h2 className="text-3xl lg:text-4xl font-bold">Get Answers to Your</h2>
        <h2 className="text-3xl lg:text-4xl font-bold">
          {" "}
          Questions About Supracarer
        </h2>
      </div>

      <div className="pageSection">
        <div className="grid grid-cols-1 gap-10 sm:mx-auto lg:gap-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 p-2 mt-10">
          <div>
            <Image
              src="/assets/images/faq-img.webp"
              width={450}
              height={310}
              className=" object-contain "
              loading="lazy"
            />
          </div>

          <div className="mr-4">
            {generalFaqs.map((faq) => (
              <div key={faq.id} className="mb-4">
                <div
                  className={`faq-heading-bg ${
                    openFaq === faq.id
                      ? "bg-ever-green text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => toggleAccodion(faq.id)}
                >
                  <h1 className="text-[16px]">{faq.question}</h1>
                  <FaChevronDown
                     className={`transition-transform ${
                      openFaq === faq.id ? "transform rotate-180" : ""
                    }`}
                  />
                </div>

                <div
                  className={`bg-white p-4 transition-max-height duration-500 ease-in-out overflow-hidden ${
                    openFaq === faq.id ? "max-h-96" : "hidden"
                  }`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
            <div className="mt-8">
              <NormalBtn href="/faq" children="Learn More" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
