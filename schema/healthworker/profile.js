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
  working_hours: Yup.string()
  .required("Set your working hours")
  .matches(
    /^\s*(1[0-2]|0?[1-9])(:[0-5][0-9])?(am|pm)\s*-\s*(1[0-2]|0?[1-9])(:[0-5][0-9])?(am|pm)\s*$/i,
    "Working hours must be like '8am - 6pm' or '8:30am - 6:15pm'"
  ),
  address: Yup.string().required("Address is required"),
  religion: Yup.string(),
  gender: Yup.string()
    .oneOf(["Male", "Female", "Non-binary", "Transgender", "Bigender"])
    .required("Required"),
  about: Yup.string().min(20).max(500).required("Say something about yourself"),
});
