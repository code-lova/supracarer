import { contactDetails } from "@constants";

export const emailDetail = contactDetails.find((item) =>
  item.title.toLowerCase().includes("email")
);

export const phoneDetail = contactDetails.find((item) =>
  item.title.toLowerCase().includes("phone")
);

export const addressDetail = contactDetails.find((item) =>
  item.title.toLowerCase().includes("address")
);
