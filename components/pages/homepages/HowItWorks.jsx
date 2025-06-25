import React from "react";
import FeatureBg from "../FeatureBg";
import Footer from "@components/landing/Footer";
import HowitWorks from "@components/landing/HowitWorks";
import Subscription from "@components/landing/Subscription";
import Faq from "@components/landing/Faq";

const HowItWorks = () => {
  return (
    <section>
      <FeatureBg
        heading="How To Get Started With Supracarer"
        subheading="Your holistic health journey, empowered by technology"
      />

      <HowitWorks />

      <Faq />

      <Subscription />

      <Footer />
    </section>
  );
};

export default HowItWorks;
