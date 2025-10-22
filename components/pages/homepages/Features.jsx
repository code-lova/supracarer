import React from "react";
import Footer from "@components/landing/Footer";
import Features from "@components/landing/Features";
import Subscription from "@components/landing/Subscription";

const FeaturesComponentPage = () => {
  return (
    <section className="bg-white">
      {/* Main Features Section */}
      <div className="w-full">
        <Features />
      </div>

      <Subscription />
      <Footer />
    </section>
  );
};

export default FeaturesComponentPage;
