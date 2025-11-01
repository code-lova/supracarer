"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";

const COUNTRIES = [
  { code: "GH", name: "Ghana", dialCode: "+233", flag: "🇬🇭" },
  { code: "NG", name: "Nigeria", dialCode: "+234", flag: "🇳🇬" },
  { code: "KE", name: "Kenya", dialCode: "+254", flag: "🇰🇪" },
  { code: "ZA", name: "South Africa", dialCode: "+27", flag: "🇿🇦" },
  { code: "EG", name: "Egypt", dialCode: "+20", flag: "🇪🇬" },
  { code: "MA", name: "Morocco", dialCode: "+212", flag: "🇲🇦" },
  { code: "TN", name: "Tunisia", dialCode: "+216", flag: "🇹🇳" },
  { code: "ET", name: "Ethiopia", dialCode: "+251", flag: "🇪🇹" },
  { code: "UG", name: "Uganda", dialCode: "+256", flag: "🇺🇬" },
  { code: "TZ", name: "Tanzania", dialCode: "+255", flag: "🇹🇿" },
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
  { code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
  { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
  { code: "CN", name: "China", dialCode: "+86", flag: "🇨🇳" },
  { code: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵" },
  { code: "BR", name: "Brazil", dialCode: "+55", flag: "🇧🇷" },
];

const PhoneInput = ({
  value,
  onChange,
  error,
  placeholder = "24 123 4567",
  className = "",
  required = false,
}) => {
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]); // Default to Ghana
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const lastValueRef = useRef("");

  // Filter countries based on search
  const filteredCountries = COUNTRIES.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.dialCode.includes(searchQuery) ||
      country.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Parse initial value if provided
  useEffect(() => {
    if (
      value &&
      typeof value === "string" &&
      value !== `${selectedCountry.dialCode}${phoneNumber}`.trim()
    ) {
      // Try to extract country code and number from the value
      const country = COUNTRIES.find((c) => value.startsWith(c.dialCode));
      if (country) {
        setSelectedCountry(country);
        setPhoneNumber(value.substring(country.dialCode.length).trim());
      } else {
        setPhoneNumber(value);
      }
    }
  }, []); // Only run on initial mount

  // Update parent component when phone number changes
  useEffect(() => {
    const fullPhoneNumber = phoneNumber
      ? `${selectedCountry.dialCode}${phoneNumber}`
      : "";
    // Only update if the value has actually changed
    if (onChange && fullPhoneNumber !== lastValueRef.current) {
      lastValueRef.current = fullPhoneNumber;
      onChange(fullPhoneNumber);
    }
  }, [selectedCountry, phoneNumber]); // Removed onChange and value from dependencies

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setSearchQuery("");
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    setSearchQuery("");
    // Focus back to phone input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    // Only allow numbers, spaces, and common phone number characters
    const cleanedValue = value.replace(/[^\d\s\-\(\)]/g, "");
    setPhoneNumber(cleanedValue);
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`flex rounded-lg transition-all duration-200 ${
          isFocused ? "ring-1 ring-tranquil-teal" : ""
        } ${error ? "ring-1 ring-red-300" : ""}`}
      >
        {/* Country Selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`flex items-center gap-1 px-1 py-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 outline-none ${
              error ? "border-red-300" : ""
            } ${isFocused ? "border-tranquil-teal" : ""}`}
          >
            <span className="text-lg">{selectedCountry.flag}</span>
            <span className="text-sm font-medium text-gray-700 hidden sm:inline">
              {selectedCountry.dialCode}
            </span>
            <FaChevronDown
              className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-72 sm:w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-hidden">
              {/* Search */}
              <div className="p-3 border-b border-gray-100">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search countries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-tranquil-teal focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Countries List */}
              <div className="max-h-48 overflow-y-auto">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-gray-50 transition-colors duration-150 ${
                        selectedCountry.code === country.code
                          ? "bg-tranquil-teal/10 text-tranquil-teal"
                          : "text-gray-700"
                      }`}
                    >
                      <span className="text-lg">{country.flag}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">
                          {country.name}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 font-mono">
                        {country.dialCode}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    No countries found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Phone Number Input */}
        <input
          ref={inputRef}
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          required={required}
          className={`w-10 flex-1 px-4 py-2.5 border border-gray-300 rounded-r-lg transition-all duration-200 outline-none ${
            error ? "border-red-300" : ""
          } ${isFocused ? "border-tranquil-teal" : ""}`}
        />
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}

      {/* Format Hint */}
      {phoneNumber && (
        <div className="text-xs text-gray-500 mt-1">
          Full number:{" "}
          <span className="font-mono">
            {selectedCountry.dialCode}
            {phoneNumber}
          </span>
        </div>
      )}
    </div>
  );
};

export default PhoneInput;
