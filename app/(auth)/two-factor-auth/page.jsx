import TwoFactorAuth from "@components/pages/authentication/TwoFactorAuth";
import React from "react";

export const metadata = {
  title: "Two-Factor Authentication - Supracarer",
  description: "Secure your Supracarer account with two-factor authentication.",
};

const page = () => {
  return <TwoFactorAuth />;
};

export default page;
