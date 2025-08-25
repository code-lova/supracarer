import React, { useState, useRef } from "react";
import {
  FaBars,
  FaBell,
  FaComments,
  FaChevronDown,
  FaSearch,
} from "react-icons/fa";

const notifications = [
  {
    id: 1,
    text: "New user registered",
    image: "https://via.placeholder.com/32",
  },
  {
    id: 2,
    text: "Booking request received",
    image: "https://via.placeholder.com/32",
  },
];
const tickets = [
  { id: 1, subject: "Password reset", image: "https://via.placeholder.com/32" },
  { id: 2, subject: "Account issue", image: "https://via.placeholder.com/32" },
];

export default function Navbar({ onMenuClick }) {
  const [showBell, setShowBell] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Simple click outside to close dropdowns
  const bellRef = useRef();
  const chatRef = useRef();
  const profileRef = useRef();

  React.useEffect(() => {
    function handleClick(e) {
      if (bellRef.current && !bellRef.current.contains(e.target))
        setShowBell(false);
      if (chatRef.current && !chatRef.current.contains(e.target))
        setShowChat(false);
      if (profileRef.current && !profileRef.current.contains(e.target))
        setShowProfile(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="w-full bg-white shadow flex items-center justify-between px-4 py-3">
      {/* Left: Hamburger (mobile) + Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="p-2 md:hidden"
        >
          <FaBars size={24} className="text-haven-blue" />
        </button>
        <div className="hidden lg:block">
          <span className="font-bold text-md text-haven-blue">Admin Panel</span>
        </div>

        <div className="hidden md:block ml-2">
          <div className="relative w-72">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FaSearch size={16} />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 w-full rounded-full border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-haven-blue transition"
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
            />
          </div>
        </div>
      </div>

      {/* Center/Right: Bell, Chat, Profile */}
      <div className="flex items-center gap-4">
        {/* Bell Icon */}
        <div className="relative" ref={bellRef}>
          <button
            onClick={() => setShowBell((v) => !v)}
            className="p-2 bg-light-blue-bg rounded-md relative"
            aria-label="Notifications"
          >
            <FaBell size={20} className="text-haven-blue" />
            {/* Notification dot */}
            <span className="absolute top-1 right-2 w-2.5 h-2.5 bg-danger-red rounded-full border-2 border-white"></span>
          </button>
          {showBell && (
            <div className="absolute right-0 mt-2 w-64 bg-white text-haven-blue shadow-lg rounded z-50">
              <div className="p-3 border-b font-semibold">Notifications</div>
              <ul>
                {notifications.map((n) => (
                  <li
                    key={n.id}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50"
                  >
                    <img
                      src={n.image}
                      alt="notif"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm">{n.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* Chat Icon */}
        <div className="relative" ref={chatRef}>
          <button
            onClick={() => setShowChat((v) => !v)}
            className="p-2 bg-light-blue-bg rounded-md relative"
            aria-label="Tickets"
          >
            <FaComments size={20} className="text-haven-blue" />
            {/* Notification dot */}
            <span className="absolute top-1 right-2 w-2.5 h-2.5 bg-danger-red rounded-full border-2 border-white"></span>
          </button>
          {showChat && (
            <div className="absolute right-0 mt-2 w-64 bg-white text-haven-blue shadow-lg rounded z-50">
              <div className="p-3 border-b font-semibold">Ticket Requests</div>
              <ul>
                {tickets.map((t) => (
                  <li
                    key={t.id}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50"
                  >
                    <img
                      src={t.image}
                      alt="ticket"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm">{t.subject}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfile((v) => !v)}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full"
            aria-label="Profile"
          >
            <img
              src="https://media.istockphoto.com/id/1078140842/photo/portrait-of-successful-male-high-school-teacher.jpg?s=612x612&w=0&k=20&c=J2uaW3eihYm72aJlqrd1LKuWgEaNpEJaqNTRM7g9oI4="
              alt="admin"
              className="w-8 h-8 rounded-full"
            />
            <FaChevronDown size={16} />
          </button>
          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-haven-blue shadow-lg rounded z-50">
              <div className="p-3 border-b font-semibold">Admin Name</div>
              <ul>
                <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                  Profile
                </li>
                <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                  Settings
                </li>
                <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-danger-red">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
