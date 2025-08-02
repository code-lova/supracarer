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
import { useQuery, useMutation } from "@tanstack/react-query";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import { MessageSkeleton } from "@components/core/skeleton/support";
import StatusPill from "@components/core/StatusPill";



const Support = () => {
  const [openMessageId, setOpenMessageId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 3;

  const {
    data,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["support"],
    queryFn: getUserSupportMessages,
    staleTime: 5 * 60 * 1000,
  });

  const tickets = Array.isArray(data?.tickets) ? data.tickets : [];

  console.log("messages", data)

  const mutation = useMutation({
    mutationFn: createNewSupport,
    onSuccess: () => {
      toast.success("Message sent successfully!");
      refetch();
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

  const getStatusColor = (status = "") =>
    status.toLowerCase() === "pending"
      ? "bg-yellow-100 border-yellow-400"
      : "bg-green-100 border-green-400";

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

  return (
    <div className="pageContainer">
      <div className="w-full h-full xl:h-[669px] bg-white rounded-3xl shadow-md px-5 py-6 md:col-span-2">
        <h2 className="text-xl font-bold text-tranquil-teal mb-4">
          Having Concerns? Create a Ticket
        </h2>
        <h3 className="text-haven-blue text-xs tracking-wide font-bold">Check your email inbox for replies...</h3>

        <Formik
          initialValues={{ subject: "", message: "" }}
          validationSchema={SupportMessageSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-6 py-4">
              {/* Subject Dropdown */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subject
                </label>
                <Field as="select" name="subject" className="login-form-input">
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
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              {/* Message Box */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <Field
                  as="textarea"
                  name="message"
                  rows="5"
                  placeholder="Type your message..."
                  className="login-form-input"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              <MediumBtn
                text="Create Ticket"
                color="darkblue"
                loading={mutation.isPending}
                loadingText="Creating Ticket..."
                type="submit"
              />
            </Form>
          )}
        </Formik>

        {/* === Chat-style Message List Below Form === */}
        <div className="max-h-[250px] xl:h-[190px] overflow-x-auto space-y-3 mt-4 xl:mt-1 pb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Your Recent Messages
            </h3>

            <div className="space-x-2">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`px-3 py-2 text-sm rounded-md border ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-tranquil-teal text-white hover:bg-teal-700"
                }`}
              >
                <GrCaretPrevious />
              </button>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 text-sm rounded-md border ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-tranquil-teal text-white hover:bg-teal-700"
                }`}
              >
                <GrCaretNext />
              </button>
            </div>
          </div>

          {isLoading ? (
            <MessageSkeleton />
          ) : paginatedMessages.length === 0 ? (
            <p className="text-gray-500 text-sm">No support messages found.</p>
          ) : (
            paginatedMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() =>
                  setOpenMessageId(openMessageId === msg.id ? null : msg.id)
                } // ✅ Toggle open/close
                className={`cursor-pointer rounded-xl px-4 py-3 border shadow-md transition-all duration-200 ${getStatusColor(
                  msg.status
                )}`}
              >
                {/* Chat-style Header */}
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-800">{msg.subject}</p>
                  
                  <StatusPill status={msg.status}/>
                </div>

                {/* Chat-style Body (conditionally shown) */}
                {openMessageId === msg.id && (
                  <div className="mt-3 text-gray-700 text-sm">
                    {msg.message}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Support;
