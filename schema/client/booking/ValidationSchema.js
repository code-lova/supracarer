import * as Yup from "yup";

export const stepOneValidationSchema = Yup.object({
  care_duration: Yup.string()
    .required("Care duration is required")
    .oneOf(["Hourly", "Shift"], "Care Duration is not valid"),

  care_duration_value: Yup.string().required("Duration value is required"),

  care_type: Yup.string()
    .required("Care type is required")
    .oneOf(["Live-out", "Live-in"], "Care Type is not valid"),

  accommodation: Yup.string().when(
    ["care_duration", "care_duration_value", "care_type"],
    ([cd, cdv, ct]) =>
      cd === "Shift" && cdv === "24" && ct === "Live-in"
        ? Yup.string()
            .required("Accommodation is required")
            .oneOf(["Yes", "No"], "Select either Yes or No")
        : Yup.string().notRequired()
  ),

  meal: Yup.string().when(
    ["care_duration", "care_duration_value", "care_type"],
    ([cd, cdv, ct]) =>
      cd === "Shift" && cdv === "24" && ct === "Live-in"
        ? Yup.string()
            .required("Meal is required")
            .oneOf(["Yes", "No"], "Select either Yes or No")
        : Yup.string().notRequired()
  ),

  num_of_meals: Yup.string().when(
    ["care_duration", "care_duration_value", "care_type", "meal"],
    ([cd, cdv, ct, meal]) =>
      cd === "Shift" && cdv === "24" && ct === "Live-in" && meal === "Yes"
        ? Yup.string()
            .required("Number of meals is required")
            .oneOf(["1", "2", "3"], "Select a valid number of meals")
        : Yup.string().notRequired()
  ),
});

export const StepTwoValidationSchema = Yup.object().shape({
  medical_services: Yup.array()
    .of(Yup.string().max(255))
    .min(1, "Please select at least one medical service")
    .required("Medical services are required"),

  other_extra_services: Yup.array().of(Yup.string().max(255)).nullable(),

  special_notes: Yup.string()
    .required("Special notes are required")
    .min(20, "Special notes must be at least 20 characters")
    .max(600, "Special notes must not exceed 600 characters"),
});

//Step three validation schema
export const StepThreeValidationSchema = Yup.object().shape({
  start_date: Yup.date()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .required("Start date is required")
    .test("start-date-valid", function (start_date) {
      const { care_duration, care_duration_value } = this.options.context || {};
      if (!start_date) return true;
      if (care_duration === "Shift" && care_duration_value === "24") {
        // Must be today or future
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const start = new Date(start_date);
        start.setHours(0, 0, 0, 0);
        if (start < today) {
          return this.createError({
            message: "Start date must be today or a future date",
          });
        }
      }
      return true;
    }),

  end_date: Yup.date()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .required("End date is required")
    .test("end-date-valid", function (end_date) {
      const { start_date } = this.parent;
      const { care_duration, care_duration_value } = this.options.context || {};
      if (!start_date || !end_date) return true;
      const start = new Date(start_date);
      const end = new Date(end_date);
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      if (["1", "2", "3", "8", "12"].includes(care_duration_value)) {
        if (start.toDateString() !== end.toDateString()) {
          return this.createError({
            message: "Start and End date must be the same day for Hourly",
          });
        }
      } else if (care_duration === "Shift" && care_duration_value === "24") {
        // For 24-hour shift, end date should be exactly one day after start date
        const expectedEndDate = new Date(start);
        expectedEndDate.setDate(expectedEndDate.getDate() + 1);

        if (start.toDateString() === end.toDateString()) {
          return this.createError({
            message: "End date must be the next day for 24-hour shift",
          });
        }
        if (end.getTime() !== expectedEndDate.getTime()) {
          return this.createError({
            message:
              "End date must be exactly one day after start date for 24-hour shift",
          });
        }
      }
      return true;
    }),

  start_time: Yup.string()
    .required("Start time is required")
    .matches(
      /^([0-1]?\d|2[0-3]):([0-5]\d)$/,
      "Invalid time format e.g(8:10 or 08:10)"
    ),

  end_time: Yup.string()
    .required("End time is required")
    .matches(
      /^([0-1]?\d|2[0-3]):([0-5]\d)$/,
      "Invalid time format e.g(8:10 or 08:10)"
    )
    .test("end-time-valid", function (end_time) {
      const { start_time, start_time_period, end_time_period } = this.parent;
      const { care_duration, care_duration_value } = this.options.context || {};
      if (!start_time || !end_time || !start_time_period || !end_time_period)
        return true;
      // Helper to convert to 24hr
      const to24Hour = (hhmm, period) => {
        let [h, m] = hhmm.split(":").map(Number);
        if (period === "PM" && h !== 12) h += 12;
        if (period === "AM" && h === 12) h = 0;
        return { h, m };
      };
      // Helper to get AM/PM
      const getAmPm = (period) => period;
      // For 24hr Shift, just check end_time is after start_time
      const start = to24Hour(start_time, start_time_period);
      const end = to24Hour(end_time, end_time_period);
      const startTotal = start.h + start.m / 60;
      const endTotal = end.h + end.m / 60;
      if (care_duration === "Shift" && care_duration_value === "24") {
        if (endTotal <= startTotal) {
          return this.createError({
            message: `End time (${end_time} ${getAmPm(
              end_time_period
            )}) must be after Start time (${start_time} ${getAmPm(
              start_time_period
            )}) for 24hr Shift`,
          });
        }
        return true;
      }
      // For other durations, check exact hour difference
      let diff = endTotal - startTotal;
      if (diff < 0) diff += 24; // handle overnight
      if (Math.abs(diff - Number(care_duration_value)) < 0.01) return true;
      // Calculate expected end time
      let expectedH = start.h + Number(care_duration_value);
      let expectedM = start.m;
      if (expectedH >= 24) expectedH -= 24;
      // Format expected time
      let expectedPeriod = expectedH < 12 ? "AM" : "PM";
      let displayH = expectedH % 12 === 0 ? 12 : expectedH % 12;
      let displayM = expectedM.toString().padStart(2, "0");
      let expectedTime = `${displayH}:${displayM} ${expectedPeriod}`;
      return this.createError({
        message: `End time should be ${care_duration_value} hrs from Start time (${start_time} ${getAmPm(
          start_time_period
        )} - ${expectedTime})`,
      });
    }),
});

export const StepFourValidationSchema = Yup.object().shape({
  requesting_for: Yup.string()
    .required("Please select who you're requesting for")
    .oneOf(["Self", "Someone"], "Invalid selection"),

  someone_name: Yup.string()
    .transform((value) => (value === "" ? null : value))
    .nullable()
    .max(255, "Name must be 255 characters or less")
    .when("requesting_for", {
      is: "Someone",
      then: (schema) =>
        schema.required("Name is required when requesting for someone"),
      otherwise: (schema) => schema.notRequired(),
    }),

  someone_email: Yup.string()
    .transform((value) => (value === "" ? null : value))
    .nullable()
    .email("Must be a valid email")
    .when("requesting_for", {
      is: "Someone",
      then: (schema) =>
        schema.required("Email is required when requesting for someone"),
      otherwise: (schema) => schema.notRequired(),
    }),

  someone_phone: Yup.string()
    .transform((value) => (value === "" ? null : value))
    .nullable()
    .matches(/^\+?[0-9]{10,15}$/, "Invalid phone number format")
    .when("requesting_for", {
      is: "Someone",
      then: (schema) =>
        schema.required("Phone is required when requesting for someone"),
      otherwise: (schema) => schema.notRequired(),
    }),
});

//validationg mark appointment, review and ratings 
export const validateCompleteAppointment = Yup.object().shape({
  rating: Yup.number()
    .min(1, "Rating must be at least 1 star")
    .max(5, "Rating must be at most 5 stars")
    .required("Rating is required"),

  review: Yup.string()
    .min(20, "Review must be at least 20 characters")
    .max(300, "Review must be at most 300 characters")
    .required("Review is required"),
});