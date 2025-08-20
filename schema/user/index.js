import * as Yup from "yup";

export const deleteUserProfileSchema = Yup.object().shape({
  confirmation: Yup.string()
    .required("Please confirm your request")
    .oneOf(["DELETE_MY_ACCOUNT"], "Invalid confirmation value"),
  reason: Yup.string().max(1000).required("Give us a reason for deletion"),
});
