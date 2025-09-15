"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import { MediumBtn } from "@components/core/button";
import { supportSubjects } from "@constants";
import { SupportMessageSchema } from "@schema/healthworker/support";
import {
  createNewSupport,
  getUserSupportMessages,
} from "@service/request/healthworker/support";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import { MessageSkeleton } from "@components/core/skeleton/support";
import StatusPill from "@components/core/StatusPill";
import EmptyState from "@components/core/EmptyState";
import ErrorState from "@components/core/ErrorState";
import { FaPlus } from "react-icons/fa";
import { IoIosChatboxes } from "react-icons/io";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import DateFormatter from "@components/core/DateFormatter";
import WordCountTextarea from "@components/core/WordCountTextarea";

const Support = () => {
  const [openMessageId, setOpenMessageId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 4;
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["support"],
    queryFn: getUserSupportMessages,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  const tickets = Array.isArray(data?.tickets) ? data.tickets : [];

  const mutation = useMutation({
    mutationFn: createNewSupport,
    onSuccess: () => {
      toast.success("Message sent successfully!");
      queryClient.invalidateQueries(["support"]);
    },
    onError: (error) => {
      toast.error(error.message || "Failded to create ticket");
    },
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("Support Form Data: ", values);
    mutation.mutate(values);
    resetForm();
  };

  const totalPages = Math.ceil(tickets.length / messagesPerPage);

  const paginatedMessages = tickets.slice(
    (currentPage - 1) * messagesPerPage,
    currentPage * messagesPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Show error state only for server errors, not for 404 errors
  if (error && error.status >= 500) {
    return (
      <div className="pageContainer">
        <div className="w-full h-full xl:h-[669px] bg-white rounded-3xl shadow-md px-6 py-8 md:col-span-2">
          <ErrorState
            title="Failed to load support messages"
            description={
              error.message ||
              "Something went wrong while fetching your support tickets."
            }
            onAction={refetch}
            icon={IoIosChatboxes}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="pageContainer">
      <div className="w-full h-full xl:h-[669px] bg-white rounded-3xl shadow-md px-6 py-8 md:col-span-2">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-tranquil-teal mb-2">
            Support Center
          </h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-haven-blue rounded-full animate-pulse"></div>
            <p className="text-haven-blue text-sm font-medium">
              Check your email inbox for replies
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create Ticket Section */}
          <div className="bg-gradient-to-br from-tranquil-teal/5 to-haven-blue/5 rounded-2xl p-6 border border-tranquil-teal/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-tranquil-teal rounded-xl flex items-center justify-center">
                <FaPlus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Create New Ticket
                </h3>
                <p className="text-sm text-gray-600">
                  Get help with your concerns
                </p>
              </div>
            </div>

            <Formik
              initialValues={{ subject: "", message: "" }}
              validationSchema={SupportMessageSchema}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue }) => (
                <Form className="space-y-6">
                  {/* Subject Dropdown */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Subject
                    </label>
                    <Field
                      as="select"
                      name="subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-tranquil-teal focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select a subject</option>
                      {supportSubjects.map((subject, index) => (
                        <option key={index} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="subject"
                      component="div"
                      className="text-xs text-red-500"
                    />
                  </div>

                  {/* Message Box */}
                  <div>
                    <WordCountTextarea
                      name="message"
                      label="Message"
                      value={values.message}
                      onChange={(text) => setFieldValue("message", text)}
                      maxWords={50}
                      rows={4}
                      placeholder="Describe your issue or concern in detail..."
                    />
                  </div>

                  <MediumBtn
                    text="Create Ticket"
                    color="darkblue"
                    loading={mutation.isPending}
                    loadingText="Creating Ticket..."
                    type="submit"
                    className="w-full"
                  />
                </Form>
              )}
            </Formik>
          </div>

          {/* Messages Section */}
          <div className="bg-gradient-to-br from-gray-50/80 to-tranquil-teal/5 rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-haven-blue rounded-xl flex items-center justify-center">
                  <IoIosChatboxes className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Your Messages
                  </h3>
                  <p className="text-sm text-gray-600">
                    {tickets.length} total tickets
                  </p>
                </div>
              </div>

              {totalPages > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-200 ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                        : "bg-white text-tranquil-teal hover:bg-tranquil-teal hover:text-white border-tranquil-teal shadow-sm"
                    }`}
                  >
                    <GrCaretPrevious className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-gray-600 px-3 py-2 bg-white rounded-lg border border-gray-200 min-w-[60px] text-center">
                    {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-200 ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                        : "bg-white text-tranquil-teal hover:bg-tranquil-teal hover:text-white border-tranquil-teal shadow-sm"
                    }`}
                  >
                    <GrCaretNext className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="max-h-[400px] overflow-y-auto space-y-3 custom-scrollbar">
              {isLoading ? (
                <MessageSkeleton />
              ) : paginatedMessages.length === 0 ? (
                <EmptyState
                  icon={IoChatbubbleEllipsesSharp}
                  title="No support messages yet"
                  description="Create your first ticket to get help with any concerns or issues you may have."
                />
              ) : (
                paginatedMessages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() =>
                      setOpenMessageId(openMessageId === msg.id ? null : msg.id)
                    }
                    className={`cursor-pointer rounded-xl p-4 border transition-all duration-200 hover:shadow-md ${
                      msg.status?.toLowerCase() === "pending"
                        ? "bg-amber-50 border-amber-200 hover:border-amber-300"
                        : "bg-emerald-50 border-emerald-200 hover:border-emerald-300"
                    } ${
                      openMessageId === msg.id
                        ? "ring-2 ring-tranquil-teal/20"
                        : ""
                    }`}
                  >
                    {/* Message Header */}
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 truncate text-sm">
                          {msg.subject}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          <DateFormatter
                            date={msg.created_at}
                            format="datetime"
                          />
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusPill status={msg.status} />
                        <svg
                          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                            openMessageId === msg.id ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Message Body */}
                    {openMessageId === msg.id && (
                      <div className="mt-4 pt-3 border-t border-gray-200">
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {msg.message}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
