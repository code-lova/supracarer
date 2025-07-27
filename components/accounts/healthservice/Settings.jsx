"use client";
import React, { useState, useRef } from "react";
import { useUserContext } from "@context/userContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { updateHealthWorkerSchema } from "@schema/healthworker/profile";
import { countries, region, religion, gender } from "@constants/index";
import { useMutation } from "@tanstack/react-query";
import { updateHealthWorkerprofile } from "@service/request/healthworker/updateProfileRequest";
import toast from "react-hot-toast";
import LoaderButton from "@components/core/LoaderButton";
import { NormalBtn } from "@components/core/button";
import { updateUserLocation } from "@service/request/user/updateUserLocation";
import { FaEdit } from "react-icons/fa";
import { uploadToCloudinary } from "@utils/uploadToCloudinary";
import { updateUserImage } from "@service/request/user/updateUserImage";

const Settings = () => {
  const { user, refetchUser } = useUserContext();
  const userDetails = user?.data;
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [consentGiven, setConsentGiven] = useState(
    userDetails?.latitude && userDetails?.longitude
  );
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
      toast.success("Location set successfully");
      setConsentGiven(true);
      refetchUser();
    },
    onError: () => toast.error("Failed to update location"),
  });

  const handleLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(coords);
          locationMutation.mutate(coords);
        },
        (error) => {
          console.error("Location access denied or error:", error);
          toast.error("Location access denied");
        }
      );
    }
  };

  //Mutation for updating user details
  const mutation = useMutation({
    mutationFn: updateHealthWorkerprofile,
    onSuccess: () => {
      toast.success("Profile Update Successfully");
      refetchUser();
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
                    className="w-28 h-28 rounded-full border-1 border-tranquil-teal object-cover"
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
            <div className="bg-white shadow-lg rounded-2xl p-4 h-[445px]">
              <h4 className="text-lg font-bold mb-2 text-tranquil-teal">
                Personal Details
              </h4>
              <ul className="text-sm text-slate-gray space-y-2">
                <li>
                  <strong>Phone:</strong> {userDetails?.phone}
                </li>
                <li>
                  <strong>Gender:</strong> Male
                </li>
                <li>
                  <strong>Age:</strong> 32
                </li>
                <li>
                  <strong>State:</strong> Lagos
                </li>
                <li>
                  <strong>Address:</strong> 15 Allen Avenue, Ikeja
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column (2/3) */}
          <div className="lg:col-span-2 ">
            <div className="bg-white shadow-lg rounded-2xl p-6 h-[669px] mb-4 overflow-x-auto">
              <h4 className="text-lg font-bold text-tranquil-teal mb-6">
                Update Profile Information
              </h4>
              {!consentGiven && location && (
                <div className="mb-4 bg-yellow-100 p-3 rounded">
                  <p className="text-sm text-yellow-700 mb-6">
                    📍 To improve your match experience, allow location access.
                  </p>
                  <NormalBtn
                    onClick={handleLocationPermission}
                    children="Allow Location"
                  />
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
                {() => (
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
                      <label className="block text-sm font-medium">
                        About You
                      </label>
                      <Field
                        as="textarea"
                        name="about"
                        rows={3}
                        className="login-form-input"
                      />
                      <ErrorMessage
                        name="about"
                        component="div"
                        className="text-red-600 text-xs"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <LoaderButton
                        loading={mutation.isPending}
                        loadingText="Updating..."
                        text="Update Profile"
                        type="submit"
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

export default Settings;
