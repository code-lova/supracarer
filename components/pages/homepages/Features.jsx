import React from "react";
import Image from "next/image";
import { keyBenefits } from "@constants";
import Footer from "@components/landing/Footer";
import FeatureBg from "../FeatureBg";
import Features from "@components/landing/Features";
import { NormalBtn } from "@components/core/button";
import Subscription from "@components/landing/Subscription";

const FeaturesComponentPage = () => {
  return (
    <section>
      <FeatureBg
        heading="Discover Our Key Features"
        subheading="Your holistic health journey, empowered by technology"
      />
      <div className="w-full">
        <Features />
      </div>

      <div className="pageSection mb-10 mt-6">
        <h1 className="text-3xl md:text-4xl mb-10 text-center font-bold text-carer-blue">
          Discover a holistic health experience designed to support your
          well-being
        </h1>

        <p className="text-justify leading-loose mt-4 text-semi-dark text-base">
          Supracarer empowers your wellness journey by offering tailored health
          plans, convenient appointment scheduling, and comprehensive mental
          wellness support. The platform creates personalized strategies to meet
          your unique health goals while providing continuous assistance for
          building healthier habits. Users can easily book sessions with a
          diverse range of certified practitioners, all within a user-friendly
          app.
        </p>
        <p className="mt-10 text-center font-bold text-tranquil-teal">
          Supracarer makes it simple to prioritize your holistic health with
          expert guidance and easy-to-use tools.
        </p>
      </div>

      <div className="grayBackground">
        <h1 className="text-4xl font-bold text-center text-carer-blue tracking-widest">
          Why Choose Supracarer
        </h1>

        <div className="grid grid-cols-1 md:grid md:gap-1 md:grid-cols-2 mt-12">
          <div className="mb-8">
            <Image
              src="/assets/images/features.png"
              width={500}
              height={310}
              className="object-fit mx-auto"
            />
            
            <div className="flex justify-center mt-12">
              <NormalBtn href="/signin" children="Get started for free" />
            </div>
          </div>

          <div className="bg-white p-4 md:p-8 rounded-md">
            {keyBenefits.map((item) => (
              <div key={item.id} className="mb-4">
                <div className="">
                  <h1 className="text-[16px] font-bold text-tranquil-teal">
                    {item.title}
                  </h1>
                  <ul className="list-none ml-2">
                    <li className="custom-dot text-base md:text-sm tracking-wider leading-loose my-2">
                      {item.desc.paragraph1}
                    </li>
                    {item.desc.paragraph2 && (
                      <li className="custom-dot text-base md:text-sm leading-loose tracking-wider my-2 border-b border-dotted">
                        {item.desc.paragraph2}
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Subscription />

      <Footer />
    </section>
  );
};

export default FeaturesComponentPage;
