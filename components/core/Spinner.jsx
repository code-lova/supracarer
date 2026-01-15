import React from "react";

export const Spinner = ({ size = "large" }) => {
  const spinnerSize =
    size === "small" ? "w-6 h-6" : size === "large" ? "w-16 h-16" : "w-10 h-10";

  return <div className={`multi-spinner ${spinnerSize}`}></div>;
};
