import React from 'react';

export const Spinner = ({ size = 'large' }) => {
  const spinnerSize = size === 'small' ? 'w-6 h-6' : size === 'large' ? 'w-16 h-16' : 'w-10 h-10';

  return (
    <div className={`border-t-4 border-blue-500 rounded-full animate-spin ${spinnerSize}`}></div>
  );
};
