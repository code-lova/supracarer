import * as Yup from "yup";

export const guidedRateSchema = Yup.object().shape({
  guided_rate: Yup.number()
    .min(50, "Minimum rate must be at least GHS 50")
    .max(400, "Maximum rate must be GHS 400")
    .required("Rate is required"),

  rate_type: Yup.string()
    .oneOf(["shift", "hourly"], "Rate type must be either 'shift' or 'hourly'")
    .required("Rate type is required"),

  nurse_type: Yup.string().required("Select a nurse type"),

  care_duration: Yup.string().when("rate_type", {
    is: "hourly",
    then: () =>
      Yup.string()
        .matches(/^\d+\s*hours?(?:\s*\(.*\))?$/i, "Care duration must be like '2 hours (Live-out)'")
        .required("Care duration is required for hourly rate"),
    otherwise: () =>
      Yup.string()
        .oneOf(
          ["8-hour(Live-out)", "12-hour(Live-out)", "24-hour(Live-in)"],
          "Invalid shift duration"
        )
        .required("Care duration is required for shift rate"),
  }),

  service_types: Yup.array()
    .of(Yup.string())
    .min(1, "At least one service type must be selected")
    .required("Service type is required"),

  guided_rate_justification: Yup.string()
    .max(500, "Justification too long")
    .notRequired(),
});
