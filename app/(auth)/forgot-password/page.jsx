import ForgotPassword from "@components/pages/authentication/ForgotPassword";
import React from "react";

export const metadata = {
  title: "Forgot Password - Supracarer",
  description: "Reset your Supracarer account password securely.",
};

const Page = () => {
  return (
    <div>
      <ForgotPassword />
    </div>
  );
};

export default Page;
