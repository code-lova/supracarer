"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { slides } from "@constants";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="mt-16 md:mt-24 relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <Image
            src={slide.image}
            fill
            style={{ objectFit: "cover" }}
            alt={slide.title}
            className="absolute inset-0"
            priority={index === 0}
          />

          {/* Dark Overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Darker gradient overlay on text side */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center z-20">
            <div className="pageSection w-full">
              <div className="max-w-3xl">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30 mb-4 animate-fade-in">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  <span>{slide.badge}</span>
                </div>

                {/* Subtitle */}
                <p className="text-white/90 text-sm md:text-base lg:text-lg font-medium mb-3 tracking-wide">
                  {slide.subtitle}
                </p>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 lg:mb-6 leading-tight drop-shadow-lg">
                  {slide.title}
                </h1>

                {/* Description */}
                <p className="text-white/90 text-base md:text-lg lg:text-xl mb-6 lg:mb-8 leading-relaxed max-w-2xl drop-shadow-md">
                  {slide.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Link href={slide.primaryCta.href}>
                    <button className="px-6 md:px-8 py-3 md:py-4 bg-white text-tranquil-teal font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 text-sm md:text-base">
                      {slide.primaryCta.text}
                    </button>
                  </Link>
                  <Link href={slide.secondaryCta.href}>
                    <button className="px-6 md:px-8 py-3 md:py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full border-2 border-white/50 hover:bg-white/20 transition-all duration-300 text-sm md:text-base">
                      {slide.secondaryCta.text}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="hidden absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-md rounded-full md:flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 border border-white/30 group"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-lg md:text-xl group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={goToNext}
        className="hidden absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-md rounded-full md:flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 border border-white/30 group"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-lg md:text-xl group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2 md:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "w-8 md:w-10 h-2 md:h-2.5 bg-white"
                : "w-2 md:w-2.5 h-2 md:h-2.5 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
