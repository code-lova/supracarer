import React from 'react';

export const formatNumber = (num) => {
  if (num === null || num === undefined) return "0";
  if (typeof num === 'string') return num; // Return strings as-is
  if (isNaN(num)) return "0";
  
  // Handle decimal numbers (like ratings)
  if (num % 1 !== 0) {
    return Number(num).toFixed(2);
  }
  
  return new Intl.NumberFormat().format(num);
};

// Component for displaying formatted numbers
const NumberFormater = ({ value, className = "", fallback = "0" }) => {
  const formattedValue = React.useMemo(() => {
    if (value === null || value === undefined) return fallback;
    if (typeof value === 'string') return value;
    if (isNaN(value)) return fallback;
    
    // Handle decimal numbers (like ratings)
    if (value % 1 !== 0) {
      return Number(value).toFixed(2);
    }
    
    return new Intl.NumberFormat().format(value);
  }, [value, fallback]);

  return (
    <span className={className}>
      {formattedValue}
    </span>
  );
};

export default NumberFormater;