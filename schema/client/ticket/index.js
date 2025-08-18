import * as Yup from "yup";


export const createSupportTicketSchema = Yup.object().shape({
  subject: Yup.string()
    .min(10, "Subject must be at least 10 characters")
    .max(500, "Subject must be at most 500 characters")
    .required("Subject is required"),

  message: Yup.string()
    .min(20, "Message must be at least 20 characters")
    .max(1000, "Message must be at most 1000 characters")
    .required("Message is required"),
});