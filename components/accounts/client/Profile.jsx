"use client";
import React, { useState, useRef } from "react";
import { useUserContext } from "@context/userContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { countries, region, religion, gender } from "@constants/index";
import { useMutation } from "@tanstack/react-query";
import { updateClientProfile } from "@service/request/client/updateProfileRequest";
import { clientProfileSchema } from "@schema/client/profile";
import toast from "react-hot-toast";
import { MediumBtn } from "@components/core/button";
import { updateUserLocation } from "@service/request/user/updateUserLocation";
import { FaEdit, FaHouseUser } from "react-icons/fa";
import { uploadToCloudinary } from "@utils/uploadToCloudinary";
import { updateUserImage } from "@service/request/user/updateUserImage";
import { validateImageFile } from "@utils/validateImageFile";
import {
  getLocationFromIP,
  geocodeAddress,
  getCurrentLocation,
} from "@utils/locationUtils";
import Age from "@components/core/Age";
import TimeAgo from "@components/core/TimeAgo";
import WordCountTextarea from "@components/core/WordCountTextarea";

const DetailRow = ({ label, children }) => (
  <div className="flex flex-col gap-0.5 py-2.5 border-b border-gray-100 last:border-0">
    <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">{label}</span>
    <span className="text-sm text-slate-gray font-medium">{children || <span className="text-gray-300 italic">Not set</span>}</span>
  </div>
);

const Profile = () => {
  const { user, refetchUser } = useUserContext();
  const userDetails = user?.data;
  const [consentGiven, setConsentGiven] = useState(false);
  const [showLocationOptions, setShowLocationOptions] = useState(false);
  const [manualAddress, setManualAddress] = useState("");

  React.useEffect(() => {
    if (userDetails?.latitude && userDetails?.longitude) {
      setConsentGiven(true);
    }
  }, [userDetails]);

  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

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

  const handleImageUpload = async (file) => {
    const { valid, error } = validateImageFile(file);
    if (!valid) {
      toast.error(error);
      return;
    }
    try {
      toast.loading("Uploading image...");
      const cloudinaryRes = await uploadToCloudinary(file);
      toast.dismiss();
      setPreviewImage(cloudinaryRes.secure_url);
      imageMutation.mutate({
        image: cloudinaryRes.secure_url,
        image_public_id: cloudinaryRes.public_id,
      });
    } catch (err) {
      toast.dismiss();
      toast.error(err.message || "Image upload failed");
    }
  };

  const locationMutation = useMutation({
    mutationFn: updateUserLocation,
    onSuccess: () => {
      setConsentGiven(true);
      refetchUser();
    },
    onError: () => toast.error("Failed to update location"),
  });

  const handleLocationPermission = () => {
    getCurrentLocation(
      (coords) => {
        locationMutation.mutate(coords);
        toast.success("Location set successfully using GPS");
      },
      handleIPLocation
    );
  };

  const handleIPLocation = async () => {
    const result = await getLocationFromIP();
    if (result.success) {
      locationMutation.mutate(result.coords);
      toast.success("IP geolocation set successfully");
      setShowLocationOptions(false);
    } else {
      toast.error(result.error);
      setShowLocationOptions(true);
    }
  };

  const handleManualLocation = async (address) => {
    const result = await geocodeAddress(address);
    if (result.success) {
      locationMutation.mutate(result.coords);
      toast.success("Location set successfully manually");
      setShowLocationOptions(false);
      setManualAddress("");
    } else {
      toast.error(result.error);
    }
  };

  const mutation = useMutation({
    mutationFn: updateClientProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully");
      refetchUser();
      const isFirstTimeLogin = localStorage.getItem("firstTimeLogin");
      if (isFirstTimeLogin === "true") {
        localStorage.setItem("firstTimeLogin", "false");
        toast.success("You're all set!", { duration: 3000 });
      }
    },
    onError: (err) => {
      toast.error(err.message || "An error occurred while updating profile.");
    },
  });

  const handleSubmit = (payload) => {
    mutation.mutate(payload);
  };

  return (
    <div className="pageContent">
      {/* Header */}
      <div className="mb-8 mt-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-haven-blue to-carer-blue rounded-xl flex items-center justify-center shadow-lg">
            <FaHouseUser className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Profile Setup</h1>
            <p className="text-gray-500 text-sm">
              Configure your profile to get matched with a carer
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Avatar Card */}
          <div className="bg-white rounded-xl shadow-3xl border border-gray-100 p-5 flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-full border-2 border-carer-blue flex items-center justify-center text-carer-blue text-4xl font-bold">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-28 h-28 rounded-full object-cover"
                />
              ) : userDetails?.image ? (
                <img
                  src={userDetails?.image}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover"
                />
              ) : (
                <span>{userDetails?.fullname?.[0]?.toUpperCase() || "U"}</span>
              )}
              <button
                type="button"
                aria-label="Edit profile image"
                onClick={() => fileInputRef.current?.click()}
                className="absolute right-1 bottom-1 bg-carer-blue rounded-full p-2 shadow-md hover:bg-haven-blue transition-colors"
              >
                <FaEdit className="text-sm text-white" />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const { valid, error } = validateImageFile(file);
                  if (!valid) { toast.error(error); return; }
                  const reader = new FileReader();
                  reader.onloadend = () => setPreviewImage(reader.result);
                  reader.readAsDataURL(file);
                  await handleImageUpload(file);
                }}
              />
            </div>
            <h3 className="text-lg font-bold text-dark-blue mt-3">
              {userDetails?.fullname}
            </h3>
            <span className="text-xs text-gray-400 mt-0.5">{userDetails?.email}</span>
          </div>

          {/* Personal Details Card */}
          <div className="bg-white rounded-xl shadow-3xl border border-gray-100 p-5">
            <p className="text-xs font-semibold text-slate-gray uppercase tracking-wider mb-2">
              Personal Details
            </p>
            <DetailRow label="Phone">{userDetails?.phone}</DetailRow>
            <DetailRow label="Gender">{userDetails?.gender}</DetailRow>
            <DetailRow label="Age">
              <Age dateOfBirth={userDetails?.date_of_birth || ""} />
            </DetailRow>
            <DetailRow label="Region">{userDetails?.region}</DetailRow>
            <DetailRow label="Address">{userDetails?.address}</DetailRow>
            <DetailRow label="About">{userDetails?.about}</DetailRow>
            <DetailRow label="Last Session">
              <TimeAgo timestamp={userDetails?.last_logged_in || new Date()} />
            </DetailRow>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-3xl border border-gray-100 p-6">
            <p className="text-xs font-semibold text-slate-gray uppercase tracking-wider mb-5">
              Update Profile Information
            </p>

            {/* Location Banner */}
            {!consentGiven && (
              <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-700 mb-3">
                  📍 To improve your match experience, we need your location.
                </p>
                <div className="flex flex-col gap-2">
                  <MediumBtn
                    onClick={handleLocationPermission}
                    text="Allow Location Access"
                    color="carerBlue"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLocationOptions(!showLocationOptions)}
                    className="text-sm text-gray-500 hover:text-gray-700 underline underline-offset-2 transition-colors text-center"
                  >
                    {showLocationOptions ? "Hide" : "Enter"} location manually
                  </button>
                </div>

                {showLocationOptions && (
                  <div className="mt-4 bg-white border border-gray-200 rounded-lg p-4">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Enter Your Address</h5>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder='e.g. "Accra, Ghana"'
                        value={manualAddress}
                        onChange={(e) => setManualAddress(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleManualLocation(manualAddress)}
                        className="steper-form-input flex-1"
                      />
                      <button
                        onClick={() => handleManualLocation(manualAddress)}
                        disabled={!manualAddress.trim()}
                        className="px-4 py-2 bg-carer-blue text-white rounded-lg text-sm hover:bg-haven-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Set
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <Formik
              initialValues={{
                name: userDetails?.fullname || "",
                email: userDetails?.email || "",
                phone: userDetails?.phone || "",
                date_of_birth: userDetails?.date_of_birth || "",
                country: userDetails?.country || "",
                region: userDetails?.region || "",
                address: userDetails?.address || "",
                religion: userDetails?.religion || "",
                gender: userDetails?.gender || "",
                about: userDetails?.about || "",
              }}
              enableReinitialize={true}
              validationSchema={clientProfileSchema}
              onSubmit={handleSubmit}
            >
              {({ dirty, values, setFieldValue }) => (
                <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
                    <Field name="name" className="steper-form-input" />
                    <ErrorMessage name="name" component="p" className="text-danger-red text-xs mt-1" />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                    <Field name="email" className="steper-form-input" />
                    <ErrorMessage name="email" component="p" className="text-danger-red text-xs mt-1" />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Phone</label>
                    <Field name="phone" className="steper-form-input" />
                    <ErrorMessage name="phone" component="p" className="text-danger-red text-xs mt-1" />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Date of Birth</label>
                    <Field type="date" name="date_of_birth" className="steper-form-input select-dropdown" />
                    <ErrorMessage name="date_of_birth" component="p" className="text-danger-red text-xs mt-1" />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Country</label>
                    <Field as="select" name="country" className="steper-form-input select-dropdown">
                      <option value="">Select country</option>
                      {countries.map((c, idx) => (
                        <option key={idx} value={c}>{c}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="country" component="p" className="text-danger-red text-xs mt-1" />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Region / State</label>
                    <Field as="select" name="region" className="steper-form-input select-dropdown">
                      <option value="">Select region</option>
                      {region.map((r, idx) => (
                        <option key={idx} value={r}>{r}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="region" component="p" className="text-danger-red text-xs mt-1" />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Religion <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <Field as="select" name="religion" className="steper-form-input select-dropdown">
                      <option value="">Select religion</option>
                      {religion.map((r, idx) => (
                        <option key={idx} value={r}>{r}</option>
                      ))}
                    </Field>
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Gender</label>
                    <Field as="select" name="gender" className="steper-form-input select-dropdown">
                      <option value="">Select gender</option>
                      {gender.map((g, idx) => (
                        <option key={idx} value={g}>{g}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="gender" component="p" className="text-danger-red text-xs mt-1" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-1 text-sm font-medium text-gray-700">Address</label>
                    <Field name="address" className="steper-form-input" />
                    <ErrorMessage name="address" component="p" className="text-danger-red text-xs mt-1" />
                  </div>

                  <div className="md:col-span-2">
                    <WordCountTextarea
                      name="about"
                      label="About You"
                      value={values.about}
                      onChange={(text) => setFieldValue("about", text)}
                      maxWords={50}
                      rows={4}
                      placeholder="Say something about yourself, what makes you special..."
                    />
                  </div>

                  <div className="md:col-span-2 flex justify-center pt-2 pb-4">
                    <MediumBtn
                      loading={mutation.isPending}
                      loadingText="Updating..."
                      text="Update Profile"
                      color="carerBlue"
                      type="submit"
                      disabled={!dirty || mutation.isPending}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
