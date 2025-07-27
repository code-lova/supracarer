import * as Yup from "yup";

export const updateHealthWorkerSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .max(255, "Full name must be at most 255 characters"),
  email: Yup.string().email().required("Email is required"),
  phone: Yup.string()
    .matches(/^\+?[0-9]{10,15}$/, "Invalid phone number")
    .required("Required"),
  date_of_birth: Yup.date().required("Date of birth is required"),
  country: Yup.string().required("Country is required"),
  region: Yup.string().required("Region is required"),
  working_hours: Yup.string().required("Set your working hours"),
  address: Yup.string().required("Address is required"),
  religion: Yup.string(),
  gender: Yup.string()
    .oneOf(["Male", "Female", "Non-binary", "Transgender", "Bigender"])
    .required("Required"),
  about: Yup.string().max(1000).required("Say something about yourself"),
});
