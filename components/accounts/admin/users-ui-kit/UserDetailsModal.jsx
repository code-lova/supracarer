import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    setEditMode(false);
  }, [user, open]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [open, onClose]);

  if (!open || !user) return null;

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

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[1000] transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        />
      </div>

      {/* Modal Panel */}
      <div
        className={`fixed top-0 right-0 z-[1001] h-full w-full max-w-lg bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="fixed w-full top-0 z-10 bg-white border-b border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <FaUserCircle className="text-blue-600 text-lg" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  User Details
                </h2>
                <p className="text-xs text-gray-500">ID: {user.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditMode(!editMode)}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title={editMode ? "View Mode" : "Edit Mode"}
              >
                <FaEdit className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Close"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="h-full overflow-y-auto pb-16 mt-14">
          <div className="p-4">
            {!editMode ? (
              <div className="space-y-4">
                {/* User Avatar & Basic Info */}
                <div className="text-center pb-4 border-b border-gray-100">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-20 h-20 rounded-full mx-auto shadow-lg object-cover mb-3"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                      <FaUserCircle className="text-3xl text-gray-400" />
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {user.name}
                  </h3>
                  <p className="text-gray-600 mb-2 text-sm">{user.email}</p>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        user.is_active === "1"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.is_active === "1" ? "Active" : "Inactive"}
                    </span>
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        user.email_verified_at
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {user.email_verified_at ? "Verified" : "Unverified"}
                    </span>
                  </div>
                </div>

                {/* User Information Grid */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-base font-semibold text-gray-900 mb-3">
                      Personal Information
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Role
                        </label>
                        <p className="mt-1 text-sm font-medium text-gray-900 capitalize">
                          {user.role}
                        </p>
                      </div>

                      {user.role === "healthworker" && user.practitioner && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Practitioner
                          </label>
                          <p className="mt-1 text-sm font-medium text-gray-900 capitalize">
                            {user.practitioner}
                          </p>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Phone
                          </label>
                          <p className="mt-1 text-sm text-gray-900">
                            {user.phone || "N/A"}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Gender
                          </label>
                          <p className="mt-1 text-sm text-gray-900">
                            {user.gender || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Country
                          </label>
                          <p className="mt-1 text-sm text-gray-900">
                            {user.country || "N/A"}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Region
                          </label>
                          <p className="mt-1 text-sm text-gray-900">
                            {user.region || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Religion
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {user.religion || "N/A"}
                        </p>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Date of Birth
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {user.date_of_birth || "N/A"}
                          {user.date_of_birth && (
                            <span className="ml-2 text-xs text-gray-500">
                              (Age: <Age dateOfBirth={user.date_of_birth} />)
                            </span>
                          )}
                        </p>
                      </div>

                      {user.role === "healthworker" && user.working_hours && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Working Hours
                          </label>
                          <p className="mt-1 text-sm text-gray-900">
                            {user.working_hours}
                          </p>
                        </div>
                      )}

                      <div className="bg-gray-50 p-3 rounded-lg">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Address
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {user.address || "N/A"}
                        </p>
                      </div>

                      {user.about && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            About
                          </label>
                          <p className="mt-1 text-sm text-gray-900">
                            {user.about}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Account Information */}
                  <div>
                    <h4 className="text-base font-semibold text-gray-900 mb-3">
                      Account Information
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Last Login
                          </label>
                          <p className="mt-1 text-sm text-gray-900">
                            {user.last_logged_in ? (
                              <TimeAgo timestamp={user.last_logged_in} />
                            ) : (
                              "Never"
                            )}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            2FA
                          </label>
                          <p className="mt-1 text-sm text-gray-900">
                            {user.two_factor_enabled ? "Enabled" : "Disabled"}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Member Since
                          </label>
                          <p className="mt-1 text-sm text-gray-900">
                            <DateFormatter
                              date={user.created_at}
                              format="short"
                            />
                          </p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Last Updated
                          </label>
                          <p className="mt-1 text-sm text-gray-900">
                            <DateFormatter
                              date={user.updated_at}
                              format="short"
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Technical Details */}
                  <div>
                    <h4 className="text-base font-semibold text-gray-900 mb-3">
                      Technical Details
                    </h4>
                    <div className="bg-gray-50 p-3 rounded-lg space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">UUID:</span>
                        <span className="font-mono text-gray-700">
                          {user.uuid}
                        </span>
                      </div>
                      {user.latitude && user.longitude && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Location:</span>
                          <span className="font-mono text-gray-700">
                            {user.latitude}, {user.longitude}
                          </span>
                        </div>
                      )}
                      {user.image_public_id && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Image ID:</span>
                          <span className="font-mono text-gray-700">
                            {user.image_public_id}
                          </span>
                        </div>
                      )}
                    </div>
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
                  <Form className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Edit User Information
                      </h4>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FaUserCircle className="inline w-4 h-4 mr-2" />
                            Name
                          </label>
                          <Field
                            name="name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FaEnvelope className="inline w-4 h-4 mr-2" />
                            Email
                          </label>
                          <Field
                            name="email"
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FaUserTag className="inline w-4 h-4 mr-2" />
                            Role
                          </label>
                          <Field
                            as="select"
                            name="role"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Role</option>
                            <option value="client">Client</option>
                            <option value="healthworker">Health Worker</option>
                            <option value="admin">Admin</option>
                          </Field>
                          <ErrorMessage
                            name="role"
                            component="div"
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>

                        {user.role === "healthworker" && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Practitioner
                            </label>
                            <Field
                              name="practitioner"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <ErrorMessage
                              name="practitioner"
                              component="div"
                              className="text-red-500 text-xs mt-1"
                            />
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Phone
                            </label>
                            <Field
                              name="phone"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <ErrorMessage
                              name="phone"
                              component="div"
                              className="text-red-500 text-xs mt-1"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Gender
                            </label>
                            <Field
                              as="select"
                              name="gender"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                              className="text-red-500 text-xs mt-1"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Country
                            </label>
                            <Field
                              as="select"
                              name="country"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                              className="text-red-500 text-xs mt-1"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Region
                            </label>
                            <Field
                              as="select"
                              name="region"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="">Select Region</option>
                              {regions.map((r) => (
                                <option key={r} value={r}>
                                  {r}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name="region"
                              component="div"
                              className="text-red-500 text-xs mt-1"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Religion
                          </label>
                          <Field
                            as="select"
                            name="religion"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Address
                          </label>
                          <Field
                            name="address"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <ErrorMessage
                            name="address"
                            component="div"
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            About
                          </label>
                          <Field
                            as="textarea"
                            name="about"
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <ErrorMessage
                            name="about"
                            component="div"
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>

                        <div>
                          <label className="flex items-center">
                            <Field
                              type="checkbox"
                              name="two_factor_enabled"
                              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="text-sm font-medium text-gray-700">
                              Enable Two-Factor Authentication
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{error.message}</p>
                      </div>
                    )}

                    <div className="flex justify-end gap-4 pt-4 border-t">
                      <button
                        type="button"
                        onClick={() => setEditMode(false)}
                        className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                      <MediumBtn
                        loading={isSubmitting || isLoading}
                        loadingText="Updating..."
                        text="Update User"
                        color="darkblue"
                        icon={<FaUser className="mr-2" />}
                        type="submit"
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
