import * as yup from "yup";

export const updateClientSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .max(255, "Full name must be at most 255 characters"),

  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  phone: yup
    .string()
    .matches(/^\+?[0-9]{10,15}$/, "Enter a valid phone number")
    .required("Phone number is required"),

  date_of_birth: yup
    .date()
    .typeError("Date of birth must be a valid date")
    .required("Date of birth is required"),

  place_of_birth: yup
    .string()
    .max(255, "Place of birth must be at most 255 characters")
    .required("Place of birth is required"),

  blood_group: yup.string().required("Blood group is required"),

  genotype: yup.string().required("Genotype is required"),

  address: yup.string().nullable(),

  religion: yup.string().nullable(),

  nationality: yup.string().required("Nationality is required"),

  weight: yup
    .number()
    .typeError("Weight must be a number")
    .min(0, "Weight cannot be negative")
    .required("Weight is required"),

  height: yup
    .number()
    .typeError("Height must be a number")
    .min(0, "Height cannot be negative")
    .nullable(),

  gender: yup
    .string()
    .oneOf(["male", "female", "other"], "Select a valid gender")
    .required("Gender is required"),

  about: yup
    .string()
    .max(1000, "About section must not exceed 1000 characters")
    .required("About is required"),

  image: yup
    .mixed()
    .test("fileType", "Only JPEG, PNG, JPG, and WEBP are allowed", (file) => {
      if (!file) return true; // allow empty
      return ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
        file.type
      );
    })
    .test("fileSize", "File is too large (max 2MB)", (file) => {
      if (!file) return true; // allow empty
      return file.size <= 2 * 1024 * 1024;
    })
    .nullable(),
});
