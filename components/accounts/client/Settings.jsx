"use client";
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Aside from "./Aside";
import Header from "./Header";
import { getUserRequest } from "@service/request/user/getUserRequest";
import LoadingStateUI from "@components/core/loading";
import toast from "react-hot-toast";
import { updateClientprofile } from "@service/request/client/updateProfileRequest";
import { updateClientSchema } from "@schema/client/profile";
import LoaderButton from "@components/core/LoaderButton";
import { uploadToCloudinary } from "@utils/uploadToCloudinary";

const Settings = () => {
  const queryClient = useQueryClient();
  // Fetch user details
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUserRequest,
    refetchOnWindowFocus: false,
  });
  const user = data?.data;

  const mutation = useMutation({
    mutationFn: updateClientprofile,
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      toast.error(err.message || "An error occurred while updating profile.");
    },
  });

  return (
    <div>
      <Aside />
      <Header />
      <div className="lg:ml-[200px]">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-2 md:mb-8 mt-12 md:mt-8">
            Update Profile
          </h1>

          {isLoading && <LoadingStateUI label="Loading user details..." />}

          {isError && (
            <p className="text-center text-red-500">Error: {error.message}</p>
          )}

          {!isLoading && !isError && data && (
            <Formik
              initialValues={{
                name: user.fullname || "",
                email: user.email || "",
                phone: user.phone || "",
                date_of_birth: user.date_of_birth || "",
                place_of_birth: user.place_of_birth || "",
                blood_group: user.blood_group || "",
                genotype: user.genotype || "",
                address: user.address || "",
                religion: user.religion || "",
                nationality: user.nationality || "",
                weight: user.weight || "",
                height: user.height || "",
                gender: user.gender || "",
                about: user.about || "",
                image: null,
                preview: "",
              }}
              validationSchema={updateClientSchema}
              onSubmit={async (values) => {
                console.log("Submitting values", values);
                const payload = { ...values };
                delete payload.preview;

                try {
                  // If image is File → upload first
                  if (values.image && typeof values.image !== 'string') {
                    const cloudinaryData = await uploadToCloudinary(values.image);
                    payload.image = cloudinaryData.secure_url;
                    payload.image_public_id = cloudinaryData.public_id;
                  } else {
                    // Remove image fields → so we don't clear existing image
                    delete payload.image;
                    delete payload.image_public_id;
                  }

                  mutation.mutate(payload);
                } catch (error) {
                  toast.error(error.message || 'Failed to upload image');
                }
              }}
            >
              {({ values, setFieldValue }) => (
                <Form className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-4">
                  {/* Image */}
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Profile Picture
                    </label>
                    <div className="mb-2">
                      {user.image && !values.preview && (
                        <img
                          src={user.image}
                          alt="Current"
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      )}
                      {values.preview && (
                        <img
                          src={values.preview}
                          alt="Preview"
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      )}
                    </div>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.currentTarget.files?.[0];
                        if (file) {
                          setFieldValue("image", file);
                          setFieldValue("preview", URL.createObjectURL(file));
                        }
                      }}
                      className="w-full"
                    />
                    <ErrorMessage
                      name="image"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Name */}
                  <div>
                    <label>Full Name</label>
                    <Field name="name" className="form-field" />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label>Email</label>
                      <Field name="email" className="form-field" />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div>
                      <label>Phone</label>
                      <Field name="phone" className="form-field" />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Date & Place of Birth */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label>Date of Birth</label>
                      <Field
                        name="date_of_birth"
                        type="date"
                        className="form-field"
                      />
                      <ErrorMessage
                        name="date_of_birth"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div>
                      <label>Place of Birth</label>
                      <Field name="place_of_birth" className="form-field" />
                      <ErrorMessage
                        name="place_of_birth"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Blood Group & Genotype */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label>Blood Group</label>
                      <Field name="blood_group" className="form-field" />
                      <ErrorMessage
                        name="blood_group"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div>
                      <label>Genotype</label>
                      <Field name="genotype" className="form-field" />
                      <ErrorMessage
                        name="genotype"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Address, Religion, Nationality */}
                  <div>
                    <label>Address</label>
                    <Field name="address" className="form-field" />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label>Religion</label>
                    <Field name="religion" className="form-field" />
                    <ErrorMessage
                      name="religion"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label>Nationality</label>
                    <Field name="nationality" className="form-field" />
                    <ErrorMessage
                      name="nationality"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Weight & Height */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label>Weight (kg)</label>
                      <Field
                        name="weight"
                        type="number"
                        className="form-field"
                      />
                      <ErrorMessage
                        name="weight"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div>
                      <label>Height (cm)</label>
                      <Field
                        name="height"
                        type="number"
                        className="form-field"
                      />
                      <ErrorMessage
                        name="height"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Gender */}
                  <div>
                    <label>Gender</label>
                    <Field as="select" name="gender" className="form-field">
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Field>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* About */}
                  <div>
                    <label>About</label>
                    <Field
                      as="textarea"
                      name="about"
                      rows="4"
                      className="form-field"
                    />
                    <ErrorMessage
                      name="about"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <LoaderButton
                    loading={mutation.isPending}
                    loadingText="Updating..."
                    text="Update Profile"
                    type="submit"
                  />
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
