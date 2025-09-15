import React from "react";
import { MdClose } from "react-icons/md";
import { FaHeadset, FaBan } from "react-icons/fa";
import { MediumBtn } from "@components/core/button";

const ContactSupportModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800">
            Need Help with This Assignment?
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHeadset className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              If you're unable to take this assignment or have concerns about
              the booking details, please contact our support team. They'll help
              reassign the booking or address any issues.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <MediumBtn
              onClick={onClose}
              text="Cancel"
              color="gray"
              icon={<FaBan className="mr-1" />}
            />
            <MediumBtn
              text="Contact Support"
              href="/health-service/support"
              color="green"
              icon={<FaHeadset className="mr-1" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSupportModal;
