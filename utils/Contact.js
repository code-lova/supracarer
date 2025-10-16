import { contactInfo } from "@constants";

export const emailDetail = contactInfo.find((item) =>
  item.title.toLowerCase().includes("email")
);

export const phoneDetail = contactInfo.find((item) =>
  item.title.toLowerCase().includes("phone")
);

export const addressDetail = contactInfo.find((item) =>
  item.title.toLowerCase().includes("office")
);
