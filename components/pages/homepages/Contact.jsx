import React from "react";
import Footer from "@components/landing/Footer";
import FeatureBg from "../FeatureBg";
import ContactUs from "@components/landing/ContactUs";
import Subscription from "@components/landing/Subscription";

const Contact = () => {
  return (
    <section>
      <FeatureBg
        heading="Get in touch With Supracarer"
        subheading="For more information on Supracarer, please send us an inquiry"
      />

      <ContactUs />

      <Subscription />

      <Footer />
    </section>
  );
};

export default Contact;
