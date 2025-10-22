import Image from "next/image";
import React from "react";
import { FaHandshake } from "react-icons/fa";

const Partners = () => {
  const partners = [
    {
      id: 1,
      name: "ALX Ventures",
      image: "/assets/images/alx-ventures.webp",
      description: "Tech Innovation Partner",
    },
    {
      id: 2,
      name: "DataMelon",
      image: "/assets/images/datamelon.webp",
      description: "Data Solutions Partner",
    },
  ];

  return (
    <div className="bg-white py-16 md:py-24 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-tranquil-teal/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-custom-green/5 rounded-full blur-3xl"></div>

      <div className="pageSection relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-tranquil-teal/10 text-tranquil-teal px-4 py-2 rounded-full text-sm font-medium border border-tranquil-teal/20 mb-6">
            <FaHandshake className="text-lg" />
            <span>Our Partners</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            We Believe in Driving Impact Through{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tranquil-teal to-custom-green">
              Collaboration
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            Partnering with industry leaders to deliver exceptional healthcare
            solutions
          </p>
        </div>

        {/* Partners Grid */}
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              className="group relative bg-white rounded-2xl p-8 md:p-10 w-full sm:w-[280px] lg:w-[320px] shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              {/* Logo Container */}
              <div className="relative h-32 mb-6 flex items-center justify-center">
                <Image
                  src={partner.image}
                  alt={partner.name}
                  width={200}
                  height={120}
                  className="object-contain max-h-full group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Partner Info */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-tranquil-teal transition-colors duration-300">
                  {partner.name}
                </h3>
                <p className="text-sm text-gray-600">{partner.description}</p>
              </div>

              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-tranquil-teal to-custom-green rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Corner Decoration */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-tranquil-teal/10 to-transparent rounded-tr-2xl rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Partnership CTA */}
        <div className="mt-16 bg-gradient-to-r from-tranquil-teal/5 via-custom-green/5 to-haven-blue/5 rounded-2xl p-8 md:p-12 border border-gray-100 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FaHandshake className="text-tranquil-teal text-3xl" />
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
              Interested in Partnering?
            </h3>
          </div>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join us in transforming home healthcare. Let's collaborate to make a
            difference together.
          </p>
          <a
            href="/contact-us"
            className="inline-block px-8 py-4 bg-tranquil-teal text-white font-semibold rounded-full hover:bg-tranquil-teal/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Become a Partner
          </a>
        </div>
      </div>
    </div>
  );
};

export default Partners;
