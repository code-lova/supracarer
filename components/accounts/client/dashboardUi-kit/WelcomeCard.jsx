import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaRegCalendarAlt,
  FaHeartbeat,
  FaUserMd,
  FaClock,
} from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { useGreeting } from "@hooks/useGreeting";

const WelcomeCard = ({ userDetails }) => {
  const { greeting, currentDate } = useGreeting();

  const firstName = userDetails?.fullname?.split(" ")[0] || "there";

  return (
    <>
      <div className="relative bg-gradient-to-br from-carer-blue via-carer-blue to-blue-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="relative p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
            {/* Left Content */}
            <div className="flex-1 w-full lg:w-auto text-center lg:text-left">
              {/* Date Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full mb-3 sm:mb-4">
                <FaClock className="text-white/80 text-xs" />
                <span className="text-white/90 text-xs font-medium">
                  {currentDate}
                </span>
              </div>

              {/* Greeting */}
              <div className="mb-4 sm:mb-6">
                <h2 className="text-white/80 text-sm sm:text-base font-medium mb-1">
                  {greeting} 👋
                </h2>
                <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold capitalize">
                  {firstName}
                </h1>
              </div>

              {/* Motivational Message */}
              <div className="mb-4 sm:mb-6">
                <p className="text-white/90 text-sm sm:text-base lg:text-lg font-medium leading-relaxed">
                  Your health is your wealth.
                </p>
                <p className="text-white/70 text-xs sm:text-sm mt-1">
                  Book an appointment and take care of yourself today.
                </p>
              </div>

              {/* CTA Button */}
              <Link href="/client/booking" passHref>
                <button className="group inline-flex items-center gap-2 bg-white text-carer-blue font-semibold py-2.5 sm:py-3 px-5 sm:px-6 rounded-xl hover:bg-blue-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                  <FaRegCalendarAlt className="text-sm sm:text-base" />
                  <span className="text-sm sm:text-base">Book Appointment</span>
                  <FiArrowRight className="text-sm sm:text-base group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </Link>

              {/* Quick Stats */}
              <div className="hidden sm:flex items-center gap-4 mt-6 pt-4 border-t border-white/20">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <FaHeartbeat className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">24/7</p>
                    <p className="text-white/60 text-[10px]">Support</p>
                  </div>
                </div>
                <div className="w-px h-8 bg-white/20" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <FaUserMd className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">Expert</p>
                    <p className="text-white/60 text-[10px]">Care Providers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Image with Animation */}
            <div className="flex-shrink-0 w-32 sm:w-40 lg:w-52 xl:w-60 relative">
              {/* Glow Effect Behind Heart */}
              <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl scale-75 animate-pulse" />

              {/* Heart Image */}
              <div className="relative">
                <Image
                  src="/assets/images/heart.png"
                  width={400}
                  height={240}
                  alt="Health and Wellness"
                  className="w-full h-auto object-contain animate-heartbeat drop-shadow-2xl"
                  priority
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-2 -left-2 sm:top-0 sm:left-0 w-6 h-6 sm:w-8 sm:h-8 bg-green-400 rounded-full flex items-center justify-center shadow-lg animate-bounce-slow">
                <span className="text-white text-xs sm:text-sm">✓</span>
              </div>
              <div className="absolute bottom-4 -right-2 sm:bottom-8 sm:right-0 w-8 h-8 sm:w-10 sm:h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-float">
                <span className="text-lg sm:text-xl">⭐</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes heartbeat {
          0% {
            transform: scale(1);
          }
          14% {
            transform: scale(1.08);
          }
          28% {
            transform: scale(1);
          }
          42% {
            transform: scale(1.08);
          }
          70% {
            transform: scale(1);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
          transform-origin: center center;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default WelcomeCard;
