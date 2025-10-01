"use client";
import React from "react";
import { FaExclamationTriangle, FaCheckCircle, FaClock } from "react-icons/fa";
import { IoIosChatboxes } from "react-icons/io";
import { MdOutlineWarning } from "react-icons/md";
import { HiOutlineClipboardList } from "react-icons/hi";

const SupportLimitsCard = ({ limits, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gray-200 rounded-xl"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-100 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const {
    daily_limit = 0,
    requests_today = 0,
    remaining_requests = 0,
    can_create_ticket = false,
    has_pending_ticket = false,
    next_reset
  } = limits || {};

  const usagePercentage = daily_limit > 0 ? (requests_today / daily_limit) * 100 : 0;
  const isNearLimit = usagePercentage >= 80;
  const isAtLimit = remaining_requests === 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            isAtLimit ? 'bg-red-100' : isNearLimit ? 'bg-amber-100' : 'bg-blue-100'
          }`}>
            <HiOutlineClipboardList className={`w-5 h-5 ${
              isAtLimit ? 'text-red-600' : isNearLimit ? 'text-amber-600' : 'text-blue-600'
            }`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Daily Support Limit</h3>
            <p className="text-sm text-gray-600">Track your daily ticket usage</p>
          </div>
        </div>
        
        {/* Status Badge */}
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          can_create_ticket 
            ? 'bg-green-100 text-custom-green' 
            : 'bg-red-100 text-red-700'
        }`}>
          {can_create_ticket ? 'Available' : 'Limit Reached'}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Daily Limit */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-medium text-blue-700">Daily Limit</span>
          </div>
          <p className="text-2xl font-bold text-blue-800">{daily_limit}</p>
        </div>

        {/* Used Today */}
        <div className={`rounded-xl p-4 border ${
          isAtLimit 
            ? 'bg-gradient-to-br from-red-50 to-red-100 border-red-200' 
            : isNearLimit 
            ? 'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200'
            : 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {isAtLimit ? (
              <FaExclamationTriangle className="w-4 h-4 text-red-600" />
            ) : (
              <IoIosChatboxes className={`w-4 h-4 ${
                isNearLimit ? 'text-amber-600' : 'text-green-600'
              }`} />
            )}
            <span className={`text-xs font-medium ${
              isAtLimit ? 'text-red-700' : isNearLimit ? 'text-amber-700' : 'text-green-700'
            }`}>
              Used Today
            </span>
          </div>
          <p className={`text-2xl font-bold ${
            isAtLimit ? 'text-red-800' : isNearLimit ? 'text-amber-800' : 'text-green-800'
          }`}>
            {requests_today}
          </p>
        </div>

        {/* Remaining */}
        <div className={`rounded-xl p-4 border ${
          remaining_requests === 0 
            ? 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200' 
            : 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <FaClock className={`w-4 h-4 ${
              remaining_requests === 0 ? 'text-gray-600' : 'text-emerald-600'
            }`} />
            <span className={`text-xs font-medium ${
              remaining_requests === 0 ? 'text-gray-700' : 'text-emerald-700'
            }`}>
              Remaining
            </span>
          </div>
          <p className={`text-2xl font-bold ${
            remaining_requests === 0 ? 'text-gray-800' : 'text-emerald-800'
          }`}>
            {remaining_requests}
          </p>
        </div>

        {/* Reset Time */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <FaClock className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-medium text-purple-700">Resets In</span>
          </div>
          <p className="text-sm font-bold text-purple-800">
            {next_reset ? new Date(next_reset).toLocaleDateString() : 'Tomorrow'}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Usage Progress</span>
          <span className="text-sm text-gray-600">{Math.round(usagePercentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              isAtLimit 
                ? 'bg-red-500' 
                : isNearLimit 
                ? 'bg-amber-500' 
                : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Warning Messages */}
      {has_pending_ticket && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
          <div className="flex items-start gap-2">
            <MdOutlineWarning className="w-4 h-4 text-amber-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-800">Pending Ticket</p>
              <p className="text-xs text-amber-700">You have a pending support ticket. Please wait for a response before creating a new one.</p>
            </div>
          </div>
        </div>
      )}

      {isAtLimit && !has_pending_ticket && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3">
          <div className="flex items-start gap-2">
            <FaExclamationTriangle className="w-4 h-4 text-red-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800">Daily Limit Reached</p>
              <p className="text-xs text-red-700">You've reached your daily limit of {daily_limit} support tickets. Limit resets tomorrow.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportLimitsCard;