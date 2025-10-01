import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const EmptyState = ({
  icon: Icon = FaCalendarAlt,
  title,
  description,
  actionLabel,
  onAction,
  iconClassName = "text-6xl text-gray-300",
  className = "",
}) => {
  return (
    <div className={`flex-1 flex items-center justify-center ${className}`}>
      <div className="text-center">
        <Icon className={`${iconClassName} mx-auto mb-4`} />
        <h3 className="text-xl font-semibold text-slate-gray mb-2">{title}</h3>
        <p className="text-slate-gray">{description}</p>
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="mt-4 px-4 py-2 bg-carer-blue text-white rounded-lg hover:bg-haven-blue transition-colors"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
