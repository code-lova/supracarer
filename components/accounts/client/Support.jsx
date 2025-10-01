"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  FaPlus,
  FaPaperPlane,
  FaLock,
  FaEnvelopeOpenText,
  FaUser,
  FaUserMd,
} from "react-icons/fa";
import SupportTicketModal from "./supportUI-kit/SupportTicketModal";
import MobileChatModal from "./supportUI-kit/MobileChatModal";
import {
  createSupportTicket,
  getSupportTicketAndMessages,
  sendSupportTicketReply,
} from "@service/request/client/ticket";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createSupportTicketSchema } from "@schema/client/ticket";
import toast from "react-hot-toast";
import { IoIosChatboxes } from "react-icons/io";
import DateFormatter from "@components/core/DateFormatter";

const Support = () => {
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [reply, setReply] = useState("");
  const [showMobileChatModal, setShowMobileChatModal] = useState(false);

  // Refs for desktop chat auto-scroll
  const messagesEndRef = useRef(null);
  const desktopMessagesContainerRef = useRef(null);
  const queryClient = useQueryClient();

  // Fetch support tickets
  const {
    data: ticketsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["supportTickets"],
    queryFn: getSupportTicketAndMessages,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const tickets = ticketsData?.data || [];
  const selectedTicket = tickets.find((t) => t.id === selectedTicketId);

  // Transform ticket data to include the initial message and format messages properly
  const getFormattedSelectedTicket = () => {
    if (!selectedTicket) return null;

    // Create the initial message from the ticket creation
    const initialMessage = {
      id: `initial-${selectedTicket.id}`,
      sender: "client",
      text: selectedTicket.message,
      time: selectedTicket.created_at,
    };

    // Transform the messages from the API format
    const formattedMessages =
      selectedTicket.messages?.map((msg) => ({
        id: msg.uuid,
        sender: msg.sender_type === "admin" ? "admin" : "client",
        text: msg.message,
        time: msg.created_at,
      })) || [];

    // Combine initial message with subsequent messages
    const allMessages = [initialMessage, ...formattedMessages];

    return {
      ...selectedTicket,
      messages: allMessages,
      // Check if admin has replied (if there are any admin messages)
      hasAdminReply: formattedMessages.some((msg) => msg.sender === "admin"),
      status:
        selectedTicket.status?.toLowerCase() === "open" ? "opened" : "closed",
    };
  };

  const formattedSelectedTicket = getFormattedSelectedTicket();

  // Set first ticket as selected when data loads
  useEffect(() => {
    if (tickets.length > 0 && !selectedTicketId) {
      setSelectedTicketId(tickets[0].id);
    }
  }, [tickets, selectedTicketId]);

  // Create support ticket mutation
  const createTicketMutation = useMutation({
    mutationFn: createSupportTicket,
    onSuccess: (data) => {
      toast.success("Support ticket created successfully!");
      queryClient.invalidateQueries(["supportTickets"]);
      setSelectedTicketId(data.data.id);
      setShowNewTicketModal(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create support ticket");
    },
  });

  // Send reply mutation
  const sendReplyMutation = useMutation({
    mutationFn: ({ ticketId, message }) =>
      sendSupportTicketReply(ticketId, message),
    onSuccess: () => {
      queryClient.invalidateQueries(["supportTickets"]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send reply");
    },
  }); // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  // Scroll to bottom when messages change or ticket is selected (desktop)
  useEffect(() => {
    if (formattedSelectedTicket?.messages?.length > 0) {
      // Small delay to ensure DOM is updated
      setTimeout(scrollToBottom, 100);
    }
  }, [formattedSelectedTicket?.messages?.length, selectedTicketId]);

  const handleCreateTicket = (values) => {
    createTicketMutation.mutate(values);
  };

  const handleSendReply = (replyText) => {
    if (!selectedTicketId || !replyText.trim()) return;

    sendReplyMutation.mutate({
      ticketId: selectedTicketId,
      message: replyText.trim(),
    });
  };

  const handleDesktopSendReply = (e) => {
    e.preventDefault();
    if (!reply.trim()) return;
    handleSendReply(reply);
    setReply("");

    // Scroll to bottom after sending message
    setTimeout(scrollToBottom, 200);
  };

  // Avatar component for desktop chat
  const Avatar = ({ sender }) => {
    return (
      <div
        className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-white text-xs md:text-sm ${
          sender === "client" ? "bg-carer-blue" : "bg-green-500"
        }`}
      >
        {sender === "client" ? <FaUser /> : <FaUserMd />}
      </div>
    );
  };

  return (
    <div className="pageContent">
      {/* Header Section */}
      <div className="mb-8 mt-3">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-haven-blue to-carer-blue rounded-xl flex items-center justify-center shadow-lg">
            <IoIosChatboxes className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Client Support</h1>
            <p className="text-gray-600 text-sm">
              Ask your questions or report issues here we reply within 24 hours.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row overflow-y-auto xl:h-[690px] bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Mobile: Ticket List always at top, fixed height, scrollable */}
        <div className="w-full md:w-80 bg-gray-50 border-b md:border-b-0 md:border-r flex flex-col">
          <div className="flex items-center justify-between p-4 border-b w-full">
            <h2 className="text-lg font-bold text-dark-blue">
              Support Tickets
            </h2>
            <button
              className="bg-carer-blue text-white px-3 py-2 rounded-lg flex items-center hover:bg-haven-blue"
              onClick={() => setShowNewTicketModal(true)}
            >
              <FaPlus className="mr-1" /> New
            </button>
          </div>
          <div className="flex-1 overflow-y-auto w-full md:h-auto">
            {isLoading ? (
              <div className="p-6 text-center text-gray-400">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-carer-blue mx-auto mb-2"></div>
                Loading tickets...
              </div>
            ) : error ? (
              <div className="p-6 text-center text-red-500">
                <FaEnvelopeOpenText className="mx-auto text-3xl mb-2" />
                Error loading tickets: {error.message}
              </div>
            ) : tickets.length === 0 ? (
              <div className="p-6 text-center text-gray-400">
                <FaEnvelopeOpenText className="mx-auto text-3xl mb-2" />
                No support tickets yet.
              </div>
            ) : (
              <ul className="h-[80vh] md:h-full overflow-y-auto w-full">
                {tickets.map((ticket) => (
                  <li
                    key={ticket.id}
                    className={`cursor-pointer px-4 py-3 border-b flex flex-col hover:bg-blue-50 transition-colors ${
                      selectedTicketId === ticket.id ? "bg-blue-100" : ""
                    }`}
                    onClick={() => {
                      setSelectedTicketId(ticket.id);
                      setShowMobileChatModal(true);
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-dark-blue text-sm md:text-base">
                        {ticket.subject}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ml-2 ${
                          ticket.status?.toLowerCase() === "open"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 mt-1 truncate">
                      {ticket.messages?.length > 0
                        ? `${
                            ticket.messages[ticket.messages.length - 1]
                              .sender_type === "admin"
                              ? "Admin"
                              : "You"
                          }: ${
                            ticket.messages[ticket.messages.length - 1].message
                          }`
                        : `You: ${ticket.message}`}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {/* Chat Panel - Hidden on Mobile */}
        <div className="hidden md:flex flex-1 flex-col md:ml-0 ml-0">
          {/* Chat Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div>
              <h3 className="font-bold text-dark-blue text-sm md:text-lg">
                {formattedSelectedTicket?.subject || "Select a ticket"}
              </h3>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ml-2 ${
                  formattedSelectedTicket?.status === "opened"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {formattedSelectedTicket?.status}
              </span>
            </div>
          </div>
          {/* Chat Messages */}
          <div
            ref={desktopMessagesContainerRef}
            className="w-full h-[370px] lg:h-[600px] overflow-y-auto p-3 md:p-6 space-y-4 bg-gray-50"
          >
            {formattedSelectedTicket?.messages?.map((msg, idx) => (
              <div
                key={msg.id || idx}
                className={`flex items-end space-x-2 ${
                  msg.sender === "client" ? "justify-end" : "justify-start"
                }`}
              >
                {/* Avatar for admin messages (left side) */}
                {msg.sender === "admin" && <Avatar sender={msg.sender} />}

                <div
                  className={`max-w-[80%] md:max-w-[70%] px-3 md:px-4 py-2 rounded-lg shadow text-xs md:text-sm ${
                    msg.sender === "client"
                      ? "bg-carer-blue text-white rounded-br-none"
                      : "bg-white text-dark-blue border rounded-bl-none"
                  }`}
                >
                  {msg.text}
                  <div
                    className={`text-xs ${
                      msg.sender === "client"
                        ? "text-gray-200"
                        : "text-gray-500"
                    } mt-2 text-right`}
                  >
                    <DateFormatter date={msg.time} format="datetime" />
                  </div>
                </div>

                {/* Avatar for client messages (right side) */}
                {msg.sender === "client" && <Avatar sender={msg.sender} />}
              </div>
            ))}
            {/* Invisible element at the bottom to scroll to */}
            <div ref={messagesEndRef} className="h-1" />
          </div>
          {/* Chat Input */}
          <div className="p-3 md:p-4 border-t bg-white">
            {formattedSelectedTicket?.status === "opened" ? (
              formattedSelectedTicket?.hasAdminReply ? (
                <form
                  className="flex flex-col md:flex-row gap-2"
                  onSubmit={handleDesktopSendReply}
                >
                  <input
                    type="text"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-carer-blue text-xs md:text-base"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2 bg-carer-blue text-white rounded-lg hover:bg-haven-blue flex items-center justify-center text-xs md:text-base disabled:opacity-50"
                    disabled={!reply.trim() || sendReplyMutation.isPending}
                  >
                    {sendReplyMutation.isPending ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <FaPaperPlane />
                    )}
                  </button>
                </form>
              ) : (
                <div className="flex items-center text-gray-400 text-xs md:text-base">
                  <FaLock className="mr-2" />
                  Waiting for admin response. You can reply once admin responds
                  to your ticket.
                </div>
              )
            ) : (
              <div className="flex items-center text-gray-400 text-xs md:text-base">
                <FaLock className="mr-2" />
                This ticket is closed. You cannot reply.
              </div>
            )}
          </div>
        </div>

        {/* Modal Components */}
        <SupportTicketModal
          showNewTicketModal={showNewTicketModal}
          setShowNewTicketModal={setShowNewTicketModal}
          onCreateTicket={handleCreateTicket}
          isLoading={createTicketMutation.isPending}
          validationSchema={createSupportTicketSchema}
        />

        <MobileChatModal
          showMobileChatModal={showMobileChatModal}
          setShowMobileChatModal={setShowMobileChatModal}
          selectedTicket={formattedSelectedTicket}
          onSendReply={handleSendReply}
          isLoading={sendReplyMutation.isPending}
        />
      </div>
    </div>
  );
};

export default Support;
