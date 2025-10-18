"use client";
import React from "react";
import Image from "next/image";
import { team } from "@constants/index";
import { FaLinkedin } from "react-icons/fa";
import { NormalBtn } from "@components/core/button";
import Link from "next/link";

const Team = () => {
  return (
    <div className="bg-white py-20 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-tranquil-teal/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-custom-green/5 rounded-full blur-3xl"></div>

      <div className="pageSection relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-tranquil-teal/10 text-tranquil-teal px-4 py-2 rounded-full text-sm font-medium border border-tranquil-teal/20 mb-6">
            <span className="w-2 h-2 bg-tranquil-teal rounded-full animate-pulse"></span>
            <span>Meet the Team</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            The People Behind{" "}
            <span className="text-tranquil-teal">Supracarer</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            A passionate founding team committed to revolutionizing homecare
            through technology and compassion
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {team.map((member, index) => (
            <div
              key={member.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Image Container */}
              <div className="relative w-full h-72 overflow-hidden bg-gray-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ objectPosition: "center 20%" }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Social Icons - Always Visible */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <Link
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-tranquil-teal hover:text-white transition-colors duration-300 shadow-lg">
                      <FaLinkedin className="text-lg" />
                    </button>
                  </Link>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-tranquil-teal transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-custom-green mb-3">
                  {member.position}
                </p>

                {/* Decorative Line */}
                <div className="w-12 h-1 bg-gradient-to-r from-tranquil-teal to-custom-green rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-tranquil-teal/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Join Team CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-tranquil-teal/5 via-custom-green/5 to-haven-blue/5 rounded-2xl p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            Want to Join Our Mission?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We're always looking for passionate individuals who share our vision
            of transforming homecare
          </p>
          <NormalBtn href="/contact-us">Let Us Know</NormalBtn>
        </div>
      </div>
    </div>
  );
};

export default Team;
