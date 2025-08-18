"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  FaArrowLeft,
  FaPaperPlane,
  FaLock,
  FaUser,
  FaUserMd,
} from "react-icons/fa";

const MobileChatModal = ({
  showMobileChatModal,
  setShowMobileChatModal,
  selectedTicket,
  onSendReply,
  isLoading = false,
}) => {
  const [reply, setReply] = useState("");
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  // Scroll to bottom when messages change or modal opens
  useEffect(() => {
    if (showMobileChatModal && selectedTicket?.messages?.length > 0) {
      // Small delay to ensure DOM is updated
      setTimeout(scrollToBottom, 100);
    }
  }, [selectedTicket?.messages?.length, showMobileChatModal]);

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!reply.trim()) return;

    onSendReply(reply);
    setReply("");

    // Scroll to bottom after sending message
    setTimeout(scrollToBottom, 200);
  };

  if (!showMobileChatModal) return null;

  // Avatar component
  const Avatar = ({ sender }) => {
    return (
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
          sender === "client" ? "bg-carer-blue" : "bg-green-500"
        }`}
      >
        {sender === "client" ? <FaUser /> : <FaUserMd />}
      </div>
    );
  };

  return (
    <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div
        className={`bg-white w-full h-full shadow-2xl transform transition-transform duration-500 ease-in-out relative ${
          showMobileChatModal ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Modal Header */}
        <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-carer-blue to-blue-400 text-white">
          <div className="flex items-center">
            <button
              onClick={() => setShowMobileChatModal(false)}
              className="mr-3 p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <FaArrowLeft />
            </button>
            <div>
              <h3 className="font-bold text-lg">
                {selectedTicket?.subject || "Chat"}
              </h3>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium bg-white bg-opacity-20 ${
                  selectedTicket?.status === "opened"
                    ? "text-green-200"
                    : "text-gray-200"
                }`}
              >
                {selectedTicket?.status}
              </span>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div
          ref={messagesContainerRef}
          className="overflow-y-auto p-4 space-y-4 bg-gray-50"
          style={{
            height: "calc(100vh - 160px)", // Header height + input height
            paddingBottom: "20px",
          }}
        >
          {selectedTicket?.messages?.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-end space-x-2 ${
                msg.sender === "client" ? "justify-end" : "justify-start"
              }`}
            >
              {/* Avatar for admin messages (left side) */}
              {msg.sender === "admin" && <Avatar sender={msg.sender} />}

              <div
                className={`max-w-[75%] px-4 py-2 rounded-lg shadow text-sm ${
                  msg.sender === "client"
                    ? "bg-carer-blue text-white rounded-br-none"
                    : "bg-white text-dark-blue border rounded-bl-none"
                }`}
              >
                {msg.text}
                <div className="text-xs text-gray-400 mt-1 text-right">
                  {new Date(msg.time).toLocaleString()}
                </div>
              </div>

              {/* Avatar for client messages (right side) */}
              {msg.sender === "client" && <Avatar sender={msg.sender} />}
            </div>
          ))}
          {/* Invisible element at the bottom to scroll to */}
          <div ref={messagesEndRef} className="h-1" />
        </div>

        {/* Chat Input - Absolutely positioned at bottom */}
        {/* Chat Input - Absolutely positioned at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-black">
          {selectedTicket?.status === "opened" ? (
            selectedTicket?.hasAdminReply ? (
              <form className="flex gap-2" onSubmit={handleSendReply}>
                <input
                  type="text"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-carer-blue text-base bg-white"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-carer-blue text-white rounded-lg hover:bg-haven-blue flex items-center justify-center disabled:opacity-50"
                  disabled={!reply.trim() || isLoading}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <FaPaperPlane />
                  )}
                </button>
              </form>
            ) : (
              <div className="flex items-center text-gray-400 text-base">
                <FaLock className="mr-2" />
                Waiting for admin response. You can reply once admin responds.
              </div>
            )
          ) : (
            <div className="flex items-center text-gray-400 text-base">
              <FaLock className="mr-2" />
              This ticket is closed. You cannot reply.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileChatModal;
