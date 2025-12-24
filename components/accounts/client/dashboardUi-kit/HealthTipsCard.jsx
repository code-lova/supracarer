import React, { useState, useEffect } from "react";
import {
  FaHeart,
  FaLightbulb,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { FiDroplet, FiSun, FiMoon, FiActivity } from "react-icons/fi";

// Static tips for now - will be replaced with API data later
const healthTips = [
  {
    id: 1,
    tip: "Stay hydrated! Drink at least 8 glasses of water daily for optimal health.",
    icon: FiDroplet,
    category: "Hydration",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: 2,
    tip: "Get 7-9 hours of quality sleep each night to boost your immune system.",
    icon: FiMoon,
    category: "Sleep",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    id: 3,
    tip: "Take a 10-minute walk after meals to improve digestion and energy levels.",
    icon: FiActivity,
    category: "Exercise",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    id: 4,
    tip: "Spend 15 minutes in morning sunlight to regulate your circadian rhythm.",
    icon: FiSun,
    category: "Wellness",
    color: "text-amber-500",
    bgColor: "bg-amber-50",
  },
];

const HealthTipsCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-rotate tips
  useEffect(() => {
    const interval = setInterval(() => {
      nextTip();
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextTip = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % healthTips.length);
      setIsAnimating(false);
    }, 150);
  };

  const prevTip = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(
        (prev) => (prev - 1 + healthTips.length) % healthTips.length
      );
      setIsAnimating(false);
    }, 150);
  };

  const currentTip = healthTips[currentIndex];
  const TipIcon = currentTip.icon;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-[160px] flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-2 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-red-50 flex items-center justify-center">
            <FaHeart className="text-red-400 text-xs" />
          </div>
          <h3 className="text-gray-800 font-semibold text-sm">Health Tip</h3>
        </div>
        <div className="flex items-center gap-1">
          <span
            className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${currentTip.bgColor} ${currentTip.color}`}
          >
            {currentTip.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 px-3 py-1 flex items-center gap-3 overflow-hidden">
        {/* Icon */}
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-xl ${currentTip.bgColor} flex items-center justify-center`}
        >
          <TipIcon className={`text-lg ${currentTip.color}`} />
        </div>

        {/* Tip Text */}
        <div
          className={`flex-1 min-w-0 transition-opacity duration-150 ${
            isAnimating ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex items-start gap-1">
            <FaLightbulb className="text-amber-400 text-[10px] mt-0.5 flex-shrink-0" />
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
              {currentTip.tip}
            </p>
          </div>
        </div>
      </div>

      {/* Footer - Navigation */}
      <div className="flex-shrink-0 px-4 py-2 border-t border-gray-50 flex items-center justify-between">
        {/* Dots */}
        <div className="flex items-center gap-1.5">
          {healthTips.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAnimating(true);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setIsAnimating(false);
                }, 150);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? `w-4 ${currentTip.color.replace("text-", "bg-")}`
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              aria-label={`Go to tip ${index + 1}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-1">
          <button
            onClick={prevTip}
            className="w-6 h-6 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors"
            aria-label="Previous tip"
          >
            <FaChevronLeft className="text-gray-400 text-[10px]" />
          </button>
          <button
            onClick={nextTip}
            className="w-6 h-6 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors"
            aria-label="Next tip"
          >
            <FaChevronRight className="text-gray-400 text-[10px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthTipsCard;
