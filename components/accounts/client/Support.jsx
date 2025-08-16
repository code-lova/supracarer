"use client";
import React, { useState } from "react";
import {
  FaPlus,
  FaPaperPlane,
  FaLock,
  FaEnvelopeOpenText,
} from "react-icons/fa";

// Dummy data for tickets and messages (replace with API integration)
const initialTickets = [
  {
    id: 1,
    subject: "Payment Issue",
    status: "opened",
    lastMessage: "Admin: Please provide your transaction ID.",
    messages: [
      {
        sender: "client",
        text: "I was double charged for my booking.",
        time: "2025-08-15 10:00",
      },
      {
        sender: "admin",
        text: "Please provide your transaction ID.",
        time: "2025-08-15 10:05",
      },
    ],
  },
  {
    id: 2,
    subject: "Booking Cancellation",
    status: "closed",
    lastMessage: "Client: Thank you for your help!",
    messages: [
      {
        sender: "client",
        text: "Can I cancel my booking?",
        time: "2025-08-14 09:00",
      },
      {
        sender: "admin",
        text: "Yes, your booking has been cancelled.",
        time: "2025-08-14 09:10",
      },
      {
        sender: "client",
        text: "Thank you for your help!",
        time: "2025-08-14 09:15",
      },
    ],
  },
  {
    id: 3,
    subject: "Client Unavailability",
    status: "opened",
    lastMessage: "Admin: Please update your availability in settings.",
    messages: [
      {
        sender: "client",
        text: "I won’t be available this weekend.",
        time: "2025-08-13 15:30",
      },
      {
        sender: "admin",
        text: "Please update your availability in settings.",
        time: "2025-08-13 15:35",
      },
    ],
  },
  {
    id: 4,
    subject: "App Login Issue",
    status: "opened",
    lastMessage: "Client: I still can't log in.",
    messages: [
      {
        sender: "client",
        text: "I can't log in to the app.",
        time: "2025-08-12 08:20",
      },
      {
        sender: "admin",
        text: "Try resetting your password.",
        time: "2025-08-12 08:25",
      },
      {
        sender: "client",
        text: "I still can't log in.",
        time: "2025-08-12 08:30",
      },
    ],
  },
  {
    id: 5,
    subject: "Profile Update",
    status: "closed",
    lastMessage: "Admin: Your profile has been updated.",
    messages: [
      {
        sender: "client",
        text: "Can you update my phone number?",
        time: "2025-08-11 17:45",
      },
      {
        sender: "admin",
        text: "Your profile has been updated.",
        time: "2025-08-11 17:50",
      },
    ],
  },
  {
    id: 6,
    subject: "Refund Request",
    status: "opened",
    lastMessage: "Admin: We are processing your refund.",
    messages: [
      {
        sender: "client",
        text: "I’d like a refund for my last booking.",
        time: "2025-08-10 11:10",
      },
      {
        sender: "admin",
        text: "We are processing your refund.",
        time: "2025-08-10 11:15",
      },
    ],
  },
  {
    id: 7,
    subject: "Nurse Replacement",
    status: "opened",
    lastMessage: "Admin: We will assign a new nurse shortly.",
    messages: [
      {
        sender: "client",
        text: "The nurse didn’t show up.",
        time: "2025-08-09 19:00",
      },
      {
        sender: "admin",
        text: "We will assign a new nurse shortly.",
        time: "2025-08-09 19:10",
      },
    ],
  },
  {
    id: 8,
    subject: "App Notification Issue",
    status: "closed",
    lastMessage: "Admin: Please update the app to the latest version.",
    messages: [
      {
        sender: "client",
        text: "I’m not receiving notifications.",
        time: "2025-08-08 14:00",
      },
      {
        sender: "admin",
        text: "Please update the app to the latest version.",
        time: "2025-08-08 14:05",
      },
    ],
  },
  {
    id: 9,
    subject: "Service Request",
    status: "opened",
    lastMessage: "Admin: Please specify your preferred time.",
    messages: [
      {
        sender: "client",
        text: "Can I book a nurse for tomorrow evening?",
        time: "2025-08-07 20:30",
      },
      {
        sender: "admin",
        text: "Please specify your preferred time.",
        time: "2025-08-07 20:35",
      },
    ],
  },
  {
    id: 10,
    subject: "Wrong Charge",
    status: "closed",
    lastMessage: "Admin: The extra charge has been refunded.",
    messages: [
      {
        sender: "client",
        text: "I was charged more than expected.",
        time: "2025-08-06 16:00",
      },
      {
        sender: "admin",
        text: "The extra charge has been refunded.",
        time: "2025-08-06 16:10",
      },
    ],
  },
  {
    id: 11,
    subject: "Care Duration Extension",
    status: "opened",
    lastMessage: "Admin: Extension approved for 2 more hours.",
    messages: [
      {
        sender: "client",
        text: "Can I extend my current care duration?",
        time: "2025-08-05 09:00",
      },
      {
        sender: "admin",
        text: "Extension approved for 2 more hours.",
        time: "2025-08-05 09:05",
      },
    ],
  },
  {
    id: 12,
    subject: "Password Reset",
    status: "closed",
    lastMessage: "Client: Thank you, I can log in now.",
    messages: [
      {
        sender: "client",
        text: "I forgot my password.",
        time: "2025-08-04 07:00",
      },
      {
        sender: "admin",
        text: "We have reset your password. Please check your email.",
        time: "2025-08-04 07:05",
      },
      {
        sender: "client",
        text: "Thank you, I can log in now.",
        time: "2025-08-04 07:10",
      },
    ],
  },
  {
    id: 13,
    subject: "Shift Confirmation",
    status: "opened",
    lastMessage: "Admin: Your shift has been confirmed.",
    messages: [
      {
        sender: "client",
        text: "Has my shift for next week been confirmed?",
        time: "2025-08-03 10:00",
      },
      {
        sender: "admin",
        text: "Your shift has been confirmed.",
        time: "2025-08-03 10:05",
      },
    ],
  },
  {
    id: 14,
    subject: "Emergency Support",
    status: "opened",
    lastMessage: "Admin: We’ve dispatched a nurse to your location.",
    messages: [
      {
        sender: "client",
        text: "I need urgent assistance.",
        time: "2025-08-02 23:50",
      },
      {
        sender: "admin",
        text: "We’ve dispatched a nurse to your location.",
        time: "2025-08-02 23:55",
      },
    ],
  },
  {
    id: 15,
    subject: "Feedback Submission",
    status: "closed",
    lastMessage: "Admin: Thank you for your feedback.",
    messages: [
      {
        sender: "client",
        text: "I’d like to share some feedback.",
        time: "2025-08-01 18:00",
      },
      {
        sender: "admin",
        text: "Thank you for your feedback.",
        time: "2025-08-01 18:05",
      },
    ],
  },
];

const Support = () => {
  const [tickets, setTickets] = useState(initialTickets);
  const [selectedTicketId, setSelectedTicketId] = useState(
    tickets[0]?.id || null
  );
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [reply, setReply] = useState("");
  const [showMobileTicketList, setShowMobileTicketList] = useState(false);

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId);

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newSubject.trim() || !newMessage.trim()) return;
    const newTicket = {
      id: Date.now(),
      subject: newSubject,
      status: "opened",
      lastMessage: `Client: ${newMessage}`,
      messages: [
        { sender: "client", text: newMessage, time: new Date().toISOString() },
      ],
    };
    setTickets([newTicket, ...tickets]);
    setSelectedTicketId(newTicket.id);
    setShowNewTicketModal(false);
    setNewSubject("");
    setNewMessage("");
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!reply.trim()) return;
    const updatedTickets = tickets.map((t) => {
      if (t.id === selectedTicketId && t.status === "opened") {
        const newMsg = {
          sender: "client",
          text: reply,
          time: new Date().toISOString(),
        };
        return {
          ...t,
          lastMessage: `Client: ${reply}`,
          messages: [...t.messages, newMsg],
        };
      }
      return t;
    });
    setTickets(updatedTickets);
    setReply("");
  };

  return (
    <div className="pageContent">
      <div className="flex flex-col md:flex-row h-full overflow-y-auto xl:h-[690px] bg-white rounded-2xl shadow-lg overflow-hidden">
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
          <div className="flex-1 overflow-y-auto w-full md:h-auto h-[180px]">
            {tickets.length === 0 ? (
              <div className="p-6 text-center text-gray-400">
                <FaEnvelopeOpenText className="mx-auto text-3xl mb-2" />
                No support tickets yet.
              </div>
            ) : (
              <ul className="h-[150px] md:h-full overflow-y-auto w-full">
                {tickets.map((ticket) => (
                  <li
                    key={ticket.id}
                    className={`cursor-pointer px-4 py-3 border-b flex flex-col hover:bg-blue-50 transition-colors ${
                      selectedTicketId === ticket.id ? "bg-blue-100" : ""
                    }`}
                    onClick={() => setSelectedTicketId(ticket.id)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-dark-blue text-sm md:text-base">
                        {ticket.subject}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ml-2 ${
                          ticket.status === "opened"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 mt-1 truncate">
                      {ticket.lastMessage}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {/* Chat Panel */}
        <div className="flex-1 flex flex-col md:ml-0 ml-0">
          {/* Chat Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div>
              <h3 className="font-bold text-dark-blue text-sm md:text-lg">
                {selectedTicket?.subject || "Select a ticket"}
              </h3>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ml-2 ${
                  selectedTicket?.status === "opened"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {selectedTicket?.status}
              </span>
            </div>
          </div>
          {/* Chat Messages */}
          <div className="w-full h-[370px] lg:h-[600px] overflow-y-auto p-3 md:p-6 space-y-4 bg-gray-50">
            {selectedTicket?.messages?.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "client" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[90%] md:max-w-[70%] px-3 md:px-4 py-2 rounded-lg shadow text-xs md:text-sm ${
                    msg.sender === "client"
                      ? "bg-carer-blue text-white"
                      : "bg-white text-dark-blue border"
                  }`}
                >
                  {msg.text}
                  <div className="text-xs text-gray-300 mt-1 text-right">
                    {new Date(msg.time).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Chat Input */}
          <div className="p-3 md:p-4 border-t bg-white">
            {selectedTicket?.status === "opened" ? (
              <form
                className="flex flex-col md:flex-row gap-2"
                onSubmit={handleSendReply}
              >
                <input
                  type="text"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-carer-blue text-xs md:text-base"
                  disabled={false}
                />
                <button
                  type="submit"
                  className="px-5 py-2 bg-carer-blue text-white rounded-lg hover:bg-haven-blue flex items-center justify-center text-xs md:text-base"
                  disabled={!reply.trim()}
                >
                  <FaPaperPlane />
                </button>
              </form>
            ) : (
              <div className="flex items-center text-gray-400 text-xs md:text-base">
                <FaLock className="mr-2" />
                This ticket is closed. You cannot reply.
              </div>
            )}
          </div>
        </div>
        {/* New Ticket Modal */}
        {showNewTicketModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6">
              <h2 className="text-xl font-bold mb-4 text-dark-blue">
                Create Support Ticket
              </h2>
              <form onSubmit={handleCreateTicket}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-carer-blue text-xs md:text-base"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-carer-blue text-xs md:text-base"
                    required
                  />
                </div>
                <div className="flex space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowNewTicketModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-xs md:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-carer-blue text-white rounded-lg hover:bg-haven-blue text-xs md:text-base"
                  >
                    Create Ticket
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Support;
