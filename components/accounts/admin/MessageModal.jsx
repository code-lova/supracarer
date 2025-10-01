"use client";
import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FiX,
  FiUser,
  FiMail,
  FiCalendar,
  FiSend,
  FiAlertTriangle,
} from "react-icons/fi";
import { FaEnvelope, FaReply, FaBan } from "react-icons/fa";
import { replyToMessage } from "@service/request/admin/messages";
import DateFormatter from "@components/core/DateFormatter";
import StatusPill from "@components/core/StatusPill";
import toast from "react-hot-toast";
import { MediumBtn } from "@components/core/button";

const MessageModal = ({ isOpen, onClose, messageData }) => {
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const queryClient = useQueryClient();

  // Use the passed messageData directly - no need for additional API call
  const message = messageData;

  // Reply mutation
  const replyMutation = useMutation({
    mutationFn: replyToMessage,
    onSuccess: () => {
      // Refresh the messages list
      queryClient.invalidateQueries({ queryKey: ["healthworkerMessages"] });

      // Close the modal immediately
      onClose();

      // Show success message
      toast.success("Reply sent successfully!");

      // Reset form state
      setReplyText("");
      setIsReplying(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send reply");
    },
  });

  // Handle reply submission
  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    replyMutation.mutate({
      support_message_uuid: message.uuid,
      admin_reply: replyText.trim(),
    });
  };

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setReplyText("");
      setIsReplying(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden ${
        isOpen ? "block" : "hidden"
      }`}
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? "bg-opacity-50" : "bg-opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div
          className={`w-screen max-w-2xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <FaEnvelope className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Support Message Details
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {!message ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <FiAlertTriangle className="mx-auto h-12 w-12 text-red-400 mb-4" />
                    <h3 className="text-lg font-medium text-red-900 mb-2">
                      No message data
                    </h3>
                    <p className="text-red-700">
                      Unable to display message details. Please try again.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-6 space-y-6">
                  {/* Health Worker Info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      Health Worker Information
                    </h3>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {message.user?.image ? (
                          <img
                            src={message.user.image}
                            alt={message.user.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                            <FiUser className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">
                          {message.user?.name || "Unknown User"}
                        </h4>
                        <div className="flex items-center space-x-1 text-gray-600">
                          <FiMail className="w-4 h-4" />
                          <span>{message.user?.email || "No email"}</span>
                        </div>
                        {message.user?.phone && (
                          <p className="text-sm text-gray-600">
                            Phone: {message.user.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Message Details */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        Message Details
                      </h3>
                      <StatusPill status={message.status} size="sm" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Reference
                        </label>
                        <p className="text-sm text-gray-900">
                          {message.reference || "N/A"}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date Created
                        </label>
                        <div className="flex items-center space-x-1">
                          <FiCalendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">
                            <DateFormatter
                              date={message.created_at}
                              format="datetime"
                            />
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
                        {message.subject || "No subject"}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-900 whitespace-pre-wrap">
                          {message.message || "No message content"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Previous Replies */}
                  {message.replies && message.replies.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 flex items-center">
                        <FaReply className="w-5 h-5 mr-2 text-blue-600" />
                        Previous Replies ({message.replies.length})
                      </h3>
                      <div className="space-y-3">
                        {message.replies.map((reply, index) => (
                          <div
                            key={reply.uuid || index}
                            className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-blue-900">
                                Admin Reply
                              </span>
                              <span className="text-xs text-blue-700">
                                <DateFormatter
                                  date={reply.created_at}
                                  format="datetime"
                                />
                              </span>
                            </div>
                            <p className="text-sm text-blue-800 whitespace-pre-wrap">
                              {reply.admin_reply}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reply Form */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Send Reply
                      </h3>
                      {!isReplying && (
                        <MediumBtn
                          onClick={() => setIsReplying(true)}
                          text="Reply"
                          color="darkblue"
                          icon={<FiSend className="mr-1" />}
                        />
                      )}
                    </div>

                    {isReplying && (
                      <form onSubmit={handleReplySubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Reply
                          </label>
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            rows={6}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            placeholder="Type your reply to the health worker..."
                            required
                          />
                        </div>
                        <div className="flex items-center space-x-3">
                          <MediumBtn
                            onClick={handleReplySubmit}
                            text="Send Reply"
                            loadingText="Sending..."
                            loading={replyMutation.isPending}
                            type="submit"
                            color="darkblue"
                            disabled={replyMutation.isPending}
                            icon={<FiSend className="mr-1" />}
                          />

                          <MediumBtn
                            onClick={() => setIsReplying(false)}
                            text="Cancel"
                            type="button"
                            color="gray"
                            disabled={replyMutation.isPending}
                            icon={<FaBan className="mr-1" />}
                          />
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
