import React from "react";
import Footer from "@components/landing/Footer";
import HowitWorks from "@components/landing/HowitWorks";
import Subscription from "@components/landing/Subscription";
import Faq from "@components/landing/Faq";

const HowItWorks = () => {
  return (
    <section>

      <HowitWorks />

      <Faq />

      <Subscription />

      <Footer />
    </section>
  );
};

export default HowItWorks;
