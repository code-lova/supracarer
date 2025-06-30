import * as yup from "yup";

export const registrationSchema = yup.object().shape({
  name: yup.string().required("Your full name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  role: yup
    .string()
    .oneOf(["healthworker", "client"], "Invalid role")
    .required("Role is required"),
  practitioner: yup.string().when("role", {
    is: "healthworker",
    then: () =>
      yup
        .string()
        .oneOf(
          ["doctor", "nurse", "physician_assistant"],
          "Invalid practitioner type"
        )
        .required("Please select a practitioner type"),
    otherwise: () => yup.string().notRequired(),
  }),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[A-Z]/, "Must contain an uppercase letter")
    .matches(/[a-z]/, "Must contain a lowercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const verifyEmailSchema = yup.object().shape({
  code: yup
    .string()
    .length(6, "Code must be 6 characters")
    .required("Verification code required"),
});
