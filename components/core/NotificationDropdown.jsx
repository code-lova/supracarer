"use client";
import React, { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getLatestNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "@service/request/user/getNotifications";
import {
  FaBell,
  FaCalendarCheck,
  FaCommentDots,
  FaTimes,
  FaCheck,
  FaUserPlus,
  FaClipboardList,
  FaHeadset,
} from "react-icons/fa";
import { PiWarningFill } from "react-icons/pi";
import TimeAgo from "@components/core/TimeAgo";
import Link from "next/link";
import toast from "react-hot-toast";

const NotificationDropdown = ({
  isOpen,
  onClose,
  triggerRef,
  userRole = "health-service",
}) => {
  const dropdownRef = useRef(null);
  const queryClient = useQueryClient();

  // Fetch latest notifications for dropdown
  const {
    data: notificationsResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["latest-notifications"],
    queryFn: () => getLatestNotifications(10),
    refetchInterval: 30000, // Refetch every 30 seconds
    enabled: isOpen, // Only fetch when dropdown is open
  });

  // Mark notification as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries(["latest-notifications"]);
      queryClient.invalidateQueries(["unread-count"]);
    },
    onError: (error) => {
      //throw new error
    },
  });

  // Mark all notifications as read mutation
  const markAllAsReadMutation = useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries(["latest-notifications"]);
      queryClient.invalidateQueries(["unread-count"]);
      toast.success("All notifications marked as read");
    },
    onError: (error) => {
      toast.error("Failed to mark all notifications as read");
    },
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleNotificationClick = (notification) => {
    if (!notification.is_read) {
      markAsReadMutation.mutate(notification.id);
    }
  };

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      // Client & Health Worker notifications
      case "booking_assigned":
        return <FaCalendarCheck className="w-4 h-4 text-blue-500" />;
      case "support_reply":
        return <FaCommentDots className="w-4 h-4 text-green-500" />;
      case "new_booking_assigned":
        return <FaCalendarCheck className="w-4 h-4 text-purple-500" />;

      // Admin notifications
      case "new_booking_request":
        return <FaClipboardList className="w-4 h-4 text-orange-500" />;
      case "booking_confirmed":
        return <FaClipboardList className="w-4 h-4 text-orange-300" />;
      case "booking_started":
        return <FaClipboardList className="w-4 h-4 text-orange-800" />;
      case "new_client_support":
        return <FaHeadset className="w-4 h-4 text-teal-500" />;
      case "client_support_reply":
        return <FaHeadset className="w-4 h-4 text-teal-600" />;
      case "new_healthworker_support":
        return <FaHeadset className="w-4 h-4 text-indigo-500" />;
      case "new_user_registration":
        return <FaUserPlus className="w-4 h-4 text-pink-500" />;
      case "user_email_verified":
        return <FaUserPlus className="w-4 h-4 text-pink-900" />;

      default:
        return <FaBell className="w-4 h-4 text-gray-500" />;
    }
  };

  const getNotificationLink = (notification) => {
    const { type } = notification;

    if (userRole === "admin") {
      // Admin routes
      switch (type) {
        case "new_booking_request":
        case "booking_confirmed":
        case "booking_started":
          return "/admin/booking-requests";
        case "new_client_support":
        case "client_support_reply":
          return "/admin/support-ticket";
        case "new_healthworker_support":
          return "/admin/messages";
        case "new_user_registration":
        case "user_email_verified":
          return "/admin/users";
        default:
          return "/admin/dashboard";
      }
    } else if (userRole === "client") {
      // Client routes
      switch (type) {
        case "booking_assigned":
          return "/client/appointment";
        case "support_reply":
          return "/client/support";
        default:
          return "/client/dashboard";
      }
    } else {
      // Health Service routes
      switch (type) {
        case "new_booking_assigned":
          return "/health-service/booking-request";
        case "support_reply":
          return "/health-service/support";
        default:
          return "/health-service/dashboard";
      }
    }
  };

  if (!isOpen) return null;

  const notificationList = notificationsResponse?.data?.notifications || [];
  const unreadCount = notificationsResponse?.data?.unread_count || 0;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <FaBell className="w-4 h-4 text-gray-600" />
          <h3 className="font-semibold text-gray-800">Notifications</h3>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              disabled={markAllAsReadMutation.isPending}
              className="text-xs text-blue-600 hover:text-blue-800 disabled:opacity-50"
            >
              Mark all read
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaTimes className="w-3 h-3 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-h-72 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-sm text-gray-500 mt-2">
              Loading notifications...
            </p>
          </div>
        ) : error ? (
          <div className="p-4 text-center">
            <PiWarningFill className="w-6 h-6 text-red-500 mx-auto mb-2" />
            <p className="text-sm text-red-600">Failed to load notifications</p>
          </div>
        ) : notificationList.length === 0 ? (
          <div className="p-6 text-center">
            <FaBell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No notifications yet</p>
            <p className="text-xs text-gray-400 mt-1">
              {userRole === "admin"
                ? "We'll notify you about new bookings, support requests, and user registrations"
                : userRole === "client"
                ? "We'll notify you about booking updates and support replies"
                : "We'll notify you about new bookings and support replies"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notificationList.map((notification) => (
              <Link
                key={notification.id}
                href={getNotificationLink(notification)}
                onClick={() => {
                  handleNotificationClick(notification);
                  onClose();
                }}
                className={`block p-4 hover:bg-gray-50 transition-colors ${
                  !notification.is_read ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-sm font-medium truncate ${
                          !notification.is_read
                            ? "text-gray-900"
                            : "text-gray-700"
                        }`}
                      >
                        {notification.title}
                      </h4>
                      {!notification.is_read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2"></div>
                      )}
                    </div>

                    <p
                      className={`text-sm mt-1 line-clamp-2 ${
                        !notification.is_read
                          ? "text-gray-700"
                          : "text-gray-500"
                      }`}
                    >
                      {notification.message}
                    </p>

                    <div className="flex items-center justify-between mt-2 text-slate-gray">
                      <TimeAgo
                        timestamp={notification.created_at}
                        format="custom"
                      />
                      {notification.read_at && (
                        <FaCheck className="w-3 h-3 text-green-500" />
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {notificationList.length > 0 && (
        <div className="p-3 border-t border-gray-200 bg-gray-50 text-center">
          <span className="text-sm text-gray-600">
            {Math.min(notificationList.length, 10)} of {notificationList.length}{" "}
            notifications shown
          </span>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
