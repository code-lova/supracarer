import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const HowItWorks = () => {
  return (
    <div>
      <Navbar />

      <div className="w-full py-20 md:py-28">
        <div className="relative w-screen h-[318px]">
          <Image
            src="/assets/images/featuresBg.png"
            fill
            alt="about us"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center max-w-[300px] mx-auto lg:max-w-full">
            <h1 className=" text-white text-3xl md:text-4xl font-bold text-center">
              How To Get Started With Supracarer
            </h1>
            <div className=" mt-4">
              <p className="text-white text-base font-medium py-2 text-center">
                Your holistic health journey, empowered by technology
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-6 md:my-20 mx-4 mb-12">
        <h1 className=" text-xl md:text-3xl font-bold text-center blue_gradient font-montserrat tracking-widest py-16 pr-4 md:px-32">
          A Step-by-step guide on how to register on Supracarer and start
          enjoying the benefits
        </h1>

        <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 space-x-4 mt-2 lg:mt-6">
          <div className="p-2">
            <Image
              className="object-fill w-full h-auto rounded-xl"
              src="/assets/images/app_ui.webp"
              width={600}
              height={640}
              layout="responsive"
            />
          </div>
          <div className="p-0">
            {howItWorks.map((how) => (
              <div key={how.id} className="my-4">
                <h1 className="font-bold">{how.id}</h1>
                <h2>
                  <p className="text-pink-500 font-bold text-lg tracking-wider">
                    {how.name}
                  </p>
                  <p className="font-semi-thick text-semi-dark text-base leading-8">
                    {how.description}
                  </p>
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HowItWorks;
