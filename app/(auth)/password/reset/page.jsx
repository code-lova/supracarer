import ResetPassword from "@components/pages/authentication/ResetPassword";
import React from "react";

export const metadata = {
  title: "Reset Password - Supracarer",
  description: "Reset your Supracarer account password securely.",
};

const Page = () => {
  return (
    <div>
      <ResetPassword />
    </div>
  );
};

export default Page;
