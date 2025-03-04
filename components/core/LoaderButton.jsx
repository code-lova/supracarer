import React from "react";

const LoaderButton = ({ loading, text, type, loadingText }) => (
  <button
    className="flex items-center justify-center login-btn"
    disabled={loading}
    type={type}
  >
    {loading ? (
      <div className="flex items-center">
        <div className="loader mr-2" />
        {loadingText}
      </div>
    ) : (
      text
    )}
  </button>
);

export default LoaderButton;
