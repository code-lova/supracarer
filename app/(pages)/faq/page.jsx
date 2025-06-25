import Faq from "@components/pages/homepages/Faq";
import React from "react";

export const metadata = {
  title: "FAQs - Supracarer",
  description: "Frequently asked question from clients and employees.",
};

const page = () => {
  return (
    <>
      <Faq />
    </>
  );
};

export default page;
