import * as Yup from "yup";

export const SupportMessageSchema = Yup.object().shape({
  subject: Yup.string()
    .required("Please select a subject"),
  message: Yup.string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message should be less than 1000 characters"),

});
