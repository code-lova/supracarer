"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Hero from "./Hero";
import Features from "./Features";
import HowitWorks from "./HowitWorks";
import AboutUs from "./AboutUs";
import Services from "./Services";
import Faq from "./Faq";
import Subscription from "./Subscription";
import Footer from "./Footer";
import Marquee from "@components/core/Marquee";
import Partners from "./Partners";
import { useRouter } from "next/navigation";

const Landing = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      const role = session.user.role;
      if (role === "healthworker") router.replace("/health-service");
      else if (role === "client") router.replace("/client");
    }
  }, [session]);

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

        {/* FaQ section */}
        <Faq />

        {/* Partnership section */}
        <Partners />

        {/* The Subscription section */}
        <Subscription />

        {/* Footer section of the landing */}
        <Footer />
      </div>
    </section>
  );
};

export default Landing;
