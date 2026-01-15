import React from "react";
import { FaFlask } from "react-icons/fa";

const BetaBadge = ({
  text = "Beta Testing",
  className = "",
  iconClassName = "",
  icon: Icon = FaFlask,
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500/10 to-yellow-200/10 px-3 py-2 rounded-lg border border-yellow-500/20">
        <Icon className={`text-yellow-500 ${iconClassName}`} size={14} />
        <span className="text-sm font-medium text-yellow-500">{text}</span>
      </div>
    </div>
  );
};

export default BetaBadge;
