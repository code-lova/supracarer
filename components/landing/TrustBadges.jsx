"use client";
import React from "react";
import { badges } from "@constants";

const TrustBadges = () => {
  return (
    <div className="bg-white py-12 md:py-16 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-tranquil-teal/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-custom-green/5 rounded-full blur-3xl"></div>

      <div className="pageSection relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {badges.map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <div
                key={badge.id}
                className={`group relative bg-gradient-to-br ${badge.bgGradient} rounded-2xl p-6 lg:p-8 border ${badge.borderColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                  <IconComponent className="w-full h-full" />
                </div>

                <div className="relative z-10 flex items-start gap-4">
                  {/* Icon Container */}
                  <div
                    className={`flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 ${badge.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <IconComponent
                      className={`text-2xl lg:text-3xl ${badge.iconColor}`}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3
                        className={`text-lg lg:text-xl font-bold text-gray-800 group-hover:text-${badge.color} transition-colors duration-300`}
                      >
                        {badge.title}
                      </h3>
                      {badge.badge && (
                        <span className="text-lg">{badge.badge}</span>
                      )}
                    </div>
                    <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                      {badge.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div
                  className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-${badge.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>

                {/* Corner Glow */}
                <div
                  className={`absolute -bottom-8 -right-8 w-24 h-24 bg-${badge.color} rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;
