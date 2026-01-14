import VerifyEmail from "@components/pages/authentication/VerifyEmail";
import React from "react";

export const metadata = {
  title: "Verify Email - Supracarer",
  description: "Verify your email address to secure your Supracarer account.",
};

const Page = () => {
  return (
    <div>
      <VerifyEmail />
    </div>
  );
};

export default Page;
