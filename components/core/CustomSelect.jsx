"use client";
import React, { useState, useRef, useEffect } from "react";

const CustomSelect = ({ name, value, onChange, options, placeholder = "Select" }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((o) => o.value === value);

  const handleSelect = (optValue) => {
    onChange({ target: { name, value: optValue } });
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between border rounded-lg px-4 py-2.5 text-sm transition-all duration-200 outline-none
          ${open
            ? "border-carer-blue ring-2 ring-carer-blue/20 bg-white"
            : "border-gray-200 bg-gray-50 hover:border-carer-blue"
          }
          ${selected ? "text-slate-gray" : "text-gray-400"}`}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <svg
          className={`w-4 h-4 text-carer-blue flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 20 20"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 8l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <ul className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-3xl overflow-hidden">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer transition-colors duration-150
                ${opt.value === value
                  ? "bg-light-blue-bg text-dark-blue-border font-medium"
                  : "text-slate-gray hover:bg-gray-50"
                }`}
            >
              <span>{opt.label}</span>
              {opt.value === value && (
                <svg className="w-4 h-4 text-carer-blue flex-shrink-0" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
