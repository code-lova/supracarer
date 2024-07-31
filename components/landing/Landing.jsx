"use client";
import Nav from "./Nav";
import Hero from './Hero';
import Features from './Features';
import HowitWorks from './HowitWorks';
import AboutUs from './AboutUs';
import Services from './Services';
import Team from './Team';
import Pricing from './Pricing';
import Faq from './Faq';
import ContactUs from './ContactUs';
import Subscription from './Subscription';
import Connect from "./Connect";
import Footer from "./Footer";


const Landing = () => {

    return (
        <section className="flex flex-col lg:flex-row w-full mt-[78px] lg:mt-0">
            <Nav />
            <div className="w-full lg:ml-[300px] relative">

                {/* Hero background image */}
                <Hero />

                {/* Features of the app section */}
                <Features />

                {/* How it works */}
                <HowitWorks />

                {/* Who we are */}
               <AboutUs />

                {/* Our services section */}
                <Services />

                {/* The team sections */}
                <Team />

                {/* Our Pricing Plan section */}
                <Pricing />

                {/* FaQ section */}
                <Faq />

                {/* contact us section */}
                <ContactUs />

                {/* The Subscription section */}
                <Subscription />

                {/* connect section */}
                <Connect />

                {/* Footer section of the landing */}
                <Footer />

            </div>
           
        </section>
    );
};

export default Landing;
