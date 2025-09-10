"use client";
import React, { useState, useEffect } from "react";
import { ErrorMessage } from "formik";

const WordCountTextarea = ({
  name,
  label,
  value = "",
  onChange,
  maxWords = 1000,
  rows = 5,
  placeholder = "",
  className = "login-form-input",
  showErrorMessage = true,
  ...props
}) => {
  const [wordCount, setWordCount] = useState(0);

  // Function to count words
  const countWords = (text) => {
    if (!text || text.trim() === "") return 0;
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  // Initialize word count
  useEffect(() => {
    if (value) {
      const count = countWords(value);
      setWordCount(count);
    }
  }, [value]);

  const handleChange = (e) => {
    const text = e.target.value;
    const wordCountValue = countWords(text);

    // Allow if under limit or if user is deleting (text getting shorter)
    if (wordCountValue < maxWords || text.length < value.length) {
      setWordCount(wordCountValue);
      onChange(text);
    } else if (wordCountValue === maxWords) {
      // Allow if exactly at limit (in case they're editing existing words)
      setWordCount(wordCountValue);
      onChange(text);
    } else {
      // Prevent adding more words if over limit
      // Don't update the text, just keep current state
      return;
    }
  };

  const warningThreshold = Math.floor(maxWords * 0.95); // Show warning at 95% of limit

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium">{label}</label>
        <span
          className={`text-xs ${
            wordCount > maxWords ? "text-red-600" : "text-gray-500"
          }`}
        >
          {wordCount}/{maxWords} words
        </span>
      </div>

      <textarea
        name={name}
        value={value}
        onChange={handleChange}
        rows={rows}
        placeholder={placeholder}
        className={className}
        {...props}
      />

      {showErrorMessage && (
        <ErrorMessage
          name={name}
          component="div"
          className="text-red-600 text-xs"
        />
      )}

      {wordCount > warningThreshold && (
        <p className="text-xs text-yellow-600 mt-1">
          {wordCount >= maxWords
            ? "Maximum word limit reached!"
            : `You have ${maxWords - wordCount} words remaining.`}
        </p>
      )}
    </div>
  );
};

export default WordCountTextarea;
