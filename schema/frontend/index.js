import * as Yup from "yup";

// Regex to detect potential XSS/script injection patterns
const noScriptPattern = /^(?!.*<script|.*javascript:|.*on\w+=).*$/i;
const safeTextPattern = /^[^<>]*$/; // No HTML tags allowed

export const ContactFormSchema = Yup.object().shape({
  fullname: Yup.string()
    .required("Your full name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters")
    .matches(safeTextPattern, "Invalid characters detected")
    .trim(),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required")
    .max(255, "Email cannot exceed 255 characters")
    .lowercase()
    .trim(),
  phone: Yup.string()
    .notRequired()
    .test("phone-validation", "Invalid phone number format", (value) => {
      if (!value || value === "") return true; // Allow empty
      // Allow digits, spaces, dashes, plus sign, and parentheses
      const phoneRegex = /^[\d\s\-+()]{10,20}$/;
      return phoneRegex.test(value);
    }),
  subject: Yup.string()
    .required("Subject is required")
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject cannot exceed 200 characters")
    .matches(safeTextPattern, "Invalid characters detected")
    .trim(),
  message: Yup.string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message cannot exceed 2000 characters")
    .matches(noScriptPattern, "Invalid content detected")
    .trim(),
  turnstileToken: Yup.string().when("$requireTurnstile", {
    is: true,
    then: () =>
      Yup.string().required("Please complete the security verification"),
    otherwise: () => Yup.string().notRequired(),
  }),
});

export const subscriberSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required")
    .max(255, "Email cannot exceed 255 characters")
    .lowercase()
    .trim(),
});
