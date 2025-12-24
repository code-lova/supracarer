"use client";
import React, { useState, useRef } from "react";
import { useUserContext } from "@context/userContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { updateHealthWorkerSchema } from "@schema/healthworker/profile";
import { countries, region, religion, gender } from "@constants/index";
import { useMutation } from "@tanstack/react-query";
import { updateHealthWorkerprofile } from "@service/request/healthworker/updateProfileRequest";
import toast from "react-hot-toast";
import { MediumBtn, NormalBtn } from "@components/core/button";
import { updateUserLocation } from "@service/request/user/updateUserLocation";
import { FaHouseUser, FaEdit } from "react-icons/fa";
import { uploadToCloudinary } from "@utils/uploadToCloudinary";
import { validateImageFile } from "@utils/validateImageFile";
import {
  getLocationFromIP,
  geocodeAddress,
  getCurrentLocation,
} from "@utils/locationUtils";
import { updateUserImage } from "@service/request/user/updateUserImage";
import TimeAgo from "@components/core/TimeAgo";
import Age from "@components/core/Age";
import WordCountTextarea from "@components/core/WordCountTextarea";
import { useRouter } from "next/navigation";

const Profile = () => {
  const { user, refetchUser } = useUserContext();
  const router = useRouter();
  const userDetails = user?.data;
  const [consentGiven, setConsentGiven] = useState(false);
  const [showLocationOptions, setShowLocationOptions] = useState(false);
  const [manualAddress, setManualAddress] = useState("");

  // Check if user has location data and update consentGiven state
  React.useEffect(() => {
    if (userDetails?.latitude && userDetails?.longitude) {
      setConsentGiven(true);
    }
  }, [userDetails]);

  // Image upload preview state
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

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

  // Upload image to Cloudinary and backend
  const handleImageUpload = async (file) => {
    // Validate file before upload
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
      // Send to backend
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

  // Handle GPS location with automatic IP fallback
  const handleLocationPermission = () => {
    getCurrentLocation(
      // On GPS success
      (coords) => {
        locationMutation.mutate(coords);
        toast.success("Location set successfully using GPS");
      },
      // IP fallback function
      handleIPLocation
    );
  };

  // Handle IP-based location
  const handleIPLocation = async () => {
    const result = await getLocationFromIP();
    if (result.success) {
      locationMutation.mutate(result.coords);
      toast.success("IP geolocation set successfully");
      setShowLocationOptions(false);
    } else {
      setShowLocationOptions(true);
    }
  };

  // Handle manual address entry
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

  //Mutation for updating user details
  const mutation = useMutation({
    mutationFn: updateHealthWorkerprofile,
    onSuccess: (data) => {
      toast.success("Profile Update Successfully");
      refetchUser();

      // Check if this is a first-time login and user needs guided rate system setup
      const isFirstTimeLogin = localStorage.getItem("firstTimeLogin");
      if (isFirstTimeLogin === "true") {
        // Check if user already has guided rate system configured
        if (userDetails?.has_guided_rate_system === false) {
          toast.success("Great! Now let's set up your rates.", {
            duration: 3000,
          });
          setTimeout(() => {
            router.push("/health-service/guided-rate-system");
          }, 1500);
        } else {
          localStorage.setItem("firstTimeLogin", "false");
          toast.success("Profile updated successfully! You're all set.", {
            duration: 3000,
          });
        }
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
    <>
      <div className="pageContainer">
        {/* Header Section */}
        <div className="mb-8 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-tranquil-teal to-custom-green rounded-xl flex items-center justify-center shadow-lg">
              <FaHouseUser className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Profile Setup
              </h1>
              <p className="text-gray-600 text-sm">
                Configure your profile setting to get matched with a patient
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          {/* Left Column (1/3) */}
          <div className="space-y-2">
            {/* User Info Card */}
            <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center relative">
              <div className="w-32 h-32 rounded-full flex items-center justify-center text-ever-green text-4xl font-bold border-2 border-tranquil-teal relative">
                {/* FaEdit icon inside the image div, positioned bottom right */}
                <button
                  className="absolute right-1 bottom-1 bg-ever-green rounded-full p-2"
                  type="button"
                  aria-label="Edit profile image"
                  onClick={() => {
                    if (fileInputRef.current) fileInputRef.current.click();
                  }}
                >
                  <FaEdit className="text-sm text-white" />
                </button>
                {/* Image preview logic */}
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-28 h-28 rounded-full border-1 border-tranquil-teal object-cover"
                  />
                ) : userDetails?.image_url ? (
                  <img
                    src={userDetails?.image_url}
                    alt="Profile"
                    className="w-28 h-28 object-cover rounded-full border-1 border-tranquil-teal"
                  />
                ) : (
                  <span>
                    {userDetails?.fullname?.[0]?.toUpperCase() || "U"}
                  </span>
                )}
                {/* Hidden file input for image upload */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      // Validate before preview/upload
                      const { valid, error } = validateImageFile(file);
                      if (!valid) {
                        toast.error(error);
                        return;
                      }
                      // Preview locally
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setPreviewImage(reader.result);
                      };
                      reader.readAsDataURL(file);
                      // Upload to Cloudinary and backend
                      await handleImageUpload(file);
                    }
                  }}
                />
              </div>

              <h3 className="text-xl font-bold text-tranquil-teal mt-3">
                {userDetails?.fullname}
              </h3>
              <p className="text-sm capitalize text-slate-gray font-bold">
                {userDetails?.practitioner}
              </p>
            </div>

            {/* Details Card */}
            <div className="bg-white shadow-lg rounded-xl p-4 h-[405px] overflow-y-auto">
              <h4 className="text-lg font-bold mb-4 text-tranquil-teal">
                Personal Details
              </h4>
              <ul className="text-sm text-slate-gray space-y-3">
                <li>
                  <strong>Phone:</strong> {userDetails?.phone}
                </li>
                <li>
                  <strong>Email:</strong> {userDetails?.email}
                </li>
                <li>
                  <strong>Gender:</strong> {userDetails?.gender}
                </li>
                <li>
                  <strong>Age:</strong>{" "}
                  <Age dateOfBirth={userDetails?.date_of_birth || ""} />
                </li>
                <li>
                  <strong>Region:</strong> {userDetails?.region || ""}
                </li>
                <li>
                  <strong>Address:</strong> {userDetails?.address || ""}
                </li>
                <li>
                  <strong>About me:</strong> {userDetails?.about_me || ""}
                </li>
                <li className="py-6">
                  <strong>last Session :</strong>{" "}
                  <TimeAgo
                    timestamp={userDetails?.last_logged_in || new Date()}
                  />
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column (2/3) */}
          <div className="lg:col-span-2 ">
            <div className="bg-white shadow-lg rounded-2xl p-6 h-[100vh] mb-4">
              <h4 className="text-lg font-bold text-tranquil-teal mb-6">
                Update Profile Information
              </h4>
              {!consentGiven && (
                <div className="mb-4 bg-yellow-100 p-4 rounded-lg">
                  <p className="text-sm text-yellow-700 mb-4">
                    📍 To improve your match experience, we need your location.
                  </p>

                  <div className="space-y-3">
                    <NormalBtn
                      onClick={handleLocationPermission}
                      children="Allow Location Access"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowLocationOptions(!showLocationOptions)
                      }
                      className="block w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      {showLocationOptions ? "Hide" : "Enter"} Location Manually
                    </button>
                  </div>

                  {showLocationOptions && (
                    <div className="mt-4">
                      <div className="p-3 bg-white rounded border">
                        <h5 className="font-medium mb-2">Enter Your Address</h5>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Enter your city, region, or full address"
                            value={manualAddress}
                            onChange={(e) => setManualAddress(e.target.value)}
                            className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                handleManualLocation(manualAddress);
                              }
                            }}
                          />
                          <button
                            onClick={() => handleManualLocation(manualAddress)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!manualAddress.trim()}
                          >
                            Set Location
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Example: "Accra, Ghana" or "Kumasi Central, Ashanti
                          Region"
                        </p>
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
                  working_hours: userDetails?.working_hours || "",
                  address: userDetails?.address || "",
                  religion: userDetails?.religion || "",
                  gender: userDetails?.gender || "",
                  about: userDetails?.about_me || "",
                }}
                validationSchema={updateHealthWorkerSchema}
                onSubmit={handleSubmit}
              >
                {({ dirty, values, setFieldValue }) => (
                  <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">
                        Full Name
                      </label>
                      <Field name="name" className="login-form-input" />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-600 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Email</label>
                      <Field name="email" className="login-form-input" />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-600 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Phone</label>
                      <Field name="phone" className="login-form-input" />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-600 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        Date of Birth
                      </label>
                      <Field
                        type="date"
                        name="date_of_birth"
                        className="login-form-input"
                      />
                      <ErrorMessage
                        name="date_of_birth"
                        component="div"
                        className="text-red-600 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        Country
                      </label>
                      <Field
                        as="select"
                        name="country"
                        className="login-form-input"
                      >
                        <option value="">Select country</option>
                        {countries.map((c, idx) => (
                          <option key={idx} value={c}>
                            {c}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="country"
                        component="div"
                        className="text-red-600 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        Region/State
                      </label>
                      <Field
                        as="select"
                        name="region"
                        className="login-form-input"
                      >
                        <option value="">Select region</option>
                        {region.map((r, idx) => (
                          <option key={idx} value={r}>
                            {r}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="region"
                        component="div"
                        className="text-red-600 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        Working Hours
                      </label>
                      <Field
                        name="working_hours"
                        placeholder="e.g. 8am - 6pm"
                        className="login-form-input"
                      />
                      <ErrorMessage
                        name="working_hours"
                        component="div"
                        className="text-red-600 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        Religion(Optional)
                      </label>
                      <Field
                        as="select"
                        name="religion"
                        className="login-form-input"
                      >
                        <option value="">Select religion</option>
                        {religion.map((r, idx) => (
                          <option key={idx} value={r}>
                            {r}
                          </option>
                        ))}
                      </Field>
                    </div>

                    <div>
                      <label className="block text-sm font-medium">
                        Gender
                      </label>
                      <Field
                        as="select"
                        name="gender"
                        className="login-form-input"
                      >
                        <option value="">Select gender</option>
                        {gender.map((g, idx) => (
                          <option key={idx} value={g}>
                            {g}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="gender"
                        component="div"
                        className="text-red-600 text-xs"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium">
                        Address
                      </label>
                      <Field name="address" className="login-form-input" />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="text-red-600 text-xs"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <WordCountTextarea
                        name="about"
                        label="About You"
                        value={values.about}
                        onChange={(text) => setFieldValue("about", text)}
                        maxWords={50}
                        rows={4}
                        placeholder="Tell us about yourself, your experience, and what makes you special..."
                      />
                    </div>
                    <div className="md:col-span-2 mx-auto py-4">
                      <MediumBtn
                        loading={mutation.isPending}
                        loadingText="Updating..."
                        text="Update Profile"
                        color="darkblue"
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
    </>
  );
};

export default Profile;
