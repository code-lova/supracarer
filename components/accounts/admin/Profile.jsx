"use client";
import React, { useState, useRef } from "react";
import { useUserContext } from "@context/userContext";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import {
  FiUser,
  FiEdit3,
  FiCamera,
  FiSave,
  FiX,
  FiShield,
  FiLock,
} from "react-icons/fi";

import { FaUserCog, FaArrowCircleRight } from "react-icons/fa";
import { userValidationSchema } from "@schema/admin";
import { gender, countries, region, religion } from "@constants";
import { MediumBtn } from "@components/core/button";
import { toast } from "react-hot-toast";
import { updateAdminProfile } from "@service/request/admin/profile";
import { updateUserImage } from "@service/request/user/updateUserImage";
import ProfileSkeleton from "@components/core/skeleton/ProfileSkeleton";
import { uploadToCloudinary } from "@utils/uploadToCloudinary";
import TimeAgo from "@components/core/TimeAgo";
import Link from "next/link";

const Profile = () => {
  const { user, refetchUser, isLoading } = useUserContext();
  const userDetails = user?.data;
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(userDetails?.image || null);

  // Update profile image when user data changes
  React.useEffect(() => {
    setProfileImage(userDetails?.image || null);
  }, [userDetails?.image]);

  // Profile update mutation
  const profileMutation = useMutation({
    mutationFn: updateAdminProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      refetchUser();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });

  // Profile form
  const formik = useFormik({
    initialValues: {
      name: userDetails?.fullname || "",
      email: userDetails?.email || "",
      phone: userDetails?.phone || "",
      gender: userDetails?.gender || "",
      country: userDetails?.country || "",
      region: userDetails?.region || "",
      address: userDetails?.address || "",
      about: userDetails?.about || "",
      religion: userDetails?.religion || "",
    },
    validationSchema: userValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const profileData = { ...values };
      profileMutation.mutate(profileData);
    },
  });

  // Mutation for updating user image in backend
  const imageMutation = useMutation({
    mutationFn: updateUserImage,
    onSuccess: () => {
      toast.success("Profile image updated successfully");
      refetchUser();
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update profile image");
    },
  });

  // Handle image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      try {
        // Show preview immediately
        const reader = new FileReader();
        reader.onload = (e) => {
          setProfileImage(e.target.result);
        };
        reader.readAsDataURL(file);
        toast.loading("Uploading image...");

        // Upload to Cloudinary
        const uploadResult = await uploadToCloudinary(file);
        toast.dismiss();
        // Send to backend
        imageMutation.mutate({
          image: uploadResult.secure_url,
          image_public_id: uploadResult.public_id,
        });
      } catch (error) {
        toast.error("Failed to upload image");
        console.error("Image upload error:", error);
      }
    }
  };

  // Handle cancel editing
  const handleCancelEdit = () => {
    setIsEditing(false);
    formik.resetForm();
    setProfileImage(userDetails?.image || null);
  };

  if (isLoading || !user) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="w-full mx-auto px-1 py-4 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-3 py-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Profile
              </h1>
              <p className="text-gray-600">
                Manage your account settings and preferences
              </p>
            </div>
          </div>

          {!isEditing && (
            <MediumBtn
              text="Edit"
              icon={<FiEdit3 />}
              onClick={() => setIsEditing(true)}
            />
          )}
        </div>

        {/* Profile Image Section */}
        <div className="flex items-center space-x-6 mb-6">
          <div className="relative">
            {profileImage || userDetails?.image ? (
              <img
                src={profileImage || userDetails?.image}
                alt={userDetails?.fullname || "Admin"}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : null}

            {/* Fallback avatar */}
            <div
              className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center shadow-lg"
              style={{
                display: profileImage || userDetails?.image ? "none" : "flex",
              }}
            >
              <FiUser className="text-white text-2xl" />
            </div>

            {isEditing && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white shadow-lg transition-colors"
              >
                <FiCamera className="text-sm" />
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {userDetails?.fullname || "Admin User"}
            </h2>
            <p className="text-gray-600">
              {userDetails?.email || "admin@example.com"}
            </p>
            <div className="flex items-center mt-2">
              <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
              <span className="text-sm text-gray-600">Administrator</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FiUser className="mr-2 text-blue-500" />
            Personal Information
          </h3>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  !isEditing
                    ? "bg-gray-50 text-gray-700 cursor-not-allowed"
                    : "bg-white border-gray-300"
                } ${
                  formik.touched.name && formik.errors.name
                    ? "border-red-300"
                    : ""
                }`}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  !isEditing
                    ? "bg-gray-50 text-gray-700 cursor-not-allowed"
                    : "bg-white border-gray-300"
                } ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-300"
                    : ""
                }`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  !isEditing
                    ? "bg-gray-50 text-gray-700 cursor-not-allowed"
                    : "bg-white border-gray-300"
                } ${
                  formik.touched.phone && formik.errors.phone
                    ? "border-red-300"
                    : ""
                }`}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.phone}
                </p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  !isEditing
                    ? "bg-gray-50 text-gray-700 cursor-not-allowed"
                    : "bg-white border-gray-300"
                }`}
              >
                <option value="">Select Gender</option>
                {gender.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <select
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  !isEditing
                    ? "bg-gray-50 text-gray-700 cursor-not-allowed"
                    : "bg-white border-gray-300"
                }`}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Region */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Region
              </label>
              <select
                name="region"
                value={formik.values.region}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  !isEditing
                    ? "bg-gray-50 text-gray-700 cursor-not-allowed"
                    : "bg-white border-gray-300"
                }`}
              >
                <option value="">Select Region</option>
                {region.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Religion */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Religion
              </label>
              <select
                name="religion"
                value={formik.values.religion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  !isEditing
                    ? "bg-gray-50 text-gray-700 cursor-not-allowed"
                    : "bg-white border-gray-300"
                }`}
              >
                <option value="">Select Religion</option>
                {religion.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Address */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  !isEditing
                    ? "bg-gray-50 text-gray-700 cursor-not-allowed"
                    : "bg-white border-gray-300"
                }`}
                placeholder="Enter your full address"
              />
            </div>

            {/* About */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                About Me
              </label>
              <textarea
                name="about"
                value={formik.values.about}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!isEditing}
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                  !isEditing
                    ? "bg-gray-50 text-gray-700 cursor-not-allowed"
                    : "bg-white border-gray-300"
                }`}
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex items-center justify-end space-x-4 mt-6 pt-6 border-t border-gray-200">
              <MediumBtn
                text="Cancel"
                variant="outline"
                color="gray"
                icon={<FiX className="mr-1" />}
                onClick={handleCancelEdit}
                disabled={profileMutation.isPending}
              />
              <MediumBtn
                text="Save Changes"
                loading={profileMutation.isPending}
                loadingText="Saving Changes..."
                type="submit"
                icon={<FiSave className="mr-1" />}
                disabled={profileMutation.isPending}
              />
            </div>
          )}
        </form>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-3 py-3">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FiShield className="mr-2 text-blue-500" />
            Security Settings
          </h3>
        </div>

        <div className="space-y-4">
          {/* Password Change */}
          <div className="flex items-center justify-between px-2 py-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <FiLock className="text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Password</h4>
                <p className="text-sm text-gray-600">Update Password</p>
              </div>
            </div>
            <MediumBtn
              text="Update"
              href="/admin/settings"
              color="darkblue"
              icon={<FaArrowCircleRight className="mr-1" />}
            />
          </div>

          {/* Two-Factor Authentication */}
          <div className="flex items-center justify-between px-2 py-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <FiShield className="text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">2FA Auth</h4>
                <p className="text-sm text-gray-600">
                  {userDetails.two_fa_enabled ? "Enabled" : "Disabled"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MediumBtn
                text="Enable"
                href="/admin/settings"
                color="darkblue"
                icon={<FaArrowCircleRight className="mr-1" />}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Account Status */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-6">
          <FaUserCog className="mr-2 text-blue-500" />
          Account Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Account Type:</span>
              <span className="font-medium text-blue-600">Administrator</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Account Status:</span>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                <span className="font-medium text-green-600">Active</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Member Since:</span>
              <span className="font-medium">
                {new Date(userDetails.joined).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Last Login:</span>
              <span className="font-medium">
                <TimeAgo
                  timestamp={userDetails.last_logged_in}
                  format="custom"
                />{" "}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sessions:</span>
              <span className="font-medium">
                <Link
                  href="/admin/settings"
                  className="text-blue-600 hover:underline"
                >
                  View All
                </Link>
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">User ID:</span>
              <span className="font-mono text-sm font-medium">
                {userDetails.id}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
