// utils/validateImageFile.js
// Utility to validate image file type and size

/**
 * Validates an image file for type and size.
 * @param {File} file - The file to validate
 * @param {Object} [options]
 * @param {number} [options.maxSizeMB=2] - Maximum allowed size in MB
 * @param {string[]} [options.allowedTypes=["image/jpeg", "image/png", "image/jpg"]] - Allowed MIME types
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateImageFile(file, options = {}) {
  const maxSizeMB = options.maxSizeMB || 2;
  const allowedTypes = options.allowedTypes || [
    "image/jpeg",
    "image/png",
    "image/jpg",
  ];

  if (!file) {
    return { valid: false, error: "No file selected." };
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Invalid file type. Only JPG, JPEG, and PNG are allowed.",
    };
  }

  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `File size exceeds ${maxSizeMB}MB limit.`,
    };
  }

  return { valid: true };
}
