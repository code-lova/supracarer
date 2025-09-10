"use client";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const AccountTab = ({ userDetails, setShowDeleteModal }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Account Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {userDetails?.fullname}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 text-sm text-gray-900">{userDetails?.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <p className="mt-1 text-sm text-gray-900">{userDetails?.phone}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Member Since
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {userDetails?.joined
                ? new Date(userDetails.joined).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-red-50 rounded-lg p-6 shadow-sm border border-red-200">
        <div className="flex items-center">
          <FaTrashAlt className="text-red-500 mr-3 text-xl" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-red-900">
              Delete Account
            </h3>
            <p className="text-sm text-red-700 mt-1">
              Once you delete your account, all of your data will be permanently
              removed.
            </p>
          </div>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountTab;
