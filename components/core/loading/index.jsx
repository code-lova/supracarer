import React, { useState, useEffect } from "react";
import {
  FaHeartbeat,
  FaUserMd,
  FaStethoscope,
  FaAmbulance,
  FaHospital,
} from "react-icons/fa";
import { MdLocalHospital, MdHealthAndSafety } from "react-icons/md";

const LoadingStateUI = ({ label }) => {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const healthIcons = [
    { icon: FaHeartbeat, color: "text-red-500" },
    { icon: FaUserMd, color: "text-blue-500" },
    { icon: FaStethoscope, color: "text-green-500" },
    { icon: MdLocalHospital, color: "text-red-600" },
    { icon: MdHealthAndSafety, color: "text-emerald-500" },
    { icon: FaAmbulance, color: "text-orange-500" },
    { icon: FaHospital, color: "text-gray-600" },
  ];

  const healthMessages = [
    "Above and Beyond Care...",
    "Connecting you to care...",
    "Your wellness matters...",
    "Building healthier communities...",
    "Health at your fingertips...",
    "Empowering better health...",
  ];

  useEffect(() => {
    const iconInterval = setInterval(() => {
      setCurrentIconIndex((prev) => (prev + 1) % healthIcons.length);
    }, 800);

    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % healthMessages.length);
    }, 2000);

    return () => {
      clearInterval(iconInterval);
      clearInterval(messageInterval);
    };
  }, [healthIcons.length, healthMessages.length]);

  const CurrentIcon = healthIcons[currentIconIndex].icon;
  const currentIconColor = healthIcons[currentIconIndex].color;

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white w-full">
        {/* Header */}
        {label && (
          <div className="flex flex-row items-center justify-center mb-6">
            <h1 className="text-2xl font-bold text-center text-tranquil-teal">
              {label}
            </h1>
          </div>
        )}

        {/* Animated Health Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Pulse Animation Background */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-tranquil-teal/20 to-custom-green/20 animate-ping"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-tranquil-teal/30 to-custom-green/30 animate-pulse delay-75"></div>

            {/* Main Icon */}
            <div className="relative w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-tranquil-teal/20">
              <CurrentIcon
                className={`w-10 h-10 ${currentIconColor} transition-all duration-500 transform animate-bounce`}
              />
            </div>
          </div>
        </div>

        {/* Heartbeat Line Animation */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-red-400 to-pink-500 rounded-full heartbeat-line"></div>
          </div>
        </div>

        {/* Dynamic Health Message */}
        <div className="text-center mb-4">
          <p className="text-lg font-medium text-gray-700 transition-all duration-500">
            {healthMessages[currentMessageIndex]}
          </p>
        </div>

       
        {/* Bottom Message */}
        <p className="flex justify-center mt-4 font-medium text-sm text-gray-500">
          Please wait while we prepare your health journey...
        </p>
      </div>

      {/* Custom CSS for heartbeat animation */}
      <style jsx>{`
        .heartbeat-line {
          animation: heartbeat 2s ease-in-out infinite;
        }

        @keyframes heartbeat {
          0%,
          100% {
            transform: translateX(-100%);
          }
          10% {
            transform: translateX(-50%);
          }
          20% {
            transform: translateX(0%);
          }
          30% {
            transform: translateX(50%);
          }
          50% {
            transform: translateX(100%);
          }
          60% {
            transform: translateX(150%);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingStateUI;
