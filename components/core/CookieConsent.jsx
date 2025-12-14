"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaCookieBite, FaCog, FaCheck, FaTimes } from "react-icons/fa";
import {
  hasUserConsented,
  getConsentState,
  acceptAllCookies,
  rejectAllCookies,
  saveConsent,
  COOKIE_CATEGORIES,
} from "@utils/cookieConsent";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already consented
    const consented = hasUserConsented();
    if (!consented) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      setPreferences(getConsentState());
    }
  }, []);

  const handleAcceptAll = () => {
    acceptAllCookies();
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleRejectAll = () => {
    rejectAllCookies();
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
    setIsVisible(false);
    setShowPreferences(false);
  };

  const togglePreference = (category) => {
    if (category === COOKIE_CATEGORIES.ESSENTIAL) return; // Can't toggle essential
    setPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9998]" />

      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Main Banner */}
          {!showPreferences ? (
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-tranquil-teal/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaCookieBite className="text-2xl text-tranquil-teal" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    We Value Your Privacy 🍪
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    We use cookies to enhance your browsing experience, analyze
                    site traffic, and personalize content. By clicking
                    &quot;Accept All&quot;, you consent to our use of cookies.
                    Read our{" "}
                    <Link
                      href="/cookie-policy"
                      className="text-tranquil-teal hover:underline font-medium"
                    >
                      Cookie Policy
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-tranquil-teal hover:underline font-medium"
                    >
                      Privacy Policy
                    </Link>{" "}
                    for more information.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleAcceptAll}
                      className="px-6 py-2.5 bg-tranquil-teal text-white rounded-lg font-medium hover:bg-tranquil-teal/90 transition-colors flex items-center gap-2"
                    >
                      <FaCheck className="text-sm" />
                      Accept All
                    </button>
                    <button
                      onClick={handleRejectAll}
                      className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                      <FaTimes className="text-sm" />
                      Reject All
                    </button>
                    <button
                      onClick={() => setShowPreferences(true)}
                      className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <FaCog className="text-sm" />
                      Manage Preferences
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Preferences Panel */
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <FaCog className="text-tranquil-teal" />
                  Cookie Preferences
                </h3>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {/* Essential Cookies */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">
                      Essential Cookies
                    </h4>
                    <span className="px-3 py-1 bg-tranquil-teal/10 text-tranquil-teal text-xs font-medium rounded-full">
                      Always Active
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Required for the website to function properly. Cannot be
                    disabled.
                  </p>
                </div>

                {/* Functional Cookies */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">
                      Functional Cookies
                    </h4>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.functional}
                        onChange={() =>
                          togglePreference(COOKIE_CATEGORIES.FUNCTIONAL)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-tranquil-teal/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tranquil-teal"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600">
                    Remember your preferences like language and location
                    settings.
                  </p>
                </div>

                {/* Analytics Cookies */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">
                      Analytics Cookies
                    </h4>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={() =>
                          togglePreference(COOKIE_CATEGORIES.ANALYTICS)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-tranquil-teal/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tranquil-teal"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600">
                    Help us understand how visitors interact with our website to
                    improve user experience.
                  </p>
                </div>

                {/* Marketing Cookies */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">
                      Marketing Cookies
                    </h4>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={() =>
                          togglePreference(COOKIE_CATEGORIES.MARKETING)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-tranquil-teal/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tranquil-teal"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600">
                    Used to deliver relevant advertisements and measure campaign
                    effectiveness.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleSavePreferences}
                  className="px-6 py-2.5 bg-tranquil-teal text-white rounded-lg font-medium hover:bg-tranquil-teal/90 transition-colors flex items-center gap-2"
                >
                  <FaCheck className="text-sm" />
                  Save Preferences
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2.5 bg-custom-green text-white rounded-lg font-medium hover:bg-custom-green/90 transition-colors"
                >
                  Accept All
                </button>
                <button
                  onClick={handleRejectAll}
                  className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Reject All
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CookieConsent;
