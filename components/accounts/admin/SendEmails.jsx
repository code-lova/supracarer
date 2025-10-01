"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  FiUsers,
  FiUser,
  FiSend,
  FiSearch,
  FiTarget,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { FaEnvelope, FaUserMd, FaUsers } from "react-icons/fa";
import { fetchAllUsers } from "@service/request/admin/user";
import { sendEmail } from "@service/request/admin/email";
import toast from "react-hot-toast";
import { MediumBtn } from "@components/core/button";
import EmptyState from "@components/core/EmptyState";
import ErrorState from "@components/core/ErrorState";
import { emailCategories } from "@constants";
import LoadingStateUI from "@components/core/loading";

const SendEmails = () => {
  // Form states
  const [emailType, setEmailType] = useState("single"); // single, bulk
  const [recipientType, setRecipientType] = useState("client"); // client, healthworker, all
  const [selectedUser, setSelectedUser] = useState(null);
  const [emailCategory, setEmailCategory] = useState("general");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all users for selection
  const {
    data: usersData,
    isLoading: isLoadingUsers,
    isError: isUsersError,
    error: usersError,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: () => fetchAllUsers(),
    staleTime: 60 * 1000, // 5 minutes
  });

  // Send email mutation
  const sendEmailMutation = useMutation({
    mutationFn: sendEmail,
    onSuccess: (data) => {
      toast.success(
        `Email sent successfully to ${
          data?.email_summary?.total_recipients || 1
        } recipient(s)!`
      );
      // Reset selected user
      setSelectedUser(null);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send email");
    },
  });

  // Get users from API response
  const allUsers =
    usersData?.users?.filter((user) => user.role !== "admin") || [];

  // Auto-populate message and subject when category changes
  useEffect(() => {
    const selectedCategory = emailCategories.find(
      (cat) => cat.value === emailCategory
    );
    if (selectedCategory) {
      if (selectedCategory.template) {
        setMessage(selectedCategory.template);
      }
      if (selectedCategory.subjectSuggestion && !subject.trim()) {
        setSubject(selectedCategory.subjectSuggestion);
      }
    }
  }, [emailCategory]);

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return allUsers;
    return allUsers.filter(
      (user) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allUsers, searchTerm]);

  // Get recipient count for bulk emails
  const getRecipientCount = () => {
    if (emailType === "single") return selectedUser ? 1 : 0;

    if (recipientType === "all") return allUsers.length;

    return allUsers.filter((user) => user.role === recipientType).length;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!subject.trim() || !message.trim()) {
      toast.error("Please fill in both subject and message");
      return;
    }

    if (emailType === "single" && !selectedUser) {
      toast.error("Please select a user to send email to");
      return;
    }

    // Get selected category details for backend template formatting
    const selectedCategory = emailCategories.find(
      (cat) => cat.value === emailCategory
    );

    const emailData = {
      type: emailType,
      category: emailCategory,
      subject: subject.trim(),
      message: message.trim(),
      // Send template metadata to backend for proper formatting
      template_info: {
        category_label: selectedCategory?.label,
        is_template: true,
        format_as_html: true,
        include_branding: true,
        use_professional_layout: true,
      },
      ...(emailType === "single"
        ? { user_id: selectedUser.uuid }
        : { recipient_type: recipientType }),
    };

    sendEmailMutation.mutate(emailData);
  };

  // Get category details
  const getCategoryDetails = (categoryValue) => {
    return (
      emailCategories.find((cat) => cat.value === categoryValue) ||
      emailCategories[0]
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <FaEnvelope className="w-6 h-6 mr-3 text-blue-600" />
            Send Emails
          </h1>
          <p className="text-gray-600 mt-1">
            Send personalized emails to individual users or bulk emails to user
            groups
          </p>
        </div>

        <div className="flex items-center gap-3">
          {!isLoadingUsers && (
            <>
              <div className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
                {allUsers.length} Total Users
              </div>
              <div className="px-3 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                {allUsers.filter((u) => u.role === "client").length} Clients
              </div>
              <div className="px-3 py-2 bg-purple-100 text-purple-800 rounded-lg text-sm font-medium">
                {allUsers.filter((u) => u.role === "healthworker").length}{" "}
                Health Workers
              </div>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Email Composition Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Compose Email
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Email Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setEmailType("single")}
                    className={`flex items-center justify-center p-4 border-2 rounded-lg transition-colors ${
                      emailType === "single"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <FiUser className="w-5 h-5 mr-2" />
                    <span className="font-medium">Single User</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEmailType("bulk")}
                    className={`flex items-center justify-center p-4 border-2 rounded-lg transition-colors ${
                      emailType === "bulk"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <FiUsers className="w-5 h-5 mr-2" />
                    <span className="font-medium">Bulk Email</span>
                  </button>
                </div>
              </div>

              {/* Recipient Selection */}
              {emailType === "bulk" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Target Audience
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setRecipientType("client")}
                      className={`flex flex-col items-center p-3 border-2 rounded-lg transition-colors ${
                        recipientType === "client"
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <FiUser className="w-5 h-5 mb-1" />
                      <span className="text-sm font-medium">Clients</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRecipientType("healthworker")}
                      className={`flex flex-col items-center p-3 border-2 rounded-lg transition-colors ${
                        recipientType === "healthworker"
                          ? "border-purple-500 bg-purple-50 text-purple-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <FaUserMd className="w-5 h-5 mb-1" />
                      <span className="text-sm font-medium">
                        Health Workers
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRecipientType("all")}
                      className={`flex flex-col items-center p-3 border-2 rounded-lg transition-colors ${
                        recipientType === "all"
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <FaUsers className="w-5 h-5 mb-1" />
                      <span className="text-sm font-medium">All Users</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Email Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Email Category
                </label>
                <select
                  value={emailCategory}
                  onChange={(e) => setEmailCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {emailCategories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-blue-600 mt-1">
                  💡 Selecting a category will auto-populate professional email
                  template and subject
                </p>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email subject..."
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={12}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Compose your email message..."
                  required
                />
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-500">
                    📝 Template provided - customize as needed. Use [Name],
                    [Date], [Time] placeholders.
                  </p>
                  <p className="text-xs text-gray-500">
                    {message.length}/2000 characters
                  </p>
                </div>
              </div>

              {/* Recipients Summary */}
              {(emailType === "bulk" || selectedUser) && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <FiTarget className="w-5 h-5 text-blue-600" />
                    <h3 className="font-medium text-blue-900">Email Summary</h3>
                  </div>
                  <div className="space-y-1 text-sm text-blue-800">
                    <p>
                      <strong>Category:</strong>{" "}
                      {getCategoryDetails(emailCategory).label}
                    </p>
                    <p>
                      <strong>Recipients:</strong> {getRecipientCount()}{" "}
                      {emailType === "single" ? "user" : "users"}
                    </p>
                    {emailType === "single" && selectedUser && (
                      <p>
                        <strong>To:</strong> {selectedUser.name} (
                        {selectedUser.email})
                      </p>
                    )}
                    {emailType === "bulk" && (
                      <p>
                        <strong>Target:</strong>{" "}
                        {recipientType === "all"
                          ? "All Users"
                          : recipientType === "client"
                          ? "Clients Only"
                          : "Health Workers Only"}
                      </p>
                    )}
                    <p className="text-xs text-blue-600 mt-2 italic">
                      ✨ Email will be sent with professional HTML formatting,
                      SupraCarer branding, and responsive design
                    </p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end">
                <MediumBtn
                  onClick={handleSubmit}
                  text="Send Email"
                  loading={sendEmailMutation.isPending}
                  loadingText="Sending Email..."
                  type="submit"
                  color="darkblue"
                  disabled={
                    sendEmailMutation.isPending || getRecipientCount() === 0
                  }
                  icon={<FiSend className="mr-2" />}
                />
              </div>
            </form>
          </div>
        </div>

        {/* User Selection Panel */}
        <div className="lg:col-span-1">
          {emailType === "single" && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Select User
                </h3>
                <p className="text-xs text-gray-500">
                  Click to select a user, click again to unselect
                </p>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Selection Status */}
              {!isLoadingUsers && !isUsersError && (
                <div className="mb-3">
                  {selectedUser ? (
                    <div className="flex items-center text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-2">
                      <FiCheckCircle className="w-4 h-4 mr-2" />
                      <span className="font-medium">Selected:</span>
                      <span className="ml-1">{selectedUser.name}</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-lg p-2">
                      <FiUser className="w-4 h-4 mr-2" />
                      <span>No user selected</span>
                    </div>
                  )}
                </div>
              )}

              {/* Users List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {isLoadingUsers ? (
                  <div className="text-center py-8">
                    <LoadingStateUI />
                  </div>
                ) : isUsersError ? (
                  <ErrorState
                    title="Failed to load users"
                    error={usersError}
                    onAction={refetchUsers}
                    className="py-8"
                  />
                ) : filteredUsers.length === 0 ? (
                  <EmptyState
                    icon={FiUsers}
                    title="No users found"
                    description={
                      searchTerm
                        ? "Try adjusting your search terms."
                        : "No users available."
                    }
                    className="py-8"
                  />
                ) : (
                  filteredUsers.map((user) => (
                    <button
                      key={user.uuid}
                      type="button"
                      onClick={() => {
                        // Toggle selection: if user is already selected, unselect them
                        if (selectedUser?.uuid === user.uuid) {
                          setSelectedUser(null);
                        } else {
                          setSelectedUser(user);
                        }
                      }}
                      className={`w-full flex items-center space-x-3 p-3 border rounded-lg transition-colors text-left ${
                        selectedUser?.uuid === user.uuid
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {user.image ? (
                          <img
                            src={user.image}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <FiUser className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${
                            user.role === "client"
                              ? "bg-green-100 text-green-800"
                              : user.role === "healthworker"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {user.role === "healthworker"
                            ? "Health Worker"
                            : "Client"}
                        </span>
                      </div>
                      {selectedUser?.uuid === user.uuid && (
                        <FiCheckCircle className="w-5 h-5 text-blue-600" />
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Bulk Email Info Panel */}
          {emailType === "bulk" && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Bulk Email Info
              </h3>

              <div className="space-y-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {getRecipientCount()}
                  </div>
                  <p className="text-sm text-gray-600">Recipients Selected</p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Users:</span>
                    <span className="font-medium">{allUsers.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Clients:</span>
                    <span className="font-medium">
                      {allUsers.filter((u) => u.role === "client").length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Health Workers:</span>
                    <span className="font-medium">
                      {allUsers.filter((u) => u.role === "healthworker").length}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    <FiAlertCircle className="inline w-4 h-4 mr-1" />
                    Bulk emails will be sent to all users in the selected
                    category.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SendEmails;
