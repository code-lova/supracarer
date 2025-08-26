import * as Yup from "yup";
import { gender, countries, region as regions, religion } from "@constants";


export const userValidationSchema = Yup.object({
  name: Yup.string().required().max(255),
  email: Yup.string().required().email().max(255),
  role: Yup.string().oneOf(["client", "healthworker", "admin"]),
  practitioner: Yup.string().max(255),
  phone: Yup.string()
    .matches(/^\+?[0-9]{10,15}$/)
    .max(15),
  gender: Yup.string().oneOf(gender),
  country: Yup.string().oneOf(countries),
  region: Yup.string().oneOf(regions),
  address: Yup.string().max(255),
  about: Yup.string().max(1000),
  two_factor_enabled: Yup.boolean(),
  religion: Yup.string().oneOf(religion),
});
