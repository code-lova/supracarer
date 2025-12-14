import React from "react";
import ClientAppointments from "@components/accounts/healthservice/ClientAppointments";

export const metadata = {
  title: "Appointments - Supracarer",
  description: "Health Service appointments - Supracarer",
};

const page = () => {
  return <ClientAppointments />;
};

export default page;
