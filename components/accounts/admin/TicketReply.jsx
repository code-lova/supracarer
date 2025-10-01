"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FiArrowLeft,
  FiSend,
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiClock,
  FiToggleLeft,
  FiToggleRight,
  FiMessageSquare,
  FiHash,
} from "react-icons/fi";
import {
  FaTicketAlt,
  FaUserTie,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";
import {
  fetchSupportTicketById,
  replyTicketMessage,
} from "@service/request/admin/supportTicket";
import { MediumBtn } from "@components/core/button";
import StatusPill from "@components/core/StatusPill";
import TicketReplySkeleton from "@components/core/skeleton/TicketReplySkeleton";
import EmptyState from "@components/core/EmptyState";
import DateFormatter from "@components/core/DateFormatter";

const TicketReply = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ticketId = searchParams.get("id");
  const queryClient = useQueryClient();

  const [message, setMessage] = useState("");
  const [closeTicket, setCloseTicket] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const messagesEndRef = useRef(null);

  // Fetch ticket details
  const {
    data: ticketData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["supportTicket", ticketId],
    queryFn: () => fetchSupportTicketById(ticketId),
    enabled: !!ticketId,
    refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
  });

  const ticket = ticketData?.data; // Get ticket from API response

  // Check if ticket is closed
  const isTicketClosed = ticket?.status === "Closed";

  // Reply mutation
  const replyMutation = useMutation({
    mutationFn: ({ ticketId, message, closeTicket }) =>
      replyTicketMessage(ticketId, message, closeTicket),
    onSuccess: () => {
      setMessage("");
      // Refetch ticket data to get updated messages
      refetch();
      // Also invalidate the support tickets list
      queryClient.invalidateQueries(["supportTickets"]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to replying ticket message");
    },
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [ticket?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  // Handle reply submission
  const handleReply = (e) => {
    e.preventDefault();
    if (!message.trim() || !ticket) return;

    replyMutation.mutate({
      ticketId: ticket.uuid,
      message: message.trim(),
      closeTicket,
    });
  };

  // Handle back navigation
  const handleBack = () => {
    router.push("/admin/support-ticket");
  };

  if (isLoading) {
    return <TicketReplySkeleton />;
  }

  if (isError || !ticket) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <EmptyState
          icon={FaTicketAlt}
          title="Ticket Not Found"
          description={
            error?.message || "The requested ticket could not be found."
          }
          action={
            <MediumBtn
              text="Back to Tickets"
              onClick={handleBack}
              icon={<FiArrowLeft className="mr-2" />}
            />
          }
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-[89vh] bg-gray-50 overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 p-4 w-full fixed top-0 left-0 right-0 z-20">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors flex-shrink-0"
          >
            <FiArrowLeft className="mr-2" />
            Back
          </button>
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors flex-shrink-0"
          >
            <FaTicketAlt className="mr-2" />
            Ticket Info
          </button>
        </div>
        <div className="mt-3 min-w-0">
          <div className="flex items-center min-w-0">
            <FiHash className="text-gray-400 mr-1 text-sm flex-shrink-0" />
            <span className="font-mono text-sm text-blue-600 mr-3 truncate">
              {ticket.reference}
            </span>
            <StatusPill
              status={ticket.status}
              size="sm"
              customColors={{
                Open: "bg-green-100 text-green-800",
                Closed: "bg-gray-100 text-gray-800",
              }}
              className="flex-shrink-0"
            />
          </div>
          <h1 className="text-lg font-semibold text-gray-900 mt-2 truncate">
            {ticket.subject}
          </h1>
        </div>
      </div>

      {/* Mobile Spacer for fixed header */}
      <div className="lg:hidden h-20"></div>

      {/* Sidebar - Hidden on mobile unless toggled */}
      <div
        className={`
        ${showSidebar ? "block" : "hidden"} lg:block
        w-full lg:w-1/3 xl:w-1/4 bg-white border-r border-gray-200 flex flex-col
        fixed lg:static z-30 lg:z-auto h-screen lg:h-auto
        top-0 left-0 right-0 lg:right-auto
      `}
      >
        {/* Desktop Header */}
        <div className="hidden lg:block p-3 lg:p-6 border-b border-gray-200 flex-shrink-0">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Tickets
          </button>

          <div className="flex items-center mb-1">
            <FaTicketAlt className="text-blue-500 mr-3 text-xl" />
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                Ticket Details
              </h1>
              <div className="flex items-center mt-1">
                <FiHash className="text-gray-400 mr-1 text-sm" />
                <span className="font-mono text-sm text-blue-600">
                  {ticket.reference}
                </span>
                <StatusPill
                  status={ticket.status}
                  size="sm"
                  customColors={{
                    Open: "bg-green-100 text-green-800",
                    Closed: "bg-gray-100 text-gray-800",
                  }}
                  className="ml-3"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Close Button */}
        <div className="lg:hidden p-4 border-b border-gray-200 flex-shrink-0">
          <button
            onClick={() => setShowSidebar(false)}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Close Ticket Info
          </button>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0">
          {/* Ticket Subject */}
          <div className="p-2 lg:p-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Subject
            </h2>
            <p className="text-gray-700 leading-relaxed">{ticket.subject}</p>
          </div>

          {/* Client Information */}
          <div className="p-4 lg:p-5 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Client Information
            </h3>

            <div className="space-y-4">
              {/* Client Avatar & Name */}
              <div className="flex items-center space-x-3">
                {ticket.client?.image ? (
                  <img
                    src={ticket.client.image}
                    alt={ticket.client.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                    <FiUser className="text-white text-lg" />
                  </div>
                )}
                <div>
                  <div className="font-semibold text-gray-900">
                    {ticket.client?.name || "Unknown Client"}
                  </div>
                  <div className="text-sm text-gray-500">
                    {ticket.client?.country || "Unknown Location"}
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-2">
                {ticket.client?.email && (
                  <div className="flex items-center text-sm text-gray-600">
                    <FiMail className="mr-3 text-blue-500 flex-shrink-0" />
                    <span className="break-all">{ticket.client.email}</span>
                  </div>
                )}

                {ticket.client?.phone && (
                  <div className="flex items-center text-sm text-gray-600">
                    <FiPhone className="mr-3 text-green-500 flex-shrink-0" />
                    <span>{ticket.client.phone}</span>
                  </div>
                )}

                <div className="flex items-center text-sm text-gray-600">
                  <FiCalendar className="mr-3 text-purple-500 flex-shrink-0" />
                  <span>
                    Created:{" "}
                    <DateFormatter date={ticket.created_at} format="datetime" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Stats */}
          <div className="p-4 lg:px-4 py-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Conversation Statistics
            </h3>

            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className=" text-gray-600">Total Messages</span>
                <span className="font-semibold">
                  {ticket.conversation_stats?.total_messages || 0}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600">Admin Replies</span>
                <span className="font-semibold">
                  {ticket.conversation_stats?.admin_replies || 0}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600">Client Replies</span>
                <span className="font-semibold">
                  {ticket.conversation_stats?.client_replies || 0}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600">Last Activity</span>
                <span className="font-semibold">
                  {ticket.conversation_stats?.last_message_at ? (
                    <DateFormatter
                      date={ticket.conversation_stats.last_message_at}
                      format="datetime"
                    />
                  ) : (
                    "No activity"
                  )}
                </span>
              </div>

              {/* Priority Indicator */}
              <div className="pt-3 border-t border-gray-200">
                {ticket.conversation_stats?.awaiting_response === "admin" ? (
                  <div className="flex items-center text-orange-600 bg-orange-100 px-3 py-2 rounded-lg text-sm">
                    <FaExclamationCircle className="mr-2 flex-shrink-0" />
                    <span>Awaiting Your Reply</span>
                  </div>
                ) : (
                  <div className="flex items-center text-blue-600 bg-blue-100 px-3 py-2 rounded-lg text-sm">
                    <FiClock className="mr-2 flex-shrink-0" />
                    <span>Awaiting Client Response</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Chat */}
      <div className="flex-1 flex flex-col min-h-0 lg:mt-0 mt-0">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex-shrink-0 hidden lg:block">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center">
              <FiMessageSquare className="text-blue-500 mr-3 text-lg" />
              <h2 className="text-lg font-semibold text-gray-900">
                Conversation
              </h2>
            </div>

            {/* Close Ticket Toggle */}
            <div className="flex items-center space-x-3">
              {isTicketClosed ? (
                <div className="flex items-center text-gray-500 bg-gray-100 px-3 py-2 rounded-lg text-sm">
                  <FaCheckCircle className="mr-2" />
                  <span>Ticket is Closed</span>
                </div>
              ) : (
                <>
                  <label className="text-sm text-gray-600 whitespace-nowrap">
                    Close ticket with reply:
                  </label>
                  <button
                    onClick={() => setCloseTicket(!closeTicket)}
                    className={`flex items-center transition-colors ${
                      closeTicket ? "text-red-600" : "text-gray-400"
                    }`}
                  >
                    {closeTicket ? (
                      <FiToggleRight className="text-2xl" />
                    ) : (
                      <FiToggleLeft className="text-2xl" />
                    )}
                    <span className="ml-2 text-sm">
                      {closeTicket ? "Close" : "Keep Open"}
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-4 bg-gray-50 min-h-0 pb-20 lg:pb-4 pt-0 lg:pt-4">
          {/* Initial Client Message */}
          <div className="flex justify-start">
            <div className="max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-3 rounded-lg bg-blue-50 text-gray-900 border border-blue-200">
              <div className="flex items-center mb-1">
                <FiUser className="mr-2 text-sm flex-shrink-0 text-blue-600" />
                <span className="text-xs font-medium truncate text-blue-800">
                  {ticket.client?.name || "Unknown Client"} (Initial Message)
                </span>
              </div>
              <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                {ticket.message}
              </p>
              <div className="text-xs mt-2 text-blue-600">
                <DateFormatter date={ticket.created_at} format="datetime" />
              </div>
            </div>
          </div>

          {/* Conversation Messages */}
          {ticket.messages && ticket.messages.length > 0 ? (
            ticket.messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender?.role === "admin" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-3 rounded-lg ${
                    msg.sender?.role === "admin"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-900 border border-gray-200"
                  }`}
                >
                  <div className="flex items-center mb-1">
                    {msg.sender?.role === "admin" ? (
                      <FaUserTie className="mr-2 text-sm flex-shrink-0" />
                    ) : (
                      <FiUser className="mr-2 text-sm flex-shrink-0" />
                    )}
                    <span className="text-xs font-medium truncate">
                      {msg.sender?.name || "Unknown"}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {msg.message}
                  </p>
                  <div
                    className={`text-xs mt-2 ${
                      msg.sender?.role === "admin"
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    <DateFormatter date={msg.created_at} format="datetime" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              <FiMessageSquare className="mx-auto text-4xl mb-4" />
              <p>
                No replies yet. The conversation starts with the initial message
                above.
              </p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Reply Form */}
        <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0 fixed lg:static bottom-0 left-0 right-0 z-20 lg:z-auto">
          {isTicketClosed ? (
            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-center">
                <FaCheckCircle className="mx-auto text-gray-400 text-2xl mb-2" />
                <p className="text-gray-600 font-medium">
                  This ticket is closed
                </p>
                <p className="text-gray-500 text-sm">
                  To reply, reopen the ticket from the support tickets table
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleReply} className="flex items-center gap-3">
              <div className="flex-1 relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your reply here..."
                  rows={1}
                  className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white resize-none min-h-[48px] max-h-32 overflow-y-auto transition-all duration-200 placeholder-gray-500"
                  disabled={replyMutation.isPending}
                  style={{
                    height: "auto",
                    minHeight: "48px",
                  }}
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = `${Math.min(
                      e.target.scrollHeight,
                      128
                    )}px`;
                  }}
                />
                {/* Character counter or emoji button could go here */}
                <div className="absolute right-3 bottom-3 flex items-center space-x-1">
                  {message.trim() && (
                    <span className="text-xs text-gray-400">
                      {message.length}
                    </span>
                  )}
                </div>
              </div>

              {/* Send Button */}
              <div className="flex flex-col items-center">
                <button
                  type="submit"
                  disabled={!message.trim() || replyMutation.isPending}
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-105 active:scale-95
                    ${
                      message.trim() && !replyMutation.isPending
                        ? closeTicket
                          ? "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                          : "bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }
                  `}
                >
                  {replyMutation.isPending ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : closeTicket ? (
                    <FaCheckCircle className="w-5 h-5" />
                  ) : (
                    <FiSend className="w-5 h-5" />
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketReply;
