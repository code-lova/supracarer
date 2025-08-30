import React from "react";
import { FiMessageSquare } from "react-icons/fi";

const TicketReplySkeleton = () => {
  return (
    <div className="flex items-center justify-center h-[89vh] bg-gray-50">
      <div className="text-center">
        {/* Animated Chat Icon */}
        <div className="mb-4">
          <FiMessageSquare className="w-16 h-16 text-gray-400 mx-auto animate-pulse" />
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-700">
            Loading Ticket...
          </h3>
          <p className="text-sm text-gray-500">
            Please wait while I fetch the conversation
          </p>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-1 mt-4">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.1s]"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
        </div>
      </div>
    </div>
  );
};

export default TicketReplySkeleton;
