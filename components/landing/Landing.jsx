"use client";
import Hero from "./Hero";
import Features from "./Features";
import HowitWorks from "./HowitWorks";
import AboutUs from "./AboutUs";
import Services from "./Services";
import Team from "./Team";
import Faq from "./Faq";
import ContactUs from "./ContactUs";
import Subscription from "./Subscription";
import Footer from "./Footer";
import Marquee from "@components/core/Marquee";

const Landing = () => {
  return (
    <section className="flex flex-col lg:flex-row w-full mt-[6px] lg:mt-0">
      <div className="w-full relative">
        {/* Hero background image */}
        <Hero />

        {/* Who we are */}
        <AboutUs />

        {/* Features of the app section */}
        <Features />

        {/* How it works */}
        <HowitWorks />

        <Marquee />

        {/* Our services section */}
        <Services />

        {/* The team sections */}
        <Team />

        {/* Our Pricing Plan section */}
        {/* <Pricing /> */}

        {/* FaQ section */}
        <Faq />

        {/* contact us section */}
        <ContactUs />

        {/* The Subscription section */}
        <Subscription />

        {/* connect section */}
        {/* <Connect /> */}

        {/* Footer section of the landing */}
        <Footer />
      </div>
    </section>
  );
};

export default Landing;
