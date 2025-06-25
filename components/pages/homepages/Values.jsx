import React from "react";
import FeatureBg from "../FeatureBg";
import Subscription from "@components/landing/Subscription";
import Footer from "@components/landing/Footer";
import { coreValues } from "@constants";

const Values = () => {
  return (
    <section>
      <FeatureBg heading="Our Values" subheading="Life at Supracarer" />

      <div className="pageSection">
        <div className="text-center text-carer-blue px-4 leading-6 lg:px-40">
          <h2 className="text-3xl lg:text-4xl font-bold uppercase">
            Our core values
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-12 mb-24">
          {coreValues.map((value) => (
            <div
              key={value.id}
              className="bg-white shadow-lg rounded-2xl p-6 text-center border hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center">{value.icon}</div>
              <h3 className="mt-2 text-xl font-semibold text-carer-blue">
                {value.title}
              </h3>
              <p className="mt-2 text-semi-dark text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Subscription />

      <Footer />
    </section>
  );
};

export default Values;
