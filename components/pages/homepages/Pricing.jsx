"use client";
import React from "react";
import Footer from "@components/landing/Footer";
import PricingComponent from "@components/landing/Pricing";
import Subscription from "@components/landing/Subscription";

const Pricing = () => {
  return (
    <section className="bg-white min-h-screen">
      <div className="pt-20">
        <PricingComponent />
      </div>
      <Subscription />
      <Footer />
    </section>
  );
};

export default Pricing;
