import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaEdit, FaUserCircle, FaEnvelope, FaUserTag } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { countries, region as regions, religion, gender } from "@constants";
import TimeAgo from "@components/core/TimeAgo";
import DateFormatter from "@components/core/DateFormatter";
import Age from "@components/core/Age";
import { MediumBtn } from "@components/core/button";
import { FaUser } from "react-icons/fa";
import { userValidationSchema } from "@schema/admin";

export default function UserDetailsModal({
  user,
  open,
  onClose,
  onUpdate,
  isLoading,
  error,
}) {
  const [editMode, setEditMode] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setEditMode(false);
  }, [user, open]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!open || !user || !hasMounted) return null;


  // Initial values
  const initialValues = {
    name: user.name || "",
    email: user.email || "",
    role: user.role || "",
    practitioner: user.practitioner || "",
    phone: user.phone || "",
    gender: user.gender || "",
    country: user.country || "",
    region: user.region || "",
    address: user.address || "",
    about: user.about || "",
    two_factor_enabled: Boolean(user.two_factor_enabled),
    religion: user.religion || "",
  };

  return createPortal(
    <div className="fixed inset-0 z-[2000] flex items-end justify-end bg-black bg-opacity-40">
      <div className="bg-white rounded-l-xl shadow-2xl p-6 w-full max-w-md h-full overflow-y-auto relative animate-slidein-right">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          <FiX />
        </button>
        <div className="flex items-center gap-3 mb-6">
          <FaUserCircle className="text-haven-blue text-4xl" />
          <div>
            <h3 className="text-xl font-bold">User Details</h3>
            <span className="text-xs text-gray-400">ID: {user.id}</span>
          </div>
          <button
            className="ml-auto text-haven-blue hover:text-blue-700 p-2 rounded"
            onClick={() => setEditMode((v) => !v)}
            aria-label="Edit"
          >
            <FaEdit />
          </button>
        </div>
        {!editMode ? (
          <div className="space-y-5">
            <div className="flex flex-col items-center mb-6">
              {user.image ? (
                <img
                  src={user.image}
                  alt="User"
                  className="w-24 h-24 rounded-full shadow-lg mb-2"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                  <FaUserCircle className="text-5xl text-gray-400" />
                </div>
              )}
              <div className="text-xl font-bold text-haven-blue">
                {user.name}
              </div>
              <div className="text-sm text-gray-500">{user.email}</div>
              <div className="text-xs text-gray-400">ID: {user.id}</div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-slate-gray">
              <div>
                <span className="font-semibold">Role:</span> {user.role}
              </div>
              {user.role === "healthworker" && (
                <div>
                  <span className="font-semibold">Practitioner:</span>{" "}
                  {user.practitioner}
                </div>
              )}
              <div>
                <span className="font-semibold">Phone:</span> {user.phone}
              </div>
              <div>
                <span className="font-semibold">Gender:</span> {user.gender}
              </div>
              <div>
                <span className="font-semibold">Country:</span> {user.country}
              </div>
              <div>
                <span className="font-semibold">Region:</span> {user.region}
              </div>
              <div>
                <span className="font-semibold">Religion:</span> {user.religion}
              </div>
              <div>
                <span className="font-semibold">Date of Birth:</span>{" "}
                {user.date_of_birth}
              </div>
              {user.role === "healthworker" && (
                <div>
                  <span className="font-semibold">Working Hours:</span>{" "}
                  {user.working_hours}
                </div>
              )}
              <div>
                <span className="font-semibold">Address:</span> {user.address}
              </div>
              <div>
                <span className="font-semibold">About:</span> {user.about}
              </div>
              <div>
                <span className="font-semibold">Status:</span>{" "}
                {user.is_active === "1" ? "Active" : "Inactive"}
              </div>
              <div>
                <span className="font-semibold">Email Verified:</span>{" "}
                {user.email_verified_at ? "Yes" : "No"}
              </div>
              <div>
                <span className="font-semibold">Last Logged In:</span>{" "}
                <TimeAgo timestamp={user?.last_logged_in || new Date()} />
              </div>
              <div>
                <span className="font-semibold">Member Since:</span>{" "}
                <DateFormatter date={user.created_at} format="short" />
              </div>
              <div>
                <span className="font-semibold">Pofile Update:</span>{" "}
                <DateFormatter date={user.updated_at} format="short" />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 text-xs text-gray-500">
              <div>
                <span className="font-semibold">UUID:</span> {user.uuid}
              </div>
              <div>
                <span className="font-semibold">Image Public ID:</span>{" "}
                {user.image_public_id}
              </div>
              <div>
                <span className="font-semibold">Latitude:</span> {user.latitude}
              </div>
              <div>
                <span className="font-semibold">Longitude:</span>{" "}
                {user.longitude}
              </div>
              <div>
                <span className="font-semibold">2FA Enabled:</span>{" "}
                {user.two_factor_enabled ? "Yes" : "No"}
              </div>
              <div>
                <span className="font-semibold">2FA Code:</span>{" "}
                {user.two_factor_code}
              </div>
              <div>
                <span className="font-semibold">2FA Expires At:</span>{" "}
                {user.two_factor_expires_at}
              </div>
              <div>
                <span className="font-semibold">Email Verification Code:</span>{" "}
                {user.email_verification_code}
              </div>
              <div>
                <span className="font-semibold">
                  Email Verification Code Expires At:
                </span>{" "}
                {user.email_verification_code_expires_at}
              </div>
              <div>
                <span className="font-semibold">AGE:</span>{" "}
                <Age dateOfBirth={user.date_of_birth || "N/A"} />
              </div>
            </div>
          </div>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={userValidationSchema}
            onSubmit={(values) => {
              onUpdate(values);
            }}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                <div className="flex items-center gap-2">
                  <FaUserCircle className="text-gray-400 text-xl" />
                  <div className="w-full">
                    <label className="block text-xs font-medium mb-1">
                      Name
                    </label>
                    <Field
                      name="name"
                      className="border rounded px-3 py-2 w-full"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-gray-400 text-xl" />
                  <div className="w-full">
                    <label className="block text-xs font-medium mb-1">
                      Email
                    </label>
                    <Field
                      name="email"
                      className="border rounded px-3 py-2 w-full"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaUserTag className="text-gray-400 text-xl" />
                  <div className="w-full">
                    <label className="block text-xs font-medium mb-1">
                      Role
                    </label>
                    <Field
                      as="select"
                      name="role"
                      className="border rounded px-3 py-2 w-full"
                    >
                      <option value="">Select Role</option>
                      <option value="client">Client</option>
                      <option value="healthworker">Health Worker</option>
                      <option value="admin">Admin</option>
                    </Field>
                    <ErrorMessage
                      name="role"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <FaUserCircle className="text-gray-400 text-xl" />
                  <div className="w-full">
                    <label className="block text-xs font-medium mb-1">
                      Religion
                    </label>
                    <Field
                      as="select"
                      name="religion"
                      className="border rounded px-3 py-2 w-full"
                    >
                      <option value="">Select Religion</option>
                      {religion.map((rel) => (
                        <option key={rel} value={rel}>
                          {rel}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="religion"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>
                <ErrorMessage
                  name="region"
                  component="div"
                  className="text-red-500 text-xs"
                />
                {user.role === "healthworker" && (
                  <div className="flex items-center gap-2">
                    <FaUserCircle className="text-gray-400 text-xl" />
                    <div className="w-full">
                      <label className="block text-xs font-medium mb-1">
                        Practitioner
                      </label>
                      <Field
                        name="practitioner"
                        className="border rounded px-3 py-2 w-full"
                      />
                      <ErrorMessage
                        name="practitioner"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <FaUserCircle className="text-gray-400 text-xl" />
                  <div className="w-full">
                    <label className="block text-xs font-medium mb-1">
                      Phone
                    </label>
                    <Field
                      name="phone"
                      className="border rounded px-3 py-2 w-full"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaUserCircle className="text-gray-400 text-xl" />
                  <div className="w-full">
                    <label className="block text-xs font-medium mb-1">
                      Gender
                    </label>
                    <Field
                      as="select"
                      name="gender"
                      className="border rounded px-3 py-2 w-full"
                    >
                      <option value="">Select Gender</option>
                      {gender.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaUserCircle className="text-gray-400 text-xl" />
                  <div className="w-full">
                    <label className="block text-xs font-medium mb-1">
                      Country
                    </label>
                    <Field
                      as="select"
                      name="country"
                      className="border rounded px-3 py-2 w-full"
                    >
                      <option value="">Select Country</option>
                      {countries.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="country"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaUserCircle className="text-gray-400 text-xl" />
                  <div className="w-full">
                    <label className="block text-xs font-medium mb-1">
                      Region
                    </label>
                    <Field
                      as="select"
                      name="region"
                      className="border rounded px-3 py-2 w-full"
                    >
                      <option value="">Select Region</option>
                      {regions.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </Field>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaUserCircle className="text-gray-400 text-xl" />
                  <div className="w-full">
                    <label className="block text-xs font-medium mb-1">
                      Address
                    </label>
                    <Field
                      name="address"
                      className="border rounded px-3 py-2 w-full"
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaUserCircle className="text-gray-400 text-xl" />
                  <div className="w-full">
                    <label className="block text-xs font-medium mb-1">
                      About
                    </label>
                    <Field
                      as="textarea"
                      name="about"
                      className="border rounded px-3 py-2 w-full"
                    />
                    <ErrorMessage
                      name="about"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaUserCircle className="text-gray-400 text-xl" />
                  <div className="w-full">
                    <label className="block text-xs font-medium mb-1">
                      2FA Enabled
                    </label>
                    <Field
                      type="checkbox"
                      name="two_factor_enabled"
                      className="mr-2"
                    />
                  </div>
                </div>
                {error && (
                  <div className="text-red-500 text-xs">{error.message}</div>
                )}
                <div className="mt-4 flex items-center justify-center">
                  <MediumBtn
                    loading={(isSubmitting || isLoading) && !error}
                    loadingText="Updating..."
                    text="Update User"
                    color="darkblue"
                    icon={<FaUser className="mr-1" />}
                  />
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
      <style jsx global>{`
        @keyframes slidein-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slidein-right {
          animation: slidein-right 0.4s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
      `}</style>
    </div>,
    document.body
  );
}
