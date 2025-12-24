"use client";
import React, { useState, useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FiX, FiUpload, FiTrash2 } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { serviceFlyerService } from "../../../service/request/admin/serviceFlyerRequest";
import {
  serviceFlyerSchema,
  targetAudienceOptions,
} from "../../../schema/admin/serviceFlyerSchema";
import { uploadToCloudinary } from "../../../utils/uploadToCloudinary";
import { MediumBtn } from "@components/core/button";

const ServiceFlyerEditModal = ({
  isOpen,
  onClose,
  flyer = null,
  onSuccess,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const queryClient = useQueryClient();
  const modalRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setPreviewImage(flyer?.image_url || "");
      setSelectedFile(null);

      // Scroll modal to top
      if (modalRef.current) {
        modalRef.current.scrollTop = 0;
      }
    }
  }, [isOpen, flyer]);

  // ============== Mutations ==============

  /**
   * Main mutation for creating/updating service flyers
   * Handles:
   * 1. Uploading new image to Cloudinary (if a new file was selected)
   * 2. Sending form data to API
   */
  const mutation = useMutation({
    mutationFn: async (values) => {
      let imageData = {
        image_url: values.image_url,
        image_public_id: values.image_public_id,
      };

      // If a new file was selected, upload it to Cloudinary first
      if (selectedFile) {
        try {
          const uploadResult = await uploadToCloudinary(selectedFile);
          imageData = {
            image_url: uploadResult.secure_url,
            image_public_id: uploadResult.public_id,
          };
        } catch (error) {
          throw new Error("Failed to upload image. Please try again.");
        }
      }

      // Prepare final payload with image data
      const payload = {
        ...values,
        ...imageData,
      };

      // Call appropriate API based on create/edit mode
      if (flyer?.uuid) {
        return serviceFlyerService.updateServiceFlyer(flyer.uuid, payload);
      } else {
        return serviceFlyerService.createServiceFlyer(payload);
      }
    },
    onSuccess: () => {
      // Refresh the flyers list
      queryClient.invalidateQueries({ queryKey: ["serviceFlyers"] });
      toast.success(
        flyer ? "Flyer updated successfully!" : "Flyer created successfully!"
      );
      onSuccess?.();
      onClose();
      setSelectedFile(null);
      setPreviewImage("");
    },
    onError: (error) => {
      console.error("Error saving service flyer:", error);
      toast.error(error.message || "Failed to save flyer. Please try again.");
    },
  });

  // ============== Event Handlers ==============
  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error("Image size should be less than 5MB.");
      return;
    }

    // Store the file for later upload
    setSelectedFile(file);

    // Create local preview URL
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);
  };

  /**
   * Removes the selected/existing image
   */
  const handleRemoveImage = (setFieldValue) => {
    // Clear form values
    setFieldValue("image_url", "");
    setFieldValue("image_public_id", "");

    // Clear local state
    setSelectedFile(null);
    setPreviewImage("");

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /**
   * Handles form submission
   */
  const handleSubmit = async (values) => {
    // Validate that an image is selected (either existing or new)
    if (!previewImage && !selectedFile) {
      toast.error("Please upload an image for the flyer.");
      return;
    }

    setIsSubmitting(true);
    try {
      await mutation.mutateAsync(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============== Computed Values ==============

  // Check if component is in edit mode
  const isEditMode = Boolean(flyer?.uuid);

  // Check if form is currently processing
  const isProcessing = isSubmitting || mutation.isPending;

  // Check if a new image was selected (different from original)
  const hasNewImage = Boolean(selectedFile);

  // ============== Early Return ==============
  if (!isOpen) return null;

  // ============== Initial Form Values ==============
  const initialValues = {
    title: flyer?.title || "",
    description: flyer?.description || "",
    image_url: flyer?.image_url || "",
    image_public_id: flyer?.image_public_id || "",
    target_audience: flyer?.target_audience || "both",
    is_active: flyer?.is_active ?? true,
    sort_order: flyer?.sort_order || 0,
  };

  return (
    <>
      {/* Backdrop - closes modal on click */}
      <div
        className="fixed inset-0 -top-6 bg-black bg-opacity-50 z-40"
        onClick={!isProcessing ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal Panel */}
      <div
        ref={modalRef}
        className="fixed right-0 -top-6 h-full w-full max-w-2xl bg-white shadow-2xl z-50 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-haven-blue border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 id="modal-title" className="text-xl font-semibold text-white">
            {isEditMode ? "Edit Service Flyer" : "Create New Service Flyer"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 bg-gray-100 rounded-lg transition-colors hover:bg-gray-200"
            disabled={isProcessing}
            aria-label="Close modal"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="p-6">
            <Formik
              initialValues={initialValues}
              validationSchema={serviceFlyerSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ setFieldValue, errors, touched, dirty }) => (
                <Form className="space-y-6">
                  {/* Title Field */}
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Title *
                    </label>
                    <Field
                      id="title"
                      name="title"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter flyer title"
                    />
                    <ErrorMessage
                      name="title"
                      component="p"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>

                  {/* Description Field */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Description
                    </label>
                    <Field
                      id="description"
                      name="description"
                      as="textarea"
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Enter flyer description (optional)"
                    />
                    <ErrorMessage
                      name="description"
                      component="p"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>

                  {/* Image Upload Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Flyer Image *
                    </label>

                    {previewImage ? (
                      // Image Preview (shown when image is selected or exists)
                      <div className="relative">
                        <img
                          src={previewImage}
                          alt="Flyer preview"
                          className="w-full h-64 object-cover rounded-lg border border-gray-300"
                        />

                        {/* New image indicator */}
                        {hasNewImage && (
                          <span className="absolute top-2 left-2 px-2 py-1 bg-green-600 text-white text-xs rounded-full">
                            New Image
                          </span>
                        )}

                        {/* Remove image button */}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(setFieldValue)}
                          className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                          disabled={isProcessing}
                          aria-label="Remove image"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>

                        {/* Change image button */}
                        <label
                          htmlFor="image-upload"
                          className="absolute bottom-2 right-2 px-3 py-1.5 bg-white text-gray-700 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer shadow-sm"
                        >
                          Change Image
                        </label>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                          id="image-upload"
                          disabled={isProcessing}
                        />
                      </div>
                    ) : (
                      // Upload Placeholder (shown when no image)
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                        <FiUpload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500 mb-2">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-400 mb-4">
                          PNG, JPG, GIF up to 5MB
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                          id="image-upload"
                          disabled={isProcessing}
                        />
                        <label
                          htmlFor="image-upload"
                          className="inline-flex items-center px-4 py-2 bg-haven-blue text-white rounded-sm hover:bg-tranquil-teal transition-colors cursor-pointer"
                        >
                          Choose File
                        </label>
                      </div>
                    )}

                    {/* Image validation error */}
                    {errors.image_url && touched.image_url && !previewImage && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.image_url}
                      </p>
                    )}
                  </div>

                  {/* Target Audience Select */}
                  <div>
                    <label
                      htmlFor="target_audience"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Target Audience *
                    </label>
                    <Field
                      id="target_audience"
                      name="target_audience"
                      as="select"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {targetAudienceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="target_audience"
                      component="p"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>

                  {/* Sort Order Field */}
                  <div>
                    <label
                      htmlFor="sort_order"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Sort Order
                    </label>
                    <Field
                      id="sort_order"
                      name="sort_order"
                      type="number"
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter sort order (0 for default)"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Lower numbers appear first. Use 0 for default ordering.
                    </p>
                    <ErrorMessage
                      name="sort_order"
                      component="p"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>

                  {/* Active Status Checkbox */}
                  <div className="flex items-center">
                    <Field
                      id="is_active"
                      name="is_active"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="is_active"
                      className="ml-2 text-sm font-medium text-gray-700"
                    >
                      Active (visible to users)
                    </label>
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                    <MediumBtn
                      type="button"
                      onClick={onClose}
                      text="Cancel"
                      color="gray"
                      disabled={isProcessing}
                    />
                    <MediumBtn
                      type="submit"
                      color="darkblue"
                      disabled={isProcessing}
                      loading={isProcessing}
                      loadingText={isEditMode ? "Updating..." : "Creating..."}
                      text={isEditMode ? "Update Flyer" : "Create Flyer"}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceFlyerEditModal;
