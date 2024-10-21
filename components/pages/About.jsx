"use client";
import Navbar from "./Navbar";
import Team from "@components/landing/Team";
import Footer from "./Footer";

export const About = () => {
  return (
    <section>
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
              Learn More About Supracarer
            </h1>
            <div className=" mt-4">
              <p className="text-white text-base font-medium py-2 text-center">
                Your holistic health journey, empowered by technology
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center gap-8 md:gap-16 mt-[100px] px-4 md:px-0">
        <div className="w-[97%] md:w-1/2 pl-0 md:pl-[30px]">
          <h1 className="text-3xl md:text-4xl text-center font-bold">
            Who We Are
          </h1>
          <p className="mt-4 text-lg  text-center">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus
            recusandae sequi veritatis voluptates eius explicabo fugiat cumque
            natus provident enim, accusamus quidem consectetur molestias facere
            voluptas numquam magni suscipit quis?
          </p>
        </div>
        <div className="relative w-full md:w-1/2 h-[300px] md:h-[400px] rounded-3xl overflow-hidden">
          <Image
            src="/assets/images/hero-bg6.jpg"
            alt="Hero Background"
            fill
            style={{ objectFit: "cover" }}
            loading="lazy"
          />
        </div>
      </div>

      <div className="flex flex-wrap md:flex-nowrap flex-col-reverse md:flex-row justify-center md:justify-between items-center gap-8 md:gap-16 mt-[100px] px-4 md:px-0">
        <div className="relative w-full md:w-1/2 h-[300px] md:h-[400px] rounded-3xl overflow-hidden">
          <Image
            src="/assets/images/hero-bg2.jpg"
            alt="Hero Background"
            fill
            style={{ objectFit: "cover" }}
            loading="lazy"
          />
        </div>
        <div className="w-[97%] md:w-1/2 pl-0 md:pl-[30px]">
          <h1 className="text-3xl md:text-4xl text-center font-bold">
            Our Story
          </h1>
          <p className="mt-4 text-lg  text-center">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus
            recusandae sequi veritatis voluptates eius explicabo fugiat cumque
            natus provident enim, accusamus quidem consectetur molestias facere
            voluptas numquam magni suscipit quis?
          </p>
        </div>
      </div>

      <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center gap-8 md:gap-16 mt-[100px] px-4 md:px-0">
        <div className="w-[97%] md:w-1/2 pl-0 md:pl-[30px]">
          <h1 className="text-3xl md:text-4xl text-center font-bold">
            Our Mission
          </h1>
          <p className="mt-4 text-lg  text-center">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus
            recusandae sequi veritatis voluptates eius explicabo fugiat cumque
            natus provident enim, accusamus quidem consectetur molestias facere
            voluptas numquam magni suscipit quis?
          </p>
        </div>
        <div className="relative w-full md:w-1/2 h-[300px] md:h-[400px] rounded-3xl overflow-hidden">
          <Image
            src="/assets/images/hero-bg6.jpg"
            alt="Hero Background"
            fill
            style={{ objectFit: "cover" }}
            loading="lazy"
          />
        </div>
      </div>

      <div className="flex flex-wrap md:flex-nowrap flex-col-reverse md:flex-row justify-center md:justify-between items-center gap-8 md:gap-16 mt-[100px] px-4 md:px-0">
        <div className="relative w-full md:w-1/2 h-[300px] md:h-[400px] rounded-3xl overflow-hidden">
          <Image
            src="/assets/images/hero-bg2.jpg"
            alt="Hero Background"
            fill
            style={{ objectFit: "cover" }}
            loading="lazy"
          />
        </div>
        <div className="w-[97%] md:w-1/2 pl-0 md:pl-[30px]">
          <h1 className="text-3xl md:text-4xl text-center font-bold">
            Our Vision
          </h1>
          <p className="mt-4 text-lg  text-center">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus
            recusandae sequi veritatis voluptates eius explicabo fugiat cumque
            natus provident enim, accusamus quidem consectetur molestias facere
            voluptas numquam magni suscipit quis?
          </p>
        </div>
      </div>

      <Team />

      <Footer />
    </section>
  );
};
